import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGSAP(): void {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: 'power2.out',
    duration: 0.3,
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  });
}

export { gsap, ScrollTrigger };
