import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { deleteClient } from '../lib/crm';
import { supabase } from '../lib/supabase';
import type { Client } from '../lib/types';

const empty = {
	name: '',
	company: '',
	email: '',
	phone: '',
	website: '',
	notes: '',
};

export function ClientFormPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const editing = Boolean(id && id !== 'nuevo');
	const [form, setForm] = useState(empty);
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!editing || !supabase || !id) return;
		supabase
			.from('clients')
			.select('*')
			.eq('id', id)
			.single()
			.then(({ data, error: loadError }) => {
				if (loadError) {
					setError(loadError.message);
					return;
				}
				const client = data as Client;
				setForm({
					name: client.name,
					company: client.company ?? '',
					email: client.email ?? '',
					phone: client.phone ?? '',
					website: client.website ?? '',
					notes: client.notes ?? '',
				});
			});
	}, [editing, id]);

	async function onSubmit(event: FormEvent) {
		event.preventDefault();
		if (!supabase) return;
		setSaving(true);
		setError(null);
		const payload = {
			name: form.name.trim(),
			company: form.company.trim() || null,
			email: form.email.trim() || null,
			phone: form.phone.trim() || null,
			website: form.website.trim() || null,
			notes: form.notes.trim() || null,
			updated_at: new Date().toISOString(),
		};
		const query = editing
			? supabase.from('clients').update(payload).eq('id', id)
			: supabase.from('clients').insert(payload).select('id').single();
		const { data, error: saveError } = await query;
		setSaving(false);
		if (saveError) {
			setError(saveError.message);
			return;
		}
		const nextId = editing ? id : (data as { id: string }).id;
		navigate(`/clientes/${nextId}`);
	}

	async function confirmDelete() {
		if (!id) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteClient(id);
			navigate('/clientes');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar el cliente.');
			setConfirmOpen(false);
			setDeleting(false);
		}
	}

	return (
		<div className="max-w-xl">
			<p className="text-sm">
				<Link to="/clientes" className="text-cyan hover:underline">
					← Clientes
				</Link>
			</p>
			<h1 className="mt-4 text-3xl font-bold">{editing ? 'Editar cliente' : 'Nuevo cliente'}</h1>
			<form onSubmit={(event) => void onSubmit(event)} className="mt-8 space-y-4">
				<Field label="Nombre" required value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
				<Field label="Empresa" value={form.company} onChange={(value) => setForm({ ...form, company: value })} />
				<Field
					label="Correo"
					type="email"
					value={form.email}
					onChange={(value) => setForm({ ...form, email: value })}
				/>
				<Field label="Teléfono" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
				<Field label="Sitio web" value={form.website} onChange={(value) => setForm({ ...form, website: value })} />
				<label className="block text-sm font-medium">
					Notas
					<textarea className="field" rows={4} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
				</label>
				{error && <p className="text-sm text-red-400">{error}</p>}
				<div className="flex flex-wrap items-center gap-3">
					<button
						type="submit"
						disabled={saving || deleting}
						className="glow-btn rounded-full px-5 py-3 text-sm font-semibold"
					>
						{saving ? 'Guardando…' : 'Guardar'}
					</button>
					{editing && (
						<button
							type="button"
							disabled={saving || deleting}
							className="danger-btn rounded-full px-5 py-3 text-sm font-semibold"
							onClick={() => setConfirmOpen(true)}
						>
							Eliminar cliente
						</button>
					)}
				</div>
			</form>
			<ConfirmDialog
				open={confirmOpen}
				title="Eliminar cliente"
				description={`Se eliminará a ${form.name || 'este cliente'} y todos sus proyectos, correos y actividad. Esta acción no se puede deshacer.`}
				busy={deleting}
				onCancel={() => {
					if (!deleting) setConfirmOpen(false);
				}}
				onConfirm={() => void confirmDelete()}
			/>
		</div>
	);
}

function Field({
	label,
	value,
	onChange,
	type = 'text',
	required = false,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	type?: string;
	required?: boolean;
}) {
	return (
		<label className="block text-sm font-medium">
			{label}
			<input className="field" type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} />
		</label>
	);
}
