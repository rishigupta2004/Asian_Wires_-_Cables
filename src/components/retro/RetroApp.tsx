"use client";

import React, { useState, useEffect } from 'react';
import { BootScreen } from './BootScreen';
import { Navbar } from './Navbar';
import { CustomCursor } from './CustomCursor';
import { NoiseOverlay } from './BasicElements';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useReducedMotion as useMotionReduced } from 'framer-motion';
// @ts-ignore
import Lenis from 'lenis';

const LoadingPlaceholder = () => (
    <div className="min-h-screen bg-[#F4F0EB] flex items-center justify-center w-full">
        <div className="w-12 h-12 border-2 border-[#1C1C19]/10 border-t-[#FF4A1C] animate-spin rounded-full" />
    </div>
);

const HomeView = dynamic(() => import('./views/HomeView').then(mod => mod.HomeView), { loading: LoadingPlaceholder });
const CatalogView = dynamic(() => import('./views/CatalogView').then(mod => mod.CatalogView), { loading: LoadingPlaceholder });
const ProductView = dynamic(() => import('./views/ProductView').then(mod => mod.ProductView), { loading: LoadingPlaceholder });
const ProcurementView = dynamic(() => import('./views/ProcurementView').then(mod => mod.ProcurementView), { loading: LoadingPlaceholder });
const TechSpecsView = dynamic(() => import('./views/TechSpecsView').then(mod => mod.TechSpecsView), { loading: LoadingPlaceholder });

export default function RetroApp() {
    const [booting, setBooting] = useState(true);
    const [activeView, setActiveView] = useState('HOME');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDesktopPointer, setIsDesktopPointer] = useState(false);
    const prefersReducedMotion = useMotionReduced();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (hover: hover)');
        const updatePointerState = () => {
            setIsDesktopPointer(mediaQuery.matches);
        };

        updatePointerState();
        mediaQuery.addEventListener('change', updatePointerState);

        return () => {
            mediaQuery.removeEventListener('change', updatePointerState);
        };
    }, []);

    // Lenis smooth scrolling on capable desktop pointers only.
    useEffect(() => {
        if (prefersReducedMotion || !isDesktopPointer) {
            return;
        }

        const lenis = new Lenis({
            smoothWheel: true,
            syncTouch: true,
            touchMultiplier: 1,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
        
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [prefersReducedMotion, isDesktopPointer]);

    const pageTransition = prefersReducedMotion
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { duration: 0.15 } },
            exit: { opacity: 0, transition: { duration: 0.1 } },
        }
        : {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
            exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
        };

    const handleNav = (id: string) => {
        if (id === activeView) return;
        setActiveView(id);
        window.scrollTo(0, 0);
    };

    if (booting) {
        return <BootScreen onComplete={() => setBooting(false)} />;
    }

    return (
        <div className={`w-full min-h-screen bg-[#F4F0EB] text-[#1C1C19] selection:bg-[#FF4A1C] selection:text-white antialiased ${isDesktopPointer ? 'cursor-none' : 'cursor-auto'}`}>
            
            {/* Global Custom Physics Cursor */}
            {isDesktopPointer && <CustomCursor />}
            
            {/* Cinematic Film Grain Overlay */}
            {!prefersReducedMotion && isDesktopPointer && <NoiseOverlay />}

            <Navbar activeView={activeView} handleNav={handleNav} />

            {/* Main Full-Width Content Area */}
            <main className="w-full min-h-screen relative pt-20 md:pt-24 z-10">
                <AnimatePresence mode="wait">
                    {activeView === 'HOME' && (
                        <motion.div key="HOME" {...pageTransition}>
                            <HomeView handleNav={handleNav} />
                        </motion.div>
                    )}
                    {activeView === 'CATALOG' && (
                        <motion.div key="CATALOG" {...pageTransition}>
                            <CatalogView handleNav={handleNav} setSelectedProduct={setSelectedProduct} />
                        </motion.div>
                    )}
                    {activeView === 'PRODUCT' && (
                        <motion.div key="PRODUCT" {...pageTransition}>
                            <ProductView handleNav={handleNav} product={selectedProduct} />
                        </motion.div>
                    )}
                    {activeView === 'PROCUREMENT' && (
                        <motion.div key="PROCUREMENT" {...pageTransition}>
                            <ProcurementView handleNav={handleNav} />
                        </motion.div>
                    )}
                    {activeView === 'SPECS' && (
                        <motion.div key="SPECS" {...pageTransition}>
                            <TechSpecsView handleNav={handleNav} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
