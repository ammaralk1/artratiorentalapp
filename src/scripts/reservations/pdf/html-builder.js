import { state } from './state.js';
import {
  DEFAULT_TERMS,
  QUOTE_COMPANY_INFO,
  QUOTE_PDF_STYLES,
  PDF_FONT_FACE,
} from './constants.js';
import {
  QUOTE_ITEMS_COLUMN_DEFS,
  QUOTE_CREW_COLUMN_DEFS,
  PROJECT_EXPENSES_COLUMN_DEFS,
  cloneFieldSelections,
  isFieldEnabledInSelections,
} from './config.js';
import {
  formatMoney,
  formatCurrencyValue,
  applyCompanyShareToUnitAmount,
} from './financial.js';
import {
  escapeHtml,
  withBlockAttributes,
  ensureBlocks,
  normalizePackageNameForMatch,
} from './utils.js';
import {
  buildRootLayoutAttributes,
  getBlockDragContext,
  buildInfoPlainClass,
} from './layout.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { t, getCurrentLanguage } from '../../language.js';
import { getTechnicianPositionsCache } from '../../technicianPositions.js';
import { buildReservationDisplayGroups, sanitizePriceValue } from '../../reservationsShared.js';
import { findPackageById, getPackagesSnapshot } from '../../reservationsPackages.js';
import { resolveQuoteLogoUrl } from './constants.js';

