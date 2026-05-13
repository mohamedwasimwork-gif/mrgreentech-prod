'use client';

import React, { CSSProperties, ReactNode } from 'react';

// Subtle striped placeholder
export function Placeholder({ label, ratio = '16/9', tone = 'brand', className = '', style = {} }: {
  label: string; ratio?: string; tone?: 'brand' | 'accent' | 'muted' | 'neutral'; className?: string; style?: CSSProperties;
}) {
  const bg = tone === 'brand' ? 'var(--c-brand)' : tone === 'accent' ? 'var(--c-accent)' : 'var(--c-surface2)';
  const fg = tone === 'accent' ? 'var(--c-accentInk)' : tone === 'brand' ? 'var(--c-darkInk)' : 'var(--c-ink2)';
  return (
    <div className={`ph ${className}`} style={{
      aspectRatio: ratio,
      background: `repeating-linear-gradient(135deg, ${tone === 'brand' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'} 0 10px, transparent 10px 22px), ${bg}`,
      color: fg,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
      padding: 16, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.05em',
      textTransform: 'uppercase', borderRadius: 2,
      ...style,
    }}>
      <span style={{ opacity: 0.85 }}>▢ {label}</span>
    </div>
  );
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'brand' | 'accent' | 'outline' }) {
  const styles: Record<string, CSSProperties> = {
    default: { background: 'var(--c-chip)', color: 'var(--c-ink2)' },
    brand: { background: 'var(--c-brand)', color: 'var(--c-darkInk)' },
    accent: { background: 'var(--c-accent)', color: 'var(--c-accentInk)' },
    outline: { background: 'transparent', color: 'var(--c-ink)', border: '1px solid var(--c-line)' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
      textTransform: 'uppercase', fontWeight: 500,
      ...styles[tone],
    }}>
      {children}
    </span>
  );
}

export function Btn({ children, variant = 'primary', onClick, size = 'md', style = {}, type }: {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'ghost' | 'dark' | 'link';
  onClick?: (e?: any) => void;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}) {
  const base: CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: size === 'sm' ? '8px 14px' : size === 'lg' ? '16px 28px' : '12px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: size === 'sm' ? 13 : size === 'lg' ? 16 : 14,
    fontWeight: 500, letterSpacing: '0.01em',
    border: 'none', cursor: 'pointer', borderRadius: 2,
    transition: 'all 0.15s ease',
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: 'var(--c-brand)', color: 'var(--c-darkInk)' },
    accent: { background: 'var(--c-accent)', color: 'var(--c-accentInk)' },
    ghost: { background: 'transparent', color: 'var(--c-ink)', border: '1px solid var(--c-line)' },
    dark: { background: 'var(--c-ink)', color: 'var(--c-bg)' },
    link: { background: 'transparent', color: 'var(--c-ink)', padding: 0, borderBottom: '1px solid currentColor', borderRadius: 0 },
  };
  return (
    <button type={type} onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => { if (variant === 'primary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--c-brand2)'; }}
      onMouseLeave={(e) => { if (variant === 'primary') (e.currentTarget as HTMLButtonElement).style.background = 'var(--c-brand)'; }}>
      {children}
    </button>
  );
}

