import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { BookOpen, Calendar, Compass, Shield, Users, Award, Landmark } from 'lucide-react';

export default function OurStory() {
  const { locale, t, isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Our Heritage & Journey',
      subtitle: 'From a local weaving loom to an international premium private-label apparel powerhouse.',
      heritageTitle: 'Our Heritage',
      heritageText1: 'Founded in 2012 with a single mission: to redefine the quality of apparel manufacturing. ALAASKAFIT started as a small spinning and sewing atelier, dedicated to sourcing the highest quality Pakistani cotton and serving local high-street labels.',
      heritageText2: 'Over the decade, we grew our capabilities by introducing state-of-the-art embroidery, advanced wash houses, and rigid quality inspection lines. Today, we stand as a premier manufacturing partner for luxury streetwear, sportswear, and private-label brands across North America, Europe, and the Middle East.',
      
      timelineTitle: 'Milestones of Excellence',
      timelineSubtitle: 'Our timeline reflects our commitment to continuous innovation, ethical growth, and premium craftsmanship.',
      
      timeline: [
        {
          year: '2012',
          title: 'The Founding Loom',
          desc: 'ALAASKAFIT was established in Karachi with 10 sewing machines and a commitment to premium combed cotton sourcing.'
        },
        {
          year: '2016',
          title: 'Going Global',
          desc: 'Secured our first export orders to European streetwear labels. Expanded the factory to over 100 specialized machines.'
        },
        {
          year: '2020',
          title: 'The Sustainable Shift',
          desc: 'Converted 60% of our power consumption to solar energy and achieved OEKO-TEX Standard 100 certification for our fabrics.'
        },
        {
          year: '2024',
          title: 'Smart Automation & AI',
          desc: 'Integrated automated cutting tables and CAD systems to reduce fabric wastage to under 2%. Opened export offices in the Middle East.'
        }
      ],

      valuesTitle: 'Our Pillars of Trust',
      valuesSubtitle: 'The core values that guide our operations, treatment of artisans, and client relationships.',
      values: [
        {
          icon: Shield,
          title: 'Uncompromised Quality',
          desc: 'Every garment undergoes a 4-point inspection system before steam pressing and final custom brand packaging.'
        },
        {
          icon: Users,
          title: 'Ethical Workspaces',
          desc: 'We guarantee living wages, healthcare, safe working conditions, and complete prohibition of child or forced labor.'
        },
        {
          icon: Compass,
          title: 'Eco Innovation',
          desc: 'Pioneering organic cotton, recycled polyester blends, and zero-discharge water treatment technologies.'
        },
        {
          icon: Award,
          title: 'Global Export Excellence',
          desc: 'Seamless custom clearance, global logistics, and door-to-door delivery with live tracking for international clients.'
        }
      ]
    },
    ur: {
      title: 'ہماری تاریخ اور سفر',
      subtitle: 'ایک مقامی ہینڈلوم سے بین الاقوامی پریمیم نجی ملبوسات کے مینوفیکچرنگ پاور ہاؤس تک کا سفر۔',
      heritageTitle: 'ہماری وراثت',
      heritageText1: '2012 میں ایک واحد مشن کے ساتھ قائم کیا گیا: ملبوسات کی تیاری کے معیار کو ازسرنو متعین کرنا۔ ال عسکہ فٹ نے ایک چھوٹے اسپننگ اور سلائی یونٹ کے طور پر کام شروع کیا، جس کا مقصد اعلیٰ ترین معیار کے پاکستانی کپاس کو حاصل کرنا اور مقامی برانڈز کی خدمت کرنا تھا۔',
      heritageText2: 'گزشتہ ایک دہائی میں، ہم نے جدید ترین کڑھائی، جدید واش ہاؤسز، اور سخت کوالٹی انسپکشن لائنوں کو متعارف کروا کر اپنی صلاحیتوں میں اضافہ کیا۔ آج ہم شمالی امریکہ، یورپ اور مشرق وسطیٰ میں پرتعیش سٹریٹ ویئر، جم ویئر اور پرائیویٹ لیبل برانڈز کے مینوفیکچرنگ پارٹنر کے طور پر کھڑے ہیں۔',
      
      timelineTitle: 'عمدگی کے سنگِ میل',
      timelineSubtitle: 'ہماری ٹائم لائن مسلسل جدت، اخلاقی ترقی، اور پریمیم کاریگری کے عزم کی عکاسی کرتی ہے۔',
      
      timeline: [
        {
          year: '2012',
          title: 'بنیاد اور آغاز',
          desc: 'ال عسکہ فٹ کراچی میں 10 سلائی مشینوں اور بہترین کنگھی والے سوتی دھاگے کے حصول کے عزم کے ساتھ قائم کیا گیا۔'
        },
        {
          year: '2016',
          title: 'عالمی منڈیوں میں رسائی',
          desc: 'یورپی سٹریٹ ویئر برانڈز کے لیے پہلے برآمدی آرڈرز حاصل کیے۔ فیکٹری کو 100 سے زائد مخصوص مشینوں تک بڑھایا۔'
        },
        {
          year: '2020',
          title: 'پائیداری کی طرف قدم',
          desc: 'اپنی فیکٹری کی 60 فیصد بجلی کو شمسی توانائی پر منتقل کیا اور اپنے کپڑوں کے لیے OEKO-TEX سرٹیفیکیشن حاصل کیا۔'
        },
        {
          year: '2024',
          title: 'جدید آٹومیشن اور اے آئی',
          desc: 'کپڑے کے ضیاع کو 2 فیصد سے کم کرنے کے لیے خودکار کٹنگ ٹیبلز متعارف کروائے۔ مشرق وسطیٰ میں برآمدی دفاتر کھولے۔'
        }
      ],

      valuesTitle: 'ہمارے بنیادی ستون',
      valuesSubtitle: 'وہ اقدار جو ہمارے آپریشنز، کاریگروں کی فلاح، اور کسٹمر کے تعلقات کی رہنمائی کرتی ہیں۔',
      values: [
        {
          icon: Shield,
          title: 'معیار پر کوئی سمجھوتہ نہیں',
          desc: 'ہر لباس استری اور آخری کسٹم برانڈ پیکیجنگ سے پہلے 4 مراحل پر مشتمل سخت معیار کی جانچ سے گزرتا ہے۔'
        },
        {
          icon: Users,
          title: 'اخلاقی کام کی جگہ',
          desc: 'ہم مناسب اجرت، مفت طبی سہولیات، محفوظ کام کے ماحول اور چائلڈ لیبر کی مکمل ممانعت کی ضمانت دیتے ہیں۔'
        },
        {
          icon: Compass,
          title: 'ماحول دوست طریقے',
          desc: 'آرگینک کپاس، ری سائیکل شدہ پولیسٹر، اور زیرو واٹر ویسٹیج فلٹریشن ٹیکنالوجی کا فروغ۔'
        },
        {
          icon: Award,
          title: 'برآمدات میں مہارت',
          desc: 'بین الاقوامی برانڈز کے لیے کسٹمز کلیئرنس، عالمی لاجسٹکس، اور لائیو ٹریکنگ کے ساتھ گھر کی دہلیز تک ترسیل۔'
        }
      ]
    },
    ar: {
      title: 'تراثنا ومسيرتنا',
      subtitle: 'من نول نسج محلي بسيط إلى مركز رائد لتصنيع الملابس الفاخرة للعلامات التجارية العالمية.',
      heritageTitle: 'تراثنا العريق',
      heritageText1: 'تأسست ال عسقة فيت عام 2012 بمهمة واضحة: إعادة تعريف جودة تصنيع الملابس. بدأنا كمشغل خياطة وغزل صغير مكرس لتوفير أجود أنواع القطن الباكستاني الفاخر وتلبية احتياجات العلامات التجارية المحلية.',
      heritageText2: 'على مدار العقد الماضي، قمنا بتوسيع قدراتنا من خلال إدخال أحدث آلات التطريز الإلكترونية، مغاسل الأقمشة المتطورة، وخطوط فحص الجودة الصارمة. اليوم، نقف كشريك تصنيع موثوق للعديد من ماركات ملابس الشارع الفاخرة، الملابس الرياضية، والعلامات الخاصة في أمريكا الشمالية، أوروبا، والشرق الأوسط.',
      
      timelineTitle: 'محطات من التميز',
      timelineSubtitle: 'تعكس مسيرتنا التزامنا بالابتكار المستمر، والنمو الأخلاقي، والمهارة اليدوية الفائقة.',
      
      timeline: [
        {
          year: '2012',
          title: 'البداية والتأسيس',
          desc: 'تأسست ال عسقة فيت في كراتشي بـ 10 آلات خياطة والتزام كامل بتوريد أجود خيوط القطن الفاخر.'
        },
        {
          year: '2016',
          title: 'التصدير العالمي',
          desc: 'تأمين أولى طلبات التصدير لبراندات ملابس الشارع الأوروبية، وتوسيع المصنع لأكثر من 100 آلة متخصصة.'
        },
        {
          year: '2020',
          title: 'التحول المستدام',
          desc: 'تحويل 60% من استهلاك المصنع للطاقة إلى الطاقة الشمسية والحصول على شهادة OEKO-TEX Standard 100 للأقمشة.'
        },
        {
          year: '2024',
          title: 'الأتمتة والذكاء الاصطناعي',
          desc: 'إدخال طاولات القص الآلي ونظم CAD لتقليل هدر القماش لأقل من 2%، وافتتاح مكاتب تصدير إقليمية.'
        }
      ],

      valuesTitle: 'قيمنا الأساسية',
      valuesSubtitle: 'المبادئ الأساسية التي توجه عملياتنا اليومية، ورعايتنا للحرفيين، وعلاقاتنا مع العملاء.',
      values: [
        {
          icon: Shield,
          title: 'جودة لا تضاهى',
          desc: 'تخضع كل قطعة ملابس لنظام فحص رباعي النقاط قبل الكي بالبخار والتعبئة النهائية بشعار علامتك.'
        },
        {
          icon: Users,
          title: 'بيئة عمل أخلاقية',
          desc: 'نضمن أجوراً عادلة، ورعاية صحية، وظروف عمل آمنة، مع حظر كامل لعمالة الأطفال أو العمل القسري.'
        },
        {
          icon: Compass,
          title: 'الابتكار البيئي',
          desc: 'ريادة استخدام القطن العضوي، وألياف البوليستر المعاد تدويرها، وتقنيات معالجة المياه الخالية من الصرف.'
        },
        {
          icon: Award,
          title: 'التميز اللوجستي',
          desc: 'تخليص جمركي سلس، وحلول شحن دولية مرنة، وتوصيل حتى باب المخازن مع تتبع مباشر للطلبات.'
        }
      ]
    }
  };

  const activeContent = content[locale] || content.en;

  return (
    <div className="bg-white text-[#0F1E45] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Banner Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] uppercase bg-[#EEF4FF] px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40">
              {t('navOurStory')}
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] mb-6">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Heritage Section (Visual Grid) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 aspect-[4/5] bg-gradient-to-tr from-[#1E3A8A] to-[#1E3370] rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl group border border-[#1E3A8A]/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60"></div>
              
              {/* Geometric Grid Art */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <Landmark size={36} className="text-[#93C5FD] mb-6 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-[#93C5FD] uppercase block mb-2">Established 2012</span>
                <h2 className="font-display font-bold text-3xl tracking-tight leading-none text-white uppercase">ALAASKA<br />FIT</h2>
              </div>

              <div className="relative z-10 mt-auto pt-8 border-t border-white/10">
                <p className="text-[11px] font-mono text-[#93C5FD] tracking-wider uppercase mb-1">Production Hub</p>
                <p className="text-xs text-white/95 font-light leading-relaxed">
                  Karachi Industrial Zone Block A, Pakistan
                </p>
              </div>
            </motion.div>

            {/* Core Narrative */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] tracking-tight uppercase flex items-center gap-3">
                <BookOpen size={20} className="text-[#1E3A8A]" />
                {activeContent.heritageTitle}
              </h2>
              <div className="w-12 h-1 bg-[#1E3A8A] rounded"></div>
              <p className="text-sm md:text-base text-[#5A7BAA] leading-relaxed font-light">
                {activeContent.heritageText1}
              </p>
              <p className="text-sm md:text-base text-[#5A7BAA] leading-relaxed font-light">
                {activeContent.heritageText2}
              </p>

              {/* Stat highlight card */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#C7D9F5]/40">
                <div className="p-4 bg-[#EEF4FF] rounded-2xl border border-[#C7D9F5]/30">
                  <p className="text-2xl md:text-3xl font-display font-bold text-[#1E3A8A]">12M+</p>
                  <p className="text-[10px] md:text-xs text-[#5A7BAA] font-mono uppercase tracking-wider mt-1">Garmets Shipped</p>
                </div>
                <div className="p-4 bg-[#EEF4FF] rounded-2xl border border-[#C7D9F5]/30">
                  <p className="text-2xl md:text-3xl font-display font-bold text-[#1E3A8A]">14+</p>
                  <p className="text-[10px] md:text-xs text-[#5A7BAA] font-mono uppercase tracking-wider mt-1">Export Markets</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chronological Timeline Section */}
        <section className="bg-[#F0F5FF]/60 border-y border-[#C7D9F5]/30 py-24 mb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] uppercase tracking-tight flex items-center justify-center gap-3">
                <Calendar size={22} className="text-[#1E3A8A]" />
                {activeContent.timelineTitle}
              </h2>
              <p className="text-xs md:text-sm text-[#5A7BAA] font-light mt-3 leading-relaxed">
                {activeContent.timelineSubtitle}
              </p>
            </div>

            {/* Interactive timeline grid */}
            <div className="relative border-l-2 border-[#C7D9F5] ml-4 md:ml-0 md:left-1/2 md:border-l md:border-r-0 md:transform md:-translate-x-1/2 space-y-12 py-8">
              {activeContent.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className={`relative w-full flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Circle marker */}
                    <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-4.5 h-4.5 rounded-full bg-[#1E3A8A] border-4 border-white z-10 shadow shadow-[#1E3A8A]/40" />

                    {/* Content block */}
                    <div className={`w-full md:w-1/2 pl-6 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-[#C7D9F5]/40 shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <span className="text-xs font-mono font-bold text-[#1E3A8A] bg-[#EEF4FF] px-2.5 py-1 rounded">
                          {item.year}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[#0F1E45] mt-3 mb-2 uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#5A7BAA] leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Dummy space for layout matching */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] uppercase tracking-tight">
              {activeContent.valuesTitle}
            </h2>
            <p className="text-xs md:text-sm text-[#5A7BAA] font-light mt-3 leading-relaxed">
              {activeContent.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeContent.values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white border border-[#C7D9F5]/40 hover:border-[#1E3A8A]/30 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] group-hover:bg-[#1E3A8A] text-[#1E3A8A] group-hover:text-white flex items-center justify-center transition-colors mb-5 shadow-inner">
                    <IconComp size={22} />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0F1E45] mb-2 uppercase tracking-wide">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#5A7BAA] leading-relaxed font-light">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
