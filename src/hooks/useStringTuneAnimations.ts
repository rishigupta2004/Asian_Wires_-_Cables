'use client';

import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseStringTuneAnimationsOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Lightweight attribute-driven scroll reveals inspired by CSS-first motion systems.
 * Add `data-st="<variant>"` to any element and optional `data-st-delay="<ms>"`.
 */
export function useStringTuneAnimations({
  selector = '[data-st]',
  threshold = 0.16,
  rootMargin = '0px 0px -10% 0px',
  once = false,
}: UseStringTuneAnimationsOptions = {}) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) return;

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('st-in'));
      return;
    }

    targets.forEach((el) => {
      const delay = Number(el.dataset.stDelay ?? '');
      if (Number.isFinite(delay) && delay >= 0) {
        el.style.setProperty('--st-delay', `${delay}ms`);
      }

      const duration = Number(el.dataset.stDuration ?? '');
      if (Number.isFinite(duration) && duration > 0) {
        el.style.setProperty('--st-duration', `${duration}ms`);
      }

      const distance = Number(el.dataset.stDistance ?? '');
      if (Number.isFinite(distance) && distance > 0) {
        el.style.setProperty('--st-distance', `${distance}px`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            element.classList.add('st-in');
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.classList.remove('st-in');
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [once, prefersReducedMotion, rootMargin, selector, threshold]);
}

export default useStringTuneAnimations;
