import React from 'react';
import type { BodyPart, BodyView } from '../types/bodyPart';
import BodyPartPath from './BodyPartPath';

interface BodySVGProps {
  parts: BodyPart[];
  view: BodyView;
  hoveredPartId: string | null;
  selectedPartId: string | null;
  onMouseEnter: (e: React.MouseEvent, partId: string) => void;
  onMouseLeave: () => void;
  onClick: (partId: string) => void;
}

// Body outline silhouette paths for front and back
const FRONT_OUTLINE = `
  M150 22
  C134 22 118 30 110 44
  C102 58 104 72 104 82
  C104 92 100 98 98 104
  C95 112 95 120 98 126
  C92 130 86 136 82 144
  C76 154 74 166 74 178
  C74 190 76 202 78 214
  C80 226 82 236 82 248
  C82 258 80 268 78 278
  L72 320
  C70 334 68 348 68 362
  C68 376 70 390 74 402
  C76 412 80 420 82 430
  C82 444 80 458 78 472
  L76 514
  C74 528 74 542 76 556
  C78 566 82 574 86 580
  C90 586 96 588 102 586
  C108 584 112 578 114 570
  C116 560 116 548 114 536
  L112 514
  C110 500 110 486 112 472
  C114 460 118 450 120 440
  L120 380
  C118 370 116 360 116 350
  L116 300
  C118 294 120 290 124 288
  L136 284
  C142 282 148 282 150 282
  C152 282 158 282 164 284
  L176 288
  C180 290 182 294 184 300
  L184 350
  C184 360 182 370 180 380
  L180 440
  C182 450 186 460 188 472
  C190 486 190 500 188 514
  L186 536
  C184 548 184 560 186 570
  C188 578 192 584 198 586
  C204 588 210 586 214 580
  C218 574 222 566 224 556
  C226 542 226 528 224 514
  L222 472
  C220 458 218 444 218 430
  C220 420 224 412 226 402
  C230 390 232 376 232 362
  C232 348 230 334 228 320
  L222 278
  C220 268 218 258 218 248
  C218 236 220 226 222 214
  C224 202 226 190 226 178
  C226 166 224 154 218 144
  C214 136 208 130 202 126
  C205 120 205 112 202 104
  C200 98 196 92 196 82
  C196 72 198 58 190 44
  C182 30 166 22 150 22 Z
`;

const BACK_OUTLINE = `
  M150 22
  C134 22 118 30 110 44
  C102 58 104 72 104 82
  C104 92 100 98 98 104
  C95 112 95 120 98 126
  C92 130 86 136 82 144
  C76 154 74 166 74 178
  C74 190 76 202 78 214
  C80 226 82 236 82 248
  C82 258 80 268 78 278
  L72 320
  C70 334 68 348 68 362
  C68 376 70 390 74 402
  C76 412 80 420 82 430
  C82 444 80 458 78 472
  L76 514
  C74 528 74 542 76 556
  C78 566 82 574 86 580
  C90 586 96 588 102 586
  C108 584 112 578 114 570
  C116 560 116 548 114 536
  L112 514
  C110 500 110 486 112 472
  C114 460 118 450 120 440
  L120 380
  C118 370 116 360 116 350
  L116 300
  C118 294 120 290 124 288
  L136 284
  C142 282 148 282 150 282
  C152 282 158 282 164 284
  L176 288
  C180 290 182 294 184 300
  L184 350
  C184 360 182 370 180 380
  L180 440
  C182 450 186 460 188 472
  C190 486 190 500 188 514
  L186 536
  C184 548 184 560 186 570
  C188 578 192 584 198 586
  C204 588 210 586 214 580
  C218 574 222 566 224 556
  C226 542 226 528 224 514
  L222 472
  C220 458 218 444 218 430
  C220 420 224 412 226 402
  C230 390 232 376 232 362
  C232 348 230 334 228 320
  L222 278
  C220 268 218 258 218 248
  C218 236 220 226 222 214
  C224 202 226 190 226 178
  C226 166 224 154 218 144
  C214 136 208 130 202 126
  C205 120 205 112 202 104
  C200 98 196 92 196 82
  C196 72 198 58 190 44
  C182 30 166 22 150 22 Z
`;

// Anatomical guide lines for the body silhouette (decorative internal details)
const FRONT_DETAILS = `
  M150 126 L150 282
  M130 200 C138 196 150 196 162 200
  M128 260 C136 256 150 256 164 260
`;

const BACK_DETAILS = `
  M150 126 L150 380
  M120 200 C134 196 150 196 166 200
`;

const BodySVG: React.FC<BodySVGProps> = ({
  parts,
  view,
  hoveredPartId,
  selectedPartId,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const outline = view === 'front' ? FRONT_OUTLINE : BACK_OUTLINE;
  const details = view === 'front' ? FRONT_DETAILS : BACK_DETAILS;

  const visibleParts = parts.filter(
    (p) => p.view === view || p.view === 'both'
  );

  return (
    <svg
      viewBox="0 0 300 620"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
      style={{ maxHeight: '100%' }}
      aria-label={`Human body ${view} view — interactive anatomy diagram`}
      role="img"
    >
      <defs>
        <radialGradient id="bodyGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(148,163,184,0.06)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0)" />
        </radialGradient>
        <filter id="bodyGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer glow background */}
      <ellipse cx="150" cy="310" rx="100" ry="260" fill="url(#bodyGlow)" />

      {/* Body silhouette fill */}
      <path
        d={outline}
        fill="rgba(30,41,59,0.9)"
        stroke="rgba(148,163,184,0.2)"
        strokeWidth="1"
      />

      {/* Subtle inner detail lines */}
      <path
        d={details}
        fill="none"
        stroke="rgba(148,163,184,0.06)"
        strokeWidth="0.75"
      />

      {/* Body parts layer */}
      <g className="svg-layer">
        {visibleParts.map((part) => (
          <BodyPartPath
            key={part.id}
            part={part}
            isHovered={hoveredPartId === part.id}
            isSelected={selectedPartId === part.id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          />
        ))}
      </g>

      {/* Body outline on top (no fill, just stroke) */}
      <path
        d={outline}
        fill="none"
        stroke="rgba(148,163,184,0.25)"
        strokeWidth="1.5"
        pointerEvents="none"
      />
    </svg>
  );
};

export default BodySVG;
