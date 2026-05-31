-- Allow admin (authenticated) to delete doubts
create policy "admin can delete doubts" on public.doubts
  for delete using (auth.role() = 'authenticated');

-- Allow admin (authenticated) to update answers
create policy "admin can update answers" on public.answers
  for update using (auth.role() = 'authenticated');

-- Allow admin (authenticated) to delete answers
create policy "admin can delete answers" on public.answers
  for delete using (auth.role() = 'authenticated');
