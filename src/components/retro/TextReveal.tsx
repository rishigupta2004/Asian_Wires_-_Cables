'use client';

import { useState, useEffect, useRef } from 'react';

export const TextReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setIsVisible(true); observer.disconnect(); }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={domRef} className="overflow-hidden inline-block w-full">
      <div className={`transition-transform duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)] ${isVisible ? 'translate-y-0 skew-y-0' : 'translate-y-full skew-y-6'}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
};
