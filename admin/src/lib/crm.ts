import { supabase } from './supabase';
import type { ActivityType } from './types';

const promoteInFlight = new Map<string, Promise<boolean>>();

export async function promoteProjectNotes(project: {
	id: string;
	client_id: string;
	notes: string | null;
	created_at?: string;
	updated_at?: string;
}) {
	const pending = promoteInFlight.get(project.id);
	if (pending) return pending;

	const run = promoteProjectNotesOnce(project).finally(() => {
		promoteInFlight.delete(project.id);
	});
	promoteInFlight.set(project.id, run);
	return run;
}

async function promoteProjectNotesOnce(project: {
	id: string;
	client_id: string;
	notes: string | null;
	created_at?: string;
	updated_at?: string;
}) {
	if (!supabase) throw new Error('Supabase no configurado');
	const body = project.notes?.trim();
	if (!body) return false;

	const { data: existing, error: lookupError } = await supabase
		.from('activities')
		.select('id')
		.eq('project_id', project.id)
		.eq('body', body)
		.limit(1);
	if (lookupError) throw lookupError;

	if (!existing?.length) {
		const looksLikeWebLead = body.startsWith('Lead desde el sitio web');
		if (!looksLikeWebLead) {
			const { error: insertError } = await supabase.from('activities').insert({
				client_id: project.client_id,
				project_id: project.id,
				type: 'note',
				body,
				created_at: project.created_at || project.updated_at || new Date().toISOString(),
			});
			if (insertError) throw insertError;
		}
	}

	const { error: clearError } = await supabase
		.from('projects')
		.update({ notes: null, updated_at: new Date().toISOString() })
		.eq('id', project.id);
	if (clearError) throw clearError;
	return true;
}

export async function addActivity(input: {
	client_id: string;
	project_id?: string | null;
	type: ActivityType;
	body: string;
}) {
	if (!supabase) throw new Error('Supabase no configurado');
	const { error } = await supabase.from('activities').insert({
		client_id: input.client_id,
		project_id: input.project_id || null,
		type: input.type,
		body: input.body.trim(),
	});
	if (error) throw error;
}

export async function updateActivity(id: string, body: string) {
	if (!supabase) throw new Error('Supabase no configurado');
	const { error } = await supabase.from('activities').update({ body: body.trim() }).eq('id', id);
	if (error) throw error;
}

export async function deleteProject(projectId: string) {
	if (!supabase) throw new Error('Supabase no configurado');
	const { error } = await supabase.from('projects').delete().eq('id', projectId);
	if (error) throw error;
}

export async function deleteClient(clientId: string) {
	if (!supabase) throw new Error('Supabase no configurado');
	await removeClientAttachments(clientId);
	const { error } = await supabase.from('clients').delete().eq('id', clientId);
	if (error) throw error;
}

async function removeClientAttachments(clientId: string) {
	if (!supabase) return;
	const { data } = await supabase.storage.from('email-attachments').list(clientId, { limit: 1000 });
	const paths = (data ?? []).filter((file) => file.name).map((file) => `${clientId}/${file.name}`);
	if (paths.length === 0) return;
	await supabase.storage.from('email-attachments').remove(paths);
}
