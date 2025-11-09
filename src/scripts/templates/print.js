import { ensureHtml2Pdf } from '../reports/external.js';
import { ensureFontsReady, preloadImages } from './assets.js';
import { pageHasMeaningfulContent } from './pageUtils.js';

function getPdfMode() {
  try { const v = String(localStorage.getItem('templatesPdf.mode')||'').trim(); return (v === 'html2pdf') ? 'html2pdf' : 'iframe'; } catch(_) { return 'iframe'; }
}

export async function printCallsheetFromHost(host) {
  if (!host) throw new Error('No host');
  let html2pdf = null;
  try { html2pdf = await ensureHtml2Pdf(); } catch (_) { html2pdf = null; }

  // Build isolated scope for clean export
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
  const scope = document.createElement('div');
  scope.id = 'templates-a4-root';
  scope.setAttribute('data-render-context', 'export');
  scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
  const pagesWrap = document.createElement('div'); pagesWrap.setAttribute('data-a4-pages', '');
  const clone = host.querySelector('[data-a4-pages]')?.cloneNode(true) || host.cloneNode(true);
  if (clone.classList && clone.hasAttribute('data-a4-pages')) scope.appendChild(clone); else pagesWrap.appendChild(clone), scope.appendChild(pagesWrap);
  wrap.appendChild(scope); document.body.appendChild(wrap);

  try {
    // Preload logos if present
    try {
      const logos = Array.from(scope.querySelectorAll('.cs-logo img')).map((img) => img.getAttribute('src')).filter(Boolean);
      await preloadImages(logos);
    } catch (_) {}
    await ensureFontsReady();

    // Remove blank pages
    Array.from(scope.querySelectorAll('.a4-page')).forEach((pg) => { if (!pageHasMeaningfulContent(pg)) pg.parentElement?.removeChild(pg); });

    const mode = getPdfMode();
    if (mode === 'html2pdf' && typeof html2pdf === 'function') {
      await html2pdf()
        .set({ margin: 0, html2canvas: { scale: 1.5, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }, pagebreak: { mode: ['css','legacy'] }, image: { type: 'jpeg', quality: 0.98 } })
        .from(scope)
        .save('template-callsheet.pdf');
      return;
    }
    // Fallback: print iframe
    const html = `<!doctype html><html dir="${scope.getAttribute('dir')||'rtl'}"><head><meta charset="utf-8"><title>Call Sheet</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0;padding:0;background:#fff}#templates-a4-root{transform:none!important}</style></head><body>${scope.innerHTML}</body></html>`;
    const frame = document.createElement('iframe');
    Object.assign(frame.style, { position:'fixed', right:'0', bottom:'0', width:'1px', height:'1px', border:'0' });
    document.body.appendChild(frame);
    const doc = frame.contentWindow?.document;
    if (doc) { doc.open(); doc.write(html); doc.close(); frame.onload = () => { try { frame.contentWindow?.focus(); frame.contentWindow?.print(); } catch(_) {} setTimeout(()=>frame.remove(), 1200); }; }
  } finally { try { wrap.remove(); } catch (_) {} }
}

// Generic print for non-Callsheet templates (e.g., Expenses, Shot List)
// Options: { orientation: 'portrait'|'landscape', filename?: string }
export async function printGenericTemplate(host, { orientation = 'portrait', filename = 'template.pdf' } = {}) {
  if (!host) throw new Error('No host');
  let html2pdf = null;
  try { html2pdf = await ensureHtml2Pdf(); } catch (_) { html2pdf = null; }

  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
  const scope = document.createElement('div');
  scope.id = 'templates-a4-root';
  scope.setAttribute('data-render-context', 'export');
  scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');

  const clonePages = host.querySelector('[data-a4-pages]')?.cloneNode(true) || host.cloneNode(true);
  if (clonePages.classList && clonePages.hasAttribute('data-a4-pages')) {
    scope.appendChild(clonePages);
  } else {
    const pagesWrap = document.createElement('div');
    pagesWrap.setAttribute('data-a4-pages', '');
    Array.from(host.children).forEach((c) => pagesWrap.appendChild(c.cloneNode(true)));
    scope.appendChild(pagesWrap);
  }
  wrap.appendChild(scope);
  document.body.appendChild(wrap);

  try {
    // Preload images (logos, etc.) and fonts
    try { const imgs = Array.from(scope.querySelectorAll('img')).map((i) => i.getAttribute('src')).filter(Boolean); await preloadImages(imgs); } catch(_) {}
    await ensureFontsReady();

    // Remove blank pages to avoid phantom pages
    Array.from(scope.querySelectorAll('.a4-page')).forEach((pg) => { if (!pageHasMeaningfulContent(pg)) try { pg.parentElement?.removeChild(pg); } catch(_) {} });

    const mode = getPdfMode();
    if (mode === 'html2pdf' && typeof html2pdf === 'function') {
      await html2pdf()
        .set({
          margin: 0,
          html2canvas: { scale: 1.5, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: (orientation === 'landscape' ? 'landscape' : 'portrait') },
          pagebreak: { mode: ['css','legacy'] },
          image: { type: 'jpeg', quality: 0.98 },
        })
        .from(scope)
        .save(filename);
      return;
    }
    // Fallback iframe printing
    const html = `<!doctype html><html dir="${scope.getAttribute('dir')||'rtl'}"><head><meta charset="utf-8"><title>Print</title><style>@page{size:A4 ${orientation};margin:0}html,body{margin:0;padding:0;background:#fff}#templates-a4-root{transform:none!important}</style></head><body>${scope.innerHTML}</body></html>`;
    const frame = document.createElement('iframe');
    Object.assign(frame.style, { position:'fixed', right:'0', bottom:'0', width:'1px', height:'1px', border:'0' });
    document.body.appendChild(frame);
    const doc = frame.contentWindow?.document;
    if (doc) { doc.open(); doc.write(html); doc.close(); frame.onload = () => { try { frame.contentWindow?.focus(); frame.contentWindow?.print(); } catch(_) {} setTimeout(()=>frame.remove(), 1200); }; }
  } finally { try { wrap.remove(); } catch (_) {} }
}

export default { printCallsheetFromHost, printGenericTemplate };
