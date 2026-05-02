import React from 'react';
import type { BodyView } from '../types/bodyPart';

interface ViewToggleProps {
  activeView: BodyView;
  onChange: (view: BodyView) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onChange }) => {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
        View
      </p>
      <div
        className="flex rounded-xl overflow-hidden border"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {(['front', 'back'] as BodyView[]).map((view) => {
          const isActive = view === activeView;
          return (
            <button
              key={view}
              onClick={() => onChange(view)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 px-2 text-xs font-medium transition-all duration-200"
              style={
                isActive
                  ? {
                      background: 'rgba(148, 163, 184, 0.15)',
                      color: '#e2e8f0',
                      borderBottom: '2px solid #94a3b8',
                    }
                  : {
                      background: 'transparent',
                      color: '#475569',
                      borderBottom: '2px solid transparent',
                    }
              }
            >
              {view === 'front' ? (
                <svg viewBox="0 0 24 36" fill="none" className="w-5 h-7" stroke="currentColor" strokeWidth={1.5}>
                  <ellipse cx="12" cy="4" rx="4" ry="4" />
                  <line x1="12" y1="8" x2="12" y2="22" />
                  <line x1="12" y1="12" x2="6" y2="18" />
                  <line x1="12" y1="12" x2="18" y2="18" />
                  <line x1="12" y1="22" x2="7" y2="32" />
                  <line x1="12" y1="22" x2="17" y2="32" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 36" fill="none" className="w-5 h-7" stroke="currentColor" strokeWidth={1.5}>
                  <ellipse cx="12" cy="4" rx="4" ry="4" />
                  <line x1="12" y1="8" x2="12" y2="22" />
                  <line x1="12" y1="10" x2="6" y2="16" />
                  <line x1="12" y1="10" x2="18" y2="16" />
                  <line x1="12" y1="22" x2="7" y2="32" />
                  <line x1="12" y1="22" x2="17" y2="32" />
                </svg>
              )}
              <span className="capitalize">{view}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ViewToggle;
