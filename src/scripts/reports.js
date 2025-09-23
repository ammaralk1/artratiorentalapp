import { loadData } from './storage.js';
import { isReservationCompleted } from './reservationsShared.js';
import { t, getCurrentLanguage } from './language.js';
import { normalizeNumbers } from './utils.js';

let cachedLocale = null;
let numberFormatter = null;
let currencyFormatter = null;

const state = {
  range: 'last30',
  status: 'all',
  payment: 'all',
  start: null,
  end: null
};

let initialized = false;
let languageListenerAttached = false;

function translate(key, arFallback, enFallback = arFallback) {
  const fallback = getCurrentLanguage() === 'en' ? (enFallback ?? arFallback) : arFallback;
  return t(key, fallback);
}

function handleLanguageChange() {
  resetFormatters();
  renderReports();
  // إعادة التنفيذ بعد دورة حدث واحدة لضمان اكتمال تحميل الترجمات
  setTimeout(() => {
    resetFormatters();
    renderReports();
  }, 0);
  setTimeout(() => {
    resetFormatters();
    renderReports();
  }, 60);
}

function resetFormatters() {
  cachedLocale = null;
  numberFormatter = null;
  currencyFormatter = null;
}

function getActiveLocale() {
  const lang = (getCurrentLanguage() || 'ar').toLowerCase();
  return lang.startsWith('ar') ? 'ar-SA' : 'en-US';
}

function getFormatters() {
  const language = getCurrentLanguage();
  if (language !== cachedLocale || !numberFormatter || !currencyFormatter) {
    cachedLocale = language;
    const locale = getActiveLocale();
    numberFormatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    currencyFormatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    });
  }
  return { numberFormatter, currencyFormatter };
}

function getMonthLabel(date) {
  const locale = getActiveLocale();
  return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
}

export function initReports() {
  if (initialized) return;
  initialized = true;

  const rangeSelect = document.getElementById('reports-range');
  const statusSelect = document.getElementById('reports-status-filter');
  const paymentSelect = document.getElementById('reports-payment-filter');
  const startInput = document.getElementById('reports-start');
  const endInput = document.getElementById('reports-end');
  const refreshBtn = document.getElementById('reports-refresh');
  const customRangeWrapper = document.getElementById('reports-custom-range');

  if (!rangeSelect) {
    return;
  }

  rangeSelect.addEventListener('change', () => {
    state.range = rangeSelect.value;
    toggleCustomRange(customRangeWrapper, state.range === 'custom');
    if (state.range !== 'custom') {
      state.start = null;
      state.end = null;
    }
    renderReports();
  });

  statusSelect?.addEventListener('change', () => {
    state.status = statusSelect.value;
    renderReports();
  });

  paymentSelect?.addEventListener('change', () => {
    state.payment = paymentSelect.value;
    renderReports();
  });

  startInput?.addEventListener('change', () => {
    state.start = startInput.value || null;
  });

  endInput?.addEventListener('change', () => {
    state.end = endInput.value || null;
  });

  refreshBtn?.addEventListener('click', () => {
    if (state.range === 'custom') {
      state.start = startInput?.value || null;
      state.end = endInput?.value || null;
    }
    renderReports();
  });

  setupCustomRangePickers(startInput, endInput);
  toggleCustomRange(customRangeWrapper, false);
  renderReports();

  if (!languageListenerAttached) {
    document.addEventListener('language:changed', handleLanguageChange);
    document.addEventListener('language:translationsReady', handleLanguageChange);
    languageListenerAttached = true;
  }
}

export function renderReports() {
  const { reservations = [], customers = [], equipment = [] } = loadData();

  const filtered = filterReservations(reservations, state);
  const metrics = calculateMetrics(filtered);
  const trend = calculateMonthlyTrend(filtered);
  const statusBreakdown = calculateStatusBreakdown(filtered);
  const paymentBreakdown = calculatePaymentBreakdown(filtered);
  const topCustomers = calculateTopCustomers(filtered, customers);
  const topEquipment = calculateTopEquipment(filtered, equipment);

  updateKpiCards(metrics);
  renderTrendChart(trend);
  renderProgressSection('reports-status-breakdown', statusBreakdown);
  renderProgressSection('reports-payment-breakdown', paymentBreakdown);
  renderTopCustomers(topCustomers);
  renderTopEquipment(topEquipment);
  toggleEmptyState(filtered.length === 0);
}

