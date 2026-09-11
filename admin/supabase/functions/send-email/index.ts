import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const allowedOrigins = [
	'https://pixel-craft.dev',
	'https://www.pixel-craft.dev',
	'https://admin.pixel-craft.dev',
	'http://localhost:5173',
	'http://127.0.0.1:5173',
	'http://localhost:5174',
];

const MAX_FILES = 4;
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
	'application/pdf',
	'image/png',
	'image/jpeg',
	'image/webp',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const ALLOWED_TAGS = new Set([
	'p',
	'br',
	'strong',
	'b',
	'em',
	'i',
	'u',
	'ul',
	'ol',
	'li',
	'a',
	'h2',
	'h3',
	'blockquote',
	'hr',
	'table',
	'thead',
	'tbody',
	'tr',
	'th',
	'td',
]);
const STYLE_TAGS = new Set(['p', 'h2', 'h3', 'td', 'th', 'blockquote', 'table']);
const ALLOWED_STYLE_PROPS = new Set([
	'text-align',
	'border-collapse',
	'width',
	'border',
	'padding',
	'min-width',
	'background',
	'font-weight',
]);
const ALLOWED_TEXT_ALIGN = new Set(['left', 'center', 'right']);

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

function sanitizeStyle(style: string, tag: string) {
	const parts: string[] = [];
	for (const decl of style.split(';')) {
		const colon = decl.indexOf(':');
		if (colon < 0) continue;
		const prop = decl.slice(0, colon).trim().toLowerCase();
		const value = decl.slice(colon + 1).trim().toLowerCase();
		if (!prop || !value || !ALLOWED_STYLE_PROPS.has(prop)) continue;
		if (/expression|url\s*\(|javascript:/i.test(value)) continue;
		if (prop === 'text-align') {
			if (!ALLOWED_TEXT_ALIGN.has(value)) continue;
			parts.push(`text-align: ${value}`);
			continue;
		}
		if (tag === 'table' && (prop === 'border-collapse' || prop === 'width')) {
			parts.push(`${prop}: ${value}`);
			continue;
		}
		if (
			(tag === 'td' || tag === 'th') &&
			['border', 'padding', 'min-width', 'background', 'font-weight', 'text-align'].includes(prop)
		) {
			parts.push(`${prop}: ${value}`);
		}
	}
	return parts.join('; ');
}

function safeIntAttr(attrs: string, name: string) {
	const match = new RegExp(`${name}\\s*=\\s*["']?(\\d+)["']?`, 'i').exec(attrs);
	if (!match) return null;
	const n = Number(match[1]);
	if (!Number.isInteger(n) || n < 1 || n > 20) return null;
	return n;
}

function htmlToText(html: string) {
	return html
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		.replace(/<\/li>/gi, '\n')
		.replace(/<\/h[23]>/gi, '\n\n')
		.replace(/<\/blockquote>/gi, '\n\n')
		.replace(/<hr\s*\/?>/gi, '\n---\n')
		.replace(/<\/t[dh]>/gi, '\t')
		.replace(/<\/tr>/gi, '\n')
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function sanitizeEmailHtml(html: string) {
	return html.replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (full, tag: string, attrs = '') => {
		const name = tag.toLowerCase();
		if (!ALLOWED_TAGS.has(name)) return '';
		if (full.startsWith('</')) return `</${name}>`;
		if (name === 'br') return '<br>';
		if (name === 'hr') return '<hr>';

		const outAttrs: string[] = [];

		if (name === 'a') {
			const href = /href\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1] ?? '';
			if (/^https?:\/\//i.test(href)) {
				outAttrs.push(`href="${href.replace(/"/g, '')}"`);
			}
		}

		if (STYLE_TAGS.has(name)) {
			const rawStyle = /style\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1] ?? '';
			let safe = sanitizeStyle(rawStyle, name);
			if (name === 'table') {
				const parts = new Set(safe ? safe.split('; ').filter(Boolean) : []);
				parts.add('border-collapse: collapse');
				parts.add('width: 100%');
				safe = [...parts].join('; ');
			}
			if (safe) outAttrs.push(`style="${safe}"`);
		}

		if (name === 'td' || name === 'th') {
			const colspan = safeIntAttr(attrs, 'colspan');
			const rowspan = safeIntAttr(attrs, 'rowspan');
			if (colspan) outAttrs.push(`colspan="${colspan}"`);
			if (rowspan) outAttrs.push(`rowspan="${rowspan}"`);
		}

		return outAttrs.length ? `<${name} ${outAttrs.join(' ')}>` : `<${name}>`;
	});
}

function bytesToBase64(bytes: Uint8Array) {
	let binary = '';
	const chunk = 0x8000;
	for (let i = 0; i < bytes.length; i += chunk) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	}
	return btoa(binary);
}

type AttachmentIn = { name?: string; path?: string; size?: number };

