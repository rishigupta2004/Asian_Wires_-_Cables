import React, { useState, useEffect, useRef } from 'react';
import { GUIWindow } from '../GUIWindow';
import { HalftoneGrid } from '../BasicElements';

interface PlantCapViewProps {
    handleNav: (id: string) => void;
}

const MACHINE_CELLS = [
    { id: 'LINE-A1', process: 'ROD BREAKDOWN', load: 92, status: 'RUNNING', temp: '42°C' },
    { id: 'LINE-A2', process: 'WIRE DRAWING', load: 78, status: 'RUNNING', temp: '38°C' },
    { id: 'LINE-B1', process: 'STRANDING', load: 85, status: 'RUNNING', temp: '35°C' },
    { id: 'LINE-B2', process: 'XLPE EXTRUSION', load: 97, status: 'HIGH LOAD', temp: '68°C' },
    { id: 'LINE-C1', process: 'ARMORING', load: 64, status: 'RUNNING', temp: '29°C' },
    { id: 'LINE-C2', process: 'SHEATHING', load: 81, status: 'RUNNING', temp: '45°C' },
    { id: 'LINE-D1', process: 'SPARK TESTING', load: 100, status: 'ACTIVE', temp: '22°C' },
    { id: 'LINE-D2', process: 'DRUM WINDING', load: 45, status: 'STANDBY', temp: '24°C' },
];

const INITIAL_LOGS = [
    `> [09:14:22] LINE-A1  ROD_BREAKDOWN    BATCH_ID: RD-20240224-001   ████████ 100%  COMPLETE`,
    `> [09:18:47] LINE-B2  XLPE_EXTRUSION   COIL_ID:  XL-1100V-240mm²   ██████░░  78%  IN_PROGRESS`,
    `> [09:22:11] LINE-D1  SPARK_TEST       CABLE_ID: AW-240-BATCH-047  PASS — 3.5kV AC APPLIED`,
    `> [09:25:33] DISPATCH DRUM_DISPATCH    ORDER_ID: ORD-7821           LOADED — 18MT TO MUMBAI`,
    `> [09:28:01] QC_DEPT  DIMENSIONAL_CHK  SAMPLE:   AW-412-LOT-B      Ø4.2mm — WITHIN SPEC ✓`,
];

const RANDOM_LOGS = [
    `> {time} LINE-C1  ARMORING         COIL_ID:  AW-110V-16mm²     ████████ 100%  COMPLETE`,
    `> {time} LINE-A2  WIRE_DRAWING     BATCH_ID: WD-20240224-012   ████░░░░  52%  IN_PROGRESS`,
    `> {time} QC_DEPT  RESISTANCE_CHK   SAMPLE:  AW-305-LOT-A       0.075Ω/km — WITHIN SPEC ✓`,
    `> {time} LINE-B1  STRANDING        FAULT_DET: TENSION_SLIP     STOPPED — MAINTENANCE_REQ`,
    `> {time} DISPATCH LOGISTICS        ORDER_ID: ORD-7844           WAITING_FOR_TRUCK`,
];

