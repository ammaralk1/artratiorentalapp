import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { normalizeNumbers, formatDateTime, showToast } from '../utils.js';
import { calculateReservationDays } from '../reservationsSummary.js';
import { resolveReservationProjectState } from '../reservationsShared.js';
import quotePdfStyles from '../../styles/quotePdf.css?raw';

const QUOTE_SEQUENCE_STORAGE_KEY = 'reservations.quote.sequence';

const QUOTE_COMPANY_INFO = {
  logoUrl: 'https://art-ratio.sirv.com/AR%20Logo%20v3.5%20curved.png',
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  commercialRegistry: '4030485240',
  beneficiaryName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  bankName: 'مصرف الراجحي',
  accountNumber: '٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦',
  iban: 'SA1680000358608016065706',
  approvalNote: 'الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام.'
};

const QUOTE_TERMS = [
  'يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.',
  'يمنع استخدام المعدات في أنشطة غير قانونية.',
  'يتحمل المستأجر مسؤولية أي تلف أو فقدان.',
  'يجب إعادة المعدات في حالتها الأصلية.',
  'يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة.'
];

const QUOTE_SECTION_DEFS = [
  { id: 'customerInfo', labelKey: 'reservations.quote.sections.customer', fallback: 'بيانات العميل', defaultSelected: true },
  { id: 'reservationInfo', labelKey: 'reservations.quote.sections.reservation', fallback: 'تفاصيل الحجز', defaultSelected: true },
  { id: 'projectInfo', labelKey: 'reservations.quote.sections.project', fallback: 'بيانات المشروع', defaultSelected: true },
  { id: 'financialSummary', labelKey: 'reservations.quote.sections.financial', fallback: 'الملخص المالي', defaultSelected: true },
  { id: 'items', labelKey: 'reservations.quote.sections.items', fallback: 'قائمة المعدات', defaultSelected: true },
  { id: 'crew', labelKey: 'reservations.quote.sections.crew', fallback: 'طاقم العمل', defaultSelected: true },
  { id: 'notes', labelKey: 'reservations.quote.sections.notes', fallback: 'ملاحظات الحجز', defaultSelected: true }
];

const HTML2PDF_SRC = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';

const QUOTE_PDF_STYLES = quotePdfStyles.trim();

let quoteModalRefs = null;
let activeQuoteState = null;

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

function formatQuoteNumber(sequence) {
  const seq = Number(sequence);
  if (!Number.isFinite(seq) || seq <= 0) return 'Q-0001';
  return `Q-${String(seq).padStart(4, '0')}`;
}

