import { useEffect, type ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Gates content behind a login check inside an island. Since Astro pages
 * are plain HTML (not a client-side router), "protecting" a page happens
 * by rendering this around the page's interactive content and redirecting
 * with a real navigation if there's no session.
 *
 * Note: this is a client-side-only check. The protected content briefly
 * exists in the page's JS bundle even if redirected away -- fine for
 * gating course progress UI, but don't rely on it alone to hide anything
 * truly sensitive. That needs a server-side check (Astro SSR + Supabase
 * cookie auth), which is worth doing once real paid content is behind it.
 *
 *   <RequireAuth redirectTo="/login">
 *     <Dashboard />
 *   </RequireAuth>
 */
export function RequireAuth({ children, redirectTo = '/login' }: RequireAuthProps) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [loading, isAuthenticated, redirectTo]);

  if (loading || !isAuthenticated) {
    return <div className="auth-loading">Loading…</div>;
  }

  return <>{children}</>;
}