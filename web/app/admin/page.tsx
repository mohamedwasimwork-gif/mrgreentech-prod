'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { getToken } from '@/lib/api';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

/**
 * Hard auth gate for /admin.
 *
 *  - If no JWT is in localStorage we redirect to /admin/login immediately
 *    on first render (no flash, no dashboard frame ever shown).
 *  - If a token exists we render the dashboard and let useAuth verify it
 *    against /api/auth/me; if that check fails the AdminDashboard's own
 *    401 handler will sign out and bounce to /admin/login.
 */
export default function AdminPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const ok = !!getToken();
    setHasToken(ok);
    if (!ok) router.replace('/admin/login');
  }, [router]);

  // Watch for token loss while on the page (e.g. logout from another tab).
  useEffect(() => {
    if (!loading && hasToken && !user) router.replace('/admin/login');
  }, [loading, hasToken, user, router]);

  // First-render gate — render nothing until we know if a token exists.
  // No "Loading admin…" copy ever appears for an unauthenticated visitor.
  if (hasToken === null || hasToken === false) return null;

  return <AdminDashboard />;
}
