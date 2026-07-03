import React, { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../../utils/api.js';
import { useConfig } from '../../context/ConfigContext.jsx';
import {
  Save, Loader2, CheckCircle2, AlertCircle, RefreshCw, Upload,
  Palette, Globe, Phone, MessageCircle, Share2, Search, Sliders,
  Type, Download, FileJson, RotateCcw, AlertTriangle, ShieldCheck,
  Plus, Trash2, Layout, LayoutTemplate, Menu, Eye, UserCheck, Shield,
  ImageIcon, Settings, Map, Mail, Lock, BarChart2, Wrench
} from 'lucide-react';

// ─── Theme Presets ───────────────────────────────────────────────────────────
const THEME_PRESETS = [
  {
    name: "Al Aaska Fit Signature (Navy & Gold)",
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
    }
  },
  {
    name: "Noir Luxury Slate",
    colorTheme: {
      accentPrimary: '#0F0F10',
      accentSecondary: '#A0AEC0',
      textPrimary: '#111111',
      textSecondary: '#718096',
      background: '#FAFAFA',
      cardBackground: '#FFFFFF',
      navbarBackground: '#FFFFFF',
      footerBackground: '#0F0F10',
      buttonBackground: '#0F0F10',
      buttonHoverBackground: '#2E2E2E',
      borderDefault: '#E5E7EB',
      borderFocus: '#0F0F10'
    }
  },
  {
    name: "Emerald Premium Wash",
    colorTheme: {
      accentPrimary: '#064E3B',
      accentSecondary: '#D97706',
      textPrimary: '#022C22',
      textSecondary: '#047857',
      background: '#F0FDFA',
      cardBackground: '#FFFFFF',
      navbarBackground: '#FFFFFF',
      footerBackground: '#064E3B',
      buttonBackground: '#064E3B',
      buttonHoverBackground: '#047857',
      borderDefault: '#CCFBF1',
      borderFocus: '#064E3B'
    }
  },
  {
    name: "Rose Brand Couture",
    colorTheme: {
      accentPrimary: '#9F1239',
      accentSecondary: '#F59E0B',
      textPrimary: '#1C1917',
      textSecondary: '#78716C',
      background: '#FFF1F2',
      cardBackground: '#FFFFFF',
      navbarBackground: '#FFFFFF',
      footerBackground: '#881337',
      buttonBackground: '#9F1239',
      buttonHoverBackground: '#881337',
      borderDefault: '#FCE7F3',
      borderFocus: '#9F1239'
    }
  }
];

const ALL_PERMISSIONS = [
  { id: 'dashboard:view', label: 'View Dashboard' },
  { id: 'products:view', label: 'View Products' },
  { id: 'products:edit', label: 'Edit Products' },
  { id: 'products:delete', label: 'Delete Products' },
  { id: 'quotes:view', label: 'View Leads/Quotes' },
  { id: 'quotes:edit', label: 'Edit Leads/Quotes' },
  { id: 'users:view', label: 'View Users' },
  { id: 'users:edit', label: 'Manage Users & Roles' },
  { id: 'blog:edit', label: 'Manage Blog' },
  { id: 'gallery:edit', label: 'Manage Gallery' },
  { id: 'media:edit', label: 'Manage Media Library' },
  { id: 'settings:edit', label: 'Configure Site Settings' },
  { id: 'analytics:view', label: 'View Analytics' },
  { id: 'reports:export', label: 'Export Reports' },
];

function applyCSSVar(varName, value) {
  document.documentElement.style.setProperty(varName, value);
}

