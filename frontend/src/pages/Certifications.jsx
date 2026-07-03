import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Award, ShieldAlert, BadgeCheck, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certsList = [
    {
      title: 'OEKO-TEX Standard 100',
      id: 'SHAO 098172',
      desc: 'Guarantees that our finished yarns and fabrics are free from harmful levels of toxic substances and skin-damaging chemicals.',
      issuer: 'OEKO-TEX Association'
    },
    {
      title: 'Global Organic Textile Standard (GOTS)',
      id: 'GOTS-C-87163',
      desc: 'Validates that our organic cotton lines are fully traced from harvesting, post-treatment, spin mills, and final packaging.',
      issuer: 'GOTS certified organic cotton tracker'
    },
    {
      title: 'ISO 9001:2015',
      id: 'PK912-QA-900',
      desc: 'The benchmark standard for operational quality management, design engineering consistency, and factory safety systems.',
      issuer: 'ISO International Standards'
    },
    {
      title: 'BSCI Social Compliance Code',
      id: 'BSCI-ID-182736',
      desc: 'Verifies that our workers enjoy fair wages, standard hours, workplace accident insurance, and complete gender equity.',
      issuer: 'Business Social Compliance Initiative'
    }
  ];

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
              International B2B Standards
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Factory Certifications
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              Al Aaska Fit operates in full alignment with international safety, environmental, and ethical labor codes.
            </p>
          </motion.div>
        </section>

        {/* Certificates Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certsList.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] flex gap-5"
            >
              <div className="p-3.5 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                <BadgeCheck size={22} />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display font-bold text-base md:text-lg text-[#0F1E45] dark:text-white uppercase">
                    {c.title}
                  </h3>
                  <span className="text-[10px] font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">
                    ID: {c.id}
                  </span>
                </div>
                <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                  {c.desc}
                </p>
                <p className="text-[10px] font-mono text-[#5A7BAA]/60 dark:text-[#9CA3AF]/60 uppercase">
                  Verified by: {c.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
