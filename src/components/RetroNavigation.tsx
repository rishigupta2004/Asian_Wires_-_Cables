'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { Barcode, SystemLoadGraph, HalftoneGrid } from '@/components/retro';

export default function RetroNavigation() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'HOME', label: '[DIR] OVERVIEW.EXE', href: '/' },
    { id: 'CATALOG', label: '[DIR] DATA_MATRIX.DB', href: '/products' },
    { id: 'ABOUT', label: '[DIR] COMPANY_INTRO', href: '/about' },
    { id: 'QUALITY', label: '[DIR] SPEC_SHEETS', href: '/quality' },
    { id: 'CLIENTS', label: '[DIR] PARTNERS_NET', href: '/clients' },
    { id: 'CONTACT', label: '[DIR] COMM_LINK', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-30 bg-[#0F0F0F] text-[#E4E3DB] p-4 flex justify-between items-center font-mono-custom text-sm font-bold tracking-widest border-b-4 border-[#F23A18]">
        <span className="flex items-center"><div className="w-3 h-3 bg-[#F23A18] mr-2 border border-[#E4E3DB]"></div> ASIAN_SYS</span>
        <button onClick={() => setMobileMenu(true)} className="flex items-center gap-2 border-4 border-[#0F0F0F] px-4 py-2 bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#F23A18] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
          <Menu className="w-5 h-5"/>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0F0F0F] flex flex-col">
          <div className="p-4 flex justify-between items-center border-b-4 border-[#F23A18]">
            <span className="font-grotesk font-black text-2xl text-[#F23A18]">ASIAN</span>
            <button onClick={() => setMobileMenu(false)} className="bg-[#F23A18] border-4 border-[#E4E3DB] p-2"><X className="w-6 h-6 text-[#0F0F0F]" /></button>
          </div>
          <nav className="flex-1 p-8 flex flex-col gap-4 font-mono-custom">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className={`p-6 border-4 ${isActive(item.href) ? 'border-[#F23A18] bg-[#F23A18] text-[#0F0F0F]' : 'border-[#E4E3DB] text-[#E4E3DB] hover:border-[#F23A18] hover:text-[#F23A18]'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 w-[320px] h-screen border-r-4 border-[#0F0F0F] bg-[#E4E3DB] z-40 flex-col justify-between">
        <div className="p-6 border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] relative group overflow-hidden">
          <HalftoneGrid />
          <Link href="/" className="relative z-10">
            <h1 className="font-grotesk text-5xl font-black leading-none tracking-tighter mb-2 text-[#F23A18] glitch-hover">ASIAN</h1>
            <h2 className="font-mono-custom text-xs uppercase tracking-widest text-[#E4E3DB] font-bold border-l-4 border-[#F23A18] pl-2">Wire & Cable Mfg.</h2>
          </Link>
        </div>

        <nav className="flex-1 p-6 border-b-4 border-[#0F0F0F] flex flex-col gap-3 font-mono-custom text-xs font-bold tracking-widest overflow-y-auto">
          <div className="text-[#0F0F0F] mb-2 text-[10px] border-b-4 border-[#0F0F0F] pb-2 uppercase flex items-center justify-between">
            <div className="flex items-center"><div className="w-2 h-2 bg-[#F23A18] mr-2"></div> C:\ROOT_DIR\&gt;</div>
            <Barcode className="w-10 h-3" />
          </div>
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={item.href}
              className={`flex items-center justify-between p-4 border-4 transition-all duration-100 ${
                isActive(item.href) 
                  ? 'border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] shadow-[inset_6px_6px_0px_rgba(255,255,255,0.2)]' 
                  : 'border-[#0F0F0F] bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#0F0F0F]'
              }`}
            >
              <span>{item.label}</span>
              {isActive(item.href) && <div className="w-3 h-3 bg-[#F23A18] border border-[#E4E3DB] animate-pulse"></div>}
            </Link>
          ))}
        </nav>

        <div className="p-6 font-mono-custom text-xs bg-[#D7D6CD] text-[#0F0F0F] font-bold relative overflow-hidden">
          <HalftoneGrid />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4 pb-2 border-b-4 border-[#0F0F0F]">
              <span>SYS. LOAD</span>
              <span className="text-[#E4E3DB] bg-[#0F0F0F] px-2 py-1 border-2 border-[#0F0F0F] shadow-[4px_4px_0px_#F23A18]">ONLINE</span>
            </div>
            <SystemLoadGraph />
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center"><span className="text-[#0F0F0F]/60">LME_Cu_IDX:</span> <span className="text-[#E4E3DB] bg-[#F23A18] px-2 font-black border-2 border-[#0F0F0F] shadow-[2px_2px_0px_#0F0F0F]">$8,450.00</span></div>
              <div className="flex justify-between items-center"><span className="text-[#0F0F0F]/60">SYS_TIME:</span> <span className="bg-[#E4E3DB] border-2 border-[#0F0F0F] px-2 shadow-[2px_2px_0px_#0F0F0F]">{time}</span></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop to account for fixed sidebar */}
      <div className="hidden lg:block w-[320px] flex-shrink-0"></div>
    </>
  );
}
