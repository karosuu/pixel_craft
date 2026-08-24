// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Custom domain: keep `base: '/'`.
// GitHub project Pages (user.github.io/repo/): set `base` to `/repo/`.
export default defineConfig({
	site: 'https://pixel-craft.dev',
	base: '/',
	trailingSlash: 'never',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	redirects: {
		'/en': '/',
		'/en/services': '/services',
		'/en/work': '/',
		'/en/about': '/about',
		'/en/contact': '/contact',
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
