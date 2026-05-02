import React, { useRef } from 'react';
import type { BodyPart } from '../types/bodyPart';

interface TooltipProps {
  part: BodyPart | null;
  x: number;
  y: number;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ part, x, y, visible }) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!visible || !part) return null;

  // Offset tooltip from cursor
  const offsetX = 16;
  const offsetY = -10;

  return (
    <div
      ref={ref}
      className="tooltip pointer-events-none fixed z-50"
      style={{
        left: x + offsetX,
        top: y + offsetY,
        transform: 'translateY(-100%)',
      }}
    >
      <div
        className="rounded-lg px-3 py-2 shadow-xl border max-w-xs"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          borderColor: part.highlightColor,
          borderWidth: '1px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: part.highlightColor }}
          />
          <span
            className="font-semibold text-sm leading-tight"
            style={{ color: part.highlightColor }}
          >
            {part.name}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-snug">
          {part.briefDescription}
        </p>
        <p className="text-xs text-slate-500 mt-1 italic">Click for details</p>
      </div>
    </div>
  );
};

export default Tooltip;
