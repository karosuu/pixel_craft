import type {
	ActivityType,
	Currency,
	EmailStatus,
	PaymentStatus,
	ProjectSource,
	ProjectStatus,
	ProjectType,
} from './types';

export const projectTypeLabels: Record<ProjectType, string> = {
	build: 'Creación de sitios',
	design: 'Mejora de diseño',
	optimize: 'Optimización / SEO',
	qa: 'QA web',
	other: 'Otro',
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
	presupuesto: 'Presupuesto',
	en_curso: 'En curso',
	cancelacion_pendiente: 'Cancelación pendiente',
	entregado: 'Entregado',
	cancelado: 'Cancelado',
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
	pendiente: 'Pendiente',
	parcial: 'Parcial',
	pagado: 'Pagado',
};

export const projectSourceLabels: Record<ProjectSource, string> = {
	manual: 'Manual',
	web: 'Sitio web',
};

export const emailStatusLabels: Record<EmailStatus, string> = {
	sent: 'Enviado',
	failed: 'Falló',
};

export const activityTypeLabels: Record<ActivityType, string> = {
	note: 'Nota',
	call: 'Llamada',
	whatsapp: 'WhatsApp',
	email: 'Correo',
	status_change: 'Cambio de estado',
	lead: 'Lead web',
};

export function formatDate(value: string) {
	return new Date(value).toLocaleString('es-CR', {
		dateStyle: 'medium',
		timeStyle: 'short',
	});
}

export function formatDateOnly(value: string | null | undefined) {
	if (!value) return '—';
	const date = value.length <= 10 ? `${value}T12:00:00` : value;
	return new Date(date).toLocaleDateString('es-CR', { dateStyle: 'medium' });
}

export function formatMoney(amount: number | null | undefined, currency: Currency = 'USD') {
	if (amount == null || Number.isNaN(amount)) return '—';
	if (currency === 'CRC') {
		return new Intl.NumberFormat('es-CR', {
			style: 'currency',
			currency: 'CRC',
			maximumFractionDigits: 0,
		}).format(amount);
	}
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export function projectBalance(quoted: number | null | undefined, deposit: number | null | undefined) {
	if (quoted == null) return null;
	return quoted - (deposit ?? 0);
}

export function suggestPaymentStatus(quoted: number | null, deposit: number): PaymentStatus {
	if (quoted == null || quoted <= 0 || deposit <= 0) return 'pendiente';
	if (deposit >= quoted) return 'pagado';
	return 'parcial';
}
