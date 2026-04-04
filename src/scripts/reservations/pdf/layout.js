import { state } from './state.js';
import {
  BLOCK_DRAG_STORAGE_KEY,
  BLOCK_DRAG_LIMIT_PX,
  INFO_ALIGN_STORAGE_KEY,
  INFO_ALIGN_TARGETS,
  INFO_ALIGN_DEFAULTS,
  INFO_ALIGN_CONTEXT_DEFAULTS,
  DEFAULT_BLOCK_OFFSETS,
  QUOTE_LAYOUT_DATA_ATTRS,
  PAGE_OVERFLOW_TOLERANCE_PX,
  PAGE_SEGMENT_MAX_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_HEIGHT_MM,
  MM_PER_INCH,
  CSS_DPI,
} from './constants.js';
import { t } from '../../language.js';
import { showToast } from '../../utils.js';
import { escapeHtml, isMobileSafariBrowser, logPdfDebug, logPdfWarn } from './utils.js';

export function encodeLayoutDataset(value) {
  try {
    return encodeURIComponent(JSON.stringify(value));
  } catch (_) {
    return '';
  }
}

export function parseLayoutDatasetAttr(node, attr) {
  if (!node) return null;
  const raw = node.getAttribute(attr);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch (_) {
    return null;
  }
}

export function buildRootLayoutAttributes(layoutState = {}) {
  const attrs = [];
  const contextName = layoutState.context || getBlockDragContext(layoutState);
  if (contextName) {
    attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.context}="${escapeHtml(String(contextName))}"`);
  }
  if (layoutState.blockOffsets && Object.keys(layoutState.blockOffsets).length) {
    const encodedOffsets = encodeLayoutDataset(layoutState.blockOffsets);
    if (encodedOffsets) {
      attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.blockOffsets}="${encodedOffsets}"`);
    }
  }
  if (layoutState.infoAlignments && Object.keys(layoutState.infoAlignments).length) {
    const encodedAlign = encodeLayoutDataset(layoutState.infoAlignments);
    if (encodedAlign) {
      attrs.push(`${QUOTE_LAYOUT_DATA_ATTRS.infoAlignments}="${encodedAlign}"`);
    }
  }
  return attrs.length ? ` ${attrs.join(' ')}` : '';
}

export function resolveActiveLayoutState(preferred) {
  if (preferred && typeof preferred === 'object') return preferred;
  if (state.renderLayoutStateOverride) return state.renderLayoutStateOverride;
  if (state.activeQuoteState) return state.activeQuoteState;
  return null;
}

export function getBlockDragContext(stateArg = null) {
  const source = resolveActiveLayoutState(stateArg);
  return source?.context || 'reservation';
}

export function loadStoredBlockOffsets(contextName = 'reservation') {
  try {
    const raw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    const entry = raw?.[contextName];
    if (entry && typeof entry === 'object') {
      return JSON.parse(JSON.stringify(entry));
    }
  } catch (_) {
    /* ignore */
  }
  return {};
}

export function persistStoredBlockOffsets(contextName, offsets = {}) {
  try {
    const raw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    if (offsets && Object.keys(offsets).length > 0) {
      raw[contextName] = offsets;
    } else {
      delete raw[contextName];
    }
    localStorage.setItem(BLOCK_DRAG_STORAGE_KEY, JSON.stringify(raw));
  } catch (_) {
    /* ignore */
  }
}

export function initializeQuoteBlockOffsets(stateObj) {
  if (!stateObj) return;
  const contextName = getBlockDragContext(stateObj);
  const stored = loadStoredBlockOffsets(contextName);
  stateObj.blockOffsets = {
    ...(DEFAULT_BLOCK_OFFSETS[contextName] || {}),
    ...stored,
  };
  state.blockDragDirty = false;
  state.blockDragMode = false;
  updateBlockDragButtons();
}

