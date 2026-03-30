"use client";

import React, { useState, useMemo, useRef } from 'react';
import { ArrowUpRight, Search, LayoutGrid, List } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { fullCatalog } from '../../../lib/catalogData';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export const CatalogView = ({ handleNav, setSelectedProduct }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState('ALL CATEGORIES');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');
    const prefersReducedMotion = useReducedMotion();

    const filteredCatalog = useMemo(() => {
        return fullCatalog.filter(c => {
            const isParent = c.variants && c.variants.length > 0;
            if (!isParent) return false;
            const categoryMatch = filter === 'ALL CATEGORIES' || c.cat === filter;
            const searchMatch = c.type.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [filter, searchQuery]);

    const categories = useMemo(() => {
        const uniqueCats = Array.from(new Set(fullCatalog.map(c => c.cat))).sort();
        return ['ALL CATEGORIES', ...uniqueCats];
    }, []);

    useGSAP(() => {
        if (prefersReducedMotion) return;

        gsap.from(".product-item", {
            y: 28,
            opacity: 0,
            duration: 0.45,
            stagger: 0.025,
            ease: "power3.out",
            clearProps: "all"
        });
    }, { scope: containerRef, dependencies: [filter, viewMode, prefersReducedMotion] });

    const handleProductClick = (item: any) => {
        if (item.variants && item.variants.length > 0) {
            setSelectedProduct(item.variants[0]);
            handleNav('PRODUCT');
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F4F0EB] pb-32">
            
            {/* Header */}
            <header className="w-full pt-16 md:pt-24 pb-12 md:pb-16 px-6 md:px-16 lg:px-32">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
                        <div>
                            <div className="font-mono text-[10px] md:text-xs tracking-[0.5em] font-bold uppercase text-[#FF4A1C] mb-6">
                                Master Inventory
                            </div>
                            <h1 className="font-grotesk font-black tracking-[-0.05em] leading-[0.85] uppercase text-[#1C1C19]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
                                Product<br />Catalog.
                            </h1>
                        </div>

                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            {/* View Toggle */}
                            <div className="flex items-center bg-[#1C1C19]/[0.04] rounded-full p-1 gap-1">
                                <button
                                    onClick={() => setViewMode('gallery')}
                                    className={`p-2.5 rounded-full transition-all duration-300 md:cursor-none ${viewMode === 'gallery' ? 'bg-[#1C1C19] text-[#F4F0EB]' : 'text-[#1C1C19]/40 hover:text-[#1C1C19]/70'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2.5 rounded-full transition-all duration-300 md:cursor-none ${viewMode === 'list' ? 'bg-[#1C1C19] text-[#F4F0EB]' : 'text-[#1C1C19]/40 hover:text-[#1C1C19]/70'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative flex-1 lg:w-80">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[#1C1C19]/30">
                                    <Search className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1C1C19]/[0.04] border border-[#1C1C19]/5 rounded-full py-3 pl-12 pr-6 font-mono text-sm text-[#1C1C19] placeholder-[#1C1C19]/30 focus:ring-1 focus:ring-[#FF4A1C]/30 outline-none md:cursor-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2.5 rounded-full font-mono text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-500 md:cursor-none ${filter === f
                                    ? 'bg-[#1C1C19] text-[#F4F0EB]'
                                    : 'bg-[#1C1C19]/[0.04] text-[#1C1C19]/50 hover:bg-[#1C1C19]/[0.08]'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-32">
                
                {/* ═══ GALLERY VIEW ═══ */}
                {viewMode === 'gallery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {filteredCatalog.length > 0 ? (
                            filteredCatalog.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="product-item group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden md:cursor-none border border-[#1C1C19]/[0.04] hover:border-[#FF4A1C]/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(17,20,26,0.08)]"
                                    onClick={() => handleProductClick(item)}
                                >
                                    {/* Image */}
                                    <div className="w-full aspect-square bg-[#1C1C19]/[0.03] overflow-hidden relative">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.type}
                                                fill
                                                quality={100}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                priority={index < 2}
                                                loading={index < 2 ? undefined : index < 4 ? 'eager' : 'lazy'}
                                                fetchPriority={index < 2 ? 'high' : 'auto'}
                                                className="w-full h-full object-contain object-center p-5 md:p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                                style={{ imageRendering: 'auto' }}
                                                draggable={false}
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = '/Assests/Brand_Logo/LOGO-2.svg';
                                                    (e.currentTarget as HTMLImageElement).className = 'w-1/2 h-1/2 object-contain opacity-10 m-auto';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image
                                                    src="/Assests/Brand_Logo/LOGO-2.svg"
                                                    alt=""
                                                    width={180}
                                                    height={54}
                                                    loading="lazy"
                                                    className="w-1/3 h-auto object-contain opacity-10"
                                                />
                                            </div>
                                        )}
                                        
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C19]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <ArrowUpRight className="w-4 h-4 text-[#1C1C19]" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 md:p-5">
                                        <div className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] font-bold uppercase text-[#FF4A1C] mb-1.5">
                                            {item.cat}
                                        </div>
                                        <h3 className="font-grotesk font-black text-sm md:text-base lg:text-lg tracking-tight text-[#1C1C19] leading-tight mb-2 uppercase">
                                            {item.type}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-[9px] tracking-[0.15em] text-[#1C1C19]/40 font-bold">{item.volt}</span>
                                            <span className="font-mono text-[9px] tracking-[0.15em] text-[#1C1C19]/30 font-bold">{item.variants?.length || 0} var</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center">
                                <h3 className="font-grotesk text-3xl font-black text-[#1C1C19]/20 tracking-tighter uppercase">No Records</h3>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ LIST VIEW ═══ */}
                {viewMode === 'list' && (
                    <div className="flex flex-col">
                        {filteredCatalog.length > 0 ? (
                            filteredCatalog.map((item, i) => (
                                <div
                                    key={item.id}
                                    className="product-item group relative flex items-center gap-4 md:gap-6 py-6 md:py-8 border-b border-[#1C1C19]/[0.06] md:cursor-none overflow-hidden"
                                    onClick={() => handleProductClick(item)}
                                >
                                    {/* Hover fill */}
                                    <div className="absolute inset-0 bg-[#FF4A1C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-xl" />

                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#1C1C19]/[0.03] shrink-0 z-10 flex items-center justify-center p-2">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.type}
                                                width={192}
                                                height={192}
                                                quality={100}
                                                sizes="(max-width: 768px) 64px, 96px"
                                                loading="lazy"
                                                className="w-full h-full object-contain object-center"
                                                style={{ imageRendering: 'auto' }}
                                                draggable={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-20">
                                                <Image
                                                    src="/Assests/Brand_Logo/LOGO-2.svg"
                                                    alt=""
                                                    width={96}
                                                    height={28}
                                                    loading="lazy"
                                                    className="w-1/2 h-auto object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 z-10 group-hover:text-white transition-colors duration-500">
                                        <div className="font-mono text-[9px] tracking-[0.2em] font-bold uppercase opacity-40 group-hover:opacity-70 mb-1">
                                            {item.cat} — {item.id}
                                        </div>
                                        <h3 className="font-grotesk font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-tighter transition-transform duration-700 group-hover:translate-x-2">
                                            {item.type}
                                        </h3>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-6 z-10 group-hover:text-white transition-colors duration-500">
                                        <span className="hidden md:block font-mono text-xs tracking-[0.15em] font-bold opacity-40">{item.volt}</span>
                                        <div className="w-10 h-10 rounded-full border border-current/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF4A1C] group-hover:border-white transition-all duration-500">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-32 text-center">
                                <h3 className="font-grotesk text-3xl font-black text-[#1C1C19]/20 tracking-tighter uppercase">No Records</h3>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
