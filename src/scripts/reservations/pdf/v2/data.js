import { QUOTE_COMPANY_INFO } from '../constants.js';
import { formatCurrencyValue } from '../financial.js';
import { normalizeNumbers } from '../../../utils.js';
import { buildReservationDisplayGroups, sanitizePriceValue } from '../../../reservationsShared.js';
import { applyProjectItemOverhead } from '../../../projects/financials.js';
import { quoteV2Text, getQuoteV2DefaultTerms, normalizeQuoteV2Language } from './i18n.js';

function clean(value, fallback = '-') {
  const text = value == null ? '' : String(value).trim();
  return text || fallback;
}

function money(value, currencyLabel = 'SR') {
  return formatCurrencyValue(Number(value) || 0, currencyLabel);
}

function displayMoney(value, currencyLabel = 'SR') {
  const text = value == null ? '' : String(value).trim();
  if (!text) return money(0, currencyLabel);
  return /\bSR\b|ر\.?س|ريال/i.test(text) ? text : `${text} ${currencyLabel}`;
}

function resolveProjectOverheadForQuote(activeQuoteState) {
  if (activeQuoteState?.context !== 'project') {
    return { applyTax: false, companyShareEnabled: false, companySharePercent: 0 };
  }
  const totals = activeQuoteState?.totals || {};
  const project = activeQuoteState?.project || {};
  const percent = Number(
    totals.companySharePercent
    ?? project.companySharePercent
    ?? project.company_share_percent
    ?? 0,
  ) || 0;
  const applyTax = totals.applyTax === true
    || project.applyTax === true
    || project.applyTax === 'true'
    || project.apply_tax === true
    || project.apply_tax === 'true';
  const companyShareEnabled = percent > 0 && applyTax && Number(totals.companyShareAmount || 0) > 0;
  return { applyTax, companyShareEnabled, companySharePercent: percent };
}

function projectQuotePrice(value, activeQuoteState) {
  return applyProjectItemOverhead(value, resolveProjectOverheadForQuote(activeQuoteState));
}

function englishDigits(value) {
  return String(value ?? '').replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit));
}

function sectionEnabled(activeQuoteState, sectionId) {
  const sections = activeQuoteState?.sections;
  return !sections || typeof sections.has !== 'function' || sections.has(sectionId);
}

function fieldEnabled(activeQuoteState, sectionId, fieldId) {
  const set = activeQuoteState?.fields?.[sectionId];
  if (!set) return true;
  if (set instanceof Set) return set.has(fieldId);
  if (Array.isArray(set)) return set.includes(fieldId);
  return Boolean(set?.[fieldId]);
}

function resolveTerms(activeQuoteState, language) {
  if (activeQuoteState?.context === 'reservationChecklist') return [];
  const context = activeQuoteState?.context === 'project' ? 'project' : 'reservation';
  if (Array.isArray(activeQuoteState?.terms) && activeQuoteState.terms.length && activeQuoteState.termsEdited === true) {
    return activeQuoteState.terms.map((term) => clean(term)).filter(Boolean);
  }
  return getQuoteV2DefaultTerms(context, language);
}

function buildInfoRows(entries) {
  return entries
    .filter((entry) => entry && entry.value !== undefined && entry.value !== null && String(entry.value).trim() !== '')
    .map((entry) => ({
      label: entry.label,
      value: clean(entry.value, '—'),
    }));
}

function buildReservationEquipmentRows(activeQuoteState, labels) {
  const reservation = activeQuoteState?.reservation || {};
  const rentalDays = Number(activeQuoteState?.rentalDays || 1) || 1;
  let groups = [];
  try {
    groups = buildReservationDisplayGroups(reservation)?.groups || [];
  } catch (_) {
    groups = [];
  }

  return groups.map((group, index) => {
    const quantity = Number(group?.count ?? group?.quantity ?? group?.qty ?? 1) || 1;
    const unitPrice = Number(group?.unitPrice ?? group?.price ?? 0) || 0;
    const total = Number.isFinite(Number(group?.totalPrice))
      ? Number(group.totalPrice)
      : sanitizePriceValue(unitPrice * quantity * rentalDays);
    return {
      cells: [
        String(index + 1),
        clean(group?.barcode ?? group?.packageDisplayCode ?? group?.packageCode ?? group?.code, '-'),
        clean(group?.description ?? group?.desc ?? labels.noData),
        normalizeNumbers(String(quantity)),
        normalizeNumbers(String(rentalDays)),
        money(unitPrice, activeQuoteState.currencyLabel),
        money(total, activeQuoteState.currencyLabel),
      ],
      mainCellIndex: 2,
    };
  });
}

