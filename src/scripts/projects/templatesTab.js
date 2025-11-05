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
import {
  patchHtml2CanvasColorParsing,
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions,
  revertStyleMutations,
  injectExportSanitizer,
  removeExportSanitizer,
} from '../canvasColorUtils.js';
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

// Utilities to ensure deterministic capture (fonts/images fully loaded)
async function waitForFontsReady() {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (_) {}
}
function waitForImages(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (!imgs.length) return Promise.resolve();
  return Promise.all(imgs.map((img) => new Promise((resolve) => {
    try {
      if (img.complete && img.naturalWidth > 0) return resolve();
      const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); resolve(); };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    } catch (_) { resolve(); }
  })));
}
async function ensureAssetsReady(container) {
  await waitForFontsReady();
  await waitForImages(container || document);
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
  const dir = (TEMPLATE_LANG === 'ar') ? 'rtl' : 'ltr';
  const root = el('div', { id: 'templates-a4-root', 'data-render-context': 'preview', dir });
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
  // Explicit multi-page mode (skip auto-paginate splitter)
  try { root.setAttribute('data-exp-mode', 'multipage'); } catch(_) {}

  // Masthead (title + brand)
  const masthead = el('div', { class: 'exp-masthead' }, [
    // ضع الشعار أولاً ليكون على اليمين (direction: rtl)
    el('div', { class: 'brand-logo' }, [
      el('img', { src: logoUrl, alt: 'Logo', referrerpolicy: 'no-referrer' })
    ]),
    el('div', { class: 'brand-info' }, [
      el('div', { class: 'text', text: (opts.companyName || project?.clientCompany || project?.title || 'Company') }),
      el('div', { class: 'meta' }, [
        el('span', { class: 'line', text: `${L('CR','السجل التجاري')}: ${opts.companyCR || ''}` }),
        el('span', { class: 'line', text: `${L('Media License','ترخيص إعلامي')}: ${opts.companyLicense || ''}` })
      ])
    ]),
    el('div', { class: 'title', text: L('Expenses Sheet', 'ورقة المصاريف') })
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

  // Top Sheet as multiple small tables (title as caption, then header, then rows)
  const topWrap = el('div', { id: 'expenses-top-sheet' });
  const mkTopRow = (code, label) => el('tr', { 'data-top-row': code }, [
    el('td', { class: 'code', text: code }),
    el('td', { class: 'exp-top-label', text: label }),
    el('td', { 'data-top-count': code, text: '' }),
    el('td', { 'data-top-total': code, text: '' })
  ]);
  const mkTopGroupTotal = (label, key) => el('tr', { class: 'exp-summary-row', 'data-top-group-total': key }, [
    el('td', { colspan: '3', text: label }),
    el('td', { 'data-top-total-group': key, text: '' })
  ]);
  const mkTopTable = (title, codes, cls) => {
    const tbl = el('table', { class: 'exp-table exp-top-table' });
    const cap = el('caption', { class: 'exp-group-cap' }, [ el('div', { class: `exp-group-bar ${cls||''}`, text: title }) ]);
    tbl.appendChild(cap);
    const thead = el('thead');
    const trh = el('tr');
    [
      { text: L('CODE','الكود'), cls: 'exp-top-col-code' },
      { text: L('DESCRIPTION','الوصف'), cls: 'exp-top-col-label' },
      { text: L('COUNT','العدد'), cls: 'exp-top-col-count' },
      { text: L('TOTAL','الإجمالي'), cls: 'exp-top-col-total' },
    ].forEach((c) => trh.appendChild(el('th', { class: c.cls, text: c.text })));
    thead.appendChild(trh);
    tbl.appendChild(thead);
    const body = el('tbody');
    codes.forEach((c) => body.appendChild(mkTopRow(c.code, c.label)));
    // group total row at end
    const totalLabel = (cls && cls.includes('atl')) ? L('Total Above the Line','إجمالي فوق الخط') : (cls && cls.includes('prod')) ? L('Total Production','إجمالي الإنتاج') : L('Total Post Production','إجمالي ما بعد الإنتاج');
    body.appendChild(mkTopGroupTotal(totalLabel, cls?.includes('atl') ? 'atl' : cls?.includes('prod') ? 'prod' : 'post'));
    tbl.appendChild(body);
    return tbl;
  };
  topWrap.appendChild(mkTopTable(L('ABOVE THE LINE','فوق الخط'), [
    { code: '12-00', label: 'PRODUCERS UNIT' },
    { code: '13-00', label: 'DIRECTOR & STAFF' },
    { code: '14-00', label: 'CAST' },
  ], 'exp-group-bar--atl'));
  topWrap.appendChild(mkTopTable(L('PRODUCTION EXPENSES','مصاريف الإنتاج'), [
    { code: '20-00', label: 'PRODUCTION STAFF' },
    { code: '22-00', label: 'SET DESIGN' },
    { code: '23-00', label: 'SET CONSTRUCTION' },
    { code: '24-00', label: 'CASTING SERVICES' },
    { code: '28-00', label: 'WARDROBE' },
    { code: '29-00', label: 'ELECTRIC' },
    { code: '30-00', label: 'CAMERA' },
    { code: '33-00', label: 'TRANSPORTATION' },
    { code: '34-00', label: 'LOCATIONS' },
  ], 'exp-group-bar--prod'));
  topWrap.appendChild(mkTopTable(L('POST-PRODUCTION EXPENSES','مصاريف ما بعد الإنتاج'), [
    { code: '45-00', label: 'FILM EDITING' },
    { code: '49-00', label: 'VOICE OVER' },
  ], 'exp-group-bar--post'));
  // GRAND TOTAL separate bar
  const gtbl = el('table', { class: 'exp-table exp-top-table exp-top-grand' });
  const gbody = el('tbody');
  gbody.appendChild(el('tr', { class: 'exp-grand-total' }, [
    el('td', { colspan: '3', text: L('GRAND TOTAL','الإجمالي الكلي') }),
    el('td', { 'data-top-grand': 'true', text: '' })
  ]));
  gtbl.appendChild(gbody);
  topWrap.appendChild(gtbl);
  inner.appendChild(topWrap);

  // Column definitions used for all details tables
  const headCols = [
    { text: L('CODE','الكود'), cls: 'exp-col-code' },
    { text: L('DESCRIPTION','الوصف'), cls: 'exp-col-item' },
    { text: L('AMOUNT','الكمية'), cls: 'exp-col-amount' },
    { text: L('PAID','مدفوع'), cls: 'exp-col-paid' },
    { text: 'X', cls: 'exp-col-x' },
    { text: L('RATE','السعر'), cls: 'exp-col-rate' },
    { text: L('TAB','تب'), cls: 'exp-col-tab' },
    { text: L('TOTAL','الإجمالي'), cls: 'exp-col-total' },
    { text: '', cls: 'exp-col-actions' },
  ];
  const makeDetailsTable = (groupKey, groupTitle, subDefs) => {
    const table = el('table', { class: 'exp-table exp-details', 'data-editable-table': 'expenses', 'data-group': groupKey });
    const thead = el('thead');
    const head = el('tr');
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
      el('th', { class: 'exp-col-actions', text: '' }),
    ]);

    const mkItemRow = (code = '', desc = '', alt = false) => el('tr', { 'data-row': 'item', class: alt ? 'exp-row-alt' : '' }, [
      el('td', { class: 'code', 'data-editable': 'true', contenteditable: 'true', text: code }),
      el('td', { 'data-editable': 'true', contenteditable: 'true', text: desc }),
      el('td', { 'data-editable': 'true', contenteditable: 'true', 'data-num': 'true', dir: 'ltr', style: 'direction:ltr;', text: '1' }),
      el('td', { 'data-editable': 'true', contenteditable: 'true' }),
      el('td', { 'data-editable': 'true', contenteditable: 'true', 'data-num': 'true', dir: 'ltr', style: 'direction:ltr;', text: '1' }),
      el('td', { 'data-editable': 'true', contenteditable: 'true', 'data-num': 'true', dir: 'ltr', style: 'direction:ltr;' }),
      el('td', { 'data-editable': 'true', contenteditable: 'true', 'data-num': 'true', dir: 'ltr', style: 'direction:ltr;', text: '1' }),
      el('td', { class: 'total', 'data-num': 'true', dir: 'ltr', style: 'direction:ltr;', text: '' }),
      el('td', {}, [el('div', { class: 'tpl-actions' }, [
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-up', text: '↑' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-down', text: '↓' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-add', text: '+' }),
        el('button', { class: 'tpl-action-btn', 'data-action': 'row-delete', text: '×' }),
      ])]),
    ]);

    const mkSubtotalRow = (code) => el('tr', { class: 'exp-summary-row', 'data-subgroup-subtotal': code }, [
      el('td', { class: 'code', text: code }),
      el('td', { text: L('Subtotal','المجموع الفرعي') }),
      el('td', { colspan: '5' }),
      el('td', { class: 'subtotal', 'data-subtotal': code, text: '' }),
      el('td', { text: '' }),
    ]);

    const mkGroupTotalRow = (label, key) => el('tr', { class: 'exp-summary-row', 'data-group-total': key }, [
      el('td', { colspan: '8', text: label }),
      el('td', { class: 'total', 'data-total-group': key, text: '' }),
    ]);
    const addSubGroup = (groupKey2, code, label, n = 2) => {
      tb.appendChild(mkSubHeader(code, label));
      for (let i = 0; i < n; i += 1) tb.appendChild(mkItemRow('', '', i % 2 === 1));
      tb.appendChild(mkSubtotalRow(code));
      // hidden marker to map subgroup to parent group
      const marker = el('tr', { 'data-subgroup-marker': code, 'data-parent-group': groupKey2, style: 'display:none' });
      tb.appendChild(marker);
    };

    // Group header bar
    tb.appendChild(mkGroupBar(groupTitle, `exp-group-bar--${groupKey}`));

    // Subgroups
    subDefs.forEach((def) => addSubGroup(groupKey, def.code, def.label, def.n || def.rows || 2));
    // Group total row
    const label = groupKey === 'atl' ? L('Total Above the Line','إجمالي فوق الخط') : groupKey === 'prod' ? L('Total Production','إجمالي الإنتاج') : L('Total Post Production','إجمالي ما بعد الإنتاج');
    tb.appendChild(mkGroupTotalRow(label, groupKey));

    // For unified grand total, add marker row that recompute function will ignore
    table.appendChild(tb);
    return table;
  };

  // Build group pages under Top Sheet
  const pagesWrap = root.querySelector('[data-a4-pages]');
  const addGroupPage = (groupKey, title, subDefs) => {
    const { page, inner: pgInner } = createPageSection({ headerFooter, logoUrl, landscape: false });
    const tbl = makeDetailsTable(groupKey, title, subDefs);
    pgInner.appendChild(tbl);
    pagesWrap.appendChild(page);
  };

  addGroupPage('atl', L('ABOVE THE LINE','فوق الخط'), [
    { code: '12-00', label: 'PRODUCERS UNIT', rows: 2 },
    { code: '13-00', label: 'DIRECTOR & STAFF', rows: 2 },
    { code: '14-00', label: 'CAST', rows: 6 },
  ]);
  addGroupPage('prod', L('PRODUCTION EXPENSES','مصاريف الإنتاج'), [
    { code: '20-00', label: 'PRODUCTION STAFF', rows: 3 },
    { code: '22-00', label: 'SET DESIGN', rows: 3 },
    { code: '23-00', label: 'SET CONSTRUCTION', rows: 2 },
    { code: '24-00', label: 'CASTING SERVICES', rows: 2 },
    { code: '28-00', label: 'WARDROBE', rows: 4 },
    { code: '29-00', label: 'ELECTRIC', rows: 4 },
    { code: '30-00', label: 'CAMERA', rows: 4 },
    { code: '33-00', label: 'TRANSPORTATION', rows: 2 },
    { code: '34-00', label: 'LOCATIONS', rows: 2 },
  ]);
  addGroupPage('post', L('POST-PRODUCTION EXPENSES','مصاريف ما بعد الإنتاج'), [
    { code: '45-00', label: 'FILM EDITING', rows: 2 },
    { code: '49-00', label: 'VOICE OVER', rows: 2 },
  ]);

  // لا حاجة لصندوق الملخص أسفل GRAND TOTAL في التوب شيت
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
  try { paginateExpDetailsTables(); } catch (_) {}
  try { ensurePdfTunerUI(); } catch (_) {}
}

