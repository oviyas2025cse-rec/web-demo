import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

const INTRO_SESSION_KEY = 'nimai_royal_intro_seen_v1';

function shouldShowIntroInitially(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1') return false;
  } catch {
    // Ignore storage access errors in restricted iframes
  }
  return true;
}

export const BrandCrestIntro: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(shouldShowIntroInitially);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    if (!visible || prefersReduced) {
      if (prefersReduced && visible) setVisible(false);
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // Ignore storage access errors
    }

    const liftTimer = window.setTimeout(() => setLifting(true), 1450);
    const hideTimer = window.setTimeout(() => setVisible(false), 2150);

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible, prefersReduced]);

  const dismissNow = () => {
    setLifting(true);
    window.setTimeout(() => setVisible(false), 260);
  };

  if (!visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-label="NIMAI Engineering Royal Brand Reveal"
      initial={{ opacity: 1, y: 0 }}
      animate={lifting ? { opacity: 0, y: '-6%' } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-[#040717]"
    >
      {/* Imperial Sapphire & 24K Champagne-Gold Velvet Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(52% 44% at 50% 46%, rgba(232, 193, 90, 0.14) 0%, transparent 68%), radial-gradient(62% 55% at 50% 52%, rgba(26, 20, 74, 0.68) 0%, #040717 75%)',
        }}
      />

      {/* Gilded Architectural Perimeter Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 sm:inset-10 border border-[#E8C15A]/18 rounded-3xl"
      >
        <span className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#E8C15A]/75 rounded-tl-3xl" />
        <span className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-[#E8C15A]/75 rounded-tr-3xl" />
        <span className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-[#E8C15A]/75 rounded-bl-3xl" />
        <span className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#E8C15A]/75 rounded-br-3xl" />
      </div>

      {/* Central Sovereign Crest Reveal */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandLogo variant="intro" />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 h-px w-48 sm:w-64 bg-gradient-to-r from-transparent via-[#E8C15A] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-lg sm:text-xl tracking-[0.22em] text-[#F5DC93] uppercase"
        >
          Engineering Sovereign Infrastructure
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="mt-2 text-xs font-mono tracking-[0.22em] text-[#9BB7DF]"
        >
          ELV SYSTEMS · M&amp;E ENGINEERING · JOHOR BAHRU
        </motion.p>
      </div>

      {/* Instant Skip Control */}
      <button
        type="button"
        onClick={dismissNow}
        className="absolute bottom-10 right-10 z-20 px-4 py-2 rounded-lg text-xs font-mono tracking-[0.16em] uppercase text-[#E8C15A] hover:text-white bg-white/5 hover:bg-white/10 border border-[#E8C15A]/30 transition-colors cursor-pointer"
      >
        Enter Site
      </button>
    </motion.div>
  );
};
