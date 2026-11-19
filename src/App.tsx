import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import { BrandCrestIntro } from './components/BrandCrestIntro';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/MotionPrimitives';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { COMPANY_INFO, ProjectCategoryFilter } from './data/siteData';
import {
  PageRoute,
  buildRouteUrl,
  getPageTitle,
  parseRouteFromPathname,
} from './utils/siteLogic';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    parseRouteFromPathname(window.location.pathname)
  );
  const [activeProjectCategory, setActiveProjectCategory] =
    useState<ProjectCategoryFilter>('All');
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');

  useEffect(() => {
    document.title = getPageTitle(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    const onPopState = () => {
      const next = parseRouteFromPathname(window.location.pathname);
      setCurrentRoute(next);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((route: PageRoute, hash?: string) => {
    const nextUrl = buildRouteUrl(route, hash);
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState({ route }, '', nextUrl);
    }
    setCurrentRoute(route);

    if (hash) {
      const targetId = hash.replace(/^#/, '');
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 60);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSelectProjectSector = useCallback(
    (category: ProjectCategoryFilter) => {
      setActiveProjectCategory(category);
      navigate('projects');
    },
    [navigate]
  );

  const handleEnquireTopic = useCallback(
    (subject: string) => {
      setPrefilledSubject(subject);
      navigate('contact');
    },
    [navigate]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#040717] text-white relative selection:bg-[#E8C15A]/30 selection:text-white">
      {/* First-Visit Sovereign Brand Crest Reveal (auto-bypassed via ?autostart=1 or reduced motion) */}
      <BrandCrestIntro />

      {/* Persistent Imperial Sapphire, Midnight Amethyst & 24K Gold Kinetic Backdrop */}
      <AmbientBackdrop />

      {/* Persistent Royal Glassmorphism Navigation + Molten-Gold Scroll Progress Rail */}
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />
      <ScrollProgressBar />

      {/* Five Distinctive Pages with Smooth Entrance-Only Transition (React 19 Safe) */}
      <main id="main-content" className="relative z-10 flex-1">
        <motion.div
          key={currentRoute}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentRoute === 'home' && (
            <HomePage
              onNavigate={navigate}
              onSelectProjectSector={handleSelectProjectSector}
              onEnquireTopic={handleEnquireTopic}
            />
          )}
          {currentRoute === 'about' && <AboutPage onNavigate={navigate} />}
          {currentRoute === 'services' && (
            <ServicesPage
              onNavigate={navigate}
              onEnquireService={handleEnquireTopic}
            />
          )}
          {currentRoute === 'projects' && (
            <ProjectsPage
              activeCategory={activeProjectCategory}
              onCategoryChange={setActiveProjectCategory}
              onNavigate={navigate}
            />
          )}
          {currentRoute === 'contact' && (
            <ContactPage prefilledSubject={prefilledSubject} />
          )}
        </motion.div>
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating WhatsApp Direct Desk with Genuine WhatsApp Vector Icon */}
      <a
        href={COMPANY_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NIMAI Engineering on WhatsApp"
        className="nimai-btn-sheen fixed bottom-5 right-4 sm:right-6 z-40 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0F766E] via-[#0D6B64] to-[#0B5D6B] hover:brightness-110 hover:-translate-y-0.5 border border-[#E8C15A]/45 shadow-[0_12px_34px_rgba(3,8,24,0.65)] transition-all"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}
