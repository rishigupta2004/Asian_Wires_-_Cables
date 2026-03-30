'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VoltageMeterProps {
  value: number;
  maxValue?: number;
  color?: string;
  label?: string;
  unit?: string;
  duration?: number;
  delay?: number;
  className?: string;
  showDigital?: boolean;
  vertical?: boolean;
}

export function VoltageMeter({
  value,
  maxValue = 100,
  color = '#E85D04',
  label,
  unit = '%',
  duration = 1.5,
  delay = 0,
  className = '',
  showDigital = true,
  vertical = false,
}: VoltageMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });
  
  const percentage = useTransform(springValue, [0, maxValue], [0, 100]);
  const displayNumber = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, springValue]);

  useEffect(() => {
    const unsubscribe = displayNumber.on('change', (v) => {
      setDisplayValue(v);
    });
    
    return () => unsubscribe();
  }, [displayNumber]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {label && <div className="text-sm text-gray-400 mb-2">{label}</div>}
        <div className="flex items-end gap-2">
          <span className="text-3xl font-mono font-bold" style={{ color }}>
            {value}
          </span>
          <span className="text-lg text-gray-500">{unit}</span>
        </div>
      </div>
    );
  }

  const fillPercentage = (value / maxValue) * 100;

  return (
    <div ref={ref} className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">{label}</span>
          {showDigital && (
            <span className="text-sm font-mono" style={{ color }}>
              {displayValue}{unit}
            </span>
          )}
        </div>
      )}
      
      {/* Meter container */}
      <div 
        className={`relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 ${
          vertical ? 'w-6 h-40' : 'h-3'
        }`}
      >
        {/* Background ticks - More detailed */}
        <div className={`absolute inset-0 flex ${vertical ? 'flex-col-reverse' : ''} justify-between px-0.5`}>
          {Array.from({ length: 21 }).map((_, i) => (
            <div 
              key={i}
              className={`bg-gray-600 ${vertical ? 'w-full h-px my-auto' : 'w-px h-full'}`}
              style={{ 
                opacity: i % 10 === 0 ? 0.6 : i % 5 === 0 ? 0.4 : 0.15,
                height: !vertical && i % 5 !== 0 ? '60%' : '100%',
                width: vertical && i % 5 !== 0 ? '60%' : '100%',
                margin: 'auto'
              }}
            />
          ))}
        </div>
        
        {/* Fill bar with pulsing opacity and gradient */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            background: `linear-gradient(${vertical ? '0deg' : '90deg'}, ${color}20 0%, ${color}80 100%)`,
            boxShadow: `0 0 10px ${color}40`,
            ...(vertical 
              ? { bottom: 0, left: 0, right: 0 }
              : { top: 0, bottom: 0, left: 0 }
            ),
          }}
          initial={vertical ? { height: '0%' } : { width: '0%' }}
          animate={isInView ? { 
            [vertical ? 'height' : 'width']: `${fillPercentage}%`,
            opacity: [0.85, 1, 0.85]
          } : {}}
          transition={{
            ...(vertical ? {
              height: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1] as const,
              }
            } : {
              width: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1] as const,
              }
            }),
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        {/* Intense leading edge with glare */}
        <motion.div
          className="absolute z-10"
          style={{
            width: vertical ? '100%' : '3px',
            height: vertical ? '3px' : '100%',
            backgroundColor: '#ffffff',
            boxShadow: `0 0 5px #ffffff, 0 0 10px ${color}, 0 0 20px ${color}`,
          }}
          initial={vertical ? { bottom: '0%' } : { left: '0%' }}
          animate={isInView ? { 
            [vertical ? 'bottom' : 'left']: `${fillPercentage}%`,
          } : {}}
          transition={{
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
      
      {/* Digital display */}
      {showDigital && !label && (
        <div className="flex justify-end mt-1">
          <motion.span 
            className="text-lg font-mono font-bold tabular-nums"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.5 }}
          >
            {displayValue}
            <span className="text-sm text-gray-500 ml-1">{unit}</span>
          </motion.span>
        </div>
      )}
    </div>
  );
}

// Multi-segment meter (like a battery indicator)
interface SegmentMeterProps {
  value: number;
  maxValue?: number;
  segments?: number;
  color?: string;
  className?: string;
  delay?: number;
}

export function SegmentMeter({
  value,
  maxValue = 100,
  segments = 10,
  color = '#E85D04',
  className = '',
  delay = 0,
}: SegmentMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  
  const filledSegments = Math.round((value / maxValue) * segments);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`flex gap-1 ${className}`}>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 rounded-sm"
            style={{ 
              backgroundColor: i < filledSegments ? color : '#374151',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`flex gap-1 ${className}`}>
      {Array.from({ length: segments }).map((_, index) => {
        const isFilled = index < filledSegments;
        const segmentDelay = delay + (index * 0.05);
        
        return (
          <motion.div
            key={index}
            className="flex-1 h-2 rounded-sm"
            style={{
              backgroundColor: isFilled ? color : '#374151',
              boxShadow: isFilled ? `0 0 8px ${color}` : 'none',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleY: 1, 
              opacity: 1,
            } : {}}
            transition={{
              duration: 0.3,
              delay: segmentDelay,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}

// Circular voltage gauge
interface CircularGaugeProps {
  value: number;
  maxValue?: number;
  size?: number;
  color?: string;
  label?: string;
  className?: string;
  delay?: number;
}

export function CircularGauge({
  value,
  maxValue = 100,
  size = 120,
  color = '#E85D04',
  label,
  className = '',
  delay = 0,
}: CircularGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercentage = (value / maxValue) * 100;
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-bold" style={{ color }}>
            {value}
          </span>
          {label && <span className="text-xs text-gray-400">{label}</span>}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1f2937"
          strokeWidth={strokeWidth}
        />
        
        {/* Ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = size / 2 + (radius - 12) * Math.cos(angle);
          const y1 = size / 2 + (radius - 12) * Math.sin(angle);
          const x2 = size / 2 + (radius - 4) * Math.cos(angle);
          const y2 = size / 2 + (radius - 4) * Math.sin(angle);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#4b5563"
              strokeWidth={i % 3 === 0 ? 2 : 1}
            />
          );
        })}
        
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      
      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-2xl font-mono font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.3 }}
        >
          {value}
        </motion.span>
        {label && (
          <motion.span 
            className="text-xs text-gray-400 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.7 }}
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
}
