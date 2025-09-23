import { loadData, saveData } from './storage.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';
import { syncEquipmentStatuses, renderEquipment } from './equipment.js';
import { t } from './language.js';

let maintenanceTickets = [];
let maintenanceInitialized = false;
let equipmentOptions = [];
let currentSelection = null;

function getDefaultSelectionText() {
  return t('maintenance.form.selectedInfo', 'لم يتم اختيار معدة بعد.');
}

function normalizeBarcodeValue(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function loadTickets() {
  const { maintenance = [] } = loadData();
  maintenanceTickets = Array.isArray(maintenance) ? maintenance : [];
  return maintenanceTickets;
}

function saveTickets(tickets) {
  maintenanceTickets = tickets;
  try {
    localStorage.setItem('maintenanceList', JSON.stringify(tickets));
  } catch (error) {
    console.warn('⚠️ [maintenance] Failed to persist maintenance tickets', error);
    showToast(t('maintenance.toast.storageError', '⚠️ تعذر حفظ بيانات الصيانة. يرجى المحاولة مجدداً.'));
  }
}

function getEquipmentOptions() {
  const { equipment = [] } = loadData();
  const fallbackName = t('maintenance.table.noName', 'بدون اسم');
  equipmentOptions = (equipment || []).map((item) => ({
    barcode: normalizeBarcodeValue(item?.barcode),
    desc: item?.desc || item?.description || item?.name || fallbackName,
    status: item?.status || 'متاح',
    price: Number(item?.price) || 0,
    category: item?.category || ''
  }));

  equipmentOptions.sort((a, b) => a.desc.localeCompare(b.desc, 'ar', { sensitivity: 'base' }));
  return equipmentOptions;
}

function getOpenTicketsSet() {
  return new Set(loadTickets()
    .filter((ticket) => ticket.status === 'open')
    .map((ticket) => normalizeBarcodeValue(ticket.equipmentBarcode)));
}

function findEquipmentOptionByBarcode(barcode) {
  const normalized = normalizeBarcodeValue(barcode);
  if (!normalized) return null;
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  return options.find((option) => option.barcode === normalized) || null;
}

function findEquipmentOptionByDescription(term) {
  const normalized = normalizeText(term);
  if (!normalized) return null;
  const options = equipmentOptions.length ? equipmentOptions : getEquipmentOptions();
  return options.find((option) => normalizeText(option.desc).includes(normalized)) || null;
}

function isOptionBlocked(option) {
  if (!option) return true;
  const openSet = getOpenTicketsSet();
  return option.status === 'صيانة' || openSet.has(option.barcode);
}

function clearSelectedEquipment({ keepInputs = false, silent = false } = {}) {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');
  const info = document.getElementById('maintenance-selected-info');

  if (hidden) hidden.value = '';
  if (!keepInputs) {
    if (barcodeInput) barcodeInput.value = '';
    if (searchInput) searchInput.value = '';
  }

  if (info) {
    info.textContent = getDefaultSelectionText();
  }

  if (!silent) {
    // no toast by default here; callers can handle
  }

  currentSelection = null;
}

function updateSelectedInfo(option) {
  const info = document.getElementById('maintenance-selected-info');
  if (!info) return;
  const barcodeLabel = t('maintenance.info.barcodeLabel', 'باركود');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  info.innerHTML = `
    <strong>${option.desc}</strong><br>
    <span class="text-muted">${barcodeLabel}: ${option.barcode || notAvailable}</span>
  `;
}

function selectEquipment(option, { silent = false } = {}) {
  if (!option) return false;
  if (isOptionBlocked(option)) {
    if (!silent) {
      showToast(t('maintenance.toast.equipmentBlocked', '⚠️ هذه المعدة قيد الصيانة ولا يمكن اختيارها حالياً'));
    }
    return false;
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  if (hidden) hidden.value = option.barcode;
  if (barcodeInput) barcodeInput.value = option.barcode;
  if (searchInput) searchInput.value = option.desc;
  updateSelectedInfo(option);
  currentSelection = option;
  return true;
}

function selectEquipmentByBarcode(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByBarcode(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundBarcode', '❌ لم يتم العثور على معدة بهذا الباركود'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

function selectEquipmentByDescription(value, { showFeedback = true } = {}) {
  const option = findEquipmentOptionByDescription(value);
  if (!option) {
    if (showFeedback) showToast(t('maintenance.toast.equipmentNotFoundName', '❌ لم يتم العثور على معدة بالاسم المدخل'));
    return false;
  }
  return selectEquipment(option, { silent: !showFeedback });
}

function populateEquipmentInputs() {
  const datalist = document.getElementById('maintenance-equipment-options');
  const barcodeInput = document.getElementById('maintenance-equipment-barcode');
  const searchInput = document.getElementById('maintenance-equipment-search');

  const options = getEquipmentOptions();
  const openSet = getOpenTicketsSet();

  if (datalist) {
    const blockedSuffix = t('maintenance.form.blockedSuffix', '(صيانة)');
    datalist.innerHTML = options
      .map((option) => {
        const blocked = option.status === 'صيانة' || openSet.has(option.barcode);
        const label = blocked ? `${option.desc} ${blockedSuffix}` : option.desc;
        const value = option.desc.replace(/"/g, '&quot;');
        const labelAttr = label.replace(/"/g, '&quot;');
        return `<option value="${value}" label="${labelAttr}"></option>`;
      })
      .join('');
  }

  const hidden = document.getElementById('maintenance-selected-barcode');
  if (hidden && hidden.value) {
    const current = findEquipmentOptionByBarcode(hidden.value);
    if (!current || isOptionBlocked(current)) {
      clearSelectedEquipment({ keepInputs: true, silent: true });
      if (current && isOptionBlocked(current)) {
        showToast(t('maintenance.toast.equipmentBecameBlocked', '⚠️ هذه المعدة أصبحت قيد الصيانة ولا يمكن اختيارها'));
      }
    } else {
      selectEquipment(current, { silent: true });
    }
  } else {
    clearSelectedEquipment({ keepInputs: true, silent: true });
  }

  if (barcodeInput && !barcodeInput.dataset.listenerAttached) {
    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!selectEquipmentByBarcode(barcodeInput.value)) {
          clearSelectedEquipment({ keepInputs: true, silent: true });
        }
      }
    });
    barcodeInput.dataset.listenerAttached = 'true';
  }

  if (searchInput && !searchInput.dataset.listenerAttached) {
    const handleSelection = () => {
      if (!searchInput.value) {
        clearSelectedEquipment({ keepInputs: true, silent: true });
        return;
      }
      if (!selectEquipmentByDescription(searchInput.value)) {
        clearSelectedEquipment({ keepInputs: true, silent: true });
      }
    };

    searchInput.addEventListener('change', handleSelection);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSelection();
      }
    });
    searchInput.dataset.listenerAttached = 'true';
  }
}

