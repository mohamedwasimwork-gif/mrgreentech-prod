// Real image sources for the project.
//
// Primary CDN — Loremflickr — fetches real Flickr photos that are tagged
// with the keywords passed in the URL. The `?lock=N` parameter pins a
// specific photo so the page is deterministic. Every image below is
// on-topic for the scrap-metal trade (ferrous / non-ferrous yards,
// container shipping, recycling, compliance, etc.).
//
// On-error fallback — Picsum (random aesthetic photo, seeded) — handled
// inside <RealImage/>. So the layout never collapses even if Loremflickr
// is down for a request.
//
// To swap any image, change the keywords or lock number on that entry.

const lf = (keywords: string, lock: number, w = 1600, h = 1000) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keywords)}?lock=${lock}`;

// Picsum seeded fallback — guaranteed to load a real photo
export const picsum = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

// Avatars for team portraits — Pravatar always returns a real face photo
export const pravatar = (n: number, size = 480) => `https://i.pravatar.cc/${size}?img=${n}`;

// Live Google Maps embed for the Ambattur facility — no API key needed.
// Latitude/longitude pinned in COMPANY (data.ts).
export const factoryMapEmbed =
  'https://www.google.com/maps?q=Ambattur+Industrial+Estate,+Chennai+600058&output=embed';

export const IMAGES = {
  /* === HOME — yard aerial / hero === */
  // Pinned to a specific scrap-yard photo — replace this URL to swap the hero.
  heroYard: 'https://chennaimetalscrap.com/wp-content/uploads/2025/06/Home-About-600x600.jpg',

  /* === HOME — FAQ desk === */
  faq: 'https://cleanriver.com/wp-content/uploads/2023/09/jessica-palomo-l7LmUdkrANQ-unsplash-scaled.jpg',

  /* === ABOUT — founders on yard === */
  aboutFounders: 'https://cleanriver.com/wp-content/uploads/2023/09/jessica-palomo-l7LmUdkrANQ-unsplash-scaled.jpg',

  /* === SERVICES (per service id) === */
  // Ferrous — HMS, shredded, plate, rebar
  serviceFerrous: 'https://cdn.shopify.com/s/files/1/0613/8458/9369/files/image4_75a9c3cb-fde7-48d9-b1b6-1400f6363f78_600x600.jpg?v=1754312891',
  // Non-ferrous — copper, aluminium, brass
  serviceNonferrous: 'https://metalimpexgroup.com/wp-content/uploads/2022/08/metal_metauxnonferreux_tetiere.jpg',
  // Export — container ship leaving port (Loremflickr)
  serviceExport: lf('container-ship,cargo,port', 2, 1800, 800),
  // Import — port crane / loading
  serviceImport: 'https://steelbridgeco.com/wp-content/uploads/2025/07/46e1a615ab2dbb8b42d8c92f4c513c85.jpg',

  /* === SUSTAINABILITY === */
  sustainHero: 'https://en.metallexpres.pl/wp-content/uploads/2023/08/xzrownowazony-rozwoj-obraz.jpg.pagespeed.ic.8YSkd-MRYx.jpg',
  sustainCommitments: 'https://images.freeimages.com/variants/FL5pXqWBeGTd1MBCZhz64h5k/624f0dc1dff9bdccab032f93c33e79de78481770e79e21d3b0469daf51f02797',
  sustainImpact: 'https://t4.ftcdn.net/jpg/18/94/90/17/360_F_1894901708_vctDVGahgvNZSsgrIs9cChnw2cy4bPg9.jpg',

  /* === CONTACT === */
  contactYard: 'https://www.okonrecycling.com/wp-content/uploads/2025/10/large-scrap-metal-yard-trucks-radiation-portal.png',
  contactMap: factoryMapEmbed,

  /* === BLOG (5 posts) === */
  // b01 — EU scrap tariff (trade policy)
  blogFeatured: 'https://t3.ftcdn.net/jpg/03/88/51/56/360_F_388515677_2c1bNIGitAczoNeCfGvNhe9cWa5s54jy.jpg',
  // b02 — Grading Zorba (mixed non-ferrous aluminium shred)
  blogB02: 'https://5.imimg.com/data5/ANDROID/Default/2022/8/TC/PM/LV/158677144/product-jpeg.jpg',
  // b03 — Chennai ↔ Santos shipping route
  blogB03: 'https://media.gettyimages.com/id/2253399479/video/aerial-hyperlapse-of-shipping-dock-industrial-zone-steel-industry-indonesia.jpg?s=640x640&k=20&c=LrY2GDMB_Ranu8L9TvJUBFHINVH_5EG1Xn9ysHo3TII=',
  // b04 — Denmark aluminium recycling
  blogB04: 'https://www.weightron.com/wp-content/uploads/2016/03/Weightron-Radiation-Detection-for-Scrap-Metal-Yards.jpg',
  // b05 — Radiation testing protocol
  blogB05: 'https://www.okonrecycling.com/wp-content/uploads/2025/10/security-personnel-scrapyard-alert.png',
} as const;

// Map a service id to its image
export const serviceImage = (id: string): string => {
  const map: Record<string, string> = {
    ferrous: IMAGES.serviceFerrous,
    nonferrous: IMAGES.serviceNonferrous,
    export: IMAGES.serviceExport,
    import: IMAGES.serviceImport,
  };
  return map[id] || IMAGES.serviceFerrous;
};

// Blog post id → image
export const blogImage = (id: string): string => {
  const map: Record<string, string> = {
    b01: IMAGES.blogFeatured,
    b02: IMAGES.blogB02,
    b03: IMAGES.blogB03,
    b04: IMAGES.blogB04,
    b05: IMAGES.blogB05,
  };
  return map[id] || IMAGES.blogFeatured;
};
