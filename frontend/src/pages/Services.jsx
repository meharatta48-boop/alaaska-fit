import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Settings, ShieldCheck, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function Services() {
  const { t, isRTL } = useLanguage();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/config/servicespage')
      .then(data => {
        if (data) setConfig(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-gold-400" />
      </div>
    );
  }

  const activeContent = config || {};

  const getSlugLink = (title) => {
    if (title.toLowerCase().includes('private label')) return '/services/private-label';
    if (title.toLowerCase().includes('oem') || title.toLowerCase().includes('custom manufacturing')) return '/services/custom';
    return '/services/oem';
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              Garment Manufacturing Services
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Services Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeContent.list && activeContent.list.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 md:p-8 border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 flex items-center justify-center mb-6">
                    {idx === 0 ? <Settings size={22} /> : <ShieldCheck size={22} />}
                  </div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-[#0F1E45] dark:text-white uppercase mb-4 tracking-wide">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light mb-6">
                    {srv.desc}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {srv.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2.5 text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-light">
                        <CheckCircle2 size={14} className="text-[#1E3A8A] dark:text-gold-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={getSlugLink(srv.title)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1E3A8A] dark:text-gold-400 hover:underline group"
                >
                  <span>Explore Details</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
