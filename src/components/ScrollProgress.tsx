'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = '#E85D04',
  height = 3,
  zIndex = 50,
  className = '',
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create ScrollTrigger for progress tracking
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const newProgress = self.progress * 100;
        setProgress(newProgress);
        
        // Direct style manipulation for performance
        if (progressRef.current) {
          progressRef.current.style.width = `${newProgress}%`;
        }
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [prefersReducedMotion]);

  // Fallback for reduced motion or SSR
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full pointer-events-none ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Progress bar background track */}
      <div
        className="w-full"
        style={{
          height: `${height}px`,
          backgroundColor: 'rgba(232, 93, 4, 0.1)',
        }}
      >
        {/* Animated progress fill */}
        <div
          ref={progressRef}
          className="h-full transition-none"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
            background: `linear-gradient(90deg, ${color} 0%, #F4A261 50%, ${color} 100%)`,
            boxShadow: `0 0 10px ${color}40, 0 0 20px ${color}20`,
            willChange: 'width',
          }}
        />
      </div>

      {/* Optional: Section markers */}
      <div className="absolute top-0 left-0 w-full h-full flex">
        {[0, 16.67, 33.33, 50, 66.67, 83.33, 100].map((marker, index) => (
          <div
            key={index}
            className="absolute top-0 w-0.5 h-full opacity-30"
            style={{
              left: `${marker}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Alternative version with segment-based progress
export const SegmentedScrollProgress: React.FC<ScrollProgressProps & {
  segments?: number;
}> = ({
  color = '#E85D04',
  height = 3,
  zIndex = 50,
  segments = 6,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Create triggers for each segment
    for (let i = 0; i < segments; i++) {
      const startPercent = (i / segments) * 100;
      const endPercent = ((i + 1) / segments) * 100;

      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: `${startPercent}% top`,
        end: `${endPercent}% top`,
        scrub: true,
        onUpdate: (self) => {
          setActiveSegment(i);
          setSegmentProgress(self.progress);
        },
      });

      triggers.push(trigger);
    }

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [segments, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full flex pointer-events-none ${className}`}
      style={{ zIndex, height: `${height}px` }}
      aria-hidden="true"
    >
      {Array.from({ length: segments }).map((_, index) => {
        const isActive = index === activeSegment;
        const isPast = index < activeSegment;
        
        return (
          <div
            key={index}
            className="flex-1 mx-0.5 first:ml-0 last:mr-0 rounded-full overflow-hidden"
            style={{
              backgroundColor: 'rgba(232, 93, 4, 0.1)',
            }}
          >
            <div
              className="h-full transition-all duration-150 ease-out"
              style={{
                width: isActive ? `${segmentProgress * 100}%` : isPast ? '100%' : '0%',
                backgroundColor: color,
                background: `linear-gradient(90deg, ${color} 0%, #F4A261 100%)`,
                boxShadow: isActive ? `0 0 8px ${color}60` : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScrollProgress;
