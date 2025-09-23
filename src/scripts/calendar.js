import { loadData } from './storage.js';
import { formatDateTime, normalizeNumbers } from './utils.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t, getCurrentLanguage } from './language.js';

let calendarInstance = null;
let calendarLanguageListenerAttached = false;

function getEventPalette(reservation) {
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
  const completed = reservation.completed;

  if (completed) {
    return {
      background: '#6c757d',
      border: '#565e64',
      text: '#fff'
    };
  }

  if (!paid) {
    return {
      background: '#dc3545',
      border: '#b02a37',
      text: '#fff'
    };
  }

  if (!confirmed) {
    return {
      background: '#ffc107',
      border: '#cc9a06',
      text: '#212529'
    };
  }

  return {
    background: '#198754',
    border: '#146c43',
    text: '#fff'
  };
}

function buildEventContent(arg) {
  const { reservationId, customerName, paid, confirmed, completed } = arg.event.extendedProps;
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const wrapper = document.createElement('div');
  wrapper.className = 'fc-reservation-event';
  const confirmedLabel = isConfirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = isPaid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const unknownCustomer = t('calendar.labels.unknownCustomer', 'غير معروف');
  wrapper.innerHTML = `
    <div class="fc-reservation-id">${reservationId}</div>
    <div class="fc-reservation-customer">${customerName || unknownCustomer}</div>
    <div class="fc-reservation-tags">
      <span class="badge ${isConfirmed ? 'bg-success' : 'bg-warning text-dark'}">${confirmedLabel}</span>
      <span class="badge ${isPaid ? 'bg-primary' : 'bg-danger'}">${paidLabel}</span>
      ${completed ? `<span class="badge bg-secondary">${completedLabel}</span>` : ''}
    </div>
  `;
  return { domNodes: [wrapper] };
}

