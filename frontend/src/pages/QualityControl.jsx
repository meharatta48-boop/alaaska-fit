import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { ShieldCheck, CheckCircle2, Award, FileText, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function QualityControl() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/config/qualitypage')
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
              Quality Assurance
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Quality Standard Pillars */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {activeContent.standardPillars && activeContent.standardPillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 flex items-center justify-center mb-5">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="font-display font-bold text-sm md:text-base text-[#0F1E45] dark:text-white mb-3 uppercase tracking-wide">
                {p.title}
              </h3>
              <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Lab Testing Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] dark:text-white uppercase tracking-tight flex items-center gap-3">
              <Award size={24} className="text-[#1E3A8A] dark:text-gold-400" />
              Standardized Textile Labs
            </h2>
            <div className="w-12 h-1 bg-[#1E3A8A] dark:bg-gold-400 rounded"></div>
            <p className="text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
              We operate an in-house fabrics testing laboratory verifying shrink rates, colorfastness, crocking, and burst strength to guarantee that every clothing blank meets or exceeds global streetwear and retail durability standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 md:p-8 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] space-y-5"
          >
            <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase flex items-center gap-2 mb-2">
              <FileText size={18} className="text-[#1E3A8A] dark:text-gold-400" />
              Standard Tests Conducted
            </h3>
            
            <div className="divide-y divide-[#C7D9F5]/30 dark:divide-[#262626]">
              {activeContent.testingProcedures && activeContent.testingProcedures.map((tst, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4 text-xs">
                  <span className="font-bold text-[#0F1E45] dark:text-white uppercase">{tst.test}</span>
                  <span className="text-[#5A7BAA] dark:text-[#9CA3AF] font-light text-right">{tst.method}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
