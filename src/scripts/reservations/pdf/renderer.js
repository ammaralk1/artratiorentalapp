import { state } from './state.js';
import {
  QUOTE_TROUBLESHOOT_URL,
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_WIDTH_PX,
  A4_HEIGHT_PX,
} from './constants.js';
import {
  logPdfWarn,
  logPdfError,
  isMobileViewport,
  isIosSafari,
  isMobileSafariBrowser,
} from './utils.js';
import {
  rasterizeQuoteImages,
  waitForQuoteAssets,
  ensureHtml2Canvas,
  ensureJsPdf,
} from './assets.js';
import { buildQuoteV2Html, isQuoteV2Context } from './v2/template.js';
import { getChecklistPreviewReservation } from './checklist.js';
import { callQuotePdfCallback, registerQuotePdfCallbacks } from './callbacks.js';
import { t } from '../../language.js';
import { showToast, showToastWithAction } from '../../utils.js';
import { escapeHtml } from './utils.js';
import {
  sanitizeComputedColorFunctions,
  enforceLegacyColorFallback,
  scrubUnsupportedColorFunctions,
} from '../../canvasColorUtils.js';

export function handlePdfError(error, context = 'export', { toastMessage, suppressToast = false } = {}) {
  logPdfError(`${context} failed`, error);
  const alreadyNotified = Boolean(error && error.__artRatioPdfNotified);
  if (!suppressToast && !alreadyNotified) {
    const defaultMessage = t('reservations.quote.errors.exportFailed', '⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى.');
    const message = toastMessage || defaultMessage;
    const guideLabel = t('reservations.quote.toast.viewGuide', '📘 عرض دليل الحل السريع');
    const retryLabel = t('reservations.quote.toast.retry', 'إعادة المحاولة');
    const canRetry = ['exportQuoteAsPdf', 'renderQuotePreview', 'layoutQuoteDocument', 'pageCapture'].includes(context);

    const retryHandler = () => {
      if (context === 'exportQuoteAsPdf') {
        callQuotePdfCallback('showQuotePreviewStatus', 'export');
        callQuotePdfCallback('exportQuoteAsPdf');
      } else {
        callQuotePdfCallback('showQuotePreviewStatus', 'render');
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

    if (state.quoteModalRefs?.modal?.classList.contains('show')) {
      callQuotePdfCallback('showQuotePreviewStatus', 'error', {
        message,
        actionLabel: canRetry ? retryLabel : undefined,
        onAction: canRetry ? retryHandler : undefined,
        showSpinner: false
      });
    }

    if (error && typeof error === 'object') {
      try {
        Object.defineProperty(error, '__artRatioPdfNotified', {
          value: true,
          writable: false,
          enumerable: false,
          configurable: true
        });
      } catch (defineError) {
        // Ignore decorate failure
      }
    }
  }
}

export function cleanupPdfArtifacts({ container, safariWindowRef, mobileWindowRef } = {}) {
  try {
    if (mobileWindowRef && !mobileWindowRef.closed) {
      mobileWindowRef.close();
    }
  } catch (error) {
    logPdfWarn('failed to close mobile window', error);
  }

  try {
    if (safariWindowRef && !safariWindowRef.closed) {
      safariWindowRef.close();
    }
  } catch (error) {
    logPdfWarn('failed to close safari window', error);
  }

  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

export async function renderQuotePagesAsPdf(root, { filename, safariWindowRef = null, mobileWindowRef = null }) {
  if (!root) return;
  const pages = Array.from(root.querySelectorAll('.quote-page'));
  if (!pages.length) {
    throw new Error('لا توجد صفحات لتصديرها.');
  }

  const [JsPdfConstructor, html2canvasFn] = await Promise.all([
    ensureJsPdf(),
    ensureHtml2Canvas()
  ]);

  const ownerDocument = root.ownerDocument || document;
  const styleDirection = ownerDocument?.defaultView?.getComputedStyle?.(root)?.direction;
  const directionHints = [
    root.getAttribute?.('dir'),
    root.style?.direction,
    styleDirection,
    ownerDocument?.documentElement?.getAttribute?.('dir')
  ];
  const isRtlDocument = directionHints.some((dir) => typeof dir === 'string' && dir.toLowerCase().startsWith('rtl'));

  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const mobileViewport = isMobileViewport();
  const safariMode = isIosSafari();
  const mobileSafari = isMobileSafariBrowser();

  let captureScale;
  if (mobileSafari) {
    captureScale = 1.5;
  } else if (safariMode) {
    captureScale = Math.min(1.7, Math.max(1.2, devicePixelRatio * 1.1));
  } else if (mobileViewport) {
    captureScale = Math.min(1.8, Math.max(1.25, devicePixelRatio * 1.2));
  } else {
    captureScale = Math.min(2.0, Math.max(1.6, devicePixelRatio * 1.4));
  }

  const pdf = new JsPdfConstructor({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
  const html2canvasBaseOptions = {
    scale: captureScale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    // html2canvas letter-level rendering breaks Arabic ligatures on iOS Safari; fall back to native shaping when RTL.
    letterRendering: !isRtlDocument,
    removeContainer: false,
    logging: true
  };

  let pdfPageIndex = 0;
  const browserLimitMessage = t('reservations.quote.errors.browserLimit', 'تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.');

  try {
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      const page = pages[pageIndex];
      await rasterizeQuoteImages(page);
      await waitForQuoteAssets(page);

      const doc = page.ownerDocument || document;
      const captureWrapper = doc.createElement('div');
      Object.assign(captureWrapper.style, {
        position: 'fixed',
        top: '0',
        left: '-12000px',
        pointerEvents: 'none',
        zIndex: '-1',
        backgroundColor: '#ffffff'
      });

      const pageClone = page.cloneNode(true);
      pageClone.style.width = `${A4_WIDTH_PX}px`;
      pageClone.style.maxWidth = `${A4_WIDTH_PX}px`;
      pageClone.style.minWidth = `${A4_WIDTH_PX}px`;
      pageClone.style.height = `${A4_HEIGHT_PX}px`;
      pageClone.style.maxHeight = `${A4_HEIGHT_PX}px`;
      pageClone.style.minHeight = `${A4_HEIGHT_PX}px`;
      pageClone.style.position = 'relative';
      pageClone.style.background = '#ffffff';
      const captureRoot = doc.createElement('div');
      const sourceAttributes = Array.from(root?.attributes || []);
      const rootId = (root?.id && typeof root.id === 'string' && root.id.trim().length)
        ? root.id
        : 'quote-pdf-v2-root';
      captureRoot.id = rootId;
      sourceAttributes.forEach((attr) => {
        if (!attr?.name || attr.name === 'id') return;
        captureRoot.setAttribute(attr.name, attr.value);
      });
      if (!captureRoot.hasAttribute('dir')) {
        const fallbackDir = root?.getAttribute('dir')
          || doc.documentElement?.getAttribute('dir')
          || 'rtl';
        captureRoot.setAttribute('dir', fallbackDir);
      }

      const sandboxIframe = doc.createElement('iframe');
      sandboxIframe.setAttribute('title', 'quote-pdf-capture');
      Object.assign(sandboxIframe.style, {
        position: 'absolute',
        width: `${A4_WIDTH_PX}px`,
        height: `${A4_HEIGHT_PX}px`,
        border: '0',
        top: '0',
        left: '0',
        opacity: '0',
        pointerEvents: 'none'
      });
      captureWrapper.appendChild(sandboxIframe);
      doc.body.appendChild(captureWrapper);

      const sandboxDoc = sandboxIframe.contentDocument || sandboxIframe.contentWindow?.document;
      sandboxDoc.open();
      sandboxDoc.write('<!DOCTYPE html><html><head></head><body></body></html>');
      sandboxDoc.close();
      sandboxDoc.documentElement.setAttribute('dir', captureRoot.getAttribute('dir') || 'rtl');
      const sandboxHead = sandboxDoc.head;
      const sandboxBody = sandboxDoc.body;

      // Clone style nodes to sandbox head
      Array.from(root.children || []).forEach((child) => {
        if (child && child.tagName === 'STYLE') {
          sandboxHead.appendChild(child.cloneNode(true));
        }
      });

      const captureDocument = sandboxDoc.createElement('div');
      captureDocument.className = 'quote-document';
      captureDocument.setAttribute('data-quote-document', '');
      const capturePages = sandboxDoc.createElement('div');
      capturePages.className = 'quote-preview-pages';
      capturePages.setAttribute('data-quote-pages', '');
      capturePages.appendChild(pageClone);

      captureDocument.appendChild(capturePages);
      captureRoot.appendChild(captureDocument);
      sandboxBody.appendChild(captureRoot);

      let canvas;
      try {
        await waitForQuoteAssets(captureRoot);
        const viewForCapture = sandboxDoc.defaultView || sandboxIframe.contentWindow || window;
        sanitizeComputedColorFunctions(captureRoot, viewForCapture);
        enforceLegacyColorFallback(captureRoot, viewForCapture);
        scrubUnsupportedColorFunctions(captureRoot);
        canvas = await html2canvasFn(captureRoot, {
          ...html2canvasBaseOptions,
          scale: captureScale,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0
        });
      } catch (captureError) {
        handlePdfError(captureError, 'pageCapture', { toastMessage: browserLimitMessage });
        throw captureError;
      } finally {
        captureWrapper.parentNode?.removeChild(captureWrapper);
      }

      if (!canvas) {
        continue;
      }

      const canvasWidth = canvas.width || 1;
      const canvasHeight = canvas.height || 1;
      const aspectRatio = canvasHeight / canvasWidth;
      let targetWidthMm = A4_WIDTH_MM;
      let targetHeightMm = targetWidthMm * aspectRatio;
      let horizontalOffsetMm = 0;

      if (targetHeightMm > A4_HEIGHT_MM) {
        const scaleFactor = A4_HEIGHT_MM / targetHeightMm;
        targetHeightMm = A4_HEIGHT_MM;
        targetWidthMm = targetWidthMm * scaleFactor;
        horizontalOffsetMm = Math.max(0, (A4_WIDTH_MM - targetWidthMm) / 2);
      }

      const imageFormat = 'PNG';
      const imageData = canvas.toDataURL('image/png');

      if (pdfPageIndex > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imageData,
        imageFormat,
        horizontalOffsetMm,
        0,
        targetWidthMm,
        targetHeightMm,
        `page-${pdfPageIndex + 1}`,
        undefined
      );
      pdfPageIndex += 1;

      // Yield to keep UI responsive, important for mobile devices
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
    }
  } catch (error) {
    cleanupPdfArtifacts({ safariWindowRef, mobileWindowRef });
    throw error;
  }

  if (pdfPageIndex === 0) {
    cleanupPdfArtifacts({ safariWindowRef, mobileWindowRef });
    throw new Error('PDF generation produced no pages.');
  }

  const needsBlobDelivery = safariMode || mobileSafari;

  if (needsBlobDelivery) {
    const blob = pdf.output('blob');

    if (mobileSafari) {
      const blobUrl = URL.createObjectURL(blob);
      callQuotePdfCallback('hideQuotePreviewStatus');
      try {
        window.location.assign(blobUrl);
      } catch (assignError) {
        logPdfWarn('mobile safari blob navigation failed', assignError);
      } finally {
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      }
    } else {
      const blobUrl = URL.createObjectURL(blob);

      const resolveTargetWindow = () => {
        if (safariMode && safariWindowRef && !safariWindowRef.closed) {
          return safariWindowRef;
        }
        if (mobileWindowRef && !mobileWindowRef.closed) {
          return mobileWindowRef;
        }
        return null;
      };

      const deliverToWindow = (targetWindow, url) => {
        callQuotePdfCallback('hideQuotePreviewStatus');
        if (!targetWindow) {
          window.location.assign(url);
          return;
        }
        try {
          targetWindow.location.replace(url);
          targetWindow.focus?.();
        } catch (navigationError) {
          logPdfWarn('direct blob navigation failed', navigationError);
          try {
            targetWindow.document.open();
            targetWindow.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${escapeHtml(t('reservations.quote.actions.export', 'تنزيل PDF'))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${url}" title="PDF preview"></iframe></body></html>`);
            targetWindow.document.close();
          } catch (iframeError) {
            logPdfWarn('iframe blob delivery failed', iframeError);
            window.location.assign(url);
          }
        }
      };

      const targetWindow = resolveTargetWindow();
      deliverToWindow(targetWindow, blobUrl);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    }
  } else {
    callQuotePdfCallback('hideQuotePreviewStatus');
    const blobUrl = pdf.output('bloburl');
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.rel = 'noopener';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
      link.remove();
    }, 2000);
  }
}


export function renderQuotePreview() {
  if (!state.activeQuoteState || !state.quoteModalRefs) return;
  const { previewFrame } = state.quoteModalRefs;
  if (!previewFrame) return;

  const useV2 = isQuoteV2Context(state.activeQuoteState);
  if (!useV2) return;

  const context = state.activeQuoteState.context || 'reservation';
  const reservationForPreview = context === 'reservationChecklist'
    ? getChecklistPreviewReservation()
    : state.activeQuoteState.reservation;
  const html = buildQuoteV2Html({
    ...state.activeQuoteState,
    reservation: reservationForPreview || state.activeQuoteState.reservation,
  });

  callQuotePdfCallback('showQuotePreviewStatus', 'render');
  previewFrame.srcdoc = `<!DOCTYPE html>${html}`;
  previewFrame.addEventListener('load', async () => {
    try {
      const doc = previewFrame.contentDocument;
      const view = doc?.defaultView || window;
      const rootNode = doc?.documentElement || doc;
      if (rootNode) {
        scrubUnsupportedColorFunctions(rootNode);
        sanitizeComputedColorFunctions(rootNode, view);
        enforceLegacyColorFallback(rootNode, view);
      }
      const pdfRoot = doc?.getElementById('quote-pdf-v2-root');
      const pages = Array.from(doc?.querySelectorAll?.('.quote-page') || []);
      const pagesContainer = doc?.querySelector('.quote-preview-pages');
      const baseWidth = A4_WIDTH_PX;

      let pageGap = 18;
      if (pagesContainer && doc?.defaultView) {
        const styles = doc.defaultView.getComputedStyle(pagesContainer);
        const gapCandidate = parseFloat(styles.rowGap || styles.gap || `${pageGap}`);
        if (Number.isFinite(gapCandidate) && gapCandidate >= 0) {
          pageGap = gapCandidate;
        }
      }

      const singlePageHeight = A4_HEIGHT_PX;
      const totalHeight = pages.length
        ? (pages.length * singlePageHeight) + Math.max(0, (pages.length - 1) * pageGap)
        : singlePageHeight;

      previewFrame.dataset.baseWidth = String(baseWidth);
      previewFrame.dataset.baseHeight = String(totalHeight);
      previewFrame.style.width = `${baseWidth}px`;
      previewFrame.style.minWidth = `${baseWidth}px`;
      previewFrame.style.height = `${totalHeight}px`;
      previewFrame.style.minHeight = `${totalHeight}px`;

      if (useV2 && !state.quoteModalRefs?.userAdjustedZoom) {
        state.previewZoom = 0.9;
      } else if (state.quoteModalRefs?.previewFrameWrapper && !state.quoteModalRefs?.userAdjustedZoom) {
        const availableWidth = state.quoteModalRefs.previewFrameWrapper.clientWidth - 24;
        if (availableWidth > 0 && availableWidth < baseWidth) {
          state.previewZoom = Math.max(availableWidth / baseWidth, 0.3);
        } else {
          state.previewZoom = 1;
        }
      }

      callQuotePdfCallback('applyPreviewZoom', state.previewZoom);
    } finally {
      callQuotePdfCallback('hideQuotePreviewStatus');
    }
  }, { once: true });
}

registerQuotePdfCallbacks({ renderQuotePreview });
