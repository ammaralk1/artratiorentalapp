import { translate, formatDateInput, formatNumber, formatCurrency, formatDateTime } from '../formatters.js';
import reportsState from '../state.js';
import { ensureHtml2Pdf } from '../external.js';
import quotePdfStyles from '../../../styles/quotePdf.css?raw';
import {
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions,
} from '../../canvasColorUtils.js';
import { computeReservationFinancials, computeReportStatus, paymentLabelText } from '../calculations.js';
import { normalizeNumbers } from '../../utils.js';

const CSS_DPI = 96;
const MM_PER_INCH = 25.4;
const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = Math.round((A4_W_MM / MM_PER_INCH) * CSS_DPI);
const A4_H_PX = Math.round((A4_H_MM / MM_PER_INCH) * CSS_DPI);
const PX_PER_MM = CSS_DPI / MM_PER_INCH;

// Browser detection similar to reservationPdf.js
const SAFARI_REGEX = /safari/i;
const IOS_REGEX = /(iphone|ipad|ipod)/i;
const IOS_EXCLUDED = /(crios|fxios|edgios|opios)/i;
function isIosSafari() {
  try {
    const ua = navigator.userAgent || '';
    return IOS_REGEX.test(ua) && SAFARI_REGEX.test(ua) && !IOS_EXCLUDED.test(ua);
  } catch (_) { return false; }
}
function isMobileViewport() { try { return Math.min(window.innerWidth, window.innerHeight) <= 820; } catch (_) { return false; } }

function createRoot(context = 'preview') {
  const root = document.createElement('div');
  root.id = 'quotation-pdf-root';
  root.setAttribute('dir', document.documentElement.getAttribute('dir') || 'rtl');
  root.setAttribute('data-quote-render-context', context);
  const style = document.createElement('style');
  style.textContent = String(quotePdfStyles || '').trim();
  root.appendChild(style);
  const pages = document.createElement('div');
  pages.className = 'quote-preview-pages';
  pages.setAttribute('data-quote-pages', '');
  root.appendChild(pages);

  // Extra report-specific CSS (inside same encapsulated scope)
  const extra = document.createElement('style');
  extra.textContent = `
    .rpt-header { display:flex; flex-direction:column; gap:6px; }
    .rpt-header h1 { margin:0; font-weight:800; font-size:18px; text-align:right; }
    .rpt-subtitle { margin:0; font-size:12px; opacity:.8; text-align:right; }
    .rpt-kpis { display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin:8px 0 4px; }
    .rpt-kpi { border:1px solid #e5e7eb; border-radius:10px; padding:8px 10px; background:#fff; }
    .rpt-kpi .label { font-size:11px; opacity:.8; }
    .rpt-kpi .value { font-weight:700; font-size:14px; }
    .rpt-table { width:100%; border-collapse:collapse; font-size:12px; color:#000 !important; }
    .rpt-table th { background:#f3f4f6 !important; color:#000 !important; border:1px solid #e5e7eb; padding:6px 8px; text-align:right; font-weight:800; }
    .rpt-table td { background:#ffffff !important; color:#000 !important; border:1px solid #e5e7eb; padding:6px 8px; text-align:right; }
    /* force light mode inside PDF root regardless of app theme */
    #quotation-pdf-root, #quotation-pdf-root * { color:#000 !important; background:#fff !important; box-shadow:none !important; filter:none !important; }
    #quotation-pdf-root { color-scheme: light; }
    /* تطابق كامل بين المعاينة والتصدير دون تغييرات خاصة بالتصدير */
  `;
  root.appendChild(extra);

  return root;
}

function loadAlignmentPrefs() {
  try {
    const right = Number(localStorage.getItem('reportsPdf.shiftRightMm'));
    const top = Number(localStorage.getItem('reportsPdf.shiftTopMm'));
    const scalePct = Number(localStorage.getItem('reportsPdf.scalePct'));
    return {
      rightMm: Number.isFinite(right) ? right : 6,
      topMm: Number.isFinite(top) ? top : -10,
      scale: Number.isFinite(scalePct) ? Math.max(90, Math.min(100, scalePct)) / 100 : 0.985,
    };
  } catch (_) {
    return { rightMm: 6, topMm: -10, scale: 0.985 };
  }
}

