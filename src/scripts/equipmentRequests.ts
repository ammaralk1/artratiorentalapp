import '../styles/app.css';
import '../styles/equipment-requests.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, getCurrentUser, logout } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { getEquipmentImage } from './equipment/normalize.js';

applyStoredTheme();
initDashboardShell();
initThemeToggle();

type CurrentUser = {
  id: number | null;
  username: string;
  role: string | null;
} | null;

type RequestStatus = 'pending' | 'confirmed' | 'cancelled';
type ItemStatus = 'pending' | 'available' | 'unavailable';

interface EquipmentRequestListRow {
  id: number;
  request_code?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  status?: string;
  total_items?: number;
  created_at?: string;
  updated_at?: string;
  last_message_at?: string | null;
  messages_count?: number;
}

interface EquipmentRequestItem {
  id: number;
  name?: string;
  category?: string | null;
  subcategory?: string | null;
  qty?: number | string;
  item_status?: string | null;
  item_status_note?: string | null;
}

interface EquipmentRequestMessage {
  id: number;
  subject?: string | null;
  message?: string | null;
  channel?: string | null;
  delivery_status?: string | null;
  recipient?: string | null;
  created_at?: string | null;
}

interface EquipmentRequestRecord {
  id: number;
  request_code?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  status?: string;
  created_at?: string;
  notes?: string | null;
}

interface EquipmentRequestDetails {
  request?: EquipmentRequestRecord | null;
  items?: EquipmentRequestItem[];
  messages?: EquipmentRequestMessage[];
}

interface EquipmentRequestResponseMeta {
  status_email_attempted?: boolean;
  status_email_sent?: boolean;
  status_email_error?: string;
}

interface ItemUpdatePayload {
  id: number;
  status: ItemStatus;
  note: string;
}

interface CachedElements {
  logoutBtn: HTMLButtonElement | null;
  refreshBtn: HTMLButtonElement | null;
  searchInput: HTMLInputElement | null;
  statusFilter: HTMLSelectElement | null;
  applyFilterBtn: HTMLButtonElement | null;
  requestsBody: HTMLTableSectionElement | null;
  emptyState: HTMLElement | null;
  detailContent: HTMLElement | null;
  requestCode: HTMLElement | null;
  requestName: HTMLElement | null;
  requestPhone: HTMLElement | null;
  requestEmail: HTMLElement | null;
  requestDate: HTMLElement | null;
  requestNotes: HTMLElement | null;
  statusBadge: HTMLElement | null;
  statusButtons: HTMLButtonElement[];
  itemsBody: HTMLTableSectionElement | null;
  messageForm: HTMLFormElement | null;
  messageSubject: HTMLInputElement | null;
  messageBody: HTMLTextAreaElement | null;
  emailFailures: HTMLElement | null;
  messageLog: HTMLUListElement | null;
  statPending: HTMLElement | null;
  statConfirmed: HTMLElement | null;
  statCancelled: HTMLElement | null;
  statMessages: HTMLElement | null;
  queuePagination: HTMLElement | null;
  queuePaginationSummary: HTMLElement | null;
  queuePrevBtn: HTMLButtonElement | null;
  queueNextBtn: HTMLButtonElement | null;
  messagePagination: HTMLElement | null;
  messagePaginationSummary: HTMLElement | null;
  messagePrevBtn: HTMLButtonElement | null;
  messageNextBtn: HTMLButtonElement | null;
}

const REQUESTS_API = '/equipment-requests/admin.php';
const REQUESTS_PER_PAGE = 8;
const MESSAGES_PER_PAGE = 2;

const STATUS_META: Record<RequestStatus, { key: string; fallbackAr: string; fallbackEn: string; className: string }> = {
  pending: {
    key: 'equipmentRequests.status.pending',
    fallbackAr: 'بانتظار التأكيد',
    fallbackEn: 'Pending',
    className: 'equipment-request-status--pending',
  },
  confirmed: {
    key: 'equipmentRequests.status.confirmed',
    fallbackAr: 'مؤكد',
    fallbackEn: 'Confirmed',
    className: 'equipment-request-status--confirmed',
  },
  cancelled: {
    key: 'equipmentRequests.status.cancelled',
    fallbackAr: 'ملغي',
    fallbackEn: 'Cancelled',
    className: 'equipment-request-status--cancelled',
  },
};

const ITEM_STATUS_META: Record<ItemStatus, { key: string; fallbackAr: string; fallbackEn: string; className: string }> = {
  pending: {
    key: 'equipmentRequests.items.status.pending',
    fallbackAr: 'قيد المراجعة',
    fallbackEn: 'Pending Review',
    className: 'equipment-request-item-tag--pending',
  },
  available: {
    key: 'equipmentRequests.items.status.available',
    fallbackAr: 'متاح',
    fallbackEn: 'Available',
    className: 'equipment-request-item-tag--available',
  },
  unavailable: {
    key: 'equipmentRequests.items.status.unavailable',
    fallbackAr: 'غير متوفر',
    fallbackEn: 'Unavailable',
    className: 'equipment-request-item-tag--unavailable',
  },
};

