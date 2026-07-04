import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { ChevronDown, Menu, X, LogIn, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';
const CloseIcon = X;
import { useConfig } from '../context/ConfigContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const STATIC_NAV_ITEMS = [
  { label: 'Home', path: '/' },
  {
    label: 'Company',
    children: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Our Story', path: '/our-story' },
      { label: 'Sustainability', path: '/sustainability' },
      { label: 'Certifications', path: '/certifications' },
    ]
  },
  {
    label: 'Services',
    children: [
      { label: 'All Services', path: '/services' },
      { label: 'Custom Manufacturing', path: '/custom-manufacturing' },
      { label: 'Private Label', path: '/private-label' },
      { label: 'Quality Control', path: '/quality-control' },
      { label: 'Manufacturing Process', path: '/process' },
    ]
  },
  { label: 'Products', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blog', path: '/blog' },
  {
    label: 'Support',
    children: [
      { label: 'FAQs', path: '/faqs' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact Us', path: '/contact' },
    ]
  },
];

export default function Navbar() {
  const { config } = useConfig();
  const { user, logout } = useAuth();
  const settings = config?.settings || {};
  const headerConfig = settings.header || {};
  const branding = settings.branding || {};
  const colorTheme = settings.colorTheme || {};

  // Determine nav items — use dynamic if set, else static
  const NAV_ITEMS = STATIC_NAV_ITEMS;

  // Announcement bar
  const showAnnouncement = headerConfig.showAnnouncement !== false && !!headerConfig.announcementText;
  const announcementText = headerConfig.announcementText || '';
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  // Accent colors from config
  const accentPrimary = colorTheme.accentPrimary || '#1E3A8A';
  const accentSecondary = colorTheme.accentSecondary || '#D4AF37';

  // CTA from config
  const ctaText = headerConfig.ctaText || 'Get Quote';
  const ctaLink = headerConfig.ctaLink || '/quote';
  const logoSrc = settings.siteLogo || '';
  const logoPreload = useMemo(() => logoSrc ? [{ href: logoSrc, as: 'image' }] : [], [logoSrc]);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const announcementVisible = showAnnouncement && !announcementDismissed;

  useEffect(() => {
    if (!logoSrc) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = logoSrc;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [logoSrc]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      {announcementVisible && (
        <div
          className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-center"
          style={{ backgroundColor: accentPrimary, color: '#fff' }}
        >
          <span className="flex-1 text-center">{announcementText}</span>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="ml-3 opacity-60 hover:opacity-100 transition-opacity shrink-0 cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <CloseIcon size={12} />
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`fixed inset-x-0 z-50 transition-all duration-300 ${
          announcementVisible ? 'top-8' : 'top-0'
        } ${
          scrolled
            ? 'bg-white/97 backdrop-blur-md border-b border-[#E2E8F5] shadow-[0_2px_20px_rgba(15,30,69,0.08)]'
            : 'bg-white/90 backdrop-blur-sm border-b border-[#E2E8F5]/60'
        }`}
        style={colorTheme.navbarBackground ? { backgroundColor: colorTheme.navbarBackground + (scrolled ? 'F7' : 'E6') } : {}}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 shrink-0">
            {settings.siteLogo && (
              <img
                src={settings.siteLogo}
                alt={settings.siteName || 'Logo'}
                className="object-contain transition-all"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                style={{
                  width: branding.navbarLogoWidth ? `${branding.navbarLogoWidth}px` : 'auto',
                  height: branding.navbarLogoHeight ? `${branding.navbarLogoHeight}px` : '2.25rem',
                  borderRadius: branding.navbarLogoRadius ? `${branding.navbarLogoRadius}px` : '4px'
                }}
              />
            )}
            {(!settings.siteLogo || branding.showTextBesideLogo) && (
              <div className="flex flex-col leading-none">
                <span
                  className="font-extrabold tracking-[0.12em] font-display uppercase"
                  style={{
                    fontSize: branding.logoTextFontSize ? `${branding.logoTextFontSize}px` : '13px',
                    fontWeight: branding.logoTextFontWeight || '800',
                    color: branding.logoTextColor || '#0F1E45'
                  }}
                >
                  {settings.logoText || 'AlAaskaFit'}
                </span>
                <span className="text-[7px] tracking-[0.3em] uppercase text-[#8A9BB8] font-medium" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  {settings.siteTagline || 'Textile Factory'}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      activeDropdown === item.label
                        ? 'text-[#1E3A8A] bg-[#EFF6FF]'
                        : 'text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-[#E2E8F5] rounded-xl shadow-[0_8px_32px_rgba(15,30,69,0.12)] py-1.5 z-50"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.path}
                          onClick={() => handleNav(child.path)}
                          className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-colors cursor-pointer flex items-center justify-between group ${
                            isActive(child.path)
                              ? 'text-[#1E3A8A] bg-[#EFF6FF]'
                              : 'text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF]'
                          }`}
                        >
                          {child.label}
                          <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.path)}
                  className={`px-3.5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive(item.path)
                      ? 'text-[#1E3A8A] bg-[#EFF6FF]'
                      : 'text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF]'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>

          {/* CTA Group */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3.5">
                <span className="text-[11px] font-mono text-[#4A6080]">
                  Hi, <span className="font-semibold text-[#1E3A8A]">{user.name}</span> <span className="px-2 py-0.5 bg-[#EFF6FF] border border-[#1E3A8A]/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#1E3A8A]">{user.role}</span>
                </span>
                {(user.role === 'Admin' || user.role === 'Super Admin') && (
                  <button
                    onClick={() => handleNav('/admin')}
                    className="flex items-center gap-1 px-3 py-2 bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 text-[#1E3A8A] text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <LayoutDashboard size={12} />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={async () => {
                    await logout();
                    handleNav('/');
                  }}
                  className="flex items-center gap-1 px-3 py-2 border border-red-200 hover:border-red-400 text-red-500 hover:bg-red-50 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={12} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('/login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF] transition-colors cursor-pointer"
              >
                <LogIn size={13} />
                Login
              </button>
            )}
            <button
              onClick={() => handleNav(ctaLink)}
              className="px-4 py-2 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 hover:-translate-y-px cursor-pointer"
              style={{
                backgroundColor: accentPrimary,
                boxShadow: `0 4px 12px ${accentPrimary}40`
              }}
            >
              {ctaText}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0F1E45]/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[88vw] z-50 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-[#E2E8F5]">
          <span className="font-display font-bold text-sm uppercase tracking-widest text-[#0F1E45]">
            Al<span style={{ color: accentPrimary }}>Aaska</span>Fit
          </span>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-[#8A9BB8] hover:text-[#0F1E45] hover:bg-[#F8FAFF] cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-64px)] py-3 px-3">
          {NAV_ITEMS.map((item) => (
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF] transition-colors cursor-pointer"
                >
                  {item.label}
                  <ChevronDown size={13} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === item.label && (
                  <div className="ml-3 mt-0.5 mb-1 border-l-2 border-[#E2E8F5] pl-3">
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => handleNav(child.path)}
                        className="w-full text-left px-3 py-2 text-[12px] font-medium text-[#6B7EA0] hover:text-[#1E3A8A] hover:bg-[#F8FAFF] rounded-lg transition-colors cursor-pointer"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive(item.path)
                    ? 'text-[#1E3A8A] bg-[#EFF6FF]'
                    : 'text-[#4A6080] hover:text-[#1E3A8A] hover:bg-[#F8FAFF]'
                }`}
              >
                {item.label}
              </button>
            )
          ))}

          <div className="mt-4 pt-4 border-t border-[#E2E8F5] flex flex-col gap-2.5">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="px-3.5 py-2.5 bg-[#F8FAFF] border border-[#E2E8F5] rounded-xl text-center">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8A9BB8]">Logged in as</p>
                  <p className="text-xs font-bold text-[#0F1E45] mt-0.5">{user.name}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#EFF6FF] border border-[#1E3A8A]/10 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#1E3A8A] font-semibold">{user.role}</span>
                </div>
                {(user.role === 'Admin' || user.role === 'Super Admin') && (
                  <button
                    onClick={() => handleNav('/admin')}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1E3A8A]/5 hover:bg-[#1E3A8A]/10 text-[#1E3A8A] text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <LayoutDashboard size={13} />
                    <span>Admin Dashboard</span>
                  </button>
                )}
                <button
                  onClick={async () => {
                    await logout();
                    handleNav('/');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNav('/login')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8F5] text-[12px] font-semibold uppercase tracking-wider text-[#4A6080] hover:text-[#1E3A8A] hover:border-[#1E3A8A] hover:bg-[#F8FAFF] transition-colors cursor-pointer"
              >
                <LogIn size={13} />
                Login
              </button>
            )}
            <button
              onClick={() => handleNav(ctaLink)}
              className="w-full px-4 py-2.5 text-white text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
              style={{ backgroundColor: accentPrimary }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
