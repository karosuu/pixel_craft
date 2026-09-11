import { useEffect } from 'react';

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = 'Eliminar',
	busy = false,
	onCancel,
	onConfirm,
}: {
	open: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	busy?: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}) {
	useEffect(() => {
		if (!open) return;
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape' && !busy) onCancel();
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, busy, onCancel]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<button
				type="button"
				className="absolute inset-0 bg-black/60"
				aria-label="Cerrar"
				disabled={busy}
				onClick={onCancel}
			/>
			<div
				role="alertdialog"
				aria-modal="true"
				aria-labelledby="confirm-title"
				aria-describedby="confirm-desc"
				className="relative w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-xl"
			>
				<h2 id="confirm-title" className="text-lg font-semibold">
					{title}
				</h2>
				<p id="confirm-desc" className="mt-2 text-sm text-muted">
					{description}
				</p>
				<div className="mt-6 flex flex-wrap justify-end gap-3">
					<button type="button" className="ghost-btn rounded-full px-4 py-2 text-sm font-medium" disabled={busy} onClick={onCancel}>
						Cancelar
					</button>
					<button type="button" className="danger-btn rounded-full px-4 py-2 text-sm font-semibold" disabled={busy} onClick={onConfirm}>
						{busy ? 'Eliminando…' : confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
