import { useState, useCallback } from 'react';
import type { BodyPart, BodySystem, BodyView } from '../types/bodyPart';
import SystemNav from './SystemNav';
import HumanBody from './HumanBody';
import InfoPanel from './InfoPanel';
import PartTooltip from './PartTooltip';

export default function BodyExplorer() {
  const [activeSystem, setActiveSystem] = useState<BodySystem>('organs');
  const [activeView, setActiveView] = useState<BodyView>('front');
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handlePartHover = useCallback(
    (part: BodyPart | null, clientX: number, clientY: number) => {
      setHoveredPart(part);
      if (part) setTooltipPos({ x: clientX, y: clientY });
    },
    [],
  );

  const handlePartClick = useCallback((part: BodyPart) => {
    setSelectedPart((prev) => (prev?.id === part.id ? null : part));
  }, []);

  const handlePartSelect = useCallback((part: BodyPart) => {
    setSelectedPart(part);
    // Switch to the part's system and view
    setActiveSystem(part.system);
    if (part.view !== 'both') setActiveView(part.view);
  }, []);

  const handleSystemChange = useCallback((sys: BodySystem) => {
    setActiveSystem(sys);
    setSelectedPart(null);
    setHoveredPart(null);
  }, []);

  const handleViewChange = useCallback((view: BodyView) => {
    setActiveView(view);
    setSelectedPart(null);
    setHoveredPart(null);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-100">
      {/* Top navigation */}
      <SystemNav
        activeSystem={activeSystem}
        activeView={activeView}
        onSystemChange={handleSystemChange}
        onViewChange={handleViewChange}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* SVG body canvas */}
        <HumanBody
          activeSystem={activeSystem}
          activeView={activeView}
          selectedPart={selectedPart}
          onPartHover={handlePartHover}
          onPartClick={handlePartClick}
        />

        {/* Right info panel */}
        <InfoPanel
          part={selectedPart}
          onClose={() => setSelectedPart(null)}
          onPartSelect={handlePartSelect}
        />
      </div>

      {/* Floating tooltip */}
      <PartTooltip
        part={hoveredPart && hoveredPart.id !== selectedPart?.id ? hoveredPart : null}
        x={tooltipPos.x}
        y={tooltipPos.y}
      />
    </div>
  );
}
