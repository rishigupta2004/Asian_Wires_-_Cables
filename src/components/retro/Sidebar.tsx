import React from 'react';
import { X, Cpu, Info, Mail } from 'lucide-react';
import { HalftoneGrid, BlueprintGrid } from './BasicElements';
import { Barcode } from './Barcode';
import { SystemLoadGraph } from './SystemLoadGraph';

interface SidebarProps {
    activeView: string;
    handleNav: (id: string) => void;
    mobileMenu: boolean;
    setMobileMenu: (open: boolean) => void;
    time: string;
}

export const Sidebar = ({ activeView, handleNav, mobileMenu, setMobileMenu, time }: SidebarProps) => {
    return (
        <aside className={`fixed top-0 left-0 w-full lg:w-[320px] h-screen border-r-4 border-[#0F0F0F] bg-[#E4E3DB] z-40 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${mobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

            {/* Header Panel */}
            <div className="p-8 border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] relative overflow-hidden group flex flex-col justify-center">
                <HalftoneGrid />
                {/* Main company logo — inject the PRIMARY company logo here */}
                {/* PLACEHOLDER until logo asset is injected: */}
                <h1 className="font-grotesk text-5xl font-black leading-none tracking-tighter text-[#FF3300] relative z-10 mb-1 select-none">
                    ASIAN
                </h1>
                <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#E4E3DB] relative z-10 font-bold border-l-4 border-[#FF3300] pl-2 mt-2">
                    Wires & Cables Pvt. Ltd.
                </h2>
                {/* Sub-brand strip below */}
                <div className="flex gap-2 mt-4 relative z-10">
                    {['ASIAN', 'M1', 'TRUE MASTER'].map((b) => (
                        <div key={b} className="border border-[#E4E3DB]/20 px-2 py-0.5 font-mono text-[7px] tracking-widest text-[#E4E3DB]/40">
                            {b}
                        </div>
                    ))}
                </div>
                <button className="lg:hidden absolute top-6 right-6 bg-[#FF3300] border-4 border-[#0F0F0F] p-2 shadow-[4px_4px_0px_#E4E3DB] cursor-none" onClick={() => setMobileMenu(false)}>
                    <X className="w-5 h-5 text-[#0F0F0F]" />
                </button>
            </div>

            {/* Nav Section */}
            <nav className="flex-1 p-8 border-b-4 border-[#0F0F0F] flex flex-col gap-4 font-mono text-sm font-bold tracking-widest overflow-y-auto relative">
                <BlueprintGrid />

                <div className="text-[#0F0F0F] text-[11px] border-b-4 border-[#0F0F0F] pb-2 uppercase flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                        <div className="w-2.5 h-2.5 bg-[#FF3300] mr-2 border border-[#0F0F0F]" />
                        C:\ROOT_DIR&gt;
                    </div>
                    <Barcode className="w-10 h-3 hidden xl:block" />
                </div>

                {[
                    { id: 'HOME', label: '[DIR] OVERVIEW.EXE' },
                    { id: 'CATALOG', label: '[DIR] DATA_MATRIX.DB' },
                    { id: 'PROCUREMENT', label: '[DIR] AI_PROCURE.BAT' },
                    { id: 'SPECS', label: '[DIR] TECH_SPECS.DAT' },
                    { id: 'PLANT', label: '[DIR] PLANT_CAP.SYS' },
                    { id: 'CERTS', label: '[DIR] CERT_REGISTRY.ISO' },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`flex items-center justify-between p-5 border-4 border-[#0F0F0F] transition-all duration-100 relative z-10 cursor-none ${activeView === item.id
                            ? 'bg-[#0F0F0F] text-[#E4E3DB] shadow-[inset_6px_6px_0px_rgba(255,255,255,0.15)]'
                            : 'bg-[#E4E3DB] text-[#0F0F0F] shadow-[6px_6px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#0F0F0F]'
                            }`}
                    >
                        <span>{item.label}</span>
                        {activeView === item.id && (
                            <div className="w-3 h-3 bg-[#FF3300] border border-[#E4E3DB] animate-pulse" />
                        )}
                    </button>
                ))}
            </nav>

            {/* System Stats Footer Panel */}
            <div className="p-6 font-mono text-xs bg-[#D7D6CD] text-[#0F0F0F] font-bold relative overflow-hidden">
                <HalftoneGrid />
                <div className="relative z-10 border-2 border-[#0F0F0F] p-3 bg-[#D7D6CD]/90">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b-4 border-[#0F0F0F]">
                        <span>SYS. LOAD</span>
                        <span className="text-[#E4E3DB] bg-[#0F0F0F] px-2 py-1 border-2 border-[#0F0F0F] shadow-[3px_3px_0px_#FF3300] font-black tracking-widest">
                            ONLINE
                        </span>
                    </div>
                    <SystemLoadGraph />
                    <div className="space-y-3 pt-1">
                        <div className="flex justify-between items-center">
                            <span className="opacity-60">LME_Cu_IDX:</span>
                            <span className="text-[#E4E3DB] bg-[#FF3300] px-2 font-black border-2 border-[#0F0F0F] shadow-[2px_2px_0px_#0F0F0F]">
                                $8,450.00
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="opacity-60">SYS_TIME:</span>
                            <span className="bg-[#E4E3DB] border-2 border-[#0F0F0F] px-2 font-bold shadow-[2px_2px_0px_#0F0F0F]">
                                {time}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </aside >
    );
};