function buildCrewRows(activeQuoteState, labels) {
  const rentalDays = Number(activeQuoteState?.rentalDays || 1) || 1;
  const assignments = Array.isArray(activeQuoteState?.crewAssignments) ? activeQuoteState.crewAssignments : [];
  const grouped = new Map();

  assignments.forEach((assignment) => {
    const label = clean(
      assignment?.positionLabel
        ?? assignment?.position_name
        ?? assignment?.position
        ?? assignment?.role
        ?? assignment?.technicianRole,
      labels.noData,
    );
    const price = Number(assignment?.positionClientPrice ?? assignment?.clientPrice ?? assignment?.dailyTotal ?? 0) || 0;
    const key = `${label}::${price}`;
    const existing = grouped.get(key) || { label, price, quantity: 0 };
    existing.quantity += 1;
    grouped.set(key, existing);
  });

  return Array.from(grouped.values()).map((entry, index) => ({
    cells: [
      String(index + 1),
      entry.label,
      normalizeNumbers(String(entry.quantity || 1)),
      normalizeNumbers(String(rentalDays)),
      money(entry.price, activeQuoteState.currencyLabel),
      money(entry.price * (entry.quantity || 1) * rentalDays, activeQuoteState.currencyLabel),
    ],
    mainCellIndex: 1,
  }));
}

function buildProjectEquipmentRows(activeQuoteState, labels) {
  const rentalDays = Number(activeQuoteState?.rentalDays || 1) || 1;
  const items = Array.isArray(activeQuoteState?.equipmentItems) ? activeQuoteState.equipmentItems : [];
  return items.map((item, index) => {
    const quantity = Number(item?.qty ?? item?.count ?? item?.quantity ?? 1) || 1;
    const unitPrice = Number(item?.unitPriceValue ?? item?.price ?? 0) || 0;
    const total = Number.isFinite(Number(item?.totalPrice))
      ? Number(item.totalPrice)
      : sanitizePriceValue(unitPrice * quantity * rentalDays);
    return {
      cells: [
        String(index + 1),
        clean(item?.barcode ?? item?.packageCodeResolved ?? item?.code, '-'),
        clean(item?.desc ?? item?.description ?? labels.noData),
        normalizeNumbers(String(quantity)),
        normalizeNumbers(String(rentalDays)),
        money(unitPrice, activeQuoteState.currencyLabel),
        money(total, activeQuoteState.currencyLabel),
      ],
      mainCellIndex: 2,
    };
  });
}

function resolvePositiveNumber(...values) {
  for (const value of values) {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 0) return numeric;
  }
  return 0;
}

function enabledColumn(activeQuoteState, sectionId, fieldId, header, value, { main = false } = {}) {
  if (!fieldEnabled(activeQuoteState, sectionId, fieldId)) return null;
  return { fieldId, header, value, main };
}

function buildTableRowsFromColumns(rows, columns) {
  const enabledColumns = columns.filter(Boolean);
  return rows.map((row) => {
    const cells = enabledColumns.map((column) => column.value(row));
    const mainCellIndex = Math.max(0, enabledColumns.findIndex((column) => column.main));
    return { cells, mainCellIndex };
  });
}

function buildTableSubtotal(activeQuoteState, sectionId, fieldId, label, rows) {
  if (!fieldEnabled(activeQuoteState, sectionId, fieldId)) return null;
  const total = rows.reduce((sum, row) => sum + (Number(row?.total) || 0), 0);
  return {
    label,
    value: money(total, activeQuoteState.currencyLabel),
  };
}

