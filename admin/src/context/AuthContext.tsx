import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../lib/supabase';

type AuthState = {
	configured: boolean;
	loading: boolean;
	session: Session | null;
	user: User | null;
	isAdmin: boolean;
	error: string | null;
	signIn: (email: string, password: string) => Promise<string | null>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

function errorMessage(err: unknown) {
	if (err instanceof Error && err.message) return err.message;
	if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string' && err.message) {
		return err.message;
	}
	return 'No se pudo verificar el acceso.';
}

async function userIsAdmin(userId: string) {
	if (!supabase) return false;
	const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', userId).maybeSingle();
	if (error) throw error;
	return Boolean(data);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState<Session | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!supabase) {
			setLoading(false);
			return;
		}

		let cancelled = false;

		async function syncSession(next: Session | null) {
			setSession(next);
			setError(null);
			if (!next?.user) {
				setIsAdmin(false);
				setLoading(false);
				return;
			}
			try {
				const allowed = await userIsAdmin(next.user.id);
				if (cancelled) return;
				if (!allowed) {
					await supabase?.auth.signOut();
					setSession(null);
					setIsAdmin(false);
					setError('Este usuario no está en la lista de administradores.');
				} else {
					setIsAdmin(true);
				}
			} catch (err) {
				if (cancelled) return;
				setIsAdmin(false);
				setError(errorMessage(err));
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		supabase.auth.getSession().then(({ data }) => {
			void syncSession(data.session);
		});

		const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
			void syncSession(next);
		});

		return () => {
			cancelled = true;
			subscription.subscription.unsubscribe();
		};
	}, []);

	const value = useMemo<AuthState>(
		() => ({
			configured: supabaseConfigured,
			loading,
			session,
			user: session?.user ?? null,
			isAdmin,
			error,
			signIn: async (email, password) => {
				if (!supabase) return 'Falta configurar Supabase.';
				setError(null);
				setLoading(true);
				const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
				if (signInError) {
					setLoading(false);
					return signInError.message;
				}
				return null;
			},
			signOut: async () => {
				await supabase?.auth.signOut();
				setIsAdmin(false);
			},
		}),
		[isAdmin, loading, session, error],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
