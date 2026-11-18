import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { SERVICES } from '../data/siteData';
import { ServicesSection } from '../components/ServicesSection';
import {
  AnimatedCounter,
  MagneticButton,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import { PageRoute } from '../utils/siteLogic';

interface ServicesPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
  onEnquireService: (subject: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onEnquireService,
}) => {
  const totalCapabilities = SERVICES.reduce((acc, s) => acc + s.items.length, 0);

  const scrollToDivision = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-24 sm:pt-28">
      {/* Distinctive Engineering Divisions Header */}
      <section className="relative z-10 pt-8 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <ScrollReveal className="lg:col-span-8 space-y-4">
              <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
                <span className="h-px w-8 bg-gradient-to-r from-[#F5C451] to-[#22D3EE]" />
                <span>Engineering Divisions &amp; Technical Scope</span>
              </p>
              <h1 className="font-display font-extrabold text-white leading-[1.06] text-[clamp(2.25rem,4.7vw,4rem)]">
                Five Specialized Divisions.{' '}
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#F5C451] bg-clip-text text-transparent">
                  One Accountable Partner.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#D2E0F7] max-w-2xl leading-relaxed">
                From Extra Low Voltage security and 4K UHD SMATV to 33kV power distribution, GPON
                networking, certified structured cabling, and 24/7 preventive maintenance.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="lg:col-span-4">
              <SpotlightCard className="nimai-glass-violet rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="relative z-10">
                  <p className="font-display text-3xl font-extrabold text-[#22D3EE]">
                    <AnimatedCounter target={totalCapabilities} />
                  </p>
                  <p className="text-xs text-[#C7D7F2] mt-0.5">
                    Verified Engineering Capabilities
                  </p>
                </div>
                <div className="relative z-10 w-11 h-11 rounded-xl bg-[#F5C451]/15 border border-[#F5C451]/35 flex items-center justify-center text-[#F5C451]">
                  <Layers className="w-5 h-5" />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>

          {/* Division Quick-Jump Bar */}
          <div className="nimai-glass rounded-2xl p-2.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToDivision(service.id)}
                className="text-left px-3.5 py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#2A1463] hover:to-[#132968] border border-white/8 hover:border-cyan-300/45 transition-all cursor-pointer"
              >
                <span className="block font-mono text-[11px] text-[#F5C451]">
                  {service.number} · {service.items.length} ITEMS
                </span>
                <span className="block font-display text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">
                  {service.shortTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All 5 Distinctive Service Sections */}
      <ServicesSection onEnquireService={onEnquireService} />

      {/* Bottom Portfolio / Consultation Bridge */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SpotlightCard className="nimai-glass-cyan rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5C451]">
                  See Our Engineering In Action
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Explore 57 field-verified project photographs across Malaysia
                </h2>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-white nimai-glass hover:border-cyan-300/45 cursor-pointer"
                >
                  View Projects Gallery
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 cursor-pointer"
                >
                  <span>Request Site Quotation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
