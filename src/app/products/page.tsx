'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, X, Award, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import ImageGallery from '@/components/ImageGallery';
import { getProductImage, allGalleryImages } from '@/lib/imageMapping';

const BRAND_COLORS = {
  electricCopper: '#E85D04',
  graphite: '#171717',
  carbon: '#262626',
  voidBlack: '#050505',
  tierGold: '#FFD700',
  tierBlue: '#3B82F6',
  tierGreen: '#10B981',
};

const categories = ['All', 'Speaker', 'Audio', 'CCTV', 'Multi-Core', 'Digital', 'Industrial'];

const products = [
  {
    id: 1,
    partNumber: 'SP-14AWG-TM',
    name: 'Premium Speaker Wire',
    category: 'Speaker',
    tier: 'TRUE_MASTER' as const,
    description: 'High-fidelity speaker wire for professional audio systems',
    specifications: {
      'Gauge': '14 AWG',
      'Conductor': 'Oxygen-free Copper (OFC)',
      'Insulation': 'Premium PVC',
      'Temperature Rating': '-20°C to +80°C',
      'Voltage Rating': '300V',
    },
    applications: ['Home theaters', 'Professional audio', 'Studio monitors', 'High-end speakers'],
    moq: '100 meters',
    priceRange: '₹85-120 per meter',
  },
  {
    id: 2,
    partNumber: 'SP-16AWG-MV',
    name: 'Professional Speaker Cable',
    category: 'Speaker',
    tier: 'M1_VOICE' as const,
    description: 'Reliable speaker cable for commercial installations',
    specifications: {
      'Gauge': '16 AWG',
      'Conductor': 'High-purity Copper',
      'Insulation': 'Flexible PVC',
      'Temperature Rating': '-15°C to +70°C',
      'Voltage Rating': '300V',
    },
    applications: ['Commercial audio', 'Public address', 'Background music', 'Conference rooms'],
    moq: '100 meters',
    priceRange: '₹55-75 per meter',
  },
  {
    id: 3,
    partNumber: 'SP-18AWG-PA',
    name: 'Standard Speaker Wire',
    category: 'Speaker',
    tier: 'PRO_ASIAN' as const,
    description: 'Cost-effective speaker wire for residential use',
    specifications: {
      'Gauge': '18 AWG',
      'Conductor': 'Standard Copper',
      'Insulation': 'PVC',
      'Temperature Rating': '-10°C to +60°C',
      'Voltage Rating': '150V',
    },
    applications: ['Home audio', 'Car audio', 'Basic installations', 'Budget projects'],
    moq: '100 meters',
    priceRange: '₹35-50 per meter',
  },
  {
    id: 4,
    partNumber: 'RCA-PREM-TM',
    name: 'Premium RCA Cable',
    category: 'Audio',
    tier: 'TRUE_MASTER' as const,
    description: 'Gold-plated RCA cables for superior signal transmission',
    specifications: {
      'Connector': '24K Gold-plated',
      'Conductor': 'Oxygen-free Copper',
      'Shielding': 'Double shielded',
      'Length': '1-10 meters',
      'Impedance': '75 Ohm',
    },
    applications: ['Hi-Fi systems', 'DJ equipment', 'Studio gear', 'Premium audio'],
    moq: '50 pieces',
    priceRange: '₹250-450 per piece',
  },
  {
    id: 5,
    partNumber: 'XLR-PRO-MV',
    name: 'XLR Microphone Cable',
    category: 'Audio',
    tier: 'M1_VOICE' as const,
    description: 'Professional XLR cables for microphones and audio equipment',
    specifications: {
      'Connector': 'Neutrik XLR',
      'Conductor': 'Balanced twisted pair',
      'Shielding': 'Braided copper',
      'Length': '1-20 meters',
      'Pins': '3-pin XLR',
    },
    applications: ['Live sound', 'Recording studios', 'Broadcast', 'Stage performances'],
    moq: '50 pieces',
    priceRange: '₹180-350 per piece',
  },
  {
    id: 6,
    partNumber: '3.5MM-STD-PA',
    name: '3.5mm Audio Cable',
    category: 'Audio',
    tier: 'PRO_ASIAN' as const,
    description: 'Standard 3.5mm auxiliary cables for general use',
    specifications: {
      'Connector': 'Nickel-plated 3.5mm',
      'Conductor': 'Copper',
      'Shielding': 'Single shield',
      'Length': '1-3 meters',
      'Type': 'TRS Stereo',
    },
    applications: ['Mobile devices', 'Portable speakers', 'Headphones', 'Car audio'],
    moq: '100 pieces',
    priceRange: '₹45-85 per piece',
  },
  {
    id: 7,
    partNumber: 'RG6-COAX-TM',
    name: 'RG6 Coaxial Cable',
    category: 'CCTV',
    tier: 'TRUE_MASTER' as const,
    description: 'High-quality coaxial cable for CCTV and satellite systems',
    specifications: {
      'Type': 'RG6 Quad Shield',
      'Center Conductor': '18 AWG CCS',
      'Shielding': 'Quad shield',
      'Impedance': '75 Ohm',
      'Bandwidth': '3 GHz',
    },
    applications: ['CCTV cameras', 'Satellite TV', 'Cable TV', 'Security systems'],
    moq: '100 meters',
    priceRange: '₹65-95 per meter',
  },
  {
    id: 8,
    partNumber: 'SIAM-CCTV-MV',
    name: 'Siamese CCTV Cable',
    category: 'CCTV',
    tier: 'M1_VOICE' as const,
    description: 'Combined video and power cable for CCTV installations',
    specifications: {
      'Video': 'RG59 Coaxial',
      'Power': '18/2 AWG',
      'Shielding': 'Dual shield',
      'Length': '100m rolls',
      'Color': 'Black',
    },
    applications: ['DVR systems', 'Analog cameras', 'HD cameras', 'Security networks'],
    moq: '100 meters',
    priceRange: '₹45-65 per meter',
  },
  {
    id: 9,
    partNumber: 'FIBER-OPT-PA',
    name: 'Fiber Optic Cable',
    category: 'CCTV',
    tier: 'PRO_ASIAN' as const,
    description: 'Multimode fiber optic cable for long-distance transmission',
    specifications: {
      'Type': 'OM2 Multimode',
      'Core': '50/125 micron',
      'Jacket': 'PVC',
      'Length': '500m-2km',
      'Connectors': 'LC/SC available',
    },
    applications: ['Long-distance CCTV', 'Network backbone', 'Fiber networks', 'High-bandwidth'],
    moq: '500 meters',
    priceRange: '₹25-45 per meter',
  },
  {
    id: 10,
    partNumber: '4CORE-CTRL-TM',
    name: '4-Core Control Cable',
    category: 'Multi-Core',
    tier: 'TRUE_MASTER' as const,
    description: 'Flexible 4-core cable for control and signal applications',
    specifications: {
      'Cores': '4 x 1.5mm²',
      'Conductor': 'Stranded copper',
      'Insulation': 'PVC',
      'Sheath': 'PVC',
      'Flexibility': 'High',
    },
    applications: ['Machine control', 'Automation', 'Industrial sensors', 'Robotics'],
    moq: '100 meters',
    priceRange: '₹95-135 per meter',
  },
  {
    id: 11,
    partNumber: '8CORE-SIG-MV',
    name: '8-Core Signal Cable',
    category: 'Multi-Core',
    tier: 'M1_VOICE' as const,
    description: '8-core shielded cable for signal transmission',
    specifications: {
      'Cores': '8 x 0.5mm²',
      'Conductor': 'Stranded copper',
      'Shielding': 'Overall foil',
      'Sheath': 'PVC',
      'Voltage': '300V',
    },
    applications: ['Data transmission', 'Instrumentation', 'Control systems', 'Audio multicore'],
    moq: '100 meters',
    priceRange: '₹75-110 per meter',
  },
  {
    id: 12,
    partNumber: '16CORE-COM-PA',
    name: '16-Core Communication Cable',
    category: 'Multi-Core',
    tier: 'PRO_ASIAN' as const,
    description: '16-core cable for communication and intercom systems',
    specifications: {
      'Cores': '16 x 0.3mm²',
      'Conductor': 'Stranded copper',
      'Insulation': 'PVC',
      'Sheath': 'PVC',
      'Pairs': '8 twisted pairs',
    },
    applications: ['Intercom systems', 'Telephone lines', 'Low-voltage control', 'Building wiring'],
    moq: '100 meters',
    priceRange: '₹55-80 per meter',
  },
  {
    id: 13,
    partNumber: 'HT-TEMP-TM',
    name: 'High-Temperature Cable',
    category: 'Industrial',
    tier: 'TRUE_MASTER' as const,
    description: 'Heat-resistant cable for industrial high-temperature environments',
    specifications: {
      'Temperature': 'Up to +180°C',
      'Conductor': 'Tinned copper',
      'Insulation': 'Silicone rubber',
      'Sheath': 'Fiberglass braid',
      'Voltage': '600V',
    },
    applications: ['Industrial ovens', 'Furnaces', 'Engine rooms', 'High-heat areas'],
    moq: '50 meters',
    priceRange: '₹125-180 per meter',
  },
  {
    id: 14,
    partNumber: 'ARMOR-IND-MV',
    name: 'Armored Cable',
    category: 'Industrial',
    tier: 'M1_VOICE' as const,
    description: 'Steel wire armored cable for mechanical protection',
    specifications: {
      'Armor': 'Steel wire',
      'Cores': '3-5 core',
      'Section': '2.5-25mm²',
      'Sheath': 'PVC',
      'Standard': 'IS 1554',
    },
    applications: ['Underground', 'Industrial plants', 'Outdoor installations', 'Heavy machinery'],
    moq: '100 meters',
    priceRange: '₹145-220 per meter',
  },
  {
    id: 15,
    partNumber: 'FLEX-CTRL-PA',
    name: 'Flexible Control Cable',
    category: 'Industrial',
    tier: 'PRO_ASIAN' as const,
    description: 'Highly flexible cable for moving applications',
    specifications: {
      'Class': 'Class 5 flexible',
      'Cores': '2-12 core',
      'Section': '0.75-4mm²',
      'Sheath': 'PVC',
      'Bending': 'High flexibility',
    },
    applications: ['Cranes', 'Conveyors', 'Moving equipment', 'Robotics', 'Automation'],
    moq: '100 meters',
    priceRange: '₹85-125 per meter',
  },
];

