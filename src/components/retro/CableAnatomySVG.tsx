import React, { useMemo } from 'react';

export interface CableAnatomySVGProps {
    mousePos: { x: number; y: number };
    variant?: '3C_XLPE_11kV' | 'FRLS_MULTICORE' | 'SOLAR_DC_1500V';
}

export default function CableAnatomySVG({
    mousePos = { x: 0, y: 0 },
    variant = '3C_XLPE_11kV',
}: CableAnatomySVGProps) {
    // Parallax utility
    const getTransform = (speed: number) => {
        // scale down mousePos so it's not too crazy moving
        const factor = 1.0;
        return `translate(${mousePos.x * speed * factor}px, ${mousePos.y * speed * factor}px)`;
    };

    const is3C = variant === '3C_XLPE_11kV';
    const isMulticore = variant === 'FRLS_MULTICORE';
    const isSolar = variant === 'SOLAR_DC_1500V';

    const sheathColor = isMulticore ? '#C8B89A' : '#1A1A1A';
    const hasArmor = is3C;

    // Pre-calculate SWA armor circles
    const armorCircles = useMemo(() => {
        const circles = [];
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const r = 178;
            circles.push({
                x: 250 + r * Math.cos(angle),
                y: 250 + r * Math.sin(angle),
            });
        }
        return circles;
    }, []);

    // Pre-calculate inner bedding tape marks
    const beddingMarks = useMemo(() => {
        const marks = [];
        for (let i = 0; i < 18; i++) {
            const angle = (i / 18) * Math.PI * 2;
            const r = 148;
            marks.push({
                x: 250 + r * Math.cos(angle),
                y: 250 + r * Math.sin(angle),
                rotation: (angle * 180) / Math.PI + 45, // tangential skew
            });
        }
        return marks;
    }, []);

    // Pre-calculate outer sheath tick marks
    const sheathTicks = useMemo(() => {
        const ticks = [];
        for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            ticks.push({
                x1: 250 + 200 * Math.cos(angle),
                y1: 250 + 200 * Math.sin(angle),
                x2: 250 + 214 * Math.cos(angle),
                y2: 250 + 214 * Math.sin(angle),
            });
        }
        return ticks;
    }, []);

    const renderConductorStrands = (x: number, y: number, color: string) => {
        const strands = [];
        strands.push(<circle key="center" cx={x} cy={y} r={8} fill={color} stroke="#8B6020" strokeWidth={0.8} />);
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            strands.push(
                <circle
                    key={`s${i}`}
                    cx={x + 14 * Math.cos(angle)}
                    cy={y + 14 * Math.sin(angle)}
                    r={8}
                    fill={color}
                    stroke="#8B6020"
                    strokeWidth={0.8}
                />
            );
        }
        return strands;
    };

    const renderCore = (
        label: string,
        insulationColor: string,
        angleDeg: number,
        dist: number,
        sizeScale: number = 1,
        isNeutral: boolean = false
    ) => {
        const rad = (angleDeg * Math.PI) / 180;
        const cx = 250 + dist * Math.cos(rad);
        const cy = 250 + dist * Math.sin(rad);

        return (
            <g key={label} style={{ transform: getTransform(1.1) }}>
                {/* Outer Insulation */}
                <circle cx={cx} cy={cy} r={52 * sizeScale} fill={insulationColor} opacity={0.85} />
                {/* Crosshatch texture (only on phases usually, maybe not neutral) */}
                {!isNeutral && (
                    <circle
                        cx={cx}
                        cy={cy}
                        r={52 * sizeScale}
                        fill="none"
                        stroke="#0F0F0F"
                        strokeWidth={0.5}
                        strokeDasharray="3 4"
                        opacity={0.25}
                    />
                )}
                {/* Semi-con screen */}
                <circle cx={cx} cy={cy} r={38 * sizeScale} fill="#1A1A1A" />
                {/* Copper conductor body */}
                <circle cx={cx} cy={cy} r={32 * sizeScale} fill={isSolar ? '#B0BEC5' : '#B87333'} />
                {/* Strands */}
                {renderConductorStrands(cx, cy, isSolar ? '#DEDEDE' : '#D4944A')}
                {/* Label */}
                <text
                    x={cx}
                    y={cy + 5 * sizeScale}
                    textAnchor="middle"
                    fontFamily="Space Mono"
                    fontSize={16 * sizeScale}
                    fontWeight="bold"
                    fill={isNeutral ? '#FFF' : '#0F0F0F'}
                >
                    {label}
                </text>
            </g>
        );
    };

    return (
        <div
            className="w-full h-full bg-[#E4E3DB] relative overflow-hidden p-4"
            style={{ boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.08)' }}
        >
            {/* Registration corner marks */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#0F0F0F] opacity-30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#0F0F0F] opacity-30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#0F0F0F] opacity-30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#0F0F0F] opacity-30" />

            <svg viewBox="0 0 500 500" className="w-full h-full relative z-10 transition-transform duration-100 ease-out">
                {/* LAYER 6: Outer Sheath */}
                <g style={{ transform: getTransform(0.5) }}>
                    <circle cx={250} cy={250} r={210} fill={sheathColor} />
                    {sheathTicks.map((t, i) => (
                        <line key={`t${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#FF3300" strokeWidth={2} />
                    ))}
                </g>

                {/* LAYER 5: Steel Wire Armor */}
                {hasArmor && (
                    <g style={{ transform: getTransform(0.7) }}>
                        <circle cx={250} cy={250} r={185} fill="#4A4A4A" />
                        {armorCircles.map((c, i) => (
                            <circle key={`a${i}`} cx={c.x} cy={c.y} r={7} fill="#888" stroke="#0F0F0F" strokeWidth={1.5} />
                        ))}
                    </g>
                )}

                {/* LAYER 4: Inner Bedding */}
                <g style={{ transform: getTransform(0.9) }}>
                    <circle cx={250} cy={250} r={155} fill="#C8B89A" />
                    {beddingMarks.map((m, i) => (
                        <line
                            key={`b${i}`}
                            x1={m.x - 5}
                            y1={m.y}
                            x2={m.x + 5}
                            y2={m.y}
                            stroke="#0F0F0F"
                            strokeWidth={1.5}
                            opacity={0.4}
                            transform={`rotate(${m.rotation} ${m.x} ${m.y})`}
                        />
                    ))}
                </g>

                {/* LAYER 2: Filler Material */}
                {is3C && (
                    <g style={{ transform: getTransform(1.0) }}>
                        <circle cx={250 + 72 * Math.cos(Math.PI / 4)} cy={250 + 72 * Math.sin(Math.PI / 4)} r={16} fill="#888" opacity={0.4} />
                        <circle cx={250 + 72 * Math.cos((165 * Math.PI) / 180)} cy={250 + 72 * Math.sin((165 * Math.PI) / 180)} r={16} fill="#888" opacity={0.4} />
                        <circle cx={250 + 72 * Math.cos((285 * Math.PI) / 180)} cy={250 + 72 * Math.sin((285 * Math.PI) / 180)} r={16} fill="#888" opacity={0.4} />
                    </g>
                )}

                {/* LAYER 3: CORES */}
                {is3C && [
                    renderCore('R', '#E8270A', -90, 72),
                    renderCore('Y', '#F5C518', 30, 72),
                    renderCore('B', '#0037FF', 150, 72),
                ]}

                {isMulticore && [
                    renderCore('R', '#E8270A', -90, 60, 0.7),
                    renderCore('Y', '#F5C518', -18, 60, 0.7),
                    renderCore('B', '#0037FF', 54, 60, 0.7),
                    renderCore('G', '#00AA00', 126, 60, 0.7),
                    renderCore('N', '#1A1A1A', 198, 60, 0.7, true),
                ]}

                {isSolar && [
                    renderCore('+', '#E8270A', 180, 50, 0.9),
                    renderCore('-', '#1A1A1A', 0, 50, 0.9, true),
                ]}

                {/* CENTER: Red dot */}
                <circle cx={250} cy={250} r={4} fill="#FF3300" style={{ transform: getTransform(1.2) }} />

                {/* ANNOTATIONS (Static, no parallax) */}
                <g stroke="#0F0F0F" strokeWidth={1} fill="none">
                    {/* Group 1 Outer Sheath */}
                    <polyline points="250,56 310,30 450,30" />
                    <text x={450} y={20} fontFamily="Space Mono" fontSize={9} fontWeight="bold" fill="#0F0F0F" textAnchor="end">
                        OUTER SHEATH
                    </text>
                    <text x={450} y={40} fontFamily="Space Mono" fontSize={8} fill="#0F0F0F" opacity={0.5} textAnchor="end">
                        {isMulticore ? 'BBEIGE FRLS' : isSolar ? 'UV RESISTANT' : 'FRLS-PVC TYPE ST2'}
                    </text>

                    {/* Group 2 Armor (only if armored) */}
                    {hasArmor && (
                        <>
                            <polyline points="383,120 420,90 450,90" />
                            <text x={450} y={80} fontFamily="Space Mono" fontSize={9} fontWeight="bold" fill="#0F0F0F" textAnchor="end">
                                SWA ARMORING
                            </text>
                            <text x={450} y={100} fontFamily="Space Mono" fontSize={8} fill="#0F0F0F" opacity={0.5} textAnchor="end">
                                GALV. STEEL WIRE Ø2.5mm
                            </text>
                        </>
                    )}

                    {/* Group 3 Insulation */}
                    <polyline points="250,126 310,150 450,150" />
                    <text x={450} y={140} fontFamily="Space Mono" fontSize={9} fontWeight="bold" fill="#0F0F0F" textAnchor="end">
                        {isMulticore ? 'PVC INSULATION' : isSolar ? 'XLPO INSULATION' : 'XLPE INSULATION'}
                    </text>
                    <text x={450} y={160} fontFamily="Space Mono" fontSize={8} fill="#0F0F0F" opacity={0.5} textAnchor="end">
                        {isMulticore ? '1.1kV GRADE' : isSolar ? '1.5kV DC GRADE' : '2.5kV GRADE'}
                    </text>

                    {/* Group 4 Conductor */}
                    <polyline points="250,178 310,210 450,210" />
                    <text x={450} y={200} fontFamily="Space Mono" fontSize={9} fontWeight="bold" fill="#0F0F0F" textAnchor="end">
                        CU CONDUCTOR
                    </text>
                    <text x={450} y={220} fontFamily="Space Mono" fontSize={8} fill="#FF3300" fontWeight="bold" textAnchor="end">
                        IS:8130 CLASS 2
                    </text>
                    <text x={450} y={230} fontFamily="Space Mono" fontSize={8} fill="#0F0F0F" opacity={0.5} textAnchor="end">
                        99.97% EC GRADE
                    </text>
                </g>

                {/* Bottom Dimension Line */}
                <g>
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0F0F0F" />
                        </marker>
                    </defs>
                    <line x1={38} y1={472} x2={462} y2={472} stroke="#0F0F0F" strokeWidth={1.5} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
                    <text x={250} y={466} fontFamily="Space Mono" fontSize={10} fontWeight="bold" fill="#FF3300" textAnchor="middle">
                        {isMulticore ? 'Ø 42.0 mm — OVERALL DIAMETER' : isSolar ? 'Ø 24.5 mm — OVERALL DIAMETER' : 'Ø 58.5 mm — OVERALL DIAMETER'}
                    </text>
                </g>
            </svg>
        </div>
    );
}
