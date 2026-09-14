import type { Lang } from '../i18n/config';
import { languages } from '../i18n/config';
import { langSwitcher, langSwitcherIcon, langSwitcherSelect } from '../styles/styles';

export default function LanguageSwitcherReact({ lang }: { lang: Lang }) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const segments = window.location.pathname.split('/').filter(Boolean);
    segments[0] = newLang;
    window.location.href = '/' + segments.join('/') + '/';
  };

  return (
    <div className={langSwitcher}>
      <svg className={langSwitcherIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
      </svg>
      <select value={lang} onChange={handleChange} aria-label="Switch language" className={langSwitcherSelect}>
        {Object.entries(languages).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </div>
  );
}