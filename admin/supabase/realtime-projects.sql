-- Enable live form notifications in the admin.
-- Run in Supabase → SQL Editor if the bell should update without waiting for the 25s poll.

do $$
begin
	if not exists (
		select 1
		from pg_publication_tables
		where pubname = 'supabase_realtime'
			and schemaname = 'public'
			and tablename = 'projects'
	) then
		execute 'alter publication supabase_realtime add table public.projects';
	end if;
end $$;
