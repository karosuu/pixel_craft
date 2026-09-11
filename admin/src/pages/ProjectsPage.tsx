import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { PaymentBadge, StatusBadge } from '../components/StatusBadge';
import { deleteProject } from '../lib/crm';
import { formatDateOnly, formatMoney, projectBalance, projectStatusLabels, projectTypeLabels } from '../lib/labels';
import { supabase } from '../lib/supabase';
import { PROJECT_STATUSES, type Project, type ProjectStatus } from '../lib/types';

type ProjectRow = Project & {
	clients: Project['clients'] | Project['clients'][] | null;
};

function clientOf(row: ProjectRow) {
	const related = row.clients;
	if (!related) return undefined;
	return Array.isArray(related) ? related[0] : related;
}

export function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [status, setStatus] = useState<ProjectStatus | ''>('');
	const [query, setQuery] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState<Project | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!supabase) return;
		supabase
			.from('projects')
			.select('*, clients(id, name, company)')
			.order('created_at', { ascending: false })
			.then(({ data, error: loadError }) => {
				if (loadError) setError(loadError.message);
				else setProjects(((data ?? []) as ProjectRow[]).map((project) => ({ ...project, clients: clientOf(project) })));
			});
	}, []);

	const filtered = useMemo(() => {
		return projects.filter((project) => {
			if (status && project.status !== status) return false;
			const needle = query.trim().toLowerCase();
			if (!needle) return true;
			const haystack = [project.title, project.clients?.name, project.clients?.company]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();
			return haystack.includes(needle);
		});
	}, [projects, query, status]);

	async function confirmDelete() {
		if (!pending) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteProject(pending.id);
			setProjects((current) => current.filter((project) => project.id !== pending.id));
			setPending(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar el proyecto.');
			setPending(null);
		} finally {
			setDeleting(false);
		}
	}

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h1 className="text-3xl font-bold">Proyectos</h1>
				<Link to="/proyectos/nuevo" className="glow-btn rounded-full px-4 py-2 text-sm font-semibold">
					Nuevo proyecto
				</Link>
			</div>
			<div className="mt-6 flex flex-wrap gap-3">
				<input
					className="field max-w-sm"
					placeholder="Buscar proyecto o cliente"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<select
					className="field max-w-xs"
					value={status}
					onChange={(event) => setStatus(event.target.value as ProjectStatus | '')}
				>
					<option value="">Todos los estados</option>
					{PROJECT_STATUSES.map((value) => (
						<option key={value} value={value}>
							{projectStatusLabels[value]}
						</option>
					))}
				</select>
			</div>
			{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
			<div className="mt-6 overflow-x-auto rounded-2xl border border-line">
				<table className="min-w-full text-left text-sm">
					<thead className="bg-page-soft text-xs uppercase tracking-wider text-muted">
						<tr>
							<th className="px-4 py-3">Proyecto</th>
							<th className="px-4 py-3">Cliente</th>
							<th className="px-4 py-3">Tipo</th>
							<th className="px-4 py-3">Entrega</th>
							<th className="px-4 py-3">Follow-up</th>
							<th className="px-4 py-3">Monto</th>
							<th className="px-4 py-3">Estado</th>
							<th className="px-4 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 && (
							<tr>
								<td className="px-4 py-6 text-muted" colSpan={8}>
									No hay proyectos.
								</td>
							</tr>
						)}
						{filtered.map((project) => {
							const balance = projectBalance(project.quoted_amount, project.deposit_amount);
							return (
								<tr key={project.id} className="border-t border-line">
									<td className="px-4 py-3">
										<Link to={`/proyectos/${project.id}/editar`} className="font-medium text-cyan hover:underline">
											{project.title}
										</Link>
									</td>
									<td className="px-4 py-3">
										{project.clients ? (
											<Link to={`/clientes/${project.clients.id}`} className="hover:underline">
												{project.clients.company || project.clients.name}
											</Link>
										) : (
											'—'
										)}
									</td>
									<td className="px-4 py-3 text-muted">{projectTypeLabels[project.type]}</td>
									<td className="px-4 py-3 text-muted">{formatDateOnly(project.due_date)}</td>
									<td className="px-4 py-3 text-muted">{formatDateOnly(project.follow_up_at)}</td>
									<td className="px-4 py-3">
										<div className="space-y-1">
											<p>{formatMoney(project.quoted_amount, project.currency)}</p>
											{balance != null && (
												<p className="text-xs text-muted">Saldo {formatMoney(balance, project.currency)}</p>
											)}
											{project.quoted_amount != null && <PaymentBadge status={project.payment_status} />}
										</div>
									</td>
									<td className="px-4 py-3">
										<StatusBadge status={project.status} />
									</td>
									<td className="px-4 py-3 text-right">
										<button
											type="button"
											className="text-sm text-red-400 hover:underline"
											onClick={() => setPending(project)}
										>
											Eliminar
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<ConfirmDialog
				open={pending !== null}
				title="Eliminar proyecto"
				description={`Se eliminará «${pending?.title ?? 'este proyecto'}». El historial de correos del cliente se conserva.`}
				busy={deleting}
				onCancel={() => {
					if (!deleting) setPending(null);
				}}
				onConfirm={() => void confirmDelete()}
			/>
		</div>
	);
}
