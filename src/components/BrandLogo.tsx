import React, { useState } from 'react';

export const NIMAI_LOGO_SRC =
  '/assets/aistudio/Screenshot_2026-11-19_085205-removebg-preview_64211f32.png';

interface BrandLogoProps {
  variant?: 'navbar' | 'footer' | 'hero' | 'intro';
  className?: string;
}

const IMG_SIZE_CLASSES: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  navbar: 'h-14 sm:h-[68px]',
  hero: 'h-16 sm:h-[74px]',
  footer: 'h-20 sm:h-24',
  intro: 'h-32 sm:h-40 md:h-48',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center font-display font-bold tracking-[0.14em] text-[#F4D37C] whitespace-nowrap ${className}`}
      >
        NIMAI ENGINEERING
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center shrink-0 select-none bg-transparent ${className}`}
    >
      {/* Borderless ambient optical luminance so the sapphire & gold artwork glows cleanly on dark royal surfaces */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full opacity-45 group-hover:opacity-80 transition-opacity duration-500 blur-2xl"
        style={{
          background:
            'radial-gradient(50% 60% at 22% 50%, rgba(248, 212, 102, 0.32) 0%, transparent 72%), radial-gradient(65% 60% at 68% 52%, rgba(96, 195, 255, 0.34) 0%, transparent 74%)',
        }}
      />
      <img
        src={NIMAI_LOGO_SRC}
        alt="NIMAI Engineering"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`relative z-10 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] ${IMG_SIZE_CLASSES[variant]}`}
        style={{
          filter:
            'brightness(1.28) contrast(1.14) saturate(1.24) drop-shadow(0 0 10px rgba(125, 211, 252, 0.36)) drop-shadow(0 0 18px rgba(232, 193, 90, 0.28))',
        }}
      />
    </span>
  );
};
