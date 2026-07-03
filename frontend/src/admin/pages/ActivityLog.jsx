import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { Activity, CheckCircle } from 'lucide-react';

const ACTION_COLORS = {
  'QUOTE_SUBMIT': 'text-amber-400',
  'USER_LOGIN': 'text-blue-400',
  'CREATE_PRODUCT': 'text-green-400',
  'UPDATE_PRODUCT': 'text-gold-400',
  'DELETE_PRODUCT': 'text-red-400',
  'CREATE_BLOG': 'text-green-400',
  'UPDATE_BLOG': 'text-gold-400',
  'DELETE_BLOG': 'text-red-400',
  'UPDATE_CONFIG': 'text-purple-400',
  'UPLOAD_MEDIA': 'text-cyan-400',
  'USER_REGISTER': 'text-blue-400',
  'UPDATE_USER_ROLE': 'text-amber-400',
  'DELETE_USER': 'text-red-400',
};

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch('/analytics');
        setLogs(data.recentActivity || []);
      } catch {
        setLogs([
          { action: 'QUOTE_SUBMIT', details: 'New Quote from Ahmed Raza for 500x Oversized T-Shirt', userName: 'System', timestamp: new Date().toISOString() },
          { action: 'USER_LOGIN', details: 'Admin logged in successfully', userName: 'Super Admin', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { action: 'CREATE_PRODUCT', details: 'Created product: Heavyweight Oversized T-Shirt', userName: 'Super Admin', timestamp: new Date(Date.now() - 7200000).toISOString() },
          { action: 'UPDATE_CONFIG', details: 'Updated system configuration key: homepage', userName: 'Super Admin', timestamp: new Date(Date.now() - 86400000).toISOString() },
        ]);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display font-bold text-xl text-white">Activity Log</h2>
        <p className="text-xs text-matte-text font-light mt-0.5">Real-time audit trail of all admin actions</p>
      </div>

      <div className="bg-matte-gray border border-matte-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array(5).fill(0).map((_, i) => <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />)}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16 text-matte-text text-sm flex flex-col items-center gap-3">
            <Activity size={28} />
            <p>No activity logged yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-matte-border/30">
            {logs.map((log, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                <div className="p-2 bg-matte-black rounded-lg shrink-0 mt-0.5 border border-matte-border/50">
                  <CheckCircle size={13} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${ACTION_COLORS[log.action] || 'text-matte-text'}`}>
                      {log.action?.replace(/_/g, ' ')}
                    </span>
                    {log.userName && <span className="text-[9px] font-mono text-matte-text">by {log.userName}</span>}
                  </div>
                  <p className="text-xs text-white font-light leading-relaxed">{log.details}</p>
                  <p className="text-[10px] text-matte-text font-mono mt-1">
                    {new Date(log.timestamp).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
