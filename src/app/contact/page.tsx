'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Barcode, GUIWindow } from '@/components/retro';
import RetroNavigation from '@/components/RetroNavigation';

const CONTACT_INFO = {
  address: {
    full: 'Ground Floor, 1051, Mahavir Bhawan, Sita Ram Bazar, New Delhi - 110006',
  },
  phone: {
    mobile: '+91-9811733043',
    landline: '011-40079555',
  },
  email: {
    primary: 'brijasian@gmail.com',
    sales: 'sales@asianwires.com',
  },
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E4E3DB] text-[#0F0F0F] font-sans overflow-x-hidden selection:bg-[#F23A18] selection:text-[#0F0F0F] cursor-none relative">
      <RetroNavigation />
      
      <main className="w-full lg:w-[calc(100%-320px)] mt-[72px] lg:mt-0 relative z-10 bg-[#E4E3DB]">
        
        {/* Hero */}
        <section className="border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-8 lg:p-12">
          <h1 className="font-grotesk text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4">
            Comm <span className="text-[#F23A18]">Link</span>
          </h1>
          <p className="font-mono-custom text-lg">
            Get in touch with our team for product inquiries, quotes, and technical support.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Contact Form */}
          <section className="p-8 lg:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-[#0F0F0F] bg-[#E4E3DB]">
            <h2 className="font-grotesk text-3xl font-black uppercase tracking-tighter mb-8">Send Message</h2>
            
            {isSubmitted ? (
              <GUIWindow title="MESSAGE_SENT.EXE" className="w-full">
                <div className="bg-[#E4E3DB] p-8 border-t-4 border-[#0F0F0F] text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#10B981]" />
                  <h3 className="font-grotesk font-black text-2xl mb-2">MESSAGE TRANSMITTED</h3>
                  <p className="font-mono-custom text-sm">Our team will respond within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-3 bg-[#0F0F0F] text-[#E4E3DB] font-mono-custom font-bold border-4 border-[#0F0F0F] hover:bg-[#F23A18] transition-colors"
                  >
                    SEND ANOTHER
                  </button>
                </div>
              </GUIWindow>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F]"
                      placeholder="YOUR NAME"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F]"
                      placeholder="EMAIL@ADDRESS.COM"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F]"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F]"
                      placeholder="COMPANY NAME"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Product Interest</label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F]"
                  >
                    <option value="">SELECT PRODUCT</option>
                    <option value="speaker">Speaker Wires</option>
                    <option value="audio">Audio Cables</option>
                    <option value="cctv">CCTV Cables</option>
                    <option value="multicore">Multi-Core Cables</option>
                    <option value="industrial">Industrial Cables</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-4 border-[#0F0F0F] bg-[#E4E3DB] p-4 font-mono-custom focus:outline-none shadow-[4px_4px_0px_#0F0F0F] resize-none"
                    placeholder="ENTER YOUR MESSAGE..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#F23A18] border-4 border-[#0F0F0F] text-[#0F0F0F] font-mono-custom font-bold shadow-[8px_8px_0px_#0F0F0F] hover:shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </section>

          {/* Contact Info */}
          <section className="p-8 lg:p-12 bg-[#D7D6CD]">
            <h2 className="font-grotesk text-3xl font-black uppercase tracking-tighter mb-8">Contact Info</h2>
            
            <div className="space-y-6">
              <div className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-[#F23A18] flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2">Address</h3>
                    <p className="font-mono-custom text-sm">{CONTACT_INFO.address.full}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <div className="flex items-start gap-4">
                  <Phone className="w-8 h-8 text-[#F23A18] flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2">Phone</h3>
                    <p className="font-mono-custom text-sm">{CONTACT_INFO.phone.mobile}</p>
                    <p className="font-mono-custom text-sm">{CONTACT_INFO.phone.landline}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-4 border-[#0F0F0F] bg-[#E4E3DB] p-6 shadow-[8px_8px_0px_#0F0F0F]">
                <div className="flex items-start gap-4">
                  <Mail className="w-8 h-8 text-[#F23A18] flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2">Email</h3>
                    <p className="font-mono-custom text-sm">{CONTACT_INFO.email.primary}</p>
                    <p className="font-mono-custom text-sm">{CONTACT_INFO.email.sales}</p>
                  </div>
                </div>
              </div>

              <div className="border-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] p-6 shadow-[8px_8px_0px_#F23A18]">
                <h3 className="font-mono-custom text-xs font-bold uppercase tracking-widest mb-2">Business Hours</h3>
                <p className="font-mono-custom text-sm">{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </section>
        </div>

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
