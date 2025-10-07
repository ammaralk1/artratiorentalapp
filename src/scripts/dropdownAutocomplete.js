import { t } from './language.js';

const registry = new Map();
let selectValueDescriptor = null;
let globalObserver = null;

function getNativeValueDescriptor() {
  if (!selectValueDescriptor) {
    selectValueDescriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  }
  return selectValueDescriptor;
}

function normalizeLabel(label) {
  return String(label || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function determinePlaceholder(select, options) {
  if (!select) return '';
  const direct = select.getAttribute('placeholder')
    || select.dataset.placeholder
    || select.dataset.dropdownPlaceholder;
  if (direct) return direct;

  const key = select.dataset.placeholderKey
    || select.dataset.i18nPlaceholderKey
    || select.dataset.i18nPlaceholder;
  if (key) {
    return t(key, direct || '');
  }

  const placeholderOption = options.find((option) => option.value === '' && (option.disabled || option.hidden));
  if (placeholderOption) {
    return placeholderOption.label;
  }

  return '';
}

function buildOptionCache(entry) {
  const { select } = entry;
  const options = Array.from(select.options).map((option) => ({
    value: option.value,
    label: option.textContent.trim(),
    disabled: option.disabled,
    hidden: option.hidden,
    element: option,
    normalized: normalizeLabel(option.textContent),
  }));

  entry.options = options;
  entry.placeholder = determinePlaceholder(select, options);
  entry.list.innerHTML = options
    .filter((option) => option.label && !option.disabled)
    .map((option) => `<option value="${escapeHtml(option.label)}"></option>`)
    .join('');
}

function syncDisabledState(entry) {
  const disabled = entry.select.disabled;
  entry.input.disabled = disabled;
}

function syncRequiredState(entry) {
  if (entry.select.required) {
    entry.input.required = true;
    entry.select.required = false;
  }
}

function syncFromSelect(entry) {
  const { select, input, options } = entry;
  const currentValue = select.value;
  let match = options.find((option) => option.value === currentValue && !option.disabled);
  if (!match) {
    match = options.find((option) => option.value === currentValue);
  }
  if (match) {
    input.value = match.label;
    input.dataset.autocompleteSelected = match.value;
  } else {
    input.value = '';
    input.dataset.autocompleteSelected = '';
  }
  input.placeholder = entry.placeholder || '';
}

function emitChange(select) {
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

function commitSelection(entry, allowPartial = false) {
  const { select, input, options } = entry;
  const rawValue = input.value.trim();
  if (!rawValue) {
    const descriptor = getNativeValueDescriptor();
    descriptor.set.call(select, '');
    syncFromSelect(entry);
    emitChange(select);
    return;
  }

  const normalized = normalizeLabel(rawValue);
  let matches = options.filter((option) => option.normalized === normalized && !option.disabled);
  if (matches.length === 0 && allowPartial) {
    matches = options.filter((option) => option.normalized.includes(normalized) && !option.disabled);
  }

  if (matches.length === 1) {
    const descriptor = getNativeValueDescriptor();
    descriptor.set.call(select, matches[0].value);
    syncFromSelect(entry);
    emitChange(select);
    return;
  }

  const exactTextMatch = options.filter((option) => option.label === rawValue && !option.disabled);
  if (exactTextMatch.length === 1) {
    const descriptor = getNativeValueDescriptor();
    descriptor.set.call(select, exactTextMatch[0].value);
    syncFromSelect(entry);
    emitChange(select);
    return;
  }

  // If multiple or no matches found, keep the input text but clear selection.
  const descriptor = getNativeValueDescriptor();
  descriptor.set.call(select, '');
  syncFromSelect(entry);
  emitChange(select);
}

function handleInputEvent(entry) {
  const { select, input, options } = entry;
  const rawValue = input.value.trim();
  if (!rawValue) {
    const descriptor = getNativeValueDescriptor();
    descriptor.set.call(select, '');
    syncFromSelect(entry);
    emitChange(select);
    return;
  }

  const normalized = normalizeLabel(rawValue);
  const match = options.find((option) => option.normalized === normalized && !option.disabled);
  if (match) {
    const descriptor = getNativeValueDescriptor();
    const previous = descriptor.get.call(select);
    if (previous !== match.value) {
      descriptor.set.call(select, match.value);
      syncFromSelect(entry);
      emitChange(select);
    } else {
      syncFromSelect(entry);
    }
  }
}

function overrideValueProperty(entry) {
  const { select } = entry;
  if (select.dataset.autocompleteValuePatched === 'true') {
    return;
  }
  const descriptor = getNativeValueDescriptor();
  Object.defineProperty(select, 'value', {
    configurable: true,
    enumerable: descriptor.enumerable,
    get() {
      return descriptor.get.call(this);
    },
    set(value) {
      const previous = descriptor.get.call(this);
      descriptor.set.call(this, value);
      const currentEntry = registry.get(this);
      if (currentEntry) {
        syncFromSelect(currentEntry);
      }
      return value;
    }
  });
  select.dataset.autocompleteValuePatched = 'true';
}

function applyClasses(select, wrapper, input) {
  const classNames = Array.from(select.classList);
  classNames.forEach((className) => {
    if (className === 'form-select') {
      input.classList.add('form-control');
    } else {
      wrapper.classList.add(className);
      input.classList.add(className);
    }
  });
  input.classList.add('dropdown-autocomplete__input');
  wrapper.classList.add('dropdown-autocomplete');
}

function updateLabelTarget(select, input) {
  if (!select.id) return;
  const label = select.ownerDocument.querySelector(`label[for="${select.id}"]`);
  if (!label) return;
  if (!label.dataset.originalFor) {
    label.dataset.originalFor = select.id;
  }
  label.setAttribute('for', input.id);
}

function enhanceSelect(select) {
  if (!select || registry.has(select) || select.dataset.autocomplete === 'false') {
    return null;
  }

  const doc = select.ownerDocument || document;
  const wrapper = doc.createElement('div');
  const input = doc.createElement('input');
  const list = doc.createElement('datalist');

  const inputIdBase = select.id ? `${select.id}-input` : 'dropdown-autocomplete-input';
  let inputId = inputIdBase;
  let increment = 1;
  while (doc.getElementById(inputId)) {
    inputId = `${inputIdBase}-${increment++}`;
  }
  input.id = inputId;
  input.type = 'text';
  input.autocomplete = 'off';

  let listId = select.id ? `${select.id}-options` : 'dropdown-options';
  increment = 1;
  while (doc.getElementById(listId)) {
    listId = `${listId}-${increment++}`;
  }
  list.id = listId;
  input.setAttribute('list', list.id);

  applyClasses(select, wrapper, input);

  const parent = select.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, select);
  }
  wrapper.appendChild(input);
  wrapper.appendChild(list);
  wrapper.appendChild(select);

  select.classList.add('dropdown-autocomplete__select');
  select.setAttribute('tabindex', '-1');
  select.setAttribute('aria-hidden', 'true');
  select.style.position = 'absolute';
  select.style.opacity = '0';
  select.style.pointerEvents = 'none';
  select.style.width = '0';
  select.style.height = '0';

  if (select.name) {
    input.setAttribute('data-dropdown-name', select.name);
  }

  syncRequiredState({ select, input });
  syncDisabledState({ select, input });

  const entry = {
    select,
    input,
    list,
    options: [],
    placeholder: '',
    observer: null,
  };

  buildOptionCache(entry);
  syncFromSelect(entry);
  overrideValueProperty(entry);
  updateLabelTarget(select, input);

  const onInput = () => handleInputEvent(entry);
  const onBlur = () => commitSelection(entry, true);
  const onChange = () => commitSelection(entry, true);

  input.addEventListener('input', onInput);
  input.addEventListener('change', onChange);
  input.addEventListener('blur', onBlur);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitSelection(entry, true);
    }
  });

  select.addEventListener('change', () => {
    const currentEntry = registry.get(select);
    if (currentEntry) {
      buildOptionCache(currentEntry);
      syncFromSelect(currentEntry);
    }
  });

  entry.observer = new MutationObserver((mutations) => {
    let shouldRefresh = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        shouldRefresh = true;
      }
      if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
        syncDisabledState(entry);
      }
    });
    if (shouldRefresh) {
      buildOptionCache(entry);
      syncFromSelect(entry);
    }
  });

  entry.observer.observe(select, {
    childList: true,
    subtree: false,
    attributes: true,
    attributeFilter: ['disabled']
  });

  registry.set(select, entry);
  return entry;
}

