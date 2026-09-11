-- Add email attachments support to an existing Pixel-Craft project.
-- Run in Supabase → SQL Editor.

alter table public.emails add column if not exists attachments jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public)
values ('email-attachments', 'email-attachments', false)
on conflict (id) do nothing;

drop policy if exists "admins_email_attachments" on storage.objects;
create policy "admins_email_attachments"
on storage.objects
for all
to authenticated
using (bucket_id = 'email-attachments' and public.is_admin())
with check (bucket_id = 'email-attachments' and public.is_admin());
