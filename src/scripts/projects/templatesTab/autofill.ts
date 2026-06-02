import {
  classifyExpenseTemplateCategory,
  EXPENSE_TEMPLATE_SUBGROUP_CODES,
} from '../../templates/expensesCatalog.js';

interface ExpenseLike {
  id?: string | number;
  label?: string | null;
  amount?: unknown;
  salePrice?: unknown;
  sale_price?: unknown;
  note?: string | null;
}

interface CrewAssignmentLike {
  technicianId?: string | number | null;
  technicianName?: string | null;
  technicianPhone?: string | null;
  technician_phone?: string | null;
  phone?: string | null;
  phoneNumber?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  technicianRole?: string | null;
  role?: string | null;
  positionName?: string | null;
  positionLabel?: string | null;
  positionLabelAr?: string | null;
  positionLabelEn?: string | null;
  position_name?: string | null;
  position_label_ar?: string | null;
  position_label_en?: string | null;
  positionCost?: unknown;
  position_cost?: unknown;
}

interface ReservationItemLike {
  id?: string | number | null;
  equipmentId?: string | number | null;
  desc?: string | null;
  description?: string | null;
  qty?: unknown;
  quantity?: unknown;
  cost?: unknown;
}

interface ProjectLike {
  id?: string | number | null;
  title?: string | null;
  clientCompany?: string | null;
  clientName?: string | null;
  description?: string | null;
  callsheetNotes?: string | null;
  callsheet_notes?: string | null;
  start?: string | null;
  end?: string | null;
  expenses?: ExpenseLike[] | null;
}

interface ReservationLike {
  id?: string | number | null;
  reservationId?: string | number | null;
  title?: string | null;
  start?: string | null;
  end?: string | null;
  notes?: string | null;
  callsheetNotes?: string | null;
  callsheet_notes?: string | null;
  location?: string | null;
  crewAssignments?: CrewAssignmentLike[] | null;
  techniciansDetails?: CrewAssignmentLike[] | null;
  items?: ReservationItemLike[] | null;
}

export interface TemplateSourceBundle<Project extends ProjectLike = ProjectLike, Reservation extends ReservationLike = ReservationLike> {
  project: Project;
  reservations: Reservation[];
  primaryReservation: Reservation | null;
  clientDisplayName: string;
  locations: string[];
  projectNotes: string;
  callsheetNotes: string;
  shootDays: number;
  startDate: Date | null;
  endDate: Date | null;
}

export interface ExpensesAutofillRow {
  subgroupCode: string;
  description: string;
  rate: number;
  qty: number;
  days: number;
  paid: number;
  source: 'crew' | 'project-expense' | 'reservation-item';
}

export interface ExpensesAutofillData {
  meta: {
    client: string;
    projectTitle: string;
    budgetDate: string;
    preparedBy: string;
    locations: string;
    shootDays: string;
  };
  rows: ExpensesAutofillRow[];
}

export interface CallsheetAutofillData {
  projectTitle: string;
  client: string;
  date: string;
  notes: string;
  locations: string;
  callTime: string;
  readyToShoot: string;
  lunch: string;
  estWrap: string;
  headerRoles: {
    producer: string;
    director: string;
    dop: string;
    productionManager: string;
    assistantDirector: string;
  };
  crewRows: Array<{
    position: string;
    name: string;
    phone: string;
    time: string;
  }>;
}

interface BuildTemplateSourceBundleOptions<Project extends ProjectLike = ProjectLike, Reservation extends ReservationLike = ReservationLike> {
  project: Project;
  reservations?: Reservation[] | null;
}

function parseDateLike(value: unknown): Date | null {
  if (!value) return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function toPositiveNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeText(value: unknown): string {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeLookupText(value: unknown): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[._/-]+/g, ' ');
}

function uniq(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  values.forEach((value) => {
    if (!value || seen.has(value)) return;
    seen.add(value);
    out.push(value);
  });
  return out;
}

