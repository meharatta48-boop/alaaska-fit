import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Product, BlogPost, Config } from '../models/index.js';

dotenv.config();

const users = [
  {
    name: 'Super Admin',
    email: 'admin@alaaskafit.com',
    password: 'adminpassword',
    role: 'Super Admin',
    permissions: ['all']
  },
  {
    name: 'Admin User',
    email: 'editor@alaaskafit.com',
    password: 'editorpassword',
    role: 'Admin',
    permissions: ['products:edit', 'blogs:edit']
  }
];

const products = [
  {
    title: 'Heavyweight Oversized T-Shirt',
    slug: 'heavyweight-oversized-tshirt',
    description: 'Our signature drop-shoulder oversized tee. Crafted from high-density premium carded cotton. Ultimate comfort, drape, and durability for modern streetwear brands.',
    category: 'Oversized T-Shirts',
    moq: 100,
    fabric: '100% Organic Carded Cotton',
    gsm: '240 GSM',
    printing: 'Screen Print / DTG / High-Density Puff Print',
    embroidery: 'Flat Embroidery / 3D Puff Embroidery Available',
    techPackUrl: 'https://example.com/tech-pack-oversized-tee.pdf',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
    colors: ['#0A0A0A', '#F5F5F3', '#4E5154', '#2C3E50'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    status: 'active',
    priceVisibility: 'hidden',
    variants: [
      { name: 'Oversized Tee Black', fabric: '100% Combed Cotton', gsm: '240 GSM', color: '#0A0A0A', size: 'L', moq: 100 },
      { name: 'Oversized Tee Off-White', fabric: '100% Combed Cotton', gsm: '240 GSM', color: '#F5F5F3', size: 'M', moq: 100 }
    ]
  },
  {
    title: 'Cinematic Premium Hoodie',
    slug: 'cinematic-premium-hoodie',
    description: 'Ultra-heavy French Terry hoodie. Features double-lined hood, no drawcords for clean aesthetic, and side rib panels. Designed to hold structure and deliver maximum luxury feel.',
    category: 'Hoodies',
    moq: 150,
    fabric: '100% Cotton French Terry',
    gsm: '420 GSM',
    printing: 'Screen Print / Discharge Printing',
    embroidery: 'High-Density Satin Stitching',
    techPackUrl: 'https://example.com/tech-pack-hoodie.pdf',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
    colors: ['#0F0F10', '#E3E3E3', '#4A3B32'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: true,
    status: 'active',
    priceVisibility: 'hidden',
    variants: [
      { name: 'Heavyweight Hoodie Black', fabric: '100% Cotton French Terry', gsm: '420 GSM', color: '#0F0F10', size: 'XL', moq: 150 }
    ]
  },
  {
    title: 'Luxury Streetwear Tracksuit',
    slug: 'luxury-streetwear-tracksuit',
    description: 'Matching panel track jacket and relaxed trackpants. Side custom tape panels, heavy custom gold zippers, and tailored fit.',
    category: 'Tracksuits',
    moq: 120,
    fabric: '80% Cotton / 20% Polyester Interlock Polyblend',
    gsm: '320 GSM',
    printing: 'Sublimation / Screen Print',
    embroidery: 'Gold Metallic Embroidery Stitching',
    techPackUrl: '',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: '',
    colors: ['#020202', '#1B2A47'],
    sizes: ['M', 'L', 'XL'],
    isFeatured: false,
    status: 'active',
    priceVisibility: 'hidden',
    variants: []
  },
  {
    title: 'Classic Pique Polo Shirt',
    slug: 'classic-pique-polo',
    description: 'Tailored polo shirt with knit collar and cuffs. Ideal for corporate branding, casual uniforms, or golf wear.',
    category: 'Polo Shirts',
    moq: 200,
    fabric: '100% Combed Cotton Pique',
    gsm: '220 GSM',
    printing: 'Embroidery Recommended / Direct Print',
    embroidery: 'Left Chest Flat Embroidery',
    techPackUrl: '',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: '',
    colors: ['#FFFFFF', '#0B3C5D', '#D9534F'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isFeatured: false,
    status: 'active',
    priceVisibility: 'hidden',
    variants: []
  }
];

const blogs = [
  {
    title: 'Ultimate Guide to Heavyweight GSM Fabric Selection',
    slug: 'ultimate-guide-gsm-fabric',
    content: `
# Fabric Weight (GSM) Explained for Fashion Brand Owners

When building a luxury apparel brand, one of the most critical decisions is choosing the correct fabric weight, measured in **GSM** (Grams per Square Meter).

## What is GSM?
GSM stands for Grams per Square Meter. It is a standard metric used globally to determine the weight, thickness, and structure of fabrics.

## Recommended Fabric Weights for Clothing Categories:
1. **Lightweight (120 - 160 GSM)**: Ideal for summer t-shirts, innerwear, and lightweight athletic clothing.
2. **Mediumweight (180 - 220 GSM)**: The standard weight for retail-quality graphic tees, polo shirts, and lightweight activewear.
3. **Heavyweight (240 - 280 GSM)**: Premium luxury tees with a structured drape and boxy look.
4. **Extra Heavy (320 - 450 GSM)**: Designed for premium hoodies, winter crewnecks, and high-end sweatpants.

## Why Luxury Streetwear Demands Heavyweight Knits
Luxury and streetwear brands like Yeezy, Balenciaga, and Fear of God leverage heavyweight fabrics because they hold shape, hold embroidery stitching better, drop perfectly on the shoulders, and have a high-end tactile feel that consumers associate with durability.

At Al Aaska Fit, we manufacture premium knits from 240 GSM carded tees to 450 GSM hoodies. Contact us today to request sample fabric swatches!
    `,
    featuredImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
    category: 'Fabric Guides',
    tags: ['GSM', 'Streetwear', 'Manufacturing', 'Fabric Guide'],
    status: 'published',
    publishDate: new Date('2026-05-10T10:00:00Z'),
    seoTitle: 'Ultimate Guide to Fabric Weights & GSM | Clothing Manufacturing',
    seoDescription: 'Understand what GSM means in fabric manufacturing. Learn the ideal GSM ratings for premium oversized t-shirts, hoodies, and streetwear.'
  },
  {
    title: 'How to Start a High-End Streetwear Brand in 2026',
    slug: 'start-streetwear-brand-2026',
    content: `
# A Step-by-Step Blueprint to Launching a Streetwear Label

Starting a streetwear clothing brand requires more than just designing graphics—it requires a thorough understanding of sourcing, tech packs, margins, and brand positioning.

## 1. Define Your Aesthetic and Niche
Before contacting a manufacturer, clarify your brand DNA. Are you focusing on minimal luxury, utilitarian design, vintage washes, or custom patterns?

## 2. Master the Tech Pack
A Tech Pack (Technical Packet) is the blueprint of your garment. It includes:
* Detailed CAD sketches
* Complete measurement spec charts (chest width, body length, sleeve length, collar width)
* Materials, stitching guidelines, and colorways (Pantone references)
* Labeling instructions (neck print, hangtags, polybags)

## 3. Partner with an OEM/ODM Manufacturer
Choosing the right factory makes or breaks your brand. Look for a manufacturing partner that supports:
* Custom dyeing (for unique Pantone shades)
* Private label additions (custom neck tags, wash instructions)
* Modern printing methods (Puff prints, discharge prints, screen prints)
* Reliable shipping lines

At Al Aaska Fit, we specialize in end-to-end production for global labels. We handle design consulting, sampling, bulk manufacture, quality control, custom packaging, and door-to-door shipping.
    `,
    featuredImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    category: 'Streetwear manufacturing',
    tags: ['Streetwear', 'Marketing', 'Apparel business', 'Tech Pack'],
    status: 'published',
    publishDate: new Date('2026-06-01T12:00:00Z'),
    seoTitle: 'How to Start a Streetwear Brand in 2026 - Guide',
    seoDescription: 'Thinking of launching a streetwear line? Read our complete manufacturing and design blueprint to scale your clothing brand successfully.'
  }
];

const homepageConfig = {
  hero: {
    title: 'PREMIUM APPAREL MANUFACTURING',
    subtitle: 'BUILT FOR GLOBAL CLOTHING BRANDS',
    description: 'We are a premier private-label clothing manufacturer specializing in high-end streetwear, premium blanks, custom embroidery, and global exports.',
    primaryBtnText: 'Get Custom Quote',
    secondaryBtnText: 'Explore Blanks Catalog',
    highlightColor: '#D4AF37', // Gold Accent
    bgVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
    bgFallbackImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&auto=format&fit=crop&q=80'
  },
  trustStats: [
    { label: 'Pieces Produced', value: 5000000, suffix: '+' },
    { label: 'Countries Served', value: 45, suffix: '+' },
    { label: 'Years Experience', value: 12, suffix: '+' },
    { label: 'Clients Worldwide', value: 250, suffix: '+' }
  ],
  sectionsOrder: ['hero', 'trust', 'products', 'process', 'factory', 'privatelabel', 'quote', 'blog', 'contact']
};

const settingsConfig = {
  siteName: 'Al Aaska Fit',
  shortName: 'AAF',
  companyName: 'Al Aaska Fit Manufacturing Ltd.',
  logoText: 'AL AASKA FIT',
  siteTagline: 'Textile Factory',
  contactEmail: 'production@alaaskafit.com',
  contactPhone: '+92 300 1234567',
  whatsappNumber: '+923001234567',
  factoryAddress: 'Industrial Zone Block A, Karachi, Pakistan',
  faviconUrl: '',
  loaderLogo: '',
  footerLogo: '',
  branding: {
    navbarLogoWidth: 160,
    navbarLogoHeight: 40,
    navbarLogoRadius: 4,
    footerLogoWidth: 140,
    footerLogoHeight: 36,
    footerLogoRadius: 4,
    logoTextFontSize: 13,
    logoTextFontWeight: '800',
    logoTextColor: '#0F1E45',
    showTextBesideLogo: true
  },
  colorTheme: {
    accentPrimary: '#1E3A8A',
    accentSecondary: '#D4AF37',
    textPrimary: '#1A1A2E',
    textSecondary: '#4A5568',
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    navbarBackground: '#FFFFFF',
    footerBackground: '#0F1E45',
    buttonBackground: '#1E3A8A',
    buttonHoverBackground: '#162A5E',
    borderDefault: '#E2E8F5',
    borderFocus: '#1E3A8A'
  },
  typography: {
    baseFontFamily: 'Inter',
    headingFontFamily: 'Outfit',
    baseFontSize: 14,
    baseLineHeight: 1.6,
    baseLetterSpacing: 0
  },
  header: {
    announcementText: '✨ FREE SHIPPING ON PRE-PRODUCTION SAMPLES FOR GLOBAL B2B CLIENTS',
    showAnnouncement: true,
    stickyNavbar: true,
    transparentNavbar: false,
    ctaText: 'Get Quote',
    ctaLink: '/quote'
  },
  footer: {
    aboutText: 'Enterprise-grade private-label apparel manufacturer. Sourcing, sewing, embroidery, and packaging luxury blanks for premium global labels and streetwear brands.',
    copyrightText: 'All rights reserved.',
    showNewsletter: true,
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Oversized T-Shirts', path: '/products' },
          { label: 'Heavyweight Hoodies', path: '/products' },
          { label: 'Premium Tracksuits', path: '/products' },
          { label: 'Private Label Blanks', path: '/private-label' }
        ]
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', path: '/about-us' },
          { label: 'Our Story', path: '/our-story' },
          { label: 'Sustainability', path: '/sustainability' },
          { label: 'Certifications', path: '/certifications' }
        ]
      }
    ]
  },
  whatsappConfig: {
    welcomeMessage: 'Hello! Welcome to Al Aaska Fit customer care. How can we assist you today?',
    autoMessage: 'I would like to inquire about bulk clothing manufacturing parameters.',
    showButton: true,
    position: 'right',
    buttonColor: '#25D366'
  },
  mapConfig: {
    latitude: '24.8719409',
    longitude: '67.0142345',
    zoomLevel: 12,
    enableMap: true,
    addressLine: 'Industrial Zone Block A, Karachi, Pakistan'
  },
  socialLinks: {
    instagram: 'https://instagram.com/alaaskafit',
    facebook: 'https://facebook.com/alaaskafit',
    linkedin: 'https://linkedin.com/company/alaaskafit',
    twitter: '',
    youtube: ''
  },
  seoDefaults: {
    metaTitle: 'Al Aaska Fit | Premium Luxury Apparel & Streetwear Manufacturer',
    metaDescription: 'Al Aaska Fit is an enterprise-grade private label clothing factory. We manufacture high-gsm streetwear, custom embroidery, blanks, and deliver worldwide exports.',
    keywords: 'apparel manufacturer, clothing factory, private label clothing, custom hoodie manufacturing, streetwear manufacturer',
    ogTitle: 'Al Aaska Fit — Premium Clothing Factory',
    ogDescription: 'Enterprise-grade private-label apparel manufacturing for global brands.',
    ogImage: ''
  },
  maintenanceMode: {
    enabled: false,
    message: 'We are performing scheduled maintenance. We will be back shortly!',
    allowAdmins: true
  },
  smtpConfig: {
    host: '',
    port: '465',
    user: '',
    pass: '',
    from: 'Al Aaska Fit <no-reply@alaaskafit.com>'
  },
  googleAnalyticsId: '',
  facebookPixelId: '',
  sessionTimeout: 60,
  maxLoginAttempts: 5
};

