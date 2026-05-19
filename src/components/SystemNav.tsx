import type { BodySystem, BodyView } from '../types/bodyPart';
import { SYSTEM_META } from '../types/bodyPart';

interface Props {
  activeSystem: BodySystem;
  activeView: BodyView;
  onSystemChange: (s: BodySystem) => void;
  onViewChange: (v: BodyView) => void;
}

const SYSTEMS: BodySystem[] = ['organs', 'muscles', 'skeleton', 'nervous'];

export default function SystemNav({
  activeSystem,
  activeView,
  onSystemChange,
  onViewChange,
}: Props) {
  return (
    <header className="flex items-center gap-3 px-6 py-3 bg-white border-b border-slate-200 shadow-sm flex-shrink-0 z-10">
      {/* Logo / title */}
      <span className="font-bold text-slate-700 text-base tracking-tight mr-2 whitespace-nowrap">
        Human Anatomy
      </span>

      {/* System tabs */}
      <nav className="flex items-center gap-1">
        {SYSTEMS.map((sys) => {
          const meta = SYSTEM_META[sys];
          const isActive = sys === activeSystem;
          return (
            <button
              key={sys}
              onClick={() => onSystemChange(sys)}
              className={[
                'system-btn px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all',
                isActive
                  ? `${meta.bg} ${meta.accent} ${meta.border} shadow-md`
                  : 'text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700',
              ].join(' ')}
            >
              {meta.label}
            </button>
          );
        })}
      </nav>

      {/* Front / Back toggle */}
      <div className="ml-auto flex items-center bg-slate-100 rounded-full p-1 gap-0.5">
        {(['front', 'back'] as BodyView[]).map((view) => (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
              activeView === view
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            ].join(' ')}
          >
            {view === 'front' ? 'Front View' : 'Back View'}
          </button>
        ))}
      </div>
    </header>
  );
}
