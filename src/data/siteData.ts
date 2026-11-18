import { formatPhotoCaption } from '../utils/siteLogic';

export interface HeroSlide {
  id: string;
  image: string;
  mobileImage?: string;
  kicker: string;
  headlineLine1: string;
  headlineLine2: string;
  subtitle: string;
  tagLine: string;
  focusSystem: string;
}

export interface ServiceItemDetail {
  title: string;
  detail: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  tagline: string;
  summary: string;
  image: string;
  secondaryImage?: string;
  imageAlt: string;
  diagramType: 'elv' | 'electrical' | 'it' | 'cabling' | 'maintenance';
  theme: 'light' | 'dark' | 'ice' | 'editorial' | 'royal';
  items: ServiceItemDetail[];
}

export interface BuildingHotspot {
  id: string;
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  zone: string;
  serviceId: string;
  serviceName: string;
  description: string;
  signalPath: string;
}

export interface ProjectItem {
  id: string;
  category:
    | 'Hotels & Resorts'
    | 'Condominium & Apartments'
    | 'Hospitals'
    | 'Shopping Complex'
    | 'Company';
  src: string;
  filename: string;
  caption: string;
}

export interface PartnerLogo {
  name: string;
  src: string;
  domain: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  index: string;
}

export interface WhyChoosePillar {
  id: string;
  index: string;
  metric: string;
  title: string;
  description: string;
}

export const COMPANY_INFO = {
  name: 'NIMAI ENGINEERING',
  tagline: 'Smart, Secure, Connected – Elevate with ELV Systems!',
  experienceYears: '20+',
  address: 'NO.6K-01, Jalan Tun Abdul Razak (Susur 3), Pusat Bandar 6, Johor Bahru, Johor.',
  email: 'enquiry@nimaiengineering.com',
  phoneDisplay: '+6011 5555 7677',
  phoneHref: 'tel:+601155557677',
  whatsappHref:
    'https://wa.me/601155557677?text=Hello%20NIMAI%20Engineering%2C%20I%20would%20like%20to%20enquire%20about%20your%20engineering%20services.',
  website: 'https://nimaiengineering.com',
  websiteDisplay: 'www.nimaiengineering.com',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.486036041718!2d103.75074707453047!3d1.4807154611421474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6d3593470681%3A0x6c77784b862bff80!2sJB%20Secretarial%20Service!5e0!3m2!1sen!2sin!4v1743183000673!5m2!1sen!2sin',
  mapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=NO.6K-01+Jalan+Tun+Abdul+Razak+Susur+3+Pusat+Bandar+6+Johor+Bahru+Johor',
  footerSummary:
    'We specialize in cutting-edge ELV solutions, ensuring powerful, cost-effective, and up-to-date technology for your projects. ELV (Extra Low Voltage) systems cover security, networking, and automation in residential and commercial spaces like condos, offices, factories, hospitals, and malls.',
  copyright: 'Copyright © 2025 NIMAI ENGINEERING, Johor Bahru, Johor',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'elv-excellence',
    image: '/assets/hero/elv-bg.jpg',
    mobileImage: '/assets/hero/nimai-slider.jpg',
    kicker: 'Johor Bahru, Malaysia · Over 20 Years of Engineering Excellence',
    headlineLine1: 'Engineering Excellence.',
    headlineLine2: 'Connecting Tomorrow.',
    subtitle:
      'Delivering integrated engineering, ELV systems and intelligent technology solutions for modern residential and commercial environments.',
    tagLine: 'Smart, Secure, Connected – Elevate with ELV Systems!',
    focusSystem: 'ELV System & Integration',
  },
  {
    id: 'smart-elv',
    image: '/assets/services/elv-system.jpg',
    kicker: 'Extra Low Voltage · Security · Automation · Broadcast',
    headlineLine1: 'Smart, Secure, Connected',
    headlineLine2: 'ELV Infrastructure.',
    subtitle:
      'From DCSS 4K UHD SMATV and IP Surveillance to Access Control, IPTV, BMS and BAS — engineered as a unified one-stop solution.',
    tagLine: 'Registered Astro Retailer & Installer · End-to-End Integration',
    focusSystem: 'Building Automation & Surveillance',
  },
  {
    id: 'electrical-mechanical',
    image: '/assets/services/electrical-services.jpg',
    kicker: 'Electrical & Mechanical Engineering · HV 11kV & 33kV',
    headlineLine1: 'Powering Modern',
    headlineLine2: 'Developments Safely.',
    subtitle:
      'Over 20 years delivering high-voltage distribution, standby power, earthing, lightning protection, and energy-saving engineering.',
    tagLine: 'Condominiums · Resorts · Hospitals · Commercial Complexes',
    focusSystem: 'Power Distribution & Control',
  },
  {
    id: 'field-delivery',
    image: '/assets/projects/Legoland_de_Entrance.jpg',
    kicker: 'Proven Regional Delivery · 24/7 Preventive Maintenance',
    headlineLine1: 'Trusted Across',
    headlineLine2: 'Landmark Properties.',
    subtitle:
      'Certified structured cabling, GPON networking, and round-the-clock on-site & remote preventive maintenance for uninterrupted operations.',
    tagLine: 'One-Stop Engineering Partner from Design to Lifecycle Support',
    focusSystem: 'Commercial & Hospitality Projects',
  },
];

