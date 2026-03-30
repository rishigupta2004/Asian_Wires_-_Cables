'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    gsap.defaults({
      ease: 'power2.out',
      duration: 0.3,
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