export function applyQuoteBlockOffsets(root, offsets = {}) {
  if (!root) return;
  const blocks = root.querySelectorAll('[data-drag-key]');
  blocks.forEach((block) => {
    const key = block.dataset.dragKey;
    const value = offsets?.[key];
    const x = Number(value?.x) || 0;
    const y = Number(value?.y) || 0;
    if (x || y) {
      block.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      block.style.transform = '';
    }
    block.dataset.dragX = String(x);
    block.dataset.dragY = String(y);
  });
}

export function syncBlockDragModeToPreview(doc) {
  try {
    const root = doc?.getElementById('quotation-pdf-root');
    if (!root) return;
    root.dataset.blockDragMode = state.blockDragMode ? 'on' : 'off';
  } catch (_) {}
}

export function updateBlockDragButtons() {
  const toggleBtn = state.quoteModalRefs?.blockDragToggle;
  if (toggleBtn) {
    const label = state.blockDragMode
      ? t('reservations.quote.drag.disable', '🔒 إنهاء وضع التحريك')
      : t('reservations.quote.drag.enable', '🎯 وضع تحريك البلوكات');
    toggleBtn.setAttribute('aria-label', label);
    toggleBtn.setAttribute('title', label);
    toggleBtn.classList.toggle('is-active', state.blockDragMode);
  }
  const saveBtn = state.quoteModalRefs?.blockDragSave;
  if (saveBtn) {
    saveBtn.disabled = !state.blockDragDirty;
  }
}

export function setBlockDragMode(enabled) {
  state.blockDragMode = Boolean(enabled);
  updateBlockDragButtons();
  try {
    syncBlockDragModeToPreview(state.quoteModalRefs?.previewFrame?.contentDocument);
  } catch (_) {}
}

export function markBlockOffsetsDirty(value = true) {
  state.blockDragDirty = Boolean(value);
  updateBlockDragButtons();
}

export function persistCurrentBlockOffsets() {
  if (!state.activeQuoteState) return;
  const contextName = getBlockDragContext(state.activeQuoteState);
  const offsets = state.activeQuoteState.blockOffsets || {};
  persistStoredBlockOffsets(contextName, offsets);
  markBlockOffsetsDirty(false);
  showToast(t('reservations.quote.drag.saved', '✅ تم حفظ مواضع البلوكات.'));
}

export function resetStoredBlockOffsets() {
  if (!state.activeQuoteState) return;
  const contextName = getBlockDragContext(state.activeQuoteState);
  state.activeQuoteState.blockOffsets = { ...(DEFAULT_BLOCK_OFFSETS[contextName] || {}) };
  persistStoredBlockOffsets(contextName, state.activeQuoteState.blockOffsets);
  markBlockOffsetsDirty(false);
  // renderQuotePreview is in renderer.js — import lazily
  import('./renderer.js').then(({ renderQuotePreview }) => {
    renderQuotePreview();
  }).catch(() => {});
  showToast(t('reservations.quote.drag.reset', '↺ تمت إعادة مواضع البلوكات للوضع الافتراضي.'));
}

export function clampDragOffset(value) {
  return Math.min(Math.max(value, -BLOCK_DRAG_LIMIT_PX), BLOCK_DRAG_LIMIT_PX);
}

export function loadInfoAlignmentPrefs(contextName = 'reservation') {
  try {
    const raw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    const entry = raw?.[contextName];
    if (entry && typeof entry === 'object') {
      return { ...entry };
    }
  } catch (_) {
    /* ignore */
  }
  return null;
}

export function persistInfoAlignmentPrefs(contextName, alignments = {}) {
  try {
    const raw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    raw[contextName] = alignments;
    localStorage.setItem(INFO_ALIGN_STORAGE_KEY, JSON.stringify(raw));
  } catch (_) {
    /* ignore */
  }
}

export function initializeInfoAlignments(stateObj) {
  if (!stateObj || state.initializedInfoAlignments) return;
  const contextName = getBlockDragContext(stateObj);
  const stored = loadInfoAlignmentPrefs(contextName);
  stateObj.infoAlignments = {
    ...INFO_ALIGN_DEFAULTS,
    ...(INFO_ALIGN_CONTEXT_DEFAULTS[contextName] || {}),
    ...(stored || {}),
  };
  state.initializedInfoAlignments = true;
}

