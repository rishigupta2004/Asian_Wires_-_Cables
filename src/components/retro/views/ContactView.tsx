import React, { useState, useEffect } from 'react';
import { BlueprintGrid, GUIWindow } from '../';
import { ArrowUpRight } from 'lucide-react';

interface ContactViewProps {
    handleNav: (id: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ handleNav }) => {
    const [formState, setFormState] = useState({
        company: '',
        contact: '',
        email: '',
        phone: '',
        type: '',
        requirement: '',
        volume: ''
    });

    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const isBusinessHours = () => {
        const d = time.getUTCDay();
        const h = time.getUTCHours() + 5.5; // Rough IST approx
        if (d === 0) return false;
        if (d === 6) return h >= 9 && h < 14;
        return h >= 9 && h < 18;
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formState.company) errs.company = "REQUIRED_FIELD";
        if (!formState.contact) errs.contact = "REQUIRED_FIELD";
        if (!formState.email.match(/^\\S+@\\S+\\.\\S+$/)) errs.email = "INVALID_EMAIL";
        if (formState.phone.length < 10) errs.phone = "MIN_10_DIGITS";
        if (!formState.type) errs.type = "SELECT_TYPE";
        if (!formState.requirement) errs.requirement = "REQUIRED_FIELD";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setStatus('transmitting');

        setTimeout(() => {
            setStatus('success');
            setFormState({
                company: '',
                contact: '',
                email: '',
                phone: '',
                type: '',
                requirement: '',
                volume: ''
            });
        }, 1500);
    };

    const refId = "INQ-2024-" + Math.floor(1000 + Math.random() * 9000);

    return (
        <div className="min-h-screen bg-[#E4E3DB] relative text-[#0F0F0F] selection:bg-[#FF3300] selection:text-[#E4E3DB]">
            <BlueprintGrid />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col min-h-screen">
                <div className="flex-1 flex flex-col lg:flex-row shadow-[20px_0_0_#0F0F0F] border-x-4 border-[#0F0F0F] bg-[#E4E3DB]/80 backdrop-blur-sm">

                    {/* LEFT COLUMN: Contact Form */}
                    <div className="w-full lg:w-[55%] p-6 lg:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F]">
                        <GUIWindow title="INQUIRY_FORM.EXE">
                            <div className="bg-[#E4E3DB] p-6 lg:p-8 border-t-4 border-[#0F0F0F]">
                                {status === 'success' ? (
                                    <div className="bg-[#0000AA] border-4 border-[#0F0F0F] text-[#E4E3DB] p-8 shadow-[inset_8px_8px_0px_rgba(0,0,0,0.4)]">
                                        <div className="font-mono text-sm font-bold leading-relaxed whitespace-pre-wrap">
                                            {`[ OK ] INQUIRY RECEIVED
REF_ID: ${refId}
Our team will respond within 24 business hours.

C:\\ASIAN\\CONTACT> _`}
                                        </div>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-8 border-4 border-[#E4E3DB] px-6 py-2 font-mono text-xs font-bold hover:bg-[#E4E3DB] hover:text-[#0000AA] transition-colors"
                                        >
                                            NEW_INQUIRY
                                        </button>
                                    </div>
                                ) : status === 'transmitting' ? (
                                    <div className="h-64 flex flex-col items-center justify-center font-mono text-xl font-bold border-4 border-[#0F0F0F] bg-[#D7D6CD]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-4 h-4 bg-[#FF3300] animate-ping" />
                                            TRANSMITTING...
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="font-grotesk font-black text-4xl lg:text-5xl mb-8 uppercase tracking-tighter">
                                            SEND INQUIRY.
                                        </h2>

                                        <div className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormField
                                                    label="COMPANY_NAME" value={formState.company} error={errors.company}
                                                    onChange={(v: string) => setFormState({ ...formState, company: v })}
                                                />
                                                <FormField
                                                    label="CONTACT_PERSON" value={formState.contact} error={errors.contact}
                                                    onChange={(v: string) => setFormState({ ...formState, contact: v })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormField
                                                    label="EMAIL_ADDRESS" type="email" value={formState.email} error={errors.email}
                                                    onChange={(v: string) => setFormState({ ...formState, email: v })}
                                                />
                                                <FormField
                                                    label="PHONE_NUMBER" type="tel" value={formState.phone} error={errors.phone}
                                                    onChange={(v: string) => setFormState({ ...formState, phone: v })}
                                                    placeholder="+91 "
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormSelect
                                                    label="INQUIRY_TYPE" value={formState.type} error={errors.type}
                                                    onChange={(v: string) => setFormState({ ...formState, type: v })}
                                                    options={['Product Inquiry', 'Request Quote', 'Technical Query', 'Dealer Inquiry', 'Export Inquiry', 'Other']}
                                                />
                                                <FormSelect
                                                    label="ANNUAL_VOLUME" value={formState.volume}
                                                    onChange={(v: string) => setFormState({ ...formState, volume: v })}
                                                    options={['Not Sure', '< 10 MT', '10-50 MT', '50-200 MT', '200-500 MT', '500+ MT']}
                                                />
                                            </div>

                                            <div>
                                                <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0F0F0F]/50 mb-1 block">CABLE_REQUIREMENT</label>
                                                <textarea
                                                    rows={4}
                                                    value={formState.requirement}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormState({ ...formState, requirement: e.target.value })}
                                                    placeholder="Describe your cable requirement — type, voltage grade, core size, quantity, delivery location..."
                                                    className={`w-full border-4 ${errors.requirement ? 'border-[#FF3300]' : 'border-[#0F0F0F] focus:border-[#FF3300]'} bg-[#D7D6CD] p-4 font-mono text-sm font-bold focus:outline-none shadow-[inset_4px_4px_0px_rgba(0,0,0,0.08)] resize-y placeholder:opacity-50 text-[#0F0F0F]`}
                                                />
                                                {errors.requirement && <div className="text-[#FF3300] font-mono text-[9px] mt-1 font-bold">{errors.requirement}</div>}
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                className="w-full mt-4 py-5 bg-[#FF3300] text-[#0F0F0F] border-4 border-[#0F0F0F] font-mono font-black tracking-widest shadow-[8px_8px_0px_#0F0F0F] hover:bg-[#0F0F0F] hover:text-[#E4E3DB] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all cursor-none"
                                            >
                                                SUBMIT_INQUIRY.EXE →
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </GUIWindow>
                    </div>

                    {/* RIGHT COLUMN: Contact Info + Map */}
                    <div className="w-full lg:w-[45%] p-6 lg:p-10 flex flex-col gap-6">

                        <GUIWindow title="REGISTERED_OFFICE.TXT">
                            <div className="bg-[#E4E3DB] p-5 border-t-4 border-[#0F0F0F] font-mono text-xs font-bold leading-relaxed space-y-2">
                                <div className="border-b border-[#0F0F0F]/10 pb-2">
                                    ASIAN WIRES & CABLES PVT. LTD.<br />
                                    UNIT-1, INDUSTRIAL ESTATE<br />
                                    MUMBAI, MAHARASHTRA — 400001<br />
                                    INDIA
                                </div>
                                <div className="border-b border-[#0F0F0F]/10 pb-2 pt-1">
                                    PHONE: +91-9876543210<br />
                                    EMAIL: info@asianwires.com<br />
                                    WORKS: +91-9876543211
                                </div>
                                <div className="pt-1 opacity-70">
                                    GST: 27AABCA1234Z5<br />
                                    CIN: U31300MH1989PTC012345
                                </div>
                            </div>
                        </GUIWindow>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <GUIWindow title="BUSINESS_HOURS.SYS">
                                <div className="bg-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F] font-mono text-[9px] font-bold leading-relaxed h-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        SYSTEM STATUS:
                                        <div className={`w-2 h-2 rounded-full ${isBusinessHours() ? 'bg-green-500 animate-pulse' : 'bg-[#FF3300]'}`} />
                                        {isBusinessHours() ? 'OPEN' : 'CLOSED'}
                                    </div>

                                    <div className="space-y-1 opacity-80">
                                        <div className="flex justify-between"><span>Mon–Fri:</span><span>09:00 – 18:00</span></div>
                                        <div className="flex justify-between"><span>Saturday:</span><span>09:00 – 14:00</span></div>
                                        <div className="flex justify-between"><span>Sunday:</span><span className="text-[#FF3300]">CLOSED</span></div>
                                    </div>
                                    <div className="mt-4 pt-2 border-t border-[#0F0F0F]/20 text-center opacity-70">
                                        TIME_IST: {time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' })}
                                    </div>
                                </div>
                            </GUIWindow>

                            <div className="flex flex-col gap-2">
                                {[
                                    { label: "☎ CALL SALES", extra: "+91-9876543210" },
                                    { label: "✉ EMAIL", extra: "sales@asianwires.com" },
                                    { label: "⬇ DOWNLOAD CATALOG", extra: "PDF_14MB" }
                                ].map((btn, i) => (
                                    <button key={i} className="flex-1 flex flex-col items-center justify-center border-4 border-[#0F0F0F] bg-[#E4E3DB] px-4 py-2 font-mono text-[10px] font-bold hover:bg-[#0F0F0F] hover:text-[#E4E3DB] shadow-[4px_4px_0px_#0F0F0F] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-none leading-tight">
                                        <span>{btn.label}</span>
                                        <span className="opacity-50">{btn.extra}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <GUIWindow title="LOCATION_MAP.SYS" className="flex-1">
                            <div className="bg-[#D7D6CD] h-full min-h-[200px] border-t-4 border-[#0F0F0F] relative flex flex-col">
                                <div className="flex-1 relative overflow-hidden">
                                    <svg viewBox="0 0 300 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F0F0F" strokeWidth="1" strokeOpacity="0.1" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#grid)" />

                                        <path d="M 120 0 L 120 200 M 0 80 L 300 80" stroke="#0F0F0F" strokeWidth="4" strokeOpacity="0.15" />

                                        <g transform="translate(120, 80)">
                                            <circle cx="0" cy="-15" r="8" fill="#FF3300" stroke="#0F0F0F" strokeWidth="2" />
                                            <path d="M -8 -15 Q 0 0 0 0 Q 0 0 8 -15 Z" fill="#FF3300" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="round" />
                                            <ellipse cx="0" cy="4" rx="6" ry="2" fill="#0F0F0F" opacity="0.2" />
                                        </g>
                                    </svg>

                                    <div className="absolute top-4 left-4 font-mono text-[9px] font-bold bg-[#E4E3DB] border-2 border-[#0F0F0F] px-2 py-1 shadow-[2px_2px_0px_#0F0F0F]">
                                        ASIAN WIRES & CABLES
                                    </div>

                                    <div className="absolute top-4 right-4 flex flex-col items-center opacity-40 font-mono text-[8px] font-bold leading-none">
                                        <span>N</span>
                                        <div className="w-0.5 h-6 bg-[#0F0F0F] relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-[#0F0F0F]" />
                                        </div>
                                        <span>S</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => window.open('https://maps.google.com/?q=Asian+Wires+Cables', '_blank')}
                                    className="w-full border-t-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] flex items-center justify-between px-4 py-2 font-mono text-[9px] hover:text-[#FF3300] hover:bg-[#1a1a1a] transition-all cursor-none"
                                >
                                    <span>OPEN IN MAPS</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>
                        </GUIWindow>

                    </div>
                </div>

                {/* BOTTOM: Office Locations Strip */}
                <div className="border-x-4 border-b-4 border-[#0F0F0F] bg-[#E4E3DB] z-10 grid grid-cols-1 md:grid-cols-3 shadow-[20px_0_0_#0F0F0F]">
                    {[
                        { type: "HEAD OFFICE", city: "MUMBAI, MH", address: "Regus, BKC, Mumbai 400051", status: "ACTIVE" },
                        { type: "WORKS / PLANT", city: "SILVASSA, DN", address: "Plot 42, GIDC, Silvassa 396230", status: "ACTIVE" },
                        { type: "EXPORT OFFICE", city: "DUBAI, UAE", address: "JAFZA One, Dubai", status: "FOR ENQUIRIES" }
                    ].map((loc, i) => (
                        <div key={i} className={`p-6 lg:p-8 ${i < 2 ? 'border-b-4 md:border-b-0 md:border-r-4' : ''} border-[#0F0F0F]`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="font-mono text-[9px] tracking-widest opacity-50 uppercase">{loc.type}</div>
                                <div className={`w-2 h-2 rounded-full ${loc.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            </div>
                            <div className="font-grotesk font-black text-3xl mb-1">{loc.city}</div>
                            <div className="font-mono text-[10px] opacity-60 font-bold">{loc.address}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

// Extracted form components to keep things clean
const FormField = ({ label, type = "text", value, onChange, error, placeholder = "" }: any) => (
    <div>
        <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0F0F0F]/50 mb-1 block">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full border-4 ${error ? 'border-[#FF3300]' : 'border-[#0F0F0F] focus:border-[#FF3300]'} bg-[#D7D6CD] p-4 font-mono text-sm font-bold focus:outline-none shadow-[inset_4px_4px_0px_rgba(0,0,0,0.08)] text-[#0F0F0F]`}
        />
        {error && <div className="text-[#FF3300] font-mono text-[9px] mt-1 font-bold">{error}</div>}
    </div>
);

const FormSelect = ({ label, value, onChange, error, options }: any) => (
    <div>
        <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#0F0F0F]/50 mb-1 block">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`w-full border-4 ${error ? 'border-[#FF3300]' : 'border-[#0F0F0F] focus:border-[#FF3300]'} bg-[#D7D6CD] p-4 font-mono text-sm font-bold focus:outline-none shadow-[inset_4px_4px_0px_rgba(0,0,0,0.08)] appearance-none cursor-none text-[#0F0F0F]`}
            >
                <option value="" disabled>SELECT TYPE</option>
                {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0F0F0F] font-black">↓</div>
        </div>
        {error && <div className="text-[#FF3300] font-mono text-[9px] mt-1 font-bold">{error}</div>}
    </div>
);
