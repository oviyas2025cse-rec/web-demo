import React, { useEffect, useState } from 'react';
import {
  Building2,
  Expand,
  Image as ImageIcon,
  Network,
  RotateCcw,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ORG_STRUCTURE, OrgDepartment } from '../data/siteData';
import { clampZoom } from '../utils/siteLogic';

const ACCENT_STYLES: Record<
  OrgDepartment['accent'],
  { border: string; badge: string; dot: string }
> = {
  cyan: {
    border: 'border-cyan-300/35 hover:border-cyan-300/70',
    badge: 'text-[#22D3EE] bg-[#22D3EE]/12 border-[#22D3EE]/30',
    dot: 'bg-[#22D3EE]',
  },
  violet: {
    border: 'border-violet-300/35 hover:border-violet-300/70',
    badge: 'text-[#C4B5FD] bg-[#8B5CF6]/16 border-[#A78BFA]/35',
    dot: 'bg-[#A78BFA]',
  },
  blue: {
    border: 'border-sky-300/35 hover:border-sky-300/70',
    badge: 'text-[#7DD3FC] bg-[#2563EB]/20 border-[#60A5FA]/35',
    dot: 'bg-[#38BDF8]',
  },
  teal: {
    border: 'border-teal-300/35 hover:border-teal-300/70',
    badge: 'text-[#5EEAD4] bg-[#14B8A6]/15 border-[#2DD4BF]/35',
    dot: 'bg-[#14B8A6]',
  },
};

export const OrganisationSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'interactive' | 'official'>('interactive');
  const [orientation, setOrientation] = useState<'landscape' | 'vertical'>('landscape');
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const chartSrc =
    orientation === 'landscape'
      ? '/assets/organisation/nimai-org-chart-desktop.png'
      : '/assets/organisation/nimai-org-chart-mobile.png';

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fullscreen]);

  return (
    <section
      id="organisation-chart"
      aria-label="NIMAI Engineering Organisation Chart"
      className="relative z-10 py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              Corporate Structure &amp; Governance
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Organisation Chart
            </h2>
            <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
              Structured around clear leadership accountability across Finance, Human Resource,
              Technical Engineering, and Sales &amp; Marketing to deliver responsive one-stop
              project execution.
            </p>
          </div>

          {/* Interactive vs Official Graphic Switcher */}
          <div className="inline-flex rounded-xl p-1.5 nimai-glass self-start lg:self-end">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] text-[#041024]'
                  : 'text-[#C8D8F3] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Interactive Structure</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('official')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'official'
                  ? 'bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] text-[#041024]'
                  : 'text-[#C8D8F3] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Official Chart Graphic</span>
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          <div className="nimai-glass-violet rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_65px_rgba(4,7,26,0.55)]">
            {/* Tier 1: Executive Leadership */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl p-6 text-center bg-gradient-to-b from-[#2A1463] to-[#111E56] border border-cyan-300/50 shadow-[0_14px_40px_rgba(34,211,238,0.2)]">
                <div className="mx-auto mb-3 w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-300/40 flex items-center justify-center text-[#22D3EE]">
                  <Building2 className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                  Executive Leadership
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {ORG_STRUCTURE.leadership.title}
                </h3>
                <p className="text-xs text-[#C7D7F2] mt-1.5">
                  {ORG_STRUCTURE.leadership.subtitle}
                </p>
              </div>

              {/* Vertical & Horizontal Connector Stem (Desktop) */}
              <div aria-hidden="true" className="w-0.5 h-8 bg-gradient-to-b from-[#22D3EE] to-[#818CF8]" />
              <div
                aria-hidden="true"
                className="hidden lg:block w-[76%] h-0.5 bg-gradient-to-r from-cyan-400/40 via-[#22D3EE]/80 to-teal-400/40"
              />
            </div>

            {/* Tier 2: Four Verified Departments & Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 lg:mt-0">
              {ORG_STRUCTURE.departments.map((dept) => {
                const style = ACCENT_STYLES[dept.accent];
                return (
                  <div key={dept.id} className="flex flex-col items-center">
                    <div
                      aria-hidden="true"
                      className="hidden lg:block w-0.5 h-7 bg-gradient-to-b from-[#38BDF8]/70 to-transparent"
                    />
                    <div
                      className={`w-full h-full rounded-2xl p-5 bg-[#0A1032]/88 border ${style.border} transition-all flex flex-col justify-start gap-5`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border ${style.badge}`}
                          >
                            <Users className="w-3 h-3" />
                            <span>{dept.roles.length} {dept.roles.length === 1 ? 'Role' : 'Roles'}</span>
                          </span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-white">
                          {dept.department}
                        </h4>
                        <p className="text-xs text-[#AEBFD9] leading-relaxed">
                          {dept.focus}
                        </p>
                      </div>

                      {/* Reporting Roles */}
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        {dept.roles.map((role) => (
                          <div
                            key={role}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/6 border border-white/10 text-sm font-medium text-[#EAF4FF]"
                          >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                            <span>{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="nimai-glass rounded-3xl p-5 sm:p-8 space-y-5">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div className="inline-flex rounded-xl p-1 bg-[#070B24] border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setOrientation('landscape');
                    setZoom(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    orientation === 'landscape'
                      ? 'bg-[#22D3EE] text-[#041024]'
                      : 'text-[#C8D8F3] hover:text-white'
                  }`}
                >
                  Landscape Chart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrientation('vertical');
                    setZoom(1);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    orientation === 'vertical'
                      ? 'bg-[#22D3EE] text-[#041024]'
                      : 'text-[#C8D8F3] hover:text-white'
                  }`}
                >
                  Vertical Chart
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => clampZoom(z - 0.25, 1, 2.5))}
                  aria-label="Zoom out chart"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-[#A5F3FC] w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => clampZoom(z + 0.25, 1, 2.5))}
                  aria-label="Zoom in chart"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  aria-label="Reset zoom"
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-300/35 text-xs font-semibold text-[#A5F3FC] cursor-pointer"
                >
                  <Expand className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white/95 p-4 sm:p-6 overflow-auto max-h-[580px] flex items-center justify-center">
              <img
                src={chartSrc}
                alt="Official NIMAI Engineering Organisation Chart"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
                className="max-w-full h-auto transition-transform duration-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal (Direct unmount — no AnimatePresence) */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen organisation chart"
          onClick={() => setFullscreen(false)}
          className="fixed inset-0 z-[80] bg-[#040618]/94 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-white rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-auto"
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              aria-label="Close full screen chart"
              className="sticky top-2 float-right z-10 w-10 h-10 rounded-xl bg-[#090F2D] text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={chartSrc}
              alt="Official NIMAI Engineering Organisation Chart Full Screen"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};
