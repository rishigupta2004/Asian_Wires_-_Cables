'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BRAND_COLORS } from '@/lib/constants';
import { buttonHover } from '@/lib/animations';

// ============================================
// TYPES
// ============================================

export interface ButtonProps {
  variant?: 'terminal' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

// ============================================
// STYLES
// ============================================

const baseStyles = `
  inline-flex
  items-center
  justify-center
  font-bold
  uppercase
  tracking-widest
  transition-all
  duration-200
  rounded-none
  cursor-pointer
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-offset-[${BRAND_COLORS.voidBlack}]
  disabled:opacity-50
  disabled:cursor-not-allowed
`;

const variantStyles = {
  terminal: `
    relative
    border-2
    border-[${BRAND_COLORS.electricCopper}]
    bg-transparent
    text-[${BRAND_COLORS.electricCopper}]
    hover:bg-[${BRAND_COLORS.electricCopper}]
    hover:text-[${BRAND_COLORS.voidBlack}]
    hover:shadow-[0_0_20px_rgba(232,93,4,0.5)]
    focus:ring-[${BRAND_COLORS.electricCopper}]
    before:content-['']
    before:absolute
    before:inset-0
    before:border
    before:border-[${BRAND_COLORS.electricCopper}]
    before:opacity-0
    before:transition-opacity
    hover:before:opacity-100
  `,
  primary: `
    bg-[${BRAND_COLORS.electricCopper}]
    text-[${BRAND_COLORS.voidBlack}]
    border-2
    border-[${BRAND_COLORS.electricCopper}]
    hover:shadow-[0_0_30px_rgba(232,93,4,0.6)]
    focus:ring-[${BRAND_COLORS.electricCopper}]
  `,
  secondary: `
    bg-transparent
    text-[${BRAND_COLORS.electricCopper}]
    border-2
    border-[${BRAND_COLORS.electricCopper}]
    hover:bg-[${BRAND_COLORS.electricCopper}]/10
    hover:shadow-[0_0_15px_rgba(232,93,4,0.3)]
    focus:ring-[${BRAND_COLORS.electricCopper}]
  `,
  ghost: `
    bg-transparent
    text-[${BRAND_COLORS.silverBright}]
    border-b-2
    border-transparent
    hover:border-[${BRAND_COLORS.electricCopper}]
    hover:text-[${BRAND_COLORS.electricCopper}]
    focus:ring-[${BRAND_COLORS.electricCopper}]
    pb-1
  `,
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

// ============================================
// COMPONENT
// ============================================

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const motionProps = {
    variants: buttonHover,
    initial: 'initial',
    whileHover: disabled ? undefined : 'hover',
    whileTap: disabled ? undefined : 'tap',
  };

  if (href) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link
          href={href}
          className={combinedClassName}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

export default Button;
