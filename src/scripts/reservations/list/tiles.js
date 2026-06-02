import { t, getCurrentLanguage } from '../../language.js';
import { normalizeNumbers } from '../../utils.js';
import { isReservationCompleted, resolveReservationProjectState } from '../../reservationsShared.js';
import { calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../../reservationsSummary.js';
import { resolveProjectTotals } from '../../projects/view.js';
import { escapeHtml } from '../../projectsCommon.js';

export function resolveReservationLifecycleGroup(reservation) {
  const rawStatusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
  const isCancelled = rawStatusValue === 'cancelled' || rawStatusValue === 'canceled';
  const completed = isReservationCompleted(reservation);

  if (isCancelled) {
    return {
      key: 'cancelled',
      group: 'archive',
      cardClass: 'project-focus-card--cancelled',
      stateChipClass: 'status-cancelled',
    };
  }

  if (completed) {
    return {
      key: 'completed',
      group: 'archive',
      cardClass: 'project-focus-card--completed',
      stateChipClass: 'status-completed',
    };
  }

  return {
    key: 'active',
    group: 'live',
    cardClass: 'project-focus-card--ongoing',
    stateChipClass: 'status-ongoing',
  };
}

function stripCardDecorators(value) {
  return String(value || '')
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D#*0-9]+\s*/gu, '')
    .trim();
}

function buildReservationStat({ label, value, icon = '' }) {
  return `
    <div class="reservation-list-card__stat">
      <span class="reservation-list-card__stat-label">
        ${icon ? `<span class="reservation-list-card__label-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : ''}
        <span>${escapeHtml(label)}</span>
      </span>
      <span class="reservation-list-card__stat-value">${escapeHtml(value)}</span>
    </div>
  `;
}

function formatReservationDateTimeParts(value) {
  if (!value) return { date: '—', time: '—' };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    const fallback = normalizeNumbers(String(value));
    return { date: fallback, time: '—' };
  }

  const locale = getCurrentLanguage() === 'ar' ? 'ar-SA' : 'en-US';
  const dateText = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
  const timeText = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return {
    date: normalizeNumbers(dateText),
    time: normalizeNumbers(timeText),
  };
}

function buildReservationScheduleItem({ label, date, time, icon = '' }) {
  return `
    <div class="reservation-list-card__schedule-item">
      <span class="reservation-list-card__schedule-label">
        ${icon ? `<span class="reservation-list-card__label-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : ''}
        <span>${escapeHtml(label)}</span>
      </span>
      <span class="reservation-list-card__schedule-value">${escapeHtml(date)}</span>
      <span class="reservation-list-card__schedule-time">${escapeHtml(time)}</span>
    </div>
  `;
}

function buildReservationCrewSummary({ reservation, techniciansMap, crewSeparator, dashFallback }) {
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

  return {
    crewAssignments,
    techniciansNames: crewSummaryList.length ? crewSummaryList.join(crewSeparator) : dashFallback,
  };
}

function resolveReservationCardUiState({
  reservation,
  project,
  effectiveConfirmed,
  effectivePaidStatus,
  statusConfirmedText,
  statusPendingText,
  paymentPaidText,
  paymentUnpaidText,
  paymentPartialText,
  confirmLabel,
  closeLabel,
  reservationIdentifier,
  index,
}) {
  const lifecycle = resolveReservationLifecycleGroup(reservation);
  const isProjectLinked = Boolean(reservation?.projectId ?? reservation?.project_id);
  const completed = lifecycle.key === 'completed';
  const isCancelled = lifecycle.key === 'cancelled';
  const paid = effectivePaidStatus === 'paid';
  const isPartial = effectivePaidStatus === 'partial';
  const paymentLabel = paid ? paymentPaidText : (isPartial ? paymentPartialText : paymentUnpaidText);
  const paymentClass = paid ? 'status-paid' : (isPartial ? 'status-partial' : 'status-unpaid');
  const confirmationLabel = isCancelled
    ? stripCardDecorators(t('reservations.list.lifecycle.cancelled', '❌ ملغي'))
    : completed
      ? stripCardDecorators(t('reservations.list.lifecycle.closed', '📁 مغلق'))
      : effectiveConfirmed
        ? statusConfirmedText
        : statusPendingText;
  const confirmationClass = isCancelled
    ? 'status-cancelled'
    : completed
      ? 'status-completed'
      : effectiveConfirmed
        ? 'status-confirmed'
        : 'status-pending';
  const confirmationBadge = `<span class="reservation-chip ${confirmationClass}">${escapeHtml(confirmationLabel)}</span>`;
  const paymentBadge = `<span class="reservation-chip ${paymentClass}">${escapeHtml(paymentLabel)}</span>`;
  const stateToneClass = isCancelled
    ? 'reservation-list-card--cancelled'
    : completed
      ? 'reservation-list-card--completed'
      : effectiveConfirmed
        ? 'reservation-list-card--confirmed'
        : 'reservation-list-card--pending';

  let actionControl = '';
  if (!isProjectLinked && !isCancelled) {
    if (!effectiveConfirmed) {
      actionControl = `<button type="button" class="ui-button ui-button--primary btn btn-primary btn-sm reservation-list-card__action reservation-list-card__action--confirm" data-reservation-index="${index}" data-reservation-id="${reservationIdentifier}" data-action="confirm">${escapeHtml(confirmLabel)}</button>`;
    } else if (!completed) {
      actionControl = `<button type="button" class="ui-button ui-button--outline btn btn-outline-warning btn-sm reservation-list-card__action reservation-list-card__action--close" data-reservation-index="${index}" data-reservation-id="${reservationIdentifier}" data-action="close">${escapeHtml(closeLabel)}</button>`;
    }
  }

  return {
    lifecycle,
    confirmationBadge,
    paymentBadge,
    stateToneClass,
    isProjectLinked,
    actionControl,
  };
}

export function buildReservationTilesHtml({ entries, customersMap, techniciansMap, projectsMap }) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const taxIncludedShort = t('reservations.list.taxIncludedShort', '(شامل الضريبة)');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');
  const itemsCountTemplate = t('reservations.list.itemsCountShort', '{count} عنصر');
  const crewSeparator = t('reservations.list.crew.separator', '، ');
  const statusConfirmedText = stripCardDecorators(t('reservations.list.status.confirmed', '✅ مؤكد'));
  const statusPendingText = stripCardDecorators(t('reservations.list.status.pending', '⏳ غير مؤكد'));
  const paymentPaidText = stripCardDecorators(t('reservations.list.payment.paid', '💳 مدفوع'));
  const paymentUnpaidText = stripCardDecorators(t('reservations.list.payment.unpaid', '💳 غير مدفوع'));
  const paymentPartialText = stripCardDecorators(t('reservations.list.payment.partial', '💳 مدفوع جزئياً'));
  const confirmLabel = stripCardDecorators(t('reservations.list.actions.confirm', '✔️ تأكيد'));
  const closeLabel = stripCardDecorators(t('reservations.list.actions.close', '🔒 إغلاق الحجز'));
  const projectUnlinkedText = t('reservations.list.project.unlinked', 'غير مرتبط بمشروع');
  const projectMissingText = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const projectLinkedText = stripCardDecorators(t('reservations.list.projectLinked', 'مرتبط بمشروع'));
  const dashFallback = normalizeNumbers('—');
  const labels = {
    project: stripCardDecorators(t('reservations.list.labels.project', 'المشروع')),
    start: stripCardDecorators(t('reservations.list.labels.start', 'بداية الحجز')),
    end: stripCardDecorators(t('reservations.list.labels.end', 'نهاية الحجز')),
    cost: stripCardDecorators(t('reservations.list.labels.cost', 'الإجمالي النهائي')),
    equipment: stripCardDecorators(t('reservations.list.labels.equipment', 'المعدات')),
    crew: stripCardDecorators(t('reservations.list.labels.crew', 'الطاقم')),
    notes: stripCardDecorators(t('reservations.list.labels.notes', 'الملاحظات')),
  };

  return entries.map(({ reservation, index }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const project = reservation.projectId ? projectsMap?.get?.(String(reservation.projectId)) : null;
    const reservationIdentifier = reservation.id
      ?? reservation.reservationId
      ?? reservation.reservation_code
      ?? reservation.reservationCode
      ?? '';

    const itemsCount = reservation.items?.length || 0;
    const { crewAssignments, techniciansNames } = buildReservationCrewSummary({
      reservation,
      techniciansMap,
      crewSeparator,
      dashFallback,
    });

    const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
    const startParts = formatReservationDateTimeParts(reservation.start);
    const endParts = formatReservationDateTimeParts(reservation.end);

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
        crewAssignments,
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
    } catch (_) {
      computedFinalTotal = 0;
    }
    const fallbackCost = Number.parseFloat(normalizeNumbers(String(reservation.cost ?? 0))) || 0;
    const displayCost = computedFinalTotal > 0 ? computedFinalTotal : fallbackCost;

    const resHistory = reservation.paymentHistory || reservation.payment_history || [];
    const resProgress = calculatePaymentProgress({
      totalAmount: displayCost,
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
      } catch (_) {
        // ignore and keep reservation-derived payment state
      }
    }

    const { effectiveConfirmed } = resolveReservationProjectState(reservation, project);

    const costNumber = normalizeNumbers(displayCost.toFixed(2));
    const itemsCountDisplay = normalizeNumbers(String(itemsCount));
    const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
    const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : '';
    let projectNameText = projectUnlinkedText;
    if (reservation.projectId) {
      projectNameText = project?.title ? normalizeNumbers(project.title) : projectMissingText;
    }
    projectNameText = stripCardDecorators(projectNameText);

    const {
      lifecycle,
      confirmationBadge,
      paymentBadge,
      stateToneClass,
      isProjectLinked,
      actionControl,
    } = resolveReservationCardUiState({
      reservation,
      project,
      effectiveConfirmed,
      effectivePaidStatus,
      statusConfirmedText,
      statusPendingText,
      paymentPaidText,
      paymentUnpaidText,
      paymentPartialText,
      confirmLabel,
      closeLabel,
      reservationIdentifier,
      index,
    });

    const detailStats = [
      { label: labels.project, value: normalizeNumbers(projectNameText), icon: '📁' },
      { label: labels.equipment, value: itemsCountText, icon: '📦' },
      { label: labels.crew, value: techniciansNames, icon: '😎' },
      { label: labels.cost, value: `${costNumber} ${currencyLabel}${reservation.applyTax ? ` ${taxIncludedShort}` : ''}`, icon: '💵' },
    ];

    return `
      <div class="project-card-grid__item">
        <article class="reservation-list-card reservation-list-card--${lifecycle.key} ${stateToneClass}${isProjectLinked ? ' reservation-list-card--project-linked' : ''}" data-reservation-index="${index}" data-reservation-id="${reservationIdentifier}" data-action="details" role="button" tabindex="0">
          <div class="reservation-list-card__accent"></div>
          <div class="reservation-list-card__header">
            <span class="reservation-list-card__id">#${escapeHtml(reservationIdDisplay)}</span>
            <div class="reservation-list-card__badges">
              ${isProjectLinked ? `<span class="reservation-chip status-project-linked">${escapeHtml(projectLinkedText)}</span>` : ''}
              ${confirmationBadge}
              ${paymentBadge}
            </div>
          </div>
          <div class="reservation-list-card__heading">
            <h6 class="reservation-list-card__title">${escapeHtml(normalizeNumbers(customer?.customerName || reservation.customerName || unknownCustomer))}</h6>
          </div>
          <div class="reservation-list-card__schedule">
            ${buildReservationScheduleItem({ label: labels.start, date: startParts.date, time: startParts.time, icon: '📅' })}
            ${buildReservationScheduleItem({ label: labels.end, date: endParts.date, time: endParts.time, icon: '⏰' })}
          </div>
          <div class="reservation-list-card__body reservation-list-card__body--grid">
            ${detailStats.map(buildReservationStat).join('')}
          </div>
          ${notesDisplay ? `
            <div class="reservation-list-card__footer">
              <div class="reservation-list-card__notes" title="${escapeHtml(notesDisplay)}">
                <span class="reservation-list-card__notes-label">${escapeHtml(labels.notes)}:</span>
                <span class="reservation-list-card__notes-text">${escapeHtml(notesDisplay)}</span>
              </div>
            </div>
          ` : ''}
          ${actionControl ? `<div class="reservation-list-card__actions">${actionControl}</div>` : ''}
        </article>
      </div>
    `;
  }).join('');
}