export const ABOUT_CONTENT = {
  eyebrow: 'About Nimai Engineering',
  heading: 'A Passionate Team Who Loves to Support',
  leadParagraph:
    'We are specialized in ELV System & Integration for more than 20 years. We have implemented new technology into design, so you get the most up-to-date, more powerful and the most adequate solution at lower price point.',
  paragraphs: [
    'ELV System stands for Extra Low Voltage System. New ELV technologies being invented every day in construction and development projects, ELV System is parked under the scope of Mechanical and Electrical Engineering (M&E). It covers all systems in residential and commercial buildings which operate on extra low voltages (<50V AC and <120V DC). ELV Systems are most used at Condominiums, Apartments, Resorts, Corporate Offices, Factories, Hospitals and Shopping Malls.',
    'Nowadays, the standard ELV Systems in a most basic design are SMATV 4K UHD, Intercoms, CCTV & Security Control System, Public Address System, Door Automation & Control, Access Control System, Lift Access, Lift Control, Parking Management System, Tour Guard Patrol. The trending ELV Systems are Internet-of-Things (IoT) Smart Home Automation, IPTV, GPON/GEPON and Video Intercom.',
    'We are also registered Astro retailer & installer. We provide one stop solutions for Astro services such as Astro registration, installation, relocation, etc. We do have experience on Electrical & Mechanical Engineering services over 20 years. We provide one stop solution such as energy saving solution, earthing system, etc.',
    "We aim to provide our clients with one-stop-solutions and eliminate burden in terms of managing projects and planning the systems. We utilize innovation as our vital weapon in order to render the best of our solutions and services. Through the use of technology, we are able to create something extra miles and will continue to do so in the coming years; with something that would meet beyond our clients' expectations.",
  ],
  highlights: [
    { metric: '20+', suffix: 'Years', label: 'ELV System & M&E Engineering Experience' },
    { metric: '<50V AC', suffix: '/ <120V DC', label: 'Extra Low Voltage Engineering Scope' },
    { metric: 'Astro', suffix: 'Registered', label: 'Retailer & 4K UHD SMATV Installer' },
    { metric: '24/7', suffix: 'Support', label: 'Remote & On-Site Major Defect Response' },
  ],
};

export const WHY_CHOOSE_NIMAI: WhyChoosePillar[] = [
  {
    id: 'experience',
    index: '01',
    metric: '20+ Years',
    title: 'Two Decades of ELV & M&E Mastery',
    description:
      'Over 20 years designing and integrating Extra Low Voltage and Electrical & Mechanical systems across condominiums, resorts, hospitals, malls, and factories.',
  },
  {
    id: 'one-stop',
    index: '02',
    metric: '5 Divisions',
    title: 'True One-Stop Engineering Accountability',
    description:
      'Eliminate multi-contractor friction — one specialized Johor Bahru engineering partner from initial design and structured cabling to commissioning and lifecycle care.',
  },
  {
    id: 'astro-4k',
    index: '03',
    metric: '4K UHD',
    title: 'Registered Astro Retailer & SMATV Specialist',
    description:
      'Official Astro registration, relocation, Myfreeview (MYTV) digital MATV upgrades, and DCSS 4K UHD SMATV headends calibrated for multi-unit developments.',
  },
  {
    id: 'support-247',
    index: '04',
    metric: '24/7 SLA',
    title: 'Round-the-Clock Remote & On-Site Support',
    description:
      'Scheduled preventive maintenance agreements, 24/7 remote diagnostics, rapid on-site dispatch for major defects, and extended hardware warranty protection.',
  },
];

