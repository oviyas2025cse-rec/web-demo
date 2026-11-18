import React, { useState } from 'react';
import { LayoutGrid, Play } from 'lucide-react';
import { PARTNERS } from '../data/siteData';

interface PartnersSectionProps {
  compact?: boolean;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ compact = false }) => {
  const [showGrid, setShowGrid] = useState(false);

  const rowOne = PARTNERS.slice(0, 10);
  const rowTwo = PARTNERS.slice(10, 20);

  return (
    <section
      id="partners"
      aria-label="Global Technology Partners"
      className={`relative z-10 ${compact ? 'py-16 lg:py-20' : 'py-20 lg:py-28'} border-y border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              Trusted Technology Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Our Partners &amp; Certified Brand Platforms
            </h2>
            <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
              We engineer residential and commercial projects using proven global brands across
              surveillance, access control, GPON networking, public address, structured cabling, and
              digital display systems.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowGrid((prev) => !prev)}
            className="inline-flex items-center gap-2 self-start md:self-end px-4 py-2.5 rounded-xl text-xs font-semibold text-white nimai-glass-violet hover:border-cyan-300/45 transition-all cursor-pointer"
          >
            {showGrid ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>Switch to Motion Showcase</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>View All 20 Partners Grid</span>
              </>
            )}
          </button>
        </div>

        {showGrid ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="nimai-glass rounded-2xl p-4 flex flex-col items-center justify-between gap-3 hover:border-cyan-300/45 transition-colors"
              >
                <div className="w-full h-16 rounded-xl bg-white/95 px-4 py-2.5 flex items-center justify-center shadow-inner">
                  <img
                    src={partner.src}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-10 max-w-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">{partner.name}</p>
                  <p className="text-[11px] text-[#9BB4DB]">{partner.domain}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 overflow-hidden marquee-track">
            {/* Row 1 */}
            <div className="flex gap-4 w-max animate-marquee-left">
              {[...rowOne, ...rowOne].map((partner, idx) => (
                <div
                  key={`r1-${partner.name}-${idx}`}
                  className="w-48 sm:w-52 shrink-0 nimai-glass rounded-2xl p-3.5 flex flex-col items-center gap-2.5 hover:border-cyan-300/45 transition-colors"
                >
                  <div className="w-full h-14 rounded-xl bg-white/95 px-4 py-2 flex items-center justify-center">
                    <img
                      src={partner.src}
                      alt={partner.name}
                      loading="lazy"
                      className="max-h-9 max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-[#B8C7E4] truncate max-w-full">
                    {partner.domain}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 w-max animate-marquee-right">
              {[...rowTwo, ...rowTwo].map((partner, idx) => (
                <div
                  key={`r2-${partner.name}-${idx}`}
                  className="w-48 sm:w-52 shrink-0 nimai-glass rounded-2xl p-3.5 flex flex-col items-center gap-2.5 hover:border-cyan-300/45 transition-colors"
                >
                  <div className="w-full h-14 rounded-xl bg-white/95 px-4 py-2 flex items-center justify-center">
                    <img
                      src={partner.src}
                      alt={partner.name}
                      loading="lazy"
                      className="max-h-9 max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-[#B8C7E4] truncate max-w-full">
                    {partner.domain}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
