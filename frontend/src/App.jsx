import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { ConfigProvider } from './context/ConfigContext.jsx';

// Public Landing Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import CommandPalette from './components/CommandPalette.jsx';

// Landing Page Sections (for single-page view if needed)
import Hero from './sections/Hero.jsx';
import Trust from './sections/Trust.jsx';
import ProductsSection from './sections/Products.jsx';
import ProcessTimeline from './sections/ProcessTimeline.jsx';
import FactoryGallerySection from './sections/FactoryGallery.jsx';
import PrivateLabelSection from './sections/PrivateLabel.jsx';
import TestimonialsSection from './sections/Testimonials.jsx';
import QuoteBuilder from './sections/QuoteBuilder.jsx';
import BlogSection from './sections/Blog.jsx';
import FAQSection from './sections/FAQ.jsx';
import ContactSection from './sections/Contact.jsx';

// Standalone Public Pages
import AboutUs from './pages/AboutUs.jsx';
import OurStory from './pages/OurStory.jsx';
import Process from './pages/Process.jsx';
import Services from './pages/Services.jsx';
import CustomManufacturing from './pages/CustomManufacturing.jsx';
import PrivateLabel from './pages/PrivateLabel.jsx';
import QualityControl from './pages/QualityControl.jsx';
import Certifications from './pages/Certifications.jsx';
import FactoryGallery from './pages/FactoryGallery.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import ProductsPage from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import FAQs from './pages/FAQs.jsx';
import TestimonialsPage from './pages/Testimonials.jsx';
import Careers from './pages/Careers.jsx';
import ContactUs from './pages/ContactUs.jsx';
import RequestQuote from './pages/RequestQuote.jsx';
import Sustainability from './pages/Sustainability.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsConditions from './pages/TermsConditions.jsx';

// Admin Components
import AdminLogin from './admin/pages/AdminLogin.jsx';
import AdminGuard from './admin/components/AdminGuard.jsx';
import AdminLayout from './admin/components/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import ProductManager from './admin/pages/ProductManager.jsx';
import LeadManager from './admin/pages/LeadManager.jsx';
import CareerManager from './admin/pages/CareerManager.jsx';
import GalleryManager from './admin/pages/GalleryManager.jsx';
import CMSBuilder from './admin/pages/CMSBuilder.jsx';
import BlogManager from './admin/pages/BlogManager.jsx';
import MediaLibrary from './admin/pages/MediaLibrary.jsx';
import HomepageBuilder from './admin/pages/HomepageBuilder.jsx';
import SettingsPanel from './admin/pages/SettingsPanel.jsx';
import UserManager from './admin/pages/UserManager.jsx';
import ActivityLogPage from './admin/pages/ActivityLog.jsx';

import { useConfig } from './context/ConfigContext.jsx';

// ─── Dynamic Head Tags (title, description, favicon) ─────────────────────────
function DynamicHead() {
  const { config } = useConfig();
  useEffect(() => {
    if (!config?.settings) return;
    const s = config.settings;
    // Browser title
    const title = s.seoDefaults?.metaTitle || s.siteName || 'Al Aaska Fit';
    document.title = title;
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', s.seoDefaults?.metaDescription || s.siteTagline || '');
    // Meta keywords
    if (s.seoDefaults?.keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute('content', s.seoDefaults.keywords);
    }
    // Favicon
    if (s.faviconUrl) {
      let faviconEl = document.querySelector('link[rel="icon"]');
      if (!faviconEl) {
        faviconEl = document.createElement('link');
        faviconEl.setAttribute('rel', 'icon');
        document.head.appendChild(faviconEl);
      }
      faviconEl.setAttribute('href', s.faviconUrl);
    }
  }, [config]);
  return null;
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage() {
  const { config, loading } = useConfig();

  if (loading || !config) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center flex-col gap-4 font-sans">
        {config?.settings?.loaderLogo ? (
          <img src={config.settings.loaderLogo} alt="Loading..." className="h-12 animate-pulse object-contain" />
        ) : (
          <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        )}
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A9BB8]">Loading Enterprise Platform...</p>
      </div>
    );
  }

  const homepage = config.homepage || {};
  const order = homepage.sectionsOrder || ['hero', 'trust', 'products', 'process', 'factory', 'privatelabel', 'testimonials', 'quote', 'blog', 'faq', 'contact'];
  const hidden = homepage.hiddenSections || [];

  return (
    <div className="landing-page bg-white text-primary min-h-screen">
      <DynamicHead />
      <Navbar />
      <main>
        {order.map(sectionId => {
          if (hidden.includes(sectionId)) return null;
          switch (sectionId) {
            case 'hero':
              return <Hero key={sectionId} config={homepage.hero} />;
            case 'trust':
              return <Trust key={sectionId} stats={homepage.trustStats} />;
            case 'products':
              return <ProductsSection key={sectionId} />;
            case 'process':
              return <ProcessTimeline key={sectionId} />;
            case 'factory':
              return <FactoryGallerySection key={sectionId} />;
            case 'privatelabel':
              return <PrivateLabelSection key={sectionId} />;
            case 'testimonials':
              return <TestimonialsSection key={sectionId} />;
            case 'quote':
              return <QuoteBuilder key={sectionId} />;
            case 'blog':
              return <BlogSection key={sectionId} />;
            case 'faq':
              return <FAQSection key={sectionId} />;
            case 'contact':
              return <ContactSection key={sectionId} />;
            default:
              return null;
          }
        })}
      </main>
      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}

