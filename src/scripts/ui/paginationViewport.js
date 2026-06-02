function resolvePaginationSection(anchor) {
  if (!(anchor instanceof Element)) return null;

  const section = anchor.closest(
    'section, .glass-card, .compact-surface-panel, .ui-table-shell, .home-section-card'
  );
  if (!section) return anchor;

  return (
    section.querySelector('.users-table-wrapper, .ui-table-shell, .reservations-list-shell, table') ||
    section
  );
}

function getPaginationTargetTop(anchor, options = {}) {
  const target = resolvePaginationSection(anchor);
  if (!target) return null;

  const header = document.querySelector('.dashboard-header');
  const headerOffset = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  const extraOffset = Number.isFinite(options.offset) ? options.offset : 12;

  return Math.max(
    (window.scrollY || window.pageYOffset || 0) + target.getBoundingClientRect().top - headerOffset - extraOffset,
    0,
  );
}

function scrollToTargetTop(targetTop, options = {}) {
  if (targetTop == null) return;
  const behavior = options.behavior || 'auto';

  if (behavior === 'auto') {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html?.style.scrollBehavior || '';
    const previousBodyBehavior = body?.style.scrollBehavior || '';

    if (html) html.style.scrollBehavior = 'auto';
    if (body) body.style.scrollBehavior = 'auto';

    window.scrollTo(0, targetTop);

    requestAnimationFrame(() => {
      if (html) html.style.scrollBehavior = previousHtmlBehavior;
      if (body) body.style.scrollBehavior = previousBodyBehavior;
    });
    return;
  }

  const effectiveBehavior = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : behavior;

  window.scrollTo({ top: targetTop, behavior: effectiveBehavior });
}

export function jumpPaginationSectionToStart(anchor, options = {}) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  scrollToTargetTop(getPaginationTargetTop(anchor, options), { ...options, behavior: 'auto' });
}

export function settlePaginationSectionToStart(anchor, options = {}) {
  const targetTop = getPaginationTargetTop(anchor, options);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToTargetTop(targetTop, { ...options, behavior: 'auto' });
    });
  });
}
