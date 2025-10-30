// Global fix: prevent "Blocked aria-hidden on an element because its descendant retained focus"
// We blur the focused element inside any Bootstrap modal on hide/hidden to avoid
// leaving focus on a node under an element that will get aria-hidden=true.

export function initModalA11yFocusGuards() {
  const handler = (event) => {
    try {
      const modal = event?.target;
      if (!modal || !(modal instanceof Element)) return;
      if (!modal.classList?.contains('modal')) return;
      const active = document.activeElement;
      if (active && modal.contains(active)) {
        try { active.blur(); } catch (_) {}
        try { document.body?.focus({ preventScroll: true }); } catch (_) {}
      }
    } catch (_) {
      // ignore
    }
  };

  // Use capture to run early in the hide cycle
  document.addEventListener('hide.bs.modal', handler, true);
  document.addEventListener('hidden.bs.modal', handler, true);

  // Also blur immediately when clicking close/dismiss buttons
  const clickHandler = (event) => {
    try {
      const target = event.target instanceof Element ? event.target : null;
      const dismiss = target?.closest('[data-bs-dismiss="modal"], .btn-close');
      if (!dismiss) return;
      try { (dismiss).blur(); } catch (_) {}
      try { document.body?.focus({ preventScroll: true }); } catch (_) {}
    } catch (_) {}
  };
  document.addEventListener('click', clickHandler, true);
}
