export type BodySystem = 'organs' | 'muscles' | 'skeleton' | 'nervous';
export type BodyView = 'front' | 'back';

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
  /** SVG path `d` attribute string */
  svgPath: string;
  /** Short text shown in hover tooltip */
  briefDescription: string;
  details: BodyPartDetails;
  /** Default fill color (CSS color string) */
  color: string;
  /** Fill color on hover / selection */
  highlightColor: string;
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  partId: string | null;
}

export interface AppState {
  activeSystem: BodySystem;
  activeView: BodyView;
  hoveredPartId: string | null;
  selectedPartId: string | null;
}

export const SYSTEM_LABELS: Record<BodySystem, string> = {
  organs: 'Organs',
  muscles: 'Muscles',
  skeleton: 'Skeleton',
  nervous: 'Nervous System',
};

export const SYSTEM_COLORS: Record<BodySystem, { base: string; highlight: string; text: string }> = {
  organs:   { base: '#be123c', highlight: '#fb7185', text: 'text-rose-400' },
  muscles:  { base: '#b91c1c', highlight: '#f87171', text: 'text-red-400' },
  skeleton: { base: '#a8a29e', highlight: '#f5f5f4', text: 'text-stone-300' },
  nervous:  { base: '#b45309', highlight: '#fcd34d', text: 'text-amber-300' },
};
