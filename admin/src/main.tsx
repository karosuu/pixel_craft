import { Component, StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;

class BootErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
	state = { error: null as string | null };

	static getDerivedStateFromError(error: unknown) {
		return { error: error instanceof Error ? error.message : String(error) };
	}

	render() {
		if (this.state.error) {
			return (
				<main className="mx-auto max-w-lg px-4 py-16">
					<h1 className="text-2xl font-bold">No se pudo cargar el admin</h1>
					<p className="mt-3 text-muted">{this.state.error}</p>
				</main>
			);
		}
		return this.props.children;
	}
}

const rootEl = document.getElementById('root');
if (!rootEl) {
	throw new Error('Missing #root');
}

try {
	rootEl.setAttribute('data-ready', '1');
	createRoot(rootEl).render(
		<StrictMode>
			<BootErrorBoundary>
				<ThemeProvider>
					<BrowserRouter basename={basename}>
						<AuthProvider>
							<App />
						</AuthProvider>
					</BrowserRouter>
				</ThemeProvider>
			</BootErrorBoundary>
		</StrictMode>,
	);
} catch (error) {
	rootEl.innerHTML = `<main style="padding:4rem 1.5rem;color:#fff;font-family:Outfit,sans-serif"><h1>No se pudo cargar el admin</h1><p>${
		error instanceof Error ? error.message : String(error)
	}</p></main>`;
}
