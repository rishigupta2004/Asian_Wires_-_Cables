'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CircuitPathProps {
  d: string;
  delay?: number;
  color?: string;
  strokeWidth?: number;
  glowIntensity?: number;
  className?: string;
}

function CircuitPath({ 
  d, 
  delay = 0, 
  color = '#E85D04', 
  strokeWidth = 2,
  glowIntensity = 10,
  className = ''
}: CircuitPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set({ pathLength: 1, opacity: 1 });
      return;
    }

    if (isInView) {
      controls.start({
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            duration: 1.5,
            delay,
            ease: 'easeInOut',
          },
          opacity: {
            duration: 0.1,
            delay,
          },
        },
      });
    }
  }, [isInView, controls, delay, prefersReducedMotion]);

  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={controls}
      style={{
        filter: `drop-shadow(0 0 ${glowIntensity}px ${color})`,
        willChange: 'stroke-dashoffset, opacity',
      }}
    />
  );
}

interface CircuitLinesProps {
  paths: Array<{
    d: string;
    delay?: number;
    color?: string;
    strokeWidth?: number;
    glowIntensity?: number;
  }>;
  className?: string;
  viewBox?: string;
  width?: string;
  height?: string;
}

export function CircuitLines({ 
  paths, 
  className = '',
  viewBox = '0 0 100 100',
  width = '100%',
  height = '100%'
}: CircuitLinesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      viewBox={viewBox}
      width={width}
      height={height}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {paths.map((path, index) => (
        <CircuitPath
          key={index}
          d={path.d}
          delay={path.delay}
          color={path.color}
          strokeWidth={path.strokeWidth}
          glowIntensity={path.glowIntensity}
        />
      ))}
    </svg>
  );
}

// Predefined circuit patterns
export const circuitPatterns = {
  // Horizontal line with node
  horizontal: (y: number, x1: number, x2: number) => `M ${x1} ${y} L ${x2} ${y}`,
  
  // Vertical line with node
  vertical: (x: number, y1: number, y2: number) => `M ${x} ${y1} L ${x} ${y2}`,
  
  // Corner (right angle)
  corner: (x1: number, y1: number, x2: number, y2: number) => `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`,
  
  // T-junction
  tJunction: (x: number, y1: number, y2: number, xBranch: number) => 
    `M ${x} ${y1} L ${x} ${y2} M ${x} ${(y1 + y2) / 2} L ${xBranch} ${(y1 + y2) / 2}`,
  
  // Cross
  cross: (x: number, y: number, size: number) => 
    `M ${x - size} ${y} L ${x + size} ${y} M ${x} ${y - size} L ${x} ${y + size}`,
  
  // Zigzag
  zigzag: (x1: number, y1: number, x2: number, segments: number) => {
    const dx = (x2 - x1) / segments;
    let path = `M ${x1} ${y1}`;
    for (let i = 0; i < segments; i++) {
      const x = x1 + dx * (i + 0.5);
      const y = y1 + (i % 2 === 0 ? -5 : 5);
      path += ` L ${x} ${y}`;
    }
    path += ` L ${x2} ${y1}`;
    return path;
  },
};

// Animated node that pulses
interface CircuitNodeProps {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  delay?: number;
  pulseDuration?: number;
}

export function CircuitNode({ 
  cx, 
  cy, 
  r = 4, 
  color = '#E85D04',
  delay = 0,
  pulseDuration = 2
}: CircuitNodeProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<SVGCircleElement>(null);
  const isInView = useInView(ref, { once: true });

  if (prefersReducedMotion) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
      />
    );
  }

  return (
    <motion.circle
      ref={ref}
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? {
        scale: [0, 1.2, 1],
        opacity: 1,
      } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
    >
      <animate
        attributeName="r"
        values={`${r};${r * 1.5};${r}`}
        dur={`${pulseDuration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="1;0.5;1"
        dur={`${pulseDuration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </motion.circle>
  );
}
