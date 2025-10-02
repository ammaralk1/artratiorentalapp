import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast } from '../utils.js';
import { calculateReservationDays } from '../reservationsSummary.js';
import { resolveReservationProjectState } from '../reservationsShared.js';

const HTML2PDF_SRC = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (error) => reject(error));
      if (existing.readyState === 'complete') {
        resolve();
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
}

async function ensureHtml2Pdf() {
  if (window.html2pdf) return;
  await loadExternalScript(HTML2PDF_SRC);
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveTechnicianDailyRate(technician = {}) {
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
}

function collectAssignedTechnicians(reservation) {
  const syncedTechnicians = syncTechniciansStatuses() || [];
  const { technicians: storedTechnicians = [] } = loadData();
  const technicianSource = []
    .concat(Array.isArray(syncedTechnicians) ? syncedTechnicians : [])
    .concat(Array.isArray(storedTechnicians) ? storedTechnicians : []);

  const techniciansMap = new Map();
  technicianSource.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });

  return (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
}

function buildPdfMarkup({
  reservation,
  customer,
  project,
  technicians,
  totals,
  rentalDays,
  currencyLabel
}) {
  const reservationId = normalizeNumbers(String(reservation?.reservationId ?? reservation?.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const createdDisplay = reservation.createdAt ? normalizeNumbers(formatDateTime(reservation.createdAt)) : '-';
  const customerName = customer?.full_name || customer?.name || '-';
  const customerPhone = customer?.phone || '-';
  const customerEmail = customer?.email || '-';
  const customerCompany = customer?.company || customer?.company_name || '-';
  const projectTitle = project?.title || project?.name || t('reservations.details.project.none', 'غير مرتبط بمشروع');
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));
  const notes = reservation?.notes || '';

  const technicianListHtml = technicians.length
    ? technicians.map((tech) => {
        const name = escapeHtml(tech?.name || tech?.full_name || '-');
        const role = escapeHtml(tech?.role || t('reservations.details.technicians.roleUnknown', 'غير محدد'));
        const phone = escapeHtml(tech?.phone || t('reservations.details.technicians.phoneUnknown', 'غير متوفر'));
        return `<li><strong>${name}</strong><br><span>${role}</span><br><span>${phone}</span></li>`;
      }).join('')
    : `<li>${escapeHtml(t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.'))}</li>`;

  const itemsRows = Array.isArray(reservation.items) && reservation.items.length
    ? reservation.items.map((item, index) => {
        const rowNumber = normalizeNumbers(String(index + 1));
        const code = escapeHtml(item?.barcode || '-');
        const description = escapeHtml(item?.desc || item?.description || '-');
        const quantity = normalizeNumbers(String(item?.qty || 1));
        const price = normalizeNumbers((Number(item?.price || 0)).toFixed(2));
        return `<tr>
          <td>${rowNumber}</td>
          <td>${code}</td>
          <td>${description}</td>
          <td>${quantity}</td>
          <td>${price}</td>
        </tr>`;
      }).join('')
    : `<tr>
        <td colspan="5" class="empty">${escapeHtml(t('reservations.details.noItems', '📦 لا توجد معدات ضمن هذا الحجز حالياً.'))}</td>
      </tr>`;

  return `
    <div id="reservation-pdf-root" dir="rtl">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
        #reservation-pdf-root {
          width: 210mm;
          min-height: 297mm;
          box-sizing: border-box;
          padding: 14mm 16mm;
          font-family: 'Tajawal', sans-serif;
          color: #111827;
          background: #ffffff;
        }
        #reservation-pdf-root h1,
        #reservation-pdf-root h2,
        #reservation-pdf-root h3,
        #reservation-pdf-root h4,
        #reservation-pdf-root h5,
        #reservation-pdf-root h6 {
          margin: 0;
        }
        .pdf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .pdf-header h1 {
          font-size: 22px;
          font-weight: 700;
        }
        .pdf-meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 16px;
          margin-bottom: 18px;
        }
        .pdf-section {
          margin-bottom: 18px;
        }
        .pdf-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .pdf-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .pdf-section ul li {
          margin-bottom: 6px;
          line-height: 1.5;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        table th {
          background: #f3f4f6;
          padding: 8px;
          text-align: center;
        }
        table td {
          padding: 8px;
          border-bottom: 1px solid #e5e7eb;
          text-align: center;
        }
        table td:nth-child(3),
        table td:nth-child(4),
        table td:nth-child(5) {
          font-weight: 600;
        }
        table .empty {
          text-align: center;
          padding: 16px;
          font-weight: 500;
        }
        .totals-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 16px;
          margin: 12px 0;
          font-size: 13px;
        }
        .totals-grid div {
          display: flex;
          justify-content: space-between;
          background: #f9fafb;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .totals-grid div span:first-child {
          font-weight: 600;
        }
        .notes {
          background: #f9fafb;
          border-radius: 8px;
          padding: 12px;
          min-height: 60px;
          white-space: pre-wrap;
          font-size: 12px;
        }
      </style>

      <div class="pdf-header">
        <h1>${escapeHtml(t('reservations.details.export.title', 'تفاصيل الحجز'))}</h1>
        <div>
          <div>${escapeHtml(t('reservations.details.labels.reservationId', 'رقم الحجز'))}: <strong>${reservationId || '-'}</strong></div>
          <div>${escapeHtml(t('reservations.details.labels.createdAt', 'تاريخ الإنشاء'))}: ${createdDisplay}</div>
        </div>
      </div>

      <div class="pdf-meta">
        <div>${escapeHtml(t('reservations.details.labels.customer', 'العميل'))}: <strong>${escapeHtml(customerName)}</strong></div>
        <div>${escapeHtml(t('reservations.details.labels.company', 'الشركة'))}: ${escapeHtml(customerCompany)}</div>
        <div>${escapeHtml(t('reservations.details.labels.phone', 'الهاتف'))}: ${escapeHtml(customerPhone)}</div>
        <div>${escapeHtml(t('reservations.details.labels.email', 'البريد'))}: ${escapeHtml(customerEmail)}</div>
        <div>${escapeHtml(t('reservations.details.labels.start', 'تاريخ البداية'))}: ${startDisplay}</div>
        <div>${escapeHtml(t('reservations.details.labels.end', 'تاريخ النهاية'))}: ${endDisplay}</div>
        <div>${escapeHtml(t('reservations.details.labels.duration', 'عدد الأيام'))}: ${rentalDaysDisplay}</div>
        <div>${escapeHtml(t('reservations.details.labels.project', 'المشروع'))}: ${escapeHtml(projectTitle)}</div>
      </div>

      <div class="pdf-section">
        <h3>${escapeHtml(t('reservations.details.labels.summary', 'الملخص المالي'))}</h3>
        <div class="totals-grid">
          <div><span>${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span><span>${totals.equipmentTotal} ${currencyLabel}</span></div>
          <div><span>${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span><span>${totals.crewTotal} ${currencyLabel}</span></div>
          <div><span>${escapeHtml(t('reservations.details.labels.discount', 'الخصم'))}</span><span>${totals.discountAmount} ${currencyLabel}</span></div>
          <div><span>${escapeHtml(t('reservations.details.labels.tax', 'الضريبة (15%)'))}</span><span>${totals.taxAmount} ${currencyLabel}</span></div>
          <div><span>${escapeHtml(t('reservations.details.labels.total', 'الإجمالي النهائي'))}</span><span><strong>${totals.finalTotal} ${currencyLabel}</strong></span></div>
        </div>
      </div>

      <div class="pdf-section">
        <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
        <ul>${technicianListHtml}</ul>
      </div>

      <div class="pdf-section">
        <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>${escapeHtml(t('reservations.details.table.headers.code', 'الكود'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.description', 'الوصف'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.quantity', 'الكمية'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.price', 'السعر'))}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>

      <div class="pdf-section">
        <h3>${escapeHtml(t('reservations.details.labels.notes', 'ملاحظات الحجز'))}</h3>
        <div class="notes">${escapeHtml(notes)}</div>
      </div>
    </div>
  `;
}

