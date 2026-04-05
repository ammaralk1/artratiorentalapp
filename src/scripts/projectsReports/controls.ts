interface ReportsFiltersState {
  search: string;
  statuses: string[];
  payment: string;
  confirmed: string;
  range: string;
  startDate: string;
  endDate: string;
}

interface ReportsControlsDom {
  search?: HTMLInputElement | null;
  payment?: HTMLSelectElement | null;
  confirmed?: HTMLSelectElement | null;
  dateRange?: HTMLSelectElement | null;
  customRangeWrapper?: HTMLElement | null;
  startDate?: HTMLInputElement | null;
  endDate?: HTMLInputElement | null;
  refreshBtn?: HTMLElement | null;
}

interface ReportsControlsDeps {
  dom: ReportsControlsDom;
  filters: ReportsFiltersState;
  renderAll: () => void;
  getCurrentLanguage: () => string;
}

type FlatpickrLike = ((element: HTMLInputElement, options: Record<string, unknown>) => unknown) & {
  l10ns?: Record<string, unknown>;
};

declare global {
  interface HTMLInputElement {
    _flatpickr?: {
      open?: () => void;
      set?: (key: string, value: unknown) => void;
    };
  }

  interface Window {
    flatpickr?: FlatpickrLike;
  }
}

function bindPickerOpen(input: HTMLInputElement | null | undefined) {
  if (!input || input.dataset.openBound === 'true') return;
  input.addEventListener('click', () => input?._flatpickr?.open?.());
  input.addEventListener('focus', () => input?._flatpickr?.open?.());
  input.dataset.openBound = 'true';
}

export function ensureCustomRangePickers({
  dom,
  filters,
  renderAll,
  getCurrentLanguage,
}: ReportsControlsDeps) {
  try {
    if (!window.flatpickr) {
      try {
        const existing = document.querySelector('script[data-flatpickr-loader="true"]')
          || document.querySelector('script[src*="flatpickr"]');
        if (!existing) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
          script.async = true;
          script.dataset.flatpickrLoader = 'true';
          script.onload = () => { try { ensureCustomRangePickers({ dom, filters, renderAll, getCurrentLanguage }); } catch {} };
          document.head.appendChild(script);
        } else if (!(existing as HTMLElement).dataset.boundRetry) {
          existing.addEventListener('load', () => { try { ensureCustomRangePickers({ dom, filters, renderAll, getCurrentLanguage }); } catch {} }, { once: true });
          (existing as HTMLElement).dataset.boundRetry = 'true';
        }
      } catch {}
      setTimeout(() => { try { ensureCustomRangePickers({ dom, filters, renderAll, getCurrentLanguage }); } catch {} }, 150);
      return;
    }

    const locale = (() => {
      try {
        const lang = (getCurrentLanguage() || 'ar').toLowerCase();
        if (lang.startsWith('ar') && window.flatpickr?.l10ns?.ar) return 'ar';
      } catch {}
      return undefined;
    })();

    const baseOptions = (handlers: Record<string, unknown>) => ({
      dateFormat: 'Y-m-d',
      allowInput: true,
      clickOpens: true,
      disableMobile: true,
      appendTo: document.body,
      ...(locale ? { locale } : {}),
      ...handlers,
    });

    if (dom.startDate && !dom.startDate._flatpickr) {
      try {
        dom.startDate.removeAttribute('readonly');
        dom.startDate.setAttribute('tabindex', '0');
        dom.startDate.style.cursor = 'pointer';
        dom.startDate.setAttribute('aria-haspopup', 'dialog');
      } catch {}
      window.flatpickr(dom.startDate, baseOptions({
        onChange: (selected: Date[], dateStr: string) => {
          filters.startDate = dateStr || '';
          if (dom.endDate?._flatpickr && selected?.length) {
            dom.endDate._flatpickr.set?.('minDate', selected[0]);
          }
          if (filters.range === 'custom') renderAll();
        },
        onValueUpdate: (_selected: Date[], dateStr: string) => {
          filters.startDate = dateStr || '';
          if (filters.range === 'custom') renderAll();
        },
      }));
      bindPickerOpen(dom.startDate);
    }

    if (dom.endDate && !dom.endDate._flatpickr) {
      try {
        dom.endDate.removeAttribute('readonly');
        dom.endDate.setAttribute('tabindex', '0');
        dom.endDate.style.cursor = 'pointer';
        dom.endDate.setAttribute('aria-haspopup', 'dialog');
      } catch {}
      window.flatpickr(dom.endDate, baseOptions({
        onChange: (selected: Date[], dateStr: string) => {
          filters.endDate = dateStr || '';
          if (dom.startDate?._flatpickr && selected?.length) {
            dom.startDate._flatpickr.set?.('maxDate', selected[0]);
          }
          if (filters.range === 'custom') renderAll();
        },
        onValueUpdate: (_selected: Date[], dateStr: string) => {
          filters.endDate = dateStr || '';
          if (filters.range === 'custom') renderAll();
        },
      }));
      bindPickerOpen(dom.endDate);
    }

    const wrap = dom.customRangeWrapper;
    if (wrap && wrap.dataset.openBound !== 'true') {
      wrap.addEventListener('click', (event) => {
        const target = event.target;
        if (target === dom.startDate) {
          dom.startDate?._flatpickr?.open?.();
          return;
        }
        if (target === dom.endDate) {
          dom.endDate?._flatpickr?.open?.();
          return;
        }
        dom.startDate?._flatpickr?.open?.();
      });
      wrap.dataset.openBound = 'true';
    }
  } catch {}
}

