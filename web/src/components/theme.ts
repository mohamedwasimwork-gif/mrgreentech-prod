// MR Greentech Dynamic Design System — 3 themes × 2 type pairings

export type ThemeKey = 'verdant' | 'forge' | 'tidal';
export type TypeKey = 'editorial' | 'industrial';

export interface ThemeShape {
  name: string;
  tagline: string;
  bg: string;
  surface: string;
  surface2: string;
  ink: string;
  ink2: string;
  muted: string;
  line: string;
  brand: string;
  brand2: string;
  accent: string;
  accentInk: string;
  chip: string;
  dark: string;
  darkInk: string;
}

export interface TypeShape {
  name: string;
  display: string;
  body: string;
  mono: string;
  displayWeight: number;
  displayTracking: string;
}

export const THEMES: Record<string, ThemeShape> = {
  verdant: {
    name: 'Verdant',
    tagline: 'Green circular economy',
    bg: '#F4F3EE',
    surface: '#FFFFFF',
    surface2: '#EDEBE3',
    ink: '#0F1B14',
    ink2: '#3B4A3F',
    muted: '#6B7A6F',
    line: '#D9D6C7',
    brand: '#1F4D2E',
    brand2: '#3F7B4A',
    accent: '#C9E265',
    accentInk: '#0F1B14',
    chip: '#E7EAD4',
    dark: '#0F1B14',
    darkInk: '#F4F3EE',
  },
  forge: {
    name: 'Forge',
    tagline: 'Industrial metallic',
    bg: '#EDEEF0',
    surface: '#FFFFFF',
    surface2: '#E2E4E7',
    ink: '#0B0D10',
    ink2: '#34383D',
    muted: '#6B7078',
    line: '#CDD0D4',
    brand: '#1A1D21',
    brand2: '#4A4F56',
    accent: '#E26A2C',
    accentInk: '#0B0D10',
    chip: '#D8DADE',
    dark: '#0B0D10',
    darkInk: '#EDEEF0',
  },
  tidal: {
    name: 'Tidal',
    tagline: 'Maritime trade',
    bg: '#EEF2F5',
    surface: '#FFFFFF',
    surface2: '#E0E7EC',
    ink: '#081321',
    ink2: '#2B3A4E',
    muted: '#637085',
    line: '#CDD6DF',
    brand: '#0E2A47',
    brand2: '#2E5C8A',
    accent: '#F2C14E',
    accentInk: '#081321',
    chip: '#D7E0E8',
    dark: '#081321',
    darkInk: '#EEF2F5',
  },
};

export const TYPES: Record<string, TypeShape> = {
  editorial: {
    name: 'Editorial',
    display: "'Fraunces', 'Times New Roman', serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    displayWeight: 500,
    displayTracking: '-0.02em',
  },
  industrial: {
    name: 'Industrial',
    display: "'Space Grotesk', 'Helvetica Neue', sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'IBM Plex Mono', ui-monospace, monospace",
    displayWeight: 600,
    displayTracking: '-0.03em',
  },
};

export function applyTheme(themeKey: string, typeKey: string) {
  if (typeof document === 'undefined') return;
  const t = THEMES[themeKey];
  const f = TYPES[typeKey];
  if (!t || !f) return;
  const r = document.documentElement.style;
  Object.entries(t).forEach(([k, v]) => {
    if (k !== 'name' && k !== 'tagline') r.setProperty(`--c-${k}`, v as string);
  });
  r.setProperty('--font-display', f.display);
  r.setProperty('--font-body', f.body);
  r.setProperty('--font-mono', f.mono);
  r.setProperty('--display-weight', String(f.displayWeight));
  r.setProperty('--display-tracking', f.displayTracking);
}

// Apply persisted custom theme overrides at boot
export function applyCustomThemeOverrides() {
  if (typeof window === 'undefined') return;
  try {
    const custom = JSON.parse(localStorage.getItem('mrg.theme.custom.v1') || '{}');
    if (custom.themes) {
      for (const [k, over] of Object.entries(custom.themes)) {
        if (THEMES[k]) THEMES[k] = { ...THEMES[k], ...(over as object) } as ThemeShape;
      }
    }
    if (custom.types) {
      for (const [k, over] of Object.entries(custom.types)) {
        if (TYPES[k]) TYPES[k] = { ...TYPES[k], ...(over as object) } as TypeShape;
      }
    }
  } catch (e) {
    // ignore
  }
}