const aboutpageConfig = {
  title: 'Our Heritage & Journey',
  subtitle: 'From a local weaving loom to an international premium private-label apparel powerhouse.',
  heritageTitle: 'Our Heritage',
  heritageText1: 'Founded in 2012 with a single mission: to redefine the quality of apparel manufacturing. ALAASKAFIT started as a small spinning and sewing atelier, dedicated to sourcing the highest quality Pakistani cotton and serving local high-street labels.',
  heritageText2: 'Over the decade, we grew our capabilities by introducing state-of-the-art embroidery, advanced wash houses, and rigid quality inspection lines. Today, we stand as a premier manufacturing partner for luxury streetwear, sportswear, and private-label brands across North America, Europe, and the Middle East.',
  timeline: [
    { year: '2012', title: 'The Founding Loom', desc: 'ALAASKAFIT was established in Karachi with 10 sewing machines and a commitment to premium combed cotton sourcing.' },
    { year: '2016', title: 'Going Global', desc: 'Secured our first export orders to European streetwear labels. Expanded the factory to over 100 specialized machines.' },
    { year: '2020', title: 'The Sustainable Shift', desc: 'Converted 60% of our power consumption to solar energy and achieved OEKO-TEX Standard 100 certification for our fabrics.' },
    { year: '2024', title: 'Smart Automation & AI', desc: 'Integrated automated cutting tables and CAD systems to reduce fabric wastage to under 2%. Opened export offices in the Middle East.' }
  ],
  valuesTitle: 'Our Pillars of Trust',
  valuesSubtitle: 'The core values that guide our operations, treatment of artisans, and client relationships.',
  values: [
    { title: 'Uncompromised Quality', desc: 'Every garment undergoes a 4-point inspection system before steam pressing and final custom brand packaging.' },
    { title: 'Ethical Workspaces', desc: 'We guarantee living wages, healthcare, safe working conditions, and complete prohibition of child or forced labor.' },
    { title: 'Eco Innovation', desc: 'Pioneering organic cotton, recycled polyester blends, and zero-discharge water treatment technologies.' },
    { title: 'Global Export Excellence', desc: 'Seamless custom clearance, global logistics, and door-to-door delivery with live tracking for international clients.' }
  ]
};