export function getInfoAlignment(stateArg, key) {
  const source = resolveActiveLayoutState(stateArg);
  const alignments = source?.infoAlignments;
  if (alignments && Object.prototype.hasOwnProperty.call(alignments, key)) {
    return alignments[key];
  }
  const contextName = getBlockDragContext(source);
  if (INFO_ALIGN_CONTEXT_DEFAULTS[contextName]?.[key]) {
    return INFO_ALIGN_CONTEXT_DEFAULTS[contextName][key];
  }
  return INFO_ALIGN_DEFAULTS[key] || 'right';
}

export function buildInfoPlainClass(stateArg, key) {
  const align = getInfoAlignment(stateArg, key);
  return `info-plain info-plain--align-${align}`;
}

export function applyInfoAlignment(target, alignment) {
  if (!state.activeQuoteState) return;
  const normalizedTarget = INFO_ALIGN_TARGETS.includes(target) ? target : 'customer';
  const normalizedAlignment = ['left', 'center', 'right'].includes(alignment) ? alignment : 'right';
  if (!state.activeQuoteState.infoAlignments) {
    state.activeQuoteState.infoAlignments = { ...INFO_ALIGN_DEFAULTS };
  }
  state.activeQuoteState.infoAlignments[normalizedTarget] = normalizedAlignment;
  const contextName = getBlockDragContext(state.activeQuoteState);
  persistInfoAlignmentPrefs(contextName, state.activeQuoteState.infoAlignments);
  import('./renderer.js').then(({ renderQuotePreview }) => renderQuotePreview()).catch(() => {});
  updateInfoAlignmentControls();
}

export function updateInfoAlignmentControls() {
  if (!state.quoteModalRefs?.alignTarget) return;
  const target = state.quoteModalRefs.alignTarget.value || 'customer';
  const current = getInfoAlignment(state.activeQuoteState, target);
  (state.quoteModalRefs.alignButtons || []).forEach((button) => {
    const value = button.dataset.alignValue;
    if (!value) return;
    button.classList.toggle('is-active', value === current);
  });
}

export async function exportCurrentLayoutSettings() {
  try {
    if (!state.activeQuoteState) return;
    const context = getBlockDragContext(state.activeQuoteState);
    const offsetsRaw = JSON.parse(localStorage.getItem(BLOCK_DRAG_STORAGE_KEY) || '{}');
    const alignRaw = JSON.parse(localStorage.getItem(INFO_ALIGN_STORAGE_KEY) || '{}');
    const payload = {
      context,
      blockOffsets: state.activeQuoteState.blockOffsets || offsetsRaw[context] || {},
      infoAlignments: state.activeQuoteState.infoAlignments || alignRaw[context] || {},
    };
    const serialized = JSON.stringify(payload, null, 2);
    let copied = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(serialized);
        copied = true;
      } catch (_) {
        copied = false;
      }
    }
    if (!copied) {
      window.prompt(t('reservations.quote.align.copyPrompt', 'انسخ الإعدادات التالية'), serialized);
    } else {
      showToast(t('reservations.quote.align.copied', '✅ تم نسخ الإعدادات إلى الحافظة'));
    }
  } catch (error) {
    console.error('[quote align export] failed', error);
    showToast(t('reservations.quote.align.copyFailed', '⚠️ تعذر نسخ الإعدادات، الرجاء المحاولة لاحقاً'), 'error');
  }
}

