export const BRAND = 'Pixel-Craft';
export const CONTACT_EMAIL = 'info@pixel-craft.dev';

/** HTML-tag token from Google Search Console. Visible in page source. */
export const GOOGLE_SITE_VERIFICATION = '';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const pageIds = ['home', 'services', 'work', 'about', 'contact'] as const;
export type PageId = (typeof pageIds)[number];

export const serviceIds = ['build', 'design', 'optimize', 'qa'] as const;
export type ServiceId = (typeof serviceIds)[number];

/** Set to true when real case studies are ready to publish. */
export const SHOW_WORK = true;

export const navPageIds: PageId[] = pageIds.filter((id) => SHOW_WORK || id !== 'work');

/** Header links: keep Contact as the CTA button only. */
export const headerNavPageIds: PageId[] = navPageIds.filter((id) => id !== 'contact');

export const desktopNavPageIds: PageId[] = headerNavPageIds;

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

export const serviceSlugs: Record<Locale, Record<ServiceId, string>> = {
	en: {
		build: 'website-build',
		design: 'design-improvement',
		optimize: 'performance-seo',
		qa: 'web-qa',
	},
	es: {
		build: 'creacion-de-sitios',
		design: 'mejora-de-diseno',
		optimize: 'optimizacion-seo',
		qa: 'qa-web',
	},
};

export function pathFor(locale: Locale, page: PageId): string {
	return paths[locale][page];
}

export function pathForService(locale: Locale, service: ServiceId): string {
	const slug = serviceSlugs[locale][service];
	return locale === 'en' ? `/services/${slug}` : `/es/servicios/${slug}`;
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

export function hrefForService(locale: Locale, service: ServiceId): string {
	return withBase(pathForService(locale, service));
}

export function hrefForContact(locale: Locale, need?: ServiceId): string {
	const path = hrefFor(locale, 'contact');
	return need ? `${path}?need=${need}` : path;
}

export function isServiceId(value: string | null | undefined): value is ServiceId {
	return value != null && (serviceIds as readonly string[]).includes(value);
}

export function serviceIdFromSlug(locale: Locale, slug: string | undefined): ServiceId | undefined {
	if (!slug) return undefined;
	return serviceIds.find((id) => serviceSlugs[locale][id] === slug);
}

export function alternateLocale(locale: Locale): Locale {
	return locale === 'en' ? 'es' : 'en';
}
