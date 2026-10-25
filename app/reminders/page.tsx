"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Reminder = { id: string; body: string; remind_at: string };

const BODY_MAX_LENGTH = 200;

const whenFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeStyle: "short" });

function splitByNow(reminders: Reminder[], now: number) {
  const upcoming = reminders.filter((reminder) => new Date(reminder.remind_at).getTime() > now);
  const past = reminders.filter((reminder) => new Date(reminder.remind_at).getTime() <= now).reverse();
  return { upcoming, past };
}

function ReminderList({ title, reminders, empty }: { title: string; reminders: Reminder[]; empty: string }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {reminders.length === 0 ? (
        <p className="text-sm opacity-70">{empty}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex flex-col rounded border px-3 py-2">
              <span>{reminder.body}</span>
              <time className="text-sm opacity-70" dateTime={reminder.remind_at}>
                {whenFormat.format(new Date(reminder.remind_at))}
              </time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function RemindersPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("reminders").select("id, body, remind_at").order("remind_at", { ascending: true });
    if (error) setMessage(error.message);
    else setReminders(data ?? []);
    setNow(Date.now());
  }, []);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/");
      else void load();
    });
  }, [router, load]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);

  async function add(event: React.FormEvent) {
    event.preventDefault();
    setMessage(null);
    const remindAt = new Date(`${date}T${time}`);
    if (Number.isNaN(remindAt.getTime())) {
      setMessage("Escolha uma data e uma hora válidas.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("reminders").insert({ body: body.trim(), remind_at: remindAt.toISOString() });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setBody("");
    setDate("");
    setTime("");
    await load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  const { upcoming, past } = splitByNow(reminders, now);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meus lembretes</h1>
        <button className="text-sm underline" type="button" onClick={() => void signOut()}>
          Sair
        </button>
      </header>
      <form className="flex flex-col gap-3" onSubmit={(event) => void add(event)}>
        <label className="flex flex-col gap-1 text-sm">
          Lembrete
          <input
            className="rounded border px-3 py-2"
            required
            maxLength={BODY_MAX_LENGTH}
            value={body}
            placeholder="Entregar o trabalho de história"
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <div className="flex gap-2">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Data
            <input className="rounded border px-3 py-2" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-sm">
            Hora
            <input className="rounded border px-3 py-2" type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>
        <button className="rounded bg-foreground px-3 py-2 text-background disabled:opacity-50" type="submit" disabled={busy}>
          Criar lembrete
        </button>
      </form>
      {message ? <p className="text-sm" role="status">{message}</p> : null}
      <ReminderList title="Próximos" reminders={upcoming} empty="Nenhum lembrete marcado." />
      <ReminderList title="Já passaram" reminders={past} empty="Nenhum lembrete passou ainda." />
    </main>
  );
}
