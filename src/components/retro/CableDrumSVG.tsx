import React from 'react';

export interface CableDrumSVGProps {
    cableId?: string;       // e.g. "AW-240"
    drumLength?: string;    // e.g. "1000m"
    drumDiameter?: string;  // e.g. "1050mm"
    barrelWidth?: string;   // e.g. "2100mm"
}

export default function CableDrumSVG({
    cableId = "AW-240",
    drumLength = "1000m",
    drumDiameter = "1050mm",
    barrelWidth = "2100mm",
}: CableDrumSVGProps) {
    // random number for layline label
    const randomDrumNo = "AW-2024-" + Math.floor(100 + Math.random() * 900);

    return (
        <svg viewBox="0 0 360 220" className="w-full h-full">
            <rect width="360" height="220" fill="#D7D6CD" />

            {/* CORE BARREL */}
            <rect x="65" y="68" width="230" height="84" fill="#5A3D15" stroke="#0F0F0F" strokeWidth="2" />

            {/* Wood grain texture on barrel */}
            <g stroke="#4A3010" strokeWidth="0.8" opacity="0.5">
                <line x1="65" y1="80" x2="295" y2="80" />
                <line x1="65" y1="90" x2="295" y2="90" />
                <line x1="65" y1="100" x2="295" y2="100" />
                <line x1="65" y1="110" x2="295" y2="110" />
                <line x1="65" y1="120" x2="295" y2="120" />
                <line x1="65" y1="130" x2="295" y2="130" />
                <line x1="65" y1="140" x2="295" y2="140" />
            </g>

            {/* CABLE WOUND ON DRUM */}
            <g fill="none">
                <ellipse cx="180" cy="110" rx="80" ry="26" stroke="#B87333" strokeWidth="5.5" opacity="1.0" />
                <ellipse cx="180" cy="110" rx="90" ry="31" stroke="#A0682A" strokeWidth="4.5" opacity="0.9" />
                <ellipse cx="180" cy="110" rx="100" ry="36" stroke="#8B5820" strokeWidth="4.0" opacity="0.8" />
                <ellipse cx="180" cy="110" rx="108" ry="40" stroke="#7A4A18" strokeWidth="3.5" opacity="0.7" />
            </g>

            {/* CABLE ID LABEL on barrel */}
            <text x="180" y="108" fontFamily="Space Mono" fontSize="9" fontWeight="bold" fill="#E4E3DB" textAnchor="middle">
                {cableId}
            </text>
            <text x="180" y="120" fontFamily="Space Mono" fontSize="9" fontWeight="bold" fill="#E4E3DB" textAnchor="middle">
                {drumLength}
            </text>

            {/* LEFT FLANGE */}
            <g transform="translate(65, 110)">
                <circle r="56" fill="#7B5A2A" stroke="#0F0F0F" strokeWidth="3" />
                {/* Anti-rotation lugs */}
                <rect x="-3" y="-66" width="6" height="10" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="-3" y="56" width="6" height="10" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="-66" y="-5" width="10" height="6" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="56" y="-5" width="10" height="6" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />

                <circle r="46" fill="#9B7A3A" stroke="#0F0F0F" strokeWidth="2" />

                {/* Spokes */}
                {[0, 60, 120, 180, 240, 300].map(angle => (
                    <line
                        key={angle}
                        x1={12 * Math.cos(angle * Math.PI / 180)}
                        y1={12 * Math.sin(angle * Math.PI / 180)}
                        x2={44 * Math.cos(angle * Math.PI / 180)}
                        y2={44 * Math.sin(angle * Math.PI / 180)}
                        stroke="#5A3D15"
                        strokeWidth="3"
                    />
                ))}

                <circle r="12" fill="#4A3010" stroke="#0F0F0F" strokeWidth="2" />
                <circle r="6" fill="#2A1A08" />
            </g>

            {/* RIGHT FLANGE */}
            <g transform="translate(295, 110)">
                <circle r="56" fill="#7B5A2A" stroke="#0F0F0F" strokeWidth="3" />
                {/* Anti-rotation lugs */}
                <rect x="-3" y="-66" width="6" height="10" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="-3" y="56" width="6" height="10" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="-66" y="-5" width="10" height="6" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />
                <rect x="56" y="-5" width="10" height="6" fill="#4A3010" stroke="#0F0F0F" strokeWidth="1" />

                <circle r="46" fill="#9B7A3A" stroke="#0F0F0F" strokeWidth="2" />

                {/* Spokes */}
                {[0, 60, 120, 180, 240, 300].map(angle => (
                    <line
                        key={angle}
                        x1={12 * Math.cos(angle * Math.PI / 180)}
                        y1={12 * Math.sin(angle * Math.PI / 180)}
                        x2={44 * Math.cos(angle * Math.PI / 180)}
                        y2={44 * Math.sin(angle * Math.PI / 180)}
                        stroke="#5A3D15"
                        strokeWidth="3"
                    />
                ))}

                <circle r="12" fill="#4A3010" stroke="#0F0F0F" strokeWidth="2" />
                <circle r="6" fill="#2A1A08" />
            </g>

            {/* DIMENSION LINES */}
            <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <polygon points="0,0 10,5 0,10" fill="#FF3300" />
                </marker>
                <marker id="arrowhead_black" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <polygon points="0,0 10,5 0,10" fill="#0F0F0F" opacity="0.5" />
                </marker>
            </defs>

            {/* LEFT HEIGHT DIMENSION */}
            <line x1="5" y1="54" x2="5" y2="166" stroke="#FF3300" strokeWidth="1" markerStart="url(#arrowhead)" markerEnd="url(#arrowhead)" />
            <text x="-110" y="14" transform="rotate(-90)" fontFamily="Space Mono" fontSize="8" fontWeight="bold" fill="#FF3300" textAnchor="middle">
                {drumDiameter}
            </text>

            {/* BOTTOM WIDTH DIMENSION */}
            <line x1="65" y1="185" x2="295" y2="185" stroke="#0F0F0F" opacity="0.5" strokeWidth="1" markerStart="url(#arrowhead_black)" markerEnd="url(#arrowhead_black)" />
            <text x="180" y="197" fontFamily="Space Mono" fontSize="8" fill="#0F0F0F" opacity="0.5" textAnchor="middle">
                {barrelWidth}
            </text>

            {/* LAYLINE LABEL / TAG */}
            <g transform="translate(155, 15)">
                <rect width="50" height="18" fill="#E4E3DB" stroke="#0F0F0F" strokeWidth="1.5" />
                <text x="25" y="7" fontFamily="Space Mono" fontSize="5" fill="#0F0F0F" textAnchor="middle" fontWeight="bold">
                    DRUM NO.
                </text>
                <text x="25" y="14" fontFamily="Space Mono" fontSize="5" fill="#0F0F0F" textAnchor="middle">
                    {randomDrumNo}
                </text>
            </g>

        </svg>
    );
}
