'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setStage(3), 2800);
    const t4 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background-primary)] overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--accent-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Center Circle Expanding */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          stage >= 1 
            ? { scale: stage >= 3 ? 100 : 1, opacity: stage >= 3 ? 0 : 1 } 
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: stage >= 3 ? 1.5 : 0.8, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-[var(--accent-primary)] mix-blend-screen"
      />
      
      {/* Spinning SVG Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[500px] h-[500px]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 stroke-[var(--accent-primary)] fill-transparent">
          <circle cx="50" cy="50" r="48" strokeWidth="0.2" strokeDasharray="4 4"/>
          <path d="M50 0 L50 100 M0 50 L100 50" strokeWidth="0.1" />
        </svg>
      </motion.div>

      {/* Main Text Reveal */}
      <div className="relative z-10 flex flex-col items-center gap-2 overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          animate={stage >= 1 ? { y: 0 } : { y: '100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-[var(--foreground-primary)] mix-blend-difference uppercase font-display"
        >
          <span className="text-[var(--accent-primary)]">Asian</span> Wires
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl font-mono text-[var(--foreground-secondary)] tracking-[0.3em] uppercase"
        >
          Initializing Power
        </motion.div>
      </div>

      {/* Loading Progress Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-px bg-[var(--border-subtle)] overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={
            stage === 0 ? { x: '-80%' } :
            stage === 1 ? { x: '-40%' } :
            stage === 2 ? { x: '-10%' } :
            { x: '0%' }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]"
        />
      </div>
      
      {/* Percentage */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--foreground-tertiary)]"
      >
        {stage === 0 ? '0%' : stage === 1 ? '45%' : stage === 2 ? '89%' : '100%'}
      </motion.div>
    </motion.div>
  );
};
