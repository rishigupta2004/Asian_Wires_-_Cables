import React, { useEffect, useRef, useState, useCallback } from "react";
import { Mail, Phone, Globe, MapPin, QrCode, ShieldCheck, Award, ArrowRight, Cpu, Zap, ChevronsRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// --- Dynamic Glass Reflection Physics ---
const GlassReflection = React.memo(({ dark = false }: { dark?: boolean }) => (
  <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-40 overflow-hidden">
    <div 
      className={`absolute inset-0 transition-opacity duration-150 hw-accel ${dark ? 'mix-blend-overlay' : 'mix-blend-screen'}`}
      style={{ 
        opacity: `calc(var(--go, 0) * ${dark ? '0.5' : '0.8'})`, 
        background: `radial-gradient(circle ${dark ? '700px' : '900px'} at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,${dark ? '0.3' : '0.7'}) 0%, rgba(255,255,255,0) 70%)` 
      }}
    />
    <div 
      className={`absolute inset-[-100%] transition-transform duration-75 hw-accel ${dark ? 'mix-blend-overlay' : 'mix-blend-screen'}`}
      style={{ 
        opacity: `calc(var(--go, 0) * ${dark ? '0.4' : '0.7'})`, 
        background: `linear-gradient(115deg, transparent 45%, rgba(255,255,255,${dark ? '0.2' : '0.5'}) 48%, rgba(255,255,255,${dark ? '0.4' : '0.9'}) 50%, rgba(255,255,255,${dark ? '0.2' : '0.5'}) 52%, transparent 55%)`,
        transform: `translate(calc((var(--gx) - 50%) * 1.5), calc((var(--gy) - 50%) * 1.5))` 
      }}
    />
    <div 
      className="absolute inset-0 transition-opacity duration-150 hw-accel mix-blend-multiply"
      style={{ 
        opacity: `calc(var(--go, 0) * ${dark ? '0.5' : '0.08'})`, 
        background: `radial-gradient(circle 800px at calc(100% - var(--gx, 50%)) calc(100% - var(--gy, 50%)), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)` 
      }}
    />
  </div>
));
GlassReflection.displayName = 'GlassReflection';

// --- Minimalist Milled Hardware Screws ---
const HardwareAccents = React.memo(({ dark = false }: { dark?: boolean }) => {
  const Screw = ({ className }: { className: string }) => (
    <div className={`absolute w-4 h-4 rounded-full flex items-center justify-center z-40 preserve-3d ${className} ${dark ? 'bg-zinc-800 border border-zinc-700 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.5)]' : 'bg-gradient-to-br from-zinc-100 to-zinc-300 border border-zinc-400/50 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.05)]'}`}>
      <div className={`absolute w-2.5 h-2.5 rounded-full ${dark ? 'bg-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]' : 'bg-gradient-to-tl from-zinc-400 to-zinc-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]'}`} />
      <div className={`absolute w-1 h-1 rounded-full ${dark ? 'bg-amber-600/40' : 'bg-zinc-400/50'} shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]`} />
      <div className={`absolute w-[1px] h-2 ${dark ? 'bg-zinc-700' : 'bg-zinc-400'} rotate-45 opacity-60`} />
      <div className={`absolute h-[1px] w-2 ${dark ? 'bg-zinc-700' : 'bg-zinc-400'} rotate-45 opacity-60`} />
    </div>
  );

  return (
    <>
      <Screw className="top-6 left-6" />
      <Screw className="top-6 right-6" />
      <Screw className="bottom-6 left-6" />
      <Screw className="bottom-6 right-6" />
    </>
  );
});
HardwareAccents.displayName = 'HardwareAccents';

// --- Precision Machined Lens Ring ---
const LensRing = React.memo(() => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-10" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="92" fill="none" stroke="#d4d4d8" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="74" fill="none" stroke="#e4e4e7" strokeWidth="1" />
    {Array.from({ length: 72 }).map((_, i) => (
      <line
        key={i}
        x1="100" y1="8" x2="100" y2={i % 6 === 0 ? "16" : "12"}
        stroke={i % 6 === 0 ? "#a1a1aa" : "#d4d4d8"}
        strokeWidth={i % 6 === 0 ? "1" : "0.5"}
        transform={`rotate(${i * 5} 100 100)`}
      />
    ))}
    <circle cx="100" cy="100" r="82" fill="none" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" className="animate-[spin_60s_linear_infinite]" />
  </svg>
));
LensRing.displayName = 'LensRing';