const tierConfig = {
  TRUE_MASTER: {
    name: 'True Master',
    color: '#FFD700',
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500',
  },
  M1_VOICE: {
    name: 'M1 VOICE',
    color: '#3B82F6',
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
  },
  PRO_ASIAN: {
    name: 'Pro Asian 1051',
    color: '#10B981',
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
  },
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#171717] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              COMPLETE <span className="text-[#E85D04]">SOLUTIONS</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              15+ product categories, 3 quality tiers, engineered for excellence
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E85D04] text-black'
                    : 'bg-[#171717] text-gray-400 hover:text-white border border-[#262626]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, index) => {
            const tier = tierConfig[product.tier];
            const productImage = getProductImage(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#171717] border border-[#262626] hover:border-[#E85D04] transition-all duration-300 group cursor-pointer overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <OptimizedImage
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
                  
                  {/* Tier Badge */}
                  <div 
                    className="absolute top-4 right-4 px-2 py-1 text-xs font-bold"
                    style={{ backgroundColor: tier.color, color: '#000' }}
                  >
                    {tier.name}
                  </div>
                  
                  {/* Part Number */}
                  <div className="absolute top-4 left-4 font-mono text-xs text-white bg-black/60 px-2 py-1">
                    {product.partNumber}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#E85D04] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                  {/* Specs Preview */}
                  <div className="space-y-1 mb-4">
                    {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-500">{key}:</span>
                        <span className="text-gray-300 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-[#262626]">
                    <div className="text-[#E85D04] font-mono text-sm">{product.priceRange}</div>
                    <div className="flex items-center text-[#E85D04] text-sm font-semibold group-hover:gap-2 transition-all">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#171717] border border-[#262626] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#171717] border-b border-[#262626] p-6 flex justify-between items-start z-10">
              <div>
                <div className="font-mono text-sm text-gray-500 mb-1">{selectedProduct.partNumber}</div>
                <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-[#262626] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Image & Basic Info */}
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden border border-[#262626] mb-6">
                    <OptimizedImage
                      src={selectedProduct ? getProductImage(selectedProduct.id) : ''}
                      alt={selectedProduct?.name || ''}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div 
                    className="inline-block px-4 py-2 font-bold mb-4"
                    style={{ 
                      backgroundColor: tierConfig[selectedProduct.tier].color,
                      color: '#000'
                    }}
                  >
                    {tierConfig[selectedProduct.tier].name}
                  </div>

                  <p className="text-gray-300 mb-6">{selectedProduct.description}</p>

                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-gray-500">MOQ:</span>
                      <span className="font-mono">{selectedProduct.moq}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-gray-500">Price Range:</span>
                      <span className="text-[#E85D04] font-mono font-bold">{selectedProduct.priceRange}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Specifications */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#E85D04]">SPECIFICATIONS</h3>
                  <div className="bg-[#0a0a0a] border border-[#262626] p-4 mb-6">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-[#262626] last:border-0">
                        <span className="text-gray-500">{key}:</span>
                        <span className="font-mono text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-[#E85D04]">APPLICATIONS</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedProduct.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <Zap className="w-4 h-4 text-[#E85D04] mr-2" />
                        {app}
                      </li>
                    ))}
                  </ul>

                  {/* Available Tiers */}
                  <h3 className="text-xl font-bold mb-4 text-[#E85D04]">AVAILABLE QUALITY TIERS</h3>
                  <div className="space-y-2 mb-8">
                    {Object.entries(tierConfig).map(([key, config]) => (
                      <div 
                        key={key}
                        className={`flex items-center p-3 border ${
                          key === selectedProduct.tier 
                            ? 'border-[#E85D04] bg-[#E85D04]/10' 
                            : 'border-[#262626] opacity-50'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 mr-3"
                          style={{ backgroundColor: config.color }}
                        />
                        <span className="font-bold">{config.name}</span>
                        {key === selectedProduct.tier && (
                          <span className="ml-auto text-[#E85D04] text-sm">Current</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="flex-1 bg-[#E85D04] text-black font-bold uppercase tracking-wider py-4 text-center hover:bg-[#CD853F] transition-colors"
                    >
                      Request Quote
                    </Link>
                    <button className="flex-1 border-2 border-[#E85D04] text-[#E85D04] font-bold uppercase tracking-wider py-4 hover:bg-[#E85D04] hover:text-black transition-colors">
                      Download Spec Sheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Product Gallery */}
      <section className="py-16 bg-[#0a0a0a] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              PRODUCT <span className="text-[#E85D04]">GALLERY</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our complete collection of premium wire and cable products
            </p>
          </motion.div>
          
          <ImageGallery 
            images={allGalleryImages}
            columns={4}
            aspectRatio="square"
          />
        </div>
      </section>

      {/* Footer CTA */}
      <div className="bg-[#171717] border-t border-[#262626] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-400 mb-6">We can manufacture cables to your exact specifications</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#E85D04] text-black font-bold uppercase tracking-wider hover:bg-[#CD853F] transition-colors"
          >
            Contact Sales <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
