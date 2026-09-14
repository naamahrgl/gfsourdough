import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

interface UserMenuProps {
  loginHref?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

// Matches astro-icon's `fa6-solid:user` (Font Awesome 6 Solid) path data,
// since the Icon component from 'astro-icon/components' is Astro-only and
// can't render inside this client-side React island.
const PersonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
  </svg>
);

/**
 * Header widget: a person-icon button. Signed out -> links straight to
 * /login. Signed in -> opens a small dropdown with the user's name and
 * a sign-out action.
 *
 * buttonClassName/iconClassName let you pass your existing style tokens
 * (e.g. your `cartButton`/`iconButton` classes) so this matches the rest
 * of the header visually.
 */
export function UserMenu({ loginHref = '/login', buttonClassName, iconClassName }: UserMenuProps) {
  const { isAuthenticated, profile, user, signOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <a href={loginHref} className={buttonClassName} aria-label="Log in">
        <PersonIcon className={iconClassName} />
      </a>
    );
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = '/';
  }

  const displayName = profile?.full_name || user?.email || '';

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <button
        className={buttonClassName}
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <PersonIcon className={iconClassName} />
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <p className="user-menu-name">{displayName}</p>
          <button className="user-menu-signout" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}