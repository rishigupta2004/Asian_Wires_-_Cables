'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Flame, MoveRight } from 'lucide-react';

const cards = [
  {
    icon: <Shield className="w-12 h-12 text-[var(--background-primary)]" />,
    title: "Unmatched Durability",
    desc: "Engineered to withstand extreme environments, our cables ensure longevity and absolute safety for all infrastructures.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Zap className="w-12 h-12 text-[var(--background-primary)]" />,
    title: "100% Conductivity",
    desc: "Pure electrolytic grade copper for zero energy loss, maximizing efficiency and performance.",
    color: "from-[var(--accent-primary)] to-amber-500"
  },
  {
    icon: <Flame className="w-12 h-12 text-[var(--background-primary)]" />,
    title: "Fire Retardant",
    desc: "Advanced insulation materials that restrict fire spread, ensuring the highest safety standards globally.",
    color: "from-red-500 to-orange-400"
  }
];

export const IntroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] bg-[var(--background-primary)]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background ambient light */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-primary)_0%,_transparent_50%)] pointer-events-none blur-[100px]"
        />

        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div style={{ opacity: opacityText }} className="absolute top-10 left-4 md:left-20">
            <h2 className="text-4xl md:text-7xl font-black font-display uppercase tracking-tighter">
              The Asian <br /> <span className="text-[var(--accent-primary)]">Advantage</span>
            </h2>
            <p className="mt-4 text-sm md:text-xl text-[var(--foreground-secondary)] max-w-sm">
              Keep scrolling to discover the core pillars of our engineering excellence.
            </p>
          </motion.div>

          <motion.div 
            style={{ x }} 
            className="flex w-[300vw] h-[60vh] md:h-[70vh] items-center px-4 md:px-20 gap-10 md:gap-32 mt-32 md:mt-0"
          >
            {cards.map((card, i) => (
              <motion.div 
                key={i}
                className="relative w-[85vw] md:w-[60vw] h-full flex-shrink-0 flex items-center group perspective-[1500px]"
              >
                <motion.div 
                  whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative w-full h-[80%] md:h-[90%] rounded-3xl overflow-hidden bg-gradient-to-br ${card.color} p-1 shadow-2xl`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  
                  <div className="relative w-full h-full bg-[var(--background-secondary)] rounded-[1.4rem] overflow-hidden p-8 md:p-16 flex flex-col justify-between">
                    {/* Grid texture inside */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-8 shadow-lg`}>
                        {card.icon}
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase font-display mb-4">
                        {card.title}
                      </h3>
                      <p className="text-lg md:text-2xl text-[var(--foreground-secondary)] max-w-xl leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 text-[var(--accent-primary)]">
                      <span className="font-mono text-sm uppercase tracking-widest font-bold">Standard 0{i + 1}</span>
                      <div className="flex-1 h-px bg-[var(--border-strong)]" />
                      <MoveRight className="w-8 h-8" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
