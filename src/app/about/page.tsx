'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Shield, Users, Factory, CheckCircle } from 'lucide-react';
import { Barcode, GUIWindow, HalftoneGrid } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const brandLogos = [
  { name: 'ASIAN', tier: 'TRUE_MASTER', image: '/images/brands/ASIAN.png', desc: 'Premium flagship brand' },
  { name: 'M1 VOICE', tier: 'M1_VOICE', image: '/images/brands/M1_VOICE.png', desc: 'Professional audio grade' },
  { name: 'TRUE MASTER', tier: 'PRO_ASIAN', image: '/images/brands/True_MAster.png', desc: 'Entry level reliable' },
];

const stats = [
  { value: '30+', label: 'Years Experience' },
  { value: '120K', label: 'MT Annual Capacity' },
  { value: '1000+', label: 'Clients Nationwide' },
  { value: '50+', label: 'Products Range' },
];

const milestones = [
  { year: '1990', title: 'Foundation', desc: 'Started as a small manufacturing unit in Delhi' },
  { year: '1998', title: 'ISO 9001', desc: 'Achieved ISO 9001:1996 certification' },
  { year: '2005', title: 'Expansion', desc: 'Established second manufacturing facility' },
  { year: '2015', title: 'Brand Launch', desc: 'Launched True Master, M1 Voice & Pro Asian brands' },
  { year: '2020', title: 'Innovation', desc: 'Introduced FRLS and Zero Halogen technology' },
  { year: '2024', title: 'Growth', desc: 'Exported to 15+ countries worldwide' },
];

const certifications = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'OHSAS 18001:2007',
  'BIS Mark',
  'CE Certified',
  'RoHS Compliant',
];

export default function AboutPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        
        {/* Hero */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-8 lg:p-12">
          <div className="max-w-4xl">
            <h1 className="font-grotesk text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
              Company <span className="text-[#F23A18]">Profile</span>
            </h1>
            <p className="font-mono-custom text-lg leading-relaxed">
              Pioneering excellence in wire and cable manufacturing since 1990. 
              We deliver power solutions that light up infrastructure across India and beyond.
            </p>
          </div>
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

        {/* BRANDS SECTION */}
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

        {/* Timeline */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#D7D6CD]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">History</h2>
          
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-4 bg-[#F23A18] border-4 border-[#0F0F0F]"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="lg:w-1/2 lg:pr-12 text-right hidden lg:block">
                    {idx % 2 === 0 && (
                      <div>
                        <div className="font-grotesk font-black text-3xl text-[#F23A18]">{milestone.year}</div>
                        <div className="font-mono-custom font-bold text-lg">{milestone.title}</div>
                        <div className="font-mono-custom text-xs text-[#0F0F0F]/70">{milestone.desc}</div>
                      </div>
                    )}
                  </div>
                  <div className="w-8 h-8 bg-[#0F0F0F] border-4 border-[#F23A18] z-10 flex-shrink-0 mx-4 lg:mx-0"></div>
                  <div className="lg:w-1/2 lg:pl-12 text-left">
                    {idx % 2 !== 0 && (
                      <div>
                        <div className="font-grotesk font-black text-3xl text-[#F23A18]">{milestone.year}</div>
                        <div className="font-mono-custom font-bold text-lg">{milestone.title}</div>
                        <div className="font-mono-custom text-xs text-[#0F0F0F]/70">{milestone.desc}</div>
                      </div>
                    )}
                    {idx % 2 === 0 && (
                      <div className="lg:hidden">
                        <div className="font-grotesk font-black text-2xl text-[#F23A18]">{milestone.year}</div>
                        <div className="font-mono-custom font-bold">{milestone.title}</div>
                        <div className="font-mono-custom text-xs text-[#0F0F0F]/70">{milestone.desc}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#E4E3DB]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Certifications</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-4 text-center shadow-[6px_6px_0px_#F23A18]">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#F23A18]" />
                <div className="font-mono-custom text-xs font-bold">{cert}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#D7D6CD]">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Factory, title: 'In-House Manufacturing', desc: 'Complete control over quality with state-of-the-art production facilities' },
              { icon: Shield, title: 'Quality Assurance', desc: 'Rigorous testing at every stage from raw material to finished product' },
              { icon: Users, title: 'Expert Team', desc: 'Dedicated engineers and technicians with decades of industry experience' },
              { icon: Award, title: 'Industry Recognition', desc: 'Trusted by top construction and infrastructure companies' },
            ].map((item, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <item.icon className="w-12 h-12 text-[#F23A18] mb-4" strokeWidth={1.5} />
                <h3 className="font-grotesk font-black text-xl uppercase mb-2">{item.title}</h3>
                <p className="font-mono-custom text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 lg:p-12 bg-[#0F0F0F] text-[#E4E3DB] text-center">
          <h2 className="font-grotesk text-4xl lg:text-5xl font-black uppercase mb-4">Ready to <span className="text-[#F23A18]">Connect</span>?</h2>
          <p className="font-mono-custom text-lg mb-8">Explore our product catalog or get in touch for custom solutions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="px-8 py-4 bg-[#F23A18] border-4 border-[#E4E3DB] text-[#0F0F0F] font-mono-custom font-bold shadow-[8px_8px_0px_#E4E3DB] hover:shadow-[4px_4px_0px_#E4E3DB] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center">
              BROWSE CATALOG <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 border-4 border-[#F23A18] text-[#F23A18] font-mono-custom font-bold hover:bg-[#F23A18] hover:text-[#0F0F0F] transition-all flex items-center">
              CONTACT US
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
