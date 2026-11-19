import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/siteData';
import { PageRoute, wrapIndex } from '../utils/siteLogic';
import { MagneticButton, RoyalTiltCard } from './MotionPrimitives';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SLIDE_DURATION_MS = 6500;

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev, 1, HERO_SLIDES.length));
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handleStep = (delta: number) => {
    setActiveIndex((prev) => wrapIndex(prev, delta, HERO_SLIDES.length));
  };

  /* Pointer-responsive layered parallax depth (pure CSS variables, zero re-renders) */
  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty('--hero-px', `${(nx * -18).toFixed(1)}px`);
    heroRef.current.style.setProperty('--hero-py', `${(ny * -14).toFixed(1)}px`);
    heroRef.current.style.setProperty('--card-px', `${(nx * 9).toFixed(1)}px`);
    heroRef.current.style.setProperty('--card-py', `${(ny * 7).toFixed(1)}px`);
  };

  const handlePointerLeave = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty('--hero-px', '0px');
    heroRef.current.style.setProperty('--hero-py', '0px');
    heroRef.current.style.setProperty('--card-px', '0px');
    heroRef.current.style.setProperty('--card-py', '0px');
  };

  const scrollPastHero = () => {
    const next = document.getElementById('home-intro');
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      aria-label="NIMAI Engineering Hero Showcase"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-16"
    >
      {/* Background Crossfade Slides with Pointer Parallax Depth (Pure CSS transitions for React 19 reliability) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#040717]">
        <div
          className="absolute -inset-6 transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: 'translate3d(var(--hero-px, 0px), var(--hero-py, 0px), 0)',
          }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-[1]'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <picture>
                  {slide.mobileImage && (
                    <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                  )}
                  <img
                    src={slide.image}
                    alt={slide.focusSystem}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>
            );
          })}
        </div>

        {/* Imperial Velvet-Sapphire & 24K Gold Cinematic Contrast Scrims (Strictly z-[2] above active slide) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-r from-[#040618]/97 via-[#0D0B30]/84 to-[#05102C]/62"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-t from-[#040717] via-transparent to-[#05081D]/78"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-60"
          style={{
            background:
              'radial-gradient(48% 42% at 78% 24%, rgba(232, 193, 90, 0.2) 0%, transparent 68%), radial-gradient(45% 45% at 15% 75%, rgba(88, 28, 135, 0.34) 0%, transparent 72%), radial-gradient(38% 32% at 54% 16%, rgba(56, 189, 248, 0.14) 0%, transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-[2] bg-engineering-grid opacity-30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Sovereign Editorial Statement */}
          <div className="lg:col-span-7 xl:col-span-7">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.18em] text-[#F2D37D]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="h-[1.5px] w-12 bg-gradient-to-r from-[#E8C15A] via-[#F8DF94] to-transparent"
                />
                <span>{activeSlide.kicker}</span>
              </div>

              <h1 className="font-display font-bold tracking-tight text-white leading-[1.03] text-[clamp(2.65rem,5.4vw,4.95rem)]">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {activeSlide.headlineLine1}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="block nimai-gold-text italic font-semibold"
                  >
                    {activeSlide.headlineLine2}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="text-base sm:text-lg lg:text-[1.125rem] text-[#D7E4F8] max-w-2xl leading-relaxed font-normal"
              >
                {activeSlide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="pt-2 flex flex-wrap items-center gap-4"
              >
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="nimai-btn-royal group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base whitespace-nowrap cursor-pointer"
                >
                  <span>Explore Engineering Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>

                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#F5E6B8] nimai-glass-gold hover:border-[#E8C15A]/75 hover:text-white whitespace-nowrap cursor-pointer"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C15A] transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Right 3D Pointer-Responsive Royal Sovereign Brand & Showcase Vault (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
            <div
              className="transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: 'translate3d(var(--card-px, 0px), var(--card-py, 0px), 0)',
              }}
            >
              <RoyalTiltCard
                maxTilt={4.5}
                className="relative nimai-glass-gold rounded-3xl p-7 xl:p-8 shadow-[0_32px_84px_rgba(2,5,18,0.82)] space-y-5"
              >
                {/* Gilded Architectural Corner Brackets */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-[#E8C15A]/65 rounded-tl-xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-[#E8C15A]/65 rounded-tr-xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-[#E8C15A]/65 rounded-bl-xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-[#E8C15A]/65 rounded-br-xl"
                />

                {/* Sovereign Brand Crest Lockup + Slide Index */}
                <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-[#E8C15A]/20">
                  <div className="group inline-flex items-center">
                    <BrandLogo variant="hero" />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] font-mono tracking-[0.18em] text-[#E8C15A] uppercase">
                      Showcase
                    </p>
                    <p className="font-mono text-sm font-semibold text-white tabular-nums mt-0.5">
                      0{activeIndex + 1} / 0{HERO_SLIDES.length}
                    </p>
                  </div>
                </div>

                <motion.div
                  key={`frame-${activeSlide.id}`}
                  initial={{ opacity: 0.45, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 rounded-2xl overflow-hidden aspect-[16/10] border border-[#E8C15A]/30 shadow-inner"
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.focusSystem}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081B]/92 via-[#05081B]/25 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <p className="font-display text-xl font-semibold text-white leading-snug">
                      {activeSlide.focusSystem}
                    </p>
                  </div>
                </motion.div>

                <p className="relative z-10 text-xs sm:text-[13px] text-[#CDDDF5] leading-relaxed">
                  {activeSlide.tagLine}
                </p>

                <div className="relative z-10 grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div>
                    <p className="font-display text-2xl font-bold text-[#F8DF94] tabular-nums">
                      20+
                    </p>
                    <p className="text-[11px] text-[#AEC3E4]">Years ELV &amp; M&amp;E</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-white tabular-nums">35</p>
                    <p className="text-[11px] text-[#AEC3E4]">Core Systems</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-[#7DD3FC] tabular-nums">
                      24/7
                    </p>
                    <p className="text-[11px] text-[#AEC3E4]">SLA Support</p>
                  </div>
                </div>
              </RoyalTiltCard>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glassmorphic Slide, Credential & Progress Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden nimai-glass rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
          {/* Animated Gold Progress Hairline along top of control rail */}
          {!paused && (
            <motion.div
              key={`progress-${activeIndex}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_DURATION_MS / 1000, ease: 'linear' }}
              style={{ transformOrigin: '0% 50%' }}
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C4922B] via-[#F8DF94] to-[#38BDF8]"
            />
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#D3E2FA]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E8C15A] shrink-0" />
              <span>Registered Astro Retailer &amp; 4K UHD SMATV Installer</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-[#E8C15A]/55">
              ·
            </span>
            <span className="hidden sm:inline text-[#C2D4F0]">
              57 Verified Field Installations · 20 Global Partners
            </span>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              type="button"
              onClick={scrollPastHero}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider text-[#F2D37D] hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
            >
              <span>Scroll</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#E8C15A]" />
            </button>

            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View slide ${idx + 1}: ${slide.focusSystem}`}
                  aria-pressed={idx === activeIndex}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'w-9 bg-gradient-to-r from-[#C4922B] via-[#F8DF94] to-[#38BDF8]'
                      : 'w-2.5 bg-white/30 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Previous hero slide"
              className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/14 border border-[#E8C15A]/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Next hero slide"
              className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/14 border border-[#E8C15A]/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/14 border border-[#E8C15A]/25 flex items-center justify-center text-[#F8DF94] transition-colors cursor-pointer"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
