import reportsState from './state.js';

export function loadExternalScript(src) {
  if (reportsState.loadedScripts.has(src)) {
    return reportsState.loadedScripts.get(src);
  }

  const existing = typeof document !== 'undefined'
    ? document.querySelector(`script[src="${src}"]`)
    : null;

  const promise = new Promise((resolve, reject) => {
    const handleResolve = () => {
      if (existing) {
        existing.dataset.loaded = 'true';
      }
      resolve();
    };

    const handleReject = (error) => reject(error);

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', handleResolve, { once: true });
      existing.addEventListener('error', handleReject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });

  reportsState.loadedScripts.set(src, promise);
  return promise;
}

export function ensureApexCharts() {
  if (typeof window !== 'undefined' && window.ApexCharts) {
    return Promise.resolve(window.ApexCharts);
  }
  if (!reportsState.apexChartsReady) {
    reportsState.apexChartsReady = loadExternalScript('https://cdn.jsdelivr.net/npm/apexcharts@3.53.0')
      .then(() => window.ApexCharts);
  }
  return reportsState.apexChartsReady;
}

function withTimeout(promise, ms = 1500) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => resolve(null), Math.max(200, ms));
    promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); resolve(null); });
  });
}

async function canUseLocalHtml2Pdf() {
  try {
    const res = await fetch('/vendor/html2pdf.bundle.min.js', { method: 'GET', cache: 'no-cache' });
    if (!res.ok) return false;
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!(type.includes('javascript') || type.includes('ecmascript'))) return false;
    // quick sniff: avoid loading HTML error pages as scripts
    const text = await res.text();
    if (!text || /<\s*!doctype\s+html/i.test(text)) return false;
    // Create script via blob to ensure proper MIME
    const blob = new Blob([text], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    await loadExternalScript(url);
    try { URL.revokeObjectURL(url); } catch(_) {}
    return typeof window.html2pdf !== 'undefined' ? true : false;
  } catch (_) { return false; }
}

export function ensureHtml2Pdf() {
  if (typeof window !== 'undefined' && window.html2pdf) {
    return Promise.resolve(window.html2pdf);
  }
  if (!reportsState.html2PdfReady) {
    // تحقّق أولاً من توفر الملف محلياً مع فحص نوع المحتوى، وإلا انتقل إلى CDN مع مهلة قصيرة
    reportsState.html2PdfReady = (async () => {
      const okLocal = await withTimeout(canUseLocalHtml2Pdf(), 1200);
      if (okLocal && window.html2pdf) return window.html2pdf;
      await withTimeout(loadExternalScript('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js'), 2000);
      return window.html2pdf || null;
    })();
  }
  return reportsState.html2PdfReady;
}

export function ensureXlsx() {
  if (typeof window !== 'undefined' && window.XLSX) {
    return Promise.resolve(window.XLSX);
  }
  if (!reportsState.xlsxReady) {
    reportsState.xlsxReady = loadExternalScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js')
      .then(() => window.XLSX);
  }
  return reportsState.xlsxReady;
}

export function ensureJsZip() {
  if (typeof window !== 'undefined' && window.JSZip) {
    return Promise.resolve(window.JSZip);
  }
  if (!reportsState.jsZipReady) {
    reportsState.jsZipReady = loadExternalScript('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js')
      .then(() => window.JSZip);
  }
  return reportsState.jsZipReady;
}

export default {
  loadExternalScript,
  ensureApexCharts,
  ensureHtml2Pdf,
  ensureXlsx,
  ensureJsZip,
};
