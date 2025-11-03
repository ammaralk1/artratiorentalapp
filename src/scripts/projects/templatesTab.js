import '../../styles/templatesA4.css';
import { t } from '../language.js';
import { getProjectsState, refreshProjectsFromApi } from '../projectsService.js';
import { getReservationsState, refreshReservationsFromApi } from '../reservationsService.js';
// Avoid heavy cross-imports from view.js; compute locally
function getReservationsForProjectLocal(projectId) {
  if (!projectId) return [];
  const list = getReservationsState();
  return Array.isArray(list)
    ? list.filter((r) => String(r?.projectId ?? r?.project_id ?? '') === String(projectId))
    : [];
}
import { ensureHtml2Pdf } from '../reports/external.js';
import { PROJECT_TAX_RATE } from './constants.js';
import { apiRequest } from '../apiClient.js';

function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).filter(Boolean).forEach((c) => e.appendChild(c));
  return e;
}

function metaCell(label, value = '', editable = true) {
  const cell = el('div', { class: 'cell' });
  cell.appendChild(el('span', { class: 'label', text: label }));
  const val = el('div', { 'data-editable': editable ? 'true' : 'false', contenteditable: editable ? 'true' : 'false' });
  val.textContent = value || '';
  cell.appendChild(val);
  return cell;
}

function getSelectedProject() {
  const sel = document.getElementById('templates-project');
  const id = sel?.value || '';
  return getProjectsState().find((p) => String(p.id) === String(id)) || null;
}

function getSelectedReservations(projectId) {
  const sel = document.getElementById('templates-reservation');
  if (!sel) return [];
  const value = sel.value || '';
  const all = getReservationsForProjectLocal(projectId);
  if (!value) return all;
  const match = all.find((r) => String(r.id || r.reservationId) === String(value));
  return match ? [match] : [];
}

function buildRoot({ landscape = false } = {}) {
  const root = el('div', { id: 'templates-a4-root', 'data-render-context': 'preview' });
  const pagesWrap = el('div', { 'data-a4-pages': '' });
  const page = el('section', { class: `a4-page${landscape ? ' a4-page--landscape' : ''}` });
  const inner = el('div', { class: 'a4-inner' });
  page.appendChild(inner);
  pagesWrap.appendChild(page);
  root.appendChild(pagesWrap);
  return { root, inner };
}

