// Shared data — company, services, cases, blog posts

export const COMPANY = {
  name: 'MR Greentech',
  established: 2014,
  hq: 'Chennai, Tamil Nadu, India',
  gst: '33AAHCM4821N1Z2',
  iec: '0414028341',
  email: 'trade@mrgreentech.in',
  phone: '+91 44 4212 8800',
  phone2: '+91 98400 21188',
  address: 'Unit 4B, Ambattur Industrial Estate, Chennai 600058, Tamil Nadu, India',
  lat: '13.0878°N, 80.1619°E',
  yearsActive: 12,
  // Headline cumulative numbers — May 2026 close-of-month, kept consistent
  // across home hero / intro / stats / sustainability / services pages.
  tonsHandled: '192,400',
  shipments: '1,318',
  countries: 11,
  onSpecRate: '99.4%',
  yardSqft: '60,000',
  team: 24,
  ports: ['Chennai', 'Kamarajar (Ennore)', 'Kattupalli'],
  inspectors: ["Lloyd's Register", 'Bureau Veritas', 'SGS', 'Intertek'],
  lastUpdated: 'May 13, 2026',
};

export interface ProcessStep {
  n: string;
  t: string;
  d: string;
  icon: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  short: string;
  /** Multi-paragraph long description rendered on the service detail panel. */
  detail: string[];
  /** Concrete differentiators (4-6 bullet points). */
  highlights: string[];
  /** ISRI / industry grades and sub-services this desk handles. */
  grades: string[];
  /** Cumulative MT shipped under this service since 2014. */
  volumeTons: number | null;
  /** Headline numbers shown in the snapshot column. */
  metrics: ServiceMetric[];
  /** Indicative commercial basis the desk works on. */
  pricingBasis: string;
  /** Who this service typically lands with. */
  customerProfiles: string[];
  /** Inspection bodies normally engaged for this service. */
  inspections: string[];
  /** Service-level FAQ rendered on the page. */
  serviceFaqs: ServiceFaq[];
  /** Title displayed above the per-service process stepper. */
  processTitle: string;
  process: ProcessStep[];
}

