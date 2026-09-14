import { AuthProvider } from '../../context/AuthContext';
import { ResetPasswordForm } from './ResetPasswordForm';
import type { Lang } from '../../i18n/config';

interface ResetPasswordPageProps {
  lang?: Lang;
  loginHref?: string;
}

/**
 * Mount this on the page the password-reset email links to.
 *
 * Usage in reset-password.astro:
 *   <ResetPasswordPage client:only="react" lang={lang} loginHref={`/${lang}/login`} />
 */
export default function ResetPasswordPage({ lang, loginHref }: ResetPasswordPageProps) {
  return (
    <AuthProvider>
      <ResetPasswordForm lang={lang} loginHref={loginHref} />
    </AuthProvider>
  );
}