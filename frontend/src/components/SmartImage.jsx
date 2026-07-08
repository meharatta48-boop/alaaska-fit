import React, { useState, useRef } from 'react';

/**
 * SmartImage — A reusable image component that:
 * 1. Shows a shimmer skeleton placeholder while loading
 * 2. Fades the real image in smoothly once loaded
 * 3. Shows a fallback card on error
 * 4. Prevents CLS by reserving exact space via aspect-ratio or explicit dimensions
 * 5. Supports lazy loading, srcset, and sizes
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio = null,       // e.g. '16/9', '4/3', '1/1', '3/4'
  width = null,
  height = null,
  loading = 'lazy',
  fetchpriority = 'auto',
  srcSet = null,
  sizes = null,
  fallbackIcon = null,
  style = {},
  wrapperStyle = {},
  onLoad: onLoadProp = null,
  objectFit = 'cover',
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoadProp) onLoadProp();
  };

  const handleError = () => {
    setError(true);
    setLoaded(true); // stop showing shimmer
  };

  const wrapStyle = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height && !aspectRatio ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...wrapperStyle,
  };

  return (
    <div className={`smart-img-wrapper ${wrapperClassName}`} style={wrapStyle}>
      {/* Shimmer skeleton — shown while image loads */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="smart-img-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #E8EEF8 0%, #F5F8FF 40%, #E8EEF8 80%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSlide 1.6s ease-in-out infinite',
            borderRadius: 'inherit',
          }}
        />
      )}

      {/* Error state — nice placeholder */}
      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F0F4FC',
            gap: '0.5rem',
          }}
        >
          {fallbackIcon || (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B0BFDA" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
          <span style={{ fontSize: '0.6rem', color: '#8A9BB8', fontFamily: 'Space Grotesk, monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Image unavailable
          </span>
        </div>
      )}

      {/* Real image — fades in once loaded */}
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchpriority}
          decoding="async"
          {...(srcSet ? { srcSet } : {})}
          {...(sizes ? { sizes } : {})}
          {...(width ? { width } : {})}
          {...(height ? { height } : {})}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.45s ease',
            ...style,
          }}
        />
      )}
    </div>
  );
}
