"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Building2, Sun, Factory, Train, Flame, ArrowUpRight, Radio, Cpu, Music, Satellite } from 'lucide-react';
import { TextReveal } from '../TextReveal';
import { CableAnatomySVG, WireCoilHero3D } from '../';
import { GUIWindow } from '../GUIWindow';
import { HalftoneGrid, BlueprintGrid, RegistrationMarks } from '../BasicElements';
import { DraggableSticker } from '../DraggableSticker';
import { motion } from 'framer-motion';
import { BRANDS } from '../../../lib/constants';

interface HomeViewProps {
    handleNav: (id: string) => void;
    toggleGlitch: (v: boolean) => void;
    mousePos: { x: number; y: number };
}

export const HomeView = ({ handleNav, toggleGlitch, mousePos }: HomeViewProps) => {
    const [winDim, setWinDim] = useState({ w: 1000, h: 800 });
    const [cableVariant, setCableVariant] = useState<'3C_XLPE_11kV' | 'FRLS_MULTICORE' | 'SOLAR_DC_1500V'>('3C_XLPE_11kV');
    const [showAnatomy, setShowAnatomy] = useState(false);

    useEffect(() => {
        setWinDim({ w: window.innerWidth, h: window.innerHeight });
        const handleResize = () => setWinDim({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col w-full h-full relative">
            {/* NEW: LIVE MARKET TICKER */}
            <div className="border-b-4 border-[#0F0F0F] bg-[#E4E3DB] px-8 py-2 overflow-hidden flex-shrink-0 w-full hidden md:block">
                <div className="flex items-center gap-8 font-mono text-[10px] font-bold">
                    <span className="text-[#0F0F0F]/40 shrink-0 border-r-4 border-[#0F0F0F] pr-4">LIVE_MARKET ▸</span>
                    <div className="flex gap-10 animate-[marquee_40s_linear_infinite] min-w-max items-center">
                        {[
                            { label: 'LME COPPER CASH', value: '$8,452.50/MT', change: '▲ +0.32%', up: true },
                            { label: 'LME ALUMINIUM', value: '$2,245.00/MT', change: '▼ -0.18%', up: false },
                            { label: 'USD/INR', value: '83.42', change: '▲ +0.05%', up: true },
                            { label: 'BRENT CRUDE', value: '$82.15/BBL', change: '▲ +0.44%', up: true },
                            { label: 'PVC RESIN INDEX', value: 'STABLE', change: '— 0.00%', up: null },
                            { label: 'HDPE COMPOUND', value: '₹142.50/KG', change: '▼ -0.22%', up: false },
                        ].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span className="text-[#0F0F0F]/50">{item.label}:</span>
                                <span className="font-black">{item.value}</span>
                                <span className={item.up === true ? 'text-[#10B981]' : item.up === false ? 'text-[#EF4444]' : 'text-[#0F0F0F]/40'}>
                                    {item.change}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* NEW: APPLICATION SECTORS GRID */}
            <div className="w-full bg-[#E4E3DB] border-b-4 border-[#0F0F0F] p-4 md:p-8 flex-shrink-0 relative z-20 hidden md:block">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        {
                            id: 'INS-01',
                            sector: 'INDUSTRY',
                            detail: 'Heavy Manufacturing & Process Plants',
                            icon: Factory,
                            usage: 'Power distribution, motor feeds, control panels',
                        },
                        {
                            id: 'INS-02',
                            sector: 'PUBLIC ADDRESS SYSTEM',
                            detail: 'Broadcast & PA Infrastructure',
                            icon: Radio,
                            usage: 'Speaker wiring, amplifier feeds, low-impedance runs',
                        },
                        {
                            id: 'INS-03',
                            sector: 'TECH INDUSTRY',
                            detail: 'Data Centres & Technology Facilities',
                            icon: Cpu,
                            usage: 'Server room power, UPS feeds, structured cabling',
                        },
                        {
                            id: 'INS-04',
                            sector: 'MUSIC INDUSTRY',
                            detail: 'Studios, Venues & Live Production',
                            icon: Music,
                            usage: 'Stage power, rack feeds, shielded audio runs',
                        },
                        {
                            id: 'INS-05',
                            sector: 'SATELLITE COMMUNICATION',
                            detail: 'Ground Station & Telecom Infrastructure',
                            icon: Satellite,
                            usage: 'Antenna feeds, transmission lines, RF-shielded runs',
                        }
                    ].map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.id}
                                className="border-4 border-[#0F0F0F] p-6 bg-[#E4E3DB] shadow-[4px_4px_0px_#0F0F0F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group cursor-pointer relative"
                            >
                                {/* ID badge top-right */}
                                <div className="absolute top-3 right-3 font-mono text-[8px] text-[#0F0F0F]/30">{s.id}</div>
                                {/* Icon */}
                                <Icon className="w-7 h-7 text-[#FF3300] mb-4 group-hover:scale-110 transition-transform" />
                                {/* Sector name */}
                                <div className="font-mono text-[10px] font-black tracking-widest text-[#0F0F0F] mb-2 uppercase leading-tight">
                                    {s.sector}
                                </div>
                                {/* Detail */}
                                <div className="font-mono text-[8px] text-[#0F0F0F]/50 mb-3">{s.detail}</div>
                                {/* Red separator */}
                                <div className="h-px w-6 bg-[#FF3300] mb-2" />
                                {/* Usage note */}
                                <div className="font-mono text-[8px] text-[#0F0F0F]/40 italic">{s.usage}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Hero Section */}
            <div className="min-h-[85vh] bg-[#E4E3DB] border-b-4 border-[#0F0F0F] relative overflow-hidden flex flex-col md:flex-row w-full">
                <BlueprintGrid />
                <HalftoneGrid />

                <div className="absolute top-10 right-10 z-30 hidden lg:block">
                    <DraggableSticker />
                </div>

                {/* Left column (55%) */}
                <div className="md:w-[55%] border-r-0 md:border-r-4 border-[#0F0F0F] p-8 lg:p-24 flex flex-col justify-center relative z-10 w-full min-h-[50vh] overflow-visible">
                    {/* Status badge */}
                    <div className="inline-flex items-center border-4 border-[#0F0F0F] px-4 py-2 font-mono text-[10px] mb-8 md:mb-12 w-fit bg-[#E4E3DB] text-[#0F0F0F] uppercase tracking-widest shadow-[4px_4px_0px_#0F0F0F]">
                        <div className="w-2 h-2 bg-[#FF3300] animate-pulse mr-3 border border-[#0F0F0F]" />
                        SYSTEM_ONLINE // HEAVY DUTY
                    </div>

                    {/* Main typographic display */}
                    <div className="flex flex-col mb-12 relative w-fit">
                        <TextReveal delay={100}>
                            <motion.span
                                className="font-serif italic font-normal lowercase tracking-wide block relative z-20 left-4"
                                style={{ fontSize: 'clamp(50px, 12vw, 160px)', color: '#0F0F0F', lineHeight: '0.8' }}
                                whileHover={{ skewX: -10, scale: 1.05, filter: 'blur(2px)' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                absolute
                            </motion.span>
                        </TextReveal>

                        <div style={{ marginLeft: '-0.02em' }}>
                            <TextReveal delay={200}>
                                <motion.span
                                    className="font-grotesk font-black uppercase block relative z-10 mt-2 md:mt-4 cursor-none"
                                    style={{
                                        fontSize: 'clamp(44px, 9.5vw, 118px)',
                                        color: '#E4E3DB',
                                        WebkitTextStroke: '4px #0F0F0F',
                                        textShadow: '8px 8px 0px #FF3300',
                                        letterSpacing: '-0.04em',
                                        lineHeight: '0.9',
                                        whiteSpace: 'nowrap'
                                    }}
                                    whileHover={{ x: 20, textShadow: '20px 20px 0px #FF3300' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    CONDUCTIVITY.
                                </motion.span>
                            </TextReveal>
                        </div>

                        {/* Chaotic Brutalist Stamp */}
                        <motion.div
                            className="absolute -right-[10%] -top-[10%] z-30 pointer-events-none mix-blend-difference hidden md:flex items-center justify-center w-32 h-32 md:w-48 md:h-48"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full text-[#E4E3DB] opacity-80">
                                <path id="curve" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="transparent" />
                                <text width="500" className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] saturate-200">
                                    <textPath href="#curve" startOffset="0%">
                                        ISO 9001:2015 /// HEAVY DUTY /// ZERO HALOGEN ///
                                    </textPath>
                                </text>
                                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Body text box */}
                    <TextReveal delay={400}>
                        <div className="border-4 border-[#0F0F0F] p-5 bg-[#0F0F0F] max-w-xl shadow-[8px_8px_0px_#0F0F0F] mb-10 md:mb-14 relative overflow-hidden mt-4 md:mt-8">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF3300] border-l-4 border-b-4 border-[#0F0F0F]" />
                            <p className="font-mono text-xs md:text-sm leading-relaxed text-[#E4E3DB] font-bold">
                                Engineering the nervous system of modern infrastructure.
                                From deeply buried high-tension grids to critical photovoltaic
                                installations. We output pure power.
                            </p>
                        </div>
                    </TextReveal>

                    {/* CTA button */}
                    <TextReveal delay={600}>
                        <button
                            onClick={() => handleNav('CATALOG')}
                            className="relative flex items-center justify-between w-fit gap-4 px-6 md:px-10 py-4 border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] font-mono text-[10px] md:text-xs font-black tracking-widest shadow-[8px_8px_0px_#FF3300] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all group hover:bg-[#2A2A2A] cursor-none"
                        >
                            ACCESS_MATRIX.EXE
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
                            <div className="absolute right-0 top-0 h-full w-2 bg-[#FF3300] border-l-4 border-[#0F0F0F]" />
                        </button>
                    </TextReveal>
                </div>

                {/* Right column (45%) */}
                <div className="md:w-[45%] bg-[#D7D6CD] p-4 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden w-full min-h-[50vh] border-t-4 md:border-t-0 border-[#0F0F0F]">
                    <HalftoneGrid />
                    {showAnatomy ? (
                        <GUIWindow title="CABLE_ANATOMY.EXE" className="w-[90%] max-w-[500px] relative z-10" defaultMinimized={false}>
                            <div className="bg-[#E4E3DB] p-2 md:p-4 border-x-4 border-b-4 border-[#0F0F0F] flex flex-col items-center relative shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)] w-full">
                                <RegistrationMarks />

                                {/* Tabs */}
                                <div className="flex w-full gap-2 mb-4 relative z-20">
                                    {[
                                        { label: '3C XLPE 11kV', val: '3C_XLPE_11kV' },
                                        { label: 'FRLS MULTICORE', val: 'FRLS_MULTICORE' },
                                        { label: 'SOLAR DC 1.5kV', val: 'SOLAR_DC_1500V' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.val}
                                            onClick={() => setCableVariant(tab.val as any)}
                                            className={`flex-1 py-1 font-mono text-[8px] md:text-[9px] font-bold border-4 border-[#0F0F0F] transition-colors cursor-none ${cableVariant === tab.val ? 'bg-[#FF3300] text-[#E4E3DB]' : 'bg-[#E4E3DB] text-[#0F0F0F] hover:bg-[#D7D6CD]'
                                                }`}
                                        >
                                            [{tab.label}]
                                        </button>
                                    ))}
                                </div>

                                <div className="w-full aspect-square relative border-4 border-[#0F0F0F] overflow-hidden bg-[#E4E3DB]">
                                    <CableAnatomySVG mousePos={mousePos} variant={cableVariant} />
                                </div>

                                {/* Data strip */}
                                <div className="w-full border-t-4 border-[#0F0F0F] bg-[#0F0F0F] px-4 py-3 flex justify-between font-mono text-[9px] md:text-[10px] font-bold text-[#E4E3DB] mt-4 relative z-20">
                                    <span>CORES: {cableVariant === '3C_XLPE_11kV' ? '3C × 240mm²' : cableVariant === 'FRLS_MULTICORE' ? '5C × 16mm²' : '1C × 6mm²'}</span>
                                    <span>RATING: {cableVariant === '3C_XLPE_11kV' ? '11kV' : cableVariant === 'FRLS_MULTICORE' ? '1.1kV' : '1.5kV DC'}</span>
                                    <span>STD: {cableVariant === '3C_XLPE_11kV' ? 'IS:7098 PT-II' : cableVariant === 'FRLS_MULTICORE' ? 'IS:1554' : 'TUV 2PfG'}</span>
                                </div>

                                <button
                                    onClick={() => setShowAnatomy(false)}
                                    className="w-full mt-2 py-2 border-4 border-[#0F0F0F] bg-[#E4E3DB] hover:bg-[#FF3300] hover:text-[#E4E3DB] text-[#0F0F0F] font-mono font-bold text-[10px] uppercase transition-colors cursor-none"
                                >
                                    [ RETURN TO COIL.EXE ]
                                </button>
                            </div>
                        </GUIWindow>
                    ) : (
                        <GUIWindow title="KINETIC_COIL.EXE" className="w-[90%] max-w-[500px] relative z-10" defaultMinimized={false}>
                            <div className="bg-[#E4E3DB] p-2 md:p-4 border-x-4 border-b-4 border-[#0F0F0F] w-full h-full shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]">
                                <div className="w-full aspect-square">
                                    <WireCoilHero3D onAnatomyClick={() => setShowAnatomy(true)} />
                                </div>
                            </div>
                        </GUIWindow>
                    )}
                </div>
            </div>

            {/* NEW: PRODUCT CATEGORY QUICK-ACCESS CARDS */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-4 border-[#0F0F0F] relative z-20">
                {[
                    { title: 'LT CABLES', sub1: 'Upto 1.1kV', sub2: '120+ variants', num: '01' },
                    { title: 'HT CABLES', sub1: '11kV – 33kV', sub2: '45+ variants', num: '02' },
                    { title: 'SOLAR PV', sub1: 'DC 1500V', sub2: '18+ variants', num: '03' },
                    { title: 'SPECIALTY', sub1: 'FRLS / Fire', sub2: '35+ variants', num: '04' },
                ].map((cat, i) => (
                    <div key={i} className={`group ${i % 2 === 0 ? 'bg-[#E4E3DB]' : 'bg-[#D7D6CD]'} border-r-0 lg:border-r-4 border-b-4 lg:border-b-0 border-[#0F0F0F] last:border-r-0 px-8 py-10 hover:bg-[#0F0F0F] hover:text-[#E4E3DB] transition-colors relative cursor-none flex flex-col justify-between h-48`}>
                        <div className="absolute top-4 right-4 font-grotesk font-black text-6xl opacity-[0.04] group-hover:opacity-10 transition-opacity pointer-events-none">
                            {cat.num}
                        </div>
                        <div>
                            <div className="font-mono text-xl font-black tracking-widest mb-1">{cat.title}</div>
                            <div className="font-mono text-[10px] opacity-60 mb-1">{cat.sub1}</div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="font-grotesk font-black text-3xl">{cat.sub2.split(' ')[0]}</div>
                            <div className="font-mono text-[8px] opacity-60 mb-1 leading-tight uppercase max-w-[50px]">{cat.sub2.split(' ')[1]}</div>
                            <ArrowUpRight className="w-6 h-6 text-[#FF3300] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
            </div>

            {/* NEW: MANUFACTURING PROCESS TICKER STRIP */}
            <div className="border-b-4 border-[#0F0F0F] bg-[#0F0F0F] py-5 overflow-hidden flex flex-col gap-2 relative z-20 w-full">
                {/* Strip 1 */}
                <div className="font-mono text-[10px] text-[#E4E3DB] tracking-widest flex w-[200%] -ml-[10%]">
                    <div className="animate-[marquee_30s_linear_infinite] flex min-w-max gap-4 items-center whitespace-nowrap">
                        <span className="text-[#FF3300]">—</span>
                        <span>01 ROD DRAWING</span> <span className="text-[#FF3300]">—</span>
                        <span>02 WIRE BUNCHING</span> <span className="text-[#FF3300]">—</span>
                        <span>03 STRANDING</span> <span className="text-[#FF3300]">—</span>
                        <span>04 INSULATION EXTRUSION</span> <span className="text-[#FF3300]">—</span>
                        <span>05 CABLING</span> <span className="text-[#FF3300]">—</span>
                        <span>06 ARMORING</span> <span className="text-[#FF3300]">—</span>
                        <span>07 SHEATHING</span> <span className="text-[#FF3300]">—</span>
                        <span>08 SPARK TESTING</span> <span className="text-[#FF3300]">—</span>
                        <span>09 QC INSPECTION</span> <span className="text-[#FF3300]">—</span>
                        <span>10 DRUM DISPATCH</span> <span className="text-[#FF3300]">—</span>
                        <span>01 ROD DRAWING</span> <span className="text-[#FF3300]">—</span>
                        <span>02 WIRE BUNCHING</span>
                    </div>
                </div>

                {/* Strip 2 */}
                <div className="font-mono text-[9px] text-[#E4E3DB]/40 tracking-widest flex w-[200%] -ml-[10%]">
                    <div className="animate-[marquee_40s_linear_infinite_reverse] flex min-w-max gap-8 items-center whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
                        <span>IS:694</span> <span>—</span>
                        <span>IS:1554</span> <span>—</span>
                        <span>IS:7098</span> <span>—</span>
                        <span>IS:8130</span> <span>—</span>
                        <span>IEC 60502</span> <span>—</span>
                        <span>IEC 60227</span> <span>—</span>
                        <span>BS:5467</span> <span>—</span>
                        <span>ISO 9001:2015</span> <span>—</span>
                        <span>BIS CERTIFIED</span> <span>—</span>
                        <span>CPRI TESTED</span> <span>—</span>
                        <span>RoHS</span> <span>—</span>
                        <span>REACH</span> <span>—</span>
                        <span>IS:694</span> <span>—</span>
                        <span>IS:1554</span>
                    </div>
                </div>
            </div>

            {/* BRAND QUALITY COMPARISON SECTION */}
            <div className="w-full bg-[#0F0F0F] border-b-4 border-[#0F0F0F] px-8 lg:px-20 py-16">
                <div className="mb-12">
                    <h2 className="font-grotesk font-black text-[7vw] leading-none text-[#E4E3DB] tracking-tighter">
                        THREE TIERS.
                    </h2>
                    <h2 className="font-grotesk font-black text-[7vw] leading-none text-[#E4E3DB] tracking-tighter opacity-50">
                        ONE STANDARD.
                    </h2>
                    <div className="font-mono text-[9px] tracking-[0.4em] text-[#E4E3DB]/40 mt-6">
                        OUR BRAND ARCHITECTURE
                    </div>
                </div>

                <div className="flex flex-col">
                    {(Object.values(BRANDS) as any[]).map((brand, i) => (
                        <div
                            key={brand.id}
                            className="border-b-4 border-[#E4E3DB]/10 last:border-b-0 flex flex-col lg:flex-row items-start lg:items-center py-10 gap-8 group hover:bg-[#E4E3DB]/5 transition-colors px-4 -mx-4"
                        >
                            {/* Tier number */}
                            <div className="font-grotesk font-black text-[80px] leading-none text-[#E4E3DB]/10 w-24 shrink-0 select-none">
                                {String(brand.tier).padStart(2, '0')}
                            </div>

                            {/* Brand logo zone */}
                            <div className="w-48 shrink-0 border-4 border-[#E4E3DB]/15 p-4 flex items-center justify-center h-20 bg-[#E4E3DB]/5 group-hover:border-[#FF3300]/30 transition-colors">
                                <span className="font-grotesk font-black text-2xl text-[#E4E3DB]">{brand.id.replace('_', ' ')}</span>
                            </div>

                            {/* Brand info */}
                            <div className="flex-1">
                                <div className="font-mono text-[10px] tracking-widest text-[#FF3300] mb-1">{brand.tagline}</div>
                                <p className="font-mono text-xs text-[#E4E3DB]/60 leading-relaxed max-w-xl">{brand.description}</p>
                            </div>

                            {/* Shielding visual */}
                            <div className="shrink-0 w-48 hidden lg:block">
                                <div className="font-mono text-[8px] tracking-widest text-[#E4E3DB]/40 mb-2 uppercase">SHIELDING LEVEL</div>
                                <div className="flex items-end gap-1 h-10 mb-2">
                                    {[1, 2, 3].map((bar) => (
                                        <div
                                            key={bar}
                                            className="flex-1 transition-all duration-300"
                                            style={{
                                                height: `${bar * 33}%`,
                                                background: bar <= (4 - brand.tier) ? '#FF3300' : '#E4E3DB15',
                                                border: '2px solid',
                                                borderColor: bar <= (4 - brand.tier) ? '#FF3300' : '#E4E3DB20',
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="font-mono text-[9px] text-[#E4E3DB]/50">{brand.shieldingLevel}</div>
                            </div>

                            {/* Typical use */}
                            <div className="shrink-0 w-56 hidden xl:block">
                                <div className="font-mono text-[8px] tracking-widest text-[#E4E3DB]/40 mb-2 uppercase">TYPICAL APPLICATIONS</div>
                                <div className="font-mono text-[9px] text-[#E4E3DB]/50 leading-relaxed">{brand.typicalUse}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee Strips with cursor-reactive skew */}
            <div
                className="flex flex-col w-full origin-left transition-transform duration-300 ease-out relative z-40"
                style={{ transform: `skewX(${(mousePos.x - winDim.w / 2) * -0.005}deg)` }}
            >
                {/* Bar 1 — red, large grotesque */}
                <div className="border-b-4 border-t-4 border-[#0F0F0F] bg-[#FF3300] text-[#0F0F0F] py-2 overflow-hidden font-grotesk font-black text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap flex w-[120%] -ml-[10%] shadow-[0_8px_0_0_#0F0F0F]">
                    <div className="animate-[marquee_20s_linear_infinite] flex gap-8 md:gap-12 min-w-max">
                        <span>/// ARCHITECTURAL GRADE CABLES</span>
                        <span>/// ISO 9001:2015 CERTIFIED</span>
                        <span>/// 100% PURE EC GRADE COPPER</span>
                        <span>/// ZERO HALOGEN TECHNOLOGY</span>
                        <span>/// ARCHITECTURAL GRADE CABLES</span>
                        <span>/// ISO 9001:2015 CERTIFIED</span>
                    </div>
                </div>

                {/* Bar 2 — black, small mono, reverse */}
                <div className="bg-[#0F0F0F] text-[#E4E3DB] py-2 overflow-hidden font-mono font-bold text-[10px] md:text-xs uppercase whitespace-nowrap flex border-b-4 border-[#0F0F0F] w-[120%] -ml-[10%]">
                    <div className="animate-pulse flex gap-8 md:gap-12 min-w-max w-full overflow-hidden truncate">
                        {/* Note: Standard CSS animations aren't easily reversed in Tailwind out-of-the-box without custom config, using simple slide for now or custom keyframe in globals */}
                        <div className="animate-[marquee_25s_linear_infinite_reverse] flex gap-12 min-w-max w-full" style={{ animationDirection: 'reverse' }}>
                            <span>*** MANUFACTURED IN INDIA *** OVER 120K MT ANNUAL CAPACITY *** DESTRUCTIVE TESTING PASSED *** ZERO DEFECT POLICY *** MULTIPLE QUALITY CHECKS *** CONTINUOUS EXTRUSION *** MANUFACTURED IN INDIA *** OVER 120K MT ANNUAL CAPACITY *** DESTRUCTIVE TESTING PASSED ***</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
