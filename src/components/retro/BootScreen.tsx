"use client";

import React, { useState, useEffect } from 'react';

export const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
    const lines = [
        "ASIAN_SYS BIOS v4.02",
        "Copyright (C) 1998-2026, Asian Wires Ltd.",
        "CPU: KINETIC_ENGINE_X 4.2GHz",
        "Memory Test: 64000K OK",
        "Loading generic drivers........................ [OK]",
        "Mounting /dev/sda1 (ext4)...................... [OK]",
        "Initializing AI Procurement Core............... [OK]",
        "Checking catalog database integrity............ [OK]",
        "Executing startup.sh",
        "SYSTEM ONLINE. ENTERING GUI..."
    ];

    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setVisibleLines(v => {
                if (v < lines.length) return v + 1;
                clearInterval(id);
                return v;
            });
        }, 80);
        return () => clearInterval(id);
    }, [lines.length]);

    useEffect(() => {
        if (visibleLines >= lines.length) {
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.floor(Math.random() * 15) + 5;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 600); // 600ms pause
                }
                setProgress(currentProgress);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [visibleLines, lines.length, onComplete]);

    return (
        <div className="fixed inset-0 z-[200] bg-[#0F0F0F] text-[#E4E3DB] cursor-none min-h-screen flex flex-col p-8 font-mono text-xs font-bold tracking-widest">
            {/* ASCII Logo background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none text-center whitespace-pre text-[#FF3300] drop-shadow-[0_0_15px_#FF3300]" style={{ fontSize: '1vw', lineHeight: 1.1 }}>
                {`      __       _______. __       ___      .__   __. 
     /  \\     /       ||  |     /   \\     |  \\ |  | 
    /    \\   |   (----\`|  |    /  ^  \\    |   \\|  | 
   /  /\\  \\   \\   \\    |  |   /  /_\\  \\   |  . \`  | 
  /  ____  \\ .----)   ||  |  /  _____  \\  |  |\\   | 
 /__/    \\__\\|_______/ |__| /__/     \\__\\ |__| \\__| `}
            </div>

            <div className="relative z-10 flex-1">
                {lines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="mb-1">
                        {line.includes("[OK]") ? (
                            <>
                                {line.split("[OK]")[0]}
                                <span className="text-[#10B981]">[OK]</span>
                                {line.split("[OK]")[1]}
                            </>
                        ) : line}
                    </div>
                ))}
                {visibleLines < lines.length && (
                    <div className="animate-pulse bg-[#E4E3DB] w-3 h-5 inline-block mt-1" />
                )}
            </div>

            {visibleLines >= lines.length && (
                <div className="relative z-10 mt-8">
                    <div className="text-[#FF3300] mb-2">LOADING MEMORY: {progress}%</div>
                    <div className="h-4 border-2 border-[#E4E3DB] w-full max-w-md p-[2px]">
                        <div className="h-full bg-[#E4E3DB] transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            )}
        </div>
    );
};
