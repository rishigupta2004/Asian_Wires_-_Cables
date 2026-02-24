'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { BRAND_COLORS, PRODUCT_TIERS } from '@/lib/constants';
import { cardHover, scanLine, fadeInUp } from '@/lib/animations';

// ============================================
// PRODUCT CARD TYPES & COMPONENT
// ============================================

export interface ProductCardProps {
  partNumber: string;
  name: string;
  description: string;
  tier: 'TRUE_MASTER' | 'M1_VOICE' | 'PRO_ASIAN';
  image?: string;
  specifications?: Record<string, string>;
  href?: string;
  className?: string;
}

const tierColors = {
  TRUE_MASTER: BRAND_COLORS.tierGold,
  M1_VOICE: BRAND_COLORS.tierBlue,
  PRO_ASIAN: BRAND_COLORS.tierGreen,
};

const tierGlows = {
  TRUE_MASTER: '0 0 30px rgba(255,215,0,0.3)',
  M1_VOICE: '0 0 30px rgba(59,130,246,0.3)',
  PRO_ASIAN: '0 0 30px rgba(16,185,129,0.3)',
};

export const ProductCard: React.FC<ProductCardProps> = ({
  partNumber,
  name,
  description,
  tier,
  image,
  specifications,
  href,
  className = '',
}) => {
  const tierInfo = PRODUCT_TIERS[tier];
  const tierColor = tierColors[tier];
  const tierGlow = tierGlows[tier];

  return (
    <motion.div
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      className={`
        relative
        bg-[${BRAND_COLORS.graphite}]
        border
        border-[${BRAND_COLORS.steelGray}]
        overflow-hidden
        group
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Tier Badge */}
      <div
        className="absolute top-0 right-0 z-10 px-3 py-1 text-xs font-mono uppercase tracking-wider"
        style={{
          backgroundColor: tierColor,
          color: BRAND_COLORS.voidBlack,
        }}
      >
        {tierInfo.name}
      </div>

      {/* Image Area with Scan Line */}
      <div className="relative h-48 bg-[${BRAND_COLORS.carbon}] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[${BRAND_COLORS.steelGray}] font-mono text-sm">
              [NO IMAGE]
            </div>
          </div>
        )}
        
        {/* Scan Line Animation */}
        <motion.div
          variants={scanLine}
          initial="initial"
          animate="animate"
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND_COLORS.electricCopper}, transparent)`,
            boxShadow: `0 0 10px ${BRAND_COLORS.electricCopper}`,
          }}
        />
        
        {/* Circuit Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, ${BRAND_COLORS.steelGray} 1px, transparent 1px),
              linear-gradient(${BRAND_COLORS.steelGray} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Part Number - Monospace */}
        <div 
          className="font-mono text-xs uppercase tracking-wider mb-2"
          style={{ color: BRAND_COLORS.silverMuted }}
        >
          {partNumber}
        </div>

        {/* Product Name */}
        <h3 
          className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{ color: BRAND_COLORS.silverBright }}
        >
          {name}
        </h3>

        {/* Description */}
        <p 
          className="text-sm mb-4 line-clamp-2"
          style={{ color: BRAND_COLORS.silverMuted }}
        >
          {description}
        </p>

        {/* Specifications */}
        {specifications && Object.keys(specifications).length > 0 && (
          <div className="border-t border-[${BRAND_COLORS.steelGray}] pt-4 mt-4">
            <div className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: BRAND_COLORS.electricCopper }}>
              SPECIFICATIONS
            </div>
            <dl className="grid grid-cols-2 gap-2">
              {Object.entries(specifications).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <dt className="text-xs uppercase" style={{ color: BRAND_COLORS.steelGray }}>
                    {key}
                  </dt>
                  <dd className="font-mono text-sm" style={{ color: BRAND_COLORS.silverBright }}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Action Link */}
        {href && (
          <div className="mt-4 pt-4 border-t border-[${BRAND_COLORS.steelGray}]">
            <a
              href={href}
              className="inline-flex items-center text-sm font-bold uppercase tracking-wider transition-colors hover:text-[${BRAND_COLORS.electricCopper}]"
              style={{ color: tierColor }}
            >
              VIEW SPEC SHEET
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 60px ${tierColor}20`,
        }}
      />
    </motion.div>
  );
};

// ============================================
// FEATURE CARD TYPES & COMPONENT
// ============================================

export interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  number,
  title,
  description,
  icon: Icon,
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`
        relative
        pl-6
        py-6
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        borderLeft: `2px solid ${BRAND_COLORS.electricCopper}`,
      }}
    >
      {/* Number - Large Monospace */}
      <div 
        className="absolute -left-3 -top-2 font-mono text-4xl font-bold opacity-30"
        style={{ color: BRAND_COLORS.electricCopper }}
      >
        {number}
      </div>

      {/* Icon */}
      <div 
        className="mb-4"
        style={{ color: BRAND_COLORS.electricCopper }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 
        className="text-xl font-bold uppercase tracking-wide mb-3"
        style={{ color: BRAND_COLORS.silverBright }}
      >
        {title}
      </h3>

      {/* Description */}
      <p 
        className="text-base leading-relaxed"
        style={{ color: BRAND_COLORS.silverMuted }}
      >
        {description}
      </p>

      {/* Circuit Line Decoration */}
      <div 
        className="absolute bottom-0 left-0 w-16 h-px"
        style={{ backgroundColor: BRAND_COLORS.steelGray }}
      />
    </motion.div>
  );
};

export default { ProductCard, FeatureCard };
