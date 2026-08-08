export const languages = {
  en: 'English',
  he: 'עברית',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const rtlLangs: Lang[] = ['he'];

export function isRtl(lang: Lang) {
  return rtlLangs.includes(lang);
}