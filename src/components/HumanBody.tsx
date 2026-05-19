import { useRef } from 'react';
import type { BodyPart, BodySystem, BodyView } from '../types/bodyPart';
import { ALL_PARTS } from '../data/bodyParts';

// ── Body silhouette path at ViewBox "0 0 300 640" ────────────────────────────
// One continuous clockwise outline — head → right side → legs → left side → back
const BODY_SILHOUETTE = `
  M150 3
  C172 3 189 7 193 14 C200 26 200 46 194 64
  C188 80 178 92 165 100 C161 104 160 110 160 118
  L160 152
  C186 152 210 154 226 164 C240 172 246 186 246 202
  L246 340 C246 356 248 372 250 390
  L252 420 C252 434 248 446 240 454
  L228 456 C222 456 218 460 218 466
  L218 636 L202 636 L202 466
  C202 462 200 460 196 456
  L150 456 L104 456
  C100 460 98 462 98 466
  L98 636 L82 636 L82 466
  C82 460 78 456 72 456
  L60 454 C52 446 48 434 48 420
  L50 390 C52 372 54 356 54 340
  L54 202 C54 186 60 172 74 164
  C90 154 114 152 140 152
  L140 118 C140 110 139 104 135 100
  C122 92 112 80 106 64
  C100 46 100 26 107 14
  C111 7 128 3 150 3 Z
`;

interface Props {
  activeSystem: BodySystem;
  activeView: BodyView;
  selectedPart: BodyPart | null;
  onPartHover: (part: BodyPart | null, clientX: number, clientY: number) => void;
  onPartClick: (part: BodyPart) => void;
}

export default function HumanBody({
  activeSystem,
  activeView,
  selectedPart,
  onPartHover,
  onPartClick,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Filter to current system + view
  const visibleParts = ALL_PARTS.filter(
    (p) => p.system === activeSystem && (p.view === activeView || p.view === 'both'),
  );

  const isNervous = activeSystem === 'nervous';

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden p-6">
      <svg
        ref={svgRef}
        viewBox="0 0 300 640"
        className="body-glow w-full max-w-[280px] h-auto select-none"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onMouseLeave={() => onPartHover(null, 0, 0)}
      >
        {/* ── Ghost body silhouette ── */}
        <path
          d={BODY_SILHOUETTE}
          fill="#dde3eb"
          stroke="#c0cad8"
          strokeWidth="1"
          className="pointer-events-none"
        />

        {/* ── Body part paths ── */}
        <g>
          {visibleParts.map((part) => {
            const isSelected = selectedPart?.id === part.id;
            const isNervePart = isNervous;

            return (
              <g
                key={part.id}
                className="body-part"
                onClick={() => onPartClick(part)}
                onMouseMove={(e) => onPartHover(part, e.clientX, e.clientY)}
                onMouseEnter={(e) => onPartHover(part, e.clientX, e.clientY)}
              >
                {/* Main fill path */}
                <path
                  d={part.svgPath}
                  fill={isNervePart ? 'none' : part.color}
                  stroke={part.color}
                  strokeWidth={isNervePart ? 2.5 : isSelected ? 2 : 0.5}
                  opacity={isSelected ? 1 : (part.opacity ?? 0.9)}
                  className={[
                    isNervePart ? 'nerve-path' : '',
                    part.animClass ?? '',
                    isSelected ? 'active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    filter: isSelected
                      ? `drop-shadow(0 0 8px ${part.hoverColor})`
                      : undefined,
                  }}
                />

                {/* Detail / stroke paths */}
                {part.detailPaths?.map((dp, i) => (
                  <path
                    key={i}
                    d={dp}
                    fill="none"
                    stroke={isNervePart ? part.hoverColor : 'rgba(255,255,255,0.5)'}
                    strokeWidth={isNervePart ? 1.5 : 0.8}
                    opacity={isNervePart ? 0.7 : 0.6}
                    className={isNervePart ? 'nerve-path' : 'pointer-events-none'}
                  />
                ))}
              </g>
            );
          })}
        </g>

        {/* ── Label dots for visible parts ── */}
        {visibleParts.map((part) => {
          // Compute a rough centroid from the path bounding box
          // We'll skip this for nerve paths (they're lines, not shapes)
          if (activeSystem === 'nervous') return null;
          const bbox = getBBoxApprox(part.svgPath);
          if (!bbox) return null;
          const cx = bbox.cx;
          const cy = bbox.cy;
          const isSelected = selectedPart?.id === part.id;

          return (
            <g key={`label-${part.id}`} className="pointer-events-none">
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 4 : 3}
                fill="white"
                stroke={part.color}
                strokeWidth={1.5}
                opacity={0.85}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Simple path bounding-box centroid estimator ────────────────────────────
// Extracts all numeric coordinate pairs from an SVG path `d` string.
function getBBoxApprox(d: string): { cx: number; cy: number } | null {
  const nums = d.match(/-?\d+(?:\.\d+)?/g);
  if (!nums || nums.length < 2) return null;
  const values = nums.map(Number);
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i + 1 < values.length; i += 2) {
    xs.push(values[i]);
    ys.push(values[i + 1]);
  }
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}
