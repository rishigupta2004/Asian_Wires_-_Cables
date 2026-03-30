'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FlaskConical, Settings, Thermometer, Package, Microscope, CheckCircle2 } from 'lucide-react';

const processes = [
  {
    step: '01',
    title: 'Material Science',
    description: 'Premium grade copper rods selected and rigorously tested for absolute 99.97% purity.',
    icon: FlaskConical,
  },
  {
    step: '02',
    title: 'Precision Drawing',
    description: 'Copper rods drawn into ultra-fine wires through micro-precision diamond dies.',
    icon: Settings,
  },
  {
    step: '03',
    title: 'Thermal Annealing',
    description: 'Advanced heat treatment ensuring optimal conductivity and permanent flexibility.',
    icon: Thermometer,
  },
  {
    step: '04',
    title: 'Polymer Extrusion',
    description: 'High-grade FR PVC extruded seamlessly for maximum protection and durability.',
    icon: Package,
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description: 'Intense micro-testing protocols ensuring compliance with global ISO standards.',
    icon: Microscope,
  },
];

export const ManufacturingSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] bg-[var(--background-primary)] py-32 flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Content */}
          <motion.div style={{ opacity, y }} className="sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] font-mono text-sm tracking-[0.2em] uppercase font-bold">
                Our Process
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter leading-[0.9] mb-8">
              Forged In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--foreground-tertiary)]">
                Excellence
              </span>
            </h2>

            <p className="text-[var(--foreground-secondary)] text-lg md:text-xl leading-relaxed max-w-lg mb-12 font-medium">
              Every Asian wire undergoes a meticulous manufacturing pipeline, combining heritage craftsmanship with cutting-edge robotics.
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border-subtle)]">
              {[
                { value: 'ISO', label: '9001:2015' },
                { value: '100%', label: 'Tested' },
                { value: '5+', label: 'QA Checks' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-black text-white font-display tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--foreground-tertiary)] uppercase tracking-widest font-mono font-bold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Process Steps Timeline */}
          <div className="relative pl-8 md:pl-16">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-8 top-8 bottom-8 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--border-subtle)] to-transparent" />

            <div className="space-y-12">
              {processes.map((process, index) => {
                const Icon = process.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    {/* Node */}
                    <div className="absolute -left-8 md:-left-16 top-0 w-16 h-16 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-center z-10 group-hover:border-[var(--accent-primary)] group-hover:scale-110 transition-all duration-500 shadow-xl">
                      <span className="text-[var(--accent-primary)] font-mono font-bold text-lg">
                        {process.step}
                      </span>
                    </div>

                    <div className="bg-[var(--background-secondary)] p-8 md:p-10 rounded-3xl border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          {process.title}
                        </h3>
                        <Icon className="w-6 h-6 text-[var(--foreground-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300" />
                      </div>
                      <p className="text-[var(--foreground-secondary)] text-base md:text-lg leading-relaxed font-medium">
                        {process.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};