function setupCustomRangePickers(startInput, endInput) {
  if (!window.flatpickr) return;

  const locale = window.flatpickr?.l10ns?.ar ? window.flatpickr.l10ns.ar : undefined;
  let startPickerInstance = null;
  let endPickerInstance = null;

  if (startInput) {
    startPickerInstance = window.flatpickr(startInput, {
      dateFormat: 'Y-m-d',
      allowInput: true,
      disableMobile: true,
      locale,
      onChange(selectedDates, dateStr) {
        state.start = dateStr || null;
        if (!endPickerInstance) return;
        if (selectedDates?.length) {
          endPickerInstance.set('minDate', selectedDates[0]);
        } else {
          endPickerInstance.set('minDate', null);
        }
      },
      onValueUpdate(_, dateStr) {
        state.start = dateStr || null;
      }
    });
  }

  if (endInput) {
    endPickerInstance = window.flatpickr(endInput, {
      dateFormat: 'Y-m-d',
      allowInput: true,
      disableMobile: true,
      locale,
      onChange(selectedDates, dateStr) {
        state.end = dateStr || null;
        if (!startPickerInstance) return;
        if (selectedDates?.length) {
          startPickerInstance.set('maxDate', selectedDates[0]);
        } else {
          startPickerInstance.set('maxDate', null);
        }
      },
      onValueUpdate(_, dateStr) {
        state.end = dateStr || null;
      }
    });
  }

  if (startPickerInstance && endInput?.value) {
    startPickerInstance.setDate(startInput.value, false);
    startPickerInstance.set('maxDate', endPickerInstance?.selectedDates?.[0] || endInput.value);
  }

  if (endPickerInstance && startInput?.value) {
    endPickerInstance.setDate(endInput.value, false);
    endPickerInstance.set('minDate', startPickerInstance?.selectedDates?.[0] || startInput.value);
  }
}

function toggleCustomRange(wrapper, isActive) {
  if (!wrapper) return;
  wrapper.classList.toggle('active', Boolean(isActive));
}

function filterReservations(reservations, filters) {
  const { startDate, endDate } = resolveRange(filters);

  return (reservations || []).filter((reservation) => {
    const start = reservation?.start ? new Date(reservation.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;

    if (startDate && start < startDate) return false;
    if (endDate && start > endDate) return false;

    if (filters.status === 'confirmed' && !isReservationConfirmed(reservation)) return false;
    if (filters.status === 'pending' && isReservationConfirmed(reservation)) return false;
    if (filters.status === 'completed' && !isReservationCompleted(reservation)) return false;

    if (filters.payment === 'paid' && !reservation?.paid) return false;
    if (filters.payment === 'unpaid' && reservation?.paid) return false;

    return true;
  });
}

function resolveRange({ range, start, end }) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (range === 'custom') {
    const startDate = start ? new Date(`${start}T00:00:00`) : null;
    const endDate = end ? new Date(`${end}T23:59:59`) : null;
    return { startDate: isValidDate(startDate) ? startDate : null, endDate: isValidDate(endDate) ? endDate : null };
  }

  const endDate = new Date(now);
  let startDate = null;

  switch (range) {
    case 'last30': {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 29);
      break;
    }
    case 'thisMonth': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'thisQuarter': {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      break;
    }
    case 'thisYear': {
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    }
    case 'all':
    default:
      startDate = null;
      break;
  }

  if (startDate) {
    startDate.setHours(0, 0, 0, 0);
  }

  return { startDate, endDate };
}

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function isReservationConfirmed(reservation) {
  return reservation?.confirmed === true || reservation?.confirmed === 'true';
}

function calculateMetrics(reservations) {
  const total = reservations.length;
  const confirmed = reservations.filter(isReservationConfirmed).length;
  const completed = reservations.filter(isReservationCompleted).length;
  const paidCount = reservations.filter((res) => res?.paid).length;

  const revenue = reservations.reduce((sum, res) => sum + (Number(res?.cost) || 0), 0);
  const average = total ? revenue / total : 0;

  return {
    total,
    confirmed,
    completed,
    paidCount,
    revenue,
    average
  };
}

