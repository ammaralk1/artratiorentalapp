import { translate, formatNumber, formatCurrency, formatDateTime, formatDateInput } from '../formatters.js';
import { escapeHtml, escapeAttribute } from './utils.js';
import { computeReservationFinancials, computeReportStatus, paymentLabelText } from '../calculations.js';
import { normalizeNumbers } from '../../utils.js';
import reportsState from '../state.js';

export function renderReservationsTable(reservations, customers, technicians) {
  const tbody = document.getElementById('reports-reservations-body');
  if (!tbody) return [];

  if (!reservations || reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return [];
  }

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  const exportHeaders = {
    code: translate('reservations.reports.results.headers.id', 'الحجز', 'Reservation'),
    customer: translate('reservations.reports.results.headers.customer', 'العميل', 'Customer'),
    company: translate('reservations.reports.results.headers.company', 'الشركة', 'Company'),
    phone: translate('reservations.reports.results.headers.phone', 'الهاتف', 'Phone'),
    date: translate('reservations.reports.results.headers.date', 'التاريخ', 'Date'),
    status: translate('reservations.reports.results.headers.status', 'الحالة', 'Status'),
    payment: translate('reservations.reports.results.headers.payment', 'الدفع', 'Payment'),
    paymentsCount: translate('reservations.reports.results.headers.paymentsCount', 'عدد الدفعات', 'Payments count'),
    days: translate('reservations.reports.results.headers.days', 'الأيام', 'Days'),
    equipment: translate('reservations.reports.results.headers.equipment', 'إجمالي المعدات', 'Equipment'),
    crewGross: translate('reservations.reports.results.headers.crewGross', 'إجمالي الطاقم', 'Crew total'),
    crewCost: translate('reservations.reports.results.headers.crewCost', 'تكلفة الطاقم', 'Crew cost'),
    discount: translate('reservations.reports.results.headers.discount', 'الخصم', 'Discount'),
    tax: translate('reservations.reports.results.headers.tax', 'الضريبة', 'Tax'),
    total: translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
    share: translate('reservations.reports.results.headers.share', 'نسبة الشركة', 'Company share'),
    sharePercent: translate('reservations.reports.results.headers.sharePercent', 'نسبة الشركة %', 'Company share %'),
    shareAmount: translate('reservations.reports.results.headers.shareAmount', 'مبلغ نسبة الشركة', 'Company share amount'),
    net: translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit'),
  };

  const sorted = sortReservations([...reservations]);
  const { page, pageSize } = reportsState.pagination;
  const startIndex = Math.max(0, (page - 1) * pageSize);
  const pageItems = sorted.slice(startIndex, startIndex + pageSize);
  const rows = pageItems
    .map((reservation) => {
      const formatted = formatReservationRow(reservation, customerMap, technicianMap);
      const customerInfo = customerMap.get(String(reservation?.customerId));
      const normalizedPaymentHistory = Array.isArray(reservation.paymentHistory)
        ? reservation.paymentHistory
        : Array.isArray(reservation.payment_history)
          ? reservation.payment_history
          : [];
      const historyCount = normalizedPaymentHistory.length;
      const financials = computeReservationFinancials(reservation);
      const exportRow = {
        [exportHeaders.code]: formatted.code.text,
        [exportHeaders.customer]: formatted.customer.text,
        [exportHeaders.company]: customerInfo?.companyName || '',
        [exportHeaders.phone]: customerInfo?.phone || '',
        [exportHeaders.date]: formatted.date.text,
        [exportHeaders.status]: formatted.status.text,
        [exportHeaders.payment]: formatted.payment.text,
        [exportHeaders.paymentsCount]: String(historyCount),
        [exportHeaders.days]: String(financials.rentalDays ?? 0),
        [exportHeaders.equipment]: formatCurrency(financials.equipmentTotal),
        [exportHeaders.crewGross]: formatCurrency(financials.crewTotal),
        [exportHeaders.crewCost]: formatCurrency(financials.crewCostTotal ?? 0),
        [exportHeaders.discount]: formatCurrency(financials.discountAmount ?? 0),
        [exportHeaders.tax]: formatCurrency(financials.taxAmount ?? 0),
        [exportHeaders.total]: formatted.total.text,
        [exportHeaders.share]: formatted.share.text,
        [exportHeaders.sharePercent]: `${formatNumber(financials.companySharePercent ?? 0)}%`,
        [exportHeaders.shareAmount]: formatCurrency(financials.companyShareAmount ?? 0),
        [exportHeaders.net]: formatted.net.text,
      };
      return { formatted, exportRow };
    });

  tbody.innerHTML = rows
    .map(({ formatted }) => `
      <tr data-drilldown="reservation" data-search="${escapeAttribute(formatted.code.text)}">
        <td data-report-column="code">${formatted.code.html}</td>
        <td data-report-column="customer">${formatted.customer.html}</td>
        <td data-report-column="date">${formatted.date.html}</td>
        <td data-report-column="status">${formatted.status.html}</td>
        <td data-report-column="payment">${formatted.payment.html}</td>
        <td data-report-column="total">${formatted.total.html}</td>
        <td data-report-column="share">${formatted.share.html}</td>
        <td data-report-column="net">${formatted.net.html}</td>
      </tr>
    `)
    .join('');

  renderPagination(sorted.length);
  bindSortEvents();
  return rows.map(({ exportRow }) => exportRow);
}

