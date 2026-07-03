import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Webb',
    brand: 'VOID Streetwear — USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Al Aaska Fit transformed our brand. The 450 GSM hoodie quality is unmatched — our customers frequently comment on the weight and feel. Lead times are precise, and the QA process is rigorous.',
  },
  {
    name: 'Lena Hoffmann',
    brand: 'Arkiv Studio — Germany',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: "We've tried 6 factories before. None came close to the consistency and detail orientation Al Aaska provides. The private label packaging elevates our unboxing experience completely.",
  },
  {
    name: 'Tariq Al-Mansouri',
    brand: 'Dunes Premium — UAE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'From Karachi to Dubai — the logistics and customs clearance support was seamless. Our co-branded gym wear line became our best-seller. Highly recommend for Middle East brands.',
  },
  {
    name: 'Sofia Reyes',
    brand: 'Collective Nine — Mexico',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'The embroidery work on our tracksuits is museum-quality. 3D puff on 420 GSM French Terry with metallic threads — something no local factory could replicate at this price point.',
  },
  {
    name: "James O'Brien",
    brand: 'Northside Co. — UK',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'We scaled from 500 to 20,000 pieces per month without a single quality drop. The production team communicates professionally and the tech pack turnaround is lightning fast.',
  },
  {
    name: 'Yuki Tanaka',
    brand: 'KASANE — Japan',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Japanese standards are unforgiving. Al Aaska passed our fabric weight tolerance tests and wash shrinkage specs flawlessly. The only factory we trust for our premium basics line.',
  },
];

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management' },
  { name: 'AQL 1.5', desc: 'Inspection Standard' },
  { name: 'OEKO-TEX®', desc: 'Fabric Safety' },
  { name: 'GOTS', desc: 'Organic Textiles' },
  { name: 'BSCI', desc: 'Social Compliance' },
  { name: 'SGS Certified', desc: 'Global Testing' },
];

function TestimonialCard({ t, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-[#E2E8F5] rounded-2xl p-7 flex flex-col gap-5 relative shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div className="absolute top-5 right-5 text-[#E2E8F5]">
        <Quote size={36} />
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {Array(t.rating).fill(0).map((_, i) => (
          <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-[#4A5568] leading-relaxed font-light flex-1">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F5]">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover border border-[#E2E8F5]"
        />
        <div>
          <div className="font-display font-bold text-sm text-[#0F1E45]">{t.name}</div>
          <div className="text-[10px] font-mono text-gold-400 tracking-wider">{t.brand}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F0F4FC] border-b border-[#E2E8F5] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-left mb-16">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-3">
            Client Success Stories
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            Trusted By 250+<br />
            <span className="text-[#6B7EA0] text-2xl md:text-4xl">Global Clothing Brands</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] max-w-xl font-light leading-relaxed">
            From independent streetwear labels to 7-figure fashion companies — our factory delivers results that speak for themselves.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-[#E2E8F5] pt-16">
          <div className="text-center mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6B7EA0]">
              International Certifications &amp; Compliance Standards
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-[#E2E8F5] rounded-xl p-4 text-center hover:border-gold-400/40 hover:shadow-sm transition-all cursor-default"
              >
                <div className="font-display font-bold text-sm text-gold-400 mb-1">{cert.name}</div>
                <div className="text-[10px] font-mono text-[#6B7EA0] uppercase tracking-wider">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#6B7EA0] mb-6">
            Ready to join 250+ satisfied brands?
          </p>
          <button
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-gold-400/20 cursor-pointer"
          >
            Start Your Production Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
