import { state } from './state.js';
import {
  DEFAULT_TERMS,
  PROJECT_QUOTE_TERMS,
  QUOTE_TROUBLESHOOT_URL,
} from './constants.js';
import {
  getQuoteSectionDefs,
  getQuoteFieldDefs,
  getQuoteStatusMessage,
  buildDefaultFieldSelections,
  buildDefaultSectionExpansions,
  ensureSectionExpansionState,
  isSectionExpanded,
  isFieldEnabledInSelections,
  getFieldSelectionSet,
} from './config.js';
import {
  persistQuoteTogglePreferences,
  applyQuoteTogglePreferences,
} from './toggle-prefs.js';
import {
  isMobileViewport,
  isIosSafari,
  isMobileSafariBrowser,
  logPdfWarn,
} from './utils.js';
import { escapeHtml } from './utils.js';
import {
  refreshChecklistLessorOptions,
  buildChecklistEquipmentLookup,
  collectChecklistLessorOptions,
  normalizeLessorKey,
  itemMatchesLessorFilter,
} from './checklist.js';
import { renderQuotePreview, handlePdfError, cleanupPdfArtifacts, renderQuotePagesAsPdf } from './renderer.js';
import {
  collectReservationCrewAssignments,
  collectReservationFinancials,
  collectProjectQuoteData,
  normalizeTermsInput,
  resolveTermsFromForms,
  formatQuoteDate,
} from './data-collection.js';
import { buildQuoteV2Html, isQuoteV2Context } from './v2/template.js';
import { normalizeQuoteV2Language } from './v2/i18n.js';
import { registerQuotePdfCallbacks } from './callbacks.js';
import { getChecklistPreviewReservation } from './checklist.js';
import { ensurePackagesAvailable, waitForQuoteAssets } from './assets.js';
import { ensureHtml2Pdf } from './assets.js';
import {
  normalizeNumbers,
  showToast,
  showToastWithAction,
} from '../../utils.js';
import { t, getCurrentLanguage } from '../../language.js';
import { getReservationsState, refreshReservationsFromApi } from '../../reservationsService.js';
import {
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions,
} from '../../canvasColorUtils.js';

export function showQuotePreviewStatus(type = 'render', {
  message,
  actionLabel,
  onAction,
  showSpinner = type !== 'error'
} = {}) {
  if (!state.quoteModalRefs?.statusIndicator || !state.quoteModalRefs?.statusText) return;
  state.quoteModalRefs.statusKind = type;

  const textValue = message || getQuoteStatusMessage(type);
  state.quoteModalRefs.statusText.textContent = textValue;

  if (state.quoteModalRefs.statusSpinner) {
    state.quoteModalRefs.statusSpinner.hidden = !showSpinner;
  }

  if (state.quoteModalRefs.statusAction) {
    state.quoteModalRefs.statusAction.hidden = true;
    state.quoteModalRefs.statusAction.onclick = null;
    if (actionLabel && typeof onAction === 'function') {
      state.quoteModalRefs.statusAction.textContent = actionLabel;
      state.quoteModalRefs.statusAction.hidden = false;
      state.quoteModalRefs.statusAction.onclick = (event) => {
        event.preventDefault();
        onAction();
      };
    }
  }

  state.quoteModalRefs.statusIndicator.hidden = false;
  requestAnimationFrame(() => {
    state.quoteModalRefs.statusIndicator.classList.add('is-visible');
  });
}

export function hideQuotePreviewStatus(type) {
  if (!state.quoteModalRefs?.statusIndicator || !state.quoteModalRefs?.statusText) return;
  if (type && state.quoteModalRefs.statusKind && state.quoteModalRefs.statusKind !== type) {
    return;
  }
  state.quoteModalRefs.statusKind = null;
  state.quoteModalRefs.statusIndicator.classList.remove('is-visible');
  setTimeout(() => {
    if (!state.quoteModalRefs?.statusIndicator) return;
    state.quoteModalRefs.statusIndicator.hidden = true;
    if (state.quoteModalRefs.statusAction) {
      state.quoteModalRefs.statusAction.hidden = true;
      state.quoteModalRefs.statusAction.onclick = null;
    }
    if (state.quoteModalRefs.statusSpinner) {
      state.quoteModalRefs.statusSpinner.hidden = false;
    }
  }, 220);
}

export function hasBootstrapModalSupport() {
  return Boolean(window?.bootstrap?.Modal);
}

export function showModalFallback(modalEl) {
  if (!modalEl) return;
  if (modalEl.classList.contains('show')) return;
  modalEl.classList.add('show');
  modalEl.style.display = 'block';
  modalEl.removeAttribute('aria-hidden');
  modalEl.setAttribute('aria-modal', 'true');
  if (!modalEl.getAttribute('role')) {
    modalEl.setAttribute('role', 'dialog');
  }
  document.body.classList.add('modal-open');
  document.body.classList.add('quote-preview-modal-open');

  if (!state.manualQuoteBackdrop) {
    state.manualQuoteBackdrop = document.createElement('div');
    state.manualQuoteBackdrop.className = 'modal-backdrop fade show';
    state.manualQuoteBackdrop.dataset.quotePdfFallbackBackdrop = 'true';
    document.body.appendChild(state.manualQuoteBackdrop);
  }

  if (!state.manualQuoteEscapeHandler) {
    state.manualQuoteEscapeHandler = (event) => {
      if (event.key === 'Escape') {
        hideModalFallback(modalEl);
      }
    };
    document.addEventListener('keydown', state.manualQuoteEscapeHandler);
  }

  try {
    modalEl.focus({ preventScroll: true });
  } catch (_focusError) {
    // ignore focus issues on older browsers
  }
}

export function hideModalFallback(modalEl) {
  if (!modalEl || !modalEl.classList.contains('show')) return;
  try {
    const active = modalEl.ownerDocument?.activeElement;
    if (active && modalEl.contains(active)) {
      try { active.blur(); } catch (_) {}
      try { modalEl.ownerDocument?.body?.focus({ preventScroll: true }); } catch (_) {}
    }
  } catch (_) {}
  modalEl.classList.remove('show');
  modalEl.style.display = 'none';
  modalEl.setAttribute('aria-hidden', 'true');
  modalEl.removeAttribute('aria-modal');
  document.body.classList.remove('modal-open');
  document.body.classList.remove('quote-preview-modal-open');

  if (state.manualQuoteBackdrop) {
    state.manualQuoteBackdrop.remove();
    state.manualQuoteBackdrop = null;
  }

  if (state.manualQuoteEscapeHandler) {
    document.removeEventListener('keydown', state.manualQuoteEscapeHandler);
    state.manualQuoteEscapeHandler = null;
  }
  try { detachQuoteLiveListeners(); } catch (_) {}
}

