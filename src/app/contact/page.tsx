'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
  address: {
    street: 'Ground Floor, 1051, Mahavir Bhawan',
    locality: 'Sita Ram Bazar',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110006',
    full: 'Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006',
  },
  phone: {
    mobile: '+91-9811733043',
    landline: '011-40079555',
    mobileDisplay: '+91 98117 33043',
    landlineDisplay: '011-4007-9555',
  },
  email: {
    primary: 'brijasian@gmail.com',
    secondary: 'asianwires@yahoo.com',
  },
  hours: {
    weekdays: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    sunday: 'Sunday: Closed',
  },
};

const productCategories = [
  'Speaker Wires',
  'Audio Cables',
  'CCTV Cables',
  'Multi-Core Cables',
  'Digital Mic Cables',
  'Industrial Cables',
  'General Inquiry',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              LET'S <span className="text-[#E85D04]">CONNECT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get in touch for personalized quotes, product inquiries, or expert guidance 
              on choosing the right cables for your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#171717] border border-[#262626] p-8 hover:border-[#E85D04] transition-all group"
            >
              <div className="w-16 h-16 bg-[#E85D04]/10 border border-[#E85D04] flex items-center justify-center mb-6 group-hover:bg-[#E85D04]/20 transition-all">
                <MapPin className="w-8 h-8 text-[#E85D04]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
              <address className="not-italic text-gray-300 space-y-1">
                <p>Ground Floor, 1051</p>
                <p>Mahavir Bhawan</p>
                <p>Sita Ram Bazar</p>
                <p>New Delhi - 110006</p>
              </address>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-[#E85D04] hover:gap-2 transition-all"
              >
                Get Directions <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>

            {/* Call Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#171717] border border-[#262626] p-8 hover:border-[#E85D04] transition-all group"
            >
              <div className="w-16 h-16 bg-[#E85D04]/10 border border-[#E85D04] flex items-center justify-center mb-6 group-hover:bg-[#E85D04]/20 transition-all">
                <Phone className="w-8 h-8 text-[#E85D04]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Call Us</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mobile</p>
                  <a 
                    href={`tel:${CONTACT_INFO.phone.mobile}`}
                    className="text-2xl font-bold text-[#E85D04] hover:text-[#CD853F] transition-colors"
                  >
                    {CONTACT_INFO.phone.mobileDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Landline</p>
                  <a 
                    href={`tel:${CONTACT_INFO.phone.landline}`}
                    className="text-xl font-bold text-gray-300 hover:text-[#E85D04] transition-colors"
                  >
                    {CONTACT_INFO.phone.landlineDisplay}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#171717] border border-[#262626] p-8 hover:border-[#E85D04] transition-all group"
            >
              <div className="w-16 h-16 bg-[#E85D04]/10 border border-[#E85D04] flex items-center justify-center mb-6 group-hover:bg-[#E85D04]/20 transition-all">
                <Mail className="w-8 h-8 text-[#E85D04]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Email Us</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Primary</p>
                  <a 
                    href={`mailto:${CONTACT_INFO.email.primary}`}
                    className="text-lg font-bold text-[#E85D04] hover:text-[#CD853F] transition-colors"
                  >
                    {CONTACT_INFO.email.primary}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Secondary</p>
                  <a 
                    href={`mailto:${CONTACT_INFO.email.secondary}`}
                    className="text-gray-300 hover:text-[#E85D04] transition-colors"
                  >
                    {CONTACT_INFO.email.secondary}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 bg-[#171717] border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#E85D04]" />
              <span className="font-bold">Business Hours:</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
              <span className="text-gray-300">{CONTACT_INFO.hours.weekdays}</span>
              <span className="text-[#E85D04]">{CONTACT_INFO.hours.sunday}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#171717] border border-[#262626] p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-gray-400">Fill out the form below and we'll get back to you shortly</p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      phone: '',
                      email: '',
                      product: '',
                      message: '',
                    });
                  }}
                  className="text-[#E85D04] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                      placeholder="Your Company Ltd."
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Product Interest */}
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-400 mb-2">
                    Interested In
                  </label>
                  <select
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white outline-none transition-colors"
                  >
                    <option value="">Select a product category</option>
                    {productCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border-b-2 border-[#262626] focus:border-[#E85D04] px-0 py-3 text-white placeholder-gray-600 outline-none transition-colors resize-none"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#E85D04] text-black font-bold uppercase tracking-wider py-4 hover:bg-[#CD853F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-gray-500 text-sm">
                  By submitting this form, you agree to our{' '}
                  <Link href="#" className="text-[#E85D04] hover:underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-12 bg-[#171717] border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h3>
              <p className="text-gray-400">Call us directly for urgent inquiries</p>
            </div>
            <a
              href={`tel:${CONTACT_INFO.phone.mobile}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#E85D04] text-black font-bold uppercase tracking-wider hover:bg-[#CD853F] transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              {CONTACT_INFO.phone.mobileDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
