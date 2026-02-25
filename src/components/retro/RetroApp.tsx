"use client";

import React, { useState, useEffect } from 'react';
import { BootScreen } from './BootScreen';
import { Sidebar } from './Sidebar';
import { CustomCursor } from './CustomCursor';
import { NoiseOverlay } from './BasicElements';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductView } from './views/ProductView';
import { ProcurementView } from './views/ProcurementView';
import { TechSpecsView } from './views/TechSpecsView';
import { PlantCapView } from './views/PlantCapView';
import { CertRegistryView } from './views/CertRegistryView';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RetroApp() {
    const [booting, setBooting] = useState(true);
    const [activeView, setActiveView] = useState('HOME');
    const [isGlitching, setIsGlitching] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [time, setTime] = useState('00:00:00');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const handleNav = (id: string) => {
        if (id === activeView) return;
        setMobileMenu(false);
        setActiveView(id);
        window.scrollTo(0, 0);
    };

    if (booting) {
        return <BootScreen onComplete={() => setBooting(false)} />;
    }

    return (
        <div className="min-h-screen bg-[#E4E3DB] text-[#0F0F0F] selection:bg-[#FF3300] selection:text-[#E4E3DB] overflow-x-hidden font-mono">
            <NoiseOverlay />
            <CustomCursor />

            <Sidebar
                activeView={activeView}
                handleNav={handleNav}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                time={time}
            />

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 w-full z-30 bg-[#0F0F0F] text-[#E4E3DB] p-4 flex justify-between items-center font-mono text-sm font-bold tracking-widest border-b-4 border-[#FF3300]">
                <span className="flex items-center">
                    <div className="w-3 h-3 bg-[#FF3300] mr-2 border border-[#E4E3DB]" />
                    ASIAN_SYS
                </span>
                <button
                    onClick={() => setMobileMenu(true)}
                    className="flex items-center gap-2 border-4 border-[#0F0F0F] px-4 py-2 bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#FF3300] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-none"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <main className={`transition-all duration-300 lg:ml-[320px] min-h-screen relative pt-16 lg:pt-0`}>
                {/* Fixed z-index right edge red marquee bar */}
                <div className="hidden 2xl:block fixed right-0 top-0 h-full w-12 border-l-4 border-[#0F0F0F] bg-[#FF3300] z-20 overflow-hidden">
                    <div
                        className="font-grotesk font-black text-2xl text-[#0F0F0F] whitespace-nowrap rotate-90 animate-[marquee_15s_linear_infinite] w-[200vh] absolute"
                        style={{ transformOrigin: 'left center', left: '50%', top: '50%' }}
                    >
                        ASIAN WIRES /// SYSTEM ONLINE /// INDUSTRIAL GRADE /// ZERO HALOGEN /// ASIAN WIRES ///
                    </div>
                </div>

                <div className="pr-0 2xl:pr-12 w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeView === 'HOME' && (
                            <motion.div
                                key="HOME"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <HomeView handleNav={handleNav} toggleGlitch={setIsGlitching} mousePos={mousePos} />
                            </motion.div>
                        )}
                        {activeView === 'CATALOG' && (
                            <motion.div
                                key="CATALOG"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <CatalogView handleNav={handleNav} mousePos={mousePos} setSelectedProduct={setSelectedProduct} />
                            </motion.div>
                        )}
                        {activeView === 'PRODUCT' && (
                            <motion.div
                                key="PRODUCT"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ProductView handleNav={handleNav} product={selectedProduct} />
                            </motion.div>
                        )}
                        {activeView === 'PROCUREMENT' && (
                            <motion.div
                                key="PROCUREMENT"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ProcurementView handleNav={handleNav} />
                            </motion.div>
                        )}
                        {activeView === 'SPECS' && (
                            <motion.div
                                key="SPECS"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <TechSpecsView handleNav={handleNav} />
                            </motion.div>
                        )}
                        {activeView === 'PLANT' && (
                            <motion.div
                                key="PLANT"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <PlantCapView handleNav={handleNav} />
                            </motion.div>
                        )}
                        {activeView === 'CERTS' && (
                            <motion.div
                                key="CERTS"
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px) grayscale(100%)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px) grayscale(0%)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(100%)' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <CertRegistryView handleNav={handleNav} />
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
