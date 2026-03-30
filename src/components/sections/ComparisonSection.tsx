'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Shield, Zap, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    id: 'standard',
    name: 'Pro Asian 1051',
    tagline: 'Reliable Standard',
    color: '#A1A1A1',
    features: [
      { name: 'Copper Purity', value: '99.9%', highlight: false },
      { name: 'Insulation', value: 'PVC', highlight: false },
      { name: 'Temperature', value: '70degC', highlight: false },
      { name: 'Voltage Rating', value: '1100V', highlight: false },
      { name: 'Fire Retardant', value: true, highlight: false },
      { name: 'Warranty', value: 'Standard', highlight: false },
    ],
    icon: Zap,
    recommended: false,
  },
  {
    id: 'premium',
    name: 'True Master',
    tagline: 'The Gold Standard',
    color: 'var(--accent-primary)',
    features: [
      { name: 'Copper Purity', value: '99.97%', highlight: true },
      { name: 'Insulation', value: 'FR-LSH PVC', highlight: true },
      { name: 'Temperature', value: '105degC', highlight: true },
      { name: 'Voltage Rating', value: '1100V', highlight: false },
      { name: 'Fire Retardant', value: true, highlight: true },
      { name: 'Warranty', value: 'Extended', highlight: true },
    ],
    icon: Award,
    recommended: true,
  },
  {
    id: 'professional',
    name: 'M1 VOICE',
    tagline: 'Professional Choice',
    color: '#C0C0C0',
    features: [
      { name: 'Copper Purity', value: '99.95%', highlight: false },
      { name: 'Insulation', value: 'FR PVC', highlight: false },
      { name: 'Temperature', value: '85degC', highlight: false },
      { name: 'Voltage Rating', value: '1100V', highlight: false },
      { name: 'Fire Retardant', value: true, highlight: false },
      { name: 'Warranty', value: 'Standard', highlight: false },
    ],
    icon: Shield,
    recommended: false,
  },
];

export const ComparisonSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] bg-[var(--background-secondary)] py-32 flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1400px]">
        
        {/* Header */}
        <motion.div style={{ opacity, y }} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] font-mono text-sm tracking-[0.2em] uppercase font-bold">
                Product Tiers
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter leading-[0.9]">
              Choose Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--foreground-tertiary)]">
                Excellence
              </span>
            </h2>
          </div>
          
          <p className="text-[var(--foreground-secondary)] max-w-sm text-lg leading-relaxed font-medium pb-2">
            Select the perfect cable series for your specific needs, engineered for ultimate performance.
          </p>
        </motion.div>

        {/* Pricing/Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isRecommended = tier.recommended;
            const isHovered = hoveredTier === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredTier(index)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`group relative rounded-[2rem] transition-all duration-500 overflow-hidden ${
                  isRecommended 
                    ? 'bg-[var(--background-primary)] border border-[var(--accent-primary)] lg:scale-105 z-20 shadow-[0_0_50px_rgba(212,165,116,0.1)] py-12' 
                    : 'bg-[var(--background-primary)] border border-[var(--border-subtle)] hover:border-[var(--foreground-tertiary)] z-10 py-8'
                }`}
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isRecommended ? 'from-[var(--accent-primary)]/10 to-transparent' : 'from-white/5 to-transparent'}`} />

                {isRecommended && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-[var(--accent-primary)]" />
                )}

                <div className="px-8 md:px-12 relative z-10">
                  {/* Card Header */}
                  <div className="mb-12">
                    <div className="flex justify-between items-start mb-6">
                      <div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}
                        style={{ backgroundColor: isRecommended ? 'rgba(212, 165, 116, 0.1)' : 'var(--background-secondary)' }}
                      >
                        <Icon className="w-8 h-8" style={{ color: tier.color }} />
                      </div>
                      {isRecommended && (
                        <span className="px-4 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-bold uppercase tracking-widest font-mono border border-[var(--accent-primary)]/20">
                          Gold Standard
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-3xl font-black mb-2 font-display tracking-tight text-white">{tier.name}</h3>
                    <p className="text-sm text-[var(--foreground-tertiary)] uppercase tracking-wider font-mono font-bold">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-5">
                    {tier.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center justify-between group/feature">
                        <span className="text-sm md:text-base font-medium text-[var(--foreground-secondary)] group-hover/feature:text-white transition-colors duration-300">
                          {feature.name}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {typeof feature.value === 'boolean' ? (
                            feature.value ? (
                              <Check className={`w-5 h-5 ${isRecommended ? 'text-[var(--accent-primary)]' : 'text-white'}`} />
                            ) : (
                              <X className="w-5 h-5 text-[var(--border-strong)]" />
                            )
                          ) : (
                            <span className={`text-sm md:text-base font-bold font-mono ${
                              feature.highlight && isRecommended ? 'text-[var(--accent-primary)]' : 'text-white'
                            }`}>
                              {feature.value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-12">
                    <Link href={`/products?tier=${tier.id}`}>
                      <button 
                        className={`w-full py-5 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 flex justify-center items-center gap-2 ${
                          isRecommended
                            ? 'bg-[var(--accent-primary)] text-[var(--background-primary)] hover:bg-white'
                            : 'bg-[var(--background-secondary)] text-white hover:bg-[var(--foreground-primary)] hover:text-black border border-[var(--border-subtle)]'
                        }`}
                      >
                        Explore Series <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                      </button>
                    </Link>
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