'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Activity, Shield, Filter, TerminalSquare, BookOpen, CheckSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { NoiseOverlay, HalftoneGrid, Barcode, SystemLoadGraph, CustomCursor, DraggableSticker, TextReveal, GUIWindow, RegistrationMarks } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const anatomySpecs = [
  { title: "CONDUCTOR CORE", stat: "99.97%", desc: "Electrolytic Grade bare annealed copper. Drawn and stranded for maximum flexibility." },
  { title: "PRIMARY INSULATION", stat: "PVC/XLPE", desc: "In-house formulated compounds. High dielectric strength tested at 3kV." },
  { title: "MECHANICAL ARMOR", stat: "GALVANIZED", desc: "Concentric steel wire or flat strip armoring. Engineered to withstand severe impact." },
  { title: "OUTER SHEATH", stat: "FRLS", desc: "Flame Retardant Low Smoke exterior. UV stabilized and anti-rodent." }
];

const features = [
  { icon: Shield, title: "ISO 9001:2015", desc: "Certified Quality Management" },
  { icon: Activity, title: "99.97% Pure Copper", desc: "EC Grade Annealed" },
  { icon: Filter, title: "Zero Halogen", desc: "FRLS Technology" },
  { icon: TerminalSquare, title: "30+ Years", desc: "Industry Experience" },
];