function buildExpensesPage(project, reservations) {
  const { root, inner } = buildRoot({ landscape: false });
  const title = el('div', { class: 'tpl-header' }, [
    el('div', {}, [
      el('h1', { class: 'tpl-title', text: t('projects.templates.expenses.title', 'Expenses Sheet / جدول المصاريف') }),
      el('p', { class: 'tpl-subtitle', text: (project?.title || '').trim() })
    ])
  ]);
  inner.appendChild(title);

  const meta = el('div', { class: 'tpl-meta' });
  meta.appendChild(metaCell('Production Co.', ''));
  meta.appendChild(metaCell('Project Title / اسم المشروع', project?.title || ''));
  meta.appendChild(metaCell('Client / العميل', project?.clientCompany || ''));
  meta.appendChild(metaCell('Budget Date / تاريخ الميزانية', new Date().toISOString().slice(0, 10)));
  meta.appendChild(metaCell('Prepared by / إعداد', ''));
  const locs = Array.from(new Set((reservations || []).map((r) => (r?.location || '').trim()).filter(Boolean))).join(', ');
  meta.appendChild(metaCell('Locations / المواقع', locs));
  inner.appendChild(meta);

  const table = el('table', { class: 'tpl-table', id: 'expenses-table', 'data-editable-table': 'expenses' });
  const headRow = el('tr');
  const headers = [
    { label: 'Code / الكود', w: '8%' },
    { label: 'Section / القسم', w: '16%' },
    { label: 'Item / البند', w: '32%' },
    { label: 'Qty', w: '6%' },
    { label: 'Rate', w: '10%' },
    { label: 'Total', w: '10%' },
    { label: 'Notes', w: '14%' },
    { label: '', w: '4%' },
  ];
  headers.forEach((h) => headRow.appendChild(el('th', { text: h.label, style: `width:${h.w}` })));
  table.appendChild(el('thead', {}, [headRow]));
  const tb = el('tbody');
  // Section banner: ABOVE THE LINE
  tb.appendChild(el('tr', { 'data-section-bar': 'atl' }, [
    el('td', { html: '<span class="tpl-section-bar tpl-section--atl">ABOVE THE LINE</span>', colspan: '8' })
  ]));
  const rows = Array.isArray(project?.expenses) && project.expenses.length ? project.expenses : new Array(10).fill(null);
  rows.forEach((exp, idx) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: 'Production' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp?.label || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp ? String(1) : '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp ? String(exp.amount || 0) : '' }));
    tr.appendChild(el('td', { text: exp ? String((exp.amount || 0)) : '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp?.note || '' }));
    tr.appendChild(el('td', {}, [el('div', { class: 'tpl-actions' }, [
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-up', text: '↑' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-down', text: '↓' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-add', text: '+' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-delete', text: '×' }),
    ])]));
    tb.appendChild(tr);
  });
  // Subtotal row
  const sub = el('tr', { class: 'tpl-subtotal-row' });
  sub.appendChild(el('td', { colspan: '5', html: '<span class="tpl-subtotal-label">Subtotal</span>' }));
  sub.appendChild(el('td', { 'data-subtotal': 'true', text: '' }));
  sub.appendChild(el('td', { colspan: '2' }));
  tb.appendChild(sub);
  // Next banner: PRODUCTION EXPENSES
  tb.appendChild(el('tr', { 'data-section-bar': 'prod' }, [
    el('td', { html: '<span class="tpl-section-bar tpl-section--prod">PRODUCTION EXPENSES</span>', colspan: '8' })
  ]));
  table.appendChild(tb);
  inner.appendChild(table);
  // Summary footer (subtotal, tax, total)
  const summary = el('div', { id: 'expenses-summary', class: 'tpl-summary' });
  const taxLabel = t('projects.templates.expenses.tax', `الضريبة ${Math.round(PROJECT_TAX_RATE * 100)}%`);
  summary.innerHTML = `
    <div class="tpl-summary-row"><span>${t('projects.templates.expenses.subtotal', 'المجموع')}</span><span data-summary-subtotal></span></div>
    <div class="tpl-summary-row"><span>${taxLabel}</span><span data-summary-tax></span></div>
    <div class="tpl-summary-row tpl-summary-total"><span>${t('projects.templates.expenses.total', 'الإجمالي')}</span><span data-summary-total></span></div>
  `;
  inner.appendChild(summary);
  return root;
}

