'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { ApiError } from '@/lib/api';
import { Btn, Ico } from '@/components/ui';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState('admin@mrgreentech.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [loading, user, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.replace('/admin');
    } catch (err) {
      if (err instanceof ApiError) setError(err.detail);
      else setError('Could not reach the API. Is the backend running on :8000?');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--c-ink)',
      backgroundImage:
        'radial-gradient(60% 80% at 20% 0%, color-mix(in oklab, var(--c-brand) 60%, transparent), transparent 70%),'
        + 'radial-gradient(50% 70% at 100% 100%, color-mix(in oklab, var(--c-brand2) 40%, transparent), transparent 70%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <header style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: 2 }}>← Back to site</a>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={onSubmit} style={{
          width: '100%', maxWidth: 420,
          background: 'var(--c-surface)',
          borderRadius: 6, padding: '40px 36px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 10 }}>Sign in</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 32, letterSpacing: '-0.02em', color: 'var(--c-ink)', margin: 0 }}>Welcome back.</h1>
            <p style={{ fontSize: 14, color: 'var(--c-ink2)', marginTop: 8 }}>The admin dashboard manages leads coming in from the public contact form.</p>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              style={inputStyle}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={inputStyle}
            />
          </label>

          {error && (
            <div style={{ padding: '12px 14px', borderRadius: 4, background: '#fdecea', color: '#a83232', fontSize: 13, border: '1px solid #f3c4be' }}>
              {error}
            </div>
          )}

          <Btn variant="primary" type="submit" size="lg">
            {busy ? 'Signing in…' : <>Sign in <Ico name="arrow" size={16}/></>}
          </Btn>
        </form>
      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 14px',
  border: '1px solid var(--c-line)',
  borderRadius: 4,
  background: 'var(--c-bg)',
  fontSize: 15,
  fontFamily: 'var(--font-body)',
  color: 'var(--c-ink)',
  outline: 'none',
};
