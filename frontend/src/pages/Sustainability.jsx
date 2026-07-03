import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Leaf, Award, Recycle, Sun, Droplets, Heart, ShieldCheck, FlameKindling } from 'lucide-react';

export default function Sustainability() {
  const { locale, t, isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Sustainability & Ethical Sourcing',
      subtitle: 'Conscious craftsmanship. We manufacture high-end garments with a deep responsibility toward our people and planet.',
      
      certTitle: 'Accredited Eco-Certifications',
      certSubtitle: 'Our materials and production lines comply with global standards of safety, quality, and organic content.',
      certs: [
        {
          name: 'GOTS Certified Organic Cotton',
          code: 'Global Organic Textile Standard',
          desc: 'Ensures our organic fabrics are harvested responsibly from seed to sewing without harmful pesticides or synthetic dyes.'
        },
        {
          name: 'OEKO-TEX Standard 100',
          code: 'Tested for Harmful Substances',
          desc: 'Certifies that every thread, button, zipper, and print dye has been rigorously tested and is 100% safe for human contact.'
        },
        {
          name: 'GRS (Global Recycled Standard)',
          code: 'Recycled Content Verification',
          desc: 'Validates our usage of recycled polyester, pre-consumer fabric scraps, and eco-blends for sustainable outerwear.'
        }
      ],

      pillarsTitle: 'Our Ecological Commitment',
      pillarsSubtitle: 'How we act daily to minimize our environmental footprint and maximize community support.',
      pillars: [
        {
          icon: Sun,
          title: 'Solar Energy',
          desc: '60% of our Karachi factory operations are powered by an on-site 250kW solar array, cutting our carbon emissions significantly.'
        },
        {
          icon: Droplets,
          title: 'Water Filtration',
          desc: 'A state-of-the-art chemical water treatment plant filters and recycles 40% of printing dye effluents, ensuring zero toxin discharge.'
        },
        {
          icon: Recycle,
          title: 'Zero Scrap Waste',
          desc: 'Fabric scraps from cutting tables are collected and sent to textile recycling units, converting them into recycled fiber rolls.'
        },
        {
          icon: Heart,
          title: 'Ethical Employment',
          desc: 'We enforce living wages, active healthcare options, clean ventilation, and professional skill growth for all factory workers.'
        }
      ]
    },
    ur: {
      title: 'پائیداری اور اخلاقی ذرائع',
      subtitle: 'باشعور کاریگری۔ ہم اپنے لوگوں اور کرہ ارض کے لیے گہری ذمہ داری کے ساتھ پریمیم کپڑے تیار کرتے ہیں۔',
      
      certTitle: 'تسلیم شدہ سرٹیفیکیشنز',
      certSubtitle: 'ہمارے مواد اور مینوفیکچرنگ لائنیں حفاظت، معیار اور نامیاتی مواد کے عالمی اصولوں کے مطابق ہیں۔',
      certs: [
        {
          name: 'GOTS نامیاتی کپاس',
          code: 'عالمی نامیاتی ٹیکسٹائل معیار',
          desc: 'اس بات کو یقینی بناتا ہے کہ ہماری نامیاتی کپاس بیج سے لے کر سلائی تک بغیر کسی نقصان دہ کیڑے مار ادویات یا مصنوعی رنگوں کے تیار کی گئی ہے۔'
        },
        {
          name: 'OEKO-TEX Standard 100',
          code: 'نقصان دہ کیمیکلز سے پاک',
          desc: 'تصدیق کرتا ہے کہ ہر دھاگہ، بٹن، زپ اور پرنٹنگ کا رنگ انسانی استعمال کے لیے 100 فیصد محفوظ اور مصدقہ ہے۔'
        },
        {
          name: 'GRS ری سائیکل شدہ مواد',
          code: 'عالمی ری سائیکل شدہ معیار',
          desc: 'پائیدار ملبوسات کے لیے ری سائیکل شدہ پولیسٹر اور کپڑے کے بچ جانے والے ٹکڑوں کے دوبارہ استعمال کی توثیق کرتا ہے۔'
        }
      ],

      pillarsTitle: 'ہمارے ماحولیاتی وعدے',
      pillarsSubtitle: 'ہم اپنے ماحولیاتی اثرات کو کم سے کم اور کمیونٹی کے فائدے کو زیادہ سے زیادہ کرنے کے لیے روزانہ کیسے عمل کرتے ہیں۔',
      pillars: [
        {
          icon: Sun,
          title: 'شمسی توانائی کا استعمال',
          desc: 'کراچی فیکٹری کی 60 فیصد بجلی شمسی پینلز سے حاصل ہوتی ہے، جو کاربن کے اخراج کو نمایاں طور پر کم کرتی ہے۔'
        },
        {
          icon: Droplets,
          title: 'پانی کی فلٹریشن',
          desc: 'جدید ترین کیمیکل واٹر ٹریٹمنٹ پلانٹ پرنٹنگ کے بعد 40 فیصد گندے پانی کو دوبارہ قابل استعمال بناتا ہے۔'
        },
        {
          icon: Recycle,
          title: 'زیرو کپڑا ویسٹ',
          desc: 'کٹنگ ٹیبلز سے بچ جانے والے کپڑے کے ٹکڑوں کو اکٹھا کر کے دوبارہ ٹیکسٹائل فائبر رول میں تبدیل کیا جاتا ہے۔'
        },
        {
          icon: Heart,
          title: 'اخلاقی روزگار',
          desc: 'ہم تمام فیکٹری ورکرز کے لیے صحت کی دیکھ بھال، مناسب معاوضہ اور محفوظ اور ہوادار کام کے ماحول کو یقینی بناتے ہیں۔'
        }
      ]
    },
    ar: {
      title: 'الاستدامة والمصادر الأخلاقية',
      subtitle: 'حرفية واعية. نصنع الملابس الفاخرة بمسؤولية عميقة تجاه موظفينا وبيئتنا.',
      
      certTitle: 'شهادات البيئة المعتمدة',
      certSubtitle: 'تتوافق موادنا الخام وخطوط إنتاجنا مع المعايير العالمية للسلامة والجودة والمحتوى العضوي.',
      certs: [
        {
          name: 'قطن عضوي معتمد من GOTS',
          code: 'المعيار العالمي للمنسوجات العضوية',
          desc: 'يضمن زراعة وتصنيع أقمشتنا العضوية بشكل مسؤول من البذور إلى الخياطة دون مبيدات ضارة أو صبغات صناعية.'
        },
        {
          name: 'OEKO-TEX Standard 100',
          code: 'خالٍ من المواد الكيميائية الضارة',
          desc: 'يشهد بأن كل خيط وزر وسحاب وصبغة طباعة قد تم اختبارها بدقة وهي آمنة بنسبة 100% للتلامس البشري.'
        },
        {
          name: 'شهادة GRS للتدوير',
          code: 'معيار إعادة التدوير العالمي',
          desc: 'يتحقق من استخدامنا للبوليستر المعاد تدويره، وبقايا الأقمشة، والمزيج البيئي في صناعة الملابس المستدامة.'
        }
      ],

      pillarsTitle: 'التزامنا البيئي والأخلاقي',
      pillarsSubtitle: 'كيف نعمل يوميًا لتقليل تأثيرنا البيئي ودعم المجتمعات المحلية.',
      pillars: [
        {
          icon: Sun,
          title: 'الطاقة الشمسية',
          desc: 'يتم تشغيل 60% من مصنعنا في كراتشي بالطاقة الشمسية المولدة ذاتياً عبر خلايا شمسية بقدرة 250 كيلوواط.'
        },
        {
          icon: Droplets,
          title: 'معالجة المياه وتدويرها',
          desc: 'محطة متطورة لمعالجة المياه تعيد تدوير 40% من مياه الصباغة والطباعة لضمان عدم تصريف أي مواد كيميائية سامة.'
        },
        {
          icon: Recycle,
          title: 'الحد من النفايات',
          desc: 'يتم جمع جميع قصاصات الأقمشة من غرف الفصال وإرسالها لمصانع التدوير لتحويلها إلى خيوط وأقمشة جديدة.'
        },
        {
          icon: Heart,
          title: 'ظروف عمل عادلة',
          desc: 'نلتزم التزاماً صارماً بتقديم أجور معيشية كافية، تأمين صحي، بيئة عمل جيدة التهوية وآمنة لجميع حرفيينا.'
        }
      ]
    }
  };

  const activeContent = content[locale] || content.en;

  return (
    <div className="bg-white text-[#0F1E45] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Title Block */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] uppercase bg-[#EEF4FF] px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40">
              {t('navSustainability')}
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] mb-6">
              {activeContent.title}
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Certifications Block */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="bg-[#EEF4FF]/50 border border-[#C7D9F5]/40 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] uppercase tracking-tight flex items-center justify-center gap-3">
                <Award size={24} className="text-[#1E3A8A]" />
                {activeContent.certTitle}
              </h2>
              <p className="text-xs md:text-sm text-[#5A7BAA] font-light mt-3 leading-relaxed">
                {activeContent.certSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {activeContent.certs.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-[#C7D9F5]/30 shadow-sm relative group hover:shadow-md transition-shadow"
                >
                  <div className="absolute top-6 right-6 text-green-500 bg-green-50 p-2 rounded-full">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0F1E45] pr-8 mb-1 uppercase tracking-wide">
                    {cert.name}
                  </h3>
                  <p className="text-[10px] font-mono text-[#1E3A8A] uppercase tracking-wider mb-4">
                    {cert.code}
                  </p>
                  <p className="text-xs text-[#5A7BAA] leading-relaxed font-light">
                    {cert.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0F1E45] uppercase tracking-tight flex items-center justify-center gap-3">
              <Leaf size={24} className="text-[#1E3A8A]" />
              {activeContent.pillarsTitle}
            </h2>
            <p className="text-xs md:text-sm text-[#5A7BAA] font-light mt-3 leading-relaxed">
              {activeContent.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeContent.pillars.map((pill, idx) => {
              const IconComp = pill.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-5 p-6 bg-white border border-[#C7D9F5]/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] text-[#1E3A8A] flex items-center justify-center shrink-0 shadow-inner">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0F1E45] mb-2 uppercase tracking-wide">
                      {pill.title}
                    </h3>
                    <p className="text-xs text-[#5A7BAA] leading-relaxed font-light">
                      {pill.desc}
                    </p>
                  </div>
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
