'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scroll3DState {
  progress: number;
  section: number;
  isActive: boolean;
}

interface UseScroll3DReturn {
  scrollProgress: React.MutableRefObject<number>;
  scrollState: React.MutableRefObject<Scroll3DState>;
  scrollTriggerRef: React.MutableRefObject<ScrollTrigger | null>;
  refreshScrollTrigger: () => void;
}

export function useScroll3D(): UseScroll3DReturn {
  const scrollProgress = useRef<number>(0);
  const scrollState = useRef<Scroll3DState>({
    progress: 0,
    section: 0,
    isActive: false,
  });
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const refreshScrollTrigger = useCallback(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.refresh();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return;
    }

    // Check if mobile (disable complex scroll effects)
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    
    if (isMobile) {
      // On mobile, just track basic scroll without pinning
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        
        scrollProgress.current = progress;
        scrollState.current = {
          progress,
          section: Math.floor(progress * 6),
          isActive: true,
        };
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    // Desktop: Full ScrollTrigger experience
    const ctx = gsap.context(() => {
      // Create a proxy object for smoothed scroll values
      const proxy = { progress: 0 };
      
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Increased scrub for smoother feel
        onUpdate: (self) => {
          // Use GSAP to interpolate the progress value for extra smoothness
          gsap.to(proxy, {
            progress: self.progress,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
            onUpdate: () => {
              scrollProgress.current = proxy.progress;
              scrollState.current = {
                progress: proxy.progress,
                section: Math.floor(proxy.progress * 6),
                isActive: true,
              };
            }
          });
        },
      });

      // Create pinned sections for the 3D wire experience
      const sections = document.querySelectorAll('[data-scroll-section]');
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            scrollState.current.section = index;
          },
          onEnterBack: () => {
            scrollState.current.section = index;
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return {
    scrollProgress,
    scrollState,
    scrollTriggerRef,
    refreshScrollTrigger,
  };
}

export default useScroll3D;
