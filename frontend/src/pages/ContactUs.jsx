import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { MapPin, Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';

export default function ContactUs() {
  const { t, isRTL } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [msg, setMsg] = useState('');

  useEffect(() => {
    apiFetch('/config/settings')
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(err => console.error(err));
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('submitting');
    setMsg('');
    try {
      await apiFetch('/contacts', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setMsg(err.message || 'Error sending message. Please try again.');
      setStatus('error');
    }
  };

  const activeSettings = settings || {
    contactEmail: 'production@alaaskafit.com',
    contactPhone: '+92 300 1234567',
    factoryAddress: 'Industrial Zone Block A, Karachi, Pakistan',
    googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115814.77583626787!2d67.0142345!3d24.8719409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06a12c4f1d%3A0xcc5c46d32906e5d8!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000',
    mapConfig: { enableMap: true }
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              {t('navContact')}
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              {t('contactTitle')}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {t('contactSubtitle')}
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Channels & Map */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <a href={`mailto:${activeSettings.contactEmail}`} className="flex items-center gap-4 p-5 glass-card rounded-xl">
                <div className="p-3 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-matte-text mb-0.5">Email Channels</p>
                  <p className="text-sm font-medium text-[#0F1E45] dark:text-white">{activeSettings.contactEmail}</p>
                </div>
              </a>

              <a href={`tel:${activeSettings.contactPhone.replace(/\s+/g, '')}`} className="flex items-center gap-4 p-5 glass-card rounded-xl">
                <div className="p-3 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 rounded-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-matte-text mb-0.5">Hotline Numbers</p>
                  <p className="text-sm font-medium text-[#0F1E45] dark:text-white" dir="ltr">{activeSettings.contactPhone}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                <div className="p-3 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 rounded-lg shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-matte-text mb-0.5">{t('locationLabel')}</p>
                  <p className="text-sm font-medium text-[#0F1E45] dark:text-white leading-relaxed">{activeSettings.factoryAddress}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            {activeSettings.mapConfig?.enableMap && (
              <div className="map-container rounded-xl overflow-hidden h-64 border border-[#C7D9F5]/40 dark:border-[#262626]">
                <iframe
                  src={activeSettings.googleMapsUrl}
                  title="Factory Map View"
                  allowFullScreen
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Form */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-[#C7D9F5]/40 dark:border-[#262626]">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4 h-full">
                <CheckCircle2 size={48} className="text-gold-400 animate-bounce" />
                <h3 className="font-display font-bold text-xl text-[#0F1E45] dark:text-white">Message Dispatched!</h3>
                <p className="text-xs text-matte-text max-w-xs leading-relaxed">Thank you for contacting Al Aaska Fit. A sales director will reach out within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 px-6 py-2.5 bg-gold-400 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase mb-1">Direct Factory Inquiry</h3>
                  <p className="text-[10px] text-matte-text font-mono">Fill in details and get dynamic email routing</p>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{msg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Full Name *</label>
                    <input
                      type="text" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      required className="input-style" placeholder="Brand manager name"
                    />
                  </div>
                  <div>
                    <label className="label-style">Email Address *</label>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      required className="input-style" placeholder="manager@brand.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-style">Subject</label>
                  <input
                    type="text" value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="input-style" placeholder="e.g. Sampling rates / bulk hoodies run"
                  />
                </div>

                <div>
                  <label className="label-style">Message / Spec details *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={6} required className="input-style resize-none"
                    placeholder="Describe print counts, quantities, target weight (GSM), and timelines..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gold-400 hover:bg-gold-500 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Transmitting...</> : <><Send size={14} /> Dispatch Message</>}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