const processpageConfig = {
  title: 'Manufacturing Process Timeline',
  subtitle: 'From a design sketch to bulk distribution: how we weave luxury grade garments.',
  steps: [
    { stepNumber: '01', title: 'Design & Tech Pack Support', desc: 'We help you detail garment measurements, mockups, fabrics, weights, custom print sizes, labels, and tags.' },
    { stepNumber: '02', title: 'Fabric & Yarn Sourcing', desc: 'Sourcing premium carded/combed cotton, heavy French Terry, or high-performance activewear blends direct from top spinning mills.' },
    { stepNumber: '03', title: 'Custom Sample Production', desc: 'Creating pre-production samples with custom embroidery and prints to verify fit and texture before starting bulk operations.' },
    { stepNumber: '04', title: 'Bulk Cutting & Sewing', desc: 'Executing computer-aided layout patterns to minimize fabric waste, followed by precision stitching by master artisans.' },
    { stepNumber: '05', title: 'Embellishments & Prints', desc: 'Using screen print, puff print, high-density embroidery, or custom dyes depending on specific tech pack requirements.' },
    { stepNumber: '06', title: 'Quality Assurance & Packing', desc: 'Comprehensive checking of thread count, dimensions, and stitch strength before wrapping in custom eco-friendly polybags.' }
  ]
};