function bindSortEvents() {
  const thead = document.querySelector('#reports-reservations-table thead');
  if (!thead) return;
  thead.querySelectorAll('th.sortable').forEach((th) => {
    if (th.dataset.sortBound === 'true') return;
    th.addEventListener('click', () => {
      const key = th.dataset.sortKey;
      if (!key) return;
      if (reportsState.sort.key === key) {
        reportsState.sort.dir = reportsState.sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        reportsState.sort.key = key;
        reportsState.sort.dir = 'asc';
      }
      reportsState.pagination.page = 1;
      reportsState.callbacks.onRender?.();
    });
    th.dataset.sortBound = 'true';
  });
}

function sortReservations(list) {
  const { key, dir } = reportsState.sort || { key: 'date', dir: 'desc' };
  const factor = dir === 'asc' ? 1 : -1;
  return list.sort((a, b) => factor * compareByKey(a, b, key));
}

function compareByKey(a, b, key) {
  switch (key) {
    case 'code':
      return String(a?.reservationId ?? a?.id ?? '').localeCompare(String(b?.reservationId ?? b?.id ?? ''), 'ar', { numeric: true });
    case 'customer':
      return String(a?.customerName ?? a?.customerId ?? '').localeCompare(String(b?.customerName ?? b?.customerId ?? ''), 'ar', { numeric: true });
    case 'date':
      return new Date(a?.start || 0) - new Date(b?.start || 0);
    case 'status': {
      const sA = computeReportStatus(a)?.statusValue || '';
      const sB = computeReportStatus(b)?.statusValue || '';
      return String(sA).localeCompare(String(sB), 'ar');
    }
    case 'total': {
      const finA = computeReservationFinancials(a)?.finalTotal || 0;
      const finB = computeReservationFinancials(b)?.finalTotal || 0;
      return finA - finB;
    }
    case 'share': {
      const finA = computeReservationFinancials(a)?.companyShareAmount || 0;
      const finB = computeReservationFinancials(b)?.companyShareAmount || 0;
      return finA - finB;
    }
    case 'net': {
      const finA = computeReservationFinancials(a)?.netProfit || 0;
      const finB = computeReservationFinancials(b)?.netProfit || 0;
      return finA - finB;
    }
    default:
      return new Date(a?.start || 0) - new Date(b?.start || 0);
  }
}

function renderPagination(totalItems) {
  const host = document.getElementById('reports-table-pagination');
  if (!host) return;
  const { page, pageSize } = reportsState.pagination;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const prevDisabled = page <= 1 ? 'disabled' : '';
  const nextDisabled = page >= totalPages ? 'disabled' : '';
  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);
  host.innerHTML = `
    <div class="pager">
      <button type="button" ${prevDisabled} data-page="prev">◀</button>
      <button type="button" ${nextDisabled} data-page="next">▶</button>
    </div>
    <div class="page-info">${formatNumber(rangeStart)}–${formatNumber(rangeEnd)} / ${formatNumber(totalItems)}</div>
    <div class="pager page-size">
      <label>${translate('reservations.reports.pageSize', 'لكل صفحة', 'Per page')}</label>
      <button type="button" data-size="25">25</button>
      <button type="button" data-size="50">50</button>
      <button type="button" data-size="100">100</button>
    </div>
  `;
  host.querySelector('[data-page="prev"]')?.addEventListener('click', () => {
    if (reportsState.pagination.page > 1) {
      reportsState.pagination.page -= 1;
      reportsState.callbacks.onRender?.();
    }
  });
  host.querySelector('[data-page="next"]')?.addEventListener('click', () => {
    const totalPagesLocal = Math.max(1, Math.ceil(totalItems / reportsState.pagination.pageSize));
    if (reportsState.pagination.page < totalPagesLocal) {
      reportsState.pagination.page += 1;
      reportsState.callbacks.onRender?.();
    }
  });
  host.querySelectorAll('[data-size]')?.forEach((btn) => {
    btn.addEventListener('click', () => {
      const size = Number(btn.dataset.size);
      if (Number.isFinite(size) && size > 0) {
        reportsState.pagination.pageSize = size;
        reportsState.pagination.page = 1;
        reportsState.callbacks.onRender?.();
      }
    });
  });
}

