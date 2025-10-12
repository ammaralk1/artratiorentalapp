import { formatDateTime, normalizeNumbers } from './utils.js';
import { syncTechniciansStatuses } from './technicians.js';
import { calculateReservationDays, DEFAULT_COMPANY_SHARE_PERCENT } from './reservationsSummary.js';
import { t, getCurrentLanguage } from './language.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, isApiError as isReservationsApiError } from './reservationsService.js';
import { loadData } from './storage.js';
import { resolveReservationProjectState, groupReservationItems } from './reservationsShared.js';
import { resolveItemImage } from './reservationsEquipment.js';

const CALENDAR_FETCH_PARAMS = { limit: 200 };

let calendarInstance = null;
let calendarLanguageListenerAttached = false;
let calendarReservationsListenerAttached = false;
let calendarResponsiveListenerAttached = false;
let calendarThemeObserverAttached = false;
let calendarThemeObserver = null;
let calendarThemeDebounce = null;
let isCalendarLoading = false;
let calendarErrorMessage = '';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCalendarElements() {
  const calendarEl = document.getElementById('calendar');
  const panelEl = document.getElementById('calendar-panel') || calendarEl?.parentElement || null;
  const statusEl = document.getElementById('calendar-status');
  return { calendarEl, panelEl, statusEl };
}

function getFullCalendarGlobal() {
  if (typeof FullCalendar !== 'undefined') return FullCalendar;
  if (typeof window !== 'undefined' && window.FullCalendar) return window.FullCalendar;
  if (typeof globalThis !== 'undefined' && globalThis.FullCalendar) return globalThis.FullCalendar;
  return null;
}

function setCalendarStatus({ loading = false, error = '', empty = false } = {}) {
  const { panelEl, statusEl } = getCalendarElements();
  if (!panelEl || !statusEl) return;

  const hasError = typeof error === 'string' ? error.trim().length > 0 : Boolean(error);
  const isEmpty = !loading && !hasError && Boolean(empty);
  const shouldShow = loading || hasError || isEmpty;

  panelEl.classList.toggle('is-loading', loading);
  panelEl.classList.toggle('has-error', hasError);
  panelEl.classList.toggle('is-empty', isEmpty);

  if (!statusEl.dataset.initialized) {
    statusEl.classList.add(
      'alert',
      'rounded-3xl',
      'shadow-soft',
      'bg-base-100/95',
      'border',
      'border-dashed',
      'border-primary/30',
      'text-base-content',
      'text-sm',
      'font-semibold',
      'px-6',
      'py-5',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-3',
      'backdrop-blur-sm',
      'text-center'
    );
    statusEl.dataset.initialized = 'true';
  }

  statusEl.classList.remove('alert-info', 'alert-error', 'alert-warning', 'alert-success');
  statusEl.classList.toggle('hidden', !shouldShow);

  if (!shouldShow) {
    statusEl.textContent = '';
    statusEl.removeAttribute('data-status');
    return;
  }

  let message = '';
  if (loading) {
    message = t('calendar.status.loading', '⏳ جارٍ تحميل الحجوزات...');
  } else if (hasError) {
    message = typeof error === 'string' && error.trim().length > 0
      ? error
      : t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
  } else if (isEmpty) {
    message = t('calendar.status.empty', 'لا توجد حجوزات لعرضها في هذه الفترة.');
  }

  const statusKey = loading ? 'loading' : (hasError ? 'error' : 'empty');
  statusEl.setAttribute('data-status', statusKey);

  if (loading) {
    statusEl.classList.add('alert-info');
  } else if (hasError) {
    statusEl.classList.add('alert-error');
  } else {
    statusEl.classList.add('alert-warning');
  }

  statusEl.innerHTML = '';

  if (loading) {
    const spinner = document.createElement('span');
    spinner.className = 'loading loading-spinner loading-sm text-primary';
    spinner.setAttribute('aria-hidden', 'true');
    statusEl.appendChild(spinner);
  }

  const messageEl = document.createElement('span');
  messageEl.className = 'status-message';
  messageEl.textContent = message;
  statusEl.appendChild(messageEl);
}

function destroyCalendarInstance() {
  if (!calendarInstance) return;
  calendarInstance.destroy();
  calendarInstance = null;
}

