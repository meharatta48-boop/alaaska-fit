import React, { useEffect, useState } from 'react';
import { useConfig } from '../context/ConfigContext.jsx';
import { Wrench, Clock, Mail, Phone, ArrowRight, RefreshCw } from 'lucide-react';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.mins },
        { label: 'Secs', value: timeLeft.secs },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
              {pad(value)}
            </span>
          </div>
          <span className="mt-2 text-[9px] font-mono uppercase tracking-[0.25em] text-white/50">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MaintenancePage() {
  const { config } = useConfig();
  const settings = config?.settings || {};
  const maintenance = settings.maintenanceMode || {};
  const logoUrl = settings.siteLogo || '';
  const siteName = settings.siteName || 'Al Aaska Fit';
  const tagline = settings.siteTagline || 'Textile Factory';
  const message = maintenance.message || 'We are performing scheduled maintenance. We\'ll be back shortly!';
  const email = settings.contactEmail || '';
  const phone = settings.contactPhone || '';
  const primaryColor = settings.colorTheme?.accentPrimary || '#1E3A8A';
  const goldColor = settings.colorTheme?.accentSecondary || '#D4AF37';
  const showCountdown = maintenance.showCountdown && maintenance.countdownDate;
  const bgImage = maintenance.backgroundImage || '';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background: bgImage
          ? `url('${bgImage}') center/cover no-repeat`
          : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 60%, ${primaryColor}99 100%)`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ background: goldColor }} />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
        style={{ background: goldColor, animationDelay: '1s' }} />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} className="h-14 object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl"
                style={{ background: goldColor }}
              >
                {siteName.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-white font-display font-extrabold tracking-widest text-lg uppercase mt-1">
                {siteName}
              </span>
              <span className="text-white/50 text-[9px] font-mono tracking-[0.3em] uppercase">
                {tagline}
              </span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
          style={{ background: `${goldColor}22`, border: `1px solid ${goldColor}44` }}
        >
          <Wrench size={28} style={{ color: goldColor }} />
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-white/75 text-sm leading-relaxed max-w-sm mx-auto">
          {message}
        </p>

        {/* Countdown */}
        {showCountdown && (
          <CountdownTimer targetDate={maintenance.countdownDate} />
        )}

        {/* Divider */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-5">
            Need immediate assistance?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all group"
              >
                <Mail size={13} className="text-white/60 group-hover:text-white transition-colors" />
                {email}
                <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all group"
              >
                <Phone size={13} className="text-white/60 group-hover:text-white transition-colors" />
                {phone}
              </a>
            )}
          </div>
        </div>

        {/* Refresh hint */}
        <button
          onClick={() => window.location.reload()}
          className="mt-8 flex items-center gap-1.5 mx-auto text-white/30 hover:text-white/60 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
        >
          <RefreshCw size={10} />
          Refresh page
        </button>
      </div>

      {/* Bottom brand */}
      <div className="relative z-10 mt-12 text-white/20 text-[9px] font-mono tracking-widest uppercase">
        <Clock size={9} className="inline mr-1.5" />
        We appreciate your patience
      </div>
    </div>
  );
}
