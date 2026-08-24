export const BRAND = 'Pixel-Craft';
export const CONTACT_EMAIL = 'hello@pixel-craft.com';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const pageIds = ['home', 'services', 'work', 'about', 'contact'] as const;
export type PageId = (typeof pageIds)[number];

/** Set to true when real case studies are ready to publish. */
export const SHOW_WORK = false;

export const navPageIds: PageId[] = pageIds.filter(
	(id) => id !== 'home' && (SHOW_WORK || id !== 'work'),
);

export const paths: Record<Locale, Record<PageId, string>> = {
	en: {
		home: '/',
		services: '/services',
		work: '/work',
		about: '/about',
		contact: '/contact',
	},
	es: {
		home: '/es',
		services: '/es/servicios',
		work: '/es/proyectos',
		about: '/es/nosotros',
		contact: '/es/contacto',
	},
};

export function pathFor(locale: Locale, page: PageId): string {
	return paths[locale][page];
}

export function withBase(path: string, base = import.meta.env.BASE_URL): string {
	const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
	if (path === '/') {
		return normalizedBase === '' ? '/' : `${normalizedBase}/`;
	}
	return `${normalizedBase}${path}`;
}

export function hrefFor(locale: Locale, page: PageId): string {
	return withBase(pathFor(locale, page));
}

export function alternateLocale(locale: Locale): Locale {
	return locale === 'en' ? 'es' : 'en';
}
