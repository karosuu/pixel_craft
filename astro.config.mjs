// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { pageIds, pathForService, paths, serviceIds, serviceSlugs } from './src/i18n/config.ts';

const SITE = 'https://pixel-craft.dev';

function pageUrl(locale, page) {
	const path = paths[locale][page];
	return path === '/' ? `${SITE}/` : `${SITE}${path}`;
}

function serviceUrl(locale, service) {
	return `${SITE}${pathForService(locale, service)}`;
}

function withoutSlash(url) {
	if (url === SITE || url === `${SITE}/`) return SITE;
	return url.endsWith('/') ? url.slice(0, -1) : url;
}

const enServiceRedirects = Object.fromEntries(
	serviceIds.map((id) => [`/en/services/${serviceSlugs.en[id]}`, `/services/${serviceSlugs.en[id]}`]),
);

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
				if (current === SITE) {
					item.url = `${SITE}/`;
				}
				const page = pageIds.find(
					(id) => withoutSlash(pageUrl('en', id)) === current || withoutSlash(pageUrl('es', id)) === current,
				);
				const service = serviceIds.find(
					(id) => withoutSlash(serviceUrl('en', id)) === current || withoutSlash(serviceUrl('es', id)) === current,
				);
				item.lastmod = new Date().toISOString();
				if (page) {
					item.links = [
						{ lang: 'en-US', url: pageUrl('en', page) },
						{ lang: 'es-MX', url: pageUrl('es', page) },
						{ lang: 'x-default', url: pageUrl('en', page) },
					];
				} else if (service) {
					item.links = [
						{ lang: 'en-US', url: serviceUrl('en', service) },
						{ lang: 'es-MX', url: serviceUrl('es', service) },
						{ lang: 'x-default', url: serviceUrl('en', service) },
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
		...enServiceRedirects,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
