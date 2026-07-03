import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Star, MessageSquare } from 'lucide-react';

export default function Testimonials() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviews = [
    {
      name: 'Oliver Hansen',
      company: 'Nordic Streetwear Group',
      role: 'Founder & CEO',
      text: 'Al Aaska Fit has been our manufacturing partner for 4 seasons now. Their 240 GSM organic cotton t-shirts have the best drape we have found worldwide. Fast shipping, smooth customs clearance, and amazing response times.',
      rating: 5
    },
    {
      name: 'Amir Al-Otaibi',
      company: 'Oasis Gymwear',
      role: 'Director of Sourcing',
      text: 'Their French Terry fleece weight configuration is phenomenal. We order 420 GSM custom dyed hoodies and the seams, hood thickness, and screen print puff details are exceptional. Truly world-class quality.',
      rating: 5
    },
    {
      name: 'Sarah Jenkins',
      company: 'Aura Athletics',
      role: 'Production Manager',
      text: 'Ethical manufacturing was our primary criteria. Knowing their facility is GOTS certified and runs primarily on solar power made our partner selection easy. Quality checks are rigorous, and they stand by their work.',
      rating: 5
    },
    {
      name: 'Kenji Sato',
      company: 'Zero Label Tokyo',
      role: 'Creative Director',
      text: 'Their custom private labeling services are clean and premium. The woven neck labels and frosted biodegradable polybags make our products arrive retail-ready.',
      rating: 5
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
              Global Clients
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Brand Reviews
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              See what international clothing labels and private sportswear brands say about our products and work ethics.
            </p>
          </motion.div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {Array(rev.rating).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 stroke-transparent" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light italic">
                  "{rev.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-[#C7D9F5]/20 dark:border-[#262626]/20">
                <div className="w-9 h-9 rounded-full bg-[#EEF4FF] dark:bg-[#1E3A8A]/20 flex items-center justify-center text-[#1E3A8A] dark:text-gold-400 font-bold font-display text-xs">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F1E45] dark:text-white uppercase leading-none">{rev.name}</h4>
                  <p className="text-[10px] text-matte-text font-mono mt-1">{rev.company} &bull; {rev.role}</p>
                </div>
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
