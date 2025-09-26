import { t } from '../../language.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { isReservationCompleted } from '../../reservationsShared.js';

export function buildReservationTilesHtml({ entries, customersMap, techniciansMap, projectsMap }) {
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
  const projectUnlinkedText = t('reservations.list.project.unlinked', 'غير مرتبط بمشروع');
  const projectMissingText = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const labels = {
    client: t('reservations.list.labels.client', '👤 العميل'),
    project: t('reservations.list.labels.project', '📁 المشروع'),
    start: t('reservations.list.labels.start', '🗓️ بداية الحجز'),
    end: t('reservations.list.labels.end', '🗓️ نهاية الحجز'),
    cost: t('reservations.list.labels.cost', '💵 التكلفة'),
    equipment: t('reservations.list.labels.equipment', '📦 المعدات'),
    crew: t('reservations.list.labels.crew', '😎 الفريق')
  };

  return entries.map(({ reservation, index }) => {
    const customer = customersMap.get(String(reservation.customerId));
    const project = reservation.projectId ? projectsMap?.get?.(String(reservation.projectId)) : null;
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
    const techniciansAssigned = (reservation.technicians || [])
      .map((id) => techniciansMap.get(String(id)))
      .filter(Boolean);
    const techniciansNames = techniciansAssigned.map((tech) => tech.name).join(crewSeparator) || '—';
    const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? ''));
    const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
    const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
    const costNumber = normalizeNumbers(String(reservation.cost ?? 0));
    const itemsCountDisplay = normalizeNumbers(String(itemsCount));
    const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;
    const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
    const taxBadge = reservation.applyTax ? `<small>${taxIncludedShort}</small>` : '';
    let projectNameText = projectUnlinkedText;
    if (reservation.projectId) {
      projectNameText = project?.title ? normalizeNumbers(project.title) : projectMissingText;
    }

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
