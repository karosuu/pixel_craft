-- Pixel-Craft admin CRM
-- Run in Supabase → SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admins (
	user_id uuid primary key references auth.users (id) on delete cascade,
	email text unique not null
);

create table if not exists public.clients (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	company text,
	email text,
	phone text,
	website text,
	notes text,
	last_outbound_at timestamptz,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.projects (
	id uuid primary key default gen_random_uuid(),
	client_id uuid not null references public.clients (id) on delete cascade,
	title text not null,
	type text not null check (type in ('build', 'design', 'optimize', 'qa', 'other')),
	status text not null check (status in ('presupuesto', 'en_curso', 'cancelacion_pendiente', 'entregado', 'cancelado')),
	notes text,
	due_date date,
	follow_up_at date,
	quoted_amount numeric(12, 2),
	deposit_amount numeric(12, 2) not null default 0,
	currency text not null default 'USD' check (currency in ('USD', 'CRC')),
	payment_status text not null default 'pendiente' check (payment_status in ('pendiente', 'parcial', 'pagado')),
	source text not null default 'manual' check (source in ('manual', 'web')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.emails (
	id uuid primary key default gen_random_uuid(),
	client_id uuid not null references public.clients (id) on delete cascade,
	project_id uuid references public.projects (id) on delete set null,
	to_email text not null,
	subject text not null,
	body text not null,
	status text not null check (status in ('sent', 'failed')),
	error text,
	sent_at timestamptz not null default now()
);

alter table public.emails add column if not exists attachments jsonb not null default '[]'::jsonb;

create table if not exists public.activities (
	id uuid primary key default gen_random_uuid(),
	client_id uuid not null references public.clients (id) on delete cascade,
	project_id uuid references public.projects (id) on delete set null,
	type text not null check (type in ('note', 'call', 'whatsapp', 'email', 'status_change', 'lead')),
	body text not null,
	created_at timestamptz not null default now()
);

create index if not exists projects_client_id_idx on public.projects (client_id);
create index if not exists projects_due_date_idx on public.projects (due_date);
create index if not exists projects_follow_up_at_idx on public.projects (follow_up_at);
create index if not exists emails_client_id_idx on public.emails (client_id);
create index if not exists emails_sent_at_idx on public.emails (sent_at desc);
create index if not exists activities_client_id_idx on public.activities (client_id);
create index if not exists activities_project_id_idx on public.activities (project_id);
create index if not exists activities_created_at_idx on public.activities (created_at desc);
create index if not exists clients_email_lower_idx on public.clients (lower(email));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
	select exists (
		select 1
		from public.admins
		where user_id = auth.uid()
	);
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

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

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
before update on public.clients
for each row execute procedure public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

drop trigger if exists activities_touch_last_outbound on public.activities;
create trigger activities_touch_last_outbound
after insert on public.activities
for each row execute procedure public.touch_last_outbound();

alter table public.admins enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.emails enable row level security;
alter table public.activities enable row level security;

drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self"
on public.admins
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "admins_all_clients" on public.clients;
create policy "admins_all_clients"
on public.clients
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins_all_projects" on public.projects;
create policy "admins_all_projects"
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins_all_emails" on public.emails;
create policy "admins_all_emails"
on public.emails
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admins_all_activities" on public.activities;
create policy "admins_all_activities"
on public.activities
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant usage on schema public to anon, authenticated, service_role;
grant select on table public.admins to authenticated, service_role;
grant select, insert, update, delete on table public.clients to authenticated, service_role;
grant select, insert, update, delete on table public.projects to authenticated, service_role;
grant select, insert, update, delete on table public.emails to authenticated, service_role;
grant select, insert, update, delete on table public.activities to authenticated, service_role;

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

-- After creating the Auth user in the dashboard, run:
-- insert into public.admins (user_id, email)
-- select id, email from auth.users where email = 'tu-correo@pixel-craft.dev';
