import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Save, Loader2, CheckCircle2, AlertCircle, RefreshCw, Trash2, Plus, Upload } from 'lucide-react';

export default function GalleryManager() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // New item form
  const [newItem, setNewItem] = useState({ name: '', url: '', category: 'Stitching' });

  useEffect(() => {
    loadGalleryConfig();
  }, []);

  const loadGalleryConfig = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/config/gallerypage');
      setConfig(data || { title: '', subtitle: '', items: [] });
    } catch (err) {
      console.error(err);
      setConfig({ title: '', subtitle: '', items: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedConfig) => {
    setSaving(true);
    setStatusMsg(null);
    try {
      await apiFetch('/config/gallerypage', {
        method: 'PUT',
        body: JSON.stringify({ value: updatedConfig })
      });
      setConfig(updatedConfig);
      setStatusMsg({ type: 'success', text: 'Gallery configuration saved successfully!' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update gallery.' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.url) return;
    const updatedItems = [...(config.items || []), newItem];
    const updatedConfig = { ...config, items: updatedItems };
    handleSave(updatedConfig);
    setNewItem({ name: '', url: '', category: 'Stitching' });
  };

  const handleDeleteItem = (index) => {
    if (!window.confirm('Delete this gallery item?')) return;
    const updatedItems = (config.items || []).filter((_, i) => i !== index);
    const updatedConfig = { ...config, items: updatedItems };
    handleSave(updatedConfig);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setNewItem(prev => ({ ...prev, url: reader.result })); // stores as base64 string
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl uppercase text-white">Factory Gallery Manager</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">Organize showcase photos of our workshop floor, sewing machines, and showroom</p>
        </div>
        <button onClick={loadGalleryConfig} className="p-2 border border-matte-border rounded-lg text-matte-text hover:text-white transition-colors cursor-pointer"><RefreshCw size={14} /></button>
      </div>

      {statusMsg && (
        <div className={`flex items-center gap-2 text-xs font-mono rounded-lg px-4 py-3 ${statusMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {statusMsg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery Items Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#161616] border border-matte-border p-5 rounded-2xl">
            <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest border-b border-matte-border/50 pb-2 mb-4 font-bold">Showroom & Production Media</h3>
            
            {!config.items || config.items.length === 0 ? (
              <div className="text-center py-12 text-xs text-matte-text border border-dashed border-matte-border rounded-xl">
                No gallery items added yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {config.items.map((item, idx) => (
                  <div key={idx} className="group relative aspect-video bg-matte-black rounded-lg overflow-hidden border border-matte-border">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <span className="text-[8px] font-mono bg-gold-400 text-black font-bold uppercase tracking-wider px-2 py-0.5 rounded self-start">{item.category}</span>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] text-white truncate max-w-[70%]">{item.name}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-white/10 rounded cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Gallery Item Form */}
        <div className="lg:col-span-4">
          <div className="bg-[#161616] border border-matte-border p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest border-b border-matte-border/50 pb-2 font-bold">Add Gallery Asset</h3>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="label-style">Asset Label / Title *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="input-style"
                  placeholder="e.g. Embroidery Loom 3D"
                />
              </div>

              <div>
                <label className="label-style">Category Folder *</label>
                <select
                  value={newItem.category}
                  onChange={e => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="input-style bg-matte-black text-white"
                >
                  <option value="Production">Production</option>
                  <option value="Stitching">Stitching</option>
                  <option value="Embroidery">Embroidery</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Factory">Factory</option>
                </select>
              </div>

              <div>
                <label className="label-style">Direct Media File Upload (Base64)</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="w-full bg-[#0A0A0A] border border-matte-border rounded-lg px-3 py-2 text-xs text-matte-text"
                />
              </div>

              <div className="text-center font-mono text-[9px] text-matte-text uppercase tracking-widest">
                — OR —
              </div>

              <div>
                <label className="label-style">External Media URL</label>
                <input
                  type="text"
                  value={newItem.url}
                  onChange={e => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                  className="input-style"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {newItem.url && (
                <div className="aspect-video rounded border border-matte-border overflow-hidden bg-[#0A0A0A]">
                  <img src={newItem.url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                disabled={saving || !newItem.name || !newItem.url}
                className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-60 cursor-pointer"
              >
                {saving ? 'Saving...' : 'Add to Factory Gallery'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
