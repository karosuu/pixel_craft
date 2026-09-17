import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from 'react';
import {
	fetchWebLeads,
	readSeenLeadIds,
	syncAdminTitle,
	writeSeenLeadIds,
	type WebLeadNotice,
} from '../lib/leadNotifications';
import { supabase } from '../lib/supabase';

type LeadNotificationState = {
	leads: WebLeadNotice[];
	unreadIds: string[];
	unreadCount: number;
	ringing: boolean;
	error: string | null;
	markSeen: (ids: string[]) => void;
	markAllSeen: () => void;
	markClientLeadsSeen: (clientId: string) => void;
	refresh: () => Promise<void>;
};

const LeadNotificationContext = createContext<LeadNotificationState | null>(null);

export function LeadNotificationProvider({ children }: { children: ReactNode }) {
	const [leads, setLeads] = useState<WebLeadNotice[]>([]);
	const [unreadIds, setUnreadIds] = useState<string[]>([]);
	const [ringing, setRinging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const firstLoad = useRef(true);
	const knownIds = useRef(new Set<string>());

	const applyLeads = useCallback((next: WebLeadNotice[]) => {
		const seen = new Set(readSeenLeadIds());
		const unread = next.filter((lead) => !seen.has(lead.id)).map((lead) => lead.id);
		if (!firstLoad.current) {
			const arrived = next.some((lead) => !knownIds.current.has(lead.id) && !seen.has(lead.id));
			if (arrived) setRinging(true);
		}
		firstLoad.current = false;
		knownIds.current = new Set(next.map((lead) => lead.id));
		setLeads(next);
		setUnreadIds(unread);
		syncAdminTitle(unread.length);
	}, []);

	const refresh = useCallback(async () => {
		try {
			const next = await fetchWebLeads();
			applyLeads(next);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudieron cargar los formularios.');
		}
	}, [applyLeads]);

	const markSeen = useCallback(
		(ids: string[]) => {
			if (ids.length === 0) return;
			const nextSeen = [...new Set([...readSeenLeadIds(), ...ids])];
			writeSeenLeadIds(nextSeen);
			setUnreadIds((current) => {
				const hide = new Set(ids);
				const next = current.filter((id) => !hide.has(id));
				syncAdminTitle(next.length);
				return next;
			});
		},
		[],
	);

	const markAllSeen = useCallback(() => {
		markSeen(leads.map((lead) => lead.id));
	}, [leads, markSeen]);

	const markClientLeadsSeen = useCallback(
		(clientId: string) => {
			markSeen(leads.filter((lead) => lead.client_id === clientId).map((lead) => lead.id));
		},
		[leads, markSeen],
	);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	useEffect(() => {
		if (!ringing) return;
		const timer = window.setTimeout(() => setRinging(false), 800);
		return () => window.clearTimeout(timer);
	}, [ringing]);

	useEffect(() => {
		const interval = window.setInterval(() => {
			void refresh();
		}, 25_000);

		function onVisible() {
			if (document.visibilityState === 'visible') void refresh();
		}
		document.addEventListener('visibilitychange', onVisible);

		return () => {
			window.clearInterval(interval);
			document.removeEventListener('visibilitychange', onVisible);
		};
	}, [refresh]);

	useEffect(() => {
		if (!supabase) return;
		const client = supabase;
		const channel = client
			.channel('crm-web-leads')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'projects' }, (payload) => {
				const row = payload.new as { source?: string };
				if (row.source === 'web') void refresh();
			})
			.subscribe();

		return () => {
			void client.removeChannel(channel);
		};
	}, [refresh]);

	useEffect(() => {
		return () => {
			syncAdminTitle(0);
		};
	}, []);

	const value = useMemo<LeadNotificationState>(
		() => ({
			leads,
			unreadIds,
			unreadCount: unreadIds.length,
			ringing,
			error,
			markSeen,
			markAllSeen,
			markClientLeadsSeen,
			refresh,
		}),
		[error, leads, markAllSeen, markClientLeadsSeen, markSeen, refresh, ringing, unreadIds],
	);

	return <LeadNotificationContext.Provider value={value}>{children}</LeadNotificationContext.Provider>;
}

export function useLeadNotifications() {
	const ctx = useContext(LeadNotificationContext);
	if (!ctx) throw new Error('useLeadNotifications must be used within LeadNotificationProvider');
	return ctx;
}
