// Shared UI primitives for the enterprise Settings Panel
import React from 'react';
import { Upload, Trash2 } from 'lucide-react';

// ─── Apply a CSS variable live ────────────────────────────────────────────────
export function applyCSSVar(varName, value) {
  if (varName) document.documentElement.style.setProperty(varName, value);
}

// ─── Color Picker Row ─────────────────────────────────────────────────────────
export function ColorRow({ label, varName, value, onChange }) {
  const handleChange = (val) => {
    onChange(val);
    applyCSSVar(varName, val);
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

// ─── Dimension Slider ─────────────────────────────────────────────────────────
export function DimensionField({ label, value, onChange, min = 10, max = 500, step = 1, unit = 'px' }) {
  return (
    <div className="bg-[#080808] border border-[#161616] p-3 rounded-xl">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[9px] font-mono uppercase text-[#6B7280]">{label}</span>
        <span className="text-[9px] font-mono text-[#D4AF37] font-bold">{value || min}{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="flex-1 accent-[#D4AF37]"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value || min}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="w-14 bg-[#0A0A0A] border border-[#222] text-[10px] font-mono text-white px-2 py-1 outline-none rounded text-center"
        />
      </div>
    </div>
  );
}

// ─── Standard Field ───────────────────────────────────────────────────────────
export function Field({ label, value, onChange, type = 'text', placeholder, rows, mono, wide, step, note, options }) {
  const cls = 'w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-[#D4AF37]/60 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-[#2E2E2E] outline-none transition-colors' + (mono ? ' font-mono text-[10px]' : '');
  return (
    <div className={wide ? 'col-span-2' : ''}>
      {label && <label className="block text-[9px] font-mono uppercase tracking-wider text-[#6B7280] mb-1.5">{label}</label>}
      {options ? (
        <select value={value || ''} onChange={e => onChange(e.target.value)} className={cls}>
          {options.map(o => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
              {typeof o === 'string' ? o : o.label}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={cls + ' resize-none'} />
      ) : (
        <input type={type} step={step} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
      {note && <p className="text-[9px] font-mono text-[#4B5563] mt-1">{note}</p>}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
export function Section({ icon: Icon, title, subtitle, children, badge }) {
  return (
    <div className="bg-[#0F0F0F] border border-[#1A1A1A] rounded-2xl overflow-hidden shadow-md">
      <div className="px-5 py-3.5 border-b border-[#1A1A1A] flex items-center justify-between gap-3 bg-[#0A0A0A]">
        <div className="flex items-center gap-2.5 min-w-0">
          {Icon && <Icon size={13} className="text-[#D4AF37] shrink-0" />}
          <div className="min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white truncate">{title}</h3>
            {subtitle && <p className="text-[9px] text-[#4B5563] mt-0.5 font-mono truncate">{subtitle}</p>}
          </div>
        </div>
        {badge && (
          <span className="shrink-0 text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
export function Toggle({ value, onChange, label, description, size = 'md' }) {
  const isLg = size === 'lg';
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!value)}
        className={`relative transition-all duration-200 cursor-pointer shrink-0 rounded-full ${isLg ? 'w-11 h-6' : 'w-9 h-5'} ${value ? 'bg-[#D4AF37]' : 'bg-[#2A2A2A] group-hover:bg-[#333]'}`}
      >
        <div className={`absolute top-0.5 rounded-full bg-white shadow transition-all duration-200 ${isLg ? 'w-5 h-5' : 'w-4 h-4'} ${value ? (isLg ? 'left-5' : 'left-4') : 'left-0.5'}`} />
      </div>
      <div className="min-w-0">
        {label && <span className={`${isLg ? 'text-xs' : 'text-[9px]'} font-mono uppercase tracking-wider text-[#6B7280] group-hover:text-white transition-colors`}>{label}</span>}
        {description && <p className="text-[8px] text-[#3B3B3B] font-mono mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

// ─── Image Upload Block ───────────────────────────────────────────────────────
export function ImageUpload({ label, value, onChange, note, accept = 'image/*', showPreview = true }) {
  return (
    <div className="bg-[#080808] border border-[#161616] rounded-xl p-4 space-y-3">
      {label && <p className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">{label}</p>}
      <div className="flex gap-2">
        <input
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste URL or upload file"
          className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
        />
        <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#D4AF37] text-[#6B7280] hover:text-white rounded-xl text-xs font-mono cursor-pointer transition-all shrink-0">
          <Upload size={11} /> Upload
          <input type="file" accept={accept} className="hidden" onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onChange(reader.result);
            reader.readAsDataURL(file);
          }} />
        </label>
        {value && (
          <button onClick={() => onChange('')} className="px-2 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-xs cursor-pointer transition-all">
            <Trash2 size={11} />
          </button>
        )}
      </div>
      {showPreview && value && (
        <div className="flex items-center gap-3 py-1.5">
          <img src={value} alt={label || 'Preview'} className="h-8 object-contain rounded bg-white/5 px-2" />
          <span className="text-[9px] font-mono text-[#4B5563]">Preview</span>
        </div>
      )}
      {note && <p className="text-[9px] font-mono text-[#4B5563]">{note}</p>}
    </div>
  );
}

// ─── Save Status Banner ───────────────────────────────────────────────────────
export function StatusBanner({ msg }) {
  if (!msg) return null;
  const isSuccess = msg.type === 'success';
  return (
    <div className={`flex items-center gap-2.5 text-xs font-mono rounded-xl px-4 py-3 animate-in slide-in-from-top-2 duration-300 ${
      isSuccess
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        : 'bg-red-500/10 text-red-400 border border-red-500/20'
    }`}>
      <span className="text-lg leading-none">{isSuccess ? '✓' : '✗'}</span>
      {msg.text}
    </div>
  );
}