async function printTemplatesPdf() {
  const host = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (!host) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const landscape = type !== 'expenses';
  const html2pdf = await ensureHtml2Pdf();

  // Dimensions for A4 at CSS 96dpi
  const A4_W_PX = landscape ? 1123 : 794;
  const A4_H_PX = landscape ? 794 : 1123;
  const A4_W_MM = landscape ? 297 : 210;
  const A4_H_MM = landscape ? 210 : 297;

  const JsPdfCtor = (window.jspdf && window.jspdf.jsPDF) || (window.jsPDF && window.jsPDF.jsPDF);
  const h2c = window.html2canvas;
  if (!(typeof JsPdfCtor === 'function' && typeof h2c === 'function')) {
    // Fallback through html2pdf: render from an isolated "export" scope
    // to avoid preview gaps/margins pushing content down.
    const wrap = document.createElement('div');
    Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
    const scope = document.createElement('div');
    scope.id = 'templates-a4-root';
    scope.setAttribute('data-render-context', 'export');
    scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
    // Clone current preview content into the isolated export scope
    const pagesWrap = document.createElement('div');
    pagesWrap.setAttribute('data-a4-pages', '');
    const clone = host.querySelector('[data-a4-pages]')?.cloneNode(true) || host.cloneNode(true);
    pagesWrap.innerHTML = '';
    if (clone.classList && clone.hasAttribute('data-a4-pages')) {
      // If we cloned the pages container, use it directly
      scope.appendChild(clone);
    } else {
      // Otherwise append pages into a fresh container
      Array.from(host.children).forEach((c) => pagesWrap.appendChild(c.cloneNode(true)));
      scope.appendChild(pagesWrap);
    }
    wrap.appendChild(scope);
    document.body.appendChild(wrap);

    try {
      // Force إزالة أي حشو علوي داخل صفحات التصدير وضبط الإزاحة وفق الإعدادات
      try { scope.querySelectorAll('.a4-inner').forEach((el) => { el.style.paddingTop = '0mm'; }); } catch(_) {}
      // تطبيق إزاحة أعلى/يمين في مسار html2pdf الاحتياطي أيضاً
      try {
        const scalePct = Number(localStorage.getItem('templatesPdf.scalePct')) || 100;
        const s = Math.max(0.98, Math.min(1.05, scalePct / 100));
        const pages = Array.from(scope.querySelectorAll('.a4-page'));
        pages.forEach((pg, idx) => {
          const rightMm = readPdfPrefForPage('templatesPdf.shiftRightMm', idx, (Number(localStorage.getItem('templatesPdf.shiftRightMm')) || 40));
          const defaultFudge = (idx === 0) ? (Number(localStorage.getItem('templatesPdf.tightFudgeMm')) || -144.5) : 0;
          const fudge = (readPdfPrefForPage('templatesPdf.tightFudgeMm', idx, defaultFudge) || 0);
          const globalAll = Number(localStorage.getItem('templatesPdf.globalAllYmm')) || 0;
          pg.style.transformOrigin = 'top left';
          pg.style.transform = `translate(${rightMm}mm, ${fudge + globalAll}mm) scale(${s})`;
        });
        // Remove pages that have no data rows to avoid blank pages in fallback
        pages.forEach((pg) => {
          const hasDataRow = pg.querySelector('table.exp-details tbody tr[data-row="item"]');
          const hasTopSheet = pg.querySelector('#expenses-top-sheet');
          if (!hasTopSheet && !hasDataRow) {
            try { pg.parentElement.removeChild(pg); } catch(_) {}
          }
        });
      } catch(_) {}

      // Ensure assets ready before rendering
      await ensureAssetsReady(scope);
      await html2pdf()
        .set({
          margin: 0,
          html2canvas: { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] },
          image: { type: 'jpeg', quality: 0.98 }
        })
        .from(scope)
        .save(`template-${type}.pdf`);
    } finally {
      try { wrap.parentNode?.removeChild(wrap); } catch (_) {}
    }
    return;
  }

  // Preferences for slight alignment tweaks
  const prefs = (() => {
    try {
      return {
        rightMm: (Number(localStorage.getItem('templatesPdf.shiftRightMm')) || 40),
        topMm: Number(localStorage.getItem('templatesPdf.shiftTopMm')) || 0,
        scale: (Number(localStorage.getItem('templatesPdf.scalePct')) || 100) / 100,
      };
    } catch (_) { return { rightMm: 40, topMm: 0, scale: 1 }; }
  })();

  // Helper fns as used in reports exporter
  const CSS_DPI = 96; const PX_PER_MM = CSS_DPI / 25.4;
  const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
  const baseOpts = { scale: captureScale, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', letterRendering: false, removeContainer: false };
  const measureTopWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return y; } } } return 0; } catch (_) { return 0; } };
  // Detect the first significant content row, ignoring the thin page border.
  // Scans the central 60% width and skips the first 4px rows, requiring a
  // substantial number of dark pixels so a 1px border does not trigger.
  const measureContentTopIgnoringBorderPx = (canvas, threshold = 244) => {
    try {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.2);
      const regionW = Math.max(10, Math.floor(width * 0.6));
      const minDark = Math.max(12, Math.ceil(regionW * 0.08));
      const yStart = 4; // skip possible 1px border + antialias row
      for (let y = yStart; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) {
            if (++darkCount >= minDark) return y;
          }
        }
      }
      return 0;
    } catch (_) { return 0; }
  };
  // Scan right region for first non-white pixels (better at detecting logo/title area)
  const measureRightRegionContentTopPx = (canvas, threshold = 244) => {
    try {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.55);
      const regionW = Math.max(10, width - xStart);
      const minDark = Math.max(3, Math.ceil(regionW * 0.015));
      for (let y = 0; y < height; y += 2) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        let darkCount = 0;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; }
        }
      }
      return 0;
    } catch (_) { return 0; }
  };
  const measureBottomWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = height-1; y >= 0; y -= 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return (height-1-y); } } } return 0; } catch (_) { return 0; } };
  const cropCanvasVertical = (canvas, topPx, bottomPx) => { try { const { width, height } = canvas; const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx))); const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx))); const newH = Math.max(1, height - cropTop - cropBottom); if (cropTop === 0 && cropBottom === 0) return canvas; const out = document.createElement('canvas'); out.width = width; out.height = newH; const ctx = out.getContext('2d'); ctx.drawImage(canvas, 0, -cropTop); return out; } catch (_) { return canvas; } };
  // Estimate if a canvas is nearly blank (no significant dark pixels)
  const isCanvasAlmostBlank = (canvas, threshold = 244) => {
    try {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      const xStart = Math.floor(width * 0.15);
      const regionW = Math.max(10, Math.floor(width * 0.70));
      const stepY = Math.max(4, Math.floor(height / 80));
      let darkTotal = 0;
      let samples = 0;
      for (let y = 6; y < height - 6; y += stepY) {
        const data = ctx.getImageData(xStart, y, regionW, 1).data;
        samples += regionW;
        for (let x = 0; x < regionW; x += 1) {
          const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2];
          if (r < threshold || g < threshold || b < threshold) darkTotal += 1;
        }
      }
      const coverage = darkTotal / Math.max(1, samples);
      return coverage < 0.001; // ~0.1% dark coverage treated as blank
    } catch (_) { return false; }
  };

  patchHtml2CanvasColorParsing();
  const doc = new JsPdfCtor({ unit: 'mm', format: 'a4', orientation: landscape ? 'landscape' : 'portrait', compress: true });
  const pages = Array.from(host.querySelectorAll('.a4-page'));
  let pdfPageIndex = 0;
  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    const wrap = document.createElement('div');
    Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
    const scope = document.createElement('div');
    scope.id = 'templates-a4-root';
    scope.setAttribute('data-render-context', 'export');
    scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
    scope.style.width = `${A4_W_PX}px`;
    scope.style.maxWidth = `${A4_W_PX}px`;
    scope.style.minWidth = `${A4_W_PX}px`;
    scope.style.background = '#ffffff';
    const pagesWrap = document.createElement('div');
    pagesWrap.setAttribute('data-a4-pages', '');
    const clone = page.cloneNode(true);
    clone.style.width = `${A4_W_PX}px`;
    clone.style.maxWidth = `${A4_W_PX}px`;
    clone.style.minWidth = `${A4_W_PX}px`;
    clone.style.height = `${A4_H_PX}px`;
    clone.style.maxHeight = `${A4_H_PX}px`;
    clone.style.minHeight = `${A4_H_PX}px`;
    clone.style.position = 'relative';
    clone.style.background = '#ffffff';
    clone.style.overflow = 'hidden';
    pagesWrap.appendChild(clone);
    scope.appendChild(pagesWrap);
    wrap.appendChild(scope);
    document.body.appendChild(wrap);

    const revert = [];
    const sanitizerHandle = injectExportSanitizer(scope);
    try { scrubUnsupportedColorFunctions(scope); sanitizeComputedColorFunctions(scope, window, revert); enforceLegacyColorFallback(scope, window, revert); } catch (_) {}

    // قياس موضع عنوان الصفحة داخل نسخة التصدير قبل الالتقاط لنهتم بألا نقتص فوقه
    const PX_PER_MM_EXPORT = 96 / 25.4;
    const mmToPx = (mm) => mm * PX_PER_MM_EXPORT * captureScale;
    let headerTopCssPx = 0; // in export clone (pre-crop, CSS px)
    try {
      const innerForHead = clone.querySelector('.a4-inner') || clone;
      const headerForHead = innerForHead.querySelector('.exp-masthead') || innerForHead.firstElementChild;
      if (headerForHead) {
        const baseRect0 = clone.getBoundingClientRect();
        const hdrRect0 = headerForHead.getBoundingClientRect();
        headerTopCssPx = Math.max(0, hdrRect0.top - baseRect0.top);
      }
    } catch (_) { headerTopCssPx = 0; }

    let canvas;
    try {
      // Ensure fonts and images are fully loaded before capture for consistency
      await ensureAssetsReady(scope);
      canvas = await h2c(clone, { ...baseOpts, scrollX: 0, scrollY: 0, windowWidth: A4_W_PX, windowHeight: A4_H_PX });
    } finally {
      try { revertStyleMutations(revert); } catch (_) {}
      try { removeExportSanitizer(scope, sanitizerHandle); } catch (_) {}
      wrap.parentNode?.removeChild(wrap);
    }

    if (!canvas) continue;
    // Skip truly blank pages early
    if (isCanvasAlmostBlank(canvas)) { continue; }
    const topWhitePx = measureTopWhitespacePx(canvas, 246);
    const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
    const visualTopPx = measureContentTopIgnoringBorderPx(canvas, 244);
    // زيادة قصّ الفراغ العلوي مع الحفاظ على هامش أمان قبل عنوان الصفحة
    let extraTrimMm = readPdfPrefForPage('templatesPdf.extraTrimMm', i, readPdfPref('templatesPdf.extraTrimMm', 14));
    let safeMarginMm = readPdfPrefForPage('templatesPdf.safeMarginMm', i, readPdfPref('templatesPdf.safeMarginMm', 0.5));
    extraTrimMm = Math.max(0, Math.min(40, Number(extraTrimMm) || 0));
    safeMarginMm = Math.max(0, Math.min(10, Number(safeMarginMm) || 0));
    const headerTopScaledPx = Math.max(0, headerTopCssPx * captureScale);
    const extraTrimPx = mmToPx(extraTrimMm);
    const safeMarginPx = mmToPx(safeMarginMm);
    const baseChosenTopPx = Math.max(topWhitePx, rightRegionTopPx, visualTopPx);
    const chosenTopPx = Math.min(Math.max(0, baseChosenTopPx + extraTrimPx), Math.max(0, headerTopScaledPx - safeMarginPx));
    const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
    const cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);
    // Guard: if cropped result is still almost blank, skip adding this page
    if (isCanvasAlmostBlank(cropped)) { continue; }

    // استخدم تحجيم 1:1 افتراضياً لضمان عدم إضافة فراغات هامشية
    const shrink = Math.max(0.98, Math.min(1, prefs.scale || 1));
    const targetWmm = A4_W_MM * shrink;
    const targetHmm = (cropped.height / cropped.width) * targetWmm;
    // Allow per-page right shift override
    let finalX = Number(readPdfPrefForPage('templatesPdf.shiftRightMm', i, (Number(prefs.rightMm) || 0))) || 0;

    // Compute placement to push content to the very top edge.
    const PX_PER_MM = 96 / 25.4;
    let previewHeaderTopCssPx = 0; // in on-screen preview page
    try {
      // Preview header position for the same logical page
      const previewInner = page.querySelector('.a4-inner') || page;
      const previewHeader = previewInner.querySelector('.exp-masthead') || previewInner.firstElementChild;
      if (previewHeader) {
        const pBase = page.getBoundingClientRect();
        const pHdr = previewHeader.getBoundingClientRect();
        previewHeaderTopCssPx = Math.max(0, pHdr.top - pBase.top);
      }
    } catch (_) { previewHeaderTopCssPx = 0; }

    // After cropping, the header moves up by `chosenTopPx` pixels.
    // Convert that in-cropped offset to mm using the final scaling.
    const mmPerPx = targetWmm / cropped.width;
    const headerInCroppedMm = Math.max(0, (headerTopCssPx - chosenTopPx) * mmPerPx);
    // Tight-top mode: ارفع المحتوى ليلامس أعلى الصفحة قدر الإمكان
    // تعويض افتراضي قوي للرفع (-166mm) ويمكن تعديله من LocalStorage
    const globalTightFudgeMm = (() => { try { const v = Number(localStorage.getItem('templatesPdf.tightFudgeMm')); return Number.isFinite(v) ? Math.max(-300, Math.min(300, v)) : -144.5; } catch(_) { return -144.5; } })();
    // إزاحة عامة إضافية اختيارية
    const globalYmm = (() => { try { const v = Number(localStorage.getItem('templatesPdf.globalYmm')); return Number.isFinite(v) ? Math.max(-40, Math.min(40, v)) : 0; } catch(_) { return 0; } })();
    const globalAllYmm = (() => { try { const v = Number(localStorage.getItem('templatesPdf.globalAllYmm')); return Number.isFinite(v) ? v : -1; } catch(_) { return -1; } })();
    // صفحات بعد الأولى: اجعل أول عنصر يلامس أعلى الصفحة بدقة
    let finalY;
    if (pdfPageIndex > 0) {
      const pageFudge = Number(readPdfPrefForPage('templatesPdf.tightFudgeMm', i, 0)) || 0;
      finalY = -headerInCroppedMm + pageFudge + globalAllYmm;
    } else {
      const pageFudge0 = Number(readPdfPrefForPage('templatesPdf.tightFudgeMm', i, globalTightFudgeMm)) || 0;
      finalY = (Number(prefs.topMm) || 0) - headerInCroppedMm + pageFudge0 + globalYmm + globalAllYmm;
    }
    // Clamp just in case (واسع للسماح بضبط قوي)
    if (finalY < -220) finalY = -220;
    if (finalY > 120) finalY = 120;
    if (pdfPageIndex > 0) doc.addPage();
    const img = cropped.toDataURL('image/jpeg', 0.95);
    doc.addImage(img, 'JPEG', finalX, finalY, targetWmm, targetHmm, `page-${pdfPageIndex + 1}`, 'FAST');
    pdfPageIndex += 1;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => requestAnimationFrame(r));
  }

  if (pdfPageIndex === 0) throw new Error('PDF generation produced no pages');
  try { doc.save(`template-${type}.pdf`); } catch { doc.save('template.pdf'); }
}

