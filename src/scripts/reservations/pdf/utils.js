import { state } from './state.js';
import { t } from '../../language.js';
import { scrubUnsupportedColorFunctions, sanitizeComputedColorFunctions } from '../../canvasColorUtils.js';
import {
  SVG_DATA_URI_REGEX,
  SVG_EXTENSION_REGEX,
  SVG_FALLBACK_DIMENSION,
  SAFARI_USER_AGENT_REGEX,
  IOS_PLATFORM_REGEX,
  IOS_SAFARI_REGEX,
  IOS_SAFARI_EXCLUDED_BROWSERS_REGEX,
  PDF_LOG_PREFIX,
  ARABIC_RTL_REGEX,
} from './constants.js';

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Normalize display names to improve matching (Arabic/English, diacritics, whitespace)
export function normalizePackageNameForMatch(value) {
  try {
    const str = String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      // Remove Arabic diacritics and general marks
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();
    return str;
  } catch (_) {
    return String(value || '').trim().toLowerCase();
  }
}

export function withBlockAttributes(markup, { blockType = 'section', extraAttributes = '' } = {}) {
  if (!markup) return '';
  const extra = extraAttributes ? ` ${extraAttributes.trim()}` : '';
  return markup.replace(/^(<\w+)/, `$1 data-quote-block data-block-type="${blockType}"${extra}`);
}

export function buildPlaceholderBlock(messageKey, fallback = 'لا توجد بيانات للعرض.') {
  const message = escapeHtml(t(messageKey, fallback));
  return withBlockAttributes(
    `<section class="quote-section quote-placeholder">${message}</section>`,
    { blockType: 'placeholder' }
  );
}

export function ensureBlocks(blocks, placeholderKey) {
  return Array.isArray(blocks) && blocks.length
    ? blocks
    : [buildPlaceholderBlock(placeholderKey)];
}

export function isProbablyArabic(value = '') {
  return ARABIC_RTL_REGEX.test(value);
}

export function patchCanvasTextDirection() {
  const C2DProto = window.CanvasRenderingContext2D?.prototype;
  if (!C2DProto || C2DProto.__artRatioDirectionPatched) return;

  const patchMethod = (methodName) => {
    const original = C2DProto[methodName];
    if (typeof original !== 'function') return;

    C2DProto[methodName] = function patchedCanvasTextMethod(text, ...args) {
      if (typeof text !== 'string' || !isProbablyArabic(text)) {
        return original.call(this, text, ...args);
      }

      let originalDirection;
      let directionSupported = false;

      try {
        if ('direction' in this) {
          originalDirection = this.direction;
          if (originalDirection !== 'rtl') {
            this.direction = 'rtl';
          }
          directionSupported = true;
        }
      } catch (error) {
        // Ignore failures when the property is read-only or unsupported.
      }

      try {
        if (!directionSupported) {
          const canvasElement = this.canvas;
          if (canvasElement && canvasElement.style?.direction !== 'rtl') {
            canvasElement.__artRatioOriginalDirection = canvasElement.style.direction;
            canvasElement.style.direction = 'rtl';
          }
        }
        return original.call(this, text, ...args);
      } finally {
        if (directionSupported && originalDirection !== undefined && originalDirection !== 'rtl') {
          try {
            this.direction = originalDirection;
          } catch (restoreError) {
            // Ignore restore failures
          }
        } else if (!directionSupported) {
          const canvasElement = this.canvas;
          if (canvasElement && canvasElement.__artRatioOriginalDirection !== undefined) {
            canvasElement.style.direction = canvasElement.__artRatioOriginalDirection;
            delete canvasElement.__artRatioOriginalDirection;
          }
        }
      }
    };
  };

  patchMethod('fillText');
  patchMethod('strokeText');

  C2DProto.__artRatioDirectionPatched = true;
}

export function scrubCloneColors(doc) {
  if (!doc) return;
  scrubUnsupportedColorFunctions(doc);
  scrubUnsupportedColorFunctions(doc?.documentElement);
  scrubUnsupportedColorFunctions(doc?.body);
  const view = doc?.defaultView || window;
  sanitizeComputedColorFunctions(doc?.documentElement || doc, view);
}

export function parseSvgDimension(value, fallback = SVG_FALLBACK_DIMENSION) {
  if (typeof value !== 'string' && typeof value !== 'number') return fallback;
  const numeric = parseFloat(String(value).replace(/[^0-9.+-]/g, ''));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback;
}

export function resolveSvgElementDimensions(svgElement) {
  if (!svgElement) {
    return { width: SVG_FALLBACK_DIMENSION, height: SVG_FALLBACK_DIMENSION };
  }

  const widthAttr = svgElement.getAttribute?.('width');
  const heightAttr = svgElement.getAttribute?.('height');
  let width = widthAttr ? parseSvgDimension(widthAttr, 0) : 0;
  let height = heightAttr ? parseSvgDimension(heightAttr, 0) : 0;

  if (width > 0 && height > 0) {
    return { width, height };
  }

  const viewBox = svgElement.getAttribute?.('viewBox');
  if (viewBox) {
    const parts = viewBox.trim().split(/[\s,]+/).map((part) => parseFloat(part || '0'));
    if (parts.length >= 4) {
      const [, , vbWidth, vbHeight] = parts;
      width = width || (Number.isFinite(vbWidth) && vbWidth > 0 ? vbWidth : 0);
      height = height || (Number.isFinite(vbHeight) && vbHeight > 0 ? vbHeight : 0);
    }
  }

  return {
    width: width || SVG_FALLBACK_DIMENSION,
    height: height || SVG_FALLBACK_DIMENSION
  };
}

export function isSvgImageSource(src = '') {
  if (typeof src !== 'string') return false;
  return SVG_DATA_URI_REGEX.test(src) || SVG_EXTENSION_REGEX.test(src);
}

export function isMobileViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

export function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.platform || '';
  return IOS_PLATFORM_REGEX.test(ua);
}

export function isSafariBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isSafari = SAFARI_USER_AGENT_REGEX.test(ua);
  const isChrome = ua.includes('Chrome') || ua.includes('CriOS') || ua.includes('Chromium');
  const isEdge = ua.includes('Edg');
  return isSafari && !isChrome && !isEdge;
}

export function isIosSafari() {
  return isIosDevice() && isSafariBrowser();
}

export function isMobileSafariBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const maxTouchPoints = Number.isFinite(navigator.maxTouchPoints) ? navigator.maxTouchPoints : 0;
  const isIosPlatform = IOS_SAFARI_REGEX.test(ua) || IOS_SAFARI_REGEX.test(platform);
  const isTouchMac = /Macintosh/i.test(ua) && maxTouchPoints > 1;
  const isSafariUa = SAFARI_USER_AGENT_REGEX.test(ua) && !IOS_SAFARI_EXCLUDED_BROWSERS_REGEX.test(ua);
  return isSafariUa && (isIosPlatform || isTouchMac);
}

export function logPdfDebug(message, ...args) {
  try {
    console.log(`${PDF_LOG_PREFIX} ${message}`, ...args);
  } catch (error) {
    // Ignore logging failures
  }
}

export function logPdfWarn(message, ...args) {
  try {
    console.warn(`${PDF_LOG_PREFIX} ${message}`, ...args);
  } catch (error) {
    // Ignore logging failures
  }
}

export function logPdfError(message, error, ...args) {
  try {
    if (error) {
      console.error(`${PDF_LOG_PREFIX} ${message}`, error, ...args);
    } else {
      console.error(`${PDF_LOG_PREFIX} ${message}`, ...args);
    }
  } catch (loggingError) {
    // Ignore logging failures
  }
}
