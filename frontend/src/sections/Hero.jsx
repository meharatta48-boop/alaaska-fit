import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Zap, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from '../components/SmartImage.jsx';

const BADGES = [
  { icon: ShieldCheck, text: 'AQL 1.5 Certified', color: '#D4AF37' },
  { icon: Zap, text: '100% Solar Run', bg: '#1E3A8A' },
  { icon: Award, text: 'GOTS Organic', color: '#10B981' },
];

export default function Hero({ config }) {
  const navigate = useNavigate();
  const [showReel, setShowReel] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const videoRef = useRef(null);

  const highlightItems = config?.highlights?.length ? config.highlights : BADGES;
  const preset = config?.preset || 'signature';
  const animation = config?.animation || 'slide';
  const showStats = config?.showStats !== false;
  const showTrustRow = config?.showTrustRow !== false;
  const videoUrl = config?.bgVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4';
  const fallbackImg = config?.bgFallbackImageUrl || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop&q=75';
  const trustImages = useMemo(() => [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&auto=format&fit=crop&q=70',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&auto=format&fit=crop&q=70',
  ], []);

  const motionVariants = {
    slide: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.9, ease: [0.25, 0.8, 0.25, 1] } },
    fade:  { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
    zoom:  { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.85, ease: [0.25, 0.8, 0.25, 1] } },
  };
  const motionProps = motionVariants[animation] || motionVariants.slide;

  const isDark = preset === 'editorial' || preset === 'immersive';

  const visualClass = preset === 'editorial'
    ? 'bg-[#0F1E45] text-white'
    : preset === 'immersive'
      ? 'bg-[#071225] text-white'
      : 'bg-white';

  const primaryButtonClass = preset === 'editorial'
    ? 'bg-[#D4AF37] text-[#0F1E45] hover:bg-[#c79e26]'
    : preset === 'immersive'
      ? 'bg-white text-[#0F1E45] hover:bg-[#F8FAFF]'
      : 'bg-[#1E3A8A] hover:bg-[#162A5E] text-white';

  const secondaryButtonClass = preset === 'editorial'
    ? 'border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10'
    : preset === 'immersive'
      ? 'border-white/30 text-white hover:bg-white/10'
      : 'border-[#E2E8F5] text-[#1E3A8A] hover:bg-[#EFF6FF]';

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="hero"
        className={`relative min-h-screen pt-20 flex items-center ${visualClass}`}
        style={{ overflow: 'hidden' }}
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F0F6FF] to-transparent" />
          <div className="absolute -top-60 -right-60 w-[min(700px,80vw)] h-[min(700px,80vw)] rounded-full bg-[#1E3A8A]/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[min(400px,60vw)] h-[min(400px,60vw)] rounded-full bg-[#D4AF37]/[0.05] blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(#0F1E45 1px, transparent 1px), linear-gradient(90deg, #0F1E45 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div
          className="max-w-7xl mx-auto w-full relative py-12 sm:py-16"
          style={{
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: 'clamp(2rem, 5vw, 3rem)',
            zIndex: 1,
          }}
        >
          {/* Responsive: two columns on lg+ */}
          <style>{`
            @media (min-width: 1024px) {
              #hero-grid { grid-template-columns: 5fr 7fr !important; }
            }
          `}</style>
          <div id="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(2rem, 5vw, 3rem)', width: '100%' }}>

            {/* Left: Content */}
            <motion.div
              ref={leftRef}
              initial={motionProps.initial}
              animate={motionProps.animate}
              transition={motionProps.transition}
              className="space-y-6 sm:space-y-8"
              style={{ minWidth: 0 }}
            >
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-full" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse flex-shrink-0" />
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.22em] truncate ${isDark ? 'text-[#D4AF37]' : 'text-[#1E3A8A]'}`}
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  {config?.eyebrow || 'Est. 2012 · Premium Textile Mill'}
                </span>
              </div>

              {/* Headline — fluid responsive with clamp() */}
              <div>
                <h1
                  className={`font-display font-extrabold tracking-tight leading-[1.05] uppercase ${isDark ? 'text-white' : 'text-[#0F1E45]'}`}
                  style={{ fontSize: 'clamp(1.875rem, 5.5vw, 4rem)', wordBreak: 'break-word' }}
                >
                  {config?.title || 'Luxury Apparel'}<br />
                  <span className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#D4AF37] bg-clip-text text-transparent">
                    {config?.subtitle || 'Manufacturing'}
                  </span>
                </h1>
                <p
                  className={`mt-4 sm:mt-5 leading-[1.8] max-w-[480px] ${isDark ? 'text-white/80' : 'text-[#4A6080]'}`}
                  style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)' }}
                >
                  {config?.description || 'We engineer premium custom streetwear, heavyweight blanks, and high-density embroidery runs for global luxury labels — fully ISO & AQL compliant.'}
                </p>
              </div>

              {/* Highlight badges */}
              <div className="flex flex-wrap gap-2">
                {highlightItems.map((item, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm ${isDark ? 'border-white/20 bg-white/10 text-white' : 'border-[#E2E8F5] bg-white/80'}`}
                  >
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color || '#D4AF37' }} />
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'text-white/90' : 'text-[#4A6080]'}`}
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {item.text || item.label || item}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => goTo('/quote')}
                  className={`group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(30,58,138,0.30)] hover:shadow-[0_8px_28px_rgba(30,58,138,0.40)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${primaryButtonClass}`}
                  style={{ padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.75rem)' }}
                >
                  {config?.primaryBtnText || 'Get Custom Quote'}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => goTo('/products')}
                  className={`inline-flex items-center gap-2 border-[1.5px] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer ${secondaryButtonClass}`}
                  style={{ padding: 'clamp(0.625rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.75rem)' }}
                >
                  {config?.secondaryBtnText || 'Explore Catalog'}
                </button>

                <button
                  onClick={() => setShowReel(true)}
                  className={`group inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${isDark ? 'text-white/80 hover:text-white' : 'text-[#8A9BB8] hover:text-[#1E3A8A]'}`}
                >
                  <span className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${isDark ? 'border-white/20 group-hover:border-white/40 group-hover:bg-white/10' : 'border-[#E2E8F5] group-hover:border-[#1E3A8A] group-hover:bg-[#EFF6FF]'}`}>
                    <Play size={12} className={`${isDark ? 'fill-white' : 'fill-[#1E3A8A]'} stroke-none ml-0.5`} />
                  </span>
                  Watch Reel
                </button>
              </div>

              {/* Stats — 2 cols on mobile, 4 on sm+ */}
              {showStats && (
                <div className={`pt-6 border-t ${isDark ? 'border-white/15' : 'border-[#E2E8F5]'} grid grid-cols-2 sm:grid-cols-4 gap-4`}>
                  {[
                    { val: '5M+',  label: 'Pieces/Year' },
                    { val: '45+',  label: 'Countries' },
                    { val: '100',  label: 'Min. MOQ' },
                    { val: '12+',  label: 'Yrs Exp.' },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="space-y-0.5"
                    >
                      <div
                        className={`font-display font-extrabold ${isDark ? 'text-white' : 'text-[#0F1E45]'}`}
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
                      >
                        {s.val}
                      </div>
                      <div
                        className={`text-[9px] font-medium uppercase tracking-widest ${isDark ? 'text-white/70' : 'text-[#8A9BB8]'}`}
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Trust row */}
              {showTrustRow && (
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2 flex-shrink-0">
                    {trustImages.map((src, i) => (
                      <SmartImage
                        key={i}
                        src={src}
                        alt="Brand partner"
                        wrapperClassName="rounded-full border-2 border-white"
                        wrapperStyle={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0 }}
                        loading="eager"
                        objectFit="cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#D4AF37] text-[#D4AF37]" />)}
                    </div>
                    <p className={`text-[10px] mt-0.5 ${isDark ? 'text-white/70' : 'text-[#8A9BB8]'}`}>
                      Trusted by 250+ global brands
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right: Video Frame */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1], delay: 0.15 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 0 }}
            >
              <div
                className="relative w-full"
                style={{ maxWidth: 'min(560px, 100%)', isolation: 'isolate' }}
              >
                {/* Outer glow — clipped to not overflow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A]/10 to-[#D4AF37]/[0.08] rounded-3xl blur-2xl scale-105 pointer-events-none" style={{ zIndex: -1 }} />

                {/* Main video card */}
                <div
                  className="relative bg-white rounded-3xl border border-[#E2E8F5] overflow-hidden p-3"
                  style={{
                    aspectRatio: '4/3',
                    boxShadow: '0 20px 60px rgba(15,30,69,0.14)',
                  }}
                >
                  <div className="rounded-2xl overflow-hidden w-full h-full relative">
                    {/* Shimmer skeleton while video loads */}
                    {!videoLoaded && (
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, #E8EEF8 0%, #F5F8FF 40%, #E8EEF8 80%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmerSlide 1.6s ease-in-out infinite',
                        }}
                      />
                    )}

                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={fallbackImg}
                      preload="metadata"
                      onCanPlay={() => setVideoLoaded(true)}
                      className="w-full h-full object-cover"
                      style={{
                        opacity: videoLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>

                    {/* Video overlay gradient */}
                    <div className="absolute inset-3 rounded-2xl bg-gradient-to-t from-[#0F1E45]/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating badge — inside card boundary (no overflow) */}
                  <div className="absolute top-4 right-4 bg-white border border-[#E2E8F5] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5" style={{ zIndex: 2 }}>
                    <ShieldCheck size={13} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#0F1E45] whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      AQL 1.5 Certified
                    </span>
                  </div>

                  {/* Floating badge — bottom left inside card */}
                  <div className="absolute bottom-4 left-4 bg-[#1E3A8A] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5" style={{ zIndex: 2 }}>
                    <Zap size={13} className="text-[#D4AF37] flex-shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white whitespace-nowrap" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Solar Powered
                    </span>
                  </div>

                  {/* Inner bottom overlay info */}
                  <div className="absolute bottom-12 left-5 right-5 flex items-end justify-between" style={{ zIndex: 2 }}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-white/60">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-[#0F1E45]">GOTS Organic</p>
                      <p className="text-[7px] text-[#8A9BB8] mt-0.5">100% Certified Cotton</p>
                    </div>
                    <button
                      onClick={() => setShowReel(true)}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-[#1E3A8A] hover:border-[#1E3A8A] group transition-all cursor-pointer flex-shrink-0"
                    >
                      <Play size={14} className="fill-[#1E3A8A] group-hover:fill-white stroke-none ml-0.5 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ zIndex: 1 }}
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
