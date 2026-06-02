const PICKER_SELECTOR = "input[type='datetime-local']:not([data-no-enhance])";
const PICKER_SCRIPT_SELECTOR = 'script[data-flatpickr-loader="true"]';
const PICKER_STYLE_SELECTOR = 'link[data-flatpickr-loader="true"]';
const PICKER_AR_LOCALE_SELECTOR = 'script[data-flatpickr-ar-loader="true"]';

let globalObserver = null;
let loadPromise = null;

function getCurrentLanguage() {
  try {
    const lang = document.documentElement.lang || 'ar';
    return String(lang).toLowerCase();
  } catch {
    return 'ar';
  }
}

function ensureFlatpickrAssets() {
  if (typeof window !== 'undefined' && typeof window.flatpickr === 'function') {
    const lang = getCurrentLanguage();
    if (!lang.startsWith('ar') || window.flatpickr?.l10ns?.ar) {
      return Promise.resolve(window.flatpickr);
    }
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const finalize = () => {
      const lang = getCurrentLanguage();
      if (!lang.startsWith('ar')) {
        resolve(window.flatpickr);
        return;
      }

      if (window.flatpickr?.l10ns?.ar) {
        resolve(window.flatpickr);
        return;
      }

      const existingLocaleScript = document.querySelector(PICKER_AR_LOCALE_SELECTOR);
      if (existingLocaleScript) {
        existingLocaleScript.addEventListener('load', () => resolve(window.flatpickr), { once: true });
        existingLocaleScript.addEventListener('error', () => resolve(window.flatpickr), { once: true });
        return;
      }

      const localeScript = document.createElement('script');
      localeScript.src = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ar.js';
      localeScript.async = true;
      localeScript.dataset.flatpickrArLoader = 'true';
      localeScript.onload = () => resolve(window.flatpickr);
      localeScript.onerror = () => resolve(window.flatpickr);
      document.head.appendChild(localeScript);
    };

    const existingStyle = document.querySelector(PICKER_STYLE_SELECTOR);
    if (!existingStyle) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
      link.dataset.flatpickrLoader = 'true';
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector(PICKER_SCRIPT_SELECTOR);
    if (existingScript) {
      existingScript.addEventListener('load', finalize, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
    script.async = true;
    script.dataset.flatpickrLoader = 'true';
    script.onload = finalize;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return loadPromise;
}

function pickerOptions() {
  const lang = getCurrentLanguage();
  const base = {
    enableTime: true,
    time_24hr: false,
    allowInput: true,
    clickOpens: true,
    disableMobile: true,
    appendTo: document.body,
    dateFormat: 'Y-m-d\\TH:i',
    altInput: true,
    altInputClass: 'flatpickr-alt-input ui-input form-control w-full',
    altFormat: 'd/m/Y h:i K',
  };

  if (lang.startsWith('ar') && window.flatpickr?.l10ns?.ar) {
    return { ...base, locale: 'ar' };
  }

  return base;
}

function normalizeInitialValue(input) {
  if (!(input instanceof HTMLInputElement)) return;
  const raw = String(input.value || '').trim();
  if (!raw) return;
  if (raw.includes('T')) return;
  input.value = raw.replace(' ', 'T').slice(0, 16);
}

function enhanceInput(input) {
  if (!(input instanceof HTMLInputElement)) return;
  if (input.dataset.dateTimeEnhanced === 'true') return;
  if (input._flatpickr) {
    input.dataset.dateTimeEnhanced = 'true';
    return;
  }

  normalizeInitialValue(input);

  const fp = window.flatpickr;
  if (typeof fp !== 'function') return;

  fp(input, pickerOptions());
  input.dataset.dateTimeEnhanced = 'true';

  const instance = input._flatpickr;
  const altInput = instance?.altInput;
  if (altInput instanceof HTMLInputElement) {
    altInput.setAttribute('dir', 'ltr');
    altInput.setAttribute('aria-haspopup', 'dialog');
  }
}

function scheduleEnhancement(node) {
  if (!node) return;
  ensureFlatpickrAssets()
    .then(() => {
      if (node.matches?.(PICKER_SELECTOR)) {
        enhanceInput(node);
      }
      node.querySelectorAll?.(PICKER_SELECTOR).forEach((input) => enhanceInput(input));
    })
    .catch(() => {
      // ignore loader errors and leave native control as fallback
    });
}

export function initDateTimePickers(root = document) {
  if (!root) return;

  scheduleEnhancement(root);

  if (!globalObserver && root === document) {
    globalObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes?.forEach((node) => {
          if (!(node instanceof Element)) return;
          scheduleEnhancement(node);
        });
      });
    });

    globalObserver.observe(document.body, { childList: true, subtree: true });
  }
}