const els: CachedElements = {
  logoutBtn: null,
  refreshBtn: null,
  searchInput: null,
  statusFilter: null,
  applyFilterBtn: null,
  requestsBody: null,
  emptyState: null,
  detailContent: null,
  requestCode: null,
  requestName: null,
  requestPhone: null,
  requestEmail: null,
  requestDate: null,
  requestNotes: null,
  statusBadge: null,
  statusButtons: [],
  itemsBody: null,
  messageForm: null,
  messageSubject: null,
  messageBody: null,
  emailFailures: null,
  messageLog: null,
  statPending: null,
  statConfirmed: null,
  statCancelled: null,
  statMessages: null,
  queuePagination: null,
  queuePaginationSummary: null,
  queuePrevBtn: null,
  queueNextBtn: null,
  messagePagination: null,
  messagePaginationSummary: null,
  messagePrevBtn: null,
  messageNextBtn: null,
};

let currentUser: CurrentUser = null;
let listState: EquipmentRequestListRow[] = [];
let selectedId = 0;
let selectedDetails: EquipmentRequestDetails | null = null;
let searchTimer: number | null = null;
let currentRequestPage = 1;
let currentMessagePage = 1;

function q<T extends Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDateTime(value: string | null | undefined): string {
  const raw = String(value || '').trim();
  if (!raw) return '—';

  const normalized = raw.includes('T') ? raw : raw.replace(' ', 'T');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return raw;

  try {
    return new Intl.DateTimeFormat(document.documentElement.lang || 'ar', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return raw;
  }
}

function normalizeRequestStatus(status: string | null | undefined): RequestStatus {
  const normalized = String(status || '').trim().toLowerCase();
  if (normalized === 'confirmed') return 'confirmed';
  if (normalized === 'cancelled') return 'cancelled';
  return 'pending';
}

function normalizeItemStatus(status: string | null | undefined): ItemStatus {
  const normalized = String(status || '').trim().toLowerCase();
  if (normalized === 'available') return 'available';
  if (normalized === 'unavailable') return 'unavailable';
  return 'pending';
}

function statusLabel(status: RequestStatus): string {
  const meta = STATUS_META[status];
  return t(meta.key, document.documentElement.lang === 'en' ? meta.fallbackEn : meta.fallbackAr);
}

function itemStatusLabel(status: ItemStatus): string {
  const meta = ITEM_STATUS_META[status];
  return t(meta.key, document.documentElement.lang === 'en' ? meta.fallbackEn : meta.fallbackAr);
}

function renderStatusBadge(status: RequestStatus): string {
  const meta = STATUS_META[status];
  return `<span class="equipment-request-status ${meta.className}">${escapeHtml(statusLabel(status))}</span>`;
}

function renderItemStatusTag(status: ItemStatus): string {
  const meta = ITEM_STATUS_META[status];
  return `<span class="equipment-request-item-tag ${meta.className}" data-item-tag>${escapeHtml(itemStatusLabel(status))}</span>`;
}

function renderItemStatusOptions(selectedStatus: ItemStatus): string {
  return (Object.keys(ITEM_STATUS_META) as ItemStatus[]).map((status) => {
    const selected = status === selectedStatus ? ' selected' : '';
    return `<option value="${status}"${selected}>${escapeHtml(itemStatusLabel(status))}</option>`;
  }).join('');
}

function renderEquipmentItemVisual(item: EquipmentRequestItem): string {
  const imageUrl = getEquipmentImage(item);
  const imageAlt = t('equipmentRequests.items.imageAlt', document.documentElement.lang === 'en' ? 'Equipment image' : 'صورة المعدة');
  const fallbackIcon = `
    <span class="equipment-request-item-thumb__fallback">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 7.5h16"></path>
        <path d="M6.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 17.5 6v1.5"></path>
        <path d="M5 7.5h14a1 1 0 0 1 1 1V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.5a1 1 0 0 1 1-1Z"></path>
        <path d="M9 12h6"></path>
        <path d="M12 9v6"></path>
      </svg>
    </span>
  `;

  if (imageUrl) {
    return `
      <span class="equipment-request-item-thumb has-image" aria-hidden="true">
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(imageAlt)}" loading="lazy" decoding="async" data-equipment-thumb-image>
        ${fallbackIcon}
      </span>
    `;
  }

  return `
    <span class="equipment-request-item-thumb is-fallback" aria-hidden="true">
      ${fallbackIcon}
    </span>
  `;
}

function bindEquipmentThumbFallbacks(): void {
  document.querySelectorAll<HTMLImageElement>('[data-equipment-thumb-image]').forEach((image) => {
    if (image.dataset.thumbBound === 'true') return;
    image.dataset.thumbBound = 'true';

    const markBroken = () => {
      image.classList.add('is-broken');
      image.closest('.equipment-request-item-thumb')?.classList.add('is-fallback');
    };

    image.addEventListener('error', markBroken, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      markBroken();
    }
  });
}

function isArabicUi(): boolean {
  return (document.documentElement.lang || 'ar').toLowerCase() !== 'en';
}

function messageChannelLabel(channel: string | null | undefined): string {
  const normalized = String(channel || '').trim().toLowerCase();
  if (normalized === 'email') {
    return t('equipmentRequests.messageLog.channel.email', 'إيميل');
  }
  if (normalized === 'system') {
    return t('equipmentRequests.messageLog.channel.system', 'النظام');
  }
  return normalized || '—';
}

function localizeStoredMessageSubject(subject: string | null | undefined): string {
  const value = String(subject || '').trim();
  if (!value) {
    return t('equipmentRequests.messageLog.noSubject', 'بدون عنوان');
  }

  if (/^status update$/i.test(value)) {
    return t('equipmentRequests.messageLog.subject.statusUpdate', 'تحديث الحالة');
  }

  return value;
}

function localizeStoredMessageBody(message: string | null | undefined): string {
  const value = String(message || '').trim();
  if (!value || !isArabicUi()) {
    return value;
  }

  const match = value.match(/^Status changed to "([^"]+)" by (.+?)\.(?: Note: (.*?))?(?: Item-level updates applied: (\d+) \(unavailable: (\d+)\)\.)?$/i);
  if (!match) {
    return value;
  }

  const [, rawStatus, actor, note = '', updatedCount = '', unavailableCount = ''] = match;
  const normalizedStatus = String(rawStatus || '').trim().toLowerCase();
  const statusLabel = normalizedStatus === 'confirmed'
    ? t('equipmentRequests.status.confirmed', 'مؤكد')
    : normalizedStatus === 'cancelled'
      ? t('equipmentRequests.status.cancelled', 'ملغي')
      : t('equipmentRequests.status.pending', 'بانتظار التأكيد');

  let result = `تم تغيير الحالة إلى "${statusLabel}" بواسطة ${actor}.`;
  if (note.trim()) {
    result += ` ملاحظة: ${note.trim()}`;
  }
  if (updatedCount && unavailableCount) {
    result += ` تم تطبيق تحديثات على العناصر: ${updatedCount} (غير متوفر: ${unavailableCount}).`;
  }
  return result;
}

