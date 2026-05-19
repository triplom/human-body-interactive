import type { BodyPart } from '../types/bodyPart';
import { SYSTEM_META } from '../types/bodyPart';

interface Props {
  part: BodyPart | null;
  x: number;
  y: number;
}

export default function PartTooltip({ part, x, y }: Props) {
  if (!part) return null;
  const meta = SYSTEM_META[part.system];

  return (
    <div
      className="tooltip fixed z-50 pointer-events-none"
      style={{ left: x + 16, top: y - 10 }}
    >
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 px-3 py-2.5 max-w-[220px]">
        {/* Name + color dot */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: part.color }}
          />
          <span className="text-sm font-semibold text-slate-800 leading-snug">
            {part.name}
          </span>
        </div>

        {/* Brief description */}
        <p className="text-xs text-slate-500 leading-snug line-clamp-2">
          {part.briefDescription}
        </p>

        {/* System badge */}
        <div
          className={`mt-1.5 text-[10px] font-semibold uppercase tracking-widest ${meta.accent}`}
        >
          {meta.label}
        </div>
      </div>
    </div>
  );
}
