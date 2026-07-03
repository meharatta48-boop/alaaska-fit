import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  LayoutDashboard, ShoppingBag, FileText, Image, Home, Users,
  Settings, ChevronLeft, ChevronRight, LogOut, Activity, Quote,
  Menu, Bell, Search, ExternalLink, ChevronDown,
  Globe, Folder, Sliders, Shield, BarChart3, X
} from 'lucide-react';

// ─── Navigation configuration ────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Analytics', icon: BarChart3, path: '/admin', exact: true },
    ]
  },
  {
    label: 'Content',
    items: [
      { label: 'Products', icon: ShoppingBag, path: '/admin/products' },
      { label: 'Blog CMS', icon: FileText, path: '/admin/blogs' },
      { label: 'Gallery', icon: Image, path: '/admin/gallery' },
      { label: 'Media Library', icon: Folder, path: '/admin/media' },
    ]
  },
  {
    label: 'Sales',
    items: [
      { label: 'Quotes & Leads', icon: Quote, path: '/admin/quotes' },
      { label: 'Careers / Hiring', icon: Users, path: '/admin/careers' },
    ]
  },
  {
    label: 'Platform',
    items: [
      { label: 'Homepage Layout', icon: Sliders, path: '/admin/builder' },
      { label: 'Page Content (CMS)', icon: FileText, path: '/admin/cms' },
      { label: 'Activity Log', icon: Activity, path: '/admin/activity' },
      { label: 'Users & Roles', icon: Shield, path: '/admin/users' },
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ]
  },
];

// ─── Dummy notifications ──────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, icon: Quote, color: '#D4AF37', title: 'New Quote Inquiry', desc: 'Ahmed Raza — 500× Oversized T-Shirts', time: '2m ago', unread: true },
  { id: 2, icon: Users, color: '#60a5fa', title: 'New User Registered', desc: 'sarah.b@brand.com signed up as client', time: '14m ago', unread: true },
  { id: 3, icon: ShoppingBag, color: '#34d399', title: 'Product Published', desc: 'Heavyweight Hoodie is now live', time: '1h ago', unread: false },
];

// ─── Sidebar link ─────────────────────────────────────────────────────────────
function NavItem({ item, collapsed, onClick, isActive }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-150 group overflow-hidden ${
        isActive
          ? 'bg-[#D4AF37] text-black shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
          : 'text-[#6B7280] hover:bg-white/5 hover:text-white'
      } ${collapsed ? 'justify-center' : 'justify-start'}`}
    >
      <Icon size={15} className={`shrink-0 transition-colors ${isActive ? 'text-black' : 'text-[#D4AF37] group-hover:text-white'}`} />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {/* Active indicator pip */}
      {isActive && !collapsed && (
        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-black/40" />
      )}
    </Link>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, setCollapsed, onClose, user, onLogout }) {
  const location = useLocation();

  const isActive = (item) => item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path);

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] border-r border-[#1A1A1A]">
      {/* Logo */}
      <div className={`px-4 py-4 border-b border-[#1A1A1A] flex items-center ${collapsed ? 'justify-center' : 'justify-between'} shrink-0`}>
        {!collapsed && (
          <Link to="/admin" className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8c7a2a] flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
              <span className="text-black font-bold text-[10px]">AF</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-[0.15em] text-white uppercase truncate">Al Aaska Fit</p>
              <p className="text-[7px] font-mono tracking-[0.25em] text-[#4B5563] uppercase">Admin Console</p>
            </div>
          </Link>
        )}
        <div className="flex items-center gap-1">
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-[#4B5563] hover:text-white transition-colors cursor-pointer">
              <X size={15} />
            </button>
          )}
          <button
            onClick={() => setCollapsed(p => !p)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-[#4B5563] hover:text-white transition-colors cursor-pointer"
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5" style={{ scrollbarWidth: 'none' }}>
        {NAV_GROUPS.map(group => {
          const items = group.items.filter(item => {
            if (item.path === '/admin/users') {
              return user?.role === 'Super Admin';
            }
            return true;
          });
          if (items.length === 0) return null;
          return (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#2E2E2E] px-3 py-1.5">{group.label}</p>
              )}
              {items.map(item => (
                <NavItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  isActive={isActive(item)}
                  onClick={onClose}
                />
              ))}
            </div>
          );
        })}
      </nav>

      {/* User widget */}
      <div className={`px-3 py-3 border-t border-[#1A1A1A] shrink-0 ${collapsed ? 'flex flex-col items-center gap-2' : ''}`}>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 mb-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8c7a2a] flex items-center justify-center text-black font-bold text-xs shrink-0">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          title="Logout"
          className={`w-full flex items-center gap-2 text-[#4B5563] hover:text-red-400 text-[11px] font-mono transition-colors cursor-pointer px-2 py-2 rounded-lg hover:bg-red-500/5 ${collapsed ? 'justify-center' : 'justify-start'}`}
        >
          <LogOut size={14} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────
