import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Layers, Radio } from 'lucide-react';
import { BUILDING_HOTSPOTS, BuildingHotspot } from '../data/siteData';
import { PageRoute } from '../utils/siteLogic';

interface SmartBuildingVizProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
  onEnquireSystem?: (subject: string) => void;
}

export const SmartBuildingViz: React.FC<SmartBuildingVizProps> = ({
  onNavigate,
  onEnquireSystem,
}) => {
  const [selected, setSelected] = useState<BuildingHotspot>(BUILDING_HOTSPOTS[0]);

  return (
    <section
      id="smart-building-architecture"
      aria-label="Interactive Smart Building ELV Architecture"
      className="relative z-10 py-20 lg:py-28 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              Interactive ELV &amp; M&amp;E Architecture
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Inside a Connected Modern Development
            </h2>
            <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
              Select any of the 13 integrated building systems below to trace how NIMAI Engineering
              connects rooftop broadcast headends, optical backbones, IP security, access control,
              and standby power into a single manageable infrastructure.
            </p>
          </div>

          <div className="nimai-glass-violet rounded-xl px-4 py-3 text-xs text-[#D6E4FA] flex items-center gap-3 self-start lg:self-end">
            <Layers className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              Operating Scope: <strong className="text-white">&lt;50V AC &amp; &lt;120V DC ELV</strong> + HV/LV M&amp;E
            </span>
          </div>
        </div>

        {/* Main Architectural Blueprint + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Architectural SVG Schematic */}
          <div className="lg:col-span-8 nimai-glass-cyan rounded-2xl p-4 sm:p-6 relative overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 bg-engineering-grid-fine opacity-55" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#A5F3FC]">
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
                <span>Multi-Floor ELV Signal &amp; Power Topology</span>
              </div>
              <span className="text-xs font-mono text-[#9BB4DB]">13 Interactive Systems</span>
            </div>

            <div className="relative z-10 w-full overflow-hidden rounded-xl bg-[#050A21]/85 border border-cyan-300/15">
              <svg
                viewBox="0 0 820 480"
                role="img"
                aria-label="Interactive smart building cross-section showing 13 NIMAI Engineering systems"
                className="w-full h-auto block"
              >
                <defs>
                  <linearGradient id="towerGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B1D8F" stopOpacity="0.45" />
                    <stop offset="55%" stopColor="#14296B" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#091233" stopOpacity="0.72" />
                  </linearGradient>
                  <linearGradient id="spineGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>

                {/* Subtle horizon & basement slab */}
                <line x1="40" y1="392" x2="780" y2="392" stroke="rgba(148,197,255,0.22)" strokeWidth="1.5" />
                <rect x="140" y="392" width="540" height="58" rx="4" fill="rgba(14, 24, 62, 0.72)" stroke="rgba(56,189,248,0.24)" />

                {/* Main Building Envelope */}
                <rect x="180" y="96" width="460" height="296" rx="8" fill="url(#towerGlow)" stroke="rgba(125,211,252,0.34)" strokeWidth="1.5" />

                {/* Floor Slabs */}
                {[156, 216, 276, 336].map((y) => (
                  <line
                    key={y}
                    x1="180"
                    y1={y}
                    x2="640"
                    y2={y}
                    stroke="rgba(167,139,250,0.2)"
                    strokeDasharray="6 6"
                  />
                ))}

                {/* Rooftop Headend Mast & Dish */}
                <rect x="210" y="64" width="70" height="32" rx="4" fill="rgba(42,20,99,0.75)" stroke="rgba(34,211,238,0.4)" />
                <path d="M 235 64 L 245 44 L 255 64" fill="none" stroke="#22D3EE" strokeWidth="1.6" />
                <path d="M 232 48 Q 245 36 258 48" fill="none" stroke="#38BDF8" strokeWidth="1.5" />

                {/* Vehicle Entry / Parking Gate Wing */}
                <path d="M 640 392 L 730 392 L 730 436 L 640 436" fill="rgba(20, 32, 82, 0.5)" stroke="rgba(34,211,238,0.28)" />
                <line x1="652" y1="412" x2="706" y2="402" stroke="#22D3EE" strokeWidth="2.4" strokeLinecap="round" />

                {/* Central Fiber Riser Spine */}
                <line x1="420" y1="96" x2="420" y2="434" stroke="url(#spineGlow)" strokeWidth="3" strokeOpacity="0.65" />

                {/* Floor Zone Labels */}
                <text x="194" y="114" fill="#9BB4DB" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                  ROOFTOP &amp; COMMAND
                </text>
                <text x="194" y="174" fill="#9BB4DB" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                  SUITES &amp; COMMERCIAL FLOORS
                </text>
                <text x="194" y="234" fill="#9BB4DB" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                  IT CORE &amp; CONCOURSE
                </text>
                <text x="194" y="294" fill="#9BB4DB" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                  LOBBY &amp; SECURITY PERIMETER
                </text>
                <text x="154" y="438" fill="#7DD3FC" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                  HV/LV SWITCHROOM &amp; STANDBY UPS
                </text>

                {/* Passive Signal Lines */}
                {BUILDING_HOTSPOTS.map((spot) => (
                  <path
                    key={`path-${spot.id}`}
                    d={spot.signalPath}
                    fill="none"
                    stroke="rgba(125,211,252,0.16)"
                    strokeWidth="1.2"
                  />
                ))}

                {/* Active Animated Signal Path */}
                <path
                  d={selected.signalPath}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2.8"
                  className="animate-signal-flow"
                />

                {/* Interactive System Hotspots */}
                {BUILDING_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === selected.id;
                  return (
                    <g
                      key={spot.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${spot.label}`}
                      aria-pressed={isActive}
                      onClick={() => setSelected(spot)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelected(spot);
                        }
                      }}
                      className="cursor-pointer outline-none"
                    >
                      {isActive && (
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r="17"
                          fill="rgba(34,211,238,0.22)"
                          stroke="#22D3EE"
                          strokeWidth="1.5"
                          className="animate-hotspot-ring"
                        />
                      )}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isActive ? 10 : 7.5}
                        fill={isActive ? '#22D3EE' : '#1D1454'}
                        stroke={isActive ? '#FFFFFF' : '#38BDF8'}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                      <text
                        x={spot.x}
                        y={spot.y - 14}
                        textAnchor="middle"
                        fill={isActive ? '#FFFFFF' : '#BBD5F5'}
                        fontSize="10"
                        fontWeight={isActive ? '700' : '500'}
                        fontFamily="DM Sans, sans-serif"
                      >
                        {spot.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right System Details Inspector */}
          <div className="lg:col-span-4 nimai-glass-violet rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#22D3EE]">
                  <Radio className="w-4 h-4" />
                  <span>{selected.zone}</span>
                </span>
                <span className="text-xs font-mono text-[#A8BCE0]">
                  {selected.serviceName.split(' ')[0]}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-white leading-snug">
                  {selected.label}
                </h3>
                <p className="text-xs font-mono text-[#C4B5FD] uppercase tracking-wider">
                  Division: {selected.serviceName}
                </p>
                <p className="text-sm sm:text-[15px] text-[#D2E0F7] leading-relaxed">
                  {selected.description}
                </p>
              </div>
            </motion.div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('services', selected.serviceId)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Explore Full Service Specs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onEnquireSystem) {
                    onEnquireSystem(`Enquiry: ${selected.label}`);
                  } else {
                    onNavigate('contact');
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-[#E2F1FF] bg-white/8 hover:bg-white/14 border border-white/15 transition-colors cursor-pointer"
              >
                <span>Request Site Assessment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fast System Selector Strip */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BUILDING_HOTSPOTS.map((spot) => {
            const isActive = spot.id === selected.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setSelected(spot)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] text-[#041024] font-semibold shadow-[0_4px_16px_rgba(34,211,238,0.28)]'
                    : 'bg-white/6 hover:bg-white/12 text-[#C7D7F2] border border-white/10'
                }`}
              >
                {spot.shortLabel}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
