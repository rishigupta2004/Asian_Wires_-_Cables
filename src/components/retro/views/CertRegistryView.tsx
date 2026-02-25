import React from 'react';
import { GUIWindow } from '../GUIWindow';
import { HalftoneGrid } from '../BasicElements';

interface CertRegistryViewProps {
    handleNav: (id: string) => void;
}

const CERTS = [
    { body: 'BIS', std: 'IS:694', desc: 'PVC Insulated Cables for Working Voltages up to and including 1100V', valid: 85 },
    { body: 'BIS', std: 'IS:1554 Pt.1', desc: 'PVC Insulated (Heavy Duty) Electric Cables for up to 1100V', valid: 90 },
    { body: 'BIS', std: 'IS:1554 Pt.2', desc: 'PVC Insulated (Heavy Duty) Electric Cables for 3.3kV to 11kV', valid: 75 },
    { body: 'BIS', std: 'IS:7098 Pt.1', desc: 'Crosslinked Polyethylene Insulated PVC Sheathed Cables For Working Voltage Upto And Including 1100 V', valid: 95 },
    { body: 'BIS', std: 'IS:7098 Pt.2', desc: 'Crosslinked Polyethylene Insulated PVC Sheathed Cables for Working Voltages from 3.3kV up to 33kV', valid: 88 },
    { body: 'BIS', std: 'IS:8130', desc: 'Conductors for Insulated Electrical Cables and Flexible Cords', valid: 100 },
    { body: 'IEC', std: 'IEC 60502', desc: 'Power cables with extruded insulation and their accessories for rated voltages from 1kV to 30kV', valid: 80 },
    { body: 'IEC', std: 'IEC 60227', desc: 'Polyvinyl chloride insulated cables of rated voltages up to and including 450/750V', valid: 70 },
    { body: 'BSI', std: 'BS:5467', desc: 'Electric cables. Thermosetting insulated, armoured cables for voltages of 600/1000V and 1900/3300V', valid: 65 },
    { body: 'ISO', std: '9001:2015', desc: 'Quality Management Systems - Requirements', valid: 92 },
    { body: 'BIS', std: 'LICENSE', desc: 'Bureau of Indian Standards Manufacturing License - CM/L-XXXXXXX', valid: 80 },
    { body: 'CPRI', std: 'TESTED', desc: 'Central Power Research Institute Type Test Certified Products', valid: 100 },
];

const REPORTS = [
    { id: 'TR-2024-0891', type: 'XLPE 33kV 3C', test: 'HV AC 87kV/5min', result: 'PASS' },
    { id: 'TR-2024-0890', type: 'FRLS 1.1kV', test: 'Flame Spread', result: 'PASS' },
    { id: 'TR-2024-0889', type: 'Solar DC 1.5kV', test: 'UV Aging 1000h', result: 'PASS' },
    { id: 'TR-2024-0888', type: 'Submersible', test: 'Water Tightness', result: 'PASS' },
    { id: 'TR-2024-0887', type: 'HT 11kV 3C', test: 'Impulse 75kV BIL', result: 'PASS' },
    { id: 'TR-2024-0886', type: 'Control 4C', test: 'Capacitance Mut.', result: 'PASS' },
    { id: 'TR-2024-0885', type: 'Al Armored 4C', test: 'Armor Resistance', result: 'PASS' },
    { id: 'TR-2024-0884', type: 'PVC 1C 16sqmm', test: 'Spark Test @6kV', result: 'PASS' },
    { id: 'TR-2024-0883', type: 'Cu Flexible 3C', test: 'Flexing Cycle', result: 'PASS' },
    { id: 'TR-2024-0882', type: 'XLPO Core', test: 'Shrinkage @130°C', result: 'PASS' },
    { id: 'TR-2024-0881', type: 'Bare Cu Wire', test: 'Tensile Strength', result: 'FAIL' },
    { id: 'TR-2024-0880', type: 'LSZH Jacket', test: 'Smoke Density Dm', result: 'PASS' },
];

