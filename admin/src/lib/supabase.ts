import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabaseConfigured = Boolean(url && anonKey);

function createSupabase(): SupabaseClient | null {
	if (!url || !anonKey) return null;
	try {
		return createClient(url, anonKey);
	} catch {
		return null;
	}
}

export const supabase: SupabaseClient | null = createSupabase();
