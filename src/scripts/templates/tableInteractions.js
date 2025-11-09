import { getCellIndex, isSpecialRow, addRowBelow, moveRow, deleteRow, focusFirstEditableCell } from './tableTools.js';
import { shrinkSingleWordCells } from './pagination.js';

function nextEditableRow(tr) {
  let n = tr?.nextElementSibling;
  while (n && isSpecialRow(n)) n = n.nextElementSibling;
  return n;
}

function ensureExtraRows(tbody, sampleRow, needed) {
  if (!tbody || !sampleRow || needed <= 0) return;
  for (let i = 0; i < needed; i += 1) {
    const clone = sampleRow.cloneNode(true);
    clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
    tbody.appendChild(clone);
  }
}

function parseClipboardTable(text) {
  if (!text) return [];
  const rows = text
    .split(/\r?\n/)
    .map((r) => r.replace(/\r$/, ''))
    .filter((r) => r.trim().length > 0)
    .map((line) => line.split(/\t|,|;/).map((c) => c.trim()));
  return rows;
}

function fillRowFromArray(tr, startCol, values) {
  if (!tr || !values || !values.length) return;
  const tds = Array.from(tr.children);
  let col = Math.max(0, startCol);
  for (let i = 0; i < values.length && col < tds.length; i += 1) {
    while (col < tds.length && !tds[col].hasAttribute('contenteditable')) col += 1;
    if (col >= tds.length) break;
    const td = tds[col];
    const raw = values[i] ?? '';
    td.textContent = String(raw);
    col += 1;
  }
}

export function bindTableInteractions(host, { onAfterChange, onTotalsChange } = {}) {
  if (!host) return () => {};

  const onPaste = (e) => {
    const target = e.target;
    const editable = target && (target.closest('[contenteditable]'));
    const table = target && target.closest('table.tpl-table');
    if (!editable || !table) return;

    const plain = e.clipboardData?.getData('text/plain') ?? '';
    if (!plain || (!plain.includes('\t') && !plain.includes('\n'))) return;

    e.preventDefault();
    const rows = parseClipboardTable(plain);
    if (!rows.length) return;

    const td = target.closest('td');
    const startCol = getCellIndex(td);
    const tbody = table.tBodies?.[0] || table.querySelector('tbody');
    if (!tbody) return;

    let sampleRow = Array.from(tbody.children).find((r) => r && !isSpecialRow(r));
    let currentRow = td.parentElement;
    let remaining = 0; let cursor = currentRow;
    while (cursor) { if (!isSpecialRow(cursor)) remaining += 1; cursor = cursor.nextElementSibling; }
    const deficit = rows.length - remaining;
    if (deficit > 0 && sampleRow) ensureExtraRows(tbody, sampleRow, deficit);

    let tr = currentRow;
    rows.forEach((arr, i) => {
      while (tr && isSpecialRow(tr)) tr = nextEditableRow(tr);
      if (!tr) return;
      const start = i === 0 ? startCol : 0;
      const normalized = arr.map((v) => {
        const s = String(v || '');
        const mapA = { '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
        const mapB = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'۷','۸':'8','۹':'9' };
        return s.replace(/[\u0660-\u0669]/g,(d)=>mapA[d]).replace(/[\u06F0-\u06F9]/g,(d)=>mapB[d]);
      });
      fillRowFromArray(tr, start, normalized);
      tr = nextEditableRow(tr) || tr?.nextElementSibling;
    });

    if (typeof onTotalsChange === 'function') onTotalsChange();
    try { shrinkSingleWordCells(table); } catch (_) {}
  };

  const onKeydown = (e) => {
    const target = e.target;
    if (!target || !target.closest('table.tpl-table')) return;
    const table = target.closest('table.tpl-table');
    const tr = target.closest('tr');
    if (!tr) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newRow = addRowBelow(tr);
      if (newRow) {
        focusFirstEditableCell(newRow);
        if (typeof onTotalsChange === 'function' && (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table')) onTotalsChange();
      }
      try { if (typeof onAfterChange === 'function') onAfterChange(); } catch (_) {}
      return;
    }

    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
      e.preventDefault();
      moveRow(tr, e.key === 'ArrowDown' ? 1 : -1);
      if (typeof onTotalsChange === 'function' && (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table')) onTotalsChange();
      try { if (typeof onAfterChange === 'function') onAfterChange(); } catch (_) {}
      return;
    }

    if ((e.key === 'Delete' || e.key === 'Backspace') && e.ctrlKey) {
      e.preventDefault();
      deleteRow(tr);
      if (typeof onTotalsChange === 'function' && (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table')) onTotalsChange();
      try { if (typeof onAfterChange === 'function') onAfterChange(); } catch (_) {}
    }
  };

  host.addEventListener('paste', onPaste);
  host.addEventListener('keydown', onKeydown, true);

  return () => {
    try { host.removeEventListener('paste', onPaste); } catch (_) {}
    try { host.removeEventListener('keydown', onKeydown, true); } catch (_) {}
  };
}

export default { bindTableInteractions };

