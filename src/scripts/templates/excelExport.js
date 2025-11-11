import { loadExternalScript } from '../reports/external.js';

let XLSX_STYLE_READY = null;

export function ensureXlsxStyled() {
  if (typeof window !== 'undefined' && window.XLSX && window.XLSX.utils) {
    // If already present, use it
    return Promise.resolve(window.XLSX);
  }
  if (!XLSX_STYLE_READY) {
    // Use xlsx-js-style to support cell styles (fonts, fills, borders)
    XLSX_STYLE_READY = loadExternalScript('https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.min.js')
      .then(() => window.XLSX);
  }
  return XLSX_STYLE_READY;
}

function rgb(hex) {
  const h = String(hex || '').replace('#','');
  if (h.length === 3) return h.split('').map((c)=>c+c).join('').toUpperCase();
  return h.slice(0, 6).toUpperCase();
}

function buildBorder(color = '#9CA3AF') {
  const c = { rgb: rgb(color) };
  return { top: { style: 'thin', color: c }, right: { style: 'thin', color: c }, bottom: { style: 'thin', color: c }, left: { style: 'thin', color: c } };
}

function aoaToSheetStyled(aoa, opts = {}) {
  const ws = {};
  const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
  const defaultCell = opts.defaultCellStyle || {};
  for (let r = 0; r < aoa.length; r += 1) {
    for (let c = 0; c < (aoa[r]?.length || 0); c += 1) {
      const cell = aoa[r][c];
      const addr = { r, c };
      if (range.e.r < r) range.e.r = r;
      if (range.e.c < c) range.e.c = c;
      if (cell == null) continue;
      const ref = window.XLSX.utils.encode_cell(addr);
      const v = (typeof cell === 'object' && cell !== null && 'v' in cell) ? cell.v : cell;
      const t = typeof v === 'number' ? 'n' : 's';
      const s = (typeof cell === 'object' && cell !== null && cell.s) ? cell.s : defaultCell;
      ws[ref] = { v, t, s };
    }
  }
  ws['!ref'] = window.XLSX.utils.encode_range(range);
  if (Array.isArray(opts.cols)) ws['!cols'] = opts.cols;
  if (Array.isArray(opts.rows)) ws['!rows'] = opts.rows;
  return ws;
}

function tableToAoa(table) {
  const rows = Array.from(table.querySelectorAll('tr'));
  const aoa = [];
  rows.forEach((tr, r) => {
    const cells = Array.from(tr.children);
    const row = [];
    cells.forEach((td) => {
      const tag = (td.tagName || '').toLowerCase();
      const text = (td.textContent || '').replace(/\u00A0/g, ' ').trim();
      const isHeader = tag === 'th' || td.classList.contains('cs-crew-title') || td.classList.contains('cs-cast-title');
      const style = isHeader
        ? {
            font: { bold: true, color: { rgb: rgb('#FFFFFF') } },
            fill: { patternType: 'solid', fgColor: { rgb: rgb('#2563EB') } },
            alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
            border: buildBorder('#9CA3AF'),
          }
        : {
            alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
            border: buildBorder('#CBD5E1'),
          };
      row.push({ v: text, s: style });
    });
    aoa.push(row);
  });
  return aoa;
}

export async function exportCallsheetToExcel(root) {
  const XLSX = await ensureXlsxStyled();
  const wb = XLSX.utils.book_new();

  const find = (sel) => root && root.querySelector(sel);

  const addTable = (selector, name, widths) => {
    const table = find(selector);
    if (!table) return;
    const aoa = tableToAoa(table);
    const ws = aoaToSheetStyled(aoa, { cols: (widths || []).map((w) => ({ wch: w })) });
    XLSX.utils.book_append_sheet(wb, ws, name);
  };

  addTable('.callsheet-v1 .cs-roles', 'Roles', [22, 38]);
  addTable('.callsheet-v1 .cs-times', 'Times', [22, 30]);
  addTable('.callsheet-v1 .cs-cast', 'Cast Calls', [16, 16, 16, 16, 16, 16, 16, 16]);
  addTable('.callsheet-v1 .cs-crew', 'Crew Call', [28, 32, 22, 12]);
  addTable('.callsheet-v1 .cs-schedule', 'Schedule', [6, 8, 26, 8, 8, 6, 10, 6, 6, 10, 10, 24]);

  // File name
  let filename = 'CallSheet.xlsx';
  try {
    const title = (document.querySelector('#templates-save-title')?.value || '').trim();
    if (title) filename = `${title}-CallSheet.xlsx`;
  } catch(_) {}

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export default { ensureXlsxStyled, exportCallsheetToExcel };

