'use client';

import { useRef, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useScrollStore } from '@/stores/scrollStore';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ImmersiveBackground from '@/components/3d/ImmersiveBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { MaterialSection } from '@/components/sections/MaterialSection';
import { ConstructionSection } from '@/components/sections/ConstructionSection';
import { CoreSection } from '@/components/sections/CoreSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { ApplicationsSection } from '@/components/sections/ApplicationsSection';
import { ManufacturingSection } from '@/components/sections/ManufacturingSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import { SplashScreen } from '@/components/effects/SplashScreen';
import { GlobalWire } from '@/components/effects/GlobalWire';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSplash, setShowSplash] = useState(true);
  
  const { progress, currentSection } = useScrollStore();
  const { isMobile, gpuTier } = useDeviceCapabilities();
  const prefersReducedMotion = useReducedMotion();
  
  const shouldDisable3D = isMobile || gpuTier === 'low' || prefersReducedMotion;
  
  // Initialize scroll progress tracking
  useScrollProgress();

  useEffect(() => {
    // Prevent scrolling while splash is active
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div ref={containerRef} className="relative bg-[#0A0A0A] overflow-x-hidden">
        {/* Immersive 3D Background - disabled on low-end devices */}
        {!shouldDisable3D && <ImmersiveBackground showLogo={true} />}
        
        <ScrollProgress />
        
        {/* Global animated wire connection - disabled on low-end devices */}
        {!showSplash && !shouldDisable3D && <GlobalWire />}
        
        {/* Scroll Content */}
        <div className="relative z-10">
          {/* Section 0: Hero */}
          <HeroSection />
          
          {/* Section 1: Introduction */}
          <IntroSection />
          
          {/* Section 2: Material */}
          <MaterialSection />
          
          {/* Section 3: Construction */}
          <ConstructionSection />
          
          {/* Section 4: Core */}
          <CoreSection />
          
          {/* Section 5: Comparison */}
          <ComparisonSection />
          
          {/* Section 6: Applications */}
          <ApplicationsSection />
          
          {/* Section 7: Manufacturing */}
          <ManufacturingSection />
          
          {/* Section 8: CTA */}
          <CTASection />
          
          {/* Section 9: Footer */}
          <FooterSection />
        </div>
      </div>
    </>
  );
}