type ControlSurfacePalette = {
  background: string;
  backgroundActive: string;
  border: string;
  borderActive: string;
  text: string;
};

function isDarkUi(): boolean {
  const root = document.documentElement;
  const body = document.body;
  return root.classList.contains('dark')
    || root.classList.contains('dark-mode')
    || body.classList.contains('dark')
    || body.classList.contains('dark-mode')
    || root.getAttribute('data-theme') === 'dark'
    || body.getAttribute('data-theme') === 'dark';
}

function getControlSurfacePalette(): ControlSurfacePalette {
  if (isDarkUi()) {
    return {
      background: 'rgba(20, 30, 24, 0.96)',
      backgroundActive: 'rgba(24, 36, 29, 0.98)',
      border: 'rgba(147, 168, 137, 0.2)',
      borderActive: 'rgba(147, 168, 137, 0.34)',
      text: '#e8efe5',
    };
  }

  return {
    background: '#f2f5ef',
    backgroundActive: '#edf2ec',
    border: 'rgba(42, 64, 48, 0.18)',
    borderActive: 'rgba(70, 104, 70, 0.3)',
    text: '#1f2f22',
  };
}

function paintControlSurface(
  element: HTMLElement,
  palette: ControlSurfacePalette,
  active = false,
): void {
  const background = active ? palette.backgroundActive : palette.background;
  const border = active ? palette.borderActive : palette.border;

  element.style.setProperty('background', background, 'important');
  element.style.setProperty('background-color', background, 'important');
  element.style.setProperty('background-image', 'none', 'important');
  element.style.setProperty('border-color', border, 'important');
  element.style.setProperty('box-shadow', 'none', 'important');
  element.style.setProperty('backdrop-filter', 'none', 'important');
  element.style.setProperty('-webkit-appearance', 'none', 'important');
  element.style.setProperty('appearance', 'none', 'important');
  element.style.setProperty('color', palette.text, 'important');
}

function bindControlSurface(element: HTMLElement, palette: ControlSurfacePalette): void {
  if (element.dataset.equipmentSurfaceBound === 'true') {
    paintControlSurface(element, palette, element === document.activeElement);
    return;
  }

  const applyBase = () => paintControlSurface(element, getControlSurfacePalette(), element === document.activeElement);
  const applyActive = () => paintControlSurface(element, getControlSurfacePalette(), true);

  element.addEventListener('focus', applyActive);
  element.addEventListener('blur', applyBase);
  element.addEventListener('mouseenter', applyActive);
  element.addEventListener('mouseleave', applyBase);
  element.dataset.equipmentSurfaceBound = 'true';
  applyBase();
}

function applyControlSurfaces(scope: ParentNode = document): void {
  const palette = getControlSurfacePalette();
  const controls = scope.querySelectorAll<HTMLElement>([
    '#equipment-requests-search',
    '#equipment-requests-status',
    '#equipment-requests-message-subject',
    '#equipment-requests-message-body',
    '.equipment-request-item-status',
    '.equipment-request-item-note',
    '.enhanced-select__trigger',
  ].join(', '));

  controls.forEach((element) => bindControlSurface(element, palette));
}

