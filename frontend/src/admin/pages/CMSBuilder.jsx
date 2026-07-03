import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Save, RefreshCw, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, Upload } from 'lucide-react';

const PAGES = [
  { key: 'homepage', label: 'Home Page' },
  { key: 'aboutpage', label: 'About Us' },
  { key: 'processpage', label: 'Process Timeline' },
  { key: 'servicespage', label: 'Services' },
  { key: 'qualitypage', label: 'Quality Control' },
  { key: 'sustainabilitypage', label: 'Sustainability' },
  { key: 'careerspage', label: 'Careers Page' },
  { key: 'gallerypage', label: 'Gallery Page' }
];

export default function CMSBuilder() {
  const [selectedPage, setSelectedPage] = useState('aboutpage');
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    loadPageConfig();
  }, [selectedPage]);

  const loadPageConfig = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const data = await apiFetch(`/config/${selectedPage}`);
      setConfig(data || {});
    } catch (err) {
      console.error(err);
      setConfig({});
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      await apiFetch(`/config/${selectedPage}`, {
        method: 'PUT',
        body: JSON.stringify({ value: config })
      });
      setMsg({ type: 'success', text: 'CMS Configuration updated and live!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to save changes.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 4000);
    }
  };

  const updateField = (keyPath, value) => {
    setConfig(prev => {
      const updated = { ...prev };
      const keys = keyPath.split('.');
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addArrayItem = (arrayKey, defaultObj) => {
    setConfig(prev => {
      const list = prev[arrayKey] ? [...prev[arrayKey]] : [];
      list.push(defaultObj);
      return { ...prev, [arrayKey]: list };
    });
  };

  const removeArrayItem = (arrayKey, index) => {
    setConfig(prev => {
      const list = prev[arrayKey] ? [...prev[arrayKey]] : [];
      list.splice(index, 1);
      return { ...prev, [arrayKey]: list };
    });
  };

  const updateArrayField = (arrayKey, index, field, value) => {
    setConfig(prev => {
      const list = prev[arrayKey] ? [...prev[arrayKey]] : [];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [arrayKey]: list };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 size={36} className="animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl text-white">
      {/* Header toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white uppercase">CMS Builder</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">Dynamically customize front-facing site layouts and page copy</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPage}
            onChange={e => setSelectedPage(e.target.value)}
            className="bg-matte-black border border-matte-border rounded-lg px-3 py-2 text-xs font-mono text-white outline-none"
          >
            {PAGES.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
          <button onClick={loadPageConfig} className="p-2 border border-matte-border rounded-lg text-matte-text hover:text-white transition-colors cursor-pointer"><RefreshCw size={14} /></button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer disabled:opacity-60"
          >
            {saving ? <><Loader2 size={12} className="animate-spin" /> Saving...</> : <><Save size={12} /> Save Page</>}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`flex items-center gap-2 text-xs font-mono rounded-lg px-4 py-3 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {msg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {msg.text}
        </div>
      )}

      {/* Editor Body */}
      <div className="space-y-6">
        {/* Core fields (title, subtitle, background media, highlights, etc.) */}
        <div className="bg-[#161616] border border-matte-border rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest border-b border-matte-border/50 pb-2">Headings & Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.hasOwnProperty('title') && (
              <div className="md:col-span-2">
                <label className="label-style">Main Page Title</label>
                <input value={config.title || ''} onChange={e => updateField('title', e.target.value)} className="input-style text-white" />
              </div>
            )}
            {config.hasOwnProperty('subtitle') && (
              <div className="md:col-span-2">
                <label className="label-style">Main Page Subtitle</label>
                <textarea value={config.subtitle || ''} onChange={e => updateField('subtitle', e.target.value)} rows={2} className="input-style resize-none text-white" />
              </div>
            )}

            {/* About us page heritage fields */}
            {config.hasOwnProperty('heritageTitle') && (
              <div>
                <label className="label-style">Heritage Title</label>
                <input value={config.heritageTitle || ''} onChange={e => updateField('heritageTitle', e.target.value)} className="input-style text-white" />
              </div>
            )}
            {config.hasOwnProperty('valuesTitle') && (
              <div>
                <label className="label-style">Values Section Title</label>
                <input value={config.valuesTitle || ''} onChange={e => updateField('valuesTitle', e.target.value)} className="input-style text-white" />
              </div>
            )}
            {config.hasOwnProperty('heritageText1') && (
              <div className="md:col-span-2">
                <label className="label-style">Heritage Paragraph 1</label>
                <textarea value={config.heritageText1 || ''} onChange={e => updateField('heritageText1', e.target.value)} rows={3} className="input-style resize-none text-white" />
              </div>
            )}
            {config.hasOwnProperty('heritageText2') && (
              <div className="md:col-span-2">
                <label className="label-style">Heritage Paragraph 2</label>
                <textarea value={config.heritageText2 || ''} onChange={e => updateField('heritageText2', e.target.value)} rows={3} className="input-style resize-none text-white" />
              </div>
            )}

            {/* Homepage specific (nested under hero) */}
            {selectedPage === 'homepage' && config.hero && (
              <>
                <div className="md:col-span-2">
                  <label className="label-style">Hero Title</label>
                  <input value={config.hero.title || ''} onChange={e => updateField('hero.title', e.target.value)} className="input-style text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-style">Hero Subtitle</label>
                  <input value={config.hero.subtitle || ''} onChange={e => updateField('hero.subtitle', e.target.value)} className="input-style text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="label-style">Hero Description</label>
                  <textarea value={config.hero.description || ''} onChange={e => updateField('hero.description', e.target.value)} rows={3} className="input-style resize-none text-white" />
                </div>
                <div>
                  <label className="label-style">Primary Button Label</label>
                  <input value={config.hero.primaryBtnText || ''} onChange={e => updateField('hero.primaryBtnText', e.target.value)} className="input-style text-white" />
                </div>
                <div>
                  <label className="label-style">Secondary Button Label</label>
                  <input value={config.hero.secondaryBtnText || ''} onChange={e => updateField('hero.secondaryBtnText', e.target.value)} className="input-style text-white" />
                </div>
                <div>
                  <label className="label-style">Background Video URL</label>
                  <input value={config.hero.bgVideoUrl || ''} onChange={e => updateField('hero.bgVideoUrl', e.target.value)} className="input-style font-mono text-[10px] text-white" />
                </div>
                <div>
                  <label className="label-style">Fallback Image (File Upload or URL)</label>
                  <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                    <input value={config.hero.bgFallbackImageUrl || ''} onChange={e => updateField('hero.bgFallbackImageUrl', e.target.value)} className="input-style font-mono text-[10px] text-white flex-1" />
                    <label className="flex items-center gap-1.5 px-4 py-2.5 bg-matte-black border border-matte-border/40 hover:border-gold-400 text-matte-text hover:text-white rounded-lg text-xs font-mono cursor-pointer transition-all shrink-0">
                      <Upload size={13} />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => updateField('hero.bgFallbackImageUrl', reader.result);
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Arrays configuration */}

        {/* Timelines (About Us) */}
        {config.timeline && (
          <div className="bg-[#161616] border border-matte-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-matte-border/50 pb-2">
              <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest">Heritage Timeline Steps</h3>
              <button
                type="button"
                onClick={() => addArrayItem('timeline', { year: '2026', title: 'New Milestone', desc: 'Description text' })}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded hover:bg-gold-400 hover:text-black cursor-pointer transition-colors"
              >
                <Plus size={10} /> Add Milestone
              </button>
            </div>
            <div className="space-y-4">
              {config.timeline.map((item, idx) => (
                <div key={idx} className="bg-matte-black rounded-lg p-4 border border-white/5 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('timeline', idx)}
                    className="absolute top-4 right-4 text-matte-text hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="label-style">Year</label>
                      <input value={item.year || ''} onChange={e => updateArrayField('timeline', idx, 'year', e.target.value)} className="input-style text-white" />
                    </div>
                    <div className="col-span-2">
                      <label className="label-style">Milestone Title</label>
                      <input value={item.title || ''} onChange={e => updateArrayField('timeline', idx, 'title', e.target.value)} className="input-style text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="label-style">Description</label>
                    <textarea value={item.desc || ''} onChange={e => updateArrayField('timeline', idx, 'desc', e.target.value)} rows={2} className="input-style resize-none text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps (Process page) */}
        {config.steps && (
          <div className="bg-[#161616] border border-matte-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-matte-border/50 pb-2">
              <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Production Steps</h3>
              <button
                type="button"
                onClick={() => addArrayItem('steps', { stepNumber: '07', title: 'New Process Step', desc: 'Process description' })}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded hover:bg-gold-400 hover:text-black cursor-pointer"
              >
                <Plus size={10} /> Add Step
              </button>
            </div>
            <div className="space-y-4">
              {config.steps.map((item, idx) => (
                <div key={idx} className="bg-matte-black rounded-lg p-4 border border-white/5 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('steps', idx)}
                    className="absolute top-4 right-4 text-matte-text hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="label-style">Step #</label>
                      <input value={item.stepNumber || ''} onChange={e => updateArrayField('steps', idx, 'stepNumber', e.target.value)} className="input-style text-white" />
                    </div>
                    <div className="col-span-2">
                      <label className="label-style">Step Title</label>
                      <input value={item.title || ''} onChange={e => updateArrayField('steps', idx, 'title', e.target.value)} className="input-style text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="label-style">Step Description</label>
                    <textarea value={item.desc || ''} onChange={e => updateArrayField('steps', idx, 'desc', e.target.value)} rows={2} className="input-style resize-none text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services List (Services page) */}
        {config.list && (
          <div className="bg-[#161616] border border-matte-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-matte-border/50 pb-2">
              <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Services & Features</h3>
              <button
                type="button"
                onClick={() => addArrayItem('list', { title: 'New Sourcing Service', desc: 'Sourcing details', features: [] })}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded hover:bg-gold-400 hover:text-black cursor-pointer"
              >
                <Plus size={10} /> Add Service
              </button>
            </div>
            <div className="space-y-4">
              {config.list.map((item, idx) => (
                <div key={idx} className="bg-matte-black rounded-lg p-4 border border-white/5 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('list', idx)}
                    className="absolute top-4 right-4 text-matte-text hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div>
                    <label className="label-style">Service Title</label>
                    <input value={item.title || ''} onChange={e => updateArrayField('list', idx, 'title', e.target.value)} className="input-style text-white" />
                  </div>
                  <div>
                    <label className="label-style">Service Description</label>
                    <textarea value={item.desc || ''} onChange={e => updateArrayField('list', idx, 'desc', e.target.value)} rows={3} className="input-style resize-none text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vacancies (Careers page) */}
        {config.vacancies && (
          <div className="bg-[#161616] border border-matte-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-matte-border/50 pb-2">
              <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold">Active Job Positions</h3>
              <button
                type="button"
                onClick={() => addArrayItem('vacancies', { title: 'New Position', department: 'Production', type: 'Full-time', location: 'Karachi Office', desc: 'Role description' })}
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded hover:bg-gold-400 hover:text-black cursor-pointer"
              >
                <Plus size={10} /> Add Position
              </button>
            </div>
            <div className="space-y-4">
              {config.vacancies.map((item, idx) => (
                <div key={idx} className="bg-matte-black rounded-lg p-4 border border-white/5 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('vacancies', idx)}
                    className="absolute top-4 right-4 text-matte-text hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label-style">Job Title</label>
                      <input value={item.title || ''} onChange={e => updateArrayField('vacancies', idx, 'title', e.target.value)} className="input-style text-white" />
                    </div>
                    <div>
                      <label className="label-style">Department</label>
                      <input value={item.department || ''} onChange={e => updateArrayField('vacancies', idx, 'department', e.target.value)} className="input-style text-white" />
                    </div>
                    <div>
                      <label className="label-style">Job Type (e.g. Full-time, Hybrid)</label>
                      <input value={item.type || ''} onChange={e => updateArrayField('vacancies', idx, 'type', e.target.value)} className="input-style text-white" />
                    </div>
                    <div>
                      <label className="label-style">Location</label>
                      <input value={item.location || ''} onChange={e => updateArrayField('vacancies', idx, 'location', e.target.value)} className="input-style text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="label-style">Job Description Summary</label>
                    <textarea value={item.desc || ''} onChange={e => updateArrayField('vacancies', idx, 'desc', e.target.value)} rows={3} className="input-style resize-none text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
