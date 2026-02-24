'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_COLORS } from '@/lib/constants';
import { fadeIn, staggerContainer } from '@/lib/animations';

// ============================================
// TYPES
// ============================================

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullBleed?: boolean;
  asymmetric?: 'left' | 'right' | 'none';
  divider?: 'top' | 'bottom' | 'both' | 'none';
  variant?: 'dark' | 'darker' | 'light';
  containerClassName?: string;
  animate?: boolean;
}

// ============================================
// STYLES
// ============================================

const variantStyles = {
  dark: {
    background: BRAND_COLORS.graphite,
    text: BRAND_COLORS.silverBright,
  },
  darker: {
    background: BRAND_COLORS.voidBlack,
    text: BRAND_COLORS.silverBright,
  },
  light: {
    background: BRAND_COLORS.silverBright,
    text: BRAND_COLORS.voidBlack,
  },
};

const dividerStyles = `
  absolute
  left-0
  right-0
  h-px
  bg-gradient-to-r
  from-transparent
  via-[${BRAND_COLORS.electricCopper}]
  to-transparent
`;

// ============================================
// COMPONENT
// ============================================

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  fullBleed = false,
  asymmetric = 'none',
  divider = 'none',
  variant = 'dark',
  containerClassName = '',
  animate = true,
}) => {
  const colors = variantStyles[variant];

  const getAsymmetricStyles = () => {
    switch (asymmetric) {
      case 'left':
        return 'lg:pr-[15%]';
      case 'right':
        return 'lg:pl-[15%]';
      default:
        return '';
    }
  };

  const MotionComponent = animate ? motion.section : 'section';
  const motionProps = animate
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
      }
    : {};

  return (
    <MotionComponent
      id={id}
      {...motionProps}
      className={`
        relative
        py-16
        md:py-24
        lg:py-32
        ${fullBleed ? '' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ backgroundColor: colors.background }}
    >
      {/* Top Divider */}
      {(divider === 'top' || divider === 'both') && (
        <div 
          className={`${dividerStyles} top-0`.trim().replace(/\s+/g, ' ')}
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND_COLORS.electricCopper}, transparent)`,
          }}
        />
      )}

      {/* Circuit Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${BRAND_COLORS.steelGray} 1px, transparent 1px),
            linear-gradient(${BRAND_COLORS.steelGray} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content Container */}
      <div
        className={`
          relative
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          ${fullBleed ? 'max-w-full' : 'max-w-7xl'}
          ${getAsymmetricStyles()}
          ${containerClassName}
        `.trim().replace(/\s+/g, ' ')}
        style={{ color: colors.text }}
      >
        {children}
      </div>

      {/* Bottom Divider */}
      {(divider === 'bottom' || divider === 'both') && (
        <div 
          className={`${dividerStyles} bottom-0`.trim().replace(/\s+/g, ' ')}
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND_COLORS.electricCopper}, transparent)`,
          }}
        />
      )}

      {/* Corner Accents */}
      <div 
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
        style={{
          borderTop: `2px solid ${BRAND_COLORS.electricCopper}`,
          borderLeft: `2px solid ${BRAND_COLORS.electricCopper}`,
          opacity: 0.3,
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
        style={{
          borderBottom: `2px solid ${BRAND_COLORS.electricCopper}`,
          borderRight: `2px solid ${BRAND_COLORS.electricCopper}`,
          opacity: 0.3,
        }}
      />
    </MotionComponent>
  );
};

// ============================================
// SECTION HEADER COMPONENT
// ============================================

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const alignLines = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };

  return (
    <motion.div
      variants={fadeIn}
      className={`
        mb-12
        md:mb-16
        flex
        flex-col
        ${alignLines[align]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <span 
          className="inline-block font-mono text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: BRAND_COLORS.electricCopper }}
        >
          {eyebrow}
        </span>
      )}

      {/* Title */}
      <h2 
        className={`
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
          uppercase
          tracking-tight
          ${alignStyles[align]}
        `.trim().replace(/\s+/g, ' ')}
        style={{ color: BRAND_COLORS.silverBright }}
      >
        {title}
      </h2>

      {/* Decorative Line */}
      <div 
        className={`
          mt-6
          h-0.5
          w-24
          ${align === 'center' ? 'mx-auto' : ''}
        `.trim().replace(/\s+/g, ' ')}
        style={{ backgroundColor: BRAND_COLORS.electricCopper }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p 
          className={`
            mt-6
            text-lg
            max-w-2xl
            ${alignStyles[align]}
          `.trim().replace(/\s+/g, ' ')}
          style={{ color: BRAND_COLORS.silverMuted }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default Section;