function calculateMonthlyTrend(reservations) {
  const now = new Date();
  const result = [];

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthReservations = reservations.filter((res) => {
      const start = res?.start ? new Date(res.start) : null;
      return start && start.getFullYear() === year && start.getMonth() === month;
    });

    const count = monthReservations.length;
    const revenue = monthReservations.reduce((sum, res) => sum + (Number(res?.cost) || 0), 0);

    const label = getMonthLabel(date);

    result.push({ label, count, revenue });
  }

  return result;
}

function calculateStatusBreakdown(reservations) {
  const total = reservations.length || 1;
  const confirmed = reservations.filter(isReservationConfirmed).length;
  const pending = reservations.length - confirmed;
  const completed = reservations.filter(isReservationCompleted).length;

  return [
    {
      label: translate('reservations.reports.status.confirmedLabel', 'مؤكدة', 'Confirmed'),
      value: confirmed,
      percent: Math.round((confirmed / total) * 100) || 0,
      rawCount: confirmed,
      className: 'status-confirmed'
    },
    {
      label: translate('reservations.reports.status.pendingLabel', 'قيد التأكيد', 'Pending confirmation'),
      value: pending,
      percent: Math.round((pending / total) * 100) || 0,
      rawCount: pending,
      className: 'status-pending'
    },
    {
      label: translate('reservations.reports.status.completedLabel', 'منتهية', 'Completed'),
      value: completed,
      percent: Math.round((completed / total) * 100) || 0,
      rawCount: completed,
      className: 'status-completed'
    }
  ];
}

function calculatePaymentBreakdown(reservations) {
  const total = reservations.length || 1;
  const paid = reservations.filter((res) => res?.paid).length;
  const unpaid = reservations.length - paid;

  return [
    {
      label: translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid'),
      value: paid,
      percent: Math.round((paid / total) * 100) || 0,
      rawCount: paid,
      className: 'status-paid'
    },
    {
      label: translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid'),
      value: unpaid,
      percent: Math.round((unpaid / total) * 100) || 0,
      rawCount: unpaid,
      className: 'status-unpaid'
    }
  ];
}

