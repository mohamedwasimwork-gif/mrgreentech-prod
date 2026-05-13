'use client';

// Central content store — defines every editable field for every page
import { useEffect, useReducer } from 'react';

export interface FieldSpec {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  value: string;
}

export interface FieldGroup {
  id: string;
  label: string;
  fields: FieldSpec[];
}

export interface PageSchema {
  name: string;
  path: string;
  groups: FieldGroup[];
}

export const PAGE_SCHEMAS: Record<string, PageSchema> = {
  home: {
    name: 'Home', path: '/',
    groups: [
      { id: 'hero', label: 'Hero', fields: [
        { key: 'hero_chip_est', label: 'Established chip', type: 'text', value: '◆ EST. 2014' },
        { key: 'hero_chip_location', label: 'Location chip', type: 'text', value: 'Chennai · Tamil Nadu' },
        { key: 'hero_chip_accent', label: 'Accent chip', type: 'text', value: 'Actively trading 11 countries' },
        { key: 'hero_title_1', label: 'Hero title line 1', type: 'text', value: 'Scrap metal,' },
        { key: 'hero_title_2', label: 'Hero title line 2', type: 'text', value: 'moved with' },
        { key: 'hero_title_emph', label: 'Hero emphasised word', type: 'text', value: 'intent.' },
        { key: 'hero_body', label: 'Hero subcopy', type: 'textarea', value: 'We trade ferrous and non-ferrous scrap between South India and Europe — Brazil, Denmark, Germany and more. Graded, documented, and shipped through Chennai, Ennore and Kattupalli.' },
        { key: 'hero_cta_primary', label: 'Primary CTA label', type: 'text', value: 'Request a quote' },
        { key: 'hero_cta_secondary', label: 'Secondary CTA label', type: 'text', value: 'Explore services' },
        { key: 'hero_image_label', label: 'Hero image placeholder', type: 'text', value: 'Hero — yard aerial, Ambattur' },
        { key: 'hero_live_label', label: 'Live stats label', type: 'text', value: 'Live · May 2026' },
        { key: 'hero_stat1_big', label: 'Stat 1 value', type: 'text', value: '192K' },
        { key: 'hero_stat1_unit', label: 'Stat 1 unit', type: 'text', value: 'MT handled' },
        { key: 'hero_stat2_big', label: 'Stat 2 value', type: 'text', value: '1,318' },
        { key: 'hero_stat2_unit', label: 'Stat 2 unit', type: 'text', value: 'Shipments' },
        { key: 'hero_stat3_big', label: 'Stat 3 value', type: 'text', value: '11' },
        { key: 'hero_stat3_unit', label: 'Stat 3 unit', type: 'text', value: 'Countries' },
      ]},
      { id: 'intro', label: 'Who we are', fields: [
        { key: 'intro_eyebrow', label: 'Section eyebrow', type: 'text', value: '01 — Who we are' },
        { key: 'intro_title', label: 'Section title', type: 'text', value: 'A trade house, not a yard alone.' },
        { key: 'intro_p1', label: 'Paragraph 1', type: 'textarea', value: 'MR Greentech began in 2014 as a single weighbridge in Ambattur. Twelve years on, we operate a 60,000 sqft processing yard, a compliance desk that files over 2,000 Basel documents a year, and sourcing partnerships in Brazil, Denmark, Germany and the UAE.' },
        { key: 'intro_p2', label: 'Paragraph 2', type: 'textarea', value: 'Our buyers are foundries, steel re-rollers and die-casters. Our sellers are municipal recyclers, factory clean-outs and EU dismantlers. Between them: grading, paperwork, containers, and a reputation we protect lot by lot.' },
        { key: 'intro_stat1_top', label: 'Stat 1 value', type: 'text', value: '12' },
        { key: 'intro_stat1_label', label: 'Stat 1 label', type: 'text', value: 'Years trading' },
        { key: 'intro_stat2_top', label: 'Stat 2 value', type: 'text', value: '192K' },
        { key: 'intro_stat2_label', label: 'Stat 2 label', type: 'text', value: 'MT handled' },
        { key: 'intro_stat3_top', label: 'Stat 3 value', type: 'text', value: '60K' },
        { key: 'intro_stat3_label', label: 'Stat 3 label', type: 'text', value: 'sqft yard' },
        { key: 'intro_stat4_top', label: 'Stat 4 value', type: 'text', value: '24' },
        { key: 'intro_stat4_label', label: 'Stat 4 label', type: 'text', value: 'Team' },
      ]},
      { id: 'services', label: 'Services band', fields: [
        { key: 'services_eyebrow', label: 'Eyebrow', type: 'text', value: '02 — What we do' },
        { key: 'services_title', label: 'Title', type: 'text', value: 'Six capabilities, one supply chain.' },
        { key: 'services_cta', label: 'CTA label', type: 'text', value: 'All services' },
      ]},
      { id: 'corridors', label: 'Corridors', fields: [
        { key: 'corr_eyebrow', label: 'Eyebrow', type: 'text', value: '03 — Trade corridors' },
        { key: 'corr_title', label: 'Title', type: 'text', value: 'Six active lanes between South India and the world.' },
      ]},
      { id: 'stats', label: 'By the numbers', fields: [
        { key: 'stats_eyebrow', label: 'Eyebrow', type: 'text', value: '04 — By the numbers' },
        { key: 'stats_title_a', label: 'Title part A', type: 'text', value: 'Trade is a numbers business.' },
        { key: 'stats_title_b', label: 'Title part B (accent)', type: 'text', value: 'Here are ours.' },
      ]},
      { id: 'cases', label: 'Case studies band', fields: [
        { key: 'cases_eyebrow', label: 'Eyebrow', type: 'text', value: '05 — Case studies' },
        { key: 'cases_title', label: 'Title', type: 'text', value: 'What delivery looks like, start to finish.' },
        { key: 'cases_cta', label: 'CTA label', type: 'text', value: 'All case studies' },
      ]},
      { id: 'testimonials', label: 'Testimonials', fields: [
        { key: 'test_eyebrow', label: 'Eyebrow', type: 'text', value: '06 — In their words' },
        { key: 'test_title', label: 'Title', type: 'text', value: 'What buyers and sellers tell us.' },
        { key: 't1_quote', label: 'Quote 1', type: 'textarea', value: "Three years in, we haven't had a single documentation query on an MR Greentech lot. That is not normal in this trade." },
        { key: 't1_name', label: 'Author 1', type: 'text', value: 'Marco Benedetti' },
        { key: 't1_role', label: 'Role 1', type: 'text', value: 'Procurement · Acciaierie di Genova' },
        { key: 't1_country', label: 'Country 1', type: 'text', value: 'Italy' },
        { key: 't2_quote', label: 'Quote 2', type: 'textarea', value: 'They were the only buyer who came to site before quoting. Paid on LC as promised, lifted in the window they committed to.' },
        { key: 't2_name', label: 'Author 2', type: 'text', value: 'Søren Lindqvist' },
        { key: 't2_role', label: 'Role 2', type: 'text', value: 'MD · Nordisk Metal ApS' },
        { key: 't2_country', label: 'Country 2', type: 'text', value: 'Denmark' },
        { key: 't3_quote', label: 'Quote 3', type: 'textarea', value: "Good trader. Picks up the phone. Pays on time. No surprises at discharge. That's the whole business." },
        { key: 't3_name', label: 'Author 3', type: 'text', value: 'Ramesh Iyer' },
        { key: 't3_role', label: 'Role 3', type: 'text', value: 'Proprietor · Coimbatore Forging Co.' },
        { key: 't3_country', label: 'Country 3', type: 'text', value: 'India' },
      ]},
      { id: 'compliance', label: 'Compliance & certifications', fields: [
        { key: 'comp_eyebrow', label: 'Eyebrow', type: 'text', value: '07 — Compliance' },
        { key: 'comp_title', label: 'Title', type: 'text', value: 'Audited, notified, certified.' },
        { key: 'comp_body', label: 'Body', type: 'textarea', value: 'We file under MoEFCC, Basel and ISRI norms on every cross-border lot. Copies of our current certifications are available on request.' },
        { key: 'comp_1_label', label: 'Cert 1 label', type: 'text', value: 'ISRI member' },
        { key: 'comp_1_sub', label: 'Cert 1 sub', type: 'text', value: 'Since 2018' },
        { key: 'comp_2_label', label: 'Cert 2 label', type: 'text', value: 'MoEFCC EPR' },
        { key: 'comp_2_sub', label: 'Cert 2 sub', type: 'text', value: 'Authorisation 2024–27' },
        { key: 'comp_3_label', label: 'Cert 3 label', type: 'text', value: 'Basel notified' },
        { key: 'comp_3_sub', label: 'Cert 3 sub', type: 'text', value: '2,000+ filings / yr' },
        { key: 'comp_4_label', label: 'Cert 4 label', type: 'text', value: 'ISO 14001' },
        { key: 'comp_4_sub', label: 'Cert 4 sub', type: 'text', value: 'Environment mgmt' },
        { key: 'comp_5_label', label: 'Cert 5 label', type: 'text', value: 'BIMCO member' },
        { key: 'comp_5_sub', label: 'Cert 5 sub', type: 'text', value: 'Shipping standards' },
        { key: 'comp_6_label', label: 'Cert 6 label', type: 'text', value: 'AEO-T1' },
        { key: 'comp_6_sub', label: 'Cert 6 sub', type: 'text', value: 'Customs-trusted' },
      ]},
      { id: 'faq', label: 'FAQ', fields: [
        { key: 'faq_eyebrow', label: 'Eyebrow', type: 'text', value: '08 — Common questions' },
        { key: 'faq_title', label: 'Title', type: 'text', value: 'Before you send the enquiry.' },
        { key: 'faq_1_q', label: 'Q1', type: 'text', value: "What is the smallest lot you'll quote?" },
        { key: 'faq_1_a', label: 'A1', type: 'textarea', value: "22 MT for ferrous, 18 MT for non-ferrous — roughly one 20-ft container. Anything smaller, we'll refer to a yard partner rather than waste your time." },
        { key: 'faq_2_q', label: 'Q2', type: 'text', value: 'Do you take title, or are you brokering?' },
        { key: 'faq_2_a', label: 'A2', type: 'textarea', value: "We take title. Material is inspected, paid for, and shipped under our name. If we broker — which is rare — we tell you up front." },
        { key: 'faq_3_q', label: 'Q3', type: 'text', value: 'How are your prices set?' },
        { key: 'faq_3_a', label: 'A3', type: 'textarea', value: 'Ferrous: indexed to CFR Turkey HMS 1/2 with grade and freight adjustments. Non-ferrous: LME-linked with ISRI grade pricing. Quotes hold for 5 working days.' },
        { key: 'faq_4_q', label: 'Q4', type: 'text', value: 'Which destinations can you ship to?' },
        { key: 'faq_4_a', label: 'A4', type: 'textarea', value: "Active corridors: Italy, Germany, Denmark, UAE, Bangladesh, Malaysia, Vietnam, Brazil inbound. We'll file the Basel notification once both ends are confirmed." },
        { key: 'faq_5_q', label: 'Q5', type: 'text', value: 'What paperwork do I receive?' },
        { key: 'faq_5_a', label: 'A5', type: 'textarea', value: 'For every shipment: MTR, packing list, pre-shipment inspection certificate (PSIC), radiation clearance, Basel notification copy, commercial invoice, BL. All digitised.' },
        { key: 'faq_6_q', label: 'Q6', type: 'text', value: 'How quickly can you turn around a quote?' },
        { key: 'faq_6_a', label: 'A6', type: 'textarea', value: "Most quote requests get a written response within one working day. If the cargo is straightforward and we've worked with the buyer/supplier before, same-day is normal. Complex multi-grade lots may take 2–3 days while we cross-check yard stock and freight availability." },
        { key: 'faq_7_q', label: 'Q7', type: 'text', value: 'Can you handle insurance and freight booking end-to-end?' },
        { key: 'faq_7_a', label: 'A7', type: 'textarea', value: 'Yes. For CIF/CFR contracts we book the vessel, file marine insurance against our blanket policy with New India Assurance, and handle Basel notification through to discharge. EXW/FOB buyers can either nominate their own forwarder or pick up our rate.' },
        { key: 'faq_8_q', label: 'Q8', type: 'text', value: 'How do you handle disputes on grade or weight at destination?' },
        { key: 'faq_8_a', label: 'A8', type: 'textarea', value: "Every lot ships with a third-party PSIC and our own grading report. If a discharge survey disagrees, we ask for an independent re-inspection (SGS, Lloyd's or Bureau Veritas) at destination — split cost. The result of that inspection is binding on both sides, and any short-fall is settled within 14 working days." },
      ]},
      { id: 'cta', label: 'Closing CTA', fields: [
        { key: 'cta_title', label: 'Title', type: 'text', value: 'Have a lot to move? Send us the details.' },
        { key: 'cta_body', label: 'Body', type: 'textarea', value: 'Most quote requests get a response within one working day. Attach your MTR or photos if you have them.' },
        { key: 'cta_primary', label: 'Primary CTA', type: 'text', value: 'Request quote' },
        { key: 'cta_secondary', label: 'Secondary CTA', type: 'text', value: 'Contact team' },
      ]},
    ],
  },
  about: {
    name: 'About', path: '/about',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'About' },
        { key: 'title', label: 'Title', type: 'text', value: "We're a trade house first. The yard came later." },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'MR Greentech was started in Chennai in 2014 with a single weighbridge, two trucks and a cold call to a Bhavnagar shipbreaker. Twelve years on we move 30,000 MT a year across eleven countries — and we still answer the phone.' },
      ]},
    ],
  },
  services: {
    name: 'Services', path: '/services',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Services' },
        { key: 'title', label: 'Title', type: 'text', value: 'Six capabilities, one supply chain.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: "We take responsibility for the material from the supplier's gate to the buyer's furnace. Here's how that breaks down." },
      ]},
    ],
  },
  cases: {
    name: 'Case Studies', path: '/case-studies',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Case studies' },
        { key: 'title', label: 'Title', type: 'text', value: "Four lots we're proud to have shipped." },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'Each one ran through our full pipeline — sourcing, grading, documentation, shipping. Names stay on the deal; volumes are real.' },
      ]},
    ],
  },
  sustainability: {
    name: 'Sustainability', path: '/sustainability',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Sustainability' },
        { key: 'title', label: 'Title', type: 'text', value: 'Recycled metal is a climate asset. We treat it like one.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: "Every tonne of scrap we trade displaces roughly 1.5 tonnes of iron ore, half a tonne of coking coal and a little under two tonnes of CO₂. The numbers below aren't claims — they're filed with our Basel notifications." },
      ]},
    ],
  },
  blog: {
    name: 'Insights', path: '/insights',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Insights' },
        { key: 'title', label: 'Title', type: 'text', value: 'Field notes from a scrap trader.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'Occasional writing on market movements, compliance changes, shipping lanes and the odd technical deep-dive on grading.' },
      ]},
    ],
  },
  contact: {
    name: 'Contact', path: '/contact',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Contact' },
        { key: 'title', label: 'Title', type: 'text', value: 'Talk to a trader, not a form field.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'Quote requests get the fastest turnaround through our dedicated form. For everything else — partnerships, press, compliance queries — reach us here.' },
      ]},
    ],
  },
  privacy: {
    name: 'Privacy Policy', path: '/privacy',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Legal' },
        { key: 'title', label: 'Title', type: 'text', value: 'Privacy Policy' },
        { key: 'kicker', label: 'Kicker', type: 'text', value: 'Last updated April 04, 2026.' },
      ]},
    ],
  },
  terms: {
    name: 'Terms of Service', path: '/terms',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Legal' },
        { key: 'title', label: 'Title', type: 'text', value: 'Terms of Service' },
        { key: 'kicker', label: 'Kicker', type: 'text', value: 'Last updated April 04, 2026.' },
      ]},
    ],
  },
};

