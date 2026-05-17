'use client';

import React, { useState, useEffect } from 'react';
import { Btn, Field, Ico, inputStyle } from '../ui';

export interface QuoteForm {
  side: 'sell' | 'buy';
  material: string;
  grade: string;
  volume: string;
  frequency: string;
  origin: string;
  destination: string;
  port: string;
  incoterm: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  files: Array<{ name: string; size: number }>;
}

export function QuoteModal({ open, onClose, onSubmit }: {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: QuoteForm) => void | Promise<void>;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteForm>({
    side: 'sell', material: '', grade: '', volume: '', frequency: 'one-time',
    origin: '', destination: '', port: '', incoterm: 'CFR',
    company: '', name: '', email: '', phone: '', country: 'India',
    notes: '', files: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (open) { setStep(0); setSubmitted(false); setSubmitting(false); } }, [open]);
  if (!open) return null;

  const update = (k: keyof QuoteForm, v: any) => setForm(f => ({ ...f, [k]: v }));
  const addFile = (name: string, size: number) => setForm(f => ({ ...f, files: [...f.files, { name, size }] }));

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await Promise.resolve(onSubmit(form));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const steps = ['Material', 'Logistics', 'Contact', 'Review'];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(8,10,14,0.6)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: 860, maxHeight: '92vh', overflow: 'auto',
        background: 'var(--c-bg)', borderRadius: 4,
        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
      }}>
        {submitted ? (
          <div style={{ padding: 72, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--c-brand)', color: 'var(--c-darkInk)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Ico name="check" size={28}/></div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 42, letterSpacing: '-0.02em', margin: 0, color: 'var(--c-ink)' }}>Quote received.</h2>
            <p style={{ fontSize: 17, color: 'var(--c-ink2)', marginTop: 16, maxWidth: 480, marginInline: 'auto', lineHeight: 1.55 }}>Reference <strong style={{ fontFamily: 'var(--font-mono)' }}>MRG-{Math.floor(Math.random() * 90000) + 10000}</strong>. A trader will be in touch within one working day at <strong>{form.email || 'your email'}</strong>.</p>
            <div style={{ marginTop: 32 }}><Btn variant="primary" onClick={onClose}>Done</Btn></div>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--c-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Request quote</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--c-ink)', marginTop: 4 }}>Step {step + 1} of 4 · {steps[step]}</div>
              </div>
              <button onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--c-line)', padding: 8, cursor: 'pointer', borderRadius: 2, color: 'var(--c-ink)' }}><Ico name="x" size={16}/></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ height: 3, background: i <= step ? 'var(--c-brand)' : 'var(--c-line)' }}/>
              ))}
            </div>

            <div style={{ padding: 40, minHeight: 400 }}>
              {step === 0 && <QuoteStep1 form={form} update={update}/>}
              {step === 1 && <QuoteStep2 form={form} update={update}/>}
              {step === 2 && <QuoteStep3 form={form} update={update} addFile={addFile}/>}
              {step === 3 && <QuoteStep4 form={form}/>}
            </div>

            <div style={{ padding: '20px 32px', borderTop: '1px solid var(--c-line)', display: 'flex', justifyContent: 'space-between', background: 'var(--c-surface)' }}>
              <Btn variant="ghost" onClick={step === 0 ? onClose : () => setStep(s => s - 1)}>{step === 0 ? 'Cancel' : '← Back'}</Btn>
              {step < 3
                ? <Btn variant="primary" onClick={() => setStep(s => s + 1)}>Continue <Ico name="arrow" size={14}/></Btn>
                : <Btn variant="accent" onClick={handleSubmit}>{submitting ? 'Sending…' : <>Submit quote request <Ico name="arrow" size={14}/></>}</Btn>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function QuoteStep1({ form, update }: { form: QuoteForm; update: (k: keyof QuoteForm, v: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Field label="I want to">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {([['sell', 'Sell scrap to MRG', 'I have material to move'], ['buy', 'Buy scrap from MRG', 'I need material supplied']] as const).map(([v, t, d]) => (
            <button key={v} onClick={() => update('side', v)} style={{
              textAlign: 'left', padding: 20, cursor: 'pointer',
              border: '1px solid ' + (form.side === v ? 'var(--c-ink)' : 'var(--c-line)'),
              background: form.side === v ? 'var(--c-ink)' : 'var(--c-surface)',
              color: form.side === v ? 'var(--c-bg)' : 'var(--c-ink)',
              borderRadius: 2,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '-0.01em' }}>{t}</div>
              <div style={{ fontSize: 13, marginTop: 6, opacity: 0.7 }}>{d}</div>
            </button>
          ))}
        </div>
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Waste category"><select style={inputStyle} value={form.material} onChange={(e) => update('material', e.target.value)}><option value="">Select —</option><option>Hazardous</option><option>Non-hazardous</option><option>E-waste</option><option>Construction & demolition</option><option>Mixed / unsure</option></select></Field>
        <Field label="Sub-category / description"><input style={inputStyle} placeholder="e.g. used oil, paint sludge, plastic packaging" value={form.grade} onChange={(e) => update('grade', e.target.value)}/></Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Approximate volume (MT/month)"><input style={inputStyle} type="number" placeholder="e.g. 5" value={form.volume} onChange={(e) => update('volume', e.target.value)}/></Field>
        <Field label="Pickup frequency"><select style={inputStyle} value={form.frequency} onChange={(e) => update('frequency', e.target.value)}><option>one-time</option><option>weekly</option><option>bi-weekly</option><option>monthly</option><option>on-call</option></select></Field>
      </div>
    </div>
  );
}

function QuoteStep2({ form, update }: { form: QuoteForm; update: (k: keyof QuoteForm, v: any) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Pickup site (city / area)"><input style={inputStyle} placeholder="e.g. Sriperumbudur, Chennai" value={form.origin} onChange={(e) => update('origin', e.target.value)}/></Field>
        <Field label="Site type"><input style={inputStyle} placeholder="e.g. Pharma plant, IT campus, construction site" value={form.destination} onChange={(e) => update('destination', e.target.value)}/></Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Industrial cluster"><select style={inputStyle} value={form.port} onChange={(e) => update('port', e.target.value)}><option value="">Select —</option><option>Ambattur</option><option>Sriperumbudur</option><option>Maraimalai Nagar</option><option>Chennai Metropolitan</option><option>Outside Tamil Nadu</option><option>Other</option></select></Field>
        <Field label="Engagement type"><select style={inputStyle} value={form.incoterm} onChange={(e) => update('incoterm', e.target.value)}><option>Annual contract</option><option>Multi-year contract</option><option>One-time pickup</option><option>Advisory / consult only</option></select></Field>
      </div>
      <Field label="Additional notes" hint="Any specifics on material, timeline, payment terms — the more the better.">
        <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={form.notes} onChange={(e) => update('notes', e.target.value)}/>
      </Field>
    </div>
  );
}

function QuoteStep3({ form, update, addFile }: { form: QuoteForm; update: (k: keyof QuoteForm, v: any) => void; addFile: (name: string, size: number) => void }) {
  const fakeFiles = ['MTR_Certificate_2025Q4.pdf', 'Yard_Photos.zip', 'Mill_Test_Report.pdf'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Full name"><input style={inputStyle} value={form.name} onChange={(e) => update('name', e.target.value)}/></Field>
        <Field label="Company"><input style={inputStyle} value={form.company} onChange={(e) => update('company', e.target.value)}/></Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Field label="Email"><input style={inputStyle} type="email" value={form.email} onChange={(e) => update('email', e.target.value)}/></Field>
        <Field label="Phone"><input style={inputStyle} value={form.phone} onChange={(e) => update('phone', e.target.value)}/></Field>
        <Field label="Country"><input style={inputStyle} value={form.country} onChange={(e) => update('country', e.target.value)}/></Field>
      </div>
      <Field label="Attachments" hint="MTRs, yard photos, BoLs — uploaded to our Cloudinary bucket, max 50 MB per file.">
        <div style={{ border: '2px dashed var(--c-line)', padding: 24, textAlign: 'center', borderRadius: 2, background: 'var(--c-surface)' }}>
          <div style={{ color: 'var(--c-muted)', marginBottom: 12 }}><Ico name="upload" size={24}/></div>
          <div style={{ fontSize: 14, color: 'var(--c-ink)' }}>Drop files here or click to browse</div>
          <div style={{ fontSize: 12, color: 'var(--c-muted)', marginTop: 4 }}>PDF, JPG, PNG, ZIP · PSIC, MTR, yard photos</div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {fakeFiles.map(f => (
              <button key={f} onClick={() => addFile(f, Math.floor(Math.random() * 4000) + 400)} style={{
                padding: '6px 12px', background: 'transparent', border: '1px solid var(--c-line)',
                fontSize: 12, fontFamily: 'var(--font-mono)', cursor: 'pointer', color: 'var(--c-ink2)', borderRadius: 2,
              }}>+ simulate · {f}</button>
            ))}
          </div>
        </div>
        {form.files.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {form.files.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--c-chip)', fontSize: 13, fontFamily: 'var(--font-mono)', borderRadius: 2 }}>
                <span>◈ {f.name}</span>
                <span style={{ color: 'var(--c-muted)' }}>{f.size} KB</span>
              </div>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

function QuoteStep4({ form }: { form: QuoteForm }) {
  const rows: Array<[string, string]> = [
    ['Side', form.side === 'sell' ? 'Selling to MRG' : 'Buying from MRG'],
    ['Material', form.material || '—'],
    ['Grade', form.grade || '—'],
    ['Volume', form.volume ? `${form.volume} MT` : '—'],
    ['Frequency', form.frequency],
    ['Origin → Destination', `${form.origin || '—'} → ${form.destination || '—'}`],
    ['Port · Incoterm', `${form.port || '—'} · ${form.incoterm}`],
    ['Contact', `${form.name || '—'} · ${form.company || '—'}`],
    ['Email · Phone', `${form.email || '—'} · ${form.phone || '—'}`],
    ['Attachments', form.files.length ? `${form.files.length} file(s)` : 'None'],
  ];
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 16 }}>Review and submit</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, margin: 0, color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>Does this look right?</h3>
      <p style={{ fontSize: 14, color: 'var(--c-ink2)', marginTop: 8 }}>A trader will respond within one working day. You'll receive a reference number by email.</p>
      <div style={{ marginTop: 24, border: '1px solid var(--c-line)' }}>
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', padding: '14px 20px', borderBottom: i < rows.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{k}</span>
            <span style={{ fontSize: 14, color: 'var(--c-ink)' }}>{v}</span>
          </div>
        ))}
      </div>
      {form.notes && <div style={{ marginTop: 20, padding: 20, background: 'var(--c-surface)', border: '1px solid var(--c-line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 8 }}>Notes</div>
        <div style={{ fontSize: 14, color: 'var(--c-ink)', lineHeight: 1.55 }}>{form.notes}</div>
      </div>}
    </div>
  );
}