function cacheElements(): void {
  els.logoutBtn = q<HTMLButtonElement>('#logout-btn');
  els.refreshBtn = q<HTMLButtonElement>('#equipment-requests-refresh');
  els.searchInput = q<HTMLInputElement>('#equipment-requests-search');
  els.statusFilter = q<HTMLSelectElement>('#equipment-requests-status');
  els.applyFilterBtn = q<HTMLButtonElement>('#equipment-requests-apply-filter');
  els.requestsBody = q<HTMLTableSectionElement>('#equipment-requests-body');
  els.emptyState = q<HTMLElement>('#equipment-requests-empty-state');
  els.detailContent = q<HTMLElement>('#equipment-requests-detail-content');
  els.requestCode = q<HTMLElement>('#equipment-request-code');
  els.requestName = q<HTMLElement>('#equipment-request-name');
  els.requestPhone = q<HTMLElement>('#equipment-request-phone');
  els.requestEmail = q<HTMLElement>('#equipment-request-email');
  els.requestDate = q<HTMLElement>('#equipment-request-date');
  els.requestNotes = q<HTMLElement>('#equipment-request-notes');
  els.statusBadge = q<HTMLElement>('#equipment-requests-status-badge');
  els.statusButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-set-status]'));
  els.itemsBody = q<HTMLTableSectionElement>('#equipment-requests-items-body');
  els.messageForm = q<HTMLFormElement>('#equipment-requests-message-form');
  els.messageSubject = q<HTMLInputElement>('#equipment-requests-message-subject');
  els.messageBody = q<HTMLTextAreaElement>('#equipment-requests-message-body');
  els.emailFailures = q<HTMLElement>('#equipment-requests-email-failures');
  els.messageLog = q<HTMLUListElement>('#equipment-requests-message-log');
  els.statPending = q<HTMLElement>('#equipment-requests-stat-pending');
  els.statConfirmed = q<HTMLElement>('#equipment-requests-stat-confirmed');
  els.statCancelled = q<HTMLElement>('#equipment-requests-stat-cancelled');
  els.statMessages = q<HTMLElement>('#equipment-requests-stat-messages');
  els.queuePagination = q<HTMLElement>('#equipment-requests-queue-pagination');
  els.queuePaginationSummary = q<HTMLElement>('#equipment-requests-queue-pagination-summary');
  els.queuePrevBtn = q<HTMLButtonElement>('#equipment-requests-queue-prev');
  els.queueNextBtn = q<HTMLButtonElement>('#equipment-requests-queue-next');
  els.messagePagination = q<HTMLElement>('#equipment-requests-message-pagination');
  els.messagePaginationSummary = q<HTMLElement>('#equipment-requests-message-pagination-summary');
  els.messagePrevBtn = q<HTMLButtonElement>('#equipment-requests-message-prev');
  els.messageNextBtn = q<HTMLButtonElement>('#equipment-requests-message-next');
}

function updateRoleVisibility(): void {
  const role = String(currentUser?.role || '').toLowerCase();
  const isAdmin = role === 'admin';
  const isManager = isAdmin || role === 'manager';

  document.querySelectorAll<HTMLElement>('[data-admin-card]').forEach((element) => {
    element.classList.toggle('hidden', !isAdmin);
  });
  document.querySelectorAll<HTMLElement>('[data-manager-card]').forEach((element) => {
    element.classList.toggle('hidden', !isManager);
  });
}

function revealPage(): void {
  document.body.classList.remove('auth-pending');
}

function clampPage(page: number, totalPages: number): number {
  const safeTotal = Math.max(1, totalPages);
  return Math.min(Math.max(1, page), safeTotal);
}

function formatPaginationSummary(currentPage: number, totalPages: number, totalItems: number, singularAr: string, pluralAr: string, singularEn: string, pluralEn: string): string {
  const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  const current = normalizeNumbers(String(currentPage));
  const total = normalizeNumbers(String(totalPages));
  const items = normalizeNumbers(String(totalItems));

  if (lang === 'en') {
    const noun = totalItems === 1 ? singularEn : pluralEn;
    return `Page ${current} of ${total} • ${items} ${noun}`;
  }

  const noun = totalItems === 1 ? singularAr : pluralAr;
  return `الصفحة ${current} من ${total} • ${items} ${noun}`;
}

function renderStats(rows: EquipmentRequestListRow[]): void {
  const list = Array.isArray(rows) ? rows : [];
  const pending = list.filter((row) => normalizeRequestStatus(row.status) === 'pending').length;
  const confirmed = list.filter((row) => normalizeRequestStatus(row.status) === 'confirmed').length;
  const cancelled = list.filter((row) => normalizeRequestStatus(row.status) === 'cancelled').length;
  const messages = list.reduce((sum, row) => sum + Number(row.messages_count || 0), 0);

  if (els.statPending) els.statPending.textContent = normalizeNumbers(String(pending));
  if (els.statConfirmed) els.statConfirmed.textContent = normalizeNumbers(String(confirmed));
  if (els.statCancelled) els.statCancelled.textContent = normalizeNumbers(String(cancelled));
  if (els.statMessages) els.statMessages.textContent = normalizeNumbers(String(messages));
}

