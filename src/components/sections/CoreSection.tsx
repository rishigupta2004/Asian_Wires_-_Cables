'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneContainer } from '../3d/SceneContainer';
import { Wire3D } from '../3d/Wire3D';

const features = [
  { title: 'Core', desc: '99.9% Pure Copper' },
  { title: 'Strands', desc: 'Multi-strand Construction' },
  { title: 'Rating', desc: '105°C Temperature' },
  { title: 'Shielding', desc: 'Flame Retardant PVC' },
  { title: 'Sheath', desc: 'UV Resistant Outer' },
  { title: 'Capacity', desc: 'High Current Transfer' }
];

export const CoreSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[var(--background-primary)] py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-primary)_0%,_transparent_40%)] opacity-10 pointer-events-none blur-[100px] mix-blend-screen" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-7xl">
        <div className="text-center mb-24 md:mb-32">
          <motion.h2 
            style={{ opacity, scale }}
            className="text-[12vw] md:text-[8rem] font-black uppercase tracking-tighter leading-none font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-[var(--background-secondary)]"
          >
            THE CORE
          </motion.h2>
          <motion.p 
            style={{ opacity }}
            className="text-xl md:text-3xl text-[var(--accent-primary)] font-medium mt-6 uppercase tracking-widest font-mono"
          >
            Engineering Excellence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative">
          
          {/* 3D Wire Container */}
          <motion.div 
            style={{ rotateX, scale, opacity }}
            className="relative h-[60vh] w-full perspective-[2000px] lg:-ml-24"
          >
            <div className="absolute inset-0 rounded-[3rem] border border-[var(--border-subtle)] bg-[var(--background-secondary)]/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <SceneContainer>
                <Wire3D />
              </SceneContainer>
            </div>
            
            {/* High-tech Scanning UI Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 rounded-[3rem] border border-[var(--accent-primary)]/20 mix-blend-screen">
              <motion.div 
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-50 shadow-[0_0_15px_var(--accent-primary)]"
              />
              <div className="absolute top-8 left-8 text-[10px] font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                [SYS.SCAN_ACTIVE]
              </div>
              <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                {'{DIAGNOSTICS_OK}'}
              </div>
            </div>
          </motion.div>

          {/* Feature List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 pl-0 lg:pl-16">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="absolute -left-4 top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] group-hover:scale-[3] transition-transform duration-500 ease-out" />
                <h3 className="text-2xl font-bold font-display uppercase tracking-wider text-white mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[var(--foreground-secondary)] font-medium text-lg leading-relaxed">
                  {feature.desc}
                </p>
                <div className="mt-4 h-px w-full bg-[var(--border-subtle)] group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:to-transparent transition-all duration-500" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};