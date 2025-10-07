import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

import { t } from './language.js';

const registry = new Map();
let autoEnhanceObserver = null;
let selectValueDescriptor = null;

function getNativeValueDescriptor() {
  if (selectValueDescriptor) return selectValueDescriptor;
  selectValueDescriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  if (!selectValueDescriptor) {
    throw new Error('Unable to lookup native HTMLSelectElement value descriptor');
  }
  return selectValueDescriptor;
}

function isDarkMode() {
  const root = document.documentElement;
  const body = document.body;
  return root.classList.contains('dark')
    || root.classList.contains('dark-mode')
    || body?.classList.contains('dark-mode')
    || body?.classList.contains('dark');
}

function derivePlaceholder(select) {
  const placeholderAttr = select.getAttribute('placeholder');
  if (placeholderAttr) {
    return placeholderAttr;
  }

  const datasetPlaceholder = select.dataset.placeholder || select.dataset.dropdownPlaceholder;
  if (datasetPlaceholder) {
    return datasetPlaceholder;
  }

  const placeholderKey = select.dataset.placeholderKey || select.dataset.i18nPlaceholderKey;
  if (placeholderKey) {
    return t(placeholderKey, select.dataset.placeholderFallback || '');
  }

  const placeholderOption = Array.from(select.options).find((option) => option.value === '' && (option.disabled || option.hidden));
  if (placeholderOption) {
    return placeholderOption.textContent.trim();
  }

  return '';
}

function applyThemeClass(container) {
  if (!container) return;
  container.classList.remove('choices--form-light', 'choices--form-dark');
  container.classList.add(isDarkMode() ? 'choices--form-dark' : 'choices--form-light');
}

function collectOptionData(select) {
  return Array.from(select.options).map((option) => ({
    value: option.value,
    label: option.textContent,
    selected: option.selected,
    disabled: option.disabled,
    dataset: { ...option.dataset }
  }));
}

function applyOptionDataset(optionElement, dataset) {
  const existingKeys = Object.keys(optionElement.dataset);
  existingKeys.forEach((key) => {
    if (!(key in dataset)) {
      delete optionElement.dataset[key];
    }
  });
  Object.entries(dataset).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      delete optionElement.dataset[key];
    } else {
      optionElement.dataset[key] = value;
    }
  });
}

function refreshChoicesFromSelect(select, entry, { preserveValue = true } = {}) {
  const { instance } = entry;
  const optionSnapshot = collectOptionData(select);
  const previousValue = preserveValue ? instance.getValue(true) : null;

  entry.syncingOptions = true;
  instance.clearChoices();
  instance.setChoices(
    optionSnapshot.map((item) => ({
      value: item.value,
      label: item.label,
      selected: item.selected,
      disabled: item.disabled
    })),
    'value',
    'label',
    true
  );

  const refreshedOptions = Array.from(select.options);
  refreshedOptions.forEach((optionElement, index) => {
    const snapshot = optionSnapshot[index];
    if (!snapshot) return;
    applyOptionDataset(optionElement, snapshot.dataset);
  });

  if (preserveValue && previousValue != null) {
    const valueArray = Array.isArray(previousValue) ? previousValue : [previousValue];
    if (valueArray.length === 0 || valueArray[0] === undefined || valueArray[0] === null || valueArray[0] === '') {
      instance.removeActiveItems();
    } else {
      const normalized = valueArray.map((value) => (value === undefined || value === null ? '' : String(value)));
      instance.setChoiceByValue(normalized);
    }
  }

  requestAnimationFrame(() => {
    entry.syncingOptions = false;
    applyThemeClass(entry.container);
    entry.container.classList.add('choices--ready');
    select.dataset.dropdownState = 'ready';
  });
}

function bindValueSync(select, entry) {
  const { instance } = entry;
  const nativeDescriptor = getNativeValueDescriptor();
  const originalGet = nativeDescriptor.get?.bind(select);
  const originalSet = nativeDescriptor.set?.bind(select);

  if (!originalGet || !originalSet) {
    return;
  }

  Object.defineProperty(select, 'value', {
    configurable: true,
    enumerable: nativeDescriptor.enumerable,
    get() {
      return originalGet();
    },
    set(value) {
      if (!entry.syncingValue) {
        entry.syncingValue = true;
        originalSet(String(value ?? ''));
        const normalized = value ?? '';
        if (normalized === '') {
          instance.removeActiveItems();
        } else {
          instance.setChoiceByValue(String(normalized));
        }
        requestAnimationFrame(() => {
          entry.syncingValue = false;
        });
        return value;
      }
      return originalSet(String(value ?? ''));
    }
  });
}

