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

// ---- Unified sheet helpers for single-sheet export ----
function ensureMeta(ws) { if (!ws['!merges']) ws['!merges'] = []; if (!ws['!cols']) ws['!cols'] = []; }
function updateRef(ws, r, c) {
  const XLSX = window.XLSX; const ref = ws['!ref'];
  if (!ref) { ws['!ref'] = XLSX.utils.encode_range({ s: { r, c }, e: { r, c } }); return; }
  const range = XLSX.utils.decode_range(ref);
  if (r > range.e.r) range.e.r = r; if (c > range.e.c) range.e.c = c; if (r < range.s.r) range.s.r = r; if (c < range.s.c) range.s.c = c;
  ws['!ref'] = XLSX.utils.encode_range(range);
}
function writeCell(ws, r, c, v, s) {
  const XLSX = window.XLSX; const addr = XLSX.utils.encode_cell({ r, c }); const t = typeof v === 'number' ? 'n' : 's';
  ws[addr] = { v: v == null ? '' : v, t, s: s || {} }; updateRef(ws, r, c);
}
function merge(ws, r1, c1, r2, c2) { ensureMeta(ws); ws['!merges'].push({ s: { r: r1, c: c1 }, e: { r: r2, c: c2 } }); }
function writeAoaAt(ws, aoa, r0, c0, defaultStyle) {
  let rows = 0; let cols = 0; for (let r = 0; r < aoa.length; r += 1) { const row = aoa[r] || []; cols = Math.max(cols, row.length); for (let c = 0; c < row.length; c += 1) { const cell = row[c]; const v = (cell && typeof cell === 'object' && 'v' in cell) ? cell.v : cell; const s = (cell && typeof cell === 'object' && cell.s) ? cell.s : defaultStyle || {}; writeCell(ws, r0 + r, c0 + c, v, s); } } rows = aoa.length; return { rows, cols }; }
function setCols(ws, widths = []) { ensureMeta(ws); ws['!cols'] = widths.map((w) => ({ wch: w })); }