function buildEquipmentTable(activeQuoteState, labels, { project = false } = {}) {
  const sectionId = project ? 'projectEquipment' : 'items';
  const rentalDays = Number(activeQuoteState?.rentalDays || 1) || 1;
  const sourceRows = project
    ? (Array.isArray(activeQuoteState?.equipmentItems) ? activeQuoteState.equipmentItems : [])
    : (() => {
        try {
          return buildReservationDisplayGroups(activeQuoteState?.reservation || {})?.groups || [];
        } catch (_) {
          return [];
        }
      })();

  const normalizedRows = sourceRows.map((item, index) => {
    const quantity = Number(item?.qty ?? item?.count ?? item?.quantity ?? 1) || 1;
    const baseUnitPrice = Number(item?.unitPriceValue ?? item?.unitPrice ?? item?.price ?? 0) || 0;
    const unitPrice = project ? projectQuotePrice(baseUnitPrice, activeQuoteState) : baseUnitPrice;
    const baseTotal = Number.isFinite(Number(item?.totalPrice))
      ? Number(item.totalPrice)
      : sanitizePriceValue(baseUnitPrice * quantity * rentalDays);
    const total = project
      ? sanitizePriceValue(unitPrice * quantity * rentalDays)
      : baseTotal;
    return {
      index,
      code: clean(item?.barcode ?? item?.packageDisplayCode ?? item?.packageCodeResolved ?? item?.packageCode ?? item?.code, '-'),
      description: clean(item?.description ?? item?.desc ?? labels.noData),
      quantity,
      days: rentalDays,
      unitPrice,
      total,
    };
  });

  const columns = [
    enabledColumn(activeQuoteState, sectionId, 'rowNumber', '#', (row) => String(row.index + 1)),
    enabledColumn(activeQuoteState, sectionId, 'code', labels.code, (row) => row.code),
    enabledColumn(activeQuoteState, sectionId, 'description', labels.description, (row) => row.description, { main: true }),
    enabledColumn(activeQuoteState, sectionId, 'quantity', labels.quantity, (row) => normalizeNumbers(String(row.quantity))),
    enabledColumn(activeQuoteState, sectionId, 'days', labels.days, (row) => normalizeNumbers(String(row.days))),
    enabledColumn(activeQuoteState, sectionId, 'unitPrice', labels.unitPrice, (row) => money(row.unitPrice, activeQuoteState.currencyLabel)),
    enabledColumn(activeQuoteState, sectionId, 'price', labels.total, (row) => money(row.total, activeQuoteState.currencyLabel)),
  ].filter(Boolean);

  return {
    headers: columns.map((column) => column.header),
    rows: buildTableRowsFromColumns(normalizedRows, columns),
    subtotal: buildTableSubtotal(activeQuoteState, sectionId, 'equipmentSubtotal', labels.equipmentTotal, normalizedRows),
  };
}

function buildCrewTable(activeQuoteState, labels, { project = false } = {}) {
  const sectionId = project ? 'projectCrew' : 'crew';
  const rentalDays = Number(activeQuoteState?.rentalDays || 1) || 1;
  const assignments = Array.isArray(activeQuoteState?.crewAssignments) ? activeQuoteState.crewAssignments : [];
  const grouped = new Map();

  assignments.forEach((assignment) => {
    const label = clean(
      assignment?.positionLabel
        ?? assignment?.position_name
        ?? assignment?.position
        ?? assignment?.role
        ?? assignment?.technicianRole,
      labels.noData,
    );
    const basePrice = Number(assignment?.positionClientPrice ?? assignment?.clientPrice ?? assignment?.dailyTotal ?? 0) || 0;
    const price = project ? projectQuotePrice(basePrice, activeQuoteState) : basePrice;
    const key = `${label}::${price}`;
    const existing = grouped.get(key) || { label, price, quantity: 0 };
    existing.quantity += 1;
    grouped.set(key, existing);
  });

  const normalizedRows = Array.from(grouped.values()).map((entry, index) => ({
    index,
    position: entry.label,
    quantity: entry.quantity || 1,
    days: rentalDays,
    unitPrice: entry.price,
    total: entry.price * (entry.quantity || 1) * rentalDays,
  }));

  const columns = [
    enabledColumn(activeQuoteState, sectionId, 'rowNumber', '#', (row) => String(row.index + 1)),
    enabledColumn(activeQuoteState, sectionId, 'position', labels.position, (row) => row.position, { main: true }),
    enabledColumn(activeQuoteState, sectionId, 'quantity', labels.quantity, (row) => normalizeNumbers(String(row.quantity))),
    enabledColumn(activeQuoteState, sectionId, 'days', labels.days, (row) => normalizeNumbers(String(row.days))),
    enabledColumn(activeQuoteState, sectionId, 'unitPrice', labels.unitPrice, (row) => money(row.unitPrice, activeQuoteState.currencyLabel)),
    enabledColumn(activeQuoteState, sectionId, 'price', labels.total, (row) => money(row.total, activeQuoteState.currencyLabel)),
  ].filter(Boolean);

  return {
    headers: columns.map((column) => column.header),
    rows: buildTableRowsFromColumns(normalizedRows, columns),
    subtotal: buildTableSubtotal(activeQuoteState, sectionId, 'crewSubtotal', labels.crewTotal, normalizedRows),
  };
}

