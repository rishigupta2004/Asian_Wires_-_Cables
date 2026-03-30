/**
 * Design Tokens for Asian Wires & Cables
 * Premium Dark Luxury Editorial Aesthetic
 * Refined, sophisticated, high-end portfolio design
 */

// Color Palette - Premium Dark Editorial
const colorPalette = {
  // Backgrounds
  background: {
    primary: '#0A0A0A',
    secondary: '#111111',
    tertiary: '#1A1A1A',
    elevated: '#222222',
  },
  
  // Foreground
  foreground: {
    primary: '#FAFAFA',
    secondary: '#A1A1A1',
    tertiary: '#666666',
    disabled: '#444444',
  },
  
  // Accent - Warm Brass (refined copper)
  accent: {
    primary: '#D4A574',
    hover: '#E8C9A0',
    muted: '#8B7355',
    subtle: 'rgba(212, 165, 116, 0.1)',
  },
  
  // Borders
  border: {
    subtle: '#2A2A2A',
    default: '#333333',
    active: '#444444',
    strong: '#444444',
  },
  
  // Legacy support
  electricCopper: '#D4A574',
  graphite: '#171717',
  carbon: '#262626',
};

export const colors = colorPalette;

// Spacing Scale
const spacingScale = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
};

export const spacing = spacingScale;

// Typography Scale
const typographyScale = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  
  fontSize: {
    '2xs': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.1em', textTransform: 'uppercase' }],
    xs: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em', textTransform: 'uppercase' }],
    sm: ['0.8125rem', { lineHeight: '1.6' }],
    base: ['0.9375rem', { lineHeight: '1.6' }],
    lg: ['1.0625rem', { lineHeight: '1.6' }],
    xl: ['1.1875rem', { lineHeight: '1.5' }],
    '2xl': ['1.375rem', { lineHeight: '1.3' }],
    '3xl': ['1.625rem', { lineHeight: '1.2' }],
    '4xl': ['2rem', { lineHeight: '1.2' }],
    '5xl': ['2.5rem', { lineHeight: '1.1' }],
    '6xl': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
    '7xl': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
    '8xl': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
    '9xl': ['6.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    micro: '0.15em',
  },
  
  textTransform: {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  },
};

export const typography = typographyScale;

// Border & Radius
const borderScale = {
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
  },
  radius: {
    none: '0px',
    sm: '2px',
    DEFAULT: '4px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },
};

export const border = borderScale;

// Shadows & Glows
const effectsValues = {
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    DEFAULT: '0 2px 4px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 12px 0 rgb(0 0 0 / 0.3)',
    lg: '0 8px 24px 0 rgb(0 0 0 / 0.4)',
    xl: '0 16px 48px 0 rgb(0 0 0 / 0.5)',
  },
  
  glow: {
    brass: '0 0 30px rgba(212, 165, 116, 0.3)',
    'brass-strong': '0 0 50px rgba(212, 165, 116, 0.5)',
    subtle: '0 0 20px rgba(255, 255, 255, 0.05)',
  },
};

export const effects = effectsValues;

// Z-Index Scale
const zIndexScale = {
  hide: -1,
  auto: 'auto' as const,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  cursor: 2000,
};

export const zIndex = zIndexScale;

// Transitions
const transitionValues = {
  duration: {
    instant: '0ms',
    fastest: '100ms',
    fast: '200ms',
    normal: '400ms',
    slow: '600ms',
    slower: '800ms',
    slowest: '1000ms',
  },
  
  easing: {
    DEFAULT: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.87, 0, 0.13, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

export const transitions = transitionValues;

// Breakpoints
const breakpointValues = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
};

export const breakpoints = breakpointValues;

// Container
const containerValues = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1600px',
    '7xl': '80rem',
  },
  padding: {
    DEFAULT: '1.5rem',
    sm: '2rem',
    lg: '3rem',
    xl: '4rem',
    '2xl': '6rem',
  },
};

export const container = containerValues;
