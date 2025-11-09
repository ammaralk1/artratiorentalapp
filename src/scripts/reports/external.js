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

export function ensureHtml2Pdf() {
  if (typeof window !== 'undefined' && window.html2pdf) {
    return Promise.resolve(window.html2pdf);
  }
  if (!reportsState.html2PdfReady) {
    // جرّب أولاً ملفاً محلياً إن كان متوفراً، ثم ارجع إلى CDN
    reportsState.html2PdfReady = loadExternalScript('/vendor/html2pdf.bundle.min.js')
      .catch(() => loadExternalScript('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js'))
      .then(() => window.html2pdf)
      .catch(() => null);
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
