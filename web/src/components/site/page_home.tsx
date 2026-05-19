'use client';

import React, { useState } from 'react';
import { Btn, Chip, DataRow, Ico, Placeholder, SectionHead } from '../ui';
import { SERVICES } from '../data';
import { getField, useField } from '../content_store';
import BlurInWords from '../motion/BlurInWords';
import FadeInScale from '../motion/FadeInScale';
import FadeInUpDelayed from '../motion/FadeInUpDelayed';
import ParagraphBlurIn from '../motion/ParagraphBlurIn';
import ScrollFadeUp from '../motion/ScrollFadeUp';
import ScrollSpringIn from '../motion/ScrollSpringIn';
import HoverImageZoom from '../motion/HoverImageZoom';
import { RealImage } from './RealImage';
import { IMAGES, serviceImage } from '../images';

export function PageHome({ onNav, onOpenQuote }: { onNav: (r: string) => void; onOpenQuote: () => void }) {
  return (
    <main>
      <HomeHero onNav={onNav} onOpenQuote={onOpenQuote}/>
      <HomeIntro/>
      <HomeServices onNav={onNav}/>
      <HomeStats/>
      <HomeTestimonials/>
      <HomeCompliance/>
      <HomeFAQ/>
    </main>
  );
}

function HomeHero({ onNav, onOpenQuote }: { onNav: (r: string) => void; onOpenQuote: () => void }) {
  useField('home', '_');
  return (
    <section style={{ borderBottom: '1px solid var(--c-line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 32px 96px', display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 72, alignItems: 'end' }}>
        <div>
          <ScrollSpringIn yOffset={-20} triggerOnMount damping={28}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
              {getField('home', 'hero_chip_est') && <Chip tone="outline">{getField('home', 'hero_chip_est')}</Chip>}
              {getField('home', 'hero_chip_location') && <Chip tone="outline">{getField('home', 'hero_chip_location')}</Chip>}
              {getField('home', 'hero_chip_accent') && <Chip tone="accent">{getField('home', 'hero_chip_accent')}</Chip>}
            </div>
          </ScrollSpringIn>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any,
            fontSize: 'clamp(52px, 7.5vw, 104px)', lineHeight: 0.96,
            letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)',
            margin: 0, textWrap: 'balance' as any,
          }}>
            <BlurInWords text={`${getField('home', 'hero_title_1')} ${getField('home', 'hero_title_2')} ${getField('home', 'hero_title_emph')}`} as="span" stagger={0.07} duration={0.9}/>
          </h1>
          <FadeInUpDelayed>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--c-ink2)', marginTop: 36, maxWidth: 540, textWrap: 'pretty' as any }}>
              {getField('home', 'hero_body')}
            </p>
            <div className="mrg-hero-ctas" style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
              {getField('home', 'hero_cta_primary') && <Btn variant="primary" size="lg" onClick={onOpenQuote}>{getField('home', 'hero_cta_primary')} <Ico name="arrow" size={16}/></Btn>}
              {getField('home', 'hero_cta_secondary') && <Btn variant="ghost" size="lg" onClick={() => onNav('services')}>{getField('home', 'hero_cta_secondary')}</Btn>}
            </div>
          </FadeInUpDelayed>
        </div>
        <div style={{ position: 'relative' }}>
          <FadeInScale>
            <HoverImageZoom>
              <RealImage src={IMAGES.heroYard} alt={getField('home', 'hero_image_label')} ratio="4/5" fallbackSeed="hero-yard" label={getField('home', 'hero_image_label')}/>
            </HoverImageZoom>
          </FadeInScale>
          <div className="mrg-hero-stats-overlay" style={{
            position: 'absolute', bottom: -24, left: -24, right: 48,
            background: 'var(--c-surface)', border: '1px solid var(--c-line)',
            padding: 24, borderRadius: 2,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 10 }}>
              {getField('home', 'hero_live_label')}
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <Stat big={getField('home', 'hero_stat1_big')} unit={getField('home', 'hero_stat1_unit')} />
              <div style={{ width: 1, background: 'var(--c-line)' }}/>
              <Stat big={getField('home', 'hero_stat2_big')} unit={getField('home', 'hero_stat2_unit')} />
              <div style={{ width: 1, background: 'var(--c-line)' }}/>
              <Stat big={getField('home', 'hero_stat3_big')} unit={getField('home', 'hero_stat3_unit')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ big, unit }: { big: string; unit: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 28, color: 'var(--c-ink)', letterSpacing: '-0.02em' }}>{big}</div>
      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-muted)', marginTop: 4 }}>{unit}</div>
    </div>
  );
}

