import React from 'react';
import type { BodyPart } from '../types/bodyPart';

interface BodyPartPathProps {
  part: BodyPart;
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: (e: React.MouseEvent, partId: string) => void;
  onMouseLeave: () => void;
  onClick: (partId: string) => void;
}

const BodyPartPath: React.FC<BodyPartPathProps> = ({
  part,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const getClassName = () => {
    let cls = 'body-part';
    if (isSelected) cls += ' selected';
    else if (isHovered) cls += ' hovered';
    return cls;
  };

  const getFill = () => {
    if (isSelected || isHovered) return part.highlightColor;
    return part.color;
  };

  const getOpacity = () => {
    if (isHovered || isSelected) return 1;
    return 0.75;
  };

  return (
    <path
      d={part.svgPath}
      fill={getFill()}
      opacity={getOpacity()}
      stroke={isSelected ? part.highlightColor : 'rgba(255,255,255,0.15)'}
      strokeWidth={isSelected ? 1.5 : 0.5}
      className={getClassName()}
      style={{
        filter: isSelected
          ? `drop-shadow(0 0 8px ${part.highlightColor})`
          : isHovered
          ? `drop-shadow(0 0 5px ${part.highlightColor})`
          : 'none',
        transition: 'fill 0.2s ease, opacity 0.2s ease, filter 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => onMouseEnter(e, part.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(part.id)}
      role="button"
      aria-label={`${part.name} — click for details`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(part.id)}
    />
  );
};

export default BodyPartPath;
