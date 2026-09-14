import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuthCopy } from './authTranslations';
import { isRtl, type Lang } from '../../i18n/config';
import './auth.css';

interface ResetPasswordFormProps {
  lang?: Lang;
  loginHref?: string;
}

/**
 * Lands here after the person clicks the password-reset link in their
 * email. Supabase's client (detectSessionInUrl: true) automatically
 * establishes a temporary recovery session from the URL, so updatePassword
 * just works without any extra token handling here.
 */
export function ResetPasswordForm({ lang, loginHref = '/login' }: ResetPasswordFormProps) {
  const { updatePassword } = useAuth();
  const copy = getAuthCopy(lang).reset;
  const dir = isRtl(lang as Lang) ? 'rtl' : 'ltr';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError(copy.passwordTooShort);
      return;
    }
    if (password !== confirm) {
      setError(copy.passwordMismatch);
      return;
    }

    setSubmitting(true);
    try {
      await updatePassword(password);
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : '';
      // If the recovery link was already used or has expired, Supabase
      // has no active session to update.
      setError(msg.includes('session') ? copy.errorExpiredLink : copy.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="auth-form" dir={dir}>
        <h2>{copy.successTitle}</h2>
        <p className="auth-success">{copy.successBody}</p>
        <a className="auth-submit auth-submit-link" href={loginHref}>
          {copy.goToLogin}
        </a>
      </div>
    );
  }

  return (
    <form className="auth-form" dir={dir} onSubmit={handleSubmit} noValidate>
      <h2>{copy.title}</h2>

      {error && <p className="auth-error">{error}</p>}

      <div className="auth-field">
        <label htmlFor="reset-password">{copy.newPassword}</label>
        <input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="reset-confirm">{copy.confirmPassword}</label>
        <input
          id="reset-confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <button className="auth-submit" type="submit" disabled={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}