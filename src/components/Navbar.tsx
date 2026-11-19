import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';
import { MagneticButton } from './MotionPrimitives';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const NAV_ITEMS: { route: PageRoute; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About Us' },
  { route: 'services', label: 'Services' },
  { route: 'projects', label: 'Projects' },
  { route: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || currentRoute !== 'home'
          ? 'bg-[#040717]/90 backdrop-blur-2xl border-b border-[#E8C15A]/20 shadow-[0_14px_44px_rgba(2,4,16,0.75)]'
          : 'bg-gradient-to-b from-[#040717]/88 via-[#040717]/48 to-transparent backdrop-blur-md border-b border-white/6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-[88px] flex items-center justify-between gap-8">
        {/* Zone 1: Sovereign Transparent Gold & Sapphire NIMAI Brand Mark */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="NIMAI Engineering Home"
          className="group inline-flex items-center shrink-0 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C15A]"
        >
          <BrandLogo variant="navbar" />
        </a>

        {/* Zone 2: Clean 5-Page Single-Line Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={getPathForRoute(item.route)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F8DF94]'
                    : 'text-[#CEDBF2] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-rail"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#C4922B] via-[#F8DF94] to-[#38BDF8]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Royal CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigate('contact');
            }}
            className="nimai-btn-royal group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/6 border border-[#E8C15A]/25 text-[#F8DF94] hover:bg-white/12 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Responsive Mobile Navigation Overlay (Direct unmount — no AnimatePresence) */}
      {mobileOpen && (
        <motion.div
          id="mobile-nav-drawer"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden border-t border-[#E8C15A]/20 bg-[#05081B]/98 backdrop-blur-2xl shadow-2xl"
        >
          <nav aria-label="Mobile Navigation" className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1.5">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = currentRoute === item.route;
              return (
                <motion.a
                  key={item.route}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: idx * 0.04 }}
                  href={getPathForRoute(item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E1348] to-[#0E1E4E] text-[#F8DF94] border border-[#E8C15A]/35'
                      : 'text-[#C8D6F0] hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8C15A]">
                      Active
                    </span>
                  )}
                </motion.a>
              );
            })}

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="nimai-btn-royal flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.phoneHref}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-sm text-[#E2F1FF] bg-white/8 border border-white/15"
              >
                <Phone className="w-4 h-4 text-[#E8C15A]" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};
