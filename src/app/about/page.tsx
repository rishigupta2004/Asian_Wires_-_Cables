'use client';

import { motion } from 'framer-motion';
import { Award, MapPin, Clock, Users, TrendingUp, Shield } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { imagePaths } from '@/lib/imageMapping';
import BrandLogo from '@/components/BrandLogo';

const milestones = [
  {
    year: '1990',
    title: 'Founded in New Delhi',
    description: 'Asian Wires & Cables was established with a vision to provide quality electrical solutions to India.',
  },
  {
    year: '2000',
    title: 'ISO Certification',
    description: 'Achieved ISO 9001:2008 certification, marking our commitment to international quality standards.',
  },
  {
    year: '2005',
    title: 'Pan-India Expansion',
    description: 'Expanded distribution network to cover all major states across India.',
  },
  {
    year: '2010',
    title: 'Infrastructure Growth',
    description: 'Upgraded manufacturing facility with modern machinery and increased production capacity.',
  },
  {
    year: '2015',
    title: '500+ Client Milestone',
    description: 'Crossed 500 active clients, serving diverse industries across the nation.',
  },
  {
    year: '2020',
    title: 'Brand Diversification',
    description: 'Launched three distinct product tiers: True Master, M1 VOICE, and Pro Asian 1051.',
  },
  {
    year: '2024',
    title: '1000+ Clients',
    description: 'Serving over 1000 clients nationwide, continuing our legacy of excellence.',
  },
];

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description: 'Every product undergoes rigorous testing to meet international standards.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Honest pricing, transparent dealings, and ethical business practices.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'Continuously improving our products and processes.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Dedicated support and personalized solutions for every client.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#171717] to-[#0a0a0a]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-[#E85D04] font-mono text-sm tracking-[0.3em] uppercase mb-6">
              Since 1990
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              BUILDING <span className="text-[#E85D04]">TRUST</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Three decades of excellence in wire and cable manufacturing. 
              From our humble beginnings in New Delhi to serving over 1000 clients nationwide, 
              our commitment to quality has never wavered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#171717] border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '30+', label: 'Years Experience' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '15+', label: 'Product Categories' },
              { value: 'ISO', label: 'Certified Quality' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-[#E85D04] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative overflow-hidden border border-[#262626]">
                <OptimizedImage
                  src={imagePaths.products.product11}
                  alt="Asian Wires Manufacturing Facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-[#E85D04]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 1990 in the heart of New Delhi, Asian Wires & Cables began with a simple 
                  mission: to provide India with high-quality, reliable electrical wiring solutions. 
                  What started as a small manufacturing unit has grown into one of the most trusted 
                  names in the industry.
                </p>
                <p>
                  Over three decades, we have expanded our product range from basic PVC wires to 
                  sophisticated multi-core cables, serving industries ranging from residential construction 
                  to heavy industrial applications. Our commitment to quality and customer satisfaction 
                  has earned us the trust of over 1000 clients nationwide.
                </p>
                <p>
                  Today, we operate from our state-of-the-art facility in New Delhi, equipped with 
                  modern machinery and staffed by a team of experienced professionals. Our ISO 9001:2008 
                  certification is a testament to our unwavering commitment to international quality standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="text-[#E85D04]">Journey</span>
            </h2>
            <p className="text-gray-400">Three decades of growth and excellence</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#E85D04] hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-[#0a0a0a] border border-[#262626] p-6 inline-block">
                      <div className="text-3xl font-bold text-[#E85D04] mb-2 font-mono">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="w-4 h-4 bg-[#E85D04] rounded-full border-4 border-[#171717] z-10 hidden lg:block" />

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="text-[#E85D04]">Values</span>
            </h2>
            <p className="text-gray-400">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#171717] border border-[#262626] p-8 hover:border-[#E85D04] transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-[#E85D04] mb-4" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Quality <span className="text-[#E85D04]">Standards</span>
            </h2>
            <p className="text-gray-400">Certified excellence you can trust</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ISO 9001:2008',
                description: 'Quality Management System certification ensuring consistent product quality and customer satisfaction.',
              },
              {
                title: 'IS 694',
                description: 'Indian Standard for PVC insulated cables for working voltages up to and including 1100 volts.',
              },
              {
                title: 'IS 1554',
                description: 'Specification for PVC insulated heavy duty electric cables for working voltages up to and including 1100 volts.',
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0a0a0a] border border-[#262626] p-8 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#E85D04]/10 border-2 border-[#E85D04] flex items-center justify-center">
                  <Award className="w-10 h-10 text-[#E85D04]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{cert.title}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Make in India */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#E85D04]/20 border border-[#E85D04] px-4 py-2 text-[#E85D04] font-bold mb-6">
                Make in India
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Proudly <span className="text-[#E85D04]">Indian</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                We are proud to be part of the Make in India initiative. All our products are 
                manufactured in our New Delhi facility using locally sourced materials wherever possible.
              </p>
              <p className="text-gray-300 text-lg">
                By choosing Asian Wires & Cables, you are not just getting quality products - you are 
                supporting local manufacturing, creating jobs, and contributing to India's economic growth.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '100%', label: 'Made in India' },
                { value: '500+', label: 'Local Jobs' },
                { value: '28', label: 'States Served' },
                { value: '30+', label: 'Years Legacy' },
              ].map((item, index) => (
                <div key={index} className="bg-[#171717] border border-[#262626] p-6 text-center">
                  <div className="text-3xl font-bold text-[#E85D04] mb-2">{item.value}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
