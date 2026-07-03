import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { FileWarning, CreditCard, Scale, Truck, Layers, HelpCircle } from 'lucide-react';

export default function TermsConditions() {
  const { locale, t, isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Terms & Conditions',
      subtitle: 'Manufacturing clarity. Read our terms regarding order confirmations, sampling, MOQ parameters, payments, and cargo liability.',
      lastUpdated: 'Last updated: June 2026',
      sections: [
        {
          icon: Layers,
          title: '1. Sampling & Approvals',
          desc: 'Before bulk production begins, a prototype sample is built based on client tech packs. Bulk printing, embroidery, and cutting will only begin after the client gives formal written (email/WhatsApp) approval of the physical sample or high-resolution sample photos.'
        },
        {
          icon: FileWarning,
          title: '2. Minimum Order Quantities (MOQ)',
          desc: 'Our standard Minimum Order Quantity is 50 pieces per design/colorway for catalog blanks. Custom pantone dye runs and custom knitting projects require a higher MOQ (typically 200-500 pieces depending on GSM and fabric compositions).'
        },
        {
          icon: CreditCard,
          title: '3. Payment & Billing Cycles',
          desc: 'All bulk production schedules require a 50% upfront deposit to initiate yarn sourcing and knitting. The remaining 50% balance is due upon quality inspection approval and prior to cargo loading, container release, or dispatch from our Karachi warehouse.'
        },
        {
          icon: Scale,
          title: '4. Intellectual Property & Brand Assets',
          desc: 'Clients retain 100% ownership of their brand names, custom logos, graphics, and proprietary designs. ALAASKAFIT will never replicate, resell, or distribute client designs or custom molds to any other entity.'
        },
        {
          icon: Truck,
          title: '5. Shipping & Cargo Insurance',
          desc: 'Shipping quotes are estimated under FOB (Free On Board) Karachi or CIF (Cost, Insurance & Freight) destination terms. ALAASKAFIT is responsible for fabric, assembly, and clearing Pakistan customs, after which cargo liability transfers to the client’s carrier.'
        },
        {
          icon: HelpCircle,
          title: '6. Quality Tolerance & Claims',
          desc: 'We operate under a +/- 5% industrial tolerance standard for GSM weight, sizing charts, and final shipment quantities. Any defective or damaged pieces must be reported to our sales team within 14 days of cargo delivery for replacement credits.'
        }
      ]
    },
    ur: {
      title: 'شرائط و ضوابط',
      subtitle: 'مینوفیکچرنگ کی وضاحت۔ آرڈر کی تصدیق، سیمپلنگ، MOQ، ادائیگیوں اور کارگو کی ذمہ داری کے بارے میں ہماری شرائط پڑھیں۔',
      lastUpdated: 'آخری بار اپ ڈیٹ کیا گیا: جون 2026',
      sections: [
        {
          icon: Layers,
          title: '1۔ سیمپلنگ اور منظوری',
          desc: 'بلک پروڈکشن شروع ہونے سے پہلے، کلائنٹ کے فراہم کردہ ٹیک پیک کی بنیاد پر ایک نمونہ تیار کیا جاتا ہے۔ باقاعدہ پروڈکشن صرف اس وقت شروع ہوگی جب کلائنٹ نمونے کی تحریری منظوری دے گا۔'
        },
        {
          icon: FileWarning,
          title: '2۔ کم از کم آرڈر کی حد (MOQ)',
          desc: 'ہمارے کیٹلاگ سے بلینکس کے لیے ہماری معیاری کم از کم آرڈر کی مقدار 50 ٹکڑے فی ڈیزائن/رنگ ہے۔ اپنی مرضی کے رنگ اور مخصوص کپڑے بنوانے کے لیے 200 سے 500 ٹکڑوں کا آرڈر درکار ہوتا ہے۔'
        },
        {
          icon: CreditCard,
          title: '3۔ ادائیگی کے طریقے اور مراحل',
          desc: 'تمام بلک پروڈکشن کے لیے کپڑا حاصل کرنے اور بننا شروع کرنے کے لیے 50 فیصد ایڈوانس ڈپازٹ درکار ہوتا ہے۔ بقیہ 50 فیصد رقم کوالٹی کی جانچ اور کراچی گودام سے کارگو روانگی سے پہلے واجب الادا ہے۔'
        },
        {
          icon: Scale,
          title: '4۔ فکری ملکیت اور برانڈ اثاثے',
          desc: 'کلائنٹس اپنے برانڈ کے ناموں، کسٹم لوگو، اور ملکیتی ڈیزائنز کی 100 فیصد ملکیت برقرار رکھتے ہیں۔ ال عسکہ فٹ کسی بھی دوسرے ادارے کو کلائنٹ کے ڈیزائن فروخت یا تقسیم نہیں کرے گا۔'
        },
        {
          icon: Truck,
          title: '5۔ شپنگ اور کارگو کی ذمہ داری',
          desc: 'شپنگ کے نرخ FOB کراچی یا CIF شرائط کے تحت لگائے جاتے ہیں۔ ال عسکہ فٹ پاکستان کسٹمز کلیئر کرنے کی ذمہ دار ہے، جس کے بعد کارگو کی ذمہ داری خریدار کے کارگو ایجنٹ پر منتقل ہو جاتی ہے۔'
        },
        {
          icon: HelpCircle,
          title: '6۔ معیار کی گنجائش اور کلیمز',
          desc: 'ہم جی ایس ایم وزن، سائز چارٹ اور حتمی شپمنٹ کی مقدار کے لیے +/- 5% صنعتی برداشت کی حد کے تحت کام کرتے ہیں۔ کسی بھی نقص کی صورت میں 14 دنوں کے اندر مطلع کرنا لازمی ہے۔'
        }
      ]
    },
    ar: {
      title: 'الشروط والأحكام',
      subtitle: 'وضوح التصنيع. اقرأ شروطنا المتعلقة بتأكيد الطلبات، العينات، كميات MOQ، والمسؤولية اللوجستية.',
      lastUpdated: 'آخر تحديث: يونيو 2026',
      sections: [
        {
          icon: Layers,
          title: '1. العينات والموافقات',
          desc: 'قبل البدء في الإنتاج الضخم، يتم تصنيع عينة أولية بناءً على الملف الفني للعميل. لا يبدأ الإنتاج النهائي للقص والتطريز والطباعة إلا بعد موافقة العميل الخطية (عبر الإيميل أو الواتساب).'
        },
        {
          icon: FileWarning,
          title: '2. الحد الأدنى للطلب (MOQ)',
          desc: 'الحد الأدنى القياسي لطلب ملابس الكتالوج الجاهزة هو 50 قطعة لكل تصميم ولون. تتطلب صباغة الألوان المخصصة وحياكة الخامات الخاصة حداً أدنى أعلى يتراوح بين 200-500 قطعة.'
        },
        {
          icon: CreditCard,
          title: '3. الدفع والتحصيل',
          desc: 'تتطلب جميع جداول الإنتاج الضخم دفعة مقدمة بنسبة 50% لبدء شراء خيوط الغزل وحياكة القماش. تُدفع الـ 50% المتبقية بعد فحص الجودة وقبل شحن الحاويات من مخازننا في كراتشي.'
        },
        {
          icon: Scale,
          title: '4. الملكية الفكرية وتصاميم العملاء',
          desc: 'يحتفظ العملاء بملكية 100% لعلاماتهم التجارية، وشعاراتهم، وتصاميمهم الخاصة. لن تقوم ال عسقة فيت بنسخ أو بيع أو توزيع تصاميم العملاء لأي طرف آخر تحت أي ظرف.'
        },
        {
          icon: Truck,
          title: '5. الشحن ومسؤولية البضائع',
          desc: 'يتم احتساب تكاليف الشحن بموجب شروط FOB كراتشي أو CIF الوجهة. تكون ال عسقة فيت مسؤولة عن تصنيع وتخليص الجمارك الباكستانية، ثم تنتقل مسؤولية الشحن إلى وكيل شحن العميل.'
        },
        {
          icon: HelpCircle,
          title: '6. نسب التسامح وشكاوى الجودة',
          desc: 'نعمل بنسبة تسامح صناعية تبلغ +/- 5% لوزن القماش (GSM)، ومقاسات الملابس، والكميات الإجمالية. يجب الإبلاغ عن أي قطع تالفة خلال 14 يوماً من استلام البضائع للحصول على تعويض.'
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
        <section className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-[#0F1E45] mb-4 uppercase">
              {activeContent.title}
            </h1>
            <p className="text-xs text-[#5A7BAA] font-mono tracking-widest uppercase mb-6">
              {activeContent.lastUpdated}
            </p>
            <p className="text-sm md:text-base text-[#5A7BAA] max-w-2xl mx-auto leading-relaxed font-light">
              {activeContent.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Structured legal details */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            {activeContent.sections.map((sect, idx) => {
              const IconComp = sect.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-[#F0F5FF]/40 border border-[#C7D9F5]/30 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#1E3A8A] flex items-center justify-center shrink-0 border border-[#C7D9F5]/30">
                    <IconComp size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-[#0F1E45] mb-3 uppercase tracking-wide">
                      {sect.title}
                    </h2>
                    <p className="text-xs md:text-sm text-[#5A7BAA] leading-relaxed font-light">
                      {sect.desc}
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