// --- Elegant, Clean Corporate Cables (Background) ---
const PristineCable = ({ d, width, shadowOffset = 4 }: { d: string, width: number, shadowOffset?: number }) => {
  const base = width;
  const braid = width * 0.7;
  const core = width * 0.2;
  const hl1 = width * 0.15;
  const hlOff = -(width * 0.25);

  return (
    <g>
      {/* Soft Architectural Shadow */}
      <path d={d} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={base * 1.3} strokeLinecap="round" transform={`translate(${shadowOffset}, ${shadowOffset + 2})`} filter="url(#soft-shadow)" />
      
      {/* Immaculate White PVC Casing */}
      <path d={d} fill="none" stroke="#ffffff" strokeWidth={base} strokeLinecap="round" />
      
      {/* Subtle Silver Inner Braiding */}
      <path d={d} fill="none" stroke="#f4f4f5" strokeWidth={braid} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#e4e4e7" strokeWidth={braid} strokeDasharray="3 5" strokeLinecap="round" className="bg-cable-texture" />
      
      {/* Gentle 3D Rounding */}
      <path d={d} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={base} strokeLinecap="round" />
      
      {/* Clean Inner Core */}
      <path d={d} fill="none" stroke="#e5e5ea" strokeWidth={core + 2} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#ffffff" strokeWidth={core} strokeLinecap="round" />
      
      {/* Elegant Data Sweep (Corporate Red & Light) */}
      <path d={d} fill="none" stroke="#ef4444" strokeWidth={core} strokeDasharray="100 1500" strokeLinecap="round" className="bg-pulse-halo" opacity="0.7" />
      <path d={d} fill="none" stroke="#ffffff" strokeWidth={core * 0.6} strokeDasharray="20 1580" strokeLinecap="round" className="bg-pulse-spark" />
      
      {/* Crisp Specular Highlight (Glassy Finish) */}
      <path d={d} fill="none" stroke="rgba(255,255,255,1)" strokeWidth={hl1} strokeLinecap="round" transform={`translate(${hlOff}, ${hlOff})`} opacity="0.8" />
    </g>
  );
};

const EmbossedCableBackground = React.memo(({ animeLoaded }: { animeLoaded: boolean }) => {
  useEffect(() => {
    if (!animeLoaded || !(window as any).anime) return;
    
    // Smooth texture roll
    (window as any).anime({
      targets: '.bg-cable-texture',
      strokeDashoffset: [0, -100],
      easing: 'linear',
      duration: 4000,
      loop: true
    });

    // Smooth, sweeping data flow
    (window as any).anime({
      targets: '.bg-pulse-spark',
      strokeDashoffset: [2000, -500],
      easing: 'easeInOutSine', 
      duration: 4000,
      delay: (window as any).anime.stagger(1000),
      loop: true
    });

    (window as any).anime({
      targets: '.bg-pulse-halo',
      strokeDashoffset: [2000, -500],
      easing: 'easeInOutSine',
      duration: 4000,
      delay: (window as any).anime.stagger(1000, {start: 50}),
      loop: true
    });
  }, [animeLoaded]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-90" style={{ transform: 'translateZ(-1px)' }}>
      <svg className="w-full h-full" viewBox="0 0 460 760" preserveAspectRatio="none">
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <PristineCable d="M -100,550 C 150,600 250,150 600,100" width={48} shadowOffset={4} />
        <PristineCable d="M -100,700 C 250,750 150,300 600,250" width={32} shadowOffset={3} />
        <PristineCable d="M -100,450 C 100,400 350,800 600,700" width={16} shadowOffset={2} />
      </svg>
    </div>
  );
});
EmbossedCableBackground.displayName = 'EmbossedCableBackground';

