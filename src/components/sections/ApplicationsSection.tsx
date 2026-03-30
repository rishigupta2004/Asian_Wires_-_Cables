'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Building2, Factory, Zap, Radio, Video, ArrowUpRight } from 'lucide-react';

const applications = [
  {
    icon: Home,
    title: 'Residential Wiring',
    description: 'Safety-first solutions ensuring maximum protection for modern homes and delicate appliances.',
    tags: ['Housing', 'Lighting'],
    colSpan: 'md:col-span-2 lg:col-span-4'
  },
  {
    icon: Building2,
    title: 'Commercial Infra',
    description: 'High-performance cables engineered for massive loads in offices and retail spaces.',
    tags: ['Retail', 'Offices'],
    colSpan: 'md:col-span-1 lg:col-span-2'
  },
  {
    icon: Factory,
    title: 'Industrial Heavy-Duty',
    description: 'Ruggedized cabling designed to withstand the harshest mechanical and thermal stress.',
    tags: ['Factories', 'Power Plants'],
    colSpan: 'md:col-span-1 lg:col-span-3'
  },
  {
    icon: Zap,
    title: 'Grid Distribution',
    description: 'Ultra-efficient transmission lines minimizing power loss across main networks.',
    tags: ['Substations', 'Grids'],
    colSpan: 'md:col-span-2 lg:col-span-3'
  },
  {
    icon: Video,
    title: 'Security & Surveillance',
    description: 'Zero-interference coaxial and multicore cables for flawless 24/7 CCTV feeds.',
    tags: ['CCTV', 'Alarms'],
    colSpan: 'md:col-span-3 lg:col-span-6'
  }
];

export const ApplicationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--background-primary)] py-32 flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1400px]">
        {/* Header */}
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] font-mono text-sm tracking-[0.2em] uppercase font-bold">
                Versatile Solutions
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter leading-[0.9]">
              Powering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--foreground-tertiary)]">
                Every Sector
              </span>
            </h2>
          </div>
          
          <p className="text-[var(--foreground-secondary)] max-w-sm text-lg leading-relaxed font-medium pb-2">
            From cozy homes to sprawling industrial complexes, our cables deliver unmatched reliability.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative ${app.colSpan} bg-[var(--background-secondary)] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5`}
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 to-[var(--accent-primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[var(--background-primary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--accent-primary)]/50 transition-all duration-500">
                    <Icon className="w-5 h-5 text-[var(--foreground-secondary)] group-hover:text-[var(--accent-primary)] transition-colors duration-500" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[var(--foreground-tertiary)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>

                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 font-display uppercase tracking-tight text-[var(--foreground-primary)] group-hover:text-white transition-colors duration-300">
                    {app.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] text-sm md:text-base leading-relaxed max-w-lg">
                    {app.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {app.tags.map((tag, tIndex) => (
                      <span 
                        key={tIndex}
                        className="text-[10px] md:text-xs font-mono px-3 py-1.5 rounded-full border border-[var(--border-subtle)] text-[var(--foreground-tertiary)] group-hover:border-[var(--accent-primary)]/30 group-hover:bg-[var(--accent-primary)]/10 group-hover:text-[var(--accent-primary)] transition-all duration-500 uppercase tracking-widest font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};