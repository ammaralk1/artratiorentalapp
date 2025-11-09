import { t } from '../../language.js';
import { el, buildRoot } from '../core.js';

// el/buildRoot are imported from ../core.js

export function buildShotListPage(project, reservations, opts = {}) {
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

export default { buildShotListPage };
