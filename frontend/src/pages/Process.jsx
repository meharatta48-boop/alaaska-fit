import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Cpu, Scissors, Award, Compass, Sparkles, Truck, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

const STEP_ICONS = {
  '01': Compass,
  '02': Sparkles,
  '03': Scissors,
  '04': Cpu,
  '05': Award,
  '06': Truck
};

export default function Process() {
  const { t, isRTL } = useLanguage();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/config/processpage')
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

  const getStepIcon = (stepNum) => {
    return STEP_ICONS[stepNum] || Compass;
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
              {t('navProcess')}
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Process List */}
        <section className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="relative border-l border-[#C7D9F5] dark:border-[#262626] ml-4 md:ml-8 space-y-16 py-4">
            {activeContent.steps && activeContent.steps.map((step, idx) => {
              const IconComp = getStepIcon(step.stepNumber);
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-8 md:pl-12 group"
                >
                  {/* Bullet */}
                  <div className="absolute left-[-17px] top-0.5 w-8 h-8 rounded-full bg-white dark:bg-[#161616] border-2 border-[#1E3A8A] dark:border-gold-400 flex items-center justify-center text-xs font-mono font-bold text-[#1E3A8A] dark:text-gold-400 group-hover:bg-[#1E3A8A] dark:group-hover:bg-gold-400 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                    {step.stepNumber}
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 rounded-xl text-[#1E3A8A] dark:text-gold-400">
                        <IconComp size={22} />
                      </div>
                      <h3 className="font-display font-bold text-lg md:text-xl text-[#0F1E45] dark:text-white uppercase tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
