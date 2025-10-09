const SCROLLER_SELECTOR = '[data-tab-scroll]';
const TRACK_SELECTOR = '[data-tab-scroll-track]';
const PREV_SELECTOR = '[data-tab-scroll-prev]';
const NEXT_SELECTOR = '[data-tab-scroll-next]';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollState(root, track, prevBtn, nextBtn) {
  if (!root || !track) return;
  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
  const hasOverflow = maxScroll > 4;
  if (!hasOverflow) {
    if (prevBtn) {
      prevBtn.hidden = true;
      prevBtn.disabled = true;
      prevBtn.setAttribute('aria-disabled', 'true');
    }
    if (nextBtn) {
      nextBtn.hidden = true;
      nextBtn.disabled = true;
      nextBtn.setAttribute('aria-disabled', 'true');
    }
    root.classList.remove('has-left', 'has-right');
    return;
  }

  const current = clamp(track.scrollLeft, 0, maxScroll);
  const atStart = current <= 2;
  const atEnd = current >= (maxScroll - 2);

  if (prevBtn) {
    prevBtn.hidden = false;
    prevBtn.disabled = atStart;
    prevBtn.setAttribute('aria-disabled', String(atStart));
  }
  if (nextBtn) {
    nextBtn.hidden = false;
    nextBtn.disabled = atEnd;
    nextBtn.setAttribute('aria-disabled', String(atEnd));
  }

  root.classList.toggle('has-left', !atStart);
  root.classList.toggle('has-right', !atEnd);
}

function setupScroller(root) {
  if (!root || root.dataset.tabScrollReady === 'true') {
    return;
  }
  const track = root.querySelector(TRACK_SELECTOR);
  if (!track) {
    return;
  }

  root.dataset.tabScrollReady = 'true';

  const prevBtn = root.querySelector(PREV_SELECTOR);
  const nextBtn = root.querySelector(NEXT_SELECTOR);

  let rafId = null;
  const requestUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      updateScrollState(root, track, prevBtn, nextBtn);
    });
  };

  const scrollByAmount = (direction) => {
    const amount = track.clientWidth ? Math.max(track.clientWidth * 0.6, 160) : 200;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  prevBtn?.addEventListener('click', () => scrollByAmount(-1));
  nextBtn?.addEventListener('click', () => scrollByAmount(1));

  track.addEventListener('scroll', requestUpdate, { passive: true });

  const handleResize = () => requestUpdate();
  window.addEventListener('resize', handleResize, { passive: true });

  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(track);
    const content = track.firstElementChild;
    if (content) {
      observer.observe(content);
    }
    root._tabScrollResizeObserver = observer;
  }

  root.addEventListener('tabScroll:update', requestUpdate);

  requestUpdate();
}

export function initTabScrollers() {
  if (typeof document === 'undefined') return;
  const scrollers = document.querySelectorAll(SCROLLER_SELECTOR);
  scrollers.forEach(setupScroller);
}
