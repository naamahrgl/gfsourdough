import { AuthProvider } from '../../context/AuthContext';
import { UserMenu } from './UserMenu';

interface HeaderAuthWidgetProps {
  loginHref?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

/**
 * The piece that goes in Header.astro. This is a self-contained island:
 * it brings its own AuthProvider so it works no matter what other islands
 * (CartDrawer, etc.) are on the page.
 *
 * buttonClassName/iconClassName: pass your existing style tokens so the
 * profile icon matches your cart button, e.g.:
 *
 *   <HeaderAuthWidget
 *     client:only="react"
 *     loginHref={`/${lang}/login`}
 *     buttonClassName={cartButton}
 *     iconClassName={iconButton}
 *   />
 */
export default function HeaderAuthWidget({
  loginHref = '/login',
  buttonClassName,
  iconClassName,
}: HeaderAuthWidgetProps) {
  return (
    <AuthProvider>
      <UserMenu loginHref={loginHref} buttonClassName={buttonClassName} iconClassName={iconClassName} />
    </AuthProvider>
  );
}