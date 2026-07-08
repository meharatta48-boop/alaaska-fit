import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import CommandPalette from '../components/CommandPalette.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { ArrowLeft, Check, Download, Layers, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      try {
        const data = await apiFetch(`/products/${slug}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product detail:', err);
        // Fallback matching seeded data
        const dummyProducts = {
          'heavyweight-oversized-t-shirt': {
            title: 'Heavyweight Oversized T-Shirt',
            slug: 'heavyweight-oversized-t-shirt',
            description: 'Our signature drop-shoulder oversized tee. Crafted from high-density premium carded cotton. Ultimate comfort, drape, and durability for modern streetwear brands.',
            category: 'Oversized T-Shirts',
            moq: 100,
            fabric: '100% Organic Carded Cotton',
            gsm: '240 GSM',
            printing: 'Screen Print / DTG / High-Density Puff Print',
            embroidery: 'Flat Embroidery / 3D Puff Embroidery Available',
            images: [
              'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
            colors: ['#0A0A0A', '#F5F5F3', '#4E5154', '#2C3E50'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            techPackUrl: '#'
          },
          'cinematic-premium-hoodie': {
            title: 'Cinematic Premium Hoodie',
            slug: 'cinematic-premium-hoodie',
            description: 'Ultra-heavy French Terry hoodie. Features double-lined hood, no drawcords for clean aesthetic, and side rib panels. Designed to hold structure and deliver maximum luxury feel.',
            category: 'Hoodies',
            moq: 150,
            fabric: '100% Cotton French Terry',
            gsm: '420 GSM',
            printing: 'Screen Print / Discharge Printing',
            embroidery: 'High-Density Satin Stitching',
            images: [
              'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
            ],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
            colors: ['#0F0F10', '#E3E3E3', '#4A3B32'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            techPackUrl: '#'
          }
        };
        setProduct(dummyProducts[slug] || dummyProducts['heavyweight-oversized-t-shirt']);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[3/4] skeleton-light rounded-3xl" />
              <div className="flex gap-3">
                {[0,1,2].map(i => <div key={i} className="w-20 aspect-square skeleton-light rounded-xl" />)}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-5 skeleton-light w-1/4" />
              <div className="h-10 skeleton-light w-3/4" />
              <div className="h-4 skeleton-light w-full" />
              <div className="h-4 skeleton-light w-5/6" />
              <div className="h-40 skeleton-light rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col justify-center items-center gap-4 text-center">
        <h2 className="text-xl font-bold uppercase tracking-wider text-matte-text">Silhouette Not Found</h2>
        <Link to="/products" className="text-xs font-mono text-gold-400 uppercase tracking-widest border border-gold-400/20 px-4 py-2 rounded">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleStartQuote = () => {
    // Navigate and prepopulate quote builder steps
    navigate('/quote', {
      state: {
        productType: product.category,
        fabric: product.fabric,
        gsm: product.gsm,
        quantity: product.moq
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-[#0F1E45] dark:text-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono text-[#5A7BAA] dark:text-matte-text hover:text-[#1E3A8A] dark:hover:text-gold-400 mb-8 uppercase tracking-wider">
          <ArrowLeft size={14} />
          <span>Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Images & Carousel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-[#C7D9F5]/40 dark:border-[#262626]" style={{ aspectRatio: '3/4' }}>
              <SmartImage
                src={product.images?.[activeImage] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                alt={product.title}
                loading="eager"
                fetchpriority="high"
                objectFit="cover"
                wrapperStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'unset' }}
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                      activeImage === i ? 'border-[#1E3A8A] dark:border-gold-400 ring-1 ring-gold-400/20' : 'border-[#C7D9F5]/40 dark:border-[#262626] opacity-70'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <SmartImage
                      src={img}
                      alt={`Product view ${i + 1}`}
                      loading="lazy"
                      objectFit="cover"
                      wrapperStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', aspectRatio: 'unset' }}
                    />
                  </button>
                ))}
              </div>
            )}

            {product.videoUrl && (
              <div className="glass-panel p-4 rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] mt-4">
                <span className="text-[9px] font-mono text-matte-text uppercase tracking-widest block mb-2">Production Video Sample</span>
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <video src={product.videoUrl} controls muted playsInline className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Technical specifications and quote CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#1E3A8A] dark:text-gold-400 uppercase bg-[#EEF4FF] dark:bg-[#1E3A8A]/10 px-3 py-1 rounded border border-[#C7D9F5]/40 dark:border-gold-400/20 mb-3 inline-block">
                  {product.category}
                </span>
                <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[#0F1E45] dark:text-white uppercase leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-xs md:text-sm text-[#5A7BAA] dark:text-[#9CA3AF] leading-relaxed font-light font-sans">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Checklist */}
              <div className="glass-panel rounded-2xl border border-[#C7D9F5]/40 dark:border-[#262626] p-5 space-y-4">
                <h3 className="font-display font-bold text-xs text-[#0F1E45] dark:text-white uppercase tracking-wider border-b border-[#C7D9F5]/20 dark:border-[#262626]/20 pb-2">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div>
                    <span className="text-matte-text block mb-0.5 uppercase tracking-wider">Fabric Style</span>
                    <span className="text-[#0F1E45] dark:text-white font-medium">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="text-matte-text block mb-0.5 uppercase tracking-wider">Weight Density</span>
                    <span className="text-[#0F1E45] dark:text-white font-medium">{product.gsm}</span>
                  </div>
                  <div>
                    <span className="text-matte-text block mb-0.5 uppercase tracking-wider">Minimum Order</span>
                    <span className="text-[#0F1E45] dark:text-white font-medium">{product.moq} pcs</span>
                  </div>
                  <div>
                    <span className="text-matte-text block mb-0.5 uppercase tracking-wider">Print Options</span>
                    <span className="text-[#0F1E45] dark:text-white font-medium">{product.printing || 'Screen Print / DTG'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-matte-text block mb-0.5 uppercase tracking-wider">Embroidery Options</span>
                    <span className="text-[#0F1E45] dark:text-white font-medium">{product.embroidery || 'Flat / Puff Embroidery'}</span>
                  </div>
                </div>
              </div>

              {/* Colorways list */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#0F1E45] dark:text-white uppercase tracking-wider block">Default Colorways</span>
                  <div className="flex gap-2.5">
                    {product.colors.map(col => (
                      <div
                        key={col}
                        style={{ backgroundColor: col }}
                        className="w-7 h-7 rounded-full border border-[#C7D9F5] dark:border-[#262626] shadow-sm cursor-help"
                        title={col}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size chart */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#0F1E45] dark:text-white uppercase tracking-wider block">Standard Sizes</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes?.map(size => (
                    <span key={size} className="px-3 py-1 bg-[#EEF4FF] dark:bg-[#161616] text-[#0F1E45] dark:text-[#9CA3AF] text-[10px] font-mono border border-[#C7D9F5]/40 dark:border-[#262626] rounded">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#C7D9F5]/20 dark:border-[#262626]/20 flex gap-4">
              <button
                onClick={handleStartQuote}
                className="flex-1 py-4 bg-[#1E3A8A] dark:bg-gold-400 hover:opacity-95 text-white dark:text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center cursor-pointer"
              >
                Configure & Quote
              </button>
              {product.techPackUrl && (
                <a
                  href={product.techPackUrl}
                  download
                  className="px-4 py-4 rounded-xl border border-[#C7D9F5] dark:border-[#262626] text-[#0F1E45] dark:text-white text-xs font-bold uppercase transition-colors hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center shrink-0"
                >
                  <Download size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <CommandPalette />
    </div>
  );
}
