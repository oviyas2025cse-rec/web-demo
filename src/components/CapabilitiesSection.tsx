import React from 'react';
import { ArrowUpRight, Radio, Zap, Network, Cable, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/siteData';
import { PageRoute } from '../utils/siteLogic';
import { ResilientImage } from './ResilientImage';
import { MagneticButton, ScrollReveal, SpotlightCard } from './MotionPrimitives';

interface CapabilitiesSectionProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const ICONS = {
  elv: Radio,
  electrical: Zap,
  it: Network,
  cabling: Cable,
  maintenance: ShieldCheck,
};

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative z-10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              <span className="h-px w-6 bg-[#F5C451]" />
              <span>Five Core Engineering Divisions</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              One-Stop ELV, Power &amp; Technology Integration
            </h2>
          </div>

          <MagneticButton
            type="button"
            onClick={() => onNavigate('services')}
            className="group inline-flex items-center gap-2 self-start lg:self-end px-5 py-3 rounded-xl text-sm font-semibold text-white nimai-glass-cyan hover:border-cyan-300/55 cursor-pointer"
          >
            <span>View All 35 Engineering Capabilities</span>
            <ArrowUpRight className="w-4 h-4 text-[#22D3EE] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </ScrollReveal>

        {/* Asymmetric Interactive Bento Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.diagramType];
            const isPrimary = index < 2;
            return (
              <ScrollReveal
                key={service.id}
                delay={index * 0.06}
                className={isPrimary ? 'lg:col-span-3' : 'lg:col-span-2'}
              >
                <SpotlightCard className="h-full rounded-2xl border border-white/12 hover:border-cyan-300/50 shadow-[0_18px_45px_rgba(4,7,26,0.55)] transition-all duration-300 hover:-translate-y-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('services', service.id)}
                    className={`group text-left relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer ${
                      isPrimary ? 'min-h-[330px]' : 'min-h-[295px]'
                    }`}
                  >
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        index % 2 === 0
                          ? 'bg-gradient-to-t from-[#070922]/96 via-[#150F42]/82 to-[#090F2D]/45'
                          : 'bg-gradient-to-t from-[#060B24]/96 via-[#0C1D4E]/80 to-[#180E46]/45'
                      }`}
                    />

                    <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between gap-6">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0A1438]/85 border border-cyan-300/30 text-[#22D3EE] shadow-lg group-hover:border-[#F5C451]/60 transition-colors">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="font-mono text-xs tracking-[0.2em] text-[#F5C451]/90">
                          {service.number} · {service.items.length} SYSTEMS
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-[#C8D8F3] line-clamp-2 leading-relaxed">
                          {service.summary}
                        </p>
                        <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#22D3EE]">
                          <span>Inspect Division</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </button>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
