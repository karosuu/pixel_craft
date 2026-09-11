import { useEffect, useRef, useState, type FormEvent } from 'react';
import { htmlToText, isEmptyHtml, sanitizeEmailHtml } from '../lib/emailHtml';
import { EMAIL_TEMPLATES, fillEmailTemplate, type EmailTemplateId } from '../lib/emailTemplates';
import { supabase } from '../lib/supabase';
import type { Client, EmailAttachment, Project } from '../lib/types';
import { RichTextEditor } from './RichTextEditor';

const MAX_FILES = 4;
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
	'application/pdf',
	'image/png',
	'image/jpeg',
	'image/webp',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function safeName(name: string) {
	return name.replace(/[^\w.\-]+/g, '_').slice(0, 80) || 'archivo';
}

export function EmailComposer({
	client,
	projects,
	onSent,
}: {
	client: Client;
	projects: Project[];
	onSent: () => void;
}) {
	const [toEmail, setToEmail] = useState(client.email ?? '');
	const [projectId, setProjectId] = useState('');
	const [templateId, setTemplateId] = useState<EmailTemplateId | ''>('');
	const [subject, setSubject] = useState('');
	const [body, setBody] = useState('');
	const [files, setFiles] = useState<File[]>([]);
	const [sending, setSending] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const fileInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setToEmail(client.email ?? '');
	}, [client.email]);

	function applyTemplate(id: EmailTemplateId | '') {
		setTemplateId(id);
		if (!id) return;
		const template = EMAIL_TEMPLATES.find((item) => item.id === id);
		if (!template) return;
		const project = projects.find((item) => item.id === projectId) ?? null;
		const filled = fillEmailTemplate(template, client, project);
		setSubject(filled.subject);
		setBody(filled.body);
	}

	function onProjectChange(nextId: string) {
		setProjectId(nextId);
		if (!templateId) return;
		const template = EMAIL_TEMPLATES.find((item) => item.id === templateId);
		if (!template) return;
		const project = projects.find((item) => item.id === nextId) ?? null;
		const filled = fillEmailTemplate(template, client, project);
		setSubject(filled.subject);
		setBody(filled.body);
	}

	function addFiles(list: FileList | null) {
		if (!list) return;
		const next = [...files];
		for (const file of Array.from(list)) {
			if (next.length >= MAX_FILES) {
				setError(`Máximo ${MAX_FILES} archivos.`);
				break;
			}
			if (!ALLOWED_TYPES.has(file.type)) {
				setError(`No se admite ${file.name}. Usa PDF, Word o imagen.`);
				continue;
			}
			if (file.size > MAX_BYTES) {
				setError(`${file.name} supera 8 MB.`);
				continue;
			}
			next.push(file);
		}
		setFiles(next);
		if (fileInput.current) fileInput.current.value = '';
	}

	async function onSubmit(event: FormEvent) {
		event.preventDefault();
		if (!supabase) return;
		const html = sanitizeEmailHtml(body);
		if (!subject.trim() || isEmptyHtml(html)) {
			setError('Faltan asunto o mensaje.');
			return;
		}
		setSending(true);
		setError(null);
		setMessage(null);

		const uploaded: EmailAttachment[] = [];
		try {
			for (const file of files) {
				const path = `${client.id}/${crypto.randomUUID()}-${safeName(file.name)}`;
				const { error: uploadError } = await supabase.storage.from('email-attachments').upload(path, file, {
					contentType: file.type,
					upsert: false,
				});
				if (uploadError) throw uploadError;
				uploaded.push({ name: file.name, path, size: file.size });
			}

			const { data, error: invokeError } = await supabase.functions.invoke('send-email', {
				body: {
					client_id: client.id,
					project_id: projectId || null,
					to_email: toEmail.trim(),
					subject: subject.trim(),
					body: html,
					body_text: htmlToText(html),
					attachments: uploaded,
				},
			});
			if (invokeError) throw invokeError;
			if (data && typeof data === 'object' && 'error' in data && data.error) {
				throw new Error(String(data.error));
			}
			setSubject('');
			setBody('');
			setFiles([]);
			setTemplateId('');
			setMessage('Correo enviado y guardado en el historial.');
			onSent();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo enviar el correo.');
		} finally {
			setSending(false);
		}
	}

	return (
		<section>
			<h2 className="text-xl font-semibold">Enviar correo</h2>
			<form onSubmit={(event) => void onSubmit(event)} className="mt-4 space-y-4 rounded-2xl border border-line bg-panel p-5">
				<label className="block text-sm font-medium">
					Para
					<input
						className="field"
						type="email"
						required
						value={toEmail}
						onChange={(event) => setToEmail(event.target.value)}
					/>
				</label>
				<label className="block text-sm font-medium">
					Proyecto (opcional)
					<select className="field" value={projectId} onChange={(event) => onProjectChange(event.target.value)}>
						<option value="">Sin proyecto</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.title}
							</option>
						))}
					</select>
				</label>
				<label className="block text-sm font-medium">
					Plantilla
					<select
						className="field"
						value={templateId}
						onChange={(event) => applyTemplate(event.target.value as EmailTemplateId | '')}
					>
						<option value="">Sin plantilla</option>
						{EMAIL_TEMPLATES.map((template) => (
							<option key={template.id} value={template.id}>
								{template.label}
							</option>
						))}
					</select>
				</label>
				<label className="block text-sm font-medium">
					Asunto
					<input className="field" required value={subject} onChange={(event) => setSubject(event.target.value)} />
				</label>
				<div>
					<p className="text-sm font-medium">Mensaje</p>
					<div className="mt-2">
						<RichTextEditor value={body} onChange={setBody} disabled={sending} />
					</div>
				</div>
				<div>
					<p className="text-sm font-medium">Adjuntos</p>
					<input
						ref={fileInput}
						className="sr-only"
						type="file"
						multiple
						accept=".pdf,.png,.jpg,.jpeg,.webp,.docx,application/pdf,image/png,image/jpeg,image/webp,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						onChange={(event) => addFiles(event.target.files)}
					/>
					<button
						type="button"
						className="mt-2 rounded-lg border border-line px-3 py-2 text-sm text-muted hover:bg-page-soft hover:text-fg"
						onClick={() => fileInput.current?.click()}
						disabled={sending || files.length >= MAX_FILES}
					>
						Adjuntar archivo
					</button>
					<p className="mt-1 text-xs text-muted">PDF, Word o imagen. Máximo {MAX_FILES} archivos, 8 MB cada uno.</p>
					{files.length > 0 && (
						<ul className="mt-3 space-y-2">
							{files.map((file, index) => (
								<li
									key={`${file.name}-${index}`}
									className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2 text-sm"
								>
									<span className="truncate">
										{file.name} · {(file.size / 1024).toFixed(0)} KB
									</span>
									<button
										type="button"
										className="text-muted hover:text-fg"
										onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
									>
										Quitar
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
				{error && <p className="text-sm text-red-400">{error}</p>}
				{message && <p className="text-sm text-cyan">{message}</p>}
				<button type="submit" disabled={sending} className="glow-btn rounded-full px-5 py-3 text-sm font-semibold">
					{sending ? 'Enviando…' : 'Enviar'}
				</button>
			</form>
		</section>
	);
}
