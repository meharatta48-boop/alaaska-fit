import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { useConfig } from '../../context/ConfigContext.jsx';
import {
  Save, Loader2, CheckCircle2, AlertCircle, RefreshCw,
  Eye, EyeOff, ChevronUp, ChevronDown, GripVertical,
  Layout, ImageIcon, BarChart2, Type, Link as LinkIcon, Palette
} from 'lucide-react';

// ─── All available sections with meta ────────────────────────────────────────
const ALL_SECTIONS = [
  { id: 'hero', label: 'Hero Banner', icon: ImageIcon, desc: 'Full-screen intro with headline and CTA buttons' },
  { id: 'trust', label: 'Trust Stats', icon: BarChart2, desc: 'Animated counters — pieces, countries, years, clients' },
  { id: 'products', label: 'Products', icon: Layout, desc: 'Product catalog grid pulled from the database' },
  { id: 'process', label: 'Process Timeline', icon: ChevronDown, desc: 'Manufacturing process step-by-step diagram' },
  { id: 'factory', label: 'Factory Gallery', icon: ImageIcon, desc: 'Photo carousel from the factory floor' },
  { id: 'privatelabel', label: 'Private Label', icon: Type, desc: 'Private-label services feature section' },
  { id: 'testimonials', label: 'Testimonials', icon: Type, desc: 'Client reviews and brand testimonials' },
  { id: 'quote', label: 'Quote Builder', icon: LinkIcon, desc: 'Interactive MOQ quote request form' },
  { id: 'blog', label: 'Blog Preview', icon: Type, desc: 'Latest 3 blog posts grid' },
  { id: 'faq', label: 'FAQ Accordion', icon: Type, desc: 'Frequently asked questions' },
  { id: 'contact', label: 'Contact Form', icon: LinkIcon, desc: 'Contact form with map embed' },
];

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder, rows, mono, wide }) {
  const cls = 'w-full bg-[#080808] border border-[#1E1E1E] focus:border-[#D4AF37]/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#2E2E2E] outline-none transition-colors' + (mono ? ' font-mono text-[11px]' : '');
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7280] mb-1.5">{label}</label>
      {rows
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls + ' resize-none'} />
        : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function SectionCard({ icon: Icon, title, sub, children }) {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-[#1A1A1A] flex items-center gap-2.5 bg-[#0A0A0A]">
        {Icon && <Icon size={14} className="text-[#D4AF37] shrink-0" />}
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          {sub && <p className="text-[9px] font-mono text-[#4B5563] mt-0.5">{sub}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ─── Section Order Row ────────────────────────────────────────────────────────
function SectionRow({
  section,
  index,
  total,
  isHidden,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging
}) {
  const Icon = section.icon || Layout;
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
        isDragging
          ? 'bg-[#1C1C1C] border-[#D4AF37]/50 opacity-40 scale-[0.98]'
          : isHidden
            ? 'bg-[#080808] border-[#1A1A1A] opacity-60'
            : 'bg-[#111] border-[#1E1E1E] hover:border-[#D4AF37]/30'
      }`}
    >
      {/* Drag handle (visual) */}
      <GripVertical size={14} className="text-[#4B5563] shrink-0" />

      {/* Position badge */}
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono shrink-0 ${isHidden ? 'bg-[#1A1A1A] text-[#3A3A3A]' : 'bg-[#D4AF37]/15 text-[#D4AF37]'}`}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isHidden ? 'bg-[#1A1A1A]' : 'bg-[#D4AF37]/10'}`}>
        <Icon size={13} className={isHidden ? 'text-[#3A3A3A]' : 'text-[#D4AF37]'} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold truncate ${isHidden ? 'text-[#4B5563] line-through' : 'text-white'}`}>{section.label}</p>
        <p className="text-[9px] font-mono text-[#3A3A3A] truncate mt-0.5">{section.desc}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
          disabled={index === 0}
          title="Move up"
          className="p-1.5 rounded-lg text-[#4B5563] hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronUp size={13} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
          disabled={index === total - 1}
          title="Move down"
          className="p-1.5 rounded-lg text-[#4B5563] hover:text-white hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronDown size={13} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
          title={isHidden ? 'Show section' : 'Hide section'}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isHidden ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'text-[#4B5563] hover:text-red-400 hover:bg-red-500/5'}`}
        >
          {isHidden ? <Eye size={13} /> : <EyeOff size={13} />}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomepageBuilder() {
  const { refreshConfig } = useConfig();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => { loadConfig(); }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/config/homepage');
      if (!data.hiddenSections) data.hiddenSections = [];
      setConfig(data);
    } catch {
      setConfig({
        hero: {
          title: 'Luxury Apparel', subtitle: 'Manufacturing',
          description: 'We engineer premium custom streetwear, heavyweight blanks, and high-density embroidery runs for global luxury labels.',
          primaryBtnText: 'Get Custom Quote', secondaryBtnText: 'Explore Catalog',
          highlightColor: '#D4AF37',
          bgVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
          bgFallbackImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&auto=format&fit=crop&q=80'
        },
        trustStats: [
          { label: 'Pieces Produced', value: 5000000, suffix: '+' },
          { label: 'Countries Served', value: 45, suffix: '+' },
          { label: 'Years Experience', value: 12, suffix: '+' },
          { label: 'Clients Worldwide', value: 250, suffix: '+' }
        ],
        sectionsOrder: ['hero', 'trust', 'products', 'process', 'factory', 'privatelabel', 'testimonials', 'quote', 'blog', 'faq', 'contact'],
        hiddenSections: []
      });
    } finally { setLoading(false); }
  };

  const setHero = (field, value) => setConfig(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  const setStat = (index, field, value) => setConfig(prev => {
    const stats = [...prev.trustStats];
    stats[index] = { ...stats[index], [field]: field === 'value' ? parseInt(value) || 0 : value };
    return { ...prev, trustStats: stats };
  });

  // Ensure all sections from ALL_SECTIONS appear in sectionsOrder
  const normalizedOrder = (() => {
    if (!config) return [];
    const existingOrder = config.sectionsOrder || [];
    const missing = ALL_SECTIONS.map(s => s.id).filter(id => !existingOrder.includes(id));
    return [...existingOrder, ...missing];
  })();

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    const newOrder = [...normalizedOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    setConfig(prev => ({ ...prev, sectionsOrder: newOrder }));
    setDraggedIndex(null);
  };

  const moveSection = (index, direction) => {
    const newOrder = [...normalizedOrder];
    const target = index + direction;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setConfig(prev => ({ ...prev, sectionsOrder: newOrder }));
  };

  const toggleVisibility = (sectionId) => {
    setConfig(prev => {
      const hidden = prev.hiddenSections || [];
      const isHidden = hidden.includes(sectionId);
      return {
        ...prev,
        hiddenSections: isHidden ? hidden.filter(id => id !== sectionId) : [...hidden, sectionId]
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const payload = { ...config, sectionsOrder: normalizedOrder };
      await apiFetch('/config/homepage', { method: 'PUT', body: JSON.stringify({ value: payload }) });
      await refreshConfig();
      setMsg({ type: 'success', text: 'Homepage updated! Section changes are now live.' });
    } catch (e) {
      setMsg({ type: 'error', text: e.message || 'Failed to save.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 5000);
    }
  };

  if (loading) return (
    <div className="space-y-4">
      {Array(3).fill(0).map((_, i) => <div key={i} className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl h-32 animate-pulse" />)}
    </div>
  );

  const hiddenSections = config.hiddenSections || [];

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl text-white">Homepage Builder</h2>
          <p className="text-xs text-[#4B5563] font-light mt-0.5">Edit landing page content and section layout</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadConfig} className="p-2 border border-[#1E1E1E] bg-[#0F0F0F] rounded-xl text-[#4B5563] hover:text-white transition-all cursor-pointer">
            <RefreshCw size={14} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all disabled:opacity-60 cursor-pointer shadow-[0_2px_12px_rgba(212,175,55,0.2)]"
          >
            {saving ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <><Save size={13} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Status msg */}
      {msg && (
        <div className={`flex items-center gap-2 text-xs font-mono rounded-xl px-4 py-3 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {msg.type === 'success' ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
          {msg.text}
        </div>
      )}

      {/* ── Section Visibility & Order ────────────────────────────────── */}
      <SectionCard icon={Layout} title="Section Layout & Visibility" sub="Reorder with arrows or toggle visibility with the eye icon">
        <div className="flex flex-col gap-2">
          {normalizedOrder.map((sectionId, index) => {
            const meta = ALL_SECTIONS.find(s => s.id === sectionId) || { id: sectionId, label: sectionId, icon: Layout, desc: 'Custom section' };
            const isHidden = hiddenSections.includes(sectionId);
            return (
              <SectionRow
                key={sectionId}
                section={meta}
                index={index}
                total={normalizedOrder.length}
                isHidden={isHidden}
                onMoveUp={() => moveSection(index, -1)}
                onMoveDown={() => moveSection(index, 1)}
                onToggleVisibility={() => toggleVisibility(sectionId)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                isDragging={draggedIndex === index}
              />
            );
          })}
        </div>
        <p className="text-[9px] font-mono text-[#2E2E2E] mt-4">
          {hiddenSections.length > 0 ? `${hiddenSections.length} section(s) hidden from public view.` : 'All sections are currently visible.'}
        </p>
      </SectionCard>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <SectionCard icon={ImageIcon} title="Hero Section" sub="Fullscreen intro section with headline, description and CTA buttons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Main Headline" value={config.hero?.title} onChange={v => setHero('title', v)} placeholder="Luxury Apparel" />
          <Field label="Subtitle (gradient shimmer text)" value={config.hero?.subtitle} onChange={v => setHero('subtitle', v)} placeholder="Manufacturing" />
          <Field label="Description" value={config.hero?.description} onChange={v => setHero('description', v)} rows={3} wide placeholder="A compelling description of your manufacturing capabilities..." />
          <Field label="Primary Button Text" value={config.hero?.primaryBtnText} onChange={v => setHero('primaryBtnText', v)} placeholder="Get Custom Quote" />
          <Field label="Secondary Button Text" value={config.hero?.secondaryBtnText} onChange={v => setHero('secondaryBtnText', v)} placeholder="Explore Catalog" />
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7280] mb-1.5">Highlight / Accent Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={config.hero?.highlightColor || '#D4AF37'} onChange={e => setHero('highlightColor', e.target.value)} className="w-9 h-9 rounded-lg border border-[#2A2A2A] bg-[#080808] cursor-pointer p-0.5" />
              <input value={config.hero?.highlightColor || ''} onChange={e => setHero('highlightColor', e.target.value)} className="flex-1 bg-[#080808] border border-[#1E1E1E] focus:border-[#D4AF37]/50 rounded-xl px-3 py-2.5 text-xs font-mono text-white outline-none" />
            </div>
          </div>
          <Field label="Background Video URL" value={config.hero?.bgVideoUrl} onChange={v => setHero('bgVideoUrl', v)} mono placeholder="https://..." />
          <Field label="Fallback Image URL" value={config.hero?.bgFallbackImageUrl} onChange={v => setHero('bgFallbackImageUrl', v)} mono wide placeholder="https://..." />
        </div>
      </SectionCard>

      {/* ── Trust Stats ───────────────────────────────────────────────── */}
      <SectionCard icon={BarChart2} title="Trust Statistics" sub="Animated counters below the hero section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(config.trustStats || []).map((stat, i) => (
            <div key={i} className="bg-[#080808] rounded-xl p-4 flex flex-col gap-3 border border-[#1A1A1A]">
              <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">Stat #{i + 1}</p>
              <Field label="Label" value={stat.label} onChange={v => setStat(i, 'label', v)} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Numeric Value" type="number" value={String(stat.value)} onChange={v => setStat(i, 'value', v)} />
                <Field label="Suffix" value={stat.suffix} onChange={v => setStat(i, 'suffix', v)} placeholder="+" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
