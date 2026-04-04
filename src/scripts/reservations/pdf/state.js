// Shared mutable state for all pdf/ modules.
// All modules import and mutate this object instead of bare module-level variables.
export const state = {
  activeQuoteState: null,
  quoteModalRefs: null,
  previewZoom: 1,
  ensureJsPdfPromise: null,
  ensureHtml2CanvasPromise: null,
  manualQuoteBackdrop: null,
  manualQuoteEscapeHandler: null,
  quoteAssetWarningShown: false,
  blockDragMode: false,
  blockDragDirty: false,
  initializedInfoAlignments: false,
  quoteLiveListenersAttached: false,
  reservationsChangedHandlerRef: null,
  renderLayoutStateOverride: null,
};