export function setupPreviewBlockDrag(doc) {
  try {
    const root = doc?.getElementById('quotation-pdf-root');
    if (!root) return;
    const blocks = Array.from(root.querySelectorAll('[data-drag-key]'));
    blocks.forEach((block) => {
      if (block.dataset.blockDragHandleAttached === 'true') return;
      block.style.position = block.style.position || 'relative';
      block.style.touchAction = 'none';
      const handle = doc.createElement('button');
      handle.type = 'button';
      handle.className = 'quote-block-drag-handle';
      handle.setAttribute('data-block-handle', block.dataset.dragKey || '');
      handle.setAttribute('aria-label', t('reservations.quote.drag.handle', 'اسحب لتحريك هذا القسم'));
      handle.innerHTML = '<span aria-hidden="true">⠿</span>';
      const startDrag = (event) => {
        if (root.dataset.blockDragMode !== 'on') return;
        beginBlockDrag(event, block);
      };
      handle.addEventListener('pointerdown', startDrag);
      block.prepend(handle);
      block.dataset.blockDragHandleAttached = 'true';
    });
    syncBlockDragModeToPreview(doc);
  } catch (_) {
    /* ignore drag init errors */
  }
}

export function beginBlockDrag(event, block) {
  if (!block || !state.activeQuoteState) return;
  event.preventDefault();
  event.stopPropagation();
  const doc = block.ownerDocument || document;
  const pointerId = event.pointerId;
  block.setPointerCapture?.(pointerId);
  const startX = event.clientX;
  const startY = event.clientY;
  const baseX = Number(block.dataset.dragX || 0);
  const baseY = Number(block.dataset.dragY || 0);
  let currentX = baseX;
  let currentY = baseY;
  const key = block.dataset.dragKey;
  const onPointerMove = (moveEvent) => {
    moveEvent.preventDefault();
    const deltaX = (moveEvent.clientX - startX);
    const deltaY = (moveEvent.clientY - startY);
    currentX = clampDragOffset(baseX + deltaX);
    currentY = clampDragOffset(baseY + deltaY);
    block.style.transform = `translate(${currentX}px, ${currentY}px)`;
    block.dataset.dragTempX = String(currentX);
    block.dataset.dragTempY = String(currentY);
  };
  const onPointerUp = () => {
    doc.removeEventListener('pointermove', onPointerMove);
    doc.removeEventListener('pointerup', onPointerUp);
    block.releasePointerCapture?.(pointerId);
    const finalX = Number(block.dataset.dragTempX ?? baseX);
    const finalY = Number(block.dataset.dragTempY ?? baseY);
    block.dataset.dragX = String(finalX);
    block.dataset.dragY = String(finalY);
    block.dataset.dragTempX = '';
    block.dataset.dragTempY = '';
    if (!state.activeQuoteState.blockOffsets) {
      state.activeQuoteState.blockOffsets = {};
    }
    if (Math.abs(finalX) <= 0.5 && Math.abs(finalY) <= 0.5) {
      delete state.activeQuoteState.blockOffsets[key];
    } else {
      state.activeQuoteState.blockOffsets[key] = { x: finalX, y: finalY };
    }
    markBlockOffsetsDirty(true);
  };
  doc.addEventListener('pointermove', onPointerMove);
  doc.addEventListener('pointerup', onPointerUp);
}

