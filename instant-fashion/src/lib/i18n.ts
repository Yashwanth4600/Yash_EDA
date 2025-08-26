import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import es from '../i18n/es.json';

type Messages = typeof en;

const dictionaries: Record<string, Messages> = { en, hi, es };

export function t(locale: string, key: keyof Messages): string {
	const dict = dictionaries[locale] ?? dictionaries.en;
	return dict[key] ?? key;
}