import { addRowBelow, moveRow, deleteRow, focusFirstEditableCell, getCellIndex, isSpecialRow } from './tableTools.js';
import { paginateGenericTplTables, pruneEmptyA4Pages } from './pagination.js';

// Inline toolbar near focused cell (row ops for schedule, slot ops for cast)
// onAfterChange: optional callback invoked after a structural change (history/autosave/paginate)
export function ensureCellToolbar({ onAfterChange } = {}) {
  const host = document.getElementById('templates-preview-host');
  if (!host) { return; }
  const type = document.getElementById('templates-type')?.value || 'expenses';
  let bar = document.getElementById('tpl-cell-toolbar');
  if (type !== 'callsheet') { if (bar) bar.style.display = 'none'; return; }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'tpl-cell-toolbar';
    Object.assign(bar.style, { position: 'absolute', display: 'none', zIndex: 60 });
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
      // Support both Schedule and Crew tables for row actions
      const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew');
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
        if (tr.classList.contains('cs-row-note') || tr.classList.contains('cs-row-strong')) return;
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
    const sched = cell.closest('table.cs-schedule') || cell.closest('table.cs-crew');
    const cast = cell.closest('table.cs-cast');
    if (!sched && !cast) { bar.style.display = 'none'; bar.__targetCell = null; return; }
    // Toggle groups
    const showRowTools = !!sched; const showCastTools = !!cast;
    Array.from(bar.querySelectorAll('[data-act^="row-"]')).forEach((b) => b.style.display = showRowTools ? 'inline-flex' : 'none');
    Array.from(bar.querySelectorAll('[data-act^="cast-"]')).forEach((b) => b.style.display = showCastTools ? 'inline-flex' : 'none');
    bar.querySelector('[data-sep]')?.setAttribute('style', `width:1px;background:#e5e7eb;margin:0 4px;display:${(showRowTools && showCastTools)?'inline-block':'none'}`);

    // Only show the "× صف كامل" button when the focused row is a full-width single cell
    try {
      const fullDelBtn = bar.querySelector('[data-act="row-full-del"]');
      if (fullDelBtn && sched) {
        const tr = cell.closest('tr');
        const head = sched.querySelector('thead tr');
        const headCols = (head && head.children && head.children.length) ? head.children.length : 12;
        const isFull = tr && tr.children && tr.children.length === 1 && Number(tr.children[0]?.getAttribute('colspan') || '1') >= headCols;
        fullDelBtn.style.display = isFull ? 'inline-flex' : 'none';
      }
    } catch (_) {}

    // Place toolbar above the cell
    const rect = cell.getBoundingClientRect();
    const hostRect = host.getBoundingClientRect();
    const x = Math.max(0, rect.left - hostRect.left + Math.min(rect.width - 28, 12));
    const y = Math.max(0, rect.top - hostRect.top - 36);
    bar.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    bar.style.display = 'block';
    bar.__targetCell = cell;
  };

  // Focus detection to show toolbar near selection/caret
  const attach = () => {
    const root = document.getElementById('templates-a4-root');
    if (!root) return;
    const onSelectionChange = () => {
      if (bar.__lock) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) { if (!bar.__lock) bar.style.display = 'none'; return; }
      let node = sel.anchorNode;
      if (node && node.nodeType === 3) node = node.parentElement;
      const el = (node instanceof Element) ? node.closest('td,th') : null;
      if (!el) { if (!bar.__lock) bar.style.display = 'none'; return; }
      place(el);
    };
    document.addEventListener('selectionchange', onSelectionChange);
    // Expose a small cleanup hook on the toolbar node
    bar.__detach = () => { try { document.removeEventListener('selectionchange', onSelectionChange); } catch (_) {} };
  };
  if (!bar.__attachedOnce) { attach(); bar.__attachedOnce = true; }
}

export default { ensureCellToolbar };

