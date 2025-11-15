import { t } from '../../language.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { isReservationCompleted, resolveReservationProjectState } from '../../reservationsShared.js';
import { calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../../reservationsSummary.js';
import { resolveProjectTotals } from '../../projects/view.js';

export function buildReservationTilesHtml({ entries, customersMap, techniciansMap, projectsMap }) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const taxIncludedShort = t('reservations.list.taxIncludedShort', '(شامل الضريبة)');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountTemplate = t('reservations.list.itemsCountShort', '{count} عنصر');
  const crewSeparator = t('reservations.list.crew.separator', '، ');
  const statusConfirmedText = t('reservations.list.status.confirmed', '✅ مؤكد');
  const statusPendingText = t('reservations.list.status.pending', '⏳ غير مؤكد');
  const statusCompletedText = t('reservations.list.status.completed', '📁 مغلق');
  const paymentPaidText = t('reservations.list.payment.paid', '💳 مدفوع');
  const paymentUnpaidText = t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paymentPartialText = t('reservations.list.payment.partial', '💳 مدفوع جزئياً');
  const confirmLabel = t('reservations.list.actions.confirm', '✔️ تأكيد');
  const closeLabel = t('reservations.list.actions.close', '🔒 إغلاق الحجز');
  const projectUnlinkedText = t('reservations.list.project.unlinked', 'غير مرتبط بمشروع');
  const projectMissingText = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const labels = {
    client: t('reservations.list.labels.client', '👤 العميل'),
    project: t('reservations.list.labels.project', '📁 المشروع'),
    start: t('reservations.list.labels.start', '🗓️ بداية الحجز'),
    end: t('reservations.list.labels.end', '🗓️ نهاية الحجز'),
    cost: t('reservations.list.labels.cost', '💵 الإجمالي النهائي'),
    equipment: t('reservations.list.labels.equipment', '📦 المعدات'),
    crew: t('reservations.list.labels.crew', '😎 الفريق')
  };

  return entries.map(({ reservation, index }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const project = reservation.projectId ? projectsMap?.get?.(String(reservation.projectId)) : null;
    const completed = isReservationCompleted(reservation);

    // Compute display cost first (used for payment progress), then derive paid/isPartial

    // Chips and confirm button are defined later, after cancellation override block

    const itemsCount = reservation.items?.length || 0;
    const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
    const techniciansAssigned = (reservation.technicians || [])
      .map((id) => techniciansMap.get(String(id)))
      .filter(Boolean);
    const crewSummaryList = crewAssignments.length
      ? crewAssignments.map((assignment) => {
          const positionLabel = assignment.positionLabel
            ?? assignment.position_name
            ?? assignment.role
            ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
          const technicianName = assignment.technicianName
            ?? techniciansMap.get(String(assignment.technicianId ?? ''))?.name
            ?? null;
          return technicianName
            ? `${normalizeNumbers(positionLabel)} (${normalizeNumbers(technicianName)})`
            : normalizeNumbers(positionLabel);
        })
      : techniciansAssigned.map((tech) => tech.name);
    const techniciansNames = crewSummaryList.length
      ? crewSummaryList.join(crewSeparator)
      : '—';
    const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? ''));
    const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
    const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
    // احسب الإجمالي النهائي ديناميكياً ليتطابق دائماً مع مودال التفاصيل
    const discountValueRaw = reservation.discount
      ?? reservation.discountValue
      ?? reservation.discount_value
      ?? reservation.discountAmount
      ?? 0;
    const discountParsed = Number.parseFloat(normalizeNumbers(String(discountValueRaw)));
    const discountValue = Number.isFinite(discountParsed) ? discountParsed : 0;
    const discountTypeRaw = reservation.discountType
      ?? reservation.discount_type
      ?? reservation.discountMode
      ?? 'percent';
    const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
    const applyTaxFlag = Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);
    const rawCompanySharePercent = reservation.companySharePercent
      ?? reservation.company_share_percent
      ?? reservation.companyShare
      ?? reservation.company_share;
    const companyShareEnabledFlag = reservation.companyShareEnabled
      ?? reservation.company_share_enabled
      ?? reservation.companyShareApplied;
    const companyShareParsed = Number.parseFloat(normalizeNumbers(String(rawCompanySharePercent)));
    const hasCompanyShare = (companyShareEnabledFlag === true) || (Number.isFinite(companyShareParsed) && companyShareParsed > 0);
    const companySharePercentInput = hasCompanyShare && Number.isFinite(companyShareParsed) ? companyShareParsed : 0;

    let computedFinalTotal = 0;
    try {
      const breakdown = calculateDraftFinancialBreakdown({
        items: reservation.items || [],
        technicianIds: reservation.technicians || [],
        crewAssignments: Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [],
        discount: discountValue,
        discountType,
        applyTax: applyTaxFlag,
        start: reservation.start,
        end: reservation.end,
        companySharePercent: companySharePercentInput,
        groupingSource: reservation,
      });
      const num = Number(breakdown?.finalTotal || 0);
      computedFinalTotal = Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
    } catch (_e) {
      computedFinalTotal = 0;
    }
    const fallbackCost = Number.parseFloat(normalizeNumbers(String(reservation.cost ?? 0))) || 0;
    const displayCost = computedFinalTotal > 0 ? computedFinalTotal : fallbackCost;

    // Derive reservation payment status from amounts/history AFTER displayCost is known
    const resHistory = reservation.paymentHistory || reservation.payment_history || [];
    const resProgress = calculatePaymentProgress({
      totalAmount: displayCost,
      // تفادي العد المزدوج: إذا تواجد سجل دفعات، لا نمرّر paidAmount/paidPercent
      paidAmount: resHistory.length ? 0 : reservation.paidAmount,
      paidPercent: resHistory.length ? 0 : reservation.paidPercent,
      history: resHistory,
    });
    const reservationDerivedStatus = determinePaymentStatus({
      manualStatus: null,
      paidAmount: resProgress.paidAmount,
      paidPercent: resProgress.paidPercent,
      totalAmount: displayCost,
    });

    // If linked to a project, derive the project's payment status similarly and use it
    let effectivePaidStatus = reservationDerivedStatus;
    if (project) {
      try {
        const { totalWithTax } = resolveProjectTotals(project) || { totalWithTax: 0 };
        const projHistory = project.paymentHistory || project.payments || [];
        const projProgress = calculatePaymentProgress({
          totalAmount: totalWithTax,
          paidAmount: projHistory.length ? 0 : project.paidAmount,
          paidPercent: projHistory.length ? 0 : project.paidPercent,
          history: projHistory,
        });
        const projDerived = determinePaymentStatus({
          manualStatus: null,
          paidAmount: projProgress.paidAmount,
          paidPercent: projProgress.paidPercent,
          totalAmount: totalWithTax,
        });
        if (projDerived) effectivePaidStatus = projDerived;
      } catch (_) { /* ignore and fall back to reservationDerivedStatus */ }
    }
    const paid = effectivePaidStatus === 'paid';
    const isPartial = effectivePaidStatus === 'partial';

    // Build chips and state classes now that payment state is known
    const { effectiveConfirmed, projectLinked } = resolveReservationProjectState(reservation, project);
    const statusClass = effectiveConfirmed ? 'status-confirmed' : 'status-pending';
    const paymentClass = paid ? 'status-paid' : (isPartial ? 'status-partial' : 'status-unpaid');
    let statusBadge = `<span class="reservation-chip status-chip ${statusClass}">${effectiveConfirmed ? statusConfirmedText : statusPendingText}</span>`;
    const paymentLabel = paid ? paymentPaidText : (isPartial ? paymentPartialText : paymentUnpaidText);
    let paymentBadge = `<span class="reservation-chip status-chip ${paymentClass}">${paymentLabel}</span>`;
    let stateClass = paid ? ' tile-paid' : (isPartial ? ' tile-partial' : ' tile-unpaid');
    if (completed) stateClass += ' tile-completed';
    let completedAttr = '';
    if (completed) {
      statusBadge = `<span class=\"reservation-chip status-chip status-completed\">${statusCompletedText}</span>`;
      paymentBadge = `<span class=\"reservation-chip status-chip status-completed\">${paymentLabel}</span>`;
      const ribbonTextRaw = t('reservations.list.ribbon.completed', 'مغلق');
      const ribbonTextAttr = ribbonTextRaw.replace(/\"/g, '&quot;');
      completedAttr = ` data-completed-label=\"${ribbonTextAttr}\"`;
    }
    let confirmButtonHtml = '';
    const statusValue = String(reservation.status || '').toLowerCase();
    const canReopen = statusValue === 'completed';
    if (!projectLinked) {
      if (canReopen) {
        confirmButtonHtml = `<button class=\"tile-confirm\" data-reservation-index=\"${index}\" data-action=\"reopen\">${t('reservations.list.actions.reopen', '↩️ إلغاء الإغلاق')}</button>`;
      } else if (!effectiveConfirmed) {
        confirmButtonHtml = `<button class=\"tile-confirm\" data-reservation-index=\"${index}\" data-action=\"confirm\">${confirmLabel}</button>`;
      } else if (!completed) {
        confirmButtonHtml = `<button class=\"tile-confirm\" data-reservation-index=\"${index}\" data-action=\"close\">${closeLabel}</button>`;
      }
    }
    const confirmSectionHtml = confirmButtonHtml
      ? `<div class=\"tile-actions\">${confirmButtonHtml}</div>`
      : '';
    const costNumber = normalizeNumbers(displayCost.toFixed(2));
    const itemsCountDisplay = normalizeNumbers(String(itemsCount));
    const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;
    const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
    const taxBadge = reservation.applyTax ? `<small>${taxIncludedShort}</small>` : '';
    let projectNameText = projectUnlinkedText;
    if (reservation.projectId) {
      projectNameText = project?.title ? normalizeNumbers(project.title) : projectMissingText;
    }

    const wrapperClasses = confirmButtonHtml
      ? 'reservation-tile-wrapper has-tile-action'
      : 'reservation-tile-wrapper';

    return `
      <div class="${wrapperClasses}">
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
            <span class="tile-value">${customer?.customerName || reservation.customerName || unknownCustomer}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${labels.project}</span>
            <span class="tile-value">${projectNameText}</span>
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
            <span class="tile-value">${crewSummaryList.length ? techniciansNames : '—'}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${notesDisplay}</span>
          </div>
        </div>
        ${confirmSectionHtml}
      </div>
    `;
  }).join('');
}
