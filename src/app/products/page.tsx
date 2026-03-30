'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Barcode, GUIWindow, HalftoneGrid, RegistrationMarks, TextReveal } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const categories = ['All', 'Speaker', 'Audio', 'CCTV', 'Multi-Core', 'Digital', 'Industrial'];

const products = [
  {
    id: 1,
    partNumber: 'SP-14AWG-TM',
    name: 'Premium Speaker Wire',
    category: 'Speaker',
    tier: 'TRUE_MASTER',
    description: 'High-fidelity speaker wire for professional audio systems',
    specifications: {
      'Gauge': '14 AWG',
      'Conductor': 'Oxygen-free Copper (OFC)',
      'Insulation': 'Premium PVC',
      'Temperature Rating': '-20°C to +80°C',
      'Voltage Rating': '300V',
    },
    image: '/images/product-1.png',
  },
  {
    id: 2,
    partNumber: 'SP-16AWG-MV',
    name: 'Professional Speaker Cable',
    category: 'Speaker',
    tier: 'M1_VOICE',
    description: 'Reliable speaker cable for commercial installations',
    specifications: {
      'Gauge': '16 AWG',
      'Conductor': 'High-purity Copper',
      'Insulation': 'Flexible PVC',
      'Temperature Rating': '-15°C to +70°C',
      'Voltage Rating': '300V',
    },
    image: '/images/product-2.png',
  },
  {
    id: 3,
    partNumber: 'SP-18AWG-PA',
    name: 'Standard Speaker Wire',
    category: 'Speaker',
    tier: 'PRO_ASIAN',
    description: 'Cost-effective speaker wire for residential use',
    specifications: {
      'Gauge': '18 AWG',
      'Conductor': 'Standard Copper',
      'Insulation': 'PVC',
      'Temperature Rating': '-10°C to +60°C',
      'Voltage Rating': '150V',
    },
    image: '/images/product-3.png',
  },
  {
    id: 4,
    partNumber: 'RCA-PREM-TM',
    name: 'Premium RCA Cable',
    category: 'Audio',
    tier: 'TRUE_MASTER',
    description: 'Gold-plated RCA cables for superior signal transmission',
    specifications: {
      'Connector': '24K Gold-plated',
      'Conductor': 'Oxygen-free Copper',
      'Shielding': 'Double shielded',
      'Length': '1-10 meters',
      'Impedance': '75 Ohm',
    },
    image: '/images/product-4.png',
  },
  {
    id: 5,
    partNumber: 'XLR-PRO-MV',
    name: 'XLR Microphone Cable',
    category: 'Audio',
    tier: 'M1_VOICE',
    description: 'Professional XLR cables for microphones and audio equipment',
    specifications: {
      'Connector': 'Neutrik XLR',
      'Conductor': 'Balanced twisted pair',
      'Shielding': 'Braided copper',
      'Length': '1-20 meters',
      'Pins': '3-pin XLR',
    },
    image: '/images/product-5.png',
  },
  {
    id: 6,
    partNumber: '3.5MM-STD-PA',
    name: '3.5mm Audio Cable',
    category: 'Audio',
    tier: 'PRO_ASIAN',
    description: 'Standard 3.5mm auxiliary cables for general use',
    specifications: {
      'Connector': 'Nickel-plated 3.5mm',
      'Conductor': 'Copper',
      'Shielding': 'Single shield',
      'Length': '1-3 meters',
      'Type': 'TRS Stereo',
    },
    image: '/images/product-6.png',
  },
  {
    id: 7,
    partNumber: 'RG6-COAX-TM',
    name: 'RG6 Coaxial Cable',
    category: 'CCTV',
    tier: 'TRUE_MASTER',
    description: 'High-quality coaxial cable for CCTV and satellite systems',
    specifications: {
      'Type': 'RG6 Quad Shield',
      'Center Conductor': '18 AWG CCS',
      'Shielding': 'Quad shield',
      'Impedance': '75 Ohm',
      'Bandwidth': '3 GHz',
    },
    image: '/images/product-7.png',
  },
  {
    id: 8,
    partNumber: 'SIAM-CCTV-MV',
    name: 'Siamese CCTV Cable',
    category: 'CCTV',
    tier: 'M1_VOICE',
    description: 'Combined video and power cable for CCTV installations',
    specifications: {
      'Video': 'RG59 Coaxial',
      'Power': '18/2 AWG',
      'Shielding': 'Dual shield',
      'Length': '100m rolls',
      'Color': 'Black',
    },
    image: '/images/product-8.png',
  },
  {
    id: 9,
    partNumber: 'FIBER-OPT-PA',
    name: 'Fiber Optic Cable',
    category: 'CCTV',
    tier: 'PRO_ASIAN',
    description: 'Single mode fiber optic cable for long-distance transmission',
    specifications: {
      'Type': 'Single Mode OS2',
      'Fibers': '4-12 Core',
      'Jacket': 'LSZH',
      'Max Distance': '20km',
      'Connector': 'FC/SC/LC',
    },
    image: '/images/product-9.png',
  },
  {
    id: 10,
    partNumber: '4CORE-CTRL-TM',
    name: '4-Core Control Cable',
    category: 'Multi-Core',
    tier: 'TRUE_MASTER',
    description: 'Industrial control cable for automation systems',
    specifications: {
      'Conductors': '4 Core',
      'Size': '0.75-2.5 mm²',
      'Shielding': 'Overall Shield',
      'Voltage': '300/500V',
      'Jacket': 'PVC',
    },
    image: '/images/product-10.png',
  },
  {
    id: 11,
    partNumber: '8CORE-SIG-MV',
    name: '8-Core Signal Cable',
    category: 'Multi-Core',
    tier: 'M1_VOICE',
    description: 'Multi-core signal cable for instrumentation',
    specifications: {
      'Conductors': '8 Core',
      'Size': '0.5-1.5 mm²',
      'Shielding': 'Individual + Overall',
      'Voltage': '300V',
      'Jacket': 'PVC',
    },
    image: '/images/product-11.png',
  },
  {
    id: 12,
    partNumber: '16CORE-COM-PA',
    name: '16-Core Communication Cable',
    category: 'Multi-Core',
    tier: 'PRO_ASIAN',
    description: 'Communication cable for telephone and data systems',
    specifications: {
      'Conductors': '16 Core',
      'Size': '0.2-0.5 mm²',
      'Shielding': 'Unshielded',
      'Voltage': '150V',
      'Jacket': 'PVC',
    },
    image: '/images/product-12.png',
  },
  {
    id: 13,
    partNumber: 'HT-TEMP-TM',
    name: 'High-Temperature Cable',
    category: 'Industrial',
    tier: 'TRUE_MASTER',
    description: 'Heat-resistant cable for extreme temperature environments',
    specifications: {
      'Temperature': 'Up to 180°C',
      'Conductor': 'Nickel-plated Copper',
      'Insulation': 'PTFE/SiR',
      'Voltage': '600V',
      'Application': 'Furnace/Heater',
    },
    image: '/images/product-13.png',
  },
  {
    id: 14,
    partNumber: 'ARMOR-IND-MV',
    name: 'Armored Cable',
    category: 'Industrial',
    tier: 'M1_VOICE',
    description: 'Steel wire armored cable for underground installation',
    specifications: {
      'Armoring': 'SWA',
      'Conductor': 'Copper/Aluminum',
      'Insulation': 'XLPE',
      'Voltage': '600/1000V',
      'Application': 'Direct Burial',
    },
    image: '/images/product-14.png',
  },
  {
    id: 15,
    partNumber: 'FLEX-CTRL-PA',
    name: 'Flexible Control Cable',
    category: 'Industrial',
    tier: 'PRO_ASIAN',
    description: 'Highly flexible cable for moving machinery',
    specifications: {
      'Type': 'Flexible',
      'Conductor': 'Fine Copper',
      'Insulation': 'PVC',
      'Voltage': '300/500V',
      'Cycles': '10 million+',
    },
    image: '/images/product-15.png',
  },
];

