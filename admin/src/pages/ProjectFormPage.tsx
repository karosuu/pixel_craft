import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { deleteProject } from '../lib/crm';
import {
	formatMoney,
	paymentStatusLabels,
	projectBalance,
	projectStatusLabels,
	projectTypeLabels,
	suggestPaymentStatus,
} from '../lib/labels';
import { supabase } from '../lib/supabase';
import {
	CURRENCIES,
	PAYMENT_STATUSES,
	PROJECT_STATUSES,
	PROJECT_TYPES,
	type Client,
	type Currency,
	type PaymentStatus,
	type Project,
	type ProjectStatus,
	type ProjectType,
} from '../lib/types';

type FormState = {
	client_id: string;
	title: string;
	type: ProjectType;
	status: ProjectStatus;
	notes: string;
	due_date: string;
	follow_up_at: string;
	quoted_amount: string;
	deposit_amount: string;
	currency: Currency;
	payment_status: PaymentStatus;
};

function emptyForm(clientId: string): FormState {
	return {
		client_id: clientId,
		title: '',
		type: 'build',
		status: 'presupuesto',
		notes: '',
		due_date: '',
		follow_up_at: '',
		quoted_amount: '',
		deposit_amount: '',
		currency: 'USD',
		payment_status: 'pendiente',
	};
}

function parseAmount(value: string): number | null {
	const trimmed = value.trim();
	if (!trimmed) return null;
	const n = Number(trimmed);
	return Number.isFinite(n) ? n : NaN;
}