const servicespageConfig = {
  title: 'Our Manufacturing Services',
  subtitle: 'Enterprise-grade manufacturing solutions tailored for luxury labels and growing streetwear brands.',
  list: [
    {
      title: 'Custom Manufacturing (OEM/ODM)',
      desc: 'Complete tailor-made production from your own tech packs. We support custom sizing, special fabric development, custom washings, dyeing, prints, and custom embroideries.',
      features: ['Custom patterns & grading', 'Pantone matching dye lab', 'Screen, DTG, puff, & discharge print', 'Applique & custom embroidery options']
    },
    {
      title: 'Private Label Solutions',
      desc: 'Leverage our catalog of pre-developed premium blanks. Add your custom touch with neck print transfers, custom woven labels, cardboard hang tags, and branded polybag packaging.',
      features: ['Satin, heat-transfer, or woven labels', 'Thick card hangtags with foil stamp', 'Biodegradable printed polybags', 'Luxury magnetic closing boxes']
    },
    {
      title: 'Global Export & Freight Sourcing',
      desc: 'End-to-end global shipping support. We manage custom clearance, trade documentation, and offer door-to-door freight forwarding to the US, Europe, and the Middle East.',
      features: ['Custom clearance assistance', 'Worldwide express air shipping', 'Sea freight container loads', 'Live GPS shipment tracking links']
    }
  ]
};

