import { translate, formatNumber, formatCurrency, formatDateTime, formatDateInput } from '../formatters.js';
import { escapeHtml, escapeAttribute } from './utils.js';
import { computeReservationFinancials, computeReportStatus, paymentLabelText } from '../calculations.js';
import { normalizeNumbers } from '../../utils.js';
import reportsState from '../state.js';

export function renderReservationsTable(reservations, customers, technicians) {
  const tbody = document.getElementById('reports-reservations-body');
  if (!tbody) return [];

  const confirmedReservations = (Array.isArray(reservations) ? reservations : [])
    .filter((reservation) => ensureReportStatus(reservation)?.confirmed);

  if (confirmedReservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
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
    equipmentCost: translate('reservations.reports.results.headers.equipmentCost', 'تكلفة المعدات', 'Equipment cost'),
    discount: translate('reservations.reports.results.headers.discount', 'الخصم', 'Discount'),
    tax: translate('reservations.reports.results.headers.tax', 'الضريبة', 'Tax'),
    total: translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
    share: translate('reservations.reports.results.headers.share', 'المصاريف التشغيلية', 'Company overhead'),
    sharePercent: translate('reservations.reports.results.headers.sharePercent', 'المصاريف التشغيلية %', 'Company overhead %'),
    shareAmount: translate('reservations.reports.results.headers.shareAmount', 'مبلغ المصاريف التشغيلية', 'Company overhead amount'),
    net: translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit'),
  };

  const sorted = sortReservations([...confirmedReservations]);
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
        [exportHeaders.equipmentCost]: formatCurrency(financials.equipmentCostTotal ?? 0),
        [exportHeaders.discount]: formatCurrency(financials.discountAmount ?? 0),
        [exportHeaders.tax]: formatCurrency(financials.taxAmount ?? 0),
        [exportHeaders.total]: formatted.total.text,
        [exportHeaders.share]: formatted.share.text,
        [exportHeaders.sharePercent]: `${formatNumber(financials.companySharePercent ?? 0)}%`,
        [exportHeaders.shareAmount]: formatCurrency(financials.companyShareAmount ?? 0),
        [exportHeaders.net]: formatted.net.text,
      };
      // Normalize empty string cells to common placeholder for exports
      const empty = translate('common.placeholder.empty', '—', '—');
      Object.keys(exportRow).forEach((k) => {
        const v = String(exportRow[k] ?? '').trim();
        if (v === '') exportRow[k] = empty;
      });
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
        <td data-report-column="equipmentCost">${formatted.equipmentCost.html}</td>
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
      const sA = ensureReportStatus(a)?.statusValue || '';
      const sB = ensureReportStatus(b)?.statusValue || '';
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
    case 'equipmentCost': {
      const finA = computeReservationFinancials(a)?.equipmentCostTotal || 0;
      const finB = computeReservationFinancials(b)?.equipmentCostTotal || 0;
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

function ensureReportStatus(reservation) {
  if (!reservation) {
    return computeReportStatus(reservation);
  }
  if (reservation.__reportsStatusCache) {
    return reservation.__reportsStatusCache;
  }
  const status = computeReportStatus(reservation);
  reservation.__reportsStatusCache = status;
  return status;
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

  if (totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  const navLabel = translate('projects.pagination.navigation', 'التنقل بين صفحات النتائج', 'Results pagination');
  const prevLabel = translate('projects.pagination.prev', 'السابق', 'Previous page');
  const nextLabel = translate('projects.pagination.next', 'التالي', 'Next page');
  const pageLabelTemplate = translate('projects.pagination.page', 'صفحة {page}', 'Page {page}');
  const rangeTemplate = translate('projects.pagination.range', '{from}-{to} من {total}', '{from}-{to} of {total}');
  const rangeText = rangeTemplate
    .replace('{from}', formatNumber(rangeStart))
    .replace('{to}', formatNumber(rangeEnd))
    .replace('{total}', formatNumber(totalItems));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="btn btn-sm btn-outline-primary" data-reports-table-page="${Math.max(1, page - 1)}" ${prevDisabled} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${pages.map((pageNumber) => {
        const isActive = pageNumber === page;
        const label = pageLabelTemplate.replace('{page}', formatNumber(pageNumber));
        return `<button type="button" class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}" data-reports-table-page="${pageNumber}" aria-label="${escapeHtml(label)}" ${isActive ? 'aria-current="page"' : ''}>${escapeHtml(formatNumber(pageNumber))}</button>`;
      }).join('')}
      <button type="button" class="btn btn-sm btn-outline-primary" data-reports-table-page="${Math.min(totalPages, page + 1)}" ${nextDisabled} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;

  host.querySelectorAll('[data-reports-table-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextPage = Number(button.getAttribute('data-reports-table-page'));
      if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage === reportsState.pagination.page) return;
      reportsState.pagination.page = nextPage;
      reportsState.callbacks.onRender?.();
    });
  });
}

