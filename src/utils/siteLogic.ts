export interface EnquiryInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EnquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof EnquiryInput, string>>;
}

export function sanitizeEnquiryInput(input: EnquiryInput): EnquiryInput {
  return {
    name: input.name.trim().replace(/\s+/g, ' ').slice(0, 120),
    email: input.email.trim().toLowerCase().slice(0, 160),
    phone: input.phone.trim().replace(/\s+/g, ' ').slice(0, 40),
    subject: input.subject.trim().replace(/\s+/g, ' ').slice(0, 160),
    message: input.message.trim().slice(0, 3000),
  };
}

export function validateEnquiryInput(input: EnquiryInput): EnquiryValidationResult {
  const errors: Partial<Record<keyof EnquiryInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = input.phone.replace(/[^\d]/g, '');
  if (!input.phone || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid contact phone number (7–15 digits).';
  }

  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'Please specify a subject for your enquiry.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Please provide project or enquiry details (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface FilterableProject {
  id: string;
  category: string;
  src: string;
  caption: string;
}

export function filterProjectsByCategory<T extends FilterableProject>(
  projects: readonly T[],
  category: string
): T[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((item) => item.category === category);
}

export function wrapIndex(currentIndex: number, delta: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return ((currentIndex + delta) % total + total) % total;
}

export function clampZoom(scale: number, min = 1, max = 3): number {
  return Math.min(max, Math.max(min, Number(scale.toFixed(2))));
}

export function formatPhotoCaption(rawFilename: string, category: string, indexInCategory: number): string {
  const base = rawFilename.replace(/\.[^.]+$/, '');
  if (/^WhatsApp-Image-/i.test(base)) {
    return `${category} Field Documentation #${indexInCategory + 1}`;
  }
  if (/^\d+_\d+$/.test(base) || /^DSC_\d+/i.test(base) || /^PHOTO-\d+$/i.test(base)) {
    return `${category} Site Installation #${indexInCategory + 1}`;
  }
  const normalized = base
    .replace(/INSTALLTION/gi, 'INSTALLATION')
    .replace(/INSTALLATATION/gi, 'INSTALLATION')
    .replace(/DISAMANTLE/gi, 'DISMANTLE')
    .replace(/SOLOR-LIGITH/gi, 'SOLAR LIGHT')
    .replace(/INPROGRESS/gi, 'IN PROGRESS')
    .replace(/-768x354-1$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized
    .split(' ')
    .map((word) => {
      const upper = word.toUpperCase();
      if (['CCTV', 'UPS', 'TV', 'PC', 'SMATV', 'MATV', 'IPTV', 'ELV', 'GPON'].includes(upper)) {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export type PageRoute = 'home' | 'about' | 'services' | 'projects' | 'contact';

const ROUTE_PATHS: Record<PageRoute, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  contact: '/contact',
};

const ROUTE_TITLES: Record<PageRoute, string> = {
  home: 'NIMAI ENGINEERING — Integrated ELV, M&E & Smart Building Solutions',
  about: 'About Us — NIMAI ENGINEERING | 20+ Years ELV & M&E Excellence',
  services: 'Services — NIMAI ENGINEERING | ELV, Electrical, IT, Cabling & Maintenance',
  projects: 'Projects Portfolio — NIMAI ENGINEERING | 57 Verified Field Installations',
  contact: 'Contact Us — NIMAI ENGINEERING | Johor Bahru Engineering Desk',
};

export function parseRouteFromPathname(pathname: string): PageRoute {
  const clean = pathname.trim().toLowerCase().replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/home') return 'home';
  if (clean === '/about' || clean === '/about-us') return 'about';
  if (clean === '/services') return 'services';
  if (clean === '/projects') return 'projects';
  if (clean === '/contact' || clean === '/contact-us') return 'contact';
  return 'home';
}

export function getPathForRoute(route: PageRoute): string {
  return ROUTE_PATHS[route];
}

export function buildRouteUrl(route: PageRoute, hash?: string): string {
  const base = getPathForRoute(route);
  if (!hash) return base;
  const cleanHash = hash.replace(/^#/, '');
  return cleanHash ? `${base}#${cleanHash}` : base;
}

export function getPageTitle(route: PageRoute): string {
  return ROUTE_TITLES[route];
}

