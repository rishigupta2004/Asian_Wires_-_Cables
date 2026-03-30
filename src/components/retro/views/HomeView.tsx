"use client";

import React, { useRef, useEffect, useState } from 'react';
import { ArrowDownRight, Factory, Radio, Cpu, Satellite, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WireCoilHero3D = dynamic(() => import('../WireCoilHero3D').then(mod => mod.default), { 
    ssr: false, 
    loading: () => <div className="w-full h-full bg-[#1C1C19]/5 rounded-full animate-pulse" /> 
});

interface HomeViewProps {
    handleNav: (id: string) => void;
}

// ─── Scramble Text Effect ───────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function useScrambleText(
    ref: React.RefObject<HTMLElement | null>,
    finalText: string,
    delay = 0,
    disabled = false
) {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        if (disabled) {
            el.textContent = finalText;
            return;
        }

        let frame = 0;
        const totalFrames = 20;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        const timeout = setTimeout(() => {
            intervalId = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const scrambled = finalText.split('').map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i / finalText.length < progress) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join('');
                el.textContent = scrambled;
                if (frame >= totalFrames) {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    el.textContent = finalText;
                }
            }, 40);
        }, delay);
        return () => {
            clearTimeout(timeout);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [ref, finalText, delay, disabled]);
}

export const HomeView = ({ handleNav }: HomeViewProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const magneticBtnRef = useRef<HTMLButtonElement>(null);
    const scramble1 = useRef<HTMLDivElement>(null);
    const scramble2 = useRef<HTMLDivElement>(null);
    const scramble3 = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hasFinePointer, setHasFinePointer] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const enableHeavyVisuals = !prefersReducedMotion && !isMobile;

    // Scramble text reveals
    useScrambleText(scramble1, 'PRECISION.', 400, prefersReducedMotion);
    useScrambleText(scramble2, 'POWER.', 600, prefersReducedMotion);
    useScrambleText(scramble3, 'PURE.', 800, prefersReducedMotion);

    useEffect(() => {
        const mobileQuery = window.matchMedia('(max-width: 767px)');
        const pointerQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
        const updateState = () => {
            setIsMobile(mobileQuery.matches);
            setHasFinePointer(pointerQuery.matches);
        };

        updateState();
        mobileQuery.addEventListener('change', updateState);
        pointerQuery.addEventListener('change', updateState);

        return () => {
            mobileQuery.removeEventListener('change', updateState);
            pointerQuery.removeEventListener('change', updateState);
        };
    }, []);

    // Magnetic Button Physics
    useEffect(() => {
        if (prefersReducedMotion || !hasFinePointer || isMobile) return;

        const btn = magneticBtnRef.current;
        if (!btn) return;

        const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const onMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = btn.getBoundingClientRect();
            xTo((clientX - (left + width / 2)) * 0.35);
            yTo((clientY - (top + height / 2)) * 0.35);
        };
        const onLeave = () => { xTo(0); yTo(0); };

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        return () => {
            btn.removeEventListener("mousemove", onMove);
            btn.removeEventListener("mouseleave", onLeave);
        };
    }, [prefersReducedMotion, hasFinePointer, isMobile]);

    useGSAP(() => {
        if (!enableHeavyVisuals) {
            return;
        }

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // ─── HERO ENTRANCE ─────────────────────────────────────
            const tl = gsap.timeline();
            tl.fromTo(".hero-line",
                { yPercent: 130, rotateX: -40, opacity: 0 },
                { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.8, stagger: 0.12, ease: "expo.out", delay: 0.1 }
            )
            .fromTo(".hero-sub",
                { opacity: 0, y: 80, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, "-=1.4"
            )
            .fromTo(".hero-3d-wrap",
                { opacity: 0, scale: 0.7 },
                { opacity: 1, scale: 1, duration: 2.5, ease: "expo.out" }, "-=1.8"
            )
            .fromTo(".hero-cta",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.5"
            );

            // ─── PARALLAX IMAGE SECTIONS ───────────────────────────
            gsap.utils.toArray('.img-parallax-container').forEach((container: any) => {
                const img = container.querySelector('.img-parallax');
                if (!img) return;
                gsap.fromTo(img,
                    { yPercent: -15 },
                    {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                        }
                    }
                );
            });

            // ─── STATEMENT SECTION WIPE ────────────────────────────
            gsap.utils.toArray('.text-wipe').forEach((el: any) => {
                gsap.fromTo(el,
                    { clipPath: 'inset(0 100% 0 0)' },
                    {
                        clipPath: 'inset(0 0% 0 0)',
                        duration: 2,
                        ease: "expo.inOut",
                        scrollTrigger: { trigger: el, start: "top 80%" }
                    }
                );
            });

            // ─── SECTOR ROWS STAGGER ───────────────────────────────
            gsap.utils.toArray('.sector-row').forEach((row: any) => {
                gsap.fromTo(row,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: { trigger: row, start: "top 85%" }
                    }
                );
            });

            // ─── DARK INVERSION (StringTune signature) ─────────────
            ScrollTrigger.create({
                trigger: ".dark-invert-trigger",
                start: "top 50%",
                end: "bottom 40%",
                onEnter: () => gsap.to(containerRef.current, { backgroundColor: "#1C1C19", color: "#F4F0EB", duration: 1.5, ease: "power3.inOut" }),
                onLeaveBack: () => gsap.to(containerRef.current, { backgroundColor: "#F4F0EB", color: "#1C1C19", duration: 1.5, ease: "power3.inOut" }),
            });

            // ─── FOOTER CTA REVEAL ─────────────────────────────────
            gsap.fromTo(".footer-cta",
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: { trigger: ".footer-cta", start: "top 90%" }
                }
            );
        });

        return () => mm.revert();
    }, { scope: containerRef, dependencies: [enableHeavyVisuals] });

    return (
        <div
            ref={containerRef}
            className="w-full flex flex-col relative bg-[#F4F0EB] text-[#1C1C19]"
            style={{
                perspective: '1200px',
                backgroundImage:
                    'radial-gradient(circle at 80% 45%, rgba(255,74,28,0.07), transparent 44%), radial-gradient(circle at 22% 72%, rgba(28,28,25,0.04), transparent 52%)'
            }}
        >

            {/* ═══════════════════════════════════════════════════════════
                HERO — Center-Weighted Monumental Typography
                The 3D element floats BEHIND the text in a separate z-plane.
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
                
                {/* 3D Element — positioned absolutely BEHIND text, extremely subtle */}
                {enableHeavyVisuals && (
                    <div className="hero-3d-wrap absolute bottom-0 right-0 w-[42vw] h-[42vw] max-w-[520px] max-h-[520px] z-0 pointer-events-none translate-x-[9%] translate-y-[10%]">
                        <div className="absolute inset-0 bg-[#FF4A1C] rounded-full blur-[160px] opacity-14" />
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.45),rgba(255,255,255,0)_62%)]" />
                        <WireCoilHero3D onAnatomyClick={() => {}} />
                    </div>
                )}

                {/* Content — sits on top with massive z-index */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
                    
                    {/* Subtitle chip */}
                    <div className="hero-sub inline-flex items-center gap-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold mb-12 text-[#1C1C19]/50">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4A1C] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4A1C]" />
                        </span>
                        Since 1953 — Industrial Grade
                    </div>

                    {/* Massive Typography Block */}
                    <h1 className="font-grotesk font-black leading-[0.82] tracking-[-0.06em] uppercase" style={{ fontSize: 'clamp(3rem, 16vw, 14rem)' }}>
                        <div className="overflow-hidden"><div ref={scramble1} className="hero-line origin-bottom-left pb-2">&nbsp;</div></div>
                        <div className="overflow-hidden"><div ref={scramble2} className="hero-line origin-bottom-left pb-2">&nbsp;</div></div>
                        <div className="overflow-hidden"><div ref={scramble3} className="hero-line origin-bottom-left text-[#FF4A1C] pb-2">&nbsp;</div></div>
                    </h1>

                    {/* Description */}
                    <p className="hero-sub font-inter text-base md:text-xl lg:text-2xl font-light leading-[1.6] tracking-tight text-[#1C1C19]/50 max-w-2xl mt-16 mb-16">
                        Forging advanced architectural cables for defense, telecom, and massive-scale data centers with absolute zero defect tolerance.
                    </p>

                    {/* CTA — Magnetic */}
                    <div className="hero-cta">
                        <button
                            ref={magneticBtnRef}
                            onClick={() => handleNav('CATALOG')}
                            className="group relative flex items-center gap-6 bg-[#1C1C19] text-[#F4F0EB] px-8 py-4 md:px-14 md:py-6 rounded-full hover:bg-[#FF4A1C] transition-colors duration-700 will-change-transform md:cursor-none"
                        >
                            <span className="font-grotesk font-black text-sm md:text-base uppercase tracking-[0.15em]">Explore Catalog</span>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                <ArrowDownRight className="w-5 h-5" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#1C1C19]/30 to-[#1C1C19]/10 animate-pulse" />
                    <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#1C1C19]/30 font-bold">Scroll</span>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                MONUMENTAL STATEMENT + PARALLAX IMAGE
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full py-48 md:py-64 px-6 md:px-16 lg:px-32">
                <div className="max-w-[1600px] mx-auto mb-24 md:mb-40">
                    <h2 className="text-wipe font-grotesk font-black leading-[0.85] tracking-[-0.05em] uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 10rem)', color: 'inherit' }}>
                        BEYOND <br /><span className="opacity-15">COMMODITY.</span>
                    </h2>
                </div>

                {/* Full-bleed Parallax Image */}
                <div className="img-parallax-container w-full h-[50vh] md:h-[85vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] relative">
                    <Image
                        src="/images/hero.webp"
                        alt="Industrial infrastructure wiring"
                        fill
                        sizes="100vw"
                        quality={100}
                        className="img-parallax w-full h-full object-contain absolute top-0 left-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C19] via-[#1C1C19]/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-10">
                        <p className="text-[#F4F0EB]/80 font-mono text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">Architectural Grade / Since 1953</p>
                    </div>
                    <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-10">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#F4F0EB]/30 flex items-center justify-center group hover:bg-[#F4F0EB] hover:border-[#F4F0EB] transition-all duration-500 md:cursor-none">
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#F4F0EB] group-hover:text-[#1C1C19] transition-colors" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                SECTORS — Dark Inversion Zone
               ═══════════════════════════════════════════════════════════ */}
            <section className="dark-invert-trigger relative w-full py-40 md:py-64 px-6 md:px-16 lg:px-32 z-10">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-32 md:mb-48">
                        <div className="font-mono text-xs uppercase tracking-[0.5em] font-bold mb-8 opacity-40">Industrial Sectors</div>
                        <h2 className="text-wipe font-grotesk font-black tracking-[-0.05em] leading-[0.85] uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 10rem)' }}>
                            WE POWER<br />THE UNSEEN.
                        </h2>
                    </div>

                    <div className="flex flex-col">
                        {[
                            { title: 'Data Centers', icon: Cpu, stat: '85K MT', desc: 'High-density power distribution cabling' },
                            { title: 'Heavy Plant', icon: Factory, stat: '1000V+', desc: 'Industrial-grade armoured power cables' },
                            { title: 'Telecom Towers', icon: Radio, stat: '0.01Db', desc: 'Ultra-low-loss signal transmission' },
                            { title: 'Aerospace', icon: Satellite, stat: 'Mil-Spec', desc: 'Defence-certified wiring harnesses' },
                        ].map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="sector-row group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-current/10 md:cursor-none overflow-hidden relative">
                                    {/* Hover fill — scales from bottom */}
                                    <div className="absolute inset-0 bg-[#FF4A1C] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-2xl" />

                                    <div className="flex items-center gap-6 md:gap-16 z-10 w-full md:w-auto group-hover:text-white transition-colors duration-500">
                                        <span className="font-mono text-lg md:text-2xl opacity-20 group-hover:opacity-100 font-bold tabular-nums transition-opacity duration-500">{(i + 1).toString().padStart(2, '0')}</span>
                                        <div>
                                            <h3 className="font-grotesk font-black text-3xl md:text-6xl lg:text-7xl uppercase tracking-tighter transition-transform duration-700 group-hover:translate-x-4">
                                                {s.title}
                                            </h3>
                                            <p className="font-inter text-xs md:text-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500 mt-1 tracking-tight">{s.desc}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 md:gap-10 z-10 mt-4 md:mt-0 group-hover:text-white transition-colors duration-500">
                                        <div className="font-mono text-xs md:text-sm tracking-[0.2em] font-bold uppercase py-2 px-6 rounded-full border border-current/20 group-hover:border-white/40 transition-colors duration-500">
                                            {s.stat}
                                        </div>
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF4A1C] group-hover:-rotate-45 group-hover:border-white transition-all duration-700">
                                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                FOOTER CTA — Massive closing statement
               ═══════════════════════════════════════════════════════════ */}
            <section className="relative w-full py-40 md:py-64 px-6 md:px-16 lg:px-32 z-10">
                <div className="footer-cta max-w-[1600px] mx-auto flex flex-col items-center text-center">
                    <h2 className="font-grotesk font-black tracking-[-0.05em] leading-[0.85] uppercase mb-16" style={{ fontSize: 'clamp(2rem, 8vw, 8rem)' }}>
                        READY TO<br /><span className="text-[#FF4A1C]">INTEGRATE?</span>
                    </h2>
                    <button
                        onClick={() => handleNav('CATALOG')}
                        className="group flex items-center gap-6 bg-[#FF4A1C] text-white px-8 py-5 md:px-16 md:py-7 rounded-full hover:bg-[#1C1C19] transition-colors duration-700 md:cursor-none"
                    >
                        <span className="font-grotesk font-black text-sm md:text-lg uppercase tracking-[0.15em]">View Full Catalog</span>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-700">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-current/30 mt-12 font-bold">
                        Asian Computeronics & Electronics — Est. 1953 — Delhi, India
                    </p>
                </div>
            </section>

        </div>
    );
};
