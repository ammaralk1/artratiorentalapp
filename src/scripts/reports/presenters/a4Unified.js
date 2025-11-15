import { translate, formatDateInput, formatCurrency, formatNumber } from '../formatters.js';
import { paymentLabelText } from '../calculations.js';
import reportsState from '../state.js';
import { ensureHtml2Pdf, ensureXlsx, ensureJsZip, loadExternalScript } from '../external.js';
import reportsA4Css from '../../../styles/reportsA4.css?raw';

const CSS_DPI = 96;
const MM_PER_INCH = 25.4;
const A4_W_MM = 210;
const A4_H_MM = 297;
const A4_W_PX = Math.round((A4_W_MM / MM_PER_INCH) * CSS_DPI); // 794
const A4_H_PX = Math.round((A4_H_MM / MM_PER_INCH) * CSS_DPI); // 1123

function stripZeroDecimals(text) {
  try {
    if (!text) return text;
    return String(text).replace(/(\d{1,3}(?:,\d{3})*)\.00(?=\s*SR\b)/g, '$1');
  } catch (_) { return text; }
}

function loadHidePrefs() {
  try {
    return {
      header: localStorage.getItem('reportsPdf.hide.header') === '1',
      kpis: localStorage.getItem('reportsPdf.hide.kpis') === '1',
      revenue: localStorage.getItem('reportsPdf.hide.revenue') === '1',
      outstanding: localStorage.getItem('reportsPdf.hide.outstanding') === '1',
      crew: localStorage.getItem('reportsPdf.hide.crew') === '1',
      forecast: localStorage.getItem('reportsPdf.hide.forecast') === '1',
    };
  } catch (_) { return { header: false, kpis: false, revenue: false }; }
}

function applyHidePrefs(root, prefs) {
  if (!root || !prefs) return;
  root.toggleAttribute('data-hide-header', !!prefs.header);
  root.toggleAttribute('data-hide-kpis', !!prefs.kpis);
  root.toggleAttribute('data-hide-revenue', !!prefs.revenue);
  root.toggleAttribute('data-hide-outstanding', !!prefs.outstanding);
  root.toggleAttribute('data-hide-crew', !!prefs.crew);
  root.toggleAttribute('data-hide-forecast', !!prefs.forecast);
}

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

  // طبّق تفضيلات الإخفاء المحفوظة
  applyHidePrefs(root, loadHidePrefs());
  return root;
}

function buildHeader() {
  const box = document.createElement('div');
  box.className = 'rpt-header';

  const top = document.createElement('div');
  top.className = 'rpt-header-top';

  const titleBlock = document.createElement('div');
  titleBlock.className = 'rpt-titleblock';
  const h1 = document.createElement('h1');
  h1.textContent = translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report');
  const sub = document.createElement('p');
  sub.className = 'rpt-subtitle';
  sub.textContent = `${formatDateInput(new Date())} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}`;
  titleBlock.appendChild(h1);
  titleBlock.appendChild(sub);

  const logo = document.createElement('img');
  logo.className = 'rpt-logo';
  logo.alt = 'Logo';
  logo.decoding = 'async';
  logo.loading = 'lazy';
  logo.src = resolveLogoUrl();

  // RTL: العنوان يمين، اللوغو يسار
  top.appendChild(titleBlock);
  top.appendChild(logo);
  box.appendChild(top);
  return box;
}

function round2(n) { return Number.isFinite(Number(n)) ? Math.round(Number(n) * 100) / 100 : 0; }

