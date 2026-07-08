import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { apiFetch } from '../utils/api.js';

const ConfigContext = createContext();

const fallbackConfig = {
  homepage: {
    sectionsOrder: ['hero', 'trust', 'products', 'process', 'factory', 'privatelabel', 'quote', 'blog', 'contact'],
    hiddenSections: []
  },
  settings: {
    siteName: 'Al Aaska Fit',
    logoText: 'AL AASKA FIT',
    siteTagline: 'Textile Factory',
    seoDefaults: {},
    branding: {},
    colorTheme: {},
    typography: {},
    header: {},
    footer: {},
    socialLinks: {},
    mapConfig: {},
    whatsappConfig: {},
    maintenanceMode: { enabled: false }
  }
};

// ─── Apply all CSS custom properties from settings ────────────────────────────
export const applyThemeColors = (settings) => {
  if (!settings) return;
  const root = document.documentElement;
  const colorTheme = settings.colorTheme || {};
  const branding = settings.branding || {};
  const typography = settings.typography || {};

  // ── Color Tokens ──
  if (colorTheme.accentPrimary) {
    root.style.setProperty('--accent', colorTheme.accentPrimary);
    root.style.setProperty('--color-accent', colorTheme.accentPrimary);
    root.style.setProperty('--border-focus', colorTheme.accentPrimary);
  }
  if (colorTheme.accentSecondary) {
    root.style.setProperty('--gold', colorTheme.accentSecondary);
    root.style.setProperty('--color-gold', colorTheme.accentSecondary);
    root.style.setProperty('--gold-hover', colorTheme.accentSecondary);
  }
  if (colorTheme.textPrimary) {
    root.style.setProperty('--text-primary', colorTheme.textPrimary);
    root.style.setProperty('--color-text-primary', colorTheme.textPrimary);
    root.style.setProperty('--text-heading', colorTheme.textPrimary);
  }
  if (colorTheme.textSecondary) {
    root.style.setProperty('--text-secondary', colorTheme.textSecondary);
    root.style.setProperty('--color-text-secondary', colorTheme.textSecondary);
    root.style.setProperty('--text-muted', colorTheme.textSecondary);
  }
  if (colorTheme.background) {
    root.style.setProperty('--bg-page', colorTheme.background);
    root.style.setProperty('--color-bg-primary', colorTheme.background);
  }
  if (colorTheme.cardBackground) {
    root.style.setProperty('--bg-card', colorTheme.cardBackground);
    root.style.setProperty('--bg-input', colorTheme.cardBackground);
  }
  if (colorTheme.navbarBackground)  root.style.setProperty('--navbar-bg', colorTheme.navbarBackground);
  if (colorTheme.footerBackground)  root.style.setProperty('--footer-bg', colorTheme.footerBackground);
  if (colorTheme.buttonBackground)  root.style.setProperty('--btn-bg', colorTheme.buttonBackground);
  if (colorTheme.buttonHoverBackground) root.style.setProperty('--btn-hover', colorTheme.buttonHoverBackground);
  if (colorTheme.borderDefault) {
    root.style.setProperty('--border-default', colorTheme.borderDefault);
    root.style.setProperty('--border-card', colorTheme.borderDefault);
  }
  if (colorTheme.shadowColor) {
    root.style.setProperty('--shadow-color', colorTheme.shadowColor);
  }
  if (colorTheme.borderRadius) root.style.setProperty('--radius-md', colorTheme.borderRadius);

  // ── Branding / Logo dimensions ──
  if (branding.navbarLogoWidth)  root.style.setProperty('--logo-width', branding.navbarLogoWidth + 'px');
  if (branding.navbarLogoHeight) root.style.setProperty('--logo-height', branding.navbarLogoHeight + 'px');
  if (branding.navbarLogoRadius) root.style.setProperty('--logo-radius', branding.navbarLogoRadius + 'px');
  if (branding.footerLogoWidth)  root.style.setProperty('--footer-logo-width', branding.footerLogoWidth + 'px');
  if (branding.footerLogoHeight) root.style.setProperty('--footer-logo-height', branding.footerLogoHeight + 'px');
  if (branding.logoTextFontSize) root.style.setProperty('--logo-text-size', branding.logoTextFontSize + 'px');
  if (branding.logoTextFontWeight) root.style.setProperty('--logo-text-weight', branding.logoTextFontWeight);
  if (branding.logoTextColor) root.style.setProperty('--logo-text-color', branding.logoTextColor);

  // ── Typography ──
  if (typography.baseFontFamily)   root.style.setProperty('--font-sans', `'${typography.baseFontFamily}', sans-serif`);
  if (typography.headingFontFamily) root.style.setProperty('--font-display', `'${typography.headingFontFamily}', sans-serif`);
  if (typography.baseFontSize)     root.style.setProperty('--base-font-size', typography.baseFontSize + 'px');
  if (typography.baseLineHeight)   root.style.setProperty('--base-line-height', typography.baseLineHeight);
  if (typography.baseLetterSpacing) root.style.setProperty('--base-letter-spacing', typography.baseLetterSpacing + 'em');

  // ── Announcement bar height ──
  const showAnnouncement = settings.header?.showAnnouncement && settings.header?.announcementText;
  root.style.setProperty('--announcement-height', showAnnouncement ? '2rem' : '0px');
};

