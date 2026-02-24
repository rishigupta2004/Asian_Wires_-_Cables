'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

interface TerminalCardProps {
  type: 'visit' | 'call' | 'email';
  title: string;
  primary: string;
  secondary?: string;
  action: string;
  href: string;
  index?: number;
}

const icons = {
  visit: MapPin,
  call: Phone,
  email: Mail,
};

export function TerminalCard({
  type,
  title,
  primary,
  secondary,
  action,
  href,
  index = 0,
}: TerminalCardProps) {
  const Icon = icons[type];

  return (
    <motion.div
      className="relative bg-neutral-900 border border-neutral-700 p-8 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        borderColor: '#E85D04',
        boxShadow: '0 0 40px rgba(232, 93, 4, 0.2)',
      }}
    >
      {/* Circuit lines */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-8 w-px h-16 bg-gradient-to-b from-[#E85D04] to-transparent" />
        <div className="absolute bottom-0 right-8 w-px h-16 bg-gradient-to-t from-[#E85D04] to-transparent" />
        <div className="absolute top-8 left-0 w-16 h-px bg-gradient-to-r from-[#E85D04] to-transparent" />
        <div className="absolute bottom-8 right-0 w-16 h-px bg-gradient-to-l from-[#E85D04] to-transparent" />
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#B87333] group-hover:border-[#E85D04] transition-colors" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#B87333] group-hover:border-[#E85D04] transition-colors" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#B87333] group-hover:border-[#E85D04] transition-colors" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#B87333] group-hover:border-[#E85D04] transition-colors" />
      
      {/* Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 border border-neutral-600 flex items-center justify-center group-hover:border-[#E85D04] transition-colors">
          <Icon className="w-8 h-8 text-neutral-400 group-hover:text-[#E85D04] transition-colors" />
        </div>
      </div>
      
      {/* Title */}
      <div className="font-mono text-xs text-[#E85D04] uppercase tracking-widest mb-4">
        {title}
      </div>
      
      {/* Primary Content */}
      <div className="text-2xl font-bold text-white mb-2 break-words">
        {primary}
      </div>
      
      {/* Secondary Content */}
      {secondary && (
        <div className="text-neutral-500 text-sm mb-6">
          {secondary}
        </div>
      )}
      
      {/* Action Button */}
      <Link
        href={href}
        className="inline-block w-full bg-neutral-800 hover:bg-[#E85D04] text-white text-sm font-mono py-3 px-6 text-center transition-all border border-neutral-700 hover:border-[#E85D04] group-hover:shadow-lg"
      >
        {action}
      </Link>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(232, 93, 4, 0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
