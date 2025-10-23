import { translate, formatNumber, formatCurrency, formatDateTime, formatDateInput } from '../formatters.js';
import { escapeHtml, escapeAttribute } from './utils.js';
import { computeReservationFinancials, computeReportStatus, paymentLabelText } from '../calculations.js';
import { normalizeNumbers } from '../../utils.js';

export function renderReservationsTable(reservations, customers, technicians) {
  const tbody = document.getElementById('reports-reservations-body');
  if (!tbody) return [];

  const tableWrapper = tbody.closest('.reports-table-wrapper') || tbody.parentElement;
  
  if (!reservations || reservations.length === 0) {
    const emptyMessage = translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.');
    const tableHTML = `
      <div class="reports-card">
        <div class="reports-table-wrapper">
          <table class="reports-table">
            <thead>
              <tr>
                <th data-report-column="code">${translate('reports.reservations.code', 'رقم الحجز', 'Booking #')}</th>
                <th data-report-column="customer">${translate('reports.reservations.customer', 'العميل', 'Customer')}</th>
                <th data-report-column="date">${translate('reports.reservations.date', 'التاريخ', 'Date')}</th>
                <th data-report-column="status">${translate('reports.reservations.status', 'الحالة', 'Status')}</th>
                <th data-report-column="payment">${translate('reports.reservations.payment', 'الدفع', 'Payment')}</th>
                <th data-report-column="total">${translate('reports.reservations.total', 'الإجمالي', 'Total')}</th>
                <th data-report-column="share">${translate('reports.reservations.share', 'نسبة الشركة', 'Company Share')}</th>
                <th data-report-column="net">${translate('reports.reservations.net', 'الصافي', 'Net')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colspan="8" class="text-base-content/60">${emptyMessage}</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;
    if (tableWrapper) {
      tableWrapper.innerHTML = tableHTML;
    } else {
      tbody.innerHTML = `<tr><td colspan="8" class="text-base-content/60">${emptyMessage}</td></tr>`;
    }
    return [];
  }

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  const exportHeaders = {
    code: translate('reservations.reports.results.headers.id', 'الحجز', 'Reservation'),
    customer: translate('reservations.reports.results.headers.customer', 'العميل', 'Customer'),
    date: translate('reservations.reports.results.headers.date', 'التاريخ', 'Date'),
    status: translate('reservations.reports.results.headers.status', 'الحالة', 'Status'),
    payment: translate('reservations.reports.results.headers.payment', 'الدفع', 'Payment'),
    total: translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
    share: translate('reservations.reports.results.headers.share', 'نسبة الشركة', 'Company share'),
    net: translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit'),
  };

  const rows = [...reservations]
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0))
    .slice(0, 20)
    .map((reservation) => {
      const formatted = formatReservationRow(reservation, customerMap, technicianMap);
      const exportRow = {
        [exportHeaders.code]: formatted.code.text,
        [exportHeaders.customer]: formatted.customer.text,
        [exportHeaders.date]: formatted.date.text,
        [exportHeaders.status]: formatted.status.text,
        [exportHeaders.payment]: formatted.payment.text,
        [exportHeaders.total]: formatted.total.text,
        [exportHeaders.share]: formatted.share.text,
        [exportHeaders.net]: formatted.net.text,
      };
      return { formatted, exportRow };
    });

  if (tableWrapper) {
    tableWrapper.innerHTML = `
      <div class="reports-card">
        <div class="reports-table-wrapper">
          <table class="reports-table">
            <thead>
              <tr>
                <th data-report-column="code">${translate('reports.reservations.code', 'رقم الحجز', 'Booking #')}</th>
                <th data-report-column="customer">${translate('reports.reservations.customer', 'العميل', 'Customer')}</th>
                <th data-report-column="date">${translate('reports.reservations.date', 'التاريخ', 'Date')}</th>
                <th data-report-column="status">${translate('reports.reservations.status', 'الحالة', 'Status')}</th>
                <th data-report-column="payment">${translate('reports.reservations.payment', 'الدفع', 'Payment')}</th>
                <th data-report-column="total">${translate('reports.reservations.total', 'الإجمالي', 'Total')}</th>
                <th data-report-column="share">${translate('reports.reservations.share', 'نسبة الشركة', 'Company Share')}</th>
                <th data-report-column="net">${translate('reports.reservations.net', 'الصافي', 'Net')}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(({ formatted }) => `
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
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
} else {
  const htmlParts = [];
  for (const { formatted } of rows) {
    htmlParts.push(
      '<tr data-drilldown="reservation" data-search="' + escapeAttribute(formatted.code.text) + '">' +
        '<td data-report-column="code">' + formatted.code.html + '</td>' +
        '<td data-report-column="customer">' + formatted.customer.html + '</td>' +
        '<td data-report-column="date">' + formatted.date.html + '</td>' +
        '<td data-report-column="status">' + formatted.status.html + '</td>' +
        '<td data-report-column="payment">' + formatted.payment.html + '</td>' +
        '<td data-report-column="total">' + formatted.total.html + '</td>' +
        '<td data-report-column="share">' + formatted.share.html + '</td>' +
        '<td data-report-column="net">' + formatted.net.html + '</td>' +
      '</tr>'
    );
  }
  tbody.innerHTML = htmlParts.join('');

  return rows.map(({ exportRow }) => exportRow);
}
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
  const slug = ['completed', 'confirmed', 'pending'].includes(statusValue) ? statusValue : 'info';
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
