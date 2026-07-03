import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import { Search, SlidersHorizontal, ArrowUpRight, HelpCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';

export default function Products() {
  const { t, isRTL } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedGsm, setSelectedGsm] = useState('All');

  // Hardcoded categories, fabrics, and GSM tags for filter dropdowns / buttons
  const categories = ['All', 'Oversized T-Shirts', 'Hoodies', 'Tracksuits', 'Polo Shirts', 'Jackets'];
  const fabrics = ['All', '100% Organic Carded Cotton', '100% Cotton French Terry', 'Combed Cotton Pique', 'Polyblend'];
  const gsms = ['All', '220 GSM', '240 GSM', '320 GSM', '420 GSM'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      try {
        const data = await apiFetch('/products?status=active');
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback seeded data
        setProducts([
          {
            _id: '1',
            title: 'Heavyweight Oversized T-Shirt',
            slug: 'heavyweight-oversized-t-shirt',
            description: 'Our signature drop-shoulder oversized tee. Crafted from high-density premium carded cotton.',
            category: 'Oversized T-Shirts',
            moq: 100,
            fabric: '100% Organic Carded Cotton',
            gsm: '240 GSM',
            images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'],
            colors: ['#0A0A0A', '#F5F5F3'],
            sizes: ['S', 'M', 'L', 'XL'],
            isFeatured: true
          },
          {
            _id: '2',
            title: 'Cinematic Premium Hoodie',
            slug: 'cinematic-premium-hoodie',
            description: 'Ultra-heavy French Terry hoodie. Features double-lined hood and clean aesthetic.',
            category: 'Hoodies',
            moq: 150,
            fabric: '100% Cotton French Terry',
            gsm: '420 GSM',
            images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'],
            colors: ['#0F0F10', '#E3E3E3'],
            sizes: ['S', 'M', 'L', 'XL'],
            isFeatured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.fabric?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesFabric = selectedFabric === 'All' || p.fabric === selectedFabric;
    const matchesGsm = selectedGsm === 'All' || p.gsm === selectedGsm;

    return matchesSearch && matchesCategory && matchesFabric && matchesGsm;
  });

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-[#C7D9F5]/40 dark:border-gold-400/20">
            Enterprise Blanks
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-[#0F1E45] dark:text-white uppercase mb-4">
            Product Catalog
          </h1>
          <p className="text-sm text-[#5A7BAA] dark:text-[#9CA3AF] max-w-xl leading-relaxed font-light">
            Browse our signature silhouettes and premium blank garments. Choose raw parameters, request custom washes, screen prints or embroidery.
          </p>
        </section>

        {/* Toolbar & Filters */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 text-matte-text w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search silouhettes, fabrics or weights..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F0F5FF] dark:bg-black border border-[#C7D9F5]/40 dark:border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0F1E45] dark:text-white placeholder:text-matte-text outline-none focus:border-[#1E3A8A] dark:focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Filters grid */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-[10px] font-mono text-matte-text">
                  <SlidersHorizontal size={12} />
                  <span>FILTERS:</span>
                </div>

                {/* Category Select */}
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="bg-[#F0F5FF] dark:bg-black border border-[#C7D9F5]/40 dark:border-[#262626] rounded-lg px-3 py-2 text-xs font-mono text-[#0F1E45] dark:text-matte-text outline-none"
                >
                  <option value="All">Category: All</option>
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                {/* Fabric Select */}
                <select
                  value={selectedFabric}
                  onChange={e => setSelectedFabric(e.target.value)}
                  className="bg-[#F0F5FF] dark:bg-black border border-[#C7D9F5]/40 dark:border-[#262626] rounded-lg px-3 py-2 text-xs font-mono text-[#0F1E45] dark:text-matte-text outline-none"
                >
                  <option value="All">Fabric: All</option>
                  {fabrics.filter(f => f !== 'All').map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                {/* GSM Select */}
                <select
                  value={selectedGsm}
                  onChange={e => setSelectedGsm(e.target.value)}
                  className="bg-[#F0F5FF] dark:bg-black border border-[#C7D9F5]/40 dark:border-[#262626] rounded-lg px-3 py-2 text-xs font-mono text-[#0F1E45] dark:text-matte-text outline-none"
                >
                  <option value="All">Weight: All</option>
                  {gsms.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={36} className="animate-spin text-gold-400" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-matte-text text-sm">
              No luxury silhouettes match your filters. Try clearing some options.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => (
                <Link
                  key={p._id}
                  to={`/products/${p.slug}`}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col group border border-[#C7D9F5]/40 dark:border-[#262626]"
                >
                  <div className="relative aspect-[3/4] bg-matte-gray overflow-hidden">
                    <img
                      src={p.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {p.isFeatured && (
                      <span className="absolute top-3 left-3 bg-[#1E3A8A] dark:bg-gold-400 text-white dark:text-black font-mono text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-black/80 text-black dark:text-white p-2 rounded-full border border-black/10 dark:border-white/10 group-hover:bg-[#1E3A8A] dark:group-hover:bg-gold-400 group-hover:text-white dark:group-hover:text-black transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-[#1E3A8A] dark:text-gold-400 font-mono tracking-widest uppercase block mb-1">
                        {p.category}
                      </span>
                      <h3 className="font-display font-bold text-xs md:text-sm tracking-wide text-[#0F1E45] dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-gold-400 transition-colors line-clamp-1 mb-2">
                        {p.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#C7D9F5]/20 dark:border-[#262626]/20 text-[9px] font-mono text-matte-text">
                      <span>MOQ: {p.moq} pcs</span>
                      <span>{p.gsm}</span>
                    </div>
                  </div>
                </Link>
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