function formatIsoDate(value: Date | null): string {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return '';
  return value.toISOString().slice(0, 10);
}

function formatCallsheetDate(value: Date | null): string {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return '';
  return value.toLocaleDateString('en-GB');
}

function formatTime(value: Date | null): string {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return '';
  return value.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function resolveCallsheetNotes(project: ProjectLike, reservation: ReservationLike | null): string {
  return normalizeText(
    reservation?.callsheetNotes
    || reservation?.callsheet_notes
    || project?.callsheetNotes
    || project?.callsheet_notes
    || '',
  );
}

function computeShootDays(startDate: Date | null, endDate: Date | null): number {
  if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime())) return 1;
  if (!(endDate instanceof Date) || Number.isNaN(endDate.getTime())) return 1;
  const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const diffDays = Math.round((endDay.getTime() - startDay.getTime()) / 86400000);
  return Math.max(1, diffDays + 1);
}

function collectReservationCrewAssignments(reservation: ReservationLike | null): CrewAssignmentLike[] {
  if (!reservation) return [];
  if (Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length) return reservation.crewAssignments;
  if (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length) return reservation.techniciansDetails;
  return [];
}

function resolveCrewPositionLabel(assignment: CrewAssignmentLike): string {
  return normalizeText(
    assignment.positionLabel
    || assignment.positionLabelAr
    || assignment.positionLabelEn
    || assignment.positionName
    || assignment.position_name
    || assignment.position_label_ar
    || assignment.position_label_en
    || assignment.technicianRole
    || assignment.role,
  );
}

function resolveCrewPhone(assignment: CrewAssignmentLike): string {
  return normalizeText(
    assignment.technicianPhone
    || assignment.technician_phone
    || assignment.phone
    || assignment.phoneNumber
    || assignment.mobile
    || assignment.whatsapp,
  );
}

function classifyCrewSubgroup(positionLabel: string): string {
  return classifyExpenseTemplateCategory(positionLabel, '02-00');
}

function classifyExpenseSubgroup(labelValue: string): string {
  return classifyExpenseTemplateCategory(labelValue, '11-00');
}

function markAutofilled(element: Element | null): void {
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute('data-template-autofilled', '1');
}

function clearAutofillMarkers(root: ParentNode): void {
  Array.from(root.querySelectorAll('[data-template-autofilled="1"]')).forEach((element) => {
    element.removeAttribute('data-template-autofilled');
  });
}

function setEditableFieldText(root: ParentNode, selector: string, value: string): void {
  const element = root.querySelector(selector);
  if (!(element instanceof HTMLElement)) return;
  element.textContent = value || '';
  markAutofilled(element);
}

function createExpenseEditableCell(text = '', editable = true): HTMLTableCellElement {
  const cell = document.createElement('td');
  if (editable) {
    cell.setAttribute('data-editable', 'true');
    cell.setAttribute('contenteditable', 'true');
    cell.setAttribute('autocapitalize', 'off');
    cell.setAttribute('autocorrect', 'off');
    cell.setAttribute('autocomplete', 'off');
    cell.setAttribute('spellcheck', 'false');
  }
  cell.textContent = text;
  if (text) markAutofilled(cell);
  return cell;
}

function createExpenseFilledRow(row: ExpensesAutofillRow): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.setAttribute('data-row', 'item');
  tr.appendChild(createExpenseEditableCell(''));
  tr.appendChild(createExpenseEditableCell(row.description));
  tr.appendChild(createExpenseEditableCell(String(Math.round(row.rate))));
  tr.appendChild(createExpenseEditableCell(String(row.qty)));
  tr.appendChild(createExpenseEditableCell(String(row.days)));
  tr.appendChild(createExpenseEditableCell(row.paid ? String(row.paid) : '0'));
  const totalCell = document.createElement('td');
  totalCell.setAttribute('data-num', '1');
  totalCell.textContent = String(Math.round(row.rate * row.qty * row.days));
  markAutofilled(totalCell);
  tr.appendChild(totalCell);
  markAutofilled(tr);
  return tr;
}