export const PlantCapView = ({ handleNav }: PlantCapViewProps) => {
    const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;

            const randomLogTemplate = RANDOM_LOGS[Math.floor(Math.random() * RANDOM_LOGS.length)];
            const newLog = randomLogTemplate.replace('{time}', timeStr);

            setLogs(prev => {
                const updated = [...prev, newLog];
                if (updated.length > 20) return updated.slice(updated.length - 20); // Keep last 20
                return updated;
            });

        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'RUNNING': return 'bg-[#10B981]';
            case 'HIGH LOAD': return 'bg-[#F5C518]';
            case 'ACTIVE': return 'bg-[#0037FF]';
            case 'STANDBY': return 'bg-[#888888]';
            default: return 'bg-[#10B981]';
        }
    };

    const getLogColor = (log: string) => {
        if (log.includes('COMPLETE') || log.includes('PASS') || log.includes('WITHIN SPEC')) return 'text-[#10B981]';
        if (log.includes('IN_PROGRESS') || log.includes('WAITING')) return 'text-[#F5C518]';
        if (log.includes('FAULT') || log.includes('STOPPED')) return 'text-[#EF4444]';
        return 'text-[#E4E3DB]';
    };

    return (
        <div className="p-4 md:p-8 min-h-screen relative w-full overflow-hidden bg-[#0F0F0F] text-[#E4E3DB]">
            <HalftoneGrid />

            <div className="mb-8 relative z-10 border-b-4 border-[#E4E3DB]/20 pb-4">
                <h2 className="font-grotesk text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#E4E3DB]">
                    PLANT_CAP.SYS
                </h2>
                <div className="font-mono text-[10px] tracking-widest opacity-60 mt-1">
                    PRODUCTION TELEMETRY AND YIELD MONITORING
                </div>
            </div>

            {/* Top: Four KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-8">
                {[
                    { title: 'ANNUAL CAPACITY', val: '120,000', sub: 'MT / YR', status: 'VERIFIED' },
                    { title: 'PRODUCT RANGE', val: '400+', sub: 'CABLE VARIANTS', status: 'CATALOG LIVE' },
                    { title: 'EXPORT REACH', val: '18', sub: 'COUNTRIES', status: 'ACTIVE' },
                    { title: 'TODAY\'S LOAD', val: '87%', sub: 'UTILIZED', status: 'REAL-TIME' },
                ].map((kpi, i) => (
                    <div key={i} className="border-4 border-[#E4E3DB]/15 bg-[#E4E3DB]/5 p-6 xl:p-8 flex flex-col justify-between group hover:border-[#FF3300] transition-colors cursor-none">
                        <div className="font-mono text-[10px] tracking-widest text-[#E4E3DB]/50 mb-4">{kpi.title}</div>
                        <div>
                            <div className="font-grotesk font-black text-5xl text-[#E4E3DB] mb-1">{kpi.val}</div>
                            <div className="font-mono text-[10px] uppercase text-[#E4E3DB]/70 tracking-wider mb-6">{kpi.sub}</div>
                        </div>
                        <div className="font-mono text-[9px] flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-[#FF3300] animate-pulse' : 'bg-[#10B981]'}`} />
                            {kpi.status}
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle: 8 Machine Cell Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-8">
                {MACHINE_CELLS.map((cell) => (
                    <div key={cell.id} className="border-4 border-[#E4E3DB]/15 bg-[#0F0F0F] p-5 relative group hover:border-[#E4E3DB]/40 transition-colors cursor-none overflow-hidden">
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1.5">
                            <div className={`w-2 h-2 ${getStatusColor(cell.status)}`} />
                            <span className="font-mono text-[8px] opacity-70 tracking-widest">{cell.status}</span>
                        </div>

                        <div className="font-mono text-[9px] text-[#E4E3DB]/40 mb-2">{cell.id}</div>

                        <div className="font-grotesk font-black text-4xl text-[#E4E3DB] mb-1">
                            {cell.temp}
                        </div>

                        <div className="font-mono text-[9px] tracking-widest text-[#E4E3DB]/40 uppercase mb-6 h-6">
                            {cell.process}
                        </div>

                        {/* Load Bar */}
                        <div className="w-full relative mt-auto">
                            <div className="flex justify-between items-end mb-1">
                                <span className="font-mono text-[8px] opacity-50">LOAD</span>
                                <span className={`font-mono text-[9px] ${cell.load > 90 ? 'text-[#F5C518]' : 'text-[#FF3300]'}`}>
                                    {cell.load}%
                                </span>
                            </div>
                            <div className="w-full h-1 bg-[#E4E3DB]/10 overflow-hidden">
                                <div
                                    className={`h-full ${cell.load > 90 ? 'bg-[#F5C518]' : 'bg-[#FF3300]'}`}
                                    style={{ width: `${cell.load}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom: Production Output Log Terminal */}
            <div className="w-full relative z-10 h-[250px]">
                <GUIWindow title="PRODUCTION_LOG.SYS" className="w-full h-full" defaultMinimized={false}>
                    <div className="bg-[#0000AA] p-4 md:p-6 font-mono text-xs text-[#E4E3DB] w-full h-full overflow-y-auto border-x-4 border-b-4 border-[#0F0F0F] shadow-[inset_4px_4px_0px_rgba(0,0,0,0.2)]">
                        {logs.map((log, i) => (
                            <div key={i} className={`mb-2 whitespace-pre-wrap font-bold tracking-tight ${getLogColor(log)}`}>
                                {log}
                            </div>
                        ))}
                        <div ref={logEndRef} />
                    </div>
                </GUIWindow>
            </div>

        </div>
    );
};
