import React from 'react';

const STAR_POINTS = [
  { cx: '8%', cy: '12%', r: 1.3, dur: '4.6s', delay: '0.2s', color: '#22D3EE' },
  { cx: '18%', cy: '28%', r: 1.0, dur: '6.2s', delay: '1.1s', color: '#E6F4FF' },
  { cx: '29%', cy: '9%', r: 1.4, dur: '5.1s', delay: '2.0s', color: '#A78BFA' },
  { cx: '41%', cy: '22%', r: 1.1, dur: '7.0s', delay: '0.6s', color: '#F5C451' },
  { cx: '55%', cy: '14%', r: 1.2, dur: '5.8s', delay: '1.8s', color: '#E6F4FF' },
  { cx: '68%', cy: '26%', r: 1.5, dur: '4.9s', delay: '0.4s', color: '#22D3EE' },
  { cx: '81%', cy: '11%', r: 1.1, dur: '6.6s', delay: '2.4s', color: '#C4B5FD' },
  { cx: '92%', cy: '21%', r: 1.3, dur: '5.3s', delay: '1.0s', color: '#38BDF8' },
  { cx: '12%', cy: '54%', r: 1.1, dur: '6.0s', delay: '1.5s', color: '#C4B5FD' },
  { cx: '26%', cy: '68%', r: 1.3, dur: '5.4s', delay: '0.3s', color: '#22D3EE' },
  { cx: '47%', cy: '48%', r: 0.9, dur: '6.8s', delay: '2.1s', color: '#E6F4FF' },
  { cx: '63%', cy: '59%', r: 1.2, dur: '4.7s', delay: '0.9s', color: '#F5C451' },
  { cx: '78%', cy: '44%', r: 1.4, dur: '5.9s', delay: '1.7s', color: '#A78BFA' },
  { cx: '89%', cy: '64%', r: 1.1, dur: '5.2s', delay: '0.5s', color: '#22D3EE' },
  { cx: '15%', cy: '86%', r: 1.2, dur: '6.1s', delay: '1.3s', color: '#38BDF8' },
  { cx: '38%', cy: '83%', r: 1.0, dur: '5.0s', delay: '2.2s', color: '#E6F4FF' },
  { cx: '72%', cy: '88%', r: 1.3, dur: '6.4s', delay: '0.8s', color: '#22D3EE' },
  { cx: '94%', cy: '84%', r: 1.0, dur: '5.7s', delay: '1.9s', color: '#F5C451' },
];

export const AmbientBackdrop: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Base midnight-navy to deep royal-purple atmospheric gradient */}
      <div className="absolute inset-0 nimai-surface-gradient" />

      {/* Subtle original NIMAI atmospheric backdrop heritage layer */}
      <img
        src="/assets/graphics/site-backdrop.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] mix-blend-screen"
      />

      {/* Slow-drifting royal purple, cyan, electric blue & subtle golden lighting */}
      <div
        className="absolute -top-40 -left-32 w-[580px] h-[580px] rounded-full opacity-35 blur-[130px] animate-aura-drift"
        style={{ background: 'radial-gradient(circle, #5B21B6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[16%] -right-40 w-[540px] h-[540px] rounded-full opacity-25 blur-[130px] animate-aura-drift"
        style={{
          background: 'radial-gradient(circle, #0891B2 0%, transparent 70%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className="absolute bottom-[-120px] left-[28%] w-[640px] h-[420px] rounded-full opacity-25 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #1D4ED8 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[52%] left-[62%] w-[360px] h-[360px] rounded-full opacity-[0.09] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #F5C451 0%, transparent 70%)' }}
      />

      {/* Precision architectural engineering grid */}
      <div className="absolute inset-0 bg-engineering-grid opacity-45" />

      {/* Subtle moving horizontal optical light streak */}
      <div className="absolute top-[28%] inset-x-0 h-px overflow-hidden opacity-45">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent animate-streak-glide" />
      </div>
      <div className="absolute top-[74%] inset-x-0 h-px overflow-hidden opacity-30">
        <div
          className="w-1/4 h-full bg-gradient-to-r from-transparent via-[#F5C451] to-transparent animate-streak-glide"
          style={{ animationDelay: '-5.5s' }}
        />
      </div>

      {/* Subtle starlight & constellation nodes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-75"
        preserveAspectRatio="none"
      >
        <line x1="8%" y1="12%" x2="29%" y2="9%" stroke="rgba(167, 139, 250, 0.14)" strokeWidth="0.7" />
        <line x1="29%" y1="9%" x2="41%" y2="22%" stroke="rgba(245, 196, 81, 0.12)" strokeWidth="0.7" />
        <line x1="68%" y1="26%" x2="81%" y2="11%" stroke="rgba(34, 211, 238, 0.14)" strokeWidth="0.7" />
        <line x1="68%" y1="26%" x2="78%" y2="44%" stroke="rgba(139, 92, 246, 0.12)" strokeWidth="0.7" />
        {STAR_POINTS.map((star, idx) => (
          <circle
            key={idx}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.color}
            className="animate-star-twinkle"
            style={
              {
                '--twinkle-duration': star.dur,
                '--twinkle-delay': star.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
};
