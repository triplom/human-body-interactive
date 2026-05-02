import React from 'react';
import type { BodySystem } from '../types/bodyPart';
import { SYSTEM_LABELS, SYSTEM_COLORS } from '../types/bodyPart';

interface SystemSelectorProps {
  activeSystem: BodySystem;
  onChange: (system: BodySystem) => void;
}

const SYSTEM_ICONS: Record<BodySystem, React.ReactNode> = {
  organs: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  muscles: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  skeleton: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1M4 12h1m14 0h1m-2.636-6.364l-.707.707M7.343 16.657l-.707.707m0-10.728l.707.707M16.657 16.657l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  nervous: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const systems: BodySystem[] = ['organs', 'muscles', 'skeleton', 'nervous'];

const SystemSelector: React.FC<SystemSelectorProps> = ({ activeSystem, onChange }) => {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
        Body System
      </p>
      {systems.map((system) => {
        const isActive = system === activeSystem;
        const colors = SYSTEM_COLORS[system];
        return (
          <button
            key={system}
            onClick={() => onChange(system)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? {
                    background: `${colors.highlight}18`,
                    color: colors.highlight,
                    border: `1px solid ${colors.highlight}40`,
                    boxShadow: `0 0 12px ${colors.highlight}15`,
                  }
                : {
                    background: 'rgba(255,255,255,0.03)',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }
            }
          >
            <span style={{ color: isActive ? colors.highlight : '#64748b' }}>
              {SYSTEM_ICONS[system]}
            </span>
            <span>{SYSTEM_LABELS[system]}</span>
            {isActive && (
              <span
                className="ml-auto w-1.5 h-1.5 rounded-full"
                style={{ background: colors.highlight }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SystemSelector;
