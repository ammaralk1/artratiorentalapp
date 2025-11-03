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

const COMPANY_INFO = {
  logoUrl: 'https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png',
  companyName: 'شركة فود آرت للدعاية والإعلان (شركة شخص واحد)',
  companyCR: '4030485240',
  companyLicense: '159460'
};

let TEMPLATE_LANG = (typeof localStorage !== 'undefined' && localStorage.getItem('templates.lang')) || 'en';
function setTemplateLang(lang) {
  TEMPLATE_LANG = (lang === 'ar') ? 'ar' : 'en';
  try { localStorage.setItem('templates.lang', TEMPLATE_LANG); } catch (_) {}
}
function L(en, ar) { return TEMPLATE_LANG === 'ar' ? (ar || en) : en; }

// Removed temporary preview padding adjustment logic per request

function readHeaderFooterOptions() {
  // Simplified: always use fixed company info and no external header/footer overlay
  return {
    headerFooter: false,
    logoUrl: COMPANY_INFO.logoUrl,
    companyName: COMPANY_INFO.companyName,
    companyCR: COMPANY_INFO.companyCR,
    companyLicense: COMPANY_INFO.companyLicense
  };
}

function buildRoot({ landscape = false, headerFooter = false, logoUrl = '' } = {}) {
  const root = el('div', { id: 'templates-a4-root', 'data-render-context': 'preview' });
  const pagesWrap = el('div', { 'data-a4-pages': '' });
  const { page, inner } = createPageSection({ landscape, headerFooter, logoUrl });
  pagesWrap.appendChild(page);
  root.appendChild(pagesWrap);
  return { root, inner };
}

function createPageSection({ landscape = false, headerFooter = false, logoUrl = '' } = {}) {
  const page = el('section', { class: `a4-page${landscape ? ' a4-page--landscape' : ''}${headerFooter ? ' a4-page--with-hf' : ''}` });
  const inner = el('div', { class: 'a4-inner' });
  if (headerFooter) {
    const brandTitle = 'Art Ratio';
    const header = el('div', { class: 'tpl-print-header' }, [
      el('div', { class: 'brand' }, [
        el('img', { src: logoUrl, alt: 'Logo', referrerpolicy: 'no-referrer' }),
        el('div', { class: 'brand-text', text: brandTitle })
      ]),
      el('div', { class: 'meta' }, [ el('div', { text: new Date().toLocaleDateString() }) ])
    ]);
    const footer = el('div', { class: 'tpl-print-footer' }, [
      el('div', { class: 'footer-left', text: 'art-ratio.com' }),
      el('div', { class: 'page-num', html: `<span data-page-num>1</span> / <span data-page-count>1</span>` })
    ]);
    page.appendChild(header);
    page.appendChild(footer);
  }
  page.appendChild(inner);
  return { page, inner };
}

