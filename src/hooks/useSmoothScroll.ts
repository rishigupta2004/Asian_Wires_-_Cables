'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useScrollStore } from '@/stores/scrollStore';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const setProgress = useScrollStore((state) => state.setProgress);
  const setScrollY = useScrollStore((state) => state.setScrollY);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize Lenis with smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;
    
    // Connect Lenis to GSAP ScrollTrigger and ScrollStore
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      // Update global scroll progress (0 to 1)
      // e.progress is the scroll progress from 0 to 1
      if (e.progress !== undefined) {
        setProgress(e.progress);
      }
      // Update scrollY in pixels
      if (e.scroll !== undefined) {
        setScrollY(e.scroll);
      }
    });
    
    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);
  
  return lenisRef;
};
