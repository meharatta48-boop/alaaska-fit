import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { CheckCircle2, AlertCircle, Loader2, Send, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';

const PRODUCT_TYPES = ['Oversized T-Shirt', 'Heavyweight Hoodie', 'Tracksuit Set', 'Polo Shirt', 'Shorts', 'Cargo Pants', 'Jacket', 'Other'];
const FABRICS = ['100% Combed Cotton', '100% Carded Cotton', 'French Terry', 'Fleece', 'Polyester Blend', 'Organic Cotton'];
const GSM_OPTIONS = ['160 GSM', '200 GSM', '220 GSM', '240 GSM', '260 GSM', '320 GSM', '380 GSM', '420 GSM', '450 GSM'];
const PRINTING = ['Screen Print', 'DTG', 'Puff Print', 'Discharge Print', 'Sublimation', 'Heat Transfer', 'None'];
const EMBROIDERY = ['Flat Embroidery', '3D Puff Embroidery', 'Chenille Patch', 'No Embroidery'];
const PACKAGING = ['Standard Polybag', 'Branded Polybag', 'Tissue Paper Wrap', 'Luxury Magnetic Box', 'Mailing Carton'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export default function RequestQuote() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    productType: '', quantity: 100, fabric: '', gsm: '', colors: [], sizes: [],
    printing: '', embroidery: '', packaging: '',
    clientName: '', clientEmail: '', clientPhone: '', message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (field, value) => {
    setForm(p => ({
      ...p,
      [field]: p[field].includes(value)
        ? p[field].filter(v => v !== value)
        : [...p[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.productType) return;
    setStatus('submitting');
    try {
      await apiFetch('/quotes', { method: 'POST', body: JSON.stringify(form) });
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const ToggleBtn = ({ value, field }) => (
    <button
      type="button"
      onClick={() => toggle(field, value)}
      className={`px-3 py-1.5 text-xs border rounded cursor-pointer transition-all ${
        form[field].includes(value)
          ? 'bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black border-transparent font-bold'
          : 'bg-white dark:bg-[#161616] text-[#0F1E45] dark:text-[#9CA3AF] border-[#C7D9F5] dark:border-[#262626] hover:border-[#1E3A8A]/50'
      }`}
    >
      {value}
    </button>
  );

  const SelectBtn = ({ value, field }) => (
    <button
      type="button"
      onClick={() => setForm(p => ({ ...p, [field]: value }))}
      className={`px-3 py-1.5 text-xs border rounded cursor-pointer transition-all ${
        form[field] === value
          ? 'bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black border-transparent font-bold'
          : 'bg-white dark:bg-[#161616] text-[#0F1E45] dark:text-[#9CA3AF] border-[#C7D9F5] dark:border-[#262626] hover:border-[#1E3A8A]/50'
      }`}
    >
      {value}
    </button>
  );

  if (status === 'success') {
    return (
      <div className="bg-white dark:bg-[#0A0A0A] min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-20 pb-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto px-6">
            <CheckCircle2 size={64} className="text-gold-400 mx-auto mb-6 animate-bounce" />
            <h2 className="font-display font-bold text-3xl text-[#0F1E45] dark:text-white uppercase mb-4">Quote Submitted!</h2>
            <p className="text-sm text-matte-text mb-8 leading-relaxed">Our expert production team will review your specifications and send a detailed pricing quote within 24 business hours.</p>
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-gold-400 hover:bg-gold-500 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors">
              Return to Home
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              Factory-Direct Pricing
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-4 uppercase">
              Request a Quote
            </h1>
            <p className="text-sm text-[#5A7BAA] dark:text-[#9CA3AF] max-w-xl mx-auto leading-relaxed font-light">
              Configure your custom apparel specs below. Our production team will respond within 24 hours.
            </p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s ? 'bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black' : 'bg-[#F0F5FF] dark:bg-[#161616] text-matte-text border border-[#C7D9F5] dark:border-[#262626]'
                }`}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-[#1E3A8A] dark:bg-gold-400' : 'bg-[#C7D9F5] dark:bg-[#262626]'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-14 mt-2 text-[10px] text-matte-text font-mono">
            <span>PRODUCT</span>
            <span>DETAILS</span>
            <span>CONTACT</span>
          </div>
        </section>

        {/* Form */}
        <section className="max-w-3xl mx-auto px-6 md:px-12">
          <form onSubmit={handleSubmit}>
            <div className="glass-panel border border-[#C7D9F5]/40 dark:border-[#262626] rounded-3xl p-6 md:p-10 space-y-8">

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs flex items-center gap-2">
                  <AlertCircle size={16} /><span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1 - Product Type */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase mb-1">Step 1: Product Type</h3>
                    <p className="text-[10px] text-matte-text font-mono">Select what you'd like manufactured</p>
                  </div>

                  <div>
                    <label className="label-style">Product Category *</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PRODUCT_TYPES.map(v => <SelectBtn key={v} value={v} field="productType" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Target Quantity (pieces) *</label>
                    <input
                      type="number" min={50} value={form.quantity}
                      onChange={e => setForm(p => ({ ...p, quantity: parseInt(e.target.value) || 50 }))}
                      className="input-style max-w-[200px]"
                    />
                    <p className="text-[10px] text-matte-text mt-1.5">Minimum order: 50 pieces per style/color</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!form.productType}
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <span>Continue</span><ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 - Details */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase mb-1">Step 2: Specifications</h3>
                    <p className="text-[10px] text-matte-text font-mono">Configure fabric, sizes, embellishments</p>
                  </div>

                  <div>
                    <label className="label-style">Fabric Composition</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {FABRICS.map(v => <SelectBtn key={v} value={v} field="fabric" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Fabric Weight (GSM)</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {GSM_OPTIONS.map(v => <SelectBtn key={v} value={v} field="gsm" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Size Range (multi-select)</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {SIZES.map(v => <ToggleBtn key={v} value={v} field="sizes" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Printing Method</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PRINTING.map(v => <SelectBtn key={v} value={v} field="printing" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Embroidery Detail</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {EMBROIDERY.map(v => <SelectBtn key={v} value={v} field="embroidery" />)}
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Packaging Choice</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PACKAGING.map(v => <SelectBtn key={v} value={v} field="packaging" />)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="px-5 py-2.5 border border-[#C7D9F5] dark:border-[#262626] text-[#0F1E45] dark:text-white text-xs font-bold uppercase rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                      Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded cursor-pointer">
                      <span>Continue</span><ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Contact */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase mb-1">Step 3: Contact Details</h3>
                    <p className="text-[10px] text-matte-text font-mono">Tell us who you are and where to send the quote</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-style">Full Name *</label>
                      <input type="text" value={form.clientName} onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))} required className="input-style" placeholder="Brand owner / buyer" />
                    </div>
                    <div>
                      <label className="label-style">Email Address *</label>
                      <input type="email" value={form.clientEmail} onChange={e => setForm(p => ({ ...p, clientEmail: e.target.value }))} required className="input-style" placeholder="you@brand.com" />
                    </div>
                    <div>
                      <label className="label-style">Phone / WhatsApp</label>
                      <input type="text" value={form.clientPhone} onChange={e => setForm(p => ({ ...p, clientPhone: e.target.value }))} className="input-style" placeholder="+1 555 000 0000" />
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Additional Instructions</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={4} className="input-style resize-none" placeholder="Any special requirements, pantone colors, urgency timelines, or design notes..." />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2.5 border border-[#C7D9F5] dark:border-[#262626] text-[#0F1E45] dark:text-white text-xs font-bold uppercase rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/5">
                      Back
                    </button>
                    <button type="submit" disabled={status === 'submitting' || !form.clientName || !form.clientEmail} className="flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer disabled:opacity-50">
                      {status === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Submit Quote</>}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </form>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
