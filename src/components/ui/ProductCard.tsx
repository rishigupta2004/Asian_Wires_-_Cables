'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScanEffect } from '@/components/animations/ScanEffect';
import { CircuitConnector } from '@/components/animations/ScanEffect';

interface Product {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  gauge?: string;
  conductor: string;
  insulation: string;
  colors: string[];
  specs: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  variant?: 'spec' | 'node';
  className?: string;
}

export function ProductCard({ product, index, variant = 'spec', className = '' }: ProductCardProps) {
  const colorMap: Record<string, string> = {
    'Gold': 'bg-yellow-500',
    'Blue': 'bg-blue-500',
    'Green': 'bg-green-500',
    'Red': 'bg-red-500',
    'Black': 'bg-neutral-900',
    'White': 'bg-neutral-100',
    'Transparent': 'bg-neutral-300',
  };

  if (variant === 'node') {
    return (
      <motion.div
        className={`relative bg-neutral-900 border border-neutral-700 p-6 group cursor-pointer ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, borderColor: '#E85D04' }}
      >
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#B87333]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#B87333]" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#B87333]" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#B87333]" />
        
        <div className="font-mono text-xs text-[#E85D04] mb-2">{product.partNumber}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-neutral-400 text-sm mb-4">{product.category}</p>
        
        <div className="space-y-1 mb-4">
          {product.specs.slice(0, 3).map((spec, i) => (
            <div key={i} className="text-xs text-neutral-500 font-mono">• {spec}</div>
          ))}
        </div>
        
        <div className="flex gap-2">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className={`w-4 h-4 ${colorMap[color] || 'bg-neutral-500'} border border-neutral-600`}
              title={color}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative bg-neutral-900 border-2 border-neutral-700 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ borderColor: '#E85D04' }}
    >
      <ScanEffect className="absolute inset-0 z-10" speed="slow" />
      
      {/* Part Number Header */}
      <div className="bg-neutral-800 px-4 py-2 border-b border-neutral-700">
        <div className="font-mono text-sm text-[#E85D04] tracking-wider">
          PART NO: {product.partNumber}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex gap-6">
          {/* Image Placeholder */}
          <div className="relative w-32 h-32 bg-neutral-800 flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-800" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-600 font-mono text-xs">IMG</span>
            </div>
            <ScanEffect className="absolute inset-0" speed="normal" direction="horizontal" />
          </div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
              {product.name}
            </h3>
            <div className="text-sm text-neutral-500 mb-4 font-mono">{product.category}</div>
          </div>
        </div>
        
        {/* Specs Section */}
        <div className="mt-6 border-t border-neutral-700 pt-4">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Specifications</div>
          <div className="grid grid-cols-2 gap-2">
            {product.specs.map((spec, i) => (
              <div key={i} className="text-sm text-neutral-400 font-mono">• {spec}</div>
            ))}
          </div>
        </div>
        
        {/* Available Colors */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Available In</div>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 ${colorMap[color] || 'bg-neutral-500'} border border-neutral-600 flex items-center justify-center`}
                title={color}
              >
                <span className="text-[8px] text-white/80 font-mono">{color[0]}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-neutral-800 hover:bg-[#E85D04] text-white text-sm font-mono py-3 px-4 text-center transition-colors border border-neutral-700 hover:border-[#E85D04]"
          >
            VIEW DETAILS
          </Link>
          <Link
            href="/contact"
            className="flex-1 bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white text-sm font-mono py-3 px-4 text-center transition-colors border border-neutral-700"
          >
            REQUEST QUOTE
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
