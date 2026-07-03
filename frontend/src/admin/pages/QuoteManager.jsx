import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Eye, Trash2, CheckCircle, Clock, Loader2, ChevronDown } from 'lucide-react';

const STATUS_COLORS = {
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  reviewed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  contacted: 'text-green-400 bg-green-400/10 border-green-400/20',
  closed: 'text-matte-text bg-matte-border/20 border-matte-border',
};

export default function QuoteManager() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => { loadQuotes(); }, []);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/quotes');
      setQuotes(data);
    } catch {
      setQuotes([
        { _id: '1', clientName: 'Ahmed Raza', clientEmail: 'ahmed@brand.com', clientPhone: '+1234567890', productType: 'Oversized T-Shirt', quantity: 500, fabric: '100% Carded Cotton', gsm: '240 GSM', colors: ['Black', 'White'], sizes: ['M', 'L', 'XL'], printing: 'Screen Print', packaging: 'Individual Polybag', message: 'Need samples first', status: 'pending', createdAt: new Date().toISOString() },
        { _id: '2', clientName: 'Sarah Johnson', clientEmail: 'sarah@fashion.com', clientPhone: '+9876543210', productType: 'Heavyweight Hoodie', quantity: 300, fabric: 'French Terry', gsm: '420 GSM', colors: ['Navy', 'Stone Gray'], sizes: ['S', 'M', 'L', 'XL'], printing: 'Discharge Print', packaging: 'Branded Polybag', message: '', status: 'reviewed', createdAt: new Date(Date.now() - 86400000).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await apiFetch(`/quotes/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
      setQuotes(prev => prev.map(q => q._id === id ? { ...q, status } : q));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch (e) { alert(e.message); }
    finally { setUpdating(null); }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/quotes/${id}`, { method: 'DELETE' });
      setQuotes(prev => prev.filter(q => q._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  const statusOptions = ['pending', 'reviewed', 'contacted', 'closed'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-xl text-white">Quote Inquiries</h2>
        <p className="text-xs text-matte-text font-light mt-0.5">{quotes.length} total factory inquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quote List */}
        <div className="lg:col-span-3 bg-matte-gray border border-matte-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-matte-border">
                  <th className="text-left px-5 py-4 text-matte-text uppercase tracking-wider font-medium">Client</th>
                  <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium hidden md:table-cell">Product</th>
                  <th className="text-left px-4 py-4 text-matte-text uppercase tracking-wider font-medium">Status</th>
                  <th className="text-right px-5 py-4 text-matte-text uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <tr key={i} className="border-b border-matte-border/30">
                      <td className="px-5 py-4"><div className="h-4 bg-white/10 rounded animate-pulse" /></td>
                      <td className="px-4 py-4 hidden md:table-cell"><div className="h-4 bg-white/10 rounded animate-pulse" /></td>
                      <td className="px-4 py-4"><div className="h-4 bg-white/10 rounded w-20 animate-pulse" /></td>
                      <td className="px-5 py-4" />
                    </tr>
                  ))
                ) : quotes.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-10 text-matte-text">No quote inquiries yet.</td></tr>
                ) : (
                  quotes.map(q => (
                    <tr key={q._id} onClick={() => setSelected(q)} className={`border-b border-matte-border/30 hover:bg-white/2 cursor-pointer transition-colors ${selected?._id === q._id ? 'bg-gold-400/5' : ''}`}>
                      <td className="px-5 py-4">
                        <p className="text-white font-semibold">{q.clientName}</p>
                        <p className="text-matte-text text-[10px]">{q.clientEmail}</p>
                      </td>
                      <td className="px-4 py-4 text-matte-text hidden md:table-cell">
                        <p>{q.productType}</p>
                        <p className="text-[10px]">{q.quantity?.toLocaleString()} pcs</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${STATUS_COLORS[q.status]}`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={(e) => { e.stopPropagation(); deleteQuote(q._id); }} disabled={deleting === q._id} className="p-2 rounded-lg hover:bg-red-500/10 text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                            {deleting === q._id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
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

        {/* Quote Detail Panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-matte-gray border border-matte-border rounded-xl p-6 flex flex-col gap-5 sticky top-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">{selected.clientName}</h3>
                  <p className="text-[10px] text-matte-text font-mono">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                {[
                  ['Email', selected.clientEmail],
                  ['Phone', selected.clientPhone || '—'],
                  ['Product', selected.productType],
                  ['Quantity', `${selected.quantity?.toLocaleString()} pcs`],
                  ['Fabric', selected.fabric || '—'],
                  ['GSM', selected.gsm || '—'],
                  ['Printing', selected.printing || '—'],
                  ['Packaging', selected.packaging || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-matte-black rounded-lg p-3 col-span-1">
                    <p className="text-matte-text text-[9px] uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-white truncate">{value}</p>
                  </div>
                ))}
              </div>

              {selected.colors?.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono text-matte-text uppercase tracking-wider mb-2">Colors</p>
                  <p className="text-xs text-white">{selected.colors.join(', ')}</p>
                </div>
              )}

              {selected.message && (
                <div className="bg-matte-black rounded-lg p-3">
                  <p className="text-[10px] font-mono text-matte-text uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-xs text-white leading-relaxed">{selected.message}</p>
                </div>
              )}

              {/* Status Updater */}
              <div>
                <p className="text-[10px] font-mono text-matte-text uppercase tracking-wider mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected._id, s)}
                      disabled={updating === selected._id || selected.status === s}
                      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg border cursor-pointer transition-all disabled:cursor-default ${selected.status === s ? 'bg-gold-400 text-black border-gold-400' : 'border-matte-border text-matte-text hover:border-gold-400/50 hover:text-white'}`}
                    >
                      {updating === selected._id ? <Loader2 size={10} className="animate-spin inline" /> : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-matte-gray border border-matte-border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 h-48">
              <Eye size={24} className="text-matte-text" />
              <p className="text-xs text-matte-text font-light">Click a row to view inquiry details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
