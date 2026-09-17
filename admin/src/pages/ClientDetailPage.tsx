import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { EmailComposer } from '../components/EmailComposer';
import { PaymentBadge, StatusBadge } from '../components/StatusBadge';
import { useLeadNotifications } from '../context/LeadNotificationContext';
import { deleteClient, deleteProject, promoteProjectNotes } from '../lib/crm';
import { sanitizeEmailHtml } from '../lib/emailHtml';
import {
	emailStatusLabels,
	formatDate,
	formatDateOnly,
	formatMoney,
	projectBalance,
	projectSourceLabels,
	projectTypeLabels,
} from '../lib/labels';
import { supabase } from '../lib/supabase';
import type { Client, EmailRow, Project } from '../lib/types';

type PendingDelete =
	| { kind: 'client' }
	| { kind: 'project'; id: string; title: string };

export function ClientDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { markClientLeadsSeen } = useLeadNotifications();
	const [client, setClient] = useState<Client | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [emails, setEmails] = useState<EmailRow[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [timelineKey, setTimelineKey] = useState(0);
	const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
	const [deleting, setDeleting] = useState(false);

	async function reload() {
		if (!supabase || !id) return;
		const [clientRes, projectRes, emailRes] = await Promise.all([
			supabase.from('clients').select('*').eq('id', id).single(),
			supabase.from('projects').select('*').eq('client_id', id).order('created_at', { ascending: false }),
			supabase.from('emails').select('*').eq('client_id', id).order('sent_at', { ascending: false }),
		]);
		const firstError = clientRes.error || projectRes.error || emailRes.error;
		if (firstError) {
			setError(firstError.message);
			return;
		}
		const nextProjects = (projectRes.data ?? []) as Project[];
		for (const project of nextProjects) {
			if (!project.notes?.trim()) continue;
			try {
				await promoteProjectNotes(project);
				project.notes = null;
			} catch (err) {
				setError(err instanceof Error ? err.message : 'No se pudo pasar una nota al historial.');
			}
		}
		setClient(clientRes.data as Client);
		setProjects(nextProjects);
		setEmails((emailRes.data ?? []) as EmailRow[]);
		setTimelineKey((value) => value + 1);
	}

	useEffect(() => {
		void reload();
	}, [id]);

	useEffect(() => {
		if (id) markClientLeadsSeen(id);
	}, [id, markClientLeadsSeen]);

	async function confirmDelete() {
		if (!pendingDelete || !client) return;
		setDeleting(true);
		setError(null);
		try {
			if (pendingDelete.kind === 'client') {
				await deleteClient(client.id);
				navigate('/clientes');
				return;
			}
			await deleteProject(pendingDelete.id);
			setPendingDelete(null);
			await reload();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar.');
			setPendingDelete(null);
		} finally {
			setDeleting(false);
		}
	}

	if (error && !client) {
		return <p className="text-red-400">{error}</p>;
	}
	if (!client) {
		return <p className="text-muted">Cargando…</p>;
	}

	return (
		<div className="space-y-10">
			<div>
				<p className="text-sm">
					<Link to="/clientes" className="text-cyan hover:underline">
						← Clientes
					</Link>
				</p>
				<div className="mt-4 flex flex-wrap items-start justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold">{client.name}</h1>
						{client.company && <p className="mt-1 text-muted">{client.company}</p>}
					</div>
					<div className="flex flex-wrap items-center gap-3">
						{client.phone && (
							<a
								href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
								target="_blank"
								rel="noreferrer"
								className="text-sm text-cyan hover:underline"
							>
								WhatsApp
							</a>
						)}
						<Link to={`/clientes/${client.id}/editar`} className="text-sm text-cyan hover:underline">
							Editar ficha
						</Link>
						<button
							type="button"
							className="text-sm text-red-400 hover:underline"
							onClick={() => setPendingDelete({ kind: 'client' })}
						>
							Eliminar cliente
						</button>
					</div>
				</div>
				<dl className="mt-6 grid gap-4 sm:grid-cols-2">
					<Info label="Correo" value={client.email} />
					<Info label="Teléfono" value={client.phone} />
					<Info label="Sitio web" value={client.website} />
					<Info
						label="Último contacto saliente"
						value={client.last_outbound_at ? formatDate(client.last_outbound_at) : null}
					/>
					<Info label="Notas" value={client.notes} />
				</dl>
				{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
			</div>

			<section>
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-xl font-semibold">Proyectos</h2>
					<Link
						to={`/proyectos/nuevo?cliente=${client.id}`}
						className="glow-btn rounded-full px-4 py-2 text-sm font-semibold"
					>
						Nuevo proyecto
					</Link>
				</div>
				<ul className="mt-4 space-y-3">
					{projects.length === 0 && <li className="text-sm text-muted">Sin proyectos todavía.</li>}
					{projects.map((project) => {
						const balance = projectBalance(project.quoted_amount, project.deposit_amount);
						return (
							<li key={project.id} className="rounded-2xl border border-line bg-panel p-4">
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<p className="font-medium">{project.title}</p>
										<p className="text-sm text-muted">
											{projectTypeLabels[project.type]}
											{project.source === 'web' ? ` · ${projectSourceLabels.web}` : ''}
										</p>
										<p className="mt-1 text-sm text-muted">
											Entrega {formatDateOnly(project.due_date)} · Follow-up {formatDateOnly(project.follow_up_at)}
										</p>
										{project.quoted_amount != null && (
											<p className="mt-1 text-sm text-muted">
												{formatMoney(project.quoted_amount, project.currency)}
												{balance != null ? ` · saldo ${formatMoney(balance, project.currency)}` : ''}
											</p>
										)}
									</div>
									<div className="flex flex-wrap gap-2">
										<StatusBadge status={project.status} />
										{project.quoted_amount != null && <PaymentBadge status={project.payment_status} />}
									</div>
								</div>
								<div className="mt-3 flex flex-wrap items-center gap-4">
									<Link
										to={`/proyectos/${project.id}/editar`}
										className="text-sm text-cyan hover:underline"
									>
										Editar
									</Link>
									<button
										type="button"
										className="text-sm text-red-400 hover:underline"
										onClick={() => setPendingDelete({ kind: 'project', id: project.id, title: project.title })}
									>
										Eliminar
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			</section>

			<ActivityTimeline
				key={timelineKey}
				clientId={client.id}
				projects={projects.map((project) => ({ id: project.id, title: project.title }))}
			/>

			<EmailComposer client={client} projects={projects} onSent={() => void reload()} />

			<section>
				<h2 className="text-xl font-semibold">Historial de correos</h2>
				<ul className="mt-4 space-y-3">
					{emails.length === 0 && <li className="text-sm text-muted">Aún no se ha enviado ningún correo.</li>}
					{emails.map((email) => (
						<li key={email.id} className="rounded-2xl border border-line bg-panel p-4">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<p className="font-medium">{email.subject}</p>
								<span className={email.status === 'sent' ? 'text-xs text-cyan' : 'text-xs text-red-400'}>
									{emailStatusLabels[email.status]}
								</span>
							</div>
							<p className="mt-1 text-sm text-muted">
								Para {email.to_email} · {formatDate(email.sent_at)}
							</p>
							<div className="email-html mt-3 text-sm" dangerouslySetInnerHTML={{ __html: sanitizeEmailHtml(email.body) }} />
							{email.attachments && email.attachments.length > 0 && (
								<ul className="mt-3 text-sm text-muted">
									{email.attachments.map((file) => (
										<li key={file.path}>Adjunto: {file.name}</li>
									))}
								</ul>
							)}
							{email.error && <p className="mt-2 text-sm text-red-400">{email.error}</p>}
						</li>
					))}
				</ul>
			</section>

			<ConfirmDialog
				open={pendingDelete !== null}
				title={pendingDelete?.kind === 'project' ? 'Eliminar proyecto' : 'Eliminar cliente'}
				description={
					pendingDelete?.kind === 'project'
						? `Se eliminará «${pendingDelete.title}». El historial de correos del cliente se conserva.`
						: `Se eliminará a ${client.name} y todos sus proyectos, correos y actividad. Esta acción no se puede deshacer.`
				}
				busy={deleting}
				onCancel={() => {
					if (!deleting) setPendingDelete(null);
				}}
				onConfirm={() => void confirmDelete()}
			/>
		</div>
	);
}

function Info({ label, value }: { label: string; value: string | null }) {
	return (
		<div className="rounded-2xl border border-line bg-panel p-4">
			<dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
			<dd className="mt-1 break-words">{value || '—'}</dd>
		</div>
	);
}
