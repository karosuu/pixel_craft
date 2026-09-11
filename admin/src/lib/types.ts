export const PROJECT_TYPES = ['build', 'design', 'optimize', 'qa', 'other'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_STATUSES = ['presupuesto', 'en_curso', 'cancelacion_pendiente', 'entregado', 'cancelado'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const ACTIVE_PROJECT_STATUSES = ['presupuesto', 'en_curso', 'cancelacion_pendiente'] as const;

export const CURRENCIES = ['USD', 'CRC'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const PAYMENT_STATUSES = ['pendiente', 'parcial', 'pagado'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PROJECT_SOURCES = ['manual', 'web'] as const;
export type ProjectSource = (typeof PROJECT_SOURCES)[number];

export const EMAIL_STATUSES = ['sent', 'failed'] as const;
export type EmailStatus = (typeof EMAIL_STATUSES)[number];

export const ACTIVITY_TYPES = ['note', 'call', 'whatsapp', 'email', 'status_change', 'lead'] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export type Client = {
	id: string;
	name: string;
	company: string | null;
	email: string | null;
	phone: string | null;
	website: string | null;
	notes: string | null;
	last_outbound_at: string | null;
	created_at: string;
	updated_at: string;
};

export type Project = {
	id: string;
	client_id: string;
	title: string;
	type: ProjectType;
	status: ProjectStatus;
	notes: string | null;
	due_date: string | null;
	follow_up_at: string | null;
	quoted_amount: number | null;
	deposit_amount: number;
	currency: Currency;
	payment_status: PaymentStatus;
	source: ProjectSource;
	created_at: string;
	updated_at: string;
	clients?: Pick<Client, 'id' | 'name' | 'company' | 'last_outbound_at'>;
};

export type EmailRow = {
	id: string;
	client_id: string;
	project_id: string | null;
	to_email: string;
	subject: string;
	body: string;
	status: EmailStatus;
	error: string | null;
	sent_at: string;
	attachments?: EmailAttachment[];
};

export type EmailAttachment = {
	name: string;
	path: string;
	size: number;
};

export type Activity = {
	id: string;
	client_id: string;
	project_id: string | null;
	type: ActivityType;
	body: string;
	created_at: string;
};
