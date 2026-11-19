import React from 'react';
import { ArrowUp, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/siteData';
import { PageRoute, getPathForRoute, buildRouteUrl } from '../utils/siteLogic';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const QUICK_LINKS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: 'home' },
  { label: 'About Us', route: 'about' },
  { label: 'Services', route: 'services' },
  { label: 'Projects Portfolio', route: 'projects' },
  { label: 'Contact Us', route: 'contact' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#030614]/96 border-t border-[#E8C15A]/20 text-[#B8C7E4]">
      {/* Luminous champagne-gold to sapphire top hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#E8C15A]/70 via-50% to-[#38BDF8]/45"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Summary with Sovereign Transparent Logo */}
          <div className="lg:col-span-4 space-y-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              aria-label="NIMAI Engineering Home"
              className="group inline-flex items-center rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C15A]"
            >
              <BrandLogo variant="footer" />
            </a>
            <div className="h-px w-24 bg-gradient-to-r from-[#E8C15A]/65 to-transparent" />
            <p className="text-sm leading-relaxed text-[#C2D1EC] max-w-sm">
              {COMPANY_INFO.footerSummary}
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#E8C15A]">
              {COMPANY_INFO.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F8DF94] mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.route}>
                  <a
                    href={getPathForRoute(link.route)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.route);
                    }}
                    className="text-[#B8C7E4] hover:text-[#22D3EE] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Divisions */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-4">
              Engineering Divisions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={buildRouteUrl('services', service.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('services', service.id);
                    }}
                    className="group inline-flex items-center gap-2 text-[#B8C7E4] hover:text-[#22D3EE] transition-colors"
                  >
                    <span className="font-mono text-[11px] text-[#F5C451]/80 group-hover:text-[#22D3EE]">
                      {service.number}
                    </span>
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-4">
              Johor Bahru Office
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                <a
                  href={COMPANY_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {COMPANY_INFO.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a href={COMPANY_INFO.phoneHref} className="hover:text-white transition-colors font-mono">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <a
                  href={COMPANY_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.websiteDisplay}
                </a>
              </li>
            </ul>

            <a
              href={COMPANY_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="nimai-btn-sheen inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#128C7E] to-[#0891B2] hover:brightness-110 border border-cyan-300/25 shadow-lg transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Engineering Desk</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 pb-8 sm:pb-2 sm:pr-40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA4CC]">
          <p>{COMPANY_INFO.copyright}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/6 hover:bg-white/12 border border-white/12 text-[#D9E6FA] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E8C15A]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
