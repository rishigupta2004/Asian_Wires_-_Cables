'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building, Users, Award, CheckCircle } from 'lucide-react';
import { Barcode, GUIWindow, HalftoneGrid } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const brandLogos = [
  { name: 'ASIAN', tier: 'TRUE_MASTER', image: '/images/brands/ASIAN.png', desc: 'Premium flagship brand - Gold standard for audio and power applications' },
  { name: 'M1 VOICE', tier: 'M1_VOICE', image: '/images/brands/M1_VOICE.png', desc: 'Professional audio grade - Trusted by studios and installers' },
  { name: 'TRUE MASTER', tier: 'PRO_ASIAN', image: '/images/brands/True_MAster.png', desc: 'Entry level reliable - Quality without compromise' },
];

const partners = [
  { name: 'Larsen & Toubro', category: 'Infrastructure', years: '15+' },
  { name: 'DLF Limited', category: 'Real Estate', years: '12+' },
  { name: 'Tata Projects', category: 'Construction', years: '10+' },
  { name: 'Bharat Heavy Electricals', category: 'Industrial', years: '8+' },
  { name: 'Punj Lloyd', category: 'Infrastructure', years: '10+' },
  { name: 'Gammon India', category: 'Construction', years: '7+' },
  { name: 'Engineers India Ltd', category: 'Industrial', years: '12+' },
  { name: 'BPCL', category: 'Oil & Gas', years: '15+' },
  { name: 'HPCL', category: 'Oil & Gas', years: '12+' },
  { name: 'NTPC', category: 'Power', years: '10+' },
  { name: 'DMRC', category: 'Metro/Rail', years: '8+' },
  { name: 'ISRO', category: 'Space Research', years: '5+' },
];

const stats = [
  { value: '1000+', label: 'Active Clients' },
  { value: '50+', label: 'Partner Companies' },
  { value: '15+', label: 'Countries Exported' },
  { value: '98%', label: 'Client Retention' },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        
        {/* Hero */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-8 lg:p-12">
          <h1 className="font-grotesk text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
            Partners <span className="text-[#F23A18]">Net</span>
          </h1>
          <p className="font-mono-custom text-lg">
            Trusted by India's leading infrastructure, construction, and industrial companies.
          </p>
        </section>

        {/* Stats */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#D7D6CD] p-6 lg:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 text-center shadow-[8px_8px_0px_#0F0F0F]">
                <div className="font-grotesk font-black text-4xl lg:text-5xl text-[#F23A18] mb-2">{stat.value}</div>
                <div className="font-mono-custom text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Tiers */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#E4E3DB]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4">Our Brands</h2>
          <p className="font-mono-custom text-sm font-bold bg-[#F23A18] px-3 py-1 inline-block mb-8 border-2 border-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F]">TIER_MATRIX_SYSTEM</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandLogos.map((brand, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#D7D6CD] p-6 shadow-[8px_8px_0px_#0F0F0F] hover:shadow-[4px_4px_0px_#0F0F0F] hover:translate-y-1 transition-all">
                <GUIWindow title={`BRAND_${idx + 1}.EXE`} className="w-full mb-4">
                  <div className="bg-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F] h-32 flex items-center justify-center">
                    <div className="relative w-32 h-16">
                      <Image 
                        src={brand.image} 
                        alt={brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </GUIWindow>
                <h3 className="font-grotesk font-black text-2xl uppercase mb-1">{brand.name}</h3>
                <p className="font-mono-custom text-xs text-[#0F0F0F]/70 mb-3">{brand.desc}</p>
                <div className="font-mono-custom text-xs font-bold">
                  <span className="bg-[#0F0F0F] text-[#E4E3DB] px-2 py-1">{brand.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Grid */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#D7D6CD]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Key Partners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 flex items-center gap-4 shadow-[6px_6px_0px_#0F0F0F] hover:shadow-[3px_3px_0px_#0F0F0F] hover:translate-y-1 transition-all">
                <div className="w-12 h-12 bg-[#0F0F0F] text-[#F23A18] flex items-center justify-center font-grotesk font-black text-xl flex-shrink-0">
                  {partner.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-grotesk font-bold text-lg uppercase">{partner.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-mono-custom text-xs text-[#0F0F0F]/60">{partner.category}</span>
                    <span className="font-mono-custom text-xs font-bold bg-[#F23A18] px-2 py-0.5">{partner.years} yrs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#E4E3DB]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Why Partner With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building, title: 'Bulk Order Capability', desc: 'Monthly production capacity of 120,000 MT to handle large-scale projects' },
              { icon: Users, title: 'Dedicated Support', desc: 'Technical sales team with expertise in cable selection and specifications' },
              { icon: Award, title: 'Quality Assurance', desc: 'ISO certified manufacturing with rigorous testing at every stage' },
              { icon: CheckCircle, title: 'Competitive Pricing', desc: 'In-house manufacturing ensures cost-effective solutions without compromising quality' },
              { icon: Building, title: 'Pan-India Delivery', desc: 'Logistics network covering all major cities and industrial hubs' },
              { icon: Award, title: 'Custom Solutions', desc: 'Ability to manufacture cables as per specific project requirements' },
            ].map((item, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#D7D6CD] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <item.icon className="w-10 h-10 text-[#F23A18] mb-3" strokeWidth={1.5} />
                <h3 className="font-grotesk font-black text-lg uppercase mb-2">{item.title}</h3>
                <p className="font-mono-custom text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Become a Partner CTA */}
        <section className="p-8 lg:p-12 bg-[#0F0F0F] text-[#E4E3DB] text-center">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase mb-4">Become a <span className="text-[#F23A18]">Partner</span></h2>
          <p className="font-mono-custom text-lg mb-8 max-w-2xl mx-auto">
            Join our network of trusted partners across India. Contact us today to discuss distribution, dealer, or project partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-[#F23A18] border-4 border-[#E4E3DB] text-[#0F0F0F] font-mono-custom font-bold shadow-[8px_8px_0px_#E4E3DB] hover:shadow-[4px_4px_0px_#E4E3DB] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center">
              CONTACT US <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/products" className="px-8 py-4 border-4 border-[#F23A18] text-[#F23A18] font-mono-custom font-bold hover:bg-[#F23A18] hover:text-[#0F0F0F] transition-all flex items-center">
              VIEW PRODUCTS
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0F0F0F] text-[#E4E3DB] p-6 border-t-4 border-[#0F0F0F]">
          <div className="flex justify-between items-center">
            <div className="font-grotesk font-black text-2xl text-[#F23A18]">ASIAN</div>
            <Barcode className="w-20 h-4 opacity-50" />
          </div>
        </footer>
      </main>
    </div>
  );
}
