drop policy "virgilio_reminders_update_own" on public."reminders";
drop policy "virgilio_reminders_delete_own" on public."reminders";

create policy "virgilio_reminders_update_own_pending" on public."reminders" for update to authenticated
  using ((select auth.uid()) = "owner_id" and "fired_at" is null and "remind_at" > now())
  with check ((select auth.uid()) = "owner_id" and "fired_at" is null);
create policy "virgilio_reminders_delete_own_pending" on public."reminders" for delete to authenticated
  using ((select auth.uid()) = "owner_id" and "fired_at" is null and "remind_at" > now());