function buildExpensesPage(project, reservations, opts = {}) {
  const { headerFooter = false, logoUrl = '' } = opts || {};
  const { root, inner } = buildRoot({ landscape: false, headerFooter, logoUrl });

  // Masthead (title + brand)
  const masthead = el('div', { class: 'exp-masthead' }, [
    el('div', { class: 'title', text: L('Expenses Sheet', 'ورقة المصاريف') }),
    el('div', { class: 'brand-info' }, [
      el('div', { class: 'text', text: (opts.companyName || project?.clientCompany || project?.title || 'Company') }),
      el('div', { class: 'meta' }, [
        el('span', { class: 'line', text: `${L('CR','السجل التجاري')}: ${opts.companyCR || ''}` }),
        el('span', { class: 'line', text: `${L('Media License','ترخيص إعلامي')}: ${opts.companyLicense || ''}` })
      ])
    ]),
    el('div', { class: 'brand-logo' }, [
      el('img', { src: logoUrl, alt: 'Logo', referrerpolicy: 'no-referrer' })
    ])
  ]);
  inner.appendChild(masthead);

  // Meta grid
  const meta = el('div', { class: 'tpl-meta' });
  meta.appendChild(metaCell(L('Production Co.', 'شركة الإنتاج'), project?.clientCompany || ''));
  meta.appendChild(metaCell(L('Project Title', 'اسم المشروع'), project?.title || ''));
  meta.appendChild(metaCell(L('Budget Date', 'تاريخ الميزانية'), new Date().toISOString().slice(0, 10)));
  meta.appendChild(metaCell(L('Prepared by', 'إعداد'), ''));
  const locs = Array.from(new Set((reservations || []).map((r) => (r?.location || '').trim()).filter(Boolean))).join(', ');
  meta.appendChild(metaCell(L('Locations', 'المواقع'), locs));
  meta.appendChild(metaCell(L('Shoot Days', 'أيام التصوير'), ''));
  inner.appendChild(meta);

  // Expenses table
  const table = el('table', { class: 'exp-table', id: 'expenses-table', 'data-editable-table': 'expenses' });
  const thead = el('thead');
  const head = el('tr');
  const headCols = [
    { text: L('CODE','الكود'), cls: 'exp-col-code' },
    { text: L('DESCRIPTION','الوصف'), cls: 'exp-col-item' },
    { text: L('AMOUNT','الكمية'), cls: 'exp-col-amount' },
    { text: L('PAID','مدفوع'), cls: 'exp-col-paid' },
    { text: 'X', cls: 'exp-col-x' },
    { text: L('RATE','السعر'), cls: 'exp-col-rate' },
    { text: L('TAB','تب'), cls: 'exp-col-tab' },
    { text: L('TOTAL','الإجمالي'), cls: 'exp-col-total' },
  ];
  headCols.forEach((c) => head.appendChild(el('th', { class: c.cls, text: c.text })));
  thead.appendChild(head);
  table.appendChild(thead);
  const tb = el('tbody');

  const mkGroupBar = (label, cls) => el('tr', { 'data-group-bar': 'true' }, [
    el('td', { colspan: '8' }, [el('div', { class: `exp-group-bar ${cls || ''}`, text: label })])
  ]);

  const mkSubHeader = (code, label) => el('tr', { class: 'exp-subheader', 'data-subgroup-header': code, 'data-subgroup': code }, [
    el('th', { class: 'exp-col-code', text: code }),
    el('th', { class: 'exp-col-item', text: label }),
    el('th', { class: 'exp-col-amount', text: L('AMOUNT','الكمية') }),
    el('th', { class: 'exp-col-paid', text: L('PAID','مدفوع') }),
    el('th', { class: 'exp-col-x', text: 'X' }),
    el('th', { class: 'exp-col-rate', text: L('RATE','السعر') }),
    el('th', { class: 'exp-col-tab', text: L('TAB','تب') }),
    el('th', { class: 'exp-col-total', text: L('TOTAL','الإجمالي') }),
  ]);

  const mkItemRow = (code = '', desc = '') => el('tr', { 'data-row': 'item' }, [
    el('td', { class: 'code', 'data-editable': 'true', contenteditable: 'true', text: code }),
    el('td', { 'data-editable': 'true', contenteditable: 'true', text: desc }),
    el('td', { 'data-editable': 'true', contenteditable: 'true', text: '1' }),
    el('td', { 'data-editable': 'true', contenteditable: 'true' }),
    el('td', { 'data-editable': 'true', contenteditable: 'true', text: '1' }),
    el('td', { 'data-editable': 'true', contenteditable: 'true' }),
    el('td', { 'data-editable': 'true', contenteditable: 'true', text: '1' }),
    el('td', { class: 'total', text: '' }),
  ]);

  const mkSubtotalRow = (code) => el('tr', { class: 'exp-summary-row', 'data-subgroup-subtotal': code }, [
    el('td', { class: 'code', text: code }),
    el('td', { text: L('Subtotal','المجموع الفرعي') }),
    el('td', { colspan: '5' }),
    el('td', { class: 'subtotal', 'data-subtotal': code, text: '' }),
  ]);

  const mkGroupTotalRow = (label, key) => el('tr', { class: 'exp-summary-row', 'data-group-total': key }, [
    el('td', { colspan: '7', text: label }),
    el('td', { class: 'total', 'data-total-group': key, text: '' }),
  ]);

  const addSubGroup = (groupKey, code, label, n = 2) => {
    tb.appendChild(mkSubHeader(code, label));
    for (let i = 0; i < n; i += 1) tb.appendChild(mkItemRow());
    tb.appendChild(mkSubtotalRow(code));
    // hidden marker to map subgroup to parent group
    const marker = el('tr', { 'data-subgroup-marker': code, 'data-parent-group': groupKey, style: 'display:none' });
    tb.appendChild(marker);
  };

  // ABOVE THE LINE
  tb.appendChild(mkGroupBar(L('ABOVE THE LINE','فوق الخط'), 'exp-group-bar--atl'));
  addSubGroup('atl', '12-00', 'PRODUCERS UNIT', 2);
  addSubGroup('atl', '13-00', 'DIRECTOR & STAFF', 2);
  addSubGroup('atl', '14-00', 'CAST', 3);
  tb.appendChild(mkGroupTotalRow(L('Total Above the Line','إجمالي فوق الخط'), 'atl'));

  // PRODUCTION EXPENSES
  tb.appendChild(mkGroupBar(L('PRODUCTION EXPENSES','مصاريف الإنتاج'), 'exp-group-bar--prod'));
  addSubGroup('prod', '20-00', 'PRODUCTION STAFF', 3);
  addSubGroup('prod', '22-00', 'SET DESIGN', 3);
  addSubGroup('prod', '23-00', 'SET CONSTRUCTION', 2);
  addSubGroup('prod', '24-00', 'CASTING SERVICES', 1);
  addSubGroup('prod', '28-00', 'WARDROBE', 3);
  addSubGroup('prod', '29-00', 'ELECTRIC', 3);
  addSubGroup('prod', '30-00', 'CAMERA', 3);
  addSubGroup('prod', '33-00', 'TRANSPORTATION', 1);
  addSubGroup('prod', '34-00', 'LOCATIONS', 2);
  tb.appendChild(mkGroupTotalRow(L('Total Production','إجمالي الإنتاج'), 'prod'));

  // POST-PRODUCTION
  tb.appendChild(mkGroupBar(L('POST-PRODUCTION EXPENSES','مصاريف ما بعد الإنتاج'), 'exp-group-bar--post'));
  addSubGroup('post', '45-00', 'FILM EDITING', 2);
  addSubGroup('post', '49-00', 'VOICE OVER', 1);
  tb.appendChild(mkGroupTotalRow(L('Total Post Production','إجمالي ما بعد الإنتاج'), 'post'));

  // GRAND TOTAL
  const grand = el('tr', { class: 'exp-grand-total' }, [
    el('td', { colspan: '7', text: L('GRAND TOTAL','الإجمالي الكلي') }),
    el('td', { 'data-grand-total': 'true', text: '' })
  ]);
  tb.appendChild(grand);

  table.appendChild(tb);
  inner.appendChild(table);

  // Summary footer for A4 page
  const summary = el('div', { id: 'expenses-summary', class: 'tpl-summary' });
  const taxLabel = L(`Tax ${Math.round(PROJECT_TAX_RATE * 100)}%`, `الضريبة ${Math.round(PROJECT_TAX_RATE * 100)}%`);
  summary.innerHTML = `
    <div class="tpl-summary-row"><span>${L('Subtotal','المجموع')}</span><span data-summary-subtotal></span></div>
    <div class="tpl-summary-row"><span>${taxLabel}</span><span data-summary-tax></span></div>
    <div class="tpl-summary-row tpl-summary-total"><span>${L('Total','الإجمالي')}</span><span data-summary-total></span></div>
  `;
  inner.appendChild(summary);
  return root;
}

