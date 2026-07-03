import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../utils/api.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { ArrowLeft, CalendarDays, Tag, User, Loader2 } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/blogs/${slug}`);
        setBlog(data);
      } catch (err) {
        console.error(err);
        setError('Article not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return ''; }
  };

  return (
    <div className="bg-matte-black text-primary min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-wider hover:text-gold-300 transition-colors mb-10 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={32} className="animate-spin text-gold-400" />
              <p className="font-mono text-xs text-matte-text">Loading article...</p>
            </div>
          ) : error || !blog ? (
            <div className="text-center py-20">
              <h1 className="font-display font-bold text-3xl text-red-400 mb-4">Error</h1>
              <p className="font-sans text-sm text-matte-text mb-8">{error || 'Article not found.'}</p>
              <Link
                to="/"
                className="px-6 py-2.5 bg-gold-400 text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-gold-500 transition-colors"
              >
                Return Home
              </Link>
            </div>
          ) : (
            <article>
              {/* Category */}
              {blog.category && (
                <span className="bg-gold-400/90 text-black text-[9px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wide">
                  {blog.category}
                </span>
              )}

              {/* Title */}
              <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-primary uppercase mt-6 mb-8 leading-tight">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-matte-text font-mono border-y border-matte-border py-4 mb-10">
                <span className="flex items-center gap-2">
                  <User size={14} className="text-gold-400" />
                  {blog.author || 'Al Aaska Fit Production'}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-gold-400" />
                  {formatDate(blog.publishDate)}
                </span>
                {blog.tags && blog.tags.length > 0 && (
                  <span className="flex items-center gap-2">
                    <Tag size={14} className="text-gold-400" />
                    {blog.tags.join(', ')}
                  </span>
                )}
              </div>

              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-matte-border mb-12">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              )}

              {/* Content body */}
              <div
                className="prose max-w-none text-primary font-sans text-sm md:text-base leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Co-branded footer CTA */}
              <div className="mt-16 p-8 rounded-2xl glass-panel border border-matte-border flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-primary mb-2">Build Your Collection</h3>
                  <p className="text-xs text-matte-text font-light leading-relaxed max-w-md">
                    Looking to manufacture premium streetwear with custom GSM and custom washing tags? Get in touch with Al Aaska Fit today.
                  </p>
                </div>
                <button
                  onClick={() => {
                    window.location.href = '/#quote';
                  }}
                  className="px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap"
                >
                  Request A Quote
                </button>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
