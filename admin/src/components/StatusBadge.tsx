import { paymentStatusLabels, projectStatusLabels } from '../lib/labels';
import type { PaymentStatus, ProjectStatus } from '../lib/types';

const statusStyles: Record<ProjectStatus, string> = {
	presupuesto: 'border-orange/40 bg-orange/10 text-orange',
	en_curso: 'border-cyan/40 bg-cyan/10 text-cyan',
	cancelacion_pendiente: 'border-magenta/40 bg-magenta/10 text-magenta',
	entregado: 'border-line bg-fg/10 text-fg',
	cancelado: 'border-red-400/40 bg-red-400/10 text-red-400',
};

const paymentStyles: Record<PaymentStatus, string> = {
	pendiente: 'border-orange/40 bg-orange/10 text-orange',
	parcial: 'border-magenta/40 bg-magenta/10 text-magenta',
	pagado: 'border-cyan/40 bg-cyan/10 text-cyan',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
	return (
		<span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
			{projectStatusLabels[status]}
		</span>
	);
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
	return (
		<span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${paymentStyles[status]}`}>
			{paymentStatusLabels[status]}
		</span>
	);
}
