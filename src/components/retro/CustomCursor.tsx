'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for trailing box
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Separate heavier spring for the text readout trail (lags behind)
  const textXSpring = useSpring(cursorX, { damping: 30, stiffness: 100, mass: 1.2 });
  const textYSpring = useSpring(cursorY, { damping: 30, stiffness: 100, mass: 1.2 });

  useEffect(() => {
    const updateCursor = (e: globalThis.MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('tr') ||
        target.closest('.draggable') ||
        target.tagName.toLowerCase() === 'a'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Target Crosshair lines (instant, no spring) */}
      <motion.div
        className="fixed top-0 left-0 w-px h-full bg-[#F23A18] opacity-50 z-[98] mix-blend-difference"
        style={{ x: cursorX }}
      />
      <motion.div
        className="fixed top-0 left-0 w-full h-px bg-[#F23A18] opacity-50 z-[98] mix-blend-difference"
        style={{ y: cursorY }}
      />

      {/* Springy targeting box */}
      <motion.div
        className={`fixed top-0 left-0 w-6 h-6 border-2 border-[#F23A18] z-[100] mix-blend-difference flex items-center justify-center transition-all duration-300 ease-out`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
          rotate: isHovering ? 45 : 0,
          backgroundColor: isHovering ? 'rgba(242, 58, 24, 0.2)' : 'transparent'
        }}
      >
        <div className="w-1 h-1 bg-[#E4E3DB]" />
      </motion.div>

      {/* Delayed text readout */}
      <motion.div
        className="fixed z-[99] font-mono font-bold text-[9px] text-[#0F0F0F] bg-[#E4E3DB] border-2 border-[#0F0F0F] px-1.5 py-0.5 whitespace-nowrap shadow-[2px_2px_0px_#F23A18]"
        style={{
          x: textXSpring,
          y: textYSpring,
          translateX: 20,
          translateY: 20
        }}
      >
        X:{String(coords.x).padStart(4, '0')} Y:{String(coords.y).padStart(4, '0')}
      </motion.div>
    </div>
  );
};
