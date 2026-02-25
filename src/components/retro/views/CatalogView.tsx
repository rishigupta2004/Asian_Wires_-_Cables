"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { TextReveal } from '../TextReveal';
import { GUIWindow } from '../GUIWindow';
import { BlueprintGrid } from '../BasicElements';
import { Barcode } from '../Barcode';
import { fullCatalog } from '../../../lib/catalogData';
import { BRANDS } from '../../../lib/constants';

export const CatalogView = ({ handleNav, mousePos, setSelectedProduct }: any) => {
    const [filter, setFilter] = useState('ALL');
    const [brandFilter, setBrandFilter] = useState('ALL BRANDS');
    const [hoveredRow, setHoveredRow] = useState<any>(null);
    const [compareList, setCompareList] = useState<any[]>([]);
    const [showConfigurator, setShowConfigurator] = useState(false);
    const [configStep, setConfigStep] = useState(1);
    const [configData, setConfigData] = useState({ voltage: '', cores: '', armor: '' });

    const toggleCompare = (e: any, item: any) => {
        e.stopPropagation();
        if (compareList.find(c => c.id === item.id)) {
            setCompareList(compareList.filter(c => c.id !== item.id));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, item]);
        }
    };

    const filteredCatalog = fullCatalog.filter(c =>
        (filter === 'ALL' || c.cat === filter) &&
        (brandFilter === 'ALL BRANDS' || c.brand === brandFilter)
    );

    const categories = ['ALL', 'RESIDENTIAL', 'INDUSTRIAL', 'GRID', 'RENEWABLE', 'AUDIO'];

    return (
        <div className="p-4 md:p-8 min-h-screen relative w-full overflow-hidden">
            <BlueprintGrid />

            {/* Section Header */}
            <div className="border-b-4 border-[#0F0F0F] pb-6 mb-12 flex flex-col md:flex-row justify-between items-end relative z-10">
                <div>
                    <TextReveal>
                        <h2 className="font-grotesk text-6xl md:text-[8vw] xl:text-8xl font-black uppercase tracking-tighter text-[#0F0F0F] leading-none mb-2">
                            Data Matrix.
                        </h2>
                    </TextReveal>
                    <div className="inline-block mt-4 bg-[#FF3300] border-4 border-[#0F0F0F] px-4 py-2 font-mono text-xs font-black tracking-widest text-[#E4E3DB] shadow-[4px_4px_0px_#0F0F0F]">
                        MASTER INVENTORY SHEET
                    </div>
                </div>

                {/* Filing Cabinet Filter Tabs */}
                <div className="flex flex-col mt-8 md:mt-0 items-end overflow-x-auto w-full md:w-auto pb-1 md:pb-0 gap-2">
                    <div className="flex gap-1 font-mono text-xs items-end">
                        {categories.map(f => (
                            <button
                                key={f} onClick={() => setFilter(f)}
                                className={`px-4 pt-3 pb-2 border-t-4 border-x-4 border-[#0F0F0F] font-bold tracking-widest transition-all whitespace-nowrap cursor-none ${filter === f
                                    ? 'bg-[#0F0F0F] text-[#E4E3DB] h-12'
                                    : 'bg-[#E4E3DB] text-[#0F0F0F] h-10 hover:bg-[#D7D6CD] border-b-4'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    {/* Brand filter row — below the category tabs */}
                    <div className="flex gap-2 font-mono text-[10px] font-bold tracking-widest">
                        <span className="opacity-40 mr-2 self-center">BRAND ▸</span>
                        {['ALL BRANDS', 'ASIAN', 'M1', 'TRUE_MASTER'].map((b) => (
                            <button
                                key={b}
                                onClick={() => setBrandFilter(b)}
                                className={`border-2 border-[#0F0F0F] px-3 py-1 transition-colors cursor-none ${brandFilter === b
                                    ? 'bg-[#FF3300] text-[#E4E3DB] shadow-none translate-x-0.5 translate-y-0.5'
                                    : 'bg-[#E4E3DB] hover:bg-[#D7D6CD] shadow-[2px_2px_0px_#0F0F0F]'
                                    }`}
                            >
                                {b.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Preview Window (follows mouse) */}
            <div
                className="pointer-events-none absolute z-50 w-72 md:w-80 transition-all duration-100 hidden md:block"
                style={{ left: mousePos.x + 20, top: mousePos.y + 20, opacity: hoveredRow ? 1 : 0, transform: hoveredRow ? 'scale(1)' : 'scale(0.9)' }}
            >
                <GUIWindow title="STUDIO_PREVIEW.EXE">
                    <div className="bg-[#E4E3DB] p-4 border-x-4 border-b-4 border-[#0F0F0F]">
                        {/* Header: ID in red + barcode */}
                        <div className="font-mono text-xs font-bold border-b-4 border-[#0F0F0F] pb-2 mb-3 flex justify-between items-end">
                            <span className="text-[#FF3300] text-xl font-black leading-none">{hoveredRow?.id}</span>
                            <Barcode className="w-16 h-4" />
                        </div>

                        {/* Camera preview */}
                        <div className="w-full h-48 border-4 border-[#0F0F0F] relative overflow-hidden bg-[#0F0F0F]">
                            {/* Red tint blend overlay */}
                            <div className="absolute inset-0 bg-[#FF3300]/20 mix-blend-color-burn z-10" />
                            {hoveredRow?.image && (
                                <img src={hoveredRow.image} alt="" className="w-full h-full object-cover opacity-90 mix-blend-luminosity grayscale contrast-125" />
                            )}
                            {/* Animated scanline sweep */}
                            <div className="absolute left-0 w-full h-1 bg-[#FF3300] opacity-60 animate-[scanline_2.5s_linear_infinite] z-20 shadow-[0_0_8px_#FF3300]" />
                            {/* CAM badge */}
                            <div className="absolute bottom-1 right-1 font-mono text-[8px] bg-[#0F0F0F] text-[#E4E3DB] px-1 z-20 opacity-80 border border-[#E4E3DB]/20">
                                CAM_01_ACTIVE
                            </div>
                        </div>

                        {/* Data footer */}
                        <div className="font-mono text-[10px] text-[#0F0F0F] grid grid-cols-2 gap-2 border-t-2 border-[#0F0F0F] pt-2 mt-2">
                            <div><span className="opacity-50 block">VOLTAGE</span><span className="font-bold">{hoveredRow?.volt}</span></div>
                            <div><span className="opacity-50 block">MATERIAL</span><span className="font-bold">{hoveredRow?.core}</span></div>
                        </div>
                    </div>
                </GUIWindow>
            </div>

            {/* Export Controls Bar */}
            <div className="flex gap-3 font-mono text-[10px] font-bold tracking-widest mb-6 items-center flex-wrap relative z-10">
                <span className="opacity-40 mr-2">EXPORT ▸</span>
                {['PDF DATASHEET', 'CSV EXPORT', 'PRINT SPEC'].map(action => (
                    <button key={action}
                        className="border-2 border-[#0F0F0F] px-4 py-2 bg-[#E4E3DB] hover:bg-[#0F0F0F] hover:text-[#E4E3DB] transition-colors shadow-[4px_4px_0px_#0F0F0F] active:shadow-none active:translate-x-1 active:translate-y-1 cursor-none"
                    >
                        {action}
                    </button>
                ))}

                <button
                    onClick={() => setShowConfigurator(true)}
                    className="ml-auto bg-[#FF3300] text-[#E4E3DB] border-4 border-[#0F0F0F] px-4 py-2 hover:bg-[#0F0F0F] transition-colors shadow-[4px_4px_0px_#0F0F0F] active:shadow-none active:translate-x-1 active:translate-y-1 cursor-none flex items-center gap-2"
                >
                    <div className="w-2 h-2 bg-[#E4E3DB] animate-pulse" />
                    BUILD YOUR SPEC
                </button>
            </div>

            {/* Spreadsheet Table (Lotus 1-2-3 / Blue Screen style) */}
            <div className="w-full overflow-x-auto border-4 border-[#0F0F0F] bg-[#0000AA] shadow-[16px_16px_0px_#0F0F0F] relative z-10">
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FF3300] z-20" />
                <table className="w-full text-left font-mono text-sm min-w-[900px] border-collapse relative z-10 pb-1.5">
                    <thead className="bg-[#E4E3DB] text-[#0F0F0F] text-xs tracking-widest border-b-4 border-[#0F0F0F]">
                        <tr>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F]">REF_ID</th>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F]">BRAND</th>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F] w-1/3">NOMENCLATURE</th>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F]">CORE_MTL</th>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F]">SQ_AREA</th>
                            <th className="p-4 font-black border-r-4 border-[#0F0F0F]">OP_VOLT</th>
                            <th className="p-4 font-black">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#E4E3DB]">
                        {filteredCatalog.map(item => (
                            <tr
                                key={item.id}
                                onMouseEnter={() => setHoveredRow(item)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onClick={() => { setSelectedProduct(item); handleNav('PRODUCT'); }}
                                className={`hover:bg-[#E4E3DB] hover:text-[#0F0F0F] transition-colors cursor-none group border-b-2 border-[#E4E3DB]/15 ${compareList.find(c => c.id === item.id) ? 'border-l-4 border-l-[#FF3300] bg-[#0000AA]' : ''}`}
                            >
                                <td className="p-4 font-black group-hover:text-[#FF3300] border-r-2 border-[#E4E3DB]/15 transition-colors">
                                    {item.id}
                                </td>
                                <td className="p-4 border-r-2 border-[#E4E3DB]/15">
                                    <span className={`font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 border border-[#E4E3DB]/20 ${(BRANDS as any)[item.brand]?.badge}`}>
                                        {item.brand.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-4 font-grotesk font-black text-2xl tracking-tight uppercase group-hover:pl-8 transition-all border-r-2 border-[#E4E3DB]/15">
                                    {item.type}
                                </td>
                                <td className="p-4 font-bold border-r-2 border-[#E4E3DB]/15">{item.core}</td>
                                <td className="p-4 font-bold border-r-2 border-[#E4E3DB]/15">{item.area}</td>
                                <td className="p-4 font-bold font-black border-r-2 border-[#E4E3DB]/15">{item.volt}</td>
                                <td className="p-4 font-bold flex items-center justify-between">
                                    <span className="group-hover:text-[#FF3300] transition-colors flex items-center">
                                        VIEW <ArrowUpRight className="inline w-4 h-4 ml-1" />
                                    </span>
                                    <button
                                        onClick={(e) => toggleCompare(e, item)}
                                        className={`font-black opacity-40 hover:opacity-100 transition-opacity ${compareList.find(c => c.id === item.id) ? 'text-[#FF3300] opacity-100' : 'group-hover:text-[#FF3300]'}`}
                                    >
                                        [+]
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cable Comparison Tool */}
            {compareList.length > 0 && (
                <div className="mt-12 relative z-20">
                    <GUIWindow title={`COMPARE_TOOL.EXE — ${compareList.length}/3 CABLES SELECTED`} defaultMinimized={false}>
                        <div className="bg-[#0000AA] flex flex-col md:flex-row border-x-4 border-b-4 border-[#0F0F0F] pt-2">

                            {/* Compare Columns */}
                            {[0, 1, 2].map((slotIndex) => {
                                const item = compareList[slotIndex];
                                return (
                                    <div key={slotIndex} className="flex-1 border-b-4 md:border-b-0 md:border-r-4 border-[#0F0F0F] last:border-0 p-5 md:p-8 min-h-[300px] relative flex flex-col items-start bg-[#0000AA]">
                                        {item ? (
                                            <>
                                                <div className="font-grotesk font-black text-4xl text-[#FF3300] mb-2">{item.id}</div>
                                                <div className="font-mono text-xs font-bold text-[#E4E3DB] mb-6 uppercase tracking-widest leading-tight">{item.type}</div>

                                                <div className="flex-1 w-full space-y-4 font-mono text-[9px] text-[#E4E3DB]/70 tracking-widest w-full border-t-2 border-[#E4E3DB]/20 pt-4">
                                                    <div><span className="opacity-50 block mb-1">VOLTAGE</span><span className="text-[#E4E3DB] font-bold text-xs">{item.volt}</span></div>
                                                    <div><span className="opacity-50 block mb-1">CROSS SECTION</span><span className="text-[#E4E3DB] font-bold text-xs">{item.area}</span></div>
                                                    <div><span className="opacity-50 block mb-1">CORE MATERIAL</span><span className="text-[#E4E3DB] font-bold text-xs">{item.core}</span></div>
                                                    <div><span className="opacity-50 block mb-1">CURRENT RATING</span><span className="text-[#E4E3DB] font-bold text-xs">{item.rating}</span></div>
                                                    <div><span className="opacity-50 block mb-1">ARMOR</span><span className="text-[#E4E3DB] font-bold text-xs">{item.specs.armor}</span></div>
                                                </div>

                                                <button
                                                    onClick={() => toggleCompare({ stopPropagation: () => { } } as any, item)}
                                                    className="mt-6 border-2 border-[#E4E3DB]/20 px-4 py-2 font-mono text-[10px] font-bold text-[#FF3300] hover:bg-[#FF3300] hover:text-[#0F0F0F] transition-colors cursor-none"
                                                >
                                                    REMOVE
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex-1 flex w-full items-center justify-center font-mono text-[11px] text-[#E4E3DB]/30 font-bold tracking-[0.2em] text-center uppercase border-2 border-dashed border-[#E4E3DB]/20 p-8 m-2">
                                                + SELECT CABLE<br /><br />TO COMPARE
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </GUIWindow>
                </div>
            )}

            {/* Cable Configurator Drawer */}
            {showConfigurator && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none">
                    <div className="absolute inset-0 bg-[#0F0F0F]/80 backdrop-blur-sm pointer-events-auto" onClick={() => setShowConfigurator(false)} />
                    <div className="w-full bg-[#E4E3DB] border-t-8 border-[#0F0F0F] p-6 md:p-10 pointer-events-auto relative shadow-[0_-10px_30px_rgba(0,0,0,0.5)] animate-[slideUpDrawer_0.4s_ease-out]">

                        <button onClick={() => setShowConfigurator(false)} className="absolute top-4 right-6 font-grotesk font-black text-2xl hover:text-[#FF3300] cursor-none">
                            [ X ]
                        </button>

                        <div className="max-w-4xl mx-auto">
                            <div className="font-mono text-[10px] text-[#FF3300] tracking-widest font-bold mb-2">CUSTOM SPEC WIZARD</div>
                            <h2 className="font-grotesk font-black text-4xl mb-8 uppercase text-[#0F0F0F]">Build Your Cable</h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    <div className="font-mono text-xs font-bold mb-4 border-b-2 border-[#0F0F0F] pb-2">1. VOLTAGE GRADE</div>
                                    <div className="flex flex-col gap-2">
                                        {['LT 1.1kV', 'HT 11kV', 'HT 33kV', 'SOLAR 1.5kV DC'].map(v => (
                                            <button
                                                key={v}
                                                onClick={() => { setConfigData({ ...configData, voltage: v }); setConfigStep(2); }}
                                                className={`text-left p-3 font-mono text-xs font-bold border-4 border-[#0F0F0F] cursor-none ${configData.voltage === v ? 'bg-[#FF3300] text-[#E4E3DB]' : 'bg-[#E4E3DB] hover:bg-[#0000AA] hover:text-[#E4E3DB]'}`}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className={`flex-1 ${configStep < 2 ? 'opacity-30 pointer-events-none' : ''} transition-opacity`}>
                                    <div className="font-mono text-xs font-bold mb-4 border-b-2 border-[#0F0F0F] pb-2">2. CORE CONFIGURATION</div>
                                    <div className="flex flex-col gap-2">
                                        {['1 Core', '3 Core', '3.5 Core', '4 Core'].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => { setConfigData({ ...configData, cores: c }); setConfigStep(3); }}
                                                className={`text-left p-3 font-mono text-xs font-bold border-4 border-[#0F0F0F] cursor-none ${configData.cores === c ? 'bg-[#FF3300] text-[#E4E3DB]' : 'bg-[#E4E3DB] hover:bg-[#0000AA] hover:text-[#E4E3DB]'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className={`flex-1 ${configStep < 3 ? 'opacity-30 pointer-events-none' : ''} transition-opacity`}>
                                    <div className="font-mono text-xs font-bold mb-4 border-b-2 border-[#0F0F0F] pb-2">3. PROTECTION / ARMOR</div>
                                    <div className="flex flex-col gap-2">
                                        {['Unarmored', 'Galvanized Steel Wire', 'Aluminum Wire (Single Core)', 'Double Steel Tape'].map(a => (
                                            <button
                                                key={a}
                                                onClick={() => { setConfigData({ ...configData, armor: a }); setConfigStep(4); }}
                                                className={`text-left p-3 font-mono text-xs font-bold border-4 border-[#0F0F0F] cursor-none ${configData.armor === a ? 'bg-[#FF3300] text-[#E4E3DB]' : 'bg-[#E4E3DB] hover:bg-[#0000AA] hover:text-[#E4E3DB]'}`}
                                            >
                                                {a}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {configStep === 4 && (
                                <div className="mt-8 p-6 border-4 border-[#10B981] bg-[#10B981]/10 flex justify-between items-center animate-[fadeIn_0.5s_ease-out]">
                                    <div>
                                        <div className="font-mono text-[10px] text-[#10B981] font-bold mb-1">CONFIGURATION COMPLETE</div>
                                        <div className="font-grotesk font-black text-2xl text-[#0F0F0F]">
                                            {configData.cores} • {configData.voltage} • {configData.armor}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setShowConfigurator(false); handleNav('PRODUCT'); }}
                                        className="bg-[#10B981] text-[#0F0F0F] px-6 py-3 font-mono font-bold border-4 border-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-none flex items-center gap-2"
                                    >
                                        MATCH PRODUCTS <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