export const SERVICES: ServiceCategory[] = [
  {
    id: 'service-elv',
    number: '01',
    shortTitle: 'ELV Systems',
    title: 'ELV Systems',
    tagline: 'Smart, Secure, Connected – Complete Extra Low Voltage Architecture',
    summary:
      'End-to-end design, installation, and upgrading of Extra Low Voltage security, broadcast, communication, and intelligent building automation systems for modern residential and commercial spaces.',
    image: '/assets/services/elv-system.jpg',
    secondaryImage: '/assets/projects/HEADEND-TV-SYSTEM.jpg',
    imageAlt: 'NIMAI Engineering ELV Systems and Smart Control Integration',
    diagramType: 'elv',
    theme: 'light',
    items: [
      {
        title: 'Install / Upgrade to Digital MATV System to support Myfreeview (MYTV)',
        detail:
          'Digital terrestrial television headend, distribution amplifiers, and signal balancing calibrated for crystal-clear Myfreeview (MYTV) reception across multi-unit buildings.',
      },
      {
        title:
          'Install / Upgrade to latest technology DCSS 4K UHD SMATV System to support Astro 4K resolution channels',
        detail:
          'Digital Channel Stacking Switch (DCSS) satellite master antenna systems installed by a registered Astro retailer & installer for seamless 4K Ultra HD delivery.',
      },
      {
        title: 'Install / Upgrade CCTV (IP Surveillance Systems)',
        detail:
          'High-definition IP camera networks, NVR storage architecture, perimeter analytics, and central security monitoring room integration.',
      },
      {
        title: 'Door Automation & Security Control System',
        detail:
          'Automated pedestrian entry doors, electromagnetic locking hardware, emergency fail-safe release, and synchronized access verification.',
      },
      {
        title: 'IPTV Systems',
        detail:
          'Hospitality and residential IP television distribution delivering interactive channel lineups over structured Ethernet and GPON networks.',
      },
      {
        title: 'Public Address System',
        detail:
          'Multi-zone audio paging, background music routing, and voice evacuation announcements engineered for acoustic clarity in corridors, lobbies, and halls.',
      },
      {
        title: 'Access Control System',
        detail:
          'Card, biometric, lift access, lift control, and tour guard patrol systems securing restricted residential towers, corporate floors, and critical rooms.',
      },
      {
        title: 'Digital Signage Video Wall & Kiosk',
        detail:
          'High-brightness commercial video walls, wayfinding kiosks, and centralized content distribution for malls, hotels, and corporate receptions.',
      },
      {
        title: 'Parking Management System',
        detail:
          'Automated barrier gates, vehicle entry/exit control, license/card validation, and durable car park lane infrastructure.',
      },
      {
        title: 'Intercom System',
        detail:
          'Audio and IP video intercom networks connecting guardhouses, main lobbies, and individual residential or commercial units.',
      },
      {
        title: 'Building Management System (BMS)',
        detail:
          'Centralized supervisory visibility coordinating building subsystems for safer, more efficient facility management.',
      },
      {
        title: 'Building Automation System (BAS)',
        detail:
          'Automated scheduling and responsive environmental/equipment control engineered to reduce operational overhead and optimize comfort.',
      },
    ],
  },
  {
    id: 'service-electrical',
    number: '02',
    shortTitle: 'Electrical & Mechanical',
    title: 'Electrical & Mechanical Services',
    tagline: 'Over 20 Years of Resilient Power Distribution & M&E Engineering',
    summary:
      'Comprehensive electrical and mechanical engineering spanning high-voltage distribution, standby power systems, earthing and lightning protection, architectural lighting, and energy-saving infrastructure.',
    image: '/assets/services/electrical-services.jpg',
    secondaryImage: '/assets/projects/SOLOR-LIGITH-INSTALLTION.jpg',
    imageAlt: 'NIMAI Engineering Electrical and Mechanical Services',
    diagramType: 'electrical',
    theme: 'dark',
    items: [
      {
        title: 'High voltage (11kV & 33kV) distribution systems',
        detail:
          'High-voltage switchgear, transformer substations, and primary feeder distribution engineered to stringent safety and utility compliance standards.',
      },
      {
        title: 'Standby power distribution systems',
        detail:
          'Uninterruptible power supplies (UPS), backup battery banks, automatic transfer switching, and generator integration for uninterrupted operations.',
      },
      {
        title: 'Sub-mains and final circuit distribution systems',
        detail:
          'Main switchboards, rising mains, distribution boards, and clean circuit protection for commercial, industrial, and residential floors.',
      },
      {
        title: 'Earthing systems',
        detail:
          'Low-impedance protective earthing grids, equipotential bonding, and earth resistance testing safeguarding personnel and sensitive electronics.',
      },
      {
        title: 'Lightning protection systems',
        detail:
          'External air-termination networks, down conductors, and surge suppression protecting high-rise structures and critical equipment.',
      },
      {
        title: 'Mechanical power and control systems',
        detail:
          'Motor control centers, pumps, HVAC electrical feeders, and automated mechanical control panels integrated with building operations.',
      },
      {
        title: 'Internal lighting',
        detail:
          'Functional, architectural, and emergency interior lighting layouts engineered for visual comfort and regulatory compliance.',
      },
      {
        title: 'External lighting',
        detail:
          'Perimeter, facade, pathway, and solar outdoor lighting installations engineered for durability and night-time site security.',
      },
      {
        title: 'Energy Saving Solution',
        detail:
          'Power efficiency upgrades, high-efficiency luminaires, smart control scheduling, and targeted load optimization lowering long-term energy consumption.',
      },
    ],
  },
  {
    id: 'service-it',
    number: '03',
    shortTitle: 'IT Services',
    title: 'IT Services',
    tagline: 'High-Throughput GPON, Enterprise Networking & Unified Support',
    summary:
      'Scalable optical networking, secured switching architectures, campus-wide wireless deployments, BMS integration, and responsive IT support tailored for high-density commercial and residential sites.',
    image: '/assets/projects/CONFIGURATION-VAULT-PC.jpg',
    secondaryImage: '/assets/projects/VAULT-PC.jpg',
    imageAlt: 'NIMAI Engineering IT Systems Configuration and Server Setup',
    diagramType: 'it',
    theme: 'ice',
    items: [
      {
        title: 'GPON solutions',
        detail:
          'Gigabit Passive Optical Network (GPON / GEPON) fiber infrastructure delivering converged high-speed internet, IPTV, and voice over a single optical backbone.',
      },
      {
        title: 'Networking Management & Security',
        detail:
          'Managed core switches, VLAN segmentation, firewall protection, and resilient routing built for high uptime and security.',
      },
      {
        title: 'Wireless Networking Solutions',
        detail:
          'Enterprise Wi-Fi site planning, seamless roaming access points, and high-density coverage across lobbies, offices, hotels, and clinics.',
      },
      {
        title: 'Building Management System (BMS)',
        detail:
          'IT-layer server configuration, secure workstation setup, and network backbone support for unified building management platforms.',
      },
      {
        title: 'IT Support Services',
        detail:
          'Dedicated technical troubleshooting, hardware deployment, system diagnostics, and proactive IT maintenance for commercial clients.',
      },
    ],
  },
  {
    id: 'service-cabling',
    number: '04',
    shortTitle: 'Structured Cabling',
    title: 'Structured Cabling',
    tagline: 'Precision Design, Clean Termination & Certified Testing',
    summary:
      'Disciplined copper, coaxial, telephony, and fiber-optic cable engineering — laid cleanly, terminated with precision, and backed by rigorous identification, testing, labelling, and certification.',
    image: '/assets/projects/CCTV-NETWORK-CABLE-LAY-4.jpg',
    secondaryImage: '/assets/projects/TESTING-CABLE.jpg',
    imageAlt: 'NIMAI Engineering Structured Cabling Installation and Testing',
    diagramType: 'cabling',
    theme: 'editorial',
    items: [
      {
        title: 'Network system design, installation & termination (Cat6)',
        detail:
          'Structured Cat6 horizontal and riser cabling, neatly dressed patch panels, rack organization, and RJ45 precision termination.',
      },
      {
        title: 'SMATV system design, installation & termination',
        detail:
          'Low-loss coaxial trunking, tap-off splitters, riser distribution, and F-connector termination tuned for MATV and 4K UHD SMATV signals.',
      },
      {
        title: 'Telephony system design, installation & termination',
        detail:
          'Structured voice backbone and PABX distribution cabling ensuring clear, reliable internal and external telecommunications.',
      },
      {
        title: 'Fiber optic installation & termination',
        detail:
          'Single-mode and multi-mode optical fiber pulling, fusion splicing, ODF rack management, and low-attenuation optical termination.',
      },
      {
        title: 'Cable testing, labelling & certification',
        detail:
          'Comprehensive continuity, signal strength, and link certification tests paired with permanent cable identification labels for effortless future servicing.',
      },
    ],
  },
  {
    id: 'service-maintenance',
    number: '05',
    shortTitle: 'Preventive Maintenance',
    title: 'Preventive Maintenance Services',
    tagline: '24/7 Protection Keeping Critical Building Systems Reliable',
    summary:
      'Proactive scheduled maintenance agreements, round-the-clock remote engineering support, rapid on-site response for major defects, and extended hardware warranty coverage.',
    image: '/assets/projects/AFTER-NEW-BATTERY-UPS-VOLTAGE.jpg',
    secondaryImage: '/assets/projects/INSTALLATION-DONE-NEW-BARRIER-GATE.jpg',
    imageAlt: 'NIMAI Engineering Preventive Maintenance UPS Testing and Barrier Gate Replacement',
    diagramType: 'maintenance',
    theme: 'royal',
    items: [
      {
        title: 'Maintenance Agreement',
        detail:
          'Structured preventive inspection schedules covering ELV, electrical, UPS battery health, headend signal levels, and security hardware.',
      },
      {
        title: 'Remote Support 24/7',
        detail:
          'Direct technical escalation and remote diagnostic assistance available 24 hours a day, 7 days a week to minimize downtime.',
      },
      {
        title: '24/7 Support on Site Support for Major Defect',
        detail:
          'Rapid on-site dispatch by experienced field engineers for critical system failures across security, power backup, and building access.',
      },
      {
        title: 'Hardware Warranty Extended',
        detail:
          'Extended hardware protection plans providing peace of mind and predictable lifecycle budgeting for key ELV and IT assets.',
      },
    ],
  },
];

