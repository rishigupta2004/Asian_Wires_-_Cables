'use client';

import { motion } from 'framer-motion';
import { useScrollStore } from '@/stores/scrollStore';

export const ScrollProgress = () => {
  const progress = useScrollStore(state => state.progress);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-px bg-[#2A2A2A] z-50">
      <motion.div
        className="h-full bg-[#D4A574]"
        style={{ width: `${progress * 100}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};
