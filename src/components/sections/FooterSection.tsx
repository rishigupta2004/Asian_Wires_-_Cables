'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import BrandLogo from '../BrandLogo';

const CONTACT_INFO = {
  phone: {
    mobile: '+91-9811733043',
    landline: '011-40079555',
  },
  email: {
    primary: 'brijasian@gmail.com',
  },
  address: {
    full: 'Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006',
  },
};

const quickLinks = [
  { name: 'About Us', href: '/about', id: '01' },
  { name: 'Products', href: '/products', id: '02' },
  { name: 'Quality', href: '/quality', id: '03' },
  { name: 'Contact', href: '/contact', id: '04' },
];

export const FooterSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer 
      ref={containerRef}
      className="relative bg-[var(--foreground-primary)] text-[var(--background-primary)] pt-32 pb-12 overflow-hidden clip-path-footer"
    >
      {/* Dynamic Background Noise for Light Mode Footer */}
      <div className="absolute inset-0 noise-overlay opacity-[0.05] pointer-events-none mix-blend-multiply" />

      <motion.div style={{ y }} className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-[1400px]">
        
        {/* Massive Call to Action */}
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-[12vw] md:text-[8rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] font-display mb-8">
            Let's <span className="text-[var(--accent-primary)]">Connect</span>
          </h2>
          <Link href="/contact" className="group relative px-10 py-5 bg-[var(--background-primary)] text-white rounded-full overflow-hidden flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-2xl">
            <span className="relative z-10">Start a Project</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-[var(--accent-primary)] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 pb-16 border-b border-[var(--background-secondary)]/20">
          
          {/* Brand & Address */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-8 mix-blend-difference invert">
                <BrandLogo brand="asian" size="lg" />
              </div>
              <p className="text-lg font-medium leading-relaxed max-w-sm">
                Ground Floor, 1051, Mahavir Bhawan,<br/>
                Sita Ram Bazar, New Delhi - 110006
              </p>
            </div>
            
            <div className="mt-12">
              <a href={`mailto:${CONTACT_INFO.email.primary}`} className="block text-2xl md:text-3xl font-bold hover:text-[var(--accent-primary)] transition-colors mb-2">
                {CONTACT_INFO.email.primary}
              </a>
              <a href={`tel:${CONTACT_INFO.phone.mobile}`} className="block text-2xl md:text-3xl font-bold hover:text-[var(--accent-primary)] transition-colors">
                {CONTACT_INFO.phone.mobile}
              </a>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div className="lg:col-span-3 lg:col-start-8">
            <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--foreground-disabled)] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group flex items-baseline gap-4 text-2xl md:text-3xl font-black uppercase tracking-tight hover:text-[var(--accent-primary)] transition-colors font-display"
                  >
                    <span className="text-xs font-mono text-[var(--foreground-disabled)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {link.id}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs font-bold uppercase tracking-widest text-[var(--foreground-disabled)]">
          <p>© {new Date().getFullYear()} Asian Wires. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-[var(--background-primary)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--background-primary)] transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            ISO 9001:2008 Certified
          </div>
        </div>
      </motion.div>
    </footer>
  );
};