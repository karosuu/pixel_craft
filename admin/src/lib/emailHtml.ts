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
		if ((tag === 'td' || tag === 'th') && ['border', 'padding', 'min-width', 'background', 'font-weight', 'text-align'].includes(prop)) {
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

export function htmlToText(html: string) {
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

export function isEmptyHtml(html: string) {
	return htmlToText(html).length === 0;
}

export function sanitizeEmailHtml(html: string) {
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
