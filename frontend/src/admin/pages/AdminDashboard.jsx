import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, MessageSquare, Eye, Percent, Clock, CheckCircle } from 'lucide-react';

const GOLD = '#D4AF37';
const DARK = '#1a1a1a';

const PIE_COLORS = ['#D4AF37', '#8c7a2a', '#f0d060', '#4a3f17', '#ffffff20'];

function StatCard({ icon: Icon, label, value, sub, trend }) {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="p-2.5 bg-gold-400/10 rounded-lg">
          <Icon size={18} className="text-gold-400" />
        </div>
        {trend !== undefined && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${trend >= 0 ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-matte-text mb-1">{label}</p>
        <p className="font-display font-bold text-2xl text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        {sub && <p className="text-[10px] text-matte-text font-light mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-matte-gray border border-matte-border rounded-lg px-4 py-3 shadow-2xl text-xs font-mono">
        <p className="text-gold-400 font-bold mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <span className="text-white">{p.value.toLocaleString()}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch('/analytics');
        setAnalytics(data);
      } catch {
        // Fallback mock data
        setAnalytics({
          summary: { visitors: 12450, views: 38900, quotes: 47, products: 4, blogs: 2, conversionRate: 0.38 },
          statusDistribution: { pending: 22, reviewed: 15, contacted: 8, closed: 2 },
          chartData: [
            { name: 'Mon', visitors: 1200, leads: 5, views: 3200 },
            { name: 'Tue', visitors: 1580, leads: 8, views: 4100 },
            { name: 'Wed', visitors: 1340, leads: 6, views: 3600 },
            { name: 'Thu', visitors: 1890, leads: 11, views: 5200 },
            { name: 'Fri', visitors: 2100, leads: 9, views: 5800 },
            { name: 'Sat', visitors: 1680, leads: 5, views: 4400 },
            { name: 'Sun', visitors: 1660, leads: 3, views: 3100 },
          ],
          categoryDistribution: [
            { name: 'Oversized T-Shirts', value: 4 },
            { name: 'Hoodies', value: 3 },
            { name: 'Tracksuits', value: 2 },
            { name: 'Polo Shirts', value: 1 },
          ],
          recentActivity: [
            { action: 'QUOTE_SUBMIT', details: 'New Quote Inquiry from Ahmed Raza for 500x Oversized T-Shirt', timestamp: new Date().toISOString() },
            { action: 'CREATE_PRODUCT', details: 'Created product: Heavyweight Oversized T-Shirt (Oversized T-Shirts)', timestamp: new Date(Date.now() - 3600000).toISOString() },
            { action: 'USER_LOGIN', details: 'User logged in successfully', timestamp: new Date(Date.now() - 7200000).toISOString() },
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-matte-gray rounded-xl h-32 animate-pulse border border-matte-border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-matte-gray rounded-xl h-64 animate-pulse border border-matte-border" />
          <div className="bg-matte-gray rounded-xl h-64 animate-pulse border border-matte-border" />
        </div>
      </div>
    );
  }

  const { summary, statusDistribution, chartData, categoryDistribution, recentActivity } = analytics;

  const statusData = [
    { name: 'Pending', value: statusDistribution.pending, color: '#f59e0b' },
    { name: 'Reviewed', value: statusDistribution.reviewed, color: '#3b82f6' },
    { name: 'Contacted', value: statusDistribution.contacted, color: '#10b981' },
    { name: 'Closed', value: statusDistribution.closed, color: '#6b7280' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
          <p className="text-xs text-matte-text font-light mt-0.5">Here's your factory analytics overview for today.</p>
        </div>
        <div className="text-[10px] font-mono text-matte-text border border-matte-border rounded-lg px-3 py-2">
          <span className="text-gold-400">ROLE:</span> {user?.role?.toUpperCase()}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Total Visitors" value={summary.visitors} sub="All-time site traffic" trend={12} />
        <StatCard icon={MessageSquare} label="Quote Inquiries" value={summary.quotes} sub="Factory lead submissions" trend={8} />
        <StatCard icon={ShoppingBag} label="Active Products" value={summary.products} sub="Published catalog items" />
        <StatCard icon={Percent} label="Conversion Rate" value={`${summary.conversionRate}%`} sub="Visitors → Leads ratio" trend={-2} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-matte-gray border border-matte-border rounded-xl p-5">
          <h3 className="font-display font-bold text-sm text-white mb-1">Weekly Traffic & Lead Funnel</h3>
          <p className="text-[10px] text-matte-text font-mono mb-6">Visitors, page views, and quote leads over 7 days</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="name" tick={{ fill: '#8c8c8c', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8c8c8c', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visitors" name="Visitors" stroke={GOLD} fill="url(#visitorGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="leads" name="Leads" stroke="#60a5fa" fill="url(#leadGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quote Status Pie */}
        <div className="bg-matte-gray border border-matte-border rounded-xl p-5">
          <h3 className="font-display font-bold text-sm text-white mb-1">Lead Status Breakdown</h3>
          <p className="text-[10px] text-matte-text font-mono mb-4">Quote funnel status distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%" cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-[10px] font-mono text-matte-text">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span>{s.name}: <span className="text-white">{s.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Category Bar */}
        <div className="bg-matte-gray border border-matte-border rounded-xl p-5">
          <h3 className="font-display font-bold text-sm text-white mb-1">Products by Category</h3>
          <p className="text-[10px] text-matte-text font-mono mb-6">Distribution of catalog product categories</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={categoryDistribution} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#8c8c8c', fontSize: 9, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8c8c8c', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Products" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-matte-gray border border-matte-border rounded-xl p-5">
          <h3 className="font-display font-bold text-sm text-white mb-4">Recent Activity Log</h3>
          <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto no-scrollbar">
            {recentActivity.map((log, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-matte-border/50 last:border-0">
                <div className="p-1.5 bg-gold-400/10 rounded-md shrink-0 mt-0.5">
                  <CheckCircle size={12} className="text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">{log.action?.replace(/_/g, ' ')}</p>
                  <p className="text-xs text-white font-light leading-relaxed truncate">{log.details}</p>
                  <p className="text-[10px] text-matte-text font-mono mt-0.5">
                    {new Date(log.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