function buildCallSheetPage(project, reservations, opts = {}) {
  const { headerFooter = false, logoUrl = '' } = opts || {};
  const { root, inner } = buildRoot({ landscape: true, headerFooter, logoUrl });
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

function buildShotListPage(project, reservations, opts = {}) {
  const { headerFooter = false, logoUrl = '' } = opts || {};
  const { root, inner } = buildRoot({ landscape: true, headerFooter, logoUrl });
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
  const hf = readHeaderFooterOptions();
  let pageRoot = null;
  if (type === 'callsheet') pageRoot = buildCallSheetPage(project, reservations, hf);
  else if (type === 'shotlist') pageRoot = buildShotListPage(project, reservations, hf);
  else pageRoot = buildExpensesPage(project, reservations, hf);
  host.appendChild(pageRoot);
  // Update computed totals where applicable
  recomputeExpensesSubtotals();
  try { autoPaginateTemplates(); } catch (_) {}
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
  const isNew = table.classList.contains('exp-table');

  // New exp-table calculation
  if (isNew) {
    const number = (txt, def = 0) => {
      const n = Number(String(txt || '').replace(/[^\d.\.-]/g, ''));
      return Number.isFinite(n) ? n : def;
    };
    const groupTotals = { atl: 0, prod: 0, post: 0 };
    let grand = 0;

    // For each subgroup header
    const headers = Array.from(table.querySelectorAll('tbody tr[data-subgroup-header]'));
    headers.forEach((hdr) => {
      const code = hdr.getAttribute('data-subgroup');
      let subtotal = 0;
      let tr = hdr.nextElementSibling;
      while (tr && !tr.hasAttribute('data-subgroup-header') && !tr.hasAttribute('data-subgroup-subtotal')) {
        if (tr.getAttribute('data-row') === 'item') {
          const tds = tr.children;
          const amount = number(tds[2]?.textContent, 1);
          const x = number(tds[4]?.textContent, 1);
          const rate = number(tds[5]?.textContent, 0);
          const tab = number(tds[6]?.textContent, 1);
          const total = amount * x * rate * tab;
          if (tds[7]) tds[7].textContent = String(total.toFixed(2));
          subtotal += total;
        }
        tr = tr.nextElementSibling;
      }
      // write subgroup subtotal
      const subCell = table.querySelector(`[data-subtotal="${CSS.escape(code)}"]`);
      if (subCell) subCell.textContent = String(subtotal.toFixed(2));
      grand += subtotal;
      // map to parent group
      const marker = table.querySelector(`tr[data-subgroup-marker="${CSS.escape(code)}"]`);
      const parent = marker?.getAttribute('data-parent-group') || null;
      if (parent && groupTotals[parent] != null) groupTotals[parent] += subtotal;
    });

    // group totals
    Object.entries(groupTotals).forEach(([key, val]) => {
      const cell = table.querySelector(`[data-total-group="${CSS.escape(key)}"]`);
      if (cell) cell.textContent = String(val.toFixed(2));
    });
    const gcell = table.querySelector('[data-grand-total]');
    if (gcell) gcell.textContent = String(grand.toFixed(2));

    // Summary footer
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
    return;
  }

  // Legacy table fallback
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
  try { requestAnimationFrame(() => { try { autoPaginateTemplates(); } catch (_) {} }); } catch (_) {}
}

function autoPaginateTemplates() {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  if (type !== 'expenses') return; // حاليا نطبّق التقسيم التلقائي على ورقة المصاريف فقط

  const pagesWrap = root.querySelector('[data-a4-pages]');
  const firstPage = pagesWrap?.querySelector('.a4-page');
  const firstInner = firstPage?.querySelector('.a4-inner');
  if (!firstInner) return;

  const headerFooter = false;
  const logoUrl = COMPANY_INFO.logoUrl;

  // Gather original blocks
  const masthead = firstInner.querySelector('.exp-masthead');
  const meta = firstInner.querySelector('.tpl-meta');
  const table = firstInner.querySelector('#expenses-table');
  const summary = firstInner.querySelector('#expenses-summary');
  if (!table) return;

  // Reset pages to rebuild
  while (pagesWrap.firstChild) pagesWrap.removeChild(pagesWrap.firstChild);

  // Start first page and keep masthead + meta in first page
  let { page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false });
  pagesWrap.appendChild(currentPage);
  if (masthead) currentInner.appendChild(masthead);
  if (meta) currentInner.appendChild(meta);

  // Create a working table with thead copy
  const thead = table.querySelector('thead');
  const makeTable = () => {
    const t = document.createElement('table');
    t.className = table.className;
    t.id = 'expenses-table';
    t.setAttribute('data-editable-table', 'expenses');
    const head = thead ? thead.cloneNode(true) : document.createElement('thead');
    t.appendChild(head);
    t.appendChild(document.createElement('tbody'));
    return t;
  };

  let workingTable = makeTable();
  currentInner.appendChild(workingTable);
  const rows = Array.from(table.querySelectorAll('tbody > tr'));
  const appendRow = (row) => {
    workingTable.tBodies[0].appendChild(row);
    // If overflow, undo and start a new page
    const fits = currentInner.scrollHeight <= currentInner.clientHeight;
    if (!fits) {
      // remove row and move to next page
      workingTable.tBodies[0].removeChild(row);
      ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
      pagesWrap.appendChild(currentPage);
      workingTable = makeTable();
      currentInner.appendChild(workingTable);
      workingTable.tBodies[0].appendChild(row);
    }
  };
  rows.forEach((row) => appendRow(row));

  // Place summary at the end (last page)
  if (summary) currentInner.appendChild(summary);

  // Update page numbers if header/footer enabled
  if (headerFooter) {
    const count = pagesWrap.querySelectorAll('.a4-page').length;
    Array.from(pagesWrap.querySelectorAll('.a4-page')).forEach((p, i) => {
      const numEl = p.querySelector('[data-page-num]');
      const countEl = p.querySelector('[data-page-count]');
      if (numEl) numEl.textContent = String(i + 1);
      if (countEl) countEl.textContent = String(count);
    });
  }
}

