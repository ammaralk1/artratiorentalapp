import { ensureHtml2Pdf, loadExternalScript } from '../../reports/external.js';
import { ensureAssetsReady } from '../../templates/assets.js';
import { readPdfPref, readPdfPrefForPage } from './pdf';

interface PrintTemplatesPdfOptions {
  root?: HTMLElement | null;
  getType?: () => string;
  alertFn?: (message: string) => void;
}

interface RenderPdfLivePreviewOptions {
  root?: HTMLElement | null;
  getType?: () => string;
  slot?: HTMLElement | null;
}

function getCtx2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  try {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) return ctx;
  } catch {
    // ignore optimized-context failures
  }
  try {
    return canvas.getContext('2d');
  } catch {
    return null;
  }
}

function resolveCurrentType(getType?: () => string): string {
  try {
    return getType?.() || 'expenses';
  } catch {
    return 'expenses';
  }
}

export async function printTemplatesPdf(options: PrintTemplatesPdfOptions = {}): Promise<void> {
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  const host = options.root ?? document.querySelector<HTMLElement>('#templates-preview-host > #templates-a4-root');
  if (!host) {
    alertFn('لا يوجد محتوى للطباعة');
    return;
  }

  const type = resolveCurrentType(options.getType);
  const resolveOrientationForType = (templateType: string): 'portrait' | 'landscape' => {
    try {
      const key = `templatesPdf.orientation.${templateType}`;
      const value = readPdfPref(key, '');
      if (value === 'portrait' || value === 'landscape') return value;
    } catch {
      // ignore pref failures
    }
    return templateType === 'expenses' ? 'portrait' : 'landscape';
  };
  const orientation = resolveOrientationForType(type);

  try {
    if (type === 'callsheet') {
      const { printCallsheetFromHost } = await import('../../templates/print.js');
      await printCallsheetFromHost(host);
      return;
    }

    const { printGenericTemplate } = await import('../../templates/print.js');
    await printGenericTemplate(host, { orientation, filename: `template-${type}.pdf` });
  } catch {
    alertFn('تعذر إنشاء PDF');
  }
}

