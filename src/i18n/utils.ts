import { alternateLocale, hrefFor, type Locale, type PageId } from './config';

export function hreflangUrls(
	site: URL | undefined,
	page: PageId,
): { en: string; es: string; xDefault: string } {
	const origin = site ? site.origin : '';
	const en = `${origin}${hrefFor('en', page)}`;
	const es = `${origin}${hrefFor('es', page)}`;
	return { en, es, xDefault: en };
}

export function switchLocalePath(locale: Locale, page: PageId): string {
	return hrefFor(alternateLocale(locale), page);
}

export function htmlLang(locale: Locale): string {
	return locale === 'es' ? 'es' : 'en';
}
