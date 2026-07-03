import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Search, Loader2, CheckCircle2, AlertCircle, RefreshCw, Trash2, Mail, Phone, Clock, FileSpreadsheet } from 'lucide-react';

export default function LeadManager() {
  const [activeTab, setActiveTab] = useState('quotes'); // quotes | messages | newsletters
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    loadLeads();
  }, [activeTab]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'quotes' ? '/quotes' : activeTab === 'messages' ? '/contacts' : '/newsletters';
      const data = await apiFetch(endpoint);
      setItems(data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const endpoint = activeTab === 'quotes' ? `/quotes/${id}` : `/contacts/${id}`;
      await apiFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      setItems(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      setStatusMsg({ type: 'success', text: 'Status updated successfully.' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update status.' });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const endpoint = activeTab === 'quotes' ? `/quotes/${id}` : activeTab === 'messages' ? `/contacts/${id}` : `/newsletters/${id}`;
      await apiFetch(endpoint, { method: 'DELETE' });
      setItems(prev => prev.filter(item => item._id !== id));
      setStatusMsg({ type: 'success', text: 'Lead deleted successfully.' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete record.' });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const filteredItems = items.filter(item => {
    const text = search.toLowerCase();
    if (activeTab === 'quotes') {
      return item.clientName?.toLowerCase().includes(text) ||
             item.clientEmail?.toLowerCase().includes(text) ||
             item.productType?.toLowerCase().includes(text);
    } else if (activeTab === 'messages') {
      return item.name?.toLowerCase().includes(text) ||
             item.email?.toLowerCase().includes(text) ||
             item.subject?.toLowerCase().includes(text) ||
             item.message?.toLowerCase().includes(text);
    } else {
      return item.email?.toLowerCase().includes(text);
    }
  });

  return (
    <div className="space-y-6 max-w-6xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl uppercase text-white">Leads & Inquiries Manager</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">Track B2B clothing inquiries, quotes, and subscriber emails</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadLeads} className="p-2 border border-matte-border rounded-lg text-matte-text hover:text-white transition-colors cursor-pointer"><RefreshCw size={14} /></button>
        </div>
      </div>

      {statusMsg && (
        <div className={`flex items-center gap-2 text-xs font-mono rounded-lg px-4 py-3 ${statusMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
          {statusMsg.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-matte-border gap-2">
        <button onClick={() => { setActiveTab('quotes'); setSearch(''); }} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${activeTab === 'quotes' ? 'border-gold-400 text-gold-400 font-bold' : 'border-transparent text-matte-text hover:text-white'}`}>
          Quotes
        </button>
        <button onClick={() => { setActiveTab('messages'); setSearch(''); }} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${activeTab === 'messages' ? 'border-gold-400 text-gold-400 font-bold' : 'border-transparent text-matte-text hover:text-white'}`}>
          Contact Messages
        </button>
        <button onClick={() => { setActiveTab('newsletters'); setSearch(''); }} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${activeTab === 'newsletters' ? 'border-gold-400 text-gold-400 font-bold' : 'border-transparent text-matte-text hover:text-white'}`}>
          Newsletter Subs
        </button>
      </div>

      {/* Search toolbar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-matte-text" size={14} />
        <input
          type="text"
          placeholder="Filter by name, email or criteria..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#161616] border border-matte-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-matte-text outline-none focus:border-gold-400"
        />
      </div>

      {/* List Container */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-gold-400" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 text-matte-text text-xs border border-dashed border-matte-border rounded-2xl">
          No matching leads or entries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {activeTab === 'quotes' && filteredItems.map(q => (
            <div key={q._id} className="bg-[#161616] border border-matte-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display font-bold text-sm text-white uppercase">{q.clientName}</h4>
                  <span className="text-[9px] font-mono bg-[#1E3A8A] text-white px-2 py-0.5 rounded border border-[#C7D9F5]/20">{q.productType}</span>
                  <span className="text-[9px] font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">{q.quantity} Pcs</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-matte-text flex-wrap">
                  <a href={`mailto:${q.clientEmail}`} className="flex items-center gap-1 hover:text-white"><Mail size={12} /> {q.clientEmail}</a>
                  {q.clientPhone && <a href={`tel:${q.clientPhone}`} className="flex items-center gap-1 hover:text-white"><Phone size={12} /> {q.clientPhone}</a>}
                  <span className="flex items-center gap-1"><Clock size={12} /> {new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="bg-black/35 p-3 rounded-lg border border-white/5 text-xs text-matte-text leading-relaxed">
                  <p className="font-mono text-[9px] text-gold-400/80 mb-1">SPECIFICATIONS:</p>
                  <p>Fabric: {q.fabric || 'N/A'} &bull; GSM: {q.gsm || 'N/A'} &bull; Printing: {q.printing || 'N/A'} &bull; Embroidery: {q.embroidery || 'N/A'} &bull; Packaging: {q.packaging || 'N/A'}</p>
                  {q.message && <p className="mt-2 border-t border-white/5 pt-2 text-white italic">"{q.message}"</p>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={q.status || 'pending'}
                  onChange={e => handleUpdateStatus(q._id, e.target.value)}
                  className="bg-matte-black border border-matte-border rounded px-2.5 py-1.5 text-[10px] font-mono text-white outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => handleDelete(q._id)} className="p-2 border border-matte-border hover:border-red-500 rounded text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'messages' && filteredItems.map(m => (
            <div key={m._id} className="bg-[#161616] border border-matte-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display font-bold text-sm text-white uppercase">{m.name}</h4>
                  <span className="text-[9px] font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20 uppercase">{m.subject}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-matte-text">
                  <a href={`mailto:${m.email}`} className="flex items-center gap-1 hover:text-white"><Mail size={12} /> {m.email}</a>
                  <span className="flex items-center gap-1"><Clock size={12} /> {new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-white leading-relaxed bg-black/35 p-3 rounded-lg border border-white/5 italic">
                  "{m.message}"
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={m.status || 'pending'}
                  onChange={e => handleUpdateStatus(m._id, e.target.value)}
                  className="bg-matte-black border border-matte-border rounded px-2.5 py-1.5 text-[10px] font-mono text-white outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => handleDelete(m._id)} className="p-2 border border-matte-border hover:border-red-500 rounded text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {activeTab === 'newsletters' && (
            <div className="bg-[#161616] border border-matte-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-matte-black text-gold-400/90 uppercase text-[10px] tracking-wider border-b border-matte-border">
                  <tr>
                    <th className="p-4">Email Subscriber</th>
                    <th className="p-4">Subscribed Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-matte-border/50">
                  {filteredItems.map(sub => (
                    <tr key={sub._id} className="hover:bg-white/2 transition-colors">
                      <td className="p-4 font-semibold text-white">{sub.email}</td>
                      <td className="p-4 text-matte-text">{new Date(sub.createdAt).toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(sub._id)} className="p-1.5 border border-matte-border hover:border-red-500 rounded text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
