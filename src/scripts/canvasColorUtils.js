const COLOR_FUNCTION_REGEX = /color\([^)]*\)/gi;
const COLOR_MIX_REGEX = /color-mix\([^)]*\)/gi;
const OKLAB_REGEX = /oklab\([^)]*\)/gi;
const OKLCH_REGEX = /oklch\([^)]*\)/gi;
const MODERN_COLOR_REGEX = /(color\(|color-mix\(|oklab|oklch)/i;
const COLOR_PROPERTIES = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'outlineColor',
  'fill',
  'stroke'
];

const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
const ctx = canvas?.getContext?.('2d') || null;

function getHyphenatedProperty(prop) {
  return prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function normalizeColorValue(rawValue, fallback = '#000') {
  if (!ctx || !rawValue) return fallback;
  try {
    ctx.fillStyle = '#000';
    ctx.fillStyle = rawValue;
    return ctx.fillStyle || fallback;
  } catch (error) {
    return fallback;
  }
}

export function patchHtml2CanvasColorParsing() {
  const html2canvas = window.html2canvas;
  if (!html2canvas?.Color || html2canvas.Color.__artRatioPatched) return;

  const originalFromString = html2canvas.Color.fromString.bind(html2canvas.Color);

  html2canvas.Color.fromString = (value) => {
    try {
      return originalFromString(value);
    } catch (error) {
      if (typeof value === 'string' && MODERN_COLOR_REGEX.test(value)) {
        const fallback = normalizeColorValue(value) || '#000';
        try {
          return originalFromString(fallback);
        } catch (secondaryError) {
          return originalFromString('#000');
        }
      }
      throw error;
    }
  };

  html2canvas.Color.__artRatioPatched = true;
}

function recordMutation(mutations, element, prop) {
  if (!mutations || !element?.style) return;
  const existingValue = element.style.getPropertyValue(prop);
  const existingPriority = element.style.getPropertyPriority(prop);
  mutations.push({
    element,
    prop,
    value: existingValue,
    priority: existingPriority
  });
}

export function revertStyleMutations(mutations = []) {
  if (!Array.isArray(mutations) || !mutations.length) return;
  for (let i = mutations.length - 1; i >= 0; i -= 1) {
    const { element, prop, value, priority } = mutations[i] || {};
    if (!element?.style || !prop) continue;
    if (value && value.length > 0) {
      element.style.setProperty(prop, value, priority || '');
    } else {
      element.style.removeProperty(prop);
    }
  }
}

export function sanitizeComputedColorFunctions(root, view = window, mutations = []) {
  if (!root || !view || typeof view.getComputedStyle !== 'function') return;

  const elements = root.querySelectorAll?.('*');
  if (!elements) return;

  elements.forEach((element) => {
    const computed = view.getComputedStyle(element);
    if (!computed) return;

    COLOR_PROPERTIES.forEach((prop) => {
      const value = computed[prop];
      if (value && MODERN_COLOR_REGEX.test(value)) {
        const hyphenProp = getHyphenatedProperty(prop);
        recordMutation(mutations, element, hyphenProp);
        const defaultFallback = prop === 'backgroundColor' ? '#ffffff' : computed.color || '#000000';
        const fallback = normalizeColorValue(value, defaultFallback);
        element.style.setProperty(hyphenProp, fallback, 'important');
      }
    });

    const backgroundImage = computed.backgroundImage;
    if (backgroundImage && MODERN_COLOR_REGEX.test(backgroundImage)) {
      const fallbackBackground = normalizeColorValue(computed.backgroundColor || '#ffffff', '#ffffff');
      recordMutation(mutations, element, 'background-image');
      recordMutation(mutations, element, 'background-color');
      element.style.setProperty('background-image', 'none', 'important');
      element.style.setProperty('background-color', fallbackBackground, 'important');
    }
  });
}

export function enforceLegacyColorFallback(root, view = window, mutations = []) {
  if (!root || !view || typeof view.getComputedStyle !== 'function') return;

  const elements = root.querySelectorAll?.('*');
  if (!elements) return;

  elements.forEach((element) => {
    const computed = view.getComputedStyle(element);
    if (!computed) return;

    ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'].forEach((prop) => {
      const value = computed[prop];
      if (value && MODERN_COLOR_REGEX.test(value)) {
        const hyphenProp = getHyphenatedProperty(prop);
        recordMutation(mutations, element, hyphenProp);
        const fallback = prop === 'backgroundColor' ? '#ffffff' : '#000000';
        element.style.setProperty(hyphenProp, fallback, 'important');
      }
    });

    const bgImage = computed.backgroundImage;
    if (bgImage && MODERN_COLOR_REGEX.test(bgImage)) {
      recordMutation(mutations, element, 'background-image');
      recordMutation(mutations, element, 'background-color');
      element.style.setProperty('background-image', 'none', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
    }
  });
}

export function scrubUnsupportedColorFunctions(root) {
  if (!root) return;

  const replaceModernFunctions = (value = '') => {
    if (typeof value !== 'string') return value;
    let out = value;
    if (MODERN_COLOR_REGEX.test(out)) {
      out = out
        .replace(COLOR_FUNCTION_REGEX, '#000')
        .replace(COLOR_MIX_REGEX, '#000')
        .replace(OKLAB_REGEX, '#000')
        .replace(OKLCH_REGEX, '#000');
    }
    return out;
  };

  root.querySelectorAll?.('style')?.forEach?.((styleNode) => {
    const text = styleNode.textContent;
    if (typeof text === 'string' && MODERN_COLOR_REGEX.test(text)) {
      styleNode.textContent = replaceModernFunctions(text);
    }
  });

  root.querySelectorAll?.('[style]')?.forEach?.((element) => {
    const styleAttr = element.getAttribute('style');
    if (typeof styleAttr === 'string' && MODERN_COLOR_REGEX.test(styleAttr)) {
      element.setAttribute('style', replaceModernFunctions(styleAttr));
    }
  });
}

export { MODERN_COLOR_REGEX };

// Inject a scoped style that disables pseudo-element backgrounds/gradients during export.
export function injectExportSanitizer(root) {
  if (!root || !root.ownerDocument) return null;
  const doc = root.ownerDocument;
  const id = `export-sanitize-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  root.setAttribute('data-export-root', id);
  const style = doc.createElement('style');
  style.setAttribute('data-export-style', id);
  style.textContent = `
    [data-export-root="${id}"] *,
    [data-export-root="${id}"] *::before,
    [data-export-root="${id}"] *::after {
      background-image: none !important;
    }
  `;
  doc.head.appendChild(style);
  return { id, style };
}

export function removeExportSanitizer(root, handle) {
  if (!handle || !root) return;
  try {
    root.removeAttribute('data-export-root');
    handle.style?.parentNode?.removeChild?.(handle.style);
  } catch (_) {}
}
