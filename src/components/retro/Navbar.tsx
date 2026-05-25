import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
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

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-40 h-20 md:h-24 transition-all duration-700">
                {/* Glass background — extremely subtle */}
                <div className="absolute inset-0 bg-[#F4F0EB]/80 backdrop-blur-md border-b border-[#1C1C19]/[0.04]" />
                
                <div className="relative w-full h-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-32 flex items-center justify-between">
                    
                    {/* Brand */}
                    <div className="flex items-center gap-6 md:cursor-none" onClick={() => handleNav('HOME')}>
                        <div className="flex gap-6 sm:gap-8 shrink-0 h-16 sm:h-20 md:h-24 py-2">
                            <img src="/Assests/Brand_Logo/PRO_ASIAN.png" alt="PRO ASIAN" className="h-full object-contain transition-transform duration-500 hover:scale-105 drop-shadow-sm" />
                            <img src="/Assests/Brand_Logo/True_MAster.png" alt="TRUE MASTER" className="h-full object-contain transition-transform duration-500 hover:scale-105 drop-shadow-sm" />
                            <img src="/Assests/Brand_Logo/M1_VOICE.png" alt="M1 VOICE" className="h-full object-contain transition-transform duration-500 hover:scale-105 drop-shadow-sm" />
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`relative font-mono text-[10px] tracking-[0.25em] font-bold uppercase py-2 md:cursor-none transition-all duration-500 ${
                                    activeView === item.id
                                        ? 'text-[#1C1C19]'
                                        : 'text-[#1C1C19]/30 hover:text-[#1C1C19]/60'
                                }`}
                            >
                                {item.label}
                                {activeView === item.id && (
                                    <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#FF4A1C] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setContactOpen(true)}
                            className="hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1C1C19] text-[#F4F0EB] hover:bg-[#FF4A1C] transition-colors duration-500 font-mono text-[10px] uppercase font-bold tracking-[0.2em] md:cursor-none"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4F0EB] opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F4F0EB]" />
                            </span>
                            Contact
                        </button>

                        <button 
                            className="lg:hidden p-3 rounded-full bg-[#1C1C19]/[0.04] md:cursor-none"
                            onClick={() => setMobileMenu(true)}
                        >
                            <Menu className="w-5 h-5 text-[#1C1C19]" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile slide-out */}
            <div className={`fixed inset-0 z-50 transition-all duration-700 ${mobileMenu ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div className={`absolute inset-0 bg-[#1C1C19]/30 backdrop-blur-sm transition-opacity duration-500 ${mobileMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenu(false)} />
                <div className={`absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#F4F0EB] border-l border-[#1C1C19]/5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-20">
                            <span className="font-mono text-[10px] tracking-[0.4em] font-bold text-[#1C1C19]/30 uppercase">Menu</span>
                            <button onClick={() => setMobileMenu(false)} className="p-3 rounded-full bg-[#1C1C19]/[0.04] md:cursor-none">
                                <X className="w-5 h-5 text-[#1C1C19]" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        handleNav(item.id);
                                        setMobileMenu(false);
                                    }}
                                    className={`text-left font-grotesk font-black text-5xl uppercase tracking-tighter md:cursor-none hover:text-[#FF4A1C] transition-colors duration-300 ${
                                        activeView === item.id ? 'text-[#1C1C19]' : 'text-[#1C1C19]/15'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto">
                            <button
                                onClick={() => { setMobileMenu(false); setContactOpen(true); }}
                                className="w-full py-5 rounded-full bg-[#FF4A1C] text-white font-mono uppercase text-[10px] font-bold tracking-[0.2em] md:cursor-none"
                            >
                                Contact Directory
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
};
