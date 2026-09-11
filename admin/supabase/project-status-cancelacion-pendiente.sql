-- Add "Cancelación pendiente" and "Cancelado" to an existing Pixel-Craft project.
-- Run in Supabase → SQL Editor.

alter table public.projects drop constraint if exists projects_status_check;
alter table public.projects add constraint projects_status_check
	check (status in ('presupuesto', 'en_curso', 'cancelacion_pendiente', 'entregado', 'cancelado'));
