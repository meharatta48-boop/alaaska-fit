import React from 'react';
import { Settings, ImageIcon, Phone, Globe, Clock } from 'lucide-react';
import { Section, Field, ImageUpload } from '../shared.jsx';

export default function GeneralTab({ config, set }) {
  return (
    <div className="space-y-6">
      {/* Site Identity */}
      <Section icon={Settings} title="Site Identity" subtitle="Core branding & name settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Website Name" value={config.siteName} onChange={v => set('siteName', v)} placeholder="Al Aaska Fit" />
          <Field label="Company Name" value={config.companyName} onChange={v => set('companyName', v)} placeholder="Al Aaska Fit LLC" />
          <Field label="Tagline / Slogan" value={config.siteTagline} onChange={v => set('siteTagline', v)} placeholder="Textile Factory" />
          <Field label="Browser Title" value={config.browserTitle} onChange={v => set('browserTitle', v)} placeholder="Same as Website Name" />
          <Field label="Logo Text (Navbar)" value={config.logoText} onChange={v => set('logoText', v)} placeholder="AL AASKA FIT" />
          <Field label="Short Name / Abbreviation" value={config.shortName} onChange={v => set('shortName', v)} placeholder="AAF" />
          <Field label="Copyright Statement" value={config.copyrightText} onChange={v => set('copyrightText', v)} placeholder="All rights reserved." wide />
        </div>
      </Section>

      {/* Logos & Favicon */}
      <Section icon={ImageIcon} title="Logos & Favicons" subtitle="Upload logos for all locations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <ImageUpload
              label="Navbar / Header Logo"
              value={config.siteLogo}
              onChange={v => set('siteLogo', v)}
              note="Displayed in the top navigation bar"
            />
          </div>
          <ImageUpload
            label="Footer Logo"
            value={config.footerLogo}
            onChange={v => set('footerLogo', v)}
            note="Displayed in the footer section"
          />
          <ImageUpload
            label="Favicon (Browser Tab Icon)"
            value={config.faviconUrl}
            onChange={v => set('faviconUrl', v)}
            accept="image/*,.ico"
            note=".ico, .png or .svg — 32×32px recommended"
          />
          <ImageUpload
            label="Loading Screen Logo"
            value={config.loaderLogo}
            onChange={v => set('loaderLogo', v)}
            note="Shown during app initialization"
          />
          <ImageUpload
            label="Admin Panel Logo"
            value={config.adminLogo}
            onChange={v => set('adminLogo', v)}
            note="Shown in admin sidebar header"
          />
          <ImageUpload
            label="Login Page Logo"
            value={config.loginLogo}
            onChange={v => set('loginLogo', v)}
            note="Shown on the admin login screen"
          />
        </div>
      </Section>

      {/* Logo Dimensions */}
      <Section icon={Globe} title="Logo Text Styling" subtitle="Controls the text logo appearance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Font Size (px)" value={String(config.branding?.logoTextFontSize || 16)} onChange={v => set('branding.logoTextFontSize', parseInt(v) || 16)} type="number" mono />
          <Field label="Font Weight" value={config.branding?.logoTextFontWeight || '700'} onChange={v => set('branding.logoTextFontWeight', v)} mono options={['400', '500', '600', '700', '800', '900']} />
          <div>
            <label className="block text-[9px] font-mono uppercase tracking-wider text-[#6B7280] mb-1.5">Text Color</label>
            <div className="flex gap-2 items-center">
              <input type="color" value={config.branding?.logoTextColor || '#0F1E45'} onChange={e => set('branding.logoTextColor', e.target.value)} className="w-9 h-9 rounded-lg border border-[#222] cursor-pointer p-0.5 bg-[#0A0A0A]" />
              <input type="text" value={config.branding?.logoTextColor || '#0F1E45'} onChange={e => set('branding.logoTextColor', e.target.value)} className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] text-[10px] font-mono text-white px-2 py-2 outline-none rounded-lg" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 border-t border-[#1A1A1A]">
          <div>
            <label className="block text-[9px] font-mono uppercase text-[#6B7280] mb-1.5">Navbar Logo Width (px)</label>
            <input type="number" value={config.branding?.navbarLogoWidth || 160} onChange={e => set('branding.navbarLogoWidth', parseInt(e.target.value))} className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
          </div>
          <div>
            <label className="block text-[9px] font-mono uppercase text-[#6B7280] mb-1.5">Navbar Logo Height (px)</label>
            <input type="number" value={config.branding?.navbarLogoHeight || 40} onChange={e => set('branding.navbarLogoHeight', parseInt(e.target.value))} className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
          </div>
          <div>
            <label className="block text-[9px] font-mono uppercase text-[#6B7280] mb-1.5">Logo Border Radius (px)</label>
            <input type="number" value={config.branding?.navbarLogoRadius || 4} onChange={e => set('branding.navbarLogoRadius', parseInt(e.target.value))} className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none" />
          </div>
        </div>
      </Section>

      {/* Contact Information */}
      <Section icon={Phone} title="Contact Information" subtitle="Public-facing contact details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Primary Contact Email" value={config.contactEmail} onChange={v => set('contactEmail', v)} type="email" placeholder="production@company.com" />
          <Field label="Primary Contact Phone" value={config.contactPhone} onChange={v => set('contactPhone', v)} placeholder="+92 300 0000000" />
          <Field label="WhatsApp Number" value={config.whatsappNumber} onChange={v => set('whatsappNumber', v)} placeholder="+923000000000" mono note="Include country code, digits only for WhatsApp link" />
          <Field label="Secondary Email" value={config.contactEmail2} onChange={v => set('contactEmail2', v)} type="email" placeholder="support@company.com" />
          <Field label="Secondary Phone" value={config.contactPhone2} onChange={v => set('contactPhone2', v)} placeholder="+92 300 0000001" />
          <Field label="Contact Form Receiver Email" value={config.notifications?.contactFormReceiver} onChange={v => set('notifications.contactFormReceiver', v)} type="email" placeholder="Where contact form submissions go" />
          <Field wide label="Factory / Office Address" value={config.factoryAddress} onChange={v => set('factoryAddress', v)} rows={2} placeholder="Industrial Zone Block A, Karachi, Pakistan" />
        </div>
      </Section>

      {/* Working Hours */}
      <Section icon={Clock} title="Working Hours" subtitle="Display on footer and contact page">
        <div className="grid grid-cols-1 gap-4">
          <Field
            wide
            label="Working Hours Text"
            value={config.workingHours}
            onChange={v => set('workingHours', v)}
            placeholder="Mon – Fri: 9:00 AM – 6:00 PM (PKT) | Sat: 9:00 AM – 1:00 PM"
            note="This text appears in the footer contact section"
          />
        </div>
      </Section>
    </div>
  );
}