function readQuoteSequence() {
  const stored = window.localStorage?.getItem?.(QUOTE_SEQUENCE_STORAGE_KEY);
  const parsed = parseInt(stored ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function peekNextQuoteSequence() {
  const last = readQuoteSequence();
  const sequence = last + 1;
  return {
    sequence,
    quoteNumber: formatQuoteNumber(sequence)
  };
}

function commitQuoteSequence(sequence) {
  try {
    const value = Number(sequence);
    if (!Number.isFinite(value) || value <= 0) return;
    window.localStorage?.setItem?.(QUOTE_SEQUENCE_STORAGE_KEY, String(value));
  } catch (error) {
    console.warn('⚠️ [reservations/pdf] failed to persist quote sequence', error);
  }
}

function formatQuoteDate(date = new Date()) {
  try {
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return date.toISOString().slice(0, 10);
  }
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

function collectReservationFinancials(reservation, technicians, project) {
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
    equipmentTotal,
    crewTotal,
    discountAmount,
    taxAmount,
    finalTotal: finalTotal ?? 0
  };

  const totalsDisplay = {
    equipmentTotal: normalizeNumbers(equipmentTotal.toFixed(2)),
    crewTotal: normalizeNumbers(crewTotal.toFixed(2)),
    discountAmount: normalizeNumbers(discountAmount.toFixed(2)),
    taxAmount: normalizeNumbers(taxAmount.toFixed(2)),
    finalTotal: normalizeNumbers((finalTotal ?? 0).toFixed(2))
  };

  return {
    totals,
    totalsDisplay,
    rentalDays
  };
}

function buildQuotationHtml({
  reservation,
  customer,
  project,
  technicians,
  totalsDisplay,
  rentalDays,
  currencyLabel,
  sections,
  quoteNumber,
  quoteDate
}) {
  const reservationId = normalizeNumbers(String(reservation?.reservationId ?? reservation?.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const customerName = customer?.customerName || customer?.full_name || customer?.name || '-';
  const customerPhone = customer?.phone || '-';
  const customerEmail = customer?.email || '-';
  const customerCompany = customer?.company || customer?.company_name || '-';
  const customerPhoneDisplay = normalizeNumbers(customerPhone);
  const projectTitle = project?.title || project?.name || t('reservations.details.project.none', 'غير مرتبط بمشروع');
  const projectCode = project?.code || project?.projectCode || '';
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));
  const notes = reservation?.notes || '';

  const techniciansHtml = technicians.length
    ? technicians.map((tech, index) => {
        const idx = normalizeNumbers(String(index + 1));
        const name = escapeHtml(tech?.name || tech?.full_name || '-');
        const role = escapeHtml(tech?.role || t('reservations.details.technicians.roleUnknown', 'غير محدد'));
        const phone = escapeHtml(tech?.phone || t('reservations.details.technicians.phoneUnknown', 'غير متوفر'));
        return `<tr>
          <td>${idx}</td>
          <td>${name}</td>
          <td>${role}</td>
          <td>${phone}</td>
        </tr>`;
      }).join('')
    : `<tr><td colspan="4" class="empty">${escapeHtml(t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.'))}</td></tr>`;

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

  const includeSection = (id) => sections?.has?.(id);

  const renderPlainItem = (label, value) => {
    return `<div class="info-plain__item">${escapeHtml(label)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${escapeHtml(value)}</strong></div>`;
  };

  const customerSection = includeSection('customerInfo')
    ? `<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.customer', 'بيانات العميل'))}</h3>
        <div class="info-plain info-plain--right">
          ${renderPlainItem(t('reservations.details.labels.customer', 'العميل'), customerName)}
          ${renderPlainItem(t('reservations.details.labels.company', 'الشركة'), customerCompany)}
          ${renderPlainItem(t('reservations.details.labels.phone', 'الهاتف'), customerPhoneDisplay)}
          ${renderPlainItem(t('reservations.details.labels.email', 'البريد'), customerEmail)}
        </div>
      </section>`
    : '';

  const reservationSection = includeSection('reservationInfo')
    ? `<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.reservation', 'تفاصيل الحجز'))}</h3>
        <div class="info-plain info-plain--right">
          ${renderPlainItem(t('reservations.details.labels.reservationId', 'رقم الحجز'), reservationId || '-')}
          ${renderPlainItem(t('reservations.details.labels.start', 'بداية الحجز'), startDisplay)}
          ${renderPlainItem(t('reservations.details.labels.end', 'نهاية الحجز'), endDisplay)}
          ${renderPlainItem(t('reservations.details.labels.duration', 'عدد الأيام'), rentalDaysDisplay)}
        </div>
      </section>`
    : '';

  const projectSection = includeSection('projectInfo')
    ? `<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.project', 'بيانات المشروع'))}</h3>
        <div class="info-plain">
          ${renderPlainItem(t('reservations.details.labels.project', 'المشروع'), projectTitle)}
          ${projectCode ? renderPlainItem(t('reservations.details.labels.code', 'الرمز'), projectCode) : ''}
        </div>
      </section>`
    : '';

  const financialSection = includeSection('financialSummary')
    ? `<section class="quote-section quote-section--financial">
        <div class="totals-block">
          <h3>${escapeHtml(t('reservations.details.labels.summary', 'الملخص المالي'))}</h3>
          <div class="totals-list">
            <div class="totals-item"><span>${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span><span>${totalsDisplay.equipmentTotal} ${currencyLabel}</span></div>
            <div class="totals-item"><span>${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span><span>${totalsDisplay.crewTotal} ${currencyLabel}</span></div>
            <div class="totals-item"><span>${escapeHtml(t('reservations.details.labels.discount', 'الخصم'))}</span><span>${totalsDisplay.discountAmount} ${currencyLabel}</span></div>
            <div class="totals-item"><span>${escapeHtml(t('reservations.details.labels.tax', 'الضريبة'))}</span><span>${totalsDisplay.taxAmount} ${currencyLabel}</span></div>
            <div class="totals-item is-final"><span>${escapeHtml(t('reservations.details.labels.total', 'الإجمالي النهائي'))}</span><span>${totalsDisplay.finalTotal} ${currencyLabel}</span></div>
          </div>
        </div>
      </section>`
    : '';

  const itemsSection = includeSection('items')
    ? `<section class="quote-section quote-section--table">
        <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${escapeHtml(t('reservations.details.table.headers.code', 'الكود'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.description', 'الوصف'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.quantity', 'الكمية'))}</th>
              <th>${escapeHtml(t('reservations.details.table.headers.price', 'السعر'))}</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>
      </section>`
    : '';

  const crewSection = includeSection('crew')
    ? `<section class="quote-section quote-section--table">
        <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
        <table class="quote-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${escapeHtml(t('reservations.details.technicians.name', 'الاسم'))}</th>
              <th>${escapeHtml(t('reservations.details.technicians.role', 'الدور'))}</th>
              <th>${escapeHtml(t('reservations.details.technicians.phone', 'الهاتف'))}</th>
            </tr>
          </thead>
          <tbody>${techniciansHtml}</tbody>
        </table>
      </section>`
    : '';

  const notesSection = includeSection('notes')
    ? `<section class="quote-section">
        <h3>${escapeHtml(t('reservations.details.labels.notes', 'ملاحظات الحجز'))}</h3>
        <div class="quote-notes">${notes ? escapeHtml(notes) : escapeHtml(t('reservations.quote.emptyNotes', 'لا توجد ملاحظات إضافية.'))}</div>
      </section>`
    : '';

  const paymentDetails = `<section class="quote-section">
      <div class="payment-block">
        <h3>${escapeHtml(t('reservations.quote.sections.payment', 'بيانات الدفع'))}</h3>
        <div class="info-plain info-plain--dense info-plain--right">
          ${renderPlainItem(t('reservations.quote.labels.beneficiary', 'اسم المستفيد'), QUOTE_COMPANY_INFO.beneficiaryName)}
          ${renderPlainItem(t('reservations.quote.labels.bank', 'اسم البنك'), QUOTE_COMPANY_INFO.bankName)}
          ${renderPlainItem(t('reservations.quote.labels.account', 'رقم الحساب'), normalizeNumbers(QUOTE_COMPANY_INFO.accountNumber))}
          ${renderPlainItem(t('reservations.quote.labels.iban', 'رقم الآيبان'), normalizeNumbers(QUOTE_COMPANY_INFO.iban))}
        </div>
      </div>
      <p class="quote-approval-note">${escapeHtml(QUOTE_COMPANY_INFO.approvalNote)}</p>
    </section>`;

  const termsSection = `<footer class="quote-footer">
        <h4>${escapeHtml(t('reservations.quote.labels.terms', 'الشروط العامة'))}</h4>
        <ul>${QUOTE_TERMS.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
      </footer>`;

  const ensureContent = (content, fallbackKey) => content && content.trim().length
    ? content
    : `<section class="quote-section quote-placeholder">${escapeHtml(t(fallbackKey, 'لا توجد بيانات للعرض.'))}</section>`;

  let infoPair = '';
  let customerSectionFinal = customerSection;
  let reservationSectionFinal = reservationSection;
  if (customerSection && reservationSection) {
    infoPair = `<div class="quote-section-row">${reservationSection}${customerSection}</div>`;
    customerSectionFinal = '';
    reservationSectionFinal = '';
  }

  const pageOneContent = ensureContent([
    infoPair || customerSectionFinal,
    reservationSectionFinal,
    projectSection,
    itemsSection,
    crewSection
  ].filter(Boolean).join(''), 'reservations.quote.placeholder.page1');

  const pageTwoContent = ensureContent([
    notesSection,
    financialSection
  ].filter(Boolean).join(''), 'reservations.quote.placeholder.page2');

  const pageThreeContent = [paymentDetails, termsSection].join('');

  const headerHtml = `
    <header class="quote-header">
      <div class="quote-header__logo">
        <img class="quote-logo" src="${escapeHtml(QUOTE_COMPANY_INFO.logoUrl)}" alt="${escapeHtml(QUOTE_COMPANY_INFO.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(t('reservations.quote.title', 'عرض السعر'))}</h1>
        <p class="quote-company-name">${escapeHtml(QUOTE_COMPANY_INFO.companyName)}</p>
        <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>
    </header>`;

  return `
    <div id="quotation-pdf-root" dir="rtl">
      <style>${QUOTE_PDF_STYLES}</style>

      <div class="quote-preview-pages">
        <div class="quote-page quote-page--primary">
          ${headerHtml}
          <main class="quote-body">
            ${pageOneContent}
          </main>
        </div>

        <div class="quote-page">
          <main class="quote-body">
            ${pageTwoContent}
          </main>
        </div>

        <div class="quote-page">
          <main class="quote-body">
            ${pageThreeContent}
          </main>
        </div>
      </div>
    </div>
  `;
}


function renderQuotePreview() {
  if (!activeQuoteState || !quoteModalRefs) return;
  const { previewFrame } = quoteModalRefs;
  if (!previewFrame) return;

  const html = buildQuotationHtml({
    reservation: activeQuoteState.reservation,
    customer: activeQuoteState.customer,
    project: activeQuoteState.project,
    technicians: activeQuoteState.technicians,
    totalsDisplay: activeQuoteState.totalsDisplay,
    rentalDays: activeQuoteState.rentalDays,
    currencyLabel: activeQuoteState.currencyLabel,
    sections: activeQuoteState.sections,
    quoteNumber: activeQuoteState.quoteNumber,
    quoteDate: activeQuoteState.quoteDateLabel
  });

  previewFrame.srcdoc = `<!DOCTYPE html>${html}`;
}

function handleToggleChange(event) {
  if (!activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  if (!sectionId) return;
  if (checkbox.checked) {
    activeQuoteState.sections.add(sectionId);
  } else {
    activeQuoteState.sections.delete(sectionId);
  }
  renderQuotePreview();
}

function renderQuoteToggles() {
  if (!quoteModalRefs?.toggles || !activeQuoteState) return;
  const { toggles } = quoteModalRefs;
  const items = QUOTE_SECTION_DEFS.map(({ id, labelKey, fallback }) => {
    const label = t(labelKey, fallback);
    const checked = activeQuoteState.sections.has(id) ? 'checked' : '';
    return `
      <label class="quote-toggle">
        <input type="checkbox" class="form-check-input" data-section-id="${id}" ${checked}>
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }).join('');

  toggles.innerHTML = items;
  toggles.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', handleToggleChange);
  });
}

function ensureQuoteModal() {
  if (quoteModalRefs?.modal) return quoteModalRefs;

  const modal = document.createElement('div');
  modal.id = 'reservationQuoteModal';
  modal.className = 'modal fade quote-preview-modal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'reservationQuoteModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${escapeHtml(t('reservations.quote.previewTitle', 'معاينة عرض السعر'))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${escapeHtml(t('reservations.quote.toggleHeading', 'حدد المعلومات المراد تصديرها'))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${escapeHtml(t('reservations.quote.actions.close', 'إغلاق'))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${escapeHtml(t('reservations.quote.actions.export', '📄 تنزيل PDF'))}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const toggles = modal.querySelector('[data-quote-toggles]');
  const preview = modal.querySelector('[data-quote-preview]');
  const meta = modal.querySelector('[data-quote-meta]');
  const downloadBtn = modal.querySelector('[data-quote-download]');

  const previewFrame = document.createElement('iframe');
  previewFrame.className = 'quote-preview-frame';
  previewFrame.setAttribute('title', t('reservations.quote.previewTitle', 'معاينة عرض السعر'));
  previewFrame.setAttribute('loading', 'lazy');
  previewFrame.setAttribute('frameborder', '0');
  preview.innerHTML = '';
  preview.appendChild(previewFrame);

  downloadBtn?.addEventListener('click', async () => {
    if (!activeQuoteState) return;
    downloadBtn.disabled = true;
    try {
      await exportQuoteAsPdf();
    } finally {
      downloadBtn.disabled = false;
    }
  });

  quoteModalRefs = {
    modal,
    toggles,
    preview,
    previewFrame,
    meta,
    downloadBtn
  };

  return quoteModalRefs;
}

function updateQuoteMeta() {
  if (!quoteModalRefs?.meta || !activeQuoteState) return;
  const { meta } = quoteModalRefs;
  meta.innerHTML = `
    <div class="quote-meta-card">
      <div><span>${escapeHtml(t('reservations.quote.labels.number', 'رقم عرض السعر'))}</span><strong>${escapeHtml(activeQuoteState.quoteNumber)}</strong></div>
      <div><span>${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</span><strong>${escapeHtml(activeQuoteState.quoteDateLabel)}</strong></div>
    </div>
  `;
}

async function exportQuoteAsPdf() {
  if (!activeQuoteState) return;
  await ensureHtml2Pdf();

  const html = buildQuotationHtml({
    reservation: activeQuoteState.reservation,
    customer: activeQuoteState.customer,
    project: activeQuoteState.project,
    technicians: activeQuoteState.technicians,
    totalsDisplay: activeQuoteState.totalsDisplay,
    rentalDays: activeQuoteState.rentalDays,
    currencyLabel: activeQuoteState.currencyLabel,
    sections: activeQuoteState.sections,
    quoteNumber: activeQuoteState.quoteNumber,
    quoteDate: activeQuoteState.quoteDateLabel
  });

  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '0';
  container.style.zIndex = '-1';
  document.body.appendChild(container);

  const pdfRoot = container.firstElementChild;
  if (pdfRoot) {
    pdfRoot.setAttribute('dir', 'rtl');
    pdfRoot.style.direction = 'rtl';
    pdfRoot.style.textAlign = 'right';
    pdfRoot.setAttribute('data-theme', 'light');
    pdfRoot.classList.remove('dark', 'dark-mode');
    pdfRoot.style.margin = '0';
    pdfRoot.style.padding = '0';
    pdfRoot.style.width = '210mm';
    pdfRoot.style.maxWidth = '210mm';
    pdfRoot.style.marginLeft = 'auto';
    pdfRoot.style.marginRight = 'auto';
    pdfRoot.scrollTop = 0;
    pdfRoot.scrollLeft = 0;
  }

  try {
    const filename = `quotation-${activeQuoteState.quoteNumber}.pdf`;
    await window.html2pdf()
      .set({
        margin: 0,
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        filename,
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(container.firstElementChild)
      .save();
    if (!activeQuoteState.sequenceCommitted) {
      commitQuoteSequence(activeQuoteState.quoteSequence);
      activeQuoteState.sequenceCommitted = true;
    }
  } finally {
    document.body.removeChild(container);
  }
}

function openQuoteModal() {
  const refs = ensureQuoteModal();
  if (!refs?.modal) return;

  renderQuoteToggles();
  updateQuoteMeta();
  renderQuotePreview();

  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(refs.modal).show();
  }
}

export async function exportReservationPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  const technicians = collectAssignedTechnicians(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, technicians, project);
  const currencyLabel = t('reservations.create.summary.currency', 'ريال');
  const { sequence, quoteNumber } = peekNextQuoteSequence();
  const now = new Date();

  activeQuoteState = {
    reservation,
    customer,
    project,
    technicians,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    sections: new Set(QUOTE_SECTION_DEFS.filter((section) => section.defaultSelected).map((section) => section.id)),
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };

  openQuoteModal();
}