// ============== PDF Live Tuner ==============
function readPdfPref(key, def) {
  try {
    const v = localStorage.getItem(key);
    if (v == null) return def;
    const n = Number(v);
    return Number.isFinite(n) ? n : def;
  } catch (_) { return def; }
}

function writePdfPref(key, val) {
  try { localStorage.setItem(key, String(val)); } catch (_) {}
}

// Per-page overrides helpers
function getPdfPageOverrides() {
  try {
    const raw = localStorage.getItem('templatesPdf.pageOverrides');
    return raw ? JSON.parse(raw) : {};
  } catch(_) { return {}; }
}
function setPdfPageOverride(pageIndex, key, val) {
  try {
    const obj = getPdfPageOverrides();
    const idx = String(pageIndex);
    obj[idx] = obj[idx] || {};
    obj[idx][key] = Number(val);
    localStorage.setItem('templatesPdf.pageOverrides', JSON.stringify(obj));
  } catch(_) {}
}
function readPdfPrefForPage(key, pageIndex, defWhenMissing) {
  try {
    const obj = getPdfPageOverrides();
    const page = obj[String(pageIndex)];
    if (page && page[key] != null && Number.isFinite(Number(page[key]))) return Number(page[key]);
    return readPdfPref(key, defWhenMissing);
  } catch(_) { return readPdfPref(key, defWhenMissing); }
}
function clearPdfPageOverrides() {
  try { localStorage.removeItem('templatesPdf.pageOverrides'); } catch(_) {}
}

