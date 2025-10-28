import { translate, formatDateInput, formatCurrency, formatNumber } from '../formatters.js';
import reportsState from '../state.js';
import { ensureHtml2Pdf, loadExternalScript } from '../external.js';
import reportsA4Css from '../../../styles/reportsA4.css?raw';

const CSS_DPI = 96;
const MM_PER_INCH = 25.4;
const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = Math.round((A4_W_MM / MM_PER_INCH) * CSS_DPI); // 794
const A4_H_PX = Math.round((A4_H_MM / MM_PER_INCH) * CSS_DPI); // 1123

function createRoot(context = 'preview') {
  const root = document.createElement('div');
  root.id = 'reports-a4-root';
  root.setAttribute('dir', document.documentElement.getAttribute('dir') || 'rtl');
  root.setAttribute('data-render-context', context);

  const style = document.createElement('style');
  style.textContent = String(reportsA4Css || '').trim();
  root.appendChild(style);

  const pages = document.createElement('div');
  pages.setAttribute('data-a4-pages', '');
  root.appendChild(pages);
  return root;
}

function buildHeader() {
  const box = document.createElement('div');
  box.className = 'rpt-header';
  const h1 = document.createElement('h1');
  h1.textContent = translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report');
  const sub = document.createElement('p');
  sub.className = 'rpt-subtitle';
  sub.textContent = `${formatDateInput(new Date())} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}`;
  box.appendChild(h1); box.appendChild(sub);
  return box;
}

function round2(n) { return Number.isFinite(Number(n)) ? Math.round(Number(n) * 100) / 100 : 0; }