function buildProjectQuotationHtml({
  project,
  clientInfo = {},
  projectInfo = {},
  projectCrew = [],
  projectExpenses = [],
  projectEquipment = [],
  totalsDisplay = {},
  projectTotals = {},
  paymentSummary = {},
  currencyLabel = 'SR',
  sections,
  fieldSelections = {},
  quoteNumber,
  quoteDate,
  terms = DEFAULT_TERMS,
  rootAttributes = ''
}) {
  // Project quotes never use checklist mode; keep explicit boolean to avoid NameError
  const isChecklist = false;
  const fieldsSelection = cloneFieldSelections(fieldSelections);
  const isFieldEnabled = (sectionId, fieldId) => isFieldEnabledInSelections(fieldsSelection, sectionId, fieldId);
  const includeSection = (id) => sections?.has?.(id);
  const noFieldsMessage = `<div class="quote-placeholder">${escapeHtml(t('reservations.quote.placeholder.noFields', 'لم يتم اختيار أي معلومات للعرض في هذا القسم.'))}</div>`;

  const renderPlainItem = (label, value) => (
    `<div class="info-plain__item">
      <span class="info-plain__label">${escapeHtml(label)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${escapeHtml(value)}</span>
    </div>`
  );

  const renderTotalsItem = (label, value, { variant = 'inline' } = {}) => {
    if (variant === 'final') {
      return `<div class="totals-item totals-item--final">
        <span class="totals-item__label">${escapeHtml(label)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${escapeHtml(value)}</span>
      </div>`;
    }

    return `<span class="totals-inline__item">
      <span class="totals-inline__label">${escapeHtml(label)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${escapeHtml(value)}</span>
    </span>`;
  };

  const renderPaymentRow = (label, value) => (
    `<div class="payment-row">
      <span class="payment-row__label">${escapeHtml(label)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${escapeHtml(value)}</span>
    </div>`
  );

  const wrapSectionWithDragHandles = (key, titleHtml, bodyHtml) => {
    const titleKey = `${key}-title`;
    const bodyKey = `${key}-content`;
    return `
      <div class="quote-section__head" data-drag-key="${escapeHtml(titleKey)}">
        ${titleHtml}
      </div>
      <div class="quote-section__body" data-drag-key="${escapeHtml(bodyKey)}">
        ${bodyHtml}
      </div>
    `;
  };

  const customerFieldItems = [];
  if (isFieldEnabled('customerInfo', 'customerName')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.client', 'العميل'), clientInfo.name || '-'));
  }
  if (isFieldEnabled('customerInfo', 'customerCompany')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.company', 'شركة العميل'), clientInfo.company || '—'));
  }
  if (isFieldEnabled('customerInfo', 'customerPhone')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.labels.clientPhone', 'رقم العميل'), clientInfo.phone || '-'));
  }
  if (isFieldEnabled('customerInfo', 'customerEmail')) {
    customerFieldItems.push(renderPlainItem(t('projects.details.labels.clientEmail', 'البريد الإلكتروني'), clientInfo.email || '-'));
  }

const projectCustomerInfoClass = buildInfoPlainClass(state.activeQuoteState, 'projectCustomer');

  const customerSectionMarkup = includeSection('customerInfo')
    ? `<section class="quote-section quote-section--plain quote-section--customer">
        ${wrapSectionWithDragHandles(
          'customer',
          `<h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.customer', 'بيانات العميل'))}</h3>`,
          customerFieldItems.length ? `<div class="${projectCustomerInfoClass}">${customerFieldItems.join('')}</div>` : noFieldsMessage
        )}
      </section>`
    : '';

  const projectFieldItems = [];
  if (isFieldEnabled('projectInfo', 'projectType')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.type', 'نوع المشروع'), projectInfo.typeLabel || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectTitle')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.projectTitle', 'اسم المشروع'), projectInfo.title || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectCode')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.labels.code', 'رقم المشروع'), projectInfo.code || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectStart')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.start', 'بداية المشروع'), projectInfo.startDisplay || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectEnd')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.end', 'نهاية المشروع'), projectInfo.endDisplay || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectDuration')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.duration', 'مدة المشروع'), projectInfo.durationLabel || '-'));
  }
  if (isFieldEnabled('projectInfo', 'projectStatus')) {
    projectFieldItems.push(renderPlainItem(t('projects.details.status', 'حالة المشروع'), projectInfo.statusLabel || '-'));
  }

const projectDetailsInfoClass = buildInfoPlainClass(state.activeQuoteState, 'projectDetails');

  const projectSectionMarkup = includeSection('projectInfo')
    ? `<section class="quote-section quote-section--plain quote-section--project">
        ${wrapSectionWithDragHandles(
          'project',
          `<h3 class="quote-section__title">${escapeHtml(t('projects.quote.sections.project', 'بيانات المشروع'))}</h3>`,
          projectFieldItems.length ? `<div class="${projectDetailsInfoClass}">${projectFieldItems.join('')}</div>` : noFieldsMessage
        )}
      </section>`
    : '';

  // Use reservation-style crew columns (positions + client price) for projects
  const projectCrewColumnsBase = QUOTE_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('projectCrew', column.id));
  const crewAssignments = Array.isArray(state.activeQuoteState?.crewAssignments) ? state.activeQuoteState.crewAssignments : [];
  const groupProjectCrew = true; // always group by position for projects
  const projectCrewKeyOf = (a) => {
    const baseKey = (a && a.positionId != null)
      ? `id:${String(a.positionId)}`
      : (() => {
          const raw = (a?.positionLabel || a?.position_name || a?.position || '').trim().toLowerCase();
          return raw ? `label:${raw}` : '';
        })();
    const price = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
    const priceKey = price > 0 ? `|p:${price.toFixed(2)}` : '';
    return `${baseKey}${priceKey}`;
  };
  const projectCrewCounts = (() => {
    const map = new Map();
    crewAssignments.forEach((a) => {
      const key = projectCrewKeyOf(a);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  })();
  const projectCrewColumns = (() => {
    const cols = [];
    projectCrewColumnsBase.forEach((col) => {
      if (col.id === 'position') {
        cols.push({
          ...col,
          render: (assignment) => {
            const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
            let labelEn = assignment?.positionLabelEn
              ?? assignment?.position_label_en
              ?? assignment?.position_name_en
              ?? assignment?.positionLabelAlt
              ?? assignment?.position_label_alt
              ?? assignment?.role;
            if (!labelEn && langNow === 'en') {
              try {
                const positions = (typeof getTechnicianPositionsCache === 'function') ? getTechnicianPositionsCache() : [];
                let resolved = null;
                if (assignment?.positionId != null) {
                  resolved = positions.find((p) => String(p.id) === String(assignment.positionId)) || null;
                }
                if (!resolved) {
                  const key = assignment?.positionKey
                    ?? assignment?.position_key
                    ?? assignment?.positionName
                    ?? assignment?.position_name
                    ?? assignment?.position
                    ?? '';
                  if (key) {
                    const lk = String(key).toLowerCase();
                    resolved = positions.find((p) => String(p.name).toLowerCase() === lk) || null;
                  }
                }
                if (resolved) {
                  labelEn = resolved.labelEn ?? resolved.label_en ?? resolved.name_en ?? labelEn;
                }
              } catch (_) { /* non-fatal */ }
            }
            const labelAr = assignment?.positionLabel
              ?? assignment?.position_name
              ?? assignment?.role
              ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
            const baseLabel = (langNow === 'en' && labelEn) ? labelEn : labelAr;
            if (groupProjectCrew) {
              return escapeHtml(normalizeNumbers(String(baseLabel)));
            }
            const key = projectCrewKeyOf(assignment);
            const count = key ? (projectCrewCounts.get(key) || 0) : 0;
            const suffix = count > 1 ? ` × ${normalizeNumbers(String(count))}` : '';
            return escapeHtml(normalizeNumbers(String(baseLabel)) + suffix);
          }
        });
        // Quantity column (toggleable)
        if (isFieldEnabled('projectCrew','quantity')) {
          cols.push({
            id: 'quantity',
            labelKey: 'reservations.details.table.headers.quantity',
            fallback: 'الكمية',
            render: (assignment) => escapeHtml(normalizeNumbers(String(Math.max(1, Number(assignment?.__count || 1)))))
          });
        }
      } else if (col.id === 'price') {
        if (groupProjectCrew) {
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const qty = Math.max(1, Number(assignment?.__count || 1));
              const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
              const sharedUnit = applyCompanyShareToUnitAmount(unit);
              const total = sharedUnit * qty * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        } else {
          // Non-grouped price per assignment for all days
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
              const sharedUnit = applyCompanyShareToUnitAmount(unit);
              const total = sharedUnit * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        }
      } else if (col.id === 'unitPrice') {
        // Per-day unit price
        cols.push({
          ...col,
          render: (assignment) => {
            const unit = Number.isFinite(Number(assignment?.positionClientPrice))
              ? Number(assignment.positionClientPrice)
              : 0;
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            return escapeHtml(`${formatMoney(sharedUnit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    // Days column (toggleable)
    if (isFieldEnabled('projectCrew','days')) {
      const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder to: rowNumber, position, unitPrice, quantity, days, price, then others
    const map = new Map(cols.map((c) => [c.id, c]));
    const seen = new Set();
    const out = [];
    const pushIf = (id) => { const c = map.get(id); if (c && !seen.has(id)) { out.push(c); seen.add(id);} };
    pushIf('rowNumber');
    pushIf('position');
    pushIf('unitPrice');
    pushIf('quantity');
    pushIf('days');
    pushIf('price');
    cols.forEach((c) => { if (!seen.has(c.id)) { out.push(c); seen.add(c.id);} });
    return out;
  })();
  const projectCrewSource = groupProjectCrew
    ? (() => {
        const map = new Map();
        crewAssignments.forEach((a) => {
          const key = projectCrewKeyOf(a);
          if (!key) return;
          const existing = map.get(key);
          if (existing) {
            existing.__count += 1;
          } else {
            map.set(key, { ...a, __count: 1 });
          }
        });
        return Array.from(map.values());
      })()
    : crewAssignments;
  const projectCrewSubtotalDisplay = (() => {
    try {
      const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const sum = (projectCrewSource || []).reduce((acc, a) => {
        const unit = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
        const qty = Math.max(1, Number(a?.__count || 1));
        const sharedUnit = applyCompanyShareToUnitAmount(unit);
        return acc + (sharedUnit * qty * days);
      }, 0);
      return formatMoney(sum);
    } catch (_) { return '0.00'; }
  })();
  const crewSectionMarkup = includeSection('projectCrew')
    ? (projectCrewColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${projectCrewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectCrewSource.length
                ? projectCrewSource.map((assignment, index) => `<tr>${projectCrewColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(assignment, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(projectCrewColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.crew.empty', 'لا يوجد طاقم فني مرتبط.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectCrew','crewSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${projectCrewSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.crew', 'طاقم العمل'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const financialInlineItems = [];
  // ترتيب جديد: الخصم → الإجمالي قبل الضريبة → الضريبة
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(renderTotalsItem(t('reservations.details.labels.discount', 'قيمة الخصم'), totalsDisplay.discountAmount || formatCurrencyValue(0, currencyLabel)));
  }
  const preTaxLabel = t('projects.details.summary.preTaxTotal', 'الإجمالي قبل الضريبة');
  if (isFieldEnabled('financialSummary', 'reservationsTotal')) {
    financialInlineItems.push(renderTotalsItem(preTaxLabel, totalsDisplay.reservationsTotal || formatCurrencyValue(0, currencyLabel)));
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(renderTotalsItem(t('projects.details.summary.combinedTax', 'قيمة الضريبة'), totalsDisplay.taxAmount || formatCurrencyValue(0, currencyLabel)));
  }

  const financialFinalItems = [];
  if (isFieldEnabled('financialSummary', 'overallTotal')) {
    financialFinalItems.push(renderTotalsItem(t('projects.details.summary.overallTotal', 'الإجمالي الكلي'), totalsDisplay.overallTotal || formatCurrencyValue(0, currencyLabel), { variant: 'final' }));
  }
  // removed: paidAmount and remainingAmount from rendering per request

  const financialSectionMarkup = includeSection('financialSummary')
    ? (() => {
        if (!financialInlineItems.length && !financialFinalItems.length) {
          return `<section class="quote-section quote-section--financial">${noFieldsMessage}</section>`;
        }
        return `<section class="quote-section quote-section--financial">
          ${wrapSectionWithDragHandles(
            'projectFinancial',
            `<h3>${escapeHtml(t('projects.quote.sections.financial', 'الملخص المالي'))}</h3>`,
            `<div class="totals-block">
              ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
              ${financialFinalItems.length ? `<div class="totals-final">${financialFinalItems.join('')}</div>` : ''}
            </div>`
          )}
        </section>`;
      })()
    : '';

  const expensesColumnsBase = PROJECT_EXPENSES_COLUMN_DEFS.filter((column) => isFieldEnabled('projectExpenses', column.id));
  const expensesColumns = (() => {
    const cols = [...expensesColumnsBase];
    cols.forEach((column) => {
      if (column.id === 'amount') {
        column.render = (expense) => {
          const saleValue = expense?.salePrice ?? expense?.sale_price;
          const amountValue = saleValue != null ? saleValue : expense?.amount;
          const numeric = Number(amountValue);
          const sharedValue = applyCompanyShareToUnitAmount(Number.isFinite(numeric) ? numeric : 0);
          return escapeHtml(formatCurrencyValue(sharedValue, currencyLabel));
        };
      }
    });
    return cols;
  })();
  const expensesSubtotalDisplay = (() => {
    try {
      const sum = projectExpenses.reduce((acc, expense) => {
        const saleValue = expense?.salePrice ?? expense?.sale_price;
        const amountValue = saleValue != null ? saleValue : expense?.amount;
        const numeric = Number(amountValue);
        const sharedValue = applyCompanyShareToUnitAmount(Number.isFinite(numeric) ? numeric : 0);
        return acc + sharedValue;
      }, 0);
      return formatMoney(sum);
    } catch (_) {
      return formatMoney(0);
    }
  })();
  const expensesSectionMarkup = includeSection('projectExpenses')
    ? (expensesColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'الخدمات الإنتاجية'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${expensesColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${projectExpenses.length
                ? projectExpenses.map((expense, index) => `<tr>${expensesColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(expense, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(expensesColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.expenses.empty', 'لا توجد متطلبات مسجلة.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectExpenses','expensesSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('projects.details.expensesTotal', 'إجمالي الخدمات الإنتاجية'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${expensesSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.expenses', 'الخدمات الإنتاجية'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  // Use reservation-style items table for project equipment (code/desc/qty/price with package codes)
  const itemColumnsBaseProject = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('projectEquipment', column.id));
  const itemColumns = (() => {
    let cols = [];
    itemColumnsBaseProject.forEach((col) => {
      if (col.id === 'price') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const qty = Number.isFinite(Number(item?.qty)) ? Math.max(1, Number(item.qty)) : 1;
            const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            const total = sharedUnit * qty * days;
            return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else if (col.id === 'unitPrice') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            return escapeHtml(`${formatMoney(sharedUnit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    if (isFieldEnabled('projectEquipment','days')) {
      const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder tail: unitPrice -> quantity -> days -> price
    const map = new Map(cols.map((c) => [c.id, c]));
    const keep = cols.filter((c) => !['unitPrice','quantity','days','price'].includes(c.id));
    const tail = ['unitPrice','quantity','days','price'].map((id) => map.get(id)).filter(Boolean);
    cols = [...keep, ...tail];
    return cols;
  })();
  const equipmentItems = Array.isArray(state.activeQuoteState?.equipmentItems) ? state.activeQuoteState.equipmentItems : [];
  const equipmentSubtotalDisplay = (() => {
    try {
      const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const sum = (equipmentItems || []).reduce((acc, it) => {
        const unit = Number.isFinite(Number(it?.unitPriceValue)) ? Number(it.unitPriceValue) : 0;
        const qty = Number.isFinite(Number(it?.qty)) ? Math.max(1, Number(it.qty)) : 1;
        const sharedUnit = applyCompanyShareToUnitAmount(unit);
        return acc + (sharedUnit * qty * days);
      }, 0);
      return formatMoney(sum);
    } catch (_) { return '0.00'; }
  })();
  const equipmentSectionMarkup = includeSection('projectEquipment')
    ? (itemColumns.length
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.equipment', 'المعدات'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')}</tr>
              </thead>
              <tbody>${equipmentItems.length
                ? equipmentItems.map((item, index) => `<tr>${itemColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(item, index)}</div></td>`).join('')}</tr>`).join('')
                : `<tr><td colspan="${Math.max(itemColumns.length, 1)}" class="empty">${escapeHtml(t('projects.details.equipment.empty', 'لا توجد معدات مرتبطة حالياً.'))}</td></tr>`}
              </tbody>
            </table>
            ${isFieldEnabled('projectEquipment','equipmentSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${equipmentSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('projects.quote.sections.equipment', 'المعدات'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const notesValue = (project?.description || '').trim() || '';
  const notesSectionMarkup = includeSection('projectNotes')
    ? `<section class="quote-section">
        <h3>${escapeHtml(t('projects.quote.sections.notes', 'ملاحظات المشروع'))}</h3>
        <div class="quote-notes">${notesValue ? escapeHtml(notesValue) : escapeHtml(t('projects.fallback.noDescription', 'لا يوجد وصف للمشروع.'))}</div>
      </section>`
    : '';

  const paymentRows = [];
  if (isFieldEnabled('payment', 'beneficiary')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.beneficiary', 'اسم المستفيد'), QUOTE_COMPANY_INFO.beneficiaryName));
  }
  if (isFieldEnabled('payment', 'bank')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.bank', 'اسم البنك'), QUOTE_COMPANY_INFO.bankName));
  }
  if (isFieldEnabled('payment', 'account')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.account', 'رقم الحساب'), normalizeNumbers(QUOTE_COMPANY_INFO.accountNumber)));
  }
  if (isFieldEnabled('payment', 'iban')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.iban', 'رقم الآيبان'), normalizeNumbers(QUOTE_COMPANY_INFO.iban)));
  }

  const paymentSectionMarkup = `<section class="quote-section">
      <div class="payment-block">
        <h3>${escapeHtml(t('reservations.quote.sections.payment', 'بيانات الدفع'))}</h3>
        <div class="payment-rows">${paymentRows.length ? paymentRows.join('') : noFieldsMessage}</div>
      </div>
      <p class="quote-approval-note">${escapeHtml(QUOTE_COMPANY_INFO.approvalNote)}</p>
    </section>`;

  const termsList = Array.isArray(terms) && terms.length ? terms : DEFAULT_TERMS;

  const termsSectionMarkup = `<footer class="quote-footer">
        <h4>${escapeHtml(t('reservations.quote.labels.terms', 'الشروط العامة'))}</h4>
        <ul>${termsList.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
      </footer>`;

  const primaryBlocks = [];
  const primarySections = [];
  if (projectSectionMarkup) {
    primarySections.push({ key: 'project', html: projectSectionMarkup });
  }
  if (customerSectionMarkup) {
    primarySections.push({ key: 'customer', html: customerSectionMarkup });
  }

  if (primarySections.length > 1) {
    const projectEntry = primarySections.find((entry) => entry.key === 'project');
    const customerEntry = primarySections.find((entry) => entry.key === 'customer');
    const ordered = [];
    // In RTL context with row-reverse, the first child appears on the far left.
    // Place Project first (left) and Customer second (right).
    if (projectEntry?.html) ordered.push(projectEntry.html);
    if (customerEntry?.html) ordered.push(customerEntry.html);

    primaryBlocks.push(withBlockAttributes(
      `<div class="quote-section-row quote-section-row--primary">${ordered.join('')}</div>`,
      { blockType: 'group' }
    ));
  } else if (primarySections.length === 1) {
    primaryBlocks.push(withBlockAttributes(primarySections[0].html));
  }

  const tableBlocks = [];
  if (crewSectionMarkup) {
    tableBlocks.push(withBlockAttributes(crewSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-crew"' }));
  }
  if (expensesSectionMarkup) {
    tableBlocks.push(withBlockAttributes(expensesSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-expenses"' }));
  }
  if (equipmentSectionMarkup) {
    tableBlocks.push(withBlockAttributes(equipmentSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="project-equipment"' }));
  }

  const summaryBlocks = [];
  if (financialSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(financialSectionMarkup, { blockType: 'summary' }));
  }
  if (notesSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(notesSectionMarkup));
  }

  let footerBlocks = [];
  if (!isChecklist) {
    footerBlocks = [
      ...(includeSection('payment') ? [withBlockAttributes(paymentSectionMarkup, { blockType: 'payment' })] : []),
      withBlockAttributes(termsSectionMarkup, { blockType: 'footer' })
    ];
  } else {
    // Checklist: terms replaced by optional free-text notes from sidebar input
    const userNotes = String(options?.checklistNotes || '').trim();
    if (userNotes.length > 0) {
      const checklistNotesSection = `<section class="quote-section">
        <h3>ملاحظات</h3>
        <div class="quote-notes">${escapeHtml(userNotes)}</div>
      </section>`;
      footerBlocks = [withBlockAttributes(checklistNotesSection)];
    }
  }

  const orderedBlocks = [
    ...ensureBlocks(primaryBlocks, 'projects.quote.placeholder.primary'),
    ...tableBlocks,
    ...ensureBlocks(summaryBlocks, 'projects.quote.placeholder.summary'),
    ...footerBlocks
  ];

  const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';

  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${escapeHtml(resolveQuoteLogoUrl(QUOTE_COMPANY_INFO.logoUrl))}" alt="${escapeHtml(QUOTE_COMPANY_INFO.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(t('projects.quote.title', 'عرض سعر'))}</h1>
        <p class="quote-company-name">${escapeHtml(t('quote.companyName', QUOTE_COMPANY_INFO.companyName))}</p>
        <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
        <p class="quote-company-license">${escapeHtml(t('reservations.quote.labels.mediaLicense', 'ترخيص إعلامي'))}: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('projects.details.labels.code', 'رقم المشروع'))}</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('projects.quote.labels.date', 'التاريخ'))}</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>
    </header>
  `.trim();

  return `
    <div id="quotation-pdf-root" dir="rtl" data-lang="${escapeHtml(lang)}"${rootAttributes}>
      <style>${PDF_FONT_FACE}${QUOTE_PDF_STYLES}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${headerTemplateHtml}
          ${orderedBlocks.join('')}
        </div>
      </div>
    </div>
  `;
}

export function buildQuotationHtml(options = {}) {
  const layoutState = {
    context: options?.context || getBlockDragContext(),
    blockOffsets: options?.blockOffsets || state.activeQuoteState?.blockOffsets || null,
    infoAlignments: options?.infoAlignments || state.activeQuoteState?.infoAlignments || null,
  };
  const rootAttributes = buildRootLayoutAttributes(layoutState);
  const previousLayoutState = state.renderLayoutStateOverride;
  state.renderLayoutStateOverride = layoutState;

  try {
    if (options?.context === 'project') {
      return buildProjectQuotationHtml({ ...options, rootAttributes });
    }

    const {
      reservation,
      customer,
      project,
      crewAssignments,
      totals,
      totalsDisplay,
      rentalDays,
      currencyLabel,
      sections,
      fieldSelections = {},
      quoteNumber,
      quoteDate,
      terms = DEFAULT_TERMS
    } = options;
  const reservationId = normalizeNumbers(String(reservation?.reservationId ?? reservation?.id ?? ''));
  const langCurrent = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
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
  const termsList = Array.isArray(terms) && terms.length ? terms : DEFAULT_TERMS;

  const fieldsSelection = cloneFieldSelections(fieldSelections);
  const isFieldEnabled = (sectionId, fieldId) => isFieldEnabledInSelections(fieldsSelection, sectionId, fieldId);
  const includeSection = (id) => sections?.has?.(id);
  const noFieldsMessage = `<div class="quote-placeholder">${escapeHtml(t('reservations.quote.placeholder.noFields', 'لم يتم اختيار أي معلومات للعرض في هذا القسم.'))}</div>`;

  const renderPlainItem = (label, value) => {
    const sep = langCurrent === 'en' ? ': ' : ' / ';
    return `<div class="info-plain__item">${escapeHtml(label)}<span class="info-plain__slash">${sep}</span><strong class="info-plain__value">${escapeHtml(value)}</strong></div>`;
  };

  const renderTotalsItem = (label, value, { variant = 'inline' } = {}) => {
    if (variant === 'final') {
      return `<div class="totals-item totals-item--final">
        <span class="totals-item__label">${escapeHtml(label)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${escapeHtml(value)}</span>
      </div>`;
    }

    return `<span class="totals-inline__item">
      <span class="totals-inline__label">${escapeHtml(label)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${escapeHtml(value)}</span>
    </span>`;
  };

  const renderPaymentRow = (label, value) => {
    return `<div class="payment-row">
      <span class="payment-row__label">${escapeHtml(label)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${escapeHtml(value)}</span>
    </div>`;
  };

  const wrapSectionWithDragHandles = (key, titleHtml, bodyHtml) => {
    const titleKey = `${key}-title`;
    const bodyKey = `${key}-content`;
    return `
      <div class="quote-section__head" data-drag-key="${escapeHtml(titleKey)}">
        ${titleHtml}
      </div>
      <div class="quote-section__body" data-drag-key="${escapeHtml(bodyKey)}">
        ${bodyHtml}
      </div>
    `;
  };

  const customerFieldItems = [];
  if (isFieldEnabled('customerInfo', 'customerName')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.customer', 'العميل'), customerName));
  }
  if (isFieldEnabled('customerInfo', 'customerCompany')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.company', 'الشركة'), customerCompany));
  }
  if (isFieldEnabled('customerInfo', 'customerPhone')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.phone', 'الهاتف'), customerPhoneDisplay));
  }
  if (isFieldEnabled('customerInfo', 'customerEmail')) {
    customerFieldItems.push(renderPlainItem(t('reservations.details.labels.email', 'البريد'), customerEmail));
  }

  const customerInfoClass = buildInfoPlainClass(state.activeQuoteState, 'customer');

  const customerSectionMarkup = includeSection('customerInfo')
    ? (customerFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--customer">
            ${wrapSectionWithDragHandles(
              'customer',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.customer', 'بيانات العميل'))}</h3>`,
              `<div class="${customerInfoClass}">${customerFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
    : '';

  const reservationFieldItems = [];
  if (isFieldEnabled('reservationInfo', 'reservationId')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.reservationId', 'رقم الحجز'), reservationId || '-'));
  }
  if (isFieldEnabled('reservationInfo', 'reservationStart')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.start', 'بداية الحجز'), startDisplay));
  }
  if (isFieldEnabled('reservationInfo', 'reservationEnd')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.end', 'نهاية الحجز'), endDisplay));
  }
  if (isFieldEnabled('reservationInfo', 'reservationDuration')) {
    reservationFieldItems.push(renderPlainItem(t('reservations.details.labels.duration', 'عدد الأيام'), rentalDaysDisplay));
  }

  const reservationInfoClass = buildInfoPlainClass(state.activeQuoteState, 'reservation');

  const reservationSectionMarkup = includeSection('reservationInfo')
    ? (reservationFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--reservation">
            ${wrapSectionWithDragHandles(
              'reservation',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.reservation', 'تفاصيل الحجز'))}</h3>`,
              `<div class="${reservationInfoClass}">${reservationFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
    : '';

  const projectFieldItems = [];
  if (isFieldEnabled('projectInfo', 'projectTitle')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.project', 'المشروع'), projectTitle));
  }
  if (isFieldEnabled('projectInfo', 'projectCode')) {
    projectFieldItems.push(renderPlainItem(t('reservations.details.labels.code', 'الرمز'), projectCode || '-'));
  }

  const projectInfoClass = buildInfoPlainClass(state.activeQuoteState, 'project');

  const projectSectionMarkup = includeSection('projectInfo')
    ? (projectFieldItems.length
        ? `<section class="quote-section quote-section--plain quote-section--project">
            ${wrapSectionWithDragHandles(
              'project',
              `<h3 class="quote-section__title">${escapeHtml(t('reservations.quote.sections.project', 'بيانات المشروع'))}</h3>`,
              `<div class="${projectInfoClass}">${projectFieldItems.join('')}</div>`
            )}
          </section>`
        : '')
    : '';

  const financialInlineItems = [];
  // الترتيب المطلوب: الخصم → الإجمالي قبل الضريبة → الضريبة (حسب التoggles)
  if (isFieldEnabled('financialSummary', 'discountAmount')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.discount', 'قيمة الخصم'),
        `${totalsDisplay.discountAmount} ${currencyLabel}`
      )
    );
  }
  if (isFieldEnabled('financialSummary', 'subtotalBeforeTax')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.subtotalBeforeTax', 'الإجمالي قبل الضريبة'),
        `${totalsDisplay.taxableAmount} ${currencyLabel}`
      )
    );
  }
  if (isFieldEnabled('financialSummary', 'taxAmount')) {
    financialInlineItems.push(
      renderTotalsItem(
        t('reservations.details.labels.tax', 'قيمة الضريبة'),
        `${totalsDisplay.taxAmount} ${currencyLabel}`
      )
    );
  }
  const showFinalTotal = isFieldEnabled('financialSummary', 'finalTotal');
  const financialFinalItems = [];
  if (showFinalTotal) {
    financialFinalItems.push(renderTotalsItem(t('reservations.details.labels.total', 'الإجمالي النهائي'), `${totalsDisplay.finalTotal} ${currencyLabel}`, { variant: 'final' }));
  }
  const financialFinalHtml = financialFinalItems.length
    ? `<div class="totals-final">${financialFinalItems.join('')}</div>`
    : '';

  const financialSectionMarkup = includeSection('financialSummary')
    ? (() => {
        if (!financialInlineItems.length && !showFinalTotal) {
          return `<section class="quote-section quote-section--financial">${noFieldsMessage}</section>`;
        }
        return `<section class="quote-section quote-section--financial">
          ${wrapSectionWithDragHandles(
            'financial',
            `<h3 class="quote-section__title">${escapeHtml(t('reservations.details.labels.summary', 'الملخص المالي'))}</h3>`,
            `<div class="totals-block">
              ${financialInlineItems.length ? `<div class="totals-inline">${financialInlineItems.join('')}</div>` : ''}
              ${financialFinalHtml}
            </div>`
          )}
        </section>`;
      })()
    : '';

  const { groups: reservationDisplayGroups } = buildReservationDisplayGroups(reservation);
  const quoteItems = reservationDisplayGroups.map((group) => {
    const count = Number(group?.count ?? group?.quantity ?? 1) || 1;
    const rawUnitPrice = Number(group?.unitPrice);
    let unitPrice = Number.isFinite(rawUnitPrice) ? rawUnitPrice : 0;
    if (!unitPrice || unitPrice <= 0) {
      const totalCandidate = Number(group?.totalPrice);
      if (Number.isFinite(totalCandidate) && count > 0) {
        unitPrice = Number((totalCandidate / count).toFixed(2));
      }
    }
    if (!Number.isFinite(unitPrice)) {
      unitPrice = 0;
    }

    const isPackage = group?.type === 'package'
      || (Array.isArray(group?.items) && group.items.some((item) => item?.type === 'package'));

    const fallbackBarcode = Array.isArray(group?.barcodes) && group.barcodes.length
      ? group.barcodes[0]
      : (Array.isArray(group?.items) && group.items.length ? group.items[0]?.barcode : null);

    // Resolve the real package code (fallback to definition by id/name when missing or weak)
    let packageCode = group?.packageDisplayCode
      ?? group?.package_code
      ?? group?.code
      ?? group?.packageCode
      ?? (Array.isArray(group?.items) && group.items.length
        ? (group.items[0]?.package_code
          ?? group.items[0]?.code
          ?? group.items[0]?.packageCode)
        : null);

    const isWeakCode = (value) => {
      const s = (value == null ? '' : String(value)).trim();
      if (!s) return true;
      if (/^pkg-/i.test(s)) return true;
      if (/^\d+$/.test(s) && s.length <= 4) return true; // ids like 3,4
      return false;
    };

    if (!packageCode || isWeakCode(packageCode)) {
      const pkgId = group?.packageId
        ?? group?.package_id
        ?? (Array.isArray(group?.items) && group.items.length ? (group.items[0]?.packageId ?? group.items[0]?.package_id) : null);
      if (pkgId) {
        try {
          const def = findPackageById(pkgId);
          if (def && def.package_code) {
            packageCode = def.package_code;
          }
        } catch (_) {
          // ignore lookup errors
        }
      }
    }

    if (!packageCode || isWeakCode(packageCode)) {
      // Final fallback: match by package name from packages snapshot (normalize names to be tolerant)
      try {
        const targetName = normalizePackageNameForMatch(group?.description || '');
        if (targetName) {
          const list = getPackagesSnapshot();
          // Exact normalized match first
          let match = list.find((p) => normalizePackageNameForMatch(p?.name || p?.title || p?.label || '') === targetName);
          // If not found, try contains-either-way to cope with small differences
          if (!match) {
            match = list.find((p) => {
              const n = normalizePackageNameForMatch(p?.name || p?.title || p?.label || '');
              return n.includes(targetName) || targetName.includes(n);
            });
          }
          if (match && match.package_code) {
            packageCode = match.package_code;
          }
        }
      } catch (_) {
        // ignore
      }
    }

    const rawBarcode = isPackage
      ? (packageCode ?? fallbackBarcode ?? '')
      : (group?.barcode ?? fallbackBarcode ?? '');
    const barcode = rawBarcode != null ? String(rawBarcode) : '';

    let totalPrice = Number.isFinite(Number(group?.totalPrice))
      ? Number(group.totalPrice)
      : Number((unitPrice * count).toFixed(2));

    totalPrice = sanitizePriceValue(totalPrice);

    return {
      ...group,
      isPackage,
      desc: group?.description,
      barcode,
      packageCodeResolved: packageCode || '',
      qty: count,
      price: totalPrice,
      totalPrice,
      unitPriceValue: unitPrice,
    };
  });

  const itemColumnsBase = QUOTE_ITEMS_COLUMN_DEFS.filter((column) => isFieldEnabled('items', column.id));
  const itemColumns = (() => {
    let cols = [];
    itemColumnsBase.forEach((col) => {
      if (col.id === 'price') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const qty = Number.isFinite(Number(item?.qty)) ? Math.max(1, Number(item.qty)) : 1;
            const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            const total = sharedUnit * qty * days;
            return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else if (col.id === 'unitPrice') {
        cols.push({
          ...col,
          render: (item) => {
            const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            return escapeHtml(`${formatMoney(sharedUnit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
    if (isFieldEnabled('items','days')) {
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder tail: unitPrice -> quantity -> (days?) -> price
    const map = new Map(cols.map((c) => [c.id, c]));
    const keep = cols.filter((c) => !['unitPrice','quantity','days','price'].includes(c.id));
    const tailOrder = ['unitPrice','quantity'];
    if (map.has('days')) tailOrder.push('days');
    tailOrder.push('price');
    const tail = tailOrder.map((id) => map.get(id)).filter(Boolean);
    cols = [...keep, ...tail];
    return cols;
  })();
  const hasItemColumns = itemColumns.length > 0;
  const itemTableHeader = hasItemColumns
    ? itemColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const hasItems = quoteItems.length > 0;
  const itemsBodyRows = hasItems
    ? quoteItems.map((item, index) => `<tr>${itemColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(item, index)}</div></td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${Math.max(itemColumns.length, 1)}" class="empty">${escapeHtml(t('reservations.details.noItems', '📦 لا توجد معدات ضمن هذا الحجز حالياً.'))}</td></tr>`;
  const equipmentSubtotalDisplay = (() => {
    try {
      const daysValue = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const sum = quoteItems.reduce((acc, item) => {
        const unit = Number.isFinite(Number(item?.unitPriceValue)) ? Number(item.unitPriceValue) : 0;
        const qty = Number.isFinite(Number(item?.qty)) ? Math.max(1, Number(item.qty)) : 1;
        const sharedUnit = applyCompanyShareToUnitAmount(unit);
        return acc + (sharedUnit * qty * daysValue);
      }, 0);
      return formatMoney(sum);
    } catch (_) {
      return formatMoney(0);
    }
  })();

  const itemsSectionMarkup = includeSection('items')
    ? (hasItemColumns
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${itemTableHeader}</tr>
              </thead>
              <tbody>${itemsBodyRows}</tbody>
            </table>
            ${isFieldEnabled('items','equipmentSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.equipmentTotal', 'إجمالي المعدات'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${equipmentSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.items.title', 'المعدات'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const crewColumnsBase = QUOTE_CREW_COLUMN_DEFS.filter((column) => isFieldEnabled('crew', column.id));
  const groupCrew = true; // Always group crew by position in reservation quotes
  const hasCrewColumns = crewColumnsBase.length > 0;
  const crewSourceRaw = Array.isArray(crewAssignments) ? crewAssignments : [];
  const crewKeyOf = (a) => {
    const baseKey = (a && a.positionId != null)
      ? `id:${String(a.positionId)}`
      : (() => {
          const raw = (a?.positionLabel || a?.position_name || a?.position || '').trim().toLowerCase();
          return raw ? `label:${raw}` : '';
        })();
    const price = Number.isFinite(Number(a?.positionClientPrice)) ? Number(a.positionClientPrice) : 0;
    const priceKey = price > 0 ? `|p:${price.toFixed(2)}` : '';
    return `${baseKey}${priceKey}`;
  };
  const crewCounts = (() => {
    const map = new Map();
    crewSourceRaw.forEach((a) => {
      const key = crewKeyOf(a);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return map;
  })();
  const crewColumns = (() => {
    let cols = [];
    let quantityColumn = null;
    crewColumnsBase.forEach((col) => {
      if (col.id === 'position') {
        cols.push({
          ...col,
          render: (assignment) => {
            const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
            let labelEn = assignment?.positionLabelEn
              ?? assignment?.position_label_en
              ?? assignment?.position_name_en
              ?? assignment?.positionLabelAlt
              ?? assignment?.position_label_alt
              ?? assignment?.role;
            if (!labelEn && langNow === 'en') {
              try {
                const positions = (typeof getTechnicianPositionsCache === 'function') ? getTechnicianPositionsCache() : [];
                let resolved = null;
                if (assignment?.positionId != null) {
                  resolved = positions.find((p) => String(p.id) === String(assignment.positionId)) || null;
                }
                if (!resolved) {
                  const key = assignment?.positionKey
                    ?? assignment?.position_key
                    ?? assignment?.positionName
                    ?? assignment?.position_name
                    ?? assignment?.position
                    ?? '';
                  if (key) {
                    const lk = String(key).toLowerCase();
                    resolved = positions.find((p) => String(p.name).toLowerCase() === lk) || null;
                  }
                }
                if (resolved) {
                  labelEn = resolved.labelEn ?? resolved.label_en ?? resolved.name_en ?? labelEn;
                }
              } catch (_) { /* non-fatal */ }
            }
            const labelAr = assignment?.positionLabel
              ?? assignment?.position_name
              ?? assignment?.role
              ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
            const baseLabel = (langNow === 'en' && labelEn) ? labelEn : labelAr;
            if (groupCrew) {
              return escapeHtml(normalizeNumbers(String(baseLabel)));
            }
            const key = crewKeyOf(assignment);
            const count = key ? (crewCounts.get(key) || 0) : 0;
            const suffix = count > 1 ? ` × ${normalizeNumbers(String(count))}` : '';
            return escapeHtml(normalizeNumbers(String(baseLabel)) + suffix);
          }
        });
        // Prepare quantity column (optional via toggle)
        if (isFieldEnabled('crew','quantity')) {
          quantityColumn = {
            id: 'quantity',
            labelKey: 'reservations.details.table.headers.quantity',
            fallback: 'الكمية',
            render: (assignment) => {
              const qty = Number(assignment?.__count || 1);
              return escapeHtml(normalizeNumbers(String(Math.max(1, qty))));
            }
          };
        }
      } else if (col.id === 'price') {
        // When grouping by position, show client price multiplied by quantity
        if (groupCrew) {
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const qty = Math.max(1, Number(assignment?.__count || 1));
              const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
              const sharedUnit = applyCompanyShareToUnitAmount(unit);
              const total = sharedUnit * qty * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        } else {
          // Non-grouped price per assignment for all days
          cols.push({
            ...col,
            render: (assignment) => {
              const unit = Number.isFinite(Number(assignment?.positionClientPrice))
                ? Number(assignment.positionClientPrice)
                : 0;
              const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
              const sharedUnit = applyCompanyShareToUnitAmount(unit);
              const total = sharedUnit * days;
              return escapeHtml(`${formatMoney(total)} ${t('reservations.create.summary.currency', 'SR')}`);
            }
          });
        }
      } else if (col.id === 'unitPrice') {
        // Show per-day unit price
        cols.push({
          ...col,
          render: (assignment) => {
            const unit = Number.isFinite(Number(assignment?.positionClientPrice))
              ? Number(assignment.positionClientPrice)
              : 0;
            const sharedUnit = applyCompanyShareToUnitAmount(unit);
            return escapeHtml(`${formatMoney(sharedUnit)} ${t('reservations.create.summary.currency', 'SR')}`);
          }
        });
      } else {
        cols.push(col);
      }
    });
    // Ensure quantity column is present only if allowed
    if (quantityColumn) {
      cols.push(quantityColumn);
    }
    // Optional days column via toggle
    if (isFieldEnabled('crew','days')) {
      const days = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const priceIndex = cols.findIndex((c) => c.id === 'price');
      const insertionIndex = Math.max(0, priceIndex);
      cols.splice(insertionIndex, 0, {
        id: 'days',
        labelKey: 'reservations.details.table.headers.days',
        fallback: 'الأيام',
        render: () => escapeHtml(normalizeNumbers(String(days)))
      });
    }
    // Reorder to: rowNumber, position, unitPrice, quantity, days, price, then others
    const map = new Map(cols.map((c) => [c.id, c]));
    const seen = new Set();
    const out = [];
    const pushIf = (id) => { const c = map.get(id); if (c && !seen.has(id)) { out.push(c); seen.add(id);} };
    pushIf('rowNumber');
    pushIf('position');
    pushIf('unitPrice');
    pushIf('quantity');
    pushIf('days');
    pushIf('price');
    cols.forEach((c) => { if (!seen.has(c.id)) { out.push(c); seen.add(c.id);} });
    cols = out;
    return cols;
  })();
  const crewHeader = hasCrewColumns
    ? crewColumns.map((column) => `<th>${escapeHtml(column.labelKey ? t(column.labelKey, column.fallback) : column.fallback)}</th>`).join('')
    : '';
  const crewSource = groupCrew
    ? (() => {
        const map = new Map();
        crewSourceRaw.forEach((a) => {
          const key = crewKeyOf(a);
          if (!key) return;
          const existing = map.get(key);
          if (existing) {
            existing.__count += 1;
          } else {
            map.set(key, { ...a, __count: 1 });
          }
        });
        return Array.from(map.values());
      })()
    : crewSourceRaw;
  const crewBodyRows = crewSource.length
    ? crewSource.map((assignment, index) => `<tr>${crewColumns.map((column) => `<td><div class=\"quote-cell\">${column.render(assignment, index)}</div></td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${Math.max(crewColumns.length, 1)}" class="empty">${escapeHtml(t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.'))}</td></tr>`;
  const crewSubtotalDisplay = (() => {
    try {
      const daysValue = Math.max(1, Number(state.activeQuoteState?.rentalDays || 1));
      const sum = crewSource.reduce((acc, assignment) => {
        const unit = Number.isFinite(Number(assignment?.positionClientPrice))
          ? Number(assignment.positionClientPrice)
          : 0;
        const qty = Math.max(1, Number(assignment?.__count || 1));
        const sharedUnit = applyCompanyShareToUnitAmount(unit);
        return acc + (sharedUnit * qty * daysValue);
      }, 0);
      return formatMoney(sum);
    } catch (_) {
      return formatMoney(0);
    }
  })();

  const crewSectionMarkup = includeSection('crew')
    ? (hasCrewColumns
        ? `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${crewHeader}</tr>
              </thead>
              <tbody>${crewBodyRows}</tbody>
            </table>
            ${isFieldEnabled('crew','crewSubtotal') ? `
              <div class="quote-table-subtotal">
                <span class="quote-table-subtotal__pill">
                  <span class="quote-table-subtotal__label">${escapeHtml(t('reservations.details.labels.crewTotal', 'إجمالي الفريق'))}</span>
                  <span class="quote-table-subtotal__value">${escapeHtml(`${crewSubtotalDisplay} ${currencyLabel}`)}</span>
                </span>
              </div>
            ` : ''}
          </section>`
        : `<section class="quote-section quote-section--table">
            <h3>${escapeHtml(t('reservations.details.technicians.title', 'طاقم العمل'))}</h3>
            ${noFieldsMessage}
          </section>`)
    : '';

  const notesSectionMarkup = includeSection('notes')
    ? `<section class="quote-section">
        <h3>${escapeHtml(t('reservations.details.labels.notes', 'ملاحظات الحجز'))}</h3>
        <div class="quote-notes">${notes ? escapeHtml(notes) : escapeHtml(t('reservations.quote.emptyNotes', 'لا توجد ملاحظات إضافية.'))}</div>
      </section>`
    : '';

  const paymentRows = [];
  if (isFieldEnabled('payment', 'beneficiary')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.beneficiary', 'اسم المستفيد'), QUOTE_COMPANY_INFO.beneficiaryName));
  }
  if (isFieldEnabled('payment', 'bank')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.bank', 'اسم البنك'), QUOTE_COMPANY_INFO.bankName));
  }
  if (isFieldEnabled('payment', 'account')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.account', 'رقم الحساب'), normalizeNumbers(QUOTE_COMPANY_INFO.accountNumber)));
  }
  if (isFieldEnabled('payment', 'iban')) {
    paymentRows.push(renderPaymentRow(t('reservations.quote.labels.iban', 'رقم الآيبان'), normalizeNumbers(QUOTE_COMPANY_INFO.iban)));
  }

  const paymentSectionMarkup = `<section class="quote-section">
      <div class="payment-block">
        <h3>${escapeHtml(t('reservations.quote.sections.payment', 'بيانات الدفع'))}</h3>
        <div class="payment-rows">${paymentRows.length ? paymentRows.join('') : noFieldsMessage}</div>
      </div>
      <p class="quote-approval-note">${escapeHtml(QUOTE_COMPANY_INFO.approvalNote)}</p>
    </section>`;


  const termsSectionMarkup = `<footer class="quote-footer">
        <h4>${escapeHtml(t('reservations.quote.labels.terms', 'الشروط العامة'))}</h4>
        <ul>${termsList.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul>
      </footer>`;

  const primaryBlocks = [];

  if (customerSectionMarkup && reservationSectionMarkup) {
    const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
    const leftFirst = langNow === 'en'
      ? `${reservationSectionMarkup}${customerSectionMarkup}`
      : `${customerSectionMarkup}${reservationSectionMarkup}`;
    primaryBlocks.push(withBlockAttributes(
      `<div class="quote-section-row">${leftFirst}</div>`,
      { blockType: 'group' }
    ));
  } else {
    if (reservationSectionMarkup) {
      primaryBlocks.push(withBlockAttributes(reservationSectionMarkup));
    }
    if (customerSectionMarkup) {
      primaryBlocks.push(withBlockAttributes(customerSectionMarkup));
    }
  }

  if (projectSectionMarkup) {
    try {
      const langNow = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
      const emptySection = '<section class="quote-section quote-section--empty"></section>';
      // Place Project info on the far right under Customer info for AR as well
      const rowHtml = (langNow === 'en')
        ? `<div class="quote-section-row">${emptySection}${projectSectionMarkup}</div>`
        : `<div class="quote-section-row">${emptySection}${projectSectionMarkup}</div>`;
      primaryBlocks.push(withBlockAttributes(rowHtml, { blockType: 'group' }));
    } catch (_) {
      primaryBlocks.push(withBlockAttributes(projectSectionMarkup));
    }
  }

  const tableBlocks = [];
  if (itemsSectionMarkup) {
    tableBlocks.push(withBlockAttributes(itemsSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="items"' }));
  }
  if (crewSectionMarkup) {
    tableBlocks.push(withBlockAttributes(crewSectionMarkup, { blockType: 'table', extraAttributes: 'data-table-id="crew"' }));
  }

  const summaryBlocks = [];
  if (financialSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(financialSectionMarkup, { blockType: 'summary' }));
  }
  if (notesSectionMarkup) {
    summaryBlocks.push(withBlockAttributes(notesSectionMarkup));
  }

  let footerBlocks = [];
  if ((options?.context || 'reservation') !== 'reservationChecklist') {
    footerBlocks = [
      ...(includeSection('payment') ? [withBlockAttributes(paymentSectionMarkup, { blockType: 'payment' })] : []),
      withBlockAttributes(termsSectionMarkup, { blockType: 'footer' })
    ];
  } else {
    const userNotes = String(options?.checklistNotes || '').trim();
    const notesTitle = String(options?.checklistNotesTitle || '').trim() || t('reservations.checklist.controls.notes.sectionTitleDefault', 'ملاحظات');
    if (userNotes.length > 0) {
      const checklistNotesSection = `<section class="quote-section">
        <h3>${escapeHtml(notesTitle)}</h3>
        <div class="quote-notes">${escapeHtml(userNotes)}</div>
      </section>`;
      footerBlocks = [withBlockAttributes(checklistNotesSection)];
    }
  }

  const orderedBlocks = [
    ...(options?.context === 'reservationChecklist' ? primaryBlocks : ensureBlocks(primaryBlocks, 'reservations.quote.placeholder.page1')),
    ...tableBlocks,
    ...(options?.context === 'reservationChecklist' ? summaryBlocks : ensureBlocks(summaryBlocks, 'reservations.quote.placeholder.page2')),
    ...footerBlocks
  ];

  const isChecklist = (options?.context === 'reservationChecklist');
  const checklistTitle = (options?.checklistType === 'crew')
    ? 'قائمة الفريق الفني'
    : (options?.checklistType === 'both' ? 'قائمة المعدات والطاقم الفني' : 'قائمة المعدات');
  const lang = (typeof getCurrentLanguage === 'function') ? getCurrentLanguage() : 'ar';
  const enChecklistTitle = (options?.checklistType === 'crew')
    ? 'Crew List'
    : (options?.checklistType === 'both' ? 'Equipment & Crew List' : 'Equipment List');
  const headerTitle = isChecklist ? (lang === 'en' ? enChecklistTitle : checklistTitle) : t('reservations.quote.title', 'عرض سعر');
  const headerMetaHtml = isChecklist
    ? (
      `<div class="quote-header__meta" ${lang === 'en' ? 'dir="ltr"' : ''}>
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('reservations.quote.labels.date', 'التاريخ'))}</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>`
    )
    : (
      `<div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('reservations.details.labels.reservationId', 'رقم الحجز', 'Reservation ID'))}</span>
          <strong>${escapeHtml(quoteNumber)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${escapeHtml(t('reservations.quote.labels.date', 'التاريخ'))}</span>
          <strong>${escapeHtml(quoteDate)}</strong>
        </div>
      </div>`
    );

  const showLogo = !isChecklist || !options?.hideLogo;
  const showCompany = !isChecklist || !options?.hideCompany;
  const headerTemplateHtml = `
    <header class="quote-header" data-quote-header-template style="${Number.isFinite(Number(options?.headerOffset)) ? `margin-top:${Number(options.headerOffset)}px;` : ''}">
      <div class="quote-header__logo">
        ${showLogo ? `<img class=\"quote-logo\" src=\"${escapeHtml(resolveQuoteLogoUrl(QUOTE_COMPANY_INFO.logoUrl))}\" alt=\"${escapeHtml(QUOTE_COMPANY_INFO.companyName)}\" crossorigin=\"anonymous\"/>` : `<span class=\"quote-logo quote-logo--placeholder\" aria-hidden=\"true\"></span>`}
      </div>
      <div class="quote-header__title">
        <h1>${escapeHtml(headerTitle)}</h1>
        ${showCompany ? `
          <p class="quote-company-name">${escapeHtml(t('quote.companyName', QUOTE_COMPANY_INFO.companyName))}</p>
          <p class="quote-company-cr">${escapeHtml(t('reservations.quote.labels.cr', 'السجل التجاري'))}: ${escapeHtml(QUOTE_COMPANY_INFO.commercialRegistry)}</p>
          <p class="quote-company-license">${escapeHtml(t('reservations.quote.labels.mediaLicense', 'ترخيص إعلامي'))}: 159460</p>
        ` : ''}
      </div>
      ${headerMetaHtml}
    </header>
  `.trim();

  const rootDir = (isChecklist && lang === 'en') ? 'ltr' : 'rtl';
    return `
      <div id="quotation-pdf-root" dir="${escapeHtml(rootDir)}" data-lang="${escapeHtml(lang)}"${rootAttributes}>
        <style>${PDF_FONT_FACE}${QUOTE_PDF_STYLES}</style>
        <div class="quote-document" data-quote-document>
          <div class="quote-preview-pages" data-quote-pages></div>
          <div class="quote-content-source" data-quote-source>
            ${headerTemplateHtml}
            ${orderedBlocks.join('')}
          </div>
        </div>
      </div>
    `;
  } finally {
    state.renderLayoutStateOverride = previousLayoutState;
  }
}
