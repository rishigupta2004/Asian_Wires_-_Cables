'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { initGSAP, gsap, ScrollTrigger } from '@/lib/gsap-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function useDesktopPointer() {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const query = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (hover: hover)');
    const update = () => setIsDesktopPointer(query.matches);

    update();
    query.addEventListener('change', update);

    return () => {
      query.removeEventListener('change', update);
    };
  }, []);

  return isDesktopPointer;
}

export default function MotionSystemProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const isDesktopPointer = useDesktopPointer();
  const shouldUseSmoothScroll = isDesktopPointer && !prefersReducedMotion;

  useEffect(() => {
    initGSAP();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!shouldUseSmoothScroll) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    const refresh = () => ScrollTrigger.refresh();
    const onLenisScroll = () => ScrollTrigger.update();

    lenis.on('scroll', onLenisScroll);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [shouldUseSmoothScroll, pathname]);

  return <>{children}</>;
}