// ─── Admin Wrapper ─────────────────────────────────────────────────────────────
function AdminPage({ children, minRole = 'Admin' }) {
  return (
    <div className="admin-dark min-h-screen bg-matte-black text-white">
      <AdminGuard minRole={minRole}>
        <AdminLayout>
          {children}
          <CommandPalette />
        </AdminLayout>
      </AdminGuard>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <ConfigProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/process" element={<Process />} />
                <Route path="/services" element={<Services />} />
                <Route path="/custom-manufacturing" element={<CustomManufacturing />} />
                <Route path="/private-label" element={<PrivateLabel />} />
                <Route path="/quality-control" element={<QualityControl />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/gallery" element={<FactoryGallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/quote" element={<RequestQuote />} />
                
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin defaultTab="login" />} />
                <Route path="/login" element={<AdminLogin defaultTab="login" />} />
                <Route path="/signup" element={<AdminLogin defaultTab="register" />} />

                {/* Admin Protected Routes */}
                <Route path="/admin" element={<AdminPage minRole="Admin"><AdminDashboard /></AdminPage>} />
                <Route path="/admin/products" element={<AdminPage minRole="Admin"><ProductManager /></AdminPage>} />
                <Route path="/admin/quotes" element={<AdminPage minRole="Admin"><LeadManager /></AdminPage>} />
                <Route path="/admin/careers" element={<AdminPage minRole="Admin"><CareerManager /></AdminPage>} />
                <Route path="/admin/gallery" element={<AdminPage minRole="Admin"><GalleryManager /></AdminPage>} />
                <Route path="/admin/cms" element={<AdminPage minRole="Admin"><CMSBuilder /></AdminPage>} />
                <Route path="/admin/blogs" element={<AdminPage minRole="Admin"><BlogManager /></AdminPage>} />
                <Route path="/admin/media" element={<AdminPage minRole="Admin"><MediaLibrary /></AdminPage>} />
                <Route path="/admin/builder" element={<AdminPage minRole="Admin"><HomepageBuilder /></AdminPage>} />
                <Route path="/admin/settings" element={<AdminPage minRole="Admin"><SettingsPanel /></AdminPage>} />
                <Route path="/admin/users" element={<AdminPage minRole="Super Admin"><UserManager /></AdminPage>} />
                <Route path="/admin/activity" element={<AdminPage minRole="Admin"><ActivityLogPage /></AdminPage>} />

                {/* 404 Catch-all */}
                <Route path="*" element={
                  <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center flex-col gap-4">
                    <span className="font-display font-bold text-8xl text-[#1E3A8A]">404</span>
                    <p className="font-sans text-[#4A6080] text-sm">Page not found.</p>
                    <Link to="/" className="mt-4 px-6 py-2.5 bg-[#1E3A8A] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#162A5E] transition-colors">
                      Return Home
                    </Link>
                  </div>
                } />
              </Routes>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ConfigProvider>
    </Router>
  );
}
