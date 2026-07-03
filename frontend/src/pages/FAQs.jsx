import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Plus, Minus, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

const faqData = [
  { category: 'Sampling', q: 'What is your Minimum Order Quantity (MOQ)?', a: 'Our standard Minimum Order Quantity is 100 pieces per style/color. We offer lower minimums (e.g., 50 pieces) for custom premium sampling and initial collection launches to help emerging luxury brands grow.' },
  { category: 'Production', q: 'What are your typical production lead times?', a: 'Sampling and tech pack creation typically take 7 to 10 working days. Once the pre-production sample is approved, bulk production takes 20 to 30 days, depending on the complexity of printing, embroidery, and wash specifications.' },
  { category: 'Sourcing', q: 'Do you offer custom fabric sourcing and GSM configurations?', a: 'Yes. We customize fabrics from the fiber up. We specialize in heavyweight streetwear fabrics, including 240 GSM single jerseys, 360-450 GSM French Terry, and 400-500 GSM fleeces. Sourcing options include 100% Organic Cotton (GOTS certified), Supima cotton, bamboo blends, and premium polyesters.' },
  { category: 'Sourcing', q: 'Can you work from mockups or sketches if I do not have tech packs?', a: 'Absolutely. Our in-house product developers can translate your design sketches, digital mockups, or even reference images into factory-grade technical packs with precise measurement charts.' },
  { category: 'Production', q: 'What custom embellishment techniques do you support?', a: 'We offer a full spectrum of high-end details: screen printing (plastisol, water-based, puff, discharge, metallic, and reflective), direct-to-garment (DTG), sublimation, 3D puff embroidery, flat embroidery, chenille patches, custom woven labels, and laser engraving.' },
  { category: 'Shipping', q: 'Do you handle global shipping and customs clearance?', a: 'Yes, we manufacture for global clients and ship worldwide. We provide express door-to-door shipping via DHL/FedEx (takes 4-7 days) as well as commercial air cargo and ocean freight. Our logistics team handles customs paperwork to ensure a hassle-free delivery experience.' }
];

export default function FAQs() {
  const { t, isRTL } = useLanguage();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Sampling', 'Production', 'Sourcing', 'Shipping'];

  const filteredFaqs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              B2B Q&A
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              Understand MOQs, shipping pathways, sampling options, and fabric custom choices.
            </p>
          </motion.div>
        </section>

        {/* Filters and search */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-8 relative">
          <Search className="absolute left-10 top-3.5 text-matte-text" size={16} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions or keyword answers..."
            className="w-full bg-[#F0F5FF] dark:bg-[#121212] border border-[#C7D9F5]/40 dark:border-[#262626] rounded-xl pl-12 pr-4 py-3 text-xs text-[#0F1E45] dark:text-white placeholder:text-matte-text outline-none focus:border-[#1E3A8A] dark:focus:border-gold-400 transition-colors"
          />
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-12 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(-1); }}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black border-transparent font-bold'
                  : 'bg-white dark:bg-[#161616] text-[#2D4A7A] dark:text-[#9CA3AF] border-[#C7D9F5]/40 dark:border-[#262626]'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Accordions */}
        <section className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="glass-panel border border-[#C7D9F5]/40 dark:border-[#262626] rounded-2xl p-6 md:p-8 space-y-2">
            {filteredFaqs.map((item, idx) => (
              <div key={idx} className="border-b border-[#C7D9F5]/20 dark:border-[#262626]/40 last:border-none">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  className={`w-full py-5 flex items-center justify-between gap-4 outline-none cursor-pointer group ${
                    isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'
                  }`}
                >
                  <span className="font-display font-bold text-sm md:text-base text-[#0F1E45] dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-gold-400 transition-colors leading-tight">
                    {item.q}
                  </span>
                  <span className="shrink-0 p-2 bg-[#F0F5FF] dark:bg-black border border-[#C7D9F5]/40 dark:border-[#262626] rounded-lg group-hover:border-[#1E3A8A]/30 dark:group-hover:border-gold-400/30 transition-colors">
                    {openIndex === idx ? <Minus size={14} className="text-gold-400" /> : <Plus size={14} className="text-gold-400" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className={`pb-5 text-xs md:text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light ${isRTL ? 'text-right' : 'text-left'}`}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
