import { el, buildRoot, L, metaCell } from '../core.js';
import { EXPENSE_TEMPLATE_GROUPS } from '../expensesCatalog.js';

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
  const clientCell = metaCell(L('Client', 'العميل'), project?.clientCompany || '');
  clientCell.setAttribute('data-expense-meta', 'client');
  meta.appendChild(clientCell);
  const projectTitleCell = metaCell(L('Project Title', 'اسم المشروع'), project?.title || '');
  projectTitleCell.setAttribute('data-expense-meta', 'projectTitle');
  meta.appendChild(projectTitleCell);
  const budgetDateCell = metaCell(L('Budget Date', 'تاريخ الميزانية'), new Date().toISOString().slice(0, 10));
  budgetDateCell.setAttribute('data-expense-meta', 'budgetDate');
  meta.appendChild(budgetDateCell);
  const preparedByCell = metaCell(L('Prepared by', 'إعداد'), '');
  preparedByCell.setAttribute('data-expense-meta', 'preparedBy');
  meta.appendChild(preparedByCell);
  const locs = Array.from(new Set((reservations || []).map((r) => (r?.location || '').trim()).filter(Boolean))).join(', ');
  const locationsCell = metaCell(L('Locations', 'المواقع'), locs);
  locationsCell.setAttribute('data-expense-meta', 'locations');
  meta.appendChild(locationsCell);
  const shootDaysCell = metaCell(L('Shoot Days', 'أيام التصوير'), '');
  shootDaysCell.setAttribute('data-expense-meta', 'shootDays');
  meta.appendChild(shootDaysCell);
  inner.appendChild(meta);

  // Top Sheet (skeleton)
  const topWrap = el('div', { id: 'expenses-top-sheet' });
  const mkTopRow = (code, label) => el('tr', { 'data-top-row': code }, [ el('td', { class: 'code', text: code }), el('td', { class: 'exp-top-label', text: label }), el('td', { 'data-top-count': code, text: '' }), el('td', { 'data-top-total': code, text: '' }) ]);
  const mkTopTable = (group) => {
    // Force LTR column flow so TOTAL stays at the rightmost visually
    const tbl = el('table', { class: 'exp-table exp-top-table dir-ltr' });
    const cap = el('caption', { class: 'exp-group-cap' }, [ el('div', { class: 'exp-group-bar', text: L(group.titleEn, group.titleAr) }) ]);
    tbl.appendChild(cap);
    const thead = el('thead'); const trh = el('tr');
    // UNITS → COUNT per request
    ['CODE','DESCRIPTION','COUNT','TOTAL'].forEach((t,i)=> trh.appendChild(el('th', { class: ['exp-top-col-code','exp-top-col-label','exp-top-col-count','exp-top-col-total'][i], text: L(t, i===1?'الوصف': i===2?'العدد':'الإجمالي') })));
    thead.appendChild(trh); tbl.appendChild(thead);
    const tb = el('tbody');
    group.categories.forEach((category) => tb.appendChild(mkTopRow(category.code, L(category.labelEn, category.labelAr))));
    // Group total row at bottom of this section (used by recompute)
    if (group.key) {
      const label = L(group.totalLabelEn, group.totalLabelAr);
      const trTot = el('tr', { 'data-top-group-total-row': group.key }, [
        el('td', { colspan: '3', class: 'exp-top-total-label', text: label }),
        el('td', { 'data-top-total-group': group.key, text: '0' })
      ]);
      tb.appendChild(trTot);
    }
    tbl.appendChild(tb);
    return tbl;
  };
  EXPENSE_TEMPLATE_GROUPS.forEach((group) => topWrap.appendChild(mkTopTable(group)));
  // Grand total compact table
  const grandTbl = el('table', { class: 'exp-table exp-top-table exp-top-table--grand dir-ltr' });
  const cg = document.createElement('colgroup');
  ;['16%','54%','10%','20%'].forEach((w)=> cg.appendChild(el('col',{style:`width:${w}`}))); grandTbl.appendChild(cg);
  const gtb = document.createElement('tbody');
  gtb.appendChild(el('tr', { class: 'exp-grand-total-row' }, [
    el('td', { colspan: '3', class: 'exp-grand-total-label', text: L('GRAND TOTAL', 'الإجمالي الكلي') }),
    // Add a dedicated class for styling in preview/print
    el('td', { 'data-top-grand': '1', class: 'exp-grand-total-value', text: '0' }),
  ]));
  grandTbl.appendChild(gtb);
  topWrap.appendChild(grandTbl);
  inner.appendChild(topWrap);

  // Details groups (new column order): Code, Description, Rate, Qty, Days, Paid, Total
  const addGroupPage = (group) => {
    const table = el('table', { class: 'exp-table exp-details dir-ltr', 'data-editable-table': 'expenses', 'data-group': group.key });
    const colgroup = el('colgroup'); ['12%','38%','12%','10%','10%','8%','10%'].forEach((w)=> colgroup.appendChild(el('col',{style:`width:${w}`}))); table.appendChild(colgroup);
    const thead = el('thead'); const trh = el('tr');
    [ {text:L('CODE','الكود')}, {text:L('DESCRIPTION','الوصف')}, {text:L('RATE','السعر')}, {text:L('QTY','الكمية')}, {text:L('DAYS','الأيام')}, {text:L('PAID','المدفوع')}, {text:L('TOTAL','الإجمالي')} ]
      .forEach((c)=> trh.appendChild(el('th', { text: c.text })));
    thead.appendChild(trh); table.appendChild(thead);
    const tb = el('tbody');
    tb.appendChild(el('tr', { 'data-group-bar': 'true', 'data-group-title': 'true' }, [ el('th', { colspan: '7' }, [ el('div', { class: `exp-group-bar exp-group-bar--${group.key}`, text: L(group.titleEn, group.titleAr) }) ]) ]));
    // One subgroup header + a couple of item rows per subgroup
    group.categories.forEach((category) => {
      // Header row: code + right-aligned label + unified fill across remaining columns
      tb.appendChild(el('tr', { 'data-subgroup-header': 'true', 'data-subgroup': category.code }, [
        el('td', { class: 'code', text: category.code }),
        el('td', { class: 'label', text: L(category.labelEn, category.labelAr) }),
        el('td', { class: 'exp-subheader-fill', colspan: '5', text: '' })
      ]));
      // Hidden marker row to map subgroup to its parent group for totals
      tb.appendChild(el('tr', { 'data-subgroup-marker': category.code, 'data-parent-group': group.key, style: 'display:none;' }, [ el('td', { colspan: '7', text: '' }) ]));
      for (let i = 0; i < 2; i += 1) {
        const tr = el('tr', { 'data-row': 'item' });
        // 7 editable cells: Code, Description, Rate, Qty, Days, Paid, Total
        // Follow Call Sheet editing model: make TDs contenteditable directly
        const commonTxt = { 'data-editable': 'true', contenteditable: 'true', autocapitalize: 'off', autocorrect: 'off', autocomplete: 'off', spellcheck: 'false' };
        const commonNum = { ...commonTxt, 'data-num': '1', inputmode: 'decimal' };
        tr.appendChild(el('td', commonTxt)); // Code
        tr.appendChild(el('td', commonTxt)); // Description
        tr.appendChild(el('td', commonNum)); // Rate
        tr.appendChild(el('td', commonNum)); // Qty
        tr.appendChild(el('td', commonNum)); // Days
        tr.appendChild(el('td', commonNum)); // Paid
        // Total is computed -> keep it non-editable to avoid caret issues
        tr.appendChild(el('td', { 'data-num': '1' })); // Total (computed)
        tb.appendChild(tr);
      }
      // Subtotal row placeholder
      tb.appendChild(el('tr', { 'data-subgroup-subtotal': 'true' }, [
        el('td', { colspan: '6', text: L('SUBTOTAL','المجموع الفرعي') }),
        el('td', { 'data-subtotal': category.code, 'data-num': '1', text: '0' })
      ]));
    });
    table.appendChild(tb);
    inner.appendChild(table);
  };

  EXPENSE_TEMPLATE_GROUPS.forEach((group) => addGroupPage(group));

  return root;
}

export default { buildExpensesPage };
