import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilRuler, Compass, Scissors, Printer, Activity, CheckSquare, Package, Truck, Award } from 'lucide-react';

export default function ProcessTimeline() {
  const { t, isRTL } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Design Consultation',
      icon: PencilRuler,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      description: 'Collaborative analysis of tech packs, CAD sketches, measurement grading specs, and print placements to ensure structural feasibility.'
    },
    {
      title: 'Fabric Sourcing',
      icon: Compass,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
      description: 'Selecting from high-density organic carded cottons, combed loops, custom blends, and implementing precise Pantone lab dips for colors.'
    },
    {
      title: 'Sampling',
      icon: Scissors,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      description: 'Creating a fitting prototype sample (pre-production mockup) to test fits, fabric wash shrinkage, and draping before bulk sizing approval.'
    },
    {
      title: 'Printing & Dyeing',
      icon: Printer,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
      description: 'Executing high-density puff, water-based screens, discharge printing, or direct-to-garment (DTG) using eco-certified inks.'
    },
    {
      title: 'Embroidery Work',
      icon: Award,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      description: 'Executing clean multi-head satin flat stitching, 3D puff embroidery, loop pile chainstitches, or detailed chenille brand patches.'
    },
    {
      title: 'Stitching & Assembly',
      icon: Scissors,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      description: 'Bulk industrial sewing with twin-needle flatlock seams, heavy ribbed collars, double-lined hoods, and reinforced bar-tack points.'
    },
    {
      title: 'Quality Inspection',
      icon: CheckSquare,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
      description: 'Triple-stage audit. Verification of measurement dimensions, seam strengths, needle checks, wash tests, and trim adjustments.'
    },
    {
      title: 'Packaging & Labels',
      icon: Package,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      description: 'Adding custom cardboard hangtags, woven main tags, sizing stickers, and packing into branded compostable polybags.'
    },
    {
      title: 'Shipping & Logistics',
      icon: Truck,
      video: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
      description: 'Preparing customs manifests, bulk carton labeling, and organizing air/ocean shipping lines for door-to-door delivery worldwide.'
    }
  ];

  return (
    <section id="process" className="bg-[#F8FAFF] border-b border-[#E2E8F5] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            Industrial Flow Config
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            {t('timelineTitle')}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] max-w-xl font-light leading-relaxed">
            {t('timelineSubtitle')}
          </p>
        </div>

        {/* Dynamic Stepper Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Stepper Steps (Left side) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === activeStep;
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-full flex items-center gap-5 p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'} ${isActive ? 'bg-gold-400 text-black border-gold-400 shadow-lg shadow-gold-400/15' : 'bg-white text-[#0F1E45] border-[#E2E8F5] hover:border-[#1E3A8A]/30 hover:bg-[#F0F5FF]'}`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${isActive ? 'bg-black/15 text-black' : 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE]'}`}>
                    <StepIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider block text-[#6B7EA0] mb-0.5">
                      Stage 0{index + 1}
                    </span>
                    <h3 className="font-display font-bold text-sm tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Details / Video Player (Right side) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="bg-[#0F1E45] rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between overflow-hidden relative min-h-[450px]">
              
              {/* Background video overlay */}
              <div className="absolute inset-0 z-0">
                <video
                  key={activeStep}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-15 rounded-2xl"
                >
                  <source src={steps[activeStep].video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E45] via-[#0F1E45]/80 to-[#0F1E45]/40 rounded-2xl" />
              </div>

              {/* Step info overlay */}
              <div className={`relative z-10 flex-1 flex flex-col justify-end ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block mb-2">
                    Manufacturing Process Specifications
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-4 leading-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/70 font-light leading-relaxed max-w-lg">
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className="flex gap-4 pt-6 border-t border-white/10">
                  <div className="text-[10px] font-mono text-white/60">
                    <span className="text-white block font-bold">Standard Lead Time</span>
                    <span>2 - 5 working days</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/60">
                    <span className="text-white block font-bold">Quality Standard</span>
                    <span>AQL 1.5 - 2.5 Compliance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
