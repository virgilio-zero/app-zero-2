create table public."reminders" (
  "id" uuid primary key default gen_random_uuid(),
  "owner_id" uuid not null default auth.uid() references auth.users (id) on delete cascade,
  "body" text not null check (char_length(btrim("body")) between 1 and 200),
  "remind_at" timestamptz not null,
  "fired_at" timestamptz,
  "created_at" timestamptz not null default now()
);

create index "reminders_owner_remind_at_idx" on public."reminders" ("owner_id", "remind_at");

alter table public."reminders" enable row level security;
create policy "virgilio_reminders_select_own" on public."reminders" for select to authenticated using ((select auth.uid()) = "owner_id");
create policy "virgilio_reminders_insert_own" on public."reminders" for insert to authenticated with check ((select auth.uid()) = "owner_id");
create policy "virgilio_reminders_update_own" on public."reminders" for update to authenticated using ((select auth.uid()) = "owner_id") with check ((select auth.uid()) = "owner_id");
create policy "virgilio_reminders_delete_own" on public."reminders" for delete to authenticated using ((select auth.uid()) = "owner_id");