function calculateTopCustomers(reservations, customers) {
  const totals = new Map();
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));

  reservations.forEach((res) => {
    const key = String(res?.customerId ?? 'unknown');
    const entry = totals.get(key) || { count: 0, revenue: 0 };
    entry.count += 1;
    entry.revenue += Number(res?.cost) || 0;
    totals.set(key, entry);
  });

  return Array.from(totals.entries())
    .map(([id, data]) => {
      const customer = customerMap.get(id);
      return {
        name: customer?.customerName || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer'),
        count: data.count,
        revenue: data.revenue
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

function calculateTopEquipment(reservations, equipment) {
  const totals = new Map();
  const equipmentMap = new Map((equipment || []).map((item) => [normalizeBarcode(item?.barcode), item]));

  reservations.forEach((res) => {
    (res?.items || []).forEach((item) => {
      const barcode = normalizeBarcode(item?.barcode);
      const key = barcode || (item?.desc ?? 'unknown');
      const name = item?.desc
        || equipmentMap.get(barcode)?.desc
        || equipmentMap.get(barcode)?.description
        || translate('reservations.reports.topEquipment.unknown', 'معدة بدون اسم', 'Unnamed equipment');
      const quantity = Number(item?.qty) || 1;
      const revenue = quantity * (Number(item?.price) || 0);

      const entry = totals.get(key) || { name, count: 0, revenue: 0 };
      entry.name = name;
      entry.count += quantity;
      entry.revenue += revenue;
      totals.set(key, entry);
    });
  });

  return Array.from(totals.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function renderTrendChart(data) {
  const container = document.getElementById('reports-volume-chart');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-muted">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  const max = Math.max(1, ...data.map((item) => item.count));

  container.innerHTML = data
    .map((item) => {
      const height = Math.max(8, Math.round((item.count / max) * 100));
      return `
        <div class="reports-chart-bar">
          <div class="bar" style="height: ${height}%"></div>
          <span class="value">${formatNumber(item.count)}</span>
          <span class="label">${item.label}</span>
        </div>
      `;
    })
    .join('');
}

function renderProgressSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-muted">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  container.innerHTML = data
    .map((item) => `
      <div class="reports-progress-row">
        <div class="reports-progress-top">
          <span>${item.label}</span>
          <span>${formatNumber(item.percent)}%</span>
        </div>
        <div class="reports-progress-bar">
          <div class="reports-progress-fill ${item.className}" style="width: ${Math.min(item.percent, 100)}%"></div>
        </div>
        <div class="reports-progress-meta">${translate('reservations.reports.progress.meta', '{count} حجز', '{count} reservations').replace('{count}', formatNumber(item.rawCount ?? item.value))}</div>
      </div>
    `)
    .join('');
}

function renderTopCustomers(rows) {
  const tbody = document.getElementById('reports-top-customers');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-muted">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${row.name}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

function renderTopEquipment(rows) {
  const tbody = document.getElementById('reports-top-equipment');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-muted">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${row.name}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

function updateKpiCards(metrics) {
  const totalEl = document.getElementById('reports-kpi-total');
  const totalMetaEl = document.getElementById('reports-kpi-total-meta');
  const revenueEl = document.getElementById('reports-kpi-revenue');
  const revenueMetaEl = document.getElementById('reports-kpi-revenue-meta');
  const confirmedEl = document.getElementById('reports-kpi-confirmed');
  const confirmedMetaEl = document.getElementById('reports-kpi-confirmed-meta');
  const paidEl = document.getElementById('reports-kpi-paid');
  const paidMetaEl = document.getElementById('reports-kpi-paid-meta');

  const total = metrics.total || 0;
  const revenue = metrics.revenue || 0;
  const confirmed = metrics.confirmed || 0;
  const paid = metrics.paidCount || 0;
  const avg = metrics.average || 0;
  const confirmedRate = total ? Math.round((confirmed / total) * 100) : 0;
  const paidRate = total ? Math.round((paid / total) * 100) : 0;

  if (totalEl) totalEl.textContent = formatNumber(total);
  if (totalMetaEl) {
    const completedText = translate('reservations.reports.kpi.total.dynamicMeta', 'منها {count} منتهية', 'Includes {count} completed')
      .replace('{count}', formatNumber(metrics.completed || 0));
    totalMetaEl.textContent = completedText;
  }

  if (revenueEl) revenueEl.textContent = formatCurrency(revenue);
  if (revenueMetaEl) {
    const averageText = translate('reservations.reports.kpi.revenue.average', 'متوسط قيمة الحجز {value}', 'Average reservation value {value}')
      .replace('{value}', formatCurrency(avg));
    revenueMetaEl.textContent = averageText;
  }

  if (confirmedEl) confirmedEl.textContent = `${confirmedRate}%`;
  if (confirmedMetaEl) {
    const confirmedText = translate('reservations.reports.kpi.confirmed.detail', '{count} حجوزات مؤكدة', '{count} confirmed reservations')
      .replace('{count}', formatNumber(confirmed));
    confirmedMetaEl.textContent = confirmedText;
  }

  if (paidEl) paidEl.textContent = `${paidRate}%`;
  if (paidMetaEl) {
    const paidText = translate('reservations.reports.kpi.paid.detail', '{count} حجوزات مدفوعة', '{count} paid reservations')
      .replace('{count}', formatNumber(paid));
    paidMetaEl.textContent = paidText;
  }
}

function toggleEmptyState(isEmpty) {
  const emptyState = document.getElementById('reports-empty-state');
  if (!emptyState) return;
  emptyState.classList.toggle('active', Boolean(isEmpty));
}

function formatNumber(value) {
  const { numberFormatter: nf } = getFormatters();
  const formatted = nf.format(Math.round(value || 0));
  return normalizeNumbers(formatted);
}

function formatCurrency(value) {
  const { currencyFormatter: cf } = getFormatters();
  const formatted = cf.format(Math.max(0, Math.round(value || 0)));
  return normalizeNumbers(formatted);
}

function normalizeBarcode(value) {
  return (value || '').toString().trim();
}
