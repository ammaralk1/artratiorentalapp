import '../../styles/templatesA4.css';
import { t } from '../language.js';
import { getProjectsState } from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
import { getReservationsForProject } from './view.js';
import { ensureHtml2Pdf } from '../reports/external.js';

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
  const all = getReservationsForProject(projectId);
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

  const table = el('table', { class: 'tpl-table', id: 'expenses-table' });
  const headRow = el('tr');
  const headers = ['Code / الكود', 'Section / القسم', 'Item / البند', 'Qty', 'Rate', 'Total', 'Notes'];
  headers.forEach((h) => headRow.appendChild(el('th', { text: h })));
  table.appendChild(el('thead', {}, [headRow]));
  const tb = el('tbody');
  const rows = Array.isArray(project?.expenses) && project.expenses.length ? project.expenses : new Array(12).fill(null);
  rows.forEach((exp, idx) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: 'Production' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp?.label || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp ? String(1) : '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp ? String(exp.amount || 0) : '' }));
    tr.appendChild(el('td', { text: exp ? String((exp.amount || 0)) : '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: exp?.note || '' }));
    tb.appendChild(tr);
  });
  table.appendChild(tb);
  inner.appendChild(table);
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
  meta.appendChild(metaCell('Weather / الطقس', ''));
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
  const schedTable = el('table', { class: 'tpl-table' });
  schedTable.appendChild(el('thead', {}, [el('tr', {}, [
    el('th', { text: 'Time (Duration)' }), el('th', { text: 'Shot #' }), el('th', { text: 'Description' }), el('th', { text: 'Location' }), el('th', { text: 'Notes' })
  ])]));
  const stb = el('tbody');
  (reservations || []).forEach((r, i) => {
    const tr = el('tr');
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: String(i + 1) }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.title || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.location || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    stb.appendChild(tr);
  });
  if (stb.children.length < 8) {
    for (let i = stb.children.length; i < 8; i += 1) {
      const tr = el('tr');
      for (let c = 0; c < 5; c += 1) tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
      stb.appendChild(tr);
    }
  }
  schedTable.appendChild(stb);
  scheduleCard.appendChild(schedTable);
  columns.appendChild(scheduleCard);

  inner.appendChild(columns);
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

  const table = el('table', { class: 'tpl-table' });
  table.appendChild(el('thead', {}, [el('tr', {}, [
    el('th', { text: '#' }), el('th', { text: 'Scene / المشهد' }), el('th', { text: 'Description / الوصف' }), el('th', { text: 'Lens' }), el('th', { text: 'Move' }), el('th', { text: 'Rig' }), el('th', { text: 'Audio' }), el('th', { text: 'Location' }), el('th', { text: 'Est. Time' }), el('th', { text: 'Notes' })
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
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true', text: r?.location || '' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
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
  const list = projectId ? getReservationsForProject(projectId) : [];
  const options = ['<option value="" selected>— بدون ربط —</option>'];
  list.forEach((r) => {
    const id = r.id ?? r.reservationId;
    const label = (r.title || '').trim() || `#${id}`;
    options.push(`<option value="${String(id)}">${label}</option>`);
  });
  sel.innerHTML = options.join('');
}

export function initTemplatesTab() {
  document.addEventListener('DOMContentLoaded', () => {
    const projectSel = document.getElementById('templates-project');
    const reservationSel = document.getElementById('templates-reservation');
    const typeSel = document.getElementById('templates-type');
    const refreshBtn = document.getElementById('templates-refresh');
    const printBtn = document.getElementById('templates-print');

    if (!projectSel) return;
    populateProjectSelect();
    populateReservationSelect(projectSel.value || '');
    renderTemplatesPreview();

    projectSel.addEventListener('change', () => {
      populateReservationSelect(projectSel.value || '');
      renderTemplatesPreview();
    });
    reservationSel?.addEventListener('change', renderTemplatesPreview);
    typeSel?.addEventListener('change', renderTemplatesPreview);
    refreshBtn?.addEventListener('click', renderTemplatesPreview);
    printBtn?.addEventListener('click', printTemplatesPdf);
  });
}

export default { initTemplatesTab };
