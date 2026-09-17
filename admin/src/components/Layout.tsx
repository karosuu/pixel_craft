import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LeadNotificationProvider } from '../context/LeadNotificationContext';
import { BrandLogo } from './BrandLogo';
import { LeadNotifications } from './LeadNotifications';
import { ThemeToggle } from './ThemeToggle';

const links = [
	{ to: '/', label: 'Resumen' },
	{ to: '/clientes', label: 'Clientes' },
	{ to: '/proyectos', label: 'Proyectos' },
];

export function Layout() {
	const { user, signOut } = useAuth();

	return (
		<LeadNotificationProvider>
			<div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
				<aside className="flex flex-col border-b border-line bg-page-soft px-4 py-5 md:border-b-0 md:border-r">
					<div>
						<BrandLogo />
						<p className="mt-2 text-sm font-semibold text-muted">Admin</p>
					</div>
					<nav className="mt-6 flex gap-2 md:flex-col">
						{links.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === '/'}
								className={({ isActive }) =>
									`rounded-lg px-3 py-2 text-sm font-medium ${
										isActive ? 'bg-panel text-cyan' : 'text-muted hover:bg-panel hover:text-fg'
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
					</nav>
					<div className="mt-6 hidden border-t border-line pt-4 md:mt-auto md:block">
						<ThemeToggle />
						<p className="mt-4 truncate text-xs text-muted">{user?.email}</p>
						<button
							type="button"
							onClick={() => void signOut()}
							className="mt-3 text-sm text-muted hover:text-cyan"
						>
							Cerrar sesión
						</button>
					</div>
				</aside>
				<div className="flex min-w-0 flex-col">
					<div className="flex items-center justify-end gap-2 border-b border-line px-4 py-3">
						<LeadNotifications />
						<div className="flex items-center gap-2 md:hidden">
							<ThemeToggle compact />
							<p className="truncate text-xs text-muted">{user?.email}</p>
							<button type="button" onClick={() => void signOut()} className="text-sm text-cyan">
								Salir
							</button>
						</div>
					</div>
					<main className="flex-1 px-4 py-8 sm:px-8">
						<Outlet />
					</main>
				</div>
			</div>
		</LeadNotificationProvider>
	);
}
