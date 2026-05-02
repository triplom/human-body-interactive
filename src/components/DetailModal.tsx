import React, { useEffect, useCallback } from 'react';
import type { BodyPart } from '../types/bodyPart';

interface DetailModalProps {
  part: BodyPart | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ part, onClose }) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (part) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [part, handleKeyDown]);

  if (!part) return null;



  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-content relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border"
        style={{
          background: '#1e293b',
          borderColor: part.highlightColor,
          borderWidth: '1px',
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
          style={{
            background: 'rgba(30,41,59,0.95)',
            borderColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ background: part.highlightColor, boxShadow: `0 0 8px ${part.highlightColor}` }}
            />
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">{part.name}</h2>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: part.highlightColor }}
              >
                {part.system.charAt(0).toUpperCase() + part.system.slice(1)} System
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors rounded-lg p-1.5 hover:bg-slate-700"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <section>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: part.highlightColor }}
            >
              Overview
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">{part.details.description}</p>
          </section>

          {/* Function */}
          <section>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: part.highlightColor }}
            >
              Function
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">{part.details.function}</p>
          </section>

          {/* Location */}
          <section>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: part.highlightColor }}
            >
              Location
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm">{part.details.location}</p>
          </section>

          {/* Fun Facts */}
          <section>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: part.highlightColor }}
            >
              Key Facts
            </h3>
            <ul className="space-y-2">
              {part.details.facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: part.highlightColor }}
                  />
                  <span className="text-slate-300 text-sm leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Parts */}
          {part.details.relatedParts.length > 0 && (
            <section>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-2"
                style={{ color: part.highlightColor }}
              >
                Related Structures
              </h3>
              <div className="flex flex-wrap gap-2">
                {part.details.relatedParts.map((rel) => (
                  <span
                    key={rel}
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${part.highlightColor}50`,
                      color: part.highlightColor,
                      background: `${part.highlightColor}15`,
                    }}
                  >
                    {rel.replace(/-/g, ' ').replace(/(^\w|-\w)/g, (c) => c.replace('-', ' ').toUpperCase())}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 border-t flex justify-end"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{
              background: `${part.highlightColor}20`,
              color: part.highlightColor,
              border: `1px solid ${part.highlightColor}40`,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