export const SERVICES: Service[] = [
  {
    id: 'ferrous',
    name: 'Ferrous Scrap Trade',
    icon: 'factory',
    short: 'HMS 1&2, shredded, bonus-grade and turnings — sourced across South India, graded and shipped to foundries in 11 countries.',
    detail: [
      "Ferrous scrap is the backbone of the desk and the reason MR Greentech was founded in 2014. We aggregate mill returns, demolition site material, OEM clean-outs and shipbreaker output from across Tamil Nadu, Karnataka and Andhra Pradesh, grade it to ISRI specifications at our Ambattur yard, and ship it under our IEC to long-running buyers in Italy, Germany, the UAE and Vietnam.",
      "About 60% of our ferrous volume flows under rolling monthly contracts — buyers who have been with us for 3+ years and lock in grade, port, and freight structure 12 months out. The remaining 40% is spot — single-vessel charters, opportunistic mill returns, and short-window bonus-grade lots that we move when the spread justifies it.",
      "Every consignment is documented under Basel Annex IX, third-party inspected before container sealing, and radiation-tested at both ingress and egress. That paper trail is the single biggest reason our average dispute rate at discharge is under 0.4%.",
    ],
    highlights: [
      'In-house ISRI grading with handheld density and magnetic checks at intake',
      'Hydraulic shear and twin-ram baler on site — no third-party processing dependency',
      'Direct relationships with 14 mill-cluster suppliers across Coimbatore, Salem and Erode',
      '3 active South India ports — Chennai, Ennore, Kattupalli — booked monthly',
      'Indexed pricing to CFR Turkey HMS 1/2 with transparent freight pass-through',
    ],
    grades: ['HMS 1/2 (80:20)', 'Shredded 211', 'Bonus Grade 233', 'Plate & Structural', 'Turnings & Borings', 'Light Iron 200'],
    volumeTons: 98400,
    metrics: [
      { label: 'Cumulative volume', value: '98,400', unit: 'MT' },
      { label: 'Lead time', value: '8–12', unit: 'weeks' },
      { label: 'Minimum lot', value: '22', unit: 'MT' },
      { label: 'Containers / mo', value: '38', unit: '40ft HC' },
      { label: 'Active corridors', value: '6' },
      { label: 'On-spec rate', value: '99.4', unit: '%' },
    ],
    pricingBasis: 'Indexed to CFR Turkey HMS 1/2 with grade adjustments and transparent freight pass-through. Quotes valid 5 working days.',
    customerProfiles: [
      'EU foundries (Italy, Germany)',
      'Tamil Nadu re-rolling mills',
      'MENA rebar producers (UAE, Oman)',
      'South-East Asian induction furnaces',
    ],
    inspections: ["Lloyd's Register", 'Bureau Veritas', 'SGS'],
    serviceFaqs: [
      { q: 'How tight do you grade HMS 80:20?', a: "Tighter than the spec. ISRI calls for at most 5% gauge below 6mm; our 80:20 averages 3.1% by weight. Buyers running induction furnaces tell us the recovery rate is materially better — that's why they pay a $4–6/MT premium over the index." },
      { q: 'Can you handle radioactive scrap concerns?', a: 'Portal monitors at the gate sweep every truck, and every export container is re-tested before sealing by Bureau Veritas or SGS. Radiation certificates travel with the BL. Zero contamination events on shipments in the last 36 months.' },
      { q: 'What freight terms do you offer?', a: 'Standard is CFR with us booking vessel space. We also support FOB for buyers who run their own freight forwarders, and CIF where buyers want our marine insurance binding on the cargo.' },
      { q: 'Is there a minimum volume to start a contract?', a: 'For spot orders: one container (22 MT). For rolling offtake: 200 MT/month minimum so we can plan port slots. Below that, we will quote but refer you to a yard partner if the economics make sense.' },
    ],
    processTitle: 'Mill return to molten metal.',
    process: [
      { n: '01', t: 'Source', d: 'Mill returns, demolition sites, OEM clusters across Tamil Nadu', icon: 'truck' },
      { n: '02', t: 'Magnetise', d: 'Magnet sort, ISRI HMS / shredded grading at intake', icon: 'scale' },
      { n: '03', t: 'Process', d: 'Hydraulic shear and bale at the Ambattur yard', icon: 'factory' },
      { n: '04', t: 'Document', d: 'Basel Annex IX, PSIC, radiation certification per lot', icon: 'doc' },
      { n: '05', t: 'Ship', d: '40ft HC containers · Chennai port → EU foundries', icon: 'ship' },
    ],
  },
  {
    id: 'nonferrous',
    name: 'Non-Ferrous Scrap',
    icon: 'scale',
    short: 'Copper, aluminium, brass, lead and Zorba — ISRI-graded with XRF verification and full material declaration.',
    detail: [
      "Non-ferrous is where reputation is built. Copper birch/cliff trades at $8,800–9,200/MT in May 2026; a single mis-grading on a 40ft container is a $30K problem. We mitigate that by XRF-checking every lot at intake, holding a 50-piece random sample for each consignment, and sending sample-lot pre-shipment for any new supplier or new grade.",
      "Our copper and brass desk has been running since 2019; aluminium opened in 2020 once the Aalborg supplier relationship matured. Today we move roughly 320 MT/month of birch/cliff, 580 MT/month of taint/tabor, plus opportunistic Zorba and Honey Brass when the LME spread justifies it.",
      "Material declaration is the unglamorous half of the desk. REACH SVHC checks, RoHS limits, country-of-origin tracking — most buyers do not ask for it explicitly until customs flags an HS-code mismatch. We file it pre-emptively on every container, which has saved customers an average of 4.2 days at destination port.",
    ],
    highlights: [
      'XRF gun-tested at intake — every lot, no exceptions',
      'Eddy-current separation and density float-sink testing on Zorba lots',
      'LME-linked pricing with transparent ISRI-grade premium / discount table',
      '4 origin desks (São Paulo, Aalborg, Hamburg, Dubai) with on-site quarterly audits',
      'LC and SBLC structures negotiated through HDFC Bank and StanChart',
    ],
    grades: ['Birch / Cliff Copper', 'Berry Copper #1', 'Taint / Tabor Aluminium', 'Zorba 95/5', 'Honey Brass', 'RAINS Lead', 'Yellow Brass', 'Mixed Heavy Copper'],
    volumeTons: 41200,
    metrics: [
      { label: 'Cumulative volume', value: '41,200', unit: 'MT' },
      { label: 'Lead time', value: '6–10', unit: 'weeks' },
      { label: 'Minimum lot', value: '18', unit: 'MT' },
      { label: 'XRF tests / mo', value: '420' },
      { label: 'Active origins', value: '4', unit: 'countries' },
      { label: 'Grade variance', value: '±1.5', unit: '%' },
    ],
    pricingBasis: 'LME copper / aluminium reference plus an ISRI-grade premium/discount table. Honey brass and RAINS lead priced on the daily zinc-copper composite.',
    customerProfiles: [
      'Tamil Nadu die-casters (Coimbatore, Salem)',
      'Cable and conductor manufacturers',
      'EU secondary smelters',
      'Valve and fittings forgers',
    ],
    inspections: ['Bureau Veritas', 'SGS', 'Intertek'],
    serviceFaqs: [
      { q: 'How do you verify copper grade on import?', a: 'XRF on a 50-piece random sample at the supplier yard before shipment, then a second XRF on intake at Ambattur. Variance over 1.5% triggers a third independent test and a renegotiation. The variance limit is binding in our supplier contracts.' },
      { q: 'Do you handle Zorba?', a: 'Yes — 95/5 spec by weight, density-checked. We run six grading tests on each lot (visual, magnetic, eddy-current, XRF sample, density float, moisture loss). Detailed in our published field-notes article.' },
      { q: 'What is your typical premium over LME?', a: 'Birch/Cliff settles around LME copper -3 to -5%. Taint/Tabor around LME aluminium -8 to -12% depending on iron content. We publish the exact discount table on signed contracts.' },
      { q: 'Can you sell into India under domestic terms?', a: 'Yes. Import-and-resell to Indian die-casters under INR contracts works for buyers who do not have IEC bandwidth. Adds 8–12 days of buffer for paperwork but is otherwise transparent.' },
    ],
    processTitle: 'Audited supplier to die-caster.',
    process: [
      { n: '01', t: 'Source', d: 'Audited yards in São Paulo, Aalborg, Hamburg and Dubai', icon: 'globe' },
      { n: '02', t: 'Assay', d: 'XRF gun analysis and chemical composition verification', icon: 'search' },
      { n: '03', t: 'Sort', d: 'Hand-pick, density sort, eddy-current separation', icon: 'filter' },
      { n: '04', t: 'Declare', d: 'Material declaration, REACH and RoHS compliance documentation', icon: 'shield' },
      { n: '05', t: 'Ship', d: 'LME-priced lots, LC-backed delivery to Indian die-casters', icon: 'ship' },
    ],
  },
  {
    id: 'export',
    name: 'Export Logistics',
    icon: 'ship',
    short: 'End-to-end container and bulk vessel exports from Chennai, Ennore and Kattupalli to EU, MENA and East Asia.',
    detail: [
      "Export logistics is a full-stack service: vessel space booking, container leasing, yard-side stuffing, customs filing, and live tracking from departure to discharge. We operate as a registered shipper at all three Tamil Nadu container ports — Chennai (CNC), Ennore (KPL), and Kattupalli (KAT) — and have direct slot agreements with five major carriers.",
      "For buyers who want a turn-key landed price, we deliver on CFR or CIF Incoterms with our marine insurance binding on every container. For buyers running their own forwarders we operate as the FOB shipper and hand off at the port gate with a complete documentation pack.",
      "Container scarcity in 2024-25 forced a hard rethink of our slot booking process. Today we work 60 days ahead on container leases for known offtake contracts, which has dropped our missed-vessel rate from 4.1% in 2024 to 0.7% so far in 2026.",
    ],
    highlights: [
      '3 active South India container ports — full coverage of major shipping lanes',
      'Direct slot agreements with Maersk, MSC, CMA CGM, Hapag-Lloyd, Hanjin',
      'Pre-shipment inspection scheduling integrated with the booking workflow',
      'DGFT, customs and AEO-T1 documentation handled in-house',
      'Live vessel telemetry shared with buyers via Maersk and CMA APIs',
    ],
    grades: ['40ft HC container loads', 'Bulk vessel charter (2,500–5,000 MT)', 'Less-than-container groupage', 'Pre-shipment inspection', 'DGFT export filing', 'Marine insurance binding'],
    volumeTons: 56800,
    metrics: [
      { label: 'Containers / mo', value: '94', unit: '40ft' },
      { label: 'Vessel charters / yr', value: '11' },
      { label: 'Active ports', value: '3' },
      { label: 'Carriers', value: '5' },
      { label: 'ETA accuracy', value: '±3.1', unit: 'days' },
      { label: 'Missed-vessel rate', value: '0.7', unit: '%' },
    ],
    pricingBasis: 'Spot CFR + 3% handling fee, or volume-LC discount of 1.5–2.5% for buyers running rolling contracts of 200+ MT/month.',
    customerProfiles: [
      'EU steel mills and foundries',
      'MENA rebar producers',
      'Asian die-casters and re-rollers',
      'East African construction-steel buyers',
    ],
    inspections: ["Lloyd's Register", 'Bureau Veritas', 'SGS'],
    serviceFaqs: [
      { q: 'What is your typical transit time to Italy?', a: 'Chennai → Genoa runs 28–32 days door-to-port via Suez when open. We add 4–6 days buffer for customs at Genoa, so total quote-to-discharge is around 34–38 days. We share live vessel position via the carrier API.' },
      { q: 'Can you handle vessel chartering for large lots?', a: 'Yes — partial vessel charters from 2,500 MT and full vessels from 5,000 MT. We brokered 11 charters in 2025 across HMS, shredded, and plate cargo. The economics flip in favour of charter around 3,500–4,000 MT depending on lane.' },
      { q: 'Do you ship under Letters of Credit?', a: 'Standard for export contracts. We work with HDFC Bank, ICICI, StanChart and IndusInd for LC negotiation. SBLC for opening-customer relationships, irrevocable LC at sight for established buyers.' },
      { q: 'How do you handle Red Sea routing today?', a: 'In May 2026 most carriers still route around the Cape of Good Hope. That adds 8–10 days versus pre-2024 Suez routing and roughly $80/TEU. We quote both options for buyers and let them choose, but default to Cape for predictability.' },
    ],
    processTitle: 'Yard gate to vessel hold.',
    process: [
      { n: '01', t: 'Book', d: 'Vessel space, container lease and schedule slot booking', icon: 'clock' },
      { n: '02', t: 'Stuff', d: 'Yard-side loading, weighbridge ticket, photo log', icon: 'box' },
      { n: '03', t: 'Inspect', d: "PSIC by Lloyd's / Bureau Veritas before container sealing", icon: 'check' },
      { n: '04', t: 'Customs', d: 'Shipping bill filing, DGFT clearance, port handover', icon: 'doc' },
      { n: '05', t: 'Track', d: 'Real-time vessel telemetry from departure to discharge', icon: 'chart' },
    ],
  },
  {
    id: 'import',
    name: 'Import Sourcing',
    icon: 'globe',
    short: 'Audited supplier relationships in Brazil, Denmark, Germany and the UAE — landed cost guaranteed, paperwork end-to-end.',
    detail: [
      "Imports are how Indian die-casters and re-rolling mills bridge the gap between domestic ferrous availability and their actual furnace demand. We run four origin desks — São Paulo, Aalborg, Hamburg, Dubai — each with a named MR Greentech representative who visits supplier yards quarterly, signs off on every consignment pre-shipment, and is the buyer's escalation point if anything is off at discharge.",
      "The audit work is unglamorous but it is what makes the import business defensible. Felipe Azevedo (São Paulo) ran 38 supplier audits in 2025; Ingrid Sørensen (Aalborg) ran 24. Each audit is a 2-day site visit with our standard 40-point checklist covering weighbridge calibration, grading practice, document trail, worker safety, and radiation handling.",
      "We close 70% of new imports on Letters of Credit, with the rest on 30% advance plus 70% against scanned BL. Marine insurance is included on CIF contracts; for CFR buyers we hand off the cargo with a marine cover certificate from New India Assurance.",
    ],
    highlights: [
      '4 origin desks with named representatives on the ground',
      'Quarterly supplier audits — 62 conducted in 2025',
      'LC, SBLC, and 30/70 advance-BL structures all routine',
      'Pre-shipment sample lots on every new supplier relationship',
      'Marine insurance binding under our blanket policy',
    ],
    grades: ['Birch/Cliff Cu (Brazil)', 'Taint/Tabor Al (Denmark)', 'Shredded 211 (Germany)', 'Mixed ferrous (UAE)', 'Scandinavian grade-audited Zorba', 'LC/SBLC-backed trade structures'],
    volumeTons: 31600,
    metrics: [
      { label: 'Cumulative volume', value: '31,600', unit: 'MT' },
      { label: 'Lead time (spot)', value: '4–6', unit: 'weeks' },
      { label: 'Lead time (programme)', value: '9–14', unit: 'weeks' },
      { label: 'Active origin desks', value: '4' },
      { label: 'Annual audits', value: '62' },
      { label: 'LC-backed share', value: '70', unit: '%' },
    ],
    pricingBasis: 'CFR India indexed to origin LME / regional benchmark plus freight. Forward contracts available 6–12 months out for repeat customers.',
    customerProfiles: [
      'Indian die-casters needing premium non-ferrous',
      'Coimbatore forging cluster (mixed grades)',
      'Project-based re-rolling mills with one-time large lots',
      'Foundry consortiums pooling imports',
    ],
    inspections: ["Lloyd's Register", 'Bureau Veritas', 'SGS', 'Intertek'],
    serviceFaqs: [
      { q: 'How do you guarantee supplier quality at origin?', a: 'Quarterly on-site audits by a named MR Greentech representative who has worked with the supplier for at least 12 months before we list them as a trusted source. We have de-listed 3 suppliers in the last 24 months after audit findings, and we publish the reason internally in our supplier scorecard.' },
      { q: 'What if the cargo grade is off at discharge?', a: 'Every lot ships with a third-party PSIC and our XRF report. If discharge survey disagrees, we ask for an independent re-inspection at destination port — Lloyd\'s, BV, SGS or Intertek, buyer\'s choice. Split cost. Result is binding on both sides; any short-fall is settled within 14 working days.' },
      { q: 'Can you import on the buyer\'s IEC?', a: 'Yes — common for first-time importers. We handle origin paperwork, freight booking and marine insurance; the buyer\'s IEC is on the bill of entry. Add 2 weeks to first-shipment timeline for the regulatory bridge.' },
      { q: 'How much working capital does an import need?', a: 'Roughly 18-22% of FOB value as LC margin if you go through your bank, or 30% advance plus 70% against BL scan. Our credit desk helps buyers structure the cheapest option per their bank relationship.' },
    ],
    processTitle: 'Foreign supplier to South Indian buyer.',
    process: [
      { n: '01', t: 'Audit', d: 'Boots-on-ground supplier visit and full yard inspection', icon: 'eye' },
      { n: '02', t: 'Sample', d: 'Pre-shipment sample lot, independent grade verification', icon: 'search' },
      { n: '03', t: 'Contract', d: 'LC / SBLC structure, Incoterm negotiation, lot pricing', icon: 'edit' },
      { n: '04', t: 'Insure', d: 'Marine insurance binding, Basel pre-notification filing', icon: 'shield' },
      { n: '05', t: 'Receive', d: 'Chennai discharge, customs clearance, yard intake', icon: 'truck' },
    ],
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  country: string;
  year: number;
  volume: string;
  material: string;
  duration: string;
  summary: string;
}

export const CASES: CaseStudy[] = [
  { id: 'c01', title: 'Porto de Santos → Chennai copper corridor',
    client: 'Cobre do Brasil S.A.', country: 'Brazil', year: 2025, volume: '2,400 MT',
    material: 'Birch/Cliff copper scrap', duration: '6-month supply agreement',
    summary: 'Structured an LC-backed import channel from São Paulo with bi-monthly 40ft HC container consignments, reducing buyer lead time from 14 to 9 weeks.' },
  { id: 'c02', title: 'Aalborg mixed aluminium programme',
    client: 'Nordisk Metal ApS', country: 'Denmark', year: 2024, volume: '1,160 MT',
    material: 'Taint/Tabor & Zorba', duration: '12-month offtake',
    summary: 'Designed a Scandinavian sourcing pipeline with on-site grade audits in Aalborg and Esbjerg. Redirected material to Tamil Nadu die-casting buyers.' },
  { id: 'c03', title: 'South India HMS consolidation',
    client: 'Coimbatore Forging Cluster', country: 'India → EU export', year: 2025, volume: '8,800 MT',
    material: 'HMS 1/2 (80:20)', duration: 'Rolling monthly',
    summary: 'Consolidated scrap from 14 mid-sized workshops across Coimbatore, Salem and Erode. Graded, baled and exported via Chennai Port to Italian foundries.' },
  { id: 'c04', title: 'Hamburg shredded steel import lane',
    client: 'Rhein-Stahl Recycling GmbH', country: 'Germany', year: 2024, volume: '3,600 MT',
    material: 'Shredded 211', duration: 'Spot, 3 vessels',
    summary: 'Spot-chartered a partial vessel load from Hamburg to Kattupalli — saved buyer 11% against prevailing CFR India index.' },
];

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  quote?: { text: string; author?: string };
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tag: string;
  read: number;
  excerpt: string;
  author: string;
  authorRole: string;
  sections: BlogSection[];
}