function HomeTicker() {
  const items: Array<[string, string, string]> = [
    ['HMS 1/2 80:20', '₹ 32,400/MT', '+0.8%'],
    ['Shredded 211', '₹ 34,100/MT', '+1.2%'],
    ['Birch/Cliff Cu', '$ 8,940/MT', '-0.3%'],
    ['Taint/Tabor Al', '$ 1,820/MT', '+0.4%'],
    ['Zorba (95/5)', '$ 1,480/MT', '+0.1%'],
    ['Honey Brass', '$ 5,210/MT', '-0.6%'],
    ['RAINS Lead', '$ 1,920/MT', '+0.2%'],
  ];
  return (
    <div style={{ borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 32px', display: 'flex', gap: 48, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--c-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 11 }}>◉ Indicative CFR India · 14 Apr</span>
        {items.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', gap: 10 }}>
            <span style={{ color: 'var(--c-ink2)' }}>{it[0]}</span>
            <span style={{ color: 'var(--c-ink)', fontWeight: 500 }}>{it[1]}</span>
            <span style={{ color: it[2].startsWith('+') ? 'var(--c-brand2)' : 'var(--c-muted)' }}>{it[2]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HomeIntro() {
  useField('home', '_');
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 96 }}>
        <ScrollFadeUp>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 20 }}>{getField('home', 'intro_eyebrow')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(36px, 4.8vw, 64px)', lineHeight: 1.02, letterSpacing: 'var(--display-tracking)', color: 'var(--c-ink)', margin: 0 }}>
            {getField('home', 'intro_title')}
          </h2>
        </ScrollFadeUp>
        <ScrollFadeUp distance={100} delay={0.1}>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--c-ink2)', margin: 0, textWrap: 'pretty' as any }}>
            {getField('home', 'intro_p1')}
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--c-muted)', marginTop: 24, textWrap: 'pretty' as any }}>
            {getField('home', 'intro_p2')}
          </p>
          <div className="mrg-intro-stats" style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--c-line)' }}>
            <IntroStat top={getField('home', 'intro_stat1_top')} label={getField('home', 'intro_stat1_label')}/>
            <IntroStat top={getField('home', 'intro_stat2_top')} label={getField('home', 'intro_stat2_label')}/>
            <IntroStat top={getField('home', 'intro_stat3_top')} label={getField('home', 'intro_stat3_label')}/>
            <IntroStat top={getField('home', 'intro_stat4_top')} label={getField('home', 'intro_stat4_label')}/>
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}

