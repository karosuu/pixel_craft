import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeadNotifications } from '../context/LeadNotificationContext';
import { formatDate, projectTypeLabels } from '../lib/labels';

export function LeadNotifications() {
	const { leads, unreadIds, unreadCount, ringing, error, markSeen, markAllSeen } = useLeadNotifications();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const panelId = useId();
	const unread = new Set(unreadIds);
	const label =
		unreadCount > 0
			? `Formularios del sitio, ${unreadCount} sin leer`
			: 'Formularios del sitio';

	useEffect(() => {
		if (!open) return;

		function onPointer(event: MouseEvent) {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === 'Escape') setOpen(false);
		}

		document.addEventListener('mousedown', onPointer);
		window.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onPointer);
			window.removeEventListener('keydown', onKey);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				className={`relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg transition hover:bg-panel ${
					ringing ? 'lead-bell-ring' : ''
				}`}
				aria-label={label}
				title={label}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((value) => !value)}
			>
				<BellIcon />
				{unreadCount > 0 && (
					<span className="lead-badge absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-magenta px-1 text-[10px] font-bold leading-none text-white">
						{unreadCount > 9 ? '9+' : unreadCount}
					</span>
				)}
			</button>
			{open && (
				<div
					id={panelId}
					role="menu"
					aria-label="Formularios del sitio"
					className="absolute right-0 z-40 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-panel shadow-xl"
				>
					<div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
						<div>
							<p className="text-sm font-semibold">Formularios</p>
							<p className="text-xs text-muted">Leads que llegan desde el sitio</p>
						</div>
						{unreadCount > 0 && (
							<button
								type="button"
								className="text-xs font-medium text-cyan hover:underline"
								onClick={markAllSeen}
							>
								Marcar leídas
							</button>
						)}
					</div>
					{error && <p className="px-4 py-3 text-sm text-red-400">{error}</p>}
					{leads.length === 0 && !error && (
						<p className="px-4 py-6 text-sm text-muted">Aún no llegan formularios del sitio.</p>
					)}
					<ul className="max-h-80 overflow-y-auto">
						{leads.map((lead) => {
							const isUnread = unread.has(lead.id);
							return (
								<li key={lead.id} className="border-t border-line first:border-t-0">
									<Link
										role="menuitem"
										to={`/clientes/${lead.client_id}`}
										className={`block px-4 py-3 hover:bg-page-soft ${isUnread ? 'bg-page-soft/60' : ''}`}
										onClick={() => {
											markSeen([lead.id]);
											setOpen(false);
										}}
									>
										<div className="flex items-start gap-2">
											<span
												className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
													isUnread ? 'bg-cyan' : 'bg-line'
												}`}
												aria-hidden="true"
											/>
											<div className="min-w-0">
												<p className={`truncate text-sm ${isUnread ? 'font-semibold' : 'font-medium'}`}>
													{lead.clientName}
												</p>
												<p className="truncate text-xs text-muted">
													{projectTypeLabels[lead.type]} · {formatDate(lead.created_at)}
												</p>
												{lead.clientEmail && (
													<p className="truncate text-xs text-muted">{lead.clientEmail}</p>
												)}
											</div>
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

function BellIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<path d="M6.5 9.5a5.5 5.5 0 1 1 11 0c0 4.2 1.5 5.5 1.5 5.5H5s1.5-1.3 1.5-5.5Z" />
			<path d="M10 18.5a2 2 0 0 0 4 0" />
		</svg>
	);
}