const CONTENT_KEY = 'mrg.content.v1';
const THEME_STATE_KEY = 'mrg.theme.custom.v1';

const isBrowser = () => typeof window !== 'undefined';

export function loadContent(): Record<string, any> {
  if (!isBrowser()) return {};
  try { return JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}'); } catch (e) { return {}; }
}

export function saveContent(obj: Record<string, any>) {
  if (!isBrowser()) return;
  localStorage.setItem(CONTENT_KEY, JSON.stringify(obj));
  window.dispatchEvent(new CustomEvent('mrg:content-changed'));
}

export function getField(pageId: string, key: string): string {
  const store = loadContent();
  const pageOverrides = store[pageId] || {};
  const schema = PAGE_SCHEMAS[pageId];
  if (pageOverrides._custom && pageOverrides._custom[key]) {
    const cf = pageOverrides._custom[key];
    if (cf.hidden) return '';
    return cf.value;
  }
  if (pageOverrides._hidden && pageOverrides._hidden[key]) return '';
  if (pageOverrides[key] !== undefined) return pageOverrides[key];
  if (schema) {
    for (const g of schema.groups) {
      for (const f of g.fields) if (f.key === key) return f.value;
    }
  }
  return '';
}

export function setField(pageId: string, key: string, value: string) {
  const store = loadContent();
  store[pageId] = store[pageId] || {};
  if (store[pageId]._custom && store[pageId]._custom[key]) {
    store[pageId]._custom[key] = { ...store[pageId]._custom[key], value };
  } else {
    store[pageId][key] = value;
  }
  saveContent(store);
}