function createBlankExpenseRow(): HTMLTableRowElement {
  const tr = document.createElement('tr');
  tr.setAttribute('data-row', 'item');
  for (let index = 0; index < 6; index += 1) {
    tr.appendChild(createExpenseEditableCell(''));
  }
  const totalCell = document.createElement('td');
  totalCell.setAttribute('data-num', '1');
  totalCell.textContent = '';
  tr.appendChild(totalCell);
  return tr;
}

function rebuildExpenseSubgroupRows(root: ParentNode, subgroupCode: string, rows: ExpensesAutofillRow[]): void {
  const headerRow = root.querySelector(`tr[data-subgroup-header][data-subgroup="${subgroupCode}"]`);
  if (!(headerRow instanceof HTMLTableRowElement)) return;
  const tbody = headerRow.parentElement;
  if (!(tbody instanceof HTMLTableSectionElement)) return;

  let subtotalRow: HTMLTableRowElement | null = null;
  let cursor = headerRow.nextElementSibling;
  while (cursor) {
    if (!(cursor instanceof HTMLTableRowElement)) {
      cursor = cursor.nextElementSibling;
      continue;
    }
    if (cursor.hasAttribute('data-subgroup-subtotal')) {
      subtotalRow = cursor;
      break;
    }
    const nextCursor = cursor.nextElementSibling;
    if (cursor.getAttribute('data-row') === 'item') {
      cursor.remove();
    }
    cursor = nextCursor;
  }
  if (!(subtotalRow instanceof HTMLTableRowElement)) return;

  rows.forEach((row) => {
    tbody.insertBefore(createExpenseFilledRow(row), subtotalRow);
  });
  tbody.insertBefore(createBlankExpenseRow(), subtotalRow);
}

function setRoleIfEmpty(element: Element | null, value: string): void {
  if (!(element instanceof HTMLElement) || !value) return;
  element.textContent = value;
  markAutofilled(element);
}

export function buildTemplateSourceBundle<Project extends ProjectLike = ProjectLike, Reservation extends ReservationLike = ReservationLike>(
  options: BuildTemplateSourceBundleOptions<Project, Reservation>,
): TemplateSourceBundle<Project, Reservation> {
  const project = options.project;
  const reservations = Array.isArray(options.reservations) ? options.reservations.filter(Boolean) : [];
  const primaryReservation = reservations[0] || null;
  const startDate = parseDateLike(primaryReservation?.start || project?.start || null);
  const endDate = parseDateLike(primaryReservation?.end || project?.end || null);
  const locations = uniq(
    reservations
      .map((reservation) => normalizeText(reservation?.location))
      .filter(Boolean),
  );

  return {
    project,
    reservations,
    primaryReservation,
    clientDisplayName: normalizeText(project?.clientCompany || project?.clientName || ''),
    locations,
    projectNotes: normalizeText(project?.description),
    callsheetNotes: resolveCallsheetNotes(project, primaryReservation),
    shootDays: computeShootDays(startDate, endDate),
    startDate,
    endDate,
  };
}

