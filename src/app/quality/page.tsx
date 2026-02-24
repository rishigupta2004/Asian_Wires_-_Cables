'use client';

import { motion } from 'framer-motion';
import { Check, X, Award, Shield, Zap, HelpCircle } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { imagePaths } from '@/lib/imageMapping';
import BrandLogo from '@/components/BrandLogo';

const tiers = [
  {
    name: 'True Master',
    code: 'TRUE_MASTER',
    color: '#FFD700',
    bgColor: 'bg-yellow-500',
    percentage: 100,
    price: '₹₹₹',
    tagline: 'Premium Quality',
    description: 'Maximum durability and performance for critical applications',
    features: [
      'Oxygen-free Copper (OFC) conductors',
      'Premium grade insulation materials',
      'Maximum durability - 15+ years lifespan',
      'Extended 5-year warranty',
      'Superior conductivity ratings',
      'Temperature rating: -20°C to +80°C',
      'Double shielding options',
      'Gold-plated connectors (where applicable)',
    ],
    bestFor: [
      'Critical industrial applications',
      'High-end audio systems',
      'Professional installations',
      'Long-term infrastructure projects',
      'Harsh environmental conditions',
    ],
  },
  {
    name: 'M1 VOICE',
    code: 'M1_VOICE',
    color: '#3B82F6',
    bgColor: 'bg-blue-500',
    percentage: 80,
    price: '₹₹',
    tagline: 'Professional Grade',
    description: 'Balanced quality and value for professional use',
    features: [
      'High-purity copper conductors',
      'Quality insulation materials',
      'Good durability - 10+ years lifespan',
      'Standard 3-year warranty',
      'Reliable conductivity',
      'Temperature rating: -15°C to +70°C',
      'Standard shielding',
      'Nickel-plated connectors',
    ],
    bestFor: [
      'Commercial installations',
      'Professional audio/visual',
      'Regular industrial use',
      'Office buildings',
      'Retail spaces',
    ],
  },
  {
    name: 'Pro Asian 1051',
    code: 'PRO_ASIAN',
    color: '#10B981',
    bgColor: 'bg-green-500',
    percentage: 60,
    price: '₹',
    tagline: 'Standard Quality',
    description: 'Reliable performance at an affordable price',
    features: [
      'Standard copper conductors',
      'Standard PVC insulation',
      'Decent durability - 5+ years lifespan',
      'Basic 1-year warranty',
      'Standard conductivity',
      'Temperature rating: -10°C to +60°C',
      'Basic shielding',
      'Standard connectors',
    ],
    bestFor: [
      'Residential installations',
      'Budget-conscious projects',
      'Temporary setups',
      'Light commercial use',
      'Standard home audio',
    ],
  },
];

const comparisonData = [
  {
    feature: 'Conductor Quality',
    TRUE_MASTER: { value: 'Oxygen-free Copper (OFC)', rating: 5 },
    M1_VOICE: { value: 'High-purity Copper', rating: 4 },
    PRO_ASIAN: { value: 'Standard Copper', rating: 3 },
  },
  {
    feature: 'Insulation Grade',
    TRUE_MASTER: { value: 'Premium', rating: 5 },
    M1_VOICE: { value: 'High Quality', rating: 4 },
    PRO_ASIAN: { value: 'Standard', rating: 3 },
  },
  {
    feature: 'Durability Rating',
    TRUE_MASTER: { value: '15+ years', rating: 5 },
    M1_VOICE: { value: '10+ years', rating: 4 },
    PRO_ASIAN: { value: '5+ years', rating: 3 },
  },
  {
    feature: 'Warranty Period',
    TRUE_MASTER: { value: '5 Years', rating: 5 },
    M1_VOICE: { value: '3 Years', rating: 4 },
    PRO_ASIAN: { value: '1 Year', rating: 3 },
  },
  {
    feature: 'Conductivity',
    TRUE_MASTER: { value: 'Excellent', rating: 5 },
    M1_VOICE: { value: 'Very Good', rating: 4 },
    PRO_ASIAN: { value: 'Good', rating: 3 },
  },
  {
    feature: 'Temperature Range',
    TRUE_MASTER: { value: '-20°C to +80°C', rating: 5 },
    M1_VOICE: { value: '-15°C to +70°C', rating: 4 },
    PRO_ASIAN: { value: '-10°C to +60°C', rating: 3 },
  },
  {
    feature: 'Shielding Quality',
    TRUE_MASTER: { value: 'Double Shield', rating: 5 },
    M1_VOICE: { value: 'Standard Shield', rating: 4 },
    PRO_ASIAN: { value: 'Basic Shield', rating: 3 },
  },
  {
    feature: 'Price Point',
    TRUE_MASTER: { value: '₹₹₹ Premium', rating: 5 },
    M1_VOICE: { value: '₹₹ Mid-range', rating: 4 },
    PRO_ASIAN: { value: '₹ Budget', rating: 5 },
  },
];

