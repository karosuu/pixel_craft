-- Move leftover project.notes into the activity timeline, then clear the field.
-- Safe to run more than once. Run in Supabase → SQL Editor.

insert into public.activities (client_id, project_id, type, body, created_at)
select
	p.client_id,
	p.id,
	'note',
	p.notes,
	coalesce(p.created_at, p.updated_at, now())
from public.projects p
where p.notes is not null
	and trim(p.notes) <> ''
	and not exists (
		select 1
		from public.activities a
		where a.project_id = p.id
			and a.body = p.notes
	)
	and p.notes not like 'Lead desde el sitio web%';

update public.projects
set notes = null, updated_at = now()
where notes is not null
	and trim(notes) <> '';
