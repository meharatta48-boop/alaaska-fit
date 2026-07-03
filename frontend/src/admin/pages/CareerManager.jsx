import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Search, Loader2, CheckCircle2, AlertCircle, RefreshCw, Trash2, Mail, Phone, Clock, FileText, Download } from 'lucide-react';

export default function CareerManager() {
  const [activeTab, setActiveTab] = useState('apps'); // apps | vacancies
  const [submissions, setSubmissions] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  // For adding vacancy
  const [newJob, setNewJob] = useState({ title: '', department: '', type: 'Full-time', location: 'Karachi Office', desc: '' });
  const [addingVacancy, setAddingVacancy] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'apps') {
        const data = await apiFetch('/careers');
        setSubmissions(data || []);
      } else {
        const config = await apiFetch('/config/careerspage');
        setVacancies(config?.vacancies || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await apiFetch(`/careers/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      setSubmissions(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
      setStatusMsg({ type: 'success', text: 'Application status updated.' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update status.' });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleDeleteApp = async (id) => {
    if (!window.confirm('Delete this application record?')) return;
    try {
      await apiFetch(`/careers/${id}`, { method: 'DELETE' });
      setSubmissions(prev => prev.filter(item => item._id !== id));
      setStatusMsg({ type: 'success', text: 'Application removed.' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete application.' });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleAddVacancy = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.department) return;
    setAddingVacancy(true);
    try {
      const config = await apiFetch('/config/careerspage');
      const currentList = config?.vacancies || [];
      const updatedList = [...currentList, newJob];
      const updatedConfig = { ...config, vacancies: updatedList };
      
      await apiFetch('/config/careerspage', {
        method: 'PUT',
        body: JSON.stringify({ value: updatedConfig })
      });

      setVacancies(updatedList);
      setNewJob({ title: '', department: '', type: 'Full-time', location: 'Karachi Office', desc: '' });
      setStatusMsg({ type: 'success', text: 'Job opening posted successfully!' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to post vacancy.' });
    } finally {
      setAddingVacancy(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const handleDeleteVacancy = async (index) => {
    if (!window.confirm('Delete this job opening?')) return;
    try {
      const config = await apiFetch('/config/careerspage');
      const currentList = config?.vacancies || [];
      const updatedList = currentList.filter((_, i) => i !== index);
      const updatedConfig = { ...config, vacancies: updatedList };

      await apiFetch('/config/careerspage', {
        method: 'PUT',
        body: JSON.stringify({ value: updatedConfig })
      });

      setVacancies(updatedList);
      setStatusMsg({ type: 'success', text: 'Job opening removed.' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to remove vacancy.' });
    } finally {
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const filteredApps = submissions.filter(app => {
    const text = search.toLowerCase();
    return app.name?.toLowerCase().includes(text) ||
           app.email?.toLowerCase().includes(text) ||
           app.position?.toLowerCase().includes(text) ||
           app.coverLetter?.toLowerCase().includes(text);
  });

  return (
    <div className="space-y-6 max-w-6xl text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl uppercase text-white">Careers & Hiring Console</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">Post factory job openings and track cv submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="p-2 border border-matte-border rounded-lg text-matte-text hover:text-white transition-colors cursor-pointer"><RefreshCw size={14} /></button>
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
        <button onClick={() => { setActiveTab('apps'); setSearch(''); }} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${activeTab === 'apps' ? 'border-gold-400 text-gold-400 font-bold' : 'border-transparent text-matte-text hover:text-white'}`}>
          CV Submissions
        </button>
        <button onClick={() => { setActiveTab('vacancies'); setSearch(''); }} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${activeTab === 'vacancies' ? 'border-gold-400 text-gold-400 font-bold' : 'border-transparent text-matte-text hover:text-white'}`}>
          Job Openings
        </button>
      </div>

      {activeTab === 'apps' ? (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-matte-text" size={14} />
            <input
              type="text"
              placeholder="Search by candidate name, email, target position..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#161616] border border-matte-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-matte-text outline-none focus:border-gold-400"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gold-400" />
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-16 text-matte-text text-xs border border-dashed border-matte-border rounded-2xl">
              No job applications received yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredApps.map(app => (
                <div key={app._id} className="bg-[#161616] border border-matte-border p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-display font-bold text-sm text-white uppercase">{app.name}</h4>
                      <span className="text-[9px] font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">{app.position}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-matte-text flex-wrap">
                      <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-white"><Mail size={12} /> {app.email}</a>
                      {app.phone && <a href={`tel:${app.phone}`} className="flex items-center gap-1 hover:text-white"><Phone size={12} /> {app.phone}</a>}
                      <span className="flex items-center gap-1"><Clock size={12} /> {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                    {app.coverLetter && (
                      <div className="bg-black/30 p-3 rounded border border-white/5 text-xs text-matte-text italic leading-relaxed">
                        "{app.coverLetter}"
                      </div>
                    )}
                    {app.resumeUrl && (
                      <div className="flex items-center gap-2">
                        <a
                          href={app.resumeUrl}
                          download={`resume_${app.name.replace(/\s+/g, '_')}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded text-[10px] font-mono hover:bg-gold-400 hover:text-black transition-colors"
                        >
                          <Download size={11} /> Download Attached CV
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={app.status || 'pending'}
                      onChange={e => handleUpdateStatus(app._id, e.target.value)}
                      className="bg-matte-black border border-matte-border rounded px-2.5 py-1.5 text-[10px] font-mono text-white outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button onClick={() => handleDeleteApp(app._id)} className="p-2 border border-matte-border hover:border-red-500 rounded text-matte-text hover:text-red-400 transition-colors cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vacancies list */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest border-b border-matte-border pb-2">Active Vacancies</h3>
            {loading ? (
              <Loader2 size={24} className="animate-spin text-gold-400 mx-auto py-10" />
            ) : vacancies.length === 0 ? (
              <div className="text-center py-10 text-xs text-matte-text border border-dashed border-matte-border rounded-xl">
                No vacancies currently published.
              </div>
            ) : (
              <div className="space-y-3">
                {vacancies.map((v, i) => (
                  <div key={i} className="bg-[#161616] border border-matte-border p-4 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-xs text-white uppercase">{v.title}</h4>
                      <p className="text-[9px] text-matte-text font-mono mt-1 uppercase">{v.department} &bull; {v.location} ({v.type})</p>
                      <p className="text-[10px] text-matte-text font-sans font-light mt-1.5 line-clamp-1">{v.desc}</p>
                    </div>
                    <button onClick={() => handleDeleteVacancy(i)} className="p-2 border border-matte-border hover:border-red-500 rounded text-matte-text hover:text-red-400 cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add vacancy form */}
          <div className="lg:col-span-5">
            <div className="bg-[#161616] border border-matte-border p-5 rounded-2xl space-y-4">
              <h3 className="text-xs font-mono text-gold-400 uppercase tracking-widest border-b border-matte-border pb-2">Post Job Vacancy</h3>
              <form onSubmit={handleAddVacancy} className="space-y-4">
                <div>
                  <label className="label-style">Job Title *</label>
                  <input type="text" value={newJob.title} onChange={e => setNewJob(p => ({ ...p, title: e.target.value }))} required className="input-style" placeholder="e.g. CAD Pattern Designer" />
                </div>
                <div>
                  <label className="label-style">Department *</label>
                  <input type="text" value={newJob.department} onChange={e => setNewJob(p => ({ ...p, department: e.target.value }))} required className="input-style" placeholder="e.g. Sourcing & Textile" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-style">Job Type</label>
                    <select value={newJob.type} onChange={e => setNewJob(p => ({ ...p, type: e.target.value }))} className="input-style bg-matte-black">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-style">Location</label>
                    <input type="text" value={newJob.location} onChange={e => setNewJob(p => ({ ...p, location: e.target.value }))} className="input-style" placeholder="Karachi Office" />
                  </div>
                </div>
                <div>
                  <label className="label-style">Role Description Summary *</label>
                  <textarea value={newJob.desc} onChange={e => setNewJob(p => ({ ...p, desc: e.target.value }))} rows={4} required className="input-style resize-none" placeholder="Describe main tasks and qualifications..." />
                </div>
                <button type="submit" disabled={addingVacancy} className="w-full py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-60 cursor-pointer">
                  {addingVacancy ? 'Publishing...' : 'Publish Job Opening'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