export const BLOG: BlogPost[] = [
  {
    id: 'b01',
    title: 'What a 9% EU scrap tariff would mean for South Indian foundries',
    date: 'Mar 14, 2026',
    tag: 'Trade policy',
    read: 6,
    excerpt: "The European Commission's proposed 9% export duty on ferrous and non-ferrous scrap would reshape flows from North Europe to Asia. We sketch three scenarios for the Tamil Nadu foundry cluster.",
    author: 'Mohan Rajan',
    authorRole: 'Co-founder, Trade desk',
    sections: [
      {
        heading: 'The policy in one paragraph',
        paragraphs: [
          'The European Commission tabled a draft regulation in February proposing a 9% export duty on ferrous and non-ferrous scrap leaving the EU customs union. The stated aim is to keep secondary raw material inside Europe to support domestic decarbonisation. The Council vote is expected in Q3 2026; implementation, if approved, would phase in over 18 months.',
          'For South Indian foundries, EU scrap accounts for roughly a third of imported feedstock. Italy, Germany and Denmark together shipped 142 vessels of HMS, shredded and Zorba into Chennai and Kattupalli in 2025 alone.',
        ],
      },
      {
        heading: 'Three scenarios',
        paragraphs: [
          'We have modelled three outcomes, each with different assumptions about how the tariff lands and how Indian buyers respond.',
        ],
        list: [
          'Scenario A · Hard 9% duty across the board. EU scrap CFR India rises by roughly $30–35/MT for HMS. Indian foundries either absorb the cost or shift to domestic sources, where ferrous availability is already tight.',
          'Scenario B · Carve-outs for low-carbon EAF buyers. Indian importers who can prove EAF use and renewable-grid electrification claim 50–70% rebates. Paperwork burden goes up, but landed cost rises only $10–15/MT.',
          'Scenario C · The duty stalls in Council, never implemented. Status quo, but the threat alone is already pushing some buyers to lock 12-month forward contracts at fixed CFR.',
        ],
      },
      {
        heading: 'What we are advising buyers right now',
        paragraphs: [
          'Three things: lengthen contract terms where you can, diversify origin (Brazil and the Gulf are not in scope), and start gathering the carbon documentation you will need if Scenario B becomes reality. None of this is exotic — it is the same paperwork the EU CBAM regime already asks for on the export side.',
          "If the duty does land, the foundries that will lose the least are the ones that already buy on quality and paperwork, not just price. We have been telling clients that for two years; this is one more reason it's true.",
        ],
      },
      {
        quote: {
          text: 'The duty would be the single largest change to the EU–India scrap corridor since Basel notifications became mandatory in 2010.',
          author: 'European Recycling Industries Confederation, Feb 2026 briefing',
        },
      },
      {
        heading: 'Longer-term outlook',
        paragraphs: [
          'Whatever the Council decides, the direction is clear: secondary raw material is becoming a strategic asset, and the rules around it will keep tightening. India\'s domestic scrap collection is slowly catching up — MoEFCC EPR data shows formal-sector recovery rates up 14% year-on-year — but the gap with what the foundry cluster demands is still wide.',
          'For our desk, the practical answer is the same it has always been: buy from suppliers who can prove origin, ship under correct HS codes, and keep a clean paper trail. If the rules change, that paper trail is what saves the consignment.',
        ],
      },
    ],
  },
  {
    id: 'b02',
    title: 'Grading Zorba: the six tests we run at Ambattur',
    date: 'Feb 27, 2026',
    tag: 'Field notes',
    read: 4,
    excerpt: 'Zorba is the mixed non-ferrous shred that lands at our yard with the most variability. Here are the six tests we run before it leaves for a buyer.',
    author: 'Sridhar Venkat',
    authorRole: 'Co-founder, Operations',
    sections: [
      {
        heading: 'What Zorba actually is',
        paragraphs: [
          'Zorba is the ISRI code for shredded non-ferrous metals — typically 95% aluminium, 5% other (copper, brass, zinc, stainless). It comes off automotive shredders and white-goods lines, mainly from EU and US sources. The "95/5" spec is nominal; actual lots can swing from 92/8 to 97/3, which makes a meaningful difference to the buyer\'s smelter recovery.',
          'Because the spec is loose, every Zorba lot that crosses our weighbridge gets graded twice — once at the supplier yard pre-shipment, and again at Ambattur on intake.',
        ],
      },
      {
        heading: 'The six tests',
        list: [
          '01 · Visual sort on a moving conveyor. Two operators pull obvious contamination — wire harnesses, large iron, dense plastics.',
          '02 · Magnetic separation pass. Catches any ferrous that survived the supplier shredder.',
          '03 · Eddy-current separator for stainless and zinc-rich pieces. Set to a 9% reject threshold.',
          '04 · Handheld XRF on a 50-piece random sample. Confirms aluminium share within ±1.5%.',
          '05 · Density float-sink test on a 20kg sub-sample. Anything below 2.0 g/cc is non-metal contamination.',
          '06 · Moisture loss on a 10kg lot dried at 105°C for 4 hours. EU buyers will dock 0.5% for every percentage point above 1.2% moisture.',
        ],
      },
      {
        heading: 'Why this matters for die-casters',
        paragraphs: [
          'A die-caster running ADC12 alloy is targeting a tight chemistry window. Zorba that grades 96/4 with iron under 0.8% drops straight into the furnace. Zorba that grades 92/8 with 1.5% iron either gets diluted with primary aluminium (expensive) or downgraded to a secondary alloy (much smaller market).',
          "Our buyers price the difference. A documented 96/4 lot from us trades at $40–60/MT above an undocumented similar-looking lot. That premium is real, it shows up in the LC, and it covers our six-test cost about eight times over.",
        ],
      },
    ],
  },
  {
    id: 'b03',
    title: 'Chennai Port to Porto de Santos — a shipping route breakdown',
    date: 'Feb 03, 2026',
    tag: 'Logistics',
    read: 8,
    excerpt: 'A 34-day vessel route, three feeder transhipments and one of the longest scrap corridors we run. Here is how a copper container actually moves from São Paulo state to a Sundaram Castings furnace.',
    author: 'Felipe Azevedo',
    authorRole: 'Sourcing · São Paulo desk',
    sections: [
      {
        heading: 'The route at a glance',
        paragraphs: [
          'A 40ft HC container of Birch/Cliff copper leaves the supplier yard in Diadema, São Paulo state, on day -2. Trucked 65 km to Porto de Santos. Loaded on a Hapag-Lloyd or MSC feeder bound for Santos transhipment yard. From there, mainline to Singapore (16 days), feeder to Chennai (8 days). Total door-to-door: 34 days.',
          'The actual ship-time at sea is closer to 24 days. The rest is port dwell, transhipment, and customs.',
        ],
      },
      {
        heading: 'Transit math, container by container',
        paragraphs: [
          'Days 1–3: Trucking, gate-in at Porto de Santos, Brazilian customs clearance. We use Despachante AssoMar for documentation; turnaround at Santos has been consistent at 36 hours.',
          'Days 4–6: Feeder sails to Santos North terminal, container reloaded onto mainline vessel.',
          'Days 7–22: Mainline transit. The vessel rounds the Cape of Good Hope — Suez routing adds $80/TEU in 2026 with the Red Sea premium, so most carriers chose Cape.',
          'Days 23–24: Singapore transhipment. Hot transfer to a feeder bound for Chennai.',
          'Days 25–32: Singapore to Chennai. Feeders cycle weekly.',
          'Days 33–34: Chennai discharge, Indian customs, gate-out to our yard.',
        ],
      },
      {
        heading: 'Paperwork',
        paragraphs: [
          'Every container moves with eleven documents. The four that get held up most often are the Basel Annex IX notification (origin country signs first, then transit countries acknowledge), the COO (Certificate of Origin from the Brazilian chamber), the SGS pre-shipment inspection certificate, and our import IEC declaration.',
          'We pre-file the Basel notification 60 days before sailing. That window saves us about three calendar days at the Brazilian end.',
        ],
      },
      {
        heading: 'What can go wrong',
        list: [
          'Santos congestion. Three vessels miss berth slots a year on average. Each miss adds 4–7 days.',
          'Singapore transhipment misconnect. Feeder departs before our container is on the dock. Adds one feeder cycle — 7 days.',
          'Indian customs query on HS code. Birch/Cliff lands under 7404. A mis-coded lot can sit at port for 5–10 days while clarification is sought.',
          'Container deposit dispute. Carrier holds the container against demurrage; we have a standing arrangement that caps exposure.',
        ],
      },
      {
        heading: 'Why this corridor still works',
        paragraphs: [
          'Despite the 34-day length, the Brazil–Chennai copper lane has the best price-to-quality ratio we have found for South Indian die-casters. Brazilian shred is consistently graded, paid in dollars, and lands at a CFR India price that beats domestic copper scrap by 6–9% on a like-for-like spec.',
          'We have run 22 containers on this corridor in the last 18 months. Average ETA accuracy versus initial booking: ±3 days. Zero quality disputes at discharge. The route works because the suppliers, freight forwarders and inspection agencies on both ends have been doing it together for three years.',
        ],
      },
    ],
  },
  {
    id: 'b04',
    title: 'Why Denmark punches above its weight in aluminium recycling',
    date: 'Jan 19, 2026',
    tag: 'Market brief',
    read: 5,
    excerpt: 'Population 5.9 million, but Denmark consistently exports more graded aluminium scrap than countries 10x its size. The system behind that is worth borrowing from.',
    author: 'Ingrid Sørensen',
    authorRole: 'Sourcing · EU desk',
    sections: [
      {
        heading: 'The numbers',
        paragraphs: [
          "Denmark exported 168,000 MT of non-ferrous scrap in 2025. Most of it Taint/Tabor aluminium and Zorba. For a country of under 6 million, that's roughly 28 kg of recycled aluminium per capita per year leaving the country graded and certified — comfortably top-three in Europe on a per-capita basis.",
        ],
      },
      {
        heading: 'The system',
        paragraphs: [
          "Three things drive it. First, kerbside aluminium collection is universal and segregated at the household level — there is no 'mixed bag' option. Second, the deposit-return scheme on beverage cans was rolled out in 2002 and now recovers 94% of consumer aluminium beverage packaging. Third, the recycler permitting regime is strict but predictable — once a yard is approved, the paperwork around exports flows fast.",
          "The result is consistent. A Nordisk Metal Taint/Tabor lot from Aalborg in February grades almost identically to one we lifted in August. That repeatability is what we are buying when we contract them on offtake.",
        ],
      },
      {
        heading: 'What we source from Aalborg',
        paragraphs: [
          'Through our offtake agreement with Nordisk Metal ApS, we lift about 1,000 MT/year of Taint/Tabor and a smaller volume of Zorba. The Taint/Tabor goes to Coimbatore die-casters; the Zorba feeds two smelters in Salem.',
          'On-site grade audits happen quarterly. We send Felipe from São Paulo or one of our compliance team for a 2-day visit, walking the yard, sampling lots, comparing the supplier\'s self-grade against our own XRF reads. Variance has stayed under 1.8% for three years.',
        ],
      },
      {
        heading: 'Lessons we are watching for India',
        paragraphs: [
          'India\'s formal-sector recycling is growing fast (14% YoY by MoEFCC EPR data), but the kerbside infrastructure that makes Denmark consistent is missing. The closest analogue here is the deposit-return scheme being piloted in Maharashtra for PET bottles. If that succeeds, aluminium cans are the obvious next category.',
          'For now, Indian non-ferrous demand will keep being met partly by imports. Denmark is one of the cleanest origins for that — we expect to grow our Aalborg book by another 30% in 2026.',
        ],
      },
    ],
  },
  {
    id: 'b05',
    title: 'Inside our radiation-testing protocol — and why it matters',
    date: 'Dec 09, 2025',
    tag: 'Compliance',
    read: 7,
    excerpt: 'A radiation-contaminated lot can sink a buyer, a port, and a trader at once. Here is exactly how we test, what we have found, and where the protocol came from.',
    author: 'Anitha Kumaresan',
    authorRole: 'Head of Compliance',
    sections: [
      {
        heading: 'Why this matters',
        paragraphs: [
          "In 2009, a melt at an Indian foundry produced contaminated cobalt-60 steel that ended up in lift buttons sold across Europe. The recall cost the receiving country tens of millions. Since then, every serious scrap trader has run radiation testing on every lot at every gate. We are no exception. The risk is too consequential and the test is too cheap to skip.",
          "Most contamination is not malicious — it is industrial gauges, medical sources, or research equipment that found its way into a demolition pile. The volume is tiny. The consequence of missing it is enormous.",
        ],
      },
      {
        heading: 'Our protocol',
        list: [
          'Every truck through the gate gets a portal monitor sweep — fixed gamma detectors on both sides of the lane, sensitive to 3× background.',
          'Any alarm triggers immediate isolation. The truck is parked in the quarantine bay, the driver questioned, the load partially uncovered.',
          'A handheld Geiger-Müller monitor is used to localise the hot spot. If isolated to a single piece, that piece is removed and stored in a shielded cask.',
          'If the spot is diffuse, the entire load is rejected and returned to supplier with a Form RP-1 incident report.',
          'Every container leaving for export is re-tested 24 hours before sealing, by an independent third-party (Bureau Veritas or SGS).',
          'A radiation certificate signed by the third-party agency travels with the BL.',
        ],
      },
      {
        heading: 'Equipment',
        paragraphs: [
          'We use Mirion / Canberra portal monitors at the gate. They are calibrated annually by AERB-licensed technicians. The handhelds are Thermo RadEye G-10s, three units kept on rotation.',
          'The cost of the equipment is non-trivial — roughly ₹85 lakh in capital plus annual calibration and consumables — but it is one of the lowest-cost lines on our compliance budget per MT shipped.',
        ],
      },
      {
        heading: 'What we have found',
        paragraphs: [
          'In the last three years, our gate monitors have triggered 14 alarms. Twelve were industrial — radiography sources from old construction equipment, smoke detector remnants, gauge heads. Two were genuine misclassified medical sources, both handled by AERB and returned to the supplier yard. None made it past the second test.',
          'That hit rate — about one true alarm per 1,500 lots — is consistent with what other professional yards report. The expensive cases are not the ones that trigger an alarm. The expensive ones are the ones that quietly do not.',
        ],
      },
      {
        heading: 'Regulation',
        paragraphs: [
          'India\'s AERB has set out radiation-monitoring requirements for scrap yards under the Atomic Energy (Safe Disposal of Radioactive Waste) Rules. Our protocol exceeds the minimum on instrument count and testing frequency. Every six months we file a self-audit report; every two years we host an AERB site visit.',
          'For exports, the Basel notification process also requires a radiation declaration. The signed third-party certificate we travel with every container is what satisfies that.',
        ],
      },
    ],
  },
];