export const BUILDING_HOTSPOTS: BuildingHotspot[] = [
  {
    id: 'matv-smatv',
    label: 'MATV / SMATV 4K UHD',
    shortLabel: 'SMATV',
    x: 245,
    y: 66,
    zone: 'Rooftop Headend',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Digital MATV supporting Myfreeview (MYTV) and DCSS 4K UHD SMATV systems supporting Astro 4K resolution channels — engineered by a registered Astro retailer & installer.',
    signalPath: 'M 245 66 L 245 140 L 420 140 L 420 278',
  },
  {
    id: 'bms',
    label: 'Building Management System (BMS)',
    shortLabel: 'BMS',
    x: 420,
    y: 120,
    zone: 'Central Command Floor',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems & 03. IT Services',
    description:
      'Unified supervisory control connecting ELV, electrical, and mechanical subsystems into one operational view for building management teams.',
    signalPath: 'M 420 120 L 420 278',
  },
  {
    id: 'bas',
    label: 'Building Automation System (BAS)',
    shortLabel: 'BAS',
    x: 560,
    y: 138,
    zone: 'Upper Commercial Wing',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Automated scheduling and responsive control for lighting, HVAC power, and IoT smart building environments to improve efficiency and comfort.',
    signalPath: 'M 560 138 L 420 138 L 420 278',
  },
  {
    id: 'iptv',
    label: 'IPTV Systems',
    shortLabel: 'IPTV',
    x: 225,
    y: 162,
    zone: 'Hospitality & Suites',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'IP-based television distribution engineered for hotels, resorts, and condominium residences over high-bandwidth structured networks.',
    signalPath: 'M 225 162 L 420 162 L 420 278',
  },
  {
    id: 'public-address',
    label: 'Public Address System',
    shortLabel: 'PA Audio',
    x: 590,
    y: 204,
    zone: 'Concourse & Atrium',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Multi-zone public address and voice announcement infrastructure ensuring crisp audio coverage throughout lobbies, corridors, and public spaces.',
    signalPath: 'M 590 204 L 420 204 L 420 278',
  },
  {
    id: 'networking',
    label: 'GPON & Enterprise Networking',
    shortLabel: 'Networking',
    x: 328,
    y: 215,
    zone: 'IT Distribution Core',
    serviceId: 'service-it',
    serviceName: '03. IT Services',
    description:
      'GPON optical solutions, managed network security, and seamless wireless networking delivering reliable connectivity to every floor.',
    signalPath: 'M 328 215 L 420 215 L 420 278',
  },
  {
    id: 'fibre-optic',
    label: 'Fibre-Optic & Cat6 Backbone',
    shortLabel: 'Fibre-Optic',
    x: 420,
    y: 278,
    zone: 'Central Riser Spine',
    serviceId: 'service-cabling',
    serviceName: '04. Structured Cabling',
    description:
      'High-speed vertical fiber-optic risers, Cat6 horizontal runs, telephony, and SMATV distribution — fully tested, labelled, and certified.',
    signalPath: 'M 420 100 L 420 430',
  },
  {
    id: 'cctv',
    label: 'CCTV / IP Surveillance',
    shortLabel: 'CCTV',
    x: 170,
    y: 256,
    zone: 'Perimeter & Facade',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'High-resolution IP surveillance cameras covering entrances, perimeters, lobbies, and lifts with centralized recording and security monitoring.',
    signalPath: 'M 170 256 L 420 256 L 420 278',
  },
  {
    id: 'digital-signage',
    label: 'Digital Signage & Video Walls',
    shortLabel: 'Signage',
    x: 540,
    y: 288,
    zone: 'Main Lobby & Retail',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Commercial digital signage, interactive kiosks, and seamless video walls elevating visitor communication in malls, offices, and hotels.',
    signalPath: 'M 540 288 L 420 288 L 420 278',
  },
  {
    id: 'intercom',
    label: 'Video & Audio Intercom',
    shortLabel: 'Intercom',
    x: 270,
    y: 332,
    zone: 'Guardhouse & Reception',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Direct audio and IP video intercom communication linking visitor entry stations, security desks, and individual tenant units.',
    signalPath: 'M 270 332 L 420 332 L 420 278',
  },
  {
    id: 'access-control',
    label: 'Access Control & Door Automation',
    shortLabel: 'Access',
    x: 492,
    y: 356,
    zone: 'Main Entry & Lifts',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'Automated security doors, turnstiles, lift access control, and tour guard patrol systems safeguarding authorized tenant movement.',
    signalPath: 'M 492 356 L 420 356 L 420 278',
  },
  {
    id: 'electrical',
    label: 'HV/LV Electrical & Standby Power',
    shortLabel: 'Electrical',
    x: 220,
    y: 416,
    zone: 'Basement Plant & Switchroom',
    serviceId: 'service-electrical',
    serviceName: '02. Electrical & Mechanical',
    description:
      '11kV & 33kV distribution, standby UPS/generator power, sub-mains, earthing, lightning protection, lighting, and energy-saving solutions.',
    signalPath: 'M 220 416 L 420 416 L 420 278',
  },
  {
    id: 'parking',
    label: 'Parking Management System',
    shortLabel: 'Parking',
    x: 645,
    y: 412,
    zone: 'Vehicle Entry & Car Park',
    serviceId: 'service-elv',
    serviceName: '01. ELV Systems',
    description:
      'High-durability barrier gates, entry/exit lane controls, and integrated car park automation engineered for smooth traffic flow.',
    signalPath: 'M 645 412 L 420 412 L 420 278',
  },
];

