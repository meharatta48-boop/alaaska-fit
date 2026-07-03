import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { apiFetch } from '../utils/api.js';
import { Search, SlidersHorizontal, Download, ArrowUpRight, X, Layers, Percent, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Products() {
  const { t, isRTL } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState(null);

  const categories = [
    'All',
    'Oversized T-Shirts',
    'Hoodies',
    'Tracksuits',
    'Streetwear',
    'Gym Wear',
    'Sportswear',
    'Polo Shirts',
    'Jackets'
  ];

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await apiFetch('/products');
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          throw new Error('Empty product list');
        }
      } catch (error) {
        console.warn('API Product fetch failed. Loading seeded fallback data.');
        setProducts([
          {
            _id: '1',
            title: 'Heavyweight Oversized T-Shirt',
            slug: 'heavyweight-oversized-tshirt',
            description: 'Our signature drop-shoulder oversized tee. Crafted from high-density premium carded cotton. Ultimate comfort, drape, and durability for modern streetwear brands.',
            category: 'Oversized T-Shirts',
            moq: 100,
            fabric: '100% Organic Carded Cotton',
            gsm: '240 GSM',
            printing: 'Screen Print / DTG / High-Density Puff Print',
            embroidery: 'Flat Embroidery / 3D Puff Embroidery Available',
            techPackUrl: '#',
            images: [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
            colors: ['#0A0A0A', '#F5F5F3', '#4E5154', '#2C3E50'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            isFeatured: true
          },
          {
            _id: '2',
            title: 'Cinematic Premium Hoodie',
            slug: 'cinematic-premium-hoodie',
            description: 'Ultra-heavy French Terry hoodie. Features double-lined hood, no drawcords for clean aesthetic, and side rib panels. Designed to hold structure and deliver maximum luxury feel.',
            category: 'Hoodies',
            moq: 150,
            fabric: '100% Cotton French Terry',
            gsm: '420 GSM',
            printing: 'Screen Print / Discharge Printing',
            embroidery: 'High-Density Satin Stitching',
            techPackUrl: '#',
            images: [
              'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
            colors: ['#0F0F10', '#E3E3E3', '#4A3B32'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            isFeatured: true
          },
          {
            _id: '3',
            title: 'Luxury Streetwear Tracksuit',
            slug: 'luxury-streetwear-tracksuit',
            description: 'Matching panel track jacket and relaxed trackpants. Side custom tape panels, heavy custom gold zippers, and tailored fit.',
            category: 'Tracksuits',
            moq: 120,
            fabric: '80% Cotton / 20% Polyester Interlock Polyblend',
            gsm: '320 GSM',
            printing: 'Sublimation / Screen Print',
            embroidery: 'Gold Metallic Embroidery Stitching',
            techPackUrl: '#',
            images: [
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
            colors: ['#020202', '#1B2A47'],
            sizes: ['M', 'L', 'XL'],
            isFeatured: false
          },
          {
            _id: '4',
            title: 'Classic Pique Polo Shirt',
            slug: 'classic-pique-polo',
            description: 'Tailored polo shirt with knit collar and cuffs. Ideal for corporate branding, casual uniforms, or golf wear.',
            category: 'Polo Shirts',
            moq: 200,
            fabric: '100% Combed Cotton Pique',
            gsm: '220 GSM',
            printing: 'Embroidery Recommended / Direct Print',
            embroidery: 'Left Chest Flat Embroidery',
            techPackUrl: '#',
            images: [
              'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: '',
            colors: ['#FFFFFF', '#0B3C5D', '#D9534F'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            isFeatured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuoteClick = () => {
    setActiveProduct(null);
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Card subcomponent that supports video hover
  const ProductCard = ({ product }) => {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (hovered && videoRef.current) {
        videoRef.current.play().catch(() => {});
      } else if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, [hovered]);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setActiveProduct(product)}
        className="glass-card rounded-xl overflow-hidden cursor-pointer flex flex-col group"
      >
        {/* Visual Container */}
        <div className="relative aspect-[3/4] bg-matte-gray overflow-hidden">
          {/* Main Image */}
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${hovered && product.videoUrl ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Hover Video */}
          {product.videoUrl && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={product.videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Featured badge */}
          {product.isFeatured && (
            <div className="absolute top-4 left-4 bg-gold-400 text-black font-mono text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
              Featured Silhouette
            </div>
          )}

          {/* Hover Overlay Icon */}
          <div className="absolute bottom-4 right-4 bg-matte-black/80 text-white p-2 rounded-full border border-white/10 group-hover:bg-gold-400 group-hover:text-black group-hover:border-gold-400 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Text Details */}
        <div className={`p-5 flex-1 flex flex-col justify-between ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="text-[10px] text-gold-400 font-mono tracking-widest uppercase block mb-1">
              {product.category}
            </span>
            <h3 className="font-display font-bold text-sm tracking-wide text-[#0F1E45] group-hover:text-[#1E3A8A] transition-colors line-clamp-1 mb-2">
              {product.title}
            </h3>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#E2E8F5] text-[10px] font-mono text-[#6B7EA0]">
            <span>MOQ: {product.moq} pcs</span>
            <span>{product.gsm}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="products" className="bg-[#F8FAFF] border-b border-[#E2E8F5] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            Enterprise Blanks Catalog
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-[#0F1E45] uppercase mb-4">
            {t('categoryTitle')}
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#6B7EA0] max-w-xl font-light leading-relaxed">
            {t('categorySubtitle')}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-stretch md:items-center mb-10 pb-6 border-b border-[#E2E8F5]">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 scroll-smooth">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs tracking-wider rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all ${selectedCategory === cat ? 'bg-[#1E3A8A] text-white shadow-sm' : 'bg-white text-[#4A5568] hover:bg-[#F0F5FF] hover:text-[#1E3A8A] border border-[#E2E8F5]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex items-center min-w-[240px]">
            <Search className="absolute left-3.5 text-[#6B7EA0] w-4 h-4" />
            <input
              type="text"
              placeholder="Search specs, fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#D1D9EE] rounded-lg pl-10 pr-4 py-2 text-xs text-[#1A1A1A] placeholder:text-[#A0AEC0] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-panel border border-white/5 rounded-xl aspect-[3/4] animate-pulse flex flex-col justify-end p-5">
                <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-white/5 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-matte-text text-sm">
            No matching custom patterns or fabrics found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Product Details Drawer/Modal */}
        <AnimatePresence>
          {activeProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-white border border-[#E2E8F5] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              >
                {/* Visual Panel */}
                <div className="w-full md:w-1/2 bg-[#F8FAFF] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E2E8F5] aspect-square md:aspect-auto">
                  <img
                    src={activeProduct.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                    alt={activeProduct.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {activeProduct.videoUrl && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-20 hover:opacity-100 transition-opacity duration-300"
                    >
                      <source src={activeProduct.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>

                {/* Details Panel */}
                <div className={`w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-full ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Close button */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] text-gold-400 font-mono tracking-widest uppercase font-bold">
                      {activeProduct.category}
                    </span>
                    <button
                      onClick={() => setActiveProduct(null)}
                      className="text-[#6B7EA0] hover:text-[#0F1E45] rounded-md p-1.5 hover:bg-[#F0F4FC] cursor-pointer transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-[#0F1E45] uppercase mb-3 leading-tight">
                      {activeProduct.title}
                    </h3>
                    <p className="text-xs text-[#6B7EA0] leading-relaxed font-light mb-6">
                      {activeProduct.description}
                    </p>

                    {/* Tech Specifications */}
                    <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-[#E2E8F5] py-4 font-mono text-[11px]">
                      <div>
                        <span className="text-[#6B7EA0] block mb-1 uppercase font-semibold tracking-wider">Fabric Type</span>
                        <span className="text-[#0F1E45] font-semibold">{activeProduct.fabric}</span>
                      </div>
                      <div>
                        <span className="text-[#6B7EA0] block mb-1 uppercase font-semibold tracking-wider">GSM weight</span>
                        <span className="text-[#0F1E45] font-semibold">{activeProduct.gsm}</span>
                      </div>
                      <div>
                        <span className="text-[#6B7EA0] block mb-1 uppercase font-semibold tracking-wider">Minimum MOQ</span>
                        <span className="text-[#0F1E45] font-semibold">{activeProduct.moq} pcs</span>
                      </div>
                      <div>
                        <span className="text-[#6B7EA0] block mb-1 uppercase font-semibold tracking-wider">Print Options</span>
                        <span className="text-[#0F1E45] font-semibold">{activeProduct.printing}</span>
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-6">
                      <span className="text-xs text-[#6B7EA0] uppercase tracking-wider block mb-2 font-mono">Available Colorways</span>
                      <div className="flex gap-2">
                        {activeProduct.colors.map(color => (
                          <div
                            key={color}
                            style={{ backgroundColor: color }}
                            className="w-6 h-6 rounded-full border border-[#E2E8F5] shadow-inner"
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex gap-4 pt-4 border-t border-[#E2E8F5]">
                    <button
                      onClick={handleQuoteClick}
                      className="flex-1 px-5 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#162A5E] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center shadow-md hover:shadow-lg"
                    >
                      Configure Order
                    </button>
                    {activeProduct.techPackUrl && (
                      <a
                        href={activeProduct.techPackUrl}
                        download
                        className="px-4 py-3 rounded-xl border border-[#D1D9EE] hover:border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#F0F5FF] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Download size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
