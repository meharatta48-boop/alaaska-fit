import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Mail, Phone, MapPin } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

const Instagram = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Facebook = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function Footer() {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    apiFetch('/config/settings')
      .then(data => {
        if (data) setConfig(data);
      })
      .catch(() => { });
  }, []);

  const logoUrl = config?.siteLogo || '';

  return (
    <footer className="bg-matte-black border-t border-matte-border pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans mb-12">

        {/* Info Column */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div className="mb-4">
            {logoUrl ? (
              <img src={logoUrl} alt="Al Aaska Fit Logo" className="h-10 object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#D4AF37] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  AF
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-sm md:text-base font-extrabold tracking-[0.15em] text-white">
                    <span className="text-gold-400">AL</span>AASKAFIT
                  </span>
                  <span className="text-[7px] font-mono tracking-[0.35em] uppercase text-white/40 font-light">
                    Textile Factory
                  </span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-matte-text leading-relaxed mb-6">
            Enterprise-grade private-label apparel manufacturer. Sourcing, sewing, embroidery, and packaging luxury blanks for premium global labels and streetwear brands.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-matte-text hover:text-gold-400 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-matte-text hover:text-gold-400 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-matte-text hover:text-gold-400 transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="font-display font-semibold text-sm tracking-wider text-gold-400 mb-6 uppercase">
            {t('navProducts')}
          </h3>
          <ul className="space-y-3 text-xs text-matte-text">
            <li><span className="hover:text-white transition-colors">Oversized T-Shirts</span></li>
            <li><span className="hover:text-white transition-colors">Heavyweight Hoodies</span></li>
            <li><span className="hover:text-white transition-colors">Premium Tracksuits</span></li>
            <li><span className="hover:text-white transition-colors">Gym & Sportswear</span></li>
            <li><span className="hover:text-white transition-colors">Private Label blanks</span></li>
          </ul>
        </div>

        {/* Process Steps Column */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="font-display font-semibold text-sm tracking-wider text-gold-400 mb-6 uppercase">
            {t('navProcess')}
          </h3>
          <ul className="space-y-3 text-xs text-matte-text">
            <li><span className="hover:text-white transition-colors">1. Design Consultation</span></li>
            <li><span className="hover:text-white transition-colors">2. Fabric Sourcing</span></li>
            <li><span className="hover:text-white transition-colors">3. Custom Sampling</span></li>
            <li><span className="hover:text-white transition-colors">4. Print & Embroidery</span></li>
            <li><span className="hover:text-white transition-colors">5. Packaging & Shipping</span></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="font-display font-semibold text-sm tracking-wider text-gold-400 mb-6 uppercase">
            {t('navContact')}
          </h3>
          <ul className="space-y-4 text-xs text-matte-text">
            <li className="flex items-center gap-3 justify-start">
              <Mail size={16} className="text-gold-400 shrink-0" />
              <span>production@alaaskafit.com</span>
            </li>
            <li className="flex items-center gap-3 justify-start">
              <Phone size={16} className="text-gold-400 shrink-0" />
              <span dir="ltr">+92 300 1234567</span>
            </li>
            <li className="flex items-start gap-3 justify-start">
              <MapPin size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Industrial Zone Block A, Karachi, Pakistan</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-matte-border/50 flex flex-col md:flex-row justify-between items-center text-[10px] text-matte-text font-sans gap-4">
        <span>&copy; {currentYear} {t('brandName')}. {t('footerRights')}</span>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-gold-400 transition-colors">{t('footerPrivacy')}</Link>
          <Link to="/terms-conditions" className="hover:text-gold-400 transition-colors">{t('footerTerms')}</Link>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">{t('footerSitemap')}</a>
        </div>
      </div>
    </footer>
  );
}
