'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const GlobalWire = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll for the wire path length
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const path1 = "M 50,0 C 50,10 90,20 90,40 S 10,60 10,80 S 50,90 50,100";
  const path2 = "M 40,0 C 40,15 80,30 80,45 S 20,65 20,80 S 40,95 40,100";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen hidden md:block">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="w-full h-full stroke-[var(--accent-primary)] fill-transparent"
      >
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--accent-primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
          </linearGradient>
          
          <filter id="blurGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path 
          d={path1} 
          stroke="url(#glow)" 
          strokeWidth="0.4"
          style={{ pathLength: smoothProgress }}
          filter="url(#blurGlow)"
          strokeLinecap="round"
        />

        <motion.path 
          d={path2} 
          stroke="var(--accent-primary)" 
          strokeWidth="0.1"
          strokeDasharray="1 2"
          style={{ pathLength: smoothProgress }}
        />

        {/* Energy Pulse traveling down the wire */}
        <circle 
          cx="50" cy="0" r="1.5"
          fill="white"
          filter="url(#blurGlow)"
        >
          <animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            path={path1}
          />
        </circle>
      </svg>
    </div>
  );
};
