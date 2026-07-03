import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Search, Sun, Moon, Languages, LogIn, LayoutDashboard, ShoppingBag, BookOpen, Settings, LogOut, X } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const { user, logout } = useAuth();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const items = [
    // Sections
    { title: '→ Hero — Top of Page', category: 'Sections', icon: ShoppingBag, action: () => scrollTo('hero') },
    { title: '→ Products — View Catalog', category: 'Sections', icon: ShoppingBag, action: () => scrollTo('products') },
    { title: '→ Process — How We Work', category: 'Sections', icon: Settings, action: () => scrollTo('process') },
    { title: '→ Factory Gallery', category: 'Sections', icon: BookOpen, action: () => scrollTo('gallery') },
    { title: '→ Private Label / OEM', category: 'Sections', icon: ShoppingBag, action: () => scrollTo('privatelabel') },
    { title: '→ Testimonials — Client Reviews', category: 'Sections', icon: ShoppingBag, action: () => scrollTo('testimonials') },
    { title: '→ Get a Quote — Start Order', category: 'Sections', icon: ShoppingBag, action: () => scrollTo('quote') },
    { title: '→ Blog — Industry Insights', category: 'Sections', icon: BookOpen, action: () => scrollTo('blog') },
    { title: '→ FAQ — Common Questions', category: 'Sections', icon: BookOpen, action: () => scrollTo('faq') },
    { title: '→ Contact Us', category: 'Sections', icon: Settings, action: () => scrollTo('contact') },
    // Navigation
    { title: 'Go to Homepage', category: 'Navigation', icon: ShoppingBag, action: () => { navigate('/'); setIsOpen(false); } },
    { title: 'Admin Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => { navigate(user ? '/admin' : '/admin/login'); setIsOpen(false); } },
    { title: 'Products Management', category: 'Navigation', icon: ShoppingBag, action: () => { navigate(user ? '/admin/products' : '/admin/login'); setIsOpen(false); } },
    { title: 'Blog CMS Articles', category: 'Navigation', icon: BookOpen, action: () => { navigate(user ? '/admin/blogs' : '/admin/login'); setIsOpen(false); } },
    { title: 'Homepage Live Builder', category: 'Navigation', icon: Settings, action: () => { navigate(user ? '/admin/builder' : '/admin/login'); setIsOpen(false); } },
    // Preferences
    { title: `Toggle Theme (Current: ${theme.toUpperCase()})`, category: 'Preferences', icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); setIsOpen(false); } },
    { title: 'Switch to English', category: 'Language', icon: Languages, action: () => { setLocale('en'); setIsOpen(false); } },
    { title: 'Switch to Urdu (اردو)', category: 'Language', icon: Languages, action: () => { setLocale('ur'); setIsOpen(false); } },
    { title: 'Switch to Arabic (العربية)', category: 'Language', icon: Languages, action: () => { setLocale('ar'); setIsOpen(false); } },
  ];

  if (user) {
    items.push({ title: 'Logout admin account', category: 'Account', icon: LogOut, action: () => { logout(); setIsOpen(false); } });
  } else {
    items.push({ title: 'Login to Admin Dashboard', category: 'Account', icon: LogIn, action: () => { navigate('/admin/login'); setIsOpen(false); } });
  }

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-40 bg-matte-black/80 text-gold-400 hover:text-white border border-gold-400/30 hover:border-gold-400 rounded-full p-3 shadow-2xl backdrop-blur-md transition-all flex items-center gap-2 text-xs font-sans tracking-widest cursor-pointer"
    >
      <Search size={16} />
      <span>CMD + K</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
      <div 
        ref={containerRef}
        className="w-full max-w-xl bg-matte-gray border border-matte-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[70vh]"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-matte-border">
          <Search className="text-matte-text w-5 h-5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-matte-text font-sans py-1"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-matte-text hover:text-white rounded-md p-1 hover:bg-white/5 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-2 max-h-[50vh] no-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-matte-text text-sm font-sans">
              No results found for "{search}"
            </div>
          ) : (
            // Grouping by Category
            Object.entries(
              filteredItems.reduce((acc, item) => {
                acc[item.category] = acc[item.category] || [];
                acc[item.category].push(item);
                return acc;
              }, {})
            ).map(([category, catItems]) => (
              <div key={category} className="mb-2">
                <h3 className="text-[10px] uppercase tracking-wider text-gold-400 font-display font-medium px-3 py-1.5 opacity-80">
                  {category}
                </h3>
                {catItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-gold-400 hover:text-black transition-all cursor-pointer group text-sm font-sans"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-gold-400 group-hover:text-black" />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-matte-black/50 border-t border-matte-border flex justify-between items-center text-[10px] text-matte-text font-sans">
          <span>Use <kbd className="bg-matte-gray border border-matte-border px-1.5 py-0.5 rounded text-white font-mono">↑↓</kbd> to navigate, <kbd className="bg-matte-gray border border-matte-border px-1.5 py-0.5 rounded text-white font-mono">Enter</kbd> to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