function buildCallSheetPage(project, reservations) {
  const { root, inner } = buildRoot({ landscape: true });
  const res = reservations?.[0] || null;
  inner.appendChild(el('div', { class: 'tpl-header' }, [
    el('div', {}, [
      el('h1', { class: 'tpl-title', text: t('projects.templates.callsheet.title', 'Call Sheet / قالب كول شيت') }),
      el('p', { class: 'tpl-subtitle', text: (project?.title || '').trim() })
    ])
  ]));

  const meta = el('div', { class: 'tpl-meta' });
  meta.appendChild(metaCell('Project / المشروع', project?.title || ''));
  meta.appendChild(metaCell('Date / التاريخ', res?.start ? new Date(res.start).toISOString().slice(0,10) : ''));
  meta.appendChild(metaCell('Location / الموقع', res?.location || ''));
  meta.appendChild(metaCell('Call Time / وقت التجمع', res?.start ? new Date(res.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''));
  meta.appendChild(metaCell('Weather / الطقس', 'Clear - 28°C'));
  meta.appendChild(metaCell('Nearest Hospital / أقرب مستشفى', ''));
  meta.appendChild(metaCell('Map Link / رابط الموقع', ''));
  meta.appendChild(metaCell('Notes / ملاحظات', ''));
  inner.appendChild(meta);

  const columns = el('div', { class: 'tpl-columns' });
  // Key contacts
  const contactsCard = el('div', { class: 'tpl-card' });
  contactsCard.appendChild(el('h4', { text: t('projects.templates.callsheet.contacts', 'جهات الاتصال الأساسية') }));
  const contactsTable = el('table', { class: 'tpl-table' });
  contactsTable.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: 'الاسم' }), el('th', { text: 'الدور' }), el('th', { text: 'الهاتف' })])]))
  const ctb = el('tbody');
  const techs = Array.isArray(project?.techniciansDetails) ? project.techniciansDetails : [];
  (techs.length ? techs : new Array(5).fill(null)).forEach((tch) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: tch?.name || tch?.fullName || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: tch?.role || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: tch?.phone || '' }));
    ctb.appendChild(tr);
  });
  contactsTable.appendChild(ctb);
  contactsCard.appendChild(contactsTable);
  columns.appendChild(contactsCard);

  // Day schedule
  const scheduleCard = el('div', { class: 'tpl-card' });
  scheduleCard.appendChild(el('h4', { text: t('projects.templates.callsheet.schedule', 'جدول اليوم') }));
  const schedTable = el('table', { class: 'tpl-table', 'data-editable-table': 'callsheet' });
  schedTable.appendChild(el('thead', {}, [el('tr', {}, [
    el('th', { text: 'Time (Duration)', style: 'width:16%' }),
    el('th', { text: 'Shot #', style: 'width:8%' }),
    el('th', { text: 'Description', style: 'width:36%' }),
    el('th', { text: 'Location', style: 'width:20%' }),
    el('th', { text: 'Notes', style: 'width:16%' }),
    el('th', { text: '', style: 'width:4%' })
  ])]));
  const stb = el('tbody');
  (reservations || []).forEach((r, i) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: String(i + 1) }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.title || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.location || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', {}, [el('div', { class: 'tpl-actions' }, [
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-up', text: '↑' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-down', text: '↓' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-add', text: '+' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-delete', text: '×' }),
    ])]));
    stb.appendChild(tr);
  });
  if (stb.children.length < 8) {
    for (let i = stb.children.length; i < 8; i += 1) {
      const tr = el('tr');
      for (let c = 0; c < 5; c += 1) tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
      tr.appendChild(el('td', {}, [el('div', { class: 'tpl-actions' }, [
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-up', text: '↑' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-down', text: '↓' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-add', text: '+' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-delete', text: '×' }),
      ])]));
      stb.appendChild(tr);
    }
  }
  schedTable.appendChild(stb);
  scheduleCard.appendChild(schedTable);
  columns.appendChild(scheduleCard);

  inner.appendChild(columns);

  // Crew by department
  const crewGrid = el('div', { class: 'tpl-columns' });
  const departments = [
    { key: 'Camera', labels: ['Role', 'Name'] },
    { key: 'Grip', labels: ['Role', 'Name'] },
    { key: 'Sound', labels: ['Role', 'Name'] },
    { key: 'Lighting', labels: ['Role', 'Name'] },
    { key: 'Art', labels: ['Role', 'Name'] },
    { key: 'Production', labels: ['Role', 'Name'] },
  ];
  departments.forEach((dept) => {
    const card = el('div', { class: 'tpl-card' });
    card.appendChild(el('h4', { text: `${dept.key} / ${dept.key}` }));
    const tbl = el('table', { class: 'tpl-table' });
    tbl.appendChild(el('thead', {}, [el('tr', {}, [el('th', { text: dept.labels[0] }), el('th', { text: dept.labels[1] })])]))
    const body = el('tbody');
    for (let i = 0; i < 4; i += 1) {
      const tr = el('tr');
      tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
      tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
      body.appendChild(tr);
    }
    tbl.appendChild(body);
    card.appendChild(tbl);
    crewGrid.appendChild(card);
  });
  inner.appendChild(crewGrid);

  // Locations card
  const locationsCard = el('div', { class: 'tpl-card' });
  locationsCard.appendChild(el('h4', { text: 'Locations / المواقع' }));
  const locTbl = el('table', { class: 'tpl-table' });
  locTbl.appendChild(el('thead', {}, [el('tr', {}, [
    el('th', { text: 'Location' }), el('th', { text: 'Address' }), el('th', { text: 'Notes' })
  ])]));
  const locBody = el('tbody');
  const locs = Array.from(new Set((reservations || []).map((r) => r?.location).filter(Boolean)));
  (locs.length ? locs : ['']).forEach((name) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: name || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    locBody.appendChild(tr);
  });
  locTbl.appendChild(locBody);
  locationsCard.appendChild(locTbl);
  inner.appendChild(locationsCard);

  // Logistics & Safety card
  const safetyCard = el('div', { class: 'tpl-card' });
  safetyCard.appendChild(el('h4', { text: 'Logistics / Safety' }));
  const ul = el('ul');
  for (let i = 0; i < 4; i += 1) {
    const li = el('li', { 'data-editable': 'true', contenteditable: 'true' });
    li.textContent = '';
    ul.appendChild(li);
  }
  safetyCard.appendChild(ul);
  inner.appendChild(safetyCard);
  return root;
}

