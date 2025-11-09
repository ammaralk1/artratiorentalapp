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

// Wait for all <img> elements inside a container to finish loading
export function waitForImages(container = document) {
  try {
    const root = container || document;
    const imgs = Array.from(root.querySelectorAll ? root.querySelectorAll('img') : []);
    if (!imgs.length) return Promise.resolve();
    return Promise.all(imgs.map((img) => new Promise((resolve) => {
      try {
        if (img.complete && img.naturalWidth > 0) return resolve();
        const done = () => { try { img.removeEventListener('load', done); img.removeEventListener('error', done); } catch (_) {} resolve(); };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      } catch (_) { resolve(); }
    })));
  } catch (_) { return Promise.resolve(); }
}

export async function ensureAssetsReady(container = document) {
  await ensureFontsReady();
  await waitForImages(container);
}

export default { preloadImage, preloadImages, clearImageCache, ensureFontsReady, waitForImages, ensureAssetsReady };
