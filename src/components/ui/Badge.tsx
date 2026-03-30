'use client';

import React from 'react';
import { BRAND_COLORS, CERTIFICATIONS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

export interface BadgeProps {
  variant: 'iso' | 'make-in-india' | 'tier-gold' | 'tier-blue' | 'tier-green' | 'category' | 'status';
  children: React.ReactNode;
  className?: string;
}

// ============================================
// STYLES & CONFIG
// ============================================

const badgeStyles = {
  iso: {
    base: `
      inline-flex
      items-center
      gap-2
      px-3
      py-1.5
      bg-[${BRAND_COLORS.carbon}]
      border
      border-[${BRAND_COLORS.steelGray}]
      rounded-none
    `,
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    `,
    text: 'text-xs font-mono uppercase tracking-wider text-[${BRAND_COLORS.silverBright}]',
  },
  'make-in-india': {
    base: `
      inline-flex
      items-center
      gap-2
      px-3
      py-1.5
      bg-[${BRAND_COLORS.carbon}]
      border
      border-[${BRAND_COLORS.tierGold}]
      rounded-none
    `,
    icon: `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    `,
    text: 'text-xs font-bold uppercase tracking-wider text-[${BRAND_COLORS.tierGold}]',
  },
  'tier-gold': {
    base: `
      inline-flex
      items-center
      px-3
      py-1
      bg-[${BRAND_COLORS.tierGold}]
      text-[${BRAND_COLORS.voidBlack}]
      rounded-none
    `,
    text: 'text-xs font-bold uppercase tracking-wider',
  },
  'tier-blue': {
    base: `
      inline-flex
      items-center
      px-3
      py-1
      bg-[${BRAND_COLORS.tierBlue}]
      text-white
      rounded-none
    `,
    text: 'text-xs font-bold uppercase tracking-wider',
  },
  'tier-green': {
    base: `
      inline-flex
      items-center
      px-3
      py-1
      bg-[${BRAND_COLORS.tierGreen}]
      text-[${BRAND_COLORS.voidBlack}]
      rounded-none
    `,
    text: 'text-xs font-bold uppercase tracking-wider',
  },
  category: {
    base: `
      inline-flex
      items-center
      px-3
      py-1
      bg-transparent
      border
      border-[${BRAND_COLORS.electricCopper}]
      rounded-none
    `,
    text: 'text-xs font-mono uppercase tracking-wider text-[${BRAND_COLORS.electricCopper}]',
  },
  status: {
    base: `
      inline-flex
      items-center
      gap-1.5
      px-2
      py-1
      bg-[${BRAND_COLORS.carbon}]
      rounded-none
    `,
    text: 'text-xs font-mono uppercase tracking-wider',
  },
};

// ============================================
// HELPER COMPONENTS
// ============================================

const LionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);

const ISOIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const StatusDot = ({ color }: { color: string }) => (
  <span 
    className="w-1.5 h-1.5 rounded-none animate-pulse"
    style={{ backgroundColor: color }}
  />
);

// ============================================
// MAIN COMPONENT
// ============================================

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className = '',
}) => {
  const styles = badgeStyles[variant];

  const getStatusColor = () => {
    const statusText = String(children).toLowerCase();
    if (statusText.includes('active') || statusText.includes('available')) {
      return BRAND_COLORS.tierGreen;
    }
    if (statusText.includes('pending')) {
      return BRAND_COLORS.warningYellow;
    }
    if (statusText.includes('inactive') || statusText.includes('unavailable')) {
      return BRAND_COLORS.powerRed;
    }
    return BRAND_COLORS.silverMuted;
  };

  const baseClasses = styles.base.trim().replace(/\s+/g, ' ');
  const textClasses = styles.text ? styles.text.trim().replace(/\s+/g, ' ') : '';

  return (
    <span className={`${baseClasses} ${className}`}>
      {variant === 'make-in-india' && (
        <span style={{ color: BRAND_COLORS.tierGold }}>
          <LionIcon />
        </span>
      )}
      {variant === 'iso' && (
        <span style={{ color: BRAND_COLORS.electricCopper }}>
          <ISOIcon />
        </span>
      )}
      {variant === 'status' && (
        <StatusDot color={getStatusColor()} />
      )}
      <span className={textClasses}>{children}</span>
    </span>
  );
};

// ============================================
// SPECIALIZED BADGE COMPONENTS
// ============================================

export const ISOBadge: React.FC<{ certification?: string; className?: string }> = ({
  certification = 'ISO 9001:2015',
  className = '',
}) => (
  <Badge variant="iso" className={className}>
    {certification}
  </Badge>
);

export const MakeInIndiaBadge: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <Badge variant="make-in-india" className={className}>
    Make in India
  </Badge>
);

export const TierBadge: React.FC<{
  tier: 'gold' | 'blue' | 'green';
  children: React.ReactNode;
  className?: string;
}> = ({ tier, children, className = '' }) => {
  const variantMap = {
    gold: 'tier-gold',
    blue: 'tier-blue',
    green: 'tier-green',
  } as const;

  return (
    <Badge variant={variantMap[tier]} className={className}>
      {children}
    </Badge>
  );
};

export const CategoryBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <Badge variant="category" className={className}>
    {children}
  </Badge>
);

export const StatusBadge: React.FC<{
  status: string;
  className?: string;
}> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('active') || statusLower.includes('available') || statusLower.includes('in stock')) {
      return { color: BRAND_COLORS.tierGreen };
    }
    if (statusLower.includes('pending') || statusLower.includes('low stock')) {
      return { color: BRAND_COLORS.warningYellow };
    }
    if (statusLower.includes('inactive') || statusLower.includes('unavailable') || statusLower.includes('out of stock')) {
      return { color: BRAND_COLORS.powerRed };
    }
    return { color: BRAND_COLORS.silverMuted };
  };

  return (
    <span 
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2
        py-1
        bg-[${BRAND_COLORS.carbon}]
        rounded-none
        text-xs
        font-mono
        uppercase
        tracking-wider
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={getStatusStyles()}
    >
      <StatusDot color={getStatusStyles().color} />
      {status}
    </span>
  );
};

export default Badge;