// --- Sleek Corporate 3D Flip Wires ---
const FlipWrapManager = React.memo(({ flipCount, animeLoaded }: { flipCount: number, animeLoaded: boolean }) => {
  useEffect(() => {
    if (flipCount === 0 || !animeLoaded || !(window as any).anime) return;
    
    (window as any).anime.set('.fw-front path', { strokeDashoffset: 1500, strokeDasharray: 1500 });
    (window as any).anime.set('.fw-back path', { strokeDashoffset: 1500, strokeDasharray: 1500 });
    (window as any).anime.set('.fw-group', { opacity: 1 });

    const tl = (window as any).anime.timeline({ easing: 'easeInOutSine' });

    // Smooth trace across the front
    tl.add({
      targets: '.fw-front path',
      strokeDashoffset: [1500, 0],
      duration: 450,
      delay: (window as any).anime.stagger(80) 
    }, 0);

    // Smooth trace across the back
    tl.add({
      targets: '.fw-back path',
      strokeDashoffset: [1500, 0],
      duration: 450,
      delay: (window as any).anime.stagger(80)
    }, 350); 

    // Smooth erase from front
    tl.add({
      targets: '.fw-front path',
      strokeDashoffset: [0, -1500],
      duration: 450,
      delay: (window as any).anime.stagger(80)
    }, 700);

    // Smooth erase from back
    tl.add({
      targets: '.fw-back path',
      strokeDashoffset: [0, -1500],
      duration: 450,
      delay: (window as any).anime.stagger(80)
    }, 1050);

    tl.add({ targets: '.fw-group', opacity: [1, 0], duration: 200 }, 1450);

  }, [flipCount, animeLoaded]);

  return null;
});
FlipWrapManager.displayName = 'FlipWrapManager';

const PremiumWrapWire = ({ d, width }: { d: string, width: number }) => (
  <g>
    <path d={d} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={width * 1.2} filter="blur(4px)" transform="translate(2, 6)" />
    <path d={d} fill="none" stroke="#ffffff" strokeWidth={width} strokeLinecap="round" />
    <path d={d} fill="none" stroke="#dc2626" strokeWidth={width * 0.4} strokeLinecap="round" opacity="0.9" />
    <path d={d} fill="none" stroke="#fca5a5" strokeWidth={width * 0.15} strokeLinecap="round" />
    <path d={d} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={width * 0.15} strokeLinecap="round" transform={`translate(-${width*0.25}, -${width*0.25})`} />
  </g>
);

const WrapSVGFront = () => (
  <div className="absolute inset-[-10px] z-[100] pointer-events-none preserve-3d fw-group fw-front opacity-0" style={{ transform: 'translateZ(35px)' }}>
    <svg className="w-full h-full" viewBox="0 0 480 780" preserveAspectRatio="none">
      <PremiumWrapWire d="M -20, 150 C 150, 50  350, 250  480, 180" width={16} />
      <PremiumWrapWire d="M -20, 350 C 150, 450 300, 250  480, 380" width={12} />
      <PremiumWrapWire d="M -20, 550 C 200, 450 250, 650  480, 580" width={20} />
    </svg>
  </div>
);

const WrapSVGBack = () => (
  <div className="absolute inset-[-10px] z-[100] pointer-events-none preserve-3d fw-group fw-back opacity-0" style={{ transform: 'translateZ(35px)' }}>
    <svg className="w-full h-full" viewBox="0 0 480 780" preserveAspectRatio="none">
      <PremiumWrapWire d="M -20, 180 C 150, 280 350, 80   480, 150" width={16} />
      <PremiumWrapWire d="M -20, 380 C 150, 280 300, 480  480, 350" width={12} />
      <PremiumWrapWire d="M -20, 580 C 200, 680 250, 480  480, 550" width={20} />
    </svg>
  </div>
);

