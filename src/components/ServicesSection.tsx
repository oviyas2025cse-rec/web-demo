import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Radio,
  Zap,
  Network,
  Cable,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES, ServiceCategory } from '../data/siteData';
import { ServiceDiagram } from './ServiceDiagrams';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  onEnquireService: (subject: string) => void;
}

const DIVISION_ICONS = {
  elv: Radio,
  electrical: Zap,
  it: Network,
  cabling: Cable,
  maintenance: ShieldCheck,
};

const ExpandableItemList: React.FC<{
  service: ServiceCategory;
  columns?: 1 | 2;
}> = ({ service, columns = 1 }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className={
        columns === 2
          ? 'grid grid-cols-1 md:grid-cols-2 gap-3'
          : 'space-y-2.5'
      }
    >
      {service.items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.title}
            className={`rounded-xl border transition-all ${
              isOpen
                ? 'bg-[#12194A]/90 border-cyan-300/45 shadow-[0_8px_28px_rgba(34,211,238,0.12)]'
                : 'bg-[#0B1033]/70 border-white/10 hover:border-white/25'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isOpen ? 'text-[#22D3EE]' : 'text-[#818CF8]'
                  }`}
                />
                <span className="text-sm font-medium text-white leading-snug">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 shrink-0 mt-0.5 text-[#9BB4DB] transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#22D3EE]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pl-11 text-xs sm:text-sm text-[#C7D7F2] leading-relaxed border-t border-white/8 pt-2.5">
                {item.detail}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnquireService }) => {
  const [elv, electrical, it, cabling, maintenance] = SERVICES;

  const renderHeader = (service: ServiceCategory) => {
    const Icon = DIVISION_ICONS[service.diagramType];
    return (
      <div className="space-y-3">
        <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#161B4D] border border-cyan-300/30">
            <Icon className="w-4 h-4 text-[#22D3EE]" />
          </span>
          <span>
            Division {service.number} · {service.items.length} Core Capabilities
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
          {service.title}
        </h2>
        <p className="text-sm font-medium text-[#A5F3FC]">{service.tagline}</p>
        <p className="text-sm sm:text-base text-[#C7D6F0] leading-relaxed max-w-2xl">
          {service.summary}
        </p>
      </div>
    );
  };

  return (
    <div className="relative z-10 space-y-16 lg:space-y-24 pb-24">
      {/* 01 — ELV SYSTEMS: Editorial Split with Stacked Photography + Interactive Accordion */}
      <section id={elv.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nimai-glass-violet rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_24px_70px_rgba(4,7,26,0.55)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {renderHeader(elv)}

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 rounded-2xl overflow-hidden border border-cyan-300/20 aspect-[4/3]">
                  <ResilientImage
                    src={elv.image}
                    alt={elv.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {elv.secondaryImage && (
                  <div className="col-span-4 rounded-2xl overflow-hidden border border-white/15 aspect-[2/3]">
                    <ResilientImage
                      src={elv.secondaryImage}
                      alt="HEADEND TV System Installation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <ServiceDiagram type="elv" />

              <button
                type="button"
                onClick={() => onEnquireService(`Enquiry: ${elv.title}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 shadow-[0_8px_24px_rgba(34,211,238,0.28)] transition-all cursor-pointer"
              >
                <span>Enquire About ELV Systems</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9BB4DB] mb-4">
                Complete ELV Scope (12 Verified Systems)
              </p>
              <ExpandableItemList service={elv} />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — ELECTRICAL & MECHANICAL: Full-Bleed Atmospheric Banner + 2-Column Power Grid */}
      <section id={electrical.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-cyan-300/20 bg-[#080E2B]/90 shadow-[0_24px_70px_rgba(4,7,26,0.6)]">
          {/* Cinematic Top Banner */}
          <div className="relative min-h-[290px] p-6 sm:p-10 lg:p-12 flex flex-col justify-end overflow-hidden">
            <ResilientImage
              src={electrical.image}
              alt={electrical.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A22]/96 via-[#141145]/86 to-[#08163A]/68" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">{renderHeader(electrical)}</div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => onEnquireService(`Enquiry: ${electrical.title}`)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] hover:brightness-110 transition-all cursor-pointer"
                >
                  <span>Request M&amp;E Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-12 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <ServiceDiagram type="electrical" />
              </div>
              {electrical.secondaryImage && (
                <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/15 aspect-[16/10]">
                  <ResilientImage
                    src={electrical.secondaryImage}
                    alt="External Solar Lighting Field Installation"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <ExpandableItemList service={electrical} columns={2} />
          </div>
        </div>
      </section>

      {/* 03 — IT SERVICES: Reversed Royal-Purple Split + Dual Field Photos */}
      <section id={it.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nimai-glass-cyan rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_24px_70px_rgba(4,7,26,0.55)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              {renderHeader(it)}
              <ExpandableItemList service={it} />
              <button
                type="button"
                onClick={() => onEnquireService(`Enquiry: ${it.title}`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Enquire About IT &amp; GPON Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden border border-cyan-300/20 aspect-[4/3]">
                  <ResilientImage
                    src={it.image}
                    alt={it.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {it.secondaryImage && (
                  <div className="rounded-2xl overflow-hidden border border-white/15 aspect-[4/3]">
                    <ResilientImage
                      src={it.secondaryImage}
                      alt="NIMAI Server & Vault Workstation Setup"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <ServiceDiagram type="it" />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — STRUCTURED CABLING: Precision Architectural Editorial Grid */}
      <section id={cabling.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nimai-glass rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_24px_70px_rgba(4,7,26,0.55)] space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              {renderHeader(cabling)}
              <button
                type="button"
                onClick={() => onEnquireService(`Enquiry: ${cabling.title}`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Schedule Cabling Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-cyan-300/20 aspect-[4/3]">
                <ResilientImage
                  src={cabling.image}
                  alt={cabling.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              {cabling.secondaryImage && (
                <div className="rounded-2xl overflow-hidden border border-white/15 aspect-[4/3]">
                  <ResilientImage
                    src={cabling.secondaryImage}
                    alt="Structured Cable Testing and Certification"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-white/10">
            <div className="lg:col-span-7">
              <ExpandableItemList service={cabling} />
            </div>
            <div className="lg:col-span-5">
              <ServiceDiagram type="cabling" />
            </div>
          </div>
        </div>
      </section>

      {/* 05 — PREVENTIVE MAINTENANCE: 24/7 SLA Assurance Showcase */}
      <section id={maintenance.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-6 sm:p-8 lg:p-12 border border-cyan-300/25 shadow-[0_24px_70px_rgba(4,7,26,0.6)]"
          style={{
            background:
              'linear-gradient(135deg, rgba(35, 16, 86, 0.88) 0%, rgba(11, 29, 77, 0.92) 55%, rgba(8, 49, 76, 0.86) 100%)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-6">
              {renderHeader(maintenance)}
              <ExpandableItemList service={maintenance} />
              <button
                type="button"
                onClick={() => onEnquireService(`Enquiry: ${maintenance.title}`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#14B8A6] hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Request 24/7 Maintenance SLA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-cyan-300/25 aspect-[4/3]">
                  <ResilientImage
                    src={maintenance.image}
                    alt={maintenance.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {maintenance.secondaryImage && (
                  <div className="rounded-2xl overflow-hidden border border-white/15 aspect-[4/3]">
                    <ResilientImage
                      src={maintenance.secondaryImage}
                      alt="Barrier Gate Replacement and Commissioning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <ServiceDiagram type="maintenance" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
