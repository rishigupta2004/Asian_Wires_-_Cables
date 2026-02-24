'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MaterialSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Crazy typography mask animations
  const maskX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[var(--foreground-primary)] overflow-hidden flex items-center py-24"
    >
      {/* Dynamic Grid Background on Light Mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Floating 3D Elements background */}
      <motion.div style={{ y: yParallax, rotate: rotateLeft }} className="absolute -left-[10%] top-[20%] w-[40vw] h-[40vw] border-[1px] border-black/10 rounded-full pointer-events-none" />
      <motion.div style={{ y: yParallax, rotate: rotateRight }} className="absolute -right-[10%] bottom-[20%] w-[30vw] h-[30vw] border-[1px] border-[var(--accent-primary)]/40 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Wild Masked Typography */}
        <div className="relative w-full flex flex-col items-center justify-center pointer-events-none mb-32">
          
          <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none font-display text-[var(--background-secondary)] opacity-10 whitespace-nowrap">
            99.97% PURE COPPER
          </h2>
          
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", x: maskX }}
          >
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-none font-display text-[var(--accent-primary)] whitespace-nowrap">
              99.97% PURE COPPER
            </h2>
          </motion.div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full mt-24">
          <div className="flex flex-col justify-end">
            <h3 className="text-3xl md:text-5xl font-black text-[var(--background-secondary)] font-display uppercase tracking-tight mb-8">
              The Science of <br/> <span className="text-[var(--accent-primary)] italic">Conductivity</span>
            </h3>
            <p className="text-lg md:text-2xl text-[var(--background-elevated)] font-medium leading-relaxed max-w-xl">
              We utilize electrolytic grade copper with <strong className="text-black">99.97% purity</strong>, ensuring superior conductivity and minimal energy loss. Our state-of-the-art annealing process enhances flexibility without compromising tensile strength.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
            {[
              { label: 'Conductivity', value: '101%', unit: 'IACS', desc: 'International Standard' },
              { label: 'Purity Grade', value: '99.97%', unit: 'Cu', desc: 'Electrolytic Tough Pitch' },
              { label: 'Thermal', value: '105°C', unit: 'Max', desc: 'Operating Temp' },
              { label: 'Flexibility', value: 'Class 5', unit: 'IEC', desc: 'High Flex Conductor' },
            ].map((spec, index) => (
              <div key={index} className="relative group perspective-[1000px]">
                <div className="absolute -inset-4 bg-[var(--background-secondary)]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative border-l-2 border-[var(--accent-primary)]/30 group-hover:border-[var(--accent-primary)] transition-colors duration-500 pl-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-black text-[var(--background-primary)] font-display tracking-tighter">
                      {spec.value}
                    </span>
                    <span className="text-sm font-bold font-mono text-[var(--accent-primary)]">{spec.unit}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--background-secondary)] uppercase tracking-wider mb-1">{spec.label}</h4>
                  <p className="text-sm text-[var(--foreground-tertiary)] font-medium">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
