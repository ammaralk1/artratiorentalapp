import reportsState from '../state.js';

const filters = reportsState.filters;

export function setupColumnControls(applyColumnVisibility) {
  if (reportsState.columnControlsBound) return;
  const container = document.getElementById('reports-column-controls');
  if (!container) return;

  container.querySelectorAll('input[data-column-toggle]').forEach((input) => {
    const key = input.dataset.columnToggle;
    if (!key) return;
    input.checked = reportsState.columnPreferences[key] !== false;
    input.addEventListener('change', () => {
      reportsState.columnPreferences[key] = input.checked;
      applyColumnVisibility();
    });
  });

  reportsState.columnControlsBound = true;
  applyColumnVisibility();
}

export function applyColumnVisibility() {
  Object.entries(reportsState.columnPreferences).forEach(([column, visible]) => {
    document.querySelectorAll(`[data-report-column="${column}"]`).forEach((element) => {
      element.classList.toggle('hidden', !visible);
    });
  });
}

export function setupExportButtons(handler) {
  if (reportsState.exportHandlersBound) return;
  const buttons = document.querySelectorAll('[data-export]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const { export: type = '' } = button.dataset;
      if (!type) return;
      button.disabled = true;
      try {
        await handler(type);
      } catch (error) {
        console.error('⚠️ [reports] export failed', error);
      } finally {
        button.disabled = false;
      }
    });
  });

  reportsState.exportHandlersBound = true;
}

export function applySearchFilter(value, renderCallback) {
  if (reportsState.searchDebounceTimer) {
    clearTimeout(reportsState.searchDebounceTimer);
    reportsState.searchDebounceTimer = null;
  }
  reportsState.searchDebounceTimer = setTimeout(() => {
    filters.search = value || '';
    renderCallback();
  }, 220);
}

export function handleTrendDrilldown(item, renderCallback) {
  if (!item) return;
  filters.range = 'custom';
  filters.start = item.startInput || null;
  filters.end = item.endInput || null;
  renderCallback();
}

export function handleStatusDrilldown(filterKey, renderCallback) {
  if (!filterKey) return;
  filters.status = filters.status === filterKey ? 'all' : filterKey;
  renderCallback();
}

export function handlePaymentDrilldown(filterKey, renderCallback) {
  if (!filterKey) return;
  filters.payment = filters.payment === filterKey ? 'all' : filterKey;
  renderCallback();
}

export function handleTopListDrilldown(searchValue, renderCallback) {
  if (!searchValue) return;
  filters.search = searchValue;
  renderCallback();
}