export function toggleFieldHidden(pageId: string, key: string, hidden: boolean) {
  const store = loadContent();
  store[pageId] = store[pageId] || {};
  if (store[pageId]._custom && store[pageId]._custom[key]) {
    store[pageId]._custom[key].hidden = hidden;
    saveContent(store);
    return;
  }
  store[pageId]._hidden = store[pageId]._hidden || {};
  if (hidden) store[pageId]._hidden[key] = true;
  else delete store[pageId]._hidden[key];
  saveContent(store);
}

export function addCustomField(pageId: string, label: string, value: string): string {
  const store = loadContent();
  store[pageId] = store[pageId] || {};
  store[pageId]._custom = store[pageId]._custom || {};
  const key = 'custom_' + Date.now();
  store[pageId]._custom[key] = { label, value, hidden: false, type: 'text' };
  saveContent(store);
  return key;
}

export function removeCustomField(pageId: string, key: string) {
  const store = loadContent();
  if (store[pageId]?._custom?.[key]) {
    delete store[pageId]._custom[key];
    saveContent(store);
  }
}

export function resetField(pageId: string, key: string) {
  const store = loadContent();
  if (store[pageId]) {
    delete store[pageId][key];
    if (store[pageId]._hidden) delete store[pageId]._hidden[key];
    saveContent(store);
  }
}

