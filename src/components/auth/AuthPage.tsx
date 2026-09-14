import { AuthProvider } from '../../context/AuthContext';
import { AuthPanel } from './AuthPanel';
import type { Lang } from '../../i18n/config';

interface AuthPageProps {
  redirectTo?: string;
  initialView?: 'login' | 'signup' | 'forgot';
  lang?: Lang;
}

/**
 * The piece that goes on your /login (and /signup) page. Also a
 * self-contained island with its own AuthProvider.
 *
 * redirectTo/lang must be plain strings (not functions) since props
 * passed into a client:only island from .astro have to be serializable.
 *
 * Usage in login.astro:
 *   <AuthPage client:only="react" lang={lang} redirectTo={`/${lang}/dashboard`} />
 */
export default function AuthPage({ redirectTo = '/', initialView = 'login', lang }: AuthPageProps) {
  return (
    <AuthProvider>
      <AuthPanel
        initialView={initialView}
        lang={lang}
        onSuccess={() => {
          window.location.href = redirectTo;
        }}
      />
    </AuthProvider>
  );
}