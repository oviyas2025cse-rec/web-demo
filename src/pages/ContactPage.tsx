import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { ContactSection } from '../components/ContactSection';
import { ScrollReveal, SpotlightCard } from '../components/MotionPrimitives';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface ContactPageProps {
  prefilledSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ prefilledSubject }) => {
  const quickChannels = [
    {
      label: 'Direct Engineering Line',
      value: COMPANY_INFO.phoneDisplay,
      href: COMPANY_INFO.phoneHref,
      icon: Phone,
      external: false,
    },
    {
      label: 'Official Email Desk',
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: 'Instant WhatsApp Support',
      value: 'Chat with NIMAI Engineers',
      href: COMPANY_INFO.whatsappHref,
      icon: WhatsAppIcon,
      external: true,
    },
    {
      label: 'Johor Bahru Headquarters',
      value: 'Pusat Bandar 6, Johor Bahru',
      href: COMPANY_INFO.mapsDirectionsUrl,
      icon: MapPin,
      external: true,
    },
  ];

  return (
    <div className="pt-24 sm:pt-28">
      {/* Distinctive Contact Hero & Quick Channels */}
      <section className="relative z-10 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="max-w-3xl space-y-4">
            <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              <span className="h-px w-8 bg-gradient-to-r from-[#F5C451] to-[#22D3EE]" />
              <span>Contact NIMAI Engineering · Johor Bahru</span>
            </p>
            <h1 className="font-display font-extrabold text-white leading-[1.06] text-[clamp(2.25rem,4.7vw,4rem)]">
              Let’s Engineer Your{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] via-[#7DD3FC] to-[#F5C451] bg-clip-text text-transparent">
                Next Project Together
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#D2E0F7] leading-relaxed">
              Reach out for site surveys, ELV &amp; Astro 4K UHD SMATV quotations, HV/LV electrical
              works, structured cabling certification, or 24/7 preventive maintenance agreements.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <ScrollReveal key={channel.label} delay={idx * 0.05}>
                  <SpotlightCard className="h-full nimai-glass rounded-2xl hover:border-cyan-300/50 transition-all">
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="relative z-10 group p-5 h-full flex flex-col justify-between gap-3"
                    >
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A1463] to-[#122866] border border-cyan-300/30 flex items-center justify-center text-[#22D3EE] group-hover:border-[#F5C451]/60 group-hover:scale-105 transition-all">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-wider text-[#9BB4DB]">
                          {channel.label}
                        </p>
                        <p className="text-sm font-semibold text-white mt-1 break-words group-hover:text-[#22D3EE] transition-colors">
                          {channel.value}
                        </p>
                      </div>
                    </a>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form + Map + Office Details */}
      <ContactSection prefilledSubject={prefilledSubject} />
    </div>
  );
};
