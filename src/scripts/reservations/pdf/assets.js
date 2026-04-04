import { state } from './state.js';
import {
  TRANSPARENT_PIXEL_DATA_URL,
  SVG_DATA_URI_REGEX,
  HTML2CANVAS_SRC,
  JSPDF_SRC,
  HTML2PDF_SRC,
} from './constants.js';
import {
  logPdfWarn,
  logPdfDebug,
  isMobileSafariBrowser,
  isProbablyArabic,
  patchCanvasTextDirection,
  resolveSvgElementDimensions,
  isSvgImageSource,
} from './utils.js';
import { patchHtml2CanvasColorParsing } from '../../canvasColorUtils.js';
import { apiRequest } from '../../apiClient.js';
import { loadData, saveData } from '../../storage.js';

function decodeSvgDataUri(dataUri = '') {
  const commaIndex = dataUri.indexOf(',');
  if (commaIndex === -1) return '';
  const metadata = dataUri.slice(0, commaIndex);
  const payload = dataUri.slice(commaIndex + 1);
  try {
    if (/;base64/i.test(metadata)) {
      return typeof atob === 'function' ? atob(payload) : '';
    }
    return decodeURIComponent(payload);
  } catch (error) {
    console.warn('[reservations/pdf] failed to decode SVG data URI', error);
    return '';
  }
}

function loadImageElement(src, { crossOrigin } = {}) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (crossOrigin) {
      image.crossOrigin = crossOrigin;
    }
    image.onload = () => resolve(image);
    image.onerror = (event) => {
      const message = event?.message || `Unable to load image from ${src}`;
      reject(new Error(message));
    };
    image.src = src;
  });
}