export async function layoutQuoteDocument(root, { context = 'preview' } = {}) {
  if (!root) return;
  const isPreview = context === 'preview';
  const doc = root.ownerDocument || document;
  root.setAttribute('data-quote-render-context', context);
  const pagesContainer = root.querySelector('[data-quote-pages]');
  const sourceContainer = root.querySelector('[data-quote-source]');
  const headerTemplate = sourceContainer?.querySelector('[data-quote-header-template]');
  if (!pagesContainer || !sourceContainer || !headerTemplate) return;

  pagesContainer.style.display = 'block';
  pagesContainer.style.margin = '0';
  pagesContainer.style.padding = '0';
  pagesContainer.style.gap = '0px';
  pagesContainer.style.rowGap = '0px';
  pagesContainer.style.columnGap = '0px';
  pagesContainer.style.alignItems = 'stretch';
  pagesContainer.style.justifyContent = 'flex-start';

  const { rasterizeQuoteImages, waitForQuoteAssets, rasterizeQuoteNotes } = await import('./assets.js');
  await rasterizeQuoteImages(sourceContainer);
  await waitForQuoteAssets(sourceContainer);

  pagesContainer.innerHTML = '';

  const blockNodes = Array.from(sourceContainer.querySelectorAll(':scope > [data-quote-block]'));
  const datasetContext = root.getAttribute(QUOTE_LAYOUT_DATA_ATTRS.context) || null;
  const datasetOffsets = parseLayoutDatasetAttr(root, QUOTE_LAYOUT_DATA_ATTRS.blockOffsets);
  const datasetAlignments = parseLayoutDatasetAttr(root, QUOTE_LAYOUT_DATA_ATTRS.infoAlignments);
  const previousLayoutOverride = state.renderLayoutStateOverride;
  const layoutOverrideActive = datasetContext || datasetOffsets || datasetAlignments;
  if (layoutOverrideActive) {
    state.renderLayoutStateOverride = {
      context: datasetContext || null,
      blockOffsets: datasetOffsets || null,
      infoAlignments: datasetAlignments || null,
    };
  }

  let currentPage = null;
  let currentBody = null;

  const applyPageBaseStyles = (page) => {
    page.style.margin = '0 auto';
    page.style.breakInside = 'avoid';
    page.style.pageBreakInside = 'avoid';
    page.style.pageBreakAfter = 'auto';
    page.style.breakAfter = 'auto';
  };

  const createPage = () => {
    const page = doc.createElement('div');
    const isFirstPage = pagesContainer.childElementCount === 0;
    page.className = 'quote-page';
    page.dataset.pageIndex = String(pagesContainer.childElementCount);
    if (isFirstPage) {
      page.classList.add('quote-page--primary');
      const headerClone = headerTemplate.cloneNode(true);
      headerClone.removeAttribute('data-quote-header-template');
      page.appendChild(headerClone);
    } else {
      page.classList.add('quote-page--continuation');
    }
    const body = doc.createElement('main');
    body.className = 'quote-body';
    page.appendChild(body);
    pagesContainer.appendChild(page);
    applyPageBaseStyles(page);
    currentPage = page;
    currentBody = body;
  };

  const ensureActivePage = () => {
    if (!currentPage || !currentBody || !currentBody.isConnected) {
      createPage();
    }
  };

  const removeCurrentPageIfEmpty = () => {
    if (!currentPage || !currentBody) return;
    if (currentBody.childElementCount > 0) return;
    const pageToRemove = currentPage;
    currentPage = null;
    currentBody = null;
    if (pageToRemove.parentNode) {
      pageToRemove.parentNode.removeChild(pageToRemove);
    }
  };

  const moveToNextPage = () => {
    currentPage = null;
    currentBody = null;
  };

  const isOverflowing = () => {
    if (!currentPage) return false;
    return (currentPage.scrollHeight - currentPage.clientHeight) > PAGE_OVERFLOW_TOLERANCE_PX;
  };

  const appendBlock = (node, { allowOverflow = false } = {}) => {
    ensureActivePage();
    currentBody.appendChild(node);
    if (isOverflowing() && !allowOverflow) {
      currentBody.removeChild(node);
      removeCurrentPageIfEmpty();
      return false;
    }
    return true;
  };

  const placeBlock = (node) => {
    const clone = node.cloneNode(true);
    clone.removeAttribute?.('data-quote-block');
    clone.removeAttribute?.('data-block-type');
    clone.removeAttribute?.('data-table-id');
    if (appendBlock(clone)) return;
    moveToNextPage();
    if (appendBlock(clone)) return;
    appendBlock(clone, { allowOverflow: true });
  };

  const paginateTableBlock = (node) => {
    const table = node.querySelector('table');
    if (!table) {
      placeBlock(node);
      return;
    }

    const heading = node.querySelector('h3');
    const tableHead = table.querySelector('thead');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    if (!rows.length) {
      placeBlock(node);
      return;
    }

    let fragment = null;
    let renderedRowCount = 0;

    const createFragment = (isContinuation = false) => {
      const section = node.cloneNode(false);
      section.removeAttribute('data-quote-block');
      section.removeAttribute('data-block-type');
      section.removeAttribute('data-table-id');
      section.classList.add('quote-section--table-fragment');
      if (isContinuation) {
        section.classList.add('quote-section--table-fragment--continued');
      }
      const headingClone = heading ? heading.cloneNode(true) : null;
      if (headingClone) {
        section.appendChild(headingClone);
      }
      const tableClone = table.cloneNode(false);
      tableClone.classList.add('quote-table--fragment');
      if (tableHead) {
        tableClone.appendChild(tableHead.cloneNode(true));
      }
      const body = doc.createElement('tbody');
      tableClone.appendChild(body);
      section.appendChild(tableClone);
      return { section, body };
    };

    const ensureFragment = (isContinuation = false) => {
      if (fragment) return fragment;
      fragment = createFragment(isContinuation);
      if (!appendBlock(fragment.section)) {
        moveToNextPage();
        if (!appendBlock(fragment.section)) {
          appendBlock(fragment.section, { allowOverflow: true });
        }
      }
      return fragment;
    };

    rows.forEach((row) => {
      ensureFragment(renderedRowCount > 0);
      const rowClone = row.cloneNode(true);
      fragment.body.appendChild(rowClone);
      if (isOverflowing()) {
        fragment.body.removeChild(rowClone);
        if (!fragment.body.childElementCount) {
          currentBody.removeChild(fragment.section);
          fragment = null;
          removeCurrentPageIfEmpty();
        }
        moveToNextPage();
        fragment = null;
        ensureFragment(renderedRowCount > 0);
        fragment.body.appendChild(rowClone);
        if (isOverflowing()) {
          fragment.section.classList.add('quote-section--table-fragment--overflow');
          renderedRowCount += 1;
          return;
        }
      }
      renderedRowCount += 1;
    });

    fragment = null;

    // Append trailing subtotal (or other post-table summary) if present
    try {
      const subtotal = node.querySelector(':scope > .quote-table-subtotal');
      if (subtotal) {
        placeBlock(subtotal);
      }
    } catch (_) {}
  };

  try {
    if (!blockNodes.length) {
      return;
    }

  blockNodes.forEach((blockNode) => {
    const type = blockNode.getAttribute('data-block-type');
    if (type === 'table') {
      paginateTableBlock(blockNode);
    } else {
      placeBlock(blockNode);
    }
  });

  const pages = Array.from(pagesContainer.children);
  const filteredPages = [];
  pages.forEach((page, index) => {
    const body = page.querySelector('.quote-body');
    if (index !== 0 && (!body || body.childElementCount === 0)) {
      page.remove();
      return;
    }
    filteredPages.push(page);
  });

  if (!isPreview) {
    const view = doc.defaultView || window;
    const basePixelRatio = Math.min(3, Math.max(1, view.devicePixelRatio || 1));
    const notePixelRatio = isMobileSafariBrowser() ? Math.min(2, basePixelRatio) : basePixelRatio;
    filteredPages.forEach((page) => rasterizeQuoteNotes(page, { pixelRatio: notePixelRatio }));
  }

  filteredPages.forEach((page, index) => {
    const isFirst = index === 0;
    page.style.pageBreakAfter = 'auto';
    page.style.breakAfter = 'auto';
    page.style.pageBreakBefore = isFirst ? 'auto' : 'always';
    page.style.breakBefore = isFirst ? 'auto' : 'page';
    if (!isPreview) {
      page.style.boxShadow = 'none';
    } else {
      page.style.boxShadow = '';
    }
  });

  const lastPage = filteredPages[filteredPages.length - 1] || null;
  currentPage = lastPage;
  currentBody = lastPage?.querySelector('.quote-body') || null;

  await waitForQuoteAssets(pagesContainer);
    const hasOffsets = (value) => value && typeof value === 'object' && Object.keys(value).length > 0;
    const fallbackContextSource = state.activeQuoteState || (datasetContext ? { context: datasetContext } : null);
    const defaultOffsets = DEFAULT_BLOCK_OFFSETS[getBlockDragContext(fallbackContextSource)] || {};
    const effectiveOffsets = hasOffsets(datasetOffsets)
      ? datasetOffsets
      : (hasOffsets(state.activeQuoteState?.blockOffsets) ? state.activeQuoteState.blockOffsets : defaultOffsets);
    try {
      applyQuoteBlockOffsets(root, effectiveOffsets);
    } catch (_) {
      /* non-fatal */
    }
  } finally {
    if (layoutOverrideActive) {
      state.renderLayoutStateOverride = previousLayoutOverride;
    }
  }

  if (isPreview) {
    pagesContainer.style.display = 'flex';
    pagesContainer.style.flexDirection = 'column';
    pagesContainer.style.alignItems = 'center';
    pagesContainer.style.justifyContent = 'flex-start';
    pagesContainer.style.rowGap = '18px';
    pagesContainer.style.columnGap = '0px';
    pagesContainer.style.gap = '18px';
  }
}

