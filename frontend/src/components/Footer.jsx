import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useConfig } from '../context/ConfigContext.jsx';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

// ─── Social Icons ─────────────────────────────────────────────────────────────
const SocialIcon = ({ name, size = 18 }) => {
  const paths = {
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M4 20L20 4" /><path d="M20 4h-5l-11 16h5z" />
      </svg>
    ),
    youtube: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
    tiktok: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    pinterest: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.41 1.27-5.41s-.32-.65-.32-1.62c0-1.52.88-2.65 1.97-2.65.93 0 1.38.7 1.38 1.53 0 .94-.6 2.34-.9 3.64-.26 1.09.53 1.97 1.6 1.97 1.92 0 3.4-2.02 3.4-4.94 0-2.58-1.86-4.39-4.52-4.39-3.08 0-4.88 2.3-4.88 4.68 0 .93.36 1.93.8 2.47.09.11.1.2.07.32-.08.34-.26 1.09-.3 1.24-.05.2-.16.24-.38.14-1.39-.65-2.26-2.68-2.26-4.32 0-3.51 2.55-6.73 7.36-6.73 3.86 0 6.86 2.75 6.86 6.43 0 3.83-2.42 6.91-5.77 6.91-1.13 0-2.19-.59-2.55-1.28l-.69 2.59c-.25.97-.93 2.18-1.39 2.92A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  };
  return paths[name] || null;
};

// Hardcoded fallback columns (used when admin hasn't configured custom columns)
const FALLBACK_COLUMNS = [
  {
    title: 'Products',
    links: [
      { label: 'Oversized T-Shirts', path: '/products' },
      { label: 'Heavyweight Hoodies', path: '/products' },
      { label: 'Premium Tracksuits', path: '/products' },
      { label: 'Gym & Sportswear', path: '/products' },
      { label: 'Private Label Blanks', path: '/products' },
    ]
  },
  {
    title: 'Process',
    links: [
      { label: '1. Design Consultation', path: '/process' },
      { label: '2. Fabric Sourcing', path: '/process' },
      { label: '3. Custom Sampling', path: '/process' },
      { label: '4. Print & Embroidery', path: '/process' },
      { label: '5. Packaging & Shipping', path: '/process' },
    ]
  }
];

