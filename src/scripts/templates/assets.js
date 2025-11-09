const __imgCache = new Map(); // url -> Promise<HTMLImageElement>

export function preloadImage(url) {
  if (!url) return Promise.resolve(null);
  const key = String(url);
  if (__imgCache.has(key)) return __imgCache.get(key);
  const p = new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = key;
    } catch (_) { resolve(null); }
  });
  __imgCache.set(key, p);
  return p;
}

export function preloadImages(urls = []) {
  return Promise.all((urls || []).map((u) => preloadImage(u)));
}

export function clearImageCache() { __imgCache.clear(); }

export async function ensureFontsReady() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (_) {}
}

export default { preloadImage, preloadImages, clearImageCache, ensureFontsReady };

