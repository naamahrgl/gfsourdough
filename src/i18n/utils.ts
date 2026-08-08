import { defaultLang, type Lang } from './config';
import { ui as dictionary } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'he') return lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  const safeLang = lang && lang in dictionary ? lang : defaultLang;
  return function t(key: keyof typeof dictionary['en']) {
    return dictionary[safeLang][key] ?? dictionary[defaultLang][key];
  };
}

// swaps the lang segment of the current path, for the language switcher
export function getLocalizedPath(pathname: string, lang: Lang) {
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = lang;
  return '/' + segments.join('/');
}