// ─── Apply head meta tags ─────────────────────────────────────────────────────
const applyDynamicHead = (settings) => {
  if (!settings) return;

  const title = settings.seoDefaults?.metaTitle || settings.browserTitle || settings.siteName || 'Al Aaska Fit';
  if (title) document.title = title;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', settings.seoDefaults?.metaDescription || settings.siteTagline || '');

  if (settings.seoDefaults?.keywords) {
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', settings.seoDefaults.keywords);
  }

  if (settings.faviconUrl) {
    let faviconEl = document.querySelector('link[rel="icon"]');
    if (!faviconEl) {
      faviconEl = document.createElement('link');
      faviconEl.setAttribute('rel', 'icon');
      document.head.appendChild(faviconEl);
    }
    faviconEl.setAttribute('href', settings.faviconUrl);
  }

  // Google Analytics injection
  if (settings.googleAnalyticsId && !document.querySelector(`script[data-ga="${settings.googleAnalyticsId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`;
    script.setAttribute('data-ga', settings.googleAnalyticsId);
    document.head.appendChild(script);
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.googleAnalyticsId}');`;
    document.head.appendChild(inlineScript);
  }
};

// ─── Normalize API response ───────────────────────────────────────────────────
const normalizeConfigPayload = (data) => {
  if (!data || typeof data !== 'object') return fallbackConfig;

  // API returns { settings: {...}, homepage: {...}, ... }
  const settings = data.settings || fallbackConfig.settings;
  const homepage = data.homepage || settings.homepage || fallbackConfig.homepage;

  return {
    homepage,
    settings,
    aboutpage: data.aboutpage,
    processpage: data.processpage,
    servicespage: data.servicespage,
    qualitypage: data.qualitypage,
    sustainabilitypage: data.sustainabilitypage,
    careerspage: data.careerspage,
    gallerypage: data.gallerypage,
  };
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(fallbackConfig);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(true);
  const fallbackTimerRef = useRef(null);

  const refreshConfig = useCallback(async () => {
    try {
      // Force fresh fetch — no cache
      const data = await apiFetch('/config', { cache: 'no-store', timeoutMs: 10000 });
      const nextConfig = normalizeConfigPayload(data);
      setConfig(nextConfig);
      applyThemeColors(nextConfig.settings);
      applyDynamicHead(nextConfig.settings);
    } catch (err) {
      console.error('Error fetching global configurations:', err);
      setConfig(fallbackConfig);
      applyThemeColors(fallbackConfig.settings);
      applyDynamicHead(fallbackConfig.settings);
    } finally {
      setLoading(false);
      loadingRef.current = false;
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    fallbackTimerRef.current = setTimeout(() => {
      if (loadingRef.current) {
        setConfig(fallbackConfig);
        applyThemeColors(fallbackConfig.settings);
        applyDynamicHead(fallbackConfig.settings);
        setLoading(false);
        loadingRef.current = false;
      }
    }, 8000);

    refreshConfig();

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [refreshConfig]);

  return (
    <ConfigContext.Provider value={{ config, loading, refreshConfig, setConfig, applyThemeColors }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
