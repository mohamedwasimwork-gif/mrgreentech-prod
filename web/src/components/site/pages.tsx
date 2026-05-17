'use client';

import React, { useEffect, useState } from 'react';
import { Btn, Chip, DataRow, Ico, Placeholder, SectionHead } from '../ui';
import { COMPANY, BLOG, SERVICES } from '../data';
import { getField, useField } from '../content_store';
import BlurInWords from '../motion/BlurInWords';
import ScrollFadeUp from '../motion/ScrollFadeUp';
import HoverImageZoom from '../motion/HoverImageZoom';
import ParagraphBlurIn from '../motion/ParagraphBlurIn';
import { RealImage } from './RealImage';
import { IMAGES, blogImage, pravatar, serviceImage } from '../images';

// Shared page header
export function PageHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <section style={{ padding: '96px 0 80px', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 28 }}>{eyebrow}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(48px, 6.5vw, 88px)', lineHeight: 0.98, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0, maxWidth: 1100, textWrap: 'balance' as any }}>
          <BlurInWords as="span" text={title} stagger={0.05} duration={0.85}/>
        </h1>
        {kicker && (
          <ParagraphBlurIn className="" delay={0.1}>
            <span style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 32, maxWidth: 720, textWrap: 'pretty' as any, display: 'block' }}>{kicker}</span>
          </ParagraphBlurIn>
        )}
      </div>
    </section>
  );
}

// ============ ABOUT ============
export function PageAbout({ onNav }: { onNav: (r: string) => void }) {
  useField('about', '_');
  return (
    <main>
      <PageHeader eyebrow={getField('about','eyebrow')} title={getField('about','title')} kicker={getField('about','kicker')}/>

      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }}>
          <ScrollFadeUp>
            <HoverImageZoom>
              <RealImage src={IMAGES.aboutFounders} alt="Recovery floor · Ambattur" ratio="4/5" fallbackSeed="about-founders" label="Recovery floor · Ambattur"/>
            </HoverImageZoom>
          </ScrollFadeUp>
          <ScrollFadeUp distance={100} delay={0.1}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>Our story</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 44, lineHeight: 1.05, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0 }}>From one truck in 1998 to a 60,000 sqft recovery facility.</h2>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24, fontSize: 16, lineHeight: 1.65, color: 'var(--c-ink2)' }}>
              <p>Founded in 1998 by Manickaraj, M R Greentech has been committed to creating a cleaner, safer, and more sustainable environment through professional waste management solutions. Over the years, the company has built a strong reputation in the field of waste collection, treatment, disposal activities, and materials recovery, serving industries and communities with responsibility and care.</p>
              <p>M R Greentech is primarily engaged in the collection and management of both hazardous and non-hazardous waste. The company follows environmentally responsible practices to ensure that waste is handled, treated, and disposed of in compliance with safety and environmental standards. By focusing on sustainable waste management, M R Greentech contributes to reducing environmental impact while promoting recycling and resource recovery.</p>
              <p>With decades of experience in the industry, the company continues to play an important role in supporting cleaner industrial operations and sustainable development. Through innovation, reliability, and environmental commitment, M R Greentech aims to lead the way toward a greener future for coming generations.</p>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section className="mrg-dark-green" style={{ padding: '96px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 20 }}>Timeline</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1.04, letterSpacing: 'var(--display-tracking)', color: 'var(--c-darkInk)', margin: 0, textWrap: 'balance' as any }}>Twenty-eight years on the floor.</h2>
          </div>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[
              ['1998', 'Founded · one truck · Ambattur'],
              ['2008', 'CPCB hazardous waste authorisation'],
              ['2009', 'Materials recovery line commissioned'],
              ['2011', '60,000 sqft Ambattur facility acquired'],
              ['2018', 'ISO 14001 certified'],
              ['2026', '240K+ MT handled cumulatively'],
            ].map(([y, l], i) => (
              <ScrollFadeUp key={i} delay={i * 0.05}>
                <div style={{ padding: '32px 20px 32px 0', borderRight: i < 5 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 42, letterSpacing: '-0.03em', color: 'var(--c-accent)' }}>{y}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', marginTop: 8, lineHeight: 1.4 }}>{l}</div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <SectionHead eyebrow="Principles" title="How we work."/>
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['Categorise honestly.', "We'd rather quarantine and re-quote a load than book it under the wrong category. Wrong categorisation is how disposal certificates get rejected — and the liability boomerangs back to the generator."],
              ['Document obsessively.', 'Every consignment carries a six-copy manifest, a transport receipt, and a final disposal certificate. We retain the document pack digitally for the statutory seven years.'],
              ['Pick up on time.', "Scheduled means scheduled. When a pharma site has a 6 a.m. waste pickup booked, the truck is at the gate at 5:55. Reliability compounds — it's the only currency that does."],
            ].map(([t, d], i) => (
              <ScrollFadeUp key={i} delay={i * 0.07}>
                <div style={{ borderTop: '1px solid var(--c-ink)', paddingTop: 24 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.08em' }}>0{i+1}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, margin: '12px 0 14px', color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>{t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--c-ink2)', margin: 0 }}>{d}</p>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mrg-dark-green" style={{ padding: '96px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 16 }}>Leadership</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(36px, 4.6vw, 56px)', lineHeight: 1.05, letterSpacing: 'var(--display-tracking)', color: 'var(--c-darkInk)', margin: 0 }}>The person signing the paperwork.</h2>

          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' }}>
            <ScrollFadeUp>
              <HoverImageZoom>
                <RealImage src="/founder.jpeg" alt="Portrait of Manickaraj, founder of M R Greentech" ratio="4/5" fallbackSeed="founder-portrait"/>
              </HoverImageZoom>
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.08}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 0.6, color: 'var(--c-accent)', opacity: 0.7 }}>&ldquo;</div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--display-weight)' as any,
                  fontSize: 'clamp(22px, 2.6vw, 30px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.01em',
                  color: 'var(--c-darkInk)',
                  margin: 0,
                  textWrap: 'pretty' as any,
                  maxWidth: 720,
                }}>
                  I started M R Greentech in 1998 with one truck and one principle: waste leaving a customer's gate is the customer's reputation, not just their byproduct. Twenty-eight years later, the yard is bigger and the categories have multiplied, but that line is still the only one on the wall — and it is still what every shift gets measured against.
                </p>
                <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.18)', maxWidth: 720 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 26, color: 'var(--c-darkInk)', letterSpacing: '-0.01em' }}>Manickaraj</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-accent)', marginTop: 6 }}>Founder · M R Greentech</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Ambattur, Chennai · since 1998</div>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ SERVICES ============