export function handleDateRangeChange(
  value: string,
  deps: ReportsControlsDeps,
) {
  deps.filters.range = value;
  if (value === 'custom') {
    deps.dom.customRangeWrapper?.classList.add('active');
    ensureCustomRangePickers(deps);
    return;
  }

  deps.dom.customRangeWrapper?.classList.remove('active');
  deps.filters.startDate = '';
  deps.filters.endDate = '';
  if (deps.dom.startDate) deps.dom.startDate.value = '';
  if (deps.dom.endDate) deps.dom.endDate.value = '';
  deps.renderAll();
}

export function setupReportFilters(deps: ReportsControlsDeps) {
  const { dom, filters, renderAll } = deps;

  if (dom.search) {
    let debounceTimer: number | undefined;
    dom.search.addEventListener('input', () => {
      if (debounceTimer) window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        filters.search = dom.search?.value.trim() || '';
        renderAll();
      }, 180);
    });
  }

  if (dom.payment) {
    dom.payment.value = filters.payment;
    dom.payment.addEventListener('change', () => {
      filters.payment = dom.payment?.value || 'all';
      renderAll();
    });
  }

  if (dom.confirmed) {
    dom.confirmed.value = filters.confirmed || 'all';
    dom.confirmed.addEventListener('change', () => {
      filters.confirmed = dom.confirmed?.value || 'all';
      renderAll();
    });
  }

  if (dom.dateRange) {
    dom.dateRange.addEventListener('change', (event) => {
      handleDateRangeChange((event.target as HTMLSelectElement)?.value || '', deps);
    });
    dom.dateRange.value = filters.range;
    if (dom.dateRange.value === 'custom') {
      ensureCustomRangePickers(deps);
    }
  }

  if (dom.startDate) {
    dom.startDate.addEventListener('change', () => {
      filters.startDate = dom.startDate?.value || '';
      if (filters.range === 'custom') renderAll();
    });
  }

  if (dom.endDate) {
    dom.endDate.addEventListener('change', () => {
      filters.endDate = dom.endDate?.value || '';
      if (filters.range === 'custom') renderAll();
    });
  }

  if (dom.refreshBtn) {
    dom.refreshBtn.addEventListener('click', () => {
      if (filters.range !== 'custom') {
        renderAll();
        return;
      }
      filters.startDate = dom.startDate?.value || '';
      filters.endDate = dom.endDate?.value || '';
      renderAll();
    });
  }
}
