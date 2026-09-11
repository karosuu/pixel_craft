import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const { configured, loading, isAdmin } = useAuth();

	if (!configured) {
		return (
			<main className="mx-auto max-w-lg px-4 py-16">
				<h1 className="text-2xl font-bold">Falta configurar Supabase</h1>
				<p className="mt-3 text-muted">
					Copia <code className="text-cyan">admin/.env.example</code> a{' '}
					<code className="text-cyan">admin/.env</code> y pega la URL y la anon key del proyecto.
				</p>
			</main>
		);
	}

	if (loading) {
		return <p className="px-6 py-16 text-muted">Cargando…</p>;
	}

	if (!isAdmin) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