export default function AsianCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasGyro, setHasGyro] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const updatePointerMode = () => {
      setIsDesktopPointer(mediaQuery.matches);
    };

    updatePointerMode();
    mediaQuery.addEventListener('change', updatePointerMode);

    return () => {
      mediaQuery.removeEventListener('change', updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopPointer || prefersReducedMotion) {
      setAnimeLoaded(false);
      return;
    }

    if ((window as any).anime) {
      setAnimeLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => setAnimeLoaded(true);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isDesktopPointer, prefersReducedMotion]);

  const isFlippedRef = useRef(isFlipped);
  useEffect(() => { isFlippedRef.current = isFlipped; }, [isFlipped]);

  const handleFlip = useCallback((e: any) => {
    if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().catch(console.error);
    }
    if (e.target.closest('a') || e.target.closest('.no-flip')) return;
    
    setIsFlipped(prev => !prev);
    setFlipCount(c => c + 1);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const card = cardRef.current;
      if (card) {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--go', '0');
      }
      return;
    }

    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    let rafId: number;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let mouseX = 50, mouseY = 50, targetGlareOpacity = 0, currentGlareOpacity = 0;
    let isCardActive = false;
    let usingGyro = false;

    const onDeviceOrientation = (e: any) => {
      if (e.beta === null || e.gamma === null) return;
      if (!hasGyro) setHasGyro(true);
      usingGyro = true;
      let beta = e.beta - 45; 
      let gamma = e.gamma;
      const maxTilt = 12; 
      let tiltX = Math.max(-maxTilt, Math.min(maxTilt, -beta)); 
      let tiltY = Math.max(-maxTilt, Math.min(maxTilt, gamma));

      let rawMouseX = 50 + (gamma / 45) * 50;
      let rawMouseY = 50 + (beta / 45) * 50;

      if (isFlippedRef.current) { tiltX = -tiltX; tiltY = -tiltY; rawMouseX = 100 - rawMouseX; }

      mouseX = Math.max(0, Math.min(100, rawMouseX));
      mouseY = Math.max(0, Math.min(100, rawMouseY));
      targetX = tiltX; targetY = tiltY; targetGlareOpacity = 1;
      if (!isCardActive) { isCardActive = true; animate(); }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (usingGyro) return;
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      let rawMouseX = (x / rect.width) * 100;
      let rawMouseY = (y / rect.height) * 100;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      let tiltX = ((y - centerY) / centerY) * -12; 
      let tiltY = ((x - centerX) / centerX) * 12;

      if (isFlippedRef.current) { tiltX = -tiltX; tiltY = -tiltY; rawMouseX = 100 - rawMouseX; }
      mouseX = rawMouseX; mouseY = rawMouseY; targetX = tiltX; targetY = tiltY; targetGlareOpacity = 1;
      if (!isCardActive) { isCardActive = true; animate(); }
    };

    const onMouseLeave = () => {
      if (usingGyro) return;
      targetX = 0; targetY = 0; targetGlareOpacity = 0;
      if (!isCardActive) { isCardActive = true; animate(); }
    };

    const animate = () => {
      let needsNextFrame = false;
      if (isCardActive) {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        currentGlareOpacity += (targetGlareOpacity - currentGlareOpacity) * 0.1;
        card.style.setProperty('--rx', `${currentX.toFixed(3)}deg`);
        card.style.setProperty('--ry', `${currentY.toFixed(3)}deg`);
        card.style.setProperty('--gx', `${mouseX.toFixed(1)}%`);
        card.style.setProperty('--gy', `${mouseY.toFixed(1)}%`);
        card.style.setProperty('--go', currentGlareOpacity.toFixed(3));
        
        const angle = Math.atan2(mouseY - 50, mouseX - 50) * (180 / Math.PI) + 90;
        card.style.setProperty('--foil-deg', `${angle.toFixed(1)}deg`);

        if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetGlareOpacity - currentGlareOpacity) > 0.01) needsNextFrame = true;
        else isCardActive = false;
      }
      if (needsNextFrame) rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('deviceorientation', onDeviceOrientation);
    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseleave', onMouseLeave);
    animate(); 

    return () => {
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [hasGyro, prefersReducedMotion]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative perspective-[5000px] z-10 w-full font-mono">
      <FlipWrapManager flipCount={flipCount} animeLoaded={animeLoaded} />

      <style dangerouslySetInnerHTML={{
        __html: `
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .hw-accel { will-change: transform; transform: translateZ(0); }
          
          @keyframes floatCard { 
            0%, 100% { transform: translateY(0px) rotateX(1deg) rotateY(-1deg); } 
            50% { transform: translateY(-12px) rotateX(-1deg) rotateY(1deg); } 
          }
          .animate-float-card { animation: floatCard 8s ease-in-out infinite; }

          .glass-card-light {
            background: linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%);
            border: 1px solid rgba(255, 255, 255, 1);
            box-shadow: 
              0 50px 100px rgba(0,0,0,0.1), 
              0 15px 35px rgba(0,0,0,0.05),
              inset 0 0 0 1px rgba(255,255,255,0.8),
              inset 0 0 30px rgba(255,255,255,0.5);
          }

          .glass-card-vibrant {
            background: linear-gradient(135deg, rgba(185, 28, 28, 0.98) 0%, rgba(127, 29, 29, 1) 100%);
            border: 1px solid rgba(255, 100, 100, 0.2);
            box-shadow: 0 50px 100px rgba(153, 27, 27, 0.4);
          }

          .technical-grid {
            background-image: 
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .diagonal-hash {
            background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 6px);
          }

          .carbon-weave-vibrant {
            background: 
              linear-gradient(27deg, #991b1b 5px, transparent 5px) 0 5px,
              linear-gradient(207deg, #991b1b 5px, transparent 5px) 10px 0px,
              linear-gradient(27deg, #b91c1c 5px, transparent 5px) 0px 10px,
              linear-gradient(207deg, #b91c1c 5px, transparent 5px) 10px 5px,
              linear-gradient(90deg, #7f1d1d 10px, transparent 10px),
              linear-gradient(#881313 25%, #7a1212 25%, #7a1212 50%, transparent 50%, transparent 75%, #9e1818 75%, #9e1818 100%);
            background-color: #6b1414;
            background-size: 20px 20px;
          }

          .magnetic-sheen {
            background: conic-gradient(from var(--foil-deg, 0deg) at var(--gx) var(--gy), 
              transparent 0%, rgba(255,255,255,0.8) 15%, transparent 35%, transparent 50%,
              rgba(255,255,255,0.8) 65%, transparent 85%, transparent 100%
            );
            mix-blend-mode: overlay;
            opacity: calc(var(--go) * 0.6);
          }

          .magnetic-sheen-vibrant {
            background: conic-gradient(from var(--foil-deg, 0deg) at var(--gx) var(--gy), 
              transparent 0%, rgba(255,255,255,0.3) 15%, rgba(253, 164, 175, 0.2) 30%, 
              transparent 50%, rgba(255,255,255,0.3) 65%, rgba(253, 164, 175, 0.2) 80%, transparent 100%
            );
            mix-blend-mode: screen;
            opacity: calc(var(--go) * 1);
          }

          .metallic-text {
            background: linear-gradient(to bottom, #52525b 0%, #18181b 50%, #09090b 51%, #27272a 100%);
            -webkit-background-clip: text;
            color: transparent;
            filter: drop-shadow(0px 1px 1px rgba(255,255,255,0.8));
          }

          @media (hover: hover) and (pointer: fine) {
            .deep-shadow { filter: drop-shadow(calc(var(--ry) * -0.6px) calc(var(--rx) * 0.6px) 20px rgba(0,0,0,0.1)) drop-shadow(0px 5px 10px rgba(0,0,0,0.05)); }
            .deep-shadow-vibrant { filter: drop-shadow(calc(var(--ry) * -1px) calc(var(--rx) * 1px) 30px rgba(153,27,27,0.5)) drop-shadow(0px 10px 15px rgba(127,29,29,0.4)); }
          }
          @media (max-width: 768px), (hover: none) and (pointer: coarse) {
            .deep-shadow { filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.15)) drop-shadow(0px 5px 10px rgba(0,0,0,0.05)); }
            .deep-shadow-vibrant { filter: drop-shadow(0px 15px 30px rgba(153,27,27,0.6)) drop-shadow(0px 10px 15px rgba(127,29,29,0.5)); }
          }
          .blend-logo { mix-blend-mode: multiply; }
        `
      }} />

      {/* --- 3D Tracking Wrapper --- */}
      <div 
        ref={wrapperRef}
        onClick={handleFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full max-w-[440px] h-[680px] sm:h-[740px] cursor-pointer group preserve-3d"
      >
        <div 
          ref={cardRef}
          className={`w-full h-full preserve-3d hw-accel ${!prefersReducedMotion && isDesktopPointer && !isHovered && !isFlipped && !hasGyro ? 'animate-float-card' : ''}`}
          style={{ transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}
        >
          <div 
            className="absolute inset-0 w-full h-full preserve-3d hw-accel transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* FRONT OF CARD */}
            <div className="absolute inset-0 w-full h-full backface-hidden preserve-3d rounded-[2.5rem] glass-card-light" style={{ transform: 'translateZ(1px)' }}>
              <div className="absolute left-0 top-0 bottom-0 w-3 z-30 rounded-l-[2.5rem] bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-[2px_0_15px_rgba(220,38,38,0.15)] border-r border-red-900/10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(0,0,0,0.5)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
              </div>

              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden hw-accel pointer-events-none z-10">
                <div className="absolute inset-0 technical-grid opacity-60" />
                <div className="absolute inset-0 diagonal-hash opacity-60" />

                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-zinc-200/50 rounded-full" />
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-zinc-200/30 rounded-full" />
                
                <EmbossedCableBackground animeLoaded={animeLoaded} />
                <div className="absolute inset-0 magnetic-sheen" />
              </div>

              <WrapSVGFront />
              <HardwareAccents />
              <GlassReflection />

              <div className="relative w-full h-full flex flex-col items-center justify-between p-10 sm:p-12 preserve-3d pointer-events-none hw-accel pl-12 z-40" style={{ transform: 'translateZ(30px)' }}>
                <div className="w-full flex justify-between items-start z-10 deep-shadow" style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 bg-white/90 border border-zinc-200/80 px-3.5 py-1.5 rounded-md shadow-sm backdrop-blur-md">
                      <Cpu size={13} className="text-zinc-400" />
                      <span className="font-mono text-[8px] tracking-[0.3em] font-black text-zinc-500 uppercase">Model: 1953-V9</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-red-50/80 border border-red-100/80 px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                    <ShieldCheck size={14} className="text-red-600" strokeWidth={2.5} />
                    <span className="font-mono font-bold text-[9px] tracking-widest text-red-600 uppercase pt-[1px]">Make in India</span>
                  </div>
                </div>

                <div className="w-full flex-1 flex flex-col items-center justify-center my-6 preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                  <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center preserve-3d mb-10 deep-shadow" style={{ transform: 'translateZ(20px)' }}>
                    <div className="absolute inset-0 border-[10px] border-white/80 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.05)] bg-zinc-50/50 backdrop-blur-sm" style={{ transform: 'translateZ(5px)' }}/>
                    <LensRing />
                    
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-full p-6 flex items-center justify-center preserve-3d border border-zinc-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] z-20" style={{ transform: 'translateZ(30px)' }}>
                      <img 
                        src="/Assests/Brand_Logo/LOGO-2.svg" 
                        alt="Asian Computeronics Logo" 
                        width={240}
                        height={240}
                        decoding="async"
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)] z-10" 
                        style={{ transform: 'translateZ(10px)' }}
                        onError={(e: any) => { e.target.onerror = null; e.target.src = '/Assests/Brand_Logo/ASIAN.png'; }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center gap-4 w-full justify-center px-6 mb-5 opacity-70">
                      <div className="flex-1 h-[1px] bg-zinc-300 shadow-[0_1px_0_white]" />
                      <span className="font-mono text-[8px] font-black tracking-[0.4em] text-zinc-500 uppercase drop-shadow-[0_1px_0_white]">Divisions</span>
                      <div className="flex-1 h-[1px] bg-zinc-300 shadow-[0_1px_0_white]" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 w-full max-w-[360px] px-2 preserve-3d">
                      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_1px_1px_white] border border-white flex items-center justify-center transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(220,38,38,0.1)]" style={{ transform: 'translateZ(10px)' }}>
                         <img src="/Assests/Brand_Logo/ASIAN.png" alt="Wires" width={120} height={64} className="h-14 sm:h-16 max-w-full object-contain blend-logo opacity-90" decoding="async" loading="lazy" onError={(e: any) => e.target.src='/Assests/Brand_Logo/LOGO-2.svg'} />
                      </div>
                      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_1px_1px_white] border border-white flex items-center justify-center transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(220,38,38,0.1)]" style={{ transform: 'translateZ(10px)' }}>
                         <img src="/Assests/Brand_Logo/True_MAster.png" alt="Master" width={120} height={64} className="h-14 sm:h-16 max-w-full object-contain blend-logo opacity-90" decoding="async" loading="lazy" onError={(e: any) => e.target.src='/Assests/Brand_Logo/LOGO-2.svg'} />
                      </div>
                      <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_1px_1px_white] border border-white flex items-center justify-center transition-transform duration-500 hover:-translate-y-1.5 hover:shadow-[0_10px_20px_rgba(220,38,38,0.1)]" style={{ transform: 'translateZ(10px)' }}>
                         <img src="/Assests/Brand_Logo/M1_VOICE.png" alt="Voice" width={120} height={64} className="h-14 sm:h-16 max-w-full object-contain blend-logo opacity-90" decoding="async" loading="lazy" onError={(e: any) => e.target.src='/Assests/Brand_Logo/LOGO-2.svg'} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 preserve-3d text-center w-full z-10 deep-shadow" style={{ transform: 'translateZ(35px)' }}>
                  <h1 className="font-grotesk text-2xl sm:text-3xl leading-none font-black tracking-tight uppercase text-center w-full break-words">
                    <span className="metallic-text block mb-1">ASIAN COMPUTERONICS</span> 
                    <span className="text-red-600 drop-shadow-sm block text-xl sm:text-2xl">& ELECTRONICS</span>
                  </h1>
                  
                  <div className="mt-4 flex items-center justify-center w-full pointer-events-auto">
                    <div className="group relative flex items-center gap-3 bg-white border border-zinc-200 p-1.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 no-flip cursor-pointer hover:shadow-[0_10px_25px_rgba(220,38,38,0.1)]">
                      <div className="bg-red-600 text-white p-2 rounded-full shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={14} strokeWidth={2.5}/>
                      </div>
                      <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-zinc-500 pr-5 group-hover:text-red-600 transition-colors">Access Directory</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* BACK OF CARD */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden preserve-3d rounded-[2.5rem] glass-card-vibrant text-white"
              style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-4 z-30 rounded-r-[2.5rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[-3px_0_20px_rgba(0,0,0,0.5)] border-l border-zinc-700/30">
                 <div className="absolute inset-0 opacity-20 bg-[linear-gradient(-45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px]" />
              </div>

              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden hw-accel pointer-events-none z-10">
                <div className="absolute inset-0 carbon-weave-vibrant opacity-90" />
                <div className="absolute inset-0 magnetic-sheen-vibrant z-20 transition-opacity duration-300" />
                
                <div className="absolute -bottom-16 -left-16 opacity-[0.04] transform rotate-12">
                  <img src="/Assests/Brand_Logo/LOGO-2.svg" alt="" width={384} height={384} decoding="async" loading="lazy" className="w-96 h-96 max-w-none invert object-contain" onError={(e: any) => e.target.style.display='none'}/>
                </div>
              </div>

              <WrapSVGBack />
              <HardwareAccents dark={false} />
              <GlassReflection dark={true} />

              <div className="relative z-40 w-full h-full flex flex-col p-10 sm:p-12 preserve-3d pointer-events-none hw-accel pr-14" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex items-center justify-between border-b border-red-400/30 pb-5 deep-shadow-vibrant" style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex flex-col gap-1">
                    <span className="font-grotesk font-bold text-2xl sm:text-3xl tracking-wide uppercase text-white">Directory</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-amber-300 uppercase">Headquarters</span>
                  </div>
                  <Award size={28} className="text-amber-400/80" strokeWidth={1.5}/>
                </div>

                <div className="flex flex-col gap-6 mt-8 flex-1 preserve-3d pointer-events-auto hw-accel" style={{ transform: 'translateZ(35px)' }}>
                  <div className="group/item relative p-7 sm:p-8 rounded-3xl bg-red-950/40 backdrop-blur-xl border border-red-400/30 transition-all duration-300 preserve-3d hover:translate-z-[20px] hover:border-amber-400/50 hover:bg-red-950/60 shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-300 to-amber-600 rounded-l-3xl opacity-90 shadow-[2px_0_15px_rgba(251,191,36,0.3)]" />
                    <div className="flex flex-col pl-5 preserve-3d" style={{ transform: 'translateZ(15px)' }}>
                      <h3 className="font-grotesk font-black text-2xl sm:text-3xl tracking-tight uppercase text-white drop-shadow-md">Brij Kumar Gupta</h3>
                      <p className="font-mono text-[11px] sm:text-[12px] tracking-[0.3em] font-bold text-amber-300 mt-2 uppercase">Owner & Founder</p>
                    </div>
                    
                    <div className="mt-8 flex flex-col gap-4 text-[13px] sm:text-[14px] text-red-100 relative z-10 preserve-3d pl-5" style={{ transform: 'translateZ(10px)' }}>
                      <a href="mailto:brijasian@gmail.com" className="flex items-center gap-4 transition-all duration-300 w-fit hover:text-white group/link">
                        <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 group-hover/link:border-amber-400/50 group-hover/link:bg-red-900/80 transition-colors shadow-inner">
                          <Mail size={18} className="text-red-200 group-hover/link:text-amber-400" strokeWidth={2}/>
                        </div>
                        <span className="font-mono font-bold tracking-widest text-[#E4E3DB]">brijasian@gmail.com</span>
                      </a>
                      <a href="tel:+919811733043" className="flex items-center gap-4 transition-all duration-300 w-fit hover:text-white group/link">
                        <div className="p-3 bg-red-900/50 rounded-xl border border-red-800 group-hover/link:border-amber-400/50 group-hover/link:bg-red-900/80 transition-colors shadow-inner">
                          <Phone size={18} className="text-red-200 group-hover/link:text-amber-400" strokeWidth={2}/>
                        </div>
                        <span className="font-mono font-bold tracking-widest text-[#E4E3DB]">+91-9811733043</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-auto mb-2 flex items-center justify-between bg-gradient-to-br from-red-900/80 to-red-950/90 p-5 rounded-2xl border border-red-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.3)] deep-shadow-vibrant" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex flex-col gap-2">
                      <span className="font-grotesk font-black text-[1.4rem] text-white tracking-wider uppercase drop-shadow-md">Asian-1953</span>
                      <span className="font-mono text-[10px] text-red-300 tracking-[0.2em] font-bold uppercase">ISO 9001:2015 Certified</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 pointer-events-auto">
                      <QrCode size={54} className="text-red-950" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-red-400/30 flex justify-between items-center text-[10px] sm:text-[11px] text-red-200 preserve-3d font-semibold pointer-events-auto" style={{ transform: 'translateZ(15px)' }}>
                  <a href="https://www.taarwale.in" target="_blank" rel="noopener noreferrer" className="font-mono flex items-center gap-2.5 hover:text-white transition-colors uppercase tracking-[0.15em] group/link">
                    <Globe size={16} className="text-amber-400 group-hover/link:text-amber-300"/> taarwale.in
                  </a>
                  <span className="font-mono flex items-center gap-2.5 uppercase tracking-[0.15em]">
                    <MapPin size={16} className="text-amber-400"/> Delhi, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-10 flex flex-col items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500 tracking-[0.2em] uppercase font-semibold transition-opacity duration-700 ${isHovered || hasGyro ? 'opacity-100' : 'opacity-0'}`}>
        <p className="flex items-center gap-2 font-mono"><ChevronsRight size={14} className="animate-pulse text-red-500" /> {isFlipped ? "Click background to view front" : "Click background to flip"}</p>
      </div>
    </div>
  );
}
