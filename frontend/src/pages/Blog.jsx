import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { Search, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, [category]);

  const loadBlogs = () => {
    setLoading(true);
    let url = `/blogs?status=published`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    
    apiFetch(url)
      .then(data => {
        if (data) {
          setBlogs(data);
          // extract unique categories
          const cats = [...new Set(data.map(b => b.category).filter(Boolean))];
          if (categories.length === 0) setCategories(cats);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const filteredBlogs = blogs.filter(b => {
    if (!search) return true;
    const query = search.toLowerCase();
    return b.title.toLowerCase().includes(query) || b.content.toLowerCase().includes(query);
  });

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
              Company Insights & Guides
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white mb-6 uppercase">
              Factory Blog
            </h1>
            <p className="text-sm md:text-lg text-[#5A7BAA] dark:text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed font-light">
              Guides to heavyweight fabric GSM weights, apparel business patterns, and export tutorials.
            </p>
          </motion.div>
        </section>

        {/* Filters and search */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-4 top-3 text-matte-text" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search guides, tutorials, design tips..."
              className="w-full bg-[#F0F5FF] dark:bg-[#121212] border border-[#C7D9F5]/40 dark:border-[#262626] rounded-xl pl-12 pr-4 py-2.5 text-xs text-[#0F1E45] dark:text-white placeholder:text-matte-text outline-none focus:border-[#1E3A8A] dark:focus:border-gold-400 transition-colors"
            />
          </div>
          
          <div className="md:col-span-4">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-[#F0F5FF] dark:bg-[#121212] border border-[#C7D9F5]/40 dark:border-[#262626] rounded-xl px-4 py-2.5 text-xs text-[#0F1E45] dark:text-white outline-none focus:border-[#1E3A8A] dark:focus:border-gold-400 transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Blog Post Cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden flex flex-col">
                  <div className="aspect-[16/9] skeleton-light" />
                  <div className="p-6 space-y-3 bg-white border border-[#F3F4F6] border-t-0 rounded-b-3xl">
                    <div className="h-2 skeleton-light w-1/4" />
                    <div className="h-5 skeleton-light w-4/5" />
                    <div className="h-3 skeleton-light w-full" />
                    <div className="h-3 skeleton-light w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20 font-light text-matte-text text-sm">
              No matching articles found. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card overflow-hidden rounded-3xl border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col justify-between"
                >
                  <div>
                    {post.featuredImage && (
                      <div className="aspect-[16/9] w-full overflow-hidden border-b border-[#C7D9F5]/20 dark:border-[#262626] relative">
                        <SmartImage
                          src={post.featuredImage}
                          alt={post.title}
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          objectFit="cover"
                          className="hover:scale-[1.02] transition-transform duration-500"
                          wrapperStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'unset' }}
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8 space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-gold-400 bg-gold-400/10 px-2.5 py-1 rounded border border-gold-400/20 inline-block">
                        {post.category || 'Garments'}
                      </span>
                      <h3 className="font-display font-bold text-lg md:text-xl text-[#0F1E45] dark:text-white uppercase leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#5A7BAA] dark:text-[#9CA3AF] line-clamp-3 leading-relaxed font-light">
                        {post.content.replace(/[#*`]/g, '')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 pt-0 border-t border-[#C7D9F5]/20 dark:border-[#262626]/20 flex items-center justify-between text-[10px] font-mono text-matte-text">
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(post.publishDate).toLocaleDateString()}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#1E3A8A] dark:text-gold-400 font-bold group"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
