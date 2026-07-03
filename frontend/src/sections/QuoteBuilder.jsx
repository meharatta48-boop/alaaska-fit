import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['Product', 'Specs', 'Options', 'Contact'];

const PRODUCT_TYPES = ['Oversized T-Shirt', 'Heavyweight Hoodie', 'Tracksuit Set', 'Polo Shirt', 'Gym Wear', 'Streetwear Jacket', 'Cargo Pants', 'Kids Wear'];
const FABRICS = ['100% Organic Carded Cotton', '100% Combed Cotton', 'French Terry', 'Fleece', 'Polyblend (80/20)', 'Pique', 'Tech Mesh'];
const GSMS = ['160 GSM', '200 GSM', '220 GSM', '240 GSM', '280 GSM', '320 GSM', '360 GSM', '400 GSM', '420 GSM'];
const COLORS = ['Black', 'White', 'Cream/Ecru', 'Beige', 'Navy', 'Stone Gray', 'Chocolate Brown', 'Army Green', 'Burgundy', 'Custom Pantone'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const PRINT_METHODS = ['Screen Print', 'DTG (Direct to Garment)', 'Discharge Print', 'High-Density Puff', 'Water-Based Print', 'Heat Transfer', 'Sublimation', 'No Print'];
const PACKAGING = ['Individual Polybag', 'Branded Polybag', 'Luxury Magnetic Box', 'Flat Pack', 'Hanger Ready'];

function ToggleChip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-3 py-2 text-xs rounded-lg border font-mono tracking-wide cursor-pointer transition-all duration-200 ${
        selected
          ? 'bg-gold-400 text-black border-gold-400 font-bold shadow-sm'
          : 'bg-white text-[#4A5568] border-[#D1D9EE] hover:border-[#1E3A8A]/40 hover:text-[#1E3A8A] hover:bg-[#F0F5FF]'
      }`}
    >
      {label}
    </button>
  );
}

export default function QuoteBuilder() {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    productType: '',
    quantity: 200,
    fabric: '',
    gsm: '',
    colors: [],
    sizes: [],
    printing: '',
    embroidery: 'None',
    packaging: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    message: ''
  });

  const toggle = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const canProceed = () => {
    if (step === 0) return !!form.productType;
    if (step === 1) return !!form.fabric && !!form.gsm && form.sizes.length > 0;
    if (step === 2) return form.colors.length > 0 && !!form.printing && !!form.packaging;
    if (step === 3) return !!form.clientName && !!form.clientEmail;
    return true;
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setSubmitting(true);
    setError('');
    try {
      await apiFetch('/quotes', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          quantity: parseInt(form.quantity)
        })
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const stepVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } })
  };
  const [direction, setDirection] = useState(1);

  const goNext = () => { setDirection(1); setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const goPrev = () => { setDirection(-1); setStep(s => Math.max(s - 1, 0)); };

  if (submitted) {
    return (
      <section id="quote" className="bg-[#F8FAFF] border-b border-[#E2E8F5] py-24">
        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <CheckCircle2 size={64} className="text-gold-400" />
          <h2 className="font-display font-bold text-3xl text-[#0F1E45] uppercase tracking-tight">Quote Request Received!</h2>
          <p className="text-[#6B7EA0] text-sm font-light leading-relaxed max-w-md">
            Thank you, <span className="text-[#0F1E45] font-semibold">{form.clientName}</span>. Our export sales team will review your inquiry and get back within 24–48 hours via email at <span className="text-gold-400">{form.clientEmail}</span>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setForm({ productType: '', quantity: 200, fabric: '', gsm: '', colors: [], sizes: [], printing: '', embroidery: 'None', packaging: '', clientName: '', clientEmail: '', clientPhone: '', message: '' }); }}
            className="mt-4 px-8 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="bg-[#F8FAFF] border-b border-[#E2E8F5] py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            FACTORY DIRECT PRICING
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            {t('quoteBuilderTitle')}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] font-light leading-relaxed">
            {t('quoteBuilderSubtitle')}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-10">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${i <= step ? 'text-gold-400' : 'text-[#6B7EA0]'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border text-[10px] font-bold transition-all ${i < step ? 'bg-gold-400 text-black border-gold-400' : i === step ? 'border-gold-400 text-gold-400 bg-[#FFFBEB]' : 'border-[#D1D9EE] text-[#6B7EA0] bg-white'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden md:inline">{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px transition-all ${i < step ? 'bg-gold-400' : 'bg-[#E2E8F5]'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content Panel */}
        <div className="bg-white border border-[#E2E8F5] rounded-2xl p-6 md:p-10 min-h-[380px] flex flex-col justify-between overflow-hidden shadow-sm">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 flex flex-col gap-6"
            >
              {/* STEP 0: Product */}
              {step === 0 && (
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F1E45] mb-2">{t('formProductType')}</h3>
                  <p className="text-xs text-[#6B7EA0] mb-6 font-light">Select the primary garment category for your custom order.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PRODUCT_TYPES.map(p => (
                      <ToggleChip key={p} label={p} selected={form.productType === p} onClick={() => set('productType', p)} />
                    ))}
                  </div>
                  <div className="mt-8">
                    <label className="block text-xs text-[#6B7EA0] mb-2 font-mono uppercase tracking-wider">{t('formQuantity')}</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range" min={50} max={10000} step={50}
                        value={form.quantity}
                        onChange={(e) => set('quantity', e.target.value)}
                        className="flex-1 accent-gold-400"
                      />
                      <div className="bg-[#F0F5FF] border border-[#D1D9EE] rounded-lg px-4 py-2 font-mono text-gold-400 font-bold text-sm min-w-[80px] text-center">
                        {parseInt(form.quantity).toLocaleString()} pcs
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Specs */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0F1E45] mb-1">{t('formFabric')}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {FABRICS.map(f => (
                        <ToggleChip key={f} label={f} selected={form.fabric === f} onClick={() => set('fabric', f)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7EA0] mb-3 font-mono uppercase tracking-wider">{t('formGSM')}</label>
                    <div className="flex flex-wrap gap-2">
                      {GSMS.map(g => (
                        <ToggleChip key={g} label={g} selected={form.gsm === g} onClick={() => set('gsm', g)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7EA0] mb-3 font-mono uppercase tracking-wider">{t('formSizes')}</label>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map(s => (
                        <ToggleChip key={s} label={s} selected={form.sizes.includes(s)} onClick={() => toggle('sizes', s)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Options */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs text-[#6B7EA0] mb-3 font-mono uppercase tracking-wider">{t('formColors')}</label>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map(c => (
                        <ToggleChip key={c} label={c} selected={form.colors.includes(c)} onClick={() => toggle('colors', c)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7EA0] mb-3 font-mono uppercase tracking-wider">{t('formPrinting')}</label>
                    <div className="flex flex-wrap gap-2">
                      {PRINT_METHODS.map(p => (
                        <ToggleChip key={p} label={p} selected={form.printing === p} onClick={() => set('printing', p)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6B7EA0] mb-3 font-mono uppercase tracking-wider">{t('formPackaging')}</label>
                    <div className="flex flex-wrap gap-2">
                      {PACKAGING.map(p => (
                        <ToggleChip key={p} label={p} selected={form.packaging === p} onClick={() => set('packaging', p)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <h3 className="font-display font-bold text-lg text-[#0F1E45]">Almost there — tell us how to reach you</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">{t('formName')} *</label>
                      <input
                        type="text" value={form.clientName}
                        onChange={(e) => set('clientName', e.target.value)}
                        placeholder="Your full name or brand name"
                        className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">{t('formEmail')} *</label>
                      <input
                        type="email" value={form.clientEmail}
                        onChange={(e) => set('clientEmail', e.target.value)}
                        placeholder="brand@example.com"
                        className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">{t('formPhone')}</label>
                      <input
                        type="tel" value={form.clientPhone}
                        onChange={(e) => set('clientPhone', e.target.value)}
                        placeholder="+1 234 567 8900"
                        dir="ltr"
                        className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">Summary</label>
                      <div className="bg-[#F0F5FF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-[10px] font-mono text-[#6B7EA0] leading-relaxed">
                        {form.productType} · {form.quantity} pcs · {form.gsm} · {form.fabric}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7EA0] mb-2">{t('formMessage')}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      rows={3}
                      placeholder="Special instructions, tech pack notes, sample request..."
                      className="w-full bg-[#F8FAFF] border border-[#D1D9EE] rounded-lg px-4 py-3 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors resize-none"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs font-mono bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                      <AlertCircle size={14} /> {error}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#E2E8F5]">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-3 border border-[#D1D9EE] text-xs font-mono uppercase tracking-wider rounded-lg text-[#0F1E45] hover:border-[#1E3A8A] hover:bg-[#F0F5FF] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft size={14} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Continue <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <>{t('btnSubmitQuote')} <ChevronRight size={14} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
