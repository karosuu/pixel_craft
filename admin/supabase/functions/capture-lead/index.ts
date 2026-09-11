import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = [
	'https://pixel-craft.dev',
	'https://www.pixel-craft.dev',
	'http://localhost:4321',
	'http://127.0.0.1:4321',
];

const NEED_TO_TYPE: Record<string, string> = {
	build: 'build',
	design: 'design',
	optimize: 'optimize',
	qa: 'qa',
	unsure: 'other',
};

const NEED_LABELS: Record<string, string> = {
	build: 'Build a new website',
	design: 'Redesign my website',
	optimize: 'Improve performance / SEO',
	qa: 'QA / test my website',
	unsure: 'Not sure yet',
};

const AUDIENCE_LABELS: Record<string, string> = {
	local: 'A local business',
	startup: 'A startup',
};

function corsHeaders(origin: string | null) {
	const allow = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
	return {
		'Access-Control-Allow-Origin': allow,
		'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
	};
}

function json(origin: string | null, body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
	});
}

function todayIso() {
	const now = new Date();
	const y = now.getFullYear();
	const m = String(now.getMonth() + 1).padStart(2, '0');
	const d = String(now.getDate()).padStart(2, '0');
	return `${y}-${m}-${d}`;
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

Deno.serve(async (req) => {
	const origin = req.headers.get('Origin');
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders(origin) });
	}
	if (req.method !== 'POST') {
		return json(origin, { error: 'Method not allowed' }, 405);
	}

	const supabaseUrl = Deno.env.get('SUPABASE_URL');
	const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
	const resendKey = Deno.env.get('RESEND_API_KEY');
	const mailFrom = Deno.env.get('MAIL_FROM') ?? 'Pixel-Craft <info@pixel-craft.dev>';
	const notifyTo = Deno.env.get('LEAD_NOTIFY_TO') ?? 'info@pixel-craft.dev';

	if (!supabaseUrl || !serviceKey) {
		return json(origin, { error: 'Missing Supabase secrets' }, 500);
	}

	let payload: {
		name?: string;
		email?: string;
		website?: string;
		message?: string;
		need?: string;
		audience?: string;
		language?: string;
		_honey?: string;
	};
	try {
		payload = await req.json();
	} catch {
		return json(origin, { error: 'Invalid JSON' }, 400);
	}

	if ((payload._honey ?? '').trim() !== '') {
		return json(origin, { ok: true });
	}

	const name = (payload.name ?? '').trim();
	const email = (payload.email ?? '').trim().toLowerCase();
	const website = (payload.website ?? '').trim();
	const message = (payload.message ?? '').trim();
	const need = (payload.need ?? '').trim();
	const audience = (payload.audience ?? '').trim();
	const language = (payload.language ?? '').trim() || 'en';

	if (!name || !email || !message || !need) {
		return json(origin, { error: 'Missing required fields' }, 400);
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json(origin, { error: 'Invalid email' }, 400);
	}
	if (name.length > 120 || email.length > 200 || message.length > 5000) {
		return json(origin, { error: 'Payload too large' }, 400);
	}
	if (!(need in NEED_TO_TYPE)) {
		return json(origin, { error: 'Invalid need' }, 400);
	}

	const admin = createClient(supabaseUrl, serviceKey);

	const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
	const { count: hourCount } = await admin
		.from('activities')
		.select('id', { count: 'exact', head: true })
		.eq('type', 'lead')
		.gte('created_at', hourAgo);
	if ((hourCount ?? 0) >= 20) {
		return json(origin, { error: 'Too many requests' }, 429);
	}

	const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
	const { data: recentLeads } = await admin
		.from('activities')
		.select('id, body, created_at')
		.eq('type', 'lead')
		.gte('created_at', dayAgo)
		.limit(100);
	const sameEmailCount = (recentLeads ?? []).filter((row) =>
		typeof row.body === 'string' && row.body.toLowerCase().includes(email),
	).length;
	if (sameEmailCount >= 3) {
		return json(origin, { error: 'Too many requests for this email' }, 429);
	}

	const { data: existingClients } = await admin.from('clients').select('*').ilike('email', email).limit(1);
	let client = existingClients?.[0] ?? null;

	if (!client) {
		const { data: created, error: createError } = await admin
			.from('clients')
			.insert({
				name,
				email,
				website: website || null,
				notes: audience ? `Audience: ${audience}` : null,
			})
			.select('*')
			.single();
		if (createError || !created) {
			return json(origin, { error: createError?.message ?? 'Could not create client' }, 500);
		}
		client = created;
	} else {
		const patch: Record<string, string | null> = {};
		if (!client.website && website) patch.website = website;
		if (Object.keys(patch).length) {
			await admin.from('clients').update(patch).eq('id', client.id);
		}
	}

	const projectType = NEED_TO_TYPE[need];
	const needLabel = NEED_LABELS[need] ?? need;
	const audienceLabel = AUDIENCE_LABELS[audience] ?? audience;
	const notes = [
		`Lead desde el sitio web`,
		`Necesidad: ${needLabel}`,
		audienceLabel ? `Audiencia: ${audienceLabel}` : null,
		`Idioma: ${language}`,
		website ? `Sitio: ${website}` : null,
		'',
		message,
	]
		.filter((line) => line !== null)
		.join('\n');

	const { data: project, error: projectError } = await admin
		.from('projects')
		.insert({
			client_id: client.id,
			title: `${needLabel} — ${name}`,
			type: projectType,
			status: 'presupuesto',
			notes,
			follow_up_at: todayIso(),
			source: 'web',
		})
		.select('id')
		.single();

	if (projectError || !project) {
		return json(origin, { error: projectError?.message ?? 'Could not create project' }, 500);
	}

	await admin.from('activities').insert({
		client_id: client.id,
		project_id: project.id,
		type: 'lead',
		body: `Lead web de ${name} <${email}>\n${needLabel}\n\n${message}`,
	});

	if (resendKey) {
		const html = `
			<p><strong>Nuevo lead desde pixel-craft.dev</strong></p>
			<p>Nombre: ${escapeHtml(name)}<br>
			Email: ${escapeHtml(email)}<br>
			Necesidad: ${escapeHtml(needLabel)}<br>
			Audiencia: ${escapeHtml(audienceLabel || '—')}<br>
			Idioma: ${escapeHtml(language)}<br>
			Sitio: ${escapeHtml(website || '—')}</p>
			<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
			<p>CRM: cliente ${escapeHtml(client.id)} · proyecto ${escapeHtml(project.id)}</p>
		`;
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${resendKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: mailFrom,
				to: [notifyTo],
				reply_to: email,
				subject: `Nuevo lead: ${name} — ${needLabel}`,
				html,
				text: `Nuevo lead de ${name} <${email}>\n${needLabel}\n\n${message}`,
			}),
		});
	}

	return json(origin, { ok: true, client_id: client.id, project_id: project.id });
});
