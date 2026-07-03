import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Upload, Trash2, Image, Video, Loader2, FolderOpen, X, Check } from 'lucide-react';

const FOLDERS = ['General', 'Products', 'Blog', 'Factory', 'Videos'];

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState('General');
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { loadMedia(); }, [folder]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`/media?folder=${encodeURIComponent(folder)}`);
      setMedia(data);
    } catch {
      // Fallback demo items
      setMedia([
        { _id: 'm1', name: 'hero-background.jpg', type: 'image/jpeg', size: 245000, url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', folder, createdAt: new Date().toISOString() },
        { _id: 'm2', name: 'factory-embroidery.jpg', type: 'image/jpeg', size: 189000, url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400', folder, createdAt: new Date().toISOString() },
        { _id: 'm3', name: 'product-hoodie.jpg', type: 'image/jpeg', size: 312000, url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400', folder, createdAt: new Date().toISOString() },
        { _id: 'm4', name: 'streetwear-collection.jpg', type: 'image/jpeg', size: 278000, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', folder, createdAt: new Date().toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      try {
        const reader = new FileReader();
        await new Promise((res) => {
          reader.onloadend = async () => {
            try {
              await apiFetch('/media', {
                method: 'POST',
                body: JSON.stringify({ name: file.name, type: file.type, size: file.size, folder, base64Data: reader.result })
              });
            } catch {/* fall through */}
            res();
          };
          reader.readAsDataURL(file);
        });
      } catch {/* continue */}
    }
    await loadMedia();
    setUploading(false);
    e.target.value = '';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media file?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/media/${id}`, { method: 'DELETE' });
      setMedia(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  const copyUrl = (item) => {
    navigator.clipboard.writeText(item.url).catch(() => {});
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Media Library</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">{media.length} files in "{folder}"</p>
        </div>
        <div className="flex items-center gap-3">
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-colors disabled:opacity-60"
          >
            {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Files</>}
          </button>
        </div>
      </div>

      {/* Folder Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {FOLDERS.map(f => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg whitespace-nowrap cursor-pointer transition-all ${folder === f ? 'bg-gold-400 text-black font-bold' : 'bg-matte-gray border border-matte-border text-matte-text hover:text-white'}`}
          >
            <FolderOpen size={12} /> {f}
          </button>
        ))}
      </div>

      {/* Upload Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-matte-border hover:border-gold-400/50 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer group transition-all"
      >
        <Upload size={24} className="text-matte-text group-hover:text-gold-400 transition-colors" />
        <div className="text-center">
          <p className="text-sm text-white font-medium">Drag & drop or click to upload</p>
          <p className="text-xs text-matte-text font-light mt-1">Supports: JPG, PNG, WebP, MP4, MOV (max 15MB per file)</p>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-matte-gray border border-matte-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 text-matte-text text-sm">
          No files in "{folder}" folder. Upload your first file.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map(item => (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className={`relative aspect-square bg-matte-gray border rounded-xl overflow-hidden cursor-pointer group transition-all ${selected?._id === item._id ? 'border-gold-400 ring-1 ring-gold-400/30' : 'border-matte-border hover:border-gold-400/30'}`}
            >
              {item.type?.startsWith('video') ? (
                <div className="w-full h-full flex items-center justify-center bg-matte-black">
                  <Video size={28} className="text-gold-400" />
                </div>
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-[9px] text-white font-mono truncate w-full">{item.name}</p>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                disabled={deleting === item._id}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white hover:bg-red-500/80 rounded-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              >
                {deleting === item._id ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected File Detail Panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-80 bg-matte-gray border-l border-matte-border shadow-2xl flex flex-col z-40">
          <div className="flex items-center justify-between px-5 py-4 border-b border-matte-border">
            <h3 className="font-display font-bold text-sm text-white">File Details</h3>
            <button onClick={() => setSelected(null)} className="text-matte-text hover:text-white cursor-pointer"><X size={16} /></button>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto no-scrollbar">
            <div className="aspect-square bg-matte-black rounded-lg overflow-hidden">
              {selected.type?.startsWith('video') ? (
                <div className="w-full h-full flex items-center justify-center"><Video size={40} className="text-gold-400" /></div>
              ) : (
                <img src={selected.url} alt={selected.name} className="w-full h-full object-contain" />
              )}
            </div>

            <div className="flex flex-col gap-3 text-xs font-mono">
              {[
                ['Filename', selected.name],
                ['Type', selected.type],
                ['Size', formatSize(selected.size)],
                ['Folder', selected.folder],
                ['Uploaded', new Date(selected.createdAt).toLocaleDateString()],
              ].map(([label, val]) => (
                <div key={label} className="bg-matte-black rounded-lg p-3">
                  <p className="text-[9px] text-matte-text uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white truncate">{val}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => copyUrl(selected)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              {copiedId === selected._id ? <><Check size={14} /> Copied!</> : 'Copy URL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
