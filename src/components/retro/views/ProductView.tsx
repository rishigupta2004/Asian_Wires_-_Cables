"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { GUIWindow } from '../GUIWindow';
import { Barcode } from '../Barcode';
import { HalftoneGrid, BlueprintGrid } from '../BasicElements';
import { CableDrumSVG } from '../';
import { BRANDS } from '../../../lib/constants';

export const ProductView = ({ handleNav, product }: any) => {
    const [activeTab, setActiveTab] = useState('SPECS');

    // Fallback if accessed directly without selection
    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen text-[#0F0F0F] font-mono p-8">
                <div className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-8 shadow-[8px_8px_0px_#FF3300]">
                    <h2 className="text-2xl font-black mb-4">ERR_NO_DATA</h2>
                    <button onClick={() => handleNav('CATALOG')} className="bg-[#0F0F0F] text-[#E4E3DB] px-6 py-2 border-2 border-[#0F0F0F] hover:bg-[#FF3300] cursor-none">
                        RETURN_DIR
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col w-full relative">
            <BlueprintGrid />

            {/* Sticky Top Bar */}
            <div className="sticky top-0 z-20 border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] flex justify-between items-center px-4 py-3 font-mono text-xs font-bold tracking-widest shadow-[0_6px_0px_#FF3300]">
                <button
                    onClick={() => handleNav('CATALOG')}
                    className="flex items-center bg-[#E4E3DB] text-[#0F0F0F] border-2 border-[#0F0F0F] px-4 py-2 hover:bg-[#FF3300] hover:text-[#E4E3DB] transition-colors active:shadow-[inset_2px_2px_0px_rgba(0,0,0,0.5)] cursor-none"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> ← RETURN_DIR
                </button>
                <div className="flex items-center gap-4">
                    <Barcode className="w-16 h-4 hidden sm:block bg-[#E4E3DB] p-[1px]" />
                    <span>SPEC_SHEET // {product.id}</span>
                </div>
            </div>

            {/* Split Layout */}
            <div className="flex flex-col lg:flex-row flex-1 w-full relative z-10">

                {/* Left 45% - GUI Windows */}
                <div className="lg:w-[45%] bg-[#D7D6CD] border-r-0 lg:border-r-4 border-[#0F0F0F] p-4 md:p-8 flex flex-col gap-6 relative overflow-hidden">
                    <HalftoneGrid />

                    <GUIWindow title="STUDIO_RENDER_V1.EXE" className="w-full relative z-10" defaultMinimized={false}>
                        <div className="w-full aspect-video md:aspect-[4/3] border-t-4 border-[#0F0F0F] relative overflow-hidden bg-[#0F0F0F] group">
                            <div className="absolute inset-0 bg-[#FF3300]/20 mix-blend-color-burn z-10 pointer-events-none" />
                            <img src={product.image} alt={product.type} className="w-full h-full object-cover opacity-90 mix-blend-luminosity grayscale contrast-125 transition-transform duration-[2s] group-hover:scale-105" />
                            <div className="absolute left-0 w-full h-1 bg-[#FF3300] opacity-60 animate-[scanline_2.5s_linear_infinite] z-20 shadow-[0_0_8px_#FF3300] pointer-events-none" />
                            <div className="absolute bottom-2 right-2 font-mono text-[10px] bg-[#0F0F0F] text-[#E4E3DB] px-2 py-0.5 z-20 opacity-90 border border-[#E4E3DB]/20">
                                CAM_01_ACTIVE
                            </div>
                        </div>
                    </GUIWindow>

                    <GUIWindow title="DRUM_SPECIFICATION.EXE" className="w-full relative z-10" defaultMinimized={true}>
                        <div className="w-full bg-[#E4E3DB] border-t-4 border-[#0F0F0F] p-4 flex items-center justify-center overflow-hidden shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]">
                            <CableDrumSVG cableId={product.id} drumLength="1000m" drumDiameter="1050mm" barrelWidth="2100mm" />
                        </div>
                    </GUIWindow>

                    <GUIWindow title="ORTHOGRAPHIC_CAD.EXE" className="w-full relative z-10" defaultMinimized={true}>
                        <div className="w-full aspect-video bg-[#E4E3DB] border-t-4 border-[#0F0F0F] p-4 flex items-center justify-center overflow-hidden">
                            <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                                {/* Abstract CAD cross-section */}
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#0F0F0F" strokeWidth="2" strokeDasharray="4 4" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#FF3300" strokeWidth="4" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="#0F0F0F" strokeWidth="1" />
                                <circle cx="100" cy="100" r="30" fill="none" stroke="#0F0F0F" strokeWidth="1" />
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <circle key={i} cx={100 + 40 * Math.cos(i * Math.PI / 3)} cy={100 + 40 * Math.sin(i * Math.PI / 3)} r="8" fill="#0F0F0F" />
                                ))}
                                <line x1="20" y1="100" x2="180" y2="100" stroke="#0F0F0F" strokeWidth="1" opacity="0.3" />
                                <line x1="100" y1="20" x2="100" y2="180" stroke="#0F0F0F" strokeWidth="1" opacity="0.3" />
                            </svg>
                        </div>
                    </GUIWindow>

                    <GUIWindow title="QC_PROTOCOL.EXE" className="w-full relative z-10" defaultMinimized={true}>
                        <div className="bg-[#0000AA] font-mono text-[9px] text-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F] relative overflow-hidden shadow-[inset_4px_4px_0px_rgba(0,0,0,0.2)] pb-6">
                            <div className="mb-4 text-[#E4E3DB]/60">INITIATING QUALITY_PROTOCOL for {product.id}...</div>

                            {[
                                { name: 'CONDUCTOR RESISTANCE', val: '0.075 Ω/km' },
                                { name: 'HIGH VOLTAGE AC TEST', val: '3.5kV × 5 min' },
                                { name: 'INSULATION RESISTANCE', val: '>100 MΩ·km' },
                                { name: 'PARTIAL DISCHARGE', val: '<5 pC @ 13.2kV' },
                                { name: 'IMPULSE VOLTAGE', val: '95kV BIL' },
                                { name: 'FLAME PROPAGATION', val: 'IEC 60332-3' },
                                { name: 'SMOKE DENSITY', val: 'Dm <30%' },
                                { name: 'DIMENSIONAL CHECK', val: 'Ø58.5mm ✓' },
                            ].map((test, i) => (
                                <div key={i} className="flex justify-between items-center mb-1 w-full gap-2">
                                    <div className="w-[120px] truncate">[{String(i + 1).padStart(2, '0')}] {test.name}</div>
                                    <div className="flex-1 flex gap-2 items-center">
                                        <div className="h-[6px] w-full bg-[#E4E3DB]/20">
                                            <div className="h-full bg-[#E4E3DB]" style={{ animation: `barFill 0.8s forwards`, animationDelay: `${i * 150}ms`, width: '0%' }} />
                                        </div>
                                    </div>
                                    <div className="w-6 text-center text-[#10B981] opacity-0" style={{ animation: `fadeIn 0.1s forwards`, animationDelay: `${(i * 150) + 800}ms` }}>PASS</div>
                                    <div className="w-20 text-right text-[#E4E3DB]/70 truncate">{test.val}</div>
                                </div>
                            ))}
                            <div className="mt-4 pt-4 border-t-2 border-dashed border-[#E4E3DB]/30 text-[#10B981] font-bold opacity-0" style={{ animation: `fadeIn 0.5s forwards`, animationDelay: `2000ms` }}>
                                ALL TESTS PASSED.<br />
                                CERTIFICATE NO: QC-2024-{product.id}-0891
                            </div>
                        </div>
                    </GUIWindow>
                </div>

                {/* Right 55% - Details */}
                <div className="lg:w-[55%] p-6 md:p-12 relative">
                    <BlueprintGrid />
                    <div className="relative z-10 flex flex-col h-full max-w-2xl">

                        {/* Header Block */}
                        <div className="mb-8 border-b-4 border-[#0F0F0F] pb-6">
                            <div className="inline-block bg-[#0F0F0F] text-[#E4E3DB] px-3 py-1 font-mono text-[10px] font-bold mb-4 border-2 border-[#0F0F0F] shadow-[3px_3px_0px_#FF3300]">
                                {product.cat}
                            </div>
                            <h1 className="font-grotesk font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-2 text-[#0F0F0F]">
                                {product.type}
                            </h1>
                            <p className="font-mono text-xl font-bold text-[#FF3300]">
                                {product.id}
                            </p>
                        </div>

                        {/* NEW: Brand tier block */}
                        {product.brand && (BRANDS as any)[product.brand] && (
                            <div className="flex items-start gap-4 mb-8 p-5 border-4 border-[#0F0F0F] bg-[#D7D6CD] shadow-[6px_6px_0px_#0F0F0F] relative z-20">
                                {/* Logo zone */}
                                <div className="border-4 border-[#0F0F0F] p-3 bg-[#E4E3DB] flex items-center justify-center w-32 h-16 shrink-0 relative overflow-hidden group">
                                    <span className="font-grotesk font-black text-lg text-[#0F0F0F] relative z-10">{product.brand.replace('_', ' ')}</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="font-mono text-[9px] tracking-widest text-[#FF3300] mb-1 font-bold uppercase">
                                        {(BRANDS as any)[product.brand].tagline}
                                    </div>
                                    <div className="font-mono text-[10px] text-[#0F0F0F]/60 leading-relaxed max-w-sm uppercase">
                                        {(BRANDS as any)[product.brand].shieldingLevel} — {(BRANDS as any)[product.brand].conductorGrade}
                                    </div>
                                </div>
                            </div>
                        )}

                        <p className="font-mono text-sm leading-relaxed font-bold mb-10 p-4 border-l-4 border-[#FF3300] bg-[#0F0F0F]/5">
                            {product.desc}
                        </p>

                        {/* Spec Matrix */}
                        <div className="mb-10 w-full font-mono">
                            <div className="flex gap-2 mb-4">
                                <button onClick={() => setActiveTab('SPECS')} className={`px-4 py-1 text-xs font-bold border-2 border-[#0F0F0F] cursor-none ${activeTab === 'SPECS' ? 'bg-[#0F0F0F] text-[#E4E3DB]' : 'bg-[#E4E3DB] hover:bg-[#D7D6CD]'}`}>TECH_SPECS</button>
                                <button onClick={() => setActiveTab('ELEC')} className={`px-4 py-1 text-xs font-bold border-2 border-[#0F0F0F] cursor-none ${activeTab === 'ELEC' ? 'bg-[#0F0F0F] text-[#E4E3DB]' : 'bg-[#E4E3DB] hover:bg-[#D7D6CD]'}`}>ELECTRICAL</button>
                            </div>

                            <div className="border-4 border-[#0F0F0F] bg-[#E4E3DB] shadow-[6px_6px_0px_#0F0F0F]">
                                {activeTab === 'SPECS' && (
                                    <div className="divide-y-2 divide-[#0F0F0F]">
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">CORE_MATERIAL</span>
                                            <span className="text-sm font-black">{product.core}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">INSULATION_TYPE</span>
                                            <span className="text-sm font-black">{product.specs.insulation}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">ARMORING</span>
                                            <span className="text-sm font-black">{product.specs.armor}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">OPERATING_TEMP</span>
                                            <span className="text-sm font-black">{product.specs.temp}</span>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'ELEC' && (
                                    <div className="divide-y-2 divide-[#0F0F0F]">
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">SQUARE_AREA</span>
                                            <span className="text-sm font-black">{product.area}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">RATED_CURRENT</span>
                                            <span className="text-sm font-black">{product.rating}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:items-center p-3 hover:bg-[#0F0F0F]/5">
                                            <span className="w-1/3 text-[10px] opacity-60 font-bold">OPERATING_VOLTAGE</span>
                                            <span className="text-sm font-black text-[#FF3300]">{product.volt}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] p-5 mb-6 shadow-[6px_6px_0px_rgba(0,0,0,0.15)] relative">
                            <div className="font-mono text-[10px] font-black tracking-widest text-[#FF3300] mb-4 pb-2 border-b-2 border-[#E4E3DB]/10 uppercase flex items-center justify-between">
                                <span>Installation Parameters</span>
                                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-mono text-[10px] text-[#E4E3DB]/70">
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Min. bending radius: <span className="text-[#E4E3DB] font-bold">12× OD</span></span></div>
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Max pulling tension: <span className="text-[#E4E3DB] font-bold">as per IS:1255</span></span></div>
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Trench depth HT: <span className="text-[#E4E3DB] font-bold">1050mm min</span></span></div>
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Ambient range: <span className="text-[#E4E3DB] font-bold">-15°C to +50°C</span></span></div>
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Max. laying temp: <span className="text-[#E4E3DB] font-bold">0°C min</span></span></div>
                                <div className="flex gap-2"><span className="text-[#FF3300] shrink-0">▸</span><span>Drum length std: <span className="text-[#E4E3DB] font-bold">500m / 1000m</span></span></div>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => handleNav('PROCUREMENT')}
                                className="flex-1 border-4 border-[#0F0F0F] bg-[#FF3300] text-[#0F0F0F] font-mono font-black text-xs tracking-widest p-4 flex items-center justify-center gap-2 shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-none"
                            >
                                ADD_TO_BOM <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                className="sm:w-32 border-4 border-[#0F0F0F] bg-[#E4E3DB] text-[#0F0F0F] font-mono font-black text-xs tracking-widest p-4 flex items-center justify-center gap-2 shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-none"
                            >
                                <Download className="w-4 h-4" /> PDF
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