export function isFieldHidden(pageId: string, key: string): boolean {
  const store = loadContent();
  const p = store[pageId] || {};
  if (p._custom?.[key]?.hidden) return true;
  if (p._hidden?.[key]) return true;
  return false;
}

export function getPageFields(pageId: string) {
  const schema = PAGE_SCHEMAS[pageId];
  const store = loadContent();
  const pageStore = store[pageId] || {};
  const groups: Array<{ id: string; label: string; fields: any[] }> = [];
  if (schema) {
    for (const g of schema.groups) {
      groups.push({
        id: g.id, label: g.label,
        fields: g.fields.map(f => ({
          key: f.key, label: f.label, type: f.type,
          value: pageStore[f.key] !== undefined ? pageStore[f.key] : f.value,
          hidden: !!pageStore._hidden?.[f.key],
          builtIn: true,
        }))
      });
    }
  }
  const customFields: any[] = [];
  for (const [k, v] of Object.entries(pageStore._custom || {})) {
    const cf = v as any;
    customFields.push({ key: k, label: cf.label, type: cf.type || 'text', value: cf.value, hidden: !!cf.hidden, builtIn: false });
  }
  if (customFields.length) groups.push({ id: '_custom', label: 'Custom fields', fields: customFields });
  return groups;
}

// React hook — re-renders pages when content changes
export function useField(pageId: string, key: string): string {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  useEffect(() => {
    if (!isBrowser()) return;
    const handler = () => forceUpdate();
    window.addEventListener('mrg:content-changed', handler);
    return () => window.removeEventListener('mrg:content-changed', handler);
  }, []);
  return getField(pageId, key);
}

export function loadThemeState(): any {
  if (!isBrowser()) return {};
  try { return JSON.parse(localStorage.getItem(THEME_STATE_KEY) || '{}'); } catch (e) { return {}; }
}

export function saveThemeState(s: any) {
  if (!isBrowser()) return;
  localStorage.setItem(THEME_STATE_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent('mrg:theme-changed'));
}
