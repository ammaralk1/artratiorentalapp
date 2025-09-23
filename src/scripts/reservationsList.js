import { t } from './language.js';
import { normalizeNumbers, formatDateTime } from './utils.js';
import { normalizeText, isReservationCompleted } from './reservationsShared.js';
import { resolveItemImage } from './reservationsEquipment.js';

export function filterReservationEntries({ reservations = [], filters = {}, customersMap, techniciansMap }) {
  const entries = reservations.map((reservation, index) => ({ reservation, index }));

  const searchTerm = filters.searchTerm || '';
  const searchReservationIdTerm = filters.searchReservationId || '';
  const searchCustomerNameTerm = filters.searchCustomerName || '';
  const startDate = filters.startDate || '';
  const endDate = filters.endDate || '';
  const statusFilter = filters.status || '';
  const customerIdFilter = Object.prototype.hasOwnProperty.call(filters, 'customerId') ? filters.customerId : null;
  const technicianIdFilter = Object.prototype.hasOwnProperty.call(filters, 'technicianId') ? filters.technicianId : null;

  const startDateObj = startDate ? new Date(`${startDate}T00:00:00`) : null;
  const endDateObj = endDate ? new Date(`${endDate}T23:59:59`) : null;

  const filtered = entries.filter(({ reservation }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const reservationStart = reservation.start ? new Date(reservation.start) : null;
    const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
    const completed = isReservationCompleted(reservation);

    if (customerIdFilter != null && String(reservation.customerId) !== String(customerIdFilter)) {
      return false;
    }

    if (technicianIdFilter != null) {
      const assignedIds = Array.isArray(reservation.technicians)
        ? reservation.technicians.map((id) => String(id))
        : [];
      if (!assignedIds.includes(String(technicianIdFilter))) {
        return false;
      }
    }

    if (statusFilter === 'confirmed' && !confirmed) return false;
    if (statusFilter === 'pending' && confirmed) return false;
    if (statusFilter === 'completed' && !completed) return false;

    if (startDateObj && reservationStart && reservationStart < startDateObj) return false;
    if (endDateObj && reservationStart && reservationStart > endDateObj) return false;

    if (searchReservationIdTerm) {
      const reservationIdText = normalizeText(
        [reservation.reservationId, reservation.id]
          .filter(Boolean)
          .map(String)
          .join(' ')
      );
      if (!reservationIdText.includes(searchReservationIdTerm)) return false;
    }

    if (searchCustomerNameTerm) {
      const customerNameText = normalizeText(customer?.customerName || '');
      if (!customerNameText.includes(searchCustomerNameTerm)) return false;
    }

    if (!searchTerm) return true;

    const itemsText = reservation.items?.map?.((item) => `${item.barcode} ${item.desc}`).join(' ') || '';
    const techniciansText = (reservation.technicians || [])
      .map((id) => techniciansMap.get(String(id))?.name)
      .filter(Boolean)
      .join(' ');
    const haystack = normalizeText([
      reservation.reservationId,
      customer?.customerName,
      reservation.notes,
      itemsText,
      techniciansText
    ].filter(Boolean).join(' '));

    return haystack.includes(searchTerm);
  });

  filtered.sort((a, b) => {
    const aCompleted = isReservationCompleted(a.reservation);
    const bCompleted = isReservationCompleted(b.reservation);
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1;
    }

    const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
    const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
    return bStart - aStart;
  });

  return filtered;
}