function buildShotListPage(project, reservations) {
  const { root, inner } = buildRoot({ landscape: true });
  inner.appendChild(el('div', { class: 'tpl-header' }, [
    el('div', {}, [
      el('h1', { class: 'tpl-title', text: t('projects.templates.shotlist.title', 'Shot List / قائمة اللقطات') }),
      el('p', { class: 'tpl-subtitle', text: (project?.title || '').trim() })
    ])
  ]));

  const table = el('table', { class: 'tpl-table', 'data-editable-table': 'shotlist' });
  table.appendChild(el('thead', {}, [el('tr', {}, [
    el('th', { text: '#', style: 'width:4%' }),
    el('th', { text: 'Scene / المشهد', style: 'width:12%' }),
    el('th', { text: 'Description / الوصف', style: 'width:22%' }),
    el('th', { text: 'Lens', style: 'width:8%' }),
    el('th', { text: 'Move', style: 'width:10%' }),
    el('th', { text: 'Rig', style: 'width:10%' }),
    el('th', { text: 'Audio', style: 'width:10%' }),
    el('th', { text: 'VO/FX', style: 'width:8%' }),
    el('th', { text: 'Location', style: 'width:12%' }),
    el('th', { text: 'Est. Time', style: 'width:8%' }),
    el('th', { text: 'Notes', style: 'width:10%' }),
    el('th', { text: '', style: 'width:4%' })
  ])]));
  const tb = el('tbody');
  const seed = (reservations || []).length ? reservations : new Array(10).fill(null);
  seed.forEach((r, i) => {
    const tr = el('tr');
    tr.appendChild(el('td', { text: String(i + 1) }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.title || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.description || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' })); // VO/FX
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.location || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', {}, [el('div', { class: 'tpl-actions' }, [
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-up', text: '↑' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-down', text: '↓' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-add', text: '+' }),
      el('button', { class: 'tpl-action-btn', 'data-action': 'row-delete', text: '×' }),
    ])]));
    tb.appendChild(tr);
  });
  table.appendChild(tb);
  inner.appendChild(table);
  return root;
}

function renderTemplatesPreview() {
  const host = document.getElementById('templates-preview-host');
  if (!host) return;
  const project = getSelectedProject();
  host.innerHTML = '';
  if (!project) {
    const msg = el('div', { class: 'text-muted', text: t('projects.templates.empty', 'اختر مشروعاً لبدء إنشاء القوالب.') });
    host.appendChild(msg);
    return;
  }
  const reservations = getSelectedReservations(project.id);
  const type = document.getElementById('templates-type')?.value || 'expenses';
  let pageRoot = null;
  if (type === 'callsheet') pageRoot = buildCallSheetPage(project, reservations);
  else if (type === 'shotlist') pageRoot = buildShotListPage(project, reservations);
  else pageRoot = buildExpensesPage(project, reservations);
  host.appendChild(pageRoot);
  // Update computed totals where applicable
  recomputeExpensesSubtotals();
}

