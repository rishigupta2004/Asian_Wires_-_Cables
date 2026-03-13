"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FounderPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FounderPopup = ({ isOpen, onClose }: FounderPopupProps) => {
    const handleClickOutside = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'founder-popup-overlay') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, handleClickOutside]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    id="founder-popup-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0F0F]/80 backdrop-blur-sm cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-[90%] max-w-lg bg-[#E4E3DB] border-4 border-[#0F0F0F] shadow-[12px_12px_0px_#FF3300] cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[#0F0F0F] text-[#E4E3DB] p-4 border-b-4 border-[#FF3300] flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-[#FF3300] border border-[#E4E3DB]" />
                                <h2 className="font-mono text-sm font-bold tracking-widest uppercase">
                                    SYSTEM ADMINISTRATOR
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-[#FF3300] border-2 border-[#E4E3DB] p-1 hover:bg-[#E4E3DB] hover:text-[#FF3300] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 font-mono text-sm">
                            {/* Decorative ASCII header */}
                            <div className="text-[#FF3300] text-xs mb-6 opacity-60 whitespace-pre">
{`╔══════════════════════════════════╗
║     CREATOR INFORMATION v1.0     ║
╚══════════════════════════════════╝`}
                            </div>

                            <div className="space-y-4">
                                <div className="border-l-4 border-[#FF3300] pl-4">
                                    <p className="text-[#0F0F0F] font-bold mb-1">NAME:</p>
                                    <p className="text-[#FF3300] font-black tracking-wider">
                                        BRIJS ASIAN
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#FF3300] pl-4">
                                    <p className="text-[#0F0F0F] font-bold mb-1">DESIGNATION:</p>
                                    <p className="text-[#0F0F0F]">
                                        Founder & Managing Director
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#FF3300] pl-4">
                                    <p className="text-[#0F0F0F] font-bold mb-1">ORGANIZATION:</p>
                                    <p className="text-[#0F0F0F]">
                                        Aisan Computeronics & Electronics
                                    </p>
                                    <p className="text-[#0F0F0F]/60 text-xs">
                                        Delhi, India
                                    </p>
                                </div>

                                <div className="border-l-4 border-[#FF3300] pl-4">
                                    <p className="text-[#0F0F0F] font-bold mb-1">SYSTEM STATUS:</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#10B981] animate-pulse" />
                                        <span className="text-[#10B981] font-bold">ACTIVE</span>
                                    </div>
                                </div>

                                <div className="border-l-4 border-[#FF3300] pl-4">
                                    <p className="text-[#0F0F0F] font-bold mb-1">CONTACT:</p>
                                    <a 
                                        href="mailto:brijasian@gmail.com" 
                                        className="text-[#FF3300] hover:underline block"
                                    >
                                        brijasian@gmail.com
                                    </a>
                                    <span className="text-[#0F0F0F] block">+91 98117 33043</span>
                                </div>
                            </div>

                            {/* Footer decorative element */}
                            <div className="mt-6 pt-4 border-t-2 border-[#0F0F0F]/20">
                                <div className="flex justify-between items-center text-xs text-[#0F0F0F]/50">
                                    <span>© 1998-2026 AISAN_SYS</span>
                                    <span className="font-grotesk">ALL RIGHTS RESERVED</span>
                                </div>
                            </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-4 border-t-4 border-[#FF3300]" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-4 border-t-4 border-[#FF3300]" />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-4 border-b-4 border-[#FF3300]" />
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-4 border-b-4 border-[#FF3300]" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
