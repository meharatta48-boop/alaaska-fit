import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function AnimatedCounter({ targetValue, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const end = parseInt(targetValue);
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, targetValue, duration]);

  const fmt = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return n.toLocaleString();
  };

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl md:text-5xl text-[#1E3A8A]">
      {fmt(count)}{suffix}
    </span>
  );
}

const DEFAULT_STATS = [
  { value: 5000000, suffix: '+', label: 'Pieces Produced', sub: 'Annually across all categories', icon: '🧵' },
  { value: 45, suffix: '+', label: 'Countries Served', sub: 'Global export destinations', icon: '🌍' },
  { value: 12, suffix: '+', label: 'Years Experience', sub: 'In premium apparel manufacturing', icon: '📅' },
  { value: 250, suffix: '+', label: 'Brand Partners', sub: 'Worldwide active clients', icon: '🤝' },
];

const PARTNERS = ['VOID NYC', 'Arkiv Studio', 'Dunes Premium', 'Northside Co.', 'KASANE JP', 'Collective Nine', 'RawForm', 'Apex Athletics'];

export default function Trust({ stats: propStats }) {
  const activeStats = propStats || DEFAULT_STATS;

  return (
    <section id="trust" className="bg-[#F8FAFF] border-b border-[#E2E8F5] section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="eyebrow mb-3">Factory Output Stats</div>
          <h2 className="heading-lg text-[#0F1E45]">
            Scale That <span className="shimmer-text">Delivers</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {activeStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              className="premium-card p-8 text-center group"
            >
              <div className="text-3xl mb-4">{stat.icon || '⚡'}</div>
              <AnimatedCounter targetValue={stat.value} suffix={stat.suffix || ''} />
              <div className="mt-2.5 text-sm font-display font-bold text-[#0F1E45]">{stat.label}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-[#8A9BB8]" style={{ fontFamily: 'Space Grotesk, monospace' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners Marquee */}
        <div className="border-t border-[#E2E8F5] pt-12">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-[#8A9BB8] mb-8" style={{ fontFamily: 'Space Grotesk, monospace' }}>
            Trusted By Premium Labels Worldwide
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F8FAFF] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F8FAFF] to-transparent z-10 pointer-events-none" />
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[...PARTNERS, ...PARTNERS].map((name, i) => (
                <div key={i} className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#E2E8F5] bg-white font-display font-semibold text-[11px] tracking-[0.12em] uppercase text-[#6B7EA0] hover:text-[#1E3A8A] hover:border-[#BFDBFE] hover:bg-[#EFF6FF] transition-colors whitespace-nowrap cursor-default shadow-[0_1px_4px_rgba(15,30,69,0.05)]">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
