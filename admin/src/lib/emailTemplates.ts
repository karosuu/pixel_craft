import { formatMoney, projectBalance } from './labels';
import type { Client, Project } from './types';

export type EmailTemplateId = 'quote' | 'kickoff' | 'delivery' | 'followup';

export type EmailTemplate = {
	id: EmailTemplateId;
	label: string;
	subject: string;
	body: string;
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
	{
		id: 'quote',
		label: 'Cotización',
		subject: 'Cotización — {{proyecto}}',
		body: `<p>Hola {{nombre}},</p>
<p>Gracias por tu interés en Pixel-Craft. Te compartimos la cotización para <strong>{{proyecto}}</strong>.</p>
<p>Monto: <strong>{{monto}}</strong><br>Saldo pendiente: <strong>{{saldo}}</strong></p>
<p>Si te parece bien, responde a este correo y coordinamos el siguiente paso.</p>
<p>Saludos,<br>Pixel-Craft</p>`,
	},
	{
		id: 'kickoff',
		label: 'Kickoff',
		subject: 'Arrancamos — {{proyecto}}',
		body: `<p>Hola {{nombre}},</p>
<p>Confirmamos el inicio de <strong>{{proyecto}}</strong>.</p>
<p>En los próximos días te pediremos accesos o materiales si hacen falta. Mientras tanto, si tienes referencias o prioridades, mándamelas por este correo.</p>
<p>Saludos,<br>Pixel-Craft</p>`,
	},
	{
		id: 'delivery',
		label: 'Entrega',
		subject: 'Entrega — {{proyecto}}',
		body: `<p>Hola {{nombre}},</p>
<p>Te compartimos la entrega de <strong>{{proyecto}}</strong>.</p>
<p>Revisa el sitio o los archivos adjuntos y dime si hay ajustes. El saldo pendiente es <strong>{{saldo}}</strong>.</p>
<p>Saludos,<br>Pixel-Craft</p>`,
	},
	{
		id: 'followup',
		label: 'Follow-up',
		subject: 'Seguimiento — {{proyecto}}',
		body: `<p>Hola {{nombre}},</p>
<p>Te escribo para dar seguimiento a <strong>{{proyecto}}</strong>{{empresa_frase}}.</p>
<p>¿Tienes alguna duda o quieres avanzar con el siguiente paso?</p>
<p>Saludos,<br>Pixel-Craft</p>`,
	},
];

export function fillEmailTemplate(
	template: EmailTemplate,
	client: Client,
	project?: Project | null,
): { subject: string; body: string } {
	const company = client.company?.trim() || '';
	const projectTitle = project?.title?.trim() || 'tu proyecto';
	const amount = project ? formatMoney(project.quoted_amount, project.currency) : '—';
	const balance = project
		? formatMoney(projectBalance(project.quoted_amount, project.deposit_amount), project.currency)
		: '—';
	const vars: Record<string, string> = {
		nombre: client.name.trim() || 'hola',
		empresa: company || 'tu empresa',
		proyecto: projectTitle,
		monto: amount,
		saldo: balance,
		empresa_frase: company ? ` de ${company}` : '',
	};

	function replace(text: string) {
		return text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
	}

	return {
		subject: replace(template.subject),
		body: replace(template.body),
	};
}