// Small helper to wait for next paint or a fixed delay
export function sleep(ms = 0) {
  if (ms <= 0) {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pagesOverflow(root) {
  if (!root) return false;
  const pages = Array.from(root.querySelectorAll('.quote-page'));
  return pages.some((page) => ((page.scrollHeight - page.clientHeight) > PAGE_OVERFLOW_TOLERANCE_PX));
}

export function enforceQuoteTextColor(root, color = '#000000') {
  if (!root) return;
  const nodes = root.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div');
  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.style.setProperty('color', color, 'important');
  });
}

export async function capturePageSegments(page, html2canvasFn, {
  baseOptions = {},
  segmentHeightPx = PAGE_SEGMENT_MAX_HEIGHT_PX
} = {}) {
  if (!page || typeof html2canvasFn !== 'function') return [];

  const { waitForQuoteAssets } = await import('./assets.js');
  const doc = page.ownerDocument || document;
  const view = doc.defaultView || window;
  const totalHeight = Math.ceil(page.scrollHeight || page.offsetHeight || PAGE_SEGMENT_MAX_HEIGHT_PX);
  const totalWidth = Math.ceil(page.scrollWidth || page.offsetWidth || A4_WIDTH_PX);
  const effectiveSegmentHeight = Math.max(1, Math.min(segmentHeightPx, PAGE_SEGMENT_MAX_HEIGHT_PX));
  const segments = [];

  for (let offset = 0; offset < totalHeight; offset += effectiveSegmentHeight) {
    const sliceHeight = Math.min(effectiveSegmentHeight, totalHeight - offset);
    const segmentContainer = doc.createElement('div');
    segmentContainer.style.position = 'fixed';
    segmentContainer.style.left = '-10000px';
    segmentContainer.style.top = '0';
    segmentContainer.style.width = `${totalWidth}px`;
    segmentContainer.style.height = `${sliceHeight}px`;
    segmentContainer.style.overflow = 'hidden';
    segmentContainer.style.pointerEvents = 'none';
    segmentContainer.style.backgroundColor = '#ffffff';
    segmentContainer.style.opacity = '1';
    segmentContainer.style.zIndex = '-1';

    const clone = page.cloneNode(true);
    clone.style.width = `${totalWidth}px`;
    clone.style.transform = `translateY(-${offset}px)`;
    clone.style.transformOrigin = 'top left';
    clone.style.margin = '0';
    clone.style.position = 'relative';
    segmentContainer.appendChild(clone);
    doc.body.appendChild(segmentContainer);

    try {
      await waitForQuoteAssets(segmentContainer);
      const canvas = await html2canvasFn(segmentContainer, {
        ...baseOptions,
        height: sliceHeight,
        windowHeight: sliceHeight,
        width: totalWidth,
        windowWidth: totalWidth,
        scrollX: 0,
        scrollY: 0
      });
      segments.push({ canvas, sliceHeight });
      logPdfDebug(`captured segment`, { offset, sliceHeight });
    } finally {
      segmentContainer.parentNode?.removeChild(segmentContainer);
      await new Promise((resolve) => view.requestAnimationFrame(resolve));
    }
  }

  return segments;
}
