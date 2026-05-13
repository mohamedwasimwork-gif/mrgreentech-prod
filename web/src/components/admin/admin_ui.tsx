'use client';

import React, { ReactNode } from 'react';
import { Ico, inputStyle } from '../ui';
import type { LeadStatus } from '@/lib/api';

export function StatCard({ label, value, sub, accent }: { label: string; value: ReactNode; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      padding: 24, border: '1px solid var(--c-line)', background: 'var(--c-surface)',
      borderRadius: 4, transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any,
        fontSize: 44, letterSpacing: '-0.03em',
        color: accent ? 'var(--c-brand)' : 'var(--c-ink)',
        marginTop: 12, lineHeight: 1,
      }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 8 }}>{sub}</div>}
    </div>
  );
}

const statusColor: Record<LeadStatus, string> = {
  new: 'var(--c-accent)',
  contacted: 'var(--c-brand2)',
  qualified: 'var(--c-brand)',
  won: 'var(--c-brand)',
  lost: 'var(--c-muted)',
};

const statusLabel: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  won: 'Won',
  lost: 'Lost',
};

export function StatusPill({ status }: { status: LeadStatus }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em',
      textTransform: 'uppercase', color: 'var(--c-ink2)',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[status] }}/>
      {statusLabel[status]}
    </span>
  );
}

export function Drawer({ open, onClose, children, width = 540 }: {
  open: boolean; onClose: () => void; children?: ReactNode; width?: number;
}) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 95,
      background: 'rgba(8, 12, 9, 0.5)', backdropFilter: 'blur(4px)',
    }}>
      <aside onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width,
        background: 'var(--c-bg)', borderLeft: '1px solid var(--c-line)',
        overflow: 'auto',
        boxShadow: '-24px 0 60px rgba(0, 0, 0, 0.18)',
      }}>
        {children}
      </aside>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search by name, company, material…' }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-muted)' }}>
        <Ico name="search" size={15}/>
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, width: '100%', paddingLeft: 40, fontSize: 14 }}
      />
    </div>
  );
}
