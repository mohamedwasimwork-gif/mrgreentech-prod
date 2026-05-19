'use client';

import React, { useEffect, useState } from 'react';
import { Btn, Ico } from '../ui';
import { COMPANY } from '../data';

/**
 * Brand logo. The image at /500x700.png contains the icon + "M R Greentech"
 * wordmark together, so we render just the image and skip the separate text.
 *
 * The `size` prop drives the rendered height in pixels. The width auto-scales
 * to maintain the source aspect (~1.4 : 1). Used at size=22 in TopNav and
 * footer, size=20 in admin shell and admin login.
 */
export function Logo({ size = 22, variant = 'ink' }: { size?: number; variant?: 'ink' | 'dark' | 'brand' }) {
  // The source image at /500x700.png is a 1.4 : 1 rectangle with
  // whitespace around the actual icon + wordmark inside it.
  // We render at ~2.4× the legacy text-size so the lockup reads
  // cleanly without inflating the header height.
  // size=22 (default in TopNav/footer)  → ~53 px tall
  // size=14 (admin shell + login page)  → ~34 px tall
  const renderedHeight = size * 2.4;
  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
      data-variant={variant}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/500x700.png"
        alt="M R Greentech"
        width={Math.round(renderedHeight * 1.4)}
        height={Math.round(renderedHeight)}
        style={{ height: renderedHeight, width: 'auto', display: 'block' }}
        decoding="async"
      />
    </div>
  );
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'blog', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
];

