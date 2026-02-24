'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollStore } from '@/stores/scrollStore';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const setTransitioning = useScrollStore((state) => state.setTransitioning);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationStart={() => setTransitioning(true)}
        onAnimationComplete={() => setTransitioning(false)}
      >
        {/* Circuit breaker flash effect */}
        <motion.div
          className="fixed inset-0 bg-white z-[9999] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        />
        
        {/* Electricity crackle effect */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            duration: 0.5,
            times: [0, 0.5, 1],
          }}
        >
          {/* Random electric lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#E85D04]"
              style={{
                height: '2px',
                width: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px #E85D04, 0 0 20px #F48C06',
              }}
              initial={{ 
                opacity: 0, 
                scaleX: 0,
                rotate: Math.random() * 360,
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 0.15,
                delay: i * 0.02,
              }}
            />
          ))}
        </motion.div>
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Section transition for internal page sections
interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionTransition({ 
  children, 
  className = '',
  delay = 0 
}: SectionTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Power-up glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.5, 0] }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, #E85D0420 0%, transparent 70%)',
        }}
      />
      
      {children}
    </motion.div>
  );
}

// Circuit activation transition
interface CircuitActivationProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export function CircuitActivation({
  children,
  className = '',
  direction = 'left',
}: CircuitActivationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffset = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ 
        opacity: 0, 
        x: offset.x,
        y: offset.y,
        filter: 'blur(10px)',
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Activation line */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #E85D04, transparent)',
          ...(direction === 'left' || direction === 'right'
            ? { top: 0, bottom: 0, width: '2px' }
            : { left: 0, right: 0, height: '2px' }
          ),
          [direction === 'left' ? 'right' : direction === 'right' ? 'left' : direction === 'top' ? 'bottom' : 'top']: 0,
        }}
        initial={{ 
          opacity: 0,
          scale: direction === 'left' || direction === 'right' ? 1 : 0,
          scaleX: direction === 'left' || direction === 'right' ? 0 : 1,
        }}
        whileInView={{ 
          opacity: [0, 1, 0],
          scale: 1,
          scaleX: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      />
      
      {children}
    </motion.div>
  );
}

// Sparkle transition for elements
interface SparkleTransitionProps {
  children: ReactNode;
  className?: string;
  sparkleCount?: number;
}

export function SparkleTransition({
  children,
  className = '',
  sparkleCount = 6,
}: SparkleTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Sparkles */}
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#E85D04] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px #E85D04, 0 0 12px #F48C06',
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
      
      {children}
    </motion.div>
  );
}
