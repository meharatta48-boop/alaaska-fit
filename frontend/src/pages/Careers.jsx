import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Briefcase, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function Careers() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', coverLetter: '', resumeUrl: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [msg, setMsg] = useState('');

  useEffect(() => {
    apiFetch('/config/careerspage')
      .then(data => {
        if (data) setConfig(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  const handleApply = (posName) => {
    setForm(p => ({ ...p, position: posName }));
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(p => ({ ...p, resumeUrl: reader.result })); // stores as base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) return;
    setStatus('submitting');
    setMsg('');
    try {
      await apiFetch('/careers', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', position: '', coverLetter: '', resumeUrl: '' });
    } catch (err) {
      setMsg(err.message || 'Error submitting application. Please try again.');
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-gold-400" />
      </div>
    );
  }

  const activeContent = config || {};

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              Join Our Factory
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Careers & Openings
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              Build your future in textile engineering, apparel CAD pattern design, and global logistics.
            </p>
          </motion.div>
        </section>

        {/* Vacancies List */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 mb-20 space-y-6">
          <h2 className="font-display font-bold text-xl text-[#0F1E45] dark:text-white uppercase mb-4 border-b border-[#C7D9F5]/30 pb-2">
            Active Job Opportunities
          </h2>
          
          {activeContent.vacancies && activeContent.vacancies.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display font-bold text-base text-[#0F1E45] dark:text-white uppercase">{job.title}</h3>
                  <span className="text-[9px] font-mono text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded border border-gold-400/20">{job.type}</span>
                </div>
                <p className="text-[10px] text-matte-text font-mono uppercase">{job.department} &bull; {job.location}</p>
                <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] font-light leading-relaxed">{job.desc}</p>
              </div>
              <button
                onClick={() => handleApply(job.title)}
                className="px-5 py-2.5 bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </section>

        {/* Application Form */}
        <section id="application-form" className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-[#C7D9F5]/40 dark:border-[#262626]">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle2 size={48} className="text-gold-400 animate-bounce" />
                <h3 className="font-display font-bold text-xl text-[#0F1E45] dark:text-white">Application Received!</h3>
                <p className="text-xs text-matte-text max-w-xs leading-relaxed">Our HR team will inspect your qualifications and contact you within 5 working days.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 px-6 py-2.5 bg-gold-400 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors">
                  Apply for Another Position
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F1E45] dark:text-white uppercase mb-1">Submit Application</h3>
                  <p className="text-[10px] text-matte-text font-mono">Direct submissions to Al Aaska Fit HR Department</p>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{msg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-style">Full Name *</label>
                    <input
                      type="text" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      required className="input-style" placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="label-style">Email Address *</label>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      required className="input-style" placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="label-style">Phone / WhatsApp</label>
                    <input
                      type="text" value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="input-style" placeholder="+92 300 1234567"
                    />
                  </div>
                  <div>
                    <label className="label-style">Target Position *</label>
                    <input
                      type="text" value={form.position}
                      onChange={e => setForm(p => ({ ...p, position: e.target.value }))}
                      required className="input-style" placeholder="Select or type position"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-style">Resume / CV Document *</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full bg-white dark:bg-[#0A0A0A] border border-[#C7D9F5] dark:border-[#262626] rounded-lg px-4 py-3 text-xs text-[#0F1E45] dark:text-white"
                  />
                  <p className="text-[9px] text-matte-text mt-1">PDF or Word doc formats. Max size 5MB.</p>
                </div>

                <div>
                  <label className="label-style">Cover Letter / Cover Message</label>
                  <textarea
                    value={form.coverLetter}
                    onChange={e => setForm(p => ({ ...p, coverLetter: e.target.value }))}
                    rows={4} className="input-style resize-none"
                    placeholder="Describe your relevant textile / sales experience and why you wish to join Al Aaska Fit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gold-400 hover:bg-gold-500 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {status === 'submitting' ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : <><Briefcase size={14} /> Submit Application</>}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
