import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import {
  Loader2, Eye, EyeOff, AlertCircle, CheckCircle2,
  Mail, Lock, User, ArrowRight, Sparkles, Building2
} from 'lucide-react';

// ─── Animated background orbs ────────────────────────────────────────────────
function BgOrbs() {
  return (
    <>
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-[#D4AF37]/8 to-[#1E3A8A]/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#1E3A8A]/10 to-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#D4AF37]/3 rounded-full blur-2xl pointer-events-none animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
    </>
  );
}

// ─── Input field component ────────────────────────────────────────────────────
function InputField({ icon: Icon, label, type = 'text', value, onChange, placeholder, autoComplete, suffix }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6B7280]">{label}</label>
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] group-focus-within:text-[#D4AF37] transition-colors">
          <Icon size={15} />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="w-full bg-[#0F0F0F] border border-[#2A2A2A] focus:border-[#D4AF37]/60 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder:text-[#3A3A3A] outline-none transition-all duration-200 focus:bg-[#111] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]"
        />
        {suffix}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminLogin() {
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', confirm: '' });

  useEffect(() => {
    if (user) {
      const adminRoles = ['admin', 'super-admin', 'editor', 'content-manager'];
      if (adminRoles.includes(user.role) || user.permissions?.includes('all')) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user]);

  // Restore remembered email
  useEffect(() => {
    const saved = localStorage.getItem('admin_remember_email');
    if (saved) setLoginForm(p => ({ ...p, email: saved }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    setSubmitting(true);
    setError('');
    try {
      const data = await login(loginForm.email, loginForm.password);
      if (rememberMe) localStorage.setItem('admin_remember_email', loginForm.email);
      else localStorage.removeItem('admin_remember_email');
      const adminRoles = ['admin', 'super-admin', 'editor', 'content-manager'];
      if (adminRoles.includes(data.role) || data.permissions?.includes('all')) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (regForm.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await register(regForm.name, regForm.email, regForm.password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const PwToggle = (
    <button
      type="button"
      onClick={() => setShowPw(p => !p)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-white transition-colors cursor-pointer"
    >
      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#080808] flex overflow-hidden">
      {/* ── Left panel: Decorative brand side ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#0D0D1A] to-[#0A0A0A]">
        <BgOrbs />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative flex flex-col h-full px-16 py-14 justify-between">
          {/* Top Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8c7a2a] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
              <Building2 size={20} className="text-black" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-[0.15em] text-white uppercase">Al Aaska Fit</p>
              <p className="text-[8px] font-mono tracking-[0.3em] text-[#6B7280] uppercase">Enterprise Admin Portal</p>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-6">
                <Sparkles size={11} className="text-[#D4AF37]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">Enterprise Platform</span>
              </div>
              <h1 className="font-bold text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight">
                Manage Your<br />
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#f0d060] to-[#8c7a2a] bg-clip-text text-transparent">
                  Clothing Empire
                </span>
              </h1>
              <p className="mt-4 text-sm text-[#6B7280] leading-relaxed max-w-sm">
                The complete backend command center for Al Aaska Fit's manufacturing operations — from quotes to shipments.
              </p>
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Real-time analytics & lead tracking' },
                { label: 'Product catalog & media management' },
                { label: 'Dynamic homepage & content builder' },
                { label: 'Role-based access control system' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={10} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-xs text-[#9CA3AF]">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-[10px] font-mono text-[#3A3A3A]">
            © {new Date().getFullYear()} Al Aaska Fit. Authorized access only.
          </p>
        </div>
      </div>

      {/* ── Right panel: Form ──────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center px-6 py-12 relative bg-[#0A0A0A]">
        <BgOrbs />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8c7a2a] flex items-center justify-center mx-auto mb-3 shadow-[0_4px_20px_rgba(212,175,55,0.25)]">
              <Building2 size={22} className="text-black" />
            </div>
            <p className="font-bold text-sm tracking-widest text-white uppercase">Al Aaska Fit</p>
            <p className="text-[9px] font-mono tracking-[0.25em] text-[#6B7280] uppercase mt-0.5">Enterprise Admin Portal</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#111] border border-[#1E1E1E] rounded-xl p-1 mb-8">
            {['login', 'register'].map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  tab === t
                    ? 'bg-[#D4AF37] text-black font-bold shadow-[0_2px_12px_rgba(212,175,55,0.25)]'
                    : 'text-[#6B7280] hover:text-white'
                }`}
              >
                {t === 'login' ? '🔐 Sign In' : '✨ Create Account'}
              </button>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

            {/* Login Form */}
            {tab === 'login' && (
              <>
                <div className="mb-6">
                  <h2 className="font-bold text-xl text-white tracking-tight">Welcome back</h2>
                  <p className="text-xs text-[#4B5563] mt-1">Sign in to your admin dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={loginForm.email}
                    onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="admin@alaaskafit.com"
                    autoComplete="email"
                  />

                  <InputField
                    icon={Lock}
                    label="Password"
                    type={showPw ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    suffix={PwToggle}
                  />

                  {/* Remember Me + Forgot */}
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div
                        onClick={() => setRememberMe(p => !p)}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${rememberMe ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-[#2A2A2A] bg-transparent'}`}
                      >
                        {rememberMe && <CheckCircle2 size={10} className="text-black" />}
                      </div>
                      <span className="text-[#6B7280] group-hover:text-white transition-colors font-mono">Remember me</span>
                    </label>
                    <button type="button" className="text-[#D4AF37]/70 hover:text-[#D4AF37] font-mono transition-colors cursor-pointer text-[10px] uppercase tracking-wider">
                      Forgot password?
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-500/8 border border-red-500/20 rounded-xl px-3.5 py-2.5 animate-[fadeIn_0.2s_ease]">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 group flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.35)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting
                      ? <><Loader2 size={16} className="animate-spin" /> Authenticating...</>
                      : <><span>Sign In to Dashboard</span><ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" /></>
                    }
                  </button>
                </form>

              </>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <>
                <div className="mb-6">
                  <h2 className="font-bold text-xl text-white tracking-tight">Create an account</h2>
                  <p className="text-xs text-[#4B5563] mt-1">New accounts default to <span className="text-[#D4AF37]">client</span> role — admin approval required for elevated access.</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <InputField
                    icon={User}
                    label="Full Name"
                    value={regForm.name}
                    onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    value={regForm.email}
                    onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <InputField
                    icon={Lock}
                    label="Password"
                    type={showPw ? 'text' : 'password'}
                    value={regForm.password}
                    onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Min 8 characters"
                    autoComplete="new-password"
                    suffix={PwToggle}
                  />
                  <InputField
                    icon={Lock}
                    label="Confirm Password"
                    type={showPw ? 'text' : 'password'}
                    value={regForm.confirm}
                    onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />

                  {/* Password strength */}
                  {regForm.password && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(level => {
                        const strength = Math.min(4, [
                          regForm.password.length >= 8,
                          /[A-Z]/.test(regForm.password),
                          /[0-9]/.test(regForm.password),
                          /[^A-Za-z0-9]/.test(regForm.password),
                        ].filter(Boolean).length);
                        const active = level <= strength;
                        const color = strength <= 1 ? '#ef4444' : strength === 2 ? '#f59e0b' : strength === 3 ? '#3b82f6' : '#10b981';
                        return <div key={level} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ backgroundColor: active ? color : '#1E1E1E' }} />;
                      })}
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs font-mono bg-red-500/8 border border-red-500/20 rounded-xl px-3.5 py-2.5">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center gap-2 text-green-400 text-xs font-mono bg-green-500/8 border border-green-500/20 rounded-xl px-3.5 py-2.5">
                      <CheckCircle2 size={13} className="shrink-0" />
                      <span>{success}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 group flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] hover:bg-[#c49e28] text-black text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 cursor-pointer"
                  >
                    {submitting
                      ? <><Loader2 size={16} className="animate-spin" /> Creating Account...</>
                      : <><span>Create Account</span><ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" /></>
                    }
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-[10px] font-mono text-[#3A3A3A] hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
              ← Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