const tierColors: Record<string, string> = {
  'TRUE_MASTER': '#FFD700',
  'M1_VOICE': '#3B82F6',
  'PRO_ASIAN': '#10B981',
};

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [hoveredRow, setHoveredRow] = useState<typeof products[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        
        {/* Dynamic Preview Window */}
        <div 
          className="pointer-events-none fixed z-50 w-72 transition-opacity duration-150 hidden lg:block"
          style={{ left: mousePos.x + 20, top: mousePos.y + 20, opacity: hoveredRow ? 1 : 0 }}
        >
          <GUIWindow title="PREVIEW_RENDER.EXE">
            <div className="bg-[#E4E3DB] border-t-4 border-[#0F0F0F] p-4 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
              <div className="font-mono-custom text-xs font-bold border-b-4 border-[#0F0F0F] pb-2 mb-3 uppercase text-[#0F0F0F] flex justify-between items-center">
                <span className="text-[#F23A18] text-lg font-black">{hoveredRow?.partNumber}</span>
                <Barcode className="w-12 h-4 opacity-50" />
              </div>
              
              <div className="w-full h-28 border-4 border-[#0F0F0F] mb-3 relative overflow-hidden bg-[#0F0F0F]">
                <div className="absolute inset-0 bg-[#F23A18]/20 mix-blend-color-burn z-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F23A18] opacity-60 animate-[scanline_2s_linear_infinite] z-20"></div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-grotesk font-black text-4xl text-[#E4E3DB]">{hoveredRow?.category?.[0]}</span>
                </div>
              </div>

              <div className="font-mono-custom text-[10px] leading-tight text-[#0F0F0F]">
                <pre className="font-bold">{`
+-------------------------+
| [████████████] 100%     |
| TIER : ${(hoveredRow?.tier || '').padEnd(16)} |
| CAT  : ${(hoveredRow?.category || '').padEnd(16)} |
+-------------------------+
                `}</pre>
              </div>
            </div>
          </GUIWindow>
        </div>

        {/* Header */}
        <div className="border-b-4 border-[#0F0F0F] p-6 lg:p-10 bg-[#0F0F0F] text-[#E4E3DB]">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 text-xs font-mono-custom hover:text-[#F23A18] transition-colors">
              <ArrowLeft className="w-4 h-4" /> RETURN_DIR
            </Link>
          </div>
          <h1 className="font-grotesk text-5xl lg:text-7xl font-black uppercase tracking-tighter">Data Matrix.</h1>
          <p className="font-mono-custom text-sm font-bold text-[#E4E3DB] bg-[#F23A18] border-2 border-[#E4E3DB] px-3 py-1 mt-3 tracking-widest inline-block shadow-[4px_4px_0px_#0F0F0F]">MASTER INVENTORY SHEET</p>
        </div>

        {/* Filters */}
        <div className="border-b-4 border-[#0F0F0F] p-4 lg:p-6 bg-[#D7D6CD] flex flex-wrap gap-3">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 border-4 border-[#0F0F0F] font-mono-custom text-xs font-bold transition-all ${
                filter === cat 
                  ? 'bg-[#0F0F0F] text-[#E4E3DB] shadow-[inset_4px_4px_0px_rgba(255,255,255,0.2)]' 
                  : 'bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0F0F0F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Table */}
        <div className="p-4 lg:p-6">
          <div className="w-full overflow-x-auto border-4 border-[#0F0F0F] bg-[#0000AA] shadow-[12px_12px_0px_#0F0F0F]">
            <table className="w-full text-left font-mono-custom text-sm min-w-[900px] border-collapse">
              <thead className="bg-[#E4E3DB] text-[#0F0F0F] text-xs tracking-widest border-4 border-[#0F0F0F]">
                <tr>
                  <th className="p-4 font-black border-r-4 border-[#0F0F0F]">REF_ID</th>
                  <th className="p-4 font-black border-r-4 border-[#0F0F0F]">NOMENCLATURE</th>
                  <th className="p-4 font-black border-r-4 border-[#0F0F0F]">TIER</th>
                  <th className="p-4 font-black border-r-4 border-[#0F0F0F]">CATEGORY</th>
                  <th className="p-4 font-black">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-[#E4E3DB]" onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
                {filteredProducts.map((product, i) => (
                  <tr 
                    key={product.id}
                    onMouseEnter={() => setHoveredRow(product)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => setSelectedProduct(product)}
                    className="hover:bg-[#E4E3DB] hover:text-[#0F0F0F] transition-colors cursor-crosshair group border-b-2 border-[#E4E3DB]/20"
                  >
                    <td className="p-4 font-black group-hover:text-[#F23A18] border-r-2 border-[#E4E3DB]/20">{product.partNumber}</td>
                    <td className="p-4 font-grotesk font-black text-xl tracking-tight uppercase border-r-2 border-[#E4E3DB]/20">{product.name}</td>
                    <td className="p-4 border-r-2 border-[#E4E3DB]/20">
                      <span 
                        className="px-2 py-1 font-bold text-xs border-2 border-current"
                        style={{ color: tierColors[product.tier], borderColor: tierColors[product.tier] }}
                      >
                        {product.tier}
                      </span>
                    </td>
                    <td className="p-4 font-bold border-r-2 border-[#E4E3DB]/20">{product.category}</td>
                    <td className="p-4">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-[#0F0F0F]/90 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <div className="bg-[#E4E3DB] border-4 border-[#0F0F0F] shadow-[16px_16px_0px_#F23A18] max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="border-b-4 border-[#0F0F0F] p-4 flex justify-between items-center bg-[#0F0F0F] text-[#E4E3DB]">
                <div className="font-mono-custom font-bold">{selectedProduct.partNumber}</div>
                <button onClick={() => setSelectedProduct(null)} className="text-[#F23A18] font-bold text-xl hover:scale-110 transition-transform">×</button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <GUIWindow title="SCHEMATIC.EXE" className="w-full">
                      <div className="bg-[#E4E3DB] p-4 border-t-4 border-[#0F0F0F]">
                        <RegistrationMarks />
                        <svg viewBox="0 0 300 200" className="w-full h-40">
                          <circle cx="150" cy="100" r="80" fill="none" stroke="#0F0F0F" strokeWidth="4" />
                          <circle cx="150" cy="100" r="60" fill="none" stroke="#F23A18" strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
                          <circle cx="150" cy="100" r="30" fill="#0F0F0F" />
                          <line x1="150" y1="20" x2="150" y2="40" stroke="#0F0F0F" strokeWidth="4" />
                          <line x1="150" y1="160" x2="150" y2="180" stroke="#0F0F0F" strokeWidth="4" />
                          <line x1="70" y1="100" x2="90" y2="100" stroke="#0F0F0F" strokeWidth="4" />
                          <line x1="210" y1="100" x2="230" y2="100" stroke="#0F0F0F" strokeWidth="4" />
                        </svg>
                      </div>
                    </GUIWindow>
                  </div>
                  
                  <div className="md:w-1/2">
                    <h2 className="font-grotesk font-black text-3xl uppercase mb-2">{selectedProduct.name}</h2>
                    <p className="font-mono-custom text-sm mb-4 text-[#0F0F0F]/70">{selectedProduct.description}</p>
                    
                    <div className="space-y-2 font-mono-custom text-xs">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b-2 border-[#0F0F0F]/20 pb-1">
                          <span className="font-bold">{key}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Link href="/contact" className="flex-1 bg-[#F23A18] border-4 border-[#0F0F0F] text-[#0F0F0F] py-3 font-mono-custom font-bold text-center hover:bg-[#0F0F0F] hover:text-[#E4E3DB] transition-colors shadow-[6px_6px_0px_#0F0F0F]">
                    REQUEST QUOTE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-[#0F0F0F] text-[#E4E3DB] p-6 lg:p-8 border-t-4 border-[#0F0F0F]">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="font-mono-custom text-xs">
              <Barcode className="w-24 h-4 opacity-50" />
            </div>
            <div className="font-mono-custom text-xs">
              TOTAL RECORDS: {filteredProducts.length} // PAGE 1/1
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
