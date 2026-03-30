'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ElectricGlowProps {
  children: ReactNode;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  pulseSpeed?: number;
  className?: string;
  glowOnHover?: boolean;
}

export function ElectricGlow({
  children,
  color = '#E85D04',
  intensity = 'medium',
  pulseSpeed = 2,
  className = '',
  glowOnHover = false,
}: ElectricGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const intensityMap = {
    low: { blur: 10, spread: 1, opacity: 0.15 },
    medium: { blur: 25, spread: 2, opacity: 0.3 },
    high: { blur: 45, spread: 4, opacity: 0.5 },
  };

  const { blur, spread, opacity } = intensityMap[intensity];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      whileHover={glowOnHover ? {
        scale: 1.02,
      } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Animated glow layer using drop-shadow for better performance and look */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        animate={{
          filter: [
            `drop-shadow(0 0 ${blur * 0.5}px ${color}${Math.round(opacity * 60)})`,
            `drop-shadow(0 0 ${blur}px ${color}${Math.round(opacity * 100)})`,
            `drop-shadow(0 0 ${blur * 0.5}px ${color}${Math.round(opacity * 60)})`,
          ],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          borderRadius: 'inherit',
          zIndex: -1,
        }}
      />
      
      {/* Subtle ambient light */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: pulseSpeed * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
        style={{
          borderRadius: 'inherit',
          background: `radial-gradient(circle at center, ${color}15 0%, transparent 70%)`,
          zIndex: -2,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Static glow effect (no animation)
interface StaticGlowProps {
  children: ReactNode;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function StaticGlow({
  children,
  color = '#E85D04',
  intensity = 'medium',
  className = '',
}: StaticGlowProps) {
  const intensityMap = {
    low: { blur: 10, spread: 2 },
    medium: { blur: 20, spread: 4 },
    high: { blur: 40, spread: 8 },
  };

  const { blur, spread } = intensityMap[intensity];

  return (
    <div
      className={`relative ${className}`}
      style={{
        boxShadow: `0 0 ${blur}px ${spread}px ${color}40`,
      }}
    >
      {children}
    </div>
  );
}

// Border glow that traces around element
interface BorderGlowProps {
  children: ReactNode;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  className?: string;
}

export function BorderGlow({
  children,
  color = '#E85D04',
  strokeWidth = 2,
  duration = 3,
  className = '',
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Animated border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          rx="8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: {
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: 0.3,
            },
          }}
          style={{
            strokeDasharray: '20 10',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
