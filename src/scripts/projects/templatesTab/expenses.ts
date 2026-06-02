interface ProjectLike {
  applyTax?: unknown;
}

interface RecomputeExpensesSubtotalsOptions {
  root?: ParentNode | null;
  formatIntNoDecimals: (value: unknown) => string;
  getSelectedProject: () => ProjectLike | null;
  projectTaxRate: number;
  translate: (key: string, fallback: string) => string;
  autoPaginateTemplates: () => void;
  paginateExpDetailsTables: () => void;
}

function parseExpensesNumber(value: unknown, fallback = 0): number {
  try {
    const mapped = String(value || '')
      .replace(/[\u0660-\u0669]/g, (digit) => '0123456789'[digit.charCodeAt(0) - 0x0660])
      .replace(/[\u06F0-\u06F9]/g, (digit) => '0123456789'[digit.charCodeAt(0) - 0x06f0])
      .replace(/[\u066B]/g, '.')
      .replace(/[\u066C]/g, '')
      .replace(/[\u200f\u200e]/g, '')
      .replace(/[^\d.\-]/g, '');
    const parsed = Number(mapped);
    return Number.isFinite(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function isEditingExpensesCell(): boolean {
  try {
    const active = document.activeElement;
    return Boolean(
      active &&
      (active.getAttribute('contenteditable') === 'true' || active.closest('[contenteditable="true"]')) &&
      active.closest('#templates-a4-root table.exp-details'),
    );
  } catch {
    return false;
  }
}

function escapeSelectorValue(value: string): string {
  try {
    return typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(value)
      : String(value).replace(/["\\]/g, '\\$&');
  } catch {
    return String(value);
  }
}

function collectExpenseGroupKeys(host: Element): string[] {
  const keys = new Set<string>();
  Array.from(host.querySelectorAll<HTMLElement>('tr[data-subgroup-marker]')).forEach((marker) => {
    const key = String(marker.getAttribute('data-parent-group') || '').trim();
    if (key) keys.add(key);
  });
  return Array.from(keys);
}

export function recomputeExpensesSubtotals(options: RecomputeExpensesSubtotalsOptions): void {
  const host = options.root ?? document.querySelector('#templates-preview-host');
  if (!(host instanceof Element)) return;

  const multi = Array.from(host.querySelectorAll<HTMLTableElement>('table.exp-details'));
  const legacyTable = host.querySelector<HTMLTableElement>('#expenses-table');
  const tables = multi.length ? multi : legacyTable ? [legacyTable] : [];
  if (!tables.length) return;

  if (tables[0]?.classList.contains('exp-table')) {
    const groupTotals = Object.fromEntries(collectExpenseGroupKeys(host).map((key) => [key, 0])) as Record<string, number>;
    let grand = 0;
    const subgroupTotals: Record<string, number> = {};
    const subgroupCounts: Record<string, number> = {};

    const headers = tables.flatMap((table) => Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr[data-subgroup-header]')));
    headers.forEach((header) => {
      const code = header.getAttribute('data-subgroup') || '';
      let subtotal = 0;
      let count = 0;
      let row = header.nextElementSibling as HTMLTableRowElement | null;
      while (row && !row.hasAttribute('data-subgroup-header') && !row.hasAttribute('data-subgroup-subtotal')) {
        if (row.getAttribute('data-row') === 'item') {
          const cells = row.children;
          const rate = parseExpensesNumber(cells[2]?.textContent, 0);
          const amount = parseExpensesNumber(cells[3]?.textContent, 1);
          const multiplier = parseExpensesNumber(cells[4]?.textContent, 1);
          const total = amount * multiplier * rate;
          if (cells[6]) {
            cells[6].textContent = options.formatIntNoDecimals(total);
            try {
              cells[6].setAttribute('data-num', '1');
            } catch {
              // ignore attribute failures
            }
          }
          subtotal += total;
          const hasContent =
            String(cells[1]?.textContent || '').trim().length ||
            parseExpensesNumber(cells[2]?.textContent, 0) ||
            parseExpensesNumber(cells[3]?.textContent, 0);
          if (hasContent) count += 1;
        }
        row = row.nextElementSibling as HTMLTableRowElement | null;
      }

      const subtotalCell = host.querySelector<HTMLElement>(`[data-subtotal="${escapeSelectorValue(code)}"]`);
      if (subtotalCell) subtotalCell.textContent = options.formatIntNoDecimals(subtotal);

      subgroupTotals[code] = subtotal;
      subgroupCounts[code] = count;
      grand += subtotal;

      const marker = host.querySelector<HTMLElement>(`tr[data-subgroup-marker="${escapeSelectorValue(code)}"]`);
      const parent = marker?.getAttribute('data-parent-group') || null;
      if (parent && groupTotals[parent] != null) groupTotals[parent] += subtotal;
    });

    Object.entries(groupTotals).forEach(([key, value]) => {
      const cell = host.querySelector<HTMLElement>(`[data-total-group="${escapeSelectorValue(key)}"]`);
      if (cell) cell.textContent = options.formatIntNoDecimals(value);
    });
    const grandCell = host.querySelector<HTMLElement>('[data-grand-total]');
    if (grandCell) grandCell.textContent = options.formatIntNoDecimals(grand);

    try {
      Object.entries(subgroupTotals).forEach(([code, value]) => {
        const count = subgroupCounts[code] || 0;
        const countEl = host.querySelector<HTMLElement>(`#expenses-top-sheet [data-top-count="${escapeSelectorValue(code)}"]`);
        const totalEl = host.querySelector<HTMLElement>(`#expenses-top-sheet [data-top-total="${escapeSelectorValue(code)}"]`);
        if (countEl) countEl.textContent = options.formatIntNoDecimals(count);
        if (totalEl) totalEl.textContent = options.formatIntNoDecimals(value);
      });
      Object.entries(groupTotals).forEach(([key, value]) => {
        const totalEl = host.querySelector<HTMLElement>(`#expenses-top-sheet [data-top-total-group="${escapeSelectorValue(key)}"]`);
        if (totalEl) totalEl.textContent = options.formatIntNoDecimals(value);
      });
      const topGrand = host.querySelector<HTMLElement>('#expenses-top-sheet [data-top-grand]');
      if (topGrand) topGrand.textContent = options.formatIntNoDecimals(grand);
    } catch {
      // ignore top-sheet failures
    }

    const project = options.getSelectedProject();
    const currencyLabel = options.translate('reservations.create.summary.currency', 'SR');
    const applyTax = Boolean(project?.applyTax);
    const taxAmount = applyTax ? Math.round(grand * options.projectTaxRate) : 0;
    const totalWithTax = Math.round(grand + taxAmount);
    const subtotalEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-subtotal]');
    const taxEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-tax]');
    const totalEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-total]');
    if (subtotalEl) subtotalEl.textContent = `${options.formatIntNoDecimals(grand)} ${currencyLabel}`;
    if (taxEl) taxEl.textContent = applyTax ? `${options.formatIntNoDecimals(taxAmount)} ${currencyLabel}` : `0 ${currencyLabel}`;
    if (totalEl) totalEl.textContent = `${options.formatIntNoDecimals(totalWithTax)} ${currencyLabel}`;

    if (!isEditingExpensesCell()) {
      requestAnimationFrame(() => {
        try {
          options.autoPaginateTemplates();
        } catch {
          // ignore pagination failures
        }
      });
    }
    return;
  }

  if (!legacyTable) return;

  let running = 0;
  let grand = 0;
  Array.from(legacyTable.querySelectorAll<HTMLTableRowElement>('tbody tr')).forEach((row) => {
    if (row.matches('[data-section-bar]')) {
      running = 0;
      return;
    }
    if (row.classList.contains('tpl-subtotal-row')) {
      const cell = row.querySelector<HTMLElement>('[data-subtotal]') || row.children[5] as HTMLElement | undefined;
      if (cell) cell.textContent = options.formatIntNoDecimals(running || 0);
      return;
    }
    const qty = Number(String(row.children[3]?.textContent || '1').replace(/[^\d.\-]/g, '')) || 1;
    const rate = Number(String(row.children[4]?.textContent || '0').replace(/[^\d.\-]/g, '')) || 0;
    const total = qty * rate;
    if (row.children[5]) row.children[5].textContent = options.formatIntNoDecimals(total);
    running += total;
    grand += total;
  });

  const project = options.getSelectedProject();
  const currencyLabel = options.translate('reservations.create.summary.currency', 'SR');
  const applyTax = Boolean(project?.applyTax);
  const taxAmount = applyTax ? Math.round(grand * options.projectTaxRate) : 0;
  const totalWithTax = Math.round(grand + taxAmount);
  const subtotalEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-subtotal]');
  const taxEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-tax]');
  const totalEl = host.querySelector<HTMLElement>('#expenses-summary [data-summary-total]');
  if (subtotalEl) subtotalEl.textContent = `${options.formatIntNoDecimals(grand)} ${currencyLabel}`;
  if (taxEl) taxEl.textContent = applyTax ? `${options.formatIntNoDecimals(taxAmount)} ${currencyLabel}` : `0 ${currencyLabel}`;
  if (totalEl) totalEl.textContent = `${options.formatIntNoDecimals(totalWithTax)} ${currencyLabel}`;

  if (!isEditingExpensesCell()) {
    requestAnimationFrame(() => {
      try {
        options.autoPaginateTemplates();
      } catch {
        // ignore pagination failures
      }
    });
    requestAnimationFrame(() => {
      try {
        options.paginateExpDetailsTables();
      } catch {
        // ignore pagination failures
      }
    });
  }
}

export function renumberExpenseCodes(root: ParentNode | null = document.querySelector('#templates-preview-host #templates-a4-root')): void {
  if (!(root instanceof Element)) return;

  const tables = Array.from(root.querySelectorAll<HTMLTableElement>('table.exp-details'));
  if (!tables.length) return;

  const counters = new Map<string, number>();
  const isHeader = (row: Element | null): boolean => Boolean(row?.hasAttribute('data-subgroup-header'));
  const isSubtotal = (row: Element | null): boolean => Boolean(row?.hasAttribute('data-subgroup-subtotal'));
  const isItem = (row: Element | null): boolean => row?.getAttribute('data-row') === 'item';
  const getPrefix = (subCode: string): string => String(subCode || '').split('-')[0] || '';

  tables.forEach((table) => {
    const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody > tr'));
    let activeSubCode = '';
    let prefix = '';
    let count = 0;

    rows.forEach((row) => {
      if (isHeader(row)) {
        activeSubCode = row.getAttribute('data-subgroup') || '';
        prefix = getPrefix(activeSubCode);
        count = counters.get(activeSubCode) || 0;
        return;
      }
      if (isSubtotal(row)) {
        if (activeSubCode) counters.set(activeSubCode, count);
        activeSubCode = '';
        prefix = '';
        return;
      }
      if (isItem(row) && prefix) {
        count += 1;
        const codeCell = row.children[0];
        if (codeCell && codeCell.hasAttribute('contenteditable')) {
          codeCell.textContent = `${prefix}-${String(count).padStart(2, '0')}`;
        }
      }
    });

    if (activeSubCode) counters.set(activeSubCode, count);
  });
}
