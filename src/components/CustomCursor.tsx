'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CustomCursorProps {
  color?: string;
  glowColor?: string;
}

export function CustomCursor({ color = '#E85D04', glowColor = '#F48C06' }: CustomCursorProps) {
  const { position } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  const glowIntensity = useTransform(
    [cursorX, cursorY],
    () => isHovering ? 30 : 15
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    cursorX.set(position.x);
    cursorY.set(position.y);
  }, [position, cursorX, cursorY, prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-hoverable]');
    const images = document.querySelectorAll('img, [data-cursor-image]');

    const handleHoverableEnter = () => setIsHovering(true);
    const handleHoverableLeave = () => setIsHovering(false);
    const handleImageEnter = () => setIsImage(true);
    const handleImageLeave = () => setIsImage(false);

    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverableEnter);
      el.addEventListener('mouseleave', handleHoverableLeave);
    });

    images.forEach(el => {
      el.addEventListener('mouseenter', handleImageEnter);
      el.addEventListener('mouseleave', handleImageLeave);
    });

    setIsVisible(true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter);
        el.removeEventListener('mouseleave', handleHoverableLeave);
      });
      
      images.forEach(el => {
        el.removeEventListener('mouseenter', handleImageEnter);
        el.removeEventListener('mouseleave', handleImageLeave);
      });
    };
  }, [prefersReducedMotion, isMobile]);

  if (prefersReducedMotion || isMobile) return null;

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: isImage ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Main cursor body - multimeter probe style */}
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 ${isHovering ? 30 : 15}px ${glowColor}, 0 0 ${isHovering ? 60 : 30}px ${glowColor}40`,
            }}
            animate={{
              boxShadow: `0 0 ${isHovering ? 30 : 15}px ${glowColor}, 0 0 ${isHovering ? 60 : 30}px ${glowColor}40`,
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Inner copper tip */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: '#B87333' }}
          />

          {/* Crosshair lines for image mode */}
          {isImage && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-6 h-px -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="w-8 h-8 rounded-full blur-xl"
          style={{ 
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </>
  );
}
