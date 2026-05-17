'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Btn, Ico } from '../ui';
import { Logo } from '../site/nav';
import { ApiError, ApiLead, LeadStatus, api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Drawer, SearchInput, StatCard, StatusPill } from './admin_ui';

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  won: 'Won',
  lost: 'Lost',
};
const STATUS_ORDER: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

export function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | LeadStatus>('all');
  const [selected, setSelected] = useState<ApiLead | null>(null);

  const load = useCallback(async () => {
    try {
      const rows = await api.listLeads();
      setLeads(rows);
      setLoadError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        router.replace('/admin/login');
        return;
      }
      setLoadError(err instanceof Error ? err.message : 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  }, [logout, router]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const total = leads.length;
    const byStatus: Record<LeadStatus, number> = { new: 0, contacted: 0, qualified: 0, won: 0, lost: 0 };
    leads.forEach((l) => { byStatus[l.status]++; });
    return {
      total,
      byStatus,
      responseNeeded: byStatus.new,
      active: byStatus.contacted + byStatus.qualified,
    };
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== 'all' && l.status !== filter) return false;
      if (search) {
        const hay = `${l.name} ${l.company} ${l.ref} ${l.material} ${l.country} ${l.email}`.toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [leads, search, filter]);

  const onStatusChange = async (lead: ApiLead, status: LeadStatus) => {
    try {
      const updated = await api.patchLead(lead.id, { status });
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
      if (selected && selected.id === lead.id) setSelected(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not update status');
    }
  };

  const onAddNote = async (lead: ApiLead, body: string) => {
    try {
      const note = await api.addNote(lead.id, body);
      const next = { ...lead, internal_notes: [note, ...lead.internal_notes] };
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? next : l)));
      setSelected(next);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not post note');
    }
  };

  const exportCsv = () => {
    if (typeof window === 'undefined') return;
    const headers = ['Ref', 'Submitted', 'Name', 'Company', 'Country', 'Email', 'Phone', 'Side', 'Material', 'Volume MT', 'Port', 'Incoterm', 'Status'];
    const rows = leads.map((l) => [
      l.ref, l.created_at, l.name, l.company, l.country, l.email, l.phone,
      l.side, l.material, String(l.volume_mt), l.port, l.incoterm, l.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    logout();
    router.replace('/admin/login');
  };

  return (
    <>
      <div className="mrg-admin-mobile-block">
        <div style={{ maxWidth: 320 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 12 }}>Admin · Desktop only</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 28, letterSpacing: '-0.02em', margin: 0, color: 'var(--c-ink)' }}>The admin dashboard is built for larger screens.</h2>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 16 }}>Please re-open this on a tablet or desktop browser.</p>
        </div>
      </div>

      <div className="mrg-admin-desktop" style={{ minHeight: '100vh', background: 'var(--c-bg)', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          background: 'var(--c-ink)',
          backgroundImage: 'linear-gradient(90deg, color-mix(in oklab, var(--c-brand) 35%, transparent), transparent 55%)',
          color: 'var(--c-darkInk)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          height: 64, display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Logo size={14} variant="dark"/>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', padding: '4px 10px', background: 'var(--c-accent)', color: 'var(--c-accentInk)', borderRadius: 2 }}>ADMIN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{user?.email}</span>
            <span title={user?.name} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--c-brand2)', color: 'var(--c-darkInk)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontFamily: 'var(--font-mono)', border: '1px solid var(--c-accent)' }}>
              {user?.name?.split(' ').map((p) => p[0]).slice(0, 2).join('') || 'A'}
            </span>
            <a href="/" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--c-darkInk)', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, textDecoration: 'none' }}>
              ← Back to site
            </a>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--c-darkInk)', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}>
              Sign out
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: '40px 32px 64px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 12 }}>{prettyDate()}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(36px, 4.4vw, 52px)', lineHeight: 1.04, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0 }}>
                {greeting()}<span style={{ color: 'var(--c-brand)' }}>{firstName(user?.name)}.</span>
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 16, maxWidth: 680 }}>
                {loading
                  ? 'Loading leads from the backend…'
                  : counts.total === 0
                    ? 'No leads yet. The moment someone fills out the contact form on the public site, their enquiry will appear here.'
                    : counts.responseNeeded > 0
                      ? `${counts.responseNeeded} new ${counts.responseNeeded === 1 ? 'lead is' : 'leads are'} waiting for a first response. ${counts.active} active ${counts.active === 1 ? 'conversation' : 'conversations'} in flight.`
                      : `All new leads have been responded to. ${counts.active} active ${counts.active === 1 ? 'conversation' : 'conversations'} in flight.`}
              </p>
            </div>

            {loadError && (
              <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 4, background: '#fdecea', color: '#a83232', fontSize: 13, border: '1px solid #f3c4be', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span><strong>Could not load leads:</strong> {loadError}. Make sure the FastAPI backend is running on :8000.</span>
                <Btn variant="ghost" size="sm" onClick={() => { setLoading(true); load(); }}>Retry</Btn>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              <StatCard label="Total leads" value={counts.total} sub="All-time"/>
              <StatCard label="Needs response" value={counts.responseNeeded} accent sub={counts.responseNeeded > 0 ? 'First reply pending' : 'You are caught up'}/>
              <StatCard label="Active" value={counts.active} sub="In conversation"/>
              <StatCard label="Won" value={counts.byStatus.won} sub={`${counts.total ? Math.round((counts.byStatus.won / counts.total) * 100) : 0}% conversion`}/>
            </div>

            <section style={{ border: '1px solid var(--c-line)', background: 'var(--c-surface)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, borderBottom: '1px solid var(--c-line)', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Contact form</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, color: 'var(--c-ink)', margin: '4px 0 0', letterSpacing: '-0.01em' }}>Leads</h2>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="ghost" size="sm" onClick={() => { setLoading(true); load(); }}><Ico name="refresh" size={14}/> Refresh</Btn>
                  <Btn variant="ghost" size="sm" onClick={exportCsv}><Ico name="download" size={14}/> Export CSV</Btn>
                </div>
              </div>

              <div style={{ padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid var(--c-line)', background: 'var(--c-bg)' }}>
                <SearchInput value={search} onChange={setSearch}/>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <FilterPill label={`All · ${counts.total}`} active={filter === 'all'} onClick={() => setFilter('all')}/>
                  {STATUS_ORDER.map((s) => (
                    <FilterPill key={s} label={`${STATUS_LABELS[s]} · ${counts.byStatus[s]}`} active={filter === s} onClick={() => setFilter(s)}/>
                  ))}
                </div>
              </div>

              <LeadsTable rows={filtered} loading={loading} totalLeads={counts.total} onPick={setSelected} selectedId={selected?.id}/>
            </section>

          </div>
        </main>

        <Drawer open={!!selected} onClose={() => setSelected(null)} width={560}>
          {selected && (
            <LeadDetail
              lead={selected}
              onClose={() => setSelected(null)}
              onStatusChange={(s) => onStatusChange(selected, s)}
              onAddNote={(body) => onAddNote(selected, body)}
            />
          )}
        </Drawer>
      </div>
    </>
  );
}

/* ---------- Sub-components ---------- */

function FilterPill({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 999,
      border: '1px solid ' + (active ? 'var(--c-ink)' : 'var(--c-line)'),
      background: active ? 'var(--c-ink)' : 'transparent',
      color: active ? 'var(--c-bg)' : 'var(--c-ink2)',
      fontFamily: 'var(--font-body)', fontSize: 12, cursor: 'pointer',
      transition: 'all 0.15s ease',
    }}>{label}</button>
  );
}

function LeadsTable({ rows, loading, totalLeads, onPick, selectedId }: {
  rows: ApiLead[]; loading: boolean; totalLeads: number; onPick: (l: ApiLead) => void; selectedId?: number;
}) {
  if (loading) {
    return (
      <div style={{ padding: 64, textAlign: 'center', color: 'var(--c-muted)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Loading leads…
      </div>
    );
  }
  if (rows.length === 0) {
    if (totalLeads === 0) {
      return (
        <div style={{ padding: '72px 32px', textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--c-chip)', color: 'var(--c-brand)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
            <Ico name="mail" size={22}/>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, color: 'var(--c-ink)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Waiting on your first enquiry.
          </div>
          <div style={{ fontSize: 14, color: 'var(--c-ink2)', marginTop: 12, lineHeight: 1.6 }}>
            This dashboard only shows real submissions from the contact form on the public site. As soon as the first lead arrives, it'll land here.
          </div>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 22, padding: '8px 14px', border: '1px solid var(--c-line)', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-ink)', textDecoration: 'none' }}>
            Open public site <Ico name="arrow" size={12}/>
          </a>
        </div>
      );
    }
    return (
      <div style={{ padding: 64, textAlign: 'center' }}>
        <div style={{ color: 'var(--c-muted)', marginBottom: 12 }}><Ico name="search" size={28}/></div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>No matches.</div>
        <div style={{ fontSize: 13, color: 'var(--c-muted)', marginTop: 6 }}>Try clearing the filters or your search.</div>
      </div>
    );
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 1080 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '120px 1.4fr 1fr 110px 90px 130px 110px',
          padding: '12px 24px', gap: 16,
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--c-muted)', background: 'var(--c-surface)',
          borderBottom: '1px solid var(--c-line)',
        }}>
          <span>Ref</span>
          <span>Contact</span>
          <span>Material</span>
          <span>Country</span>
          <span style={{ textAlign: 'right' }}>Volume</span>
          <span>Submitted</span>
          <span>Status</span>
        </div>
        {rows.map((r, i) => (
          <button key={r.id} onClick={() => onPick(r)} style={{
            all: 'unset',
            display: 'grid', gridTemplateColumns: '120px 1.4fr 1fr 110px 90px 130px 110px',
            gap: 16, padding: '16px 24px', alignItems: 'center',
            cursor: 'pointer', width: '100%', boxSizing: 'border-box',
            background: selectedId === r.id ? 'var(--c-chip)' : (i % 2 === 0 ? 'var(--c-surface)' : 'var(--c-bg)'),
            borderBottom: '1px solid var(--c-line)',
            transition: 'background 0.12s ease',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--c-muted)' }}>{r.ref}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, color: 'var(--c-ink)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.company} · {r.side === 'sell' ? 'Selling' : 'Buying'}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--c-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.material}</div>
            <div style={{ fontSize: 13, color: 'var(--c-ink2)' }}>{r.country}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--c-ink)', textAlign: 'right' }}>{r.volume_mt.toLocaleString()} <span style={{ color: 'var(--c-muted)' }}>MT</span></div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)' }}>{shortDate(r.created_at)}</div>
            <StatusPill status={r.status}/>
          </button>
        ))}
      </div>
    </div>
  );
}