function buildProjectServicesRows(activeQuoteState) {
  const services = Array.isArray(activeQuoteState?.projectExpenses) && activeQuoteState.projectExpenses.length
    ? activeQuoteState.projectExpenses
    : (Array.isArray(activeQuoteState?.project?.expenses) ? activeQuoteState.project.expenses : []);
  const showSubtotal = fieldEnabled(activeQuoteState, 'projectExpenses', 'productionServicesSubtotal')
    || fieldEnabled(activeQuoteState, 'projectExpenses', 'expensesSubtotal');
  const columns = [
    enabledColumn(activeQuoteState, 'projectExpenses', 'rowNumber', '#', (row) => String(row.index + 1)),
    enabledColumn(activeQuoteState, 'projectExpenses', 'label', quoteV2Text(activeQuoteState.quoteLanguage, 'service'), (row) => row.label, { main: true }),
    enabledColumn(activeQuoteState, 'projectExpenses', 'days', quoteV2Text(activeQuoteState.quoteLanguage, 'days'), (row) => normalizeNumbers(String(row.days))),
    enabledColumn(activeQuoteState, 'projectExpenses', 'amount', quoteV2Text(activeQuoteState.quoteLanguage, 'price'), (row) => money(row.unitAmount, activeQuoteState.currencyLabel)),
    enabledColumn(activeQuoteState, 'projectExpenses', 'total', quoteV2Text(activeQuoteState.quoteLanguage, 'total'), (row) => money(row.total, activeQuoteState.currencyLabel)),
    enabledColumn(activeQuoteState, 'projectExpenses', 'note', quoteV2Text(activeQuoteState.quoteLanguage, 'notes'), (row) => row.note),
  ].filter(Boolean);
  const normalizedRows = services.map((service, index) => {
    const baseUnitAmount = Number(service?.salePrice ?? service?.sale_price ?? service?.unitAmount ?? 0) || 0;
    const unitAmount = projectQuotePrice(baseUnitAmount, activeQuoteState);
    const days = resolvePositiveNumber(service?.days, service?.service_days, service?.serviceDays, 1) || 1;
    const explicitTotal = Number(service?.totalAmount ?? service?.total_amount ?? service?.total);
    const total = Number.isFinite(explicitTotal) && explicitTotal >= 0
      ? projectQuotePrice(explicitTotal / days, activeQuoteState) * days
      : unitAmount * days;
    return {
      index,
      label: clean(service?.label ?? service?.name, '-'),
      unitAmount,
      days,
      total,
      note: clean(service?.note ?? service?.description, '—'),
    };
  });
  return {
    headers: columns.map((column) => column.header),
    rows: buildTableRowsFromColumns(normalizedRows, columns),
    subtotal: showSubtotal
      ? {
          label: quoteV2Text(activeQuoteState.quoteLanguage, 'productionServicesTotal'),
          value: money(normalizedRows.reduce((sum, row) => sum + (Number(row?.total) || 0), 0), activeQuoteState.currencyLabel),
        }
      : null,
  };
}

function buildFinancialCards(activeQuoteState, labels) {
  const totals = activeQuoteState?.totals || {};
  const display = activeQuoteState?.totalsDisplay || {};
  const currency = activeQuoteState?.currencyLabel || 'SR';
  const subtotal = display.taxableAmount
    ?? display.reservationsTotal
    ?? display.projectSubtotal
    ?? display.subtotal
    ?? totals.taxableAmount
    ?? totals.subtotal
    ?? totals.clientSubtotalBeforeDiscount
    ?? display.subtotalAfterDiscount
    ?? totals.subtotalAfterDiscount
    ?? 0;
  const tax = display.taxAmount ?? totals.taxAmount ?? 0;
  const finalTotal = display.finalTotal ?? display.overallTotal ?? totals.finalTotal ?? totals.totalWithTax ?? 0;
  const discountAmount = Number(totals.discountAmount || 0);
  const overheadAmount = Number(totals.companyShareAmount || 0);

  const cards = [];
  if (discountAmount > 0 && fieldEnabled(activeQuoteState, 'financialSummary', 'discountAmount')) {
    cards.push({ label: labels.discount, value: displayMoney(display.discountAmount ?? discountAmount, currency) });
  }
  if (fieldEnabled(activeQuoteState, 'financialSummary', 'subtotalBeforeTax')
    || fieldEnabled(activeQuoteState, 'financialSummary', 'reservationsTotal')) {
    cards.push({ label: labels.total, value: displayMoney(subtotal, currency) });
  }
  if (activeQuoteState?.context !== 'project' && overheadAmount > 0 && fieldEnabled(activeQuoteState, 'financialSummary', 'companyShareAmount')) {
    cards.push({ label: labels.overhead, value: displayMoney(display.companyShareAmount ?? overheadAmount, currency) });
  }
  if (fieldEnabled(activeQuoteState, 'financialSummary', 'taxAmount')) {
    cards.push({ label: labels.tax, value: displayMoney(tax, currency) });
  }
  if (fieldEnabled(activeQuoteState, 'financialSummary', 'finalTotal')
    || fieldEnabled(activeQuoteState, 'financialSummary', 'overallTotal')) {
    cards.push({ label: labels.grandTotal, value: displayMoney(finalTotal, currency), total: true });
  }

  return cards;
}