function saveAlignmentPrefs({ rightMm, topMm, scale }) {
  try {
    localStorage.setItem('reportsPdf.shiftRightMm', String(rightMm));
    localStorage.setItem('reportsPdf.shiftTopMm', String(topMm));
    localStorage.setItem('reportsPdf.scalePct', String(Math.round((scale || 1) * 1000) / 10));
  } catch (_) {}
}

function buildPreviewControls(root) {
  try {
    const prefs = loadAlignmentPrefs();
    const panel = document.createElement('div');
    panel.setAttribute('data-rpt-controls', '');
    Object.assign(panel.style, {
      position: 'sticky',
      top: '6px',
      zIndex: '10',
      display: 'inline-flex',
      gap: '6px',
      alignItems: 'center',
      background: 'rgba(15, 23, 42, 0.75)',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,.35)'
    });
    const style = 'min-width:68px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,.25);background:#fff;color:#111;padding:0 6px;';
    panel.innerHTML = `
      <span style="opacity:.9">محاذاة PDF</span>
      <label style="display:inline-flex;gap:4px;align-items:center;">
        <span style="opacity:.85">يمين(mm)</span>
        <input type="number" step="0.5" value="${prefs.rightMm}" data-rpt-right style="${style}">
      </label>
      <label style="display:inline-flex;gap:4px;align-items:center;">
        <span style="opacity:.85">أعلى(mm)</span>
        <input type="number" step="0.5" value="${prefs.topMm}" data-rpt-top style="${style}">
      </label>
      <label style="display:inline-flex;gap:4px;align-items:center;">
        <span style="opacity:.85">تقليص(%)</span>
        <input type="number" step="0.1" min="90" max="100" value="${Math.round(prefs.scale*1000)/10}" data-rpt-scale style="${style}">
      </label>
      <button type="button" data-rpt-apply style="height:28px;border-radius:8px;background:#22c55e;color:#0b1e15;border:0;padding:0 10px;font-weight:700;">تطبيق</button>
      <button type="button" data-rpt-reset style="height:28px;border-radius:8px;background:#cbd5e1;color:#0b1e15;border:0;padding:0 10px;">إعادة ضبط</button>
    `;

    // place panel before pages (top of root)
    const pagesHost = root.querySelector('[data-quote-pages]');
    root.insertBefore(panel, pagesHost);

    const applyTransform = () => {
      const rightMm = Number(panel.querySelector('[data-rpt-right]').value);
      const topMm = Number(panel.querySelector('[data-rpt-top]').value);
      const scalePct = Number(panel.querySelector('[data-rpt-scale]').value);
      const scale = Math.max(0.9, Math.min(1, scalePct / 100));
      // save
      saveAlignmentPrefs({ rightMm, topMm, scale });
      // visually apply to preview pages
      const shiftX = rightMm * PX_PER_MM;
      const shiftY = topMm * PX_PER_MM;
      Object.assign(pagesHost.style, { transformOrigin: 'top left', transform: `translate(${shiftX}px, ${shiftY}px) scale(${scale})` });
    };
    panel.querySelector('[data-rpt-apply]').addEventListener('click', applyTransform);
    panel.querySelector('[data-rpt-reset]').addEventListener('click', () => {
      panel.querySelector('[data-rpt-right]').value = 0;
      panel.querySelector('[data-rpt-top]').value = 0;
      panel.querySelector('[data-rpt-scale]').value = 100;
      saveAlignmentPrefs({ rightMm: 0, topMm: 0, scale: 1 });
      const pagesHost = root.querySelector('[data-quote-pages]');
      Object.assign(pagesHost.style, { transform: 'none' });
    });

    // apply current prefs initially
    const shiftX = prefs.rightMm * PX_PER_MM;
    const shiftY = prefs.topMm * PX_PER_MM;
    Object.assign(pagesHost.style, { transformOrigin: 'top left', transform: `translate(${shiftX}px, ${shiftY}px) scale(${prefs.scale})` });
  } catch (_) {}
}

function createPage({ primary = false } = {}) {
  const page = document.createElement('div');
  page.className = 'quote-page';
  if (primary) page.classList.add('quote-page--primary');
  return page;
}

