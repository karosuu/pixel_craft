import {
	alternateLocale,
	hrefFor,
	hrefForService,
	type Locale,
	type PageId,
	type ServiceId,
} from './config';

export function hreflangUrls(
	site: URL | undefined,
	page: PageId,
	service?: ServiceId,
): { en: string; es: string; xDefault: string } {
	const origin = site ? site.origin : '';
	const en = service ? `${origin}${hrefForService('en', service)}` : `${origin}${hrefFor('en', page)}`;
	const es = service ? `${origin}${hrefForService('es', service)}` : `${origin}${hrefFor('es', page)}`;
	return { en, es, xDefault: en };
}

export function switchLocalePath(locale: Locale, page: PageId, service?: ServiceId): string {
	const next = alternateLocale(locale);
	return service ? hrefForService(next, service) : hrefFor(next, page);
}

export function htmlLang(locale: Locale): string {
	return locale === 'es' ? 'es' : 'en';
}
