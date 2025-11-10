export function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).filter(Boolean).forEach((c) => e.appendChild(c));
  return e;
}

export function buildRoot({ landscape = false, headerFooter = false, logoUrl = '' } = {}) {
  // Map stored language to actual direction attributes understood by CSS
  const isAr = (typeof localStorage !== 'undefined' && localStorage.getItem('templates.lang') === 'ar');
  const dir = isAr ? 'rtl' : 'ltr';
  const root = el('div', { id: 'templates-a4-root', 'data-render-context': 'preview', dir });
  const pagesWrap = el('div', { 'data-a4-pages': '' });
  const page = el('section', { class: `a4-page${landscape ? ' a4-page--landscape' : ''}${headerFooter ? ' a4-page--with-hf' : ''}` });
  const inner = el('div', { class: 'a4-inner' });
  if (headerFooter) {
    const header = el('div', { class: 'tpl-print-header' }, [
      el('div', { class: 'brand' }, [
        el('img', { src: logoUrl, alt: 'Logo', referrerpolicy: 'no-referrer' }),
        el('div', { class: 'brand-text', text: 'Art Ratio' })
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
  pagesWrap.appendChild(page);
  root.appendChild(pagesWrap);
  return { root, inner };
}

export function L(en, ar) {
  try {
    const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('templates.lang') === 'ar') ? 'ar' : 'en';
    return lang === 'ar' ? (ar || en) : en;
  } catch (_) { return en; }
}

export function metaCell(label, value = '', editable = true) {
  const cell = el('div', { class: 'cell' });
  cell.appendChild(el('span', { class: 'label', text: label }));
  const val = el('div', { 'data-editable': editable ? 'true' : 'false', contenteditable: editable ? 'true' : 'false' });
  try { val.setAttribute('dir', 'auto'); } catch (_) {}
  val.textContent = value || '';
  cell.appendChild(val);
  return cell;
}

export default { el, buildRoot, L, metaCell };
