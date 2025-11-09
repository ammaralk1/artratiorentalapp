export function getCellIndex(td) {
  if (!td || !td.parentElement) return -1;
  const cells = Array.from(td.parentElement.children);
  return cells.indexOf(td);
}

export function isSpecialRow(tr) {
  return tr?.matches('[data-section-bar]') || tr?.classList.contains('tpl-subtotal-row');
}

export function focusFirstEditableCell(tr, preferCol = 0) {
  if (!tr) return;
  const cells = Array.from(tr.children);
  const preferred = cells[preferCol];
  if (preferred && preferred.hasAttribute('contenteditable')) { preferred.focus(); return; }
  const candidate = cells.find((td) => td.hasAttribute('contenteditable'));
  candidate?.focus();
}

export function addRowBelow(tr) {
  if (!tr) return null;
  const tbody = tr.parentElement;
  const clone = tr.cloneNode(true);
  clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
  tbody.insertBefore(clone, tr.nextElementSibling);
  return clone;
}

export function moveRow(tr, dir = -1) {
  if (!tr) return;
  const tbody = tr.parentElement;
  if (dir < 0) {
    const prev = tr.previousElementSibling;
    if (prev && !isSpecialRow(prev)) tbody.insertBefore(tr, prev);
  } else {
    const next = tr.nextElementSibling;
    if (next) {
      const afterNext = next.nextElementSibling;
      if (!isSpecialRow(next)) tbody.insertBefore(next, tr); // swap
      else if (afterNext && !isSpecialRow(afterNext)) tbody.insertBefore(tr, afterNext.nextElementSibling);
    }
  }
}

export function deleteRow(tr) {
  if (!tr) return;
  if (isSpecialRow(tr)) return;
  const tbody = tr.parentElement;
  try { tbody.removeChild(tr); } catch (_) {}
}

export default { getCellIndex, isSpecialRow, focusFirstEditableCell, addRowBelow, moveRow, deleteRow };