function formatReservationRow(reservation, customerMap, technicianMap) {
  const rawCode = reservation?.reservationId || reservation?.id || '—';
  const codeText = normalizeNumbers(String(rawCode));
  const customer = customerMap.get(String(reservation?.customerId));
  const customerName = customer?.customerName
    || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer');

  const statusInfo = computeReportStatus(reservation);
  const statusLabel = getReservationStatusLabel(statusInfo.statusValue);
  const statusChip = createStatusChip(statusInfo.statusValue, statusLabel);

  const normalizedPaymentHistory = Array.isArray(reservation.paymentHistory)
    ? reservation.paymentHistory
    : Array.isArray(reservation.payment_history)
      ? reservation.payment_history
      : [];
  const paymentChip = createPaymentChip(statusInfo.paidStatus, normalizedPaymentHistory);
  const historyCount = normalizedPaymentHistory.length;
  let paymentHtml = paymentChip.html;
  if (historyCount > 0) {
    const historyLabel = translate('reservations.paymentHistory.countLabel', '{count} دفعة', '{count} payments')
      .replace('{count}', formatNumber(historyCount));
    paymentHtml = `<div class="reports-payment-cell">${paymentChip.html}<small class="reports-payment-subtext">${escapeHtml(historyLabel)}</small></div>`;
  }

  const dateLabel = formatDateTime(reservation?.start);
  const financials = computeReservationFinancials(reservation);
  const totalLabel = formatCurrency(financials.finalTotal);
  const shareLabel = financials.companySharePercent > 0
    ? `${formatNumber(financials.companySharePercent)}% (${formatCurrency(financials.companyShareAmount)})`
    : translate('reservations.reports.results.share.none', 'بدون نسبة الشركة', 'No company share');
  const netLabel = formatCurrency(financials.netProfit);

  const customerHtml = escapeHtml(customerName);

  return {
    code: { html: escapeHtml(codeText), text: codeText },
    customer: { html: customerHtml, text: customerName },
    date: { html: escapeHtml(dateLabel), text: dateLabel },
    status: statusChip,
    payment: { html: paymentHtml, text: paymentChip.text },
    total: { html: escapeHtml(totalLabel), text: totalLabel },
    share: { html: escapeHtml(shareLabel), text: shareLabel },
    net: { html: escapeHtml(netLabel), text: netLabel },
  };
}

function getReservationStatusLabel(statusValue) {
  switch (statusValue) {
    case 'completed':
      return stripLeadingSymbols(translate('reservations.list.status.completed', '📁 منتهي', 'Completed'));
    case 'confirmed':
      return stripLeadingSymbols(translate('reservations.list.status.confirmed', '✅ مؤكد', 'Confirmed'));
    case 'pending':
      return stripLeadingSymbols(translate('reservations.list.status.pending', '⏳ غير مؤكد', 'Pending'));
    default:
      return normalizeNumbers(statusValue || '—');
  }
}

function createStatusChip(statusValue, label) {
  const safeLabel = stripLeadingSymbols(label);
  const slug = ['completed', 'confirmed', 'pending', 'cancelled'].includes(statusValue) ? statusValue : 'info';
  const chipHtml = `<span class="reservation-chip status-${slug}">${escapeHtml(safeLabel)}</span>`;
  return { html: chipHtml, text: safeLabel };
}

function createPaymentChip(paymentStatus, history = []) {
  const label = paymentLabelText(paymentStatus);
  const normalized = String(paymentStatus ?? '').toLowerCase();
  const slug = normalized === 'paid' ? 'paid' : normalized === 'partial' ? 'partial' : 'unpaid';
  let tooltip = '';
  const currencyLabel = translate('reservations.create.summary.currency', 'ريال', 'SR');

  if (Array.isArray(history) && history.length) {
    tooltip = history.map((entry) => {
      const date = entry?.recordedAt ? formatDateInput(entry.recordedAt) : '—';
      const amount = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
        ? `${normalizeNumbers(Number(entry.amount).toFixed(2))} ${currencyLabel}`
        : '';
      const percent = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
        ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
        : '';
      const pieces = [date];
      if (amount) pieces.push(amount);
      if (percent) pieces.push(percent);
      return pieces.filter(Boolean).join(' • ');
    }).join('\n');
  }
  const titleAttr = tooltip ? ` title="${escapeAttribute(tooltip)}"` : '';
  const chipHtml = `<span class="reservation-chip status-${slug}"${titleAttr}>${escapeHtml(label)}</span>`;
  return { html: chipHtml, text: label };
}

function stripLeadingSymbols(label) {
  return normalizeNumbers(String(label ?? '')).replace(/^[^A-Za-z0-9\u0600-\u06FF]+/, '').trim() || '—';
}
