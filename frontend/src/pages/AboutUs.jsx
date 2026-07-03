import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { BookOpen, Calendar, Compass, Shield, Users, Award, Landmark, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

const ICON_MAP = {
  'Uncompromised Quality': Shield,
  'معیار پر کوئی سمجھوتہ نہیں': Shield,
  'جودة لا تضاهى': Shield,
  'Ethical Workspaces': Users,
  'اخلاقی کام کی جگہ': Users,
  'بيئة عمل أخلاقية': Users,
  'Eco Innovation': Compass,
  'ماحول دوست طریقے': Compass,
  'الابتكار البيئي': Compass,
  'Global Export Excellence': Award,
  'برآمدات میں مہارت': Award,
  'التميز اللوجستي': Award
};

export default function AboutUs() {
  const { locale, t, isRTL } = useLanguage();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/config/aboutpage')
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

  const getIcon = (title) => {
    return ICON_MAP[title] || Shield;
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              {t('navOurStory')}
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Heritage Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 aspect-[4/5] bg-gradient-to-tr from-[#1E3A8A] to-[#1E3370] rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl group border border-[#1E3A8A]/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60"></div>
              
              {/* Geometric Grid Art */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <Landmark size={36} className="text-[#93C5FD] mb-6 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-[#93C5FD] uppercase block mb-2">Established 2012</span>
                <h2 className="font-display font-bold text-3xl tracking-tight leading-none text-white uppercase">ALAASKA<br />FIT</h2>
              </div>

              <div className="relative z-10 mt-auto pt-8 border-t border-white/10">
                <p className="text-[11px] font-mono text-[#93C5FD] tracking-wider uppercase mb-1">Production Hub</p>
                <p className="text-xs text-white/95 font-light leading-relaxed">
                  Karachi Industrial Zone Block A, Pakistan
                </p>
              </div>
            </motion.div>

            {/* Core Narrative */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] dark:text-white tracking-tight uppercase flex items-center gap-3">
                <BookOpen size={20} className="text-[#1E3A8A] dark:text-gold-400" />
                {activeContent.heritageTitle}
              </h2>
              <div className="w-12 h-1 bg-[#1E3A8A] dark:bg-gold-400 rounded"></div>
              <p className="text-sm md:text-base text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                {activeContent.heritageText1}
              </p>
              <p className="text-sm md:text-base text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                {activeContent.heritageText2}
              </p>

              {/* Stat highlight card */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#C7D9F5]/40 dark:border-matte-border/20">
                <div className="p-4 bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 rounded-2xl border border-[#C7D9F5]/30 dark:border-gold-400/10">
                  <p className="text-2xl md:text-3xl font-display font-bold text-[#1E3A8A] dark:text-gold-400">12M+</p>
                  <p className="text-[10px] md:text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-mono uppercase tracking-wider mt-1">Garments Shipped</p>
                </div>
                <div className="p-4 bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 rounded-2xl border border-[#C7D9F5]/30 dark:border-gold-400/10">
                  <p className="text-2xl md:text-3xl font-display font-bold text-[#1E3A8A] dark:text-gold-400">45+</p>
                  <p className="text-[10px] md:text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-mono uppercase tracking-wider mt-1">Export Markets</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-[#F0F5FF]/60 dark:bg-[#121212]/60 border-y border-[#C7D9F5]/30 dark:border-[#262626] py-24 mb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] dark:text-white uppercase tracking-tight flex items-center justify-center gap-3">
                <Calendar size={22} className="text-[#1E3A8A] dark:text-gold-400" />
                {activeContent.timelineTitle || 'Milestones of Excellence'}
              </h2>
              <p className="text-xs md:text-sm text-[#5A7BAA] dark:text-[#9CA3AF] font-light mt-3 leading-relaxed">
                {activeContent.timelineSubtitle || 'Our timeline reflects our commitment to innovation and craftsmanship.'}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-[#C7D9F5] dark:border-[#262626] ml-4 md:ml-0 md:left-1/2 md:border-l md:border-r-0 md:transform md:-translate-x-1/2 space-y-12 py-8">
              {activeContent.timeline && activeContent.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className={`relative w-full flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle marker */}
                    <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-4.5 h-4.5 rounded-full bg-[#1E3A8A] dark:bg-gold-400 border-4 border-white dark:border-[#0A0A0A] z-10 shadow" />

                    {/* Content block */}
                    <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white dark:bg-[#161616] p-6 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <span className="text-xs font-mono font-bold text-[#1E3A8A] dark:text-gold-400 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 px-2.5 py-1 rounded">
                          {item.year}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white mt-3 mb-2 uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] dark:text-white uppercase tracking-tight">
              {activeContent.valuesTitle || 'Our Pillars of Trust'}
            </h2>
            <p className="text-xs md:text-sm text-[#5A7BAA] dark:text-[#9CA3AF] font-light mt-3 leading-relaxed">
              {activeContent.valuesSubtitle || 'The core values that guide our operations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeContent.values && activeContent.values.map((val, idx) => {
              const IconComp = getIcon(val.title);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#161616] border border-[#C7D9F5]/40 dark:border-[#262626] hover:border-[#1E3A8A]/30 dark:hover:border-gold-400/30 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 group-hover:bg-[#1E3A8A] dark:group-hover:bg-gold-400 text-[#1E3A8A] dark:text-gold-400 group-hover:text-white dark:group-hover:text-black flex items-center justify-center transition-colors mb-5 shadow-inner">
                    <IconComp size={22} />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0F1E45] dark:text-white mb-2 uppercase tracking-wide">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                    {val.desc}
                  </p>
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
