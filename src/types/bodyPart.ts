export type BodySystem = 'organs' | 'muscles' | 'skeleton' | 'nervous';
export type BodyView   = 'front' | 'back';

export interface BodyPartDetails {
  description: string;
  function: string;
  location: string;
  facts: string[];
  relatedParts: string[];
}

export interface BodyPart {
  id: string;
  name: string;
  system: BodySystem;
  view: BodyView | 'both';
  /** SVG path `d` attribute */
  svgPath: string;
  /** Optional extra paths (e.g. rib lines, fissures) rendered as strokes */
  detailPaths?: string[];
  /** CSS class added to the element (for animations) */
  animClass?: string;
  briefDescription: string;
  details: BodyPartDetails;
  color: string;
  hoverColor: string;
  opacity?: number;
}

// ── System metadata ─────────────────────────────────────────────────────────
export const SYSTEM_META: Record<BodySystem, {
  label: string;
  accent: string;
  bg: string;
  border: string;
  hex: string;
  hoverHex: string;
}> = {
  organs: {
    label: 'Organs',
    accent: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    hex: '#e11d48',
    hoverHex: '#fb7185',
  },
  muscles: {
    label: 'Muscles',
    accent: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    hex: '#c2410c',
    hoverHex: '#f97316',
  },
  skeleton: {
    label: 'Skeleton',
    accent: 'text-stone-600',
    bg: 'bg-stone-50',
    border: 'border-stone-300',
    hex: '#78716c',
    hoverHex: '#d6d3d1',
  },
  nervous: {
    label: 'Nervous',
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    hex: '#d97706',
    hoverHex: '#fbbf24',
  },
};

export const SYSTEM_LABELS: Record<BodySystem, string> = {
  organs: 'Organs',
  muscles: 'Muscles',
  skeleton: 'Skeleton',
  nervous: 'Nervous System',
};

export const SYSTEM_COLORS = SYSTEM_META;
