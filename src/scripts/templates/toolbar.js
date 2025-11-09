import { addRowBelow, moveRow, deleteRow, focusFirstEditableCell, getCellIndex, isSpecialRow } from './tableTools.js';
import { paginateGenericTplTables, pruneEmptyA4Pages } from './pagination.js';

// Inline toolbar near focused cell (row ops for schedule, slot ops for cast)
// onAfterChange: optional callback invoked after a structural change (history/autosave/paginate)
export function ensureCellToolbar({ onAfterChange } = {}) {
  const host = document.getElementById('templates-preview-host');
  if (!host) { return; }
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const enableExpensesTools = (() => { try { return localStorage.getItem('templates.toolbar.expenses') === '1'; } catch(_) { return false; } })();
  let bar = document.getElementById('tpl-cell-toolbar');
  // Temporarily disable toolbar for Expenses unless explicitly enabled via localStorage
  if (!(type === 'callsheet' || (type === 'expenses' && enableExpensesTools))) { if (bar) { bar.style.display = 'none'; bar.__disabled = true; } return; }
  if (type === 'expenses' && !enableExpensesTools) { if (bar) { bar.style.display = 'none'; bar.__disabled = true; } return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'tpl-cell-toolbar';
    // Use fixed positioning so placement is stable regardless of zoom/scale on the preview root
    Object.assign(bar.style, { position: 'fixed', display: 'none', zIndex: 9999 });
    bar.innerHTML = `
      <div style="display:inline-flex;gap:4px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:4px;box-shadow:0 2px 8px rgba(15,23,42,0.12);">
        <button type="button" data-act="row-add" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف</button>
        <button type="button" data-act="row-full" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف كامل</button>
        <button type="button" data-act="row-full-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف كامل</button>
        <button type="button" data-act="row-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف</button>
        <button type="button" data-act="row-up" class="btn btn-outline" style="height:28px;padding:0 8px">↑</button>
        <button type="button" data-act="row-down" class="btn btn-outline" style="height:28px;padding:0 8px">↓</button>
        <span data-sep style="width:1px;background:#e5e7eb;margin:0 4px"></span>
        <button type="button" data-act="cast-add" class="btn btn-outline" style="height:28px;padding:0 8px">+ خانة</button>
        <button type="button" data-act="cast-del" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× خانة</button>
        <button type="button" data-act="cast-add-row" class="btn btn-outline" style="height:28px;padding:0 8px">+ صف اسم/وقت</button>
        <button type="button" data-act="cast-del-row" class="btn btn-outline btn-danger" style="height:28px;padding:0 8px">× صف اسم/وقت</button>
      </div>`;
    host.appendChild(bar);
    bar.__lock = false; bar.__switchTimer = null; bar.__freezeUntil = 0;
    bar.addEventListener('pointerenter', () => { bar.__lock = true; });
    bar.addEventListener('pointerleave', () => { bar.__lock = false; });
    // Actions
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.getAttribute('data-act');
      const cell = bar.__targetCell || null;
      if (!cell) return;
      // Support both Schedule/Crew and Expenses tables for row actions
      const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew') || cell.closest('table.exp-details');
      const cast = cell.closest('table.cs-cast');
      const doRowAdd = () => {
        const tr = cell.closest('tr');
        if (!tr) return;
        const newRow = addRowBelow(tr);
        if (newRow) focusFirstEditableCell(newRow, 0);
      };
      const doRowDel = () => {
        const tr = cell.closest('tr');
        if (!tr) return;
        // Avoid deleting headers/subtotals/group bars in both schedule and expenses
        if (tr.classList.contains('cs-row-note') || tr.classList.contains('cs-row-strong')) return;
        if (tr.hasAttribute('data-group-bar') || tr.hasAttribute('data-subgroup-header') || tr.hasAttribute('data-subgroup-subtotal') || tr.hasAttribute('data-group-total') || tr.hasAttribute('data-subgroup-marker')) return;
        deleteRow(tr);
      };
      const doRowMove = (dir) => { const tr = cell.closest('tr'); if (tr) moveRow(tr, dir); };
      const updateAfter = () => {
        try { if (typeof onAfterChange === 'function') onAfterChange(); } catch (_) {}
        try { setTimeout(() => { paginateGenericTplTables(); pruneEmptyA4Pages(); }, 30); } catch(_) {}
      };
      const doRowFull = () => {
        const table = sched || cell.closest('table');
        if (!table) return;
        const tr = cell.closest('tr');
        const tbody = tr?.parentElement;
        if (!tr || !tbody) return;
        const ncols = (() => { try { const head = table.querySelector('thead tr'); return (head && head.children && head.children.length) ? head.children.length : 12; } catch(_) { return 12; } })();
        const full = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', String(ncols));
        td.setAttribute('data-editable', 'true');
        td.setAttribute('contenteditable', 'true');
        full.appendChild(td);
        tbody.insertBefore(full, tr.nextElementSibling);
      };
      const castAddSlot = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const nameRow = tbody.children && tbody.children[1];
        const timeRow = tbody.children && tbody.children[2];
        if (!nameRow || !timeRow) return;
        const nt = document.createElement('td'); nt.setAttribute('data-editable','true'); nt.setAttribute('contenteditable','true'); nameRow.appendChild(nt);
        const tt = document.createElement('td'); tt.setAttribute('data-editable','true'); tt.setAttribute('contenteditable','true'); timeRow.appendChild(tt);
      };
      const castRemoveSlot = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const nameRow = tbody.children && tbody.children[1];
        const timeRow = tbody.children && tbody.children[2];
        if (!nameRow || !timeRow) return;
        if (nameRow.children.length <= 2 || timeRow.children.length <= 2) return; // keep at least two slots
        nameRow.removeChild(nameRow.lastElementChild);
        timeRow.removeChild(timeRow.lastElementChild);
      };
      const castAddRowPair = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        const firstName = tbody.children && tbody.children[1];
        const firstTime = tbody.children && tbody.children[2];
        if (!firstName || !firstTime) return;
        const weather = firstName.querySelector('.cs-weather');
        const cols = firstName.children.length - (weather ? 1 : 0);
        const nameTr = document.createElement('tr');
        const timeTr = document.createElement('tr');
        for (let i=0;i<cols;i+=1) { const td=document.createElement('td'); td.setAttribute('data-editable','true'); td.setAttribute('contenteditable','true'); nameTr.appendChild(td); }
        for (let i=0;i<cols;i+=1) { const td=document.createElement('td'); td.setAttribute('data-editable','true'); td.setAttribute('contenteditable','true'); timeTr.appendChild(td); }
        tbody.appendChild(nameTr); tbody.appendChild(timeTr);
        if (weather) { const totalRows = tbody.querySelectorAll('tr').length - 1; weather.setAttribute('rowspan', String(totalRows)); }
      };
      const castRemoveRowPair = () => {
        const table = cast; if (!table) return;
        const tbody = table.tBodies && table.tBodies[0]; if (!tbody) return;
        if (tbody.children.length <= 3) return; // title + first pair must remain
        const lastTime = tbody.lastElementChild; const lastName = lastTime?.previousElementSibling;
        if (lastName && lastTime && lastName.tagName === 'TR') { tbody.removeChild(lastTime); tbody.removeChild(lastName); }
        const firstName = tbody.children[1]; const weather = firstName?.querySelector('.cs-weather');
        if (weather) { const totalRows = tbody.querySelectorAll('tr').length - 1; weather.setAttribute('rowspan', String(totalRows)); }
      };
      if (act === 'row-add' && sched) { doRowAdd(); updateAfter(); }
      else if (act === 'row-full' && sched) { doRowFull(); updateAfter(); }
      else if (act === 'row-full-del' && sched) {
        const tr = cell.closest('tr');
        const headCols = (() => { try { const head = sched.querySelector('thead tr'); return (head && head.children && head.children.length) ? head.children.length : 12; } catch(_) { return 12; } })();
        const isFull = tr && tr.children && tr.children.length === 1 && Number(tr.children[0]?.getAttribute('colspan') || '1') >= headCols;
        if (isFull) { tr.parentElement?.removeChild(tr); updateAfter(); }
      }
      else if (act === 'row-del' && sched) { doRowDel(); updateAfter(); }
      else if (act === 'row-up' && sched) { doRowMove(-1); updateAfter(); }
      else if (act === 'row-down' && sched) { doRowMove(+1); updateAfter(); }
      else if (act === 'cast-add' && cast) { castAddSlot(); updateAfter(); }
      else if (act === 'cast-del' && cast) { castRemoveSlot(); updateAfter(); }
      else if (act === 'cast-add-row' && cast) { castAddRowPair(); updateAfter(); }
      else if (act === 'cast-del-row' && cast) { castRemoveRowPair(); updateAfter(); }
    });
  }

  const place = (cell) => {
    if (!cell) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    // Abort if disabled dynamically (e.g., when switching to Expenses)
    const curType = document.getElementById('templates-type')?.value || 'expenses';
    const allowExpenses = (() => { try { return localStorage.getItem('templates.toolbar.expenses') === '1'; } catch(_) { return false; } })();
    if (curType === 'expenses' && !allowExpenses) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew') || cell.closest('table.exp-details');
    const cast = cell.closest('table.cs-cast');
    if (!sched && !cast) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    // Toggle groups
    // For expenses tables, only show row tools when focusing an item row
    let showRowTools = !!sched; const showCastTools = !!cast;
    try {
      if (showRowTools && sched && sched.matches('table.exp-details')) {
        const tr = cell.closest('tr');
        showRowTools = !!(tr && tr.getAttribute('data-row') === 'item');
      }
    } catch(_) {}
    Array.from(bar.querySelectorAll('[data-act^="row-"]')).forEach((b) => b.style.display = showRowTools ? 'inline-flex' : 'none');
    Array.from(bar.querySelectorAll('[data-act^="cast-"]')).forEach((b) => b.style.display = showCastTools ? 'inline-flex' : 'none');
    bar.querySelector('[data-sep]')?.setAttribute('style', `width:1px;background:#e5e7eb;margin:0 4px;display:${(showRowTools && showCastTools)?'inline-block':'none'}`);

    // Only show the "× صف كامل" and "+ صف كامل" for schedule/cast; hide for expenses
    try {
      const fullAddBtn = bar.querySelector('[data-act="row-full"]');
      const fullDelBtn = bar.querySelector('[data-act="row-full-del"]');
      if (sched && sched.matches('table.exp-details')) {
        if (fullAddBtn) fullAddBtn.style.display = 'none';
        if (fullDelBtn) fullDelBtn.style.display = 'none';
      } else if (fullDelBtn && sched) {
        const tr = cell.closest('tr');
        const head = sched.querySelector('thead tr');
        const headCols = (head && head.children && head.children.length) ? head.children.length : 12;
        const isFull = tr && tr.children && tr.children.length === 1 && Number(tr.children[0]?.getAttribute('colspan') || '1') >= headCols;
        fullDelBtn.style.display = isFull ? 'inline-flex' : 'none';
        if (fullAddBtn) fullAddBtn.style.display = 'inline-flex';
      }
    } catch (_) {}

    // Place toolbar above the cell
    const rect = cell.getBoundingClientRect();
    const margin = 6;
    const x = Math.round(rect.left + Math.min(rect.width - 28, 12));
    const y = Math.round(rect.top - (bar.offsetHeight || 32) - margin);
    bar.style.transform = 'none';
    bar.style.left = `${x}px`;
    bar.style.top = `${Math.max(0, y)}px`;
    bar.style.display = 'block';
    bar.__targetCell = cell;
  };

  // Focus detection to show toolbar near selection/caret
  const attach = () => {
    const root = document.getElementById('templates-a4-root');
    if (!root) return;
    const onSelectionChange = () => {
      if (bar.__lock) return;
      // Suppress toolbar in Expenses unless explicitly enabled via localStorage
      try {
        const curType = document.getElementById('templates-type')?.value || 'expenses';
        const allowExpenses = localStorage.getItem('templates.toolbar.expenses') === '1';
        if (curType === 'expenses' && !allowExpenses) { bar.style.display = 'none'; return; }
      } catch(_) {}
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) { if (!bar.__lock) bar.style.display = 'none'; return; }
      let node = sel.anchorNode;
      if (node && node.nodeType === 3) node = node.parentElement;
      const el = (node instanceof Element) ? node.closest('td,th') : null;
      if (!el) { if (!bar.__lock) bar.style.display = 'none'; return; }
      place(el);
    };
    document.addEventListener('selectionchange', onSelectionChange);
    // Fallback: show near focused editable cell directly (helps with contenteditable typing in Expenses)
    const onFocusIn = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.getAttribute('contenteditable') === 'true' || t.closest('[contenteditable="true"]')) {
        const cell = t.closest('td,th');
        if (cell) place(cell);
      }
    };
    root.addEventListener('focusin', onFocusIn, true);
    // Expose a small cleanup hook on the toolbar node
    bar.__detach = () => { try { document.removeEventListener('selectionchange', onSelectionChange); root.removeEventListener('focusin', onFocusIn, true); } catch (_) {} };
  };
  if (!bar.__attachedOnce) { attach(); bar.__attachedOnce = true; }
}

export default { ensureCellToolbar };
