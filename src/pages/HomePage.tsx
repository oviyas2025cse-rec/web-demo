import React from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { SmartBuildingViz } from '../components/SmartBuildingViz';
import { PartnersSection } from '../components/PartnersSection';
import { ContactSection } from '../components/ContactSection';
import { ResilientImage } from '../components/ResilientImage';
import {
  AnimatedCounter,
  MagneticButton,
  ParallaxFrame,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import {
  ABOUT_CONTENT,
  ECOSYSTEM_SECTORS,
  PARTNERS,
  PROJECTS,
  SERVICES,
  WHY_CHOOSE_NIMAI,
  ProjectCategoryFilter,
} from '../data/siteData';
import { PageRoute } from '../utils/siteLogic';

interface HomePageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
  onSelectProjectSector: (category: ProjectCategoryFilter) => void;
  onEnquireTopic: (subject: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProjectSector,
  onEnquireTopic,
}) => {
  const totalCapabilities = SERVICES.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div>
      {/* 1. Full-Viewport Kinetic Hero Showcase */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Company Introduction with Authentic Team Photography & Parallax Depth */}
      <section id="home-intro" className="relative z-10 py-20 lg:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Layered Authentic Photography with Scroll-Linked Parallax */}
            <ScrollReveal className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 gap-4 items-end">
                <ParallaxFrame
                  offset={20}
                  className="col-span-8 rounded-3xl border border-cyan-300/25 shadow-[0_24px_60px_rgba(4,7,26,0.68)] aspect-[4/3]"
                >
                  <ResilientImage
                    src="/assets/about/passionate-team.jpg"
                    alt="NIMAI Engineering Passionate Team"
                    className="w-full h-full object-cover"
                  />
                </ParallaxFrame>
                <ParallaxFrame
                  offset={28}
                  className="col-span-4 rounded-2xl border border-[#F5C451]/30 shadow-[0_18px_45px_rgba(4,7,26,0.62)] aspect-[3/4]"
                >
                  <ResilientImage
                    src="/assets/projects/Afiniti-Medini-Iskandar-Puteri-Nusajaya-Malaysia.jpg"
                    alt="Afiniti Medini Iskandar Puteri Project Site"
                    className="w-full h-full object-cover"
                  />
                </ParallaxFrame>
              </div>

              {/* Animated Verified Metrics Strip */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <SpotlightCard className="nimai-glass rounded-xl p-3.5 text-left">
                  <p className="relative z-10 font-display text-xl sm:text-2xl font-bold text-[#22D3EE]">
                    <AnimatedCounter target={20} suffix="+" />
                  </p>
                  <p className="relative z-10 text-[11px] text-[#B8C7E4] leading-snug mt-0.5">
                    Years ELV &amp; M&amp;E Experience
                  </p>
                </SpotlightCard>
                <SpotlightCard className="nimai-glass rounded-xl p-3.5 text-left">
                  <p className="relative z-10 font-display text-xl sm:text-2xl font-bold text-[#F5C451]">
                    <AnimatedCounter target={totalCapabilities} />
                  </p>
                  <p className="relative z-10 text-[11px] text-[#B8C7E4] leading-snug mt-0.5">
                    Verified Engineering Systems
                  </p>
                </SpotlightCard>
                <SpotlightCard className="nimai-glass rounded-xl p-3.5 text-left">
                  <p className="relative z-10 font-display text-xl sm:text-2xl font-bold text-white">
                    <AnimatedCounter target={PROJECTS.length} />
                  </p>
                  <p className="relative z-10 text-[11px] text-[#B8C7E4] leading-snug mt-0.5">
                    Verified Site Photographs
                  </p>
                </SpotlightCard>
                <SpotlightCard className="nimai-glass rounded-xl p-3.5 text-left">
                  <p className="relative z-10 font-display text-xl sm:text-2xl font-bold text-[#22D3EE]">
                    <AnimatedCounter target={PARTNERS.length} />
                  </p>
                  <p className="relative z-10 text-[11px] text-[#B8C7E4] leading-snug mt-0.5">
                    Global Brand Partners
                  </p>
                </SpotlightCard>
              </div>
            </ScrollReveal>

            {/* Editorial Narrative */}
            <ScrollReveal delay={0.1} className="lg:col-span-6 space-y-6">
              <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
                <span className="h-px w-6 bg-[#F5C451]" />
                <span>{ABOUT_CONTENT.eyebrow}</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white leading-tight">
                {ABOUT_CONTENT.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#DCE8FB] leading-relaxed">
                {ABOUT_CONTENT.leadParagraph}
              </p>
              <p className="text-sm sm:text-base text-[#BBD0EC] leading-relaxed">
                {ABOUT_CONTENT.paragraphs[3]}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'ELV System & Integration (<50V AC / <120V DC)',
                  'Registered Astro Retailer & 4K UHD Installer',
                  '20+ Years Electrical & Mechanical Engineering',
                  'One-Stop Design, Execution & 24/7 Care',
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#D6E4FA]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 shadow-[0_8px_24px_rgba(34,211,238,0.28)] cursor-pointer"
                >
                  <span>Discover Our Story &amp; Organisation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Five Core Engineering Divisions */}
      <CapabilitiesSection onNavigate={onNavigate} />

      {/* 4. Why Choose NIMAI — Authentic Engineering Pillars */}
      <section className="relative z-10 py-20 lg:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl space-y-3 mb-12">
            <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#F5C451]">
              <Sparkles className="w-4 h-4" />
              <span>Why Choose NIMAI Engineering</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Engineered for Reliability, Value &amp; Longevity
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE_NIMAI.map((pillar, idx) => (
              <ScrollReveal key={pillar.id} delay={idx * 0.07}>
                <SpotlightCard className="h-full nimai-glass-violet rounded-2xl p-6 flex flex-col justify-between gap-5 hover:border-[#F5C451]/45 transition-colors">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-[#F5C451]">
                      {pillar.index}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#22D3EE]/12 border border-[#22D3EE]/30 text-[#22D3EE]">
                      {pillar.metric}
                    </span>
                  </div>
                  <div className="relative z-10 space-y-2.5">
                    <h3 className="font-display text-lg font-bold text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#C7D7F2] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Smart-Building Architecture */}
      <SmartBuildingViz onNavigate={onNavigate} onEnquireSystem={onEnquireTopic} />

      {/* 6. Featured Field Projects by Sector */}
      <section className="relative z-10 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
                <span className="h-px w-6 bg-[#F5C451]" />
                <span>Field-Proven Engineering Portfolio</span>
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Delivered Across Landmark Developments
              </h2>
              <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
                Explore authentic installation photographs from hospitality, high-rise residential,
                healthcare, commercial retail, and corporate sites across Malaysia.
              </p>
            </div>

            <MagneticButton
              type="button"
              onClick={() => onSelectProjectSector('All')}
              className="group inline-flex items-center gap-2 self-start lg:self-end px-5 py-3 rounded-xl text-sm font-semibold text-white nimai-glass-violet hover:border-cyan-300/45 cursor-pointer"
            >
              <span>Browse All {PROJECTS.length} Project Photos</span>
              <ArrowUpRight className="w-4 h-4 text-[#22D3EE] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {ECOSYSTEM_SECTORS.map((sector, idx) => (
              <ScrollReveal
                key={sector.title}
                delay={idx * 0.06}
                className={idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}
              >
                <button
                  type="button"
                  onClick={() => onSelectProjectSector(sector.filterCategory)}
                  className={`group text-left relative w-full rounded-2xl overflow-hidden border border-white/12 hover:border-cyan-300/55 shadow-[0_18px_48px_rgba(4,7,26,0.55)] transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    idx < 2 ? 'min-h-[320px]' : 'min-h-[285px]'
                  }`}
                >
                  <ResilientImage
                    src={sector.image}
                    alt={sector.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06091F]/96 via-[#120F3D]/72 to-transparent" />

                  <div className="relative z-10 h-full p-6 flex flex-col justify-end gap-2">
                    <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#F5C451]">
                      {sector.filterCategory}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C8D8F3] line-clamp-2 leading-relaxed">
                      {sector.description}
                    </p>
                    <p className="pt-1 text-[11px] font-mono text-[#9BB4DB] line-clamp-1">
                      {sector.systems}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Global Partners Showcase */}
      <PartnersSection compact />

      {/* 8. Direct Consultation & Enquiry */}
      <ContactSection compactHeader />
    </div>
  );
};