function buildHeader(metrics) {
  const wrap = document.createElement('div');
  wrap.className = 'rpt-header';
  const h1 = document.createElement('h1');
  h1.textContent = translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report');
  const sub = document.createElement('p');
  sub.className = 'rpt-subtitle';
  sub.textContent = `${formatDateInput(new Date())} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}`;
  wrap.appendChild(h1);
  wrap.appendChild(sub);

  const kpis = document.createElement('div');
  kpis.className = 'rpt-kpis';
  const card = (label, value) => {
    const d = document.createElement('div');
    d.className = 'rpt-kpi';
    d.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>`;
    return d;
  };
  kpis.appendChild(card(translate('reservations.reports.kpi.total.label', 'الحجوزات', 'Reservations'), formatNumber(metrics.total || 0)));
  kpis.appendChild(card(translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue'), formatCurrency(metrics.revenue || 0)));
  kpis.appendChild(card(translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net profit'), formatCurrency(metrics.netProfit || 0)));
  kpis.appendChild(card(translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share'), formatCurrency(metrics.companyShareTotal || 0)));
  kpis.appendChild(card(translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax'), formatCurrency(metrics.taxTotal || 0)));
  kpis.appendChild(card(translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance'), formatCurrency(metrics.maintenanceExpense || 0)));

  wrap.appendChild(kpis);
  return wrap;
}

function buildExportRowsFromState() {
  try {
    const data = reportsState?.data || {};
    const filtered = reportsState?.lastSnapshot?.filtered || data.reservations || [];
    const customers = new Map((data.customers || []).map((c) => [String(c.id), c]));
    // Sort by date desc
    const sorted = [...filtered].sort((a, b) => new Date(b?.start || 0) - new Date(a?.start || 0));
    const exportHeaders = {
      code: translate('reservations.reports.results.headers.id', 'الحجز', 'Reservation'),
      customer: translate('reservations.reports.results.headers.customer', 'العميل', 'Customer'),
      date: translate('reservations.reports.results.headers.date', 'التاريخ', 'Date'),
      status: translate('reservations.reports.results.headers.status', 'الحالة', 'Status'),
      payment: translate('reservations.reports.results.headers.payment', 'الدفع', 'Payment'),
      total: translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
      share: translate('reservations.reports.results.headers.share', 'نسبة الشركة', 'Company share'),
      net: translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit'),
    };
    const headers = [
      exportHeaders.code,
      exportHeaders.customer,
      exportHeaders.date,
      exportHeaders.status,
      exportHeaders.payment,
      exportHeaders.total,
      exportHeaders.share,
      exportHeaders.net,
    ];
    const rows = sorted.map((res) => {
      const rawCode = res?.reservationId || res?.id || '—';
      const codeText = normalizeNumbers(String(rawCode));
      const customer = customers.get(String(res?.customerId));
      const customerName = customer?.customerName || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer');
      const dateLabel = formatDateTime(res?.start);
      const statusInfo = computeReportStatus(res);
      const statusText = (() => {
        switch (statusInfo.statusValue) {
          case 'completed':
            return String(translate('reservations.list.status.completed', 'منتهي', 'Completed')).replace(/^\W+/, '');
          case 'confirmed':
            return String(translate('reservations.list.status.confirmed', 'مؤكد', 'Confirmed')).replace(/^\W+/, '');
          case 'pending':
            return String(translate('reservations.list.status.pending', 'غير مؤكد', 'Pending')).replace(/^\W+/, '');
          default:
            return normalizeNumbers(String(statusInfo.statusValue || '—'));
        }
      })();
      const paymentText = paymentLabelText(statusInfo.paidStatus);
      const fin = computeReservationFinancials(res);
      const totalLabel = formatCurrency(fin.finalTotal);
      const shareLabel = fin.companySharePercent > 0
        ? `${formatNumber(fin.companySharePercent)}% (${formatCurrency(fin.companyShareAmount)})`
        : translate('reservations.reports.results.share.none', 'بدون نسبة الشركة', 'No company share');
      const netLabel = formatCurrency(fin.netProfit);
      return {
        [exportHeaders.code]: codeText,
        [exportHeaders.customer]: customerName,
        [exportHeaders.date]: dateLabel,
        [exportHeaders.status]: statusText,
        [exportHeaders.payment]: paymentText,
        [exportHeaders.total]: totalLabel,
        [exportHeaders.share]: shareLabel,
        [exportHeaders.net]: netLabel,
      };
    });
    return { headers, rows };
  } catch (e) {
    console.warn('[reports/pdf] failed to build export rows from state', e);
    return { headers: [], rows: [] };
  }
}

function buildTable(headers) {
  const table = document.createElement('table');
  table.className = 'rpt-table';
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  headers.forEach((h) => {
    const th = document.createElement('th'); th.textContent = h; trh.appendChild(th);
  });
  thead.appendChild(trh);
  const tbody = document.createElement('tbody');
  table.appendChild(thead); table.appendChild(tbody);
  return { table, tbody };
}

function paginateRowsIntoPages(root, rows, headers, metrics) {
  const pagesHost = root.querySelector('[data-quote-pages]');
  const primary = createPage({ primary: true });
  pagesHost.appendChild(primary);
  const header = buildHeader(metrics);
  primary.appendChild(header);

  // Table on first page
  let { table, tbody } = buildTable(headers);
  primary.appendChild(table);

  // Heuristic pagination to avoid measurement edge-cases on some browsers
  // - الصفحة الأولى تحوي هيدر + KPI، لذا نضع عدد صفوف أقل.
  // - الصفحات التالية تحمل صفوف أكثر.
  const rowsPerFirstPage = 18;
  const rowsPerNextPage = 28;

  const chunks = [];
  for (let i = 0; i < rows.length; i += rowsPerNextPage) {
    chunks.push(rows.slice(i, i + rowsPerNextPage));
  }
  // Ensure first chunk smaller to account for header block
  if (chunks.length) {
    const first = chunks[0];
    if (first.length > rowsPerFirstPage) {
      const overflow = first.splice(rowsPerFirstPage);
      if (chunks.length > 1) {
        chunks[1] = overflow.concat(chunks[1]);
      } else {
        chunks.push(overflow);
      }
    }
  }

  // Fill first page body
  const addRow = (hostTbody, row) => {
    const tr = document.createElement('tr');
    headers.forEach((h) => {
      const td = document.createElement('td');
      td.textContent = row[h] != null ? String(row[h]) : '';
      tr.appendChild(td);
    });
    hostTbody.appendChild(tr);
  };

  const firstRows = chunks.shift() || rows;
  firstRows.forEach((r) => addRow(tbody, r));

  // Other pages
  chunks.forEach((group) => {
    const page = createPage({ primary: false });
    pagesHost.appendChild(page);
    const built = buildTable(headers);
    page.appendChild(built.table);
    group.forEach((r) => addRow(built.tbody, r));
  });
}

export function buildReportsPdfPages(rows = [], { context = 'preview' } = {}) {
  const snapshot = reportsState.lastSnapshot || {};
  const metrics = snapshot.metrics || {};
  let headers;
  let rowModels = rows && rows.length ? rows : null;
  if (!rowModels) {
    const built = buildExportRowsFromState();
    headers = built.headers;
    rowModels = built.rows;
  } else {
    headers = Object.keys(rowModels[0] || {});
  }

  const root = createRoot(context);
  // Attach temporarily for measurement
  const phantom = document.createElement('div');
  phantom.style.position = 'fixed';
  phantom.style.left = '-10000px';
  phantom.style.top = '0';
  phantom.style.width = `${A4_W_PX}px`;
  phantom.style.zIndex = '-1';
  document.body.appendChild(phantom);
  phantom.appendChild(root);

  // Sanitize colors to avoid html2canvas oddities
  try {
    scrubUnsupportedColorFunctions(root);
    sanitizeComputedColorFunctions(root);
    enforceLegacyColorFallback(root);
  } catch (_) {}

  paginateRowsIntoPages(root, rowModels || [], headers, metrics);

  // Detach from phantom; return root for caller to insert where needed
  root.parentElement?.removeChild(root);
  phantom.parentElement?.removeChild(phantom);
  // Add preview alignment controls
  if (context === 'preview') {
    buildPreviewControls(root);
  }
  return root;
}

export async function exportReportsPdf(rows = [], { action = 'save' } = {}) {
  const root = buildReportsPdfPages(rows, { context: 'export' });
  const container = document.createElement('div');
  Object.assign(container.style, { position: 'fixed', top: '0', left: '0', pointerEvents: 'none', zIndex: '-1' });
  container.appendChild(root);
  document.body.appendChild(container);

  try {
    // مسار صارم يطابق المعاينة 100% عبر الطباعة الأصلية للمتصفح (Save as PDF)
    // هذا يضمن استخدام نفس HTML/CSS بدون تحويل إلى Canvas
    const STRICT_NATIVE_PRINT = true;
    if (STRICT_NATIVE_PRINT) {
      const printWindow = window.open('', '_blank');
      if (!printWindow) throw new Error('Popup blocked');
      const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report')}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;} /* ضمان إظهار كل صفحة كتلة مطبوعة */ .quote-preview-pages{gap:0 !important} .quote-page{box-shadow:none !important;border-radius:0 !important}</style></head><body></body></html>`;
      try { printWindow.document.open(); printWindow.document.write(html); printWindow.document.close(); } catch (_) {}
      // استخدم نسخة من الجذر حتى لا ننقل العقد بين المستندات
      const cloneRoot = root.cloneNode(true);
      try { printWindow.document.body.appendChild(cloneRoot); } catch (_) {}
      // انتظر تحميل الخطوط/الصور
      try { if (printWindow.document?.fonts?.ready) { await printWindow.document.fonts.ready; } } catch (_) {}
      await new Promise((r) => setTimeout(r, 60));
      try { printWindow.focus(); printWindow.print(); } catch (_) {}
      // لا نغلق النافذة تلقائياً لإتاحة "حفظ كـ PDF" للمستخدم
      return;
    }

    // iOS Safari قد يحظر النوافذ المنبثقة إن لم تُفتح قبل حدث المستخدم
    const safariPopupRequired = isIosSafari() && !isMobileViewport();
    const safariWindow = safariPopupRequired ? window.open('', '_blank') : null;
    if (safariWindow) {
      try {
        safariWindow.document.open();
        safariWindow.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${translate('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...', 'Preparing PDF...')}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${translate('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...', 'Preparing PDF...')}</h1><p>${translate('reservations.quote.status.exportingHint', 'قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار...', 'This may take a few seconds...')}</p></div></body></html>`);
        safariWindow.document.close();
      } catch (_) {}
    }

    await ensureHtml2Pdf();
    try { if (document?.fonts?.ready) { await document.fonts.ready; } } catch (_) {}
    const JsPdfCtor = (window.jspdf && window.jspdf.jsPDF) || (window.jsPDF && window.jsPDF.jsPDF);
    const h2c = window.html2canvas;

    if (typeof JsPdfCtor === 'function' && typeof h2c === 'function') {
      const prefs = loadAlignmentPrefs();
      const pdf = new JsPdfCtor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
      const baseOpts = { scale: captureScale, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', letterRendering: false, removeContainer: false }; 

      const pages = Array.from(root.querySelectorAll('.quote-page'));
      let pdfPageIndex = 0;
      // Helper: يقيس عدد البيكسلات البيضاء من أعلى/أسفل الصورة لتحديد الفراغات
      const measureTopWhitespacePx = (canvas, threshold = 250) => {
        try {
          const ctx = canvas.getContext('2d');
          const { width, height } = canvas;
          const row = new Uint8ClampedArray(width * 4);
          const isWhiteRow = (y) => {
            const data = ctx.getImageData(0, y, width, 1).data || row;
            let darkCount = 0;
            for (let x = 0; x < width; x += 1) {
              const i4 = x * 4;
              const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
              if (r < threshold || g < threshold || b < threshold) {
                darkCount += 1;
                if (darkCount > Math.max(2, Math.ceil(width * 0.003))) return false; // تحمّل بضع بكسلات غير بيضاء
              }
            }
            return true;
          };
          let top = 0;
          for (let y = 0; y < height; y += 2) { // نخطو سطرين لتسريع عملية المسح
            if (!isWhiteRow(y)) { top = y; break; }
          }
          return top;
        } catch (_) { return 0; }
      };
      // قياس أعلى محتوى في القسم الأيمن (حيث العنوان)، أدق من الفحص الكامل
      const measureRightRegionContentTopPx = (canvas, threshold = 245) => {
        try {
          const ctx = canvas.getContext('2d');
          const { width, height } = canvas;
          const xStart = Math.floor(width * 0.55);
          const regionW = Math.max(10, width - xStart);
          const minDark = Math.max(3, Math.ceil(regionW * 0.015));
          for (let y = 0; y < height; y += 2) {
            const data = ctx.getImageData(xStart, y, regionW, 1).data;
            let darkCount = 0;
            for (let x = 0; x < regionW; x += 1) {
              const i4 = x * 4;
              const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
              if (r < threshold || g < threshold || b < threshold) {
                darkCount += 1;
                if (darkCount >= minDark) return y;
              }
            }
          }
          return 0;
        } catch (_) { return 0; }
      };
      const measureBottomWhitespacePx = (canvas, threshold = 250) => {
        try {
          const ctx = canvas.getContext('2d');
          const { width, height } = canvas;
          const isWhiteRow = (y) => {
            const data = ctx.getImageData(0, y, width, 1).data;
            let darkCount = 0;
            for (let x = 0; x < width; x += 1) {
              const i4 = x * 4;
              const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
              if (r < threshold || g < threshold || b < threshold) {
                darkCount += 1;
                if (darkCount > Math.max(2, Math.ceil(width * 0.003))) return false;
              }
            }
            return true;
          };
          let bottom = 0;
          for (let y = height - 1; y >= 0; y -= 2) {
            if (!isWhiteRow(y)) { bottom = (height - 1 - y); break; }
          }
          return bottom;
        } catch (_) { return 0; }
      };
      // Helper: يقص أعلى/أسفل الصورة لإزالة الفراغ الأبيض دون تمديد
      const cropCanvasVertical = (canvas, topPx, bottomPx) => {
        try {
          const { width, height } = canvas;
          const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx)));
          const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx)));
          const newH = Math.max(1, height - cropTop - cropBottom);
          if (cropTop === 0 && cropBottom === 0) return canvas;
          const out = document.createElement('canvas');
          out.width = width; out.height = newH;
          const ctx = out.getContext('2d');
          ctx.drawImage(canvas, 0, -cropTop);
          return out;
        } catch (_) { return canvas; }
      };

      for (let i = 0; i < pages.length; i += 1) {
        const page = pages[i];
        const doc = page.ownerDocument || document;
        const wrap = doc.createElement('div');
        Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
        // أنشئ حاوية بنفس النطاق لتطبيق القواعد المعتمدة على #quotation-pdf-root
        const scope = doc.createElement('div');
        scope.id = 'quotation-pdf-root';
        scope.setAttribute('data-quote-render-context', 'export');
        // نجعل العرض ثابتاً لمضاهاة A4 بالبيكسل (مثل المعاينة)
        scope.style.width = `${A4_W_PX}px`;
        scope.style.maxWidth = `${A4_W_PX}px`;
        scope.style.minWidth = `${A4_W_PX}px`;
        scope.style.background = '#ffffff';
        const clone = page.cloneNode(true);
        clone.style.width = `${A4_W_PX}px`;
        clone.style.maxWidth = `${A4_W_PX}px`;
        clone.style.minWidth = `${A4_W_PX}px`;
        clone.style.height = `${A4_H_PX}px`;
        clone.style.maxHeight = `${A4_H_PX}px`;
        clone.style.minHeight = `${A4_H_PX}px`;
        clone.style.position = 'relative';
        clone.style.background = '#ffffff';
        clone.style.overflow = 'hidden';
        // حرك المحتوى داخل الصفحة للأعلى ليتوافق تماماً مع المعاينة
        try {
          const headerEl = clone.querySelector('.rpt-header') || clone.firstElementChild;
          if (headerEl) {
            const rect = headerEl.getBoundingClientRect();
            const baseRect = clone.getBoundingClientRect();
            const headerTopCssPx = Math.max(0, rect.top - baseRect.top);
            const desiredTopCssPx = (clone.classList.contains('quote-page--primary') ? 6 : 4) * PX_PER_MM;
            const deltaPx = headerTopCssPx - desiredTopCssPx;
            if (deltaPx > 0) {
              clone.style.transform = `translateY(${-deltaPx}px)`;
            }
          }
        } catch (_) {}
        scope.appendChild(clone);
        wrap.appendChild(scope);
        doc.body.appendChild(wrap);

        let canvas;
        try {
          // الالتقاط من العنصر نفسه داخل نطاق مسمى لضمان تطبيق CSS بدون إدراج مساحة إضافية من الحاوية
          canvas = await h2c(clone, { ...baseOpts, scrollX: 0, scrollY: 0, windowWidth: A4_W_PX, windowHeight: A4_H_PX });
        } finally {
          wrap.parentNode?.removeChild(wrap);
        }

        if (!canvas) continue;

        // قص الفراغ الأبيض العلوي/السفلي بدقة
        const topWhitePx = measureTopWhitespacePx(canvas, 246);
        const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
        // اختر الأكبر لضمان إزالة كل الفراغ حتى بداية المحتوى الفعلي يميناً
        const chosenTopPx = Math.max(topWhitePx, rightRegionTopPx);
        const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
        const cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);

        const shrink = Math.max(0.9, Math.min(1, prefs.scale || 1));
        const targetWmm = A4_W_MM * shrink;
        // احسب الارتفاع النهائي بناء على نسبة الصورة لتفادي تمديد رأسي
        const targetHmm = (cropped.height / cropped.width) * targetWmm;

        // تموضع أعلى-يسار (0,0) بدقة، مع إمكانية الإزاحة من الإعدادات
        let finalX = (Number(prefs.rightMm) || 0);
        // أضف هامش علوي صغير لمضاهاة padding-top في المعاينة
        const pageTopPaddingMm = page.classList.contains('quote-page--primary') ? 6 : 4;
        // محاذاة دقيقة: حدد موضع أعلى محتوى (rpt-header) قبل الالتقاط ثم حوّله إلى mm بعد القص
        // معايرة إضافية من الصورة نفسها: قِس أعلى محتوى في المنطقة اليمنى بعد القص
        const regionTopAfterCropPx = measureRightRegionContentTopPx(cropped, 244);
        const mmPerCanvasPx = targetWmm / cropped.width;
        const headerTopMm = regionTopAfterCropPx * mmPerCanvasPx; // يجب أن يكون قريباً من 0 إن أزيل الفراغ
        let finalY = (Number(prefs.topMm) || 0) + pageTopPaddingMm - headerTopMm;
        if (finalY < -60) finalY = -60; // قيد أمان

        const img = cropped.toDataURL('image/jpeg', 0.95);
        if (pdfPageIndex > 0) pdf.addPage();
        pdf.addImage(img, 'JPEG', finalX, finalY, targetWmm, targetHmm, `page-${pdfPageIndex + 1}`, 'FAST');
        pdfPageIndex += 1;
        // small yield
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => requestAnimationFrame(r));
      }

      if (pdfPageIndex === 0) throw new Error('PDF generation produced no pages');

      if (action === 'print') {
        const blobUrl = pdf.output('bloburl');
        if (safariWindow) {
          try { safariWindow.location.href = blobUrl; } catch (_) {}
        } else {
          await new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '1px', height: '1px', border: '0' });
            iframe.onload = () => { try { iframe.contentWindow?.focus(); iframe.contentWindow?.print(); } catch (_) {} setTimeout(() => { iframe.remove(); resolve(); }, 700); };
            iframe.src = blobUrl; document.body.appendChild(iframe);
          });
        }
      } else {
        pdf.save('reservations-report.pdf');
      }
    } else {
      // Fallback: html2pdf direct
      const chain = (window.html2pdf)().set({ margin: 10, html2canvas: { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, pagebreak: { mode: ['css', 'legacy'] }, image: { type: 'jpeg', quality: 0.98 } }).from(root).toPdf();
      if (action === 'print') {
        const blobUrl = await chain.get('pdf').then((pdf) => pdf.output('bloburl'));
        await new Promise((resolve) => { const iframe = document.createElement('iframe'); Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '1px', height: '1px', border: '0' }); iframe.onload = () => { try { iframe.contentWindow?.focus(); iframe.contentWindow?.print(); } catch (_) {} setTimeout(() => { iframe.remove(); resolve(); }, 700); }; iframe.src = blobUrl; document.body.appendChild(iframe); });
      } else {
        await chain.save('reservations-report.pdf');
      }
    }
  } finally {
    container.remove();
  }
}

export default { buildReportsPdfPages, exportReportsPdf };