Deno.serve(async (req) => {
	const origin = req.headers.get('Origin');
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders(origin) });
	}
	if (req.method !== 'POST') {
		return json(origin, { error: 'Method not allowed' }, 405);
	}

	const supabaseUrl = Deno.env.get('SUPABASE_URL');
	const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
	const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
	const resendKey = Deno.env.get('RESEND_API_KEY');
	const mailFrom = Deno.env.get('MAIL_FROM') ?? 'Pixel-Craft <info@pixel-craft.dev>';

	if (!supabaseUrl || !anonKey || !serviceKey) {
		return json(origin, { error: 'Missing Supabase secrets' }, 500);
	}

	const authHeader = req.headers.get('Authorization');
	if (!authHeader) {
		return json(origin, { error: 'Unauthorized' }, 401);
	}

	const userClient = createClient(supabaseUrl, anonKey, {
		global: { headers: { Authorization: authHeader } },
	});
	const {
		data: { user },
		error: userError,
	} = await userClient.auth.getUser();
	if (userError || !user) {
		return json(origin, { error: 'Unauthorized' }, 401);
	}

	const adminClient = createClient(supabaseUrl, serviceKey);
	const { data: admin } = await adminClient.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
	if (!admin) {
		return json(origin, { error: 'Forbidden' }, 403);
	}

	const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
	const { count } = await adminClient
		.from('emails')
		.select('id', { count: 'exact', head: true })
		.gte('sent_at', hourAgo);
	if ((count ?? 0) >= 30) {
		return json(origin, { error: 'Límite de envíos alcanzado. Intenta en una hora.' }, 429);
	}

	let payload: {
		client_id?: string;
		project_id?: string | null;
		to_email?: string;
		subject?: string;
		body?: string;
		body_text?: string;
		attachments?: AttachmentIn[];
	};
	try {
		payload = await req.json();
	} catch {
		return json(origin, { error: 'JSON inválido' }, 400);
	}

	const toEmail = payload.to_email?.trim() ?? '';
	const subject = payload.subject?.trim() ?? '';
	const html = sanitizeEmailHtml(payload.body?.trim() ?? '');
	const text = (payload.body_text?.trim() || htmlToText(html)).trim();
	const clientId = payload.client_id?.trim() ?? '';
	const projectId = payload.project_id?.trim() || null;
	const attachmentMeta = (payload.attachments ?? []).slice(0, MAX_FILES);

	if (!clientId || !toEmail || !subject || !text) {
		return json(origin, { error: 'Faltan destinatario, asunto o mensaje.' }, 400);
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
		return json(origin, { error: 'Correo de destino inválido.' }, 400);
	}
	if (subject.length > 200 || html.length > 50000) {
		return json(origin, { error: 'El asunto o el mensaje es demasiado largo.' }, 400);
	}

	const { data: client } = await adminClient.from('clients').select('id').eq('id', clientId).maybeSingle();
	if (!client) {
		return json(origin, { error: 'Cliente no encontrado.' }, 404);
	}

	for (const file of attachmentMeta) {
		if (!file.path || !file.path.startsWith(`${clientId}/`)) {
			return json(origin, { error: 'Adjunto inválido.' }, 400);
		}
		if ((file.size ?? 0) > MAX_BYTES) {
			return json(origin, { error: 'Un adjunto supera 8 MB.' }, 400);
		}
	}

	async function saveRow(status: 'sent' | 'failed', error?: string) {
		return adminClient.from('emails').insert({
			client_id: clientId,
			project_id: projectId,
			to_email: toEmail,
			subject,
			body: html,
			attachments: attachmentMeta.map((file) => ({
				name: file.name ?? 'archivo',
				path: file.path,
				size: file.size ?? 0,
			})),
			status,
			error: error ?? null,
		});
	}

	if (!resendKey) {
		await saveRow('failed', 'Falta RESEND_API_KEY');
		return json(origin, { error: 'Falta configurar Resend.' }, 500);
	}

	const resendAttachments: { filename: string; content: string; content_type?: string }[] = [];
	for (const file of attachmentMeta) {
		const { data, error } = await adminClient.storage.from('email-attachments').download(file.path!);
		if (error || !data) {
			await saveRow('failed', 'No se pudo leer un adjunto.');
			return json(origin, { error: 'No se pudo leer un adjunto.' }, 400);
		}
		if (data.type && !ALLOWED_TYPES.has(data.type) && data.type !== 'application/octet-stream') {
			await saveRow('failed', 'Tipo de adjunto no permitido.');
			return json(origin, { error: 'Tipo de adjunto no permitido.' }, 400);
		}
		if (data.size > MAX_BYTES) {
			await saveRow('failed', 'Un adjunto supera 8 MB.');
			return json(origin, { error: 'Un adjunto supera 8 MB.' }, 400);
		}
		const bytes = new Uint8Array(await data.arrayBuffer());
		resendAttachments.push({
			filename: file.name || 'archivo',
			content: bytesToBase64(bytes),
			content_type: data.type || undefined,
		});
	}

	const resendBody: Record<string, unknown> = {
		from: mailFrom,
		to: [toEmail],
		subject,
		html,
		text,
	};
	if (resendAttachments.length) {
		resendBody.attachments = resendAttachments;
	}

	const resendResponse = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(resendBody),
	});

	if (!resendResponse.ok) {
		const errorText = await resendResponse.text();
		await saveRow('failed', errorText.slice(0, 500));
		return json(origin, { error: 'No se pudo enviar el correo.' }, 502);
	}

	const { error: insertError } = await saveRow('sent');
	if (insertError) {
		return json(origin, { error: insertError.message }, 500);
	}

	await adminClient.from('activities').insert({
		client_id: clientId,
		project_id: projectId,
		type: 'email',
		body: `Correo enviado: ${subject}`,
	});

	return json(origin, { ok: true });
});