async function printTemplatesPdf() {
  const host = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (!host) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const landscape = type !== 'expenses';
  const html2pdf = await ensureHtml2Pdf();
  const opt = {
    margin: [6, 6, 6, 6],
    filename: `template-${type}.pdf`,
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait' },
    pagebreak: { mode: ['avoid-all'] }
  };
  host.setAttribute('data-render-context', 'export');
  try { await html2pdf().set(opt).from(host).save(); } finally { host.setAttribute('data-render-context', 'preview'); }
}

function populateProjectSelect() {
  const sel = document.getElementById('templates-project');
  if (!sel) return;
  const opts = getProjectsState().map((p) => ({ id: p.id, title: p.title || `#${p.id}` }));
  sel.innerHTML = '<option value="">— اختر —</option>' + opts.map((o) => `<option value="${String(o.id)}">${o.title}</option>`).join('');
}

function populateReservationSelect(projectId) {
  const sel = document.getElementById('templates-reservation');
  if (!sel) return;
  const list = projectId ? getReservationsForProjectLocal(projectId) : [];
  const options = ['<option value="" selected>— بدون ربط —</option>'];
  list.forEach((r) => {
    const id = r.id ?? r.reservationId;
    const label = (r.title || '').trim() || `#${id}`;
    options.push(`<option value="${String(id)}">${label}</option>`);
  });
  sel.innerHTML = options.join('');
}

function recomputeExpensesSubtotals() {
  const table = document.querySelector('#templates-preview-host #expenses-table');
  if (!table) return;
  let running = 0;
  let grand = 0;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach((tr) => {
    if (tr.matches('[data-section-bar]')) { running = 0; return; }
    if (tr.classList.contains('tpl-subtotal-row')) {
      const cell = tr.querySelector('[data-subtotal]') || tr.children[5];
      if (cell) cell.textContent = String((running || 0).toFixed(2));
      return;
    }
    const qty = Number(String(tr.children[3]?.textContent || '1').replace(/[^\d.\-]/g, '')) || 1;
    const rate = Number(String(tr.children[4]?.textContent || '0').replace(/[^\d.\-]/g, '')) || 0;
    const total = qty * rate;
    if (tr.children[5]) tr.children[5].textContent = String(total.toFixed(2));
    running += total;
    grand += total;
  });
  // Update summary footer
  const project = getSelectedProject();
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const applyTax = Boolean(project?.applyTax);
  const taxAmount = applyTax ? Number((grand * PROJECT_TAX_RATE).toFixed(2)) : 0;
  const totalWithTax = Number((grand + taxAmount).toFixed(2));
  const subEl = document.querySelector('#expenses-summary [data-summary-subtotal]');
  const taxEl = document.querySelector('#expenses-summary [data-summary-tax]');
  const totalEl = document.querySelector('#expenses-summary [data-summary-total]');
  if (subEl) subEl.textContent = `${String(grand.toFixed(2))} ${currencyLabel}`;
  if (taxEl) taxEl.textContent = applyTax ? `${String(taxAmount.toFixed(2))} ${currencyLabel}` : `0.00 ${currencyLabel}`;
  if (totalEl) totalEl.textContent = `${String(totalWithTax.toFixed(2))} ${currencyLabel}`;
}

function handleTableActionClick(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  const tr = btn.closest('tr');
  const tbody = tr?.parentElement;
  if (!tr || !tbody) return;
  if (action === 'row-up' && tr.previousElementSibling && !tr.previousElementSibling.matches('[data-section-bar]')) {
    tbody.insertBefore(tr, tr.previousElementSibling);
  } else if (action === 'row-down' && tr.nextElementSibling) {
    tbody.insertBefore(tr.nextElementSibling, tr);
  } else if (action === 'row-add') {
    const clone = tr.cloneNode(true);
    clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
    tbody.insertBefore(clone, tr.nextElementSibling);
  } else if (action === 'row-delete') {
    tbody.removeChild(tr);
  }
  recomputeExpensesSubtotals();
}

function getCellIndex(td) {
  if (!td || !td.parentElement) return -1;
  const cells = Array.from(td.parentElement.children);
  return cells.indexOf(td);
}

