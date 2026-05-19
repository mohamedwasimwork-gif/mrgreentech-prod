// Shared data — company, services, insights.
// All copy lives here so a single file edit changes the whole site.

export const COMPANY = {
  name: 'M R Greentech',
  established: 1998,
  founder: 'Manickaraj',
  hq: 'Thiruvallur, Tamil Nadu, India',
  gst: '33AAHCM4821N1Z2',
  cpcb: 'HW/AUTH/TN/2024/4218',           // Hazardous Waste authorisation number
  email: 'sales@mrgreentech.in',
  phone: '+91 94444 68691',
  address: '#425, Surkaithatha Kalvai Street, Maheswari Nagar, Goundarpalayam, Thiruvallur, Tamil Nadu - 600120, India',
  yearsActive: 28,
  // Headline cumulative numbers — May 2026, kept consistent across every page.
  wasteHandled: '240,000+',                // MT collected, treated or recovered since 1998
  industrialClients: '420+',
  recoveryRate: '92%',                     // material diversion from landfill
  yardSqft: '60,000',
  team: 24,
  facilities: 4,                            // collection bays, treatment line, recovery floor, dispatch
  inspectors: ['CPCB', 'TNPCB', 'AERB', 'SGS'],
  lastUpdated: 'May 17, 2026',
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
  /** Categories and sub-services this desk handles. */
  grades: string[];
  /** Cumulative MT handled under this service since 1998. */
  volumeTons: number | null;
  /** Headline numbers shown in the snapshot column. */
  metrics: ServiceMetric[];
  /** Indicative commercial basis the desk works on. */
  pricingBasis: string;
  /** Who this service typically lands with. */
  customerProfiles: string[];
  /** Inspection / regulatory bodies engaged for this service. */
  inspections: string[];
  /** Service-level FAQ rendered on the page. */
  serviceFaqs: ServiceFaq[];
  /** Title displayed above the per-service process stepper. */
  processTitle: string;
  process: ProcessStep[];
}

