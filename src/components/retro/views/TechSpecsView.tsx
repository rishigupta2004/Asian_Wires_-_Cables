import React, { useState, useEffect } from 'react';
import { GUIWindow } from '../GUIWindow';
import { HalftoneGrid } from '../BasicElements';
import ProcessFlowSVG from '../ProcessFlowSVG';

interface TechSpecsViewProps {
    handleNav: (id: string) => void;
}

const CONDUCTOR_PROPS = [
    { property: 'Resistivity @ 20°C', initValue: 1.7241, unit: 'μΩ·cm', status: 'NOMINAL', state: 'green' },
    { property: 'Tensile Strength', initValue: 220, unit: 'N/mm²', status: 'NOMINAL', state: 'green' },
    { property: 'Elongation @ Break', initValue: 33, unit: '%', status: 'NOMINAL', state: 'green' },
    { property: 'Purity Grade', initValue: 99.97, unit: '% Cu', status: 'CERTIFIED', state: 'green' },
    { property: 'Conductivity', initValue: 101, unit: '%IACS', status: 'ABOVE_SPEC', state: 'green' },
    { property: 'Diameter Tolerance', initValue: 0.01, unit: 'mm', status: 'IN_SPEC', state: 'green' },
    { property: 'Temp. Coefficient', initValue: 0.00393, unit: '/°C', status: 'NOMINAL', state: 'green' },
];

const VOLTAGE_GRADES = [
    { id: 'LT_1.1kV', label: 'LT 1.1kV', insulation: 'PVC Type-A ST1 (0.8mm min)', bend: '12', temp: '160°C', is: 'IS:1554 Pt-1', iec: 'IEC 60227', env: [true, true, true, false] },
    { id: 'HT_11kV', label: 'HT 11kV', insulation: 'XLPE Unscreened (3.6mm min)', bend: '15', temp: '250°C', is: 'IS:7098 Pt-2', iec: 'IEC 60502-2', env: [true, true, true, false] },
    { id: 'EHT_33kV', label: 'EHT 33kV', insulation: 'XLPE Screened (8.0mm min)', bend: '20', temp: '250°C', is: 'IS:7098 Pt-2', iec: 'IEC 60502-2', env: [true, false, true, false] },
    { id: '66kV', label: '66kV', insulation: 'XLPE Corrugated Al Sheath', bend: '25', temp: '250°C', is: 'IS:7098 Pt-3', iec: 'IEC 60840', env: [true, false, true, false] },
    { id: 'SOLAR_1.5kV', label: 'SOLAR 1.5kV DC', insulation: 'Electron Beam XLPO', bend: '8', temp: '200°C', is: 'TUV 2PfG 1169', iec: 'EN 50618', env: [false, true, true, true] },
];

