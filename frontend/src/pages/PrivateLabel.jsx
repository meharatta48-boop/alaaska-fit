import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Tag, Package, Sparkles, Box, ArrowRight } from 'lucide-react';

export default function PrivateLabel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packagingOptions = [
    {
      icon: Tag,
      title: 'Custom Neck Labels',
      desc: 'Add satin printed tags, heat transfer stamps, or woven labels stitched seamlessly onto the collars.'
    },
    {
      icon: Sparkles,
      title: 'Premium Cardboard Hang Tags',
      desc: 'Thick matte black paperboard with custom embossed branding or shiny metallic foil stamping.'
    },
    {
      icon: Package,
      title: 'Eco Polybags',
      desc: 'Pack your goods in biodegradable compostable frosted polybags featuring custom logo printing.'
    },
    {
      icon: Box,
      title: 'Luxury Magnetic Boxes',
      desc: 'Rigid magnetic luxury presentation boxes or branded matte mailing cartons for direct-to-consumer premium brands.'
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
              Private Label Blanks
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Private Label Customization
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              Add your brand identity to our premium blanks library. From woven tags to rigid magnetic boxes, we build everything.
            </p>
          </motion.div>
        </section>

        {/* Brand Options Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {packagingOptions.map((opt, idx) => {
            const IconComp = opt.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] flex gap-5"
              >
                <div className="p-3.5 bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 h-12 w-12 rounded-xl flex items-center justify-center shrink-0">
                  <IconComp size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base md:text-lg text-[#0F1E45] dark:text-white uppercase mb-2">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light">
                    {opt.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="bg-[#F0F5FF] dark:bg-[#121212] border border-[#C7D9F5]/30 dark:border-[#262626] rounded-3xl p-8 md:p-12">
            <h3 className="font-display font-bold text-xl md:text-2xl text-[#0F1E45] dark:text-white mb-4 uppercase">
              Ready to Customize Blanks?
            </h3>
            <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Explore our premium blanks catalog, select your silhouettes, and specify private label parameters in the custom quote builder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3 bg-[#1E3A8A] hover:bg-[#163086] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Browse Blanks Catalog</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/request-quote"
                className="px-6 py-3 border border-[#C7D9F5] dark:border-[#262626] text-[#0F1E45] dark:text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Configure Custom Blanks Order
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
