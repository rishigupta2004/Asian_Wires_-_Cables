import React, { useEffect, useState } from 'react';
import { X, Mail, Phone, MapPin, Globe } from 'lucide-react';
import AsianCard from './InteractiveCard';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [shouldRender, setRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setRender(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setRender(false);
    };

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto overflow-hidden cursor-none"
            style={{ animation: isOpen ? "modalFadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards" : "modalFadeOut 0.4s ease-in forwards" }}
            onAnimationEnd={handleAnimationEnd}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes modalFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(30px); } }
                @keyframes modalFadeOut { from { opacity: 1; backdrop-filter: blur(30px); } to { opacity: 0; backdrop-filter: blur(0px); } }
                @keyframes slideUpLayer { from { transform: translateY(80px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}} />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#1C1C19]/80 z-0" onClick={onClose} />

            {/* Content */}
            <div 
                className="relative z-10 w-full max-w-6xl h-full md:h-auto max-h-[90vh] flex flex-col md:flex-row items-center justify-center p-6 md:p-16 gap-12 md:gap-20"
                style={{ animation: isOpen ? "slideUpLayer 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.1s" : "", opacity: 0 }}
            >
                
                {/* 3D Card — strictly constrained */}
                <div className="w-full max-w-[380px] h-[520px] md:max-w-[440px] md:h-[620px] flex items-center justify-center relative shrink-0">
                    <div className="absolute inset-0 bg-[#FF4A1C] blur-[150px] opacity-20 rounded-full pointer-events-none" />
                    <AsianCard />
                </div>

                {/* Directory — real contact data */}
                <div className="flex flex-col gap-8 w-full max-w-md" style={{ animation: isOpen ? "slideUpLayer 0.8s cubic-bezier(0.16,1,0.3,1) forwards 0.25s" : "", opacity: 0 }}>
                    <div>
                        <h2 className="font-grotesk font-black tracking-[-0.04em] leading-[0.85] uppercase text-[#F4F0EB] mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                            Executive<br /><span className="text-[#FF4A1C]">Directory.</span>
                        </h2>
                        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#F4F0EB]/40 font-bold">Asian Computeronics & Electronics</p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[#F4F0EB]/10 pt-8">
                        {[
                            { icon: Mail, label: 'Direct Encrypted', value: 'brijasian@gmail.com' },
                            { icon: Phone, label: 'Global Desk', value: '+91-9811733043' },
                            { icon: MapPin, label: 'HQ Routing', value: 'Delhi, India' },
                            { icon: Globe, label: 'Official Portal', value: 'TAARWALE.IN' },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F4F0EB]/5 transition-colors cursor-none">
                                    <div className="p-3 bg-[#FF4A1C]/15 text-[#FF4A1C] rounded-full group-hover:bg-[#FF4A1C] group-hover:text-white transition-all duration-500">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#F4F0EB]/30 font-bold mb-0.5">{item.label}</span>
                                        <span className="font-inter font-medium text-sm tracking-tight text-[#F4F0EB]">{item.value}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-3 md:p-4 rounded-full bg-[#F4F0EB]/5 hover:bg-[#F4F0EB]/15 transition-all duration-300 cursor-none group"
            >
                <X className="w-5 h-5 text-[#F4F0EB] group-hover:rotate-90 transition-transform duration-500" />
            </button>
        </div>
    );
};
