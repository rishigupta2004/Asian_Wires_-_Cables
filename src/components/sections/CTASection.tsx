'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = {
  phone: {
    mobile: '+91-9811733043',
    landline: '011-40079555',
  },
  email: {
    primary: 'brijasian@gmail.com',
  },
  address: {
    full: 'Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006',
  },
};

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Reset form or show success message
  };

  return (
    <section 
      ref={sectionRef}
      data-section="8" 
      className="min-h-[100dvh] relative bg-[var(--background-secondary)] flex items-center py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--background-primary)] to-transparent opacity-50 pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)] font-mono text-sm tracking-[0.2em] uppercase">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] font-display"
            >
              Ready to Power <br />
              Your <span className="text-[var(--accent-primary)]">Project?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[var(--foreground-secondary)] mb-12 leading-relaxed max-w-md"
            >
              Get personalized quotes and expert guidance for your wire and cable requirements. 
              Our team is ready to help you choose the perfect solution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <a 
                href={`tel:${CONTACT_INFO.phone.mobile}`}
                className="flex items-center gap-6 p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--background-primary)] hover:border-[var(--accent-primary)] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-[var(--background-primary)] transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-1 font-mono">Call us</div>
                  <div className="text-xl font-bold font-display text-[var(--foreground-primary)]">{CONTACT_INFO.phone.mobile}</div>
                </div>
              </a>

              <a 
                href={`mailto:${CONTACT_INFO.email.primary}`}
                className="flex items-center gap-6 p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--background-primary)] hover:border-[var(--accent-primary)] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[var(--accent-primary)] group-hover:text-[var(--background-primary)] transition-colors duration-300" />
                </div>
                <div>
                  <div className="text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-1 font-mono">Email us</div>
                  <div className="text-xl font-bold font-display text-[var(--foreground-primary)]">{CONTACT_INFO.email.primary}</div>
                </div>
              </a>

              <div className="flex items-center gap-6 p-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--background-primary)]">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-1 font-mono">Visit us</div>
                  <div className="text-base text-[var(--foreground-secondary)] leading-relaxed">{CONTACT_INFO.address.full}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[var(--background-primary)] border border-[var(--border-subtle)] rounded-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-[var(--accent-primary)]" />
              <h3 className="text-2xl font-bold font-display">Send us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-2 font-mono">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none transition-all text-[var(--foreground-primary)] placeholder:text-[var(--foreground-quaternary)]"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-2 font-mono">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none transition-all text-[var(--foreground-primary)] placeholder:text-[var(--foreground-quaternary)]"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-2 font-mono">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none transition-all text-[var(--foreground-primary)] placeholder:text-[var(--foreground-quaternary)]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider mb-2 font-mono">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-lg focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] focus:outline-none transition-all text-[var(--foreground-primary)] placeholder:text-[var(--foreground-quaternary)] resize-none"
                  placeholder="Tell us about your requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--accent-primary)] text-[var(--background-primary)] font-bold uppercase tracking-wider rounded-lg hover:bg-[var(--accent-secondary)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
