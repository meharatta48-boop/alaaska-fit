import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Zap, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BADGES = [
  { icon: ShieldCheck, text: 'AQL 1.5 Certified', color: '#D4AF37' },
  { icon: Zap, text: '100% Solar Run', bg: '#1E3A8A' },
  { icon: Award, text: 'GOTS Organic', color: '#10B981' },
];

export default function Hero({ config }) {
  const navigate = useNavigate();
  const [showReel, setShowReel] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const highlightItems = config?.highlights?.length ? config.highlights : BADGES;
  const videoUrl = config?.bgVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4';
  const fallbackImg = config?.bgFallbackImageUrl || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&auto=format&fit=crop&q=80';

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen pt-20 flex items-center bg-white overflow-hidden"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-[#F0F6FF] to-transparent" />
          <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-[#1E3A8A]/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(#0F1E45 1px, transparent 1px), linear-gradient(90deg, #0F1E45 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10 py-16">

          {/* Left: Content */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
            className="lg:col-span-6 xl:col-span-5 space-y-8"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1E3A8A]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                {config?.eyebrow || 'Est. 2012 · Premium Textile Mill'}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display font-extrabold text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-tight leading-[1.04] text-[#0F1E45] uppercase">
                {config?.title || 'Luxury Apparel'}<br />
                <span className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#D4AF37] bg-clip-text text-transparent">
                  {config?.subtitle || 'Manufacturing'}
                </span>
              </h1>
              <p className="mt-5 text-[0.95rem] leading-[1.8] text-[#4A6080] max-w-[480px]">
                {config?.description || 'We engineer premium custom streetwear, heavyweight blanks, and high-density embroidery runs for global luxury labels — fully ISO & AQL compliant.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2">
              {highlightItems.map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F5] bg-white/80 px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || '#D4AF37' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A6080]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    {item.text || item.label || item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => goTo('/quote')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#1E3A8A] hover:bg-[#162A5E] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(30,58,138,0.30)] hover:shadow-[0_8px_28px_rgba(30,58,138,0.40)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {config?.primaryBtnText || 'Get Custom Quote'}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => goTo('/products')}
                className="inline-flex items-center gap-2 px-7 py-3.5 border-[1.5px] border-[#E2E8F5] hover:border-[#1E3A8A] text-[#1E3A8A] text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#EFF6FF] transition-all duration-200 cursor-pointer"
              >
                {config?.secondaryBtnText || 'Explore Catalog'}
              </button>

              <button
                onClick={() => setShowReel(true)}
                className="group inline-flex items-center gap-2.5 text-[#8A9BB8] hover:text-[#1E3A8A] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span className="w-9 h-9 rounded-full border border-[#E2E8F5] group-hover:border-[#1E3A8A] group-hover:bg-[#EFF6FF] flex items-center justify-center transition-all">
                  <Play size={12} className="fill-[#1E3A8A] stroke-none ml-0.5" />
                </span>
                Watch Reel
              </button>
            </div>

            {/* Stats */}
            <div className="pt-6 border-t border-[#E2E8F5] grid grid-cols-4 gap-4">
              {[
                { val: '5M+', label: 'Pieces/Year' },
                { val: '45+', label: 'Countries' },
                { val: '100', label: 'Min. MOQ' },
                { val: '12+', label: 'Yrs Exp.' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="space-y-0.5"
                >
                  <div className="font-display font-extrabold text-lg text-[#0F1E45]">{s.val}</div>
                  <div className="text-[9px] font-medium uppercase tracking-widest text-[#8A9BB8]" style={{ fontFamily: 'Space Grotesk, monospace' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop'].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-[10px] text-[#8A9BB8] mt-0.5">Trusted by 250+ global brands</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Video Frame */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1], delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px]">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/10 to-[#D4AF37]/8 rounded-3xl blur-2xl scale-105" />

              {/* Main video card */}
              <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,30,69,0.14)] border border-[#E2E8F5] overflow-hidden aspect-[4/3] p-3">
                <div className="rounded-2xl overflow-hidden w-full h-full">
                  <video
                    autoPlay loop muted playsInline
                    poster={fallbackImg}
                    className="w-full h-full object-cover"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                  {/* Video overlay */}
                  <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-[#0F1E45]/30 via-transparent to-transparent" />
                </div>

                {/* Floating badge — top right */}
                <div className="absolute -top-4 -right-4 bg-white border border-[#E2E8F5] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#0F1E45]" style={{ fontFamily: 'Space Grotesk, monospace' }}>AQL 1.5 Certified</span>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-4 -left-4 bg-[#1E3A8A] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <Zap size={13} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white" style={{ fontFamily: 'Space Grotesk, monospace' }}>Solar Powered</span>
                </div>

                {/* Inner bottom overlay info */}
                <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-white/60">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-[#0F1E45]">GOTS Organic</p>
                    <p className="text-[7px] text-[#8A9BB8] mt-0.5">100% Certified Cotton</p>
                  </div>
                  <button
                    onClick={() => setShowReel(true)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-[#1E3A8A] hover:border-[#1E3A8A] group transition-all cursor-pointer"
                  >
                    <Play size={14} className="fill-[#1E3A8A] group-hover:fill-white stroke-none ml-0.5 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#B0BFDA]" style={{ fontFamily: 'Space Grotesk, monospace' }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#1E3A8A]/40 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Reel Modal */}
      <AnimatePresence>
        {showReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0F1E45]/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowReel(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video autoPlay controls className="w-full h-full object-cover bg-black">
                <source src={videoUrl} type="video/mp4" />
              </video>
            </motion.div>
            <button
              className="absolute top-5 right-6 text-white/60 hover:text-white text-[11px] font-medium uppercase tracking-widest cursor-pointer transition-colors"
              onClick={() => setShowReel(false)}
            >
              ✕ Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
