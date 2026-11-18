import React from 'react';
import { Compass, Target } from 'lucide-react';
import { VISION_MISSION } from '../data/siteData';

export const VisionMissionSection: React.FC = () => {
  return (
    <section
      id="vision-mission"
      aria-label="Vision and Mission"
      className="relative z-10 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vision Card */}
          <article className="nimai-glass-violet rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-30 blur-3xl bg-[#7C3AED]"
            />
            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#C4B5FD]">
                <span className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-300/35 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#C4B5FD]" />
                </span>
                <span>Our Direction</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {VISION_MISSION.vision.title}
              </h2>
              <p className="text-base sm:text-lg text-[#DCE8FB] leading-relaxed">
                {VISION_MISSION.vision.statement}
              </p>
            </div>
          </article>

          {/* Mission Card */}
          <article className="nimai-glass-cyan rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full opacity-25 blur-3xl bg-[#22D3EE]"
            />
            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                <span className="w-10 h-10 rounded-xl bg-cyan-400/15 border border-cyan-300/35 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#22D3EE]" />
                </span>
                <span>Our Commitment</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {VISION_MISSION.mission.title}
              </h2>
              <p className="text-base sm:text-lg text-[#DCE8FB] leading-relaxed">
                {VISION_MISSION.mission.statement}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
