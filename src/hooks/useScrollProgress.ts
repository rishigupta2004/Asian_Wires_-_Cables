import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useScrollStore } from '@/stores/scrollStore';

export const useScrollProgress = () => {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Main scroll tracker
    const mainTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        const velocity = self.getVelocity();
        
        // Determine scroll direction
        const direction = progress > lastProgressRef.current ? 'down' : 'up';
        lastProgressRef.current = progress;
        
        // Update scroll state
        useScrollStore.setState({ 
          progress,
          velocity,
          isScrolling: true,
          direction,
        });
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set isScrolling to false after scroll stops
        scrollTimeoutRef.current = setTimeout(() => {
          useScrollStore.setState({ isScrolling: false });
        }, 150);
      }
    });
    
    // Section markers
    const sections = document.querySelectorAll('[data-section]');
    const sectionTriggers: ScrollTrigger[] = [];
    
    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => useScrollStore.setState({ currentSection: index }),
        onEnterBack: () => useScrollStore.setState({ currentSection: index }),
      });
      sectionTriggers.push(trigger);
    });
    
    return () => {
      mainTrigger.kill();
      sectionTriggers.forEach(t => t.kill());
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
};
