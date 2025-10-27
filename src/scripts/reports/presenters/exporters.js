import { translate, formatDateInput, formatNumber, formatCurrency } from '../formatters.js';
import reportsState from '../state.js';
import { ensureHtml2Pdf, ensureXlsx } from '../external.js';
import {
  patchHtml2CanvasColorParsing,
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  revertStyleMutations,
  scrubUnsupportedColorFunctions,
  injectExportSanitizer,
  removeExportSanitizer,
} from '../../canvasColorUtils.js';
import { escapeAttribute, escapeHtml } from './utils.js';

function getExportFileName(extension) {
  const stamp = formatDateInput(new Date()).replace(/-/g, '');
  const prefix = translate('reservations.reports.export.filePrefix', 'تقرير-الحجوزات', 'reservations-report');
  return `${prefix}-${stamp}.${extension}`;
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function exportAsCsv(rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];

  rows.forEach((row) => {
    const values = headers.map((header) => {
      const cell = String(row[header] ?? '').replace(/"/g, '""');
      return `"${cell}"`;
    });
    lines.push(values.join(','));
  });

  const csvContent = `\ufeff${lines.join('\r\n')}\r\n`;
  downloadBlob(csvContent, getExportFileName('csv'), 'text/csv;charset=utf-8;');
}

export async function exportAsExcel(rows) {
  try {
    const XLSX = await ensureXlsx();
    if (!XLSX) {
      exportAsCsv(rows);
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    const sheetName = translate('reservations.reports.export.sheetName', 'الحجوزات', 'Reservations');
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, getExportFileName('xlsx'));
  } catch (error) {
    console.error('⚠️ [reports] Excel export failed, falling back to CSV', error);
    exportAsCsv(rows);
  }
}

export function buildPdfReportElement(rows = []) {
  const snapshot = reportsState.lastSnapshot || {};
  const metrics = snapshot.metrics || {};
  const date = new Date();
  const wrapper = document.createElement('div');
  wrapper.id = 'reports-pdf-root';
  wrapper.setAttribute('dir', document.documentElement.getAttribute('dir') || 'rtl');
  // اجعل القالب مرئياً أعلى الصفحة للحظة أثناء الالتقاط لتفادي خروج الإطار عن نافذة html2canvas
  // ملاحظات: لا نستخدم visibility:hidden ولا opacity:0 لأنها قد تمنع الرسم.
  wrapper.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;background:#ffffff;width:100%;display:flex;justify-content:center;';

  const style = document.createElement('style');
  style.textContent = `
    /* عزل تام لألوان وضع الداكن داخل جذر التقرير */
    #reports-pdf-root, #reports-pdf-root * { color: #000 !important; background:#fff !important; box-sizing: border-box; box-shadow:none !important; outline:0 !important; }
    :where(html.dark-mode, body.dark-mode) #reports-pdf-root, :where(html.dark-mode, body.dark-mode) #reports-pdf-root * { color: #000 !important; }
    html, body { font-family: Tajawal, Arial, sans-serif; }
    /* استخدم حجم A4 بالملليمتر لضمان التوافق مع الطباعة */
    #reports-pdf-root { width: 210mm; margin: 0 auto; }
    .pdf { width: 210mm; padding: 10mm; color: #000; background: #fff; direction: rtl; margin: 0 auto; }
    .pdf h1 { margin: 0 0 8px; font-size: 22px; font-weight: 800; color:#000; }
    .pdf h1, .pdf .subtitle, .section-title { text-align: right; }
    .pdf .subtitle { margin: 0 0 18px; color: #000; font-size: 13px; opacity: 0.85; }
    .kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
    .kpi { border:1px solid #e5e7eb; border-radius:10px; padding:10px 12px; background:#fff; text-align: right; }
    .kpi .label { font-size: 12px; color: #000; opacity: 0.8; }
    .kpi .value { font-size: 16px; font-weight: 700; color:#000; }
    .section-title { margin: 14px 0 8px; font-weight: 800; font-size: 16px; color:#000; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; color:#000; }
    table, thead, tbody, tr, th, td { background:#fff !important; color:#000 !important; border-color:#e5e7eb !important; }
    tbody tr:hover { background:#fff !important; }
    .reservation-chip,
    .status-confirmed,
    .status-pending,
    .status-completed { background:#fff !important; color:#000 !important; border:1px solid #e5e7eb !important; box-shadow:none !important; }
    thead th { text-align: right; background: #f3f4f6 !important; border: 1px solid #e5e7eb; padding: 8px 10px; font-weight: 800; color:#000; }
    tbody td { border: 1px solid #e5e7eb; padding: 8px 10px; color:#000; text-align:right; }
    tbody tr:nth-child(even) td { background: #fafafa; }
  `;
  wrapper.appendChild(style);

  const root = document.createElement('div');
  root.className = 'pdf';
  root.innerHTML = `
    <h1>${translate('reservations.reports.print.title', 'تقرير الحجوزات', 'Reservations report')}</h1>
    <p class="subtitle">${formatDateInput(date)} • ${translate('reservations.reports.print.generated', 'تاريخ التوليد', 'Generated on')}</p>
    <div class="kpis">
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.total.label', 'الحجوزات', 'Reservations')}</div><div class="value">${formatNumber(metrics.total || 0)}</div></div>
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.revenue.label', 'الإيرادات', 'Revenue')}</div><div class="value">${formatCurrency(metrics.revenue || 0)}</div></div>
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.net.label', 'صافي الربح', 'Net profit')}</div><div class="value">${formatCurrency(metrics.netProfit || 0)}</div></div>
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.share.label', 'نسبة الشركة', 'Company share')}</div><div class="value">${formatCurrency(metrics.companyShareTotal || 0)}</div></div>
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.tax.label', 'الضريبة', 'Tax')}</div><div class="value">${formatCurrency(metrics.taxTotal || 0)}</div></div>
      <div class="kpi"><div class="label">${translate('reservations.reports.kpi.maintenance.label', 'مصاريف الصيانة', 'Maintenance')}</div><div class="value">${formatCurrency((metrics.maintenanceExpense) || 0)}</div></div>
    </div>
    <div class="section-title">${translate('reservations.reports.results.title', 'تفاصيل الحجوزات', 'Reservations details')}</div>
  `;

  // Build table
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headers = rows && rows.length ? Object.keys(rows[0]) : [
    translate('reservations.reports.results.headers.id', 'الحجز', 'Reservation'),
    translate('reservations.reports.results.headers.customer', 'العميل', 'Customer'),
    translate('reservations.reports.results.headers.date', 'التاريخ', 'Date'),
    translate('reservations.reports.results.headers.status', 'الحالة', 'Status'),
    translate('reservations.reports.results.headers.payment', 'الدفع', 'Payment'),
    translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
    translate('reservations.reports.results.headers.share', 'نسبة الشركة', 'Company share'),
    translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit'),
  ];

  const trHead = document.createElement('tr');
  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  (rows || []).forEach((row) => {
    const tr = document.createElement('tr');
    headers.forEach((h) => {
      const td = document.createElement('td');
      td.textContent = row[h] != null ? String(row[h]) : '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  root.appendChild(table);
  wrapper.appendChild(root);
  return wrapper;
}

export async function exportAsPdf(rows = []) {
  const { exportReportsPdf } = await import('./pdfPages.js');
  await exportReportsPdf(rows, { action: 'save' });
}

export async function exportReport(type, rows) {
  switch (type) {
    case 'pdf':
      await exportAsPdf(rows);
      break;
    case 'excel':
      await exportAsExcel(rows);
      break;
    case 'csv':
    default:
      exportAsCsv(rows);
      break;
  }
}

export function renderTopCustomers(rows) {
  const tbody = document.getElementById('reports-top-customers');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="customer" data-search="${escapeAttribute(row.name)}">
        <td>${escapeHtml(row.name)}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

export function renderTopEquipment(rows) {
  const tbody = document.getElementById('reports-top-equipment');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="equipment" data-search="${escapeAttribute(row.name)}">
        <td>${escapeHtml(row.name)}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}
