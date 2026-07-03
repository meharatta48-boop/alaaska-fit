import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    questionKey: 'faqQ1',
    answerKey: 'faqA1',
    defaultQ: 'What is your Minimum Order Quantity (MOQ)?',
    defaultA: 'Our standard Minimum Order Quantity is 100 pieces per style/color. We offer lower minimums (e.g., 50 pieces) for custom premium sampling and initial collection launches to help emerging luxury brands grow.'
  },
  {
    questionKey: 'faqQ2',
    answerKey: 'faqA2',
    defaultQ: 'What are your typical production lead times?',
    defaultA: 'Sampling and tech pack creation typically take 7 to 10 working days. Once the pre-production sample is approved, bulk production takes 20 to 30 days, depending on the complexity of printing, embroidery, and wash specifications.'
  },
  {
    questionKey: 'faqQ3',
    answerKey: 'faqA3',
    defaultQ: 'Do you offer custom fabric sourcing and GSM configurations?',
    defaultA: 'Yes. We customize fabrics from the fiber up. We specialize in heavyweight streetwear fabrics, including 240 GSM single jerseys, 360-450 GSM French Terry, and 400-500 GSM fleeces. Sourcing options include 100% Organic Cotton (GOTS certified), Supima cotton, bamboo blends, and premium polyesters.'
  },
  {
    questionKey: 'faqQ4',
    answerKey: 'faqA4',
    defaultQ: 'Can you work from mockups or sketches if I do not have tech packs?',
    defaultA: 'Absolutely. Our in-house product developers can translate your design sketches, digital mockups, or even reference images into factory-grade technical packs with precise measurement charts.'
  },
  {
    questionKey: 'faqQ5',
    answerKey: 'faqA5',
    defaultQ: 'What custom embellishment techniques do you support?',
    defaultA: 'We offer a full spectrum of high-end details: screen printing (plastisol, water-based, puff, discharge, metallic, and reflective), direct-to-garment (DTG), sublimation, 3D puff embroidery, flat embroidery, chenille patches, custom woven labels, and laser engraving.'
  },
  {
    questionKey: 'faqQ6',
    answerKey: 'faqA6',
    defaultQ: 'Do you handle global shipping and customs clearance?',
    defaultA: 'Yes, we manufacture for global clients and ship worldwide. We provide express door-to-door shipping via DHL/FedEx (takes 4-7 days) as well as commercial air cargo and ocean freight. Our logistics team handles customs paperwork to ensure a hassle-free delivery experience.'
  }
];

function FAQItem({ item, isOpen, onClick, isRTL, t }) {
  // Resolve localized text or use default
  const question = t(item.questionKey) !== item.questionKey ? t(item.questionKey) : item.defaultQ;
  const answer = t(item.answerKey) !== item.answerKey ? t(item.answerKey) : item.defaultA;

  return (
    <div className="border-b border-matte-border/60 last:border-none">
      <button
        onClick={onClick}
        className={`w-full py-6 flex items-center justify-between gap-4 text-left outline-none cursor-pointer group ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
      >
        <span className="font-display font-bold text-sm md:text-base text-primary group-hover:text-gold-400 transition-colors leading-tight">
          {question}
        </span>
        <span className="shrink-0 p-2 bg-white border border-matte-border rounded-lg group-hover:border-gold-400/30 transition-colors">
          {isOpen ? (
            <Minus size={14} className="text-gold-400" />
          ) : (
            <Plus size={14} className="text-gold-400" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className={`pb-6 text-xs md:text-sm text-matte-text leading-relaxed font-light ${isRTL ? 'text-right' : 'text-left'}`}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-matte-black border-b border-matte-border py-24 text-primary relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            Production & FAQ
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-primary uppercase mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs md:text-sm text-matte-text max-w-lg mx-auto font-light leading-relaxed">
            Everything you need to know about starting an order, custom fabric development, sampling approvals, and worldwide delivery.
          </p>
        </div>

        {/* Accordions */}
        <div className="glass-panel border border-matte-border rounded-2xl p-6 md:p-8">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              isRTL={isRTL}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
