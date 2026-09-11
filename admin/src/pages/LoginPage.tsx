import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
	const { configured, isAdmin, loading, error, signIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	if (!configured) {
		return (
			<main className="mx-auto max-w-lg px-4 py-16">
				<h1 className="text-2xl font-bold">Falta configurar Supabase</h1>
				<p className="mt-3 text-muted">
					Copia <code className="text-cyan">.env.example</code> a <code className="text-cyan">.env</code> en la
					carpeta <code className="text-cyan">admin</code>.
				</p>
			</main>
		);
	}

	if (!loading && isAdmin) {
		return <Navigate to="/" replace />;
	}

	async function onSubmit(event: FormEvent) {
		event.preventDefault();
		setSubmitting(true);
		setFormError(null);
		const message = await signIn(email, password);
		if (message) setFormError(message);
		setSubmitting(false);
	}

	return (
		<main className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
			<div className="absolute right-4 top-4">
				<ThemeToggle compact />
			</div>
			<BrandLogo />
			<h1 className="mt-6 text-3xl font-bold">Entrar al admin</h1>
			<p className="mt-2 text-muted">Solo para el administrador. El sitio público no enlaza aquí.</p>
			<form onSubmit={(event) => void onSubmit(event)} className="mt-8 space-y-4">
				<label className="block text-sm font-medium">
					Correo
					<input
						className="field"
						type="email"
						autoComplete="email"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</label>
				<label className="block text-sm font-medium">
					Contraseña
					<input
						className="field"
						type="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</label>
				{(formError || error) && <p className="text-sm text-red-400">{formError || error}</p>}
				<button
					type="submit"
					disabled={submitting || loading}
					className="glow-btn w-full rounded-full px-5 py-3 text-sm font-semibold"
				>
					{submitting ? 'Entrando…' : 'Entrar'}
				</button>
			</form>
		</main>
	);
}
