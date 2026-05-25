import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactModal } from './ContactModal';

interface NavbarProps {
    activeView: string;
    handleNav: (id: string) => void;
}

export const Navbar = ({ activeView, handleNav }: NavbarProps) => {
    const [contactOpen, setContactOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const navItems = [
        { id: 'HOME', label: 'Overview' },
        { id: 'CATALOG', label: 'Catalog' },
        { id: 'PROCUREMENT', label: 'B2B' },
        { id: 'SPECS', label: 'Tech Data' },
    ];

    const logos = [
        { src: "/Assests/Brand_Logo/PRO_ASIAN.png", alt: "PRO ASIAN" },
        { src: "/Assests/Brand_Logo/True_MAster.png", alt: "TRUE MASTER" },
        { src: "/Assests/Brand_Logo/M1_VOICE.png", alt: "M1 VOICE" }
    ];

    return (
        <>
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-40 h-20 md:h-24 transition-all duration-700"
            >
                {/* Glass background — extremely subtle */}
                <div className="absolute inset-0 bg-[#F4F0EB]/80 backdrop-blur-md border-b border-[#1C1C19]/[0.04]" />
                
                <div className="relative w-full h-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-32 flex items-center justify-between">
                    
                    {/* Brand */}
                    <div className="flex items-center gap-6 md:cursor-pointer" onClick={() => handleNav('HOME')}>
                        <div className="flex items-center gap-6 md:gap-8 h-14 md:h-20">
                            {logos.map((logo, i) => (
                                <motion.img 
                                    key={logo.alt}
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="h-[75%] md:h-[90%] w-auto object-contain drop-shadow-sm" 
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.7, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item, i) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => handleNav(item.id)}
                                className={`relative font-mono text-[10px] tracking-[0.25em] font-bold uppercase py-2 md:cursor-pointer transition-colors duration-500 ${
                                    activeView === item.id
                                        ? 'text-[#1C1C19]'
                                        : 'text-[#1C1C19]/30 hover:text-[#1C1C19]/60'
                                }`}
                            >
                                {item.label}
                                {activeView === item.id && (
                                    <motion.span 
                                        layoutId="activeNavIndicator"
                                        className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#FF4A1C] rounded-full" 
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setContactOpen(true)}
                            className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1C1C19] text-[#F4F0EB] hover:bg-[#FF4A1C] transition-colors duration-500 font-mono text-[10px] uppercase font-bold tracking-[0.2em] md:cursor-pointer shadow-lg hover:shadow-xl"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4F0EB] opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F4F0EB]" />
                            </span>
                            Contact
                        </motion.button>

                        <button 
                            className="lg:hidden p-3 rounded-full bg-[#1C1C19]/[0.04] md:cursor-pointer"
                            onClick={() => setMobileMenu(true)}
                        >
                            <Menu className="w-5 h-5 text-[#1C1C19]" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile slide-out */}
            <AnimatePresence>
                {mobileMenu && (
                    <div className="fixed inset-0 z-50 pointer-events-auto">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-[#1C1C19]/30 backdrop-blur-sm" 
                            onClick={() => setMobileMenu(false)} 
                        />
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#F4F0EB] border-l border-[#1C1C19]/5 shadow-2xl"
                        >
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-20">
                                    <span className="font-mono text-[10px] tracking-[0.4em] font-bold text-[#1C1C19]/30 uppercase">Menu</span>
                                    <button onClick={() => setMobileMenu(false)} className="p-3 rounded-full bg-[#1C1C19]/[0.04] md:cursor-pointer">
                                        <X className="w-5 h-5 text-[#1C1C19]" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {navItems.map((item, i) => (
                                        <motion.button
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.4 }}
                                            onClick={() => {
                                                handleNav(item.id);
                                                setMobileMenu(false);
                                            }}
                                            className={`text-left font-grotesk font-black text-5xl uppercase tracking-tighter md:cursor-pointer hover:text-[#FF4A1C] transition-colors duration-300 ${
                                                activeView === item.id ? 'text-[#1C1C19]' : 'text-[#1C1C19]/15'
                                            }`}
                                        >
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { setMobileMenu(false); setContactOpen(true); }}
                                        className="w-full py-5 rounded-full bg-[#FF4A1C] text-white font-mono uppercase text-[10px] font-bold tracking-[0.2em] md:cursor-pointer shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        Contact Directory
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
};