const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', defaultUrl: 'https://instagram.com' },
  { key: 'linkedin', label: 'LinkedIn', defaultUrl: 'https://linkedin.com' },
  { key: 'facebook', label: 'Facebook', defaultUrl: 'https://facebook.com' },
  { key: 'twitter', label: 'Twitter / X', defaultUrl: 'https://twitter.com' },
  { key: 'youtube', label: 'YouTube', defaultUrl: null },
  { key: 'tiktok', label: 'TikTok', defaultUrl: null },
  { key: 'pinterest', label: 'Pinterest', defaultUrl: null },
];

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const { config } = useConfig();
  const currentYear = new Date().getFullYear();

  const settings = config?.settings || {};
  const logoUrl = settings.siteLogo || settings.footerLogo || '';
  const footerConfig = settings.footer || {};
  const socialLinks = settings.socialLinks || {};
  const colorTheme = settings.colorTheme || {};
  const branding = settings.branding || {};
  const companyName = settings.companyName || settings.siteName || 'Al Aaska Fit';

  // Footer background — from config or default gradient
  const footerBg = colorTheme.footerBackground;
  const footerStyle = footerBg
    ? { backgroundColor: footerBg }
    : {};
  const footerClass = footerBg
    ? 'pt-16 pb-8 text-white'
    : 'bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] pt-16 pb-8 text-white';

  // Determine footer columns: admin-configured or fallback
  const footerColumns = (footerConfig.columns && footerConfig.columns.length > 0)
    ? footerConfig.columns
    : FALLBACK_COLUMNS;

  // Determine active social links
  const activeSocials = SOCIAL_PLATFORMS.filter(p => {
    const url = socialLinks[p.key];
    const isEnabled = socialLinks[`${p.key}Enabled`] !== false;
    return isEnabled && (url || p.defaultUrl);
  });

  const accentColor = '#FACC15';

  return (
    <footer className={footerClass} style={{ ...footerStyle, color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-sans mb-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 ${footerColumns.length > 0 ? `lg:grid-cols-${Math.min(4, footerColumns.length + 2)}` : 'lg:grid-cols-4'}`}>

          {/* Info Column */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="mb-4 flex items-center gap-3">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${companyName} Logo`}
                  className="object-contain rounded-md bg-white/10 p-1"
                  style={{
                    width: branding.footerLogoWidth ? `${branding.footerLogoWidth}px` : 'auto',
                    height: branding.footerLogoHeight ? `${branding.footerLogoHeight}px` : '40px',
                    borderRadius: branding.footerLogoRadius ? `${branding.footerLogoRadius}px` : '4px',
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {companyName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="text-base md:text-lg font-extrabold tracking-[0.15em] text-white uppercase">
                  {companyName}
                </span>
                <span className="text-[8px] font-mono tracking-[0.35em] uppercase text-white/80 font-light">
                  {settings.siteTagline || 'Textile Factory'}
                </span>
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed mb-5">
              {footerConfig.aboutText || 'Enterprise-grade private-label apparel manufacturer. Sourcing, sewing, embroidery, and packaging luxury blanks for premium global labels and streetwear brands.'}
            </p>

            {/* Working Hours */}
            {settings.workingHours && (
              <div className="flex items-start gap-2 text-white/70 text-xs mb-4">
                <Clock size={13} className="shrink-0 mt-0.5 text-yellow-400" />
                <span>{settings.workingHours}</span>
              </div>
            )}

            {/* Social Icons */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {activeSocials.map(platform => {
                  const url = socialLinks[platform.key] || platform.defaultUrl;
                  if (!url) return null;
                  return (
                    <a
                      key={platform.key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={platform.label}
                      className="hover:text-yellow-400 transition-colors"
                      style={{ color: '#ffffff' }}
                    >
                      <SocialIcon name={platform.key} size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic Footer Columns */}
          {footerColumns.map((col, i) => (
            <div key={i} className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-display font-semibold text-sm tracking-wider mb-6 uppercase"
                style={{ color: accentColor }}>
                {col.title}
              </h3>
              <ul className="space-y-3 text-xs" style={{ color: '#ffffff' }}>
                {(col.links || []).map((link, j) => (
                  <li key={j}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="hover:text-yellow-300 transition-colors inline-block"
                        style={{ color: '#ffffff' }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="hover:text-white transition-colors">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column — always shown */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="font-display font-semibold text-sm tracking-wider mb-6 uppercase"
              style={{ color: accentColor }}>
              {t('navContact')}
            </h3>
            <ul className="space-y-4 text-xs" style={{ color: '#ffffff' }}>
              {settings.contactEmail && (
                <li className="flex items-center gap-3 justify-start">
                  <Mail size={16} className="shrink-0" style={{ color: accentColor }} />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-yellow-300 transition-colors">
                    {settings.contactEmail}
                  </a>
                </li>
              )}
              {settings.contactPhone && (
                <li className="flex items-center gap-3 justify-start">
                  <Phone size={16} className="shrink-0" style={{ color: accentColor }} />
                  <a href={`tel:${settings.contactPhone}`} dir="ltr" className="hover:text-yellow-300 transition-colors">
                    {settings.contactPhone}
                  </a>
                </li>
              )}
              {settings.whatsappNumber && settings.whatsappNumber !== settings.contactPhone && (
                <li className="flex items-center gap-3 justify-start">
                  <Phone size={16} className="shrink-0" style={{ color: '#25D366' }} />
                  <a href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-green-300 transition-colors">
                    WhatsApp: {settings.whatsappNumber}
                  </a>
                </li>
              )}
              {settings.factoryAddress && (
                <li className="flex items-start gap-3 justify-start">
                  <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <span>{settings.factoryAddress}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/80 font-sans gap-4">
          <div className="flex items-center gap-4">
            <span>
              &copy; {currentYear} {companyName}. {footerConfig.copyrightText || settings.copyrightText || 'All rights reserved.'}
            </span>
          </div>
          <span className="hidden md:inline text-white/40">Website developed by Mehar Atta</span>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footerPrivacy')}</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">{t('footerTerms')}</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('footerSitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
