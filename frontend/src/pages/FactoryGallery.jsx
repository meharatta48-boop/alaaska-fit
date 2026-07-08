import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { Eye, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function FactoryGallery() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    apiFetch('/config/gallerypage')
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
  const items = activeContent.items || [];
  
  const categories = ['All', ...new Set(items.map(item => item.category))];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

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
              Visual Tour
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              {activeContent.title || 'Factory Gallery'}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle || 'Take an inside look at our specialized manufacturing departments.'}
            </p>
          </motion.div>
        </section>

        {/* Filter categories */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black border-transparent font-bold'
                  : 'bg-white dark:bg-[#161616] text-[#2D4A7A] dark:text-[#9CA3AF] border-[#C7D9F5]/40 dark:border-[#262626] hover:border-[#1E3A8A]/50 dark:hover:border-gold-400/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.name}
                  className="glass-card overflow-hidden rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] relative aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <SmartImage
                    src={item.url}
                    alt={item.name}
                    loading={idx < 4 ? 'eager' : 'lazy'}
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                    wrapperStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'unset' }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 text-white">
                    <span className="text-[9px] font-mono uppercase tracking-wider bg-gold-400/20 text-gold-400 px-2.5 py-1 rounded border border-gold-400/30 self-start">
                      {item.category}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm tracking-wide uppercase">{item.name}</h4>
                      <p className="text-[10px] text-white/60 font-light mt-1 flex items-center gap-1"><Eye size={12} /> Click to view full image</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
