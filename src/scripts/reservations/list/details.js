import { t } from '../../language.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { loadData } from '../../storage.js';
import { isReservationCompleted, resolveReservationProjectState, groupReservationItems } from '../../reservationsShared.js';
import { resolveItemImage } from '../../reservationsEquipment.js';
import { calculateReservationDays, DEFAULT_COMPANY_SHARE_PERCENT } from '../../reservationsSummary.js';
import { userCanManageDestructiveActions } from '../../auth.js';

const PENDING_PROJECT_DETAIL_KEY = 'pendingProjectDetailId';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildReservationDetailsHtml(reservation, customer, techniciansList = [], index, project = null) {
  const { projectLinked, effectiveConfirmed: confirmed } = resolveReservationProjectState(reservation, project);
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const completed = isReservationCompleted(reservation);
  const items = reservation.items || [];
  const groupedItems = groupReservationItems(items);

  const { technicians: storedTechnicians = [] } = loadData();
  const technicianSource = []
    .concat(Array.isArray(techniciansList) ? techniciansList : [])
    .concat(Array.isArray(storedTechnicians) ? storedTechnicians : []);

  const techniciansMap = new Map();
  technicianSource.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });

  const assignedTechnicians = (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
  const canDelete = userCanManageDestructiveActions();

  const rentalDays = calculateReservationDays(reservation.start, reservation.end);

  const resolveTechnicianCostRate = (technician = {}) => {
    const candidates = [
      technician.dailyWage,
      technician.daily_rate,
      technician.dailyRate,
      technician.wage,
      technician.rate
    ];

    for (const value of candidates) {
      if (value == null) continue;
      const parsed = parseFloat(normalizeNumbers(String(value)));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return 0;
  };

  const resolveTechnicianTotalRate = (technician = {}) => {
    const candidates = [
      technician.dailyTotal,
      technician.daily_total,
      technician.totalRate,
      technician.total,
      technician.total_wage
    ];

    for (const value of candidates) {
      if (value == null) continue;
      const parsed = parseFloat(normalizeNumbers(String(value)));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return resolveTechnicianCostRate(technician);
  };

  const equipmentDailyTotal = items.reduce(
    (sum, item) => sum + ((item.qty || 1) * (item.price || 0)),
    0
  );
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const crewCostDailyTotal = assignedTechnicians.reduce((sum, tech) => sum + resolveTechnicianCostRate(tech), 0);
  const crewTotalDaily = assignedTechnicians.reduce((sum, tech) => sum + resolveTechnicianTotalRate(tech), 0);
  const crewCostTotal = crewCostDailyTotal * rentalDays;
  const crewTotal = crewTotalDaily * rentalDays;
  const discountBase = equipmentTotal + crewTotal;
  const discountValue = parseFloat(reservation.discount) || 0;
  const discountAmount = reservation.discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);
  const subtotalAfterDiscount = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = projectLinked ? false : reservation.applyTax;
  const storedCost = Number(reservation.cost);
  const hasStoredCost = Number.isFinite(storedCost);

  const rawCompanySharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share;
  const normalizedCompanyShare = rawCompanySharePercent != null
    ? parseFloat(normalizeNumbers(String(rawCompanySharePercent)))
    : NaN;
  const companyShareEnabledFlag = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied;
  const hasCompanyShare = (companyShareEnabledFlag === true)
    || (Number.isFinite(normalizedCompanyShare) && normalizedCompanyShare > 0);
  let companySharePercent = hasCompanyShare && Number.isFinite(normalizedCompanyShare)
    ? normalizedCompanyShare
    : 0;
  if (applyTaxFlag && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
  }
  let companyShareAmount = companySharePercent > 0
    ? Math.max(0, subtotalAfterDiscount * (companySharePercent / 100))
    : 0;

  const taxableAmount = subtotalAfterDiscount + companyShareAmount;
  const taxAmountRaw = applyTaxFlag ? taxableAmount * 0.15 : 0;
  const taxAmount = Number.isFinite(taxAmountRaw) && taxAmountRaw > 0
    ? Number(taxAmountRaw.toFixed(2))
    : 0;
  const computedTotal = taxableAmount + taxAmount;
  const finalTotalComputed = Number.isFinite(computedTotal)
    ? Number(computedTotal.toFixed(2))
    : 0;
  const finalTotal = projectLinked
    ? finalTotalComputed
    : (hasStoredCost ? storedCost : finalTotalComputed);
  if (companySharePercent > 0) {
    companyShareAmount = Number(Math.max(0, subtotalAfterDiscount * (companySharePercent / 100)).toFixed(2));
  }

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const techniciansCountDisplay = normalizeNumbers(String(assignedTechnicians.length));
  const equipmentTotalDisplay = normalizeNumbers(equipmentTotal.toFixed(2));
  const discountAmountDisplay = normalizeNumbers(discountAmount.toFixed(2));
  const subtotalAfterDiscountDisplay = normalizeNumbers(subtotalAfterDiscount.toFixed(2));
  const taxAmountDisplay = normalizeNumbers(taxAmount.toFixed(2));
  const finalTotalDisplay = normalizeNumbers((Number.isFinite(finalTotal) ? finalTotal : 0).toFixed(2));
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const discountLabel = t('reservations.details.labels.discount', 'الخصم');
  const taxLabel = t('reservations.details.labels.tax', 'الضريبة (15%)');
  const crewTotalLabel = t('reservations.details.labels.crewTotal', 'إجمالي الفريق');
  const subtotalAfterDiscountLabel = t('reservations.details.labels.subtotalAfterDiscount', 'الإجمالي');
  const durationLabel = t('reservations.details.labels.duration', 'عدد الأيام');
  const companyShareLabel = t('reservations.details.labels.companyShare', '🏦 نسبة الشركة');
  const netProfitLabel = t('reservations.details.labels.netProfit', '💵 صافي الربح');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');
  const tableHeaders = {
    item: t('reservations.equipment.table.item', 'المعدة'),
    quantity: t('reservations.equipment.table.quantity', 'الكمية'),
    unitPrice: t('reservations.equipment.table.unitPrice', 'سعر الوحدة'),
    total: t('reservations.equipment.table.total', 'الإجمالي'),
    actions: t('reservations.equipment.table.actions', 'الإجراءات')
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
  const paymentPartialText = t('reservations.list.payment.partial', '💳 مدفوع جزئياً');
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
  const projectLabel = t('reservations.details.labels.project', '📁 المشروع المرتبط');
  const projectFallback = t('reservations.details.project.unlinked', 'غير مرتبط بأي مشروع.');
  const projectMissingText = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const openProjectLabel = t('reservations.details.actions.openProject', '📁 فتح المشروع');
  const startLabel = t('reservations.details.labels.start', 'بداية الحجز');
  const endLabel = t('reservations.details.labels.end', 'نهاية الحجز');
  const notesLabel = t('reservations.details.labels.notes', 'ملاحظات');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountLabel = t('reservations.details.labels.itemsCount', 'عدد المعدات');
  const itemsTotalLabel = t('reservations.details.labels.itemsTotal', 'إجمالي المعدات');
  const paymentHistoryTitle = t('reservations.paymentHistory.title', 'سجل الدفعات');
  const paymentHistoryEmpty = t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');

  const paidStatus = reservation.paidStatus
    ?? reservation.paid_status
    ?? (paid ? 'paid' : 'unpaid');
  const isPartial = paidStatus === 'partial';
  const paymentStatusText = paidStatus === 'paid'
    ? paymentPaidText
    : isPartial
      ? paymentPartialText
      : paymentUnpaidText;
  const totalItemsQuantity = groupedItems.reduce((sum, group) => sum + (Number(group.quantity) || 0), 0);
  const itemsCountDisplay = normalizeNumbers(String(totalItemsQuantity));
  const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
  const crewCountText = crewCountTemplate.replace('{count}', techniciansCountDisplay);
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;

  const crewTotalDisplay = normalizeNumbers(crewTotal.toFixed(2));
  const companySharePercentDisplay = normalizeNumbers(String(companySharePercent));
  const companyShareAmountDisplay = normalizeNumbers(companyShareAmount.toFixed(2));
  const companyShareValue = `${companySharePercentDisplay}% (${companyShareAmountDisplay} ${currencyLabel})`;
  const revenueAfterDiscountValue = Math.max(0, (equipmentTotal + crewTotal) - discountAmount);
  const netProfitValue = Math.max(0, revenueAfterDiscountValue - crewCostTotal);
  const netProfitDisplay = normalizeNumbers(netProfitValue.toFixed(2));

  const summaryDetails = [
    { icon: '💼', label: itemsTotalLabel, value: `${equipmentTotalDisplay} ${currencyLabel}` }
  ];

  summaryDetails.push({ icon: '😎', label: crewTotalLabel, value: `${crewTotalDisplay} ${currencyLabel}` });

  if (discountAmount > 0) {
    summaryDetails.push({ icon: '💸', label: discountLabel, value: `${discountAmountDisplay} ${currencyLabel}` });
  }

  summaryDetails.push({ icon: '📊', label: subtotalAfterDiscountLabel, value: `${subtotalAfterDiscountDisplay} ${currencyLabel}` });

  if (applyTaxFlag && taxAmount > 0) {
    summaryDetails.push({ icon: '🧾', label: taxLabel, value: `${taxAmountDisplay} ${currencyLabel}` });
  }

  if (companySharePercent > 0) {
    summaryDetails.push({ icon: '🏦', label: companyShareLabel, value: companyShareValue });
  }

  if (Math.abs(netProfitValue - (finalTotal ?? 0)) > 0.009) {
    summaryDetails.push({ icon: '💵', label: netProfitLabel, value: `${netProfitDisplay} ${currencyLabel}` });
  }

  summaryDetails.push({ icon: '💰', label: finalTotalLabel, value: `${finalTotalDisplay} ${currencyLabel}` });

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${label}</span>
      <span class="summary-details-value">${value}</span>
    </div>
  `).join('');

  console.debug('[reservations/details] payment history raw', reservation.paymentHistory, reservation.payment_history);
  let originalHistory = [];
  if (Array.isArray(reservation.paymentHistory)) {
    originalHistory = reservation.paymentHistory;
  } else if (Array.isArray(reservation.payment_history)) {
    originalHistory = reservation.payment_history;
  }

  const fallbackHistory = Array.isArray(reservation.paymentLogs)
    ? reservation.paymentLogs
    : []; // تعويض لأي مصادر أخرى لاحقاً

  const paymentHistory = Array.isArray(originalHistory) && originalHistory.length > 0
    ? originalHistory
    : fallbackHistory;

  const paymentHistoryHtml = paymentHistory.length
    ? `<ul class="reservation-payment-history-list">${paymentHistory.map((entry) => {
        const entryType = entry?.type === 'amount'
          ? t('reservations.paymentHistory.type.amount', 'دفعة مالية')
          : entry?.type === 'percent'
            ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
            : t('reservations.paymentHistory.type.unknown', 'دفعة');
        const entryAmount = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
          ? `${normalizeNumbers(Number(entry.amount).toFixed(2))} ${currencyLabel}`
          : '—';
        const entryPercent = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
          ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
          : '—';
        const entryDate = entry?.recordedAt ? normalizeNumbers(formatDateTime(entry.recordedAt)) : '—';
        const noteHtml = entry?.note ? `<div class="payment-history-note">${escapeHtml(normalizeNumbers(entry.note))}</div>` : '';
        return `
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${escapeHtml(entryType)}</span>
              <span class="payment-history-entry__amount">${entryAmount}</span>
              <span class="payment-history-entry__percent">${entryPercent}</span>
              <span class="payment-history-entry__date">${entryDate}</span>
            </div>
            ${noteHtml}
          </li>
        `;
      }).join('')}</ul>`
    : `<div class="reservation-payment-history-empty">${escapeHtml(paymentHistoryEmpty)}</div>`;

  const statusChipsData = [
    {
      text: confirmed ? statusConfirmedText : statusPendingText,
      className: confirmed ? 'status-confirmed' : 'status-pending'
    },
    {
      text: paymentStatusText,
      className: paidStatus === 'paid'
        ? 'status-paid'
        : isPartial
          ? 'status-partial'
          : 'status-unpaid'
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

  let projectRowHtml = '';
  if (reservation.projectId) {
    let projectValueHtml = escapeHtml(projectMissingText);
    if (project) {
      const title = project.title || t('projects.fallback.untitled', 'مشروع بدون اسم');
      projectValueHtml = `${escapeHtml(title)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${project.id}">${escapeHtml(openProjectLabel)}</button>`;
    }

    projectRowHtml = `
      <div class="res-info-row">
        <span class="label">📁 ${projectLabel}</span>
        <span class="value">${projectValueHtml}</span>
      </div>
    `;
  }

  const infoRows = [];
  infoRows.push(renderInfoRow('👤', customerLabel, customer?.customerName || unknownCustomer));
  infoRows.push(renderInfoRow('📞', contactLabel, customer?.phone || '—'));
  infoRows.push(renderInfoRow('🗓️', startLabel, startDisplay));
  infoRows.push(renderInfoRow('🗓️', endLabel, endDisplay));
  infoRows.push(renderInfoRow('📦', itemsCountLabel, itemsCountText));
  infoRows.push(renderInfoRow('⏱️', durationLabel, rentalDaysDisplay));
  infoRows.push(renderInfoRow('📝', notesLabel, notesDisplay));
  if (projectRowHtml) {
    infoRows.push(projectRowHtml);
  }

  const infoRowsHtml = infoRows.join('');


  const itemsTableBody = groupedItems.length
    ? groupedItems.map((group) => {
        const representative = group.items[0] || {};
        const imageSource = resolveItemImage(representative) || group.image;
        const imageCell = imageSource
          ? `<img src="${imageSource}" alt="${imageAlt}" class="reservation-item-thumb">`
          : '<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';
        const quantityValue = Number(group.quantity) || Number(group.count) || 0;
        const quantityDisplay = normalizeNumbers(String(quantityValue));
        const unitPriceNumber = Number.isFinite(Number(group.unitPrice)) ? Number(group.unitPrice) : 0;
        const totalPriceNumber = Number.isFinite(Number(group.totalPrice)) ? Number(group.totalPrice) : unitPriceNumber * quantityValue;
        const unitPriceDisplay = `${normalizeNumbers(unitPriceNumber.toFixed(2))} ${currencyLabel}`;
        const totalPriceDisplay = `${normalizeNumbers(totalPriceNumber.toFixed(2))} ${currencyLabel}`;
        const normalizedBarcodes = group.barcodes
          .map((code) => normalizeNumbers(String(code || '')))
          .filter(Boolean);
        const barcodesMeta = normalizedBarcodes.length
          ? `<details class="reservation-item-barcodes">
              <summary>${t('reservations.equipment.barcodes.summary', 'عرض الباركودات')}</summary>
              <ul class="reservation-barcode-list">
                ${normalizedBarcodes.map((code) => `<li>${code}</li>`).join('')}
              </ul>
            </details>`
          : '';

        return `
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${imageCell}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${escapeHtml(representative.desc || representative.description || representative.name || group.description || '-')}</div>
                  ${barcodesMeta}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${quantityDisplay}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.unitPrice)}">${unitPriceDisplay}</td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.total)}">${totalPriceDisplay}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${escapeHtml(tableHeaders.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="5" class="text-center">${noItemsText}</td></tr>`;

  const itemsTable = `
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${tableHeaders.item}</th>
            <th>${tableHeaders.quantity}</th>
            <th>${tableHeaders.unitPrice}</th>
            <th>${tableHeaders.total}</th>
            <th>${tableHeaders.actions}</th>
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
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${paymentSummaryTitle}</h6>
          <div class="summary-details">
            ${summaryDetailsHtml}
          </div>
          <div class="reservation-payment-history-modal">
            <h6 class="history-heading">${paymentHistoryTitle}</h6>
            ${paymentHistoryHtml}
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
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${index}">
          ${t('reservations.details.actions.exportPdf', '👁️ معاينة PDF')}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${index}">${editActionLabel}</button>
        ${canDelete ? `<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${index}">${deleteActionLabel}</button>` : ''}
      </div>
    </div>
  `;
}