export function buildExpensesAutofillData(bundle: TemplateSourceBundle): ExpensesAutofillData {
  const reservation = bundle.primaryReservation;
  const shootDays = bundle.shootDays || 1;
  const rows: ExpensesAutofillRow[] = [];

  collectReservationCrewAssignments(reservation).forEach((assignment) => {
    const positionLabel = resolveCrewPositionLabel(assignment);
    const description = positionLabel;
    if (!description) return;

    rows.push({
      subgroupCode: classifyCrewSubgroup(positionLabel),
      description,
      rate: toPositiveNumber(assignment.positionCost ?? assignment.position_cost, 0),
      qty: 1,
      days: shootDays,
      paid: 0,
      source: 'crew',
    });
  });

  const projectExpenses = Array.isArray(bundle.project?.expenses) ? bundle.project.expenses : [];
  projectExpenses.forEach((expense) => {
    const label = normalizeText(expense?.label);
    if (!label) return;
    rows.push({
      subgroupCode: classifyExpenseSubgroup(label),
      description: label,
      rate: toPositiveNumber(expense?.amount, 0),
      qty: 1,
      days: 1,
      paid: 0,
      source: 'project-expense',
    });
  });

  const reservationItems = Array.isArray(reservation?.items) ? reservation.items : [];
  reservationItems.forEach((item) => {
    const description = normalizeText(item?.desc || item?.description);
    if (!description) return;
    const qty = toPositiveNumber(item?.qty ?? item?.quantity, 1);
    rows.push({
      subgroupCode: classifyExpenseSubgroup(description),
      description,
      rate: toPositiveNumber(item?.cost, 0),
      qty,
      days: shootDays,
      paid: 0,
      source: 'reservation-item',
    });
  });

  return {
    meta: {
      client: bundle.clientDisplayName,
      projectTitle: normalizeText(bundle.project?.title),
      budgetDate: formatIsoDate(bundle.startDate),
      preparedBy: '',
      locations: bundle.locations.join(', '),
      shootDays: String(bundle.shootDays || 1),
    },
    rows,
  };
}

export function buildCallsheetAutofillData(bundle: TemplateSourceBundle): CallsheetAutofillData {
  const reservation = bundle.primaryReservation;
  const headerRoles = {
    producer: '',
    director: '',
    dop: '',
    productionManager: '',
    assistantDirector: '',
  };
  const callTime = formatTime(bundle.startDate);
  const crewRows = collectReservationCrewAssignments(reservation).map((assignment) => {
    const position = resolveCrewPositionLabel(assignment);
    const lookup = normalizeLookupText(position);
    const name = normalizeText(assignment.technicianName);
    const phone = resolveCrewPhone(assignment);

    if (!headerRoles.producer && (lookup.includes('producer') || lookup.includes('منتج'))) {
      headerRoles.producer = name;
    }
    if (!headerRoles.assistantDirector && (lookup.includes('assistant director') || lookup.includes('مساعد مخرج'))) {
      headerRoles.assistantDirector = name;
    }
    if (!headerRoles.productionManager && (lookup.includes('production manager') || lookup.includes('مدير انتاج') || lookup.includes('مدير إنتاج'))) {
      headerRoles.productionManager = name;
    }
    if (!headerRoles.dop && (lookup.includes('dop') || lookup.includes('director of photography') || lookup.includes('مدير تصوير'))) {
      headerRoles.dop = name;
    }
    if (!headerRoles.director && ((lookup.includes('director') && !lookup.includes('assistant')) || (lookup.includes('مخرج') && !lookup.includes('مساعد')))) {
      headerRoles.director = name;
    }

    return {
      position,
      name,
      phone,
      time: callTime,
    };
  });

  return {
    projectTitle: normalizeText(bundle.project?.title),
    client: bundle.clientDisplayName,
    date: formatCallsheetDate(bundle.startDate),
    notes: bundle.callsheetNotes,
    locations: bundle.locations.join(', '),
    callTime,
    readyToShoot: callTime,
    lunch: '',
    estWrap: formatTime(bundle.endDate),
    headerRoles,
    crewRows,
  };
}

