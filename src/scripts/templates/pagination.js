import { el, buildRoot } from './core.js';
import { pageHasMeaningfulContent } from './pageUtils.js';

function createPageSection({ landscape = false, headerFooter = false, logoUrl = '' } = {}) {
  const page = document.createElement('section');
  page.className = `a4-page ${landscape ? 'a4-landscape' : ''}`.trim();
  const inner = document.createElement('div');
  inner.className = 'a4-inner';
  if (headerFooter) {
    const header = el('div', { class: 'tpl-print-header' }, [
      el('div', { class: 'logo-left' }, [ el('img', { src: logoUrl || '', alt: '' }) ]),
      el('div', { class: 'meta' }, [ el('div', { text: new Date().toLocaleDateString() }) ])
    ]);
    const footer = el('div', { class: 'tpl-print-footer' }, [
      el('div', { class: 'footer-left', text: 'art-ratio.com' }),
      el('div', { class: 'page-num', html: `<span data-page-num>1</span> / <span data-page-count>1</span>` })
    ]);
    page.appendChild(header); page.appendChild(footer);
  }
  page.appendChild(inner);
  return { page, inner };
}

export function autoPaginateTemplates({ headerFooter = false, logoUrl = '' } = {}) {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const pagesWrap = root.querySelector('[data-a4-pages]');
  const firstPage = pagesWrap?.querySelector('.a4-page');
  const firstInner = firstPage?.querySelector('.a4-inner');
  if (!firstInner) return;

  // Gather original blocks
  const masthead = firstInner.querySelector('.exp-masthead');
  const meta = firstInner.querySelector('.tpl-meta');
  const topSheet = firstInner.querySelector('#expenses-top-sheet');
  const table = firstInner.querySelector('#expenses-table');
  const summary = firstInner.querySelector('#expenses-summary');
  if (!table) return;

  // Reset pages to rebuild
  while (pagesWrap.firstChild) pagesWrap.removeChild(pagesWrap.firstChild);

  // Start first page and keep masthead + meta + top sheet in first page
  let { page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false });
  pagesWrap.appendChild(currentPage);
  if (masthead) currentInner.appendChild(masthead);
  if (meta) currentInner.appendChild(meta);
  if (topSheet) currentInner.appendChild(topSheet);

  // Create a working table with thead copy
  const thead = table.querySelector('thead');
  const makeTable = () => {
    const t = document.createElement('table');
    t.className = table.className;
    t.id = 'expenses-table';
    t.setAttribute('data-editable-table', 'expenses');
    const head = thead ? thead.cloneNode(true) : document.createElement('thead');
    t.appendChild(head);
    t.appendChild(document.createElement('tbody'));
    return t;
  };

  // Details start from the second page if they don’t fit after top sheet
  let workingTable = makeTable();
  currentInner.appendChild(workingTable);

  const rows = Array.from(table.querySelectorAll('tbody > tr'));

  const isSubHeader = (tr) => tr?.hasAttribute('data-subgroup-header');
  const isSubTotal = (tr) => tr?.hasAttribute('data-subgroup-subtotal');
  const isGroupTotal = (tr) => tr?.hasAttribute('data-group-total');
  const isMarker = (tr) => tr?.hasAttribute('data-subgroup-marker');
  const isItem = (tr) => tr?.getAttribute('data-row') === 'item';
  const isGroupBar = (tr) => tr?.hasAttribute('data-group-bar');

  const fitsInner = () => currentInner.scrollHeight <= (currentInner.clientHeight + 0.5);
  let groupBarTpl = null; let subHeaderTpl = null; let subHeaderCode = null;

  const startNewPage = (firstNodeAboutToPlace = null) => {
    ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
    pagesWrap.appendChild(currentPage);
    workingTable = makeTable();
    currentInner.appendChild(workingTable);
    const tb = workingTable.tBodies[0];
    if (groupBarTpl && !(firstNodeAboutToPlace && isGroupBar(firstNodeAboutToPlace))) tb.appendChild(groupBarTpl.cloneNode(true));
    if (subHeaderTpl && !(firstNodeAboutToPlace && isSubHeader(firstNodeAboutToPlace))) {
      const n = firstNodeAboutToPlace;
      const belongsToSameSub = !!(n && (
        (n.getAttribute && n.getAttribute('data-subgroup-subtotal') === subHeaderCode) ||
        (n.getAttribute && n.getAttribute('data-row') === 'item') ||
        (n.hasAttribute && n.hasAttribute('data-subgroup-marker'))
      ));
      if (!firstNodeAboutToPlace || belongsToSameSub) tb.appendChild(subHeaderTpl.cloneNode(true));
    }
  };

  const appendOrNewPage = (node) => {
    const tbody = workingTable.tBodies[0];
    tbody.appendChild(node);
    if (!fitsInner()) { tbody.removeChild(node); startNewPage(node); workingTable.tBodies[0].appendChild(node); }
  };

  let i = 0;
  while (i < rows.length) {
    const row = rows[i];
    if (isGroupBar(row)) groupBarTpl = row.cloneNode(true);
    if (isSubHeader(row)) { subHeaderTpl = row.cloneNode(true); subHeaderCode = row.getAttribute('data-subgroup'); }
    if (isSubHeader(row)) {
      const pack = [row];
      const headerCode = row.getAttribute('data-subgroup');
      let j = i + 1; let itemsAdded = 0;
      while (j < rows.length && itemsAdded < 2) {
        if (isItem(rows[j])) { pack.push(rows[j]); itemsAdded += 1; j += 1; }
        else if (isMarker(rows[j])) { pack.push(rows[j]); j += 1; }
        else if (isSubTotal(rows[j])) { break; }
        else { break; }
      }
      if (j < rows.length && isSubTotal(rows[j]) && rows[j].getAttribute('data-subgroup-subtotal') === headerCode) { pack.push(rows[j]); j += 1; }
      const tbody = workingTable.tBodies[0];
      pack.forEach((n) => tbody.appendChild(n));
      if (!fitsInner()) { pack.forEach((n) => { if (n.parentElement === tbody) tbody.removeChild(n); }); startNewPage(pack[0]); const tb2 = workingTable.tBodies[0]; pack.forEach((n) => tb2.appendChild(n)); }
      i = j; continue;
    }
    if (isGroupTotal(row)) {
      const tbody = workingTable.tBodies[0];
      tbody.appendChild(row);
      if (!fitsInner()) {
        tbody.removeChild(row);
        const prev = tbody.lastElementChild; let carry = null;
        if (prev && (isItem(prev) || isSubTotal(prev))) { carry = prev; tbody.removeChild(prev); }
        startNewPage(row);
        const tb2 = workingTable.tBodies[0]; if (carry) tb2.appendChild(carry); tb2.appendChild(row);
        if (!fitsInner()) { tb2.removeChild(row); if (carry) { /* keep carry */ } startNewPage(row); workingTable.tBodies[0].appendChild(row); }
      }
      subHeaderTpl = null; subHeaderCode = null; groupBarTpl = null; i += 1; continue;
    }
    appendOrNewPage(row);
    i += 1;
  }

  if (summary) {
    currentInner.appendChild(summary);
    if (!fitsInner()) { currentInner.removeChild(summary); ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false })); pagesWrap.appendChild(currentPage); workingTable = makeTable(); currentInner.appendChild(workingTable); currentInner.appendChild(summary); }
  }

  if (headerFooter) {
    const count = pagesWrap.querySelectorAll('.a4-page').length;
    Array.from(pagesWrap.querySelectorAll('.a4-page')).forEach((p, i2) => {
      const numEl = p.querySelector('[data-page-num]');
      const countEl = p.querySelector('[data-page-count]');
      if (numEl) numEl.textContent = String(i2 + 1);
      if (countEl) countEl.textContent = String(count);
    });
  }

  try { applyZebraStripes(); } catch (_) {}
  try { shrinkSubHeaderLabels(); } catch (_) {}
  try { shrinkSingleWordCells(); } catch (_) {}
  try { if (window.__pdfTunerRefreshPages) window.__pdfTunerRefreshPages(); } catch(_) {}
  try { if (window.__pdfTunerLoadValues) window.__pdfTunerLoadValues(); } catch(_) {}
}