async function renderPdfLivePreview() {
  const host = document.querySelector('#templates-preview-host > #templates-a4-root');
  if (!host) return;
  const type = document.getElementById('templates-type')?.value || 'expenses';
  const landscape = type !== 'expenses';
  const html2pdf = await ensureHtml2Pdf();
  const h2c = window.html2canvas;
  if (typeof h2c !== 'function') return;

  const A4_W_PX = landscape ? 1123 : 794;
  const A4_H_PX = landscape ? 794 : 1123;
  const A4_W_MM = landscape ? 297 : 210;
  const A4_H_MM = landscape ? 210 : 297;
  const CSS_DPI = 96; const PX_PER_MM = CSS_DPI / 25.4;

  const selVal = document.getElementById('pdftun-page')?.value;
  const pageIndex = Math.max(0, Number(selVal ?? 0) || 0);
  const pagesAll = Array.from(host.querySelectorAll('.a4-page'));
  const page = pagesAll[pageIndex] || pagesAll[0];
  if (!page) return;

  // Build isolated export scope for a single page
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'fixed', top: '0', left: '-12000px', pointerEvents: 'none', zIndex: '-1', backgroundColor: '#ffffff' });
  const scope = document.createElement('div');
  scope.id = 'templates-a4-root';
  scope.setAttribute('data-render-context', 'export');
  scope.setAttribute('dir', host.getAttribute('dir') || document.documentElement.getAttribute('dir') || 'rtl');
  const pagesWrap = document.createElement('div');
  pagesWrap.setAttribute('data-a4-pages', '');
  const clone = page.cloneNode(true);
  clone.style.width = `${A4_W_PX}px`;
  clone.style.height = `${A4_H_PX}px`;
  clone.style.background = '#ffffff';
  clone.style.overflow = 'hidden';
  pagesWrap.appendChild(clone);
  scope.appendChild(pagesWrap);
  wrap.appendChild(scope);
  document.body.appendChild(wrap);

  // Helpers copied from export logic
  const captureScale = Math.min(2.0, Math.max(1.6, (window.devicePixelRatio || 1) * 1.25));
  const baseOpts = { scale: captureScale, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', letterRendering: false, removeContainer: false };
  const measureTopWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return y; } } } return 0; } catch (_) { return 0; } };
  const measureRightRegionContentTopPx = (canvas, threshold = 244) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; const xStart = Math.floor(width * 0.55); const regionW = Math.max(10, width - xStart); const minDark = Math.max(3, Math.ceil(regionW * 0.015)); for (let y = 0; y < height; y += 2) { const data = ctx.getImageData(xStart, y, regionW, 1).data; let darkCount = 0; for (let x = 0; x < regionW; x += 1) { const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2]; if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; } } } return 0; } catch (_) { return 0; } };
  const measureContentTopIgnoringBorderPx = (canvas, threshold = 244) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; const xStart = Math.floor(width * 0.2); const regionW = Math.max(10, Math.floor(width * 0.6)); const minDark = Math.max(12, Math.ceil(regionW * 0.08)); const yStart = 4; for (let y = yStart; y < height; y += 2) { const data = ctx.getImageData(xStart, y, regionW, 1).data; let darkCount = 0; for (let x = 0; x < regionW; x += 1) { const i4 = x * 4; const r = data[i4], g = data[i4 + 1], b = data[i4 + 2]; if (r < threshold || g < threshold || b < threshold) { if (++darkCount >= minDark) return y; } } } return 0; } catch (_) { return 0; } };
  const measureBottomWhitespacePx = (canvas, threshold = 246) => { try { const ctx = canvas.getContext('2d'); const { width, height } = canvas; for (let y = height-1; y >= 0; y -= 2) { const data = ctx.getImageData(0, y, width, 1).data; let dark = 0; for (let x = 0; x < width; x += 1) { const i = x * 4; if (data[i] < threshold || data[i+1] < threshold || data[i+2] < threshold) { if (++dark > Math.max(2, Math.ceil(width*0.003))) return (height-1-y); } } } return 0; } catch (_) { return 0; } };
  const cropCanvasVertical = (canvas, topPx, bottomPx) => { try { const { width, height } = canvas; const cropTop = Math.max(0, Math.min(height - 1, Math.round(topPx))); const cropBottom = Math.max(0, Math.min(height - cropTop, Math.round(bottomPx))); const newH = Math.max(1, height - cropTop - cropBottom); if (cropTop === 0 && cropBottom === 0) return canvas; const out = document.createElement('canvas'); out.width = width; out.height = newH; const ctx = out.getContext('2d'); ctx.drawImage(canvas, 0, -cropTop); return out; } catch (_) { return canvas; } };

  // Measure header top inside export clone (pre-capture) like print path
  let headerTopCssPx = 0;
  try {
    const inner0 = clone.querySelector('.a4-inner') || clone;
    const hdr0 = inner0.querySelector('.exp-masthead') || inner0.firstElementChild;
    if (hdr0) {
      const base0 = clone.getBoundingClientRect();
      const r0 = hdr0.getBoundingClientRect();
      headerTopCssPx = Math.max(0, r0.top - base0.top);
    }
  } catch (_) { headerTopCssPx = 0; }

  // Capture
  let canvas;
  try {
    await ensureAssetsReady(scope);
    canvas = await h2c(clone, { ...baseOpts, scrollX: 0, scrollY: 0, windowWidth: A4_W_PX, windowHeight: A4_H_PX });
  } finally {
    try { wrap.parentNode?.removeChild(wrap); } catch (_) {}
  }
  if (!canvas) return;

  // Measurements (use current prefs from localStorage)
  const topWhitePx = measureTopWhitespacePx(canvas, 246);
  const rightRegionTopPx = measureRightRegionContentTopPx(canvas, 244);
  const visualTopPx = measureContentTopIgnoringBorderPx(canvas, 244);
  const vSel = document.getElementById('pdftun-page')?.value || 'all';
  const idxSel = vSel === 'all' ? 0 : Math.max(0, Number(vSel) || 0);
  const extraTrimMm = readPdfPrefForPage('templatesPdf.extraTrimMm', idxSel, readPdfPref('templatesPdf.extraTrimMm', 14));
  const safeMarginMm = readPdfPrefForPage('templatesPdf.safeMarginMm', idxSel, readPdfPref('templatesPdf.safeMarginMm', 0.5));
  const captureHeaderTopPx = Math.max(visualTopPx, headerTopCssPx * captureScale);
  const extraTrimPx = extraTrimMm * PX_PER_MM * captureScale;
  const safeMarginPx = safeMarginMm * PX_PER_MM * captureScale;
  const baseChosenTopPx = Math.max(topWhitePx, rightRegionTopPx, visualTopPx);
  const chosenTopPx = Math.min(Math.max(0, baseChosenTopPx + extraTrimPx), Math.max(0, captureHeaderTopPx - safeMarginPx));
  const bottomWhitePx = measureBottomWhitespacePx(canvas, 246);
  const cropped = cropCanvasVertical(canvas, chosenTopPx, bottomWhitePx);

  const prefsScale = readPdfPref('templatesPdf.scalePct', 100) / 100;
  const shrink = Math.max(0.98, Math.min(1, prefsScale || 1));
  const targetWmm = A4_W_MM * shrink;
  const targetHmm = (cropped.height / cropped.width) * targetWmm;
  const rightMm = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, readPdfPref('templatesPdf.shiftRightMm', 40));
  const baselineFudge = (pageIndex === 0) ? readPdfPref('templatesPdf.tightFudgeMm', -144.5) : 0;
  const tightFudgeMm = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, baselineFudge);
  const globalYmm = readPdfPref('templatesPdf.globalYmm', 0);
  const globalAllYmm = readPdfPref('templatesPdf.globalAllYmm', -1);

  // Simulated placement
  const finalXmm = rightMm;
  const headerInCroppedMm = Math.max(0, (headerTopCssPx * captureScale - chosenTopPx)) * (targetWmm / cropped.width);
  let finalYmm = -headerInCroppedMm + tightFudgeMm + globalYmm + globalAllYmm;

  // Draw into a page-sized canvas
  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = A4_W_PX;
  pageCanvas.height = A4_H_PX;
  const ctx = pageCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  const drawX = Math.round(finalXmm * PX_PER_MM);
  const drawY = Math.round(finalYmm * PX_PER_MM);
  const drawW = Math.round(targetWmm * PX_PER_MM);
  const drawH = Math.round(targetHmm * PX_PER_MM);
  try { ctx.drawImage(cropped, drawX, drawY, drawW, drawH); } catch (_) {}

  const slot = document.getElementById('templates-pdf-live-slot');
  if (slot) {
    slot.innerHTML = '';
    const img = document.createElement('img');
    img.src = pageCanvas.toDataURL('image/png');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.border = '1px solid #e5e7eb';
    slot.appendChild(img);
  }
}

