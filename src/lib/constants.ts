/**
 * CONDUCTIVITY Design System - Constants
 * Asian Wires & Cables - Industrial Circuit Board Theme
 */

// ============================================
// COLOR PALETTE - Electric Circuit Theme
// ============================================

export const BRAND_COLORS = {
  // Electric Copper - Primary
  electricCopper: '#E85D04',
  burnishedCopper: '#9C6644',
  copperDark: '#7F5539',

  // Industrial Steel
  silverBright: '#E5E5E5',
  silverMuted: '#A3A3A3',
  steelGray: '#525252',

  // Energy Accents
  electricBlue: '#00D9FF',
  warningYellow: '#FFB800',
  powerRed: '#FF3333',

  // Backgrounds
  voidBlack: '#050505',
  graphite: '#171717',
  carbon: '#262626',
  circuitBg: '#0a0a0a',

  // Quality Tiers
  tierGold: '#FFD700',
  tierBlue: '#3B82F6',
  tierGreen: '#10B981',
} as const;

// ============================================
// CONTACT INFORMATION
// ============================================

export const CONTACT_INFO = {
  address: {
    street: 'Ground Floor, 1051, Mahavir Bhawan',
    locality: 'Sita Ram Bazar',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110006',
    country: 'India',
    full: 'Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006',
  },
  phone: {
    mobile: '+91-9811733043',
    landline: '011-40079555',
    mobileDisplay: '+91 98117 33043',
    landlineDisplay: '011-4007-9555',
  },
  email: {
    primary: 'brijasian@gmail.com',
    secondary: 'asianwires@yahoo.com',
  },
  social: {
    linkedin: '',
    twitter: '',
  },
} as const;

// ============================================
// COMPANY INFORMATION
// ============================================

export const COMPANY_INFO = {
  name: 'Asian Wires & Cables',
  legalName: 'Asian Wires & Cables Pvt. Ltd.',
  tagline: 'Conducting Excellence Since 1990',
  shortTagline: 'Conducting Excellence',
  since: 1990,
  yearsOfExperience: new Date().getFullYear() - 1990,
  certification: 'ISO 9001:2008',
  industry: 'Electrical Wires & Cables Manufacturing',
  description:
    'Leading manufacturer of high-quality electrical wires and cables in India. Delivering reliable power solutions for industrial, commercial, and residential applications.',
} as const;

// ============================================
// NAVIGATION ROUTES
// ============================================

export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  quality: '/quality',
  infrastructure: '/infrastructure',
  clients: '/clients',
  contact: '/contact',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  { label: 'Products', href: ROUTES.products },
  { label: 'Quality', href: ROUTES.quality },
  { label: 'Infrastructure', href: ROUTES.infrastructure },
  { label: 'Clients', href: ROUTES.clients },
  { label: 'Contact', href: ROUTES.contact },
] as const;

// ============================================
// PRODUCT CATEGORIES
// ============================================

export const PRODUCT_CATEGORIES = [
  {
    id: 'pvc-insulated',
    name: 'PVC Insulated Wires',
    description: 'Multi-strand copper conductor wires for domestic and industrial use',
  },
  {
    id: 'submersible',
    name: 'Submersible Cables',
    description: 'Heavy-duty cables designed for underwater pump applications',
  },
  {
    id: 'coaxial',
    name: 'Coaxial Cables',
    description: 'High-frequency transmission cables for communication systems',
  },
  {
    id: 'lan-cables',
    name: 'LAN Cables',
    description: 'Structured cabling solutions for network infrastructure',
  },
  {
    id: 'cctv-cables',
    name: 'CCTV Cables',
    description: 'Specialized cables for surveillance and security systems',
  },
  {
    id: 'multicore',
    name: 'Multicore Cables',
    description: 'Flexible cables with multiple insulated conductors',
  },
] as const;

// ============================================
// QUALITY STANDARDS
// ============================================

export const QUALITY_STANDARDS = [
  {
    code: 'IS 694',
    name: 'PVC Insulated Cables',
    description: 'Indian Standard for flexible cables',
  },
  {
    code: 'IS 1554',
    name: 'PVC Insulated Power Cables',
    description: 'Standard for heavy-duty power transmission',
  },
  {
    code: 'IS 7098',
    name: 'XLPE Insulated Cables',
    description: 'Cross-linked polyethylene insulated cables',
  },
] as const;

// ============================================
// META & SEO
// ============================================