function createObserver(select, entry) {
  const observer = new MutationObserver((mutationsList) => {
    if (entry.syncingOptions) return;
    const shouldRefresh = mutationsList.some((mutation) => {
      if (mutation.type === 'childList') return true;
      if (mutation.type === 'attributes') return ['disabled', 'hidden'].includes(mutation.attributeName || '');
      return false;
    });
    if (shouldRefresh) {
      refreshChoicesFromSelect(select, entry, { preserveValue: true });
    }
  });

  observer.observe(select, {
    childList: true,
    subtree: false,
    attributes: true,
    attributeFilter: ['disabled', 'hidden']
  });

  return observer;
}

function enhanceSelect(select, options = {}) {
  if (!select || registry.has(select)) return registry.get(select) || null;
  if (select.classList.contains('reservation-choice')) return null;
  if (select.dataset.dropdownEnhance === 'false') return null;

  const placeholder = options.placeholder ?? derivePlaceholder(select);
  const searchEnabled = options.searchEnabled ?? true;

  select.dataset.dropdownState = 'hydrating';
  let instance;
  try {
    instance = new Choices(select, {
      allowHTML: false,
      shouldSort: false,
      searchEnabled,
      searchChoices: searchEnabled,
      searchFloor: 0,
      searchResultLimit: 15,
      itemSelectText: '',
      placeholder: Boolean(placeholder),
      placeholderValue: placeholder,
      searchPlaceholderValue: placeholder,
      removeItemButton: false
    });
  } catch (error) {
    console.error('Failed to enhance dropdown', error);
    select.dataset.dropdownState = 'native';
    return null;
  }

  const container = instance?.containerOuter?.element;
  if (!container) {
    return null;
  }

  container.classList.add('choices--form');
  container.classList.remove('choices--ready');
  applyThemeClass(container);

  const entry = {
    select,
    instance,
    container,
    observer: null,
    syncingOptions: false,
    syncingValue: false
  };

  bindValueSync(select, entry);
  refreshChoicesFromSelect(select, entry, { preserveValue: true });

  entry.observer = createObserver(select, entry);
  registry.set(select, entry);
  return entry;
}

function ensureAutoEnhance() {
  if (autoEnhanceObserver || !document.body) return;
  autoEnhanceObserver = new MutationObserver((mutationsList) => {
    const candidates = [];
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches?.('select.form-select')) {
          candidates.push(node);
        }
        if (node.querySelectorAll) {
          const nested = node.querySelectorAll('select.form-select');
          candidates.push(...nested);
        }
      });
    });
    if (candidates.length) {
      candidates.forEach((select) => {
        enhanceSelect(select);
      });
    }
  });

  autoEnhanceObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

export function initDropdowns({ root = document } = {}) {
  const rootElement = root instanceof Document ? root : root;
  const selects = rootElement.querySelectorAll?.('select.form-select');
  selects?.forEach((select) => {
    enhanceSelect(select);
  });
  ensureAutoEnhance();
}

export function getDropdownInstance(selectOrId) {
  if (!selectOrId) return null;
  const select = typeof selectOrId === 'string'
    ? document.getElementById(selectOrId)
    : selectOrId;
  if (!select) return null;
  const entry = registry.get(select);
  return entry?.instance ?? null;
}

export function updateDropdownOptions(selectOrId) {
  const select = typeof selectOrId === 'string'
    ? document.getElementById(selectOrId)
    : selectOrId;
  if (!select) return;
  const entry = registry.get(select);
  if (!entry) return;
  refreshChoicesFromSelect(select, entry, { preserveValue: true });
}

export function setDropdownValue(selectOrId, value) {
  const select = typeof selectOrId === 'string'
    ? document.getElementById(selectOrId)
    : selectOrId;
  if (!select) return;
  const entry = registry.get(select);
  if (!entry) {
    select.value = value;
    return;
  }
  entry.syncingValue = true;
  const normalizedValue = value ?? '';
  select.value = normalizedValue;
  if (normalizedValue === '') {
    entry.instance.removeActiveItems();
  } else {
    entry.instance.setChoiceByValue(String(normalizedValue));
  }
  requestAnimationFrame(() => {
    entry.syncingValue = false;
  });
}

document.addEventListener('theme:changed', () => {
  registry.forEach(({ container }) => {
    applyThemeClass(container);
  });
});

document.addEventListener('language:changed', () => {
  registry.forEach((entry, select) => {
    refreshChoicesFromSelect(select, entry, { preserveValue: true });
  });
});

export function destroyDropdowns() {
  autoEnhanceObserver?.disconnect();
  autoEnhanceObserver = null;
  registry.forEach((entry, select) => {
    entry.observer?.disconnect();
    entry.instance?.destroy();
    select.dataset.dropdownState = 'native';
    registry.delete(select);
  });
}