function buildKpis() {
  const metrics = reportsState.lastSnapshot?.metrics || {};
  const k = document.createElement('div');
  k.className = 'rpt-kpis';
  const card = (label, value) => {
    const d = document.createElement('div');
    d.className = 'rpt-kpi';
    d.innerHTML = `<div class="label">${label}</div><div class="value">${value ?? '—'}</div>`;
    return d;
  };
  // تنسيق مضبوط: رقم صحيح للحجوزات، عملات بدقتين عشرية (تقريب .5 للأعلى)
  const totalLabel = formatNumber(metrics.total || 0);
  const revenueLabel = formatCurrency(round2(metrics.revenue));
  const netLabel = formatCurrency(round2(metrics.netProfit));
  const shareLabel = formatCurrency(round2(metrics.companyShareTotal));
  const taxLabel = formatCurrency(round2(metrics.taxTotal));
  const maintLabel = formatCurrency(round2(metrics.maintenanceExpense));

  k.appendChild(card(translate('reservations.reports.kpi.total.label', 'الحجوزات', 'Reservations'), totalLabel));
  k.appendChild(card(translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue'), revenueLabel));
  k.appendChild(card(translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net profit'), netLabel));
  k.appendChild(card(translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share'), shareLabel));
  k.appendChild(card(translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax'), taxLabel));
  k.appendChild(card(translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance'), maintLabel));
  return k;
}

function buildRevenueDetails() {
  const m = reportsState.lastSnapshot?.metrics || {};
  const wrap = document.createElement('section');
  const title = document.createElement('h4');
  title.className = 'rpt-revenue__title';
  title.textContent = translate('reservations.reports.kpi.revenue.details.title', 'تفاصيل الإيرادات', 'Revenue details');
  const grid = document.createElement('div');
  grid.className = 'rpt-revenue';

  const add = (label, value) => {
    const item = document.createElement('div');
    item.className = 'rpt-revenue__item';
    const l = document.createElement('span'); l.className = 'rpt-revenue__label'; l.textContent = label;
    const v = document.createElement('strong'); v.className = 'rpt-revenue__value'; v.textContent = value;
    item.appendChild(l); item.appendChild(v); grid.appendChild(item);
  };

  const fmt2 = (n) => formatCurrency(round2(n || 0));
  add(translate('reservations.reports.kpi.revenue.details.gross', 'الإيراد الكلي', 'Gross revenue'), fmt2(m.revenue));
  add(translate('reservations.reports.kpi.revenue.details.share', 'نسبة الشركة', 'Company share'), fmt2(m.companyShareTotal));
  add(translate('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'), fmt2(m.taxTotal));
  // عرض تفاصيل الطاقم (إجمالي للعميل وتكلفة على الشركة) إن توفرت
  add(translate('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'), fmt2(m.crewTotal));
  add(translate('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'), fmt2(m.crewCostTotal));
  // مصاريف الصيانة إن وُجدت ضمن snapshot
  if (Number.isFinite(Number(m.maintenanceExpense))) {
    add(translate('reservations.reports.kpi.revenue.details.maintenance', 'مصاريف الصيانة', 'Maintenance'), fmt2(m.maintenanceExpense));
  }
  add(translate('reservations.reports.kpi.revenue.details.net', 'صافي الربح', 'Net profit'), fmt2(m.netProfit));

  wrap.appendChild(title);
  wrap.appendChild(grid);
  return wrap;
}

function buildTable(headers) {
  const table = document.createElement('table');
  table.className = 'rpt-table';
  const thead = document.createElement('thead');
  const trh = document.createElement('tr');
  headers.forEach((h) => { const th = document.createElement('th'); th.textContent = h; trh.appendChild(th); });
  thead.appendChild(trh);
  const tbody = document.createElement('tbody');
  table.appendChild(thead); table.appendChild(tbody);
  return { table, tbody };
}

function paginateRows(rows, headers) {
  // نفس المنطق التقريبي، لكن ثابت ويضمن عدم تجاوز مساحة الصفحة
  const rowsPerFirst = 18;
  const rowsPerNext = 28;
  const chunks = [];
  for (let i = 0; i < rows.length; i += rowsPerNext) { chunks.push(rows.slice(i, i + rowsPerNext)); }
  if (chunks.length) {
    const first = chunks[0];
    if (first.length > rowsPerFirst) { const overflow = first.splice(rowsPerFirst); if (chunks.length > 1) chunks[1] = overflow.concat(chunks[1]); else chunks.push(overflow); }
  }
  return chunks;
}

export function buildA4ReportPages(rows = [], { context = 'preview' } = {}) {
  const root = createRoot(context);
  const pagesHost = root.querySelector('[data-a4-pages]');
  const model = Array.isArray(rows) && rows.length ? rows : (reportsState.lastSnapshot?.tableRows || []);
  const headers = Object.keys(model[0] || {});

  const chunks = paginateRows(model, headers);
  if (!chunks.length) chunks.push([]);

  chunks.forEach((chunk, index) => {
    const page = document.createElement('section');
    page.className = `a4-page ${index === 0 ? 'a4-page--primary' : 'a4-page--continuation'}`;
    page.style.width = `${A4_W_PX}px`;
    page.style.height = `${A4_H_PX}px`;
    const inner = document.createElement('div');
    inner.className = 'a4-inner';

    if (index === 0) {
      inner.appendChild(buildHeader());
      inner.appendChild(buildKpis());
      inner.appendChild(buildRevenueDetails());
    }

    const { table, tbody } = buildTable(headers);
    chunk.forEach((row) => {
      const tr = document.createElement('tr');
      headers.forEach((h) => {
        const td = document.createElement('td');
        const inner = document.createElement('div');
        inner.className = 'rpt-cell';
        inner.textContent = row[h] != null ? String(row[h]) : '';
        td.appendChild(inner);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    inner.appendChild(table);

    page.appendChild(inner);
    pagesHost.appendChild(page);
  });

  return root;
}

export async function exportA4ReportPdf(rows = [], { action = 'save' } = {}) {
  const root = buildA4ReportPages(rows, { context: 'export' });
  const host = document.createElement('div');
  Object.assign(host.style, { position: 'fixed', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none', zIndex: -1 });
  host.appendChild(root);
  document.body.appendChild(host);

  try {
    // Ensure html2pdf (bundled) then fall back to direct libs if needed
    try { await ensureHtml2Pdf(); } catch (_) {}

    let JsPdfCtor = (window.jspdf && window.jspdf.jsPDF)
      || (window.jsPDF && window.jsPDF.jsPDF)
      || (window.jspdf && window.jspdf.default && window.jspdf.default.jsPDF)
      || (window.jsPDF && window.jsPDF.default && window.jsPDF.default.jsPDF);
    let h2c = window.html2canvas;

    if (typeof JsPdfCtor !== 'function') {
      try {
        await loadExternalScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
        JsPdfCtor = (window.jspdf && window.jspdf.jsPDF)
          || (window.jsPDF && window.jsPDF.jsPDF)
          || (window.jsPDF && window.jsPDF.default && window.jsPDF.default.jsPDF)
          || (window.jspdf && window.jspdf.default && window.jspdf.default.jsPDF);
      } catch (_) {}
    }
    if (typeof h2c !== 'function') {
      try {
        await loadExternalScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
        h2c = window.html2canvas;
      } catch (_) {}
    }

    if (typeof JsPdfCtor !== 'function' || typeof h2c !== 'function') {
      const jsPdfOk = typeof JsPdfCtor === 'function';
      const h2cOk = typeof h2c === 'function';
      throw new Error(`PDF dependencies not available (jsPDF: ${jsPdfOk}, html2canvas: ${h2cOk})`);
    }

    const pdf = new JsPdfCtor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
    const captureScale = Math.min(2, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));

    const pages = Array.from(root.querySelectorAll('.a4-page'));
    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
      const canvas = await h2c(page, { scale: captureScale, scrollX: 0, scrollY: 0, backgroundColor: '#ffffff', useCORS: true, allowTaint: false, windowWidth: A4_W_PX, windowHeight: A4_H_PX, letterRendering: true, imageTimeout: 0 });
      const img = canvas.toDataURL('image/jpeg', 0.98);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, 'JPEG', 0, 0, A4_W_MM, A4_H_MM, `page-${i + 1}`, 'FAST');
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => requestAnimationFrame(r));
    }

    if (action === 'print') {
      // فتح مربع الطباعة مباشرة عبر iframe مخفي
      const blobUrl = pdf.output('bloburl');
      await new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        Object.assign(iframe.style, { position: 'fixed', right: 0, bottom: 0, width: '1px', height: '1px', border: 0 });
        iframe.onload = () => { try { iframe.contentWindow?.focus(); iframe.contentWindow?.print(); } catch (_) {} setTimeout(() => { iframe.remove(); resolve(); }, 700); };
        iframe.src = blobUrl; document.body.appendChild(iframe);
      });
    } else {
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'reservations-report.pdf'; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a); a.click();
      setTimeout(() => { try { URL.revokeObjectURL(url); a.remove(); } catch (_) {} }, 1500);
    }
  } finally {
    host.remove();
  }
}

export default { buildA4ReportPages, exportA4ReportPdf };