function refreshEntry(entry) {
  if (!entry) return;
  buildOptionCache(entry);
  syncFromSelect(entry);
  syncDisabledState(entry);
}

function refreshAll() {
  registry.forEach((entry) => {
    buildOptionCache(entry);
    syncFromSelect(entry);
  });
}

function ensureObserver() {
  if (globalObserver || typeof document === 'undefined') return;
  globalObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches && node.matches('select.form-select')) {
          initDropdownAutocomplete({ root: node, selector: null });
        }
        node.querySelectorAll?.('select.form-select').forEach((select) => {
          initDropdownAutocomplete({ root: select, selector: null });
        });
      });
    });
  });
  globalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

export function initDropdownAutocomplete({ root = document, selector = 'select.form-select' } = {}) {
  const scope = root instanceof Document ? root : root.ownerDocument || document;
  const base = root instanceof Element || root instanceof Document ? root : scope;
  const selects = selector ? base.querySelectorAll(selector) : [root].filter((node) => node instanceof HTMLSelectElement);
  selects.forEach((select) => enhanceSelect(select));
  ensureObserver();
}

export function refreshDropdownOptions(select) {
  const entry = registry.get(select);
  if (!entry) return;
  refreshEntry(entry);
}

document.addEventListener('language:changed', refreshAll);
document.addEventListener('language:translationsReady', refreshAll);

document.addEventListener('theme:changed', () => {
  registry.forEach((entry) => {
    syncFromSelect(entry);
  });
});