const qualitypageConfig = {
  title: 'Quality Control Standards',
  subtitle: 'A stringent 4-point inspection system ensuring zero defects in custom garment exports.',
  standardPillars: [
    { title: 'Fabric Sourcing Inspection', desc: 'Checking GSM, color fastness, and thread consistency in every batch of raw fabric entering the warehouse.' },
    { title: 'Inline Stitch Inspections', desc: 'Daily inspections on the sewing floor verifying seams, stitch density (SPI), and tension thresholds.' },
    { title: 'Finished Garment Checks', desc: 'Post-production measurements against tech pack specifications. Pressing checks and loose thread trimming.' },
    { title: 'Final AQL Sampling', desc: 'Final packaging reviews under ISO Acceptable Quality Level (AQL 2.5) protocols prior to box sealing.' }
  ],
  testingProcedures: [
    { test: 'Shrinkage Test', method: 'ISO 6330 wash methods, guaranteeing under 3% shrinkage.' },
    { test: 'Color Fastness Test', method: 'ISO 105-C06 standard ensuring dye stays vibrant.' },
    { test: 'Crocking Test', method: 'AATCC 8 wet/dry rubbing friction tests for high-contrast prints.' }
  ]
};

const sustainabilitypageConfig = {
  title: 'Sustainable & Ethical Commitment',
  subtitle: 'We actively minimize our carbon footprint and preserve human dignity throughout the garment production lifecycle.',
  stats: [
    { label: 'Solar Powered', value: 65, suffix: '%' },
    { label: 'Organic Cotton Use', value: 45, suffix: '%' },
    { label: 'Water Recycled', value: 80, suffix: '%' }
  ],
  pillars: [
    { title: 'Organic & Recycled Materials', desc: 'We source certified GOTS organic cotton and GRS-certified recycled polyester polyblends.' },
    { title: 'Renewable Power Stations', desc: 'Over half of our factory machinery runs on our rooftop 200kW industrial solar installation.' },
    { title: 'Ethical Workplace Charters', desc: 'Guaranteed living wages, clean environment, standard working hours, and strict prohibition of child labor.' }
  ]
};

