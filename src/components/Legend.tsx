import React from 'react';
import type { BodySystem } from '../types/bodyPart';
import type { BodyPart } from '../types/bodyPart';

interface LegendProps {
  parts: BodyPart[];
  activeSystem?: BodySystem;
  hoveredPartId: string | null;
  selectedPartId: string | null;
  onPartClick: (partId: string) => void;
}

const Legend: React.FC<LegendProps> = ({
  parts,
  activeSystem: _activeSystem,
  hoveredPartId,
  selectedPartId,
  onPartClick,
}) => {


  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
        Structures
      </p>
      <div className="space-y-0.5 max-h-64 overflow-y-auto pr-1">
        {parts.map((part) => {
          const isActive = hoveredPartId === part.id || selectedPartId === part.id;
          return (
            <button
              key={part.id}
              onClick={() => onPartClick(part.id)}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-all duration-150"
              style={
                isActive
                  ? {
                      background: `${part.highlightColor}20`,
                      color: part.highlightColor,
                    }
                  : {
                      background: 'transparent',
                      color: '#64748b',
                    }
              }
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: isActive ? part.highlightColor : part.color }}
              />
              <span className="truncate">{part.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