function ensurePdfTunerUI() {
  const controls = document.getElementById('templates-controls');
  if (!controls || document.getElementById('templates-pdf-tuner-toggle')) return;
  const actionsRow = controls.querySelector('.ms-auto') || controls;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'templates-pdf-tuner-toggle';
  btn.className = 'btn btn-outline';
  btn.textContent = '🛠️ ضبط/معاينة PDF';
  actionsRow.appendChild(btn);

  const panel = document.createElement('div');
  panel.id = 'templates-pdf-tuner';
  panel.style.display = 'none';
  panel.style.marginTop = '10px';
  panel.style.border = '1px solid #e5e7eb';
  panel.style.borderRadius = '10px';
  panel.style.padding = '10px';
  panel.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:flex-end;">
      <label style=\"display:flex; flex-direction:column; gap:4px;\">
        <span>الصفحة</span>
        <select id=\"pdftun-page\" style=\"width:110px;\"></select>
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Offset (All)</span>
        <input id="pdftun-globalY" type="number" step="0.5" min="-1000" max="1000" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Trim (mm)</span>
        <input id="pdftun-extraTrim" type="number" step="0.5" min="0" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Safe Margin (mm)</span>
        <input id="pdftun-safeMargin" type="number" step="0.1" min="0" max="10" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Top Offset (mm)</span>
        <input id="pdftun-tightFudge" type="number" step="0.5" min="-40" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Right Shift (mm)</span>
        <input id="pdftun-right" type="number" step="0.5" min="-40" max="40" style="width:90px;" />
      </label>
      <label style="display:flex; flex-direction:column; gap:4px;">
        <span>Scale (%)</span>
        <input id="pdftun-scale" type="number" step="1" min="90" max="110" style="width:90px;" />
      </label>
      <label style="display:flex; align-items:center; gap:6px; margin-inline-start:auto;">
        <input id="pdftun-auto" type="checkbox" checked />
        <span>Auto Preview</span>
      </label>
      <button type="button" class="btn btn-outline" id="pdftun-preset">تطبيق القيم</button>
      <button type="button" class="btn btn-outline" id="pdftun-reset">الافتراضيات</button>
      <button type="button" class="btn btn-primary" id="pdftun-preview">👁️ معاينة</button>
      <button type="button" class="btn btn-primary" id="pdftun-print">🖨️ طباعة</button>
    </div>
    <div id="templates-pdf-live-slot" style="margin-top:10px; max-width:420px;"></div>
  `;
  controls.parentElement?.appendChild(panel);

  // Init values from current prefs
  const refreshPagesList = () => {
    const sel = panel.querySelector('#pdftun-page');
    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    const cur = sel.value || '0';
    const opts = [];
    pages.forEach((_, idx) => { opts.push(`<option value="${idx}">الصفحة ${idx+1}</option>`); });
    if (!opts.length) {
      sel.innerHTML = '<option value="0">الصفحة 1</option>';
      setTimeout(() => { try { refreshPagesList(); } catch(_) {} }, 120);
    } else {
      sel.innerHTML = opts.join('');
    }
    if (Array.from(sel.options).some((o) => o.value === cur)) sel.value = cur; else sel.value = '0';
  };
  const loadValuesForSelected = () => {
    const sel = panel.querySelector('#pdftun-page');
    const pageIndex = Math.max(0, Number(sel.value || '0'));
    const extraTrimVal = readPdfPrefForPage('templatesPdf.extraTrimMm', pageIndex, readPdfPref('templatesPdf.extraTrimMm', 14));
    const safeMarginVal = readPdfPrefForPage('templatesPdf.safeMarginMm', pageIndex, readPdfPref('templatesPdf.safeMarginMm', 0.5));
    document.getElementById('pdftun-extraTrim').value = String(extraTrimVal);
    document.getElementById('pdftun-safeMargin').value = String(safeMarginVal);
    const defaultFudge = (pageIndex === 0 ? -144.5 : 0);
    const fudgeVal = readPdfPrefForPage('templatesPdf.tightFudgeMm', pageIndex, defaultFudge);
    const rightVal = readPdfPrefForPage('templatesPdf.shiftRightMm', pageIndex, readPdfPref('templatesPdf.shiftRightMm', 40));
    document.getElementById('pdftun-tightFudge').value = String(fudgeVal);
    document.getElementById('pdftun-right').value = String(rightVal);
    document.getElementById('pdftun-scale').value = String(readPdfPref('templatesPdf.scalePct', 100));
    try { document.getElementById('pdftun-globalY').value = String(readPdfPref('templatesPdf.globalAllYmm', -1)); } catch(_) {}
  };
  const init = () => { refreshPagesList(); loadValuesForSelected(); };
  init();

  btn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
      try { refreshPagesList(); loadValuesForSelected(); } catch(_) {}
      // Seed preset once if there are no overrides at all
      try {
        const ov = getPdfPageOverrides();
        if (ov && Object.keys(ov).length === 0 && !localStorage.getItem('templatesPdf.presetSeeded.v4')) {
          const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
          if (pages.length) {
            const right = 61, safe = 0.5;
            const offsets = [-145, -290, -435, -580, -725];
            const trims =   [  14,   14,   14,   14,   14];
            const stepAfter = -145;
            pages.forEach((_, idx) => {
              const off = (idx < offsets.length) ? offsets[idx] : (offsets[offsets.length - 1] + stepAfter * (idx - (offsets.length - 1)));
              const trim = (idx < trims.length) ? trims[idx] : trims[trims.length - 1];
              setPdfPageOverride(idx, 'templatesPdf.shiftRightMm', right);
              setPdfPageOverride(idx, 'templatesPdf.tightFudgeMm', off);
              setPdfPageOverride(idx, 'templatesPdf.extraTrimMm', trim);
              setPdfPageOverride(idx, 'templatesPdf.safeMarginMm', safe);
            });
            localStorage.setItem('templatesPdf.presetSeeded.v4', '1');
            try { localStorage.setItem('templatesPdf.globalAllYmm', '-1'); } catch(_) {}
            loadValuesForSelected();
          }
        }
      } catch(_) {}
      try {
        if (window.__pdfTunerMO) { try { window.__pdfTunerMO.disconnect(); } catch(_) {} }
        const wrap = document.querySelector('#templates-preview-host #templates-a4-root [data-a4-pages]') || document.querySelector('#templates-preview-host #templates-a4-root');
        if (wrap) {
          const mo = new MutationObserver(() => { try { refreshPagesList(); } catch(_) {} });
          mo.observe(wrap, { childList: true, subtree: true });
          window.__pdfTunerMO = mo;
        }
      } catch(_) {}
      renderPdfLivePreview();
    } else {
      try { if (window.__pdfTunerMO) { window.__pdfTunerMO.disconnect(); window.__pdfTunerMO = null; } } catch(_) {}
    }
  });
  panel.querySelector('#pdftun-page').addEventListener('change', () => { loadValuesForSelected(); renderPdfLivePreview(); });
  const auto = panel.querySelector('#pdftun-auto');
  const bind = (id, key, perPage = true) => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      const v = input.value;
      if (perPage) {
        const sel = panel.querySelector('#pdftun-page').value || '0';
        setPdfPageOverride(Number(sel), key, v);
      } else {
        writePdfPref(key, v);
      }
      if (auto.checked) renderPdfLivePreview();
    });
    input.addEventListener('change', () => {
      const v = input.value;
      if (perPage) {
        const sel = panel.querySelector('#pdftun-page').value || '0';
        setPdfPageOverride(Number(sel), key, v);
      } else {
        writePdfPref(key, v);
      }
      renderPdfLivePreview();
    });
  };
  bind('pdftun-extraTrim', 'templatesPdf.extraTrimMm', true);
  bind('pdftun-safeMargin', 'templatesPdf.safeMarginMm', true);
  bind('pdftun-tightFudge', 'templatesPdf.tightFudgeMm', true);
  bind('pdftun-right', 'templatesPdf.shiftRightMm', true);
  bind('pdftun-scale', 'templatesPdf.scalePct', false);
  bind('pdftun-globalY', 'templatesPdf.globalAllYmm', false);

  // Apply recommended per-page alignment from provided screenshots
  const applyPreset = () => {
    const pages = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root .a4-page'));
    const right = 61; const safe = 0.5;
    // New series from latest screenshots
    const offsets = [-145, -290, -435, -580, -725]; // pages 1..5
    const trims =   [  14,   14,   14,   14,   14]; // 14 for all
    const stepAfter = -145; // for pages >5, keep same step
    pages.forEach((_, idx) => {
      const off = (idx < offsets.length) ? offsets[idx] : (offsets[offsets.length - 1] + stepAfter * (idx - (offsets.length - 1)));
      const trim = (idx < trims.length) ? trims[idx] : trims[trims.length - 1];
      setPdfPageOverride(idx, 'templatesPdf.shiftRightMm', right);
      setPdfPageOverride(idx, 'templatesPdf.tightFudgeMm', off);
      setPdfPageOverride(idx, 'templatesPdf.extraTrimMm', trim);
      setPdfPageOverride(idx, 'templatesPdf.safeMarginMm', safe);
    });
    try { localStorage.setItem('templatesPdf.globalAllYmm', '-1'); } catch (_) {}
    loadValuesForSelected();
    renderPdfLivePreview();
  };
  document.getElementById('pdftun-preset').addEventListener('click', applyPreset);

  document.getElementById('pdftun-reset').addEventListener('click', () => {
    try {
      ['templatesPdf.extraTrimMm','templatesPdf.safeMarginMm','templatesPdf.tightFudgeMm','templatesPdf.shiftRightMm','templatesPdf.scalePct','templatesPdf.globalYmm','templatesPdf.globalAllYmm'].forEach((k) => localStorage.removeItem(k));
      clearPdfPageOverrides();
    } catch (_) {}
    init();
    renderPdfLivePreview();
  });
  document.getElementById('pdftun-preview').addEventListener('click', renderPdfLivePreview);
  document.getElementById('pdftun-print').addEventListener('click', printTemplatesPdf);
  // Expose refreshers for external calls after pages rebuild
  try { window.__pdfTunerRefreshPages = refreshPagesList; window.__pdfTunerLoadValues = loadValuesForSelected; } catch (_) {}
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
  const multi = Array.from(document.querySelectorAll('#templates-preview-host table.exp-details'));
  const table = document.querySelector('#templates-preview-host #expenses-table');
  const tables = multi.length ? multi : (table ? [table] : []);
  if (!tables.length) return;

  // New exp-table calculation (supports multi-table)
  if (tables[0].classList.contains('exp-table')) {
    const number = (txt, def = 0) => {
      const n = Number(String(txt || '').replace(/[^\d.\.-]/g, ''));
      return Number.isFinite(n) ? n : def;
    };
    const groupTotals = { atl: 0, prod: 0, post: 0 };
    let grand = 0;
    const subgroupTotals = {}; // code -> subtotal
    const subgroupCounts = {}; // code -> count of filled items

    // For each subgroup header across all tables
    const headers = tables.flatMap((t) => Array.from(t.querySelectorAll('tbody tr[data-subgroup-header]')));
    headers.forEach((hdr) => {
      const code = hdr.getAttribute('data-subgroup');
      let subtotal = 0;
      let count = 0;
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
          const hasContent = String(tds[1]?.textContent || '').trim().length || number(tds[5]?.textContent, 0) || number(tds[2]?.textContent, 0);
          if (hasContent) count += 1;
        }
        tr = tr.nextElementSibling;
      }
      // write subgroup subtotal
      const subCell = document.querySelector(`#templates-preview-host [data-subtotal="${CSS.escape(code)}"]`);
      if (subCell) subCell.textContent = String(subtotal.toFixed(2));
      subgroupTotals[code] = subtotal;
      subgroupCounts[code] = count;
      grand += subtotal;
      // map to parent group
      const marker = document.querySelector(`#templates-preview-host tr[data-subgroup-marker="${CSS.escape(code)}"]`);
      const parent = marker?.getAttribute('data-parent-group') || null;
      if (parent && groupTotals[parent] != null) groupTotals[parent] += subtotal;
    });

    // group totals
    Object.entries(groupTotals).forEach(([key, val]) => {
      const cell = document.querySelector(`#templates-preview-host [data-total-group="${CSS.escape(key)}"]`);
      if (cell) cell.textContent = String(val.toFixed(2));
    });
    const gcell = document.querySelector('#templates-preview-host [data-grand-total]');
    if (gcell) gcell.textContent = String(grand.toFixed(2));

    // Update Top Sheet summary figures
    try {
      Object.entries(subgroupTotals).forEach(([code, val]) => {
        const cnt = subgroupCounts[code] || 0;
        const cntEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-count="${CSS.escape(code)}"]`);
        const totEl = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-total="${CSS.escape(code)}"]`);
        if (cntEl) cntEl.textContent = String(cnt);
        if (totEl) totEl.textContent = String(Number(val).toFixed(2));
      });
      Object.entries(groupTotals).forEach(([key, val]) => {
        const el2 = document.querySelector(`#templates-preview-host #expenses-top-sheet [data-top-total-group="${CSS.escape(key)}"]`);
        if (el2) el2.textContent = String(Number(val).toFixed(2));
      });
      const g2 = document.querySelector('#templates-preview-host #expenses-top-sheet [data-top-grand]');
      if (g2) g2.textContent = String(grand.toFixed(2));
    } catch(_) {}

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
    try { requestAnimationFrame(() => { try { autoPaginateTemplates(); } catch (_) {} }); } catch (_) {}
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
  if (root.hasAttribute('data-exp-mode')) return; // explicit multi-page mode
  const type = document.getElementById('templates-type')?.value || 'expenses';
  if (type !== 'expenses') return; // حالياً نطبّق التقسيم التلقائي على ورقة المصاريف فقط

  const pagesWrap = root.querySelector('[data-a4-pages]');
  const firstPage = pagesWrap?.querySelector('.a4-page');
  const firstInner = firstPage?.querySelector('.a4-inner');
  if (!firstInner) return;

  const headerFooter = false;
  const logoUrl = COMPANY_INFO.logoUrl;

  // Gather original blocks
  const masthead = firstInner.querySelector('.exp-masthead');
  const meta = firstInner.querySelector('.tpl-meta');
  const topSheet = firstInner.querySelector('#expenses-top-sheet');
  const table = firstInner.querySelector('#expenses-table');
  const summary = firstInner.querySelector('#expenses-summary');
  if (!table) return;

  // Reset pages to rebuild
  while (pagesWrap.firstChild) pagesWrap.removeChild(pagesWrap.firstChild);

  // Start first page and keep masthead + meta + top sheet in first page
  let { page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false });
  pagesWrap.appendChild(currentPage);
  if (masthead) currentInner.appendChild(masthead);
  if (meta) currentInner.appendChild(meta);
  if (topSheet) currentInner.appendChild(topSheet);

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

  // Details will start from the second page if they don't fit after top sheet
  let workingTable = makeTable();
  currentInner.appendChild(workingTable);

  const rows = Array.from(table.querySelectorAll('tbody > tr'));

  const isSubHeader = (tr) => tr?.hasAttribute('data-subgroup-header');
  const isSubTotal = (tr) => tr?.hasAttribute('data-subgroup-subtotal');
  const isGroupTotal = (tr) => tr?.hasAttribute('data-group-total');
  const isMarker = (tr) => tr?.hasAttribute('data-subgroup-marker');
  const isItem = (tr) => tr?.getAttribute('data-row') === 'item';

  const fitsInner = () => {
    // Simpler and more robust in various layouts: compare scrollHeight to clientHeight
    return currentInner.scrollHeight <= (currentInner.clientHeight + 0.5);
  };
  const appendOrNewPage = (node) => {
    const tbody = workingTable.tBodies[0];
    tbody.appendChild(node);
    if (!fitsInner()) {
      // rollback this node and move to a fresh page
      tbody.removeChild(node);
      ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
      pagesWrap.appendChild(currentPage);
      workingTable = makeTable();
      currentInner.appendChild(workingTable);
      workingTable.tBodies[0].appendChild(node);
    }
  };

  let i = 0;
  while (i < rows.length) {
    const row = rows[i];

    // Keep subgroup header with first 2 rows (and subtotal when immediately follows)
    if (isSubHeader(row)) {
      const pack = [row];
      const headerCode = row.getAttribute('data-subgroup');
      let j = i + 1;
      let itemsAdded = 0;
      // include up to first 2 item rows after header
      while (j < rows.length && itemsAdded < 2) {
        if (isItem(rows[j])) { pack.push(rows[j]); itemsAdded += 1; j += 1; }
        else if (isMarker(rows[j])) { pack.push(rows[j]); j += 1; }
        else if (isSubTotal(rows[j])) { break; } // stop before subtotal; we'll add it below
        else { break; }
      }
      // if the next row is the matching subtotal, include it too
      if (j < rows.length && isSubTotal(rows[j]) && rows[j].getAttribute('data-subgroup-subtotal') === headerCode) {
        pack.push(rows[j]);
        j += 1;
      }
      // Try to place the pack; if it doesn't fit, start a new page first
      const tbody = workingTable.tBodies[0];
      // Append to measure
      pack.forEach((n) => tbody.appendChild(n));
      if (!fitsInner()) {
        // rollback
        pack.forEach((n) => { if (n.parentElement === tbody) tbody.removeChild(n); });
        ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
        pagesWrap.appendChild(currentPage);
        workingTable = makeTable();
        currentInner.appendChild(workingTable);
        const tb2 = workingTable.tBodies[0];
        pack.forEach((n) => tb2.appendChild(n));
      }
      i = j;
      continue;
    }

    // Keep group total row from being split awkwardly
    if (isGroupTotal(row)) {
      const tbody = workingTable.tBodies[0];
      tbody.appendChild(row);
      if (!fitsInner()) {
        // remove and start a new page; also try to carry the previous item/subtotal row with it
        tbody.removeChild(row);
        const prev = tbody.lastElementChild;
        let carry = null;
        if (prev && (isItem(prev) || isSubTotal(prev))) {
          carry = prev;
          tbody.removeChild(prev);
        }
        ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
        pagesWrap.appendChild(currentPage);
        workingTable = makeTable();
        currentInner.appendChild(workingTable);
        const tb2 = workingTable.tBodies[0];
        if (carry) tb2.appendChild(carry);
        tb2.appendChild(row);
        // Final guard: if even this overflows (unlikely), push row alone to a fresh page
        if (!fitsInner()) {
          // move group total alone to a new page
          tb2.removeChild(row);
          if (carry) { /* keep carry on this page */ }
          ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
          pagesWrap.appendChild(currentPage);
          workingTable = makeTable();
          currentInner.appendChild(workingTable);
          workingTable.tBodies[0].appendChild(row);
        }
      }
      i += 1;
      continue;
    }

    // Default: append row normally
    appendOrNewPage(row);
    i += 1;
  }

  // Place summary at the end (last page) and ensure it fits; otherwise move to fresh page
  if (summary) {
    currentInner.appendChild(summary);
    if (!fitsInner()) {
      currentInner.removeChild(summary);
      ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
      pagesWrap.appendChild(currentPage);
      // create an empty table on the final page to keep structure consistent
      workingTable = makeTable();
      currentInner.appendChild(workingTable);
      currentInner.appendChild(summary);
    }
  }

  // Update page numbers if header/footer enabled
  if (headerFooter) {
    const count = pagesWrap.querySelectorAll('.a4-page').length;
    Array.from(pagesWrap.querySelectorAll('.a4-page')).forEach((p, i2) => {
      const numEl = p.querySelector('[data-page-num]');
      const countEl = p.querySelector('[data-page-count]');
      if (numEl) numEl.textContent = String(i2 + 1);
      if (countEl) countEl.textContent = String(count);
    });
  }

  try { applyZebraStripes(); } catch (_) {}
  try { shrinkSubHeaderLabels(); } catch (_) {}
  try { shrinkSingleWordCells(); } catch (_) {}
  try { if (window.__pdfTunerRefreshPages) window.__pdfTunerRefreshPages(); } catch(_) {}
  try { if (window.__pdfTunerLoadValues) window.__pdfTunerLoadValues(); } catch(_) {}
}