export const META_DEFAULTS = {
  title: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
  description: COMPANY_INFO.description,
  keywords: [
    'electrical wires',
    'cables',
    'pvc wires',
    'submersible cables',
    'coaxial cables',
    'lan cables',
    'cctv cables',
    'multicore cables',
    'wire manufacturer India',
    'cable manufacturer Delhi',
    'Asian Wires',
    'electrical cables',
    'copper wires',
  ].join(', '),
  author: COMPANY_INFO.name,
  locale: 'en_IN',
} as const;

// ============================================
// BREAKPOINTS (CSS Custom Properties mirror)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================
// CERTIFICATIONS
// ============================================

export const CERTIFICATIONS = {
  iso: {
    name: 'ISO 9001:2008',
    description: 'Quality Management System Certified',
    icon: 'iso',
  },
  makeInIndia: {
    name: 'Make in India',
    description: 'Proudly manufactured in India',
    icon: 'flag',
  },
} as const;

// ============================================
// PRODUCT TIERS
// ============================================

export const PRODUCT_TIERS = {
  TRUE_MASTER: {
    name: 'True Master',
    color: '#FFD700',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500',
    description: 'Premium quality for critical applications',
    features: ['Maximum durability', 'Extended warranty', 'Premium materials'],
  },
  M1_VOICE: {
    name: 'M1 VOICE',
    color: '#3B82F6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    description: 'Professional grade for reliable performance',
    features: ['High quality', 'Standard warranty', 'Industry standard'],
  },
  PRO_ASIAN: {
    name: 'Pro Asian 1051',
    color: '#10B981',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
    description: 'Standard quality for everyday use',
    features: ['Good performance', 'Basic warranty', 'Cost-effective'],
  },
} as const;

// ============================================
// BRAND ARCHITECTURE (NEW)
// ============================================

export const BRANDS = {
  ASIAN: {
    id: 'ASIAN',
    tier: 1,
    tagline: 'HEAVY DUTY — MAXIMUM SHIELDING',
    description: 'The flagship brand. EC-grade copper conductors with heavy-gauge multi-layer shielding. Built for harsh industrial environments, high-tension infrastructure, and applications demanding zero compromise. Thicker armoring, superior insulation tolerance, and the highest current ratings in the range.',
    shieldingLevel: 'HEAVY-DUTY MULTI-LAYER',
    conductorGrade: 'EC Grade — 99.97% Pure Copper',
    typicalUse: 'Power grid, petrochemical, mining, metro rail, data centres',
    badge: 'bg-[#0F0F0F] text-[#E4E3DB]',
    accentColor: '#FF3300',
  },
  M1: {
    id: 'M1',
    tier: 2,
    tagline: 'PERFORMANCE — SINGLE-LAYER SHIELDING',
    description: 'The performance mid-range. Same conductor purity as ASIAN, with single-layer shielding optimised for commercial construction, light industrial, and professional audio/AV installations. Excellent quality at a more accessible price point for volume projects.',
    shieldingLevel: 'SINGLE-LAYER STANDARD',
    conductorGrade: 'EC Grade Copper — IS:8130',
    typicalUse: 'Commercial construction, light industrial, public address systems',
    badge: 'bg-[#D7D6CD] text-[#0F0F0F]',
    accentColor: '#0F0F0F',
  },
  TRUE_MASTER: {
    id: 'TRUE_MASTER',
    tier: 3,
    tagline: 'RELIABLE — STANDARD SHIELDING',
    description: 'The dependable choice for everyday wiring requirements. Standard-grade shielding for residential, light commercial, and consumer audio/music applications where performance requirements are well-defined and cost efficiency matters.',
    shieldingLevel: 'STANDARD SINGLE-LAYER',
    conductorGrade: 'EC Grade Copper — IS:694',
    typicalUse: 'Residential, retail, music venues, PA systems, studio wiring',
    badge: 'bg-[#E4E3DB] text-[#0F0F0F] border-2 border-[#0F0F0F]',
    accentColor: '#888',
  },
} as const;

// ============================================
// ANIMATION DURATIONS
// ============================================

export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
} as const;

// ============================================
// EASING FUNCTIONS
// ============================================

export const EASING = {
  // Sharp, industrial feel
  sharp: [0.4, 0, 0.2, 1],
  // Electric pulse feel
  pulse: [0.68, -0.55, 0.265, 1.55],
  // Circuit flow
  flow: [0.25, 0.1, 0.25, 1],
  // Power up
  powerUp: [0.0, 0.0, 0.2, 1],
  // Linear for consistent motion
  linear: [0, 0, 1, 1],
} as const;
