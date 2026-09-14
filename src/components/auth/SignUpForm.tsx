import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuthCopy } from './authTranslations';
import { isRtl, type Lang } from '../../i18n/config';
import './auth.css';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
  lang?: Lang;
}

export function SignUpForm({ onSuccess, onSwitchToLogin, lang }: SignUpFormProps) {
  const { signUp } = useAuth();
  const copy = getAuthCopy(lang).signup;
  const dir = isRtl(lang as Lang) ? 'rtl' : 'ltr';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function mapAuthError(err: unknown): string {
    const msg = err instanceof Error ? err.message : '';
    if (msg.includes('User already registered')) return copy.errorAlreadyRegistered;
    if (msg.includes('Password should be')) return copy.errorWeakPassword;
    return msg || copy.errorGeneric;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError(copy.passwordTooShort);
      return;
    }

    setSubmitting(true);
    try {
      const data = await signUp({ email, password, fullName });
      // If email confirmation is required, Supabase returns a user with
      // no session yet. Show a "check your inbox" state instead of
      // treating this as fully logged in.
      if (data.user && !data.session) {
        setSubmitted(true);
      } else {
        onSuccess?.();
      }
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
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
        <label htmlFor="signup-name">{copy.fullName}</label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="signup-email">{copy.email}</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="signup-password">{copy.password}</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="auth-submit" type="submit" disabled={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </button>

      {onSwitchToLogin && (
        <p className="auth-switch">
          {copy.haveAccount}{' '}
          <button type="button" onClick={onSwitchToLogin}>
            {copy.loginLink}
          </button>
        </p>
      )}
    </form>
  );
}