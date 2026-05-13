'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth';
import { applyTheme, applyCustomThemeOverrides } from '@/components/theme';

/**
 * Wraps every page under /admin with the AuthProvider so login state is
 * shared between /admin and /admin/login, and applies the persisted theme
 * so the admin uses the same green palette the user picked on the public site.
 */
export default function AuthBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyCustomThemeOverrides();
    const theme = (typeof window !== 'undefined' && localStorage.getItem('mrg.theme')) || 'verdant';
    const type = (typeof window !== 'undefined' && localStorage.getItem('mrg.type')) || 'industrial';
    applyTheme(theme, type);
  }, []);
  return <AuthProvider>{children}</AuthProvider>;
}
