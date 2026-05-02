import React, { useState, useCallback, useMemo } from 'react';
import type { BodySystem, BodyView } from '../types/bodyPart';
import { SYSTEM_COLORS, SYSTEM_LABELS } from '../types/bodyPart';
import { organs } from '../data/organs';
import { muscles } from '../data/muscles';
import { skeleton } from '../data/skeleton';
import { nervous } from '../data/nervous';
import BodySVG from './BodySVG';
import SystemSelector from './SystemSelector';
import ViewToggle from './ViewToggle';
import Legend from './Legend';
import Tooltip from './Tooltip';
import DetailModal from './DetailModal';

const ALL_PARTS = [...organs, ...muscles, ...skeleton, ...nervous];

const PARTS_BY_SYSTEM: Record<BodySystem, typeof ALL_PARTS> = {
  organs,
  muscles,
  skeleton,
  nervous,
};

const BodyViewer: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<BodySystem>('organs');
  const [activeView, setActiveView] = useState<BodyView>('front');
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const currentParts = PARTS_BY_SYSTEM[activeSystem];

  const hoveredPart = useMemo(
    () => ALL_PARTS.find((p) => p.id === hoveredPartId) ?? null,
    [hoveredPartId]
  );

  const selectedPart = useMemo(
    () => ALL_PARTS.find((p) => p.id === selectedPartId) ?? null,
    [selectedPartId]
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent, partId: string) => {
    setHoveredPartId(partId);
    setTooltip({ x: e.clientX, y: e.clientY, visible: true });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (hoveredPartId) {
      setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
    }
  }, [hoveredPartId]);

  const handleMouseLeave = useCallback(() => {
    setHoveredPartId(null);
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleClick = useCallback((partId: string) => {
    setSelectedPartId(partId);
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleSystemChange = useCallback((system: BodySystem) => {
    setActiveSystem(system);
    setHoveredPartId(null);
    setSelectedPartId(null);
    setMenuOpen(false);
  }, []);

  const handleViewChange = useCallback((view: BodyView) => {
    setActiveView(view);
    setHoveredPartId(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPartId(null);
  }, []);

  const handleLegendPartClick = useCallback((partId: string) => {
    setSelectedPartId(partId);
  }, []);

  const systemColors = SYSTEM_COLORS[activeSystem];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0f172a' }}>
      {/* ─── Top Header ─────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(15,23,42,0.95)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${systemColors.highlight}20`, border: `1px solid ${systemColors.highlight}40` }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke={systemColors.highlight} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314l.707.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">Human Body Explorer</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Interactive Anatomy Infographic</p>
          </div>
        </div>

        {/* Desktop: current system badge */}
        <div className="hidden md:flex items-center gap-2">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: `${systemColors.highlight}15`,
              color: systemColors.highlight,
              border: `1px solid ${systemColors.highlight}30`,
            }}
          >
            {SYSTEM_LABELS[activeSystem]}
          </span>
          <span className="text-xs text-slate-500 capitalize">{activeView} view</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle controls"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ─── Sidebar ────────────────────────────────────────────── */}
        <aside
          className={`
            flex-shrink-0 w-56 border-r overflow-y-auto p-4 space-y-6
            md:block
            ${menuOpen ? 'block absolute inset-y-0 left-0 z-30' : 'hidden'}
          `}
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(15,23,42,0.98)',
          }}
        >
          <SystemSelector activeSystem={activeSystem} onChange={handleSystemChange} />

          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          <ViewToggle activeView={activeView} onChange={handleViewChange} />

          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          <Legend
            parts={currentParts}
            activeSystem={activeSystem}
            hoveredPartId={hoveredPartId}
            selectedPartId={selectedPartId}
            onPartClick={handleLegendPartClick}
          />

          {/* Info tip */}
          <div
            className="rounded-xl p-3 text-xs text-slate-400 space-y-1"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p className="font-medium text-slate-300">How to use</p>
            <p>Hover over a body part to see a quick description.</p>
            <p>Click to open detailed information.</p>
          </div>
        </aside>

        {/* Mobile overlay backdrop */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 z-20 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* ─── Main SVG Canvas ──────────────────────────────────── */}
        <main
          className="flex-1 flex items-center justify-center overflow-hidden p-4 relative"
          onMouseMove={handleMouseMove}
        >
          <div
            className="relative h-full flex items-center justify-center"
            style={{ maxHeight: 'calc(100vh - 56px)', aspectRatio: '300/620' }}
          >
            <BodySVG
              parts={currentParts}
              view={activeView}
              hoveredPartId={hoveredPartId}
              selectedPartId={selectedPartId}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />

            {/* View label watermark */}
            <div className="absolute bottom-2 right-2 text-xs text-slate-600 capitalize select-none pointer-events-none">
              {activeView} view
            </div>
          </div>
        </main>

        {/* ─── Right Info Panel (md+) ────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-shrink-0 w-64 border-l flex-col p-4 overflow-y-auto space-y-4"
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background: 'rgba(15,23,42,0.6)',
          }}
        >
          {hoveredPart || selectedPart ? (
            (() => {
              const part = selectedPart ?? hoveredPart!;
              return (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: part.highlightColor, boxShadow: `0 0 6px ${part.highlightColor}` }}
                      />
                      <h3 className="font-semibold text-white text-sm">{part.name}</h3>
                    </div>
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: part.highlightColor }}
                    >
                      {part.system} system
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{part.briefDescription}</p>
                  {selectedPart && (
                    <div
                      className="rounded-xl p-3 text-xs text-slate-400 space-y-2"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${part.highlightColor}20` }}
                    >
                      <p className="font-medium" style={{ color: part.highlightColor }}>Function</p>
                      <p className="leading-relaxed line-clamp-4">{part.details.function}</p>
                    </div>
                  )}
                  {!selectedPart && (
                    <p className="text-xs text-slate-500 italic">Click to see full details</p>
                  )}
                  {selectedPart && (
                    <button
                      onClick={handleCloseModal}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors text-left"
                    >
                      ← Clear selection
                    </button>
                  )}
                </>
              );
            })()
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8 space-y-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `${systemColors.highlight}10`, border: `1px solid ${systemColors.highlight}20` }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={systemColors.highlight} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Hover over or click a body part to see information here</p>
            </div>
          )}
        </aside>
      </div>

      {/* ─── Tooltip ──────────────────────────────────────────────── */}
      <Tooltip
        part={hoveredPart}
        x={tooltip.x}
        y={tooltip.y}
        visible={tooltip.visible && !selectedPartId}
      />

      {/* ─── Detail Modal ─────────────────────────────────────────── */}
      <DetailModal part={selectedPart} onClose={handleCloseModal} />
    </div>
  );
};

export default BodyViewer;