// Tiny iconographic glyphs (monoline, 1px stroke, squares/circles only)
export function Ico({ name, size = 16 }: { name: string; size?: number }) {
  const s = size;
  const sw = 1.4;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const };
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    arrowDown: <><path d="M12 5v14"/><path d="M6 13l6 6 6-6"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    x: <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
    check: <path d="M5 12l5 5 9-12"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    dot: <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>,
    square: <rect x="5" y="5" width="14" height="14"/>,
    circle: <circle cx="12" cy="12" r="7"/>,
    diamond: <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)"/>,
    mail: <><rect x="3" y="6" width="18" height="12"/><path d="M3 7l9 6 9-6"/></>,
    phone: <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z"/>,
    pin: <><path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2"/></>,
    globe: <><circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4a11 11 0 010 16"/><path d="M12 4a11 11 0 000 16"/></>,
    ship: <><path d="M3 16l9-10 9 10"/><path d="M5 20h14"/><path d="M12 6v14"/></>,
    leaf: <><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l9-9"/></>,
    scale: <><path d="M12 4v16"/><path d="M6 20h12"/><path d="M6 10l-3 5h6l-3-5z"/><path d="M18 10l-3 5h6l-3-5z"/></>,
    factory: <><path d="M3 20V10l5 3V10l5 3V6l8 4v10"/><path d="M3 20h18"/></>,
    doc: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></>,
    edit: <><path d="M4 20h4l11-11-4-4L4 16z"/></>,
    trash: <><path d="M5 7h14"/><path d="M9 7V4h6v3"/><path d="M7 7l1 13h8l1-13"/></>,
    upload: <><path d="M12 16V4"/><path d="M6 10l6-6 6 6"/><path d="M4 20h16"/></>,
    grid: <><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></>,
    chart: <><path d="M4 20V6"/><path d="M4 20h16"/><rect x="7" y="12" width="3" height="8"/><rect x="13" y="8" width="3" height="12"/><rect x="19" y="14" width="2" height="6"/></>,
    users: <><circle cx="9" cy="9" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2"/><path d="M15 20c0-2 2-4 4-4s2 2 2 4"/></>,
    search: <><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></>,
    filter: <><path d="M4 5h16l-6 8v5l-4 2v-7z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></>,
    download: <><path d="M12 4v12"/><path d="M6 10l6 6 6-6"/><path d="M4 20h16"/></>,
    clock: <><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></>,
    lock: <><rect x="5" y="11" width="14" height="9"/><path d="M8 11V7a4 4 0 018 0v4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><path d="M5 5l2 2"/><path d="M17 17l2 2"/><path d="M19 5l-2 2"/><path d="M7 17l-2 2"/></>,
    folder: <><path d="M3 7h6l2 2h10v11H3z"/></>,
    image: <><rect x="3" y="5" width="18" height="14"/><circle cx="9" cy="10" r="2"/><path d="M3 17l6-6 4 4 3-3 5 5"/></>,
    star: <path d="M12 3l2.8 6 6.2.9-4.5 4.3 1 6.3L12 17.5 6.5 20.5l1-6.3L3 9.9l6.2-.9z"/>,
    link: <><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    'eye-off': <><path d="M4 4l16 16"/><path d="M9 5.5a9 9 0 0111 6.5 14 14 0 01-2.2 3.3"/><path d="M6 8a13 13 0 00-4 4s4 7 10 7c1.5 0 2.9-.4 4-1"/></>,
    copy: <><rect x="8" y="8" width="12" height="12"/><path d="M4 16V4h12"/></>,
    shield: <><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/></>,
    box: <><path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M4 7l8 4 8-4"/><path d="M12 11v10"/></>,
    truck: <><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></>,
    dollar: <><path d="M12 3v18"/><path d="M16 7H10a3 3 0 000 6h4a3 3 0 010 6H8"/></>,
    refresh: <><path d="M4 12a8 8 0 0114-5l2 2"/><path d="M20 3v6h-6"/><path d="M20 12a8 8 0 01-14 5l-2-2"/><path d="M4 21v-6h6"/></>,
    warn: <><path d="M12 3l10 18H2z"/><path d="M12 10v5"/><circle cx="12" cy="18" r="0.5" fill="currentColor"/></>,
  };
  return <svg {...common}>{paths[name] || paths.square}</svg>;
}

// Section header
export function SectionHead({ eyebrow, title, kicker, align = 'left', width = 'lg' }: {
  eyebrow?: string; title?: string; kicker?: string; align?: 'left' | 'center'; width?: 'lg' | 'md';
}) {
  return (
    <div style={{ textAlign: align, maxWidth: width === 'lg' ? 820 : 560, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
      {eyebrow && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>{eyebrow}</div>}
      {title && <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1.04, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0, textWrap: 'balance' as any }}>{title}</h2>}
      {kicker && <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 20, textWrap: 'pretty' as any }}>{kicker}</p>}
    </div>
  );
}

// Data row
export function DataRow({ label, value, unit }: { label: string; value: ReactNode; unit?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid var(--c-line)', gap: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--c-ink)' }}>
        {value}{unit && <span style={{ fontSize: 12, color: 'var(--c-muted)', marginLeft: 4 }}>{unit}</span>}
      </span>
    </div>
  );
}

// Shared input style for form fields used across modals & admin
export const inputStyle: CSSProperties = {
  padding: '12px 14px', border: '1px solid var(--c-line)', background: 'var(--c-surface)',
  fontSize: 15, fontFamily: 'var(--font-body)', color: 'var(--c-ink)', borderRadius: 2, outline: 'none',
};

// Icon-only button style (used in admin detail rows)
export const iconBtn: CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--c-line)',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 2,
  color: 'var(--c-ink2)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Shared form Field used across quote & admin
export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{hint}</span>}
    </label>
  );
}