function buildKpis({ context = 'preview' } = {}) {
  const metrics = reportsState.lastSnapshot?.metrics || {};
  const k = document.createElement('div');
  k.className = 'rpt-kpis';
  const card = (label, value) => {
    const d = document.createElement('div');
    d.className = 'rpt-kpi';
    d.innerHTML = `<div class="label">${label}</div><div class="value">${value ?? translate('common.placeholder.empty', '—', '—')}</div>`;
    return d;
  };
  // تنسيق مضبوط: رقم صحيح للحجوزات، عملات بدقتين عشرية (تقريب .5 للأعلى)
  const totalLabel = formatNumber(metrics.total || 0);
  const revenueLabel = formatCurrency(round2(metrics.revenue));
  const netLabel = formatCurrency(round2(metrics.netProfit));
  const shareLabel = formatCurrency(round2(metrics.companyShareTotal));
  const taxLabel = formatCurrency(round2(metrics.taxTotal));
  const maintLabel = formatCurrency(round2(metrics.maintenanceExpense));

  const maybe = (v) => (context === 'export' ? stripZeroDecimals(v) : v);
  k.appendChild(card(translate('reservations.reports.kpi.total.label', 'الحجوزات', 'Reservations'), totalLabel));
  k.appendChild(card(translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue'), maybe(revenueLabel)));
  k.appendChild(card(translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net profit'), maybe(netLabel)));
  k.appendChild(card(translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share'), maybe(shareLabel)));
  k.appendChild(card(translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax'), maybe(taxLabel)));
  k.appendChild(card(translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance'), maybe(maintLabel)));
  return k;
}

function buildRevenueDetails({ context = 'preview' } = {}) {
  const m = reportsState.lastSnapshot?.metrics || {};
  const wrap = document.createElement('section');
  wrap.className = 'rpt-revenue-section';
  const title = document.createElement('h4');
  title.className = 'rpt-revenue__title';
  title.textContent = translate('reservations.reports.kpi.revenue.details.title', 'تفاصيل الإيرادات', 'Revenue details');
  const grid = document.createElement('div');
  grid.className = 'rpt-revenue';

  const add = (label, value) => {
    const item = document.createElement('div');
    item.className = 'rpt-revenue__item';
    const l = document.createElement('span'); l.className = 'rpt-revenue__label'; l.textContent = label;
    const v = document.createElement('strong'); v.className = 'rpt-revenue__value'; v.textContent = context === 'export' ? stripZeroDecimals(value) : value;
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

function buildOutstandingSection({ context = 'preview' } = {}) {
  const list = (reportsState.lastSnapshot?.outstanding || []).slice(0, 6);
  const wrap = document.createElement('section');
  wrap.className = 'rpt-outstanding-section';
  const title = document.createElement('h4');
  title.className = 'rpt-outstanding__title';
  title.textContent = translate('reservations.reports.topOutstanding.title', 'أعلى المستحقات', 'Top outstanding');
  wrap.appendChild(title);

  if (!list.length) {
    const p = document.createElement('p');
    p.style.fontSize = '11px';
    p.style.opacity = '.8';
    p.textContent = translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.');
    wrap.appendChild(p);
    return wrap;
  }

  const table = document.createElement('table');
  table.className = 'rpt-outstanding__table';
  const thead = document.createElement('thead');
  const thr = document.createElement('tr');
  ['الحجز / العميل', 'حالة الدفع', 'المستحق'].forEach((label, idx) => {
    const th = document.createElement('th');
    const lbl = idx === 0
      ? translate('reservations.reports.topOutstanding.headers.reservation', 'الحجز / العميل', 'Reservation / Customer')
      : idx === 1
        ? translate('reservations.reports.topOutstanding.headers.status', 'حالة الدفع', 'Payment status')
        : translate('reservations.reports.topOutstanding.headers.amount', 'المستحق', 'Outstanding');
    th.textContent = lbl; thead.appendChild(th);
  });
  const tbody = document.createElement('tbody');
  list.forEach((row) => {
    const tr = document.createElement('tr');
    const c1 = document.createElement('td'); c1.textContent = `#${row.code} — ${row.customer || ''}`; tr.appendChild(c1);
    const c2 = document.createElement('td'); c2.textContent = paymentLabelText(row.paidStatus); tr.appendChild(c2);
    const c3 = document.createElement('td'); c3.textContent = context === 'export' ? stripZeroDecimals(formatCurrency(row.outstanding)) : formatCurrency(row.outstanding); tr.appendChild(c3);
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function buildCrewSection({ context = 'preview' } = {}) {
  const list = (reportsState.lastSnapshot?.crewWork || []).slice(0, 12);
  const wrap = document.createElement('section');
  wrap.className = 'rpt-crew-section';
  const title = document.createElement('h4');
  title.className = 'rpt-crew__title';
  title.textContent = translate('reservations.reports.crew.title', 'تقرير عمل الطاقم', 'Crew work report');
  wrap.appendChild(title);

  if (!list.length) {
    const p = document.createElement('p');
    p.style.fontSize = '11px';
    p.style.opacity = '.8';
    p.textContent = translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.');
    wrap.appendChild(p);
    return wrap;
  }

  const table = document.createElement('table');
  table.className = 'rpt-crew__table';
  const thead = document.createElement('thead');
  const thr = document.createElement('tr');
  const headers = [
    translate('reservations.reports.crew.headers.technician', 'الفني', 'Technician'),
    translate('reservations.reports.crew.headers.days', 'أيام العمل', 'Work days'),
    translate('reservations.reports.crew.headers.billable', 'فوتر الطاقم', 'Crew billable'),
    translate('reservations.reports.crew.headers.cost', 'تكلفة الطاقم', 'Crew cost'),
    translate('reservations.reports.crew.headers.net', 'صافي المساهمة', 'Net contribution'),
  ];
  headers.forEach((h) => { const th = document.createElement('th'); th.textContent = h; thr.appendChild(th); });
  thead.appendChild(thr);
  const tbody = document.createElement('tbody');
  list.forEach((row) => {
    const tr = document.createElement('tr');
    const cells = [
      row.name || String(row.id || ''),
      formatNumber(row.days || 0),
      context === 'export' ? stripZeroDecimals(formatCurrency(row.billable || 0)) : formatCurrency(row.billable || 0),
      context === 'export' ? stripZeroDecimals(formatCurrency(row.cost || 0)) : formatCurrency(row.cost || 0),
      context === 'export' ? stripZeroDecimals(formatCurrency((row.billable || 0) - (row.cost || 0))) : formatCurrency((row.billable || 0) - (row.cost || 0)),
    ];
    cells.forEach((v) => { const td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function buildForecastSection() {
  const list = Array.isArray(reportsState.lastSnapshot?.paymentForecast)
    ? reportsState.lastSnapshot.paymentForecast.slice(0, 16)
    : [];
  const wrap = document.createElement('section');
  wrap.className = 'rpt-forecast-section';
  const title = document.createElement('h4');
  title.className = 'rpt-forecast__title';
  title.textContent = translate('reservations.reports.forecast.title', 'خريطة الدفعات القادمة', 'Upcoming payments');
  wrap.appendChild(title);

  if (!list.length) {
    const p = document.createElement('p');
    p.style.fontSize = '11px';
    p.style.opacity = '.8';
    p.textContent = translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.');
    wrap.appendChild(p);
    return wrap;
  }

  const table = document.createElement('table');
  table.className = 'rpt-forecast__table';
  const thead = document.createElement('thead');
  const thr = document.createElement('tr');
  const headers = [
    translate('reservations.reports.forecast.headers.date', 'التاريخ', 'Date'),
    translate('reservations.reports.forecast.headers.count', 'عدد الحجوزات', 'Count'),
    translate('reservations.reports.forecast.headers.amount', 'المبلغ المتوقع', 'Expected amount'),
  ];
  headers.forEach((h) => { const th = document.createElement('th'); th.textContent = h; thr.appendChild(th); });
  thead.appendChild(thr);
  const tbody = document.createElement('tbody');
  list.forEach((row) => {
    const tr = document.createElement('tr');
    const cells = [row.date || '', formatNumber(row.count || 0), formatCurrency(row.amount || 0)];
    cells.forEach((v) => { const td = document.createElement('td'); td.textContent = v; tr.appendChild(td); });
    tbody.appendChild(tr);
  });
  table.appendChild(thead); table.appendChild(tbody);
  wrap.appendChild(table);
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

// تقسيم ديناميكي للصفوف بحسب الارتفاع الفعلي داخل إطار الصفحة
function paginateRowsDynamic(root, rows, headers, { context = 'preview' } = {}) {
  const pagesHost = root.querySelector('[data-a4-pages]');

  const startPage = (index) => {
    const page = document.createElement('section');
    page.className = `a4-page ${index === 0 ? 'a4-page--primary' : 'a4-page--continuation'}`;
    page.style.width = `${A4_W_PX}px`;
    page.style.height = `${A4_H_PX}px`;
    const inner = document.createElement('div');
    inner.className = 'a4-inner';

    if (index === 0) {
      inner.appendChild(buildHeader());
      inner.appendChild(buildKpis({ context }));
      inner.appendChild(buildRevenueDetails({ context }));
      inner.appendChild(buildOutstandingSection({ context }));
      inner.appendChild(buildForecastSection());
      inner.appendChild(buildCrewSection({ context }));
      const tableTitle = document.createElement('h4');
      tableTitle.className = 'rpt-table-title';
      tableTitle.textContent = translate('reservations.reports.results.title', 'تفاصيل الحجوزات', 'Reservations details');
      inner.appendChild(tableTitle);
    }

    const { table, tbody } = buildTable(headers);
    inner.appendChild(table);
    page.appendChild(inner);
    pagesHost.appendChild(page);
    return { page, table, tbody };
  };

  const addRow = (tbody, row) => {
    const tr = document.createElement('tr');
    headers.forEach((h) => {
      const td = document.createElement('td');
      const inner = document.createElement('div');
      inner.className = 'rpt-cell';
      let value = row[h] != null ? String(row[h]) : '';
      if (context === 'export') {
        value = value.replace(/(\d{1,3}(?:,\d{3})*)\.00(?=\s*SR\b)/g, '$1');
      }
      inner.textContent = value;
      td.appendChild(inner);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    return tr;
  };

  const fitsOnPage = (page, tbodyEl) => {
    try {
      const inner = page.querySelector('.a4-inner') || page;
      const pageRect = inner.getBoundingClientRect();
      const last = tbodyEl.lastElementChild;
      if (!last) return true;
      const lastRect = last.getBoundingClientRect();
      const limit = pageRect.bottom - 1; // هامش أمان صغير داخل الحشوات
      return lastRect.bottom <= limit;
    } catch (_) { return true; }
  };

  let pageIndex = 0;
  let { page, table, tbody } = startPage(pageIndex);
  let rowsOnCurrentPage = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const tr = addRow(tbody, rows[i]);
    if (!fitsOnPage(page, tbody)) {
      // تراجع عن الصف
      tr.remove();
      // إذا لم يتم رسم أي صف بعد على هذه الصفحة، لا تترك جدولاً برأس فقط في أسفل الصفحة
      if (rowsOnCurrentPage === 0) {
        try {
          // أزل الجدول الحالي من الصفحة، وانقل عنوان القسم (إن وُجد) للصفحة التالية مع الجدول
          table.remove();
          const titleEl = page.querySelector('.rpt-table-title');
          ({ page, table, tbody } = startPage(++pageIndex));
          if (titleEl) {
            const innerNext = page.querySelector('.a4-inner') || page;
            innerNext.insertBefore(titleEl, table);
          }
          addRow(tbody, rows[i]);
          rowsOnCurrentPage = 1;
          continue;
        } catch (_) { /* fallthrough */ }
      }
      ({ page, table, tbody } = startPage(++pageIndex));
      addRow(tbody, rows[i]);
      rowsOnCurrentPage = 1;
    } else {
      rowsOnCurrentPage += 1;
    }
  }
}

function isCoreHeaderLabel(label = '') {
  const s = String(label || '').toLowerCase();
  return (
    /الحجز|reservation/.test(s)
    || /العميل|customer/.test(s)
    || /التاريخ|date/.test(s)
    || /الحالة|status/.test(s)
    || /الدفع|payment/.test(s)
    || /الإجمالي|total/.test(s)
  );
}

function loadColumnPrefs(headers = []) {
  try {
    const visible = new Set();
    headers.forEach((h) => {
      const key = `reportsPdf.column.${h}`;
      const v = localStorage.getItem(key);
      if (v == null) {
        // Default: show core headers only; others hidden until toggled
        if (isCoreHeaderLabel(h)) visible.add(h);
      } else if (v === '1') {
        visible.add(h);
      }
    });
    // If nothing selected (e.g., no detection matched), fall back to all
    if (visible.size === 0) headers.forEach((h) => visible.add(h));
    return visible;
  } catch (_) { return new Set(headers); }
}

function saveColumnPref(header, isVisible) {
  try { localStorage.setItem(`reportsPdf.column.${header}`, isVisible ? '1' : '0'); } catch (_) {}
}

function resolveDarkMode() {
  try {
    const themeAttr = document.documentElement.getAttribute('data-theme') || '';
    if (themeAttr.toLowerCase().includes('dark')) return true;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
  } catch (_) {}
  return false;
}

function filterRowsByPrefs(rows, headers, prefs) {
  if (!prefs) return rows;
  const showPaid = prefs.showPaid ?? true;
  const showPartial = prefs.showPartial ?? true;
  const showUnpaid = prefs.showUnpaid ?? true;
  const showConfirmed = prefs.showConfirmed ?? true;
  const showPending = prefs.showPending ?? true;
  const showCompleted = prefs.showCompleted ?? true;
  const showCancelled = prefs.showCancelled ?? true;

  // Locate important columns by label (supports ar/en)
  const statusKey = headers.find((h) => /الحالة|status/i.test(h)) || null;
  const paymentKey = headers.find((h) => /الدفع|payment/i.test(h)) || null;
  if (!statusKey && !paymentKey) return rows;

  const isPartialLabel = (txt) => /جزئ|partial/i.test(String(txt || ''));
  const isPaidLabel = (txt) => /مدفوعة|مدفوع|paid/i.test(String(txt || '')) && !isPartialLabel(txt);
  const isUnpaidLabel = (txt) => /غير مدفوعة|غير مدفوع|unpaid/i.test(String(txt || ''));
  const statusVal = (txt) => {
    const s = String(txt || '').toLowerCase();
    if (/completed|منته/.test(s)) return 'completed';
    if (/confirmed|مؤكد/.test(s)) return 'confirmed';
    if (/pending|غير مؤكد|قيد التأكيد/.test(s)) return 'pending';
    if (/cancel|ملغ/.test(s)) return 'cancelled';
    return 'other';
  };

  return rows.filter((r) => {
    let ok = true;
    if (paymentKey) {
      const ptxt = r[paymentKey];
      if (!showPaid && isPaidLabel(ptxt)) ok = false;
      if (!showPartial && isPartialLabel(ptxt)) ok = false;
      if (!showUnpaid && isUnpaidLabel(ptxt)) ok = false;
    }
    if (statusKey) {
      const st = statusVal(r[statusKey]);
      if (!showCompleted && st === 'completed') ok = false;
      if (!showConfirmed && st === 'confirmed') ok = false;
      if (!showPending && st === 'pending') ok = false;
      if (!showCancelled && st === 'cancelled') ok = false;
    }
    return ok;
  });
}

export function buildA4ReportPages(rows = [], { context = 'preview', columns, rowFilters } = {}) {
  const root = createRoot(context);
  const model = Array.isArray(rows) && rows.length ? rows : (reportsState.lastSnapshot?.tableRows || []);
  let headers = Object.keys(model[0] || {});

  // Column visibility
  const prefVisible = columns && columns.length ? new Set(columns) : loadColumnPrefs(headers);
  headers = headers.filter((h) => prefVisible.has(h));

  const filteredModel = filterRowsByPrefs(model, headers, rowFilters);

  // أرفق الجذر مؤقتًا لقياس الأحجام بدقة ثم نفصلُه
  const phantom = document.createElement('div');
  Object.assign(phantom.style, { position: 'fixed', left: 0, top: 0, width: `${A4_W_PX}px`, height: '0', pointerEvents: 'none', zIndex: -1, visibility: 'hidden' });
  document.body.appendChild(phantom);
  phantom.appendChild(root);

  try {
    paginateRowsDynamic(root, filteredModel, headers, { context });
  } finally {
    try { root.parentElement?.removeChild(root); } catch (_) {}
    try { phantom.parentElement?.removeChild(phantom); } catch (_) {}
  }

  return root;
}

export async function exportA4ReportPdf(rows = [], { action = 'save', strict = false, popupWindow = null } = {}) {
  const rowFilters = {
    showPaid: localStorage.getItem('reportsPdf.rows.paid') !== '0',
    showPartial: localStorage.getItem('reportsPdf.rows.partial') !== '0',
    showUnpaid: localStorage.getItem('reportsPdf.rows.unpaid') !== '0',
    showConfirmed: localStorage.getItem('reportsPdf.rows.confirmed') !== '0',
    showPending: localStorage.getItem('reportsPdf.rows.pending') !== '0',
    showCompleted: localStorage.getItem('reportsPdf.rows.completed') !== '0',
    showCancelled: localStorage.getItem('reportsPdf.rows.cancelled') !== '0',
  };
  const root = buildA4ReportPages(rows, { context: 'export', rowFilters });
  const host = document.createElement('div');
  Object.assign(host.style, { position: 'fixed', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none', zIndex: -1 });
  host.appendChild(root);
  document.body.appendChild(host);

  try {
    const STRICT_NATIVE = strict || (localStorage.getItem('reportsPdf.strict') === 'on');
    if (STRICT_NATIVE) {
      // طباعة/حفظ أصلية بنفس الـ HTML لضمان تطابق 100%
      // في iOS يُفضّل نافذة منبثقة تم فتحها من حدث المستخدم
      const html = `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report')}</title><style>@page{size:A4;margin:0;}html,body{margin:0;padding:0;background:#fff;direction:rtl;text-align:right;}#reports-a4-root{width:${A4_W_PX}px;height:auto} .a4-page{width:${A4_W_PX}px;height:${A4_H_PX}px} @media print { [data-a4-pages]{display:block!important}.a4-page{page-break-after:always;break-after:page}.a4-page:last-child{page-break-after:auto;break-after:auto}.a4-page,.a4-inner{break-inside:avoid;-webkit-column-break-inside:avoid} }</style></head><body></body></html>`;

      if (popupWindow && typeof popupWindow.document?.open === 'function') {
        // تمت تهيئة النافذة مسبقًا ضمن حدث المستخدم (لتفادي حظر النوافذ في iOS)
        const wdoc = popupWindow.document;
        try { wdoc.open(); wdoc.write(html); wdoc.close(); } catch (_) {}
        try {
          const clone = root.cloneNode(true);
          wdoc.body.appendChild(clone);
          if (wdoc.fonts?.ready) { await wdoc.fonts.ready; }
        } catch (_) {}
        await new Promise((r) => setTimeout(r, 60));
        try { popupWindow.focus(); popupWindow.print(); } catch (_) {}
        // أغلق النافذة بعد مهلة قصيرة (يتجاهله iOS أحيانًا، لا مشكلة)
        setTimeout(() => { try { popupWindow.close(); } catch (_) {} }, 1500);
        return;
      }

      // المسار التقليدي عبر iframe (لغير iOS)
      await new Promise((resolve) => setTimeout(resolve, 0));
      const iframe = document.createElement('iframe');
      Object.assign(iframe.style, { position: 'fixed', width: '1px', height: '1px', right: '0', bottom: '0', border: '0', opacity: '0', pointerEvents: 'none' });
      document.body.appendChild(iframe);
      const idoc = iframe.contentWindow?.document;
      try { idoc.open(); idoc.write(html); idoc.close(); } catch (_) {}
      try {
        const clone = root.cloneNode(true);
        idoc.body.appendChild(clone);
        if (idoc.fonts?.ready) { await idoc.fonts.ready; }
      } catch (_) {}
      await new Promise((r) => setTimeout(r, 60));
      try { iframe.contentWindow?.focus(); iframe.contentWindow?.print(); } catch (_) {}
      setTimeout(() => { try { iframe.remove(); } catch (_) {} }, 1500);
      return;
    }
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

    // طبّق تفضيلات الأعمدة/الصفوف عند التصدير أيضاً
    const selectedHeaders = (() => {
      try {
        const first = rows && rows[0] ? Object.keys(rows[0]) : Object.keys(reportsState.lastSnapshot?.tableRows?.[0] || {});
        const vis = loadColumnPrefs(first);
        return first.filter((h) => vis.has(h));
      } catch (_) { return null; }
    })();
    const rowFilters = {
      showPaid: localStorage.getItem('reportsPdf.rows.paid') !== '0',
      showUnpaid: localStorage.getItem('reportsPdf.rows.unpaid') !== '0',
      showConfirmed: localStorage.getItem('reportsPdf.rows.confirmed') !== '0',
      showPending: localStorage.getItem('reportsPdf.rows.pending') !== '0',
      showCompleted: localStorage.getItem('reportsPdf.rows.completed') !== '0',
    };
    const exportRoot = buildA4ReportPages(rows, { context: 'export', columns: selectedHeaders || undefined, rowFilters });
    host.innerHTML = '';
    host.appendChild(exportRoot);

    const pages = Array.from(exportRoot.querySelectorAll('.a4-page'));
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

// =========================
// Excel export (same template semantics)
// =========================
export async function exportA4ReportExcel(rows = []) {
  await ensureXlsx();
  const XLSX = window.XLSX;
  if (!XLSX) throw new Error('XLSX dependency not available');

  // Resolve headers/filters like PDF
  const first = rows && rows[0] ? Object.keys(rows[0]) : Object.keys(reportsState.lastSnapshot?.tableRows?.[0] || {});
  const visible = loadColumnPrefs(first);
  const headers = first.filter((h) => visible.has(h));
  const rowFilters = {
    showPaid: localStorage.getItem('reportsPdf.rows.paid') !== '0',
    showPartial: localStorage.getItem('reportsPdf.rows.partial') !== '0',
    showUnpaid: localStorage.getItem('reportsPdf.rows.unpaid') !== '0',
    showConfirmed: localStorage.getItem('reportsPdf.rows.confirmed') !== '0',
    showPending: localStorage.getItem('reportsPdf.rows.pending') !== '0',
    showCompleted: localStorage.getItem('reportsPdf.rows.completed') !== '0',
    showCancelled: localStorage.getItem('reportsPdf.rows.cancelled') !== '0',
  };
  const model = Array.isArray(rows) && rows.length ? rows : (reportsState.lastSnapshot?.tableRows || []);
  const filtered = filterRowsByPrefs(model, headers, rowFilters);

  // Sheet data: title + date + KPIs, then header row, then rows
  const title = translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report');
  const dateLine = `${formatDateInput(new Date())} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}`;
  const metrics = reportsState.lastSnapshot?.metrics || {};

  const aoa = [];
  aoa.push([title]);
  aoa.push([dateLine]);
  aoa.push([]);
  aoa.push([
    translate('reservations.reports.kpi.total.label', 'إجمالي الحجوزات', 'Total'), String(metrics.total ?? 0),
    translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue'), String(metrics.revenue ?? 0),
    translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net'), String(metrics.netProfit ?? 0),
  ]);
  aoa.push([
    translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share'), String(metrics.companyShareTotal ?? 0),
    translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax'), String(metrics.taxTotal ?? 0),
    translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance'), String(metrics.maintenanceExpense ?? 0),
  ]);
  aoa.push([]);
  aoa.push(headers);

  filtered.forEach((r) => {
    const row = headers.map((h) => (r[h] != null ? String(r[h]) : ''));
    aoa.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(aoa);

  // Merge title row across headers
  if (!ws['!merges']) ws['!merges'] = [];
  const lastCol = Math.max(1, headers.length) - 1;
  ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(3, lastCol) } });
  ws['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: Math.max(3, lastCol) } });

  // Auto width
  const colWidths = headers.map((h, i) => {
    const headerLen = (h || '').length + 2;
    let maxLen = headerLen;
    for (let r = 7; r < aoa.length; r += 1) {
      const cell = aoa[r][i] || '';
      maxLen = Math.max(maxLen, String(cell).length);
    }
    return { wch: Math.min(40, Math.max(10, maxLen)) };
  });
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, translate('reservations.reports.export.sheetName', 'الحجوزات', 'Reservations'));
  const fname = `${translate('reservations.reports.export.filePrefix', 'تقرير-الحجوزات', 'reservations-report')}.xlsx`;
  XLSX.writeFile(wb, fname);
}

// =========================
// CSV export (same template semantics)
// =========================
export async function exportA4ReportCsv(rows = []) {
  // Resolve headers/filters like PDF/Excel
  const first = rows && rows[0] ? Object.keys(rows[0]) : Object.keys(reportsState.lastSnapshot?.tableRows?.[0] || {});
  const visible = loadColumnPrefs(first);
  const headers = first.filter((h) => visible.has(h));
  const rowFilters = {
    showPaid: localStorage.getItem('reportsPdf.rows.paid') !== '0',
    showPartial: localStorage.getItem('reportsPdf.rows.partial') !== '0',
    showUnpaid: localStorage.getItem('reportsPdf.rows.unpaid') !== '0',
    showConfirmed: localStorage.getItem('reportsPdf.rows.confirmed') !== '0',
    showPending: localStorage.getItem('reportsPdf.rows.pending') !== '0',
    showCompleted: localStorage.getItem('reportsPdf.rows.completed') !== '0',
    showCancelled: localStorage.getItem('reportsPdf.rows.cancelled') !== '0',
  };
  const model = Array.isArray(rows) && rows.length ? rows : (reportsState.lastSnapshot?.tableRows || []);
  const filtered = filterRowsByPrefs(model, headers, rowFilters);

  const title = translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report');
  const dateLine = `${formatDateInput(new Date())} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}`;
  const metrics = reportsState.lastSnapshot?.metrics || {};
  const logoUrl = resolveLogoUrl();

  const escapeCsv = (val) => {
    const s = String(val ?? '');
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };

  const lines = [];
  lines.push(escapeCsv(title));
  lines.push(escapeCsv(dateLine));
  lines.push(`Logo,${escapeCsv(logoUrl)}`);
  lines.push('');
  lines.push([
    translate('reservations.reports.kpi.total.label', 'إجمالي الحجوزات', 'Total'), metrics.total ?? 0,
    translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue'), metrics.revenue ?? 0,
    translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net'), metrics.netProfit ?? 0,
  ].map(escapeCsv).join(','));
  lines.push([
    translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share'), metrics.companyShareTotal ?? 0,
    translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax'), metrics.taxTotal ?? 0,
    translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance'), metrics.maintenanceExpense ?? 0,
  ].map(escapeCsv).join(','));
  lines.push('');
  lines.push(headers.map(escapeCsv).join(','));

  filtered.forEach((row) => {
    const vals = headers.map((h) => escapeCsv(row[h] != null ? row[h] : ''));
    lines.push(vals.join(','));
  });

  // حاول إنشاء ZIP يحوي metadata.csv + data.csv + logo.png إن أمكن
  let zipped = false;
  try {
    await ensureJsZip();
    const JSZip = window.JSZip;
    if (JSZip) {
      const zip = new JSZip();
      const prefix = translate('reservations.reports.export.filePrefix', 'تقرير-الحجوزات', 'reservations-report');
      const metadata = ["\uFEFF" + lines.slice(0, lines.indexOf(headers.map(escapeCsv).join(','))).join('\n')];
      const dataSection = ["\uFEFF" + [headers.map(escapeCsv).join(','), ...filtered.map((r) => headers.map((h) => escapeCsv(r[h] ?? '')).join(','))].join('\n')];
      zip.file(`${prefix}-metadata.csv`, metadata.join(''));
      zip.file(`${prefix}.csv`, dataSection.join(''));
      // أضف الشعار إن أمكن
      try {
        const resp = await fetch(logoUrl, { mode: 'cors' });
        const blob = await resp.blob();
        zip.file('logo.png', blob);
      } catch (_) { /* ignore logo fetch errors */ }
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${prefix}.zip`; a.style.display = 'none';
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
      zipped = true;
    }
  } catch (_) { /* ignore zip errors */ }

  if (!zipped) {
    const csvBlob = new Blob(["\uFEFF" + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${translate('reservations.reports.export.filePrefix', 'تقرير-الحجوزات', 'reservations-report')}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }
}

const DEFAULT_LOGO_URL = 'https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png';
function resolveLogoUrl() {
  try {
    const v = localStorage.getItem('reportsPdf.logoUrl');
    if (v && /^https?:|^data:|^blob:/.test(v)) return v;
  } catch (_) {}
  return DEFAULT_LOGO_URL;
}