function renderRequests(rows: EquipmentRequestListRow[]): void {
  if (!els.requestsBody) return;

  const totalPages = Math.max(1, Math.ceil(rows.length / REQUESTS_PER_PAGE));
  currentRequestPage = clampPage(currentRequestPage, totalPages);

  if (!rows.length) {
    if (els.queuePagination) els.queuePagination.hidden = true;
    els.requestsBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-base-content/60">
          ${t('equipmentRequests.table.empty', 'لا توجد طلبات مطابقة.')}
        </td>
      </tr>
    `;
    return;
  }

  const startIndex = (currentRequestPage - 1) * REQUESTS_PER_PAGE;
  const pageRows = rows.slice(startIndex, startIndex + REQUESTS_PER_PAGE);

  if (els.queuePagination && els.queuePaginationSummary && els.queuePrevBtn && els.queueNextBtn) {
    els.queuePagination.hidden = rows.length <= REQUESTS_PER_PAGE;
    els.queuePaginationSummary.textContent = formatPaginationSummary(
      currentRequestPage,
      totalPages,
      rows.length,
      'طلب',
      'طلبات',
      'request',
      'requests',
    );
    els.queuePrevBtn.disabled = currentRequestPage <= 1;
    els.queueNextBtn.disabled = currentRequestPage >= totalPages;
  }

  els.requestsBody.innerHTML = pageRows.map((row) => {
    const id = Number(row.id || 0);
    const status = normalizeRequestStatus(row.status);
    const activeClass = id === selectedId ? 'is-active' : '';
    return `
      <tr class="${activeClass}" data-request-id="${id}">
        <td>${escapeHtml(row.request_code || '—')}</td>
        <td>
          <div class="font-semibold text-base-content">${escapeHtml(row.customer_name || '—')}</div>
          <div class="text-xs text-base-content/60" dir="ltr">${escapeHtml(row.customer_phone || '—')}</div>
        </td>
        <td>${renderStatusBadge(status)}</td>
        <td>${escapeHtml(formatDateTime(row.created_at))}</td>
      </tr>
    `;
  }).join('');

  els.requestsBody.querySelectorAll<HTMLTableRowElement>('[data-request-id]').forEach((row) => {
    row.addEventListener('click', () => {
      const id = Number(row.getAttribute('data-request-id') || 0);
      if (id > 0) {
        loadRequestDetails(id).catch((error: unknown) => {
          handleApiError(error, t('equipmentRequests.details.error', 'تعذر تحميل تفاصيل الطلب.'));
        });
      }
    });
  });
}

function renderRequestsError(message: string): void {
  if (!els.requestsBody) return;
  if (els.queuePagination) els.queuePagination.hidden = true;

  els.requestsBody.innerHTML = `
    <tr>
      <td colspan="4" class="text-center text-error">
        ${escapeHtml(message)}
      </td>
    </tr>
  `;
}

function renderItems(items: EquipmentRequestItem[]): void {
  if (!els.itemsBody) return;

  if (!items.length) {
    els.itemsBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-base-content/60">
          ${t('equipmentRequests.items.empty', 'لا توجد عناصر.')}
        </td>
      </tr>
    `;
    return;
  }

  els.itemsBody.innerHTML = items.map((item) => {
    const itemId = Number(item.id || 0);
    const status = normalizeItemStatus(item.item_status);
    const category = [item.category, item.subcategory].filter(Boolean).join(' • ') || '—';
    return `
      <tr data-item-id="${itemId}">
        <td>
          <div class="equipment-request-item-main">
            ${renderEquipmentItemVisual(item)}
            <span class="equipment-request-item-label">${escapeHtml(item.name || '—')}</span>
          </div>
        </td>
        <td>${escapeHtml(category)}</td>
        <td>${escapeHtml(String(item.qty || 1))}</td>
        <td>
          <div class="equipment-request-item-cell">
            ${renderItemStatusTag(status)}
            <select class="ui-select equipment-request-item-status" data-item-status-id="${itemId}">
              ${renderItemStatusOptions(status)}
            </select>
          </div>
        </td>
        <td>
          <input
            type="text"
            class="ui-input equipment-request-item-note"
            data-item-note-id="${itemId}"
            maxlength="500"
            placeholder="${escapeHtml(t('equipmentRequests.items.notePlaceholder', 'اكتب ملاحظة تُرسل للعميل لهذا العنصر (اختياري)'))}"
            value="${escapeHtml(String(item.item_status_note || '').trim())}"
          >
        </td>
      </tr>
    `;
  }).join('');

  bindEquipmentThumbFallbacks();
  applyControlSurfaces(els.itemsBody ?? document);
}

function renderMessages(messages: EquipmentRequestMessage[]): void {
  if (!els.messageLog || !els.emailFailures) return;

  if (!messages.length) {
    els.emailFailures.hidden = true;
    els.emailFailures.textContent = '';
    if (els.messagePagination) els.messagePagination.hidden = true;
    els.messageLog.innerHTML = `
      <li class="ui-empty-state surface-empty-state p-5">
        ${t('equipmentRequests.messageLog.empty', 'لا توجد رسائل بعد.')}
      </li>
    `;
    return;
  }

  const failedEmailMessages = messages.filter((message) => {
    return String(message.channel || '').toLowerCase() === 'email'
      && String(message.delivery_status || '').toLowerCase() === 'failed';
  });

  if (failedEmailMessages.length > 0) {
    els.emailFailures.hidden = false;
    els.emailFailures.textContent = t(
      'equipmentRequests.messageLog.failures',
      `يوجد ${failedEmailMessages.length} رسالة بريد فاشلة. يمكنك إعادة المحاولة من السجل أدناه.`,
    );
  } else {
    els.emailFailures.hidden = true;
    els.emailFailures.textContent = '';
  }

  const totalPages = Math.max(1, Math.ceil(messages.length / MESSAGES_PER_PAGE));
  currentMessagePage = clampPage(currentMessagePage, totalPages);
  const startIndex = (currentMessagePage - 1) * MESSAGES_PER_PAGE;
  const pageMessages = messages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);

  if (els.messagePagination && els.messagePaginationSummary && els.messagePrevBtn && els.messageNextBtn) {
    els.messagePagination.hidden = messages.length <= MESSAGES_PER_PAGE;
    els.messagePaginationSummary.textContent = formatPaginationSummary(
      currentMessagePage,
      totalPages,
      messages.length,
      'رسالة',
      'رسائل',
      'message',
      'messages',
    );
    els.messagePrevBtn.disabled = currentMessagePage <= 1;
    els.messageNextBtn.disabled = currentMessagePage >= totalPages;
  }

  els.messageLog.innerHTML = pageMessages.map((message) => {
    const messageId = Number(message.id || 0);
    const isFailedEmail = String(message.channel || '').toLowerCase() === 'email'
      && String(message.delivery_status || '').toLowerCase() === 'failed'
      && String(message.recipient || '').trim() !== ''
      && messageId > 0;
    const statusText = String(message.delivery_status || '').toLowerCase() === 'sent'
      ? t('equipmentRequests.messageLog.sent', 'تم الإرسال')
      : String(message.delivery_status || '').toLowerCase() === 'failed'
        ? t('equipmentRequests.messageLog.failed', 'فشل الإرسال')
        : t('equipmentRequests.messageLog.pending', 'بانتظار');
    return `
      <li>
        <div class="font-semibold text-base-content">${escapeHtml(localizeStoredMessageSubject(message.subject))}</div>
        <div class="mt-2 leading-7 text-base-content/80">${escapeHtml(localizeStoredMessageBody(message.message))}</div>
        <small class="mt-2 block text-base-content/60">
          ${escapeHtml(formatDateTime(message.created_at || ''))} |
          ${escapeHtml(messageChannelLabel(message.channel))} |
          ${escapeHtml(statusText)}
          ${message.recipient ? ` | ${escapeHtml(message.recipient)}` : ''}
        </small>
        ${isFailedEmail ? `
          <div class="equipment-requests-message-log__actions">
            <button type="button" class="ui-button ui-button--outline btn btn-outline btn-sm equipment-requests-retry-btn" data-retry-email-id="${messageId}">
              ${escapeHtml(t('equipmentRequests.messageLog.retry', 'إعادة المحاولة'))}
            </button>
          </div>
        ` : ''}
      </li>
    `;
  }).join('');

  els.messageLog.querySelectorAll<HTMLButtonElement>('[data-retry-email-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-retry-email-id') || 0);
      if (id > 0) {
        retryFailedEmail(id, button).catch((error: unknown) => {
          handleApiError(error, t('equipmentRequests.messageLog.retryError', 'فشلت إعادة الإرسال.'));
        });
      }
    });
  });
}

