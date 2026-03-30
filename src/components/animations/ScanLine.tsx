'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScanLineProps {
  duration?: number;
  color?: string;
  lineHeight?: number;
  glowIntensity?: number;
  delay?: number;
  className?: string;
  repeat?: boolean;
}

export function ScanLine({
  duration = 2,
  color = '#E85D04',
  lineHeight = 2,
  glowIntensity = 10,
  delay = 0,
  className = '',
  repeat = false,
}: ScanLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: !repeat });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          height: lineHeight,
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          boxShadow: `0 0 ${glowIntensity}px ${color}, 0 0 ${glowIntensity * 2}px ${color}`,
        }}
        initial={{ top: '0%' }}
        animate={isInView ? { top: '100%' } : {}}
        transition={{
          duration,
          delay,
          ease: 'linear',
          repeat: repeat ? Infinity : 0,
          repeatDelay: repeat ? 1 : 0,
        }}
      />
      
      {/* Overlay gradient that follows scan line */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          height: '60px',
          background: `linear-gradient(180deg, ${color}10 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
        initial={{ top: '-60px' }}
        animate={isInView ? { top: 'calc(100% - 60px)' } : {}}
        transition={{
          duration,
          delay,
          ease: 'linear',
          repeat: repeat ? Infinity : 0,
          repeatDelay: repeat ? 1 : 0,
        }}
      />
    </div>
  );
}

// Scan effect for images
interface ImageScanProps {
  src: string;
  alt: string;
  duration?: number;
  color?: string;
  className?: string;
  scanOnHover?: boolean;
}

export function ImageScan({
  src,
  alt,
  duration = 2,
  color = '#E85D04',
  className = '',
  scanOnHover = true,
}: ImageScanProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <motion.div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      whileHover={scanOnHover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {/* Scan line overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        <ScanLine 
          duration={duration} 
          color={color} 
          repeat={scanOnHover}
          className="opacity-0 hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>
      
      {/* Digital noise overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

// Multiple scan lines (grid scan effect)
interface GridScanProps {
  rows?: number;
  duration?: number;
  color?: string;
  className?: string;
}

export function GridScan({
  rows = 3,
  duration = 3,
  color = '#E85D04',
  className = '',
}: GridScanProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            boxShadow: `0 0 8px ${color}`,
          }}
          initial={{ top: `${(index / rows) * 100}%` }}
          animate={isInView ? { 
            top: [`${(index / rows) * 100}%`, `${((index + 1) / rows) * 100}%`],
          } : {}}
          transition={{
            duration: duration / rows,
            delay: index * (duration / rows),
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