export function showQuoteModalElement(modalEl) {
  if (!modalEl) return;
  if (hasBootstrapModalSupport()) {
    const instance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    document.body.classList.add('quote-preview-modal-open');
    try {
      const onHidden = () => {
        try {
          const active = document.activeElement;
          if (active && modalEl.contains(active)) {
            try { active.blur(); } catch (_) {}
            try { document.body?.focus({ preventScroll: true }); } catch (_) {}
          }
        } catch (_) {}
        try { detachQuoteLiveListeners(); } catch (_) {}
        document.body.classList.remove('quote-preview-modal-open');
        try { modalEl.removeEventListener('hidden.bs.modal', onHidden); } catch (_) {}
      };
      modalEl.addEventListener('hidden.bs.modal', onHidden, { once: true });
      // In some cases focus is still inside during the hide transition; blur earlier as well
      modalEl.addEventListener('hide.bs.modal', () => {
        try {
          const active = document.activeElement;
          if (active && modalEl.contains(active)) {
            try { active.blur(); } catch (_) {}
          }
        } catch (_) {}
      });
    } catch (_) {}
    instance.show();
    return;
  }
  showModalFallback(modalEl);
}

export function notifyQuoteAssetFailure() {
  if (state.quoteAssetWarningShown) return;
  state.quoteAssetWarningShown = true;
  const guideLabel = t('reservations.quote.toast.viewGuide', '📘 عرض دليل الحل السريع');
  const retryLabel = t('reservations.quote.toast.retry', 'إعادة المحاولة');
  const message = t('reservations.quote.toast.assetsFailed', '⚠️ تعذر تحميل بعض الصور ضمن عرض سعر.');

  const canRetry = Boolean(state.quoteModalRefs?.modal?.classList.contains('show'));
  const retryHandler = () => {
    if (state.quoteModalRefs?.modal?.classList.contains('show')) {
      showQuotePreviewStatus('render');
      state.quoteAssetWarningShown = false;
      renderQuotePreview();
    }
  };

  showToastWithAction({
    message,
    duration: 9000,
    actionLabel: canRetry ? retryLabel : undefined,
    onAction: canRetry ? retryHandler : undefined,
    linkLabel: guideLabel,
    linkHref: QUOTE_TROUBLESHOOT_URL
  });

  if (canRetry) {
    showQuotePreviewStatus('error', {
      message,
      actionLabel: retryLabel,
      onAction: retryHandler,
      showSpinner: false
    });
  }
}

function attachQuoteLiveListeners() {
  if (state.quoteLiveListenersAttached) return;
  state.reservationsChangedHandlerRef = async function onReservationsChanged() {
    try {
      if (!state.activeQuoteState || !state.quoteModalRefs?.modal?.classList.contains('show')) return;
      const context = state.activeQuoteState.context || 'reservation';
      if (context !== 'reservation') return;
      const current = state.activeQuoteState.reservation;
      if (!current) return;
      const candidates = [
        current.id,
        current.reservationId,
        current.reservation_id,
        current.reservationCode,
        current.reservation_code
      ].map((v) => (v == null ? '' : String(v))).filter((v) => v.length > 0);
      if (!candidates.length) return;
      const list = getReservationsState();
      const updated = (Array.isArray(list) ? list : []).find((entry) => {
        const ids = [
          entry?.id,
          entry?.reservationId,
          entry?.reservation_id,
          entry?.reservationCode,
          entry?.reservation_code
        ].map((v) => (v == null ? '' : String(v))).filter((v) => v.length > 0);
        return ids.some((id) => candidates.includes(id));
      });
      if (!updated) return;

      // Recompute crew assignments and totals
      const crewAssignments = collectReservationCrewAssignments(updated);
      const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(updated, crewAssignments, state.activeQuoteState.project);
      state.activeQuoteState.reservation = updated;
      state.activeQuoteState.crewAssignments = crewAssignments;
      state.activeQuoteState.totals = totals;
      state.activeQuoteState.totalsDisplay = totalsDisplay;
      state.activeQuoteState.rentalDays = rentalDays;
      if (state.activeQuoteState.context === 'reservationChecklist') {
        refreshChecklistLessorOptions();
      }
      updateQuoteMeta();
      renderQuotePreview();
    } catch (err) {
      // non-fatal
      console.warn('[reservationPdf] live update failed', err);
    }
  };
  document.addEventListener('reservations:changed', state.reservationsChangedHandlerRef);
  state.quoteLiveListenersAttached = true;
}

function detachQuoteLiveListeners() {
  if (!state.quoteLiveListenersAttached) return;
  try { document.removeEventListener('reservations:changed', state.reservationsChangedHandlerRef); } catch (_) {}
  state.reservationsChangedHandlerRef = null;
  state.quoteLiveListenersAttached = false;
}

export function renderChecklistLessorFilters() {
  if (!state.quoteModalRefs?.checklistLessorContainer) return;
  const container = state.quoteModalRefs.checklistLessorContainer;
  const host = state.quoteModalRefs.checklistLessorOptionsHost;
  if (!state.activeQuoteState || state.activeQuoteState.context !== 'reservationChecklist') {
    container.hidden = true;
    return;
  }
  const options = Array.isArray(state.activeQuoteState.checklistLessorOptions)
    ? state.activeQuoteState.checklistLessorOptions
    : [];
  const filter = state.activeQuoteState.checklistLessorFilter instanceof Set
    ? state.activeQuoteState.checklistLessorFilter
    : new Set();
  if (!host) {
    container.hidden = true;
    return;
  }

  if (!options.length) {
    container.hidden = true;
    host.innerHTML = `<p class="text-muted" data-lessor-empty>${escapeHtml(t('reservations.checklist.controls.lessors.empty', 'لا توجد معلومات مؤجر مرتبطة بالمعدات.'))}</p>`;
    const clearButton = container.querySelector('[data-lessor-clear]');
    if (clearButton) {
      clearButton.disabled = true;
    }
    return;
  }

  container.hidden = false;
  host.innerHTML = options.map((option) => {
    const checkboxId = `checklist-lessor-${option.key}`;
    const countLabel = option.count
      ? ` <small>(${escapeHtml(normalizeNumbers(String(option.count)))})</small>`
      : '';
    return `
      <label for="${checkboxId}" class="quote-checklist-option quote-checklist-option--checkbox quote-checklist-lessor-option">
        <input type="checkbox" id="${checkboxId}" value="${option.key}" ${filter.has(option.key) ? 'checked' : ''}>
        <span>${escapeHtml(option.label)}${countLabel}</span>
      </label>
    `;
  }).join('');
  host.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!(state.activeQuoteState.checklistLessorFilter instanceof Set)) {
        state.activeQuoteState.checklistLessorFilter = new Set();
      }
      if (input.checked) {
        state.activeQuoteState.checklistLessorFilter.add(input.value);
      } else {
        state.activeQuoteState.checklistLessorFilter.delete(input.value);
      }
      renderChecklistLessorFilters();
      renderQuotePreview();
    });
  });
  const clearButton = container.querySelector('[data-lessor-clear]');
  if (clearButton) {
    clearButton.disabled = filter.size === 0;
    clearButton.onclick = () => {
      if (state.activeQuoteState.checklistLessorFilter instanceof Set) {
        state.activeQuoteState.checklistLessorFilter.clear();
        renderChecklistLessorFilters();
        renderQuotePreview();
      }
    };
  }
}