function normalizeReservationForEvent(reservation, project = null) {
  if (!reservation || typeof reservation !== 'object') return null;

  const start = reservation.start ?? reservation.startDatetime ?? reservation.start_datetime ?? null;
  const endValue = reservation.end ?? reservation.endDatetime ?? reservation.end_datetime ?? start;
  if (!start) return null;

  const statusValue = String(reservation.status ?? '').toLowerCase();
  const paidStatus = reservation.paidStatus ?? reservation.paid_status ?? null;
  const paid = reservation.paid != null
    ? reservation.paid
    : paidStatus === 'paid';
  const { effectiveConfirmed: confirmed } = resolveReservationProjectState(reservation, project);
  const reservationIdentifier = reservation.reservationId
    ?? reservation.reservationCode
    ?? reservation.reservation_code
    ?? reservation.id
    ?? start;
  const customerName = reservation.customerName ?? reservation.customer_name ?? '';

  let completed = Boolean(reservation.completed);
  if (!completed && endValue) {
    const eventEnd = new Date(endValue);
    if (!Number.isNaN(eventEnd.getTime())) {
      completed = eventEnd < new Date();
    }
  }

  return {
    id: reservation.id ?? reservationIdentifier ?? start,
    start,
    end: endValue || start,
    paid,
    confirmed,
    completed,
    reservationId: reservationIdentifier ?? '',
    customerName,
    raw: reservation,
  };
}

function buildCalendarEvents(reservations = []) {
  const { projects = [] } = loadData();
  const projectsMap = new Map(projects.map((project) => [String(project.id), project]));

  return reservations
    .map((reservation) => {
      const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
      const project = projectId != null && projectId !== ''
        ? projectsMap.get(String(projectId)) || null
        : null;
      const normalized = normalizeReservationForEvent(reservation, project);
      if (!normalized) return null;

      const palette = getEventPalette({
        ...reservation,
        paid: normalized.paid,
        confirmed: normalized.confirmed,
        completed: normalized.completed,
      });

      return {
        id: normalized.id,
        title: '',
        start: normalized.start,
        end: normalized.end,
        backgroundColor: palette.background,
        borderColor: palette.border,
        textColor: palette.text,
        display: 'auto',
        extendedProps: {
          ...reservation,
          paid: normalized.paid,
          confirmed: normalized.confirmed,
          completed: normalized.completed,
          reservationId: normalized.reservationId,
          customerName: normalized.customerName,
        },
      };
    })
    .filter(Boolean);
}

function getCalendarButtonText() {
  return {
    today: t('calendar.buttons.today', 'اليوم'),
    month: t('calendar.buttons.month', 'شهر'),
    week: t('calendar.buttons.week', 'أسبوع'),
    day: t('calendar.buttons.day', 'يوم'),
  };
}

async function loadCalendarData() {
  if (isCalendarLoading) {
    return getReservationsState();
  }

  isCalendarLoading = true;
  calendarErrorMessage = '';

  try {
    await ensureReservationsLoaded({ suppressError: false, params: CALENDAR_FETCH_PARAMS });
  } catch (error) {
    console.error('❌ [calendar] Failed to load reservations for calendar view', error);
    calendarErrorMessage = isReservationsApiError(error)
      ? error.message
      : (error instanceof Error && error.message) || '';
  } finally {
    isCalendarLoading = false;
  }

  return getReservationsState();
}

function updateCalendarEvents(events) {
  if (!calendarInstance) return;
  calendarInstance.batchRendering(() => {
    calendarInstance.removeAllEvents();
    calendarInstance.addEventSource(events);
  });
}

function dispatchCalendarUpdated(events) {
  const detail = { events };
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('calendar:updated', { detail }));
  } else if (typeof dispatchEvent === 'function') {
    dispatchEvent(new CustomEvent('calendar:updated', { detail }));
  }
}

function refreshCalendarFromState() {
  const reservations = getReservationsState();
  const events = buildCalendarEvents(reservations);

  if (!calendarInstance) {
    renderCalendar();
    return;
  }

  calendarInstance.setOption('locale', getCurrentLanguage());
  updateCalendarEvents(events);
  applyResponsiveCalendarView();
  setCalendarStatus({ loading: false, error: '', empty: events.length === 0 });
  dispatchCalendarUpdated(events);
}

