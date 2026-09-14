export interface AuthCopy {
  login: {
    title: string;
    email: string;
    password: string;
    forgotPassword: string;
    submit: string;
    submitting: string;
    noAccount: string;
    signUpLink: string;
    errorInvalidCredentials: string;
    errorEmailNotConfirmed: string;
    errorGeneric: string;
  };
  signup: {
    title: string;
    fullName: string;
    email: string;
    password: string;
    passwordTooShort: string;
    submit: string;
    submitting: string;
    haveAccount: string;
    loginLink: string;
    checkEmailTitle: string;
    checkEmailBody: (email: string) => string;
    errorAlreadyRegistered: string;
    errorWeakPassword: string;
    errorGeneric: string;
  };
  forgot: {
    title: string;
    email: string;
    submit: string;
    submitting: string;
    backToLogin: string;
    checkEmailTitle: string;
    checkEmailBody: (email: string) => string;
    errorGeneric: string;
  };
  reset: {
    title: string;
    newPassword: string;
    confirmPassword: string;
    submit: string;
    submitting: string;
    passwordMismatch: string;
    passwordTooShort: string;
    successTitle: string;
    successBody: string;
    goToLogin: string;
    errorGeneric: string;
    errorExpiredLink: string;
  };
}

const en: AuthCopy = {
  login: {
    title: 'Log in',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    submit: 'Log in',
    submitting: 'Logging in…',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up',
    errorInvalidCredentials: 'Incorrect email or password.',
    errorEmailNotConfirmed: 'Please confirm your email before logging in.',
    errorGeneric: 'Something went wrong. Please try again.',
  },
  signup: {
    title: 'Create an account',
    fullName: 'Full name',
    email: 'Email',
    password: 'Password',
    passwordTooShort: 'Password must be at least 8 characters.',
    submit: 'Sign up',
    submitting: 'Creating account…',
    haveAccount: 'Already have an account?',
    loginLink: 'Log in',
    checkEmailTitle: 'Check your email',
    checkEmailBody: (email) =>
      `We sent a confirmation link to ${email}. Click it to activate your account, then log in.`,
    errorAlreadyRegistered: 'An account with this email already exists.',
    errorWeakPassword: 'Password is too weak — use at least 8 characters.',
    errorGeneric: 'Something went wrong. Please try again.',
  },
  forgot: {
    title: 'Reset your password',
    email: 'Email',
    submit: 'Send reset link',
    submitting: 'Sending…',
    backToLogin: 'Back to log in',
    checkEmailTitle: 'Check your email',
    checkEmailBody: (email) =>
      `If an account exists for ${email}, a password reset link is on its way.`,
    errorGeneric: 'Something went wrong. Please try again.',
  },
  reset: {
    title: 'Set a new password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    submit: 'Update password',
    submitting: 'Updating…',
    passwordMismatch: "Passwords don't match.",
    passwordTooShort: 'Password must be at least 8 characters.',
    successTitle: 'Password updated',
    successBody: 'Your password has been updated successfully.',
    goToLogin: 'Go to login',
    errorGeneric: 'Something went wrong. Please try again.',
    errorExpiredLink: 'This reset link is invalid or has expired. Please request a new one.',
  },
};

const he: AuthCopy = {
  login: {
    title: 'התחברות',
    email: 'אימייל',
    password: 'סיסמה',
    forgotPassword: 'שכחת סיסמה?',
    submit: 'התחברות',
    submitting: 'מתחבר/ת...',
    noAccount: 'אין לך חשבון?',
    signUpLink: 'הרשמה',
    errorInvalidCredentials: 'אימייל או סיסמה שגויים.',
    errorEmailNotConfirmed: 'יש לאשר את כתובת האימייל לפני ההתחברות.',
    errorGeneric: 'משהו השתבש. נסה/י שוב.',
  },
  signup: {
    title: 'יצירת חשבון',
    fullName: 'שם מלא',
    email: 'אימייל',
    password: 'סיסמה',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 8 תווים.',
    submit: 'הרשמה',
    submitting: 'יוצר/ת חשבון...',
    haveAccount: 'כבר יש לך חשבון?',
    loginLink: 'התחברות',
    checkEmailTitle: 'בדוק/י את תיבת הדואר',
    checkEmailBody: (email) =>
      `שלחנו קישור אישור לכתובת ${email}. יש ללחוץ עליו כדי להפעיל את החשבון, ולאחר מכן להתחבר.`,
    errorAlreadyRegistered: 'קיים כבר חשבון עם אימייל זה.',
    errorWeakPassword: 'הסיסמה חלשה מדי — יש להשתמש בלפחות 8 תווים.',
    errorGeneric: 'משהו השתבש. נסה/י שוב.',
  },
  forgot: {
    title: 'איפוס סיסמה',
    email: 'אימייל',
    submit: 'שליחת קישור לאיפוס',
    submitting: 'שולח...',
    backToLogin: 'חזרה להתחברות',
    checkEmailTitle: 'בדוק/י את תיבת הדואר',
    checkEmailBody: (email) =>
      `אם קיים חשבון עבור ${email}, קישור לאיפוס הסיסמה נשלח אליו.`,
    errorGeneric: 'משהו השתבש. נסה/י שוב.',
  },
  reset: {
    title: 'הגדרת סיסמה חדשה',
    newPassword: 'סיסמה חדשה',
    confirmPassword: 'אימות סיסמה',
    submit: 'עדכון סיסמה',
    submitting: 'מעדכן...',
    passwordMismatch: 'הסיסמאות אינן תואמות.',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 8 תווים.',
    successTitle: 'הסיסמה עודכנה',
    successBody: 'הסיסמה שלך עודכנה בהצלחה.',
    goToLogin: 'מעבר להתחברות',
    errorGeneric: 'משהו השתבש. נסה/י שוב.',
    errorExpiredLink: 'קישור האיפוס אינו תקף או שפג תוקפו. יש לבקש קישור חדש.',
  },
};

// Add more locales here as your site supports them. Falls back to English
// for any language not in this catalog.
const catalog: Record<string, AuthCopy> = { en, he };

export function getAuthCopy(lang: string | undefined): AuthCopy {
  return catalog[lang ?? 'en'] ?? catalog.en;
}