// bindPreviewAdjustControls removed

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

function focusFirstEditableCell(tr, preferCol = 0) {
  if (!tr) return;
  const cells = Array.from(tr.children);
  // Try preferred column first
  const preferred = cells[preferCol];
  if (preferred && preferred.hasAttribute('contenteditable')) { preferred.focus(); return; }
  const candidate = cells.find((td) => td.hasAttribute('contenteditable'));
  candidate?.focus();
}

function addRowBelow(tr) {
  if (!tr) return null;
  const tbody = tr.parentElement;
  const clone = tr.cloneNode(true);
  clone.querySelectorAll('[contenteditable]')?.forEach((el) => { el.textContent = ''; });
  tbody.insertBefore(clone, tr.nextElementSibling);
  return clone;
}

function moveRow(tr, dir = -1) {
  if (!tr) return;
  const tbody = tr.parentElement;
  if (dir < 0) {
    const prev = tr.previousElementSibling;
    if (prev && !isSpecialRow(prev)) tbody.insertBefore(tr, prev);
  } else {
    const next = tr.nextElementSibling;
    if (next) {
      const afterNext = next.nextElementSibling;
      if (!isSpecialRow(next)) tbody.insertBefore(next, tr); // swap
      else if (afterNext && !isSpecialRow(afterNext)) tbody.insertBefore(tr, afterNext.nextElementSibling);
    }
  }
}