export const ECOSYSTEM_SECTORS = [
  {
    title: 'Hotels & Resorts',
    filterCategory: 'Hotels & Resorts' as const,
    systems: 'DCSS 4K UHD SMATV · IPTV · Public Address · Door Access · Standby Power',
    description:
      'Uninterrupted guest entertainment, seamless corridor security, and silent power continuity for premier hospitality properties.',
    image: '/assets/projects/INSTALLATION-DONE.jpg',
  },
  {
    title: 'Condominium & Apartments',
    filterCategory: 'Condominium & Apartments' as const,
    systems: 'Video Intercom · Lift Access · CCTV · Barrier Gates · Myfreeview / Astro SMATV',
    description:
      'Layered residential safety and high-definition TV/fiber infrastructure engineered for modern high-rise living.',
    image: '/assets/projects/Afiniti-Medini-Iskandar-Puteri-Nusajaya-Malaysia.jpg',
  },
  {
    title: 'Hospitals & Healthcare',
    filterCategory: 'Hospitals' as const,
    systems: 'IP Surveillance · Access Control · Public Address · Standby UPS · Structured Cabling',
    description:
      'Mission-critical reliability for healthcare facilities where uptime, security, and rapid 24/7 engineering support matter most.',
    image: '/assets/projects/WhatsApp-Image-2024-12-05-at-18.44.57_5d511c0e.jpg',
  },
  {
    title: 'Shopping Complex & Attractions',
    filterCategory: 'Shopping Complex' as const,
    systems: 'Digital Signage & Video Walls · CCTV Backbone · Parking · PA · Energy Saving Lighting',
    description:
      'High-density crowd surveillance, structured cabling backbones, and visual display networks across major commercial venues.',
    image: '/assets/projects/Legoland_de_Entrance.jpg',
  },
  {
    title: 'Corporate Offices & Factories',
    filterCategory: 'Company' as const,
    systems: 'Barrier Gates · GPON Networking · BMS/BAS · HV/LV Distribution · Preventive SLA',
    description:
      'Integrated site security, enterprise networking, and industrial M&E power systems backed by scheduled preventive maintenance.',
    image: '/assets/projects/INSTALLATION-DONE-NEW-BARRIER-GATE.jpg',
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'Hotels & Resorts',
  'Condominium & Apartments',
  'Hospitals',
  'Shopping Complex',
  'Company',
] as const;

export type ProjectCategoryFilter = (typeof PROJECT_CATEGORIES)[number];

const RAW_PROJECTS_BY_CATEGORY: Record<
  Exclude<ProjectCategoryFilter, 'All'>,
  string[]
> = {
  'Hotels & Resorts': [
    '1197192_16093011200047160557.jpg',
    'INSTALLATION-DONE.jpg',
    'INSTALLTION-IN-PROGRESS.jpg',
    'LISTED-TV-CHANNEL.jpg',
    'SETUP-TV-CHANNEL-TESTING.jpg',
  ],
  'Condominium & Apartments': [
    'Afiniti-Medini-Iskandar-Puteri-Nusajaya-Malaysia.jpg',
    'CONFIGURATION-VAULT-PC.jpg',
    'INSTALLATION-COMPLETED-PHOTO-1.jpg',
    'INSTALLATION-COMPLETED-PHOTO-2.jpg',
    'VAULT-PC.jpg',
    'INSTALLATION-COMPLETED.jpg',
    'INCOMING-UPS-VOLTAGE.jpg',
    'FAULTY-BATTERY.jpg',
    'FAULTY-BATTERY-UPS-VOLTAGE.jpg',
    'BEFORE-REPLACE-BATTERY-UPS.jpg',
    'BATTERY-INSTALLATION-INPROGRESS.jpg',
    'AFTER-NEW-BATTERY-UPS-VOLTAGE.jpg',
    'HEADEND-TV-SYSTEM.jpg',
    'RISER-TV-SYSTEM.jpeg',
    'TV-SIGNAL.jpeg',
    'PHOTO-3.jpg',
    'PHOTO-1.jpg',
    'PHOTO-2.jpg',
    'SOLOR-LIGITH-INSTALLTION.jpg',
  ],
  Hospitals: [
    'WhatsApp-Image-2024-12-05-at-18.44.55_bcdd89db.jpg',
    'WhatsApp-Image-2024-12-05-at-18.44.56_5968daae.jpg',
    'WhatsApp-Image-2024-12-05-at-18.44.56_71657bd4.jpg',
    'WhatsApp-Image-2024-12-05-at-18.44.57_5d511c0e.jpg',
    'WhatsApp-Image-2024-12-05-at-18.44.57_e3bb09d6.jpg',
    'WhatsApp-Image-2024-12-05-at-18.44.57_e8078d29.jpg',
    'WhatsApp-Image-2024-12-05-at-19.24.59_304cc1fe.jpg',
    'WhatsApp-Image-2024-12-05-at-19.29.02_1f6cb6cb.jpg',
    'WhatsApp-Image-2024-12-05-at-19.32.33_eeaa21a2.jpg',
    'WhatsApp-Image-2024-12-05-at-19.34.44_2ce67290.jpg',
    'WhatsApp-Image-2024-12-05-at-19.34.45_ccea8c1f.jpg',
    'WhatsApp-Image-2024-12-05-at-19.23.27_223dca05.jpg',
    'WhatsApp-Image-2024-12-05-at-19.23.28_f37bf16d.jpg',
    'WhatsApp-Image-2024-12-05-at-19.24.59_5ed8160d.jpg',
    'WhatsApp-Image-2024-12-05-at-19.25.00_eac07afd.jpg',
  ],
  'Shopping Complex': [
    'Legoland_de_Entrance.jpg',
    'AFTER.jpg',
    'BEFORE.jpg',
    'INSTALLTION.jpg',
    'DSC_8745-0-1.jpg',
    'CCTV-NETWORK-CABLE-LAY-1.jpg',
    'CCTV-NETWORK-CABLE-LAY-2.jpg',
    'CCTV-NETWORK-CABLE-LAY-3.jpg',
    'CCTV-NETWORK-CABLE-LAY-4.jpg',
    'CCTV-NETWORK-CABLE-LAY-5.jpg',
    'CCTV-NETWORK-CABLE-LAY-6.jpg',
    'IDENTIFY-CABLE.jpg',
    'TESTING-CABLE.jpg',
  ],
  Company: [
    'ihtjohor-768x354-1.jpeg',
    'DISAMANTLE-FAULTY-BARRIER-GATE.jpg',
    'INSTALLATATION-IN-PROGRESS-2.jpg',
    'INSTALLATION-DONE-NEW-BARRIER-GATE.jpg',
    'INSTALLATION-IN-PROGRESS.jpg',
  ],
};

export const PROJECTS: ProjectItem[] = (
  Object.entries(RAW_PROJECTS_BY_CATEGORY) as [
    Exclude<ProjectCategoryFilter, 'All'>,
    string[],
  ][]
).flatMap(([category, filenames]) =>
  filenames.map((filename, index) => ({
    id: `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
    category,
    filename,
    src: `/assets/projects/${filename}`,
    caption: formatPhotoCaption(filename, category, index),
  }))
);

export const PARTNERS: PartnerLogo[] = [
  { name: 'Alcad', src: '/assets/partners/alcadd.png', domain: 'MATV / SMATV & Intercom' },
  { name: 'AMP Netconnect', src: '/assets/partners/ampp.png', domain: 'Structured Cabling' },
  { name: 'Bosch', src: '/assets/partners/bosch.png', domain: 'Security & PA Systems' },
  { name: 'Cisco', src: '/assets/partners/cisco.png', domain: 'Enterprise Networking' },
  { name: 'Dahua', src: '/assets/partners/dahua.png', domain: 'IP Surveillance' },
  { name: 'EntryPass', src: '/assets/partners/entrypass.png', domain: 'Access Control' },
  { name: 'Falco', src: '/assets/partners/falco.png', domain: 'Security Solutions' },
  { name: 'Hikvision', src: '/assets/partners/hikvision.png', domain: 'Video Surveillance' },
  { name: 'Honeywell', src: '/assets/partners/honeywell.png', domain: 'BMS & Fire/Security' },
  { name: 'HP', src: '/assets/partners/hp.png', domain: 'IT & Infrastructure' },
  { name: 'Huawei', src: '/assets/partners/huawei.png', domain: 'GPON & Networking' },
  { name: 'MAG', src: '/assets/partners/mag.png', domain: 'Parking & Barrier Gates' },
  { name: 'Panasonic', src: '/assets/partners/panasonic.png', domain: 'Intercom & Security' },
  { name: 'Paradox', src: '/assets/partners/paradox.png', domain: 'Intrusion Security' },
  { name: 'Samsung', src: '/assets/partners/samsung.png', domain: 'Digital Signage & Displays' },
  { name: 'Sony', src: '/assets/partners/sony.png', domain: 'Pro AV & Broadcast' },
  { name: 'TOA', src: '/assets/partners/toa.png', domain: 'Public Address Audio' },
  { name: 'Tyco', src: '/assets/partners/tyco.png', domain: 'Integrated Security' },
  { name: 'Ubiquiti', src: '/assets/partners/ubiquiti.png', domain: 'Wireless Networking' },
  { name: 'ZKTeco', src: '/assets/partners/zkteco.png', domain: 'Biometrics & Access' },
];

export const VISION_MISSION = {
  vision: {
    title: 'Vision',
    statement:
      'Aiming to be a leading company in the region, well recognized by customers for our remarkable values, reliability, superior quality and services.',
  },
  mission: {
    title: 'Mission',
    statement:
      'Pursue and deliver invincible creative and innovative communication technologies for the benefit of customers, employees and the organization, with respect to quality, delivery and continued service support.',
  },
};

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'excellence',
    index: '01',
    title: 'Excellence',
    description:
      'Maintaining a personal commitment to professionalism and integrity, excellence in performance, and standing by our ethical standards through quality control and continuous improvement.',
  },
  {
    id: 'integrity',
    index: '02',
    title: 'Integrity',
    description:
      'Acting with transparency, commitment and honor without compromising the truth.',
  },
  {
    id: 'innovation',
    index: '03',
    title: 'Innovation',
    description:
      'Striving for new creative ideas that have the potential to guarantee customer satisfaction & business success.',
  },
  {
    id: 'recognition',
    index: '04',
    title: 'Recognition',
    description:
      'Improving the knowledge, skills and capabilities of our employees by providing professional development, rewarding achievement and encouraging teamwork to achieve the organization’s goals and values.',
  },
  {
    id: 'accountability',
    index: '05',
    title: 'Accountability',
    description:
      'We hold ourselves accountable for the quality and adequacy of work performance, and strive to increase productivity and mitigate adverse events to business processes. We make sure assignments are managed with integrity and in compliance with high standards of quality. We stand by our decisions, actions, and the overall performance of assignments to maintain a positive company culture, vision, and ethics.',
  },
];

export interface OrgDepartment {
  id: string;
  department: string;
  accent: 'cyan' | 'violet' | 'blue' | 'teal';
  roles: string[];
  focus: string;
}

export const ORG_STRUCTURE = {
  leadership: {
    title: 'Director',
    subtitle: 'Executive Governance & Strategic Engineering Oversight',
  },
  departments: [
    {
      id: 'finance',
      department: 'Finance Department',
      accent: 'cyan' as const,
      roles: ['Finance Executive'],
      focus: 'Project accounting, supplier settlement, and commercial compliance.',
    },
    {
      id: 'hr',
      department: 'Human Resource',
      accent: 'violet' as const,
      roles: ['HR Executive', 'Admin / Clerk', 'Despatch'],
      focus: 'Workforce development, office administration, and field logistics.',
    },
    {
      id: 'technical',
      department: 'Technical Department',
      accent: 'blue' as const,
      roles: ['Senior Engineer', 'Engineer', 'Technical Worker'],
      focus: 'ELV & M&E system design, field installation, testing, and 24/7 preventive support.',
    },
    {
      id: 'sales',
      department: 'Sales / Marketing',
      accent: 'teal' as const,
      roles: ['Sales / Marketing Executive'],
      focus: 'Client consultation, Astro & ELV quotations, and long-term project partnerships.',
    },
  ] satisfies OrgDepartment[],
};
