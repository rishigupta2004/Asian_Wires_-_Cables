import React from 'react';

export default function ConductorStrandSVG() {
    const R = 9;
    const Rp = 9.5; // faint oxidation ring

    // Calculate 19 strand positions (hexagonal close packed)
    const strands = [{ x: 0, y: 0 }]; // Layer 0: center

    // Layer 1
    const d1 = 18;
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        strands.push({ x: d1 * Math.cos(angle), y: d1 * Math.sin(angle) });
    }

    // Layer 2
    const d2a = 36;
    const d2b = 18 * Math.sqrt(3);
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const dist = i % 2 === 0 ? d2a : d2b;
        strands.push({ x: dist * Math.cos(angle), y: dist * Math.sin(angle) });
    }

    return (
        <svg viewBox="0 0 120 150" className="w-full h-full">
            <defs>
                <radialGradient id="copperGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#E8A838" />
                    <stop offset="100%" stopColor="#8B5A1A" />
                </radialGradient>
            </defs>

            <g transform="translate(60, 60)">
                {/* Outer binding ring */}
                <circle cx="0" cy="0" r="46.5" fill="none" stroke="#0F0F0F" strokeWidth="1" opacity="0.8" />

                {/* Strands */}
                {strands.map((s, i) => (
                    <g key={i} transform={`translate(${s.x}, ${s.y})`}>
                        <circle cx="0" cy="0" r={Rp} fill="none" stroke="#0F0F0F" strokeWidth="0.5" opacity="0.2" />
                        <circle cx="0" cy="0" r={R} fill="url(#copperGrad)" stroke="#5A3010" strokeWidth="0.8" />
                    </g>
                ))}

                {/* Compression lines (simulate bunching twist forces) */}
                {[0, 120, 240].map(angle => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <line
                            key={angle}
                            x1={20 * Math.cos(rad)}
                            y1={20 * Math.sin(rad)}
                            x2={46 * Math.cos(rad)}
                            y2={46 * Math.sin(rad)}
                            stroke="#0F0F0F"
                            strokeWidth="0.5"
                            opacity="0.3"
                        />
                    );
                })}
            </g>

            {/* Label */}
            <text x="60" y="130" fontFamily="Space Mono" fontSize="8" fontWeight="bold" fill="rgba(15,15,15,0.6)" textAnchor="middle">
                19-STR CLASS 2
            </text>
            <text x="60" y="142" fontFamily="Space Mono" fontSize="7" fill="rgba(15,15,15,0.6)" textAnchor="middle">
                Ø 18.4mm CONDUCTOR
            </text>
        </svg>
    );
}
