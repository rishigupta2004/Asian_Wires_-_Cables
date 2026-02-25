import React from 'react';

export interface ProcessFlowSVGProps {
    activeNode?: string;  // highlights a specific process step (e.g. "N1", "N2")
}

export default function ProcessFlowSVG({ activeNode = "N1" }: ProcessFlowSVGProps) {
    const nodes = [
        { id: 'N1', x: 20, y: 100, label: 'ROD BREAKDOWN', sub: '6.5mm → 2.5mm' },
        { id: 'N2', x: 180, y: 100, label: 'WIRE DRAWING', sub: '2.5mm → 0.4mm' },
        { id: 'N3', x: 340, y: 100, label: 'STRANDING', sub: 'Class 2 / Class 5' },
        { id: 'N4', x: 500, y: 100, label: 'INSULATION', sub: 'XLPE Extrusion' },
        { id: 'N5', x: 700, y: 100, label: 'CABLING', sub: 'Trefoil Formation' },
        { id: 'N6', x: 700, y: 210, label: 'ARMORING', sub: 'SWA / AWA' },
        { id: 'N7', x: 500, y: 210, label: 'OUTER SHEATHING', sub: 'FRLS PVC ST2' },
        { id: 'N8', x: 340, y: 210, label: 'SPARK TESTING', sub: '3.5kV AC / DC' },
        { id: 'N9', x: 180, y: 210, label: 'QC & DISPATCH', sub: 'IS/IEC Certified' },
    ];

    return (
        <>
            <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes pulseGlow {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        .flow-path {
          animation: flowDash 1.5s linear infinite;
        }
      `}</style>
            <svg viewBox="0 0 900 320" className="w-full h-full">
                <defs>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <polygon points="0,0 10,5 0,10" fill="#FF3300" />
                    </marker>
                </defs>

                {/* CONNECTING ARROWS */}
                <g stroke="#FF3300" strokeWidth="2" strokeDasharray="8 5" fill="none" className="flow-path" markerEnd="url(#arrow-red)">
                    <path d="M 140 125 L 176 125" />
                    <path d="M 300 125 L 336 125" />
                    <path d="M 460 125 L 496 125" />
                    <path d="M 620 125 L 696 125" />
                    <path d="M 760 150 L 760 206" />
                    <path d="M 700 235 L 624 235" />
                    <path d="M 500 235 L 464 235" />
                    <path d="M 340 235 L 304 235" />
                </g>

                {/* NODES */}
                {nodes.map((node, i) => {
                    const isActive = activeNode === node.id;
                    return (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            {/* Pulsing glow if active */}
                            {isActive && (
                                <rect
                                    x="-4" y="-4" width="128" height="58"
                                    fill="none" stroke="#FF3300" strokeWidth="2"
                                    style={{ animation: 'pulseGlow 2s ease-in-out infinite', transformOrigin: 'center' }}
                                />
                            )}

                            {/* Main Box */}
                            <rect
                                width="120" height="50" rx="0"
                                fill={isActive ? 'rgba(255,51,0,0.15)' : 'rgba(228,227,219,0.05)'}
                                stroke={isActive ? '#FF3300' : 'rgba(228,227,219,0.25)'}
                                strokeWidth={isActive ? 3 : 2}
                            />

                            {/* Step Number Circle */}
                            <circle cx="0" cy="0" r="10" fill="#FF3300" stroke="#E4E3DB" strokeWidth="1.5" />
                            <text x="0" y="3" fontFamily="Space Mono" fontSize="8" fontWeight="bold" fill="#0F0F0F" textAnchor="middle">
                                {i + 1}
                            </text>

                            {/* Node Labels */}
                            <text x="60" y="22" fontFamily="Space Mono" fontSize="10" fontWeight="bold" fill="#E4E3DB" textAnchor="middle">
                                {node.label}
                            </text>
                            <text x="60" y="38" fontFamily="Space Mono" fontSize="8" fill="rgba(228,227,219,0.5)" textAnchor="middle">
                                {node.sub}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </>
    );
}
