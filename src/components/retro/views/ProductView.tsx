import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Zap, Shield, Cpu } from 'lucide-react';
import Image from 'next/image';
import { BRANDS } from '../../../lib/constants';
import { CableDrumSVG } from '../';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { getOptimizedCatalogImageSrc } from '@/lib/image-paths';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const ProductView = ({ handleNav, product }: any) => {
    const [activeTab, setActiveTab] = useState('SPECS');
    const prefersReducedMotion = useReducedMotion();
    const productImage = getOptimizedCatalogImageSrc(product?.image || '/images/product-1.webp');
    const productImages = product?.images?.length ? product.images : [product?.image || '/images/product-1.webp'];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex(prev => (prev + 1) % productImages.length);
    const prevImage = () => setCurrentIndex(prev => (prev - 1 + productImages.length) % productImages.length);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const magneticBtnRef = React.useRef<HTMLButtonElement>(null);
    const [hasFinePointer, setHasFinePointer] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
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
    React.useEffect(() => {
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
        if (prefersReducedMotion) return;

        // Header clip reveal
        const tl = gsap.timeline();
        tl.fromTo('.pt-title-clip',
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.out' }
        ).fromTo('.pt-desc',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
            "-=1"
        );

        // Sub-elements floating in
        gsap.fromTo('.pt-sub',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );

        // Scroll Parallax for primary image
        gsap.fromTo('.pt-parallax-img',
            { scale: 1.15, yPercent: -10 },
            { 
                scale: 1, yPercent: 10, 
                ease: 'none', 
                scrollTrigger: { 
                    trigger: '.pt-image-container', 
                    start: 'top bottom', 
                    end: 'bottom top', 
                    scrub: 1.5 
                } 
            }
        );

        // Stagger list items in
        gsap.utils.toArray('.pt-spec-row').forEach((row: any, i: number) => {
            gsap.fromTo(row,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: containerRef, dependencies: [activeTab, prefersReducedMotion] });

    // Fallback if accessed directly without selection
    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen text-[#1C1C19] font-mono p-8 bg-[#F4F0EB]">
                <div className="border border-[#1C1C19]/10 p-12 text-center rounded-[2rem]">
                    <h2 className="text-2xl font-black mb-4 font-grotesk tracking-tighter uppercase">ERR_NO_DATA</h2>
                    <button onClick={() => handleNav('CATALOG')} className="bg-[#FF4A1C] text-white px-8 py-3 rounded-full hover:bg-[#1C1C19] transition-colors uppercase tracking-[0.2em] text-xs font-bold md:cursor-none">
                        RETURN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen flex flex-col w-full relative bg-[#F4F0EB] text-[#1C1C19] transition-colors duration-700 pb-24">

            {/* Sticky Minimal Top Bar */}
            <div className="sticky top-20 md:top-24 z-30 bg-[#F4F0EB]/90 backdrop-blur-sm border-b border-[#1C1C19]/[0.04] flex justify-between items-center px-6 md:px-16 lg:px-32 py-4 font-mono text-[10px] uppercase font-bold tracking-[0.2em]">
                <button
                    onClick={() => handleNav('CATALOG')}
                    className="flex items-center gap-2 hover:text-[#FF4A1C] transition-colors"
                >
                    <div className="p-2 rounded-full bg-[#1C1C19]/5 dark:bg-white/5">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Directory</span>
                </button>
                <div className="flex items-center gap-4 opacity-50">
                    <span>{product.id}</span>
                </div>
            </div>

            {/* Fluid Split Layout */}
            <div className="flex flex-col lg:flex-row w-full max-w-[1920px] mx-auto px-4 md:px-12 mt-8 lg:mt-12 gap-12 lg:gap-24">

                {/* Left Side - Pure Imagery Edge-to-Edge feel */}
                <div className="lg:w-1/2 flex flex-col gap-6 relative">
                    {/* Main Image Feature */}
                    <div className="pt-image-container pt-sub w-full aspect-square md:aspect-[4/3] rounded-[2rem] md:rounded-[3rem] relative overflow-hidden bg-[#1C1C19]/5 group">
                        <div 
                            className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {productImages.map((img: string, idx: number) => {
                                const offset = (idx - currentIndex) * 50; 
                                return (
                                    <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                        <div 
                                            className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                            style={{ transform: `translateX(${offset}%)` }}
                                        >
                                            <Image
                                                src={getOptimizedCatalogImageSrc(img)}
                                                alt={`${product.type} view ${idx + 1}`}
                                                fill
                                                priority={idx === 0}
                                                quality={90}
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className={`pt-parallax-img w-full h-full object-contain object-center p-6 md:p-10 lg:p-14 ${prefersReducedMotion ? '' : 'transition-transform duration-700 group-hover:scale-[1.03]'}`}
                                                style={{ imageRendering: 'auto' }}
                                                draggable={false}
                                                onError={(e) => {
                                                    const el = e.currentTarget as HTMLImageElement;
                                                    if (el.dataset.fallback !== '1' && product?.image) {
                                                        el.dataset.fallback = '1';
                                                        el.src = product.image;
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {productImages.length > 1 && (
                            <>
                                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10 md:cursor-none">
                                    <ArrowLeft className="w-5 h-5 text-black" />
                                </button>
                                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-10 md:cursor-none">
                                    <ArrowRight className="w-5 h-5 text-black" />
                                </button>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {productImages.map((_: any, idx: number) => (
                                        <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 md:cursor-none ${currentIndex === idx ? 'bg-[#FF4A1C] w-4' : 'bg-black/30'}`} />
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C19]/20 to-transparent pointer-events-none" />
                        <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] font-bold text-white uppercase px-3 py-1 bg-[#1C1C19]/70 rounded-full z-10">
                            CAM_{String(currentIndex + 1).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Secondary Visuals / CAD representation */}
                    <div className="grid grid-cols-2 gap-6 pt-sub">
                        <div className="aspect-square rounded-[2rem] bg-[#1C1C19]/5 flex items-center justify-center p-8 relative overflow-hidden group">
                            <CableDrumSVG cableId={product.id} drumLength="1000m" drumDiameter="1" barrelWidth="2" />
                            <div className="absolute bottom-4 left-6 font-mono text-[9px] tracking-[0.2em] font-bold opacity-40 uppercase">Drum Spec</div>
                        </div>
                        <div className="aspect-square rounded-[2rem] bg-[#1C1C19]/5 flex items-center justify-center p-8 relative overflow-hidden">
                             {/* Abstract clean cross-section */}
                             <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                                <circle cx="100" cy="100" r="70" fill="none" stroke="#FF4A1C" strokeWidth="6" />
                                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <circle key={i} cx={100 + 40 * Math.cos(i * Math.PI / 3)} cy={100 + 40 * Math.sin(i * Math.PI / 3)} r="8" fill="currentColor" />
                                ))}
                            </svg>
                            <div className="absolute bottom-4 left-6 font-mono text-[9px] tracking-[0.2em] font-bold opacity-40 uppercase">Cross Sec</div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Typography & Specs */}
                <div className="lg:w-1/2 flex flex-col relative py-4 lg:py-8 lg:pr-12">
                    
                    {/* Header Details */}
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] font-bold uppercase text-[#FF4A1C] mb-6 pt-sub">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A1C] animate-pulse" />
                            {product.cat}
                        </div>
                        <h1 className="font-grotesk font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.85] tracking-tighter uppercase mb-6 pt-title-clip">
                            {product.type}
                        </h1>
                        <p className="font-inter pt-desc text-lg md:text-xl font-normal leading-relaxed text-[#1C1C19]/70 max-w-xl">
                            {product.desc}
                        </p>
                    </div>

                    {/* Clean Brand Block */}
                    {product.brand && (BRANDS as any)[product.brand] && (
                        <div className="pt-sub flex items-center gap-6 mb-16 p-6 md:p-8 rounded-[2rem] border border-[#1C1C19]/10 bg-white/60">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1C1C19] flex items-center justify-center shrink-0">
                                 <span className="font-grotesk font-black text-[#F4F4F0] text-sm md:text-lg uppercase text-center leading-none tracking-tighter mix-blend-difference">{product.brand.replace('_', '\n')}</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="font-mono text-[10px] tracking-[0.2em] text-[#FF4A1C] mb-2 font-bold uppercase">
                                    {(BRANDS as any)[product.brand].tagline}
                                </div>
                                <div className="font-inter font-medium text-sm md:text-base opacity-80 uppercase tracking-tight">
                                    {(BRANDS as any)[product.brand].shieldingLevel} — {(BRANDS as any)[product.brand].conductorGrade}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Spec Matrix - Premium Design */}
                    <div className="mb-16">
                        <div className="flex gap-8 mb-8 border-b border-[#1C1C19]/10 dark:border-white/10 font-mono text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
                            <button 
                                onClick={() => setActiveTab('SPECS')} 
                                className={`pb-4 relative transition-colors ${activeTab === 'SPECS' ? 'text-[#1C1C19] dark:text-white' : 'text-[#1C1C19]/40 dark:text-white/40 hover:text-[#1C1C19]/70 dark:hover:text-white/70'}`}
                            >
                                Tech Specs
                                {activeTab === 'SPECS' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4A1C]" />}
                            </button>
                            <button 
                                onClick={() => setActiveTab('ELEC')} 
                                className={`pb-4 relative transition-colors ${activeTab === 'ELEC' ? 'text-[#1C1C19] dark:text-white' : 'text-[#1C1C19]/40 dark:text-white/40 hover:text-[#1C1C19]/70 dark:hover:text-white/70'}`}
                            >
                                Electrical
                                {activeTab === 'ELEC' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4A1C]" />}
                            </button>
                        </div>

                        <div className="flex flex-col">
                            {activeTab === 'SPECS' && (
                                <div className="w-full flex flex-col gap-0 border-t border-[#1C1C19]/10 dark:border-white/10">
                                    {[
                                        { label: 'Core Material', val: product.core, icon: Cpu },
                                        { label: 'Insulation', val: product.specs.insulation, icon: Shield },
                                        { label: 'Armoring', val: product.specs.armor, icon: Shield },
                                        { label: 'Temperature', val: product.specs.temp, icon: Zap },
                                    ].map((spec, i) => {
                                        const Icon = spec.icon;
                                        return (
                                            <div key={i} className="pt-spec-row flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#1C1C19]/5 dark:border-white/5 group hover:bg-[#1C1C19]/[0.02] dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors">
                                                <div className="flex items-center gap-4 mb-2 md:mb-0">
                                                    <Icon className="w-4 h-4 opacity-30" />
                                                    <span className="font-mono text-xs tracking-widest uppercase opacity-50 font-bold">{spec.label}</span>
                                                </div>
                                                <span className="font-grotesk font-black text-xl md:text-2xl uppercase tracking-tighter">{spec.val}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            {activeTab === 'ELEC' && (
                                <div className="w-full flex flex-col gap-0 border-t border-[#1C1C19]/10 dark:border-white/10">
                                    {[
                                        { label: 'Square Area', val: product.area, icon: Zap },
                                        { label: 'Rated Current', val: product.rating, icon: Zap },
                                        { label: 'Op Voltage', val: product.volt, icon: Zap },
                                    ].map((spec, i) => {
                                        const Icon = spec.icon;
                                        return (
                                            <div key={i} className="pt-spec-row flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#1C1C19]/5 dark:border-white/5 group hover:bg-[#1C1C19]/[0.02] dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors">
                                                <div className="flex items-center gap-4 mb-2 md:mb-0">
                                                    <Icon className="w-4 h-4 opacity-30" />
                                                    <span className="font-mono text-xs tracking-widest uppercase opacity-50 font-bold">{spec.label}</span>
                                                </div>
                                                <span className={`font-grotesk font-black text-xl md:text-2xl uppercase tracking-tighter ${spec.label === 'Op Voltage' ? 'text-[#FF4A1C]' : ''}`}>{spec.val}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sticky Footer Actions */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-12 border-t border-[#1C1C19]/10 dark:border-white/10 pt-sub">
                        <button
                            ref={magneticBtnRef}
                            onClick={() => handleNav('PROCUREMENT')}
                            className={`flex-1 bg-[#1C1C19] text-[#EFECE6] dark:bg-[#EFECE6] dark:text-[#1C1C19] hover:bg-[#FF4A1C] dark:hover:bg-[#FF4A1C] hover:text-white font-mono font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase p-5 md:p-6 rounded-full flex items-center justify-center gap-4 transition-all duration-500 will-change-transform ${prefersReducedMotion ? '' : 'hover:scale-[1.02]'}`}
                        >
                            Request Integration <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
