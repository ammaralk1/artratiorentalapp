import { normalizeNumbers } from './utils.js';
import { normalizeText } from './reservationsShared.js';

export function resolveQuickDateRange(range) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (range === 'today') {
    return { startDate: toDateInputValue(today), endDate: toDateInputValue(today) };
  }

  if (range === 'week') {
    const start = new Date(today);
    const day = start.getDay();
    const diff = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
  }

  if (range === 'month') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
  }

  if (range === 'upcoming') {
    return { startDate: toDateInputValue(today), endDate: '' };
  }

  return { startDate: '', endDate: '' };
}

export function getReservationFilters() {
  const searchInput = document.getElementById('search-reservation');
  const startInput = document.getElementById('filter-start-date');
  const endInput = document.getElementById('filter-end-date');
  const rangeSelect = document.getElementById('reservation-date-range');
  const statusSelect = document.getElementById('reservation-status-filter');

  let startDate = normalizeNumbers(startInput?.value || '').trim();
  let endDate = normalizeNumbers(endInput?.value || '').trim();
  let quickRange = rangeSelect?.value || '';

  const allowedRanges = new Set(['', 'today', 'week', 'month']);
  if (!allowedRanges.has(quickRange)) {
    quickRange = '';
    if (rangeSelect) rangeSelect.value = '';
    clearInput(startInput);
    clearInput(endInput);
    startDate = '';
    endDate = '';
  }

  if (!startDate && !endDate && quickRange) {
    const resolved = resolveQuickDateRange(quickRange);
    startDate = resolved.startDate;
    endDate = resolved.endDate;
  }

  return {
    searchTerm: normalizeText(searchInput?.value || ''),
    startDate,
    endDate,
    status: statusSelect?.value || '',
    quickRange
  };
}

export function setupReservationFilters(onChange) {
  const trigger = () => {
    if (typeof onChange === 'function') {
      onChange();
    }
  };

  const searchInput = document.getElementById('search-reservation');
  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      trigger();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  const startInput = document.getElementById('filter-start-date');
  if (startInput && !startInput.dataset.listenerAttached) {
    startInput.addEventListener('change', () => {
      const rangeSelect = document.getElementById('reservation-date-range');
      if (rangeSelect) rangeSelect.value = '';
      trigger();
    });
    startInput.dataset.listenerAttached = 'true';
  }

  const endInput = document.getElementById('filter-end-date');
  if (endInput && !endInput.dataset.listenerAttached) {
    endInput.addEventListener('change', () => {
      const rangeSelect = document.getElementById('reservation-date-range');
      if (rangeSelect) rangeSelect.value = '';
      trigger();
    });
    endInput.dataset.listenerAttached = 'true';
  }

  const rangeSelect = document.getElementById('reservation-date-range');
  if (rangeSelect && !rangeSelect.dataset.listenerAttached) {
    rangeSelect.addEventListener('change', () => {
      applyQuickDateRangeSelection(rangeSelect.value);
      trigger();
    });
    rangeSelect.dataset.listenerAttached = 'true';
  }

  const statusSelect = document.getElementById('reservation-status-filter');
  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener('change', trigger);
    statusSelect.dataset.listenerAttached = 'true';
  }

  const clearBtn = document.getElementById('clear-filters');
  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      clearInput(startInput);
      clearInput(endInput);
      if (rangeSelect) rangeSelect.value = '';
      if (statusSelect) statusSelect.value = '';
      trigger();
    });
    clearBtn.dataset.listenerAttached = 'true';
  }
}

export function applyQuickDateRangeSelection(range) {
  const startInput = document.getElementById('filter-start-date');
  const endInput = document.getElementById('filter-end-date');
  if (!startInput || !endInput) return;

  const { startDate, endDate } = resolveQuickDateRange(range);

  if (startInput._flatpickr) {
    if (startDate) {
      startInput._flatpickr.setDate(startDate, false, 'Y-m-d');
    } else {
      startInput._flatpickr.clear();
    }
  } else {
    startInput.value = startDate;
  }

  if (endInput._flatpickr) {
    if (endDate) {
      endInput._flatpickr.setDate(endDate, false, 'Y-m-d');
    } else {
      endInput._flatpickr.clear();
    }
  } else {
    endInput.value = endDate;
  }
}

function toDateInputValue(date) {
  if (!date) return '';
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date.getTime() - tzOffset).toISOString();
  return localISO.split('T')[0];
}

function clearInput(input) {
  if (!input) return;
  if (input._flatpickr) input._flatpickr.clear();
  input.value = '';
}
