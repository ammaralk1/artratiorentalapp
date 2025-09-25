import { t } from '../../language.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { isReservationCompleted } from '../../reservationsShared.js';
import { resolveItemImage } from '../../reservationsEquipment.js';

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

