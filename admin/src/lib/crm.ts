import { supabase } from './supabase';

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