function formatReservationRow(reservation, customerMap, technicianMap) {
  const rawCode = reservation?.reservationId || reservation?.id || translate('common.placeholder.empty', '—', '—');
  const codeText = normalizeNumbers(String(rawCode));
  const customer = customerMap.get(String(reservation?.customerId));
  const customerName = customer?.customerName
    || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer');

  const statusInfo = ensureReportStatus(reservation);
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
    : translate('reservations.reports.results.share.none', 'بدون المصاريف التشغيلية', 'No operating overhead');
  const netLabel = formatCurrency(financials.netProfit);
  const equipmentCostLabel = formatCurrency(financials.equipmentCostTotal ?? 0);

  const companyName = typeof customer?.companyName === 'string' ? customer.companyName.trim() : '';
  const customerPhone = typeof customer?.phone === 'string' ? customer.phone.trim() : '';
  const customerMeta = [companyName, customerPhone].filter(Boolean).join(' • ');
  const customerHtml = `
    <div class="reports-row-title">
      <span class="reports-row-title__main">${escapeHtml(customerName)}</span>
      ${customerMeta ? `<span class="reports-row-title__sub">${escapeHtml(customerMeta)}</span>` : ''}
    </div>
  `;
  const dateMain = reservation?.start ? formatDateInput(reservation.start) : translate('common.placeholder.empty', '—', '—');
  const daysLabel = translate(
    'reservations.reports.results.meta.daysCount',
    '{count} أيام',
    '{count} days',
  ).replace('{count}', formatNumber(financials.rentalDays ?? 0));
  const dateHtml = `
    <div class="reports-date-stack">
      <span class="reports-date-stack__main">${escapeHtml(dateMain)}</span>
      <span class="reports-date-stack__sub">${escapeHtml(daysLabel)}</span>
    </div>
  `;

  return {
    code: { html: escapeHtml(codeText), text: codeText },
    customer: { html: customerHtml, text: customerName },
    date: { html: dateHtml, text: dateLabel },
    status: statusChip,
    payment: { html: paymentHtml, text: paymentChip.text },
    total: { html: escapeHtml(totalLabel), text: totalLabel },
    share: { html: escapeHtml(shareLabel), text: shareLabel },
    net: { html: escapeHtml(netLabel), text: netLabel },
    equipmentCost: { html: escapeHtml(equipmentCostLabel), text: equipmentCostLabel },
  };
}

function getReservationStatusLabel(statusValue) {
  switch (statusValue) {
    case 'completed':
      return stripLeadingSymbols(translate('reservations.list.status.completed', '📁 مغلق', 'Closed'));
    case 'confirmed':
      return stripLeadingSymbols(translate('reservations.list.status.confirmed', '✅ مؤكد', 'Confirmed'));
    case 'pending':
      return stripLeadingSymbols(translate('reservations.list.status.pending', '⏳ غير مؤكد', 'Pending'));
    case 'cancelled':
      return stripLeadingSymbols(translate('reservations.list.status.cancelled', '❌ ملغي', 'Cancelled'));
    default:
      return normalizeNumbers(statusValue || translate('common.placeholder.empty', '—', '—'));
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
      const date = entry?.recordedAt ? formatDateInput(entry.recordedAt) : translate('common.placeholder.empty', '—', '—');
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
  return normalizeNumbers(String(label ?? '')).replace(/^[^A-Za-z0-9\u0600-\u06FF]+/, '').trim() || translate('common.placeholder.empty', '—', '—');
}