export function buildQuoteV2Data(activeQuoteState = {}) {
  const language = normalizeQuoteV2Language(activeQuoteState.quoteLanguage);
  const labels = new Proxy({}, { get: (_target, key) => quoteV2Text(language, key) });
  const rawContext = activeQuoteState.context || 'reservation';
  const context = rawContext === 'project'
    ? 'project'
    : rawContext === 'reservationChecklist'
      ? 'reservationChecklist'
      : 'reservation';
  const isProject = context === 'project';
  const isChecklist = context === 'reservationChecklist';
  const currencyLabel = activeQuoteState.currencyLabel || 'SR';
  const customer = activeQuoteState.customer || {};
  const reservation = activeQuoteState.reservation || {};
  const project = activeQuoteState.project || {};
  const clientInfo = activeQuoteState.clientInfo || {};
  const projectInfo = activeQuoteState.projectInfo || {};
  const quoteNotes = isChecklist
    ? clean(activeQuoteState.checklistNotes, '')
    : isProject
    ? clean(activeQuoteState.projectNotes ?? project.description ?? project.notes, '')
    : clean(reservation.notes ?? activeQuoteState.notes, '');

  const clientRows = buildInfoRows([
    fieldEnabled(activeQuoteState, 'customerInfo', 'customerName')
      ? { label: labels.client, value: isProject ? clientInfo.name : (customer.customerName ?? customer.full_name ?? customer.name) }
      : null,
    fieldEnabled(activeQuoteState, 'customerInfo', 'customerCompany')
      ? { label: labels.company, value: isProject ? clientInfo.company : (customer.company ?? customer.companyName ?? customer.company_name) }
      : null,
    fieldEnabled(activeQuoteState, 'customerInfo', 'customerPhone')
      ? { label: labels.phone, value: isProject ? clientInfo.phone : (customer.phone ?? customer.customerPhone) }
      : null,
    fieldEnabled(activeQuoteState, 'customerInfo', 'customerEmail')
      ? { label: labels.email, value: isProject ? clientInfo.email : customer.email }
      : null,
  ]);

  const detailRows = isProject
    ? buildInfoRows([
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectType') ? { label: labels.projectType, value: projectInfo.typeLabel } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectTitle') ? { label: labels.projectTitle, value: projectInfo.title ?? project.title } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectStart') ? { label: labels.start, value: projectInfo.startDisplay } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectEnd') ? { label: labels.end, value: projectInfo.endDisplay } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectDuration') ? { label: labels.duration, value: projectInfo.durationLabel } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectStatus') ? { label: labels.status, value: projectInfo.statusLabel } : null,
    ])
    : buildInfoRows([
      fieldEnabled(activeQuoteState, 'reservationInfo', 'reservationStart') ? { label: labels.start, value: reservation.start } : null,
      fieldEnabled(activeQuoteState, 'reservationInfo', 'reservationEnd') ? { label: labels.end, value: reservation.end } : null,
      fieldEnabled(activeQuoteState, 'reservationInfo', 'reservationDuration') ? { label: labels.duration, value: activeQuoteState.rentalDays ? `${normalizeNumbers(String(activeQuoteState.rentalDays))}` : '' } : null,
      fieldEnabled(activeQuoteState, 'projectInfo', 'projectTitle') ? { label: labels.projectTitle, value: project?.title ?? project?.name } : null,
    ]);

  const tables = [];
  if (isProject && sectionEnabled(activeQuoteState, 'projectExpenses')) {
    const servicesTable = buildProjectServicesRows(activeQuoteState);
    tables.push({
      key: 'services',
      title: labels.productionServices,
      headers: servicesTable.headers,
      rows: servicesTable.rows,
      subtotal: servicesTable.subtotal,
    });
  }
  const equipmentSection = isProject ? 'projectEquipment' : 'items';
  if (sectionEnabled(activeQuoteState, equipmentSection)) {
    const equipmentTable = buildEquipmentTable(activeQuoteState, labels, { project: isProject });
    tables.push({
      key: 'equipment',
      title: labels.equipment,
      headers: equipmentTable.headers,
      rows: equipmentTable.rows,
      subtotal: equipmentTable.subtotal,
    });
  }
  const crewSection = isProject ? 'projectCrew' : 'crew';
  if (sectionEnabled(activeQuoteState, crewSection)) {
    const crewTable = buildCrewTable(activeQuoteState, labels, { project: isProject });
    tables.push({
      key: 'crew',
      title: labels.crew,
      headers: crewTable.headers,
      rows: crewTable.rows,
      subtotal: crewTable.subtotal,
    });
  }

  const checklistType = activeQuoteState.checklistType === 'crew'
    ? 'crew'
    : activeQuoteState.checklistType === 'both'
      ? 'both'
      : 'items';
  const checklistTitle = checklistType === 'crew'
    ? labels.crewChecklistTitle
    : checklistType === 'both'
      ? labels.combinedChecklistTitle
      : labels.equipmentChecklistTitle;

  return {
    context,
    language,
    quoteNumber: clean(activeQuoteState.quoteNumber, '-'),
    quoteDate: clean(activeQuoteState.quoteDateLabel, '-'),
    numberLabel: isProject ? labels.projectNumber : labels.reservationNumber,
    company: {
      logoUrl: QUOTE_COMPANY_INFO.logoUrl,
      name: QUOTE_COMPANY_INFO.companyName,
      commercialRegistry: QUOTE_COMPANY_INFO.commercialRegistry,
      mediaLicense: '159460',
      beneficiaryName: QUOTE_COMPANY_INFO.beneficiaryName,
      bankName: QUOTE_COMPANY_INFO.bankName,
      accountNumber: englishDigits(QUOTE_COMPANY_INFO.accountNumber),
      iban: englishDigits(QUOTE_COMPANY_INFO.iban),
    },
    hideLogo: Boolean(activeQuoteState.hideLogo),
    hideCompany: Boolean(activeQuoteState.hideCompany),
    labels,
    quoteTitle: isChecklist ? checklistTitle : labels.quoteTitle,
    clientRows,
    detailTitle: isProject ? labels.projectInfo : labels.reservationInfo,
    detailRows,
    showClient: sectionEnabled(activeQuoteState, 'customerInfo'),
    showDetails: sectionEnabled(activeQuoteState, isProject ? 'projectInfo' : 'reservationInfo'),
    tables,
    financialCards: !isChecklist && sectionEnabled(activeQuoteState, 'financialSummary')
      ? buildFinancialCards({ ...activeQuoteState, currencyLabel }, labels)
      : [],
    showPayment: !isChecklist && sectionEnabled(activeQuoteState, 'payment'),
    paymentRows: [
      ['beneficiary', labels.beneficiary, QUOTE_COMPANY_INFO.beneficiaryName],
      ['bank', labels.bank, QUOTE_COMPANY_INFO.bankName],
      ['account', labels.account, QUOTE_COMPANY_INFO.accountNumber],
      ['iban', labels.iban, QUOTE_COMPANY_INFO.iban],
    ]
      .filter(([fieldId]) => fieldEnabled(activeQuoteState, 'payment', fieldId))
      .map(([, label, value]) => ({ label, value })),
    notesTitle: isChecklist
      ? clean(activeQuoteState.checklistNotesTitle, labels.notes)
      : isProject
        ? labels.projectNotes
        : labels.reservationNotes,
    notes: quoteNotes,
    showNotes: sectionEnabled(activeQuoteState, isChecklist ? 'notes' : isProject ? 'projectNotes' : 'notes'),
    terms: resolveTerms(activeQuoteState, language),
    showApproval: !isChecklist,
  };
}

export function escapeQuoteV2(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
