import type { BodyPart } from '../types/bodyPart';
import { SYSTEM_META } from '../types/bodyPart';
import { ALL_PARTS } from '../data/bodyParts';

interface Props {
  part: BodyPart | null;
  onClose: () => void;
  onPartSelect: (part: BodyPart) => void;
}

export default function InfoPanel({ part, onClose, onPartSelect }: Props) {
  if (!part) {
    return (
      <aside className="w-80 flex-shrink-0 bg-white border-l border-slate-200 h-full flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Hover over a highlighted structure, then click to view detailed information.
          </p>
        </div>
      </aside>
    );
  }

  const meta = SYSTEM_META[part.system];

  // Resolve related parts
  const related = part.details.relatedParts
    .map((id) => ALL_PARTS.find((p) => p.id === id))
    .filter((p): p is BodyPart => Boolean(p));

  return (
    <aside className="info-panel w-80 flex-shrink-0 bg-white border-l border-slate-200 h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className={`px-5 pt-5 pb-4 ${meta.bg} border-b ${meta.border} flex-shrink-0`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${meta.accent}`}>
              {meta.label}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-0.5 leading-tight break-words">
              {part.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors mt-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Color band + brief description */}
        <div className="flex items-start gap-2 mt-2">
          <span
            className="mt-1 w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-white"
            style={{ backgroundColor: part.color }}
          />
          <p className="text-sm text-slate-600 leading-relaxed">{part.briefDescription}</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 px-5 py-4 space-y-5 overflow-y-auto">
        {/* Description */}
        <section>
          <SectionHeader>About</SectionHeader>
          <p className="text-sm text-slate-700 leading-relaxed">{part.details.description}</p>
        </section>

        {/* Function */}
        <section>
          <SectionHeader>Function</SectionHeader>
          <p className="text-sm text-slate-700 leading-relaxed">{part.details.function}</p>
        </section>

        {/* Location */}
        <section>
          <SectionHeader>Location</SectionHeader>
          <p className="text-sm text-slate-700 leading-relaxed">{part.details.location}</p>
        </section>

        {/* Key Facts */}
        <section>
          <SectionHeader>Key Facts</SectionHeader>
          <ul className="space-y-2">
            {part.details.facts.map((fact, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span
                  className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: part.color }}
                />
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related structures */}
        {related.length > 0 && (
          <section>
            <SectionHeader>Related Structures</SectionHeader>
            <div className="flex flex-wrap gap-2">
              {related.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => onPartSelect(rel)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: rel.color }}
                  />
                  {rel.name}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
      {children}
    </h3>
  );
}
