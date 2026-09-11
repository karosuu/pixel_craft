import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, formatDateOnly } from '../lib/labels';
import { supabase } from '../lib/supabase';
import { ACTIVE_PROJECT_STATUSES, type EmailRow, type Project, type ProjectStatus } from '../lib/types';

type Counts = Record<ProjectStatus, number>;

const emptyCounts: Counts = {
	presupuesto: 0,
	en_curso: 0,
	cancelacion_pendiente: 0,
	entregado: 0,
	cancelado: 0,
};

type ProjectRow = Project & {
	clients: Project['clients'] | Project['clients'][] | null;
};

function clientOf(row: ProjectRow) {
	const related = row.clients;
	if (!related) return undefined;
	return Array.isArray(related) ? related[0] : related;
}

function todayIso() {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, '0');
	const d = String(now.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

function addDaysIso(base: string, days: number) {
	const date = new Date(`${base}T12:00:00`);
	date.setDate(date.getDate() + days);
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

function isActive(status: ProjectStatus) {
	return (ACTIVE_PROJECT_STATUSES as readonly string[]).includes(status);
}

export function DashboardPage() {
	const [clientCount, setClientCount] = useState(0);
	const [counts, setCounts] = useState<Counts>(emptyCounts);
	const [projects, setProjects] = useState<Project[]>([]);
	const [recentEmails, setRecentEmails] = useState<EmailRow[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!supabase) return;
		let cancelled = false;

		async function load() {
			const [clients, projectRes, emails] = await Promise.all([
				supabase!.from('clients').select('id', { count: 'exact', head: true }),
				supabase!
					.from('projects')
					.select('*, clients(id, name, company, last_outbound_at)')
					.order('created_at', { ascending: false }),
				supabase!.from('emails').select('*').order('sent_at', { ascending: false }).limit(5),
			]);

			if (cancelled) return;
			const firstError = clients.error || projectRes.error || emails.error;
			if (firstError) {
				setError(firstError.message);
				return;
			}

			const next = { ...emptyCounts };
			const mapped = ((projectRes.data ?? []) as ProjectRow[]).map((project) => ({
				...project,
				clients: clientOf(project),
			}));
			for (const project of mapped) {
				next[project.status] += 1;
			}
			setClientCount(clients.count ?? 0);
			setCounts(next);
			setProjects(mapped);
			setRecentEmails((emails.data ?? []) as EmailRow[]);
		}

		void load();
		return () => {
			cancelled = true;
		};
	}, []);

	const queues = useMemo(() => {
		const today = todayIso();
		const weekEnd = addDaysIso(today, 7);
		const cutoff = new Date();
		cutoff.setDate(cutoff.getDate() - 7);
		const cutoffMs = cutoff.getTime();

		const overdue: Project[] = [];
		const thisWeek: Project[] = [];
		const noContact: Project[] = [];
		const seenWeek = new Set<string>();
		const seenContact = new Set<string>();

		for (const project of projects) {
			if (!isActive(project.status)) continue;

			if (project.due_date && project.due_date < today) {
				overdue.push(project);
			}

			const dueSoon = project.due_date && project.due_date >= today && project.due_date <= weekEnd;
			const followDue = project.follow_up_at && project.follow_up_at <= today;
			if ((dueSoon || followDue) && !seenWeek.has(project.id)) {
				seenWeek.add(project.id);
				thisWeek.push(project);
			}

			const last = project.clients?.last_outbound_at;
			const stale = !last || new Date(last).getTime() < cutoffMs;
			if (stale && !seenContact.has(project.id)) {
				seenContact.add(project.id);
				noContact.push(project);
			}
		}

		overdue.sort((a, b) => (a.due_date ?? '').localeCompare(b.due_date ?? ''));
		thisWeek.sort((a, b) => (a.follow_up_at ?? a.due_date ?? '').localeCompare(b.follow_up_at ?? b.due_date ?? ''));
		return { overdue, thisWeek, noContact };
	}, [projects]);

	const recentProjects = projects.slice(0, 5);

	return (
		<div>
			<h1 className="text-3xl font-bold">Resumen</h1>
			{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
			<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<StatCard label="Clientes" value={clientCount} />
				<StatCard label="Presupuesto" value={counts.presupuesto} />
				<StatCard label="En curso" value={counts.en_curso} />
				<StatCard label="Cancelación pendiente" value={counts.cancelacion_pendiente} />
				<StatCard label="Entregados" value={counts.entregado} />
				<StatCard label="Cancelados" value={counts.cancelado} />
			</div>

			<div className="mt-10 grid gap-8 lg:grid-cols-3">
				<QueueCard
					title="Vencidos"
					empty="Nada vencido."
					items={queues.overdue}
					detail={(project) => `Entrega ${formatDateOnly(project.due_date)}`}
				/>
				<QueueCard
					title="Esta semana / follow-ups"
					empty="Sin entregas ni follow-ups pendientes."
					items={queues.thisWeek}
					detail={(project) => {
						const bits = [];
						if (project.due_date) bits.push(`Entrega ${formatDateOnly(project.due_date)}`);
						if (project.follow_up_at) bits.push(`Follow-up ${formatDateOnly(project.follow_up_at)}`);
						return bits.join(' · ') || '—';
					}}
				/>
				<QueueCard
					title="Sin contacto (7 días)"
					empty="Todos los activos tienen contacto reciente."
					items={queues.noContact}
					detail={(project) => {
						const last = project.clients?.last_outbound_at;
						return last ? `Último contacto ${formatDate(last)}` : 'Sin contacto saliente';
					}}
				/>
			</div>

			<div className="mt-10 grid gap-8 lg:grid-cols-2">
				<section>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold">Proyectos recientes</h2>
						<Link to="/proyectos" className="text-sm text-cyan hover:underline">
							Ver todos
						</Link>
					</div>
					<ul className="mt-4 space-y-3">
						{recentProjects.length === 0 && <li className="text-sm text-muted">Aún no hay proyectos.</li>}
						{recentProjects.map((project) => (
							<li key={project.id} className="rounded-2xl border border-line bg-panel p-4">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="font-medium">{project.title}</p>
										<p className="text-sm text-muted">
											{project.clients?.company || project.clients?.name || 'Sin cliente'}
										</p>
									</div>
									<StatusBadge status={project.status} />
								</div>
							</li>
						))}
					</ul>
				</section>
				<section>
					<h2 className="text-lg font-semibold">Últimos correos</h2>
					<ul className="mt-4 space-y-3">
						{recentEmails.length === 0 && <li className="text-sm text-muted">Aún no hay correos enviados.</li>}
						{recentEmails.map((email) => (
							<li key={email.id} className="rounded-2xl border border-line bg-panel p-4">
								<p className="font-medium">{email.subject}</p>
								<p className="text-sm text-muted">
									{email.to_email} · {formatDate(email.sent_at)}
								</p>
								<p className={`mt-1 text-xs ${email.status === 'sent' ? 'text-cyan' : 'text-red-400'}`}>
									{email.status === 'sent' ? 'Enviado' : 'Falló'}
								</p>
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-2xl border border-line bg-panel p-5">
			<p className="text-xs font-semibold uppercase tracking-widest text-cyan">{label}</p>
			<p className="mt-2 text-3xl font-bold">{value}</p>
		</div>
	);
}

function QueueCard({
	title,
	empty,
	items,
	detail,
}: {
	title: string;
	empty: string;
	items: Project[];
	detail: (project: Project) => string;
}) {
	return (
		<section>
			<div className="flex items-center justify-between gap-2">
				<h2 className="text-lg font-semibold">{title}</h2>
				<span className="text-sm text-muted">{items.length}</span>
			</div>
			<ul className="mt-4 space-y-3">
				{items.length === 0 && <li className="text-sm text-muted">{empty}</li>}
				{items.slice(0, 8).map((project) => (
					<li key={project.id} className="rounded-2xl border border-line bg-panel p-4">
						<div className="flex items-start justify-between gap-3">
							<div>
								<Link to={`/proyectos/${project.id}/editar`} className="font-medium text-cyan hover:underline">
									{project.title}
								</Link>
								{project.clients && (
									<p className="text-sm text-muted">
										<Link to={`/clientes/${project.clients.id}`} className="hover:underline">
											{project.clients.company || project.clients.name}
										</Link>
									</p>
								)}
								<p className="mt-1 text-xs text-muted">{detail(project)}</p>
							</div>
							<StatusBadge status={project.status} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