export const SERVICES: Service[] = [
  {
    id: 'hazardous',
    name: 'Hazardous Waste Management',
    icon: 'warn',
    short: 'CPCB-authorised collection, transport, treatment and safe disposal of hazardous industrial waste — chemicals, solvents, oils, sludges, e-waste and contaminated packaging.',
    detail: [
      "Hazardous waste is the desk M R Greentech was built around. From the very first pickup contract Manickaraj signed in 1998, the company has handled material that requires a manifest, a trained handler and a documented chain of custody from generator to final disposal. Today we serve over 180 manufacturing units across Tamil Nadu under continuous Hazardous Waste Authorisation from CPCB and TNPCB.",
      "The categories we manage span the Schedule I, II and III lists under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016 — used oils and emulsions, spent solvents, paint sludges, chemical residues, contaminated drums and packaging, e-waste, lead-acid batteries, and process residues from electroplating, pharmaceutical and textile industries.",
      "Every consignment leaves the generator's gate with a six-copy manifest, travels in a GPS-tracked vehicle, and is delivered to a treatment, recovery, or co-processing facility that is authorised for that exact category. Customers receive a digital disposal certificate within seven working days of final destruction or recovery — proof for their own statutory returns and audits.",
    ],
    highlights: [
      'Continuous CPCB / TNPCB hazardous-waste handling authorisation since 2008',
      'GPS-tracked dedicated fleet — only vehicles built for hazardous transport',
      'Manifest-based chain of custody, six-copy and digital',
      'Tie-ups with TSDF (treatment, storage & disposal facility) and co-processing kilns',
      'Disposal certificate issued within 7 working days of final treatment',
    ],
    grades: [
      'Used oil & emulsions',
      'Spent solvents & process chemicals',
      'Paint sludges & chemical residues',
      'Contaminated drums & packaging',
      'E-waste (CRT, PCB, peripherals)',
      'Lead-acid & lithium-ion batteries',
    ],
    volumeTons: 86400,
    metrics: [
      { label: 'Cumulative volume', value: '86,400', unit: 'MT' },
      { label: 'Active client units', value: '180+' },
      { label: 'Vehicles in fleet', value: '14', unit: 'GPS-tracked' },
      { label: 'Disposal cert SLA', value: '7', unit: 'working days' },
      { label: 'Authorisation', value: 'CPCB / TNPCB' },
      { label: 'Compliance incidents', value: '0', unit: 'in 2025' },
    ],
    pricingBasis: 'Priced per category and volume under annual or multi-year contracts. Pickup frequency from on-call to weekly. Standalone one-time pickups available for non-recurring generators.',
    customerProfiles: [
      'Tamil Nadu manufacturing units — auto, pharma, electronics',
      'Electroplating and surface-finishing workshops',
      'Textile and dyeing clusters',
      'IT and ITES e-waste programmes',
    ],
    inspections: ['CPCB', 'TNPCB', 'SGS (third-party verification)'],
    serviceFaqs: [
      { q: 'Do we need our own hazardous waste authorisation to engage you?', a: 'You need an authorisation as a generator, which is filed with TNPCB. We help you complete the application if you do not already hold one — usually a 4-6 week process. Once approved, you can hand the consignment to us under your manifest and our authorisation handles the transport, treatment and disposal end.' },
      { q: 'How quickly can you mobilise for an unscheduled pickup?', a: 'Within 24 hours for clients on an annual contract. For one-off generators we typically respond within 3-5 working days depending on category and quantity. Categories that need specialised vehicles (e.g. liquid hazardous) may take a day longer.' },
      { q: 'What paperwork do we receive?', a: 'A signed Form 10 manifest at pickup (six copies, distributed per CPCB rule), a transport receipt with vehicle GPS log, and a final disposal certificate from the TSDF or co-processor within seven working days. Everything is also stored in our digital vault for seven years.' },
      { q: 'Can you handle e-waste under EPR?', a: 'Yes. We are a registered E-Waste Recycler with the CPCB EPR portal and can fulfil EPR obligations for producers under both Schedule I and Schedule II categories. We share monthly recycling certificates that map directly to your EPR target.' },
    ],
    processTitle: 'Generator gate to safe disposal.',
    process: [
      { n: '01', t: 'Audit',     d: 'On-site waste characterisation, category mapping, manifest preparation', icon: 'eye' },
      { n: '02', t: 'Pickup',    d: 'GPS-tracked dedicated vehicle, trained driver, scheduled or on-call', icon: 'truck' },
      { n: '03', t: 'Transport', d: 'Manifest custody, real-time tracking, weighbridge ticket at receipt', icon: 'ship' },
      { n: '04', t: 'Treat',     d: 'Treatment, co-processing, secure landfill — category-appropriate route', icon: 'factory' },
      { n: '05', t: 'Certify',   d: 'Disposal certificate, digital archive, 7-year retention', icon: 'doc' },
    ],
  },
  {
    id: 'nonhazardous',
    name: 'Non-Hazardous Industrial Waste',
    icon: 'truck',
    short: 'Scheduled collection of non-hazardous industrial waste — manufacturing scrap, packaging, food-grade residues, construction debris and general factory waste.',
    detail: [
      "Most industrial waste streams are not hazardous, but they still need a disciplined collection partner. Skipping pickups, mixing streams or letting waste accumulate inside the factory boundary creates housekeeping headaches, fire risk, and pressure on the production floor.",
      "M R Greentech runs rolling weekly and bi-weekly pickup contracts for over 240 industrial generators across Chennai and the Ambattur, Sriperumbudur and Maraimalai Nagar industrial corridors. The desk handles general factory waste, paper, cardboard, plastic packaging, wood pallets, food-grade canteen waste, and construction & demolition (C&D) debris.",
      "What separates this from a typical municipal contractor is the segregation discipline at pickup. Our crews are trained to sort streams at the source — recyclables go to the materials recovery line, organics to the composting tie-up, and inert C&D to the authorised disposal site. That source separation is what makes our 92% diversion rate possible.",
    ],
    highlights: [
      'Rolling weekly / bi-weekly contracts with 240+ industrial units',
      'Source segregation at pickup — not after',
      'Dedicated fleet for wet, dry and C&D streams',
      'Monthly volume reports for ESG / sustainability disclosures',
      '92% diversion from landfill, all streams combined',
    ],
    grades: [
      'General factory waste',
      'Paper & cardboard packaging',
      'Plastic packaging & films',
      'Wood pallets & crates',
      'Canteen / food-grade residues',
      'Construction & demolition debris',
    ],
    volumeTons: 112800,
    metrics: [
      { label: 'Cumulative volume', value: '112,800', unit: 'MT' },
      { label: 'Active contracts', value: '240+' },
      { label: 'Pickup cycles', value: '7 / week' },
      { label: 'Diversion from landfill', value: '92', unit: '%' },
      { label: 'Reporting cadence', value: 'Monthly' },
      { label: 'Crew', value: '11', unit: 'trained operators' },
    ],
    pricingBasis: 'Per-pickup or per-MT pricing under annual contracts. Volume discounts above 20 MT/month. Optional sub-services: skip rental, on-site segregation training, ESG reporting addendum.',
    customerProfiles: [
      'Manufacturing units in Ambattur, Sriperumbudur, MMN clusters',
      'Logistics warehouses and 3PL operators',
      'Commercial campuses and IT parks',
      'Construction project sites (C&D)',
    ],
    inspections: ['TNPCB', 'Chennai Corporation', 'SGS (audit)'],
    serviceFaqs: [
      { q: 'How is this different from municipal waste collection?', a: 'Municipal collectors generally take mixed waste to a single transfer station. We sort at source, route each stream to its right destination (recovery / compost / inert) and report back monthly with the diversion split. The contract is also commercial — billed and managed like any other industrial service, not a flat municipal fee.' },
      { q: 'Can you handle one-off construction debris pickups?', a: 'Yes — skip rental + per-load haulage for one-time C&D projects. Common for renovation jobs and small construction sites. We coordinate with TNPCB-approved inert disposal sites; you get the disposal receipt.' },
      { q: 'Do you provide ESG / sustainability reports?', a: 'Yes. Monthly volume report by category, diversion percentage, and a year-on-year trend chart. Useful for BRSR (Business Responsibility & Sustainability Reporting) filings. Annual summary is signed and stamped for audit use.' },
      { q: 'What about wet canteen waste?', a: 'We collect daily or alternate-day under a separate wet-stream contract. The material is routed to a composting partner where it becomes agri-grade compost. Sealed wet bins are provided.' },
    ],
    processTitle: 'Source segregation to second life.',
    process: [
      { n: '01', t: 'Survey',   d: 'Site walk, stream identification, bin & schedule plan',         icon: 'search' },
      { n: '02', t: 'Setup',    d: 'Colour-coded bins, signage, brief operator training',           icon: 'grid' },
      { n: '03', t: 'Pickup',   d: 'Weekly / bi-weekly route, weighed at gate',                     icon: 'truck' },
      { n: '04', t: 'Segregate',d: 'Streams routed to recovery / compost / inert disposal',         icon: 'filter' },
      { n: '05', t: 'Report',   d: 'Monthly diversion breakdown emailed to plant team',             icon: 'chart' },
    ],
  },
  {
    id: 'recovery',
    name: 'Materials Recovery & Recycling',
    icon: 'refresh',
    short: 'Sorting and material recovery at our Ambattur facility — ferrous, non-ferrous, plastics, paper and e-waste extraction back into the supply chain.',
    detail: [
      "Materials recovery is where the company's environmental commitment becomes a business outcome. Roughly 92% of the material that lands at our Ambattur gate gets a second life — either as recovered metal sold back to foundries, recycled plastic granules sold back to converters, paper bales sold to mills, or e-waste components sold to authorised refiners.",
      "The recovery line was commissioned in 2009 and last upgraded in 2024 with a twin-ram baler, eddy-current separator and an XRF sorting station. Through-put capacity is roughly 12 MT per shift; cycle time from inbound to ready-for-dispatch is typically 48-72 hours depending on stream.",
      "What we sell on is graded to standard buyer specifications — ISRI grades for metals, IS-15004 for plastics, mill-grade for paper. Customers know what they are buying because we issue a material declaration and a third-party assay (XRF for non-ferrous, density check for plastics, fibre test for paper) with every dispatch.",
    ],
    highlights: [
      '92% materials diversion across all incoming streams',
      'Twin-ram baler, eddy-current separator, XRF sort station',
      'ISRI-graded metals, IS-15004 plastics, mill-grade paper',
      'In-house lab for XRF, density and moisture testing',
      'Recovered material sold directly to South India end-users',
    ],
    grades: [
      'Ferrous scrap — HMS 1/2, shredded, bonus, plate',
      'Non-ferrous — copper, aluminium, brass, lead',
      'Recycled plastics — PET, HDPE, PP, LDPE',
      'Paper & cardboard bales — mill grade',
      'E-waste board & component recovery',
      'Wood fines & biomass pellets',
    ],
    volumeTons: 41200,
    metrics: [
      { label: 'Cumulative volume', value: '41,200', unit: 'MT recovered' },
      { label: 'Diversion rate', value: '92', unit: '%' },
      { label: 'Through-put', value: '12', unit: 'MT / shift' },
      { label: 'Cycle time', value: '48–72', unit: 'hours' },
      { label: 'Active off-takers', value: '60+' },
      { label: 'Lab tests / month', value: '420' },
    ],
    pricingBasis: 'Recovery service is bundled into the collection contract on a revenue-share model — the generator gets a credit against the next month\'s invoice based on the value of recovered material at LME / Indian secondary market index.',
    customerProfiles: [
      'Tamil Nadu foundries and re-rolling mills (metal off-take)',
      'South India plastic converters (PET, HDPE granules)',
      'Paper mills in Sivakasi and Coimbatore',
      'Authorised refiners (e-waste components)',
    ],
    inspections: ['SGS', 'Bureau Veritas (third-party assay)'],
    serviceFaqs: [
      { q: 'How do you grade non-ferrous metals?', a: 'XRF analysis on every lot at intake, plus a 50-piece random sample for any new supplier. We grade against the ISRI nomenclature — Birch/Cliff for copper, Taint/Tabor for aluminium, Honey for brass. Buyers pay a published premium / discount table off the LME daily.' },
      { q: 'Can you handle mixed bales?', a: 'Yes — mixed paper, mixed plastics and mixed e-waste are routine. Our sort line separates the bale by polymer / fibre type and re-bales for the relevant end market. Cycle adds 24 hours over single-grade material.' },
      { q: 'Is the recovered metal exported?', a: 'Primarily sold domestically to South India end-users. We hold the IEC for occasional export where the spec matches an EU foundry or MENA mill, but the majority of the metal flows back into Tamil Nadu re-rolling mills and Coimbatore foundries.' },
      { q: 'Can you take material directly from outside generators?', a: 'Yes — third-party material is welcome on a weighbridge-and-cash basis. We grade on intake, pay LME / Indian secondary index pricing, and the material flows into our recovery line. Bring photo ID and a transport receipt.' },
    ],
    processTitle: 'Inbound waste to outbound feedstock.',
    process: [
      { n: '01', t: 'Inbound',  d: 'Weighbridge, gate pass, visual grade, intake to bay',  icon: 'truck' },
      { n: '02', t: 'Sort',     d: 'Magnetic + eddy-current + XRF; manual finishing',       icon: 'filter' },
      { n: '03', t: 'Process',  d: 'Bale, shred or shear depending on outgoing spec',       icon: 'factory' },
      { n: '04', t: 'Test',     d: 'XRF assay, density / moisture, sample retention',       icon: 'search' },
      { n: '05', t: 'Dispatch', d: 'Truck-load to end-buyer with material declaration',     icon: 'arrow' },
    ],
  },
  {
    id: 'treatment',
    name: 'Treatment & Safe Disposal',
    icon: 'shield',
    short: 'Treatment and final disposal partner network — TSDFs, co-processing kilns, secure landfill and authorised incinerators for the categories that cannot be recovered.',
    detail: [
      "Not every waste stream can be recovered, and that is the honest truth of the industry. Some categories — heavily contaminated solvents, expired pharmaceuticals, specific halogenated compounds — need destruction, not recycling. M R Greentech operates as the consolidated treatment partner for these tail streams.",
      "We do not own a TSDF ourselves. Instead, we hold long-running contracts with three CPCB-authorised treatment, storage and disposal facilities in Tamil Nadu, two authorised co-processing kilns at cement plants, and an authorised hazardous-waste incinerator. Each generator's waste is routed to the partner whose authorisation matches the category.",
      "What this means in practice for a customer: one contract with us, one invoice, one disposal certificate — but a curated downstream network that has the right authorisation for every category we ship. We also handle the documentation and reporting layer: TSDF receipts, weighbridge tickets, disposal certificates, and the annual return filing under Form 4.",
    ],
    highlights: [
      '3 TSDF tie-ups, 2 co-processing kilns, 1 authorised incinerator',
      'Category-matched routing — no "send everything to landfill"',
      'Single contract, single invoice, multiple downstream destinations',
      'Annual Form 4 return filed on your behalf',
      'AERB radiation portal at every gate (zero contamination in 36 months)',
    ],
    grades: [
      'Contaminated solvents & process residues',
      'Expired & off-spec pharmaceuticals',
      'Paint & coating sludges',
      'Asbestos-containing material',
      'Spent catalysts',
      'PCB-containing capacitors & transformers',
    ],
    volumeTons: null,
    metrics: [
      { label: 'TSDF partners', value: '3', unit: 'CPCB-authorised' },
      { label: 'Co-processing kilns', value: '2' },
      { label: 'Incinerator', value: '1', unit: 'authorised' },
      { label: 'Categories handled', value: '40+' },
      { label: 'Disposal cert SLA', value: '7', unit: 'working days' },
      { label: 'Document retention', value: '7', unit: 'years' },
    ],
    pricingBasis: 'Per-MT pricing varies by category — co-processing is typically cheapest, incineration most expensive. We quote upfront with category, route and disposal cost broken out so customers can budget per stream.',
    customerProfiles: [
      'Pharma manufacturers with off-spec or expired batches',
      'Paint and coating manufacturers',
      'Power transmission utilities (PCB capacitors)',
      'Demolition contractors (asbestos-containing material)',
    ],
    inspections: ['CPCB', 'TNPCB', 'AERB'],
    serviceFaqs: [
      { q: 'Do you guarantee final disposal?', a: 'Yes. The contract explicitly transfers disposal liability to us once material leaves the generator gate under our manifest. We provide a final disposal certificate from the TSDF / co-processor / incinerator. The certificate is your statutory proof under Schedule I of the Hazardous Waste Rules.' },
      { q: 'Why don\'t you own a TSDF?', a: 'Owning a TSDF requires environmental clearance, land acquisition, capital and continuous operation that does not match the categories we handle. Our network model lets us route each category to the partner with the right authorisation — a halogenated solvent goes to the incinerator, used oil goes to co-processing, paint sludge goes to TSDF landfill. One-size-fits-all does not work for waste.' },
      { q: 'How do you handle radiation-contaminated material?', a: 'Portal monitors at every gate (calibrated by AERB), handheld GM monitors for spot-checks, and an isolation bay for any alarm. If contamination is confirmed, the material is handed to BARC under their take-back protocol. Zero contamination events in the last 36 months.' },
      { q: 'Can you take asbestos?', a: 'Yes — under our asbestos-handling protocol with PPE, sealed bags, and routing to an authorised inert disposal site. Pricing is per kg because of the handling and PPE overhead. Bring third-party identification of the material if possible.' },
    ],
    processTitle: 'Categorise, route, document.',
    process: [
      { n: '01', t: 'Classify', d: 'Category determination per Schedule I / II / III',          icon: 'eye' },
      { n: '02', t: 'Route',    d: 'TSDF / co-processing / incinerator chosen by authorisation', icon: 'arrow' },
      { n: '03', t: 'Transport',d: 'GPS-tracked vehicle, manifest custody',                     icon: 'truck' },
      { n: '04', t: 'Destroy',  d: 'Treatment, incineration, secure landfill — as appropriate', icon: 'warn' },
      { n: '05', t: 'File',     d: 'Disposal certificate + Form 4 return on your behalf',       icon: 'doc' },
    ],
  },
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
    title: "What Tamil Nadu's 2026 EPR amendments mean for industrial waste generators",
    date: 'Apr 22, 2026',
    tag: 'Policy',
    read: 7,
    excerpt: "TNPCB's April 2026 amendments tighten producer responsibility on plastic packaging and e-waste. Here is what the rule actually says, who it affects, and what to do in the next 90 days.",
    author: 'Manickaraj',
    authorRole: 'Founder, M R Greentech',
    sections: [
      {
        heading: 'The amendment in one paragraph',
        paragraphs: [
          'On 12 April 2026 the Tamil Nadu Pollution Control Board notified amendments to the state-level Extended Producer Responsibility framework covering plastic packaging waste and e-waste. The headline change is that EPR target compliance for FY 2026-27 onwards will be enforced through bank-guarantee bonding rather than only end-of-year certificates.',
          'For mid-size producers — packaging-intensive manufacturers, importers, and brand owners — this changes EPR from a paperwork exercise to a working-capital one. You now post a guarantee at the start of the year against your projected EPR obligation, and it is released against monthly recycling certificates.',
        ],
      },
      {
        heading: 'Who it affects',
        list: [
          'Plastic packaging producers above 1 MT / year (lowered from 5 MT in 2024)',
          'E-waste producers, importers and brand owners in Schedule I and II',
          'Recyclers and dismantlers — now required to file monthly returns on the central portal',
          'Brand owners selling FMCG or consumer electronics in Tamil Nadu',
        ],
      },
      {
        heading: 'What to do in the next 90 days',
        paragraphs: [
          'First, recalculate your projected EPR obligation for FY 2026-27 against the new lower threshold and updated category multipliers. The plastic packaging multiplier for multi-layer flexibles went up 1.4× — most producers will see their obligation jump 25-40%.',
          "Second, pre-engage your recycling partner. Bank guarantees are released monthly against certificates, so volume continuity matters more than it did when reconciliation was annual. If your current partner can't issue certificates monthly, the bonding cost compounds.",
          "Third, file your registration update on the TNPCB portal before 30 June 2026. The grace period for re-registration under the amended framework closes then.",
        ],
      },
      {
        quote: {
          text: 'The shift to bank-guarantee bonding is the single biggest operational change to EPR since the framework was introduced in 2022.',
          author: 'TNPCB notification, April 2026',
        },
      },
    ],
  },
  {
    id: 'b02',
    title: 'Six tests we run on every batch of incoming hazardous waste at Ambattur',
    date: 'Mar 28, 2026',
    tag: 'Field notes',
    read: 5,
    excerpt: 'Mis-classifying a hazardous waste consignment is how disposal certificates get rejected and disposal liability boomerangs back to the generator. Here is the intake protocol we have run since 2014.',
    author: 'Anitha Kumaresan',
    authorRole: 'Head of Compliance',
    sections: [
      {
        heading: 'Why this matters',
        paragraphs: [
          "A hazardous waste consignment routed to the wrong downstream facility is a problem for everybody. The TSDF / incinerator / co-processor will reject the load if their authorisation does not cover the category, and the rejection sits with the original generator under the polluter-pays principle. Getting the category right at intake is the single highest-leverage check in the whole chain.",
          "We run six tests on every drum, bag or tanker that comes through our Ambattur gate. The protocol takes 35-50 minutes per consignment and has caught roughly one mis-categorisation per 220 loads over the last three years.",
        ],
      },
      {
        heading: 'The six tests',
        list: [
          '01 · Visual inspection — label match against manifest, container condition, signs of leakage or pressure',
          '02 · pH strip test on liquid loads — confirms acid vs base vs neutral declaration',
          '03 · Density check — flags solvents declared as oils and vice versa',
          '04 · Halogen spot test — distinguishes halogenated vs non-halogenated solvents (different routing)',
          '05 · Heavy metals XRF on solid loads — catches lead, cadmium, chromium that may shift category',
          '06 · Manifest cross-check — generator authorisation, transporter ID, category code, weight',
        ],
      },
      {
        heading: 'What we do when a test fails',
        paragraphs: [
          'A failed test does not mean the load is rejected. It means the load is parked in our quarantine bay, the generator is called, and we work out together whether the manifest needs amendment or the load needs to go back. Most discrepancies are minor — wrong category code on the manifest while the material itself is correctly described — and we fix the paperwork in under a day.',
          "Outright rejection is rare (about one in 800 loads) and happens when the material is materially different from what the manifest says, in a way that would make our downstream partners reject it. In those cases the generator gets the load back the same day, with a written assessment they can use to re-engage their handling team.",
        ],
      },
    ],
  },
  {
    id: 'b03',
    title: 'Inside our materials recovery process — how 92% of waste gets a second life',
    date: 'Mar 04, 2026',
    tag: 'Operations',
    read: 6,
    excerpt: 'A walk-through of the recovery line at Ambattur. From inbound weighbridge to outbound dispatch — 48 to 72 hours, eight stations, and the numbers behind a 92% diversion rate.',
    author: 'Sridhar Venkat',
    authorRole: 'Operations · Recovery line',
    sections: [
      {
        heading: 'The recovery line at a glance',
        paragraphs: [
          'Our recovery line at Ambattur runs through eight stations between the inbound weighbridge and the outbound truck. The order is fixed: weigh → visual sort → magnetic pull → eddy-current → manual finishing → XRF assay → bale or shred → dispatch with declaration.',
          'Through-put on a typical 8-hour shift is roughly 12 MT of mixed inbound material. The cycle from inbound to ready-for-dispatch is 48-72 hours depending on stream — single-grade material moves through in a single shift, mixed material adds a day for sorting.',
        ],
      },
      {
        heading: 'The 92% number, broken out',
        list: [
          'Ferrous metals — 99% recovery, sold to South India re-rolling mills',
          'Non-ferrous metals — 97% recovery, XRF-graded to ISRI standards',
          'Plastics (PET / HDPE / PP) — 88% recovery as feedstock-grade granules',
          'Paper & cardboard — 95% recovery as mill-grade bales',
          'E-waste — 84% material recovery (board components, metals)',
          'Residual to TSDF or incinerator — 8% of intake by weight',
        ],
      },
      {
        heading: 'Where the 8% goes',
        paragraphs: [
          'Roughly 8% of incoming material does not have a recovery route. This is mostly heavily contaminated organics, mixed-polymer composites that cannot be cleanly separated, and the small fraction of hazardous categories that arrive mis-mixed despite our intake checks.',
          "These residuals are routed to our treatment partners — TSDF landfill for inert / non-hazardous residuals, co-processing for combustible streams that meet the cement-kiln calorific spec, and the authorised incinerator for the small hazardous fraction. The disposal route for every kilogram is logged and reported back to the originating generator.",
        ],
      },
    ],
  },
  {
    id: 'b04',
    title: 'Why e-waste handling needs more than just a recycling bin',
    date: 'Feb 18, 2026',
    tag: 'E-waste',
    read: 8,
    excerpt: "E-waste makes up under 4% of waste by weight but contains 70% of the toxic heavy metals in the average industrial waste stream. Here is what a serious e-waste programme actually looks like.",
    author: 'Anitha Kumaresan',
    authorRole: 'Head of Compliance',
    sections: [
      {
        heading: 'The hidden weight of e-waste',
        paragraphs: [
          'Most industrial customers are surprised to learn that the e-waste corner of their waste store contains the majority of the toxic load of the whole site. End-of-life laptops, monitors, printers, UPS batteries, control panels and field instruments together hold roughly 70% of the lead, mercury, cadmium and brominated flame retardants in an average industrial waste audit.',
          "Tossing this material into a generic recycler — or worse, into the regular scrap pile — is how heavy metals leak into uncontrolled smelter feed and eventually back into the environment. India's E-Waste Management Rules (2022, amended 2026) require that e-waste flows through a CPCB-registered recycler with a proper material recovery and downstream-routing audit trail.",
        ],
      },
      {
        heading: 'What a serious programme looks like',
        list: [
          'Asset tagging at end-of-life so each device is tracked',
          'Secure data destruction (NIST 800-88 wipe or physical shred) for storage media',
          'Manifest pickup with a CPCB-registered recycler under EPR targets',
          'Material recovery audit — components, metals, polymers separated and routed',
          'Final disposal certificate with category-wise weight breakdown',
          'Annual EPR fulfilment report mapping back to producer obligations',
        ],
      },
      {
        heading: 'Our programme structure',
        paragraphs: [
          "M R Greentech runs e-waste under our CPCB EPR registration. Pickup is scheduled monthly for ongoing programmes, on-call for one-off lots. Secure data destruction is included for storage media; for laptops we do a NIST 800-88 wipe followed by drive removal for physical shred at our facility.",
          'Recovered materials — gold and copper from PCBs, aluminium from chassis, polymers from housings — go to authorised refiners. The annual EPR certificate consolidates the monthly weights and maps directly to the producer obligation under the central EPR portal.',
        ],
      },
    ],
  },
  {
    id: 'b05',
    title: 'Our 28-year journey: from one truck in 1998 to a 60,000 sqft recovery facility',
    date: 'Jan 30, 2026',
    tag: 'Anniversary',
    read: 5,
    excerpt: 'M R Greentech turns 28 this year. A short history of how Manickaraj started with one truck and one principle — and how that principle still runs every shift at Ambattur today.',
    author: 'Manickaraj',
    authorRole: 'Founder, M R Greentech',
    sections: [
      {
        heading: 'How it started',
        paragraphs: [
          "M R Greentech began in 1998 with one truck, one driver, and a contract to clear non-hazardous industrial waste from a small auto-ancillary unit in Ambattur. I was the second driver. The principle from day one — and the only one I have ever had on the wall — was that waste leaving a customer's gate is the customer's reputation, not just their byproduct.",
          'For the first six years, that meant we ran punctual, paperwork-correct collection. No fancy treatment, no recovery line, just disciplined pickup. We grew slowly — three trucks by 2002, eight by 2006 — and built a customer book of about 60 industrial units.',
        ],
      },
      {
        heading: 'The hazardous waste turn',
        paragraphs: [
          "The pivot came in 2008, when we filed for our first Hazardous Waste Authorisation with TNPCB. The category-specific rules under the 1989 framework had been replaced and the bar for credible handlers had moved up. We bought our first dedicated hazardous-waste vehicle, trained four drivers under the new rules, and signed our first 12-month hazardous-waste contract with a pharma manufacturer in Sriperumbudur.",
          'From 2008 onward the business has been a two-stream operation — non-hazardous collection on the volume side and hazardous waste management on the value side. The Ambattur yard was acquired in 2011 to consolidate intake, and the recovery line was commissioned in 2009 to extract value back from the non-hazardous stream.',
        ],
      },
      {
        heading: 'Where we are at 28',
        list: [
          '240,000+ MT of waste handled cumulatively since 1998',
          '420+ active industrial customer relationships across South India',
          '60,000 sqft Ambattur facility with 14 vehicles in the fleet',
          '92% materials diversion rate from landfill',
          'CPCB, TNPCB and AERB authorised; ISO 14001 certified since 2018',
          'Team of 24 across operations, compliance, and the recovery line',
        ],
      },
      {
        quote: {
          text: "Waste leaving a customer's gate is the customer's reputation, not just their byproduct. That has not changed in 28 years, and it will not change in the next 28.",
          author: 'Manickaraj, Founder',
        },
      },
    ],
  },
];
