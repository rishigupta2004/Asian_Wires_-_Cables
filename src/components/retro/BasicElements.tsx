'use client';

export const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.08]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px',
    }}
  />
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

export const BlueprintGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0 opacity-100"
    style={{
      backgroundImage: `
        linear-gradient(rgba(100,120,140,0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(100,120,140,0.12) 1px, transparent 1px)
      `,
      backgroundSize: '32px 32px'
    }}
  />
);
