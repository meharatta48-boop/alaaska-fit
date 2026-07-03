import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';
import { ArrowUpRight, CalendarDays, Tag } from 'lucide-react';

export default function Blog() {
  const { t, isRTL } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiFetch('/blogs?status=published');
        if (data && data.length > 0) {
          setBlogs(data.slice(0, 3));
        } else {
          throw new Error('Empty');
        }
      } catch {
        setBlogs([
          {
            _id: '1',
            title: 'Ultimate Guide to Heavyweight GSM Fabric Selection',
            slug: 'ultimate-guide-gsm-fabric',
            featuredImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
            category: 'Fabric Guides',
            tags: ['GSM', 'Streetwear', 'Manufacturing'],
            publishDate: '2026-05-10T10:00:00Z',
            seoDescription: 'Understand what GSM means in fabric manufacturing. Learn the ideal GSM ratings for premium oversized t-shirts, hoodies, and streetwear.'
          },
          {
            _id: '2',
            title: 'How to Start a High-End Streetwear Brand in 2026',
            slug: 'start-streetwear-brand-2026',
            featuredImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
            category: 'Streetwear manufacturing',
            tags: ['Streetwear', 'Marketing', 'Apparel business'],
            publishDate: '2026-06-01T12:00:00Z',
            seoDescription: 'Thinking of launching a streetwear line? Read our complete manufacturing and design blueprint to scale your clothing brand successfully.'
          },
          {
            _id: '3',
            title: 'Private Label Manufacturing: MOQ, Sampling & Tech Packs',
            slug: 'private-label-moq-sampling',
            featuredImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
            category: 'Clothing business',
            tags: ['Private Label', 'MOQ', 'Sampling'],
            publishDate: '2026-06-05T09:00:00Z',
            seoDescription: 'Learn the essentials of private-label apparel manufacturing: MOQ minimums, sample requests, and tech pack preparation.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return ''; }
  };

  return (
    <section id="blog" className="bg-matte-gray border-b border-matte-border py-24 text-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
              Industry Intelligence
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-primary uppercase">
              {t('blogTitle')}
            </h2>
          </div>
          <p className="font-sans text-xs text-matte-text max-w-sm font-light leading-relaxed">
            {t('blogSubtitle')}
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-matte-black border border-matte-border rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className={`glass-card rounded-xl overflow-hidden group cursor-pointer block ${index === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'h-56' : 'h-44'}`}>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-gold-400/90 text-black text-[9px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wide">
                    {blog.category}
                  </div>
                </div>

                {/* Content */}
                <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-4 text-[10px] text-matte-text font-mono mb-3">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={11} />
                      {formatDate(blog.publishDate)}
                    </span>
                    {blog.tags?.[0] && (
                      <span className="flex items-center gap-1.5">
                        <Tag size={11} />
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-sm md:text-base text-primary mb-2 group-hover:text-gold-400 transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-matte-text font-light leading-relaxed line-clamp-2 mb-4">
                    {blog.seoDescription}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold-400 uppercase tracking-wider group-hover:gap-2.5 transition-all">
                    <span>Read Article</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