export function PageServices({ onNav, onOpenQuote, initialId }: { onNav: (r: string) => void; onOpenQuote: () => void; initialId?: string }) {
  useField('services', '_');
  const defaultId = (initialId && SERVICES.find(s => s.id === initialId)) ? initialId : SERVICES[0].id;
  const [active, setActive] = useState(defaultId);
  // If the deep-link id changes after navigation back to /services from another card,
  // snap the active tab to the new id.
  useEffect(() => {
    if (initialId && SERVICES.find(s => s.id === initialId) && initialId !== active) {
      setActive(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);
  const svc = SERVICES.find(s => s.id === active)!;
  return (
    <main>
      <PageHeader eyebrow={getField('services','eyebrow')} title={getField('services','title')} kicker={getField('services','kicker')}/>

      <section style={{ borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, borderLeft: '1px solid var(--c-line)', borderRight: '1px solid var(--c-line)' }}>
            <div style={{ borderRight: '1px solid var(--c-line)' }}>
              {SERVICES.map((s, i) => (
                <button key={s.id} onClick={() => setActive(s.id)} style={{
                  width: '100%', textAlign: 'left', padding: '28px 24px',
                  borderBottom: '1px solid var(--c-line)',
                  background: active === s.id ? 'var(--c-ink)' : 'transparent',
                  color: active === s.id ? 'var(--c-darkInk)' : 'var(--c-ink)',
                  cursor: 'pointer', border: 'none', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'var(--c-line)',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6, width: 28 }}>0{i+1}</span>
                  <span style={{ color: active === s.id ? 'var(--c-accent)' : 'var(--c-brand)' }}>
                    <Ico name={s.icon} size={20}/>
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, letterSpacing: '-0.01em' }}>{s.name}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: '56px 56px 64px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>
                Service / {active}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(36px, 4.4vw, 52px)', lineHeight: 1.02, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0 }}>{svc.name}</h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--c-ink2)', marginTop: 20, maxWidth: 720 }}>{svc.short}</p>

              <div style={{ marginTop: 32, marginBottom: 40 }}>
                <HoverImageZoom>
                  <RealImage src={serviceImage(svc.id)} alt={`${svc.name} · on yard`} ratio="21/9" fallbackSeed={`service-${svc.id}`} label={`${svc.name} · on yard`}/>
                </HoverImageZoom>
              </div>

              {/* Detail paragraphs */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, paddingTop: 32, borderTop: '1px solid var(--c-line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Overview</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 720 }}>
                  {svc.detail.map((p, i) => (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--c-ink)', margin: 0, textWrap: 'pretty' as any }}>{p}</p>
                  ))}
                </div>
              </div>

              {/* What we bring + who it's for */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 48, marginTop: 48, borderTop: '1px solid var(--c-line)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 18 }}>What we bring</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {svc.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 12, alignItems: 'start', fontSize: 15, lineHeight: 1.55, color: 'var(--c-ink)' }}>
                        <span style={{ color: 'var(--c-brand)', paddingTop: 3 }}><Ico name="check" size={14}/></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 18 }}>Who this is for</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {svc.customerProfiles.map((c, i) => (
                      <li key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--c-ink)', letterSpacing: '-0.01em', padding: '8px 0', borderBottom: i < svc.customerProfiles.length - 1 ? '1px solid var(--c-line)' : 'none' }}>{c}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 24, padding: 16, background: 'var(--c-chip)', borderRadius: 2 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 6 }}>Inspections</div>
                    <div style={{ fontSize: 14, color: 'var(--c-ink)' }}>{svc.inspections.join(' · ')}</div>
                  </div>
                </div>
              </div>

              {/* Grades + Snapshot metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 48, marginTop: 48, borderTop: '1px solid var(--c-line)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 18 }}>Grades & scope</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {svc.grades.map((g, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--c-line)' }}>
                        <span style={{ color: 'var(--c-brand2)' }}><Ico name="check" size={14}/></span>
                        <span style={{ fontSize: 15, color: 'var(--c-ink)' }}>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 18 }}>Snapshot</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--c-line)' }}>
                    {svc.metrics.map((m, i, arr) => (
                      <div key={i} style={{
                        padding: '18px 18px',
                        borderRight: (i + 1) % 2 !== 0 ? '1px solid var(--c-line)' : 'none',
                        borderBottom: i < arr.length - 2 ? '1px solid var(--c-line)' : 'none',
                        background: 'var(--c-surface)',
                      }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{m.label}</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '-0.02em', color: 'var(--c-ink)', marginTop: 6 }}>
                          {m.value}{m.unit && <span style={{ fontSize: 12, color: 'var(--c-muted)', marginLeft: 4, letterSpacing: 0 }}>{m.unit}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Commercial basis */}
              <div style={{ marginTop: 48, padding: 24, background: 'var(--c-surface2)', borderLeft: '3px solid var(--c-brand)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 10 }}>Commercial basis</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--c-ink)', margin: 0 }}>{svc.pricingBasis}</p>
              </div>

              {/* Service-specific FAQ */}
              <ServiceFaqs faqs={svc.serviceFaqs} svcName={svc.name}/>

              {/* CTA */}
              <div style={{ marginTop: 48, padding: 28, background: 'var(--c-ink)', color: 'var(--c-darkInk)', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ maxWidth: 520 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 8 }}>Ready to brief us?</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 24, letterSpacing: '-0.01em', lineHeight: 1.25 }}>Send a one-line enquiry — quote back within one working day.</div>
                </div>
                <Btn variant="accent" size="lg" onClick={onOpenQuote}>Request quote <Ico name="arrow" size={16}/></Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection svc={svc}/>
    </main>
  );
}

// ============ SERVICES — per-service FAQ accordion ============
function ServiceFaqs({ faqs, svcName }: { faqs: import('../data').ServiceFaq[]; svcName: string }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 4 }}>FAQ</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, color: 'var(--c-ink)', margin: '6px 0 20px', letterSpacing: '-0.01em' }}>What buyers ask about {svcName.toLowerCase()}.</h3>
      <div style={{ borderTop: '1px solid var(--c-line)' }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: '1px solid var(--c-line)' }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: '100%', background: 'transparent', border: 'none',
                padding: '20px 0', textAlign: 'left', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
                color: 'var(--c-ink)', fontFamily: 'var(--font-display)',
                fontSize: 19, fontWeight: 'var(--display-weight)' as any, letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}>
                <span style={{ flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', marginRight: 16, letterSpacing: '0.08em' }}>0{i + 1}</span>
                  {f.q}
                </span>
                <span style={{
                  width: 28, height: 28, border: '1px solid var(--c-line)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isOpen ? 'var(--c-ink)' : 'transparent',
                  color: isOpen ? 'var(--c-darkInk)' : 'var(--c-ink)',
                  transition: 'all .2s', flexShrink: 0,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  <Ico name="plus" size={12}/>
                </span>
              </button>
              {isOpen && (
                <div style={{ paddingBottom: 22, paddingLeft: 38, maxWidth: 680 }}>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--c-ink2)', margin: 0, textWrap: 'pretty' as any }}>{f.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ SERVICES — Process stepper (per-service) ============
function ProcessSection({ svc }: { svc: import('../data').Service }) {
  return (
    <section className="mrg-dark-green mrg-process-dark" style={{ padding: '96px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 20 }}>{`Process · ${svc.name}`}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(32px, 4.2vw, 56px)', lineHeight: 1.04, letterSpacing: 'var(--display-tracking)', color: 'var(--c-darkInk)', margin: 0, textWrap: 'balance' as any }}>{svc.processTitle}</h2>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            5 steps · same chain of custody
          </div>
        </div>
        <div key={svc.id} className="mrg-process-track" style={{ marginTop: 64 }}>
          <div className="mrg-process-line" aria-hidden="true"/>
          {svc.process.map((s, i) => (
            <ScrollFadeUp key={`${svc.id}-${i}`} delay={i * 0.06} className="mrg-process-step">
              <div className="mrg-process-card">
                <div className="mrg-process-num">{s.n}</div>
                <div className="mrg-process-node">
                  <Ico name={s.icon} size={26}/>
                </div>
                <div className="mrg-process-title">{s.t}</div>
                <div className="mrg-process-desc">{s.d}</div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SUSTAINABILITY ============
export function PageSustainability() {
  useField('sustainability', '_');
  return (
    <main>
      <PageHeader eyebrow={getField('sustainability','eyebrow')} title={getField('sustainability','title')} kicker={getField('sustainability','kicker')}/>

      <section style={{ borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <ScrollFadeUp>
            <HoverImageZoom>
              <RealImage src={IMAGES.sustainHero} alt="Circular economy — materials recovered from industrial waste" ratio="21/9" fallbackSeed="sustain-hero" label="Circular economy · 220K+ MT recovered since 1998"/>
            </HoverImageZoom>
          </ScrollFadeUp>
        </div>
      </section>

      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--c-line)' }}>
            {[
              ['440,000', 'MT of CO₂ avoided', 'Based on 220K MT diverted × IEA secondary-vs-virgin factor'],
              ['330,000', 'MT virgin material displaced', 'Recovered metals, plastics and fibre back into supply chains'],
              ['92%', 'Diversion from landfill', '8% residual routed to authorised treatment / co-processing'],
            ].map(([v, l, d], i) => (
              <ScrollFadeUp key={i} delay={i * 0.07}>
                <div style={{ padding: '48px 40px', borderRight: i < 2 ? '1px solid var(--c-line)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 64, letterSpacing: '-0.04em', color: 'var(--c-brand)' }}>{v}</div>
                  <div style={{ fontSize: 16, color: 'var(--c-ink)', marginTop: 12 }}>{l}</div>
                  <div style={{ fontSize: 13, color: 'var(--c-muted)', marginTop: 12, lineHeight: 1.5 }}>{d}</div>
                </div>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface2)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }}>
          <ScrollFadeUp>
            <HoverImageZoom>
              <RealImage src={IMAGES.sustainCommitments} alt="Sorted recyclable materials at the yard" ratio="4/5" fallbackSeed="sustain-commitments" label="Sorting, grading, documenting · 92% diversion"/>
            </HoverImageZoom>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <SectionHead eyebrow="Commitments" title="Four things we publish every year."/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 32 }}>
              {[
                ['Disposal certificate on 100% of hazardous consignments', 'Final certificate from TSDF / co-processor / incinerator within 7 working days. Digital vault keeps it for 7 years.'],
                ['Annual Form 4 return on behalf of every client', 'Filed with TNPCB before the 30 June deadline. Client gets a stamped copy for their own audit file.'],
                ['Radiation portal monitoring on every gate movement', 'AERB-calibrated portals at intake and dispatch. Zero contamination events in the last 36 months.'],
                ['No mixed hazardous / non-hazardous loads', 'Source segregation at pickup. Mixed loads are rejected at the supplier gate, not at our gate after weighing.'],
              ].map(([t, d], i) => (
                <div key={i} style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: i < 3 ? '1px solid var(--c-line)' : 'none' }}>
                  <div style={{ color: 'var(--c-brand)', flexShrink: 0, paddingTop: 4 }}><Ico name="leaf" size={22}/></div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>{t}</div>
                    <div style={{ fontSize: 15, color: 'var(--c-ink2)', marginTop: 8, lineHeight: 1.55 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      <section style={{ padding: '96px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'center' }}>
          <ScrollFadeUp>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>Long-term impact</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0 }}>Twenty-eight years of keeping waste out of landfill — and resources back in supply chains.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--c-ink2)', marginTop: 24, maxWidth: 520 }}>
              Every consignment that goes through our recovery line is a small bet that secondary materials can replace virgin extraction. Multiplied across 220,000+ MT diverted since 1998, that adds up to roughly 440,000 MT of CO₂ never released, and 330,000 MT of virgin material that did not need to be mined, refined or imported.
            </p>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <HoverImageZoom>
              <RealImage src={IMAGES.sustainImpact} alt="Green industrial operations" ratio="4/5" fallbackSeed="sustain-impact"/>
            </HoverImageZoom>
          </ScrollFadeUp>
        </div>
      </section>
    </main>
  );
}

// ============ CONTACT ============
function ContactRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--c-line)' }}>
      <span style={{ color: 'var(--c-brand)' }}><Ico name={icon} size={16}/></span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', width: 140 }}>{label}</span>
      <span style={{ fontSize: 15, color: 'var(--c-ink)' }}>{value}</span>
    </div>
  );
}

export function PageContact() {
  useField('contact', '_');
  return (
    <main>
      <PageHeader eyebrow={getField('contact','eyebrow')} title={getField('contact','title')} kicker={getField('contact','kicker')}/>

      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <ScrollFadeUp>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>Head office</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 32, margin: 0, color: 'var(--c-ink)', letterSpacing: '-0.02em' }}>Chennai, Tamil Nadu</h3>
            <div style={{ marginTop: 24, fontSize: 16, lineHeight: 1.7, color: 'var(--c-ink2)' }}>
              {COMPANY.address}<br/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--c-muted)' }}>{COMPANY.lat}</span>
            </div>
            <div style={{ marginTop: 40 }}>
              <ContactRow icon="phone" label="Sales / quotes" value={COMPANY.phone}/>
              <ContactRow icon="phone" label="Operations / pickups" value={COMPANY.phone2}/>
              <ContactRow icon="mail" label="General" value={COMPANY.email}/>
              <ContactRow icon="mail" label="Compliance" value="compliance@mrgreentech.in"/>
              <ContactRow icon="mail" label="Careers" value="join@mrgreentech.in"/>
            </div>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <HoverImageZoom>
              <RealImage src={IMAGES.contactYard} alt="MR Greentech yard · Ambattur, Chennai" ratio="4/3" fallbackSeed="contact-yard" label="Yard gate · Ambattur, Chennai"/>
            </HoverImageZoom>
            <div style={{ marginTop: 24, padding: 24, border: '1px solid var(--c-line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 12 }}>Ports we operate from</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {['Chennai Port', 'Kamarajar (Ennore)', 'Kattupalli'].map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--c-ink)' }}>
                    <Ico name="ship" size={14}/>{p}
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Live Google Map embed of the Ambattur facility */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 12 }}>Find us</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(28px, 3.4vw, 40px)', letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0, lineHeight: 1.1 }}>
                Ambattur Industrial Estate, Chennai.
              </h2>
              <div style={{ fontSize: 14, color: 'var(--c-ink2)', marginTop: 10 }}>{COMPANY.address}</div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Ambattur+Industrial+Estate,+Chennai+600058"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', border: '1px solid var(--c-line)', borderRadius: 2,
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--c-ink)', textDecoration: 'none', background: 'var(--c-surface)',
              }}
            >
              Open directions <Ico name="arrow" size={12}/>
            </a>
          </div>

          <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', borderRadius: 2, overflow: 'hidden', border: '1px solid var(--c-line)' }}>
            <iframe
              src={IMAGES.contactMap}
              title="MR Greentech facility location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ BLOG ============
export function PageBlog({ onNav }: { onNav: (r: string) => void }) {
  useField('blog', '_');
  const open = (id: string) => onNav(`blog:${id}`);
  return (
    <main>
      <PageHeader eyebrow={getField('blog','eyebrow')} title={getField('blog','title')} kicker={getField('blog','kicker')}/>

      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <article onClick={() => open(BLOG[0].id)} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, paddingBottom: 48, marginBottom: 48, borderBottom: '1px solid var(--c-line)', alignItems: 'center', cursor: 'pointer' }}>
            <HoverImageZoom>
              <RealImage src={blogImage(BLOG[0].id)} alt={BLOG[0].title} ratio="16/10" fallbackSeed={`blog-${BLOG[0].id}`} label={`Featured · ${BLOG[0].tag}`}/>
            </HoverImageZoom>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <Chip tone="accent">Featured</Chip>
                <Chip tone="outline">{BLOG[0].tag}</Chip>
                <Chip tone="outline">{BLOG[0].date}</Chip>
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 42, lineHeight: 1.05, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0, textWrap: 'balance' as any }}>{BLOG[0].title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--c-ink2)', marginTop: 20 }}>
                {BLOG[0].excerpt}
              </p>
              <div style={{ marginTop: 24 }}>
                <Btn variant="ghost" onClick={(e: any) => { e?.stopPropagation?.(); open(BLOG[0].id); }}>Read — {BLOG[0].read} min <Ico name="arrow" size={14}/></Btn>
              </div>
            </div>
          </article>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {BLOG.slice(1).map((b, i) => (
              <ScrollFadeUp key={b.id} delay={i * 0.05}>
                <article onClick={() => open(b.id)} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, padding: '24px 0', borderTop: i === 0 ? 'none' : '1px solid var(--c-line)', cursor: 'pointer' }}>
                  <RealImage src={blogImage(b.id)} alt={b.title} ratio="4/3" fallbackSeed={`blog-${b.id}`}/>
                  <div>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-brand)' }}>{b.tag}</span>
                      <span style={{ width: 3, height: 3, background: 'var(--c-muted)', borderRadius: '50%' }}/>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)' }}>{b.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--c-ink)', margin: 0, textWrap: 'balance' as any }}>{b.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 10 }}>{b.excerpt}</p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', marginTop: 12 }}>{b.read} min read · Read article →</div>
                  </div>
                </article>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ BLOG DETAIL — standalone insight page ============
