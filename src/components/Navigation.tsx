'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', id: '01' },
  { label: 'Products', href: '/products', id: '02' },
  { label: 'Quality', href: '/quality', id: '03' },
  { label: 'Our Legacy', href: '/about', id: '04' },
  { label: 'Contact', href: '/contact', id: '05' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      scaleY: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      }
    },
    open: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      }
    }
  };

  const linkVariants = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.1 * i,
      }
    })
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled && !isOpen
            ? 'py-4 mix-blend-difference' 
            : 'py-8'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className={`relative z-[60] text-xl font-bold font-display tracking-tighter uppercase transition-colors duration-500 ${isOpen ? 'text-[var(--background-primary)]' : 'text-white mix-blend-difference'}`}
              onClick={() => setIsOpen(false)}
            >
              Asian Wires<span className="text-[var(--accent-primary)] mix-blend-normal">.</span>
            </Link>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] group flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--accent-primary)]/10 transition-colors"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <span className={`block h-[2px] bg-current transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'w-6 rotate-45 translate-y-[8px] text-[var(--background-primary)]' : 'w-6 text-white mix-blend-difference'}`} />
                <span className={`block h-[2px] bg-current transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6 text-white mix-blend-difference'}`} />
                <span className={`block h-[2px] bg-current transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'w-6 -rotate-45 -translate-y-[8px] text-[var(--background-primary)]' : 'w-6 text-white mix-blend-difference'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] bg-[var(--foreground-primary)] origin-top flex flex-col justify-between overflow-hidden"
          >
            {/* Dynamic Background Noise for Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[radial-gradient(circle_at_center,_var(--background-secondary)_0%,_transparent_100%)]" />

            <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center mt-12 md:mt-0 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-0">
                
                {/* Main Links */}
                <div className="flex flex-col gap-2 md:gap-6">
                  {navLinks.map((link, i) => (
                    <div key={link.href} className="overflow-hidden">
                      <motion.div
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="group flex items-baseline gap-4 md:gap-8"
                      >
                        <span className="text-sm md:text-xl font-mono text-[var(--foreground-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          {link.id}
                        </span>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter font-display text-[var(--background-primary)] hover:text-[var(--accent-primary)] transition-colors duration-500 leading-none"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Contact Sidebar inside Menu */}
                <div className="flex flex-col gap-8 md:gap-12 md:max-w-xs overflow-hidden">
                  <motion.div
                    custom={5}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <h3 className="text-[var(--foreground-tertiary)] uppercase tracking-widest text-xs font-mono mb-4">Location</h3>
                    <p className="text-[var(--background-secondary)] text-lg leading-relaxed font-medium">
                      Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006
                    </p>
                  </motion.div>

                  <motion.div
                    custom={6}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <h3 className="text-[var(--foreground-tertiary)] uppercase tracking-widest text-xs font-mono mb-4">Contact</h3>
                    <a href="mailto:brijasian@gmail.com" className="block text-[var(--background-secondary)] text-xl md:text-2xl font-medium hover:text-[var(--accent-primary)] transition-colors">
                      brijasian@gmail.com
                    </a>
                    <a href="tel:+919811733043" className="block text-[var(--background-secondary)] text-xl md:text-2xl font-medium hover:text-[var(--accent-primary)] transition-colors mt-2">
                      +91 98117 33043
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Footer inside Menu */}
            <motion.div 
              custom={7}
              variants={linkVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-full py-8 border-t border-[var(--background-secondary)]/20 relative z-10"
            >
              <div className="container mx-auto px-6 md:px-12 flex justify-between items-center text-[var(--background-secondary)] text-sm font-medium uppercase tracking-widest">
                <span>(c) {new Date().getFullYear()}</span>
                <span>ISO 9001:2008 Certified</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
