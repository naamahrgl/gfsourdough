import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuthCopy } from './authTranslations';
import { isRtl, type Lang } from '../../i18n/config';
import './auth.css';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
  onForgotPassword?: () => void;
  lang?: Lang;
}

export function LoginForm({
  onSuccess,
  onSwitchToSignUp,
  onForgotPassword,
  lang,
}: LoginFormProps) {
  const { signIn } = useAuth();
  const copy = getAuthCopy(lang).login;
  const dir = isRtl(lang as Lang) ? 'rtl' : 'ltr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function mapAuthError(err: unknown): string {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('Invalid login credentials')) return copy.errorInvalidCredentials;
    if (msg.includes('Email not confirmed')) return copy.errorEmailNotConfirmed;
    return msg || copy.errorGeneric;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn({ email, password });
      onSuccess?.();
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" dir={dir} onSubmit={handleSubmit} noValidate>
      <h2>{copy.title}</h2>

      {error && <p className="auth-error">{error}</p>}

      <div className="auth-field">
        <label htmlFor="login-email">{copy.email}</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="login-password">{copy.password}</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {onForgotPassword && (
        <div className="auth-forgot">
          <button type="button" onClick={onForgotPassword}>
            {copy.forgotPassword}
          </button>
        </div>
      )}

      <button className="auth-submit" type="submit" disabled={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </button>

      {onSwitchToSignUp && (
        <p className="auth-switch">
          {copy.noAccount}{' '}
          <button type="button" onClick={onSwitchToSignUp}>
            {copy.signUpLink}
          </button>
        </p>
      )}
    </form>
  );
}