function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.replace('/admin', '').split('/').filter(Boolean);
  const crumbs = [{ label: 'Admin', path: '/admin' }, ...segments.map((seg, i) => ({
    label: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    path: '/admin/' + segments.slice(0, i + 1).join('/'),
  }))];

  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-mono text-[#4B5563]">
      {crumbs.map((c, i) => (
        <React.Fragment key={c.path}>
          {i > 0 && <ChevronRight size={10} className="text-[#2A2A2A]" />}
          {i === crumbs.length - 1
            ? <span className="text-white">{c.label}</span>
            : <Link to={c.path} className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">{c.label}</Link>
          }
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─── Notifications dropdown ───────────────────────────────────────────────────
function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef(null);
  const unread = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = () => setNotifications(p => p.map(n => ({ ...n, unread: false })));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className="relative p-2 rounded-xl border border-[#1E1E1E] hover:border-[#2A2A2A] bg-[#0F0F0F] hover:bg-[#141414] text-[#6B7280] hover:text-white transition-all cursor-pointer"
      >
        <Bell size={15} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[8px] font-bold rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#0F0F0F] border border-[#1E1E1E] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
            <div>
              <p className="text-xs font-semibold text-white">Notifications</p>
              <p className="text-[9px] font-mono text-[#4B5563]">{unread} unread</p>
            </div>
            {unread > 0 && (
              <button onClick={markRead} className="text-[9px] font-mono text-[#D4AF37] hover:text-[#f0d060] uppercase tracking-wider transition-colors cursor-pointer">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {notifications.map(n => {
              const Icon = n.icon;
              return (
                <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-[#111] last:border-0 hover:bg-white/2 transition-colors ${n.unread ? 'bg-[#D4AF37]/3' : ''}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: n.color + '18' }}>
                    <Icon size={13} style={{ color: n.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-semibold text-white truncate">{n.title}</p>
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#4B5563] truncate mt-0.5">{n.desc}</p>
                    <p className="text-[9px] font-mono text-[#2E2E2E] mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-2.5 border-t border-[#1A1A1A]">
            <button className="w-full text-[10px] font-mono text-[#4B5563] hover:text-[#D4AF37] transition-colors uppercase tracking-wider cursor-pointer">
              View all activity →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on navigation
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Find current page label for header
  const allItems = NAV_GROUPS.flatMap(g => g.items);
  const currentItem = allItems.find(item =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="flex h-screen bg-[#080808] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Overlay Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 shrink-0 flex flex-col h-full shadow-2xl">
            <Sidebar
              collapsed={false}
              setCollapsed={() => {}}
              onClose={() => setMobileOpen(false)}
              user={user}
              onLogout={handleLogout}
            />
          </div>
          <div
            className="flex-1 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top Header */}
        <header className="shrink-0 border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-md px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#1E1E1E] bg-[#0F0F0F] text-[#6B7280] hover:text-white transition-colors cursor-pointer"
            >
              <Menu size={15} />
            </button>

            {/* Page title + breadcrumbs */}
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-white truncate leading-tight">
                {currentItem?.label || 'Dashboard'}
              </h1>
              <div className="hidden sm:block">
                <Breadcrumbs />
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View site button */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[#4B5563] hover:text-[#D4AF37] border border-[#1E1E1E] hover:border-[#D4AF37]/40 px-3 py-1.5 rounded-xl transition-all"
            >
              <Globe size={11} />
              View Site
              <ExternalLink size={9} />
            </Link>

            {/* Notifications */}
            <NotificationBell />

            {/* User avatar */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-[#1A1A1A]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8c7a2a] flex items-center justify-center text-black font-bold text-[10px] shrink-0 shadow-[0_2px_8px_rgba(212,175,55,0.25)]">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-semibold text-white leading-tight truncate max-w-[100px]">{user.name}</p>
                  <p className="text-[8px] font-mono text-[#D4AF37] uppercase">{user.role}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1A1A1A transparent' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
