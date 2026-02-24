'use client';

import { motion, useInView, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface NumberCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  formatNumber?: boolean;
}

export function NumberCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  formatNumber = true,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  const formattedValue = formatNumber && displayValue >= 1000 
    ? displayValue.toLocaleString() 
    : displayValue;

  return (
    <motion.span
      ref={ref}
      className={`tabular-nums ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}
      <span>{formattedValue}</span>
      {suffix}
    </motion.span>
  );
}

// Voltage meter style counter with gauge effect
interface VoltageMeterProps {
  value: number;
  maxValue?: number;
  label: string;
  unit?: string;
  className?: string;
}

export function VoltageMeter({
  value,
  maxValue = 100,
  label,
  unit = '',
  className = '',
}: VoltageMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Meter label */}
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs font-mono text-[#E85D04]">
          {percentage.toFixed(0)}%
        </span>
      </div>
      
      {/* Meter bar container */}
      <div className="relative h-6 bg-neutral-800 overflow-hidden border border-neutral-700">
        {/* Grid lines */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-neutral-700/50 last:border-r-0"
            />
          ))}
        </div>
        
        {/* Fill bar */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B87333] to-[#E85D04]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        
        {/* Value display */}
        <div className="absolute inset-0 flex items-center justify-end px-3">
          <span className="text-sm font-mono font-bold text-white mix-blend-difference">
            {isInView ? (
              <NumberCounter value={value} suffix={unit} formatNumber={false} />
            ) : (
              `0${unit}`
            )}
          </span>
        </div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-[#E85D04]/50 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: `${percentage}%` }}
        />
      </div>
      
      {/* Tick marks */}
      <div className="flex justify-between mt-1">
        <span className="text-[10px] font-mono text-neutral-600">0{unit}</span>
        <span className="text-[10px] font-mono text-neutral-600">{maxValue}{unit}</span>
      </div>
    </div>
  );
}