function updateEquipmentStatus(barcode, status) {
  const normalized = normalizeBarcodeValue(barcode);
  const { equipment = [] } = loadData();
  const updatedEquipment = (equipment || []).map((item) => {
    const itemCode = normalizeBarcodeValue(item?.barcode);
    if (itemCode === normalized) {
      return { ...item, status };
    }
    return item;
  });
  saveData({ equipment: updatedEquipment });
  syncEquipmentStatuses();
  renderEquipment();
  populateEquipmentInputs();
}

function renderStats(tickets) {
  const container = document.getElementById('maintenance-stats');
  if (!container) return;

  const total = maintenanceTickets.length;
  const open = maintenanceTickets.filter((ticket) => ticket.status === 'open').length;
  const closed = total - open;
  const formatCount = (value) => normalizeNumbers(String(value));
  const openHtml = t('maintenance.stats.open', '{count} قيد الصيانة').replace('{count}', `<strong>${formatCount(open)}</strong>`);
  const closedHtml = t('maintenance.stats.closed', '{count} مغلقة').replace('{count}', `<strong>${formatCount(closed)}</strong>`);
  const totalHtml = t('maintenance.stats.total', '{count} إجمالي التذاكر').replace('{count}', `<strong>${formatCount(total)}</strong>`);

  container.innerHTML = `
    <span class="maintenance-stat">${openHtml}</span>
    <span class="maintenance-stat">${closedHtml}</span>
    <span class="maintenance-stat">${totalHtml}</span>
  `;
}

