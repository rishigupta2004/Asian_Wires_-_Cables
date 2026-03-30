'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface VoltageBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  subtitle?: string;
  specs?: string[];
  index?: number;
}

export function VoltageBar({
  label,
  value,
  maxValue = 100,
  color,
  subtitle,
  specs = [],
  index = 0,
}: VoltageBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  const colorMap: Record<string, string> = {
    gold: '#FFD700',
    blue: '#3B82F6',
    green: '#10B981',
    copper: '#B87333',
    electric: '#E85D04',
  };
  
  const barColor = colorMap[color] || color;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Label */}
      <div className="flex justify-between items-end mb-3">
        <div>
          <div className="text-lg font-bold uppercase tracking-wider" style={{ color: barColor }}>
            {label}
          </div>
          {subtitle && (
            <div className="text-sm text-neutral-500 font-mono mt-1">{subtitle}</div>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold" style={{ color: barColor }}>
            {value}%
          </div>
        </div>
      </div>
      
      {/* Bar Container */}
      <div className="relative h-12 bg-neutral-800 border border-neutral-700 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-neutral-700/30 last:border-r-0"
            />
          ))}
        </div>
        
        {/* Fill Bar */}
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.15 }}
        />
        
        {/* Overlay pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.5) 10px,
              rgba(0,0,0,0.5) 20px
            )`,
          }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 right-0 w-4"
          style={{ 
            background: `linear-gradient(to left, ${barColor}60, transparent)`,
            left: `${percentage}%`,
          }}
          animate={isInView ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Block pattern */}
        <div className="absolute inset-0 flex items-center px-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-6 flex-1 mx-0.5 border border-neutral-600/50"
              style={{
                backgroundColor: i < percentage / 10 ? `${barColor}40` : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Specs */}
      {specs.length > 0 && (
        <div className="mt-4 space-y-1">
          {specs.map((spec, i) => (
            <div key={i} className="text-xs text-neutral-500 font-mono flex items-center gap-2">
              <span style={{ color: barColor }}>►</span>
              {spec}
            </div>
          ))}
        </div>
      )}
      
      {/* Connection node */}
      <div 
        className="absolute -right-2 top-1/2 w-4 h-4 -translate-y-1/2 border-2 rounded-full"
        style={{ borderColor: barColor, backgroundColor: '#0a0a0a' }}
      >
        <div className="absolute inset-1 rounded-full" style={{ backgroundColor: barColor }} />
      </div>
    </motion.div>
  );
}