async function rasterizeSvgContent(svgMarkup, dimensions = {}) {
  if (!svgMarkup) return null;
  const doc = document;
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const image = await loadImageElement(url);
    const canvas = doc.createElement('canvas');
    const width = Math.max(dimensions.width || image.naturalWidth || image.width || 0, 1);
    const height = Math.max(dimensions.height || image.naturalHeight || image.height || width, 1);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.warn('[reservations/pdf] failed to rasterize SVG content', error);
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function fetchSvgMarkup(src) {
  if (!src) return null;
  if (SVG_DATA_URI_REGEX.test(src)) {
    return decodeSvgDataUri(src);
  }

  try {
    const response = await fetch(src, {
      mode: 'cors',
      credentials: 'omit',
      cache: 'default'
    });
    if (!response.ok) {
      console.warn('[reservations/pdf] failed to fetch SVG image', src, response.status);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn('[reservations/pdf] error fetching SVG image', src, error);
    return null;
  }
}

async function convertSvgImageElement(img) {
  if (!img) return false;
  const src = img.getAttribute?.('src') || '';
  if (!isSvgImageSource(src)) return false;
  const svgMarkup = await fetchSvgMarkup(src);
  if (!svgMarkup) {
    img.dataset.svgRasterization = 'failed';
    img.setAttribute('src', TRANSPARENT_PIXEL_DATA_URL);
    return false;
  }
  const dataUrl = await rasterizeSvgContent(svgMarkup);
  if (!dataUrl) {
    img.dataset.svgRasterization = 'failed';
    img.setAttribute('src', TRANSPARENT_PIXEL_DATA_URL);
    return false;
  }
  img.dataset.svgOriginalSrc = src;
  img.setAttribute('src', dataUrl);
  img.setAttribute('data-rasterized', 'true');
  return true;
}

async function convertInlineSvgElement(svgElement) {
  if (!svgElement || svgElement.tagName?.toLowerCase() !== 'svg') return false;
  const serializer = new XMLSerializer();
  const markup = serializer.serializeToString(svgElement);
  const dimensions = resolveSvgElementDimensions(svgElement);
  const dataUrl = await rasterizeSvgContent(markup, dimensions);
  const doc = svgElement.ownerDocument || document;
  const replacement = doc.createElement('img');
  replacement.setAttribute('src', dataUrl || TRANSPARENT_PIXEL_DATA_URL);
  replacement.setAttribute('alt', svgElement.getAttribute('aria-label') || svgElement.getAttribute('title') || '');
  replacement.setAttribute('data-svg-replaced', 'true');
  if (svgElement.hasAttribute('class')) {
    replacement.setAttribute('class', svgElement.getAttribute('class'));
  }
  if (svgElement.hasAttribute('style')) {
    replacement.setAttribute('style', svgElement.getAttribute('style'));
  }
  const widthAttr = svgElement.getAttribute('width');
  const heightAttr = svgElement.getAttribute('height');
  if (widthAttr) replacement.setAttribute('width', widthAttr);
  if (heightAttr) replacement.setAttribute('height', heightAttr);

  svgElement.parentNode?.replaceChild(replacement, svgElement);
  return Boolean(dataUrl);
}

export async function rasterizeQuoteImages(root) {
  if (!root) return;
  const images = Array.from(root.querySelectorAll?.('img') || []);
  const inlinedSvgs = Array.from(root.querySelectorAll?.('svg') || []);

  const tasks = [];
  images.forEach((img) => {
    if (isSvgImageSource(img.getAttribute?.('src'))) {
      tasks.push(convertSvgImageElement(img));
    }
  });

  inlinedSvgs.forEach((svg) => {
    tasks.push(convertInlineSvgElement(svg));
  });

  if (tasks.length) {
    await Promise.allSettled(tasks);
  }
}

function createNoteCanvasRenderer(note, { pixelRatio = 1 } = {}) {
  if (!note) return null;
  const doc = note.ownerDocument || document;
  const view = doc.defaultView || window;
  const styles = view.getComputedStyle?.(note);
  if (!styles) return null;

  const parsePx = (value, fallback = 0) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const paddingTop = parsePx(styles.paddingTop);
  const paddingBottom = parsePx(styles.paddingBottom);
  const paddingRight = parsePx(styles.paddingRight);
  const paddingLeft = parsePx(styles.paddingLeft);
  const borderRadius = parsePx(styles.borderRadius);
  const fontSize = parsePx(styles.fontSize, 14);
  const lineHeight = (() => {
    const lh = styles.lineHeight;
    if (!lh || lh === 'normal') return fontSize * 1.6;
    const parsed = parsePx(lh, fontSize * 1.6);
    return parsed > 0 ? parsed : fontSize * 1.6;
  })();

  const maxWidth = Math.max(note.clientWidth || 0, note.scrollWidth || 0, parsePx(styles.width, 0));
  if (maxWidth <= 0) return null;

  const contentWidth = Math.max(1, maxWidth - paddingLeft - paddingRight);
  const textContent = note.textContent || '';
  const paragraphs = textContent.split(/\r?\n/);

  const canvas = doc.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const fontStyle = styles.fontStyle || 'normal';
  const fontVariant = styles.fontVariant || 'normal';
  const fontWeight = styles.fontWeight || '400';
  const fontFamily = styles.fontFamily || 'sans-serif';
  const fontStretch = styles.fontStretch || 'normal';

  const buildLine = (segments) => segments.join(' ');

  const lines = [];
  const measureTextWidth = (text) => ctx.measureText(text).width;

  ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize}px ${fontFamily}`;

  paragraphs.forEach((paragraph) => {
    const trimmed = paragraph.trim();
    if (trimmed.length === 0) {
      lines.push('');
      return;
    }

    const words = trimmed.split(/\s+/);
    let currentSegments = [];

    words.forEach((word, index) => {
      const sanitizedWord = word.trim();
      if (!sanitizedWord) return;
      const tentative = buildLine(currentSegments.concat(sanitizedWord));
      const width = measureTextWidth(tentative);
      if (width <= contentWidth || currentSegments.length === 0) {
        currentSegments.push(sanitizedWord);
        return;
      }

      lines.push(buildLine(currentSegments));
      currentSegments = [sanitizedWord];
    });

    if (currentSegments.length) {
      lines.push(buildLine(currentSegments));
    }
  });

  if (!lines.length) {
    lines.push('');
  }

  const totalHeight = paddingTop + paddingBottom + (lines.length * lineHeight);
  const scaledWidth = Math.ceil(Math.max(1, maxWidth) * pixelRatio);
  const scaledHeight = Math.ceil(Math.max(1, totalHeight) * pixelRatio);
  canvas.width = scaledWidth;
  canvas.height = scaledHeight;
  canvas.style.width = `${Math.max(1, maxWidth)}px`;
  canvas.style.height = `${Math.max(1, totalHeight)}px`;

  ctx.scale(pixelRatio, pixelRatio);

  const backgroundColor = styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)'
    ? styles.backgroundColor
    : '#ffffff';

  if (borderRadius > 0) {
    ctx.save();
    ctx.beginPath();
    const width = Math.max(1, maxWidth);
    const height = Math.max(1, totalHeight);
    const radius = Math.min(borderRadius, width / 2, height / 2);
    ctx.moveTo(radius, 0);
    ctx.lineTo(width - radius, 0);
    ctx.quadraticCurveTo(width, 0, width, radius);
    ctx.lineTo(width, height - radius);
    ctx.quadraticCurveTo(width, height, width - radius, height);
    ctx.lineTo(radius, height);
    ctx.quadraticCurveTo(0, height, 0, height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();
  }

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, Math.max(1, maxWidth), Math.max(1, totalHeight));

  ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = styles.color || '#000000';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'right';

  if ('direction' in ctx) {
    try {
      ctx.direction = 'rtl';
    } catch (error) {
      // Ignore failures, Safari < 15 may throw
    }
  }

  const paintX = Math.max(0, maxWidth - paddingRight);
  let paintY = paddingTop;

  lines.forEach((line) => {
    const renderLine = line.length ? line : ' ';
    ctx.fillText(renderLine, paintX, paintY, contentWidth);
    paintY += lineHeight;
  });

  const img = doc.createElement('img');
  let dataUrl;
  try {
    dataUrl = canvas.toDataURL('image/png');
  } catch (error) {
    logPdfWarn('note canvas toDataURL failed', error);
    return null;
  }
  img.src = dataUrl;
  img.alt = textContent;
  img.style.width = `${Math.max(1, maxWidth)}px`;
  img.style.height = `${Math.max(1, totalHeight)}px`;
  img.style.display = 'block';
  img.setAttribute('data-quote-note-image', 'true');

  return {
    image: img,
    canvas,
    totalHeight,
    width: maxWidth
  };
}

export function rasterizeQuoteNotes(root, { pixelRatio = 1 } = {}) {
  if (!root) return;
  if (!isMobileSafariBrowser()) return;
  const notes = Array.from(root.querySelectorAll?.('.quote-notes') || []);
  notes.forEach((note) => {
    if (!note || note.dataset.quoteNoteRasterized === 'true') return;
    if (!isProbablyArabic(note.textContent || '')) return;
    let rendered;
    try {
      rendered = createNoteCanvasRenderer(note, { pixelRatio });
    } catch (error) {
      logPdfWarn('failed to rasterize note content', error);
      rendered = null;
    }
    if (!rendered) return;
    note.dataset.quoteNoteRasterized = 'true';
    note.innerHTML = '';
    note.appendChild(rendered.image);
  });
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (error) => reject(error));
      if (existing.readyState === 'complete') {
        resolve();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}

function resolveJsPdfConstructor() {
  const candidates = [
    window.jspdf?.jsPDF,
    typeof window.jspdf === 'function' ? window.jspdf : null,
    window.jsPDF?.jsPDF,
    typeof window.jsPDF === 'function' ? window.jsPDF : null
  ].filter((candidate) => typeof candidate === 'function');
  return candidates.length ? candidates[0] : null;
}

function resolveHtml2Canvas() {
  return typeof window.html2canvas === 'function' ? window.html2canvas : null;
}

export async function ensureHtml2Canvas() {
  const existing = resolveHtml2Canvas();
  if (existing) return existing;

  if (!state.ensureHtml2CanvasPromise) {
    state.ensureHtml2CanvasPromise = loadExternalScript(HTML2CANVAS_SRC)
      .catch((error) => {
        state.ensureHtml2CanvasPromise = null;
        throw error;
      })
      .then(() => {
        const fn = resolveHtml2Canvas();
        if (!fn) {
          state.ensureHtml2CanvasPromise = null;
          throw new Error('تعذر تحميل مكتبة html2canvas المطلوبة.');
        }
        return fn;
      });
  }

  return state.ensureHtml2CanvasPromise;
}

export async function ensureJsPdf() {
  const existing = resolveJsPdfConstructor();
  if (existing) return existing;

  if (!state.ensureJsPdfPromise) {
    state.ensureJsPdfPromise = loadExternalScript(JSPDF_SRC)
      .catch((error) => {
        state.ensureJsPdfPromise = null;
        throw error;
      })
      .then(() => {
        const ctor = resolveJsPdfConstructor();
        if (!ctor) {
          state.ensureJsPdfPromise = null;
          throw new Error('تعذر تحميل مكتبة jsPDF المطلوبة.');
        }
        return ctor;
      });
  }

  return state.ensureJsPdfPromise;
}

export async function ensureHtml2Pdf() {
  if (!window.html2pdf) {
    await loadExternalScript(HTML2PDF_SRC);
  }
  if (window.html2pdf && !window.html2pdf.__artRatioConfigured) {
    const defaults = window.html2pdf.defaultOptions || window.html2pdf.defaultOpt || {};
    const html2canvasDefaults = { ...(defaults.html2canvas || {}) };
    html2canvasDefaults.useCORS = true;
    html2canvasDefaults.allowTaint = false;
    html2canvasDefaults.logging = true;

    const jsPdfDefaults = { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true, ...(defaults.jsPDF || {}) };

    const mergedDefaults = {
      image: { type: 'jpeg', quality: 0.95, ...(defaults.image || {}) },
      margin: defaults.margin ?? [0, 0, 0, 0],
      filename: defaults.filename || 'document.pdf',
      html2canvas: html2canvasDefaults,
      jsPDF: jsPdfDefaults
    };

    window.html2pdf.defaultOptions = mergedDefaults;
    window.html2pdf.defaultOpt = mergedDefaults;
    window.html2pdf.__artRatioConfigured = true;
  }
  patchHtml2CanvasColorParsing();
  patchCanvasTextDirection();
}

export async function ensurePackagesAvailable() {
  try {
    const snapshot = loadData();
    const existing = Array.isArray(snapshot?.packages) ? snapshot.packages : [];
    if (existing.length > 0) return;
    const response = await apiRequest('/packages/?all=1');
    const data = Array.isArray(response?.data) ? response.data : (Array.isArray(response) ? response : []);
    if (data.length) {
      saveData({ packages: data });
      document.dispatchEvent?.(new CustomEvent('packages:changed', { detail: { packages: data } }));
    }
  } catch (_) {
    // ignore network errors; fallback to whatever is in cache
  }
}

export function waitForImage(image) {
  if (!image) return Promise.resolve();
  if (image.complete) {
    return image.naturalHeight === 0
      ? Promise.reject(new Error(`image failed to load: ${image.src || 'unknown'}`))
      : Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const handleLoad = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(new Error(`image failed to load: ${image.src || 'unknown'}`));
    };
    const cleanup = () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });
  });
}

export async function waitForQuoteAssets(root) {
  if (!root) return;
  const doc = root.ownerDocument || document;
  const view = doc.defaultView || window;
  const images = Array.from(root.querySelectorAll?.('img') || []);
  const fontPromise = doc.fonts?.ready ? doc.fonts.ready : Promise.resolve();
  const imagePromises = images.map((img) => waitForImage(img));
  const assetPromises = [fontPromise, ...imagePromises].map((promise) => (
    promise.catch((error) => {
      logPdfWarn('asset load failed', error);
      // notifyQuoteAssetFailure is in modal.js — import lazily to avoid circular init
      import('./modal.js').then(({ notifyQuoteAssetFailure }) => {
        notifyQuoteAssetFailure();
      }).catch(() => {});
      return null;
    })
  ));

  await Promise.all(assetPromises);
  await new Promise((resolve) => view.requestAnimationFrame(() => resolve()));
}
