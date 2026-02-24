'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircuitLinesProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  color?: string;
  glowColor?: string;
  animate?: boolean;
}

export function CircuitLines({
  className = '',
  density = 'medium',
  color = '#B87333',
  glowColor = '#E85D04',
  animate = true,
}: CircuitLinesProps) {
  const [lines, setLines] = useState<Array<{ id: number; path: string; delay: number; duration: number; width: number }>>([]);

  useEffect(() => {
    const count = density === 'low' ? 12 : density === 'medium' ? 20 : 35;
    const newLines = Array.from({ length: count }, (_, i) => {
      // Create more structured, tech-like paths
      // Start from edges or specific grid points for cleaner look
      const startFromEdge = Math.random() > 0.4;
      let startX, startY;
      
      if (startFromEdge) {
        if (Math.random() > 0.5) {
          startX = Math.random() > 0.5 ? -5 : 105;
          startY = Math.random() * 100;
        } else {
          startX = Math.random() * 100;
          startY = Math.random() > 0.5 ? -5 : 105;
        }
      } else {
        // Snap to a 5x5 grid for tighter layout
        startX = Math.floor(Math.random() * 20) * 5;
        startY = Math.floor(Math.random() * 20) * 5;
      }

      const segments = Math.floor(Math.random() * 3) + 2;
      let path = `M ${startX} ${startY}`;
      
      let currentX = startX;
      let currentY = startY;
      
      // Prefer 90-degree turns and grid alignment
      for (let j = 0; j < segments; j++) {
        const isHorizontal = j % 2 === 0;
        // Lengths snapped to grid-like increments
        const length = (Math.floor(Math.random() * 6) + 2) * 5; 
        
        if (isHorizontal) {
          const direction = Math.random() > 0.5 ? 1 : -1;
          currentX += length * direction;
          // Clamp to viewbox with slight overshot allowed
          currentX = Math.max(-10, Math.min(110, currentX));
          path += ` L ${currentX} ${currentY}`;
        } else {
          const direction = Math.random() > 0.5 ? 1 : -1;
          currentY += length * direction;
          // Clamp to viewbox with slight overshot allowed
          currentY = Math.max(-10, Math.min(110, currentY));
          path += ` L ${currentX} ${currentY}`;
        }
      }
      
      return {
        id: i,
        path,
        delay: Math.random() * 5, // Increased delay spread
        duration: Math.random() * 4 + 3, // Slower, more deliberate movement
        width: Math.random() > 0.7 ? 1.5 : 0.5, // Varying line widths
      };
    });
    
    setLines(newLines);
  }, [density]);

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id={`glow-${density}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feComposite in="coloredBlur" in2="SourceGraphic" operator="over" />
        </filter>
        <linearGradient id={`gradient-${density}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {lines.map((line) => (
        <motion.path
          key={line.id}
          d={line.path}
          fill="none"
          stroke={`url(#gradient-${density})`}
          strokeWidth={line.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${density})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { 
            pathLength: [0, 0.8, 0],
            opacity: [0, 1, 0],
            pathOffset: [0, 1]
          } : { pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          style={{
            filter: `drop-shadow(0 0 ${line.width * 2}px ${glowColor})`,
          }}
        />
      ))}
      
      {/* Circuit nodes */}
      {lines.map((line, i) => {
        if (i % 4 !== 0) return null;
        const coords = line.path.split(' ');
        // Get end coordinates
        const x = parseFloat(coords[coords.length - 2]);
        const y = parseFloat(coords[coords.length - 1]);
        
        if (isNaN(x) || isNaN(y)) return null;

        return (
          <motion.circle
            key={`node-${line.id}`}
            cx={`${x}%`}
            cy={`${y}%`}
            r={line.width * 2}
            fill={glowColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={animate ? {
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
            } : { scale: 1, opacity: 0.3 }}
            transition={{
              duration: 2,
              delay: line.delay + line.duration * 0.8,
              repeat: Infinity,
              repeatDelay: line.duration * 0.2,
            }}
          />
        );
      })}
    </svg>
  );
}