// ─── Color Picker Row ────────────────────────────────────────────────────────
function ColorRow({ label, varName, value, onChange }) {
  const handleChange = (val) => {
    onChange(val);
    if (varName) applyCSSVar(varName, val);
  };
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-[#080808] border border-[#161616] rounded-xl">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">{label}</p>
        {varName && <p className="text-[8px] font-mono text-[#4B5563] mt-0.5">{varName}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <input
          type="color"
          value={value || '#000000'}
          onChange={e => handleChange(e.target.value)}
          className="w-8 h-8 rounded-lg border border-[#222] bg-[#0A0A0A] cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value || ''}
          onChange={e => handleChange(e.target.value)}
          className="w-20 bg-[#0A0A0A] border border-[#222] text-[10px] font-mono text-white px-2 py-1.5 outline-none rounded"
        />
      </div>
    </div>
  );
}

// ─── Dimension Field ─────────────────────────────────────────────────────────
function DimensionField({ label, value, onChange, min = 10, max = 500, step = 5 }) {
  return (
    <div className="bg-[#080808] border border-[#161616] p-3 rounded-xl">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[9px] font-mono uppercase text-[#6B7280]">{label}</span>
        <span className="text-[9px] font-mono text-[#D4AF37] font-bold">{value || min}px</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={e => onChange(parseInt(e.target.value))}
          className="flex-1 accent-[#D4AF37]"
        />
      </div>
    </div>
  );
}

// ─── Standard Field ──────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder, rows, mono, wide, step }) {
  const cls = 'w-full bg-[#0A0A0A] border border-[#222] focus:border-[#D4AF37]/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#3A3A3A] outline-none transition-colors' + (mono ? ' font-mono text-[10px]' : '');
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label className="block text-[9px] font-mono uppercase tracking-wider text-[#6B7280] mb-1">{label}</label>
      {rows
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls + ' resize-none'} />
        : <input type={type} step={step} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

// ─── Section Card ────────────────────────────────────────────────────────────
function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl overflow-hidden shadow-md">
      <div className="px-5 py-3.5 border-b border-[#1A1A1A] flex items-center gap-2 bg-[#0A0A0A]">
        {Icon && <Icon size={13} className="text-[#D4AF37] shrink-0" />}
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

// ─── Toggle Button ───────────────────────────────────────────────────────────
function Toggle({ value, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full relative transition-all duration-200 cursor-pointer ${value ? 'bg-[#D4AF37]' : 'bg-[#2A2A2A]'}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-4.5' : 'left-0.5'}`} />
      </div>
      <span className="text-[9px] font-mono uppercase tracking-wider text-[#6B7280] group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

// ─── Logo Upload Block ───────────────────────────────────────────────────────
function LogoUploadBlock({ label, valueKey, sizeWidthKey, sizeHeightKey, sizeRadiusKey, config, set }) {
  const logoVal = config[valueKey] || '';
  return (
    <div className="col-span-2 bg-[#080808] border border-[#161616] rounded-xl p-4 space-y-3">
      <p className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">{label}</p>
      <div className="flex gap-2">
        <input
          value={logoVal}
          onChange={e => set(valueKey, e.target.value)}
          placeholder="URL or upload file"
          className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
        />
        <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#222] hover:border-[#D4AF37] text-[#6B7280] hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all shrink-0">
          <Upload size={11} /> Upload
          <input type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => set(valueKey, reader.result);
            reader.readAsDataURL(file);
          }} />
        </label>
        {logoVal && (
          <button onClick={() => set(valueKey, '')} className="px-2 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-xs cursor-pointer transition-all">
            <Trash2 size={11} />
          </button>
        )}
      </div>
      {logoVal && (
        <div className="flex items-center gap-3 py-2">
          <img src={logoVal} alt={label} className="h-8 object-contain rounded bg-white/5 px-2" />
          <span className="text-[9px] font-mono text-[#4B5563]">Preview</span>
        </div>
      )}
      {(sizeWidthKey || sizeHeightKey || sizeRadiusKey) && (
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1A1A1A]">
          {sizeWidthKey && <DimensionField label="Width" value={config.branding?.[sizeWidthKey] || config[sizeWidthKey]} onChange={v => set(sizeWidthKey.includes('.') ? sizeWidthKey : `branding.${sizeWidthKey}`, v)} min={40} max={300} />}
          {sizeHeightKey && <DimensionField label="Height" value={config.branding?.[sizeHeightKey] || config[sizeHeightKey]} onChange={v => set(sizeHeightKey.includes('.') ? sizeHeightKey : `branding.${sizeHeightKey}`, v)} min={20} max={120} />}
          {sizeRadiusKey && <DimensionField label="Radius" value={config.branding?.[sizeRadiusKey] || config[sizeRadiusKey]} onChange={v => set(sizeRadiusKey.includes('.') ? sizeRadiusKey : `branding.${sizeRadiusKey}`, v)} min={0} max={40} step={2} />}
        </div>
      )}
    </div>
  );
}

// ─── Main Panel ──────────────────────────────────────────────────────────────
export default function SettingsPanel() {
  const { refreshConfig } = useConfig();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('branding');

  // RBAC state
  const [customRoles, setCustomRoles] = useState([
    { name: 'Super Admin', permissions: ['all'] },
    { name: 'Admin', permissions: ['products:edit', 'blogs:edit', 'media:edit', 'settings:edit'] },
    { name: 'User', permissions: ['none'] }
  ]);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRolePerms, setNewRolePerms] = useState([]);

  // Footer column editor state
  const [newColTitle, setNewColTitle] = useState('');

  useEffect(() => { loadConfig(); }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/config/settings');

      if (!data.branding) data.branding = {
        navbarLogoWidth: 160, navbarLogoHeight: 40, navbarLogoRadius: 4,
        footerLogoWidth: 140, footerLogoHeight: 36, footerLogoRadius: 4,
        logoTextFontSize: 16, logoTextFontWeight: '700', logoTextColor: '#0F1E45',
        showTextBesideLogo: true
      };
      if (!data.colorTheme) data.colorTheme = {
        accentPrimary: '#1E3A8A', accentSecondary: '#D4AF37', textPrimary: '#1A1A2E',
        textSecondary: '#4A5568', background: '#FFFFFF', cardBackground: '#FFFFFF',
        navbarBackground: '#FFFFFF', footerBackground: '#0F1E45',
        buttonBackground: '#1E3A8A', buttonHoverBackground: '#162A5E',
        borderDefault: '#E2E8F5', borderFocus: '#1E3A8A'
      };
      if (!data.typography) data.typography = {
        baseFontFamily: 'Inter', headingFontFamily: 'Outfit', baseFontSize: 14,
        baseLineHeight: 1.6, baseLetterSpacing: 0
      };
      if (!data.header) data.header = {
        announcementText: '✨ FREE SHIPPING ON PRE-PRODUCTION SAMPLES FOR GLOBAL B2B CLIENTS',
        showAnnouncement: true, stickyNavbar: true, transparentNavbar: false,
        ctaText: 'Get Quote', ctaLink: '/quote',
        menuItems: [
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: 'Process', path: '/process' },
          { label: 'Careers', path: '/careers' },
          { label: 'Contact', path: '/contact' }
        ]
      };
      if (!data.footer) data.footer = {
        aboutText: 'Enterprise-grade apparel manufacturing private label factory.',
        copyrightText: 'All rights reserved.', showNewsletter: true,
        columns: [
          { title: 'Company', links: [{ label: 'About Us', path: '/about-us' }, { label: 'Our Story', path: '/our-story' }] }
        ]
      };
      if (!data.whatsappConfig) data.whatsappConfig = { welcomeMessage: 'Hello! Welcome to Al Aaska Fit.', autoMessage: 'Inquiry from website', showButton: true, position: 'right', buttonColor: '#25D366' };
      if (!data.mapConfig) data.mapConfig = { latitude: '24.8719409', longitude: '67.0142345', zoomLevel: 12, enableMap: true, addressLine: '' };
      if (!data.socialLinks) data.socialLinks = { instagram: '', facebook: '', linkedin: '', twitter: '', youtube: '' };
      if (!data.seoDefaults) data.seoDefaults = { metaTitle: 'Al Aaska Fit | Premium Clothing Manufacturer', metaDescription: 'Enterprise-grade apparel manufacturer, private label specialists.', keywords: 'clothing manufacturer, apparel factory, private label' };
      if (!data.maintenanceMode) data.maintenanceMode = { enabled: false, message: 'We are performing scheduled maintenance. Back shortly!', allowAdmins: true };
      if (!data.smtpConfig) data.smtpConfig = { host: '', port: '465', user: '', pass: '', from: '' };

      setConfig(data);
    } catch {
      setConfig({
        siteName: 'Al Aaska Fit', logoText: 'AL AASKA FIT', siteTagline: 'Textile Factory',
        contactEmail: 'production@alaaskafit.com', contactPhone: '+92 300 1234567',
        whatsappNumber: '+923001234567', faviconUrl: '', loaderLogo: '', footerLogo: '',
        whatsappConfig: { welcomeMessage: 'Hello! Welcome to Al Aaska Fit.', autoMessage: 'Inquiry from website', showButton: true, position: 'right', buttonColor: '#25D366' },
        factoryAddress: 'Industrial Zone Block A, Karachi, Pakistan',
        mapConfig: { latitude: '24.8719409', longitude: '67.0142345', zoomLevel: 12, enableMap: true, addressLine: '' },
        colorTheme: { accentPrimary: '#1E3A8A', accentSecondary: '#D4AF37', textPrimary: '#1A1A2E', textSecondary: '#4A5568', background: '#FFFFFF', cardBackground: '#FFFFFF', navbarBackground: '#FFFFFF', footerBackground: '#0F1E45', buttonBackground: '#1E3A8A', buttonHoverBackground: '#162A5E', borderDefault: '#E2E8F5', borderFocus: '#1E3A8A' },
        branding: { navbarLogoWidth: 160, navbarLogoHeight: 40, navbarLogoRadius: 4, footerLogoWidth: 140, footerLogoHeight: 36, footerLogoRadius: 4, logoTextFontSize: 16, logoTextFontWeight: '700', logoTextColor: '#0F1E45', showTextBesideLogo: true },
        typography: { baseFontFamily: 'Inter', headingFontFamily: 'Outfit', baseFontSize: 14, baseLineHeight: 1.6, baseLetterSpacing: 0 },
        header: { announcementText: '✨ FREE SHIPPING ON BULK ORDERS', showAnnouncement: true, stickyNavbar: true, transparentNavbar: false, ctaText: 'Get Quote', ctaLink: '/quote', menuItems: [{ label: 'Home', path: '/' }, { label: 'Products', path: '/products' }] },
        footer: { aboutText: 'Factory Apparel Blanks.', copyrightText: 'All rights reserved.', showNewsletter: true, columns: [] },
        socialLinks: { instagram: '', facebook: '', linkedin: '', twitter: '', youtube: '' },
        seoDefaults: { metaTitle: 'Al Aaska Fit', metaDescription: 'Clothing manufacturer.', keywords: 'clothing factory' },
        maintenanceMode: { enabled: false, message: 'Down for maintenance.', allowAdmins: true },
        smtpConfig: { host: '', port: '465', user: '', pass: '', from: '' }
      });
    } finally { setLoading(false); }
  };

  const set = useCallback((path, value) => {
    setConfig(prev => {
      const keys = path.split('.');
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  const selectPreset = (preset) => {
    setConfig(prev => ({
      ...prev,
      colorTheme: { ...prev.colorTheme, ...preset.colorTheme }
    }));
    // Apply CSS vars immediately for live preview
    if (preset.colorTheme) {
      const ct = preset.colorTheme;
      if (ct.accentPrimary) { applyCSSVar('--color-accent', ct.accentPrimary); applyCSSVar('--accent', ct.accentPrimary); }
      if (ct.accentSecondary) { applyCSSVar('--color-gold', ct.accentSecondary); applyCSSVar('--gold', ct.accentSecondary); }
      if (ct.textPrimary) applyCSSVar('--color-text-primary', ct.textPrimary);
      if (ct.textSecondary) applyCSSVar('--color-text-secondary', ct.textSecondary);
      if (ct.background) applyCSSVar('--color-bg-primary', ct.background);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      await apiFetch('/config/settings', { method: 'PUT', body: JSON.stringify({ value: config }) });
      await refreshConfig();
      setMsg({ type: 'success', text: '✓ Enterprise configuration saved and live!' });
    } catch (e) {
      setMsg({ type: 'error', text: e.message || 'Failed to save settings.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 5000);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const el = document.createElement('a');
    el.setAttribute("href", dataStr);
    el.setAttribute("download", `alaaska_settings_${new Date().toISOString().split('T')[0]}.json`);
    el.click();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const parsed = JSON.parse(event.target.result);
        setConfig(parsed);
        setMsg({ type: 'success', text: 'Config loaded! Hit Save to persist.' });
      } catch {
        setMsg({ type: 'error', text: 'Invalid JSON config file.' });
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  const addRole = () => {
    if (!newRoleName.trim()) return;
    setCustomRoles(p => [...p, { name: newRoleName, permissions: newRolePerms }]);
    setNewRoleName('');
    setNewRolePerms([]);
  };
  const removeRole = (index) => setCustomRoles(p => p.filter((_, i) => i !== index));

  // Footer column helpers
  const addFooterColumn = () => {
    if (!newColTitle.trim()) return;
    const cols = config.footer?.columns || [];
    set('footer.columns', [...cols, { title: newColTitle, links: [] }]);
    setNewColTitle('');
  };
  const removeFooterColumn = (ci) => {
    const cols = [...(config.footer?.columns || [])];
    cols.splice(ci, 1);
    set('footer.columns', cols);
  };
  const addFooterLink = (ci) => {
    const cols = JSON.parse(JSON.stringify(config.footer?.columns || []));
    cols[ci].links = [...(cols[ci].links || []), { label: 'New Link', path: '/' }];
    set('footer.columns', cols);
  };
  const removeFooterLink = (ci, li) => {
    const cols = JSON.parse(JSON.stringify(config.footer?.columns || []));
    cols[ci].links.splice(li, 1);
    set('footer.columns', cols);
  };
  const updateFooterLink = (ci, li, field, val) => {
    const cols = JSON.parse(JSON.stringify(config.footer?.columns || []));
    cols[ci].links[li][field] = val;
    set('footer.columns', cols);
  };

  if (loading) return (
    <div className="space-y-4">
      {Array(4).fill(0).map((_, i) => <div key={i} className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl h-24 animate-pulse" />)}
    </div>
  );

  const TABS = [
    { id: 'branding', label: 'Branding', icon: Sliders },
    { id: 'theme', label: 'Theme Designer', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'layout', label: 'Header & Navbar', icon: Menu },
    { id: 'footer', label: 'Footer Builder', icon: LayoutTemplate },
    { id: 'seo', label: 'SEO & Meta', icon: Search },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'rbac', label: 'RBAC Access', icon: Shield },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  ];

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-lg text-white font-display uppercase tracking-wider">Enterprise Controls</h2>
          <p className="text-[10px] text-[#6B7280] font-light mt-0.5">Branding, theme designer, typography, header, footer, SEO, integrations & access roles</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadConfig} className="p-2 border border-[#1E1E1E] bg-[#0F0F0F] rounded-xl text-[#4B5563] hover:text-white transition-all cursor-pointer">
            <RefreshCw size={12} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-60 cursor-pointer shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
          >
            {saving ? <><Loader2 size={12} className="animate-spin" /> Saving...</> : <><Save size={12} /> Save All Settings</>}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 text-xs font-mono rounded-xl px-4 py-3 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {msg.type === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
          {msg.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#1E1E1E] gap-1 overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-3 border-b-2 text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id ? 'border-[#D4AF37] text-white bg-white/5' : 'border-transparent text-[#4B5563] hover:text-white'}`}
            >
              <Icon size={11} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═══════════════ BRANDING TAB ═══════════════ */}
      {activeTab === 'branding' && (
        <div className="space-y-6">
          <Section icon={Settings} title="Site Identity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Website Name" value={config.siteName} onChange={v => set('siteName', v)} />
              <Field label="Website Short Name" value={config.shortName} onChange={v => set('shortName', v)} placeholder="e.g. AAF" />
              <Field label="Website Tagline" value={config.siteTagline} onChange={v => set('siteTagline', v)} />
              <Field label="Company Name" value={config.companyName} onChange={v => set('companyName', v)} />
              <Field label="Logo Text (Navbar)" value={config.logoText} onChange={v => set('logoText', v)} />
              <Field label="Copyright Statement" value={config.copyrightText} onChange={v => set('copyrightText', v)} />
            </div>
          </Section>

          <Section icon={ImageIcon} title="Logos & Favicons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Navbar Logo */}
              <LogoUploadBlock
                label="Navbar / Header Logo"
                valueKey="siteLogo"
                sizeWidthKey="navbarLogoWidth"
                sizeHeightKey="navbarLogoHeight"
                sizeRadiusKey="navbarLogoRadius"
                config={config}
                set={set}
              />
              {/* Footer Logo */}
              <LogoUploadBlock
                label="Footer Logo"
                valueKey="footerLogo"
                sizeWidthKey="footerLogoWidth"
                sizeHeightKey="footerLogoHeight"
                sizeRadiusKey="footerLogoRadius"
                config={config}
                set={set}
              />
              {/* Favicon */}
              <div className="col-span-2 bg-[#080808] border border-[#161616] rounded-xl p-4 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">Favicon (Browser Tab Icon)</p>
                <div className="flex gap-2">
                  <input
                    value={config.faviconUrl || ''}
                    onChange={e => set('faviconUrl', e.target.value)}
                    placeholder="Favicon URL (.ico, .png, .svg)"
                    className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#222] hover:border-[#D4AF37] text-[#6B7280] hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all shrink-0">
                    <Upload size={11} /> Upload
                    <input type="file" accept="image/*,.ico" className="hidden" onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => set('faviconUrl', reader.result);
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                </div>
                {config.faviconUrl && <img src={config.faviconUrl} alt="Favicon" className="w-8 h-8 object-contain" />}
              </div>
              {/* Loader Logo */}
              <div className="col-span-2 bg-[#080808] border border-[#161616] rounded-xl p-4 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">Loading Screen Logo</p>
                <div className="flex gap-2">
                  <input
                    value={config.loaderLogo || ''}
                    onChange={e => set('loaderLogo', e.target.value)}
                    placeholder="Loader logo URL"
                    className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                  />
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#222] hover:border-[#D4AF37] text-[#6B7280] hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all shrink-0">
                    <Upload size={11} /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => set('loaderLogo', reader.result);
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                </div>
              </div>
            </div>
          </Section>

          <Section icon={Type} title="Logo Text Styling">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-3 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Display text beside logo</span>
                <Toggle value={!!config.branding?.showTextBesideLogo} onChange={v => set('branding.showTextBesideLogo', v)} label="Show Text Beside Logo" />
              </div>
              <Field label="Font Size (px)" value={String(config.branding?.logoTextFontSize || 16)} onChange={v => set('branding.logoTextFontSize', parseInt(v) || 16)} type="number" mono />
              <Field label="Font Weight" value={config.branding?.logoTextFontWeight || '700'} onChange={v => set('branding.logoTextFontWeight', v)} mono />
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-wider text-[#6B7280] mb-1">Text Color</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={config.branding?.logoTextColor || '#0F1E45'} onChange={e => set('branding.logoTextColor', e.target.value)} className="w-8 h-8 rounded-lg border border-[#222] cursor-pointer p-0.5 bg-[#0A0A0A]" />
                  <input type="text" value={config.branding?.logoTextColor || '#0F1E45'} onChange={e => set('branding.logoTextColor', e.target.value)} className="flex-1 bg-[#0A0A0A] border border-[#222] text-[10px] font-mono text-white px-2 py-1.5 outline-none rounded" />
                </div>
              </div>
            </div>
          </Section>

          <Section icon={Phone} title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Contact Email" value={config.contactEmail} onChange={v => set('contactEmail', v)} type="email" placeholder="contact@company.com" />
              <Field label="Contact Phone" value={config.contactPhone} onChange={v => set('contactPhone', v)} placeholder="+92 300 0000000" />
              <Field label="WhatsApp Number" value={config.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+923000000000" mono />
              <Field label="Factory Address" value={config.factoryAddress} onChange={v => set('factoryAddress', v)} rows={2} wide />
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ THEME DESIGNER TAB ═══════════════ */}
      {activeTab === 'theme' && (
        <div className="space-y-6">
          <Section icon={Palette} title="Theme Presets">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {THEME_PRESETS.map(preset => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => selectPreset(preset)}
                  className="p-3 bg-[#080808] border border-[#222] hover:border-[#D4AF37]/50 rounded-xl text-left transition-all cursor-pointer group"
                >
                  <p className="text-[9px] font-bold text-white group-hover:text-[#D4AF37] mb-2 leading-tight">{preset.name}</p>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: preset.colorTheme.accentPrimary }} />
                    <div className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: preset.colorTheme.accentSecondary }} />
                    <div className="w-4 h-4 rounded-full border border-white/20 bg-white" />
                    <div className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: preset.colorTheme.footerBackground }} />
                  </div>
                </button>
              ))}
            </div>
          </Section>

          <Section icon={Palette} title="Color Customization">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ColorRow label="Accent Primary (Buttons, Links)" varName="--color-accent" value={config.colorTheme?.accentPrimary} onChange={v => set('colorTheme.accentPrimary', v)} />
              <ColorRow label="Accent Secondary (Gold / Highlights)" varName="--color-gold" value={config.colorTheme?.accentSecondary} onChange={v => set('colorTheme.accentSecondary', v)} />
              <ColorRow label="Primary Text Color" varName="--color-text-primary" value={config.colorTheme?.textPrimary} onChange={v => set('colorTheme.textPrimary', v)} />
              <ColorRow label="Secondary Text Color" varName="--color-text-secondary" value={config.colorTheme?.textSecondary} onChange={v => set('colorTheme.textSecondary', v)} />
              <ColorRow label="Page Background" varName="--color-bg-primary" value={config.colorTheme?.background} onChange={v => set('colorTheme.background', v)} />
              <ColorRow label="Card Background" value={config.colorTheme?.cardBackground} onChange={v => set('colorTheme.cardBackground', v)} />
              <ColorRow label="Navbar Background" value={config.colorTheme?.navbarBackground} onChange={v => set('colorTheme.navbarBackground', v)} />
              <ColorRow label="Footer Background" value={config.colorTheme?.footerBackground} onChange={v => set('colorTheme.footerBackground', v)} />
              <ColorRow label="Button Background" value={config.colorTheme?.buttonBackground} onChange={v => set('colorTheme.buttonBackground', v)} />
              <ColorRow label="Button Hover Background" value={config.colorTheme?.buttonHoverBackground} onChange={v => set('colorTheme.buttonHoverBackground', v)} />
              <ColorRow label="Border Default" value={config.colorTheme?.borderDefault} onChange={v => set('colorTheme.borderDefault', v)} />
              <ColorRow label="Border Focus" value={config.colorTheme?.borderFocus} onChange={v => set('colorTheme.borderFocus', v)} />
            </div>
          </Section>

          <Section icon={FileJson} title="Theme Backup">
            <div className="flex gap-4">
              <button onClick={handleExport} type="button" className="flex-1 py-2.5 bg-[#080808] border border-[#222] rounded-xl text-xs text-white font-mono hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center gap-2">
                <Download size={12} /> Export Config JSON
              </button>
              <label className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#080808] border border-[#222] rounded-xl text-xs text-[#6B7280] hover:text-white font-mono cursor-pointer transition-all">
                <Upload size={12} /> Import Config JSON
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ TYPOGRAPHY TAB ═══════════════ */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          <Section icon={Type} title="Typography Control">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-mono uppercase text-[#6B7280] mb-1.5">Base Font Family</label>
                <select
                  value={config.typography?.baseFontFamily || 'Inter'}
                  onChange={e => set('typography.baseFontFamily', e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  {['Inter', 'Outfit', 'Space Grotesk', 'Roboto', 'DM Sans', 'Poppins', 'Nunito'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-mono uppercase text-[#6B7280] mb-1.5">Headings Font Family</label>
                <select
                  value={config.typography?.headingFontFamily || 'Outfit'}
                  onChange={e => set('typography.headingFontFamily', e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  {['Outfit', 'Inter', 'Space Grotesk', 'Playfair Display', 'DM Sans', 'Sora'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <Field label="Base Font Size (px)" value={String(config.typography?.baseFontSize || 14)} onChange={v => set('typography.baseFontSize', parseInt(v) || 14)} type="number" mono />
              <Field label="Base Line Height" value={String(config.typography?.baseLineHeight || 1.6)} onChange={v => set('typography.baseLineHeight', parseFloat(v) || 1.6)} type="number" step="0.1" mono />
              <Field label="Letter Spacing (em)" value={String(config.typography?.baseLetterSpacing || 0)} onChange={v => set('typography.baseLetterSpacing', parseFloat(v) || 0)} type="number" step="0.01" mono />
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ HEADER & NAVBAR TAB ═══════════════ */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          <Section icon={Menu} title="Announcement Bar">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Announcement Bar Visibility</span>
                <Toggle value={!!config.header?.showAnnouncement} onChange={v => set('header.showAnnouncement', v)} label={config.header?.showAnnouncement ? 'Visible' : 'Hidden'} />
              </div>
              <Field label="Announcement Text" value={config.header?.announcementText} onChange={v => set('header.announcementText', v)} wide placeholder="✨ FREE SHIPPING ON BULK B2B ORDERS" />
            </div>
          </Section>

          <Section icon={Settings} title="Navbar Behavior">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between col-span-2">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Sticky Navbar (stays fixed on scroll)</span>
                <Toggle value={!!config.header?.stickyNavbar} onChange={v => set('header.stickyNavbar', v)} label="Sticky Navbar" />
              </div>
              <Field label="CTA Button Text" value={config.header?.ctaText} onChange={v => set('header.ctaText', v)} placeholder="Get Quote" />
              <Field label="CTA Button Link" value={config.header?.ctaLink} onChange={v => set('header.ctaLink', v)} placeholder="/quote" mono />
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ FOOTER BUILDER TAB ═══════════════ */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          <Section icon={LayoutTemplate} title="Footer Content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="About / Description Text" value={config.footer?.aboutText} onChange={v => set('footer.aboutText', v)} rows={3} wide />
              <Field label="Copyright Text" value={config.footer?.copyrightText || config.copyrightText} onChange={v => set('footer.copyrightText', v)} placeholder="All rights reserved." />
              <div className="flex items-center justify-between col-span-2">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Newsletter Subscription Form</span>
                <Toggle value={!!config.footer?.showNewsletter} onChange={v => set('footer.showNewsletter', v)} label="Show Newsletter" />
              </div>
            </div>
          </Section>

          <Section icon={Share2} title="Social Media Links">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Instagram URL" value={config.socialLinks?.instagram} onChange={v => set('socialLinks.instagram', v)} placeholder="https://instagram.com/..." />
              <Field label="Facebook URL" value={config.socialLinks?.facebook} onChange={v => set('socialLinks.facebook', v)} placeholder="https://facebook.com/..." />
              <Field label="LinkedIn URL" value={config.socialLinks?.linkedin} onChange={v => set('socialLinks.linkedin', v)} placeholder="https://linkedin.com/company/..." />
              <Field label="Twitter / X URL" value={config.socialLinks?.twitter} onChange={v => set('socialLinks.twitter', v)} placeholder="https://twitter.com/..." />
              <Field label="YouTube URL" value={config.socialLinks?.youtube} onChange={v => set('socialLinks.youtube', v)} placeholder="https://youtube.com/@..." />
            </div>
          </Section>

          <Section icon={Layout} title="Footer Columns Manager">
            <div className="space-y-4">
              {(config.footer?.columns || []).map((col, ci) => (
                <div key={ci} className="bg-[#080808] border border-[#161616] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      value={col.title}
                      onChange={e => {
                        const cols = JSON.parse(JSON.stringify(config.footer?.columns || []));
                        cols[ci].title = e.target.value;
                        set('footer.columns', cols);
                      }}
                      className="bg-transparent text-xs font-bold text-white outline-none border-b border-[#333] pb-0.5 flex-1"
                      placeholder="Column Title"
                    />
                    <button onClick={() => removeFooterColumn(ci)} className="ml-3 text-[#4B5563] hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(col.links || []).map((link, li) => (
                      <div key={li} className="flex gap-2 items-center">
                        <input
                          value={link.label}
                          onChange={e => updateFooterLink(ci, li, 'label', e.target.value)}
                          className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-lg px-2 py-1.5 text-[10px] text-white outline-none"
                          placeholder="Link Label"
                        />
                        <input
                          value={link.path}
                          onChange={e => updateFooterLink(ci, li, 'path', e.target.value)}
                          className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-lg px-2 py-1.5 text-[10px] font-mono text-white outline-none"
                          placeholder="/path"
                        />
                        <button onClick={() => removeFooterLink(ci, li)} className="text-[#4B5563] hover:text-red-400 transition-colors cursor-pointer shrink-0">
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => addFooterLink(ci)} className="text-[9px] font-mono text-[#D4AF37] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                      <Plus size={10} /> Add Link
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={newColTitle}
                  onChange={e => setNewColTitle(e.target.value)}
                  placeholder="New column title..."
                  className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
                <button onClick={addFooterColumn} className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono rounded-xl hover:bg-[#D4AF37]/20 transition-all cursor-pointer flex items-center gap-1.5">
                  <Plus size={12} /> Add Column
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ SEO TAB ═══════════════ */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <Section icon={Search} title="Default SEO Settings">
            <div className="grid grid-cols-1 gap-4">
              <Field label="Default Browser Title" value={config.seoDefaults?.metaTitle} onChange={v => set('seoDefaults.metaTitle', v)} placeholder="Al Aaska Fit | Premium Clothing Manufacturer" wide />
              <Field label="Default Meta Description" value={config.seoDefaults?.metaDescription} onChange={v => set('seoDefaults.metaDescription', v)} rows={3} wide placeholder="Enterprise-grade apparel manufacturer, private label specialists in Pakistan." />
              <Field label="Meta Keywords (comma separated)" value={config.seoDefaults?.keywords} onChange={v => set('seoDefaults.keywords', v)} placeholder="clothing manufacturer, apparel factory, private label, MOQ" wide />
            </div>
          </Section>
          <Section icon={Globe} title="Open Graph / Social Sharing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="OG Title" value={config.seoDefaults?.ogTitle} onChange={v => set('seoDefaults.ogTitle', v)} placeholder="Al Aaska Fit — Premium Clothing Factory" />
              <Field label="OG Description" value={config.seoDefaults?.ogDescription} onChange={v => set('seoDefaults.ogDescription', v)} rows={2} />
              <div className="col-span-2 bg-[#080808] border border-[#161616] rounded-xl p-4">
                <p className="text-[9px] font-mono uppercase text-[#6B7280] mb-2">OG Image (Social Share Preview)</p>
                <div className="flex gap-2">
                  <input value={config.seoDefaults?.ogImage || ''} onChange={e => set('seoDefaults.ogImage', e.target.value)} placeholder="https://..." className="flex-1 bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#222] hover:border-[#D4AF37] text-[#6B7280] hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all shrink-0">
                    <Upload size={11} /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => set('seoDefaults.ogImage', reader.result);
                      reader.readAsDataURL(file);
                    }} />
                  </label>
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ INTEGRATIONS TAB ═══════════════ */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <Section icon={MessageCircle} title="WhatsApp Configuration">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="WhatsApp Business Number" value={config.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+923001234567" mono />
              <Field label="Button Color (Hex)" value={config.whatsappConfig?.buttonColor} onChange={v => set('whatsappConfig.buttonColor', v)} mono />
              <Field label="Welcome Message" value={config.whatsappConfig?.welcomeMessage} onChange={v => set('whatsappConfig.welcomeMessage', v)} rows={2} wide />
              <Field label="Auto-fill Message" value={config.whatsappConfig?.autoMessage} onChange={v => set('whatsappConfig.autoMessage', v)} placeholder="Hi, I'm interested in..." />
              <div className="flex items-center justify-between col-span-2">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Show WhatsApp Button</span>
                <Toggle value={!!config.whatsappConfig?.showButton} onChange={v => set('whatsappConfig.showButton', v)} label="Show Button" />
              </div>
            </div>
          </Section>

          <Section icon={Map} title="Google Maps & Location">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Latitude" value={config.mapConfig?.latitude} onChange={v => set('mapConfig.latitude', v)} mono />
              <Field label="Longitude" value={config.mapConfig?.longitude} onChange={v => set('mapConfig.longitude', v)} mono />
              <Field label="Zoom Level (1-20)" value={String(config.mapConfig?.zoomLevel || 12)} onChange={v => set('mapConfig.zoomLevel', parseInt(v) || 12)} type="number" mono />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Enable Map Section</span>
                <Toggle value={!!config.mapConfig?.enableMap} onChange={v => set('mapConfig.enableMap', v)} label="Enable Map" />
              </div>
              <Field label="Display Address Line" value={config.mapConfig?.addressLine} onChange={v => set('mapConfig.addressLine', v)} placeholder="123 Factory St, Karachi" wide />
            </div>
          </Section>

          <Section icon={Mail} title="SMTP Email Configuration">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="SMTP Host" value={config.smtpConfig?.host} onChange={v => set('smtpConfig.host', v)} placeholder="smtp.gmail.com" mono />
              <Field label="SMTP Port" value={config.smtpConfig?.port} onChange={v => set('smtpConfig.port', v)} placeholder="465" mono />
              <Field label="SMTP Username" value={config.smtpConfig?.user} onChange={v => set('smtpConfig.user', v)} placeholder="no-reply@company.com" mono />
              <Field label="SMTP Password" type="password" value={config.smtpConfig?.pass} onChange={v => set('smtpConfig.pass', v)} placeholder="••••••••••••" mono />
              <Field label="From Address" value={config.smtpConfig?.from} onChange={v => set('smtpConfig.from', v)} placeholder="Al Aaska Fit <no-reply@alaaskafit.com>" wide />
            </div>
          </Section>

          <Section icon={BarChart2} title="Analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Google Analytics ID" value={config.googleAnalyticsId} onChange={v => set('googleAnalyticsId', v)} placeholder="G-XXXXXXXXXX" mono />
              <Field label="Facebook Pixel ID" value={config.facebookPixelId} onChange={v => set('facebookPixelId', v)} placeholder="1234567890" mono />
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ RBAC TAB ═══════════════ */}
      {activeTab === 'rbac' && (
        <div className="space-y-6">
          <Section icon={Shield} title="Role-Based Access Control">
            <div className="space-y-4">
              <div className="bg-[#080808] border border-[#161616] p-4 rounded-xl space-y-4">
                <h4 className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">Create Custom Role</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={e => setNewRoleName(e.target.value)}
                    placeholder="e.g. B2B Sales Editor"
                    className="flex-grow bg-[#0A0A0A] border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none"
                    onKeyDown={e => e.key === 'Enter' && addRole()}
                  />
                  <button
                    onClick={addRole}
                    type="button"
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus size={12} /> Create Role
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#1A1A1A]">
                  {ALL_PERMISSIONS.map(p => (
                    <label key={p.id} className="flex items-center gap-2 text-[9px] text-[#9CA3AF] cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={newRolePerms.includes(p.id)}
                        onChange={e => {
                          const checked = e.target.checked;
                          setNewRolePerms(prev => checked ? [...prev, p.id] : prev.filter(x => x !== p.id));
                        }}
                        className="accent-[#D4AF37]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Roles list */}
              <div className="space-y-2">
                {customRoles.map((role, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-[#0C0C0C] border border-[#1C1C1C] rounded-xl">
                    <div>
                      <p className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        {role.name}
                        {role.name === 'Super Admin' && <span className="text-[8px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded font-mono">SYSTEM</span>}
                      </p>
                      <p className="text-[9px] text-[#6B7280] font-mono mt-1">{role.permissions.join(' · ')}</p>
                    </div>
                    {role.name !== 'Super Admin' && (
                      <button onClick={() => removeRole(idx)} className="text-[#6B7280] hover:text-red-400 transition-colors p-1.5 cursor-pointer">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* ═══════════════ MAINTENANCE TAB ═══════════════ */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <Section icon={Wrench} title="Maintenance Mode">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 bg-[#080808] border border-[#161616] rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white">Maintenance Mode</p>
                  <p className="text-[9px] font-mono text-[#6B7280] mt-0.5">When enabled, all public pages show maintenance message</p>
                </div>
                <Toggle value={!!config.maintenanceMode?.enabled} onChange={v => set('maintenanceMode.enabled', v)} label={config.maintenanceMode?.enabled ? 'ACTIVE' : 'INACTIVE'} />
              </div>
              {config.maintenanceMode?.enabled && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <p className="text-xs text-red-400 font-mono flex items-center gap-2">
                    <AlertTriangle size={12} /> Maintenance mode is currently ACTIVE — public site is hidden!
                  </p>
                </div>
              )}
              <Field label="Maintenance Message" value={config.maintenanceMode?.message} onChange={v => set('maintenanceMode.message', v)} rows={3} wide placeholder="We are performing scheduled maintenance. Back shortly!" />
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-[#9CA3AF]">Allow admin users to bypass maintenance</span>
                <Toggle value={!!config.maintenanceMode?.allowAdmins} onChange={v => set('maintenanceMode.allowAdmins', v)} label="Admin Bypass" />
              </div>
            </div>
          </Section>

          <Section icon={Lock} title="Security Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Session Timeout (minutes)" value={String(config.sessionTimeout || 60)} onChange={v => set('sessionTimeout', parseInt(v) || 60)} type="number" mono />
              <Field label="Max Login Attempts" value={String(config.maxLoginAttempts || 5)} onChange={v => set('maxLoginAttempts', parseInt(v) || 5)} type="number" mono />
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
