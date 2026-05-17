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
        { key: 'hero_chip_est', label: 'Established chip', type: 'text', value: '◆ EST. 1998' },
        { key: 'hero_chip_location', label: 'Location chip', type: 'text', value: 'Chennai · Tamil Nadu' },
        { key: 'hero_chip_accent', label: 'Accent chip', type: 'text', value: 'CPCB & TNPCB authorised' },
        { key: 'hero_title_1', label: 'Hero title line 1', type: 'text', value: 'Industrial waste,' },
        { key: 'hero_title_2', label: 'Hero title line 2', type: 'text', value: 'managed with' },
        { key: 'hero_title_emph', label: 'Hero emphasised word', type: 'text', value: 'intent.' },
        { key: 'hero_body', label: 'Hero subcopy', type: 'textarea', value: 'M R Greentech collects, treats, recovers and safely disposes of hazardous and non-hazardous industrial waste across Tamil Nadu. CPCB authorised, ISO 14001 certified, serving 420+ industrial clients since 1998.' },
        { key: 'hero_cta_primary', label: 'Primary CTA label', type: 'text', value: 'Request a quote' },
        { key: 'hero_cta_secondary', label: 'Secondary CTA label', type: 'text', value: 'Explore services' },
        { key: 'hero_image_label', label: 'Hero image placeholder', type: 'text', value: 'Recovery floor · Ambattur' },
        { key: 'hero_live_label', label: 'Live stats label', type: 'text', value: 'Live · May 2026' },
        { key: 'hero_stat1_big', label: 'Stat 1 value', type: 'text', value: '240K' },
        { key: 'hero_stat1_unit', label: 'Stat 1 unit', type: 'text', value: 'MT handled' },
        { key: 'hero_stat2_big', label: 'Stat 2 value', type: 'text', value: '420+' },
        { key: 'hero_stat2_unit', label: 'Stat 2 unit', type: 'text', value: 'Industrial clients' },
        { key: 'hero_stat3_big', label: 'Stat 3 value', type: 'text', value: '92%' },
        { key: 'hero_stat3_unit', label: 'Stat 3 unit', type: 'text', value: 'Diverted from landfill' },
      ]},
      { id: 'intro', label: 'Who we are', fields: [
        { key: 'intro_eyebrow', label: 'Section eyebrow', type: 'text', value: '01 — Who we are' },
        { key: 'intro_title', label: 'Section title', type: 'text', value: 'A waste management partner, built over 28 years.' },
        { key: 'intro_p1', label: 'Paragraph 1', type: 'textarea', value: "Founded in 1998 by Manickaraj, M R Greentech has been committed to creating a cleaner, safer, and more sustainable environment through professional waste management solutions. Over the years, the company has built a strong reputation in the field of waste collection, treatment, disposal activities, and materials recovery — serving industries and communities with responsibility and care." },
        { key: 'intro_p2', label: 'Paragraph 2', type: 'textarea', value: "We are primarily engaged in the collection and management of both hazardous and non-hazardous waste. The company follows environmentally responsible practices to ensure that waste is handled, treated, and disposed of in compliance with safety and environmental standards. By focusing on sustainable waste management, M R Greentech contributes to reducing environmental impact while promoting recycling and resource recovery." },
        { key: 'intro_stat1_top', label: 'Stat 1 value', type: 'text', value: '28' },
        { key: 'intro_stat1_label', label: 'Stat 1 label', type: 'text', value: 'Years in service' },
        { key: 'intro_stat2_top', label: 'Stat 2 value', type: 'text', value: '240K' },
        { key: 'intro_stat2_label', label: 'Stat 2 label', type: 'text', value: 'MT handled' },
        { key: 'intro_stat3_top', label: 'Stat 3 value', type: 'text', value: '60K' },
        { key: 'intro_stat3_label', label: 'Stat 3 label', type: 'text', value: 'sqft facility' },
        { key: 'intro_stat4_top', label: 'Stat 4 value', type: 'text', value: '420+' },
        { key: 'intro_stat4_label', label: 'Stat 4 label', type: 'text', value: 'Clients served' },
      ]},
      { id: 'services', label: 'Services band', fields: [
        { key: 'services_eyebrow', label: 'Eyebrow', type: 'text', value: '02 — What we do' },
        { key: 'services_title', label: 'Title', type: 'text', value: 'Four service desks, one accountable partner.' },
        { key: 'services_cta', label: 'CTA label', type: 'text', value: 'All services' },
      ]},
      { id: 'stats', label: 'By the numbers', fields: [
        { key: 'stats_eyebrow', label: 'Eyebrow', type: 'text', value: '03 — By the numbers' },
        { key: 'stats_title_a', label: 'Title part A', type: 'text', value: 'Waste management is a discipline.' },
        { key: 'stats_title_b', label: 'Title part B (accent)', type: 'text', value: 'Here are our numbers.' },
      ]},
      { id: 'testimonials', label: 'Testimonials', fields: [
        { key: 'test_eyebrow', label: 'Eyebrow', type: 'text', value: '04 — In their words' },
        { key: 'test_title', label: 'Title', type: 'text', value: 'What plant managers tell us.' },
        { key: 't1_quote', label: 'Quote 1', type: 'textarea', value: "Eight years on the same contract, and not a single disposal certificate has bounced. For a pharma site, that's the only number that matters." },
        { key: 't1_name', label: 'Author 1', type: 'text', value: 'Priya Srinivasan' },
        { key: 't1_role', label: 'Role 1', type: 'text', value: 'EHS Lead · Pharma cluster, Sriperumbudur' },
        { key: 't1_country', label: 'Country 1', type: 'text', value: 'Tamil Nadu' },
        { key: 't2_quote', label: 'Quote 2', type: 'textarea', value: "They were the only handler that walked our shop floor before quoting. Sorted the e-waste pile the same week the contract was signed." },
        { key: 't2_name', label: 'Author 2', type: 'text', value: 'Arun Narayanan' },
        { key: 't2_role', label: 'Role 2', type: 'text', value: 'Plant Manager · Electronics OEM, Ambattur' },
        { key: 't2_country', label: 'Country 2', type: 'text', value: 'Tamil Nadu' },
        { key: 't3_quote', label: 'Quote 3', type: 'textarea', value: "Picks up on time. Sends the certificate on time. Files our Form 4 on time. The whole job is timing, and they do it." },
        { key: 't3_name', label: 'Author 3', type: 'text', value: 'Marco Bianchi' },
        { key: 't3_role', label: 'Role 3', type: 'text', value: 'Operations · Auto-ancillary, Maraimalai Nagar' },
        { key: 't3_country', label: 'Country 3', type: 'text', value: 'Tamil Nadu' },
      ]},
      { id: 'compliance', label: 'Compliance & certifications', fields: [
        { key: 'comp_eyebrow', label: 'Eyebrow', type: 'text', value: '05 — Compliance' },
        { key: 'comp_title', label: 'Title', type: 'text', value: 'Authorised, audited, certified.' },
        { key: 'comp_body', label: 'Body', type: 'textarea', value: 'We operate under continuous authorisation from CPCB and TNPCB, with ISO 14001 environmental management certification renewed every three years. Copies of our current authorisations are available on request.' },
        { key: 'comp_1_label', label: 'Cert 1 label', type: 'text', value: 'CPCB authorised' },
        { key: 'comp_1_sub', label: 'Cert 1 sub', type: 'text', value: 'Hazardous waste handling' },
        { key: 'comp_2_label', label: 'Cert 2 label', type: 'text', value: 'TNPCB authorised' },
        { key: 'comp_2_sub', label: 'Cert 2 sub', type: 'text', value: 'State-level operator' },
        { key: 'comp_3_label', label: 'Cert 3 label', type: 'text', value: 'CPCB EPR registered' },
        { key: 'comp_3_sub', label: 'Cert 3 sub', type: 'text', value: 'E-waste & plastic packaging' },
        { key: 'comp_4_label', label: 'Cert 4 label', type: 'text', value: 'ISO 14001' },
        { key: 'comp_4_sub', label: 'Cert 4 sub', type: 'text', value: 'Environment mgmt · 2018' },
        { key: 'comp_5_label', label: 'Cert 5 label', type: 'text', value: 'AERB registered' },
        { key: 'comp_5_sub', label: 'Cert 5 sub', type: 'text', value: 'Radiation monitoring' },
        { key: 'comp_6_label', label: 'Cert 6 label', type: 'text', value: 'OHSAS aligned' },
        { key: 'comp_6_sub', label: 'Cert 6 sub', type: 'text', value: 'Worker safety SOPs' },
      ]},
      { id: 'faq', label: 'FAQ', fields: [
        { key: 'faq_eyebrow', label: 'Eyebrow', type: 'text', value: '06 — Common questions' },
        { key: 'faq_title', label: 'Title', type: 'text', value: 'Before you send the enquiry.' },
        { key: 'faq_1_q', label: 'Q1', type: 'text', value: 'What kinds of waste do you handle?' },
        { key: 'faq_1_a', label: 'A1', type: 'textarea', value: "Both hazardous and non-hazardous industrial waste. On the hazardous side: used oils, spent solvents, paint sludges, e-waste, lead-acid batteries, contaminated packaging, and most Schedule I / II / III categories. On the non-hazardous side: general factory waste, paper, plastic packaging, wood pallets, canteen waste and construction & demolition debris." },
        { key: 'faq_2_q', label: 'Q2', type: 'text', value: 'Do I need my own authorisation to engage you?' },
        { key: 'faq_2_a', label: 'A2', type: 'textarea', value: "You need a generator authorisation from TNPCB. If you don't have one, we help you complete the application — usually a 4–6 week process. Once approved, you operate under your authorisation as the generator and we handle the transport, treatment and disposal end under ours." },
        { key: 'faq_3_q', label: 'Q3', type: 'text', value: 'How are pickups scheduled and priced?' },
        { key: 'faq_3_a', label: 'A3', type: 'textarea', value: "Most clients are on annual or multi-year contracts with weekly or bi-weekly scheduled pickups. Pricing is per category and per volume; volume discounts apply above 20 MT/month. One-time / on-call pickups are available for non-recurring needs at a per-load rate." },
        { key: 'faq_4_q', label: 'Q4', type: 'text', value: 'What paperwork do I receive after disposal?' },
        { key: 'faq_4_a', label: 'A4', type: 'textarea', value: "For hazardous waste: a signed Form 10 manifest at pickup, a transport receipt with GPS log, and a final disposal certificate from the TSDF / co-processor / incinerator within 7 working days. For non-hazardous and recovery: monthly volume reports by category, plus an annual diversion summary that you can use for BRSR or sustainability disclosures." },
        { key: 'faq_5_q', label: 'Q5', type: 'text', value: 'How do you handle e-waste under EPR?' },
        { key: 'faq_5_a', label: 'A5', type: 'textarea', value: "We are CPCB EPR registered for both Schedule I (large appliances, IT equipment) and Schedule II (lamps, batteries). For producers and brand owners we issue monthly recycling certificates that map directly to your EPR target on the central portal. Secure data destruction (NIST 800-88 wipe or physical shred) is bundled into the pickup for storage media." },
        { key: 'faq_6_q', label: 'Q6', type: 'text', value: 'How quickly can you respond to an unscheduled pickup?' },
        { key: 'faq_6_a', label: 'A6', type: 'textarea', value: "Within 24 hours for clients on an annual contract. For one-off generators we typically respond within 3–5 working days depending on category and quantity. Liquid hazardous categories that need specialised vehicles may take a day longer." },
        { key: 'faq_7_q', label: 'Q7', type: 'text', value: 'What happens if a load gets rejected at destination?' },
        { key: 'faq_7_a', label: 'A7', type: 'textarea', value: "Our intake protocol — six tests per consignment — catches most categorisation errors before the load leaves Ambattur. The remaining edge cases are managed by routing to a different downstream partner with the right authorisation. Generators are never on the hook for our re-routing decisions; the contract transfers disposal liability to us once the manifest is signed." },
        { key: 'faq_8_q', label: 'Q8', type: 'text', value: 'Do you provide ESG / sustainability reports?' },
        { key: 'faq_8_a', label: 'A8', type: 'textarea', value: "Yes. Every contract includes a monthly volume report broken out by category and diversion route, a quarterly trend chart, and an annual signed summary suitable for BRSR (Business Responsibility & Sustainability Reporting) filings and ESG audits." },
      ]},
      { id: 'cta', label: 'Closing CTA', fields: [
        { key: 'cta_title', label: 'Title', type: 'text', value: 'Have a waste stream to manage? Send us the details.' },
        { key: 'cta_body', label: 'Body', type: 'textarea', value: 'Most enquiries get a written response within one working day. Tell us the category, the rough volume and the pickup frequency you need — we will quote.' },
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
        { key: 'title', label: 'Title', type: 'text', value: 'Twenty-eight years cleaning up after South Indian industry.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'M R Greentech was founded in Chennai in 1998 by Manickaraj with a single truck and one principle — waste leaving a customer’s gate is the customer’s reputation. We still pick up the phone, and the principle still runs every shift.' },
      ]},
    ],
  },
  services: {
    name: 'Services', path: '/services',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Services' },
        { key: 'title', label: 'Title', type: 'text', value: 'Four service desks. One accountable partner.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: "From hazardous waste handling under CPCB authorisation through to high-recovery materials processing — we run the full chain in-house, and stand behind the disposal certificate at the end of it." },
      ]},
    ],
  },
  sustainability: {
    name: 'Sustainability', path: '/sustainability',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Sustainability' },
        { key: 'title', label: 'Title', type: 'text', value: 'Every kilogram diverted is a kilogram not mined.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: "We have diverted 220,000+ MT of industrial waste from landfill since 1998 — recovered as metals, plastics, paper and other reusable streams that go back into South Indian supply chains. The numbers below are audited against our annual Form 4 returns." },
      ]},
    ],
  },
  blog: {
    name: 'Insights', path: '/insights',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Insights' },
        { key: 'title', label: 'Title', type: 'text', value: 'Field notes from the recovery floor.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'Occasional writing on regulatory shifts, e-waste handling, recovery technique, and what 28 years of waste management has taught us about industrial responsibility.' },
      ]},
    ],
  },
  contact: {
    name: 'Contact', path: '/contact',
    groups: [
      { id: 'header', label: 'Page header', fields: [
        { key: 'eyebrow', label: 'Eyebrow', type: 'text', value: 'Contact' },
        { key: 'title', label: 'Title', type: 'text', value: 'Talk to an operator, not a contact form.' },
        { key: 'kicker', label: 'Kicker', type: 'textarea', value: 'Quote enquiries get the fastest turnaround through our dedicated form. For everything else — site visits, compliance queries, partnerships, press — reach us here.' },
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
