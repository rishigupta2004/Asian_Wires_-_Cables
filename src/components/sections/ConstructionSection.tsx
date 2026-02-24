'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const layers = [
  {
    id: 'outer',
    name: 'Outer Sheath',
    material: 'PVC Type ST-1',
    description: 'Flame retardant, UV resistant, and abrasion-proof outer layer protecting against harsh environmental factors.',
    features: ['Flame Retardant', 'UV Resistant', 'Abrasion Proof'],
    icon: Shield,
    color: 'from-[var(--background-tertiary)] to-[var(--background-secondary)]',
    stroke: 'var(--foreground-tertiary)'
  },
  {
    id: 'insulation',
    name: 'Insulation Layer',
    material: 'High Grade PVC',
    description: 'Specially formulated PVC insulation providing exceptionally high dielectric strength and thermal stability.',
    features: ['High Dielectric Strength', 'Thermal Stability', 'Moisture Resistant'],
    icon: Layers,
    color: 'from-[var(--accent-primary)]/10 to-[var(--background-secondary)]',
    stroke: 'var(--accent-primary)'
  },
  {
    id: 'conductor',
    name: 'Core Conductor',
    material: 'Electrolytic Copper',
    description: '99.97% pure electrolytic grade copper with multi-strand construction for maximum flexibility and minimal energy loss.',
    features: ['99.97% Pure Copper', 'High Conductivity', 'Flexible Strands'],
    icon: Zap,
    color: 'from-[var(--accent-primary)] to-amber-600',
    stroke: '#ffffff'
  },
];

export const ConstructionSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState(2);
  
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--background-secondary)_0%,_transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1400px]">
        
        {/* Header */}
        <motion.div style={{ opacity, y }} className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 mb-6 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--background-secondary)]/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="text-[var(--foreground-secondary)] font-mono text-xs tracking-[0.2em] uppercase font-bold">
              Anatomy of Quality
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter leading-[0.9]">
            Layer by <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent-primary)] to-amber-700">Layer</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-[var(--foreground-secondary)] font-medium max-w-2xl mx-auto">
            Interactive breakdown of our industry-leading cable architecture. Click the rings to explore the composition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left - Interactive 3D-ish Rings */}
          <div className="lg:col-span-7 relative aspect-square max-w-2xl mx-auto w-full flex items-center justify-center perspective-[1000px]">
            {layers.map((layer, index) => {
              const isActive = activeLayer === index;
              const size = 100 - (index * 25); // 100%, 75%, 50%
              
              return (
                <motion.button
                  key={layer.id}
                  onClick={() => setActiveLayer(index)}
                  className={`absolute rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group flex items-start justify-center pt-8 md:pt-12 cursor-pointer
                    ${isActive ? 'z-30' : 'z-10 hover:z-20'}`}
                  style={{
                    width: `${size}%`,
                    height: `${size}%`,
                    rotateX: 60,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateZ: isActive ? 0 : 45,
                    y: isActive ? -20 : 0,
                    scale: isActive ? 1.05 : 1,
                  }}
                  whileHover={{ scale: isActive ? 1.05 : 1.02, y: -10 }}
                >
                  {/* Ring Surface */}
                  <div 
                    className={`absolute inset-0 rounded-full border-[3px] transition-all duration-500 bg-gradient-to-br ${layer.color} shadow-2xl backdrop-blur-md`}
                    style={{ 
                      borderColor: isActive ? layer.stroke : 'var(--border-subtle)',
                      boxShadow: isActive ? `0 20px 50px -10px ${layer.stroke}40, inset 0 0 20px ${layer.stroke}20` : '0 10px 30px -10px rgba(0,0,0,0.5)',
                    }}
                  />
                  
                  {/* Floating Label */}
                  <motion.div 
                    className={`relative z-40 px-4 py-2 rounded-full border bg-[var(--background-primary)] backdrop-blur-xl flex items-center gap-2 transform -rotate-x-60 transition-all duration-300
                      ${isActive ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-[0_0_20px_var(--accent-primary)_inset]' : 'border-[var(--border-subtle)] text-[var(--foreground-tertiary)] opacity-0 group-hover:opacity-100'}`}
                  >
                    <layer.icon className="w-4 h-4" />
                    <span className="text-xs font-bold font-mono uppercase tracking-widest whitespace-nowrap">
                      {layer.name}
                    </span>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Right - Info Panel (Bento Style) */}
          <div className="lg:col-span-5 h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Accent Glow */}
                <div 
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl opacity-20 blur-[80px] pointer-events-none rounded-full"
                  style={{ backgroundImage: `linear-gradient(to bottom left, ${layers[activeLayer].stroke}, transparent)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] bg-[var(--background-primary)] flex items-center justify-center shadow-inner">
                      {(() => {
                        const Icon = layers[activeLayer].icon;
                        return <Icon className="w-5 h-5" style={{ color: layers[activeLayer].stroke }} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-[var(--foreground-primary)]">
                        {layers[activeLayer].name}
                      </h3>
                      <p className="text-[var(--accent-primary)] font-mono text-xs uppercase tracking-widest font-bold mt-1">
                        {layers[activeLayer].material}
                      </p>
                    </div>
                  </div>

                  <p className="text-[var(--foreground-secondary)] text-base md:text-lg leading-relaxed font-medium mb-8">
                    {layers[activeLayer].description}
                  </p>

                  <div className="space-y-4">
                    {layers[activeLayer].features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-center gap-3 group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--foreground-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300" />
                        <span className="text-sm font-bold tracking-wide text-[var(--foreground-secondary)] group-hover:text-[var(--foreground-primary)] transition-colors duration-300">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 mt-auto pt-8 border-t border-[var(--border-subtle)]">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--foreground-tertiary)] font-bold">
                    Layer 0{activeLayer + 1}
                  </span>
                  <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                  <div className="flex gap-2">
                    {layers.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveLayer(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeLayer === idx ? 'w-8 bg-[var(--accent-primary)]' : 'bg-[var(--border-subtle)] hover:bg-[var(--foreground-tertiary)]'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