// Split long group tables (exp-details) into multiple pages and repeat headers.
function paginateExpDetailsTables() {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const pagesWrap = root.querySelector('[data-a4-pages]');
  if (!pagesWrap) return;
  const headerFooter = false;
  const logoUrl = COMPANY_INFO.logoUrl;

  const groupPages = Array.from(pagesWrap.querySelectorAll('.a4-page'));
  groupPages.forEach((pg) => {
    const inner = pg.querySelector('.a4-inner');
    if (!inner) return;
    const table = inner.querySelector('table.exp-details');
    if (!table || table.getAttribute('data-split-done') === '1') return;

    const thead = table.querySelector('thead');
    const rows = Array.from(table.querySelectorAll('tbody > tr'));
    if (!rows.length) { table.setAttribute('data-split-done', '1'); return; }

    const makeTable = () => {
      const t = document.createElement('table');
      t.className = table.className;
      t.setAttribute('data-editable-table', 'expenses');
      const hd = thead ? thead.cloneNode(true) : document.createElement('thead');
      t.appendChild(hd);
      t.appendChild(document.createElement('tbody'));
      return t;
    };

    let currentPage = pg;
    let currentInner = inner;
    const anchorNext = pg.nextSibling;
    const workingFirst = makeTable();
    try { inner.removeChild(table); } catch (_) {}
    currentInner.appendChild(workingFirst);
    let workingTable = workingFirst;

    const isSubHeader = (tr) => tr?.hasAttribute('data-subgroup-header');
    const isSubTotal = (tr) => tr?.hasAttribute('data-subgroup-subtotal');
    const isGroupTotal = (tr) => tr?.hasAttribute('data-group-total');
    const isMarker = (tr) => tr?.hasAttribute('data-subgroup-marker');
    const isItem = (tr) => tr?.getAttribute('data-row') === 'item';
    const fitsInner = () => currentInner.scrollHeight <= (currentInner.clientHeight + 0.5);
    const appendOrNewPage = (node) => {
      const tbody = workingTable.tBodies[0];
      tbody.appendChild(node);
      if (!fitsInner()) {
        tbody.removeChild(node);
        ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
        if (anchorNext) pagesWrap.insertBefore(currentPage, anchorNext); else pagesWrap.appendChild(currentPage);
        workingTable = makeTable();
        currentInner.appendChild(workingTable);
        workingTable.tBodies[0].appendChild(node);
      }
    };

    let i = 0;
    while (i < rows.length) {
      const row = rows[i];
      if (isSubHeader(row)) {
        const pack = [row];
        const headerCode = row.getAttribute('data-subgroup');
        let j = i + 1;
        let itemsAdded = 0;
        while (j < rows.length && itemsAdded < 2) {
          if (isItem(rows[j])) { pack.push(rows[j]); itemsAdded += 1; j += 1; }
          else if (isMarker(rows[j])) { pack.push(rows[j]); j += 1; }
          else if (isSubTotal(rows[j])) { break; } else { break; }
        }
        if (j < rows.length && isSubTotal(rows[j]) && rows[j].getAttribute('data-subgroup-subtotal') === headerCode) {
          pack.push(rows[j]);
          j += 1;
        }
        const tbody = workingTable.tBodies[0];
        pack.forEach((n) => tbody.appendChild(n));
        if (!fitsInner()) {
          pack.forEach((n) => { if (n.parentElement === tbody) tbody.removeChild(n); });
          ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
          if (anchorNext) pagesWrap.insertBefore(currentPage, anchorNext); else pagesWrap.appendChild(currentPage);
          workingTable = makeTable();
          currentInner.appendChild(workingTable);
          const tb2 = workingTable.tBodies[0];
          pack.forEach((n) => tb2.appendChild(n));
        }
        i = j; continue;
      }
      if (isGroupTotal(row)) {
        const tbody = workingTable.tBodies[0];
        tbody.appendChild(row);
        if (!fitsInner()) {
          tbody.removeChild(row);
          const prev = tbody.lastElementChild;
          let carry = null;
          if (prev && (isItem(prev) || isSubTotal(prev))) { carry = prev; tbody.removeChild(prev); }
          ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
          if (anchorNext) pagesWrap.insertBefore(currentPage, anchorNext); else pagesWrap.appendChild(currentPage);
          workingTable = makeTable();
          currentInner.appendChild(workingTable);
          const tb2 = workingTable.tBodies[0];
          if (carry) tb2.appendChild(carry);
          tb2.appendChild(row);
          if (!fitsInner()) {
            tb2.removeChild(row);
            ({ page: currentPage, inner: currentInner } = createPageSection({ headerFooter, logoUrl, landscape: false }));
            if (anchorNext) pagesWrap.insertBefore(currentPage, anchorNext); else pagesWrap.appendChild(currentPage);
            workingTable = makeTable();
            currentInner.appendChild(workingTable);
            workingTable.tBodies[0].appendChild(row);
          }
        }
        i += 1; continue;
      }
      appendOrNewPage(row);
      i += 1;
    }

    table.setAttribute('data-split-done', '1');
  });
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
  try { shrinkSingleWordCells(tbody); } catch (_) {}
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
    const normalized = arr.map((v) => {
      const s = String(v || '');
      const mapA = { '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
      const mapB = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9' };
      return s.replace(/[\u0660-\u0669]/g,(d)=>mapA[d]).replace(/[\u06F0-\u06F9]/g,(d)=>mapB[d]);
    });
    fillRowFromArray(tr, start, normalized);
    tr = nextEditableRow(tr) || tr?.nextElementSibling;
  });

  // Recompute totals for expenses tables
  if (table.getAttribute('data-editable-table') === 'expenses' || table.id === 'expenses-table') {
    recomputeExpensesSubtotals();
  }
  try { shrinkSingleWordCells(table); } catch (_) {}
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

