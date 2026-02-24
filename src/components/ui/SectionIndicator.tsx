'use client';

import { motion } from 'framer-motion';
import { useScrollStore } from '@/stores/scrollStore';

export const SectionIndicator = () => {
  const currentSection = useScrollStore(state => state.currentSection);
  
  const scrollToSection = (index: number) => {
    const section = document.querySelector(`[data-section="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {[...Array(10)].map((_, i) => (
        <motion.button
          key={i}
          onClick={() => scrollToSection(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04] ${
            i === currentSection 
              ? 'bg-[#E85D04] scale-150 shadow-lg shadow-[#E85D04]/50' 
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
          whileHover={{ scale: i === currentSection ? 1.6 : 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
};
