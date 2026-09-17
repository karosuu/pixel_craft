import { supabase } from './supabase';
import type { ProjectType } from './types';

export type WebLeadNotice = {
	id: string;
	title: string;
	type: ProjectType;
	created_at: string;
	client_id: string;
	clientName: string;
	clientEmail: string | null;
};

const STORAGE_KEY = 'pixel-craft.crm.seen-web-leads';
const BASE_TITLE = 'Pixel-Craft · Admin';

type ProjectLeadRow = {
	id: string;
	title: string;
	type: ProjectType;
	created_at: string;
	client_id: string;
	clients:
		| { id: string; name: string; company: string | null; email: string | null }
		| { id: string; name: string; company: string | null; email: string | null }[]
		| null;
};

function clientOf(row: ProjectLeadRow) {
	const related = row.clients;
	if (!related) return null;
	return Array.isArray(related) ? related[0] : related;
}

export function readSeenLeadIds(): string[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? (JSON.parse(raw) as unknown) : [];
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((id): id is string => typeof id === 'string');
	} catch {
		return [];
	}
}

export function writeSeenLeadIds(ids: string[]) {
	const unique = [...new Set(ids)].slice(-200);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
}

export function syncAdminTitle(unread: number) {
	document.title = unread > 0 ? `(${unread}) ${BASE_TITLE}` : BASE_TITLE;
}

export async function fetchWebLeads(): Promise<WebLeadNotice[]> {
	if (!supabase) return [];
	const { data, error } = await supabase
		.from('projects')
		.select('id, title, type, created_at, client_id, clients(id, name, company, email)')
		.eq('source', 'web')
		.order('created_at', { ascending: false })
		.limit(30);
	if (error) throw error;

	return ((data ?? []) as ProjectLeadRow[]).map((row) => {
		const client = clientOf(row);
		return {
			id: row.id,
			title: row.title,
			type: row.type,
			created_at: row.created_at,
			client_id: row.client_id,
			clientName: client?.company || client?.name || 'Cliente web',
			clientEmail: client?.email ?? null,
		};
	});
}
