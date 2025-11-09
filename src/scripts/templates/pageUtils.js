export function pageHasMeaningfulContent(pg) {
  try {
    if (!pg) return false;
    // Expenses: either Top Sheet present, or at least one data row in details
    const hasTop = !!pg.querySelector('#expenses-top-sheet');
    const hasDetailsRow = !!pg.querySelector('table.exp-details tbody tr[data-row="item"]');
    // Generic template rows (schedule/crew/shotlist/etc.) with any non-empty cell
    const hasTplRows = !!Array.from(pg.querySelectorAll('table.tpl-table tbody tr')).find((tr) => {
      try {
        if (tr.classList?.contains('cs-row-note') || tr.classList?.contains('cs-row-strong')) return true;
        const tds = Array.from(tr.querySelectorAll('td'));
        return tds.some((td) => ((td.textContent || '').trim().length > 0));
      } catch (_) { return false; }
    });
    // Crew table rows considered content
    const hasCrew = !!Array.from(pg.querySelectorAll('.callsheet-v1 table.cs-crew tbody tr')).find((tr) => {
      try { return Array.from(tr.querySelectorAll('td')).some((td)=>((td.textContent||'').trim().length>0)); } catch(_) { return false; }
    });
    // Call sheet non-table blocks also count
    const hasCallsheet = !!pg.querySelector('.callsheet-v1 .cs-header, .callsheet-v1 .cs-info td, .callsheet-v1 .cs-cast td');
    return hasTop || hasDetailsRow || hasTplRows || hasCrew || hasCallsheet;
  } catch (_) { return true; }
}

export default { pageHasMeaningfulContent };

