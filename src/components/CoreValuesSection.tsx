import React from 'react';
import { Award, ShieldCheck, Lightbulb, Users, ClipboardCheck } from 'lucide-react';
import { CORE_VALUES } from '../data/siteData';

const VALUE_ICONS = {
  excellence: Award,
  integrity: ShieldCheck,
  innovation: Lightbulb,
  recognition: Users,
  accountability: ClipboardCheck,
};

export const CoreValuesSection: React.FC = () => {
  return (
    <section
      id="core-values"
      aria-label="Core Values"
      className="relative z-10 py-16 lg:py-24 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
            Guiding Engineering Ethics
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Core Values
          </h2>
          <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
            Five non-negotiable principles that guide every engineering specification, site
            installation, and long-term maintenance commitment.
          </p>
        </div>

        {/* Asymmetric 3 + 2 Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {CORE_VALUES.map((val, idx) => {
            const Icon = VALUE_ICONS[val.id as keyof typeof VALUE_ICONS] ?? Award;
            const spanClass = idx < 3 ? 'md:col-span-2' : 'md:col-span-3';
            return (
              <article
                key={val.id}
                className={`${spanClass} nimai-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-4 hover:border-cyan-300/40 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A1463] to-[#122866] border border-cyan-300/30 flex items-center justify-center text-[#22D3EE]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-[#8DA5CF]">
                    {val.index}
                  </span>
                </div>
                <div className="space-y-2.5">
                  <h3 className="font-display text-xl font-bold text-white">{val.title}</h3>
                  <p className="text-sm text-[#C7D7F2] leading-relaxed">{val.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
