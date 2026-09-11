-- Pixel-Craft CRM ops: dates, money, activities, lead source.
-- Run in Supabase → SQL Editor on an existing project.

alter table public.clients
	add column if not exists last_outbound_at timestamptz;

alter table public.projects
	add column if not exists due_date date,
	add column if not exists follow_up_at date,
	add column if not exists quoted_amount numeric(12, 2),
	add column if not exists deposit_amount numeric(12, 2) not null default 0,
	add column if not exists currency text not null default 'USD',
	add column if not exists payment_status text not null default 'pendiente',
	add column if not exists source text not null default 'manual';

alter table public.projects drop constraint if exists projects_currency_check;
alter table public.projects add constraint projects_currency_check
	check (currency in ('USD', 'CRC'));

alter table public.projects drop constraint if exists projects_payment_status_check;
alter table public.projects add constraint projects_payment_status_check
	check (payment_status in ('pendiente', 'parcial', 'pagado'));

alter table public.projects drop constraint if exists projects_source_check;
alter table public.projects add constraint projects_source_check
	check (source in ('manual', 'web'));

create table if not exists public.activities (
	id uuid primary key default gen_random_uuid(),
	client_id uuid not null references public.clients (id) on delete cascade,
	project_id uuid references public.projects (id) on delete set null,
	type text not null check (type in ('note', 'call', 'whatsapp', 'email', 'status_change', 'lead')),
	body text not null,
	created_at timestamptz not null default now()
);

create index if not exists activities_client_id_idx on public.activities (client_id);
create index if not exists activities_project_id_idx on public.activities (project_id);
create index if not exists activities_created_at_idx on public.activities (created_at desc);
create index if not exists projects_due_date_idx on public.projects (due_date);
create index if not exists projects_follow_up_at_idx on public.projects (follow_up_at);
create index if not exists clients_email_lower_idx on public.clients (lower(email));

create or replace function public.touch_last_outbound()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
	if new.type in ('call', 'whatsapp', 'email') then
		update public.clients
		set last_outbound_at = coalesce(new.created_at, now())
		where id = new.client_id
			and (last_outbound_at is null or last_outbound_at < coalesce(new.created_at, now()));
	end if;
	return new;
end;
$$;

drop trigger if exists activities_touch_last_outbound on public.activities;
create trigger activities_touch_last_outbound
after insert on public.activities
for each row execute procedure public.touch_last_outbound();

alter table public.activities enable row level security;

drop policy if exists "admins_all_activities" on public.activities;
create policy "admins_all_activities"
on public.activities
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select, insert, update, delete on table public.activities to authenticated;