export function buildReservationTilesHtml({ entries, customersMap, techniciansMap }) {
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const taxIncludedShort = t('reservations.list.taxIncludedShort', '(شامل الضريبة)');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountTemplate = t('reservations.list.itemsCountShort', '{count} عنصر');
  const crewSeparator = t('reservations.list.crew.separator', '، ');
  const statusConfirmedText = t('reservations.list.status.confirmed', '✅ مؤكد');
  const statusPendingText = t('reservations.list.status.pending', '⏳ غير مؤكد');
  const paymentPaidText = t('reservations.list.payment.paid', '💳 مدفوع');
  const paymentUnpaidText = t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const confirmLabel = t('reservations.list.actions.confirm', '✔️ تأكيد');
  const labels = {
    client: t('reservations.list.labels.client', '👤 العميل'),
    start: t('reservations.list.labels.start', '🗓️ بداية الحجز'),
    end: t('reservations.list.labels.end', '🗓️ نهاية الحجز'),
    cost: t('reservations.list.labels.cost', '💵 التكلفة'),
    equipment: t('reservations.list.labels.equipment', '📦 المعدات'),
    crew: t('reservations.list.labels.crew', '😎 الفريق')
  };

  return entries.map(({ reservation, index }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
    const completed = isReservationCompleted(reservation);
    const paid = reservation.paid === true || reservation.paid === 'paid';

    let statusBadge = confirmed
      ? `<span class="badge bg-success reservation-chip">${statusConfirmedText}</span>`
      : `<span class="badge bg-warning text-dark reservation-chip">${statusPendingText}</span>`;

    let paymentBadge = paid
      ? `<span class="badge bg-primary reservation-chip">${paymentPaidText}</span>`
      : `<span class="badge bg-danger reservation-chip">${paymentUnpaidText}</span>`;

    let stateClass = paid ? ' tile-paid' : ' tile-unpaid';
    if (completed) stateClass += ' tile-completed';

    let completedAttr = '';

    if (completed) {
      statusBadge = `<span class="badge reservation-chip chip-completed">${statusConfirmedText}</span>`;
      paymentBadge = `<span class="badge reservation-chip chip-completed">${paid ? paymentPaidText : paymentUnpaidText}</span>`;
      const ribbonTextRaw = t('reservations.list.ribbon.completed', 'منتهي');
      const ribbonTextAttr = ribbonTextRaw.replace(/"/g, '&quot;');
      completedAttr = ` data-completed-label="${ribbonTextAttr}"`;
    }

    const confirmButtonHtml = confirmed
      ? ''
      : `<button class="btn btn-sm btn-success tile-confirm" data-reservation-index="${index}" data-action="confirm">${confirmLabel}</button>`;

    const itemsCount = reservation.items?.length || 0;
    const techniciansAssigned = (reservation.technicians || []).map((id) => techniciansMap.get(String(id))).filter(Boolean);
    const techniciansNames = techniciansAssigned.map((tech) => tech.name).join(crewSeparator) || '—';
    const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? ''));
    const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
    const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
    const costNumber = normalizeNumbers(String(reservation.cost ?? 0));
    const itemsCountDisplay = normalizeNumbers(String(itemsCount));
    const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;
    const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
    const taxBadge = reservation.applyTax ? `<small>${taxIncludedShort}</small>` : '';

    return `
      <div class="reservation-tile${stateClass}"${completedAttr} data-reservation-index="${index}" data-action="details">
        <div class="tile-top">
          <div class="tile-id">${reservationIdDisplay}</div>
          <div class="tile-badges">
            ${statusBadge}
            ${paymentBadge}
          </div>
        </div>
        <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${labels.client}</span>
            <span class="tile-value">${customer?.customerName || unknownCustomer}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.start}</span>
            <span class="tile-value tile-inline">${startDisplay}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.end}</span>
            <span class="tile-value tile-inline">${endDisplay}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.cost}</span>
            <span class="tile-value">${costNumber} ${currencyLabel} ${taxBadge}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.equipment}</span>
            <span class="tile-value">${itemsCountText}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.crew}</span>
            <span class="tile-value">${techniciansAssigned.length ? techniciansNames : '—'}</span>
          </div>
        </div>
        <div class="tile-footer">
          <span class="tile-notes">📝 ${notesDisplay}</span>
          ${confirmButtonHtml}
        </div>
      </div>
    `;
  }).join('');
}


