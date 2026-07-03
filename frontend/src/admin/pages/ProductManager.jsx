import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle, CheckCircle2, Upload } from 'lucide-react';

const CATEGORIES = ['Oversized T-Shirts', 'Hoodies', 'Tracksuits', 'Streetwear', 'Gym Wear', 'Sportswear', 'Polo Shirts', 'Jackets', 'Kids Wear'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const emptyForm = {
  title: '', slug: '', description: '', category: 'Oversized T-Shirts',
  moq: 100, fabric: '100% Organic Carded Cotton', gsm: '240 GSM',
  printing: 'Screen Print', embroidery: 'Flat Embroidery', techPackUrl: '',
  images: [''], videoUrl: '', colors: ['#0a0a0a'], sizes: ['M', 'L', 'XL'], isFeatured: false,
  status: 'active', priceVisibility: 'hidden', variants: []
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/products');
      setProducts(data);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowForm(true); setMsg(null); };
  const openEdit = (p) => {
    setForm({
      ...p,
      images: p.images?.length ? p.images : [''],
      colors: p.colors?.length ? p.colors : ['#0a0a0a'],
      sizes: p.sizes?.length ? p.sizes : ['M', 'L', 'XL'],
      status: p.status || 'active',
      priceVisibility: p.priceVisibility || 'hidden',
      variants: p.variants || []
    });
    setEditId(p._id);
    setShowForm(true);
    setMsg(null);
  };

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const toggleSize = (s) => set('sizes', form.sizes.includes(s) ? form.sizes.filter(x => x !== s) : [...form.sizes, s]);

  const handleAddVariant = () => {
    set('variants', [...(form.variants || []), { name: '', fabric: '', gsm: '', color: '', size: 'M', moq: 100 }]);
  };

  const handleRemoveVariant = (index) => {
    set('variants', form.variants.filter((_, i) => i !== index));
  };

  const handleUpdateVariant = (index, field, value) => {
    const list = [...form.variants];
    list[index] = { ...list[index], [field]: field === 'moq' ? parseInt(value) || 0 : value };
    set('variants', list);
  };

  const handleSave = async () => {
    if (!form.title || !form.category) return;
    setSaving(true);
    setMsg(null);
    try {
      const payload = {
        ...form,
        moq: parseInt(form.moq),
        images: form.images.filter(Boolean),
        slug: form.slug || slugify(form.title),
        variants: (form.variants || []).map(v => ({ ...v, moq: parseInt(v.moq) || 100 }))
      };
      if (editId) {
        await apiFetch(`/products/${editId}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiFetch('/products', { method: 'POST', body: JSON.stringify(payload) });
      }
      setMsg({ type: 'success', text: editId ? 'Product updated!' : 'Product created!' });
      await loadProducts();
      setTimeout(() => { setShowForm(false); setMsg(null); }, 1200);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white uppercase">Product Management</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">{products.length} products in catalog</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-colors">
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-matte-gray border border-matte-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-matte-border">
                <th className="text-left px-5 py-4 text-matte-text uppercase tracking-wider font-medium">Product</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium hidden lg:table-cell">Pricing</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium">Featured</th>
                <th className="text-right px-5 py-4 text-matte-text uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-matte-border/50">
                    <td className="px-5 py-4"><div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" /></td>
                    <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" /></td>
                    <td className="px-4 py-4 hidden lg:table-cell"><div className="h-4 bg-white/10 rounded w-1/3 animate-pulse" /></td>
                    <td className="px-4 py-4 hidden lg:table-cell"><div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-white/10 rounded w-8 animate-pulse" /></td>
                    <td className="px-5 py-4" />
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-matte-text">No products found. Add your first product.</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p._id} className="border-b border-matte-border/30 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-9 h-9 rounded-lg object-cover border border-matte-border shrink-0" />}
                        <div>
                          <p className="text-white font-semibold">{p.title}</p>
                          <p className="text-matte-text text-[10px]">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-matte-text hidden md:table-cell">{p.category}</td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono ${p.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : p.status === 'draft' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {p.status || 'active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-matte-text hidden lg:table-cell uppercase text-[10px] font-mono">{p.priceVisibility || 'hidden'}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${p.isFeatured ? 'bg-gold-400 text-black' : 'bg-matte-border text-matte-text'}`}>
                        {p.isFeatured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-white/5 text-matte-text hover:text-gold-400 transition-colors cursor-pointer"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id} className="p-2 rounded-lg hover:bg-red-500/10 text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                          {deleting === p._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-matte-gray border border-matte-border rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-matte-border shrink-0">
              <h3 className="font-display font-bold text-base text-white">{editId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowForm(false)} className="text-matte-text hover:text-white p-1.5 rounded cursor-pointer"><X size={18} /></button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label-style">Product Title *</label>
                  <input value={form.title} onChange={e => { set('title', e.target.value); if (!editId) set('slug', slugify(e.target.value)); }}
                    className="input-style text-white" placeholder="Heavyweight Oversized T-Shirt" />
                </div>
                <div>
                  <label className="label-style">Slug *</label>
                  <input value={form.slug} onChange={e => set('slug', e.target.value)} className="input-style text-white" placeholder="heavyweight-oversized-tshirt" />
                </div>
              </div>

              <div>
                <label className="label-style">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} className="input-style resize-none text-white" placeholder="Product description..." />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="label-style">Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)} className="input-style bg-matte-black text-white">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-style">MOQ (pcs)</label>
                  <input type="number" value={form.moq} onChange={e => set('moq', parseInt(e.target.value) || 0)} className="input-style text-white" min={1} />
                </div>
                <div>
                  <label className="label-style">GSM Weight</label>
                  <input value={form.gsm} onChange={e => set('gsm', e.target.value)} className="input-style text-white" placeholder="240 GSM" />
                </div>
                <div>
                  <label className="label-style">Fabric</label>
                  <input value={form.fabric} onChange={e => set('fabric', e.target.value)} className="input-style text-white" placeholder="100% Cotton" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <label className="label-style">Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)} className="input-style bg-matte-black text-white">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="label-style">Price Visibility</label>
                  <select value={form.priceVisibility} onChange={e => set('priceVisibility', e.target.value)} className="input-style bg-matte-black text-white">
                    <option value="hidden">Hidden</option>
                    <option value="public">Public</option>
                    <option value="registered_only">Registered Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-style">Printing Options</label>
                  <input value={form.printing} onChange={e => set('printing', e.target.value)} className="input-style text-white" placeholder="Screen Print / DTG" />
                </div>
                <div>
                  <label className="label-style">Embroidery Options</label>
                  <input value={form.embroidery} onChange={e => set('embroidery', e.target.value)} className="input-style text-white" placeholder="Flat Embroidery" />
                </div>
              </div>

              <div>
                <label className="label-style">Product Image URLs (one per line)</label>
                <textarea
                  value={form.images.join('\n')}
                  onChange={e => set('images', e.target.value.split('\n'))}
                  rows={3} className="input-style resize-none font-mono text-[11px] text-white"
                  placeholder="https://example.com/image1.jpg"
                />
                <div className="mt-2 flex items-center gap-3">
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-matte-black border border-matte-border/50 hover:border-gold-400 text-matte-text hover:text-white rounded text-[10px] font-mono cursor-pointer transition-colors">
                    <Upload size={12} /> Upload Product Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async e => {
                        const files = Array.from(e.target.files);
                        if (!files.length) return;
                        const uploadedBase64 = [];
                        for (const file of files) {
                          const base64 = await new Promise(res => {
                            const r = new FileReader();
                            r.onload = () => res(r.result);
                            r.readAsDataURL(file);
                          });
                          uploadedBase64.push(base64);
                        }
                        set('images', [...form.images.filter(Boolean), ...uploadedBase64]);
                      }}
                    />
                  </label>
                  <p className="text-[9px] text-matte-text font-mono">Select multiple images to upload directly as Base64.</p>
                </div>
              </div>

              <div>
                <label className="label-style">Video URL (optional)</label>
                <input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} className="input-style text-white" placeholder="https://..." />
              </div>

              <div>
                <label className="label-style mb-2 block">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button key={s} type="button" onClick={() => toggleSize(s)}
                      className={`px-3 py-1.5 text-xs rounded border font-mono cursor-pointer transition-all ${form.sizes.includes(s) ? 'bg-gold-400 text-black border-gold-400' : 'bg-matte-black border-matte-border text-white hover:border-gold-400/50'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Variants Segment */}
              <div className="border-t border-matte-border/50 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="label-style mb-0">Apparel Variants</label>
                  <button type="button" onClick={handleAddVariant} className="flex items-center gap-1 text-[10px] font-mono text-gold-400 border border-gold-400/20 px-2 py-1 rounded hover:bg-gold-400 hover:text-black cursor-pointer">
                    <Plus size={10} /> Add Variant
                  </button>
                </div>
                <div className="space-y-3">
                  {form.variants?.map((v, i) => (
                    <div key={i} className="bg-matte-black p-3 rounded-lg border border-white/5 space-y-2 relative">
                      <button type="button" onClick={() => handleRemoveVariant(i)} className="absolute top-2 right-2 text-matte-text hover:text-red-400">
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">Variant Name</label>
                          <input value={v.name} onChange={e => handleUpdateVariant(i, 'name', e.target.value)} className="input-style text-[10px] py-1.5" placeholder="e.g. Heavy Terry Black" />
                        </div>
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">Fabric</label>
                          <input value={v.fabric} onChange={e => handleUpdateVariant(i, 'fabric', e.target.value)} className="input-style text-[10px] py-1.5" placeholder="e.g. French Terry" />
                        </div>
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">GSM</label>
                          <input value={v.gsm} onChange={e => handleUpdateVariant(i, 'gsm', e.target.value)} className="input-style text-[10px] py-1.5" placeholder="e.g. 420 GSM" />
                        </div>
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">Color (Hex/Name)</label>
                          <input value={v.color} onChange={e => handleUpdateVariant(i, 'color', e.target.value)} className="input-style text-[10px] py-1.5" placeholder="e.g. #000000" />
                        </div>
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">Size</label>
                          <select value={v.size} onChange={e => handleUpdateVariant(i, 'size', e.target.value)} className="input-style bg-matte-black text-[10px] py-1.5">
                            {SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-matte-text font-mono">MOQ</label>
                          <input type="number" value={v.moq} onChange={e => handleUpdateVariant(i, 'moq', e.target.value)} className="input-style text-[10px] py-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="accent-gold-400 w-4 h-4 cursor-pointer" />
                <label htmlFor="featured" className="text-xs font-mono text-matte-text cursor-pointer">Mark as Featured Product</label>
              </div>

              {msg && (
                <div className={`flex items-center gap-2 text-xs font-mono rounded-lg px-3 py-2.5 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {msg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  {msg.text}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-matte-border shrink-0">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-matte-border text-xs font-mono uppercase tracking-wider rounded-lg text-white hover:border-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-2">
                {saving ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : (editId ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
