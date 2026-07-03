import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { MapPin, Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      await apiFetch('/quotes', {
        method: 'POST',
        body: JSON.stringify({
          productType: form.subject || 'General Contact Inquiry',
          quantity: 1,
          clientName: form.name,
          clientEmail: form.email,
          message: form.message
        })
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-[#F8FAFF] border-b border-[#E2E8F5] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            Global Exports & Sales
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            {t('contactTitle')}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] max-w-xl font-light leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <a href="mailto:production@alaaskafit.com" className={`flex items-center gap-4 p-5 bg-white border border-[#E2E8F5] rounded-xl hover:border-gold-400/40 hover:shadow-md group transition-all ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="p-3 bg-gold-400/10 rounded-lg group-hover:bg-gold-400 group-hover:text-black transition-all">
                  <Mail size={20} className="text-gold-400 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-0.5">Email</p>
                  <p className="text-sm text-[#0F1E45] font-medium">production@alaaskafit.com</p>
                </div>
              </a>

              <a href="tel:+923001234567" className={`flex items-center gap-4 p-5 bg-white border border-[#E2E8F5] rounded-xl hover:border-gold-400/40 hover:shadow-md group transition-all ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="p-3 bg-gold-400/10 rounded-lg group-hover:bg-gold-400 group-hover:text-black transition-all">
                  <Phone size={20} className="text-gold-400 group-hover:text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-0.5">Phone / WhatsApp</p>
                  <p className="text-sm text-[#0F1E45] font-medium" dir="ltr">+92 300 1234567</p>
                </div>
              </a>

              <div className={`flex items-start gap-4 p-5 bg-white border border-[#E2E8F5] rounded-xl ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="p-3 bg-gold-400/10 rounded-lg shrink-0">
                  <MapPin size={20} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-0.5">{t('locationLabel')}</p>
                  <p className="text-sm text-[#0F1E45] font-medium">Industrial Zone Block A,<br />Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="map-container rounded-xl overflow-hidden h-56 border border-[#E2E8F5]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115814.77583626787!2d67.0142345!3d24.8719409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06a12c4f1d%3A0xcc5c46d32906e5d8!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                title="Factory Location Map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-[#E2E8F5] rounded-2xl p-6 md:p-8 shadow-sm">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <CheckCircle2 size={48} className="text-gold-400" />
                <h3 className="font-display font-bold text-xl text-[#0F1E45]">Message Sent!</h3>
                <p className="text-xs text-[#6B7EA0] max-w-xs leading-relaxed">Our team will respond within 24 hours. You can also reach us directly on WhatsApp.</p>
                <button onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setStatus('idle'); }} className="mt-4 px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`flex flex-col gap-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#0F1E45] mb-1">Direct Inquiry</h3>
                  <p className="text-xs text-[#6B7EA0] font-light">Fill in the details and we'll get back within 24 hours.</p>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">Full Name *</label>
                    <input
                      type="text" value={form.name}
                      onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Brand owner / buyer"
                      required
                      className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">Email Address *</label>
                    <input
                      type="email" value={form.email}
                      onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@brand.com"
                      required
                      className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">Subject</label>
                  <input
                    type="text" value={form.subject}
                    onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="Bulk order inquiry / sampling request"
                    className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={5}
                    placeholder="Describe your product type, quantity, and timeline..."
                    required
                    className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