function isSpecialRow(tr) {
  return tr?.matches('[data-section-bar]') || tr?.classList.contains('tpl-subtotal-row');
}

function nextEditableRow(tr) {
  let n = tr?.nextElementSibling;
  while (n && isSpecialRow(n)) n = n.nextElementSibling;
  return n;
}

function ensureExtraRows(tbody, sampleRow, needed) {
  if (!tbody || !sampleRow || needed <= 0) return;
  for (let i = 0; i < needed; i += 1) {
    const clone = sampleRow.cloneNode(true);
    clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
    tbody.appendChild(clone);
  }
}

function parseClipboardTable(text) {
  if (!text) return [];
  const rows = text
    .split(/\r?\n/)
    .map((r) => r.replace(/\r$/, ''))
    .filter((r) => r.trim().length > 0)
    .map((line) => line.split(/\t|,|;/).map((c) => c.trim()));
  return rows;
}

function fillRowFromArray(tr, startCol, values) {
  if (!tr || !values || !values.length) return;
  const tds = Array.from(tr.children);
  let col = Math.max(0, startCol);
  for (let i = 0; i < values.length && col < tds.length; i += 1) {
    // Skip non-editable cells (e.g., Total, actions)
    while (col < tds.length && !tds[col].hasAttribute('contenteditable')) col += 1;
    if (col >= tds.length) break;
    const td = tds[col];
    const raw = values[i] ?? '';
    td.textContent = String(raw);
    col += 1;
  }
}

function handleTablePaste(e) {
  const target = e.target;
  const editable = target && (target.closest('[contenteditable]'));
  const table = target && target.closest('table.tpl-table');
  if (!editable || !table) return; // allow normal paste into non-table elements

  const plain = e.clipboardData?.getData('text/plain') ?? '';
  if (!plain || (!plain.includes('\t') && !plain.includes('\n'))) return; // Single-cell paste: let default happen

  e.preventDefault();

  const rows = parseClipboardTable(plain);
  if (!rows.length) return;

  const td = target.closest('td');
  const startCol = getCellIndex(td);
  const tbody = table.tBodies?.[0] || table.querySelector('tbody');
  if (!tbody) return;

  // Find a sample editable row to clone when needed
  let sampleRow = Array.from(tbody.children).find((r) => r && !isSpecialRow(r));
  // Ensure enough rows exist from current row onward
  let currentRow = td.parentElement;
  // Count how many editable rows remain including current
  let remaining = 0; let cursor = currentRow;
  while (cursor) { if (!isSpecialRow(cursor)) remaining += 1; cursor = cursor.nextElementSibling; }
  const deficit = rows.length - remaining;
  if (deficit > 0 && sampleRow) {
    ensureExtraRows(tbody, sampleRow, deficit);
  }

  // Write values row by row
  let tr = currentRow;
  rows.forEach((arr, i) => {
    // Skip special rows
    while (tr && isSpecialRow(tr)) tr = nextEditableRow(tr);
    if (!tr) return;
    const start = i === 0 ? startCol : 0;
    fillRowFromArray(tr, start, arr);
    tr = nextEditableRow(tr) || tr?.nextElementSibling;
  });

  // Recompute totals for expenses tables
  if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
    recomputeExpensesSubtotals();
  }
}

async function saveTemplateSnapshot({ copy = false } = {}) {
  const project = getSelectedProject();
  if (!project) return;
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  const reservationSel = document.getElementById('templates-reservation');
  const reservationId = reservationSel && reservationSel.value ? Number(reservationSel.value) : null;
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const payload = { html: root.outerHTML };
  const nameInput = document.getElementById('templates-save-title');
  const customTitle = nameInput && nameInput.value ? String(nameInput.value).trim() : '';
  await apiRequest('/project-templates/', {
    method: 'POST',
    body: {
      project_id: Number(project.id),
      reservation_id: reservationId,
      type,
      title: customTitle || `${project.title || 'Template'} - ${type}`,
      data: payload,
    },
  });
  alert('تم حفظ القالب');
}

