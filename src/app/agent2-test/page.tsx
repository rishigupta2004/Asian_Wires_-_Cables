"use client";

import React, { useState, useEffect } from 'react';
import CableAnatomySVG from '../../components/retro/CableAnatomySVG';
import CableDrumSVG from '../../components/retro/CableDrumSVG';
import ProcessFlowSVG from '../../components/retro/ProcessFlowSVG';
import WireCoilHero3D from '../../components/retro/WireCoilHero3D';
import ConductorStrandSVG from '../../components/retro/ConductorStrandSVG';

export default function Agent2TestPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // rough normalize from center of screen roughly to -50 to 50
            setMousePos({
                x: (e.clientX - window.innerWidth / 2) * 0.05,
                y: (e.clientY - window.innerHeight / 2) * 0.05
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#E4E3DB] p-8 text-[#0F0F0F] font-mono">
            <h1 className="text-3xl font-bold mb-8 uppercase">Agent 2 Components Testing Room</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">

                {/* 1. Anatomy SVG */}
                <div className="border border-[#0F0F0F] p-4 bg-white/50">
                    <h2 className="text-xl font-bold mb-4">1. CableAnatomySVG.tsx</h2>
                    <div className="w-full aspect-square max-w-[500px] mx-auto">
                        <CableAnatomySVG mousePos={mousePos} variant="3C_XLPE_11kV" />
                    </div>
                </div>

                {/* 2. Drum SVG */}
                <div className="border border-[#0F0F0F] p-4 bg-white/50">
                    <h2 className="text-xl font-bold mb-4">2. CableDrumSVG.tsx</h2>
                    <div className="w-full max-w-[500px] mx-auto">
                        <CableDrumSVG />
                    </div>
                </div>

                {/* 3. Process Flow SVG */}
                <div className="border border-[#0F0F0F] p-4 bg-white/50col-span-1 md:col-span-2">
                    <h2 className="text-xl font-bold mb-4">3. ProcessFlowSVG.tsx</h2>
                    <div className="w-full max-w-[900px] mx-auto bg-[#0F0F0F] p-4">
                        <ProcessFlowSVG activeNode="N4" />
                    </div>
                </div>

                {/* 4. Wire Coil 3D Canvas */}
                <div className="border border-[#0F0F0F] p-4 bg-white/50">
                    <h2 className="text-xl font-bold mb-4">4. WireCoilHero3D.tsx</h2>
                    <div className="w-full max-w-[600px] mx-auto">
                        <WireCoilHero3D />
                    </div>
                </div>

                {/* 5. Conductor Strand SVG */}
                <div className="border border-[#0F0F0F] p-4 bg-white/50 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">5. ConductorStrandSVG.tsx</h2>
                    <div className="w-32 h-40">
                        <ConductorStrandSVG />
                    </div>
                </div>

            </div>
        </div>
    );
}