export function PageBlogDetail({ id, onNav, onOpenQuote }: { id: string; onNav: (r: string) => void; onOpenQuote: () => void }) {
  const post = BLOG.find(p => p.id === id);
  if (!post) {
    return (
      <main>
        <section style={{ padding: '160px 0', textAlign: 'center', borderBottom: '1px solid var(--c-line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>Insight not found</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 48, color: 'var(--c-ink)', margin: '12px 0 24px' }}>That article has moved or was removed.</h1>
          <Btn variant="primary" onClick={() => onNav('blog')}>← Back to insights</Btn>
        </section>
      </main>
    );
  }

  const related = BLOG.filter(p => p.id !== id).slice(0, 3);

  return (
    <main>
      <section style={{ padding: '32px 0 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <button onClick={() => onNav('blog')} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 0',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)',
          }}>← All insights</button>
        </div>
      </section>

      <section style={{ padding: '64px 0 56px', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <Chip tone="accent">{post.tag}</Chip>
            <Chip tone="outline">{post.date}</Chip>
            <Chip tone="outline">{post.read} min read</Chip>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any,
            fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: 'var(--display-tracking)',
            color: 'var(--c-ink)', margin: 0, textWrap: 'balance' as any,
          }}>
            <BlurInWords as="span" text={post.title} stagger={0.05} duration={0.85}/>
          </h1>
          <ParagraphBlurIn delay={0.1}>
            <span style={{ display: 'block', fontSize: 20, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 28, maxWidth: 780, textWrap: 'pretty' as any }}>{post.excerpt}</span>
          </ParagraphBlurIn>
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid var(--c-line)' }}>
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--c-chip)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--c-ink)' }}>
              {post.author.split(' ').map(w => w[0]).join('')}
            </span>
            <div>
              <div style={{ fontSize: 14, color: 'var(--c-ink)' }}>{post.author}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>{post.authorRole}</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <ScrollFadeUp>
            <HoverImageZoom>
              <RealImage src={blogImage(post.id)} alt={post.title} ratio="21/9" fallbackSeed={`blog-${post.id}`} label={`${post.tag} · ${post.date}`}/>
            </HoverImageZoom>
          </ScrollFadeUp>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {post.sections.map((sec, i) => (
            <ScrollFadeUp key={i} delay={i * 0.04}>
              {sec.heading && (
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em', color: 'var(--c-ink)', margin: '0 0 18px' }}>{sec.heading}</h2>
              )}
              {sec.paragraphs?.map((p, j) => (
                <p key={j} style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--c-ink2)', margin: '0 0 16px', textWrap: 'pretty' as any }}>{p}</p>
              ))}
              {sec.list && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {sec.list.map((item, j) => (
                    <li key={j} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14, alignItems: 'start', padding: '10px 0', borderBottom: '1px solid var(--c-line)' }}>
                      <span style={{ color: 'var(--c-brand)', paddingTop: 4 }}><Ico name="check" size={14}/></span>
                      <span style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--c-ink)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {sec.quote && (
                <blockquote style={{ borderLeft: '3px solid var(--c-brand)', padding: '8px 0 8px 28px', margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--c-ink)' }}>
                  &ldquo;{sec.quote.text}&rdquo;
                  {sec.quote.author && <footer style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginTop: 14 }}>— {sec.quote.author}</footer>}
                </blockquote>
              )}
            </ScrollFadeUp>
          ))}
        </div>
      </section>

      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--c-line)', background: 'var(--c-accent)', color: 'var(--c-accentInk)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65 }}>Have a lot to move?</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '8px 0 0' }}>Talk to a trader, not a form field.</h3>
          </div>
          <Btn variant="dark" size="lg" onClick={onOpenQuote}>Request a quote <Ico name="arrow" size={16}/></Btn>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
          <SectionHead eyebrow="Keep reading" title="More from the recovery floor."/>
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {related.map((p, i) => (
              <ScrollFadeUp key={p.id} delay={i * 0.05}>
                <article onClick={() => onNav(`blog:${p.id}`)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <HoverImageZoom>
                    <RealImage src={blogImage(p.id)} alt={p.title} ratio="4/3" fallbackSeed={`blog-${p.id}`}/>
                  </HoverImageZoom>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-brand)' }}>{p.tag}</span>
                    <span style={{ width: 3, height: 3, background: 'var(--c-muted)', borderRadius: '50%' }}/>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)' }}>{p.date}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--c-ink)', margin: 0, textWrap: 'balance' as any }}>{p.title}</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)' }}>{p.read} min · Read →</div>
                </article>
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ PRIVACY & TERMS ============
const PRIVACY_SECTIONS = [
  { h: 'Information we collect', p: ['We collect information you submit through quote requests, contact forms, and supplier registration — including name, company, email, phone, cargo details and uploaded documents (MTRs, yard photos, bills of lading).',
    'Server logs record IP address, browser and pages viewed for operational and security purposes. We do not use third-party analytics beyond aggregate visit counts.'] },
  { h: 'How we use it', p: ['Solely to respond to your enquiry, execute trade transactions, meet regulatory and compliance obligations (Basel, DGFT, customs), and send operational updates about active shipments.',
    'We do not sell, rent, or share your information with advertisers or marketing platforms.'] },
  { h: 'Document retention', p: ['Trade documents (Basel notifications, BoLs, PSIC, MTRs) are retained for seven years per DGFT and Customs Act requirements.',
    "Quote-request data from leads that don't convert is purged after 18 months. You can request earlier deletion at any time."] },
  { h: 'Your rights', p: ['You may request a copy, correction, or deletion of your data by writing to privacy@mrgreentech.in. We respond within 15 working days.'] },
  { h: 'Contact', p: ['Data protection queries: privacy@mrgreentech.in.',
    'Postal: Data Protection Officer, MR Greentech Trading Pvt. Ltd., Unit 4B, Ambattur Industrial Estate, Chennai 600058.'] },
];