export function paginateExpDetailsTables({ headerFooter = false, logoUrl = '' } = {}) {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const pagesWrap = root.querySelector('[data-a4-pages]');
  if (!pagesWrap) return;

  const groupPages = Array.from(pagesWrap.querySelectorAll('.a4-page'));
  groupPages.forEach((pg) => {
    const inner = pg.querySelector('.a4-inner');
    if (!inner) return;
    const tables = Array.from(inner.querySelectorAll('table.exp-details')).filter((t) => t.getAttribute('data-split-done') !== '1');
    tables.forEach((table) => {
      const thead = table.querySelector('thead');
      const colTpl = table.querySelector('colgroup');
      const groupKeyAttr = table.getAttribute('data-group') || '';
      const rows = Array.from(table.querySelectorAll('tbody > tr'));
      if (!rows.length) { table.setAttribute('data-split-done', '1'); return; }

      const makeTable = () => {
        const t = document.createElement('table');
        t.className = table.className;
        t.setAttribute('data-editable-table', 'expenses');
        if (groupKeyAttr) t.setAttribute('data-group', groupKeyAttr);
        if (colTpl) t.appendChild(colTpl.cloneNode(true));
        const hd = thead ? thead.cloneNode(true) : document.createElement('thead');
        t.appendChild(hd);
        t.appendChild(document.createElement('tbody'));
        return t;
      };

      let currentPage = pg; let currentInner = inner;
      const workingFirst = makeTable();
      try { inner.removeChild(table); } catch (_) {}
      currentInner.appendChild(workingFirst);
      // Enforce: each expenses group starts on a fresh page (Top Sheet page must not include details)
      try {
        const hasTopSheet = !!currentInner.querySelector('#expenses-top-sheet');
        const anotherDetailsTableExists = !!Array.from(currentInner.querySelectorAll('table.exp-details')).find((t) => t !== workingFirst);
        if (hasTopSheet || anotherDetailsTableExists) {
          try { currentInner.removeChild(workingFirst); } catch(_) {}
          ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
          pagesWrap.appendChild(currentPage);
          currentInner.appendChild(workingFirst);
        }
      } catch(_) {}
      let workingTable = workingFirst;

      const isSubHeader = (tr) => tr?.hasAttribute('data-subgroup-header');
      const isSubTotal = (tr) => tr?.hasAttribute('data-subgroup-subtotal');
      const isGroupTotal = (tr) => tr?.hasAttribute('data-group-total');
      const isMarker = (tr) => tr?.hasAttribute('data-subgroup-marker');
      const isItem = (tr) => tr?.getAttribute('data-row') === 'item';
      const isGroupBar = (tr) => tr?.hasAttribute('data-group-bar');
      const fitsInner = () => currentInner.scrollHeight <= (currentInner.clientHeight + 0.5);

      let groupBarTpl = null; let subHeaderTpl = null; let subHeaderCode = null;

      const startNewPage = (firstNodeAboutToPlace = null) => {
        ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
        pagesWrap.appendChild(currentPage);
        workingTable = makeTable();
        currentInner.appendChild(workingTable);
        const tb = workingTable.tBodies[0];
        if (groupBarTpl && !(firstNodeAboutToPlace && isGroupBar(firstNodeAboutToPlace))) { tb.appendChild(groupBarTpl.cloneNode(true)); }
        if (subHeaderTpl && !(firstNodeAboutToPlace && isSubHeader(firstNodeAboutToPlace))) {
          const n = firstNodeAboutToPlace;
          const belongsToSameSub = !!(n && (
            (n.getAttribute && n.getAttribute('data-subgroup-subtotal') === subHeaderCode) ||
            (n.getAttribute && n.getAttribute('data-row') === 'item') ||
            (n.hasAttribute && n.hasAttribute('data-subgroup-marker'))
          ));
          if (!firstNodeAboutToPlace || belongsToSameSub) tb.appendChild(subHeaderTpl.cloneNode(true));
        }
      };

      let i = 0;
      while (i < rows.length) {
        const row = rows[i];
        const tbody = workingTable.tBodies[0];
        const appendOrNewPage = (node) => {
          tbody.appendChild(node);
          if (!fitsInner()) {
            try { tbody.removeChild(node); } catch(_){}
            // If the table on the previous page has no body rows yet (only THEAD), remove it to avoid orphan headers
            let hadNoRows = false;
            try { hadNoRows = !(tbody.children && tbody.children.length); } catch(_) {}
            const prevTable = workingTable;
            startNewPage(node);
            if (hadNoRows) { try { prevTable.parentElement?.removeChild(prevTable); } catch(_) {} }
            workingTable.tBodies[0].appendChild(node);
          }
        };
        if (isGroupBar(row)) {
          groupBarTpl = row.cloneNode(true);
          const tb = workingTable.tBodies[0];
          if (tb && tb.children && tb.children.length > 0) { startNewPage(row); }
          appendOrNewPage(row);
          i += 1; continue;
        }
        if (isSubHeader(row)) {
          subHeaderTpl = row.cloneNode(true); subHeaderCode = row.getAttribute('data-subgroup');
          const pack = [row]; let j = i + 1; let itemsAdded = 0;
          while (j < rows.length && itemsAdded < 2) {
            if (isItem(rows[j])) { pack.push(rows[j]); itemsAdded += 1; j += 1; }
            else if (isMarker(rows[j])) { pack.push(rows[j]); j += 1; }
            else if (isSubTotal(rows[j])) { break; } else { break; }
          }
          if (j < rows.length && isSubTotal(rows[j]) && rows[j].getAttribute('data-subgroup-subtotal') === subHeaderCode) { pack.push(rows[j]); j += 1; }
          pack.forEach((n) => tbody.appendChild(n));
          if (!fitsInner()) { pack.forEach((n) => { try { tbody.removeChild(n); } catch(_){} }); startNewPage(pack[0]); const tb2 = workingTable.tBodies[0]; pack.forEach((n) => tb2.appendChild(n)); }
          i = j; continue;
        }
        if (isGroupTotal(row)) {
          appendOrNewPage(row);
          if (!fitsInner()) {
            const prev = tbody.lastElementChild; let carry = null;
            if (prev && (isItem(prev) || isSubTotal(prev))) { try { tbody.removeChild(prev); } catch(_){} carry = prev; }
            try { tbody.removeChild(row); } catch(_){}
            startNewPage(row);
            const tb2 = workingTable.tBodies[0]; if (carry) tb2.appendChild(carry); tb2.appendChild(row);
            if (!fitsInner()) { try { tb2.removeChild(row); } catch(_){} startNewPage(row); workingTable.tBodies[0].appendChild(row); }
          }
          subHeaderTpl = null; subHeaderCode = null; groupBarTpl = null; i += 1; continue;
        }
        appendOrNewPage(row);
        i += 1;
      }
      table.setAttribute('data-split-done', '1');
    });
  });

  // Reorder pages so that groups appear in the logical order: ATL → PROD → POST
  try {
    const pages = Array.from(pagesWrap.querySelectorAll('.a4-page'));
    if (pages.length > 1) {
      const first = pages[0]; // keep top sheet page first
      const rest = pages.slice(1);
      const buckets = { atl: [], prod: [], post: [], other: [] };
      rest.forEach((p) => {
        const tb = p.querySelector('table.exp-details');
        const gk = (tb && tb.getAttribute('data-group')) || 'other';
        if (gk in buckets) buckets[gk].push(p); else buckets.other.push(p);
      });
      const ordered = [first, ...buckets.atl, ...buckets.prod, ...buckets.post, ...buckets.other];
      ordered.forEach((p) => { try { pagesWrap.appendChild(p); } catch (_) {} });
    }
  } catch (_) {}

  // Cleanup: remove any orphan exp-details tables (no body rows) and dedupe multi-THEAD occurrences
  try {
    const all = Array.from(pagesWrap.querySelectorAll('table.exp-details'));
    all.forEach((t) => {
      // Deduplicate THEADs within a single table
      const heads = Array.from(t.querySelectorAll('thead'));
      if (heads.length > 1) {
        heads.slice(1).forEach((h) => { try { h.parentElement?.removeChild(h); } catch(_){} });
      }
      // Drop tables that ended up with an empty TBODY (e.g., overflow occurred before first row)
      const body = t.tBodies && t.tBodies[0];
      const hasRows = !!(body && body.children && body.children.length);
      if (!hasRows) { try { t.parentElement?.removeChild(t); } catch(_) {} }
    });
  } catch(_) {}

  // If there are still unsplit exp-details tables left in any page, run another pass
  try {
    const remaining = root.querySelector('table.exp-details:not([data-split-done="1"])');
    if (remaining) {
      // Defer to next frame to allow DOM to settle
      requestAnimationFrame(() => { try { paginateExpDetailsTables({ headerFooter, logoUrl }); } catch (_) {} });
    }
  } catch (_) {}
}