export function applyExpensesAutofill(root: ParentNode, data: ExpensesAutofillData): void {
  if (!(root instanceof HTMLElement) && !(root instanceof DocumentFragment) && !(root instanceof Document)) return;
  clearAutofillMarkers(root);
  const rootElement = root instanceof HTMLElement ? root : root.querySelector('#templates-a4-root');
  if (rootElement instanceof HTMLElement) {
    rootElement.setAttribute('data-template-autofill-state', 'fresh');
  }

  setEditableFieldText(root, '[data-expense-meta="client"] [contenteditable="true"]', data.meta.client);
  setEditableFieldText(root, '[data-expense-meta="projectTitle"] [contenteditable="true"]', data.meta.projectTitle);
  setEditableFieldText(root, '[data-expense-meta="budgetDate"] [contenteditable="true"]', data.meta.budgetDate);
  setEditableFieldText(root, '[data-expense-meta="preparedBy"] [contenteditable="true"]', data.meta.preparedBy);
  setEditableFieldText(root, '[data-expense-meta="locations"] [contenteditable="true"]', data.meta.locations);
  setEditableFieldText(root, '[data-expense-meta="shootDays"] [contenteditable="true"]', data.meta.shootDays);

  EXPENSE_TEMPLATE_SUBGROUP_CODES.forEach((subgroupCode) => {
    rebuildExpenseSubgroupRows(
      root,
      subgroupCode,
      data.rows.filter((row) => row.subgroupCode === subgroupCode),
    );
  });
}

export function applyCallsheetAutofill(root: ParentNode, data: CallsheetAutofillData): void {
  if (!(root instanceof HTMLElement) && !(root instanceof DocumentFragment) && !(root instanceof Document)) return;
  clearAutofillMarkers(root);
  const rootElement = root instanceof HTMLElement ? root : root.querySelector('#templates-a4-root');
  if (rootElement instanceof HTMLElement) {
    rootElement.setAttribute('data-template-autofill-state', 'fresh');
  }

  setEditableFieldText(root, '[data-callsheet-meta="projectTitle"]', data.projectTitle);
  setEditableFieldText(root, '[data-callsheet-meta="date"]', data.date);
  if (data.notes) {
    setEditableFieldText(root, '[data-callsheet-field="notes"]', data.notes);
  }
  setEditableFieldText(root, '[data-callsheet-field="locations"]', data.locations);
  setEditableFieldText(root, '[data-callsheet-field="client"]', data.client);
  setEditableFieldText(root, '[data-callsheet-field="callTime"]', data.callTime);
  setEditableFieldText(root, '[data-callsheet-field="readyToShoot"]', data.readyToShoot);
  setEditableFieldText(root, '[data-callsheet-field="lunch"]', data.lunch);
  setEditableFieldText(root, '[data-callsheet-field="estWrap"]', data.estWrap);

  setRoleIfEmpty(root.querySelector('[data-callsheet-role="producer"]'), data.headerRoles.producer);
  setRoleIfEmpty(root.querySelector('[data-callsheet-role="director"]'), data.headerRoles.director);
  setRoleIfEmpty(root.querySelector('[data-callsheet-role="dop"]'), data.headerRoles.dop);
  setRoleIfEmpty(root.querySelector('[data-callsheet-role="productionManager"]'), data.headerRoles.productionManager);
  setRoleIfEmpty(root.querySelector('[data-callsheet-role="assistantDirector"]'), data.headerRoles.assistantDirector);

  const crewTable = root.querySelector('table.cs-crew');
  const crewBody = crewTable?.querySelector('tbody');
  if (crewBody instanceof HTMLTableSectionElement) {
    const existingRows = Array.from(crewBody.querySelectorAll('tr'));
    data.crewRows.forEach((row, index) => {
      const tr = existingRows[index];
      if (!(tr instanceof HTMLTableRowElement)) return;
      const cells = Array.from(tr.children);
      if (cells[0]) {
        cells[0].textContent = row.position;
        markAutofilled(cells[0]);
      }
      if (cells[1]) {
        cells[1].textContent = row.name;
        markAutofilled(cells[1]);
      }
      if (cells[2]) {
        cells[2].textContent = row.phone;
        markAutofilled(cells[2]);
      }
      if (cells[3]) {
        cells[3].textContent = row.time;
        markAutofilled(cells[3]);
      }
      markAutofilled(tr);
    });
  }
}