function handleToggleChange(event) {
  if (!state.activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  if (!sectionId) return;
  if (checkbox.checked) {
    state.activeQuoteState.sections.add(sectionId);
  } else {
    state.activeQuoteState.sections.delete(sectionId);
  }
  persistQuoteTogglePreferences(state.activeQuoteState);
  renderQuoteToggles();
  renderQuotePreview();
}

function handleFieldToggleChange(event) {
  if (!state.activeQuoteState) return;
  const checkbox = event.currentTarget;
  const sectionId = checkbox?.dataset?.sectionId;
  const fieldId = checkbox?.dataset?.fieldId;
  if (!sectionId || !fieldId) return;
  const context = state.activeQuoteState.context || 'reservation';
  const selections = state.activeQuoteState.fields || (state.activeQuoteState.fields = buildDefaultFieldSelections(context));
  const set = getFieldSelectionSet(selections, sectionId);
  if (checkbox.checked) {
    set.add(fieldId);
  } else {
    set.delete(fieldId);
  }
  persistQuoteTogglePreferences(state.activeQuoteState);
  renderQuotePreview();
}

function handleSectionExpansionToggle(event) {
  if (!state.activeQuoteState) return;
  const details = event.currentTarget;
  const sectionId = details?.dataset?.sectionId;
  if (!sectionId) return;
  ensureSectionExpansionState(state.activeQuoteState, sectionId);
  state.activeQuoteState.sectionExpansions[sectionId] = details.open;
}

export function renderQuoteToggles() {
  if (!state.quoteModalRefs?.toggles || !state.activeQuoteState) return;
  const { toggles } = state.quoteModalRefs;
  const selections = state.activeQuoteState.fields || {};
  const context = state.activeQuoteState.context || 'reservation';
  const expansions = ensureSectionExpansionState(state.activeQuoteState);
  const sectionDefs = getQuoteSectionDefs(context);
  const fieldDefs = getQuoteFieldDefs(context);
  const items = sectionDefs.map(({ id, labelKey, fallback }) => {
    const sectionLabel = t(labelKey, fallback);
    const sectionChecked = state.activeQuoteState.sections.has(id);
    const fields = fieldDefs[id] || [];
    const sectionExpanded = isSectionExpanded(state.activeQuoteState, id);
    const fieldList = fields.length
      ? `<div class="quote-toggle-sublist">
          ${fields.map((field) => {
            const fieldChecked = isFieldEnabledInSelections(selections, id, field.id);
            const disabledAttr = sectionChecked ? '' : 'disabled';
            const fieldLabel = field.labelKey ? t(field.labelKey, field.fallback) : field.fallback;
            return `
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${id}" data-field-id="${field.id}" ${fieldChecked ? 'checked' : ''} ${disabledAttr}>
                <span>${escapeHtml(fieldLabel)}</span>
              </label>
            `;
          }).join('')}
        </div>`
      : '';
    return `
      <details class="quote-toggle-group" data-section-group data-section-id="${id}" ${sectionExpanded ? 'open' : ''}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${id}" ${sectionChecked ? 'checked' : ''}>
            <span>${escapeHtml(sectionLabel)}</span>
          </label>
          ${fields.length ? '<span class="quote-toggle-caret" aria-hidden="true"></span>' : ''}
        </summary>
        ${fieldList}
      </details>
    `;
  }).join('');

  toggles.innerHTML = items;
  toggles.querySelectorAll('input[data-section-toggle]').forEach((input) => {
    input.addEventListener('change', handleToggleChange);
  });
  toggles.querySelectorAll('input[data-field-toggle]').forEach((input) => {
    input.addEventListener('change', handleFieldToggleChange);
  });
  toggles.querySelectorAll('details[data-section-group]').forEach((details) => {
    details.addEventListener('toggle', handleSectionExpansionToggle);
  });
}

export function updateQuoteMeta() {
  if (!state.quoteModalRefs?.meta || !state.activeQuoteState) return;
  const { meta } = state.quoteModalRefs;
  if ((state.activeQuoteState.context || 'reservation') === 'reservationChecklist') {
    meta.innerHTML = `
      <div class="quote-meta-card">
        <div><span>${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</span><strong>${escapeHtml(state.activeQuoteState.quoteDateLabel)}</strong></div>
      </div>
    `;
  } else {
    meta.innerHTML = `
      <div class="quote-meta-card">
        <div><span>${escapeHtml(t('reservations.quote.labels.number', 'رقم عرض سعر'))}</span><strong>${escapeHtml(state.activeQuoteState.quoteNumber)}</strong></div>
        <div>
          <label for="quote-date-label-input">${escapeHtml(t('reservations.quote.labels.dateGregorian', 'التاريخ الميلادي'))}</label>
          <input id="quote-date-label-input" type="text" data-quote-date-input value="${escapeHtml(state.activeQuoteState.quoteDateLabel)}">
        </div>
      </div>
    `;
    const dateInput = meta.querySelector('[data-quote-date-input]');
    dateInput?.addEventListener('input', (event) => {
      if (!state.activeQuoteState) return;
      state.activeQuoteState.quoteDateLabel = String(event.target.value || '').trim() || formatQuoteDate(state.activeQuoteState.quoteDate || new Date());
      renderQuotePreview();
    });
  }
}

export function updateQuoteTermsEditor() {
  if (!state.quoteModalRefs?.termsInput) return;
  const termsValue = (state.activeQuoteState?.terms && state.activeQuoteState.terms.length ? state.activeQuoteState.terms : DEFAULT_TERMS).join('\n');
  if (state.quoteModalRefs.termsInput.value !== termsValue) {
    state.quoteModalRefs.termsInput.value = termsValue;
  }
}

export function syncQuoteLanguageControls() {
  const refs = state.quoteModalRefs;
  if (!refs?.languageControls) return;
  const isV2 = isQuoteV2Context(state.activeQuoteState);
  refs.languageControls.hidden = !isV2;
  const current = normalizeQuoteV2Language(state.activeQuoteState?.quoteLanguage);
  refs.languageControls.querySelectorAll('[data-quote-language]').forEach((button) => {
    const active = normalizeQuoteV2Language(button.dataset.quoteLanguage) === current;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function handleQuoteTermsInput(event) {
  if (!state.activeQuoteState) return;
  const terms = normalizeTermsInput(event?.target?.value ?? '');
  if (terms.length) {
    state.activeQuoteState.terms = terms;
    state.activeQuoteState.termsEdited = true;
    const creationInput = document.getElementById('reservation-terms');
    if (creationInput) {
      creationInput.value = event.target.value;
    }
    const editInput = document.getElementById('edit-res-terms');
    if (editInput) {
      editInput.value = event.target.value;
    }
  } else {
    state.activeQuoteState.terms = [...DEFAULT_TERMS];
    state.activeQuoteState.termsEdited = false;
    updateQuoteTermsEditor();
    const defaultText = DEFAULT_TERMS.join('\n');
    const creationInput = document.getElementById('reservation-terms');
    if (creationInput) {
      creationInput.value = defaultText;
    }
    const editInput = document.getElementById('edit-res-terms');
    if (editInput) {
      editInput.value = defaultText;
    }
  }
  renderQuotePreview();
}

function handleQuoteTermsReset(event) {
  event?.preventDefault?.();
  if (!state.activeQuoteState) return;
  state.activeQuoteState.terms = [...DEFAULT_TERMS];
  state.activeQuoteState.termsEdited = false;
  const creationInput = document.getElementById('reservation-terms');
  if (creationInput) {
    creationInput.value = DEFAULT_TERMS.join('\n');
  }
  const editInput = document.getElementById('edit-res-terms');
  if (editInput) {
    editInput.value = DEFAULT_TERMS.join('\n');
  }
  updateQuoteTermsEditor();
  renderQuotePreview();
}

export async function exportQuoteAsPdf() {
  if (!state.activeQuoteState) return;
  showQuotePreviewStatus('export');
  const mobileViewport = isMobileViewport();
  const safariPopupRequired = !mobileViewport && isIosSafari();
  const mobileSafari = isMobileSafariBrowser();
  const mobileDownloadWindow = null;
  const safariDownloadWindow = (!mobileSafari && safariPopupRequired) ? window.open('', '_blank') : null;

  const primeDownloadWindow = (win) => {
    if (!win) return;
    try {
      win.document.open();
      win.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${escapeHtml(t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...'))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${escapeHtml(t('reservations.quote.status.exporting', 'جاري تجهيز ملف PDF...'))}</h1><p>${escapeHtml(t('reservations.quote.status.exportingHint', 'قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار...'))}</p></div></body></html>`);
      win.document.close();
    } catch (error) {
      logPdfWarn('failed to prime download window', error);
    }
  };

  primeDownloadWindow(safariDownloadWindow);

  let container = null;
  try {
    await ensureHtml2Pdf();

    const context = state.activeQuoteState.context || 'reservation';
    const reservationForExport = context === 'reservationChecklist'
      ? getChecklistPreviewReservation()
      : state.activeQuoteState.reservation;
    // Do not reserve server-side sequences; we use digits-only from reservation/project identifiers for both contexts.
    // Keeping this block disabled preserves deterministic quote numbers and avoids server dependency.
    const html = buildQuoteV2Html({
      ...state.activeQuoteState,
      reservation: reservationForExport || state.activeQuoteState.reservation,
    });

    container = document.createElement('div');
    container.innerHTML = html;
    Object.assign(container.style, {
      position: 'fixed',
      top: '0',
      left: '-12000px',
      pointerEvents: 'none',
      zIndex: '-1',
      background: 'transparent',
      overflow: 'hidden'
    });
    document.body.appendChild(container);

    scrubUnsupportedColorFunctions(container);
    sanitizeComputedColorFunctions(container);
    enforceLegacyColorFallback(container);

    const pdfRoot = container.firstElementChild;

    if (pdfRoot) {
      // Respect language-specific direction for export as in preview
      try {
        const langNow = normalizeQuoteV2Language(state.activeQuoteState?.quoteLanguage);
        const rootDir = langNow === 'en' ? 'ltr' : 'rtl';
        pdfRoot.setAttribute('dir', rootDir);
        pdfRoot.style.direction = rootDir;
        // Ensure CSS language-specific rules (e.g., table LTR) apply during export
        pdfRoot.setAttribute('data-lang', langNow);
        // Let CSS handle text alignment per language; avoid forcing it here
        pdfRoot.style.textAlign = '';
      } catch (_) {
        /* fallback: do not override direction */
      }
      pdfRoot.setAttribute('data-theme', 'light');
      pdfRoot.classList.remove('dark', 'dark-mode');
      pdfRoot.style.margin = '0';
      pdfRoot.style.padding = '0';
      pdfRoot.style.width = '210mm';
      pdfRoot.style.maxWidth = '210mm';
      pdfRoot.style.marginLeft = 'auto';
      pdfRoot.style.marginRight = 'auto';
      pdfRoot.scrollTop = 0;
      pdfRoot.scrollLeft = 0;
      try {
        await waitForQuoteAssets(pdfRoot);
      } catch (layoutError) {
        handlePdfError(layoutError, 'quoteV2Assets', { suppressToast: true });
      }
    }

    const filename = (context === 'reservationChecklist')
      ? (() => {
          const id = state.activeQuoteState?.reservation?.reservationCode || state.activeQuoteState?.reservation?.reservationId || state.activeQuoteState?.reservation?.id || 'res';
          const kind = (state.activeQuoteState?.checklistType === 'crew') ? 'crew' : (state.activeQuoteState?.checklistType === 'both' ? 'equipment-crew' : 'equipment');
          return `checklist-${String(id)}-${kind}.pdf`;
        })()
      : `quotation-${state.activeQuoteState.quoteNumber}.pdf`;
    await renderQuotePagesAsPdf(pdfRoot, {
      filename,
      safariWindowRef: safariDownloadWindow,
      mobileWindowRef: mobileDownloadWindow
    });

  } catch (error) {
    cleanupPdfArtifacts({
      container,
      safariWindowRef: safariDownloadWindow,
      mobileWindowRef: mobileDownloadWindow
    });
    container = null;
    handlePdfError(error, 'exportQuoteAsPdf', { toastMessage: browserLimitMessage });
  } finally {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    hideQuotePreviewStatus();
  }
}

export function setPreviewZoom(value, { silent = false, markManual = false } = {}) {
  state.previewZoom = Math.min(Math.max(value, 0.25), 2.2);
  if (markManual && state.quoteModalRefs) {
    state.quoteModalRefs.userAdjustedZoom = true;
  }
  applyPreviewZoom(state.previewZoom);
  if (!silent && state.quoteModalRefs?.zoomValue) {
    state.quoteModalRefs.zoomValue.textContent = `${Math.round(state.previewZoom * 100)}%`;
  }
}

export function adjustPreviewZoom(delta) {
  setPreviewZoom(state.previewZoom + delta, { markManual: true });
}

export function applyPreviewZoom(value) {
  if (!state.quoteModalRefs?.previewFrame || !state.quoteModalRefs.previewFrameWrapper) return;
  const frame = state.quoteModalRefs.previewFrame;
  const wrapper = state.quoteModalRefs.previewFrameWrapper;
  const baseWidth = Number(frame.dataset.baseWidth) || 794;
  const baseHeight = Number(frame.dataset.baseHeight) || frame.contentDocument?.body?.scrollHeight || 1123;
  frame.style.transform = `scale(${value})`;
  frame.style.transformOrigin = 'top center';
  if (isMobileViewport()) {
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '100%';
    wrapper.style.minWidth = '0';
  } else {
    wrapper.style.width = `${baseWidth}px`;
    wrapper.style.maxWidth = `${baseWidth}px`;
    wrapper.style.minWidth = `${baseWidth}px`;
  }
  wrapper.style.minHeight = `${baseHeight}px`;
  wrapper.style.height = `${baseHeight}px`;
}

function getChecklistTitle(type = 'items', language = 'ar') {
  const normalizedType = type === 'crew' || type === 'both' ? type : 'items';
  const normalizedLanguage = normalizeQuoteV2Language(language);
  if (normalizedLanguage === 'en') {
    if (normalizedType === 'crew') return 'Crew List';
    if (normalizedType === 'both') return 'Equipment & Crew List';
    return 'Equipment List';
  }
  if (normalizedType === 'crew') return 'قائمة الفريق الفني';
  if (normalizedType === 'both') return 'قائمة المعدات والطاقم الفني';
  return 'قائمة المعدات';
}

function syncChecklistModalTitle(titleEl = state.quoteModalRefs?.modal?.querySelector('#reservationQuoteModalLabel')) {
  if (!titleEl || state.activeQuoteState?.context !== 'reservationChecklist') return;
  titleEl.textContent = getChecklistTitle(
    state.activeQuoteState.checklistType,
    state.activeQuoteState.quoteLanguage || getCurrentLanguage?.() || 'ar',
  );
}

export function ensureQuoteModal() {
  if (state.quoteModalRefs?.modal) return state.quoteModalRefs;

  const modal = document.createElement('div');
  modal.id = 'reservationQuoteModal';
  modal.className = 'modal fade customer-edit-modal reservation-shell-modal quote-preview-modal';
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'reservationQuoteModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable customer-edit-modal__dialog reservation-shell-modal__dialog reservation-shell-modal__dialog--wide">
      <div class="ui-modal__content modal-content customer-edit-modal__content reservation-shell-modal__content">
        <div class="ui-modal__header modal-header customer-edit-modal__header reservation-shell-modal__header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${escapeHtml(t('reservations.quote.previewTitle', 'معاينة عرض سعر'))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${escapeHtml(t('actions.close', 'إغلاق'))}"></button>
        </div>
        <div class="ui-modal__body modal-body customer-edit-modal__body reservation-shell-modal__body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${escapeHtml(t('reservations.quote.toggleHeading', 'حدد المعلومات المراد تصديرها'))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${escapeHtml(t('reservations.quote.termsEditor.title', 'الشروط العامة (قابلة للتعديل)'))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${escapeHtml(t('reservations.quote.termsEditor.placeholder', 'اكتب كل شرط في سطر مستقل'))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${escapeHtml(t('reservations.quote.termsEditor.reset', 'استعادة الشروط الافتراضية'))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="ui-modal__footer modal-footer customer-edit-modal__footer reservation-shell-modal__footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${escapeHtml(t('reservations.quote.actions.close', 'إغلاق'))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${escapeHtml(t('reservations.quote.actions.export', '📄 تنزيل PDF'))}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modal.addEventListener('show.bs.modal', () => {
    document.body.classList.add('quote-preview-modal-open');
  });
  modal.addEventListener('hidden.bs.modal', () => {
    document.body.classList.remove('quote-preview-modal-open');
  });

  const toggles = modal.querySelector('[data-quote-toggles]');
  const preview = modal.querySelector('[data-quote-preview]');
  const meta = modal.querySelector('[data-quote-meta]');
  const termsInput = modal.querySelector('[data-quote-terms-input]');
  const termsReset = modal.querySelector('[data-quote-terms-reset]');
  const downloadBtn = modal.querySelector('[data-quote-download]');
  const modalHeader = modal.querySelector('.modal-header');
  const headerCloseButton = modalHeader?.querySelector('.btn-close');
  const dismissButtons = Array.from(modal.querySelectorAll('[data-bs-dismiss="modal"]'));

  const headerActions = document.createElement('div');
  headerActions.className = 'quote-preview-header-actions';
  if (modalHeader) {
    modalHeader.insertBefore(headerActions, headerCloseButton || null);
  }

  const previewFrame = document.createElement('iframe');
  previewFrame.className = 'quote-preview-frame';
  previewFrame.setAttribute('title', t('reservations.quote.previewTitle', 'معاينة عرض سعر'));
  previewFrame.setAttribute('loading', 'lazy');
  previewFrame.setAttribute('frameborder', '0');
  const zoomControls = document.createElement('div');
  zoomControls.className = 'quote-preview-zoom-controls';
  zoomControls.innerHTML = `
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${escapeHtml(t('reservations.quote.zoom.out', 'تصغير'))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${escapeHtml(t('reservations.quote.zoom.in', 'تكبير'))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${escapeHtml(t('reservations.quote.zoom.reset', 'إعادة الضبط'))}">1:1</button>
  `;
  const languageControls = document.createElement('div');
  languageControls.className = 'quote-preview-zoom-controls quote-preview-language-controls';
  languageControls.innerHTML = `
    <button type="button" class="quote-preview-zoom-btn" data-quote-language="ar">العربية</button>
    <button type="button" class="quote-preview-zoom-btn" data-quote-language="en">English</button>
  `;
  const frameWrapper = document.createElement('div');
  frameWrapper.className = 'quote-preview-frame-wrapper';
  frameWrapper.appendChild(previewFrame);

  preview.innerHTML = '';
  const previewScroll = document.createElement('div');
  previewScroll.className = 'quote-preview-scroll';
  previewScroll.appendChild(frameWrapper);
  preview.appendChild(previewScroll);
  const statusIndicator = document.createElement('div');
  statusIndicator.className = 'quote-preview-status';
  statusIndicator.setAttribute('role', 'status');
  statusIndicator.setAttribute('aria-live', 'polite');
  statusIndicator.hidden = true;
  statusIndicator.innerHTML = `
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${escapeHtml(getQuoteStatusMessage('render'))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `;
  preview.appendChild(statusIndicator);
  headerActions.appendChild(languageControls);
  headerActions.appendChild(zoomControls);

  downloadBtn?.addEventListener('click', async () => {
    if (!state.activeQuoteState) return;
    downloadBtn.disabled = true;
    try {
      await exportQuoteAsPdf();
    } finally {
      downloadBtn.disabled = false;
    }
  });

  const handleFallbackDismiss = () => {
    if (!hasBootstrapModalSupport()) {
      hideModalFallback(modal);
    }
  };

  dismissButtons.forEach((button) => {
    button?.addEventListener('click', handleFallbackDismiss);
  });
  if (headerCloseButton && !dismissButtons.includes(headerCloseButton)) {
    headerCloseButton.addEventListener('click', handleFallbackDismiss);
  }

  modal.addEventListener('click', (event) => {
    if (hasBootstrapModalSupport()) return;
    if (event.target === modal) {
      hideModalFallback(modal);
    }
  });

  state.quoteModalRefs = {
    modal,
    toggles,
    preview,
    previewScroll,
    previewFrameWrapper: frameWrapper,
    zoomControls,
    languageControls,
    zoomValue: zoomControls.querySelector('[data-zoom-value]'),
    previewFrame,
    meta,
    downloadBtn,
    statusIndicator,
    statusText: statusIndicator.querySelector('[data-quote-status-text]'),
    statusSpinner: statusIndicator.querySelector('[data-quote-status-spinner]'),
    statusAction: statusIndicator.querySelector('[data-quote-status-action]'),
    termsInput,
    termsReset,
    statusKind: null,
    userAdjustedZoom: false
  };

  const zoomOutBtn = zoomControls.querySelector('[data-zoom-out]');
  const zoomInBtn = zoomControls.querySelector('[data-zoom-in]');
  const zoomResetBtn = zoomControls.querySelector('[data-zoom-reset]');
  const languageButtons = Array.from(languageControls.querySelectorAll('[data-quote-language]'));

  zoomOutBtn?.addEventListener('click', () => adjustPreviewZoom(-0.1));
  zoomInBtn?.addEventListener('click', () => adjustPreviewZoom(0.1));
  zoomResetBtn?.addEventListener('click', () => setPreviewZoom(isQuoteV2Context(state.activeQuoteState) ? 0.9 : 1, { markManual: true }));
  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.activeQuoteState) return;
      state.activeQuoteState.quoteLanguage = normalizeQuoteV2Language(button.dataset.quoteLanguage);
      syncQuoteLanguageControls();
      syncChecklistModalTitle();
      renderQuotePreview();
    });
  });
  if (termsInput) {
    termsInput.addEventListener('input', handleQuoteTermsInput);
  }

  if (termsReset) {
    termsReset.addEventListener('click', handleQuoteTermsReset);
  }

  setPreviewZoom(state.previewZoom);

  return state.quoteModalRefs;
}

function openQuoteModal() {
  const refs = ensureQuoteModal();
  if (!refs?.modal) return;

  state.quoteAssetWarningShown = false;
  state.previewZoom = isQuoteV2Context(state.activeQuoteState) ? 0.9 : 1;
  if (state.quoteModalRefs) {
    state.quoteModalRefs.userAdjustedZoom = false;
  }
  setPreviewZoom(state.previewZoom);
  syncQuoteLanguageControls();

  // Inject checklist-specific controls and labels when needed
  if (state.activeQuoteState?.context === 'reservationChecklist') {
    try {
      const titleEl = refs.modal.querySelector('#reservationQuoteModalLabel');
      const sidebar = refs.modal.querySelector('.quote-preview-sidebar');
      const termsEditor = refs.modal.querySelector('[data-quote-terms-editor]');
      if (termsEditor) termsEditor.style.display = 'none';

      // Build controls container once
      let controls = sidebar.querySelector('[data-checklist-controls]');
      if (!controls) {
        controls = document.createElement('div');
        controls.setAttribute('data-checklist-controls', '');
        const itemsLabel = escapeHtml(t('reservations.checklist.controls.items', 'قائمة المعدات'));
        const crewLabel = escapeHtml(t('reservations.checklist.controls.crew', 'قائمة الفريق الفني'));
        const bothLabel = escapeHtml(t('reservations.checklist.controls.both', 'قائمة المعدات والطاقم الفني'));
        const hideLogoLabel = escapeHtml(t('reservations.checklist.controls.hideLogo', 'إخفاء الشعار'));
        const hideCompanyLabel = escapeHtml(t('reservations.checklist.controls.hideCompany', 'إخفاء اسم الشركة'));
        const notesTitle = escapeHtml(t('reservations.checklist.controls.notes.title', 'ملاحظات اللستة (اختياري)'));
        const notesPlaceholder = escapeHtml(t('reservations.checklist.controls.notes.placeholder', 'اكتب أي ملاحظات خاصة بهذه اللستة'));
        const lessorTitle = escapeHtml(t('reservations.checklist.controls.lessors.title', '🏢 تصفية حسب المؤجر'));
        const lessorClearLabel = escapeHtml(t('reservations.checklist.controls.lessors.clear', 'إظهار كل المؤجرين'));

        controls.innerHTML = `
          <div class="quote-checklist-card quote-checklist-type-card">
            <div class="quote-checklist-option-list">
              <label class="quote-checklist-option">
                <input type="radio" name="checklist-type" value="items" checked>
                <span data-i18n data-i18n-key="reservations.checklist.controls.items">${itemsLabel}</span>
              </label>
              <label class="quote-checklist-option">
                <input type="radio" name="checklist-type" value="crew">
                <span data-i18n data-i18n-key="reservations.checklist.controls.crew">${crewLabel}</span>
              </label>
              <label class="quote-checklist-option">
                <input type="radio" name="checklist-type" value="both">
                <span data-i18n data-i18n-key="reservations.checklist.controls.both">${bothLabel}</span>
              </label>
            </div>
          </div>
          <div class="quote-checklist-card quote-checklist-branding-card">
            <div class="quote-checklist-option-list quote-checklist-option-list--compact">
              <label class="quote-checklist-option quote-checklist-option--checkbox">
                <input type="checkbox" data-checklist-hide-logo>
                <span data-i18n data-i18n-key="reservations.checklist.controls.hideLogo">${hideLogoLabel}</span>
              </label>
              <label class="quote-checklist-option quote-checklist-option--checkbox">
                <input type="checkbox" data-checklist-hide-company>
                <span data-i18n data-i18n-key="reservations.checklist.controls.hideCompany">${hideCompanyLabel}</span>
              </label>
            </div>
          </div>
          <div class="quote-terms-editor" data-checklist-notes>
            <label class="quote-terms-editor__label" for="checklist-notes-title-input" data-i18n data-i18n-key="reservations.checklist.controls.notes.titleLabel">${escapeHtml(t('reservations.checklist.controls.notes.titleLabel', 'عنوان الملاحظات'))}</label>
            <input id="checklist-notes-title-input" class="quote-terms-editor__input" type="text" value="${escapeHtml(t('reservations.checklist.controls.notes.sectionTitleDefault', 'ملاحظات'))}" data-i18n-value-key="reservations.checklist.controls.notes.sectionTitleDefault">
            <label class="quote-terms-editor__label" for="checklist-notes-input" data-i18n data-i18n-key="reservations.checklist.controls.notes.title">${notesTitle}</label>
            <textarea id="checklist-notes-input" class="quote-terms-editor__textarea" rows="4" data-i18n-placeholder-key="reservations.checklist.controls.notes.placeholder" placeholder="${notesPlaceholder}"></textarea>
          </div>
          <div class="quote-meta-card" data-checklist-lessors hidden>
            <div class="quote-checklist-lessor-head">
              <span data-i18n data-i18n-key="reservations.checklist.controls.lessors.title">${lessorTitle}</span>
              <button type="button" class="btn btn-sm btn-outline-secondary" data-lessor-clear>${lessorClearLabel}</button>
            </div>
            <div class="quote-checklist-lessor-options" data-lessor-options></div>
          </div>
        `;
        sidebar.prepend(controls);

        // Events
        const radios = controls.querySelectorAll('input[name="checklist-type"]');
        radios.forEach((radio) => {
          radio.addEventListener('change', () => {
            const value = controls.querySelector('input[name="checklist-type"]:checked')?.value || 'items';
            state.activeQuoteState.checklistType = (value === 'crew' || value === 'both') ? value : 'items';
            // Keep base sections, toggle items/crew based on selection
            const base = new Set(['customerInfo','reservationInfo','projectInfo','notes']);
            if (state.activeQuoteState.checklistType === 'crew') {
              base.add('crew');
            } else if (state.activeQuoteState.checklistType === 'both') {
              base.add('items'); base.add('crew');
            } else {
              base.add('items');
            }
            state.activeQuoteState.sections = base;
            // Update modal title to reflect selection
            syncChecklistModalTitle(titleEl);
            renderQuoteToggles();
            updateQuoteMeta();
            renderQuotePreview();
          });
        });

        const notesInput = controls.querySelector('#checklist-notes-input');
        const notesTitleInput = controls.querySelector('#checklist-notes-title-input');
        const syncNotesDirection = () => {
          try {
            const langNow = normalizeQuoteV2Language(state.activeQuoteState?.quoteLanguage || getCurrentLanguage?.() || 'ar');
            const dir = langNow === 'en' ? 'ltr' : 'rtl';
            const align = langNow === 'en' ? 'left' : 'right';
            if (notesInput) { notesInput.setAttribute('dir', dir); notesInput.style.textAlign = align; }
            if (notesTitleInput) { notesTitleInput.setAttribute('dir', dir); notesTitleInput.style.textAlign = align; }
          } catch(_) {}
        };
        // Initial sync
        syncNotesDirection();
        // Also respond to global language changes (outside the quick toggle)
        try {
          const onLangChanged = () => syncNotesDirection();
          document.addEventListener('language:changed', onLangChanged);
          // Store to remove later if needed
          controls._onLangChanged = onLangChanged;
        } catch(_) {}
        notesInput.addEventListener('input', (e) => {
          state.activeQuoteState.checklistNotes = String(e.target.value || '');
          renderQuotePreview();
        });
        notesTitleInput.addEventListener('input', (e) => {
          state.activeQuoteState.checklistNotesTitle = String(e.target.value || '');
          renderQuotePreview();
        });

        // Header branding visibility
        const hideLogoCb = controls.querySelector('[data-checklist-hide-logo]');
        const hideCompanyCb = controls.querySelector('[data-checklist-hide-company]');
        const syncBranding = () => {
          if (hideLogoCb) hideLogoCb.checked = Boolean(state.activeQuoteState.hideLogo);
          if (hideCompanyCb) hideCompanyCb.checked = Boolean(state.activeQuoteState.hideCompany);
        };
        syncBranding();
        hideLogoCb?.addEventListener('change', (e) => {
          state.activeQuoteState.hideLogo = Boolean(e.target.checked);
          renderQuotePreview();
        });
        hideCompanyCb?.addEventListener('change', (e) => {
          state.activeQuoteState.hideCompany = Boolean(e.target.checked);
          renderQuotePreview();
        });
      }

      refs.checklistControls = controls;
      refs.checklistLessorContainer = controls.querySelector('[data-checklist-lessors]');
      refs.checklistLessorOptionsHost = controls.querySelector('[data-lessor-options]');
      renderChecklistLessorFilters();

      syncChecklistModalTitle(titleEl);
      // Update preview frame title for a11y
      try { refs.previewFrame?.setAttribute('title', 'معاينة اللستة'); } catch(_) {}
    } catch (_) { /* non-fatal */ }
  }

  renderQuoteToggles();
  updateQuoteMeta();
  updateQuoteTermsEditor();
  renderQuotePreview();

  showQuoteModalElement(refs.modal);
}

export async function exportReservationPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  // Ensure packages are available for package_code lookups in PDF
  await ensurePackagesAvailable();

  const crewAssignments = collectReservationCrewAssignments(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, crewAssignments, project);
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  // Derive quote number from the reservation itself (digits only, no prefixes)
  const deriveReservationQuoteNumber = (res) => {
    if (!res) return '1';
    const codeCandidates = [
      res.reservationCode,
      res.reservation_code,
      res.reservationId,
      res.reservation_id,
      res.id
    ];
    const first = codeCandidates.find((v) => v != null && String(v).trim() !== '');
    const normalized = normalizeNumbers(String(first ?? '1'));
    return normalized || '1';
  };
  const quoteNumber = deriveReservationQuoteNumber(reservation);
  const sequence = Number.parseInt(String(quoteNumber).replace(/\D+/g, ''), 10) || 1;
  const now = new Date();
  const baseTerms = resolveTermsFromForms();

  state.activeQuoteState = {
    quoteVersion: state.quotePdfVersion || 'v2',
    quoteLanguage: normalizeQuoteV2Language(getCurrentLanguage?.() || 'ar'),
    context: 'reservation',
    reservation,
    customer,
    project,
    crewAssignments,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    projectCrew: [],
    projectExpenses: [],
    projectEquipment: [],
    sections: new Set(getQuoteSectionDefs('reservation').filter((section) => section.defaultSelected).map((section) => section.id)),
    sectionExpansions: buildDefaultSectionExpansions('reservation'),
    fields: buildDefaultFieldSelections('reservation'),
    terms: baseTerms,
    termsEdited: false,
    // Show reservation-based quote number in preview; no server reservation needed
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };
  applyQuoteTogglePreferences(state.activeQuoteState);
  openQuoteModal();
  // Attach live update listeners once per session
  try { attachQuoteLiveListeners(); } catch (_) {}
}

// Open the same preview/export modal but limited to equipment and crew lists
export async function exportReservationChecklistPdf({ reservation, customer, project }) {
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  await ensurePackagesAvailable();

  const crewAssignments = collectReservationCrewAssignments(reservation);
  const { totalsDisplay, totals, rentalDays } = collectReservationFinancials(reservation, crewAssignments, project);
  const currencyLabel = t('reservations.create.summary.currency', 'SR');

  // In checklist mode, we don't need a unique quote sequence, but keep date/number for consistency
  const now = new Date();
  const deriveChecklistQuoteNumber = (res) => {
    if (!res) return '1';
    const codeCandidates = [
      res.reservationCode,
      res.reservation_code,
      res.reservationId,
      res.reservation_id,
      res.id
    ];
    const first = codeCandidates.find((value) => value != null && String(value).trim() !== '');
    const normalized = normalizeNumbers(String(first ?? '1'));
    return normalized || '1';
  };
  const quoteNumber = deriveChecklistQuoteNumber(reservation);

  state.activeQuoteState = {
    quoteVersion: state.quotePdfVersion || 'v2',
    quoteLanguage: normalizeQuoteV2Language(getCurrentLanguage?.() || 'ar'),
    context: 'reservationChecklist',
    reservation,
    customer,
    project,
    crewAssignments,
    totals,
    totalsDisplay,
    rentalDays,
    currencyLabel,
    checklistType: 'items',
    checklistNotes: '',
    projectCrew: [],
    projectExpenses: [],
    projectEquipment: [],
    // Start with info + items only (crew hidden initially)
    sections: new Set(['customerInfo','reservationInfo','projectInfo','notes','items']),
    sectionExpansions: buildDefaultSectionExpansions('reservationChecklist'),
    fields: buildDefaultFieldSelections('reservationChecklist'),
    // Checklist: no default terms; controlled by custom notes input instead
    terms: [],
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false
  };
  state.activeQuoteState.checklistLessorFilter = new Set();
  state.activeQuoteState.checklistLessorOptions = [];
  state.activeQuoteState.checklistEquipmentLookup = buildChecklistEquipmentLookup();
  refreshChecklistLessorOptions();
  applyQuoteTogglePreferences(state.activeQuoteState);
  openQuoteModal();
  try { attachQuoteLiveListeners(); } catch (_) {}
}

export async function exportProjectPdf({ project }) {
  if (!project) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  // Ensure packages are available so package codes resolve like reservation PDF
  await ensurePackagesAvailable();

  let projectData = collectProjectQuoteData(project);
  const { project: resolvedProject } = projectData;
  if (!resolvedProject) {
    showToast(t('projects.toast.notFound', '⚠️ تعذر العثور على بيانات المشروع'));
    return;
  }

  // If equipment items are empty, try to refresh reservations from API (in case state is stale)
  try {
    const hasNoEquipmentItems = !Array.isArray(projectData.equipmentItems) || projectData.equipmentItems.length === 0;
    if (hasNoEquipmentItems && resolvedProject?.id != null) {
      await refreshReservationsFromApi({ project_id: resolvedProject.id });
      projectData = collectProjectQuoteData(resolvedProject);
    }
  } catch (error) {
    // Non-fatal: proceed with whatever data we have
    console.warn('[reservationPdf] refreshReservationsForProject failed, proceeding with snapshot/state', error);
  }

  // Derive quote number from the project itself (digits only, no prefixes)
  const deriveProjectQuoteNumber = (proj) => {
    if (!proj) return '1';
    const candidates = [
      proj.projectCode,
      proj.project_code,
      proj.code,
      proj.id
    ];
    const first = candidates.find((v) => v != null && String(v).trim() !== '');
    const normalized = normalizeNumbers(String(first ?? '1'));
    return normalized || '1';
  };
  const quoteNumber = deriveProjectQuoteNumber(resolvedProject);
  const sequence = Number.parseInt(String(quoteNumber).replace(/\D+/g, ''), 10) || 1;
  const now = new Date();
  const baseTerms = [...PROJECT_QUOTE_TERMS];

  state.activeQuoteState = {
    quoteVersion: state.quotePdfVersion || 'v2',
    quoteLanguage: normalizeQuoteV2Language(getCurrentLanguage?.() || 'ar'),
    context: 'project',
    reservation: null,
    customer: projectData.customer,
    project: resolvedProject,
    technicians: projectData.crew || [],
    clientInfo: projectData.clientInfo,
    projectInfo: projectData.projectInfo,
    projectCrew: projectData.crew,
    projectExpenses: projectData.expenses,
    projectEquipment: projectData.equipment,
    // Unified lists that match reservation PDF rendering
    equipmentItems: projectData.equipmentItems || [],
    crewAssignments: projectData.crewAssignments || [],
    totals: projectData.totals,
    projectTotals: projectData.projectTotals,
    totalsDisplay: projectData.totalsDisplay,
    rentalDays: projectData.projectDurationDays,
    currencyLabel: projectData.currencyLabel,
    sections: new Set(getQuoteSectionDefs('project').filter((section) => section.defaultSelected).map((section) => section.id)),
    sectionExpansions: buildDefaultSectionExpansions('project'),
    fields: buildDefaultFieldSelections('project'),
    terms: baseTerms,
    termsEdited: false,
    quoteSequence: sequence,
    quoteNumber,
    quoteDate: now,
    quoteDateLabel: formatQuoteDate(now),
    sequenceCommitted: false,
    paymentSummary: projectData.paymentSummary,
    projectNotes: projectData.notes,
    paymentHistory: projectData.paymentHistory
  };
  applyQuoteTogglePreferences(state.activeQuoteState);
  openQuoteModal();
  try { attachQuoteLiveListeners(); } catch (_) {}
}

registerQuotePdfCallbacks({
  showQuotePreviewStatus,
  hideQuotePreviewStatus,
  notifyQuoteAssetFailure,
  exportQuoteAsPdf,
  renderChecklistLessorFilters,
  applyPreviewZoom,
});