async function fetchSavedTemplatesForCurrent() {
  const project = getSelectedProject();
  if (!project) return [];
  const typeSel = document.getElementById('templates-type');
  const type = typeSel ? typeSel.value : 'expenses';
  const res = await apiRequest(`/project-templates/?project_id=${encodeURIComponent(project.id)}&type=${encodeURIComponent(type)}`);
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.items)) return res.items;
  return [];
}

async function populateSavedTemplates() {
  const select = document.getElementById('templates-saved');
  if (!select) return;
  const items = await fetchSavedTemplatesForCurrent();
  select.innerHTML = '<option value="">— محفوظات —</option>' + items.map((it) => `<option value="${String(it.id)}">${(it.title || `#${it.id}`)}</option>`).join('');
}

async function loadSnapshotById(id) {
  if (!id) return;
  const res = await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`);
  const item = Array.isArray(res) ? res[0] : res;
  const host = document.getElementById('templates-preview-host');
  if (!host || !item) return;
  host.innerHTML = '';
  try {
    const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
    if (data?.html) {
      const wrap = document.createElement('div');
      wrap.innerHTML = data.html;
      const root = wrap.firstElementChild;
      if (root) host.appendChild(root);
    }
  } catch (_) {}
}

export function initTemplatesTab() {
  // Run immediately; caller ensures DOM is ready
  const projectSel = document.getElementById('templates-project');
  const reservationSel = document.getElementById('templates-reservation');
  const typeSel = document.getElementById('templates-type');
  const refreshBtn = document.getElementById('templates-refresh');
  const printBtn = document.getElementById('templates-print');
  const saveBtn = document.getElementById('templates-save');
  const saveCopyBtn = document.getElementById('templates-save-copy');
  const savedSel = document.getElementById('templates-saved');
  const fromResBtn = document.getElementById('templates-from-res');
  const renameBtn = document.getElementById('templates-rename');
  const deleteBtn = document.getElementById('templates-delete');
  const exportBtn = document.getElementById('templates-export');
  const importBtn = document.getElementById('templates-import');
  const importFile = document.getElementById('templates-import-file');
  try { console.debug('[templatesTab] init start'); } catch(_) {}

  if (!projectSel) return;
  populateProjectSelect();
  populateReservationSelect(projectSel.value || '');
  renderTemplatesPreview();
  (async () => { try { await populateSavedTemplates(); } catch {} })();

  projectSel.addEventListener('change', () => {
    populateReservationSelect(projectSel.value || '');
    renderTemplatesPreview();
    (async () => { try { await populateSavedTemplates(); } catch {} })();
  });
  reservationSel?.addEventListener('change', renderTemplatesPreview);
  typeSel?.addEventListener('change', renderTemplatesPreview);
  refreshBtn?.addEventListener('click', renderTemplatesPreview);
  printBtn?.addEventListener('click', printTemplatesPdf);
  saveBtn?.addEventListener('click', () => { saveTemplateSnapshot({ copy: false }).then(populateSavedTemplates).catch(() => alert('تعذر الحفظ')); });
  saveCopyBtn?.addEventListener('click', () => { saveTemplateSnapshot({ copy: true }).then(populateSavedTemplates).catch(() => alert('تعذر الحفظ')); });
  savedSel?.addEventListener('change', () => { if (savedSel.value) loadSnapshotById(savedSel.value).catch(() => {}); });
  fromResBtn?.addEventListener('click', () => {
    if (typeSel) typeSel.value = 'callsheet';
    if (reservationSel && reservationSel.options.length > 1) reservationSel.selectedIndex = 1;
    renderTemplatesPreview();
  });

  // Saved templates management
  renameBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    const currentText = savedSel.options[savedSel.selectedIndex]?.textContent || '';
    const title = prompt('اسم جديد للمحفوظ:', currentText);
    if (!title || title.trim() === currentText) return;
    try {
      await apiRequest('/project-templates/', { method: 'PATCH', body: { id: Number(id), title: String(title).trim() } });
      await populateSavedTemplates();
      // re-select same id if still present
      const opt = Array.from(savedSel.options).find(o => o.value === String(id));
      if (opt) { savedSel.value = String(id); }
    } catch (e) {
      alert('تعذر إعادة التسمية');
    }
  });

  deleteBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    const ok = confirm('هل تريد حذف هذا المحفوظ نهائياً؟');
    if (!ok) return;
    try {
      await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      await populateSavedTemplates();
      // Reload preview to reflect removal
      renderTemplatesPreview();
    } catch (e) {
      alert('تعذر الحذف');
    }
  });

  exportBtn?.addEventListener('click', async () => {
    const id = savedSel?.value || '';
    if (!id) { alert('اختر محفوظاً أولاً'); return; }
    try {
      const res = await apiRequest(`/project-templates/?id=${encodeURIComponent(id)}`);
      const item = Array.isArray(res) ? res[0] : res;
      if (!item) { alert('تعذر جلب المحفوظ'); return; }
      const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
      const blob = new Blob([JSON.stringify({
        meta: { id: item.id, title: item.title, type: item.type, project_id: item.project_id },
        data
      }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeTitle = (item.title || `template-${id}`).replace(/[^\w\-\s]/g, '').trim() || `template-${id}`;
      a.download = `${safeTitle}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (_) {
      alert('تعذر التصدير');
    }
  });

  importBtn?.addEventListener('click', () => { importFile?.click(); });
  importFile?.addEventListener('change', async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const project = getSelectedProject();
      if (!project) { alert('اختر مشروعاً أولاً'); return; }
      const typeSelEl = document.getElementById('templates-type');
      const type = typeSelEl ? typeSelEl.value : (json?.meta?.type || 'expenses');
      const reservationSelEl = document.getElementById('templates-reservation');
      const reservationId = reservationSelEl?.value ? Number(reservationSelEl.value) : null;
      const payload = json?.data?.html ? json.data : { html: document.querySelector('#templates-preview-host')?.innerHTML || '' };
      await apiRequest('/project-templates/', {
        method: 'POST',
        body: {
          project_id: Number(project.id),
          reservation_id: reservationId,
          type,
          title: json?.meta?.title || `Imported - ${type}`,
          data: payload,
        },
      });
      await populateSavedTemplates();
      alert('تم الاستيراد بنجاح');
    } catch (err) {
      alert('تعذر الاستيراد، تأكد من صحة ملف JSON');
    } finally {
      e.target.value = '';
    }
  });

  document.getElementById('templates-preview-host')?.addEventListener('click', handleTableActionClick);
  // Paste from Excel/Sheets into tables
  document.getElementById('templates-preview-host')?.addEventListener('paste', handleTablePaste);

  // Re-populate when data loads later
  let repopulating = false;
  const repopulate = async () => {
    if (repopulating) { try { console.debug('[templatesTab] repopulate skipped (busy)'); } catch(_) {} return; }
    repopulating = true;
    try { console.debug('[templatesTab] repopulate start'); } catch(_) {}
    const before = (projectSel?.value || '');
    try {
      if (!getProjectsState()?.length) {
        await refreshProjectsFromApi();
      }
      if (!getReservationsState()?.length) {
        await refreshReservationsFromApi();
      }
    } catch (e) { try { console.warn('[templatesTab] fetch fallback failed', e); } catch(_) {} }

    populateProjectSelect();
    if (!projectSel.value && projectSel.options.length > 1) {
      projectSel.selectedIndex = 1;
    } else if (before) {
      projectSel.value = before;
    }
    populateReservationSelect(projectSel.value || '');
    renderTemplatesPreview();
    try { await populateSavedTemplates(); } catch {}
    try { console.debug('[templatesTab] repopulate done'); } catch(_) {}
    repopulating = false;
  };
  document.addEventListener('projects:changed', repopulate);
  document.addEventListener('reservations:changed', repopulate);
  document.addEventListener('reservations:updated', repopulate);

  const templatesTabBtn = document.querySelector('[data-project-subtab-target="projects-templates-tab"]');
  templatesTabBtn?.addEventListener('click', () => {
    setTimeout(repopulate, 0);
  });

  setTimeout(repopulate, 800);
  setTimeout(repopulate, 2000);
}

export default { initTemplatesTab };
