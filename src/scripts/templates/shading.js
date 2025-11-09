// Shading snapshot/apply utilities for Call Sheet tables
// Capture [table,row,cell] shading marks and re-apply them safely

export function snapshotShading(root) {
  try {
    const scope = root.querySelector('.callsheet-v1');
    if (!scope) return [];
    const tables = Array.from(scope.querySelectorAll('table'));
    const out = [];
    tables.forEach((t, ti) => {
      const tp = t.classList.contains('cs-schedule') ? 'schedule'
        : t.classList.contains('cs-cast') ? 'cast'
        : t.classList.contains('cs-info') ? 'info'
        : '';
      const rows = Array.from(t.querySelectorAll('tr'));
      rows.forEach((tr, ri) => {
        const cells = Array.from(tr.children);
        cells.forEach((td, ci) => {
          if (td.getAttribute && td.getAttribute('data-shaded') === '1') {
            const shade = td.style.getPropertyValue('--shade') || td.style.backgroundColor || '';
            out.push({ ti, ri, ci, shade, tp });
          }
        });
      });
    });
    return out;
  } catch(_) { return []; }
}

export function applyShadingSnapshot(root, list) {
  try {
    const scope = root.querySelector('.callsheet-v1');
    if (!scope || !Array.isArray(list)) return;
    const tables = Array.from(scope.querySelectorAll('table'));
    const schedTables = Array.from(scope.querySelectorAll('table.cs-schedule'));
    list.forEach((it) => {
      let td = null;
      if (it.tp === 'schedule' && schedTables.length) {
        // Map logical row index across paginated schedule tables if needed
        let remain = Number(it.ri) || 0;
        let trSel = null;
        for (let k = 0; k < schedTables.length; k += 1) {
          const rows = schedTables[k].querySelectorAll('tbody tr');
          const count = rows.length;
          if (remain < count) { trSel = rows[remain]; break; }
          remain -= count;
        }
        if (!trSel) {
          // Fallback to last schedule table last row
          const lastT = schedTables[schedTables.length - 1];
          const rows = lastT ? lastT.querySelectorAll('tbody tr') : null;
          trSel = rows ? rows[rows.length - 1] : null;
        }
        td = trSel && trSel.children?.[it.ci];
      } else {
        const t = tables[it.ti];
        const tr = t && t.querySelectorAll('tr')?.[it.ri];
        td = tr && tr.children?.[it.ci];
      }
      if (td) {
        try { td.setAttribute('data-shaded', '1'); td.style.setProperty('--shade', it.shade); td.style.setProperty('background', 'var(--shade)', 'important'); td.style.setProperty('background-color', 'var(--shade)', 'important'); } catch(_) {}
      }
    });
  } catch(_) {}
}

export default { snapshotShading, applyShadingSnapshot };

