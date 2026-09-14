import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuthCopy } from './authTranslations';
import { isRtl, type Lang } from '../../i18n/config';
import './auth.css';

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
  lang?: Lang;
}

export function ForgotPasswordForm({ onBackToLogin, lang }: ForgotPasswordFormProps) {
  const { resetPassword } = useAuth();
  const copy = getAuthCopy(lang).forgot;
  const dir = isRtl(lang as Lang) ? 'rtl' : 'ltr';
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // Lang-aware redirect so the reset-password page opens in the same
      // language the person requested the reset from.
      const redirectTo = `${window.location.origin}/${lang ?? 'en'}/reset-password`;
      await resetPassword(email, redirectTo);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="auth-form" dir={dir}>
        <h2>{copy.checkEmailTitle}</h2>
        <p className="auth-success">{copy.checkEmailBody(email)}</p>
      </div>
    );
  }

  return (
    <form className="auth-form" dir={dir} onSubmit={handleSubmit} noValidate>
      <h2>{copy.title}</h2>

      {error && <p className="auth-error">{error}</p>}

      <div className="auth-field">
        <label htmlFor="forgot-email">{copy.email}</label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="auth-submit" type="submit" disabled={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </button>

      {onBackToLogin && (
        <p className="auth-switch">
          <button type="button" onClick={onBackToLogin}>
            {copy.backToLogin}
          </button>
        </p>
      )}
    </form>
  );
}