function showReservationModal(reservation) {
  const container = document.getElementById('calendar-reservation-details');
  if (!container) {
    alert(t('calendar.alerts.cannotShowDetails', 'لا يمكن عرض تفاصيل الحجز'));
    return;
  }

  const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
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
  const techniciansList = syncTechniciansStatuses() || [];
  const techniciansMap = new Map(techniciansList.map((tech) => [String(tech.id), tech]));
  const assignedTechnicians = (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
  const baseCost = items.reduce((sum, item) => sum + ((item.qty || 1) * (item.price || 0)), 0);
  const discountAmount = (() => {
    const discountValue = parseFloat(reservation.discount) || 0;
    if (!discountValue) return 0;
    if (reservation.discountType === 'amount') return discountValue;
    return baseCost * (discountValue / 100);
  })();
  const taxableAmount = Math.max(0, baseCost - discountAmount);
  const taxAmount = reservation.applyTax ? taxableAmount * 0.15 : 0;
  const finalTotal = reservation.cost ?? Math.round(taxableAmount + taxAmount);

  const currencySuffix = t('calendar.labels.currencySuffix', 'ريال');
  const itemsHtml = items.length
    ? items.map((item, index) => {
        const image = item.image || item.imageUrl || item.img || '';
        const barcode = normalizeNumbers(String(item.barcode || '-'));
        const qty = normalizeNumbers(String(item.qty || 1));
        const price = normalizeNumbers(String(item.price || 0));
        const imageCell = image
          ? `<img src="${image}" alt="${item.desc || ''}" class="reservation-modal-item-thumb">`
          : '-';
        return `
          <tr>
            <td>${normalizeNumbers(String(index + 1))}</td>
            <td>${barcode}</td>
            <td>${item.desc || '-'}</td>
            <td>${qty}</td>
            <td>${price} ${currencySuffix}</td>
            <td>${imageCell}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="6" class="text-center">${t('calendar.labels.noEquipment', 'لا توجد معدات')}</td></tr>`;

  const summaryRows = [
    `<div>${t('calendar.summary.baseCost', '💵 إجمالي المعدات: <strong>{value} ريال</strong>').replace('{value}', baseCost.toFixed(2))}</div>`
  ];

  if (discountAmount > 0) {
    const percentSymbol = language === 'en' ? '%' : '٪';
    const discountLabel = reservation.discountType === 'percent'
      ? `${parseFloat(reservation.discount || 0).toFixed(2)}${percentSymbol}`
      : `${discountAmount.toFixed(2)} ${currencySuffix}`;
    summaryRows.push(`<div>${t('calendar.summary.discount', '💸 الخصم: <strong>{value}</strong>').replace('{value}', discountLabel)}</div>`);
  }

  if (reservation.applyTax && taxAmount > 0) {
    summaryRows.push(`<div>${t('calendar.summary.tax', '🧾 الضريبة (15%): <strong>{value} ريال</strong>').replace('{value}', taxAmount.toFixed(2))}</div>`);
  }

  summaryRows.push(`<div>${t('calendar.summary.total', '💰 المجموع النهائي: <strong>{value} ريال</strong>').replace('{value}', finalTotal.toFixed(2))}</div>`);

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : t('calendar.labels.noNotes', 'لا توجد ملاحظات');
  const customerDisplay = reservation.customerName || t('calendar.labels.unknownCustomer', 'غير معروف');

  const detailRows = [
    { icon: '🆔', label: t('calendar.labels.reservationId', 'رقم الحجز'), value: reservationIdDisplay },
    { icon: '👤', label: t('calendar.labels.customer', 'العميل'), value: customerDisplay },
    { icon: '🗓️', label: t('calendar.labels.start', 'بداية الحجز'), value: startDisplay },
    { icon: '🗓️', label: t('calendar.labels.end', 'نهاية الحجز'), value: endDisplay },
    { icon: '📝', label: t('calendar.labels.notes', 'الملاحظات'), value: notesDisplay }
  ];

  container.innerHTML = `
    <div class="calendar-reservation-status mb-3">
      <span class="badge ${confirmed ? 'bg-success' : 'bg-warning text-dark'}">${confirmedLabel}</span>
      <span class="badge ${paid ? 'bg-primary' : 'bg-danger'}">${paidLabel}</span>
      ${completed ? `<span class="badge bg-secondary">${completedLabel}</span>` : ''}
    </div>
    <div class="calendar-reservation-info">
      ${detailRows.map(row => `
        <div class="calendar-info-row">
          <span class="label">${row.icon} ${row.label}</span>
          <span class="value">${row.value}</span>
        </div>
      `).join('')}
    </div>
    <h6 class="calendar-section-title">${t('calendar.sections.crew', '😎 الفريق الفني')}</h6>
    ${assignedTechnicians.length
      ? `<ul class="list-unstyled calendar-reservation-technicians">${assignedTechnicians.map((tech) => {
            const roleText = tech.role ? ` — ${tech.role}` : '';
            return `<li><strong>${tech.name}</strong>${roleText}</li>`;
          }).join('')}</ul>`
      : `<p class="calendar-empty-state">${t('calendar.emptyStates.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.')}</p>`}
    <h6 class="calendar-section-title">${t('calendar.sections.equipment', '📦 المعدات')}</h6>
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${t('calendar.table.headers.barcode', 'الباركود')}</th>
            <th>${t('calendar.table.headers.description', 'الوصف')}</th>
            <th>${t('calendar.table.headers.quantity', 'الكمية')}</th>
            <th>${t('calendar.table.headers.price', 'السعر')}</th>
            <th>${t('calendar.table.headers.image', 'الصورة')}</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
    </div>
    <div class="calendar-reservation-summary">
      ${summaryRows.join('')}
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
  console.log("✅ renderCalendar تعمل");
  const calendarEl = document.getElementById("calendar");
  if (!calendarEl) return; // حماية لو ما في عنصر تقويم

  if (calendarInstance) {
    calendarInstance.destroy();
    calendarInstance = null;
  }

  // 📂 تحميل البيانات
  const { reservations = [], customers = [] } = loadData();

  // 📝 تجهيز الأحداث (الحجوزات)
  const events = reservations.map(r => {
    const customer = customers.find(c => String(c.id) === String(r.customerId));
    const completed = r.end ? new Date(r.end) < new Date() : false;
    const palette = getEventPalette({ ...r, completed });

    return {
      id: r.id,
      title: '',
      start: r.start,
      end: r.end,
      backgroundColor: palette.background,
      borderColor: palette.border,
      textColor: palette.text,
      display: 'auto',
      extendedProps: {
        ...r,
        customerName: customer?.customerName || t('calendar.labels.unknownCustomer', 'غير معروف'),
        completed
      }
    };
  });

  // 📅 إنشاء التقويم
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: getCurrentLanguage(),
    timeZone: "local",  // التوقيت المحلي
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    buttonText: {
      today: t('calendar.buttons.today', 'اليوم'),
      month: t('calendar.buttons.month', 'شهر'),
      week: t('calendar.buttons.week', 'أسبوع'),
      day: t('calendar.buttons.day', 'يوم')
    },
    events,
    eventContent: buildEventContent,
    eventClick: function(info) {
      showReservationModal(info.event.extendedProps);
    }
  });

  calendar.render();
  calendarInstance = calendar;

  if (!calendarLanguageListenerAttached) {
    document.addEventListener('language:changed', () => {
      renderCalendar();
    });
    calendarLanguageListenerAttached = true;
  }
}
