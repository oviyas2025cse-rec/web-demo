import React from 'react';
import { ArrowRight, Award, Radio, ShieldCheck, Zap } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/siteData';
import { VisionMissionSection } from '../components/VisionMissionSection';
import { CoreValuesSection } from '../components/CoreValuesSection';
import { OrganisationSection } from '../components/OrganisationSection';
import { PartnersSection } from '../components/PartnersSection';
import { ResilientImage } from '../components/ResilientImage';
import {
  MagneticButton,
  ParallaxFrame,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import { PageRoute } from '../utils/siteLogic';

interface AboutPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-28">
      {/* 1. Editorial Magazine Hero Banner */}
      <section className="relative z-10 pt-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
                <span className="h-px w-8 bg-gradient-to-r from-[#F5C451] to-[#22D3EE]" />
                <span>{ABOUT_CONTENT.eyebrow}</span>
              </p>

              <h1 className="font-display font-extrabold text-white leading-[1.08] text-[clamp(2.2rem,4.5vw,3.9rem)]">
                {ABOUT_CONTENT.heading}
              </h1>

              <p className="text-base sm:text-lg text-[#DCE8FB] leading-relaxed">
                {ABOUT_CONTENT.leadParagraph}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {ABOUT_CONTENT.highlights.map((item) => (
                  <SpotlightCard key={item.label} className="nimai-glass rounded-2xl p-4">
                    <p className="relative z-10 font-display text-xl sm:text-2xl font-bold text-[#22D3EE]">
                      {item.metric}{' '}
                      <span className="text-sm font-mono text-[#F5C451]">{item.suffix}</span>
                    </p>
                    <p className="relative z-10 text-xs text-[#C2D2EE] mt-1 leading-snug">
                      {item.label}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </ScrollReveal>

            {/* Layered Authentic Photography with Scroll Parallax */}
            <ScrollReveal delay={0.08} className="lg:col-span-6">
              <div className="relative grid grid-cols-12 gap-4">
                <ParallaxFrame
                  offset={22}
                  className="col-span-12 rounded-3xl border border-cyan-300/25 shadow-[0_24px_60px_rgba(4,7,26,0.68)] aspect-[16/10]"
                >
                  <ResilientImage
                    src="/assets/about/passionate-team.jpg"
                    alt="NIMAI Engineering Passionate Team"
                    className="w-full h-full object-cover"
                  />
                </ParallaxFrame>
                <div className="col-span-6 rounded-2xl overflow-hidden border border-white/15 aspect-[16/10]">
                  <ResilientImage
                    src="/assets/services/elv-system.jpg"
                    alt="ELV System Integration Expertise"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="col-span-6 rounded-2xl overflow-hidden border border-white/15 aspect-[16/10]">
                  <ResilientImage
                    src="/assets/projects/Legoland_de_Entrance.jpg"
                    alt="Commercial Engineering Site Delivery"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Complete Preserved Company Narrative & Technical Scope */}
      <section className="relative z-10 py-16 lg:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ScrollReveal className="lg:col-span-4 space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#F5C451]">
                Engineering Scope &amp; Heritage
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                Understanding ELV &amp; One-Stop M&amp;E Integration
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {ABOUT_CONTENT.paragraphs.map((para, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.06}>
                  <SpotlightCard className="h-full nimai-glass rounded-2xl p-6 space-y-3 hover:border-cyan-300/40 transition-colors">
                    <span className="relative z-10 font-mono text-xs text-[#F5C451]">
                      0{idx + 1}
                    </span>
                    <p className="relative z-10 text-sm sm:text-[15px] text-[#D6E4FA] leading-relaxed">
                      {para}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Key Credentials Band */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ScrollReveal delay={0.04}>
              <SpotlightCard className="h-full nimai-glass-violet rounded-2xl p-6 flex items-start gap-4">
                <span className="relative z-10 w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-300/35 flex items-center justify-center text-[#C4B5FD] shrink-0">
                  <Radio className="w-5 h-5" />
                </span>
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-white text-base">
                    Registered Astro Retailer &amp; Installer
                  </h3>
                  <p className="text-xs text-[#C7D7F2] mt-1 leading-relaxed">
                    End-to-end Astro registration, DCSS 4K UHD SMATV upgrades, installation, and
                    relocation services.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <SpotlightCard className="h-full nimai-glass-cyan rounded-2xl p-6 flex items-start gap-4">
                <span className="relative z-10 w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-300/35 flex items-center justify-center text-[#22D3EE] shrink-0">
                  <Zap className="w-5 h-5" />
                </span>
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-white text-base">
                    20+ Years M&amp;E Engineering
                  </h3>
                  <p className="text-xs text-[#C7D7F2] mt-1 leading-relaxed">
                    High-voltage 11kV &amp; 33kV distribution, earthing, lightning protection, and
                    energy-saving engineering.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <SpotlightCard className="h-full nimai-glass-gold rounded-2xl p-6 flex items-start gap-4">
                <span className="relative z-10 w-11 h-11 rounded-xl bg-[#F5C451]/15 border border-[#F5C451]/35 flex items-center justify-center text-[#F5C451] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-white text-base">
                    One-Stop Lifecycle Delivery
                  </h3>
                  <p className="text-xs text-[#C7D7F2] mt-1 leading-relaxed">
                    Eliminating multi-vendor coordination burden from conceptual design to 24/7
                    preventive maintenance.
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission */}
      <VisionMissionSection />

      {/* 4. Core Values */}
      <CoreValuesSection />

      {/* 5. Upgraded Interactive & Official Organisation Chart */}
      <OrganisationSection />

      {/* 6. Global Technology Partners */}
      <PartnersSection />

      {/* 7. Bottom CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SpotlightCard className="nimai-glass-violet rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#F5C451]">
                  <Award className="w-4 h-4" />
                  <span>Partner with NIMAI Engineering</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Ready to plan an integrated ELV or M&amp;E upgrade?
                </h2>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-white nimai-glass hover:border-cyan-300/45 cursor-pointer"
                >
                  Explore Services
                </MagneticButton>
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 cursor-pointer"
                >
                  <span>Contact Our Team</span>
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