function renderDetailPlaceholder(): void {
  selectedDetails = null;
  currentMessagePage = 1;
  if (els.emptyState) els.emptyState.hidden = false;
  if (els.detailContent) els.detailContent.hidden = true;
  if (els.statusBadge) {
    els.statusBadge.className = 'badge badge-outline';
    els.statusBadge.textContent = '—';
  }
  if (els.itemsBody) {
    els.itemsBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-base-content/60">
          ${t('equipmentRequests.items.empty', 'لا توجد عناصر.')}
        </td>
      </tr>
    `;
  }
  if (els.messageLog) {
    els.messageLog.innerHTML = `
      <li class="ui-empty-state surface-empty-state p-5">
        ${t('equipmentRequests.messageLog.empty', 'لا توجد رسائل بعد.')}
      </li>
    `;
  }
  if (els.emailFailures) {
    els.emailFailures.hidden = true;
    els.emailFailures.textContent = '';
  }
  if (els.messagePagination) {
    els.messagePagination.hidden = true;
  }
  [els.requestCode, els.requestName, els.requestPhone, els.requestEmail, els.requestDate, els.requestNotes].forEach((element) => {
    if (element) element.textContent = '—';
  });
  if (els.messageSubject) els.messageSubject.value = '';
  if (els.messageBody) els.messageBody.value = '';
}

function renderDetails(details: EquipmentRequestDetails | null): void {
  const request = details?.request || null;
  if (!request) {
    renderDetailPlaceholder();
    return;
  }

  selectedDetails = details;
  if (els.emptyState) els.emptyState.hidden = true;
  if (els.detailContent) els.detailContent.hidden = false;

  const normalizedStatus = normalizeRequestStatus(request.status);
  if (els.requestCode) els.requestCode.textContent = request.request_code || '—';
  if (els.requestName) els.requestName.textContent = request.customer_name || '—';
  if (els.requestPhone) els.requestPhone.textContent = request.customer_phone || '—';
  if (els.requestEmail) els.requestEmail.textContent = request.customer_email || '—';
  if (els.requestDate) els.requestDate.textContent = formatDateTime(request.created_at);
  if (els.requestNotes) els.requestNotes.textContent = request.notes || '—';
  if (els.statusBadge) {
    els.statusBadge.className = `badge ${STATUS_META[normalizedStatus].className}`;
    els.statusBadge.textContent = statusLabel(normalizedStatus);
  }

  renderItems(Array.isArray(details?.items) ? details.items : []);
  renderMessages(Array.isArray(details?.messages) ? details.messages : []);

  const defaultSubject = t('equipmentRequests.message.defaultSubject', 'تحديث بخصوص طلبك') + ` ${request.request_code || ''}`.trim();
  if (els.messageSubject && !els.messageSubject.value) {
    els.messageSubject.value = defaultSubject.trim();
  }

  applyControlSurfaces();
}

function collectItemUpdates(): ItemUpdatePayload[] {
  if (!els.itemsBody) return [];

  const rows = Array.from(els.itemsBody.querySelectorAll<HTMLTableRowElement>('tr[data-item-id]'));
  return rows.map((row) => {
    const id = Number(row.getAttribute('data-item-id') || 0);
    if (id <= 0) return null;
    const statusInput = row.querySelector<HTMLSelectElement>('[data-item-status-id]');
    const noteInput = row.querySelector<HTMLInputElement>('[data-item-note-id]');
    return {
      id,
      status: normalizeItemStatus(statusInput?.value),
      note: String(noteInput?.value || '').trim(),
    };
  }).filter((item): item is ItemUpdatePayload => Boolean(item));
}

function askStatusNote(status: RequestStatus): { cancelled: boolean; note: string } {
  const message = [
    t('equipmentRequests.prompt.title', 'ملاحظة للعميل بخصوص الحالة'),
    `"${statusLabel(status)}"`,
    t('equipmentRequests.prompt.hint', 'مثال: بعض المعدات غير متوفرة وسنقترح بدائل.'),
    t('equipmentRequests.prompt.cancel', 'اضغط "إلغاء" للتراجع عن تغيير الحالة.'),
  ].join('\n');

  const value = window.prompt(message, '');
  if (value === null) {
    return { cancelled: true, note: '' };
  }

  return { cancelled: false, note: String(value || '').trim() };
}

function handleApiError(error: unknown, fallbackMessage: string): void {
  const message = error instanceof ApiError
    ? error.message
    : fallbackMessage;
  showToast(message, 'error');
}

async function loadRequests({ preserveSelection = true }: { preserveSelection?: boolean } = {}): Promise<void> {
  if (!els.requestsBody) return;

  els.requestsBody.innerHTML = `
    <tr>
      <td colspan="4" class="text-center text-base-content/60">
        ${t('equipmentRequests.table.loading', '⏳ جارٍ تحميل الطلبات...')}
      </td>
    </tr>
  `;

  const params = new URLSearchParams();
  const search = String(els.searchInput?.value || '').trim();
  const status = String(els.statusFilter?.value || '').trim();
  params.set('limit', '100');
  if (search) params.set('search', search);
  if (status) params.set('status', status);

  try {
    const response = await apiRequest(`${REQUESTS_API}?${params.toString()}`);
    listState = Array.isArray(response?.data) ? response.data as EquipmentRequestListRow[] : [];

    if (!preserveSelection) {
      currentRequestPage = 1;
      selectedId = 0;
      renderStats(listState);
      renderRequests(listState);
      renderDetailPlaceholder();
      return;
    }

    if (selectedId > 0) {
      const selectedIndex = listState.findIndex((row) => Number(row.id) === Number(selectedId));
      const exists = selectedIndex >= 0;
      if (exists) {
        currentRequestPage = Math.floor(selectedIndex / REQUESTS_PER_PAGE) + 1;
        renderStats(listState);
        renderRequests(listState);
        await loadRequestDetails(selectedId);
        return;
      }
    }

    if (listState.length > 0) {
      currentRequestPage = 1;
      renderStats(listState);
      renderRequests(listState);
      await loadRequestDetails(Number(listState[0].id));
    } else {
      renderStats(listState);
      renderRequests(listState);
      selectedId = 0;
      renderDetailPlaceholder();
    }
  } catch (error) {
    renderStats([]);
    renderRequestsError(
      error instanceof ApiError
        ? error.message
        : t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'),
    );
    renderDetailPlaceholder();
    handleApiError(error, t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'));
  }
}

async function loadRequestDetails(id: number): Promise<void> {
  const numericId = Number(id || 0);
  if (numericId <= 0) {
    renderDetailPlaceholder();
    return;
  }

  if (numericId !== selectedId) {
    currentMessagePage = 1;
  }

  const response = await apiRequest(`${REQUESTS_API}?id=${encodeURIComponent(String(numericId))}`);
  selectedId = numericId;
  renderRequests(listState);
  renderDetails((response?.data || null) as EquipmentRequestDetails | null);
}

async function updateStatus(status: RequestStatus, statusNote: string, itemUpdates: ItemUpdatePayload[]): Promise<void> {
  if (selectedId <= 0) {
    showToast(t('equipmentRequests.errors.selectFirst', 'اختر طلبًا أولاً.'), 'error');
    return;
  }

  const response = await apiRequest(REQUESTS_API, {
    method: 'PATCH',
    body: {
      id: selectedId,
      status,
      status_note: statusNote,
      item_updates: itemUpdates,
    },
  });

  const meta = (response?.meta || {}) as EquipmentRequestResponseMeta;
  if (meta.status_email_attempted && meta.status_email_sent) {
    showToast(t('equipmentRequests.toast.statusUpdatedAndSent', 'تم تحديث الحالة وإرسال البريد للعميل.'), 'success');
  } else if (meta.status_email_attempted && !meta.status_email_sent) {
    const reason = String(meta.status_email_error || '').trim();
    showToast(
      reason
        ? `${t('equipmentRequests.toast.statusUpdatedEmailFailed', 'تم تحديث الحالة لكن فشل إرسال البريد')}: ${reason}`
        : t('equipmentRequests.toast.statusUpdatedEmailFailed', 'تم تحديث الحالة لكن فشل إرسال البريد'),
      'error',
    );
  } else {
    showToast(t('equipmentRequests.toast.statusUpdated', 'تم تحديث الحالة.'), 'success');
  }

  await loadRequests({ preserveSelection: true });
}

async function sendMessage(): Promise<void> {
  if (selectedId <= 0) {
    showToast(t('equipmentRequests.errors.selectFirst', 'اختر طلبًا أولاً.'), 'error');
    return;
  }

  const subject = String(els.messageSubject?.value || '').trim();
  const message = String(els.messageBody?.value || '').trim();
  if (!message) {
    showToast(t('equipmentRequests.message.required', 'اكتب الرسالة أولاً.'), 'error');
    return;
  }

  const response = await apiRequest(REQUESTS_API, {
    method: 'POST',
    body: {
      action: 'send_message',
      id: selectedId,
      subject,
      message,
    },
  });

  const data = response?.data as { sent?: boolean; details?: EquipmentRequestDetails } | undefined;
  if (data?.sent) {
    showToast(t('equipmentRequests.toast.messageSent', 'تم إرسال الرسالة للعميل.'), 'success');
    if (els.messageBody) els.messageBody.value = '';
    currentMessagePage = 1;
  } else {
    showToast(t('equipmentRequests.toast.messageStoredOnly', 'تم حفظ الرسالة لكن فشل الإرسال.'), 'error');
  }

  if (data?.details) {
    renderDetails(data.details);
  } else {
    await loadRequestDetails(selectedId);
  }
}

async function retryFailedEmail(messageId: number, button: HTMLButtonElement): Promise<void> {
  if (selectedId <= 0) {
    showToast(t('equipmentRequests.errors.selectFirst', 'اختر طلبًا أولاً.'), 'error');
    return;
  }

  button.disabled = true;

  try {
    const response = await apiRequest(REQUESTS_API, {
      method: 'POST',
      body: {
        action: 'retry_email',
        id: selectedId,
        message_id: messageId,
      },
    });
    const data = response?.data as { sent?: boolean; details?: EquipmentRequestDetails; error?: string } | undefined;
    if (data?.sent) {
      showToast(t('equipmentRequests.toast.retrySent', 'تمت إعادة إرسال البريد بنجاح.'), 'success');
    } else {
      const reason = String(data?.error || '').trim();
      showToast(
        reason
          ? `${t('equipmentRequests.toast.retryFailed', 'فشلت إعادة الإرسال')}: ${reason}`
          : t('equipmentRequests.toast.retryFailed', 'فشلت إعادة الإرسال'),
        'error',
      );
    }

    if (data?.details) {
      renderDetails(data.details);
    } else {
      await loadRequestDetails(selectedId);
    }
  } finally {
    button.disabled = false;
  }
}

function bindEvents(): void {
  els.logoutBtn?.addEventListener('click', () => {
    logout().catch(() => {
      window.location.href = 'login.html';
    });
  });

  els.refreshBtn?.addEventListener('click', () => {
    loadRequests({ preserveSelection: true }).then(() => {
      showToast(t('equipmentRequests.toast.refreshed', 'تم تحديث البيانات.'), 'success');
    }).catch((error: unknown) => {
      handleApiError(error, t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'));
    });
  });

  els.applyFilterBtn?.addEventListener('click', () => {
    loadRequests({ preserveSelection: false }).catch((error: unknown) => {
      handleApiError(error, t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'));
    });
  });

  els.queuePrevBtn?.addEventListener('click', () => {
    currentRequestPage = Math.max(1, currentRequestPage - 1);
    renderRequests(listState);
  });

  els.queueNextBtn?.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(listState.length / REQUESTS_PER_PAGE));
    currentRequestPage = Math.min(totalPages, currentRequestPage + 1);
    renderRequests(listState);
  });

  els.statusFilter?.addEventListener('change', () => {
    loadRequests({ preserveSelection: false }).catch((error: unknown) => {
      handleApiError(error, t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'));
    });
  });

  els.searchInput?.addEventListener('input', () => {
    if (searchTimer) window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      loadRequests({ preserveSelection: false }).catch((error: unknown) => {
        handleApiError(error, t('equipmentRequests.table.error', 'تعذر تحميل الطلبات.'));
      });
    }, 300);
  });

  els.statusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const requestedStatus = normalizeRequestStatus(button.getAttribute('data-set-status'));
      const promptResult = askStatusNote(requestedStatus);
      if (promptResult.cancelled) return;
      updateStatus(requestedStatus, promptResult.note, collectItemUpdates()).catch((error: unknown) => {
        handleApiError(error, t('equipmentRequests.toast.statusUpdateError', 'تعذر تحديث الحالة.'));
      });
    });
  });

  els.messageForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    sendMessage().catch((error: unknown) => {
      handleApiError(error, t('equipmentRequests.toast.messageError', 'تعذر إرسال الرسالة.'));
    });
  });

  els.messagePrevBtn?.addEventListener('click', () => {
    currentMessagePage = Math.max(1, currentMessagePage - 1);
    const messages = Array.isArray(selectedDetails?.messages) ? selectedDetails.messages : [];
    renderMessages(messages);
  });

  els.messageNextBtn?.addEventListener('click', () => {
    const messages = Array.isArray(selectedDetails?.messages) ? selectedDetails.messages : [];
    const totalPages = Math.max(1, Math.ceil(messages.length / MESSAGES_PER_PAGE));
    currentMessagePage = Math.min(totalPages, currentMessagePage + 1);
    renderMessages(messages);
  });

  document.addEventListener('theme:changed', () => {
    applyControlSurfaces();
  });
}

async function bootstrap(): Promise<void> {
  cacheElements();
  bindEvents();
  renderDetailPlaceholder();
  applyControlSurfaces();

  try {
    currentUser = await checkAuth({ redirect: false });
    if (!currentUser) {
      currentUser = await getCurrentUser({ refresh: true });
    }
  } catch {
    currentUser = null;
  }

  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const role = String(currentUser.role || '').toLowerCase();
  if (role !== 'admin' && role !== 'manager') {
    window.location.href = 'home.html';
    return;
  }

  updateRoleVisibility();
  revealPage();
  await loadRequests({ preserveSelection: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    bootstrap().catch((error: unknown) => {
      console.error('Failed to bootstrap equipment requests page', error);
    });
  }, { once: true });
} else {
  bootstrap().catch((error: unknown) => {
    console.error('Failed to bootstrap equipment requests page', error);
  });
}