export function ProjectFormPage() {
	const { id } = useParams();
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const editing = Boolean(id && id !== 'nuevo');
	const [clients, setClients] = useState<Client[]>([]);
	const [form, setForm] = useState<FormState>(() => emptyForm(params.get('cliente') ?? ''));
	const [initialStatus, setInitialStatus] = useState<ProjectStatus | null>(null);
	const [projectTitle, setProjectTitle] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const paymentTouched = useRef(false);

	useEffect(() => {
		if (!supabase) return;
		void supabase
			.from('clients')
			.select('*')
			.order('name')
			.then(({ data, error: loadError }) => {
				if (loadError) setError(loadError.message);
				else setClients((data ?? []) as Client[]);
			});
	}, []);

	useEffect(() => {
		if (!editing || !supabase || !id) return;
		void supabase
			.from('projects')
			.select('*')
			.eq('id', id)
			.single()
			.then(({ data, error: loadError }) => {
				if (loadError) {
					setError(loadError.message);
					return;
				}
				const project = data as Project;
				paymentTouched.current = false;
				setInitialStatus(project.status);
				setProjectTitle(project.title);
				setForm({
					client_id: project.client_id,
					title: project.title,
					type: project.type,
					status: project.status,
					notes: project.notes ?? '',
					due_date: project.due_date ?? '',
					follow_up_at: project.follow_up_at ?? '',
					quoted_amount: project.quoted_amount != null ? String(project.quoted_amount) : '',
					deposit_amount: project.deposit_amount ? String(project.deposit_amount) : '',
					currency: project.currency ?? 'USD',
					payment_status: project.payment_status ?? 'pendiente',
				});
			});
	}, [editing, id]);

	function updateMoney(patch: Partial<Pick<FormState, 'quoted_amount' | 'deposit_amount'>>) {
		setForm((current) => {
			const next = { ...current, ...patch };
			if (!paymentTouched.current) {
				const quoted = parseAmount(next.quoted_amount);
				const deposit = parseAmount(next.deposit_amount) ?? 0;
				if (quoted != null && !Number.isNaN(quoted) && !Number.isNaN(deposit)) {
					next.payment_status = suggestPaymentStatus(quoted, deposit);
				}
			}
			return next;
		});
	}

	async function onSubmit(event: FormEvent) {
		event.preventDefault();
		if (!supabase) return;
		const quoted = parseAmount(form.quoted_amount);
		const deposit = parseAmount(form.deposit_amount) ?? 0;
		if (Number.isNaN(quoted) || Number.isNaN(deposit)) {
			setError('Revisa los montos: deben ser números válidos.');
			return;
		}
		if (quoted != null && deposit > quoted) {
			setError('El adelanto no puede superar el monto cotizado.');
			return;
		}

		setSaving(true);
		setError(null);
		const payload = {
			client_id: form.client_id,
			title: form.title.trim(),
			type: form.type,
			status: form.status,
			notes: form.notes.trim() || null,
			due_date: form.due_date || null,
			follow_up_at: form.follow_up_at || null,
			quoted_amount: quoted,
			deposit_amount: deposit,
			currency: form.currency,
			payment_status: form.payment_status,
			updated_at: new Date().toISOString(),
		};

		if (editing && id) {
			const result = await supabase.from('projects').update(payload).eq('id', id);
			if (result.error) {
				setSaving(false);
				setError(result.error.message);
				return;
			}
			if (initialStatus && initialStatus !== form.status) {
				await supabase.from('activities').insert({
					client_id: form.client_id,
					project_id: id,
					type: 'status_change',
					body: `${projectStatusLabels[initialStatus]} → ${projectStatusLabels[form.status]}`,
				});
			}
		} else {
			const result = await supabase.from('projects').insert(payload).select('id').single();
			if (result.error) {
				setSaving(false);
				setError(result.error.message);
				return;
			}
		}

		setSaving(false);
		navigate(form.client_id ? `/clientes/${form.client_id}` : '/proyectos');
	}

	async function confirmDelete() {
		if (!id) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteProject(id);
			navigate(form.client_id ? `/clientes/${form.client_id}` : '/proyectos');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar el proyecto.');
			setConfirmOpen(false);
			setDeleting(false);
		}
	}

	const quotedNum = parseAmount(form.quoted_amount);
	const depositNum = parseAmount(form.deposit_amount) ?? 0;
	const balance =
		quotedNum != null && !Number.isNaN(quotedNum) && !Number.isNaN(depositNum)
			? projectBalance(quotedNum, depositNum)
			: null;

	return (
		<div className="max-w-xl space-y-10">
			<div>
				<p className="text-sm">
					<Link to="/proyectos" className="text-cyan hover:underline">
						← Proyectos
					</Link>
				</p>
				<h1 className="mt-4 text-3xl font-bold">{editing ? 'Editar proyecto' : 'Nuevo proyecto'}</h1>
				<form onSubmit={(event) => void onSubmit(event)} className="mt-8 space-y-4">
					<label className="block text-sm font-medium">
						Cliente
						<select
							className="field"
							required
							value={form.client_id}
							onChange={(event) => setForm({ ...form, client_id: event.target.value })}
						>
							<option value="" disabled>
								Selecciona un cliente
							</option>
							{clients.map((client) => (
								<option key={client.id} value={client.id}>
									{client.name}
									{client.company ? ` · ${client.company}` : ''}
								</option>
							))}
						</select>
					</label>
					<label className="block text-sm font-medium">
						Título
						<input
							className="field"
							required
							value={form.title}
							onChange={(event) => setForm({ ...form, title: event.target.value })}
						/>
					</label>
					<label className="block text-sm font-medium">
						Tipo
						<select
							className="field"
							value={form.type}
							onChange={(event) => setForm({ ...form, type: event.target.value as ProjectType })}
						>
							{PROJECT_TYPES.map((type) => (
								<option key={type} value={type}>
									{projectTypeLabels[type]}
								</option>
							))}
						</select>
					</label>
					<label className="block text-sm font-medium">
						Estado
						<select
							className="field"
							value={form.status}
							onChange={(event) => setForm({ ...form, status: event.target.value as ProjectStatus })}
						>
							{PROJECT_STATUSES.map((status) => (
								<option key={status} value={status}>
									{projectStatusLabels[status]}
								</option>
							))}
						</select>
					</label>
					<div className="grid gap-4 sm:grid-cols-2">
						<label className="block text-sm font-medium">
							Fecha de entrega
							<input
								className="field"
								type="date"
								value={form.due_date}
								onChange={(event) => setForm({ ...form, due_date: event.target.value })}
							/>
						</label>
						<label className="block text-sm font-medium">
							Próximo follow-up
							<input
								className="field"
								type="date"
								value={form.follow_up_at}
								onChange={(event) => setForm({ ...form, follow_up_at: event.target.value })}
							/>
						</label>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<label className="block text-sm font-medium">
							Moneda
							<select
								className="field"
								value={form.currency}
								onChange={(event) => setForm({ ...form, currency: event.target.value as Currency })}
							>
								{CURRENCIES.map((currency) => (
									<option key={currency} value={currency}>
										{currency}
									</option>
								))}
							</select>
						</label>
						<label className="block text-sm font-medium">
							Estado de pago
							<select
								className="field"
								value={form.payment_status}
								onChange={(event) => {
									paymentTouched.current = true;
									setForm({ ...form, payment_status: event.target.value as PaymentStatus });
								}}
							>
								{PAYMENT_STATUSES.map((status) => (
									<option key={status} value={status}>
										{paymentStatusLabels[status]}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<label className="block text-sm font-medium">
							Monto cotizado
							<input
								className="field"
								type="number"
								min="0"
								step="0.01"
								value={form.quoted_amount}
								onChange={(event) => updateMoney({ quoted_amount: event.target.value })}
							/>
						</label>
						<label className="block text-sm font-medium">
							Adelanto
							<input
								className="field"
								type="number"
								min="0"
								step="0.01"
								value={form.deposit_amount}
								onChange={(event) => updateMoney({ deposit_amount: event.target.value })}
							/>
						</label>
					</div>
					{balance != null && (
						<p className="text-sm text-muted">
							Saldo: <span className="font-medium text-fg">{formatMoney(balance, form.currency)}</span>
						</p>
					)}
					<label className="block text-sm font-medium">
						Notas
						<textarea
							className="field"
							rows={4}
							value={form.notes}
							onChange={(event) => setForm({ ...form, notes: event.target.value })}
						/>
					</label>
					{error && <p className="text-sm text-red-400">{error}</p>}
					<div className="flex flex-wrap items-center gap-3">
						<button type="submit" disabled={saving || deleting} className="glow-btn rounded-full px-5 py-3 text-sm font-semibold">
							{saving ? 'Guardando…' : 'Guardar'}
						</button>
						{editing && (
							<button
								type="button"
								disabled={saving || deleting}
								className="danger-btn rounded-full px-5 py-3 text-sm font-semibold"
								onClick={() => setConfirmOpen(true)}
							>
								Eliminar proyecto
							</button>
						)}
					</div>
				</form>
			</div>

			{editing && id && form.client_id && (
				<ActivityTimeline
					clientId={form.client_id}
					projectId={id}
					projects={[{ id, title: projectTitle || form.title }]}
				/>
			)}

			<ConfirmDialog
				open={confirmOpen}
				title="Eliminar proyecto"
				description={`Se eliminará «${projectTitle || form.title || 'este proyecto'}». El historial de correos del cliente se conserva.`}
				busy={deleting}
				onCancel={() => {
					if (!deleting) setConfirmOpen(false);
				}}
				onConfirm={() => void confirmDelete()}
			/>
		</div>
	);
}
