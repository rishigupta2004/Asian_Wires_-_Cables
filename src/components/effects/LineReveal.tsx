'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface LineRevealProps {
  children: ReactNode;
  className?: string;
  lineColor?: string;
  lineHeight?: number;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'center';
}

export function LineReveal({
  children,
  className = '',
  lineColor = '#E85D04',
  lineHeight = 2,
  delay = 0.3,
  duration = 0.6,
  direction = 'left',
}: LineRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const getOrigin = () => {
    switch (direction) {
      case 'left': return { left: 0, right: 'auto' };
      case 'right': return { left: 'auto', right: 0 };
      case 'center': return { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
    }
  };

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute bottom-0"
        style={{
          height: lineHeight,
          backgroundColor: lineColor,
          boxShadow: `0 0 10px ${lineColor}`,
          ...getOrigin(),
        }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{
          duration,
          delay,
          ease: APPLE_EASE,
        }}
      />
    </span>
  );
}

interface AnimatedUnderlineProps {
  children: ReactNode;
  className?: string;
  underlineColor?: string;
  underlineHeight?: number;
  delay?: number;
  duration?: number;
}

export function AnimatedUnderline({
  children,
  className = '',
  underlineColor = '#E85D04',
  underlineHeight = 3,
  delay = 0,
  duration = 0.8,
}: AnimatedUnderlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 w-full origin-left"
        style={{ height: underlineHeight, backgroundColor: underlineColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration,
          delay,
          ease: APPLE_EASE,
        }}
      />
    </div>
  );
}

interface HighlightRevealProps {
  children: ReactNode;
  className?: string;
  highlightColor?: string;
  delay?: number;
  duration?: number;
}

export function HighlightReveal({
  children,
  className = '',
  highlightColor = 'rgba(232, 93, 4, 0.2)',
  delay = 0,
  duration = 0.6,
}: HighlightRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      <motion.span
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: highlightColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration,
          delay,
          ease: APPLE_EASE,
        }}
      />
      {children}
    </span>
  );
}

interface BorderDrawProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  borderWidth?: number;
  delay?: number;
  duration?: number;
}

export function BorderDraw({
  children,
  className = '',
  borderColor = '#E85D04',
  borderWidth = 2,
  delay = 0,
  duration = 1,
}: BorderDrawProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Top border */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ height: borderWidth, backgroundColor: borderColor }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: duration * 0.25, delay, ease: APPLE_EASE }}
      />
      {/* Right border */}
      <motion.div
        className="absolute top-0 right-0"
        style={{ width: borderWidth, backgroundColor: borderColor }}
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: duration * 0.25, delay: delay + duration * 0.25, ease: APPLE_EASE }}
      />
      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 right-0"
        style={{ height: borderWidth, backgroundColor: borderColor }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: duration * 0.25, delay: delay + duration * 0.5, ease: APPLE_EASE }}
      />
      {/* Left border */}
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: borderWidth, backgroundColor: borderColor }}
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : { height: 0 }}
        transition={{ duration: duration * 0.25, delay: delay + duration * 0.75, ease: APPLE_EASE }}
      />
      {children}
    </div>
  );
}

interface CircleRevealProps {
  children: ReactNode;
  className?: string;
  circleColor?: string;
  delay?: number;
  duration?: number;
}

export function CircleReveal({
  children,
  className = '',
  circleColor = '#E85D04',
  delay = 0,
  duration = 0.6,
}: CircleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute rounded-full"
        style={{ backgroundColor: circleColor, opacity: 0.2 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1.5, opacity: 0.2 } : { scale: 0, opacity: 0 }}
        transition={{ duration, delay, ease: APPLE_EASE }}
      />
      {children}
    </div>
  );
}