function IntroStat({ top, label }: { top: string; label: string }) {
  return (
    <div style={{ padding: '24px 0', borderRight: '1px solid var(--c-line)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 40, color: 'var(--c-ink)', letterSpacing: '-0.03em' }}>{top}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function HomeServices({ onNav }: { onNav: (r: string) => void }) {
  useField('home', '_');
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface2)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, marginBottom: 64 }}>
          <SectionHead eyebrow={getField('home', 'services_eyebrow')} title={getField('home', 'services_title')} />
          {getField('home', 'services_cta') && <Btn variant="ghost" onClick={() => onNav('services')}>{getField('home', 'services_cta')} <Ico name="arrow" size={14}/></Btn>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: '1px solid var(--c-line)', background: 'var(--c-line)' }}>
          {SERVICES.map((s, i) => (
            <ScrollFadeUp key={s.id} delay={i * 0.05}>
              <div style={{
                background: 'var(--c-surface)',
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer', height: '100%', overflow: 'hidden',
              }}
              onClick={() => onNav(`services:${s.id}`)}
              onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.background = 'var(--c-bg)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.background = 'var(--c-surface)'}>
                <div style={{ position: 'relative' }}>
                  <HoverImageZoom>
                    <RealImage src={serviceImage(s.id)} alt={s.name} ratio="16/10" fallbackSeed={`home-svc-${s.id}`}/>
                  </HoverImageZoom>
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                    color: 'var(--c-ink)', background: 'var(--c-bg)', padding: '4px 10px', borderRadius: 2,
                  }}>0{i+1}</span>
                  <span style={{
                    position: 'absolute', bottom: 14, left: 14,
                    width: 40, height: 40, borderRadius: 2,
                    background: 'var(--c-bg)', color: 'var(--c-brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ico name={s.icon} size={20}/>
                  </span>
                </div>
                <div style={{ padding: '28px 32px 32px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 24, color: 'var(--c-ink)', margin: 0, letterSpacing: '-0.01em' }}>{s.name}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--c-ink2)', margin: 0 }}>{s.short}</p>
                  <div style={{ flex: 1 }}/>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--c-brand)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Learn more <Ico name="arrow" size={12}/>
                  </div>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCorridors() {
  useField('home', '_');
  const corridors = [
    { from: 'Chennai', to: 'Genoa', days: 28, freq: 'Weekly', material: 'HMS 1/2, Shredded' },
    { from: 'Porto de Santos', to: 'Chennai', days: 34, freq: 'Bi-monthly', material: 'Birch/Cliff Cu' },
    { from: 'Aalborg', to: 'Kattupalli', days: 31, freq: 'Monthly', material: 'Taint/Tabor, Zorba' },
    { from: 'Hamburg', to: 'Chennai', days: 29, freq: 'Spot vessel', material: 'Shredded 211' },
    { from: 'Chennai', to: 'Jebel Ali', days: 7, freq: 'Weekly', material: 'Mixed ferrous' },
    { from: 'Ennore', to: 'Valencia', days: 26, freq: 'Bi-monthly', material: 'Plate & structural' },
  ];
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <SectionHead eyebrow={getField('home', 'corr_eyebrow')} title={getField('home', 'corr_title')} />
        <ScrollFadeUp>
          <div style={{ marginTop: 56, border: '1px solid var(--c-line)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 0.8fr', padding: '14px 24px', background: 'var(--c-ink)', color: 'var(--c-bg)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span>Origin → Destination</span>
              <span>Transit (days)</span>
              <span>Frequency</span>
              <span>Primary material</span>
              <span/>
            </div>
            {corridors.map((c, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 0.8fr',
                padding: '22px 24px', alignItems: 'center',
                borderBottom: i < corridors.length - 1 ? '1px solid var(--c-line)' : 'none',
                background: 'var(--c-surface)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--c-ink)' }}>
                  <span>{c.from}</span>
                  <Ico name="arrow" size={14}/>
                  <span>{c.to}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--c-ink)' }}>{c.days} days</div>
                <div style={{ fontSize: 14, color: 'var(--c-ink2)' }}>{c.freq}</div>
                <div style={{ fontSize: 14, color: 'var(--c-ink2)' }}>{c.material}</div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ width: 8, height: 8, display: 'inline-block', background: 'var(--c-brand2)', borderRadius: '50%' }}/>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--c-muted)', marginLeft: 8 }}>ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}

function HomeStats() {
  useField('home', '_');
  return (
    <section style={{ padding: '120px 0', background: 'var(--c-ink)', color: 'var(--c-darkInk)', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 20 }}>{getField('home', 'stats_eyebrow')}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(36px, 4.8vw, 64px)', lineHeight: 1.02, letterSpacing: 'var(--display-tracking)', margin: 0 }}>
            <BlurInWords as="span" text={`${getField('home', 'stats_title_a')} ${getField('home', 'stats_title_b')}`} stagger={0.05}/>
          </h2>
        </div>
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          {[
            { big: '240,000+', unit: 'MT handled since 1998', sub: 'Hazardous + non-hazardous combined' },
            { big: '420+', unit: 'Industrial clients', sub: 'Across South India' },
            { big: '92%', unit: 'Materials diversion rate', sub: 'Recovered back into supply chains' },
            { big: '14', unit: 'Vehicles in fleet', sub: 'GPS-tracked · hazmat-rated' },
          ].map((s, i) => (
            <ScrollFadeUp key={i} delay={i * 0.06}>
              <div style={{ padding: '40px 32px 40px 0', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 64, letterSpacing: '-0.04em', color: i === 0 ? 'var(--c-accent)' : 'var(--c-darkInk)' }}>{s.big}</div>
                <div style={{ fontSize: 15, marginTop: 10, opacity: 0.9 }}>{s.unit}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 12 }}>{s.sub}</div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeLogos() {
  const partners = ['CPCB', 'TNPCB', 'AERB', 'MoEFCC EPR', 'ISO 14001', 'Bureau Veritas', 'SGS', 'TNPCB TSDF Network'];
  return (
    <section style={{ padding: '64px 0', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: 28 }}>Trusted by</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 0, borderTop: '1px solid var(--c-line)' }}>
          {partners.map((p, i) => (
            <div key={i} style={{
              padding: '28px 12px', borderBottom: '1px solid var(--c-line)',
              borderRight: i < 7 ? '1px solid var(--c-line)' : 'none',
              fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--c-ink2)',
              textAlign: 'center', letterSpacing: '-0.01em',
            }}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA({ onOpenQuote, onNav }: { onOpenQuote: () => void; onNav: (r: string) => void }) {
  useField('home', '_');
  return (
    <section style={{ padding: '120px 0', background: 'var(--c-accent)', color: 'var(--c-accentInk)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.98, letterSpacing: 'var(--display-tracking)', margin: 0, textWrap: 'balance' as any }}>
          <BlurInWords as="span" text={getField('home', 'cta_title')} stagger={0.04}/>
        </h2>
        <ScrollFadeUp distance={100}>
          <p style={{ fontSize: 17, lineHeight: 1.55, marginBottom: 32, opacity: 0.82 }}>
            {getField('home', 'cta_body')}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {getField('home', 'cta_primary') && <Btn variant="dark" size="lg" onClick={onOpenQuote}>{getField('home', 'cta_primary')} <Ico name="arrow" size={16}/></Btn>}
            {getField('home', 'cta_secondary') && <Btn variant="ghost" size="lg" onClick={() => onNav('contact')} style={{ borderColor: 'var(--c-accentInk)' }}>{getField('home', 'cta_secondary')}</Btn>}
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}

function HomeTestimonials() {
  useField('home', '_');
  const testimonials = [
    { q: getField('home', 't1_quote'), name: getField('home', 't1_name'), role: getField('home', 't1_role'), country: getField('home', 't1_country') },
    { q: getField('home', 't2_quote'), name: getField('home', 't2_name'), role: getField('home', 't2_role'), country: getField('home', 't2_country') },
    { q: getField('home', 't3_quote'), name: getField('home', 't3_name'), role: getField('home', 't3_role'), country: getField('home', 't3_country') },
  ];
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface2)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px' }}>
        <SectionHead eyebrow={getField('home', 'test_eyebrow')} title={getField('home', 'test_title')} />
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--c-line)', borderLeft: '1px solid var(--c-line)' }}>
          {testimonials.map((t, i) => (
            <ScrollFadeUp key={i} delay={i * 0.08}>
              <div style={{ padding: 40, borderRight: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface)', display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 0.6, color: 'var(--c-brand)', opacity: 0.35 }}>&ldquo;</div>
                <ParagraphBlurIn className="">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)' as any, fontSize: 22, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--c-ink)', display: 'block' }}>
                    {t.q}
                  </span>
                </ParagraphBlurIn>
                <div style={{ paddingTop: 20, borderTop: '1px solid var(--c-line)', marginTop: 'auto' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-ink)' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--c-muted)', marginTop: 4 }}>{t.role}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-brand)', marginTop: 8 }}>{t.country}</div>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCompliance() {
  useField('home', '_');
  const certs = [1,2,3,4,5,6].map(n => ({
    label: getField('home', `comp_${n}_label`),
    sub: getField('home', `comp_${n}_sub`),
  }));
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 }}>
        <ScrollFadeUp>
          <SectionHead eyebrow={getField('home', 'comp_eyebrow')} title={getField('home', 'comp_title')} />
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--c-ink2)', marginTop: 28, maxWidth: 440, textWrap: 'pretty' as any }}>
            {getField('home', 'comp_body')}
          </p>
        </ScrollFadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--c-line)' }}>
          {certs.map((c, i) => (
            <ScrollFadeUp key={i} delay={i * 0.05}>
              <div style={{
                padding: 28,
                borderRight: (i+1)%3 !== 0 ? '1px solid var(--c-line)' : 'none',
                borderBottom: i < 3 ? '1px solid var(--c-line)' : 'none',
                display: 'flex', flexDirection: 'column', gap: 16, minHeight: 180,
                height: '100%',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: '1px solid var(--c-brand)', color: 'var(--c-brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                }}>
                  <Ico name="check" size={18}/>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 'var(--display-weight)' as any, color: 'var(--c-ink)', letterSpacing: '-0.01em' }}>{c.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--c-muted)', marginTop: 6 }}>{c.sub}</div>
                </div>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFAQ() {
  useField('home', '_');
  const [open, setOpen] = useState<number>(0);
  const qs = [1,2,3,4,5,6,7,8].map(n => ({
    q: getField('home', `faq_${n}_q`),
    a: getField('home', `faq_${n}_a`),
  })).filter(x => x.q);
  return (
    <section style={{ padding: '120px 0', borderBottom: '1px solid var(--c-line)', background: 'var(--c-surface2)' }}>
      <div className="mrg-faq-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
        <div className="mrg-faq-aside" style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
          <SectionHead eyebrow={getField('home', 'faq_eyebrow')} title={getField('home', 'faq_title')} />
          <div style={{ marginTop: 32 }}>
            <HoverImageZoom>
              <RealImage src={IMAGES.faq} alt="Trade desk · ready to answer" ratio="4/5" fallbackSeed="faq-desk" label="Talk to a trader, not a form field"/>
            </HoverImageZoom>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--c-line)' }}>
          {qs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--c-line)' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '28px 0', textAlign: 'left', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32,
                  color: 'var(--c-ink)', fontFamily: 'var(--font-display)',
                  fontSize: 22, fontWeight: 'var(--display-weight)' as any, letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                }}>
                  <span style={{ flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--c-muted)', marginRight: 18, letterSpacing: '0.08em' }}>0{i+1}</span>
                    {item.q}
                  </span>
                  <span style={{
                    width: 32, height: 32, border: '1px solid var(--c-line)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isOpen ? 'var(--c-ink)' : 'transparent',
                    color: isOpen ? 'var(--c-darkInk)' : 'var(--c-ink)',
                    transition: 'all .2s', flexShrink: 0,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}>
                    <Ico name="plus" size={14}/>
                  </span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 28, paddingLeft: 48, maxWidth: 680 }}>
                    <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--c-ink2)', margin: 0, textWrap: 'pretty' as any }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
