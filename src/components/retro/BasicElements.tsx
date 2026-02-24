'use client';

export const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full overflow-hidden">
    <svg className="absolute inset-0 h-full w-full opacity-[0.25] mix-blend-overlay">
      <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" /></filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
    <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
         style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }}></div>
    <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none"></div>
  </div>
);

export const HalftoneGrid = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none z-0">
    <pattern id="halftone" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <circle cx="2" cy="2" r="1.5" fill="#0F0F0F" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#halftone)" />
  </svg>
);

export const RegistrationMarks = () => (
  <>
    <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#0F0F0F] pointer-events-none"></div>
    <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#0F0F0F] pointer-events-none"></div>
    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-[#0F0F0F] pointer-events-none"></div>
    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-[#0F0F0F] pointer-events-none"></div>
  </>
);
