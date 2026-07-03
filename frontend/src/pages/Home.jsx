import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';

// Sections
import Hero from '../sections/Hero.jsx';
import Trust from '../sections/Trust.jsx';
import Products from '../sections/Products.jsx';
import ProcessTimeline from '../sections/ProcessTimeline.jsx';
import FactoryGallery from '../sections/FactoryGallery.jsx';
import PrivateLabel from '../sections/PrivateLabel.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import QuoteBuilder from '../sections/QuoteBuilder.jsx';
import Blog from '../sections/Blog.jsx';
import FAQ from '../sections/FAQ.jsx';
import Contact from '../sections/Contact.jsx';

import { apiFetch } from '../utils/api.js';

export default function Home() {
  const [heroConfig, setHeroConfig] = useState(null);
  const [trustStats, setTrustStats] = useState(null);
  const [sectionsOrder, setSectionsOrder] = useState([
    'hero', 'trust', 'products', 'process', 'factory', 'privatelabel', 'quote', 'blog', 'faq', 'contact'
  ]);

  useEffect(() => {
    apiFetch('/config/homepage')
      .then(data => {
        if (data) {
          if (data.hero) setHeroConfig(data.hero);
          if (data.trustStats) setTrustStats(data.trustStats);
          if (data.sectionsOrder) setSectionsOrder(data.sectionsOrder);
        }
      })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'hero':
        return <Hero key="hero" config={heroConfig} />;
      case 'trust':
        return <Trust key="trust" stats={trustStats} />;
      case 'products':
        return <Products key="products" />;
      case 'process':
        return <ProcessTimeline key="process" />;
      case 'factory':
        return <FactoryGallery key="factory" />;
      case 'privatelabel':
        return <PrivateLabel key="privatelabel" />;
      case 'testimonials':
        return <Testimonials key="testimonials" />;
      case 'quote':
        return <QuoteBuilder key="quote" />;
      case 'blog':
        return <Blog key="blog" />;
      case 'faq':
        return <FAQ key="faq" />;
      case 'contact':
        return <Contact key="contact" />;
      default:
        return null;
    }
  };

  return (
    <div className="landing-page min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {sectionsOrder.map(section => renderSection(section))}
      </main>
      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