export const CertRegistryView = ({ handleNav }: CertRegistryViewProps) => {
    return (
        <div className="p-4 md:p-8 min-h-screen relative w-full overflow-hidden bg-[#E4E3DB] text-[#0F0F0F]">
            <HalftoneGrid />

            <div className="mb-8 relative z-10 border-b-4 border-[#0F0F0F] pb-4">
                <h2 className="font-grotesk text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#0F0F0F]">
                    CERT_REGISTRY.ISO
                </h2>
                <div className="font-mono text-[10px] tracking-widest opacity-60 mt-1">
                    STANDARDS COMPLIANCE AND TYPE TESTING PROTOCOLS
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 relative z-10 block xl:flex xl:flex-row flex-col">

                {/* Left: Certification Badge Grid */}
                <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-fit">
                    {CERTS.map((cert, i) => (
                        <div key={i} className="border-4 border-[#0F0F0F] p-5 bg-[#E4E3DB] shadow-[6px_6px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#0F0F0F] transition-all cursor-none flex flex-col h-full">
                            <div className="font-grotesk font-black text-5xl leading-none mb-2 text-[#0F0F0F]">
                                {cert.body}
                            </div>
                            <div className="font-mono text-[10px] font-bold tracking-widest text-[#FF3300] mb-1">
                                {cert.std}
                            </div>
                            <div className="flex-1 font-mono text-[9px] text-[#0F0F0F]/60 leading-relaxed mb-4">
                                {cert.desc}
                            </div>
                            <div className="mt-auto pt-4 border-t-2 border-[#0F0F0F]/10">
                                <div className="w-full h-1 bg-[#0F0F0F]/10 mb-2 relative">
                                    <div className="absolute top-0 left-0 h-full bg-[#10B981]" style={{ width: `${cert.valid}%` }} />
                                </div>
                                <div className="font-mono text-[8px] text-[#0F0F0F]/40 font-bold">
                                    VALID UNTIL DEC 2026
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Test Report Database Terminal */}
                <div className="xl:col-span-5 h-[600px] xl:h-[auto] min-h-[500px] mt-8 xl:mt-0 flex-1 relative w-full overflow-hidden">
                    <GUIWindow title="TEST_REPORT_DB.EXE" className="w-full h-full absolute inset-0 pointer-events-auto" defaultMinimized={false}>
                        <div className="bg-[#0000AA] p-4 font-mono text-xs w-full h-full overflow-y-auto overflow-x-auto shadow-[inset_4px_4px_0px_rgba(0,0,0,0.2)] border-x-4 border-b-4 border-[#0F0F0F]">

                            <table className="w-full text-left min-w-[500px]">
                                <thead className="bg-[#E4E3DB] text-[#0000AA] sticky top-0 border-b-4 border-[#0F0F0F] z-10">
                                    <tr>
                                        <th className="px-3 md:px-4 py-3 border-r-4 border-[#0F0F0F] whitespace-nowrap">TEST_ID</th>
                                        <th className="px-3 md:px-4 py-3 border-r-4 border-[#0F0F0F] whitespace-nowrap">CABLE_TYPE</th>
                                        <th className="px-3 md:px-4 py-3 border-r-4 border-[#0F0F0F] whitespace-nowrap">TEST_APPLIED</th>
                                        <th className="px-3 md:px-4 py-3 whitespace-nowrap">RESULT</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#E4E3DB]">
                                    {REPORTS.map((r, i) => (
                                        <tr key={i} className="border-b-2 border-[#E4E3DB]/20 hover:bg-[#E4E3DB] hover:text-[#0000AA] group cursor-none">
                                            <td className="px-3 md:px-4 py-3 border-r-2 border-[#E4E3DB]/20 font-bold">{r.id}</td>
                                            <td className="px-3 md:px-4 py-3 border-r-2 border-[#E4E3DB]/20">{r.type}</td>
                                            <td className="px-3 md:px-4 py-3 border-r-2 border-[#E4E3DB]/20 text-[#E4E3DB]/70 group-hover:text-[#0000AA]/70">{r.test}</td>
                                            <td className={`px-3 md:px-4 py-3 font-black tracking-widest ${r.result === 'PASS' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                                                {r.result}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </GUIWindow>
                </div>

            </div>
        </div>
    );
};
