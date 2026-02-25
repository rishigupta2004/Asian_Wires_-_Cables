import React, { useEffect, useState, useRef } from 'react';
import { BlueprintGrid, HalftoneGrid } from '../';

interface AboutViewProps {
    handleNav: (id: string) => void;
}

const AnimatedNumber = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return <div ref={ref}>{count.toLocaleString()}{end > 1000 ? '+' : ''}</div>;
};

export const AboutView: React.FC<AboutViewProps> = ({ handleNav }) => {
    return (
        <div className="min-h-screen bg-[#E4E3DB] relative text-[#0F0F0F] overflow-x-hidden selection:bg-[#FF3300] selection:text-[#E4E3DB]">
            <BlueprintGrid />
            <HalftoneGrid />

            <div className="relative z-10 max-w-7xl mx-auto border-x-4 border-[#0F0F0F] bg-[#E4E3DB] min-h-screen">

                {/* SECTION 1: Header + Hero Stats */}
                <div className="pt-20 px-6 lg:px-10 pb-10">
                    <h1 className="font-grotesk font-black text-[12vw] md:text-[8vw] lg:text-[10vw] tracking-tighter uppercase leading-[0.85] mb-2">
                        ASIAN WIRES<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '3px #0F0F0F' }}>& CABLES.</span>
                    </h1>
                </div>

                <div className="border-t-4 border-[#0F0F0F]">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'YEARS IN BIZ', value: 35, suffix: '+' },
                            { label: 'MT/YR CAPACITY', value: 120000, suffix: ' MT/YR' },
                            { label: 'SKU CATALOG', value: 400, suffix: '+' },
                            { label: 'COUNTRIES', value: 18, suffix: '' }
                        ].map((stat, i) => (
                            <div key={i} className={`p-8 border-b-4 lg:border-b-0 border-[#0F0F0F] ${i % 2 === 0 ? 'bg-[#E4E3DB]' : 'bg-[#D7D6CD]'} ${i < 3 ? 'border-r-4' : ''}`}>
                                <div className="font-grotesk font-black text-5xl lg:text-7xl flex items-baseline">
                                    <AnimatedNumber end={stat.value} duration={2000} />
                                    {stat.suffix && <span className="text-2xl lg:text-4xl ml-1">{stat.suffix}</span>}
                                </div>
                                <div className="font-mono text-[10px] tracking-widest opacity-50 mt-2 uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: Two-Column About Body */}
                <div className="flex flex-col lg:flex-row border-t-4 border-[#0F0F0F]">
                    {/* LEFT COLUMN */}
                    <div className="w-full lg:w-[45%] border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F] p-8 lg:p-10 bg-[#E4E3DB]">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px w-8 bg-[#0F0F0F]/40" />
                            <span className="font-mono text-[9px] tracking-[0.4em]">ABOUT_US.TXT</span>
                        </div>

                        <h2 className="font-grotesk font-black text-[8vw] lg:text-[5vw] tracking-tighter leading-none mb-10">
                            Engineering India's<br />Power Infrastructure.
                        </h2>

                        <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] p-6 lg:p-8 shadow-[8px_8px_0px_#FF3300] relative">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-[#FF3300] border-l-4 border-b-4 border-[#0F0F0F]" />
                            <div className="font-mono text-xs lg:text-sm font-bold text-[#E4E3DB] leading-relaxed space-y-6">
                                <p>
                                    Founded in Mumbai, Asian Wires & Cables has been manufacturing
                                    industrial-grade copper and aluminium conductors since 1989.
                                </p>
                                <p>
                                    We supply LT, HT, and EHT power cables to power utilities,
                                    renewable energy plants, infrastructure contractors, and
                                    industrial facilities across India and 18 countries globally.
                                </p>
                                <p>
                                    Every cable we manufacture is tested to IS, IEC, and BS standards
                                    at our fully equipped in-house testing laboratory — approved by
                                    CPRI (Central Power Research Institute).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full lg:w-[55%] p-8 lg:p-10 bg-[#E4E3DB] flex flex-col justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                "https://images.unsplash.com/photo-1581092160607-ee67df832b66?w=400&h=300&fit=crop&q=80",
                                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
                                "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop&q=80"
                            ].map((img, i) => (
                                <div key={i} className="border-4 border-[#0F0F0F] shadow-[8px_8px_0px_#0F0F0F] relative group overflow-hidden aspect-video">
                                    <div className="absolute inset-0 bg-[#FF3300]/10 mix-blend-color-burn z-10 pointer-events-none" />
                                    <img
                                        src={img}
                                        alt={`Facility ${i + 1}`}
                                        className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 font-mono text-xs text-[#0F0F0F]/70 leading-relaxed font-bold max-w-xl">
                            <p>▹ Manufacturing excellence utilizing 100% EC grade copper and high-purity aluminium, processed through state-of-the-art wire drawing and stranding lines.</p>
                            <p>▹ ISO 9001:2015 certified operations with valid BIS licensing for complete LV/HV ranges and recognized by CPRI for rigorous performance qualifications.</p>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Timeline — Company History */}
                <div className="w-full bg-[#0F0F0F] px-6 lg:px-10 py-16 lg:py-24 border-t-4 border-[#0F0F0F] overflow-hidden">
                    <h2 className="font-grotesk font-black text-5xl lg:text-6xl text-[#E4E3DB] mb-16 uppercase tracking-tighter">
                        COMPANY TIMELINE.
                    </h2>

                    <div className="flex overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x relative">
                        {/* Horizontal tracking line */}
                        <div className="absolute top-[28px] left-0 w-[150%] h-1 bg-[#E4E3DB]/20 z-0" />

                        {[
                            { year: 1989, text: "Company founded, first manufacturing unit commissioned" },
                            { year: 1994, text: "BIS license awarded for LT cables under IS:694" },
                            { year: 1999, text: "11kV HT cable manufacturing begins" },
                            { year: 2003, text: "ISO 9001 certification achieved" },
                            { year: 2008, text: "33kV EHT cable production line added" },
                            { year: 2012, text: "Solar DC cable range launched for Indian solar push" },
                            { year: 2016, text: "Export operations commence to 8 countries" },
                            { year: 2019, text: "30th anniversary — capacity expanded to 60,000 MT/yr" },
                            { year: 2021, text: "CPRI approved testing laboratory inaugurated" },
                            { year: 2024, text: "120,000 MT/yr annual capacity milestone" }
                        ].map((item, i) => (
                            <TimelineItem key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>

                {/* SECTION 4: Leadership Team */}
                <div className="bg-[#E4E3DB] border-t-4 border-[#0F0F0F] px-6 lg:px-10 py-16 lg:py-20">
                    <h2 className="font-grotesk font-black text-5xl lg:text-6xl tracking-tighter mb-12 uppercase">
                        LEADERSHIP.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Rajesh K. Agarwal", role: "Managing Director", desc: "35 years in cable manufacturing", bg: "https://ui-avatars.com/api/?name=Rajesh+Agarwal&background=0F0F0F&color=E4E3DB&size=400&font-size=0.33&length=2&bold=true" },
                            { name: "Priya Sharma", role: "Head of Technology", desc: "XLPE & specialty cable R&D", bg: "https://ui-avatars.com/api/?name=Priya+Sharma&background=0F0F0F&color=E4E3DB&size=400&font-size=0.33&length=2&bold=true" },
                            { name: "Amit Patel", role: "VP Operations", desc: "Plant operations & quality systems", bg: "https://ui-avatars.com/api/?name=Amit+Patel&background=0F0F0F&color=E4E3DB&size=400&font-size=0.33&length=2&bold=true" },
                            { name: "Sunita Verma", role: "Export Director", desc: "International sales & logistics", bg: "https://ui-avatars.com/api/?name=Sunita+Verma&background=0F0F0F&color=E4E3DB&size=400&font-size=0.33&length=2&bold=true" }
                        ].map((person, i) => (
                            <div key={i} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] shadow-[8px_8px_0px_#0F0F0F] flex flex-col group hover:-translate-y-2 hover:shadow-[12px_12px_0px_#FF3300] transition-all duration-300">
                                <div className="aspect-square bg-[#D7D6CD] overflow-hidden border-b-4 border-[#0F0F0F] relative">
                                    <div className="absolute inset-0 bg-halftone opacity-20" />
                                    <img src={person.bg} alt={person.name} className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-grotesk font-black text-xl mb-1">{person.name}</h3>
                                    <div className="font-mono text-[9px] tracking-widest text-[#0F0F0F]/50 uppercase">{person.role}</div>
                                    <div className="h-px w-8 bg-[#FF3300] my-4" />
                                    <p className="font-mono text-[10px] text-[#0F0F0F]/80 font-bold mt-auto leading-relaxed">{person.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 5: Manufacturing Capabilities Strip */}
                <div className="bg-[#D7D6CD] border-t-4 border-[#0F0F0F] flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[40%] p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F] bg-[#FF3300] flex flex-col justify-center">
                        <div className="space-y-8 text-[#0F0F0F]">
                            <div>
                                <div className="font-grotesk font-black text-6xl">400+</div>
                                <div className="font-mono text-xs font-bold tracking-widest mt-1">SKUs IN CATALOG</div>
                            </div>
                            <div>
                                <div className="font-grotesk font-black text-6xl">120K</div>
                                <div className="font-mono text-xs font-bold tracking-widest mt-1">MT ANNUAL CAPACITY</div>
                            </div>
                            <div>
                                <div className="font-grotesk font-black text-6xl">5 LAKH+</div>
                                <div className="font-mono text-xs font-bold tracking-widest mt-1">METERS TESTED DAILY</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[60%] p-8 lg:p-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {[
                                "Conductor drawing from 6.5mm rod to sub-millimeter fine wire",
                                "Multi-core stranding up to 1000mm² cross-section",
                                "XLPE extrusion: LT, HT, and EHT grades",
                                "FRLS and halogen-free compound sheathing",
                                "Steel wire and steel tape armoring",
                                "PVC, FRLS, PE, and HDPE outer sheathing",
                                "Drum winding up to 1000m continuous lengths",
                                "In-house spark testing: 6kV to 200kV AC",
                                "Conductor resistance, tensile, elongation testing",
                                "CPRI-approved HV testing laboratory"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 text-sm font-mono font-bold leading-relaxed items-start">
                                    <span className="text-[#FF3300] shrink-0 mt-0.5">▸</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setIsVisible(true), index * 100);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div
            ref={ref}
            className={`min-w-[280px] w-[280px] shrink-0 snap-start flex flex-col relative pt-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="absolute top-[21px] left-6 w-4 h-4 rounded-full bg-[#FF3300] border-2 border-[#E4E3DB] z-10 shadow-[0_0_10px_#FF3300]" />
            <div className="absolute top-[37px] left-[31px] w-0.5 h-[calc(100%-37px)] bg-[#FF3300]/30 z-0 hidden lg:block" />

            <div className="pl-6 pt-10 pr-8">
                <div className="font-grotesk font-black text-4xl text-[#FF3300] mb-3">{item.year}</div>
                <div className="font-mono text-xs text-[#E4E3DB]/80 font-bold leading-relaxed">{item.text}</div>
            </div>
        </div>
    );
};