export function trimTrailingEmptyRows(table, keepTail = 0) {
  try {
    const tbody = table?.tBodies?.[0] || table.querySelector('tbody');
    if (!tbody) return;
    const rows = Array.from(tbody.children);
    if (!rows.length) return;
    let blankTail = 0;
    for (let i = rows.length - 1; i >= 0; i -= 1) {
      const tr = rows[i];
      if (tr.classList && (tr.classList.contains('cs-row-note') || tr.classList.contains('cs-row-strong'))) break;
      const tds = Array.from(tr.querySelectorAll('td'));
      const isBlank = tds.length > 0 && !tds.some((td) => ((td.textContent || '').trim().length > 0));
      if (!isBlank) break;
      blankTail += 1;
      if (blankTail > Math.max(0, keepTail)) { try { tbody.removeChild(tr); } catch (_) {} }
    }
  } catch (_) {}
}

export function paginateGenericTplTables({ headerFooter = false, logoUrl = '', isLandscape = true } = {}) {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  if (type === 'expenses') return;
  const pagesWrap = root.querySelector('[data-a4-pages]');
  if (!pagesWrap) return;

  const pages = Array.from(pagesWrap.querySelectorAll('.a4-page'));
  pages.forEach((pg) => {
    const inner = pg.querySelector('.a4-inner');
    if (!inner) return;
    const tables = Array.from(inner.querySelectorAll('table.tpl-table'));
    tables.forEach((table) => {
      if (!table || table.getAttribute('data-split-done') === '1') return;
      const thead = table.querySelector('thead');
      const colTpl = table.querySelector('colgroup');
      const rows = Array.from(table.querySelectorAll('tbody > tr'));
      if (!rows.length) { table.setAttribute('data-split-done', '1'); return; }
      const makeTable = () => {
        const t = document.createElement('table'); t.className = table.className; if (colTpl) t.appendChild(colTpl.cloneNode(true));
        const hd = thead ? thead.cloneNode(true) : document.createElement('thead'); t.appendChild(hd); t.appendChild(document.createElement('tbody')); return t;
      };
      const fitsInner = () => inner.scrollHeight <= (inner.clientHeight + 0.5);

      let currentPage = pg; let currentInner = inner;
      try { inner.removeChild(table); } catch(_) {}
      let workingTable = makeTable();
      currentInner.appendChild(workingTable);

      let i = 0;
      while (i < rows.length) {
        const tbody = workingTable.tBodies[0];
        tbody.appendChild(rows[i]);
        if (!fitsInner()) {
          tbody.removeChild(rows[i]);
          try { const hadNoRows = !(tbody.children && tbody.children.length); if (hadNoRows) { const prev = workingTable; try { currentInner.removeChild(prev); } catch (_) {} } } catch (_) {}
          ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: isLandscape }));
          pagesWrap.appendChild(currentPage);
          workingTable = makeTable();
          currentInner.appendChild(workingTable);
          workingTable.tBodies[0].appendChild(rows[i]);
        }
        i += 1;
      }
      try { const allTables = Array.from(pagesWrap.querySelectorAll('table.tpl-table')); allTables.forEach((t) => { const body = t.tBodies && t.tBodies[0]; const hasRows = !!(body && body.children && body.children.length); if (!hasRows) { try { t.parentElement?.removeChild(t); } catch (_) {} } }); } catch (_) {}
      table.setAttribute('data-split-done', '1');
    });
  });
}

