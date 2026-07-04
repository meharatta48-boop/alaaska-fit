import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Tag, BookOpen, ShoppingBag, Box, Pen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivateLabel() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Tag,
      title: t('labelNeckLabels'),
      description: t('descNeckLabels'),
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&auto=format&fit=crop&q=80'
    },
    {
      icon: BookOpen,
      title: t('labelHangTags'),
      description: t('descHangTags'),
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80'
    },
    {
      icon: ShoppingBag,
      title: t('labelPolyBags'),
      description: t('descPolyBags'),
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80'
    },
    {
      icon: Box,
      title: t('labelBrandPackaging'),
      description: t('descBrandPackaging'),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80'
    },
    {
      icon: Pen,
      title: 'Brand Printing',
      description: 'Custom screen-printed exterior cartons, tissue wraps, sticker seals, and ribbon closures personalized to your brand identity.',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&auto=format&fit=crop&q=80'
    },
    {
      icon: Award,
      title: 'OEM Manufacturing',
      description: 'Full turnkey OEM/ODM production. We manufacture from raw material sourcing to finished goods ready for your retail shelves.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="privatelabel" className="bg-[#F0F4FC] border-b border-[#E2E8F5] py-24 relative overflow-hidden">
      {/* BG Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            OEM / ODM Services
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            {t('privateLabelTitle')}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] max-w-xl font-light leading-relaxed">
            {t('privateLabelSubtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white border border-[#E2E8F5] rounded-xl overflow-hidden group cursor-default hover:shadow-md hover:-translate-y-1 transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E45]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-gold-400 text-black p-2 rounded-lg">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-display font-bold text-sm tracking-wide text-[#0F1E45] mb-2 group-hover:text-gold-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#6B7EA0] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-[#0F1E45] border border-[#1E3A8A]/20 rounded-2xl p-8 md:p-12 text-center">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-3">
            FULL WHITE-LABEL SOLUTION
          </div>
          <h3 className="font-display font-bold text-2xl md:text-4xl text-white uppercase mb-4">
            Your brand. Our factory. Zero compromise.
          </h3>
          <p className="text-xs md:text-sm text-white/70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            From ideation to production-ready bulk garments — we manage every detail with precision. MOQ as low as 100 pcs per style.
          </p>
          <button
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-gold-400/20 cursor-pointer"
          >
            Start Private Label Project
          </button>
        </div>
      </div>
    </section>
  );
}
