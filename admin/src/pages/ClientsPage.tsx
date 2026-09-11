import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { deleteClient } from '../lib/crm';
import { supabase } from '../lib/supabase';
import type { Client } from '../lib/types';

export function ClientsPage() {
	const [clients, setClients] = useState<Client[]>([]);
	const [query, setQuery] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState<Client | null>(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!supabase) return;
		supabase
			.from('clients')
			.select('*')
			.order('created_at', { ascending: false })
			.then(({ data, error: loadError }) => {
				if (loadError) setError(loadError.message);
				else setClients((data ?? []) as Client[]);
			});
	}, []);

	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return clients;
		return clients.filter((client) =>
			[client.name, client.company, client.email, client.phone]
				.filter(Boolean)
				.join(' ')
				.toLowerCase()
				.includes(needle),
		);
	}, [clients, query]);

	async function confirmDelete() {
		if (!pending) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteClient(pending.id);
			setClients((current) => current.filter((client) => client.id !== pending.id));
			setPending(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar el cliente.');
			setPending(null);
		} finally {
			setDeleting(false);
		}
	}

	return (
		<div>
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h1 className="text-3xl font-bold">Clientes</h1>
				<Link
					to="/clientes/nuevo"
					className="glow-btn rounded-full px-4 py-2 text-sm font-semibold"
				>
					Nuevo cliente
				</Link>
			</div>
			<input
				className="field mt-6 max-w-md"
				placeholder="Buscar por nombre, empresa o contacto"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
			{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
			<div className="mt-6 overflow-x-auto rounded-2xl border border-line">
				<table className="min-w-full text-left text-sm">
					<thead className="bg-page-soft text-xs uppercase tracking-wider text-muted">
						<tr>
							<th className="px-4 py-3">Cliente</th>
							<th className="px-4 py-3">Contacto</th>
							<th className="px-4 py-3">Teléfono</th>
							<th className="px-4 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 && (
							<tr>
								<td className="px-4 py-6 text-muted" colSpan={4}>
									No hay clientes todavía.
								</td>
							</tr>
						)}
						{filtered.map((client) => (
							<tr key={client.id} className="border-t border-line">
								<td className="px-4 py-3">
									<Link to={`/clientes/${client.id}`} className="font-medium text-cyan hover:underline">
										{client.name}
									</Link>
									{client.company && <p className="text-muted">{client.company}</p>}
								</td>
								<td className="px-4 py-3 text-muted">{client.email || '—'}</td>
								<td className="px-4 py-3 text-muted">{client.phone || '—'}</td>
								<td className="px-4 py-3 text-right">
									<button
										type="button"
										className="text-sm text-red-400 hover:underline"
										onClick={() => setPending(client)}
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ConfirmDialog
				open={pending !== null}
				title="Eliminar cliente"
				description={`Se eliminará a ${pending?.name ?? 'este cliente'} y todos sus proyectos, correos y actividad. Esta acción no se puede deshacer.`}
				busy={deleting}
				onCancel={() => {
					if (!deleting) setPending(null);
				}}
				onConfirm={() => void confirmDelete()}
			/>
		</div>
	);
}
