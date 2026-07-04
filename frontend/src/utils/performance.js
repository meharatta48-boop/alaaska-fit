export const applyPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  const images = Array.from(document.querySelectorAll('img'));
  images.forEach((img, index) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', index < 5 ? 'eager' : 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    if (!img.hasAttribute('fetchpriority') && index < 3) {
      img.setAttribute('fetchpriority', 'high');
    }
    if (!img.hasAttribute('draggable')) {
      img.setAttribute('draggable', 'false');
    }
  });

  const videos = Array.from(document.querySelectorAll('video'));
  videos.forEach((video) => {
    if (!video.hasAttribute('preload')) {
      video.setAttribute('preload', 'metadata');
    }
    if (!video.hasAttribute('playsinline')) {
      video.setAttribute('playsinline', '');
    }
  });
};
