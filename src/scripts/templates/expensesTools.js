import { shrinkSingleWordCells } from './pagination.js';

// Bind click actions for Expenses table row controls
// Expected button markup: [data-action="row-up|row-down|row-add|row-delete"]
export function bindExpensesRowActions(host, { onAfterChange, onTotalsChange, onRenumber } = {}) {
  if (!host) return () => {};
  const onClick = (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const tr = btn.closest('tr');
    const tbody = tr?.parentElement;
    if (!tr || !tbody) return;
    if (action === 'row-up' && tr.previousElementSibling && !tr.previousElementSibling.matches('[data-section-bar]')) {
      tbody.insertBefore(tr, tr.previousElementSibling);
    } else if (action === 'row-down' && tr.nextElementSibling) {
      tbody.insertBefore(tr.nextElementSibling, tr);
    } else if (action === 'row-add') {
      const clone = tr.cloneNode(true);
      clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
      tbody.insertBefore(clone, tr.nextElementSibling);
    } else if (action === 'row-delete') {
      tbody.removeChild(tr);
    }
    try { if (typeof onRenumber === 'function') onRenumber(); } catch (_) {}
    try { if (typeof onTotalsChange === 'function') onTotalsChange(); } catch (_) {}
    try { shrinkSingleWordCells(tbody); } catch (_) {}
    try { if (typeof onAfterChange === 'function') onAfterChange(); } catch (_) {}
  };
  host.addEventListener('click', onClick);
  return () => { try { host.removeEventListener('click', onClick); } catch (_) {} };
}

export default { bindExpensesRowActions };

