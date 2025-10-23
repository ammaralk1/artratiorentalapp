import { translate, formatDateInput, formatNumber, formatCurrency } from '../formatters.js';
import { ensureHtml2Pdf, ensureXlsx } from '../external.js';
import {
  patchHtml2CanvasColorParsing,
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  revertStyleMutations
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

export async function exportAsPdf() {
  const container = document.getElementById('reservations-report-printable');
  if (!container) return;

  const html2pdf = await ensureHtml2Pdf();
  if (typeof html2pdf !== 'function') {
    console.warn('[reports] html2pdf unavailable, skipping PDF export');
    return;
  }

  const filename = getExportFileName('pdf');
  patchHtml2CanvasColorParsing();

  const mutations = [];
  sanitizeComputedColorFunctions(container, window, mutations);
  enforceLegacyColorFallback(container, window, mutations);

  try {
    await html2pdf().set({
      margin: 10,
      filename,
      html2canvas: {
        scale: 1.2,
        useCORS: true,
        allowTaint: false,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    }).from(container).save();
  } catch (error) {
    console.error('⚠️ [reports] export failed', error);
  } finally {
    revertStyleMutations(mutations);
  }
}

export async function exportReport(type, rows) {
  switch (type) {
    case 'pdf':
      await exportAsPdf();
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

  tbody.innerHTML = `
    <div class="reports-card">
      <div class="reports-card-header">
        <h3>${translate('reports.topCustomers.title', 'أفضل العملاء', 'Top Customers')}</h3>
      </div>
      <div class="reports-table-wrapper">
        <table class="reports-table">
          <thead>
            <tr>
              <th>${translate('reports.topCustomers.name', 'العميل', 'Customer')}</th>
              <th>${translate('reports.topCustomers.count', 'عدد الحجوزات', 'Bookings')}</th>
              <th>${translate('reports.topCustomers.revenue', 'الإيرادات', 'Revenue')}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="customer" data-search="${escapeAttribute(row.name)}">
                <td>${escapeHtml(row.name)}</td>
                <td>${formatNumber(row.count)}</td>
                <td>${formatCurrency(row.revenue)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`
    .join('');
}

export function renderTopEquipment(rows) {
  const tbody = document.getElementById('reports-top-equipment');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = `
    <div class="reports-card">
      <div class="reports-card-header">
        <h3>${translate('reports.topEquipment.title', 'المعدات الأكثر استخداماً', 'Most Used Equipment')}</h3>
      </div>
      <div class="reports-table-wrapper">
        <table class="reports-table">
          <thead>
            <tr>
              <th>${translate('reports.topEquipment.name', 'المعدة', 'Equipment')}</th>
              <th>${translate('reports.topEquipment.count', 'عدد الحجوزات', 'Bookings')}</th>
              <th>${translate('reports.topEquipment.revenue', 'الإيرادات', 'Revenue')}</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="equipment" data-search="${escapeAttribute(row.name)}">
                <td>${escapeHtml(row.name)}</td>
                <td>${formatNumber(row.count)}</td>
                <td>${formatCurrency(row.revenue)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`
    .join('');
}
