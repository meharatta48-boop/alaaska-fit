import React, { createContext, useContext, useState, useEffect } from 'react';
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
    maintenanceMode: {}
  }
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(fallbackConfig);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(true);
  const fallbackTimerRef = useRef(null);

  const refreshConfig = async () => {
    try {
      const data = await apiFetch('/config');
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
  };

  const normalizeConfigPayload = (data) => {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const maybeConfig = data;
      if (maybeConfig.homepage || maybeConfig.settings) {
        return {
          homepage: maybeConfig.homepage || fallbackConfig.homepage,
          settings: maybeConfig.settings || fallbackConfig.settings,
          aboutpage: maybeConfig.aboutpage,
          processpage: maybeConfig.processpage,
          servicespage: maybeConfig.servicespage,
          qualitypage: maybeConfig.qualitypage,
          sustainabilitypage: maybeConfig.sustainabilitypage,
          careerspage: maybeConfig.careerspage,
          gallerypage: maybeConfig.gallerypage,
        };
      }

      const homepage = data.homepage || fallbackConfig.homepage;
      const settings = data.settings || fallbackConfig.settings;
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
    }

    return fallbackConfig;
  };

  const applyDynamicHead = (settings) => {
    if (!settings) return;

    // Browser title
    const title = settings.seoDefaults?.metaTitle || settings.siteName || 'Al Aaska Fit';
    if (title) document.title = title;

    // Meta description
    if (settings.seoDefaults?.metaDescription || settings.siteTagline) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', settings.seoDefaults?.metaDescription || settings.siteTagline);
    }

    // Favicon
    if (settings.faviconUrl) {
      let faviconEl = document.querySelector('link[rel="icon"]');
      if (!faviconEl) {
        faviconEl = document.createElement('link');
        faviconEl.setAttribute('rel', 'icon');
        document.head.appendChild(faviconEl);
      }
      faviconEl.setAttribute('href', settings.faviconUrl);
    }
  };

  const applyThemeColors = (settings) => {
    if (!settings) return;
    const root = document.documentElement;
    const colorTheme = settings.colorTheme;
    const branding = settings.branding;
    const typography = settings.typography;

    // Apply colorTheme
    if (colorTheme) {
      if (colorTheme.accentPrimary) {
        root.style.setProperty('--color-accent', colorTheme.accentPrimary);
        root.style.setProperty('--accent', colorTheme.accentPrimary);
      }
      if (colorTheme.accentSecondary) {
        root.style.setProperty('--color-gold', colorTheme.accentSecondary);
        root.style.setProperty('--gold', colorTheme.accentSecondary);
      }
      if (colorTheme.textPrimary) {
        root.style.setProperty('--color-text-primary', colorTheme.textPrimary);
        root.style.setProperty('--text-primary', colorTheme.textPrimary);
      }
      if (colorTheme.textSecondary) {
        root.style.setProperty('--color-text-secondary', colorTheme.textSecondary);
        root.style.setProperty('--text-secondary', colorTheme.textSecondary);
      }
      if (colorTheme.background) {
        root.style.setProperty('--color-bg-primary', colorTheme.background);
        root.style.setProperty('--bg-page', colorTheme.background);
      }
      if (colorTheme.cardBackground) root.style.setProperty('--bg-card', colorTheme.cardBackground);
      if (colorTheme.navbarBackground) root.style.setProperty('--navbar-bg', colorTheme.navbarBackground);
      if (colorTheme.footerBackground) root.style.setProperty('--footer-bg', colorTheme.footerBackground);
      if (colorTheme.buttonBackground) root.style.setProperty('--btn-bg', colorTheme.buttonBackground);
      if (colorTheme.buttonHoverBackground) root.style.setProperty('--btn-hover', colorTheme.buttonHoverBackground);
      if (colorTheme.borderDefault) root.style.setProperty('--border-default', colorTheme.borderDefault);
      if (colorTheme.borderFocus) root.style.setProperty('--border-focus', colorTheme.borderFocus);
    }

    // Apply branding dimensions for logo
    if (branding) {
      if (branding.navbarLogoWidth) root.style.setProperty('--logo-width', branding.navbarLogoWidth + 'px');
      if (branding.navbarLogoHeight) root.style.setProperty('--logo-height', branding.navbarLogoHeight + 'px');
      if (branding.navbarLogoRadius) root.style.setProperty('--logo-radius', branding.navbarLogoRadius + 'px');
      if (branding.footerLogoWidth) root.style.setProperty('--footer-logo-width', branding.footerLogoWidth + 'px');
      if (branding.footerLogoHeight) root.style.setProperty('--footer-logo-height', branding.footerLogoHeight + 'px');
      if (branding.logoTextFontSize) root.style.setProperty('--logo-text-size', branding.logoTextFontSize + 'px');
      if (branding.logoTextFontWeight) root.style.setProperty('--logo-text-weight', branding.logoTextFontWeight);
      if (branding.logoTextColor) root.style.setProperty('--logo-text-color', branding.logoTextColor);
    }

    // Apply typography
    if (typography) {
      if (typography.baseFontFamily) root.style.setProperty('--font-sans', `'${typography.baseFontFamily}', sans-serif`);
      if (typography.headingFontFamily) root.style.setProperty('--font-display', `'${typography.headingFontFamily}', sans-serif`);
      if (typography.baseFontSize) root.style.setProperty('--base-font-size', typography.baseFontSize + 'px');
      if (typography.baseLineHeight) root.style.setProperty('--base-line-height', typography.baseLineHeight);
      if (typography.baseLetterSpacing) root.style.setProperty('--base-letter-spacing', typography.baseLetterSpacing + 'em');
    }

    // Announcement bar top padding for page body (to avoid content being hidden under bar)
    const showAnnouncement = settings.header?.showAnnouncement && settings.header?.announcementText;
    root.style.setProperty('--announcement-height', showAnnouncement ? '2rem' : '0px');
  };

  useEffect(() => {
    fallbackTimerRef.current = setTimeout(() => {
      if (loadingRef.current) {
        setConfig(fallbackConfig);
        applyThemeColors(fallbackConfig.settings);
        applyDynamicHead(fallbackConfig.settings);
        setLoading(false);
        loadingRef.current = false;
      }
    }, 6000);

    refreshConfig();

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, refreshConfig }}>
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