export function buildReservationDetailsHtml(reservation, customer, techniciansList = [], index) {
  const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const completed = isReservationCompleted(reservation);
  const items = reservation.items || [];

  const techniciansMap = new Map(techniciansList.map((tech) => [String(tech.id), tech]));
  const assignedTechnicians = (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);

  const baseCost = items.reduce((sum, item) => sum + ((item.qty || 1) * (item.price || 0)), 0);
  const discountValue = parseFloat(reservation.discount) || 0;
  const discountAmount = reservation.discountType === 'amount'
    ? discountValue
    : baseCost * (discountValue / 100);
  const taxableAmount = Math.max(0, baseCost - discountAmount);
  const taxAmount = reservation.applyTax ? taxableAmount * 0.15 : 0;
  const finalTotal = reservation.cost ?? Math.round(taxableAmount + taxAmount);

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const techniciansCountDisplay = normalizeNumbers(String(assignedTechnicians.length));
  const baseCostDisplay = normalizeNumbers(baseCost.toFixed(2));
  const discountAmountDisplay = normalizeNumbers(discountAmount.toFixed(2));
  const taxAmountDisplay = normalizeNumbers(taxAmount.toFixed(2));
  const finalTotalDisplay = normalizeNumbers((finalTotal ?? 0).toFixed(2));

  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const discountLabel = t('reservations.details.labels.discount', 'الخصم');
  const taxLabel = t('reservations.details.labels.tax', 'الضريبة (15%)');
  const tableHeaders = {
    index: '#',
    code: t('reservations.details.table.headers.code', 'الكود'),
    description: t('reservations.details.table.headers.description', 'الوصف'),
    quantity: t('reservations.details.table.headers.quantity', 'الكمية'),
    price: t('reservations.details.table.headers.price', 'السعر'),
    image: t('reservations.details.table.headers.image', 'الصورة')
  };
  const noItemsText = t('reservations.details.noItems', '📦 لا توجد معدات ضمن هذا الحجز حالياً.');
  const noCrewText = t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.');
  const roleFallback = t('reservations.details.technicians.roleUnknown', 'غير محدد');
  const phoneFallback = t('reservations.details.technicians.phoneUnknown', 'غير متوفر');
  const wageTemplate = t('reservations.details.technicians.wage', '{amount} {currency} / اليوم');
  const statusConfirmedText = t('reservations.list.status.confirmed', '✅ مؤكد');
  const statusPendingText = t('reservations.list.status.pending', '⏳ غير مؤكد');
  const paymentPaidText = t('reservations.list.payment.paid', '💳 مدفوع');
  const paymentUnpaidText = t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const completedText = t('reservations.list.status.completed', '📁 منتهي');
  const reservationIdLabel = t('reservations.details.labels.id', '🆔 رقم الحجز');
  const bookingSectionTitle = t('reservations.details.section.bookingInfo', 'بيانات الحجز');
  const paymentSummaryTitle = t('reservations.details.section.paymentSummary', 'ملخص الدفع');
  const finalTotalLabel = t('reservations.details.labels.finalTotal', 'المجموع النهائي');
  const crewSectionTitle = t('reservations.details.section.crew', '😎 الفريق الفني');
  const crewCountTemplate = t('reservations.details.crew.count', '{count} عضو');
  const itemsSectionTitle = t('reservations.details.section.items', '📦 المعدات المرتبطة');
  const itemsCountTemplate = t('reservations.details.items.count', '{count} عنصر');
  const editActionLabel = t('reservations.details.actions.edit', '✏️ تعديل');
  const deleteActionLabel = t('reservations.details.actions.delete', '🗑️ حذف');
  const customerLabel = t('reservations.details.labels.customer', 'العميل');
  const contactLabel = t('reservations.details.labels.contact', 'رقم التواصل');
  const startLabel = t('reservations.details.labels.start', 'بداية الحجز');
  const endLabel = t('reservations.details.labels.end', 'نهاية الحجز');
  const notesLabel = t('reservations.details.labels.notes', 'ملاحظات');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountLabel = t('reservations.details.labels.itemsCount', 'عدد المعدات');
  const itemsTotalLabel = t('reservations.details.labels.itemsTotal', 'إجمالي المعدات');
  const paymentStatusLabel = t('reservations.details.labels.paymentStatus', 'حالة الدفع');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');

  const paymentStatusText = paid ? paymentPaidText : paymentUnpaidText;
  const itemsCount = items.length;
  const itemsCountDisplay = normalizeNumbers(String(itemsCount));
  const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
  const crewCountText = crewCountTemplate.replace('{count}', techniciansCountDisplay);
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;

  const summaryDetails = [
    { icon: '💳', label: paymentStatusLabel, value: paymentStatusText },
    { icon: '📦', label: itemsCountLabel, value: itemsCountText },
    { icon: '💼', label: itemsTotalLabel, value: `${baseCostDisplay} ${currencyLabel}` }
  ];

  if (discountAmount > 0) {
    summaryDetails.push({ icon: '💸', label: discountLabel, value: `${discountAmountDisplay} ${currencyLabel}` });
  }

  if (reservation.applyTax && taxAmount > 0) {
    summaryDetails.push({ icon: '🧾', label: taxLabel, value: `${taxAmountDisplay} ${currencyLabel}` });
  }

  summaryDetails.push({ icon: '💰', label: finalTotalLabel, value: `${finalTotalDisplay} ${currencyLabel}` });

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${label}</span>
      <span class="summary-details-value">${value}</span>
    </div>
  `).join('');

  const statusChipsData = [
    {
      text: confirmed ? statusConfirmedText : statusPendingText,
      className: confirmed ? 'status-confirmed' : 'status-pending'
    },
    {
      text: paymentStatusText,
      className: paid ? 'status-paid' : 'status-unpaid'
    }
  ];

  if (completed) {
    statusChipsData.push({ text: completedText, className: 'status-completed' });
  }

  const statusChipsHtml = statusChipsData
    .map(({ text: chipText, className }) => `<span class="status-chip ${className}">${chipText}</span>`)
    .join('');

  const renderInfoRow = (icon, label, value) => `
    <div class="res-info-row">
      <span class="label">${icon} ${label}</span>
      <span class="value">${value}</span>
    </div>
  `;

  const infoRows = [
    renderInfoRow('👤', customerLabel, customer?.customerName || unknownCustomer),
    renderInfoRow('📞', contactLabel, customer?.phone || '—'),
    renderInfoRow('🗓️', startLabel, startDisplay),
    renderInfoRow('🗓️', endLabel, endDisplay),
    renderInfoRow('📝', notesLabel, notesDisplay)
  ];

  const infoRowsHtml = infoRows.join('');


  const itemsTableBody = itemsCount
    ? items.map((item, itemIndex) => {
        const image = resolveItemImage(item);
        const barcode = normalizeNumbers(String(item.barcode || '-'));
        const qty = normalizeNumbers(String(item.qty || 1));
        const price = normalizeNumbers(String(item.price || 0));
        const indexLabel = normalizeNumbers(String(itemIndex + 1));
        const imageCell = image
          ? `<img src="${image}" alt="${item.desc || ''}" class="reservation-modal-item-thumb">`
          : '-';
        return `
          <tr>
            <td>${indexLabel}</td>
            <td>${barcode}</td>
            <td>${item.desc || '-'}</td>
            <td>${qty}</td>
            <td>${price} ${currencyLabel}</td>
            <td>${imageCell}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="6" class="text-center">${noItemsText}</td></tr>`;

  const itemsTable = `
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${tableHeaders.index}</th>
            <th>${tableHeaders.code}</th>
            <th>${tableHeaders.description}</th>
            <th>${tableHeaders.quantity}</th>
            <th>${tableHeaders.price}</th>
            <th>${tableHeaders.image}</th>
          </tr>
        </thead>
        <tbody>${itemsTableBody}</tbody>
      </table>
    </div>
  `;

  const techniciansCardsHtml = assignedTechnicians.map((tech, idx) => {
    const indexLabel = normalizeNumbers(String(idx + 1));
    const role = tech.role || roleFallback;
    const phone = tech.phone || phoneFallback;
    const wage = tech.wage
      ? wageTemplate
          .replace('{amount}', normalizeNumbers(String(tech.wage)))
          .replace('{currency}', currencyLabel)
      : '';
    return `
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${indexLabel}</span>
          <span class="technician-name">${tech.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${role}</div>
          <div>📞 ${phone}</div>
          ${wage ? `<div>💰 ${wage}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  const techniciansSectionContent = assignedTechnicians.length
    ? `<div class="reservation-technicians-grid">${techniciansCardsHtml}</div>`
    : `<ul class="reservation-modal-technicians"><li>${noCrewText}</li></ul>`;

  return `
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${reservationIdLabel}</span>
          <strong>${reservationIdDisplay}</strong>
        </div>
        <div class="status-chips">
          ${statusChipsHtml}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${bookingSectionTitle}</h6>
          ${infoRowsHtml}
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${paymentSummaryTitle}</h6>
            <div class="summary-details">
              ${summaryDetailsHtml}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${crewSectionTitle}</span>
          <span class="count">${crewCountText}</span>
        </div>
        ${techniciansSectionContent}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${itemsSectionTitle}</span>
          <span class="count">${itemsCountText}</span>
        </div>
        ${itemsTable}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="btn btn-warning" id="reservation-details-edit-btn" data-index="${index}">${editActionLabel}</button>
        <button type="button" class="btn btn-danger" id="reservation-details-delete-btn" data-index="${index}">${deleteActionLabel}</button>
      </div>
    </div>
  `;
}

