import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Play, Maximize2, X } from 'lucide-react';

export default function FactoryGallery() {
  const { t, isRTL } = useLanguage();
  const [lightbox, setLightbox] = useState(null);

  const galleryItems = [
    {
      id: 1,
      type: 'video',
      title: 'Precision Fabric Sourcing & Inspection',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-fabric-being-cut-41680-large.mp4',
      size: 'col-span-2 row-span-1 md:row-span-2'
    },
    {
      id: 2,
      type: 'image',
      title: 'Embroidery Machine Station',
      url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80',
      size: 'col-span-1 row-span-1'
    },
    {
      id: 3,
      type: 'image',
      title: 'Quality Inspection Board',
      url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
      size: 'col-span-1 row-span-1'
    },
    {
      id: 4,
      type: 'video',
      title: 'Flatlock Twin-Needle Stitching',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4',
      size: 'col-span-2 row-span-1'
    },
    {
      id: 5,
      type: 'image',
      title: 'Finished Premium Blanks Warehousing',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
      size: 'col-span-1 row-span-1'
    },
    {
      id: 6,
      type: 'image',
      title: 'Heavy French Terry Raw Rolls',
      url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      size: 'col-span-1 row-span-1'
    }
  ];

  return (
    <section id="factory" className="bg-matte-black border-b border-matte-border py-24 text-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-2">
            VIRTUAL FACTORY REELS
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-primary uppercase mb-4">
            FACTORY EXPERIENCE GALLERY
          </h2>
          <p className="font-sans text-xs md:text-sm text-matte-text max-w-xl font-light leading-relaxed">
            Take an immersive digital tour inside our knitting, custom dyeing, embroidery lines, and quality verification boards.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map(item => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className={`relative bg-matte-gray rounded-xl overflow-hidden border border-matte-border/50 group cursor-pointer ${item.size}`}
            >
              {/* Media Content */}
              {item.type === 'video' ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
                />
              )}

              {/* Cover overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Meta details */}
              <div className={`absolute bottom-4 inset-x-4 flex justify-between items-end ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gold-400 block mb-0.5">
                    {item.type.toUpperCase()} SPEC
                  </span>
                  <h3 className="font-display font-semibold text-xs md:text-sm text-white max-w-[80%] line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="bg-white/10 text-white border border-white/10 p-1.5 rounded-lg group-hover:bg-gold-400 group-hover:text-black group-hover:border-gold-400 transition-all">
                  {item.type === 'video' ? <Play size={12} /> : <Maximize2 size={12} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox */}
        {lightbox && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="absolute top-6 right-6 flex gap-4">
              <button
                onClick={() => setLightbox(null)}
                className="text-white hover:text-gold-400 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="w-full max-w-4xl max-h-[85vh] flex flex-col items-center">
              {lightbox.type === 'video' ? (
                <video
                  autoPlay
                  controls
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-matte-border"
                >
                  <source src={lightbox.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={lightbox.url}
                  alt={lightbox.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-matte-border"
                />
              )}
              <h3 className="text-white font-display text-base font-semibold mt-4 text-center">
                {lightbox.title}
              </h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