export async function exportCallsheetToExcel(root) {
  const XLSX = await ensureXlsxStyled();
  const wb = XLSX.utils.book_new();
  const ws = {};
  ensureMeta(ws);
  // 12-column layout matching CSS schedule grid percentages
  // CSS percentages: [5,5,25,6,5,5,6,4,4,10,8,17]
  // Map to character widths with total ~120 chars for a balanced sheet
  const PCTS = [5,5,25,6,5,5,6,4,4,10,8,17];
  const total = PCTS.reduce((a,b)=>a+b,0); // 100
  const target = 120;
  const COLS = PCTS.map(p => Math.max(5, Math.round(p/total * target))); // enforce a minimum width
  setCols(ws, COLS);

  const center = { alignment: { horizontal: 'center', vertical: 'center', wrapText: true } };
  const left = { alignment: { horizontal: 'left', vertical: 'top', wrapText: true } };
  const borderLight = buildBorder('#CBD5E1');
  const borderDark = buildBorder('#9CA3AF');
  const cell = { ...center, border: borderLight };
  const leftCell = { ...left, border: borderLight };
  const headBlue = { font: { bold: true, color: { rgb: rgb('#FFFFFF') }, sz: 12 }, fill: { patternType: 'solid', fgColor: { rgb: rgb('#2563EB') } }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, border: borderDark };

  const find = (sel) => root && root.querySelector(sel);
  let row = 0;

  // Header brand/date/title centered across all columns
  const brand = (find('.callsheet-v1 .cs-brand')?.textContent || '').trim();
  const dateText = (find('.callsheet-v1 .cs-date')?.textContent || '').trim();
  const titleText = (find('.callsheet-v1 .cs-title')?.textContent || 'CALL SHEET').trim();
  writeCell(ws, row, 0, brand || ''); merge(ws, row, 0, row, 11); ws[XLSX.utils.encode_cell({ r: row, c: 0 })].s = { font: { bold: true, sz: 20 }, ...center };
  row += 1;
  writeCell(ws, row, 0, dateText || ''); merge(ws, row, 0, row, 11); ws[XLSX.utils.encode_cell({ r: row, c: 0 })].s = { font: { bold: true, sz: 12 }, ...center };
  row += 1;
  writeCell(ws, row, 0, titleText); merge(ws, row, 0, row, 11); ws[XLSX.utils.encode_cell({ r: row, c: 0 })].s = { font: { bold: true, sz: 14 }, ...center };
  row += 2;
  // Header row heights
  ws['!rows'] = ws['!rows'] || [];
  ws['!rows'][0] = { hpt: 26 };
  ws['!rows'][1] = { hpt: 18 };
  ws['!rows'][2] = { hpt: 20 };

  // Three-column grid (Roles 1-4, Notes/Locations 5-8, Times 9-12)
  const rolesRows = [];
  try { Array.from(find('.callsheet-v1 .cs-roles tbody')?.querySelectorAll('tr') || []).forEach((tr) => { const tds = Array.from(tr.children); const label = (tds[0]?.textContent || '').trim(); const value = (tds[1]?.textContent || '').trim(); rolesRows.push([{ v: label, s: { ...cell, font: { bold: true } } }, { v: value, s: cell }]); }); } catch(_) {}
  const timesRows = [];
  try { Array.from(find('.callsheet-v1 .cs-times tbody')?.querySelectorAll('tr') || []).forEach((tr) => { const tds = Array.from(tr.children); timesRows.push([{ v: (tds[0]?.textContent || '').trim(), s: { ...cell, font: { bold: true } } }, { v: (tds[1]?.textContent || '').trim(), s: cell }]); }); } catch(_) {}
  const centerRows = [];
  try {
    const notesH = (find('.callsheet-v1 .cs-notes-h')?.textContent || 'Important Notes').trim();
    const notes = (find('.callsheet-v1 .cs-notes')?.textContent || '').replace(/\n+/g, '\n').trim();
    const locH = (find('.callsheet-v1 .cs-section')?.textContent || 'Locations').trim();
    const locs = (find('.callsheet-v1 .cs-locations')?.textContent || '').trim();
    centerRows.push([{ v: notesH, s: headBlue }]);
    centerRows.push([{ v: notes, s: leftCell }]);
    centerRows.push([{ v: locH, s: headBlue }]);
    centerRows.push([{ v: locs, s: leftCell }]);
  } catch(_) {}
  const r0 = row; const rRoles = writeAoaAt(ws, rolesRows, r0, 0, cell).rows; const rTimes = writeAoaAt(ws, timesRows, r0, 8, cell).rows; for (let i = 0; i < centerRows.length; i += 1) { const rr = r0 + i; const obj = centerRows[i][0]; writeCell(ws, rr, 4, obj.v, obj.s); merge(ws, rr, 4, rr, 7); }
  const blockH = Math.max(rRoles, centerRows.length, rTimes);
  // Outline boxes for Roles, Notes/Locations, Times
  const outlineBox = (r1,c1,r2,c2) => {
    // apply medium border around outer cells of the box
    const medium = 'medium';
    for (let rr=r1; rr<=r2; rr+=1) {
      for (let cc=c1; cc<=c2; cc+=1) {
        const addr = XLSX.utils.encode_cell({ r: rr, c: cc });
        const cur = ws[addr] || { v: '', t: 's', s: {} };
        const b = cur.s.border || {}; const col = { rgb: rgb('#9CA3AF') };
        if (rr===r1) b.top = { style: medium, color: col };
        if (rr===r2) b.bottom = { style: medium, color: col };
        if (cc===c1) b.left = { style: medium, color: col };
        if (cc===c2) b.right = { style: medium, color: col };
        cur.s.border = { ...cur.s.border, ...b };
        ws[addr] = cur; updateRef(ws, rr, cc);
      }
    }
  };
  if (rRoles>0) outlineBox(r0, 0, r0 + rRoles - 1, 3);
  if (centerRows.length>0) outlineBox(r0, 4, r0 + centerRows.length - 1, 7);
  if (rTimes>0) outlineBox(r0, 8, r0 + rTimes - 1, 11);
  row = r0 + blockH + 2;

  // Cast Calls block
  const castTable = find('.callsheet-v1 .cs-cast');
  if (castTable) {
    const titleRow = row;
    writeCell(ws, row, 0, 'Cast Calls', headBlue); merge(ws, row, 0, row, 11);
    row += 1;
    const aoa = tableToAoa(castTable).slice(1);
    const placed = writeAoaAt(ws, aoa, row, 2, cell);
    // Outline around placed table area
    outlineBox(titleRow, 2, row + placed.rows - 1, 9);
    // Set header row height
    ws['!rows'][titleRow] = { hpt: 22 };
    row += placed.rows + 2;
  }

  // Crew Call block (merged groups to span width)
  const crewTable = find('.callsheet-v1 .cs-crew');
  if (crewTable) {
    const titleRow = row;
    writeCell(ws, row, 0, 'Crew Call', headBlue); merge(ws, row, 0, row, 11); ws['!rows'][row] = { hpt: 22 };
    row += 1;
    const groups = [[0,2],[3,7],[8,10],[11,11]]; const headers = ['Position','Name','Phone','Time'];
    headers.forEach((txt, i) => { const [c1,c2] = groups[i]; writeCell(ws, row, c1, txt, headBlue); if (c2>c1) merge(ws, row, c1, row, c2); });
    ws['!rows'][row] = { hpt: 18 };
    row += 1;
    const startBody = row;
    Array.from(crewTable.querySelectorAll('tbody tr')).forEach((tr) => { const tds = Array.from(tr.children); const vals = [0,1,2,3].map((i)=> (tds[i]?.textContent || '').trim()); vals.forEach((txt, i) => { const [c1,c2] = groups[i]; const st = i===1 ? leftCell : cell; writeCell(ws, row, c1, txt, st); if (c2>c1) merge(ws, row, c1, row, c2); }); row += 1; });
    outlineBox(titleRow, 0, row - 1, 11);
    row += 2;
  }

  // Schedule full-width
  const schedTable = find('.callsheet-v1 .cs-schedule');
  if (schedTable) {
    const aoa = tableToAoa(schedTable);
    const placed = writeAoaAt(ws, aoa, row, 0, cell);
    // Outline schedule (whole range including header inside table)
    outlineBox(row, 0, row + placed.rows - 1, 11);
    // Make header row a bit taller
    ws['!rows'][row] = { hpt: 18 };
    row += placed.rows + 1;
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Call Sheet');

  // File name
  let filename = 'CallSheet.xlsx'; try { const title = (document.querySelector('#templates-save-title')?.value || '').trim(); if (title) filename = `${title}-CallSheet.xlsx`; } catch(_) {}
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' }); const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export default { ensureXlsxStyled, exportCallsheetToExcel };