function LeadDetail({ lead, onClose, onStatusChange, onAddNote }: {
  lead: ApiLead;
  onClose: () => void;
  onStatusChange: (s: LeadStatus) => void;
  onAddNote: (body: string) => void;
}) {
  const [note, setNote] = useState('');

  const post = () => {
    if (!note.trim()) return;
    onAddNote(note.trim());
    setNote('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--c-muted)', textTransform: 'uppercase' }}>{lead.ref} · {shortDateTime(lead.created_at)}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, color: 'var(--c-ink)', margin: '6px 0 0', letterSpacing: '-0.01em' }}>{lead.name}</h2>
            <div style={{ fontSize: 14, color: 'var(--c-ink2)', marginTop: 4 }}>{lead.company} · {lead.country}</div>
          </div>
          <button onClick={onClose} title="Close" style={{ background: 'transparent', border: '1px solid var(--c-line)', cursor: 'pointer', padding: 8, borderRadius: 2, color: 'var(--c-ink2)' }}><Ico name="x" size={14}/></button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          <a href={`mailto:${lead.email}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--c-line)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--c-ink)' }}>
            <Ico name="mail" size={13}/> {lead.email}
          </a>
          {lead.phone && (
            <a href={`tel:${lead.phone}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--c-line)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--c-ink)' }}>
              <Ico name="phone" size={13}/> {lead.phone}
            </a>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Status</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATUS_ORDER.map((s) => (
            <button key={s} onClick={() => onStatusChange(s)} style={{
              padding: '8px 12px',
              border: '1px solid ' + (lead.status === s ? 'var(--c-ink)' : 'var(--c-line)'),
              background: lead.status === s ? 'var(--c-ink)' : 'transparent',
              color: lead.status === s ? 'var(--c-bg)' : 'var(--c-ink2)',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2,
            }}>{STATUS_LABELS[s]}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-muted)', textTransform: 'uppercase', marginBottom: 14 }}>Enquiry</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px' }}>
          <Detail k="Side" v={lead.side === 'sell' ? 'Selling to MRG' : 'Buying from MRG'}/>
          <Detail k="Material / grade" v={lead.material || '—'}/>
          <Detail k="Volume" v={`${lead.volume_mt.toLocaleString()} MT`}/>
          <Detail k="Frequency" v={lead.frequency || '—'}/>
          <Detail k="Origin" v={lead.origin || '—'}/>
          <Detail k="Destination" v={lead.destination || '—'}/>
          <Detail k="Preferred port" v={lead.port || '—'}/>
          <Detail k="Incoterm" v={lead.incoterm || '—'}/>
        </div>
      </div>

      {lead.customer_notes && (
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--c-line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-muted)', textTransform: 'uppercase', marginBottom: 10 }}>Customer's message</div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--c-ink)', margin: 0, padding: 16, background: 'var(--c-chip)', borderRadius: 2 }}>{lead.customer_notes}</p>
        </div>
      )}

      <div style={{ padding: '24px 28px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--c-muted)', textTransform: 'uppercase' }}>Internal notes</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-muted)' }}>{lead.internal_notes.length} {lead.internal_notes.length === 1 ? 'note' : 'notes'}</div>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a follow-up note for your team…"
          rows={3}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--c-line)', borderRadius: 2, fontFamily: 'var(--font-body)', fontSize: 13, background: 'var(--c-surface)', color: 'var(--c-ink)', resize: 'vertical', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <Btn variant="primary" size="sm" onClick={post}>Post note</Btn>
        </div>
        <div style={{ marginTop: 16 }}>
          {lead.internal_notes.map((n) => (
            <div key={n.id} style={{ padding: '14px 0', borderTop: '1px solid var(--c-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <strong style={{ fontSize: 13, color: 'var(--c-ink)' }}>{n.author}</strong>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)' }}>{shortDateTime(n.created_at)}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--c-ink2)', margin: 0, lineHeight: 1.55 }}>{n.body}</p>
            </div>
          ))}
          {lead.internal_notes.length === 0 && (
            <div style={{ marginTop: 8, padding: 16, border: '1px dashed var(--c-line)', borderRadius: 2, fontSize: 13, color: 'var(--c-muted)', textAlign: 'center' }}>
              No notes yet. Add the first follow-up so the team can pick this up.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--c-muted)', textTransform: 'uppercase' }}>{k}</div>
      <div style={{ fontSize: 14, color: 'var(--c-ink)', marginTop: 4, wordBreak: 'break-word' }}>{v}</div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function greeting(): string {
  if (typeof window === 'undefined') return 'Welcome back, ';
  const h = new Date().getHours();
  if (h < 12) return 'Good morning, ';
  if (h < 17) return 'Good afternoon, ';
  return 'Good evening, ';
}

function firstName(name: string | undefined): string {
  return (name || 'there').split(' ')[0];
}

function prettyDate(): string {
  if (typeof window === 'undefined') return '';
  return new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function shortDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short' }); }
  catch { return iso.slice(0, 10); }
}

function shortDateTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}