export function TopNav({ current, onNav, onOpenQuote }: {
  current: string;
  onNav: (r: string) => void;
  onOpenQuote: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Highlight Services for any services:* sub-route, Insights for blog:*, etc.
  const matches = (id: string) => current === id || current.startsWith(`${id}:`);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [current]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'color-mix(in oklab, var(--c-bg) 85%, transparent)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--c-line)',
    }}>
      {/* Utility strip */}
      <div className="mrg-utility-strip" style={{
        background: 'var(--c-ink)', color: 'var(--c-bg)',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
        padding: '7px 0',
      }}>
        <div className="mrg-container mrg-utility-row">
          <span className="mrg-utility-id">
            <span className="mrg-hide-mobile">◆ CPCB {COMPANY.cpcb} · </span>
            <span>GST {COMPANY.gst}</span>
          </span>
          <span className="mrg-utility-meta">
            <span>{COMPANY.phone}</span>
            <span className="mrg-hide-mobile">{COMPANY.email}</span>
            <span className="mrg-hide-mobile">Mon–Sat · 09:00–18:30 IST</span>
          </span>
        </div>
      </div>

      <div className="mrg-container mrg-topnav-row">
        <button onClick={() => onNav('home')} aria-label="Home" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Logo size={22} />
        </button>

        {/* Desktop nav */}
        <nav className="mrg-nav-desktop" aria-label="Primary">
          {NAV_ITEMS.map((it) => (
            <button key={it.id} onClick={() => onNav(it.id)} style={{
              background: matches(it.id) ? 'var(--c-chip)' : 'transparent',
              border: 'none', cursor: 'pointer',
              padding: '8px 14px', borderRadius: 2,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              color: matches(it.id) ? 'var(--c-ink)' : 'var(--c-ink2)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { if (!matches(it.id)) (e.currentTarget as HTMLButtonElement).style.background = 'var(--c-chip)'; }}
            onMouseLeave={(e) => { if (!matches(it.id)) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
              {it.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="mrg-nav-actions">
          <Btn variant="primary" size="sm" onClick={onOpenQuote}>
            Request quote <Ico name="arrow" size={14}/>
          </Btn>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          className="mrg-nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <Ico name={menuOpen ? 'x' : 'menu'} size={22}/>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mrg-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <aside className="mrg-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <nav aria-label="Mobile primary" style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_ITEMS.map((it) => (
                <button
                  key={it.id}
                  onClick={() => { onNav(it.id); setMenuOpen(false); }}
                  style={{
                    background: matches(it.id) ? 'var(--c-chip)' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--c-line)',
                    fontFamily: 'var(--font-display)', fontSize: 18,
                    color: matches(it.id) ? 'var(--c-ink)' : 'var(--c-ink2)',
                  }}>
                  {it.label}
                </button>
              ))}
            </nav>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Btn variant="primary" size="md" onClick={() => { onOpenQuote(); setMenuOpen(false); }}>
                Request quote <Ico name="arrow" size={14}/>
              </Btn>
            </div>
            <div style={{ padding: 20, borderTop: '1px solid var(--c-line)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a href={`tel:${COMPANY.phone}`} style={{ color: 'var(--c-ink)', textDecoration: 'none' }}>{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--c-ink2)', textDecoration: 'none' }}>{COMPANY.email}</a>
              <span>CPCB {COMPANY.cpcb} · GST {COMPANY.gst}</span>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

function FooterCol({ title, items, onNav }: { title: string; items: Array<[string, string, (() => void)?]>; onNav: (r: string) => void }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(([label, route, handler], i) => (
          <li key={i}>
            <button onClick={() => (handler ? handler() : onNav(route))} style={{
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.82)', cursor: 'pointer',
              padding: 0, fontFamily: 'var(--font-body)', fontSize: 14, textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--c-accent)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.82)'}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------------------
// Site-wide CTA — rendered above the Footer on every public page.
// Editable text comes from the same `home` content keys the admin
// already exposes, so changing them on the home-page editor updates
// the CTA across the whole site.
// ------------------------------------------------------------
export function SiteCTA({ onNav, onOpenQuote }: { onNav: (r: string) => void; onOpenQuote: () => void }) {
  return (
    <section style={{ padding: 'clamp(64px, 9vw, 120px) 0', background: 'var(--c-accent)', color: 'var(--c-accentInk)' }}>
      <div className="mrg-container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--display-weight)' as any,
          fontSize: 'clamp(36px, 5.2vw, 72px)',
          lineHeight: 0.98,
          letterSpacing: 'var(--display-tracking)',
          margin: 0,
          textWrap: 'balance' as any,
        }}>
          Have a lot to move? Send us the details.
        </h2>
        <div>
          <p style={{ fontSize: 17, lineHeight: 1.55, marginBottom: 32, opacity: 0.82 }}>
            Most quote requests get a response within one working day. Attach your MTR or photos if you have them.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn variant="dark" size="lg" onClick={onOpenQuote}>
              Request quote <Ico name="arrow" size={16}/>
            </Btn>
            <Btn variant="ghost" size="lg" onClick={() => onNav('contact')} style={{ borderColor: 'var(--c-accentInk)' }}>
              Contact team
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onNav, onOpenQuote }: { onNav: (r: string) => void; onOpenQuote: () => void }) {
  return (
    <footer style={{ background: 'var(--c-ink)', color: 'var(--c-darkInk)', marginTop: 80 }}>
      <div className="mrg-container mrg-footer-wrap">
        <div className="mrg-footer-grid">
          <div className="mrg-footer-brand">
            <Logo size={22} variant="dark" />
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', marginTop: 20, maxWidth: 340 }}>
              A professional waste management partner based in Chennai — collecting, treating, recovering and safely disposing of industrial waste since {COMPANY.established}.
            </p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              <span>CPCB · {COMPANY.cpcb}</span>
              <span>GST · {COMPANY.gst}</span>
              <span>ISO 14001 · 2018 (renewed)</span>
            </div>
          </div>
          <FooterCol title="Company" items={[
            ['About', 'about'], ['Services', 'services'],
            ['Sustainability', 'sustainability'], ['Insights', 'blog'], ['Contact', 'contact'],
          ]} onNav={onNav} />
          <FooterCol title="Trade" items={[
            ['Request quote', 'quote', onOpenQuote],
            ['Supplier registration', 'contact'],
            ['Grade reference', 'services'],
            ['Port operations', 'services'],
          ]} onNav={onNav} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>Head Office</div>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              {COMPANY.address}
            </div>
            <div style={{ fontSize: 14, marginTop: 18, lineHeight: 1.7 }}>
              <a href={`tel:${COMPANY.phone}`} style={{ color: 'var(--c-accent)', textDecoration: 'none' }}>{COMPANY.phone}</a><br/>
              <a href={`mailto:${COMPANY.email}`} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>{COMPANY.email}</a>
            </div>
          </div>
        </div>
        <div className="mrg-footer-bottom">
          <span>© {new Date().getFullYear()} MR Greentech Trading Pvt. Ltd. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <button onClick={() => onNav('privacy')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>Privacy Policy</button>
            <button onClick={() => onNav('terms')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>Terms of Service</button>
            <span>v2026.04</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