export async function renderPdfLivePreview(options: RenderPdfLivePreviewOptions = {}): Promise<void> {
  const host = options.root ?? document.querySelector<HTMLElement>('#templates-preview-host > #templates-a4-root');
  if (!host) return;

  const type = resolveCurrentType(options.getType);
  const landscape = type !== 'expenses';
  const slot = options.slot ?? document.getElementById('templates-pdf-live-slot');
  try {
    if (slot) slot.innerHTML = '<div style="padding:8px;color:#64748b">… جار إنشاء المعاينة</div>';
  } catch {
    // ignore slot state failures
  }

  try {
    await ensureHtml2Pdf();
  } catch {
    // ignore html2pdf preload failures
  }

  let html2canvasFn = window.html2canvas;
  if (typeof html2canvasFn !== 'function') {
    try {
      await loadExternalScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    } catch {
      // ignore load failures
    }
    html2canvasFn = window.html2canvas;
  }

  if (typeof html2canvasFn !== 'function') {
    if (slot) {
      slot.innerHTML = '<div style="padding:8px;color:#ef4444">تعذر تحميل html2canvas لمعاينة PDF. تأكد من اتصال الشبكة ثم أعد المحاولة.</div>';
    }
    return;
  }

  const A4_W_PX = landscape ? 1123 : 794;
  const A4_H_PX = landscape ? 794 : 1123;
  const A4_W_MM = landscape ? 297 : 210;
  const A4_H_MM = landscape ? 210 : 297;
  const CSS_DPI = 96;
  const PX_PER_MM = CSS_DPI / 25.4;

  const selectedPageValue = document.getElementById('pdftun-page')?.value;
  const pageIndex = Math.max(0, Number(selectedPageValue ?? 0) || 0);
  const pages = Array.from(host.querySelectorAll<HTMLElement>('.a4-page'));
  const page = pages[pageIndex] || pages[0];
  if (!page) return;

  const wrap = document.createElement('div');
  Object.assign(wrap.style, {
    position: 'fixed',
    top: '0',
    left: '-12000px',
    pointerEvents: 'none',
    zIndex: '-1',
    backgroundColor: '#ffffff',
  });
  const scope = document.createElement('div');
  scope.id = 'templates-a4-root';
  scope.setAttribute('data-render-context', 'export');
  scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
  const pagesWrap = document.createElement('div');
  pagesWrap.setAttribute('data-a4-pages', '');
  const clone = page.cloneNode(true) as HTMLElement;
  clone.style.width = `${A4_W_PX}px`;
  clone.style.height = `${A4_H_PX}px`;
  clone.style.background = '#ffffff';
  clone.style.overflow = 'hidden';

  try {
    const table = clone.querySelector('table.exp-details');
    const body = table?.tBodies?.[0];
    if (body) {
      const hasItems = !!body.querySelector('tr[data-row="item"]');
      const first = body.firstElementChild;
      if (hasItems && !(first && first.hasAttribute('data-group-bar'))) {
        let bar = clone.querySelector('tbody > tr[data-group-bar]');
        if (!bar) bar = page.querySelector('tbody > tr[data-group-bar]');
        if (bar) body.insertBefore(bar.cloneNode(true), body.firstElementChild);
      }
    }
  } catch {
    // ignore group-bar normalization failures
  }

  pagesWrap.appendChild(clone);
  scope.appendChild(pagesWrap);
  wrap.appendChild(scope);
  document.body.appendChild(wrap);

  const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
  const baseOpts = {
    scale: captureScale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    letterRendering: false,
    removeContainer: false,
  };
  const measureTopWhitespacePx = (canvas: HTMLCanvasElement, threshold = 246): number => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      for (let y = 0; y < height; y += 2) {
        const data = ctx.getImageData(0, y, width, 1).data;
        let dark = 0;
        for (let x = 0; x < width; x += 1) {
          const i = x * 4;
          if (data[i] < threshold || data[i + 1] < threshold || data[i + 2] < threshold) {
            if (++dark > Math.max(2, Math.ceil(width * 0.003))) return y;
          }
        }
      }
      return 0;
    } catch {
      return 0;
    }
  };
  const measureRightRegionContentTopPx = (canvas: HTMLCanvasElement, threshold = 244): number => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.55);
      const regionW = Math.max(10, width - xStart);
      const minDark = Math.max(3, Math.ceil(regionW * 0.015));
      for (let y = 0; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4;
          const r = data[i4];
          const g = data[i4 + 1];
          const b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) {
            if (++darkCount >= minDark) return y;
          }
        }
      }
      return 0;
    } catch {
      return 0;
    }
  };
  const measureContentTopIgnoringBorderPx = (canvas: HTMLCanvasElement, threshold = 244): number => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.2);
      const regionW = Math.max(10, Math.floor(width * 0.6));
      const minDark = Math.max(12, Math.ceil(regionW * 0.08));
      for (let y = 4; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4;
          const r = data[i4];
          const g = data[i4 + 1];
          const b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) {
            if (++darkCount >= minDark) return y;
          }
        }
      }
      return 0;
    } catch {
      return 0;
    }
  };
  const measureBottomWhitespacePx = (canvas: HTMLCanvasElement, threshold = 246): number => {
    try {
      const ctx = getCtx2d(canvas);
      if (!ctx) return 0;
      const { width, height } = canvas;
      for (let y = height - 1; y >= 0; y -= 2) {
        const data = ctx.getImageData(0, y, width, 1).data;
        let dark = 0;
        for (let x = 0; x < width; x += 1) {
          const i = x * 4;
          if (data[i] < threshold || data[i + 1] < threshold || data[i + 2] < threshold) {
            if (++dark > Math.max(2, Math.ceil(width * 0.003))) return height - 1 - y;
          }
        }
      }
      return 0;
    } catch {
      return 0;
    }
  };
  const cropCanvasVertical = (canvas: HTMLCanvasElement, topPx: number, bottomPx: number): HTMLCanvasElement => {
    try {
      const { width, height } = canvas;
      const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx)));
      const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx)));
      const nextHeight = Math.max(1, height - cropTop - cropBottom);
      if (cropTop === 0 && cropBottom === 0) return canvas;
      const out = document.createElement('canvas');
      out.width = width;
      out.height = nextHeight;
      const ctx = out.getContext('2d');
      ctx?.drawImage(canvas, 0, -cropTop);
      return out;
    } catch {
      return canvas;
    }
  };

  let headerTopCssPx = 0;
  try {
    const inner = clone.querySelector('.a4-inner') || clone;
    const header = inner.querySelector('.exp-masthead') || inner.firstElementChild;
    if (header) {
      const baseRect = clone.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();
      headerTopCssPx = Math.max(0, headerRect.top - baseRect.top);
    }
  } catch {
    headerTopCssPx = 0;
  }

  let canvas: HTMLCanvasElement | null = null;
  try {
    await ensureAssetsReady(scope);
    canvas = await html2canvasFn(clone, {
      ...baseOpts,
      scrollX: 0,
      scrollY: 0,
      windowWidth: A4_W_PX,
      windowHeight: A4_H_PX,
    });
  } finally {
    try {
      wrap.parentNode?.removeChild(wrap);
    } catch {
      // ignore cleanup failures
    }
  }
  if (!canvas) return;

  const topWhitePx = measureTopWhitespacePx(canvas, 246);
  const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
  const visualTopPx = measureContentTopIgnoringBorderPx(canvas, 244);
  const pageSelectorValue = document.getElementById('pdftun-page')?.value || 'all';
  const selectedIndex = pageSelectorValue === 'all' ? 0 : Math.max(0, Number(pageSelectorValue) || 0);
  const extraTrimMm = readPdfPrefForPage('templatesPdf.extraTrimMm', selectedIndex, Number(readPdfPref('templatesPdf.extraTrimMm', 14)) || 14);
  const safeMarginMm = readPdfPrefForPage('templatesPdf.safeMarginMm', selectedIndex, Number(readPdfPref('templatesPdf.safeMarginMm', 0.5)) || 0.5);
  const captureHeaderTopPx = Math.max(visualTopPx, headerTopCssPx * captureScale);
  const extraTrimPx = extraTrimMm * PX_PER_MM * captureScale;
  const safeMarginPx = safeMarginMm * PX_PER_MM * captureScale;
  const baseChosenTopPx = Math.max(topWhitePx, rightRegionTopPx, visualTopPx);
  const chosenTopPx = Math.min(Math.max(0, baseChosenTopPx + extraTrimPx), Math.max(0, captureHeaderTopPx - safeMarginPx));
  const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
  const cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);

  const prefsScale = Number(readPdfPref('templatesPdf.scalePct', 100)) / 100;
  const shrink = Math.max(0.98, Math.min(1, prefsScale || 1));
  const targetWmm = A4_W_MM * shrink;
  const targetHmm = (cropped.height / cropped.width) * targetWmm;
  const rightMm = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, Number(readPdfPref('templatesPdf.shiftRightMm', 40)) || 40);
  const globalRightAllMm = Number(readPdfPref('templatesPdf.globalAllRightMm', 0)) || 0;
  const baselineFudge = pageIndex === 0 ? Number(readPdfPref('templatesPdf.tightFudgeMm', -144.5)) || -144.5 : 0;
  const tightFudgeMm = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, baselineFudge);
  const globalYmm = Number(readPdfPref('templatesPdf.globalYmm', 0)) || 0;
  const globalAllYmm = Number(readPdfPref('templatesPdf.globalAllYmm', -1)) || -1;

  const finalXmm = rightMm + globalRightAllMm;
  const headerInCroppedMm = Math.max(0, headerTopCssPx * captureScale - chosenTopPx) * (targetWmm / cropped.width);
  const finalYmm = -headerInCroppedMm + tightFudgeMm + globalYmm + globalAllYmm;

  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = A4_W_PX;
  pageCanvas.height = A4_H_PX;
  const ctx = pageCanvas.getContext('2d');
  ctx?.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    try {
      ctx.drawImage(
        cropped,
        Math.round(finalXmm * PX_PER_MM),
        Math.round(finalYmm * PX_PER_MM),
        Math.round(targetWmm * PX_PER_MM),
        Math.round(targetHmm * PX_PER_MM),
      );
    } catch {
      // ignore draw failures
    }
  }

  if (slot) {
    slot.innerHTML = '';
    const img = document.createElement('img');
    img.src = pageCanvas.toDataURL('image/png');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.border = '1px solid #e5e7eb';
    slot.appendChild(img);
  }
}
