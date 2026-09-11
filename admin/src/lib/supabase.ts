import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function cleanEnv(value: string | undefined, prefix: string) {
	if (!value) return '';
	let next = value.trim().replace(/^\uFEFF/, '').replace(/\r/g, '');
	if (
		(next.startsWith('"') && next.endsWith('"')) ||
		(next.startsWith("'") && next.endsWith("'"))
	) {
		next = next.slice(1, -1).trim();
	}
	if (next.toUpperCase().startsWith(`${prefix}=`)) {
		next = next.slice(prefix.length + 1).trim();
	}
	return next;
}

const url = cleanEnv(import.meta.env.VITE_SUPABASE_URL, 'VITE_SUPABASE_URL');
const anonKey = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY, 'VITE_SUPABASE_ANON_KEY');

function createSupabase(): SupabaseClient | null {
	if (!url || !anonKey || !/^https?:\/\//i.test(url)) return null;
	try {
		return createClient(url, anonKey);
	} catch {
		return null;
	}
}

export const supabase: SupabaseClient | null = createSupabase();
export const supabaseConfigured = supabase !== null;