export function pruneEmptyA4Pages() {
  try {
    const root = document.getElementById('templates-a4-root');
    if (!root) return;
    const pages = Array.from(root.querySelectorAll('.a4-page'));
    pages.forEach((pg) => {
      if (!pageHasMeaningfulContent(pg)) {
        const total = root.querySelectorAll('.a4-page').length;
        if (total > 1) pg.parentElement?.removeChild(pg);
      }
    });
    try { dedupeCrewTables(); } catch(_) {}
  } catch (_) {}
}

function dedupeCrewTables() {
  const root = document.getElementById('templates-a4-root');
  if (!root) return;
  const crews = Array.from(root.querySelectorAll('table.cs-crew'));
  if (crews.length <= 1) return;
  let keep = crews.find((t) => (t.tBodies?.[0]?.children?.length || 0) > 0) || crews[0];
  crews.forEach((t) => { if (t !== keep) { try { t.parentElement?.removeChild(t); } catch(_) {} } });
}

export function applyZebraStripes() {
  const tables = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root table.exp-table'));
  tables.forEach((t) => {
    const tbody = t.tBodies?.[0]; if (!tbody) return; let alt = false;
    Array.from(tbody.children).forEach((tr) => { if (tr.getAttribute('data-row') === 'item') { tr.classList.toggle('exp-row-alt', alt); alt = !alt; } });
  });
}