const useCases = [
  {
    scenario: 'Industrial Manufacturing Plant',
    recommendation: 'TRUE_MASTER',
    reason: 'Critical operations require maximum reliability and durability',
  },
  {
    scenario: 'Commercial Office Building',
    recommendation: 'M1_VOICE',
    reason: 'Balanced performance and cost for professional environments',
  },
  {
    scenario: 'Residential Home Installation',
    recommendation: 'PRO_ASIAN',
    reason: 'Cost-effective solution for standard home use',
  },
  {
    scenario: 'Professional Recording Studio',
    recommendation: 'TRUE_MASTER',
    reason: 'Premium audio quality demands superior conductivity',
  },
  {
    scenario: 'Retail Store / Showroom',
    recommendation: 'M1_VOICE',
    reason: 'Reliable performance with moderate usage',
  },
  {
    scenario: 'Temporary Event Setup',
    recommendation: 'PRO_ASIAN',
    reason: 'Short-term use where budget is priority',
  },
];

export default function Quality() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              QUALITY <span className="text-[#E85D04]">COMPARISON</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the right quality level for your needs. All our products meet 
              ISO 9001:2008 standards, with varying grades for different applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div 
                  className="bg-[#171717] border-2 p-8 h-full"
                  style={{ borderColor: tier.color }}
                >
                  {/* Brand Logo */}
                  <div className="flex justify-center mb-6">
                    {tier.code === 'TRUE_MASTER' && <BrandLogo brand="true" size="md" />}
                    {tier.code === 'M1_VOICE' && <BrandLogo brand="m1" size="md" />}
                    {tier.code === 'PRO_ASIAN' && <BrandLogo brand="asian" size="md" />}
                  </div>

                  {/* Product Image */}
                  <div className="relative h-40 mb-6 overflow-hidden border border-[#262626]">
                    <OptimizedImage
                      src={tier.code === 'TRUE_MASTER' ? imagePaths.products.product12 : tier.code === 'M1_VOICE' ? imagePaths.products.product13 : imagePaths.products.product14}
                      alt={`${tier.name} Quality Wire`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div 
                        className="text-sm font-bold uppercase tracking-wider mb-2"
                        style={{ color: tier.color }}
                      >
                        {tier.tagline}
                      </div>
                      <h2 className="text-3xl font-bold">{tier.name}</h2>
                    </div>
                    <div 
                      className="text-3xl font-bold font-mono"
                      style={{ color: tier.color }}
                    >
                      {tier.price}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6">{tier.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Quality Level</span>
                      <span style={{ color: tier.color }}>{tier.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tier.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full"
                        style={{ backgroundColor: tier.color }}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <h3 className="font-bold mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" style={{ color: tier.color }} />
                    Key Features
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {tier.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300">
                        <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Best For */}
                  <h3 className="font-bold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" style={{ color: tier.color }} />
                    Best For
                  </h3>
                  <ul className="space-y-1">
                    {tier.bestFor.slice(0, 3).map((use, idx) => (
                      <li key={idx} className="text-sm text-gray-400">
                        • {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              DETAILED <span className="text-[#E85D04]">COMPARISON</span>
            </h2>
            <p className="text-gray-400">Compare specifications across all quality tiers</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#262626]">
                  <th className="text-left py-4 px-4 font-bold">Feature</th>
                  {tiers.map((tier) => (
                    <th key={tier.code} className="text-center py-4 px-4">
                      <div 
                        className="inline-block px-4 py-2 font-bold"
                        style={{ backgroundColor: tier.color, color: '#000' }}
                      >
                        {tier.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-[#262626] hover:bg-[#0a0a0a]">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    {tiers.map((tier) => {
                      const data = row[tier.code as keyof typeof row] as { value: string; rating: number };
                      return (
                        <td key={tier.code} className="py-4 px-4 text-center">
                          <div className="text-gray-300">{data.value}</div>
                          <div className="flex justify-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: i < data.rating ? tier.color : '#262626',
                                }}
                              />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use Case Guide */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              WHICH TIER FOR <span className="text-[#E85D04]">WHICH USE</span>?
            </h2>
            <p className="text-gray-400">Recommendations based on application</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const recommendedTier = tiers.find(t => t.code === useCase.recommendation);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#171717] border border-[#262626] p-6 hover:border-[#E85D04] transition-all"
                >
                  <h3 className="font-bold text-lg mb-3">{useCase.scenario}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400">Recommended:</span>
                    <span 
                      className="font-bold px-2 py-1 text-sm"
                      style={{ 
                        backgroundColor: recommendedTier?.color,
                        color: '#000'
                      }}
                    >
                      {recommendedTier?.name}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{useCase.reason}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              OUR QUALITY <span className="text-[#E85D04]">PROCESS</span>
            </h2>
            <p className="text-gray-400">How we ensure consistent quality across all tiers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Raw Material Selection',
                description: 'Only certified copper and premium-grade materials sourced from trusted suppliers.',
              },
              {
                step: '02',
                title: 'Precision Manufacturing',
                description: 'State-of-the-art machinery with automated quality checks at every stage.',
              },
              {
                step: '03',
                title: 'Rigorous Testing',
                description: 'Conductivity, insulation resistance, and durability tests for every batch.',
              },
              {
                step: '04',
                title: 'Final Inspection',
                description: 'Visual inspection, length verification, and packaging quality check.',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] border border-[#262626] p-6 text-center"
              >
                <div className="text-4xl font-bold text-[#E85D04] mb-4 font-mono">
                  {process.step}
                </div>
                <h3 className="font-bold mb-2">{process.title}</h3>
                <p className="text-gray-400 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#171717] border border-[#262626] p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">
                  WARRANTY <span className="text-[#E85D04]">COVERAGE</span>
                </h2>
                <p className="text-gray-400 mb-6">
                  All our products come with warranty coverage against manufacturing defects. 
                  The warranty period varies by quality tier, reflecting our confidence in each product line.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {tiers.map((tier) => (
                    <div key={tier.code} className="text-center p-4 bg-[#0a0a0a]">
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: tier.color }}
                      >
                        {tier.code === 'TRUE_MASTER' ? '5' : tier.code === 'M1_VOICE' ? '3' : '1'}
                      </div>
                      <div className="text-xs text-gray-400">Year{tier.code !== 'PRO_ASIAN' ? 's' : ''}</div>
                      <div className="text-xs text-gray-500 mt-1">{tier.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-[#E85D04] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Manufacturing Defects</h4>
                      <p className="text-gray-400 text-sm">Full replacement for any defects in materials or workmanship</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-[#E85D04] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Performance Guarantee</h4>
                      <p className="text-gray-400 text-sm">Products meet or exceed stated specifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-[#E85D04] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold">Technical Support</h4>
                      <p className="text-gray-400 text-sm">Expert assistance throughout the warranty period</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
