import React from 'react';

export const NoiseOverlay = () => (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-overlay">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        {/* CRT scanlines */}
        <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)', backgroundSize: '100% 4px' }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.35)]" />
    </div>
);
