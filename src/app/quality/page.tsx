'use client';

import { Check, X, Award, Shield, Zap } from 'lucide-react';
import { Barcode, GUIWindow } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const tiers = [
  {
    name: 'TRUE_MASTER',
    color: '#FFD700',
    label: 'TRUE MASTER',
    features: [
      { name: 'Oxygen-Free Copper', included: true },
      { name: '24K Gold Connectors', included: true },
      { name: 'Quad Shielding', included: true },
      { name: 'Braided Nylon Jacket', included: true },
      { name: 'Lifetime Warranty', included: true },
      { name: 'Premium Packaging', included: true },
    ]
  },
  {
    name: 'M1_VOICE',
    color: '#3B82F6',
    label: 'M1 VOICE',
    features: [
      { name: 'High-Purity Copper', included: true },
      { name: 'Nickel Connectors', included: true },
      { name: 'Dual Shielding', included: true },
      { name: 'PVC Jacket', included: true },
      { name: '5 Year Warranty', included: true },
      { name: 'Retail Packaging', included: true },
    ]
  },
  {
    name: 'PRO_ASIAN',
    color: '#10B981',
    label: 'PRO ASIAN',
    features: [
      { name: 'Standard Copper', included: true },
      { name: 'Standard Connectors', included: true },
      { name: 'Single Shielding', included: true },
      { name: 'PVC Jacket', included: true },
      { name: '1 Year Warranty', included: true },
      { name: 'Bulk Packaging', included: true },
    ]
  },
];

const tests = [
  { name: 'Conductor Resistance', method: 'IS:10810 Part 4', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Insulation Resistance', method: 'IS:10810 Part 6', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'High Voltage Test', method: 'IS:10810 Part 7', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Tensile Strength', method: 'IS:10810 Part 8', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Elongation Test', method: 'IS:10810 Part 8', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Spark Test', method: 'IS:10810 Part 9', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Fire Retardant', method: 'IS:10810 Part 20', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
  { name: 'Cold Bend Test', method: 'IS:10810 Part 21', tm: '✓ PASS', mv: '✓ PASS', pa: '✓ PASS' },
];

export default function QualityPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        
        {/* Hero */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-8 lg:p-12">
          <h1 className="font-grotesk text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
            Quality <span className="text-[#F23A18]">Spec Sheets</span>
          </h1>
          <p className="font-mono-custom text-lg">
            Every cable undergoes rigorous testing to ensure maximum performance and safety.
          </p>
        </section>

        {/* Tier Comparison */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#D7D6CD]">
          <h2 className="font-grotesk text-4xl font-black uppercase tracking-tighter mb-8">Tier Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] shadow-[8px_8px_0px_#0F0F0F]">
                <div className="p-6 border-b-4 border-[#0F0F0F]" style={{ backgroundColor: tier.color }}>
                  <h3 className="font-grotesk font-black text-2xl uppercase text-center text-[#0F0F0F]">{tier.label}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 font-mono-custom text-sm">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 font-bold" strokeWidth={3} />
                        ) : (
                          <X className="w-5 h-5 text-red-600" strokeWidth={3} />
                        )}
                        <span className={feature.included ? '' : 'opacity-50'}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Results */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#E4E3DB]">
          <h2 className="font-grotesk text-4xl font-black uppercase tracking-tighter mb-8">Test Results</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-4 border-[#0F0F0F] font-mono-custom text-sm">
              <thead className="bg-[#0F0F0F] text-[#E4E3DB]">
                <tr>
                  <th className="p-4 text-left border-r-2 border-[#E4E3DB]/20">TEST PARAMETER</th>
                  <th className="p-4 text-left border-r-2 border-[#E4E3DB]/20">TEST METHOD</th>
                  <th className="p-4 text-center border-r-2 border-[#E4E3DB]/20 text-[#FFD700]">TRUE MASTER</th>
                  <th className="p-4 text-center border-r-2 border-[#E4E3DB]/20 text-[#3B82F6]">M1 VOICE</th>
                  <th className="p-4 text-center text-[#10B981]">PRO ASIAN</th>
                </tr>
              </thead>
              <tbody className="bg-[#D7D6CD]">
                {tests.map((test, idx) => (
                  <tr key={idx} className="border-b-2 border-[#0F0F0F]/20 hover:bg-[#E4E3DB]">
                    <td className="p-4 font-bold border-r-2 border-[#0F0F0F]/20">{test.name}</td>
                    <td className="p-4 text-xs border-r-2 border-[#0F0F0F]/20">{test.method}</td>
                    <td className="p-4 text-center border-r-2 border-[#0F0F0F]/20 font-bold">{test.tm}</td>
                    <td className="p-4 text-center border-r-2 border-[#0F0F0F]/20 font-bold">{test.mv}</td>
                    <td className="p-4 text-center font-bold">{test.pa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quality Features */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#D7D6CD]">
          <h2 className="font-grotesk text-4xl font-black uppercase tracking-tighter mb-8">Quality Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'FRLS Technology', desc: 'Flame Retardant Low Smoke cables for safety' },
              { icon: Zap, title: 'High Conductivity', desc: '99.97% pure electrolytic grade copper' },
              { icon: Award, title: 'ISO Certified', desc: 'ISO 9001:2015 quality management' },
              { icon: Check, title: 'Tested Every Meter', desc: '100% spark testing on production line' },
            ].map((item, idx) => (
              <div key={idx} className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <item.icon className="w-12 h-12 text-[#F23A18] mb-4" strokeWidth={1.5} />
                <h3 className="font-grotesk font-black text-lg uppercase mb-2">{item.title}</h3>
                <p className="font-mono-custom text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Standards */}
        <section className="border-b-4 border-[#0F0F0F] p-8 lg:p-12 bg-[#E4E3DB]">
          <h2 className="font-grotesk text-4xl font-black uppercase tracking-tighter mb-8">Compliance Standards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-6 shadow-[8px_8px_0px_#F23A18]">
              <h3 className="font-grotesk font-black text-2xl mb-4">Indian Standards</h3>
              <ul className="font-mono-custom text-sm space-y-2">
                <li>• IS:694 - PVC Insulated Cables</li>
                <li>• IS:10810 - Test Methods for Cables</li>
                <li>• IS:7098 - XLPE Insulated Cables</li>
                <li>• IS:1554 - PVC Insulated Heavy Duty Cables</li>
              </ul>
            </div>
            <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-6 shadow-[8px_8px_0px_#F23A18]">
              <h3 className="font-grotesk font-black text-2xl mb-4">International Standards</h3>
              <ul className="font-mono-custom text-sm space-y-2">
                <li>• IEC 60227 - PVC Cables</li>
                <li>• IEC 60502 - XLPE Cables</li>
                <li>• BS 6004 - PVC Cables</li>
                <li>• BS 5467 - Armored Cables</li>
              </ul>
            </div>
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
