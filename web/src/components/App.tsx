'use client';

import React, { useEffect, useState } from 'react';
import { Footer, SiteCTA, TopNav } from './site/nav';
import { PageHome } from './site/page_home';
import { PageAbout, PageBlog, PageBlogDetail, PageContact, PageLegal, PageServices, PageSustainability } from './site/pages';
import { QuoteModal, type QuoteForm } from './site/quote';
import { THEMES, TYPES, applyTheme, applyCustomThemeOverrides } from './theme';
import { api } from '@/lib/api';

const safeRead = (k: string, fallback: string) => {
  if (typeof window === 'undefined') return fallback;
  return localStorage.getItem(k) || fallback;
};

const safeWrite = (k: string, v: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(k, v);
};

export default function App() {
  const [route, setRoute] = useState('home');
  const [theme, setTheme] = useState('verdant');
  const [type, setType] = useState('industrial');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    applyCustomThemeOverrides();
    setRoute(safeRead('mrg.route', 'home'));
    setTheme(safeRead('mrg.theme', 'verdant'));
    setType(safeRead('mrg.type', 'industrial'));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyTheme(theme, type);
    safeWrite('mrg.theme', theme);
    safeWrite('mrg.type', type);
  }, [theme, type, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    safeWrite('mrg.route', route);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [route, hydrated]);

  useEffect(() => {
    applyTheme(theme, type);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Public quote-form submission — POSTs to the FastAPI backend so the lead
  // shows up in /admin. If the backend is unreachable, the modal still
  // shows its confirmation state so the user is not blocked.
  const submitQuote = async (form: QuoteForm): Promise<void> => {
    try {
      await api.createLead({
        name: form.name || 'Anonymous',
        email: form.email || 'unknown@example.com',
        company: form.company || '',
        country: form.country || '',
        phone: form.phone || '',
        side: form.side,
        material: form.grade || form.material || 'Unspecified',
        volume_mt: parseInt(form.volume) || 0,
        port: form.port || '',
        origin: form.origin || '',
        destination: form.destination || '',
        incoterm: form.incoterm || '',
        frequency: form.frequency || '',
        customer_notes: form.notes || '',
      });
    } catch (err) {
      // Stay graceful — log but don't block the customer
      // eslint-disable-next-line no-console
      console.error('Lead submit failed:', err);
    }
  };

  const onNav = (r: string) => {
    if (r === 'quote') { setQuoteOpen(true); return; }
    setRoute(r);
  };

  const openAdmin = () => {
    if (typeof window !== 'undefined') window.location.href = '/admin';
  };

  return (
    <>
      <TopNav current={route} onNav={onNav} onOpenQuote={() => setQuoteOpen(true)} onOpenAdmin={openAdmin}/>

      {route === 'home' && <PageHome onNav={onNav} onOpenQuote={() => setQuoteOpen(true)}/>}
      {route === 'about' && <PageAbout onNav={onNav}/>}
      {route === 'services' && <PageServices onNav={onNav} onOpenQuote={() => setQuoteOpen(true)}/>}
      {route.startsWith('services:') && <PageServices onNav={onNav} onOpenQuote={() => setQuoteOpen(true)} initialId={route.slice(9)}/>}
      {route === 'sustainability' && <PageSustainability/>}
      {route === 'contact' && <PageContact/>}
      {route === 'blog' && <PageBlog onNav={onNav}/>}
      {route.startsWith('blog:') && <PageBlogDetail id={route.slice(5)} onNav={onNav} onOpenQuote={() => setQuoteOpen(true)}/>}
      {route === 'privacy' && <PageLegal kind="privacy"/>}
      {route === 'terms' && <PageLegal kind="terms"/>}

      <SiteCTA onNav={onNav} onOpenQuote={() => setQuoteOpen(true)}/>
      <Footer onNav={onNav} onOpenQuote={() => setQuoteOpen(true)}/>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} onSubmit={submitQuote}/>

      <TweaksToggle onToggle={() => setTweaksOpen(o => !o)}/>
      {tweaksOpen && <TweaksPanel theme={theme} setTheme={setTheme} type={type} setType={setType}/>}
    </>
  );
}

function TweaksToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button onClick={onToggle} title="Open theme tweaks" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 199,
      width: 44, height: 44, borderRadius: '50%',
      background: 'var(--c-ink)', color: 'var(--c-darkInk)',
      border: 'none', cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: 16,
    }}>◆</button>
  );
}

function TweaksPanel({ theme, setTheme, type, setType }: {
  theme: string; setTheme: (k: string) => void;
  type: string; setType: (k: string) => void;
}) {
  return (
    <div style={{
      position: 'fixed', bottom: 80, right: 24, zIndex: 200,
      width: 320, background: 'var(--c-surface)', border: '1px solid var(--c-line)',
      borderRadius: 4, boxShadow: '0 20px 50px rgba(0,0,0,0.18)', overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 18px', background: 'var(--c-ink)', color: 'var(--c-darkInk)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>◆ Tweaks</span><span style={{ opacity: 0.6 }}>Design system</span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 10 }}>Theme</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 18 }}>
          {Object.entries(THEMES).map(([k, t]) => (
            <button key={k} onClick={() => setTheme(k)} style={{
              padding: '10px 8px', border: '1px solid ' + (theme === k ? 'var(--c-ink)' : 'var(--c-line)'),
              background: theme === k ? 'var(--c-ink)' : 'var(--c-surface)',
              color: theme === k ? 'var(--c-bg)' : 'var(--c-ink)', cursor: 'pointer', borderRadius: 2, textAlign: 'left',
            }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
                <span style={{ width: 10, height: 10, background: t.brand, borderRadius: 2 }}/>
                <span style={{ width: 10, height: 10, background: t.brand2, borderRadius: 2 }}/>
                <span style={{ width: 10, height: 10, background: t.accent, borderRadius: 2 }}/>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>{t.name}</div>
            </button>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 10 }}>Typography</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {Object.entries(TYPES).map(([k, t]) => (
            <button key={k} onClick={() => setType(k)} style={{
              padding: 10, border: '1px solid ' + (type === k ? 'var(--c-ink)' : 'var(--c-line)'),
              background: type === k ? 'var(--c-ink)' : 'var(--c-surface)',
              color: type === k ? 'var(--c-bg)' : 'var(--c-ink)', cursor: 'pointer', borderRadius: 2, textAlign: 'left',
            }}>
              <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.displayWeight, letterSpacing: '-0.02em' }}>{t.name}</div>
              <div style={{ fontFamily: t.body, fontSize: 11, opacity: 0.7, marginTop: 2 }}>{t.display.split(',')[0].replace(/'/g, '')}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