function deleteRow(tr) {
  const tbody = tr?.parentElement;
  if (!tbody) return;
  if (isSpecialRow(tr)) return;
  tbody.removeChild(tr);
}

function handleTableKeydown(e) {
  const target = e.target;
  if (!target || !target.closest('table.tpl-table')) return;
  const table = target.closest('table.tpl-table');
  const tr = target.closest('tr');
  if (!tr) return;

  // Enter -> add row below
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const newRow = addRowBelow(tr);
    if (newRow) {
      focusFirstEditableCell(newRow);
      if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
        recomputeExpensesSubtotals();
      }
    }
    return;
  }

  // Alt+ArrowUp / Alt+ArrowDown to move row
  if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
    e.preventDefault();
    moveRow(tr, e.key === 'ArrowDown' ? 1 : -1);
    if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
      recomputeExpensesSubtotals();
    }
    return;
  }

  // Delete to remove row (avoid when selection spans text)
  if ((e.key === 'Delete' || e.key === 'Backspace') && e.ctrlKey) {
    e.preventDefault();
    deleteRow(tr);
    if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
      recomputeExpensesSubtotals();
    }
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
  const langBtn = document.getElementById('templates-lang-toggle');
  if (langBtn) {
    const updateBtn = () => { langBtn.textContent = TEMPLATE_LANG === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${TEMPLATE_LANG.toUpperCase()}`; };
    updateBtn();
    langBtn.addEventListener('click', () => {
      setTemplateLang(TEMPLATE_LANG === 'ar' ? 'en' : 'ar');
      updateBtn();
      renderTemplatesPreview();
    });
  }

  // Preview adjust controls removed
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
  // Recompute totals on live edits in contenteditable cells
  document.getElementById('templates-preview-host')?.addEventListener('input', (e) => {
    if ((e.target instanceof HTMLElement) && e.target.isContentEditable) {
      recomputeExpensesSubtotals();
    }
  });
  // Paste from Excel/Sheets into tables
  document.getElementById('templates-preview-host')?.addEventListener('paste', handleTablePaste);
  document.getElementById('templates-preview-host')?.addEventListener('keydown', handleTableKeydown, true);

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
