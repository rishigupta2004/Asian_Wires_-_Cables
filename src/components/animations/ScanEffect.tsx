'use client';

import { motion } from 'framer-motion';

interface ScanEffectProps {
  className?: string;
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'horizontal' | 'vertical';
}

export function ScanEffect({
  className = '',
  color = '#E85D04',
  speed = 'normal',
  direction = 'vertical',
}: ScanEffectProps) {
  const duration = speed === 'slow' ? 3 : speed === 'normal' ? 2 : 1;
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Scan line with intense glow */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          background: `linear-gradient(${direction === 'vertical' ? '180deg' : '90deg'}, transparent 0%, ${color} 45%, #ffffff 50%, ${color} 55%, transparent 100%)`,
          boxShadow: `0 0 20px ${color}, 0 0 10px ${color}`,
          [direction === 'vertical' ? 'width' : 'height']: '100%',
          [direction === 'vertical' ? 'height' : 'width']: '3px',
        }}
        initial={{ 
          [direction === 'vertical' ? 'top' : 'left']: '-20%',
          [direction === 'vertical' ? 'left' : 'top']: 0,
          opacity: 0
        }}
        animate={{ 
          [direction === 'vertical' ? 'top' : 'left']: ['-20%', '120%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.5
        }}
      />
      
      {/* Trailing fade effect with gradient */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          background: `linear-gradient(${direction === 'vertical' ? '180deg' : '90deg'}, ${color}00 0%, ${color}15 100%)`,
          [direction === 'vertical' ? 'width' : 'height']: '100%',
          [direction === 'vertical' ? 'height' : 'width']: '20%',
        }}
        initial={{ 
          [direction === 'vertical' ? 'top' : 'left']: '-40%',
          [direction === 'vertical' ? 'left' : 'top']: 0,
        }}
        animate={{ 
          [direction === 'vertical' ? 'top' : 'left']: ['-40%', '100%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.5
        }}
      />
      
      {/* Technical Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
        }}
      />
      
      {/* Corner brackets with enhanced glow */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 pointer-events-none rounded-tl-sm" style={{ borderColor: color, filter: `drop-shadow(0 0 4px ${color})` }} />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 pointer-events-none rounded-tr-sm" style={{ borderColor: color, filter: `drop-shadow(0 0 4px ${color})` }} />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 pointer-events-none rounded-bl-sm" style={{ borderColor: color, filter: `drop-shadow(0 0 4px ${color})` }} />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 pointer-events-none rounded-br-sm" style={{ borderColor: color, filter: `drop-shadow(0 0 4px ${color})` }} />
    </div>
  );
}

// Circuit node connector
interface CircuitConnectorProps {
  className?: string;
  from?: 'top' | 'bottom' | 'left' | 'right';
  to?: 'top' | 'bottom' | 'left' | 'right';
  animated?: boolean;
  color?: string;
}

export function CircuitConnector({
  className = '',
  from = 'left',
  to = 'right',
  animated = true,
  color = '#B87333',
}: CircuitConnectorProps) {
  const getPath = () => {
    const paths: Record<string, Record<string, string>> = {
      left: {
        right: 'M 0 50 L 40 50 L 40 50 L 60 50 L 100 50',
        top: 'M 0 50 L 30 50 L 30 20 L 50 20 L 50 0',
        bottom: 'M 0 50 L 30 50 L 30 80 L 50 80 L 50 100',
      },
      right: {
        left: 'M 100 50 L 60 50 L 60 50 L 40 50 L 0 50',
        top: 'M 100 50 L 70 50 L 70 20 L 50 20 L 50 0',
        bottom: 'M 100 50 L 70 50 L 70 80 L 50 80 L 50 100',
      },
      top: {
        bottom: 'M 50 0 L 50 30 L 50 70 L 50 100',
        left: 'M 50 0 L 50 30 L 20 30 L 20 50 L 0 50',
        right: 'M 50 0 L 50 30 L 80 30 L 80 50 L 100 50',
      },
      bottom: {
        top: 'M 50 100 L 50 70 L 50 30 L 50 0',
        left: 'M 50 100 L 50 70 L 20 70 L 20 50 L 0 50',
        right: 'M 50 100 L 50 70 L 80 70 L 80 50 L 100 50',
      },
    };
    
    return paths[from]?.[to] || paths.left.right;
  };

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={getPath()}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        whileInView={animated ? { pathLength: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Nodes at corners */}
      <circle cx={from === 'left' ? 0 : from === 'right' ? 100 : 50} cy={from === 'top' ? 0 : from === 'bottom' ? 100 : 50} r="4" fill={color} />
      <circle cx={to === 'left' ? 0 : to === 'right' ? 100 : 50} cy={to === 'top' ? 0 : to === 'bottom' ? 100 : 50} r="4" fill={color} />
    </svg>
  );
}
