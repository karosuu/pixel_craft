// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { pageIds, paths } from './src/i18n/config.ts';

const SITE = 'https://pixel-craft.dev';

function pageUrl(locale, page) {
	const path = paths[locale][page];
	return path === '/' ? SITE : `${SITE}${path}`;
}

function withoutSlash(url) {
	return url.endsWith('/') && url !== `${SITE}/` ? url.slice(0, -1) : url.replace(/\/$/, '') || SITE;
}

// Custom domain: keep `base: '/'`.
// GitHub project Pages (user.github.io/repo/): set `base` to `/repo/`.
export default defineConfig({
	site: SITE,
	base: '/',
	trailingSlash: 'never',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [
		sitemap({
			filter: (page) => !/^https:\/\/pixel-craft\.dev\/en(\/|$)/.test(page),
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					es: 'es-MX',
				},
			},
			serialize(item) {
				const current = withoutSlash(item.url);
				const page = pageIds.find(
					(id) => withoutSlash(pageUrl('en', id)) === current || withoutSlash(pageUrl('es', id)) === current,
				);
				if (page) {
					const en = pageUrl('en', page);
					item.links = [
						{ lang: 'en-US', url: en === SITE ? `${SITE}/` : en },
						{ lang: 'es-MX', url: pageUrl('es', page) },
						{ lang: 'x-default', url: en === SITE ? `${SITE}/` : en },
					];
				}
				return item;
			},
		}),
	],
	redirects: {
		'/en': '/',
		'/en/services': '/services',
		'/en/work': '/work',
		'/en/about': '/about',
		'/en/contact': '/contact',
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
