'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from 'gsap';

// Section indices
export const SECTIONS = {
  HERO: 0,
  INTRO: 1,
  PRODUCTS: 2,
  CONSTRUCTION: 3,
  COMPARISON: 4,
  TECHNOLOGY: 5,
  CTA: 6,
} as const;

export type SectionKey = keyof typeof SECTIONS;
export type SectionIndex = typeof SECTIONS[SectionKey];

interface SectionAnimationCallbacks {
  onHeroEnter?: () => void;
  onHeroLeave?: () => void;
  onIntroEnter?: () => void;
  onIntroLeave?: () => void;
  onProductsEnter?: () => void;
  onProductsLeave?: () => void;
  onConstructionEnter?: () => void;
  onConstructionLeave?: () => void;
  onComparisonEnter?: () => void;
  onComparisonLeave?: () => void;
  onTechnologyEnter?: () => void;
  onTechnologyLeave?: () => void;
  onCtaEnter?: () => void;
  onCtaLeave?: () => void;
}

interface UseSectionAnimationsOptions {
  callbacks?: SectionAnimationCallbacks;
  currentSection: number;
  previousSection?: number;
}

export function useSectionAnimations({
  callbacks,
  currentSection,
  previousSection,
}: UseSectionAnimationsOptions) {
  const prevSectionRef = useRef<number | undefined>(previousSection);
  const prefersReducedMotion = useReducedMotion();

  const triggerExitAnimation = useCallback((sectionIndex: number) => {
    switch (sectionIndex) {
      case SECTIONS.HERO:
        callbacks?.onHeroLeave?.();
        break;
      case SECTIONS.INTRO:
        callbacks?.onIntroLeave?.();
        break;
      case SECTIONS.PRODUCTS:
        callbacks?.onProductsLeave?.();
        break;
      case SECTIONS.CONSTRUCTION:
        callbacks?.onConstructionLeave?.();
        break;
      case SECTIONS.COMPARISON:
        callbacks?.onComparisonLeave?.();
        break;
      case SECTIONS.TECHNOLOGY:
        callbacks?.onTechnologyLeave?.();
        break;
      case SECTIONS.CTA:
        callbacks?.onCtaLeave?.();
        break;
    }
  }, [callbacks]);

  const triggerEnterAnimation = useCallback((sectionIndex: number) => {
    if (prefersReducedMotion) return;

    switch (sectionIndex) {
      case SECTIONS.HERO:
        animateHero();
        callbacks?.onHeroEnter?.();
        break;
      case SECTIONS.INTRO:
        animateIntro();
        callbacks?.onIntroEnter?.();
        break;
      case SECTIONS.PRODUCTS:
        animateProducts();
        callbacks?.onProductsEnter?.();
        break;
      case SECTIONS.CONSTRUCTION:
        animateConstruction();
        callbacks?.onConstructionEnter?.();
        break;
      case SECTIONS.COMPARISON:
        animateComparison();
        callbacks?.onComparisonEnter?.();
        break;
      case SECTIONS.TECHNOLOGY:
        animateTechnology();
        callbacks?.onTechnologyEnter?.();
        break;
      case SECTIONS.CTA:
        animateCta();
        callbacks?.onCtaEnter?.();
        break;
    }
  }, [callbacks, prefersReducedMotion]);

  useEffect(() => {
    if (prevSectionRef.current !== undefined && prevSectionRef.current !== currentSection) {
      triggerExitAnimation(prevSectionRef.current);
    }
    
    triggerEnterAnimation(currentSection);
    prevSectionRef.current = currentSection;
  }, [currentSection, triggerEnterAnimation, triggerExitAnimation]);

  return {
    currentSection,
    previousSection: prevSectionRef.current,
  };
}

// Animation functions for each section
function animateHero() {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title', 
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )
  .fromTo('.hero-subtitle',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.6'
  )
  .fromTo('.hero-cta',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
    '-=0.4'
  );
}

function animateIntro() {
  const tl = gsap.timeline();
  
  tl.fromTo('.intro-text',
    { opacity: 0, y: 50, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', stagger: 0.15 }
  );
}

function animateProducts() {
  const tl = gsap.timeline();
  
  tl.fromTo('.product-card',
    { opacity: 0, y: 80, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
  );
}

function animateConstruction() {
  const tl = gsap.timeline();
  
  // Start layer peel animation
  tl.fromTo('.construction-title',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
  )
  .add(() => {
    // Trigger layer peel start
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('startLayerPeel'));
    }
  }, '-=0.3');
}

function animateComparison() {
  const tl = gsap.timeline();
  
  tl.fromTo('.comparison-item',
    { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 },
    { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
  );
}

function animateTechnology() {
  const tl = gsap.timeline();
  
  tl.fromTo('.tech-feature',
    { opacity: 0, y: 40, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08 }
  );
}

function animateCta() {
  const tl = gsap.timeline();
  
  tl.fromTo('.cta-content',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
  )
  .fromTo('.cta-button',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
    '-=0.4'
  );
}

// Hook for individual section animations
export function useSectionAnimation(
  sectionIndex: SectionIndex,
  onEnter?: () => void,
  onLeave?: () => void,
  currentSection?: number
) {
  const wasActiveRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const isActive = currentSection === sectionIndex;
    
    if (isActive && !wasActiveRef.current && !prefersReducedMotion) {
      onEnter?.();
    } else if (!isActive && wasActiveRef.current) {
      onLeave?.();
    }
    
    wasActiveRef.current = isActive;
  }, [currentSection, sectionIndex, onEnter, onLeave, prefersReducedMotion]);
}

// Helper to get progress through a section (0-1)
export function useSectionProgress(
  sectionIndex: number,
  scrollProgress: number,
  sectionStarts: number[]
): number {
  const start = sectionStarts[sectionIndex] ?? 0;
  const end = sectionStarts[sectionIndex + 1] ?? 1;
  const sectionLength = end - start;
  
  if (sectionLength <= 0) return 0;
  
  const progress = (scrollProgress - start) / sectionLength;
  return Math.max(0, Math.min(1, progress));
}
