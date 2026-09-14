import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import type { Lang } from '../../i18n/config';

type AuthView = 'login' | 'signup' | 'forgot';

interface AuthPanelProps {
  onSuccess?: () => void;
  initialView?: AuthView;
  lang?: Lang;
}

/**
 * Drop-in auth widget that handles switching between login, sign up,
 * and forgot-password views. Use this in a modal or on a dedicated
 * /login page.
 */
export function AuthPanel({ onSuccess, initialView = 'login', lang }: AuthPanelProps) {
  const [view, setView] = useState<AuthView>(initialView);

  if (view === 'signup') {
    return (
      <SignUpForm
        onSuccess={onSuccess}
        onSwitchToLogin={() => setView('login')}
        lang={lang}
      />
    );
  }

  if (view === 'forgot') {
    return <ForgotPasswordForm onBackToLogin={() => setView('login')} lang={lang} />;
  }

  return (
    <LoginForm
      onSuccess={onSuccess}
      onSwitchToSignUp={() => setView('signup')}
      onForgotPassword={() => setView('forgot')}
      lang={lang}
    />
  );
}