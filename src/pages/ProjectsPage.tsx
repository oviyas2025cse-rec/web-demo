import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { PROJECTS, ProjectCategoryFilter } from '../data/siteData';
import { ProjectsSection } from '../components/ProjectsSection';
import { ResilientImage } from '../components/ResilientImage';
import {
  MagneticButton,
  ParallaxFrame,
  ScrollReveal,
  SpotlightCard,
} from '../components/MotionPrimitives';
import { PageRoute } from '../utils/siteLogic';

interface ProjectsPageProps {
  activeCategory: ProjectCategoryFilter;
  onCategoryChange: (category: ProjectCategoryFilter) => void;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  activeCategory,
  onCategoryChange,
  onNavigate,
}) => {
  return (
    <div className="pt-24 sm:pt-28">
      {/* Distinctive Portfolio Showcase Hero */}
      <section className="relative z-10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal className="lg:col-span-7 space-y-4">
              <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#F5C451]">
                <Camera className="w-4 h-4 text-[#22D3EE]" />
                <span>Verified Field Documentation · {PROJECTS.length} Photographs</span>
              </p>
              <h1 className="font-display font-extrabold text-white leading-[1.06] text-[clamp(2.25rem,4.7vw,4rem)]">
                Our Engineering{' '}
                <span className="bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#F5C451] bg-clip-text text-transparent">
                  Projects Portfolio
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#D2E0F7] max-w-2xl leading-relaxed">
                Authentic on-site photographs from hotels, resorts, condominiums, apartments,
                hospitals, shopping complexes, and corporate installations delivered by NIMAI
                Engineering.
              </p>
            </ScrollReveal>

            {/* Parallax Editorial Collage Preview */}
            <ScrollReveal delay={0.08} className="lg:col-span-5 grid grid-cols-3 gap-3">
              <ParallaxFrame
                offset={16}
                className="col-span-2 rounded-2xl border border-cyan-300/25 aspect-[16/10]"
              >
                <ResilientImage
                  src="/assets/projects/Legoland_de_Entrance.jpg"
                  alt="Shopping Complex & Attraction Engineering"
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
              <ParallaxFrame
                offset={22}
                className="col-span-1 rounded-2xl border border-[#F5C451]/30 aspect-[4/5]"
              >
                <ResilientImage
                  src="/assets/projects/HEADEND-TV-SYSTEM.jpg"
                  alt="SMATV Headend Installation"
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full Asymmetric Filterable Gallery & Lightbox */}
      <ProjectsSection
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Consultation Strip */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SpotlightCard className="nimai-glass-violet rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="relative z-10 space-y-2 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5C451]">
                  Plan Your Next Development
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Need an experienced ELV &amp; M&amp;E contractor for your property?
                </h2>
              </div>
              <MagneticButton
                type="button"
                onClick={() => onNavigate('contact')}
                className="relative z-10 group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 cursor-pointer shrink-0"
              >
                <span>Schedule a Site Survey</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
