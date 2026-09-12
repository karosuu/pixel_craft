import { useEffect, useState, type FormEvent } from 'react';
import { addActivity, updateActivity } from '../lib/crm';
import { activityTypeLabels, formatDate } from '../lib/labels';
import { supabase } from '../lib/supabase';
import type { Activity, ActivityType } from '../lib/types';

const QUICK_TYPES: ActivityType[] = ['note', 'call', 'whatsapp'];
const EDITABLE_TYPES = new Set<ActivityType>(QUICK_TYPES);

type ProjectOption = { id: string; title: string };

export function ActivityTimeline({
	clientId,
	projectId,
	projects = [],
}: {
	clientId: string;
	projectId?: string;
	projects?: ProjectOption[];
}) {
	const [items, setItems] = useState<Activity[]>([]);
	const [body, setBody] = useState('');
	const [type, setType] = useState<ActivityType>('note');
	const [selectedProjectId, setSelectedProjectId] = useState(projectId ?? '');
	const [error, setError] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editBody, setEditBody] = useState('');
	const [editSaving, setEditSaving] = useState(false);

	async function reload() {
		if (!supabase) return;
		let query = supabase.from('activities').select('*').eq('client_id', clientId).order('created_at', { ascending: false });
		if (projectId) query = query.eq('project_id', projectId);
		const { data, error: loadError } = await query;
		if (loadError) setError(loadError.message);
		else setItems((data ?? []) as Activity[]);
	}

	useEffect(() => {
		void reload();
	}, [clientId, projectId]);

	useEffect(() => {
		if (projectId) setSelectedProjectId(projectId);
	}, [projectId]);

	async function onSubmit(event: FormEvent) {
		event.preventDefault();
		if (!body.trim()) return;
		setSaving(true);
		setError(null);
		try {
			await addActivity({
				client_id: clientId,
				project_id: selectedProjectId || projectId || null,
				type,
				body: body.trim(),
			});
			setBody('');
			await reload();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo registrar la actividad.');
		} finally {
			setSaving(false);
		}
	}

	function startEdit(item: Activity) {
		setEditingId(item.id);
		setEditBody(item.body);
		setError(null);
	}

	function cancelEdit() {
		if (editSaving) return;
		setEditingId(null);
		setEditBody('');
	}

	async function saveEdit(item: Activity) {
		const next = editBody.trim();
		if (!next) {
			setError('La nota no puede quedar vacía.');
			return;
		}
		setEditSaving(true);
		setError(null);
		try {
			await updateActivity(item.id, next);
			setItems((current) => current.map((row) => (row.id === item.id ? { ...row, body: next } : row)));
			setEditingId(null);
			setEditBody('');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo guardar la nota.');
		} finally {
			setEditSaving(false);
		}
	}

	return (
		<section>
			<h2 className="text-xl font-semibold">Actividad</h2>
			<form onSubmit={(event) => void onSubmit(event)} className="mt-4 space-y-3 rounded-2xl border border-line bg-panel p-5">
				<div className="flex flex-wrap gap-2">
					{QUICK_TYPES.map((value) => (
						<button
							key={value}
							type="button"
							onClick={() => setType(value)}
							className={`rounded-full border px-3 py-1 text-xs font-medium ${
								type === value ? 'border-cyan bg-cyan/10 text-cyan' : 'border-line text-muted hover:text-fg'
							}`}
						>
							{activityTypeLabels[value]}
						</button>
					))}
				</div>
				{!projectId && projects.length > 0 && (
					<label className="block text-sm font-medium">
						Proyecto (opcional)
						<select
							className="field"
							value={selectedProjectId}
							onChange={(event) => setSelectedProjectId(event.target.value)}
						>
							<option value="">Sin proyecto</option>
							{projects.map((project) => (
								<option key={project.id} value={project.id}>
									{project.title}
								</option>
							))}
						</select>
					</label>
				)}
				<label className="block text-sm font-medium">
					Detalle
					<textarea
						className="field"
						rows={3}
						required
						value={body}
						onChange={(event) => setBody(event.target.value)}
						placeholder={
							type === 'call'
								? 'Resumen de la llamada…'
								: type === 'whatsapp'
									? 'Qué se escribió por WhatsApp…'
									: 'Nota interna…'
						}
					/>
				</label>
				{error && <p className="text-sm text-red-400">{error}</p>}
				<button type="submit" disabled={saving} className="glow-btn rounded-full px-4 py-2 text-sm font-semibold">
					{saving ? 'Guardando…' : 'Registrar'}
				</button>
			</form>

			<ul className="mt-4 space-y-3">
				{items.length === 0 && <li className="text-sm text-muted">Sin actividad todavía.</li>}
				{items.map((item) => {
					const canEdit = EDITABLE_TYPES.has(item.type);
					const editing = editingId === item.id;
					const editLabel = item.type === 'note' ? 'Editar nota' : 'Editar';
					return (
						<li key={item.id} className="rounded-2xl border border-line bg-panel p-4">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<span className="text-xs font-semibold uppercase tracking-wider text-cyan">
									{activityTypeLabels[item.type]}
								</span>
								<div className="flex flex-wrap items-center gap-3">
									<span className="text-xs text-muted">{formatDate(item.created_at)}</span>
									{canEdit && !editing && (
										<button
											type="button"
											className="text-[11px] leading-none text-cyan hover:underline"
											onClick={() => startEdit(item)}
										>
											{editLabel}
										</button>
									)}
								</div>
							</div>
							{editing ? (
								<div className="mt-3 space-y-3">
									<textarea
										className="field mt-0"
										rows={4}
										autoFocus
										value={editBody}
										onChange={(event) => setEditBody(event.target.value)}
										onKeyDown={(event) => {
											if (event.key === 'Escape') cancelEdit();
										}}
									/>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											disabled={editSaving}
											className="glow-btn rounded-full px-4 py-2 text-sm font-semibold"
											onClick={() => void saveEdit(item)}
										>
											{editSaving ? 'Guardando…' : 'Guardar'}
										</button>
										<button
											type="button"
											disabled={editSaving}
											className="ghost-btn rounded-full px-4 py-2 text-sm font-medium"
											onClick={cancelEdit}
										>
											Cancelar
										</button>
									</div>
								</div>
							) : (
								<p className="mt-2 whitespace-pre-wrap text-sm">{item.body}</p>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
