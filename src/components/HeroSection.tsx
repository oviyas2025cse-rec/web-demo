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
  Sparkles,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/siteData';
import { PageRoute, wrapIndex } from '../utils/siteLogic';
import { MagneticButton, SpotlightCard } from './MotionPrimitives';

interface HeroSectionProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev, 1, HERO_SLIDES.length));
    }, 6500);
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
    heroRef.current.style.setProperty('--card-px', `${(nx * 10).toFixed(1)}px`);
    heroRef.current.style.setProperty('--card-py', `${(ny * 8).toFixed(1)}px`);
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
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 pb-5 sm:pt-28 sm:pb-6"
    >
      {/* Background Crossfade Slides with Pointer Parallax Depth (Pure CSS transitions for React 19 reliability) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#06091F]">
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

        {/* Midnight Purple, Deep Navy & Subtle Gold Cinematic Contrast Scrims (Strictly z-[2] above active slide) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-r from-[#070720]/96 via-[#150D40]/82 to-[#071535]/58"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-gradient-to-t from-[#06091F] via-transparent to-[#080B26]/75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] opacity-50"
          style={{
            background:
              'radial-gradient(50% 45% at 78% 26%, rgba(34, 211, 238, 0.25) 0%, transparent 70%), radial-gradient(45% 45% at 15% 75%, rgba(124, 58, 237, 0.34) 0%, transparent 72%), radial-gradient(30% 25% at 52% 18%, rgba(245, 196, 81, 0.14) 0%, transparent 70%)',
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 z-[2] bg-engineering-grid opacity-30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="h-[2px] w-10 bg-gradient-to-r from-[#F5C451] via-[#22D3EE] to-transparent"
                />
                <span>{activeSlide.kicker}</span>
              </div>

              <h1 className="font-display font-extrabold tracking-tight text-white leading-[1.05] text-[clamp(2.35rem,5.4vw,4.75rem)]">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {activeSlide.headlineLine1}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.62, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="block bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#F5C451] bg-clip-text text-transparent"
                  >
                    {activeSlide.headlineLine2}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="text-base sm:text-lg lg:text-xl text-[#D4E2F9] max-w-2xl leading-relaxed font-normal"
              >
                {activeSlide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="pt-2 flex flex-wrap items-center gap-3.5"
              >
                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#041024] bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#60A5FA] hover:brightness-110 shadow-[0_10px_34px_rgba(34,211,238,0.36)] cursor-pointer"
                >
                  <span>Explore Engineering Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>

                <MagneticButton
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white nimai-glass-gold hover:border-[#F5C451]/60 hover:bg-white/12 cursor-pointer"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#F5C451] transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Pointer-Responsive Architectural Showcase Frame (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div
              className="transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: 'translate3d(var(--card-px, 0px), var(--card-py, 0px), 0)',
              }}
            >
              <SpotlightCard className="nimai-glass-violet rounded-2xl p-6 shadow-[0_28px_70px_rgba(4,7,26,0.72)] space-y-5">
                <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-[#A5F3FC]">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5C451]" />
                    <span>Active Showcase</span>
                  </span>
                  <span>
                    0{activeIndex + 1} / 0{HERO_SLIDES.length}
                  </span>
                </div>

                <motion.div
                  key={`frame-${activeSlide.id}`}
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55 }}
                  className="relative z-10 rounded-xl overflow-hidden aspect-[16/10] border border-cyan-300/25"
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.focusSystem}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C28]/88 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-display font-semibold text-white">
                      {activeSlide.focusSystem}
                    </p>
                  </div>
                </motion.div>

                <p className="relative z-10 text-xs text-[#C7D7F2] leading-relaxed">
                  {activeSlide.tagLine}
                </p>

                <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                  <div>
                    <p className="font-display text-xl font-bold text-white">20+</p>
                    <p className="text-[10px] text-[#A7BCE0]">Years ELV</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-[#F5C451]">35</p>
                    <p className="text-[10px] text-[#A7BCE0]">Systems</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-[#22D3EE]">24/7</p>
                    <p className="text-[10px] text-[#A7BCE0]">SLA Support</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glassmorphic Slide, Credential & Scroll Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="nimai-glass rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-[#CFE0FA]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5C451]" />
              <span>Registered Astro Retailer &amp; 4K UHD SMATV Installer</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              <span>57 Verified Field Installations · 20 Global Partners</span>
            </span>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={scrollPastHero}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider text-[#A5F3FC] hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
            >
              <span>Scroll</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#22D3EE]" />
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
                      ? 'w-8 bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#F5C451]'
                      : 'w-2.5 bg-white/30 hover:bg-white/55'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Previous hero slide"
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/16 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Next hero slide"
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/16 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/16 border border-white/15 flex items-center justify-center text-[#22D3EE] transition-colors cursor-pointer"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