export function shrinkSubHeaderLabels() {
  const headers = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root table.exp-table tr.exp-subheader th'));
  headers.forEach((th) => {
    th.style.fontSize = ''; th.style.whiteSpace = 'nowrap'; th.style.overflow = 'hidden'; th.style.textOverflow = 'ellipsis';
    const max = 12; const min = 9; let size = max; const fit = () => (th.scrollWidth <= th.clientWidth);
    while (size > min && !fit()) { size -= 0.5; th.style.fontSize = size + 'px'; }
  });
}

export function shrinkSingleWordCells(scope) {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const base = scope && (scope instanceof HTMLElement) ? scope : root;
  const cells = Array.from(base.querySelectorAll('table.exp-table td'));
  const isSingleWord = (s) => s && !/\s/.test(s);
  cells.forEach((td) => {
    const text = (td.textContent || '').trim();
    if (!text || !isSingleWord(text)) return;
    td.style.fontSize = '';
    const computed = Number.parseFloat(getComputedStyle(td).fontSize || '11');
    let size = Number.isFinite(computed) ? computed : 11;
    const min = 7;
    const fits = () => td.scrollWidth <= td.clientWidth && td.scrollHeight <= td.clientHeight;
    let guard = 0;
    while (!fits() && size > min && guard < 40) { size -= 0.5; td.style.fontSize = size + 'px'; guard += 1; }
  });
}

export function shrinkScheduleHeaderLabels() {
  try {
    const ths = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root table.cs-schedule thead th'));
    ths.forEach((th) => {
      th.style.fontSize = '';
      const computed = Number.parseFloat(getComputedStyle(th).fontSize || '10');
      let size = Number.isFinite(computed) ? computed : 10;
      const min = 8;
      const fits = () => (th.scrollWidth <= th.clientWidth + 0.5) && (th.scrollHeight <= th.clientHeight + 0.5);
      let guard = 0;
      while (!fits() && size > min && guard < 30) { size -= 0.5; th.style.fontSize = size + 'px'; guard += 1; }
    });
  } catch (_) {}
}

export default {
  autoPaginateTemplates,
  paginateExpDetailsTables,
  paginateGenericTplTables,
  pruneEmptyA4Pages,
  trimTrailingEmptyRows,
  applyZebraStripes,
  shrinkSubHeaderLabels,
  shrinkSingleWordCells,
  shrinkScheduleHeaderLabels,
};
