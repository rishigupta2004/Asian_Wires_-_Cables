"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ArrowRight, Upload, CheckSquare, Printer } from 'lucide-react';
import { GUIWindow } from '../GUIWindow';
import { BlueprintGrid } from '../BasicElements';

const TERMINAL_LINES = [
    "> INITIATING AI_PROCURE.BAT...",
    "> LOADING MACHINE LEARNING HEURISTICS...",
    "> SYSTEM READY. AWAITING DATA INPUT...",
];

const RECEIPT_TEMPLATE = `
========================================
      ASIAN SYS L.L.C - QUOTATION
========================================
DATE: {date}
RFQ REF: {ref}
PROJECT: {project}
----------------------------------------
ITEM                       QTY     UNIT
----------------------------------------
CUSTOM CABLE SPEC          SYS_CALCULATED
BOM PARSED                 VERIFIED
----------------------------------------
ESTIMATED LEAD TIME:       3-4 WEEKS
DELIVERY LOCATION:         {loc}
========================================
** AUTOMATED ESTIMATE - SUBJECT TO **
** ENGINEERING REVIEW & APPROVAL   **
========================================
> EOF.
`;

export const ProcurementView = ({ handleNav }: any) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ project: '', ref: '', bom: '', loc: '', reqDate: '' });
    const [terminalOutput, setTerminalOutput] = useState<string[]>(TERMINAL_LINES);

    // Printer State
    const [isPrinting, setIsPrinting] = useState(false);
    const [printedCharIndex, setPrintedCharIndex] = useState(0);
    const [receiptText, setReceiptText] = useState("");

    const terminalEndRef = useRef<HTMLDivElement>(null);
    const printerEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll terminal
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [terminalOutput]);

    useEffect(() => {
        printerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [printedCharIndex]);

    const handleNext = () => {
        if (step === 1 && (!formData.project || !formData.ref)) return;
        if (step === 2 && !formData.bom) return;
        if (step === 3 && (!formData.loc || !formData.reqDate)) return;

        setTerminalOutput(prev => [...prev, `> STEP ${step} DATA CACHED. VERIFYING...`, `> SUCCESS. PROCEEDING TO STEP ${step + 1}.`]);
        setStep(s => s + 1);
    };

    const handleGenerate = () => {
        setTerminalOutput(prev => [...prev, "> COMPILING REQUIREMENTS...", "> CALCULATING LOGISTICS...", "> GENERATING RFQ DOCUMENT..."]);

        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        const text = RECEIPT_TEMPLATE
            .replace('{date}', dateStr)
            .replace('{ref}', formData.ref || 'AUTO-GEN-9912')
            .replace('{project}', formData.project || 'STANDARD DISPATCH')
            .replace('{loc}', formData.loc || 'HQ DROPOFF');

        setReceiptText(text);
        setIsPrinting(true);
        setPrintedCharIndex(0);
    };

    useEffect(() => {
        if (isPrinting && printedCharIndex < receiptText.length) {
            const timer = setTimeout(() => {
                setPrintedCharIndex(prev => prev + 1);
            }, 15); // Adjust printing speed here
            return () => clearTimeout(timer);
        }
    }, [isPrinting, printedCharIndex, receiptText]);

    return (
        <div className="p-4 md:p-8 min-h-[90vh] relative w-full flex flex-col items-center">
            <BlueprintGrid />

            <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row gap-8 items-stretch pt-4">

                {/* Left Column - Multi-Step Form */}
                <div className="w-full lg:w-1/2 flex flex-col h-[70vh] shrink-0">
                    <GUIWindow title={`AI_PROCURE.BAT — STEP ${step}/3`} className="h-full flex flex-col shadow-[12px_12px_0px_#0F0F0F]" defaultMinimized={false}>
                        <div className="bg-[#E4E3DB] p-6 lg:p-8 flex-1 flex flex-col border-x-4 border-b-4 border-[#0F0F0F] relative shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)] overflow-y-auto">

                            {/* Step Progress Bar */}
                            <div className="w-full h-2 bg-[#0F0F0F]/10 flex mb-8">
                                <div className="h-full bg-[#FF3300] transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
                            </div>

                            {/* STEP 1: PROJECT DETAILS */}
                            {step === 1 && (
                                <div className="flex-1 flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
                                    <h3 className="font-grotesk font-black text-2xl uppercase mb-2">Project Metadirectory</h3>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-mono text-[10px] font-bold tracking-widest uppercase">Project Name</label>
                                        <input
                                            value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })}
                                            type="text" className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs focus:outline-none focus:bg-[#E4E3DB] focus:border-[#FF3300]"
                                            placeholder="e.g. Metro Rail Phase 2"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-mono text-[10px] font-bold tracking-widest uppercase">Tender / Ref Number</label>
                                        <input
                                            value={formData.ref} onChange={e => setFormData({ ...formData, ref: e.target.value })}
                                            type="text" className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs focus:outline-none focus:bg-[#E4E3DB] focus:border-[#FF3300]"
                                            placeholder="e.g. TN/MM/2024-89"
                                        />
                                    </div>

                                    <button
                                        onClick={handleNext} disabled={!formData.project || !formData.ref}
                                        className="mt-auto border-4 border-[#0F0F0F] bg-[#0000AA] text-[#E4E3DB] p-4 font-mono font-bold flex justify-between items-center hover:bg-[#FF3300] transition-colors disabled:opacity-50 cursor-none"
                                    >
                                        PROCEED TO B.O.M. INPUT <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: REQUIREMENTS */}
                            {step === 2 && (
                                <div className="flex-1 flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
                                    <h3 className="font-grotesk font-black text-2xl uppercase mb-2">Bill of Materials</h3>

                                    <div className="flex flex-col gap-2 flex-1">
                                        <label className="font-mono text-[10px] font-bold tracking-widest uppercase flex justify-between">
                                            <span>Raw Text Requirement</span>
                                            <span className="opacity-50 flex items-center gap-1 cursor-pointer hover:text-[#FF3300] transition-colors"><Upload className="w-3 h-3" /> UPLOAD .CSV</span>
                                        </label>
                                        <textarea
                                            value={formData.bom} onChange={e => setFormData({ ...formData, bom: e.target.value })}
                                            className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs flex-1 resize-none focus:outline-none focus:bg-[#E4E3DB] focus:border-[#FF3300] custom-scrollbar"
                                            placeholder="Paste requirements, spec tables, or specific core configurations here..."
                                        />
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <button onClick={() => setStep(1)} className="border-4 border-[#0F0F0F] bg-[#D7D6CD] px-4 font-mono font-bold hover:bg-[#0F0F0F] hover:text-[#E4E3DB] transition-colors cursor-none">BACK</button>
                                        <button
                                            onClick={handleNext} disabled={!formData.bom}
                                            className="flex-1 border-4 border-[#0F0F0F] bg-[#0000AA] text-[#E4E3DB] p-4 font-mono font-bold flex justify-between items-center hover:bg-[#FF3300] transition-colors disabled:opacity-50 cursor-none"
                                        >
                                            PROCEED TO LOGISTICS <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: LOGISTICS */}
                            {step === 3 && (
                                <div className="flex-1 flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
                                    <h3 className="font-grotesk font-black text-2xl uppercase mb-2">Logistics Vector</h3>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-mono text-[10px] font-bold tracking-widest uppercase">Delivery Location (City/PIN)</label>
                                        <input
                                            value={formData.loc} onChange={e => setFormData({ ...formData, loc: e.target.value })}
                                            type="text" className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs focus:outline-none focus:bg-[#E4E3DB] focus:border-[#FF3300]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-mono text-[10px] font-bold tracking-widest uppercase">Required By Date</label>
                                        <input
                                            value={formData.reqDate} onChange={e => setFormData({ ...formData, reqDate: e.target.value })}
                                            type="date" className="bg-[#D7D6CD] border-4 border-[#0F0F0F] p-3 font-mono text-xs focus:outline-none focus:bg-[#E4E3DB] focus:border-[#FF3300]"
                                        />
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <button onClick={() => setStep(2)} className="border-4 border-[#0F0F0F] bg-[#D7D6CD] px-4 font-mono font-bold hover:bg-[#0F0F0F] hover:text-[#E4E3DB] transition-colors cursor-none">BACK</button>
                                        <button
                                            onClick={handleGenerate} disabled={!formData.loc || !formData.reqDate}
                                            className="flex-1 border-4 border-[#0F0F0F] bg-[#10B981] text-[#0F0F0F] p-4 font-mono font-black text-lg flex justify-between items-center shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 cursor-none"
                                        >
                                            GENERATE_INQUIRY() <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </GUIWindow>
                </div>

                {/* Right Column - Terminal Output */}
                <div className="w-full lg:w-1/2 flex flex-col h-[70vh] shrink-0">
                    <GUIWindow title="TERMINAL_STDOUT.LOG" className="h-full flex flex-col shadow-[12px_12px_0px_#0000AA]" defaultMinimized={false}>
                        <div className="bg-[#0F0F0F] p-4 flex-1 overflow-y-auto border-x-4 border-b-4 border-[#0F0F0F] font-mono text-xs text-[#10B981] relative custom-scrollbar">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,1) 50%)', backgroundSize: '100% 4px' }} />

                            <div className="flex flex-col gap-2 mt-2 relative z-20 whitespace-pre-wrap leading-relaxed">
                                {terminalOutput.map((line, idx) => (
                                    <div key={idx} className={line.startsWith('>') ? 'opacity-70' : 'font-bold'}>
                                        {line}
                                    </div>
                                ))}

                                {/* Blinking block cursor */}
                                <div className="animate-pulse w-3 h-4 bg-[#10B981] inline-block mt-1 align-middle shadow-[0_0_8px_#10B981]" />
                                <div ref={terminalEndRef} />
                            </div>
                        </div>
                    </GUIWindow>
                </div>

            </div>

            {/* ASCII Printer Modal Success State */}
            {isPrinting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0F0F0F]/80 backdrop-blur-sm pointer-events-auto" onClick={() => setIsPrinting(false)}></div>
                    <div className="w-full max-w-lg relative z-10 animate-[slideUpDrawer_0.5s_ease-out]">
                        <GUIWindow title="ASCII_PRINTER.EXE // QUOTATION" className="w-full shadow-[20px_20px_0px_rgba(255,51,0,0.5)]" defaultMinimized={false}>
                            <div className="bg-[#E4E3DB] border-x-4 border-b-4 border-[#0F0F0F] flex flex-col">

                                {/* Printer Slot visual */}
                                <div className="h-4 bg-[#0F0F0F] border-b-2 border-t-2 border-[#E4E3DB]/20 w-[90%] mx-auto mt-4 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF3300]/20 to-transparent animate-[flowDash_2s_linear_infinite]" />
                                </div>

                                {/* Paper output */}
                                <div className="bg-[#FFFFFF] mx-8 mt-2 mb-8 p-6 md:p-8 font-mono text-[10px] md:text-xs text-[#0F0F0F] shadow-[0_10px_20px_rgba(0,0,0,0.2)] border-x-2 border-b-2 border-[#0F0F0F]/10 min-h-[300px] relative">
                                    <div className="absolute top-0 left-0 w-full h-2 flex justify-between px-2 opacity-20">
                                        {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-1 h-2 bg-[#0F0F0F] rounded-b-full" />)}
                                    </div>
                                    <pre className="whitespace-pre-wrap leading-[1.2]">
                                        {receiptText.substring(0, printedCharIndex)}
                                        {printedCharIndex < receiptText.length && <span className="bg-[#0F0F0F] text-[#FFFFFF] w-2 h-3 inline-block animate-pulse align-middle ml-1" />}
                                    </pre>
                                    <div ref={printerEndRef} />
                                </div>

                                {printedCharIndex >= receiptText.length && (
                                    <div className="p-4 bg-[#0F0F0F] border-t-4 border-[#0F0F0F] flex justify-between items-center text-[#E4E3DB]">
                                        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#10B981]">
                                            <CheckSquare className="w-4 h-4" /> JOB COMPLETE
                                        </div>
                                        <button onClick={() => window.print()} className="bg-[#FF3300] text-[#0F0F0F] px-4 py-2 font-mono font-bold text-xs hover:bg-[#E4E3DB] transition-colors flex items-center gap-2 cursor-none">
                                            HARDCOPY <Printer className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </GUIWindow>
                    </div>
                </div>
            )}
        </div>
    );
};
