'use client';

import { motion } from 'framer-motion';
import { BRAND_COLORS } from '@/lib/constants';

interface CircuitButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export function CircuitButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  icon,
}: CircuitButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-all duration-300 overflow-hidden group';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  
  const variantStyles = {
    primary: `bg-[${BRAND_COLORS.electricCopper}] text-white border-2 border-[${BRAND_COLORS.electricCopper}] hover:bg-transparent hover:text-[${BRAND_COLORS.electricCopper}]`,
    secondary: 'bg-neutral-800 text-white border-2 border-neutral-700 hover:border-[#E85D04] hover:text-[#E85D04]',
    outline: 'bg-transparent text-white border-2 border-neutral-600 hover:border-[#E85D04] hover:text-[#E85D04]',
  };

  const content = (
    <>
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      
      {/* Hover fill effect */}
      <motion.span
        className="absolute inset-0 bg-[#E85D04]"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ opacity: variant === 'primary' ? 0 : 0.1 }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
