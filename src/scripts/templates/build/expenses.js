import { el, buildRoot, L, metaCell } from '../core.js';

export function buildExpensesPage(project, reservations, opts = {}) {
  const { headerFooter = false, logoUrl = '' } = opts || {};
  const { root, inner } = buildRoot({ landscape: false, headerFooter, logoUrl });
  try { root.setAttribute('data-exp-mode', 'multipage'); } catch(_) {}

  // Masthead
  const masthead = el('div', { class: 'exp-masthead' }, [
    el('div', { class: 'brand-logo' }, [ el('img', { src: logoUrl, alt: 'Logo', referrerpolicy: 'no-referrer' }) ]),
    el('div', { class: 'brand-info' }, [
      el('div', { class: 'text', text: (opts.companyName || project?.clientCompany || project?.title || 'Company') }),
      el('div', { class: 'meta' }, [
        el('span', { class: 'line', text: `${L('CR','السجل التجاري')}: ${opts.companyCR || ''}` }),
        el('span', { class: 'line', text: `${L('Media License','ترخيص إعلامي')}: ${opts.companyLicense || ''}` })
      ])
    ]),
    (() => { const block = document.createElement('div'); block.className = 'title-wrap'; block.appendChild(el('div', { class: 'title', text: L('Expenses Sheet', 'ورقة المصاريف') })); block.appendChild(el('div', { class: 'date', text: `Date: ${new Date().toISOString().slice(0,10)}` })); return block; })()
  ]);
  inner.appendChild(masthead);

  // Meta grid
  const meta = el('div', { class: 'tpl-meta' });
  meta.appendChild(metaCell(L('Client', 'العميل'), project?.clientCompany || ''));
  meta.appendChild(metaCell(L('Project Title', 'اسم المشروع'), project?.title || ''));
  meta.appendChild(metaCell(L('Budget Date', 'تاريخ الميزانية'), new Date().toISOString().slice(0, 10)));
  meta.appendChild(metaCell(L('Prepared by', 'إعداد'), ''));
  const locs = Array.from(new Set((reservations || []).map((r) => (r?.location || '').trim()).filter(Boolean))).join(', ');
  meta.appendChild(metaCell(L('Locations', 'المواقع'), locs));
  meta.appendChild(metaCell(L('Shoot Days', 'أيام التصوير'), ''));
  inner.appendChild(meta);

  // Top Sheet (skeleton)
  const topWrap = el('div', { id: 'expenses-top-sheet' });
  const mkTopRow = (code, label) => el('tr', { 'data-top-row': code }, [ el('td', { class: 'code', text: code }), el('td', { class: 'exp-top-label', text: label }), el('td', { 'data-top-count': code, text: '' }), el('td', { 'data-top-total': code, text: '' }) ]);
  const mkTopTable = (title, rows) => { const tbl = el('table', { class: 'exp-table exp-top-table' }); const cap = el('caption', { class: 'exp-group-cap' }, [ el('div', { class: 'exp-group-bar', text: title }) ]); tbl.appendChild(cap); const thead = el('thead'); const trh = el('tr'); ['CODE','DESCRIPTION','UNITS','TOTAL'].forEach((t,i)=> trh.appendChild(el('th', { class: ['exp-top-col-code','exp-top-col-label','exp-top-col-units','exp-top-col-total'][i], text: L(t, i===1?'الوصف': i===2?'الوحدات':'الإجمالي') }))); thead.appendChild(trh); tbl.appendChild(thead); const tb = el('tbody'); rows.forEach(([c,l])=> tb.appendChild(mkTopRow(c,l))); tbl.appendChild(tb); return tbl; };
  topWrap.appendChild(mkTopTable(L('ABOVE THE LINE','فوق الخط'), [['01-00','PRODUCERS UNIT'],['02-00','DIRECTOR & STAFF'],['03-00','CAST'] ]));
  topWrap.appendChild(mkTopTable(L('PRODUCTION EXPENSES','مصاريف الإنتاج'), [['04-00','PRODUCTION STAFF'],['05-00','SET DESIGN'],['06-00','SET CONSTRUCTION'] ]));
  topWrap.appendChild(mkTopTable(L('POST-PRODUCTION EXPENSES','مصاريف ما بعد الإنتاج'), [['13-00','FILM EDITING'],['14-00','VOICE OVER'] ]));
  inner.appendChild(topWrap);

  // Details groups (simplified skeleton that existing totals/pagination can still work with)
  const addGroupPage = (groupKey, groupTitle, subgroups = []) => {
    const table = el('table', { class: 'exp-table exp-details', 'data-editable-table': 'expenses', 'data-group': groupKey });
    const colgroup = el('colgroup'); ['10%','40%','10%','10%','10%','10%','5%','5%'].forEach((w)=> colgroup.appendChild(el('col',{style:`width:${w}`}))); table.appendChild(colgroup);
    const thead = el('thead'); const trh = el('tr');
    [ {text:L('CODE','الكود')}, {text:L('DESCRIPTION','الوصف')}, {text:L('DAYS','الأيام')}, {text:L('UNIT','الوحدة')}, {text:L('QTY','الكمية')}, {text:L('RATE','السعر')}, {text:L('TAX','ضريبة')}, {text:L('TOTAL','الإجمالي')} ].forEach((c)=> trh.appendChild(el('th', { text: c.text })));
    thead.appendChild(trh); table.appendChild(thead);
    const tb = el('tbody');
    tb.appendChild(el('tr', { 'data-group-bar': 'true', 'data-group-title': 'true' }, [ el('th', { colspan: '8' }, [ el('div', { class: `exp-group-bar exp-group-bar--${groupKey}`, text: groupTitle }) ]) ]));
    // One subgroup header + a couple of item rows per subgroup
    subgroups.forEach((sg, idx) => {
      tb.appendChild(el('tr', { 'data-subgroup-header': 'true', 'data-subgroup': sg.code }, [
        el('td', { class: 'code', text: sg.code }),
        el('td', { class: 'label', text: sg.label }),
        el('td', {}), el('td', {}), el('td', {}), el('td', {}), el('td', {}), el('td', {})
      ]));
      for (let i = 0; i < (sg.rows || 2); i += 1) {
        const tr = el('tr', { 'data-row': 'item' });
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
        tb.appendChild(tr);
      }
      // Subtotal row placeholder
      tb.appendChild(el('tr', { 'data-subgroup-subtotal': 'true' }, [ el('td', { colspan: '8', text: L('SUBTOTAL','المجموع الفرعي') }) ]));
    });
    table.appendChild(tb);
    inner.appendChild(table);
  };

  addGroupPage('atl', L('ABOVE THE LINE','فوق الخط'), [ { code:'01-00', label:'PRODUCERS UNIT', rows:2 }, { code:'02-00', label:'DIRECTOR & STAFF', rows:2 }, { code:'03-00', label:'CAST', rows:6 } ]);
  addGroupPage('prod', L('PRODUCTION EXPENSES','مصاريف الإنتاج'), [ { code:'04-00', label:'PRODUCTION STAFF', rows:3 }, { code:'05-00', label:'SET DESIGN', rows:3 }, { code:'06-00', label:'SET CONSTRUCTION', rows:2 } ]);
  addGroupPage('post', L('POST-PRODUCTION EXPENSES','مصاريف ما بعد الإنتاج'), [ { code:'13-00', label:'FILM EDITING', rows:2 }, { code:'14-00', label:'VOICE OVER', rows:2 } ]);

  return root;
}

export default { buildExpensesPage };

