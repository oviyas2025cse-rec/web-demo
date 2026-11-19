import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/* 1. Sleek Molten-Gold to Sapphire Scroll Progress Rail pinned cleanly under top navigation */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-20 sm:top-[88px] left-0 right-0 h-[2px] z-50 pointer-events-none bg-gradient-to-r from-[#C4922B] via-[#F8DF94] to-[#38BDF8]"
    />
  );
};

/* 2. Refined Scroll-Triggered Editorial Reveal */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 24,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* 3. Scroll-Linked Parallax Image Frame */
interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  children,
  className = '',
  offset = 26,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {prefersReduced ? (
        <div className="w-full h-full">{children}</div>
      ) : (
        <motion.div style={{ y }} className="w-full h-[114%] -mt-[7%]">
          {children}
        </motion.div>
      )}
    </div>
  );
};

/* 4. Magnetic Interactive Button (Desktop Pointer Pull + Luminous Sheen) */
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.18,
  onMouseMove,
  onMouseLeave,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    if (prefersReduced || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * strength, y: relY * strength });
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.25s ease'
            : 'transform 0.12s ease-out, filter 0.25s ease',
      }}
      className={`nimai-btn-sheen active:scale-[0.98] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

/* 5. Pointer-Tracking Specular Spotlight Surface (Zero React Re-renders) */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  onMouseMove,
  ...rest
}) => {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`nimai-spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

/* 6. Sovereign 3D Perspective Tilt Showcase Card (Compositor-Only Transform) */
interface RoyalTiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
}

export const RoyalTiltCard: React.FC<RoyalTiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  onMouseMove,
  onMouseLeave,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(e);
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rx = ((y / rect.height) - 0.5) * -maxTilt * 2;
    const ry = ((x / rect.width) - 0.5) * maxTilt * 2;
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(e);
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      className={`nimai-spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

/* 7. Authentic Number Counter (Used strictly for verified NIMAI metrics, tabular-nums) */
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  durationMs = 1100,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!inView || prefersReduced) {
      if (prefersReduced) setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target, durationMs, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
};
