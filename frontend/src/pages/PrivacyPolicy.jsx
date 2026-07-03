import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { ShieldCheck, Eye, Lock, FileText, Database, Milestone } from 'lucide-react';

export default function PrivacyPolicy() {
  const { locale, t, isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'Your confidentiality is our absolute priority. Learn how ALAASKAFIT protects, stores, and handles client brand assets and data.',
      lastUpdated: 'Last updated: June 2026',
      sections: [
        {
          icon: ShieldCheck,
          title: '1. Introduction & Scope',
          desc: 'ALAASKAFIT is committed to safeguarding the proprietary styles, tech packs, brand designs, and personal information of the global apparel brands we partner with. This policy applies to all quotes submitted, accounts created, and logistics information shared on our website.'
        },
        {
          icon: Eye,
          title: '2. Information We Collect',
          desc: 'We collect relevant commercial and contact data: (a) Your Name, email, WhatsApp, and company details; (b) Fabric preferences, GSM selections, style details, and design files (tech packs) uploaded to our builder; (c) Automatic diagnostics including IP addresses, cookies, and navigation trails to optimize site speeds.'
        },
        {
          icon: Lock,
          title: '3. Data Security & Confidentially',
          desc: 'We implement industry-grade SSL encryption and secure role-based database access to protect your garment sketches and brand specifications. We do not sell, rent, or lease client data to marketing lists, and we sign NDA agreements upon request before sampling.'
        },
        {
          icon: Database,
          title: '4. Third-Party Disclosures & Shipping',
          desc: 'Data is only shared with trusted third parties necessary to fulfill your orders: (a) International logistics partners (e.g. DHL, FedEx, sea freight forwarders) for cargo shipping; (b) Direct secure payment gateways. All sub-processors are legally bound to uphold equivalent confidentiality.'
        },
        {
          icon: FileText,
          title: '5. Cookies & Site Analytics',
          desc: 'We use cookies to maintain your active login sessions and remember language choices (English, Urdu, Arabic). You can choose to disable cookies in your browser settings, though some quote building tools may lose preference storage.'
        },
        {
          icon: Milestone,
          title: '6. Your Rights & Contacts',
          desc: 'Under international compliance laws, you have the right to request access to the data we store on your company, edit errors, or request total deletion. For any questions, please contact our data safety division at legal@alaaskafit.com.'
        }
      ]
    },
    ur: {
      title: 'پرائیویسی پالیسی',
      subtitle: 'آپ کا راز برقرار رکھنا ہماری اولین ترجیح ہے۔ جانیں کہ ال عسکہ فٹ کلائنٹ برانڈ اثاثوں اور ڈیٹا کی حفاظت کیسے کرتا ہے۔',
      lastUpdated: 'آخری بار اپ ڈیٹ کیا گیا: جون 2026',
      sections: [
        {
          icon: ShieldCheck,
          title: '1۔ تعارف اور دائرہ کار',
          desc: 'ال عسکہ فٹ ہمارے ساتھ شراکت دار عالمی ملبوسات کے برانڈز کے ملکیتی اسٹائلز، ٹیک پیکس، برانڈ ڈیزائنز اور ذاتی معلومات کی حفاظت کے لیے پرعزم ہے۔ یہ پالیسی جمع کروائی گئی تمام معلومات، بنائے گئے اکاؤنٹس اور شیئر کی گئی معلومات پر لاگو ہوتی ہے۔'
        },
        {
          icon: Eye,
          title: '2۔ معلومات جو ہم جمع کرتے ہیں',
          desc: 'ہم متعلقہ کاروباری اور رابطہ ڈیٹا جمع کرتے ہیں: (الف) آپ کا نام، ای میل، واٹس ایپ، اور کمپنی کی تفصیلات؛ (ب) کپڑے کی ترجیحات، جی ایس ایم کا انتخاب، اور ڈیزائن فائلیں جو ہمارے اقتباس بلڈر پر اپ لوڈ کی گئی ہیں؛ (ج) سائٹ کی رفتار کو بہتر بنانے کے لیے خودکار کوکیز اور نیٹ ورک معلومات۔'
        },
        {
          icon: Lock,
          title: '3۔ ڈیٹا کی حفاظت اور رازداری',
          desc: 'ہم آپ کے کپڑوں کے خاکوں اور برانڈ کی تفصیلات کی حفاظت کے لیے انڈسٹری گریڈ SSL انکرپشن اور محفوظ ڈیٹا بیس نافذ کرتے ہیں۔ ہم کلائنٹ کے ڈیٹا کو فروخت نہیں کرتے ہیں، اور ہم سیمپلنگ سے پہلے درخواست پر باقاعدہ معاہدہ (NDA) سائن کرتے ہیں۔'
        },
        {
          icon: Database,
          title: '4۔ فریقِ ثالث اور ترسیل',
          desc: 'ڈیٹا صرف ان قابلِ اعتماد اداروں کے ساتھ شیئر کیا جاتا ہے جو آپ کے آرڈر کو پورا کرنے کے لیے ضروری ہیں: (الف) بین الاقوامی لاجسٹکس پارٹنرز (جیسے DHL، FedEx)؛ (ب) براہ راست محفوظ ادائیگی کے ذرائع۔ تمام ذیلی ادارے بھی رازداری کو برقرار رکھنے کے پابند ہیں۔'
        },
        {
          icon: FileText,
          title: '5۔ کوکیز اور اینالیٹکس',
          desc: 'ہم آپ کے فعال لاگ ان سیشنز کو برقرار رکھنے اور زبان کے انتخاب (انگریزی، اردو، عربی) کو یاد رکھنے کے لیے کوکیز استعمال کرتے ہیں۔ آپ اپنے براؤزر کی سیٹنگز میں کوکیز کو غیر فعال کر سکتے ہیں۔'
        },
        {
          icon: Milestone,
          title: '6۔ آپ کے حقوق اور رابطہ',
          desc: 'قوانین کے تحت، آپ کو ہمارے پاس موجود اپنے ڈیٹا تک رسائی، اس میں ترمیم، یا مکمل حذف کرنے کی درخواست کرنے کا حق حاصل ہے۔ کسی بھی سوال کے لیے، براہ کرم legal@alaaskafit.com پر رابطہ کریں۔'
        }
      ]
    },
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'سرية بياناتكم هي أولويتنا المطلقة. تعرفوا على كيفية قيام ال عسقة فيت بحماية وتخزين بيانات العملاء وحقوق الملكية الخاصة بهم.',
      lastUpdated: 'آخر تحديث: يونيو 2026',
      sections: [
        {
          icon: ShieldCheck,
          title: '1. مقدمة ونطاق العمل',
          desc: 'تلتزم ال عسقة فيت التزاماً تاما بحماية التصاميم والملفات الفنية (Tech Packs) والبيانات الشخصية لشركائنا من براندات الملابس العالمية. تسري هذه السياسة على جميع الطلبات المقدمة والحسابات المنشأة عبر موقعنا الإلكتروني.'
        },
        {
          icon: Eye,
          title: '2. البيانات التي نجمعها',
          desc: 'نقوم بجمع البيانات التجارية وبيانات الاتصال اللازمة: (أ) اسمكم، بريدكم الإلكتروني، رقم الواتساب وتفاصيل شركتكم؛ (ب) خامات الأقمشة المفضلة، تفاصيل التصاميم، والملفات المرفوعة؛ (ج) ملفات تعريف الارتباط (Cookies) التلقائية وبيانات التصفح لتحسين تجربة استخدام الموقع.'
        },
        {
          icon: Lock,
          title: '3. أمان البيانات وسريتها',
          desc: 'نطبق أعلى معايير التشفير الأمن (SSL) وصلاحيات الوصول الصارمة لحماية رسوماتكم الفنية ومواصفات الإنتاج الخاصة بكم. لا نقوم ببيع أو تأجير بيانات العملاء لأي جهات تسويقية، ونوقع اتفاقيات عدم إفشاء (NDA) عند الطلب.'
        },
        {
          icon: Database,
          title: '4. الإفصاح لجهات خارجية والشحن',
          desc: 'لا تتم مشاركة البيانات إلا مع جهات موثوقة لتنفيذ طلباتكم: (أ) شركات الشحن والخدمات اللوجستية الدولية (مثل DHL و FedEx والشحن البحري)؛ (ب) بوابات الدفع الإلكتروني المباشرة والآمنة.'
        },
        {
          icon: FileText,
          title: '5. ملفات تعريف الارتباط والتحليلات',
          desc: 'نستخدم ملفات تعريف الارتباط للاحتفاظ بجلسة تسجيل الدخول وتذكر اختيار اللغة (الإنجليزية، الأردية، العربية). يمكنكم إلغاء تفعيلها من إعدادات المتصفح في أي وقت.'
        },
        {
          icon: Milestone,
          title: '6. حقوقكم القانونية والتواصل',
          desc: 'بموجب القوانين والامتثال الدولي، يحق لكم طلب نسخة من بياناتكم المخزنة لدينا، أو تعديلها، أو طلب حذفها نهائياً. لأي استفسارات، يرجى التواصل مع الدائرة القانونية عبر legal@alaaskafit.com.'
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
