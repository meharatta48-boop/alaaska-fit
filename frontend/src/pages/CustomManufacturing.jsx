import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Scissors, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CustomManufacturing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              OEM & ODM Services
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Custom Manufacturing
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              We manufacture garments according to your exact specifications, measurement charts, fabric blends, and print designs.
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] dark:text-white uppercase mb-6">
              Tailored Bulk Apparel Sourcing
            </h2>
            <p className="text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light mb-6">
              Al Aaska Fit operates an enterprise-grade dye lab, CAD cutting tables, embroidery units, and stitching lines in Karachi, enabling B2B clothing labels to construct unique garments from the fiber up.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { title: 'Pattern Sizing & Grading', desc: 'Send us your flat specs or tech pack, and our CAD master tailors will grade sizes from XS to 3XL.' },
                { title: 'Pantone Matching & Custom Dyeing', desc: 'Develop custom colorways matching exact Pantone shade codes using eco-friendly chemical reactive dyes.' },
                { title: 'Advanced Embellishments', desc: 'Choose between 3D puff print, vintage wash, distressed edges, screen print, or chenille appliques.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="p-2 h-10 w-10 rounded-lg bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 text-[#1E3A8A] dark:text-gold-400 flex items-center justify-center shrink-0">
                    <Scissors size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-display text-[#0F1E45] dark:text-white uppercase mb-1">{item.title}</h4>
                    <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg md:text-xl text-[#0F1E45] dark:text-white uppercase mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#1E3A8A] dark:text-gold-400" />
                Minimum Order Requirements (MOQ)
              </h3>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Oversized Streetwear Tees: 100 pieces per color / style',
                  'Heavyweight French Terry Hoodies: 150 pieces per color / style',
                  'Matching Athletic Tracksuits: 120 sets per color / style',
                  'Custom Dyed Blends & Poly-mix Fabrics: 200 pieces'
                ].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-light">
                    <CheckCircle2 size={14} className="text-[#1E3A8A] dark:text-gold-400 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 rounded-xl flex gap-3 border border-[#C7D9F5]/20 dark:border-gold-400/10">
                <HelpCircle size={20} className="text-[#1E3A8A] dark:text-gold-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#5A7BAA] dark:text-[#9CA3AF] font-light leading-relaxed">
                  Need a smaller sampling run first? We support pre-production custom samples to ensure quality before placing bulk orders.
                </p>
              </div>
            </div>

            <Link
              to="/request-quote"
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-gold-400 hover:bg-gold-500 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              <span>Launch Quote Builder</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