function applyZebraStripes() {
  const tables = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root table.exp-table'));
  tables.forEach((t) => {
    const tbody = t.tBodies?.[0];
    if (!tbody) return;
    let alt = false;
    Array.from(tbody.children).forEach((tr) => {
      if (tr.getAttribute('data-row') === 'item') {
        tr.classList.toggle('exp-row-alt', alt);
        alt = !alt;
      }
    });
  });
}

function shrinkSubHeaderLabels() {
  const headers = Array.from(document.querySelectorAll('#templates-preview-host #templates-a4-root table.exp-table tr.exp-subheader th'));
  headers.forEach((th) => {
    // Reset then shrink-to-fit within cell
    th.style.fontSize = '';
    th.style.whiteSpace = 'nowrap';
    th.style.overflow = 'hidden';
    th.style.textOverflow = 'ellipsis';
    const max = 12; const min = 9;
    let size = max;
    const fit = () => (th.scrollWidth <= th.clientWidth);
    while (size > min && !fit()) {
      size -= 0.5;
      th.style.fontSize = size + 'px';
    }
  });
}

function shrinkSingleWordCells(scope) {
  const root = document.querySelector('#templates-preview-host #templates-a4-root');
  if (!root) return;
  const base = scope && (scope instanceof HTMLElement) ? scope : root;
  const cells = Array.from(base.querySelectorAll('table.exp-table td'));
  const isSingleWord = (s) => s && !/\s/.test(s);
  cells.forEach((td) => {
    const text = (td.textContent || '').trim();
    if (!text || !isSingleWord(text)) return;
    td.style.fontSize = '';
    const computed = Number.parseFloat(getComputedStyle(td).fontSize || '11');
    let size = Number.isFinite(computed) ? computed : 11;
    const min = 7;
    const fits = () => td.scrollWidth <= td.clientWidth && td.scrollHeight <= td.clientHeight;
    let guard = 0;
    while (!fits() && size > min && guard < 40) { size -= 0.5; td.style.fontSize = size + 'px'; guard += 1; }
  });
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
  // Dropdown actions menu toggle
  const actionsToggle = document.getElementById('templates-actions-toggle');
  const actionsMenu = document.getElementById('templates-actions-menu');
  const actionsDD = document.getElementById('templates-actions-dd');
  if (actionsToggle && actionsMenu) {
    const closeMenu = (ev) => {
      if (!actionsDD?.contains(ev.target)) { actionsMenu.style.display = 'none'; document.removeEventListener('click', closeMenu, true); }
    };
    actionsToggle.addEventListener('click', (e2) => {
      e2.preventDefault(); e2.stopPropagation();
      const isOpen = actionsMenu.style.display === 'block';
      actionsMenu.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) { document.addEventListener('click', closeMenu, true); }
    });
  }
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

  // Keyboard shortcut: Alt+L toggles EN/AR for templates preview
  document.addEventListener('keydown', (e) => {
    if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && (e.code === 'KeyL' || e.key.toLowerCase() === 'l')) {
      e.preventDefault();
      setTemplateLang(TEMPLATE_LANG === 'ar' ? 'en' : 'ar');
      if (langBtn) { langBtn.textContent = TEMPLATE_LANG === 'ar' ? '🌐 AR' : '🌐 EN'; langBtn.title = `Language: ${TEMPLATE_LANG.toUpperCase()}`; }
      renderTemplatesPreview();
    }
  }, true);

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
  // Normalize digits to English and recompute on edits
  document.getElementById('templates-preview-host')?.addEventListener('input', (e) => {
    const el = e.target;
    if ((el instanceof HTMLElement) && el.isContentEditable) {
      // Only normalize for numeric-like cells to avoid disturbing free text
      const td = el.closest('td');
      const isNumericCell = td?.hasAttribute('data-num') || /^(?:[\d\u0660-\u0669\u06F0-\u06F9.,\s-]+)$/.test(el.textContent || '');
      const before = el.textContent || '';
      if (isNumericCell) {
        const after = (function normalizeDigits(str){
          const map = { '٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9', '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9' };
          return String(str).replace(/[\u0660-\u0669]/g,(d)=>map[d]).replace(/[\u06F0-\u06F9]/g,(d)=>map[d]);
        })(before);
        if (after !== before) {
          el.textContent = after;
          // Keep caret at end to avoid reversed sequence while typing
          try {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            if (sel) { sel.removeAllRanges(); sel.addRange(range); }
          } catch (_) {}
        }
      }
      recomputeExpensesSubtotals();
      try { shrinkSingleWordCells(td || table); } catch (_) {}
    }
  });
  // Paste from Excel/Sheets into tables
  document.getElementById('templates-preview-host')?.addEventListener('paste', handleTablePaste);
  document.getElementById('templates-preview-host')?.addEventListener('keydown', handleTableKeydown, true);
  try { ensurePdfTunerUI(); } catch (_) {}

  // (Row focus highlight removed per latest request)

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