function ensureCalendarListeners() {
  if (!calendarLanguageListenerAttached) {
    document.addEventListener('language:changed', () => {
      if (calendarInstance) {
        calendarInstance.setOption('locale', getCurrentLanguage());
      }
      renderCalendar();
    });
    calendarLanguageListenerAttached = true;
  }

  if (!calendarReservationsListenerAttached) {
    document.addEventListener('reservations:changed', () => {
      refreshCalendarFromState();
    });
    calendarReservationsListenerAttached = true;
  }
}

function getResponsiveCalendarView() {
  if (typeof window === 'undefined') {
    return 'dayGridMonth';
  }
  return window.innerWidth <= 768 ? 'listWeek' : 'dayGridMonth';
}

function applyResponsiveCalendarView() {
  if (!calendarInstance) return;
  const desiredView = getResponsiveCalendarView();
  if (calendarInstance.view?.type !== desiredView) {
    calendarInstance.changeView(desiredView);
  }
  calendarInstance.updateSize();
}

function ensureResponsiveListener() {
  if (calendarResponsiveListenerAttached) return;
  if (typeof window === 'undefined') return;
  window.addEventListener('resize', () => {
    applyResponsiveCalendarView();
  });
  calendarResponsiveListenerAttached = true;
}

function ensureThemeListener() {
  if (calendarThemeObserverAttached) return;
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;

  const handler = () => {
    if (calendarThemeDebounce) {
      clearTimeout(calendarThemeDebounce);
    }
    calendarThemeDebounce = setTimeout(() => {
      if (!calendarInstance) return;
      refreshCalendarFromState();
    }, 80);
  };

  calendarThemeObserver = new MutationObserver(handler);
  calendarThemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  if (document.body) {
    calendarThemeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  calendarThemeObserverAttached = true;
}

function isDarkModeActive() {
  if (typeof document === 'undefined') return false;
  const htmlEl = document.documentElement;
  return htmlEl?.classList.contains('dark-mode') || document.body?.classList.contains('dark-mode');
}

function getEventPalette({ paid, confirmed, completed } = {}) {
  const dark = isDarkModeActive();
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const isCompleted = completed === true || completed === 'true';

  if (isCompleted) {
    return dark
      ? {
          background: 'rgba(148, 163, 184, 0.28)',
          border: 'rgba(148, 163, 184, 0.55)',
          text: '#f8fafc'
        }
      : {
          background: 'rgba(148, 163, 184, 0.22)',
          border: 'rgba(148, 163, 184, 0.45)',
          text: '#1f2937'
        };
  }

  if (!isConfirmed) {
    return dark
      ? {
          background: 'rgba(251, 191, 36, 0.28)',
          border: 'rgba(251, 146, 60, 0.6)',
          text: '#fff7ed'
        }
      : {
          background: 'rgba(251, 191, 36, 0.18)',
          border: 'rgba(217, 119, 6, 0.4)',
          text: '#92400e'
        };
  }

  if (!isPaid) {
    return dark
      ? {
          background: 'rgba(248, 113, 113, 0.32)',
          border: 'rgba(248, 113, 113, 0.65)',
          text: '#fee2e2'
        }
      : {
          background: 'rgba(248, 113, 113, 0.18)',
          border: 'rgba(220, 38, 38, 0.35)',
          text: '#991b1b'
        };
  }

  return dark
    ? {
        background: 'rgba(79, 70, 229, 0.25)',
        border: 'rgba(129, 140, 248, 0.65)',
        text: '#e0e7ff'
      }
    : {
        background: 'rgba(99, 102, 241, 0.16)',
        border: 'rgba(79, 70, 229, 0.42)',
        text: '#1e1b4b'
      };
}

function buildEventContent(arg) {
  const { reservationId, customerName, paid, confirmed, completed } = arg.event.extendedProps;
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const wrapper = document.createElement('div');
  wrapper.className = 'fc-reservation-event flex flex-col gap-2 text-xs leading-5 text-base-content';
  const confirmedLabel = isConfirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = isPaid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const unknownCustomer = t('calendar.labels.unknownCustomer', 'غير معروف');
  const chips = [
    `<span class="reservation-chip ${isConfirmed ? 'status-confirmed' : 'status-pending'}">${escapeHtml(confirmedLabel)}</span>`,
    `<span class="reservation-chip ${isPaid ? 'status-paid' : 'status-unpaid'}">${escapeHtml(paidLabel)}</span>`
  ];
  if (completed) {
    chips.push(`<span class="reservation-chip status-completed">${escapeHtml(completedLabel)}</span>`);
  }

  const safeReservationId = escapeHtml(reservationId || '—');
  const safeCustomer = escapeHtml(customerName || unknownCustomer);

  wrapper.innerHTML = `
    <div class="fc-reservation-id text-[0.78rem] font-semibold">${safeReservationId}</div>
    <div class="fc-reservation-customer text-[0.72rem] text-base-content/70">${safeCustomer}</div>
    <div class="fc-reservation-tags flex flex-wrap items-center gap-2 pt-1">${chips.join('')}</div>
  `;
  return { domNodes: [wrapper] };
}

function showReservationModal(reservation) {
  const container = document.getElementById('calendar-reservation-details');
  if (!container) {
    alert(t('calendar.alerts.cannotShowDetails', 'لا يمكن عرض تفاصيل الحجز'));
    return;
  }

  const dataStore = loadData();
  const projectsList = Array.isArray(dataStore?.projects) ? dataStore.projects : [];
  const projectId = reservation.projectId ?? reservation.project_id ?? null;
  const project = projectId != null
    ? projectsList.find((proj) => String(proj.id) === String(projectId)) || null
    : null;
  const { effectiveConfirmed: resolvedConfirmed, projectLinked } = resolveReservationProjectState(reservation, project);

  const confirmed = resolvedConfirmed != null
    ? resolvedConfirmed
    : (reservation.confirmed === true || reservation.confirmed === 'true');
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const completed = !!reservation.completed;
  const confirmedLabel = confirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = paid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const language = getCurrentLanguage();

  const items = reservation.items || [];
  const groupedItems = groupReservationItems(items);
  const techniciansList = syncTechniciansStatuses() || [];
  const techniciansMap = new Map(techniciansList.map((tech) => [String(tech.id), tech]));
  const assignedTechnicians = (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const equipmentDailyTotal = items.reduce(
    (sum, item) => sum + ((item.qty || 1) * (item.price || 0)),
    0
  );
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const resolveTechnicianDailyRate = (technician = {}) => {
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
  const crewDailyTotal = assignedTechnicians.reduce((sum, tech) => sum + resolveTechnicianDailyRate(tech), 0);
  const crewTotal = crewDailyTotal * rentalDays;
  const discountBase = equipmentTotal + crewTotal;

  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const currencySuffix = currencyLabel;
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');
  const totalItemsQuantity = groupedItems.reduce((sum, group) => sum + (Number(group.quantity) || 0), 0);
  const itemsHtml = groupedItems.length
    ? groupedItems.map((group) => {
        const representative = group.items[0] || {};
        const imageSource = resolveItemImage(representative) || group.image || representative.image || representative.imageUrl || '';
        const imageCell = imageSource
          ? `<img src="${imageSource}" alt="${imageAlt}" class="reservation-item-thumb">`
          : '<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';
        const quantityValue = Number(group.quantity) || Number(group.count) || 0;
        const quantityDisplay = normalizeNumbers(String(quantityValue));
        const unitPriceNumber = Number.isFinite(Number(group.unitPrice)) ? Number(group.unitPrice) : 0;
        const totalPriceNumber = Number.isFinite(Number(group.totalPrice)) ? Number(group.totalPrice) : unitPriceNumber * quantityValue;
        const unitPriceDisplay = `${normalizeNumbers(unitPriceNumber.toFixed(2))} ${currencySuffix}`;
        const totalPriceDisplay = `${normalizeNumbers(totalPriceNumber.toFixed(2))} ${currencySuffix}`;
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
            <td>
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${imageCell}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${escapeHtml(representative.desc || representative.description || representative.name || group.description || '-')}</div>
                  ${barcodesMeta}
                </div>
              </div>
            </td>
            <td>
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${quantityDisplay}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td>${unitPriceDisplay}</td>
            <td>${totalPriceDisplay}</td>
            <td>
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="5" class="text-center">${t('calendar.labels.noEquipment', 'لا توجد معدات')}</td></tr>`;

  const paymentStatusLabel = t('reservations.details.labels.paymentStatus', 'حالة الدفع');
  const itemsCountLabel = t('reservations.details.labels.itemsCount', 'عدد المعدات');
  const durationLabel = t('reservations.details.labels.duration', 'عدد الأيام');
  const itemsTotalLabel = t('reservations.details.labels.itemsTotal', 'إجمالي المعدات');
  const crewTotalLabel = t('reservations.details.labels.crewTotal', 'إجمالي الفريق');
  const discountLabelText = t('reservations.details.labels.discount', 'الخصم');
  const subtotalAfterDiscountLabel = t('reservations.details.labels.subtotalAfterDiscount', 'الإجمالي بعد الخصم');
  const taxLabel = t('reservations.details.labels.tax', 'الضريبة (15%)');
  const companyShareLabel = t('reservations.details.labels.companyShare', '🏦 نسبة الشركة');
  const netProfitLabel = t('reservations.details.labels.netProfit', '💵 صافي الربح');
  const finalTotalLabel = t('reservations.details.labels.finalTotal', 'المجموع النهائي');
  const itemsCountTemplate = t('reservations.details.items.count', '{count} عنصر');
  const paymentPaidText = t('reservations.list.payment.paid', '💳 مدفوع');
  const paymentUnpaidText = t('reservations.list.payment.unpaid', '💳 غير مدفوع');

  const rawDiscountValue = parseFloat(reservation.discount) || 0;
  const isPercentDiscount = reservation.discountType === 'percent';
  const discountAmount = rawDiscountValue <= 0
    ? 0
    : (isPercentDiscount ? discountBase * (rawDiscountValue / 100) : rawDiscountValue);
  const discountedSubtotal = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = projectLinked ? false : reservation.applyTax;
  const taxAmount = applyTaxFlag ? discountedSubtotal * 0.15 : 0;
  const storedCost = Number(reservation.cost);
  const hasStoredCost = Number.isFinite(storedCost);
  const computedTotal = discountedSubtotal + taxAmount;
  const finalTotal = projectLinked
    ? Math.round(computedTotal)
    : (hasStoredCost ? storedCost : Math.round(computedTotal));

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
  let companyShareAmount = companySharePercent > 0
    ? Math.max(0, (Number.isFinite(finalTotal) ? finalTotal : 0) * (companySharePercent / 100))
    : 0;
  if (applyTaxFlag && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
    companyShareAmount = Math.max(0, (Number.isFinite(finalTotal) ? finalTotal : 0) * (companySharePercent / 100));
  }

  const paymentStatusText = paid ? paymentPaidText : paymentUnpaidText;
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));
  const equipmentTotalDisplay = normalizeNumbers(equipmentTotal.toFixed(2));
  const crewTotalDisplay = normalizeNumbers(crewTotal.toFixed(2));
  const discountAmountDisplay = normalizeNumbers(discountAmount.toFixed(2));
  const subtotalAfterDiscountDisplay = normalizeNumbers(discountedSubtotal.toFixed(2));
  const taxAmountDisplay = normalizeNumbers(taxAmount.toFixed(2));
  const finalTotalNumber = Number.isFinite(finalTotal) ? finalTotal : 0;
  const finalTotalDisplay = normalizeNumbers(finalTotalNumber.toFixed(2));
  const companySharePercentDisplay = normalizeNumbers(companySharePercent.toFixed(2));
  const companyShareAmountDisplay = normalizeNumbers(companyShareAmount.toFixed(2));
  const netProfit = Math.max(0, finalTotalNumber - taxAmount - companyShareAmount);
  const netProfitDisplay = normalizeNumbers(netProfit.toFixed(2));
  const itemsCountDisplay = normalizeNumbers(String(totalItemsQuantity));
  const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);

  const summaryEntries = [
    { icon: '💳', label: paymentStatusLabel, value: paymentStatusText },
    { icon: '📦', label: itemsCountLabel, value: itemsCountText },
    { icon: '⏱️', label: durationLabel, value: rentalDaysDisplay },
    { icon: '💼', label: itemsTotalLabel, value: `${equipmentTotalDisplay} ${currencyLabel}` },
    { icon: '😎', label: crewTotalLabel, value: `${crewTotalDisplay} ${currencyLabel}` }
  ];

  if (discountAmount > 0) {
    summaryEntries.push({ icon: '💸', label: discountLabelText, value: `${discountAmountDisplay} ${currencyLabel}` });
  }

  summaryEntries.push({ icon: '📊', label: subtotalAfterDiscountLabel, value: `${subtotalAfterDiscountDisplay} ${currencyLabel}` });

  if (applyTaxFlag && taxAmount > 0) {
    summaryEntries.push({ icon: '🧾', label: taxLabel, value: `${taxAmountDisplay} ${currencyLabel}` });
  }

  if (companySharePercent > 0) {
    summaryEntries.push({
      icon: '🏦',
      label: companyShareLabel,
      value: `${companySharePercentDisplay}% (${companyShareAmountDisplay} ${currencyLabel})`
    });
  }

  if (Math.abs(netProfit - finalTotalNumber) > 0.009) {
    summaryEntries.push({ icon: '💵', label: netProfitLabel, value: `${netProfitDisplay} ${currencyLabel}` });
  }

  summaryEntries.push({ icon: '💰', label: finalTotalLabel, value: `${finalTotalDisplay} ${currencyLabel}` });

  const summaryRowsHtml = summaryEntries.map(({ icon, label, value }) => {
    const safeLabel = escapeHtml(label);
    const safeValue = escapeHtml(String(value));
    return `
        <div class="summary-row flex items-center justify-between gap-3 rounded-2xl bg-base-200/50 px-4 py-3 text-sm text-base-content shadow-inner">
          <span class="summary-row-label inline-flex items-center gap-2 text-base-content/70">${icon} ${safeLabel}</span>
          <span class="summary-row-value font-semibold text-base-content">${safeValue}</span>
        </div>
      `;
  }).join('');
  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? '')) || '—';
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const notesDisplayRaw = reservation.notes ? normalizeNumbers(reservation.notes) : t('calendar.labels.noNotes', 'لا توجد ملاحظات');
  const customerDisplay = reservation.customerName || t('calendar.labels.unknownCustomer', 'غير معروف');


  const detailRows = [
    { icon: '🆔', label: t('calendar.labels.reservationId', 'رقم الحجز'), value: reservationIdDisplay },
    { icon: '👤', label: t('calendar.labels.customer', 'العميل'), value: customerDisplay },
    { icon: '🗓️', label: t('calendar.labels.start', 'بداية الحجز'), value: startDisplay },
    { icon: '🗓️', label: t('calendar.labels.end', 'نهاية الحجز'), value: endDisplay },
    { icon: '📝', label: t('calendar.labels.notes', 'الملاحظات'), value: notesDisplayRaw }
  ];

  const statusChipsHtml = [
    `<span class="reservation-chip ${confirmed ? 'status-confirmed' : 'status-pending'}">${escapeHtml(confirmedLabel)}</span>`,
    `<span class="reservation-chip ${paid ? 'status-paid' : 'status-unpaid'}">${escapeHtml(paidLabel)}</span>`
  ];
  if (completed) {
    statusChipsHtml.push(`<span class="reservation-chip status-completed">${escapeHtml(completedLabel)}</span>`);
  }

  const infoRowsHtml = detailRows.map((row) => {
    const safeValue = escapeHtml(String(row.value ?? '—')).replace(/\n/g, '<br>');
    const icon = escapeHtml(row.icon);
    return `
        <div class="calendar-info-row flex items-start justify-between gap-3 border-b border-base-200/60 py-3 first:pt-0 last:border-none last:pb-0">
          <span class="label inline-flex items-center gap-2 text-base-content/70">
            <span class="text-lg leading-none" aria-hidden="true">${icon}</span>
            <span class="text-sm">${safeLabel}</span>
          </span>
          <span class="value text-end text-sm font-semibold text-base-content">${safeValue}</span>
        </div>
      `;
  }).join('');

  const techniciansHtml = assignedTechnicians.length
    ? `<ul class="calendar-reservation-technicians grid gap-3 md:grid-cols-2">${assignedTechnicians.map((tech) => {
        const name = escapeHtml(tech.name || '-');
        const roleLabel = escapeHtml(tech.role ? tech.role : t('reservations.details.technicians.roleUnknown', 'غير محدد'));
        return `<li class="calendar-technician-card flex items-center justify-between gap-3 rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-sm">
          <span class="font-semibold text-base-content">${name}</span>
          <span class="text-sm text-base-content/70">${roleLabel}</span>
        </li>`;
      }).join('')}</ul>`
    : `<div class="calendar-empty-state rounded-3xl border border-dashed border-base-300 bg-base-100/80 px-5 py-6 text-center text-sm text-base-content/70">${escapeHtml(t('calendar.emptyStates.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.'))}</div>`;

  const itemsTableHtml = `
    <div class="reservation-modal-items-wrapper overflow-x-auto rounded-3xl border border-base-200 bg-base-100 shadow-soft">
      <table class="table table-zebra table-sm align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${t('reservations.equipment.table.item', 'المعدة')}</th>
            <th>${t('reservations.equipment.table.quantity', 'الكمية')}</th>
            <th>${t('reservations.equipment.table.unitPrice', 'سعر الوحدة')}</th>
            <th>${t('reservations.equipment.table.total', 'الإجمالي')}</th>
            <th>${t('reservations.equipment.table.actions', 'الإجراءات')}</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
    </div>
  `;

  container.innerHTML = `
    <div class="calendar-reservation-layout flex flex-col gap-8 text-base-content">
      <div class="calendar-reservation-status flex flex-wrap items-center gap-3">${statusChipsHtml.join('')}</div>
      <div class="calendar-reservation-info rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-soft">
        ${infoRowsHtml}
      </div>
      <section class="calendar-reservation-section flex flex-col gap-4">
        <h6 class="calendar-section-title text-base font-semibold text-base-content">${t('calendar.sections.crew', '😎 الفريق الفني')}</h6>
        ${techniciansHtml}
      </section>
      <section class="calendar-reservation-section flex flex-col gap-4">
        <h6 class="calendar-section-title text-base font-semibold text-base-content">${t('calendar.sections.equipment', '📦 المعدات')}</h6>
        ${itemsTableHtml}
      </section>
      <div class="calendar-reservation-summary grid gap-3 rounded-3xl border border-base-200 bg-base-100/90 p-6 shadow-soft">
        ${summaryRowsHtml}
      </div>
    </div>
  `;
  const modalEl = document.getElementById('calendarReservationModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  } else {
    alert(t('calendar.alerts.cannotOpenModal', 'لا يمكن فتح نافذة التفاصيل'));
  }
}

export function renderCalendar() {
  ensureCalendarListeners();
  ensureResponsiveListener();
  ensureThemeListener();

  const { calendarEl } = getCalendarElements();
  if (!calendarEl) return;

  const FullCalendarLib = getFullCalendarGlobal();
  if (!FullCalendarLib || typeof FullCalendarLib.Calendar !== 'function') {
    const fallbackMessage = t('calendar.status.missingLibrary', 'تعذر تحميل مكتبة التقويم. يرجى تحديث الصفحة.');
    setCalendarStatus({ error: fallbackMessage });
    destroyCalendarInstance();
    return;
  }

  (async () => {
    setCalendarStatus({ loading: true });

    const reservations = await loadCalendarData();

    if (calendarErrorMessage) {
      const fallback = t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
      setCalendarStatus({ loading: false, error: calendarErrorMessage || fallback });
      destroyCalendarInstance();
      return;
    }

    const events = buildCalendarEvents(reservations);

    if (!calendarInstance) {
      calendarInstance = new FullCalendarLib.Calendar(calendarEl, {
        initialView: getResponsiveCalendarView(),
        locale: getCurrentLanguage(),
        timeZone: 'local',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        buttonText: getCalendarButtonText(),
        events,
        eventContent: buildEventContent,
        eventClick(info) {
          showReservationModal(info.event.extendedProps);
        },
        windowResize: applyResponsiveCalendarView,
      });
      calendarInstance.render();
    } else {
      calendarInstance.setOption('locale', getCurrentLanguage());
      calendarInstance.setOption('buttonText', getCalendarButtonText());
      updateCalendarEvents(events);
    }

    applyResponsiveCalendarView();
    dispatchCalendarUpdated(events);
    setCalendarStatus({ loading: false, error: '', empty: events.length === 0 });
    setTimeout(() => {
      applyResponsiveCalendarView();
    }, 120);
  })().catch((error) => {
    console.error('❌ [calendar] renderCalendar failed', error);
    calendarErrorMessage = (error instanceof Error && error.message) || calendarErrorMessage || '';
    const fallback = t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
    setCalendarStatus({ loading: false, error: calendarErrorMessage || fallback });
    destroyCalendarInstance();
  });
}