const TERMS_SECTIONS = [
  { h: 'Scope', p: ['These terms apply to all trade engagements with MR Greentech Trading Pvt. Ltd. unless superseded by a signed purchase or sale contract.'] },
  { h: 'Quotations', p: ['Indicative quotes are valid for seven calendar days and subject to material availability, freight rate changes, and port congestion at the stated origin or destination.',
    'Firm offers require a written confirmation citing the corresponding MR Greentech reference number.'] },
  { h: 'Payment terms', p: ['Standard payment terms are Letter of Credit at sight, or 30% advance + 70% against scan of Bill of Lading. Other structures are negotiable on a per-contract basis.',
    'Late payment beyond 14 days attracts interest at 1.5% per month or the maximum permitted by law.'] },
  { h: 'Inspection and disputes', p: ["All international consignments undergo pre-shipment inspection by Lloyd's Register, Bureau Veritas or SGS. Any dispute on grade or weight must be raised within 14 days of arrival, supported by third-party inspection at destination."] },
  { h: 'Force majeure', p: ['Neither party is liable for delays caused by port strikes, vessel diversion, government embargoes, natural disasters, or regulatory action that was not reasonably foreseeable at contract signing.'] },
  { h: 'Jurisdiction', p: ['These terms are governed by the laws of India. Disputes are resolved by arbitration in Chennai under the Arbitration and Conciliation Act, 1996, with English as the language of proceedings.'] },
];

export function PageLegal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPriv = kind === 'privacy';
  const pageKey = isPriv ? 'privacy' : 'terms';
  useField(pageKey, '_');
  const title = getField(pageKey, 'title');
  const sections = isPriv ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  return (
    <main>
      <PageHeader eyebrow={getField(pageKey,'eyebrow')} title={title} kicker={getField(pageKey,'kicker')}/>
      <section style={{ padding: '72px 0', borderBottom: '1px solid var(--c-line)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 80 }}>
          <nav style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 16 }}>On this page</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sections.map((s, i) => (
                <li key={i}><a href={`#${kind}-${i}`} style={{ fontSize: 14, color: 'var(--c-ink2)', textDecoration: 'none' }}>{(i+1).toString().padStart(2, '0')} — {s.h}</a></li>
              ))}
            </ul>
          </nav>
          <div style={{ maxWidth: 720 }}>
            {sections.map((s, i) => (
              <div key={i} id={`${kind}-${i}`} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < sections.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', letterSpacing: '0.1em' }}>{(i+1).toString().padStart(2, '0')}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, margin: '8px 0 20px', color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>{s.h}</h2>
                {s.p.map((p, j) => <p key={j} style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--c-ink2)', margin: '0 0 16px' }}>{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