export default function HomePage() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [activeSpec, setActiveSpec] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);

    const logs = [
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
    
    let step = 0;
    const bootInterval = setInterval(() => {
      if (step < logs.length) {
        setBootLogs(prev => [...prev, logs[step]]);
        setBootProgress(Math.floor(((step + 1) / logs.length) * 100));
        step++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setIsBooting(false), 900);
      }
    }, 150);

    return () => { clearInterval(bootInterval); window.removeEventListener('mousemove', updateMouse); };
  }, []);

  if (isBooting) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#E4E3DB] font-mono-custom p-8 flex flex-col relative overflow-hidden cursor-none">
        <NoiseOverlay />
        <div className="text-xs sm:text-sm font-bold tracking-widest whitespace-pre-wrap leading-tight z-10 flex-1">
          {bootLogs.map((log, i) => {
             const isOk = typeof log === 'string' && log.includes("OK");
             return (
               <div key={i} className={isOk ? "text-[#10B981]" : ""}>
                 {typeof log === 'string' ? log : ''}
               </div>
             );
          })}
          <span className="animate-pulse bg-[#E4E3DB] w-3 h-5 inline-block mt-2"></span>
        </div>
        
        <div className="z-10 mt-8">
          <div className="text-[#F23A18] mb-2 font-bold text-xs tracking-widest">LOADING MEMORY: {bootProgress}%</div>
          <div className="w-full max-w-md h-4 border-2 border-[#E4E3DB] p-0.5">
            <div className="h-full bg-[#E4E3DB] transition-all duration-75" style={{ width: `${bootProgress}%` }}></div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <pre className="text-[12px] md:text-[24px] font-black text-[#F23A18] leading-none text-center drop-shadow-[0_0_15px_#F23A18]">
{`
    ___   _____ ___________    _   __
   /   | / ___//  _/ ____/ |  / / / /
  / /| | \\__ \\ / // __/  | | / / / / 
 / ___ |___/ // // /___  | |/ / / /__
/_/  |_/____/___/_____/  |___/ /____/
`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        <DraggableSticker />
        
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col border-b-4 border-[#0F0F0F] relative overflow-hidden bg-[#E4E3DB]">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0F0F0F 2px, transparent 2px), linear-gradient(90deg, #0F0F0F 2px, transparent 2px)', backgroundSize: '64px 64px' }}></div>
          
          <div className="flex-1 flex flex-col xl:flex-row relative z-10">
            <div className="xl:w-[55%] p-6 lg:p-12 xl:p-16 border-b-4 xl:border-b-0 xl:border-r-4 border-[#0F0F0F] flex flex-col justify-center">
              
              <div className="inline-flex items-center border-4 border-[#0F0F0F] px-4 py-2 font-mono-custom text-[10px] mb-8 w-fit bg-[#E4E3DB] text-[#0F0F0F] uppercase tracking-widest shadow-[4px_4px_0px_#0F0F0F]">
                <div className="w-2 h-2 bg-[#F23A18] animate-pulse mr-3 border border-[#0F0F0F]"></div> SYSTEM_ONLINE // HEAVY DUTY
              </div>
              
              <h1 className="font-grotesk text-[14vw] xl:text-[8vw] font-black leading-[0.75] tracking-tighter uppercase mb-6 text-[#0F0F0F]">
                <TextReveal delay={100}><span className="font-serif italic font-normal tracking-normal pr-4">Absolute</span></TextReveal><br/>
                <TextReveal delay={200}>
                  <span className="text-[#E4E3DB] relative inline-block" style={{ WebkitTextStroke: '4px #0F0F0F', textShadow: '8px 8px 0px #F23A18' }}>Conductivity.</span>
                </TextReveal>
              </h1>

              <TextReveal delay={400}>
                <div className="border-4 border-[#0F0F0F] p-5 bg-[#E4E3DB] max-w-lg shadow-[8px_8px_0px_#0F0F0F] mb-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#F23A18] border-l-4 border-b-4 border-[#0F0F0F]"></div>
                  <p className="font-mono-custom text-sm leading-relaxed text-[#0F0F0F] font-bold">
                    Engineering the nervous system of modern infrastructure. 
                    From deeply buried high-tension grids to critical photovoltaic installations.
                  </p>
                </div>
              </TextReveal>
              
              <TextReveal delay={600}>
                <div className="flex flex-wrap gap-4 font-mono-custom text-xs font-bold tracking-widest">
                  <Link 
                    href="/products"
                    className="relative px-8 py-4 border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] shadow-[8px_8px_0px_#F23A18] hover:shadow-[4px_4px_0px_#F23A18] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all flex items-center group"
                  >
                    <span className="mr-3">ACCESS_MATRIX.EXE</span> <ArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  </Link>
                </div>
              </TextReveal>
            </div>

            <div className="xl:w-[45%] bg-[#D7D6CD] p-4 lg:p-8 xl:p-12 flex items-center justify-center relative overflow-hidden">
              <HalftoneGrid />
              
              <GUIWindow title="KINETIC_TORUS.EXE" className="w-full max-w-md aspect-square">
                <div className="w-full h-full bg-[#E4E3DB] flex items-center justify-center p-6 relative overflow-hidden border-t-4 border-[#0F0F0F]">
                  <RegistrationMarks />
                  <div className="absolute inset-0 bg-[#0F0F0F] opacity-5 mix-blend-multiply" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #0F0F0F 25%, transparent 25%, transparent 75%, #0F0F0F 75%, #0F0F0F), repeating-linear-gradient(45deg, #0F0F0F 25%, transparent 25%, transparent 75%, #0F0F0F 75%, #0F0F0F)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                  
                  <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 transition-transform duration-200 ease-out" style={{ transform: `rotateX(${(mousePos.y - window.innerHeight/2) * -0.05}deg) rotateY(${(mousePos.x - window.innerWidth/2) * 0.05}deg)` }}>
                    <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
                      {Array.from({length: 24}).map((_, i) => (
                        <ellipse key={i} cx="200" cy="200" rx="150" ry="40" fill="none" stroke="#0F0F0F" strokeWidth="2" opacity="0.8" transform={`rotate(${i * (180/24)} 200 200)`} />
                      ))}
                      <circle cx="200" cy="200" r="150" fill="none" stroke="#F23A18" strokeWidth="6" strokeDasharray="20 30" />
                      <circle cx="200" cy="200" r="40" fill="none" stroke="#0F0F0F" strokeWidth="6" />
                    </g>
                  </svg>
                </div>
              </GUIWindow>
            </div>
          </div>
          
          {/* MARQUEES */}
          <div className="border-t-4 border-[#0F0F0F] bg-[#F23A18] text-[#0F0F0F] py-3 overflow-hidden font-grotesk font-black text-2xl xl:text-4xl uppercase whitespace-nowrap flex items-center border-b-4">
            <div className="animate-[marquee_20s_linear_infinite] flex gap-12 min-w-max">
              <span>/// ARCHITECTURAL GRADE CABLES</span>
              <span>/// ISO 9001:2015 CERTIFIED</span>
              <span>/// 100% PURE EC GRADE COPPER</span>
              <span>/// ZERO HALOGEN TECHNOLOGY</span>
            </div>
          </div>
          <div className="bg-[#0F0F0F] text-[#E4E3DB] py-2 overflow-hidden font-mono-custom font-bold text-xs uppercase whitespace-nowrap flex items-center border-b-4 border-[#0F0F0F]">
            <div className="animate-[marquee_15s_linear_infinite_reverse] flex gap-12 min-w-max">
              <span>*** MANUFACTURED IN INDIA *** OVER 120K MT ANNUAL CAPACITY *** DESTRUCTIVE TESTING PASSED ***</span>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#D7D6CD] p-6 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F] hover:shadow-[4px_4px_0px_#0F0F0F] hover:translate-y-1 transition-all">
                <feature.icon className="w-10 h-10 text-[#F23A18] mb-4" strokeWidth={1.5} />
                <h3 className="font-grotesk font-black text-lg uppercase mb-1">{feature.title}</h3>
                <p className="font-mono-custom text-xs font-bold text-[#0F0F0F]/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ANATOMY SECTION */}
        <section className="border-b-4 border-[#0F0F0F] flex flex-col xl:flex-row bg-[#E4E3DB]">
          <div className="xl:w-[45%] p-6 lg:p-12 border-b-4 xl:border-b-0 xl:border-r-4 border-[#0F0F0F]">
            <h2 className="font-grotesk text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-[#0F0F0F]">Anatomy Engine</h2>
            <p className="font-mono-custom text-xs text-[#0F0F0F] font-bold bg-[#F23A18] px-2 py-1 inline-block mb-8 uppercase tracking-widest border-2 border-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F]">ISOLATE_STRUCTURAL_COMPONENTS</p>
            
            <div className="space-y-3 font-mono-custom">
              {anatomySpecs.map((spec, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveSpec(idx)}
                  className={`p-4 border-4 transition-all duration-200 cursor-crosshair ${
                    activeSpec === idx ? 'border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] translate-x-4 shadow-[8px_8px_0px_#F23A18]' : 'border-[#0F0F0F] bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0F0F0F]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-lg">{spec.title}</span>
                    <span className={`text-[10px] tracking-widest px-2 py-1 border-2 font-bold ${activeSpec === idx ? 'border-[#E4E3DB] bg-[#F23A18] text-[#0F0F0F]' : 'border-[#0F0F0F]'}`}>{spec.stat}</span>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${activeSpec === idx ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs font-bold opacity-80">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="xl:w-[55%] relative min-h-[50vh] flex flex-col items-center justify-center p-6 lg:p-10 bg-[#D7D6CD] overflow-hidden">
            <HalftoneGrid />
            
            <GUIWindow title="DRAFTING_COMPASS.CAD" className="w-full max-w-sm aspect-square">
              <div className="w-full h-full bg-[#E4E3DB] p-4 relative border-t-4 border-[#0F0F0F]">
                <RegistrationMarks />
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <g className="animate-[spin_120s_linear_infinite]" style={{ transformOrigin: '250px 250px' }}>
                    {Array.from({length: 72}).map((_, i) => (
                      <line key={i} x1="250" y1="10" x2="250" y2={i % 2 === 0 ? "35" : "20"} stroke="#0F0F0F" strokeWidth={i % 2 === 0 ? "4" : "2"} transform={`rotate(${i * 5} 250 250)`} />
                    ))}
                    <circle cx="250" cy="250" r="240" fill="none" stroke="#0F0F0F" strokeWidth="6" />
                  </g>
                  
                  <g style={{ transformOrigin: '250px 250px', transform: 'scale(0.85)' }}>
                    <circle cx="250" cy="250" r="180" fill={activeSpec === 3 ? "#E4E3DB" : "transparent"} stroke="#0F0F0F" strokeWidth="8" className="transition-colors duration-300"/>
                    <circle cx="250" cy="250" r="145" fill="#E4E3DB" stroke="#0F0F0F" strokeWidth="8" />
                    <circle cx="250" cy="250" r="145" fill="none" stroke={activeSpec === 2 ? "#F23A18" : "transparent"} strokeWidth="16" className="transition-colors duration-300"/>
                    <circle cx="250" cy="250" r="105" fill={activeSpec === 1 ? "#0F0F0F" : "#E4E3DB"} stroke="#0F0F0F" strokeWidth="8" className="transition-colors duration-300"/>
                    <g className="transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" style={{ transformOrigin: '250px 250px', transform: activeSpec === 0 ? 'scale(1.3) rotate(45deg)' : 'scale(1) rotate(0deg)' }}>
                      <circle cx="250" cy="250" r="50" fill={activeSpec === 0 ? "#F23A18" : "#0F0F0F"} stroke="#0F0F0F" strokeWidth="6" className="transition-colors duration-300"/>
                      {[ [250, 250], [250, 225], [272, 238], [272, 262], [250, 275], [228, 262], [228, 238] ].map((pos, i) => (
                        <circle key={i} cx={pos[0]} cy={pos[1]} r="10" fill="#E4E3DB" stroke="#0F0F0F" strokeWidth="3"/>
                      ))}
                    </g>
                  </g>
                </svg>
              </div>
            </GUIWindow>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0F0F0F] text-[#E4E3DB] p-8 lg:p-12 border-t-4 border-[#0F0F0F]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-grotesk font-black text-3xl text-[#F23A18] mb-4">ASIAN</h3>
              <p className="font-mono-custom text-xs">Wire & Cable Manufacturer</p>
              <p className="font-mono-custom text-xs mt-2 text-[#E4E3DB]/60">Since 1990</p>
            </div>
            <div>
              <h4 className="font-mono-custom font-bold text-sm mb-4 border-b-2 border-[#F23A18] pb-2">DIRECTORIES</h4>
              <nav className="flex flex-col gap-2 font-mono-custom text-xs">
                <Link href="/products" className="hover:text-[#F23A18]">{' > '} DATA_MATRIX.DB</Link>
                <Link href="/about" className="hover:text-[#F23A18]">{' > '} COMPANY_INTRO</Link>
                <Link href="/quality" className="hover:text-[#F23A18]">{' > '} SPEC_SHEETS</Link>
                <Link href="/clients" className="hover:text-[#F23A18]">{' > '} PARTNERS_NET</Link>
                <Link href="/contact" className="hover:text-[#F23A18]">{' > '} COMM_LINK</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-mono-custom font-bold text-sm mb-4 border-b-2 border-[#F23A18] pb-2">CONTACT</h4>
              <p className="font-mono-custom text-xs">Ground Floor, 1051, Mahavir Bhawan</p>
              <p className="font-mono-custom text-xs">Sita Ram Bazar, New Delhi - 110006</p>
              <p className="font-mono-custom text-xs mt-2">+91-9811733043</p>
              <p className="font-mono-custom text-xs">brijasian@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#E4E3DB]/20 text-center font-mono-custom text-xs">
            <Barcode className="w-32 h-6 mx-auto opacity-50" />
            <p className="mt-2 text-[#E4E3DB]/40">ASIAN_SYS © 1998-2026 // ALL RIGHTS RESERVED</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
