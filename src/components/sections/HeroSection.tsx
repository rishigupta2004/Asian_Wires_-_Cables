'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

const svgPaths = [
  "M10,10 L50,10 L70,50 L100,50",
  "M20,90 L40,60 L80,60 L90,20",
  "M10,50 L30,50 L50,80 L80,80",
  "M0,30 L20,30 L40,10 L80,10 L100,30",
  "M30,100 L50,60 L60,60 L90,90",
  "M0,70 L30,70 L50,30 L70,30 L100,70",
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        stagger: 0.05, 
        duration: 1.5, 
        ease: "power4.out",
        delay: 0.5
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent perspective-[1000px]"
    >
      {/* Background Grid & Particles */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--background-secondary)_0%,_transparent_100%)] opacity-50 pointer-events-none mix-blend-screen" />
      
      {/* Animated SVG Circuit Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {svgPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="var(--accent-primary)"
              strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 container mx-auto px-4 md:px-8 text-center flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent-subtle)] bg-[var(--background-tertiary)]/50 backdrop-blur-md"
        >
          <Zap className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--foreground-secondary)]">
            Next Generation Connectivity
          </span>
        </motion.div>

        <h1 ref={textRef} className="relative text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] font-display text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground-primary)] via-[var(--foreground-secondary)] to-[var(--background-secondary)] drop-shadow-2xl">
          <div className="overflow-hidden pb-4">
            {"POWERING".split('').map((c, i) => <span key={i} className="char inline-block">{c}</span>)}
          </div>
          <div className="overflow-hidden text-[var(--accent-primary)] mix-blend-lighten pb-4">
            {"THE FUTURE".split('').map((c, i) => <span key={i} className="char inline-block">{c}</span>)}
          </div>
        </h1>

        <motion.p 
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 text-lg md:text-2xl text-[var(--foreground-secondary)] max-w-2xl mx-auto font-light leading-relaxed"
        >
          Unleashing the ultimate performance with industrial-grade wires & cables designed for excellence, durability, and absolute safety.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 items-center"
        >
          <Link href="/products" className="group relative px-8 py-4 bg-[var(--accent-primary)] text-[var(--background-primary)] font-bold tracking-widest uppercase overflow-hidden rounded-md transition-all hover:scale-105 hover:shadow-[0_0_40px_var(--accent-primary)]">
            <span className="relative z-10 flex items-center gap-2">
              Explore Products <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </Link>
          
          <Link href="/about" className="group px-8 py-4 border border-[var(--border-strong)] text-[var(--foreground-primary)] font-bold tracking-widest uppercase rounded-md transition-all hover:border-[var(--accent-primary)] hover:bg-[var(--accent-subtle)]">
            Our Legacy
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating abstract 3D-like shapes built with SVG */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-64 h-64 opacity-20 pointer-events-none blur-3xl rounded-full bg-[var(--accent-primary)] mix-blend-screen"
      />
      <motion.div 
        animate={{ y: [20, -20, 20], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-[10%] w-96 h-96 opacity-10 pointer-events-none blur-3xl rounded-full bg-blue-500 mix-blend-screen"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground-tertiary)] font-mono">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 border border-[var(--border-strong)] rounded-full flex justify-center p-1"
        >
          <motion.div 
            animate={{ height: ['0%', '40%', '0%'], top: ['0%', '60%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-[var(--accent-primary)] rounded-full relative"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