export const TechSpecsView = ({ handleNav }: TechSpecsViewProps) => {
    const [liveData, setLiveData] = useState(CONDUCTOR_PROPS.map(p => p.initValue));
    const [updatingIndex, setUpdatingIndex] = useState(-1);
    const [activeGrade, setActiveGrade] = useState(VOLTAGE_GRADES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const idxToUpdate = Math.floor(Math.random() * CONDUCTOR_PROPS.length);
            setUpdatingIndex(idxToUpdate);
            setLiveData(prev => {
                const next = [...prev];
                // slight jitter +/- 0.01
                const jitter = (Math.random() - 0.5) * 0.02;
                next[idxToUpdate] = +(next[idxToUpdate] + jitter).toFixed(5);
                return next;
            });
            setTimeout(() => setUpdatingIndex(-1), 400); // clear flash class
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 md:p-8 min-h-screen relative w-full overflow-hidden bg-[#0F0F0F] text-[#E4E3DB]">
            <HalftoneGrid />

            <div className="mb-8 relative z-10 border-b-4 border-[#E4E3DB]/20 pb-4">
                <h2 className="font-grotesk text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#E4E3DB]">
                    TECH_SPECS.DAT
                </h2>
                <div className="font-mono text-[10px] tracking-widest opacity-60 mt-1">
                    REAL-TIME ENGINEERING PARAMETERS AND STANDARDS
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10 mb-6">

                {/* Left 40%: Conductor Properties Live Table */}
                <div className="xl:col-span-5 relative w-full h-full min-h-[400px]">
                    <GUIWindow title="CONDUCTOR_DB.EXE" className="w-full h-full" defaultMinimized={false}>
                        <div className="bg-[#0F0F0F] relative w-full h-full overflow-hidden border-x-4 border-b-4 border-[#0F0F0F]">
                            <table className="w-full text-left font-mono text-[10px] md:text-xs">
                                <thead className="bg-[#E4E3DB] text-[#0F0F0F] border-b-4 border-[#0F0F0F]">
                                    <tr>
                                        <th className="p-3 font-bold border-r-2 border-[#0F0F0F]/20">PROPERTY</th>
                                        <th className="p-3 font-bold border-r-2 border-[#0F0F0F]/20">VALUE</th>
                                        <th className="p-3 font-bold border-r-2 border-[#0F0F0F]/20">UNIT</th>
                                        <th className="p-3 font-bold">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-[#0000AA] text-[#E4E3DB]">
                                    {CONDUCTOR_PROPS.map((prop, i) => (
                                        <tr key={i} className="border-b-2 border-[#E4E3DB]/20 last:border-b-0">
                                            <td className="p-3 border-r-2 border-[#E4E3DB]/20">{prop.property}</td>
                                            <td className={`p-3 border-r-2 border-[#E4E3DB]/20 font-black ${updatingIndex === i ? 'data-updating text-[#FF3300]' : ''}`}>
                                                {liveData[i]}
                                            </td>
                                            <td className="p-3 border-r-2 border-[#E4E3DB]/20 text-[#E4E3DB]/70">{prop.unit}</td>
                                            <td className="p-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                                                {prop.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GUIWindow>
                </div>

                {/* Right 60%: Voltage Grade Selector */}
                <div className="xl:col-span-7 relative w-full min-h-[400px]">
                    <GUIWindow title="VOLTAGE_MATRIX.EXE" className="w-full h-full" defaultMinimized={false}>
                        <div className="bg-[#D7D6CD] p-4 md:p-6 border-x-4 border-b-4 border-[#0F0F0F] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)] w-full h-full flex flex-col">

                            <div className="flex flex-wrap gap-2 mb-6">
                                {VOLTAGE_GRADES.map(grade => (
                                    <button
                                        key={grade.id}
                                        onClick={() => setActiveGrade(grade)}
                                        className={`px-3 py-2 font-mono text-[9px] md:text-[10px] font-bold border-4 border-[#0F0F0F] transition-colors cursor-none ${activeGrade.id === grade.id ? 'bg-[#FF3300] text-[#E4E3DB]' : 'bg-[#E4E3DB] text-[#0F0F0F] hover:bg-[#0000AA] hover:text-[#E4E3DB]'}`}
                                    >
                                        [ {grade.label} ]
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 bg-[#E4E3DB] border-4 border-[#0F0F0F] p-5 shadow-[4px_4px_0px_#0F0F0F] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 border-l-4 border-b-4 border-[#0F0F0F] bg-[#FF3300] text-[#0F0F0F] font-grotesk font-black text-2xl">
                                    {activeGrade.label}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-[10px] text-[#0F0F0F] max-w-lg mt-4">
                                    <div className="border-b-2 border-[#0F0F0F]/10 pb-2">
                                        <div className="opacity-50 mb-1">Insulation Material</div>
                                        <div className="font-bold text-sm">{activeGrade.insulation}</div>
                                    </div>
                                    <div className="border-b-2 border-[#0F0F0F]/10 pb-2">
                                        <div className="opacity-50 mb-1">Min. Bending Radius</div>
                                        <div className="font-bold text-sm">{activeGrade.bend}× OD</div>
                                    </div>
                                    <div className="border-b-2 border-[#0F0F0F]/10 pb-2">
                                        <div className="opacity-50 mb-1">Short Circuit Temp</div>
                                        <div className="font-bold text-sm">{activeGrade.temp} max</div>
                                    </div>
                                    <div className="border-b-2 border-[#0F0F0F]/10 pb-2">
                                        <div className="opacity-50 mb-1">Applicable Standards</div>
                                        <div className="font-bold text-sm text-[#FF3300]">{activeGrade.is} / {activeGrade.iec}</div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="font-mono text-[9px] font-black uppercase tracking-widest opacity-50 mb-3 border-b-2 border-[#0F0F0F] pb-1 inline-block">
                                        Permissible Installation
                                    </div>
                                    <div className="flex flex-wrap gap-4 font-mono text-[10px] font-bold">
                                        {['Underground Direct', 'Cable Tray', 'Duct / Trench', 'Aerial / Open'].map((env, i) => (
                                            <div key={env} className="flex items-center gap-2">
                                                <div className={`w-3 h-3 border-2 border-[#0F0F0F] flex items-center justify-center ${activeGrade.env[i] ? 'bg-[#10B981]' : 'bg-[#E4E3DB]'}`}>
                                                    {activeGrade.env[i] && <span className="text-[#0F0F0F] text-[8px]">✓</span>}
                                                </div>
                                                <span className={activeGrade.env[i] ? 'text-[#0F0F0F]' : 'text-[#0F0F0F]/40'}>{env}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </GUIWindow>
                </div>
            </div>

            {/* Bottom Full-Width: Manufacturing Process Flow SVG Schematic */}
            <div className="w-full relative z-10 border-4 border-[#E4E3DB]/20 bg-[#E4E3DB]/5 p-6 mb-8 overflow-x-auto min-h-[300px]">
                <div className="font-mono text-[9px] font-bold text-[#E4E3DB] opacity-50 tracking-widest absolute top-4 left-6 border-b border-[#E4E3DB]/20 pb-1">
                    PROCESS_FLOW_SCHEMATIC.SVG
                </div>

                <div className="w-[900px] h-[320px] mt-10 relative">
                    <ProcessFlowSVG activeNode="N4" />
                </div>
            </div>

        </div>
    );
};
