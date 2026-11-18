import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { PageRoute, getPathForRoute } from '../utils/siteLogic';
import { MagneticButton } from './MotionPrimitives';

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
          ? 'bg-[#090C28]/88 backdrop-blur-xl border-b border-cyan-300/18 shadow-[0_12px_40px_rgba(4,7,26,0.68)]'
          : 'bg-gradient-to-b from-[#070A22]/85 via-[#070A22]/45 to-transparent backdrop-blur-md border-b border-white/6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-6">
        {/* Zone 1: Authentic Original NIMAI Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          aria-label="NIMAI Engineering Home"
          className="group flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-lg"
        >
          <span className="inline-flex items-center rounded-lg bg-white/95 px-2.5 py-1.5 sm:px-3 sm:py-1.5 shadow-[0_4px_22px_rgba(34,211,238,0.2)] ring-1 ring-[#F5C451]/35 group-hover:ring-[#22D3EE]/75 transition-all">
            <img
              src="/assets/logo/logo-landscape.png"
              alt="NIMAI ENGINEERING"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </span>
        </a>

        {/* Zone 2: Primary 5-Page Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={getPathForRoute(item.route)}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.32)]'
                    : 'text-[#C8D6F0] hover:text-white hover:bg-white/6'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    aria-hidden="true"
                    className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#F5C451]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Magnetic Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={COMPANY_INFO.phoneHref}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-xs font-mono text-[#B8D4F5] hover:text-[#F5C451] transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>{COMPANY_INFO.phoneDisplay}</span>
          </a>

          <MagneticButton
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onNavigate('contact');
            }}
            className="group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#041024] bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#60A5FA] hover:brightness-110 shadow-[0_6px_24px_rgba(34,211,238,0.34)] whitespace-nowrap cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/8 border border-white/15 text-white hover:bg-white/15 transition-colors cursor-pointer"
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
          className="lg:hidden border-t border-cyan-300/18 bg-[#080B26]/97 backdrop-blur-2xl shadow-2xl"
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
                      ? 'bg-gradient-to-r from-[#1D0F47] to-[#12265E] text-white border border-cyan-300/35'
                      : 'text-[#C8D6F0] hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5C451]">
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
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8]"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.phoneHref}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-sm text-[#E2F1FF] bg-white/8 border border-white/15"
              >
                <Phone className="w-4 h-4 text-[#22D3EE]" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};
