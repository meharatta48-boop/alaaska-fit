import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle, CheckCircle2, Eye } from 'lucide-react';

const CATEGORIES = ['Streetwear manufacturing', 'Clothing business', 'Fabric Guides', 'Fashion trends', 'Manufacturing tutorials'];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyBlog = { title: '', slug: '', content: '', featuredImage: '', category: CATEGORIES[0], tags: '', status: 'draft', seoTitle: '', seoDescription: '' };

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/blogs');
      setBlogs(data);
    } catch { setBlogs([]); }
    finally { setLoading(false); }
  };

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const openNew = () => { setForm(emptyBlog); setEditId(null); setShowForm(true); setMsg(null); setPreview(false); };
  const openEdit = (b) => {
    setForm({ ...b, tags: b.tags?.join(', ') || '' });
    setEditId(b._id);
    setShowForm(true);
    setMsg(null);
    setPreview(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) return;
    setSaving(true);
    setMsg(null);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editId) {
        await apiFetch(`/blogs/${editId}`, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        await apiFetch('/blogs', { method: 'POST', body: JSON.stringify(payload) });
      }
      setMsg({ type: 'success', text: editId ? 'Article updated!' : 'Article published!' });
      await loadBlogs();
      setTimeout(() => { setShowForm(false); setMsg(null); }, 1000);
    } catch (e) { setMsg({ type: 'error', text: e.message }); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/blogs/${id}`, { method: 'DELETE' });
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Blog CMS</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">{blogs.length} articles in system</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-colors">
          <Plus size={14} /> New Article
        </button>
      </div>

      {/* Blog Table */}
      <div className="bg-matte-gray border border-matte-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-matte-border">
                <th className="text-left px-5 py-4 text-matte-text uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-4 text-matte-text uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-matte-border/30">
                    <td className="px-5 py-4"><div className="h-4 bg-white/10 rounded animate-pulse w-2/3" /></td>
                    <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 bg-white/10 rounded animate-pulse w-1/2" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-white/10 rounded animate-pulse w-16" /></td>
                    <td />
                  </tr>
                ))
              ) : blogs.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-matte-text">No articles yet. Write your first blog post.</td></tr>
              ) : (
                blogs.map(b => (
                  <tr key={b._id} className="border-b border-matte-border/30 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {b.featuredImage && <img src={b.featuredImage} alt={b.title} className="w-9 h-9 rounded-lg object-cover border border-matte-border shrink-0" />}
                        <div>
                          <p className="text-white font-semibold line-clamp-1">{b.title}</p>
                          <p className="text-matte-text text-[10px]">{b.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-matte-text hidden md:table-cell">{b.category}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${b.status === 'published' ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(b)} className="p-2 rounded-lg hover:bg-white/5 text-matte-text hover:text-gold-400 transition-colors cursor-pointer"><Pencil size={13} /></button>
                        <button onClick={() => handleDelete(b._id)} disabled={deleting === b._id} className="p-2 rounded-lg hover:bg-red-500/10 text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                          {deleting === b._id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
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

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-matte-gray border border-matte-border rounded-2xl shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-matte-border shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-base text-white">{editId ? 'Edit Article' : 'New Article'}</h3>
                <button onClick={() => setPreview(!preview)} className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded border cursor-pointer transition-all ${preview ? 'bg-gold-400 text-black border-gold-400' : 'border-matte-border text-matte-text hover:border-gold-400/50'}`}>
                  <Eye size={11} className="inline mr-1" /> {preview ? 'Edit Mode' : 'Preview'}
                </button>
              </div>
              <button onClick={() => setShowForm(false)} className="text-matte-text hover:text-white p-1.5 rounded cursor-pointer"><X size={18} /></button>
            </div>

            <div className="overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar">
              {preview ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  {form.featuredImage && <img src={form.featuredImage} alt={form.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                  <h1 className="font-display font-bold text-2xl text-white">{form.title || 'Article Title'}</h1>
                  <div className="text-[10px] font-mono text-gold-400 uppercase tracking-wider mb-4">{form.category} · {form.status}</div>
                  <div className="whitespace-pre-wrap text-sm text-matte-text leading-relaxed font-light">{form.content || 'Start writing your article content...'}</div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label-style">Title *</label>
                      <input value={form.title} onChange={e => { set('title', e.target.value); if (!editId) set('slug', slugify(e.target.value)); }} className="input-style" placeholder="Article title..." />
                    </div>
                    <div>
                      <label className="label-style">Slug</label>
                      <input value={form.slug} onChange={e => set('slug', e.target.value)} className="input-style font-mono" placeholder="article-slug" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="label-style">Category</label>
                      <select value={form.category} onChange={e => set('category', e.target.value)} className="input-style">
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label-style">Status</label>
                      <select value={form.status} onChange={e => set('status', e.target.value)} className="input-style">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="label-style">Tags (comma separated)</label>
                      <input value={form.tags} onChange={e => set('tags', e.target.value)} className="input-style" placeholder="GSM, Streetwear, Fabric" />
                    </div>
                  </div>

                  <div>
                    <label className="label-style">Featured Image URL</label>
                    <input value={form.featuredImage} onChange={e => set('featuredImage', e.target.value)} className="input-style" placeholder="https://..." />
                  </div>

                  <div>
                    <label className="label-style">Article Content (Markdown / HTML) *</label>
                    <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={12} className="input-style resize-y font-mono text-[11px] leading-relaxed" placeholder="Write your article content here using Markdown..." />
                  </div>

                  <div className="pt-3 border-t border-matte-border/50">
                    <p className="text-[10px] font-mono text-gold-400 uppercase tracking-wider mb-3">SEO Metadata</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label-style">SEO Title</label>
                        <input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)} className="input-style" placeholder="Custom SEO title..." />
                      </div>
                      <div>
                        <label className="label-style">Meta Description</label>
                        <input value={form.seoDescription} onChange={e => set('seoDescription', e.target.value)} className="input-style" placeholder="160 character description..." />
                      </div>
                    </div>
                  </div>

                  {msg && (
                    <div className={`flex items-center gap-2 text-xs font-mono rounded-lg px-3 py-2.5 ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {msg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {msg.text}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-matte-border shrink-0">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-matte-border text-xs font-mono uppercase tracking-wider rounded-lg text-white hover:border-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-60 cursor-pointer flex items-center gap-2">
                {saving ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : (editId ? 'Update Article' : 'Publish Article')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