const careerspageConfig = {
  title: 'Careers at Al Aaska Fit',
  subtitle: 'Join our team of master tailors, CAD designers, textile engineers, and global export managers.',
  vacancies: [
    { title: 'Senior Apparel CAD Pattern Designer', department: 'Product Development', type: 'Full-time', location: 'Karachi Office', desc: 'Develop digital sewing pattern cards, grading tables, and optimize marker layout efficiency.' },
    { title: 'Quality Assurance Supervisor', department: 'Production Floor', type: 'Full-time', location: 'Factory Hub', desc: 'Lead checking lines, inline audits, and verify finished goods against B2B tech specs.' },
    { title: 'International Sales Executive', department: 'Export Operations', type: 'Full-time', location: 'Remote / Hybrid', desc: 'Manage incoming brand inquiries, coordinate sampling approvals, and oversee custom clearance channels.' }
  ]
};

const gallerypageConfig = {
  title: 'Factory Gallery & Facilities',
  subtitle: 'An inside look at our state-of-the-art sewing lines, printing labs, and packaging floors.',
  items: [
    { name: 'Rooftop Solar Plant', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80', category: 'Factory' },
    { name: 'Stitching Atelier', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', category: 'Stitching' },
    { name: 'High-Density Embroidery', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80', category: 'Embroidery' },
    { name: 'Sample Showroom', url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80', category: 'Showroom' }
  ]
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alaaskafit');
    console.log('Connected to MongoDB. Starting database seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Product.deleteMany();
    await BlogPost.deleteMany();
    await Config.deleteMany();
    console.log('Cleared existing records.');

    // Seed Users
    await User.create(users);
    console.log('Seeded Users.');

    // Seed Products
    await Product.create(products);
    console.log('Seeded Products.');

    // Seed Blogs
    await BlogPost.create(blogs);
    console.log('Seeded Blogs.');

    // Seed Configurations
    await Config.create([
      { key: 'homepage', value: homepageConfig },
      { key: 'settings', value: settingsConfig },
      { key: 'aboutpage', value: aboutpageConfig },
      { key: 'processpage', value: processpageConfig },
      { key: 'servicespage', value: servicespageConfig },
      { key: 'qualitypage', value: qualitypageConfig },
      { key: 'sustainabilitypage', value: sustainabilitypageConfig },
      { key: 'careerspage', value: careerspageConfig },
      { key: 'gallerypage', value: gallerypageConfig }
    ]);
    console.log('Seeded Configurations.');

    console.log('Database Seeding Successful! Exiting...');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seed:', error);
    process.exit(1);
  }
};

seed();