export async function exportReservationPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  await ensureHtml2Pdf();

  const technicians = collectAssignedTechnicians(reservation);
  const { projectLinked } = resolveReservationProjectState(reservation, project);

  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const equipmentDailyTotal = items.reduce((sum, item) => sum + ((Number(item?.qty) || 1) * (Number(item?.price) || 0)), 0);
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const crewDailyTotal = technicians.reduce((sum, tech) => sum + resolveTechnicianDailyRate(tech), 0);
  const crewTotal = crewDailyTotal * rentalDays;
  const discountBase = equipmentTotal + crewTotal;
  const discountValue = parseFloat(reservation.discount) || 0;
  const discountAmount = reservation.discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);
  const taxableAmount = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = projectLinked ? false : reservation.applyTax;
  const taxAmount = applyTaxFlag ? taxableAmount * 0.15 : 0;
  const storedCost = Number(reservation.cost);
  const hasStoredCost = Number.isFinite(storedCost);
  const computedTotal = taxableAmount + taxAmount;
  const finalTotal = projectLinked ? Math.round(computedTotal) : (hasStoredCost ? storedCost : Math.round(computedTotal));

  const totals = {
    equipmentTotal: normalizeNumbers(equipmentTotal.toFixed(2)),
    crewTotal: normalizeNumbers(crewTotal.toFixed(2)),
    discountAmount: normalizeNumbers(discountAmount.toFixed(2)),
    taxAmount: normalizeNumbers(taxAmount.toFixed(2)),
    finalTotal: normalizeNumbers((finalTotal ?? 0).toFixed(2))
  };

  const currencyLabel = t('reservations.create.summary.currency', 'ريال');

  const pdfMarkup = buildPdfMarkup({
    reservation,
    customer,
    project,
    technicians,
    totals,
    rentalDays,
    currencyLabel
  });

  const container = document.createElement('div');
  container.innerHTML = pdfMarkup;
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '0';
  container.style.zIndex = '-1';
  document.body.appendChild(container);

  try {
    const reservationId = normalizeNumbers(String(reservation?.reservationId ?? reservation?.id ?? 'export'));
    const filename = `reservation-${reservationId || 'export'}.pdf`;

    await window.html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(container.firstElementChild)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}