function renderTable(tickets) {
  const tbody = document.getElementById('maintenance-table-body');
  const emptyState = document.getElementById('maintenance-empty-state');
  if (!tbody) return;

  if (!tickets || tickets.length === 0) {
    const emptyMessage = t('maintenance.table.emptyFiltered', 'لا توجد تذاكر ضمن هذا الفلتر.');
    tbody.innerHTML = `<tr><td colspan="6" class="text-muted text-center">${emptyMessage}</td></tr>`;
    if (emptyState) emptyState.classList.add('active');
    return;
  }

  if (emptyState) emptyState.classList.remove('active');

  tbody.innerHTML = tickets
    .map((ticket) => {
      const statusOpen = t('maintenance.status.open', 'قيد الصيانة');
      const statusClosed = t('maintenance.status.closed', 'مغلقة');
      const statusBadge = ticket.status === 'open'
        ? `<span class="badge bg-warning text-dark">${statusOpen}</span>`
        : `<span class="badge bg-success">${statusClosed}</span>`;

      const priorityBadge = (() => {
        const high = t('maintenance.priority.high', 'مرتفعة');
        const medium = t('maintenance.priority.medium', 'متوسطة');
        const low = t('maintenance.priority.low', 'منخفضة');
        switch (ticket.priority) {
          case 'high':
            return `<span class="badge bg-danger">${high}</span>`;
          case 'low':
            return `<span class="badge bg-secondary">${low}</span>`;
          default:
            return `<span class="badge bg-info text-dark">${medium}</span>`;
        }
      })();

      const actionButtons = [];
      const closeLabel = t('maintenance.actions.close', '🔧 إغلاق بعد الإصلاح');
      const viewLabel = t('maintenance.actions.view', '👁️ عرض التقرير');
      const deleteLabel = t('maintenance.actions.delete', '🗑️ حذف التذكرة');
      if (ticket.status === 'open') {
        actionButtons.push(`<button class="btn btn-sm btn-success" data-action="close" data-id="${ticket.id}">${closeLabel}</button>`);
      } else {
        actionButtons.push(`<button class="btn btn-sm btn-warning" data-action="view" data-id="${ticket.id}">${viewLabel}</button>`);
      }
      actionButtons.push(`<button class="btn btn-sm btn-danger" data-action="delete" data-id="${ticket.id}">${deleteLabel}</button>`);

      const actions = actionButtons.join('');
      const noBarcode = t('maintenance.table.noBarcode', 'بدون باركود');
      const issuePlaceholder = t('maintenance.report.none', '—');
      const barcodeDisplay = ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : noBarcode;
      const issueDisplay = ticket.issue ? normalizeNumbers(ticket.issue) : issuePlaceholder;
      const createdDisplay = ticket.createdAt ? normalizeNumbers(formatDateTime(ticket.createdAt)) : '—';

      return `
        <tr>
          <td>
            <strong>${ticket.equipmentDesc}</strong><br>
            <small class="text-muted">${barcodeDisplay}</small>
          </td>
          <td class="maintenance-issue-text">${issueDisplay}</td>
          <td>${priorityBadge}</td>
          <td>${createdDisplay}</td>
          <td>${statusBadge}</td>
          <td class="table-actions-cell">
            <div class="table-action-buttons">
              ${actions}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function handleTableActions(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const action = button.getAttribute('data-action');
  const id = Number(button.getAttribute('data-id'));
  if (!id) return;

  if (action === 'close') {
    closeTicket(id);
  } else if (action === 'view') {
    viewTicketReport(id);
  } else if (action === 'delete') {
    deleteTicket(id);
  }
}

function closeTicket(id) {
  const tickets = loadTickets();
  const index = tickets.findIndex((ticket) => Number(ticket.id) === Number(id));
  if (index === -1) return;

  const report = prompt(t('maintenance.prompt.closeReport', 'أدخل تقرير الإصلاح / الإجراءات المتخذة:'));
  if (report === null) return;

  const ticket = { ...tickets[index] };
  ticket.status = 'closed';
  ticket.resolutionReport = report.trim();
  ticket.resolvedAt = new Date().toISOString();
  tickets[index] = ticket;

  saveTickets(tickets);
  updateEquipmentStatus(ticket.equipmentBarcode, 'متاح');
  showToast(t('maintenance.toast.ticketClosed', '✅ تم إغلاق تذكرة الصيانة وإعادة المعدة إلى الحالة المتاحة'));
  renderMaintenance();
}

function viewTicketReport(id) {
  const tickets = loadTickets();
  const ticket = tickets.find((t) => Number(t.id) === Number(id));
  if (!ticket) return;

  const equipmentLabel = t('maintenance.report.equipment', 'المعدة');
  const barcodeLabel = t('maintenance.report.barcode', 'الباركود');
  const issueLabel = t('maintenance.report.issue', 'الوصف');
  const createdLabel = t('maintenance.report.createdAt', 'تاريخ الإنشاء');
  const closedLabel = t('maintenance.report.closedAt', 'تاريخ الإغلاق');
  const summaryLabel = t('maintenance.report.summary', 'التقرير');
  const notAvailable = t('maintenance.report.notAvailable', 'غير متوفر');
  const none = t('maintenance.report.none', '—');

  const details = [
    `${equipmentLabel}: ${ticket.equipmentDesc}`,
    `${barcodeLabel}: ${ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : notAvailable}`,
    `${issueLabel}: ${ticket.issue ? normalizeNumbers(ticket.issue) : none}`,
    `${createdLabel}: ${ticket.createdAt ? normalizeNumbers(formatDateTime(ticket.createdAt)) : none}`,
    `${closedLabel}: ${ticket.resolvedAt ? normalizeNumbers(formatDateTime(ticket.resolvedAt)) : none}`,
    `${summaryLabel}: ${ticket.resolutionReport ? normalizeNumbers(ticket.resolutionReport) : none}`
  ].join('\n');

  alert(details);
}

function deleteTicket(id) {
  const tickets = loadTickets();
  const index = tickets.findIndex((ticket) => Number(ticket.id) === Number(id));
  if (index === -1) return;

  const ticket = tickets[index];
  if (!confirm(t('maintenance.toast.ticketDeleteConfirm', '⚠️ هل أنت متأكد من حذف تذكرة الصيانة؟'))) return;

  tickets.splice(index, 1);
  saveTickets(tickets);

  if (ticket.status === 'open') {
    updateEquipmentStatus(ticket.equipmentBarcode, 'متاح');
  }

  showToast(t('maintenance.toast.ticketDeleted', '🗑️ تم حذف تذكرة الصيانة'));
  renderMaintenance();
}

function handleFormSubmit(event) {
  event.preventDefault();

  try {
    const barcodeInput = document.getElementById('maintenance-equipment-barcode');
    const searchInput = document.getElementById('maintenance-equipment-search');
    const hidden = document.getElementById('maintenance-selected-barcode');
    const issueInput = document.getElementById('maintenance-issue');
    const prioritySelect = document.getElementById('maintenance-priority');

    let selectedOption = currentSelection;
    let equipmentCode = normalizeBarcodeValue(hidden?.value);

    if (!selectedOption && equipmentCode) {
      selectedOption = findEquipmentOptionByBarcode(equipmentCode);
    }

    if (!selectedOption && barcodeInput?.value) {
      if (selectEquipmentByBarcode(barcodeInput.value, { showFeedback: true })) {
        selectedOption = currentSelection;
        equipmentCode = normalizeBarcodeValue(selectedOption?.barcode);
      }
    }

    if (!selectedOption && searchInput?.value) {
      if (selectEquipmentByDescription(searchInput.value, { showFeedback: true })) {
        selectedOption = currentSelection;
        equipmentCode = normalizeBarcodeValue(selectedOption?.barcode);
      }
    }

    if (!selectedOption || !equipmentCode) {
      showToast(t('maintenance.toast.selectEquipment', '⚠️ يرجى اختيار المعدة'));
      return;
    }

    const { equipment = [] } = loadData();
    let equipmentItem = (equipment || []).find((item) => normalizeBarcodeValue(item?.barcode) === equipmentCode);

    if (!equipmentItem && selectedOption) {
      equipmentItem = {
        barcode: selectedOption.barcode,
        desc: selectedOption.desc,
        name: selectedOption.desc,
        status: selectedOption.status || 'متاح'
      };
    }

    if (!equipmentItem) {
      showToast(t('maintenance.toast.selectedNotFound', '❌ لم يتم العثور على المعدة المختارة'));
      clearSelectedEquipment();
      return;
    }

    if (equipmentItem.status === 'صيانة') {
      showToast(t('maintenance.toast.equipmentAlreadyMaintenance', '⚠️ هذه المعدة بالفعل في حالة صيانة'));
      return;
    }

    const openTickets = loadTickets().filter((ticket) => ticket.status === 'open');
    const duplicate = openTickets.some((ticket) => normalizeBarcodeValue(ticket.equipmentBarcode) === equipmentCode);
    if (duplicate) {
      showToast(t('maintenance.toast.ticketExists', '⚠️ توجد تذكرة صيانة مفتوحة لهذه المعدة'));
      return;
    }

    const fallbackName = t('maintenance.table.noName', 'بدون اسم');
    const ticket = {
      id: Date.now(),
      equipmentBarcode: equipmentCode,
      equipmentDesc: equipmentItem.desc || equipmentItem.description || equipmentItem.name || fallbackName,
      issue: issueInput?.value.trim() || '',
      priority: prioritySelect?.value || 'medium',
      status: 'open',
      createdAt: new Date().toISOString(),
      resolutionReport: '',
      resolvedAt: null
    };

    const tickets = loadTickets();
    const nextTickets = [ticket, ...tickets];
    saveTickets(nextTickets);
    updateEquipmentStatus(equipmentCode, 'صيانة');
    showToast(t('maintenance.toast.ticketCreated', '🛠️ تم إنشاء تذكرة الصيانة وإيقاف المعدة'));

    clearSelectedEquipment();
    if (issueInput) issueInput.value = '';
    if (prioritySelect) prioritySelect.value = 'medium';

    const statusFilterEl = document.getElementById('maintenance-status-filter');
    if (statusFilterEl) statusFilterEl.value = 'all';

    renderMaintenance();
  } catch (error) {
    console.error('❌ [maintenance] Failed to create ticket', error);
    showToast(t('maintenance.toast.submitError', '⚠️ تعذر إنشاء تذكرة الصيانة. يرجى المحاولة مجدداً.'));
  }
}

function filterTicketsByStatus(status) {
  const tickets = loadTickets();
  if (status === 'all') return tickets;
  return tickets.filter((ticket) => ticket.status === status);
}

export function renderMaintenance() {
  loadTickets();
  populateEquipmentInputs();

  const statusFilter = document.getElementById('maintenance-status-filter');
  if (statusFilter && !statusFilter.value) {
    statusFilter.value = 'all';
  }
  const status = statusFilter?.value || 'all';
  const tickets = filterTicketsByStatus(status);

  renderStats(tickets);
  renderTable(tickets);
}

export function initMaintenance() {
  loadTickets();
  populateEquipmentInputs();
  renderMaintenance();

  maintenanceInitialized = true;

  const form = document.getElementById('maintenance-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', handleFormSubmit);
    form.dataset.listenerAttached = 'true';
  }

  const statusFilter = document.getElementById('maintenance-status-filter');
  if (statusFilter && !statusFilter.dataset.listenerAttached) {
    statusFilter.addEventListener('change', () => {
      renderMaintenance();
    });
    statusFilter.dataset.listenerAttached = 'true';
  }

  const table = document.querySelector('.maintenance-table');
  if (table && !table.dataset.listenerAttached) {
    table.addEventListener('click', handleTableActions);
    table.dataset.listenerAttached = 'true';
  }
}

loadTickets();

document.addEventListener('language:changed', () => {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const info = document.getElementById('maintenance-selected-info');
  if (hidden?.value) {
    const option = findEquipmentOptionByBarcode(hidden.value);
    if (option) {
      updateSelectedInfo(option);
    } else if (info) {
      info.textContent = getDefaultSelectionText();
    }
  } else if (info) {
    info.textContent = getDefaultSelectionText();
  }
  renderMaintenance();
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (form?.id === 'maintenance-form' && !form.dataset.listenerAttached) {
    handleFormSubmit(event);
  }
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  if (!button.closest('.maintenance-table')) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  if (!id) return;

  if (action === 'close') {
    closeTicket(id);
  } else if (action === 'view') {
    viewTicketReport(id);
  } else if (action === 'delete') {
    deleteTicket(id);
  }
});
