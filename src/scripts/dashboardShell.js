const DESKTOP_BREAKPOINT = 1024;

function isDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= DESKTOP_BREAKPOINT;
}

function getElements() {
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openTrigger = document.getElementById('sidebar-open');
  const closeTrigger = document.getElementById('sidebar-close');
  return { sidebar, backdrop, openTrigger, closeTrigger };
}

function addOpenState({ sidebar, backdrop }) {
  sidebar?.classList.add('open');
  if (!isDesktop()) {
    backdrop?.classList.add('open');
  } else {
    backdrop?.classList.remove('open');
  }
  sidebar?.setAttribute('aria-hidden', 'false');
}

function removeOpenState({ sidebar, backdrop }) {
  sidebar?.classList.remove('open');
  if (!isDesktop()) {
    backdrop?.classList.remove('open');
    sidebar?.setAttribute('aria-hidden', 'true');
  } else {
    sidebar?.setAttribute('aria-hidden', 'false');
  }
}

function handleResize(elements) {
  if (isDesktop()) {
    addOpenState(elements);
  } else {
    removeOpenState(elements);
  }
}

export function initDashboardShell() {
  const elements = getElements();
  const { sidebar, backdrop, openTrigger, closeTrigger } = elements;

  if (!sidebar) {
    return;
  }

  const syncWithViewport = () => {
    if (isDesktop()) {
      addOpenState(elements);
    } else {
      removeOpenState(elements);
    }
  };

  syncWithViewport();

  openTrigger?.addEventListener('click', (event) => {
    event.preventDefault();
    if (isDesktop()) return;
    addOpenState(elements);
  });

  closeTrigger?.addEventListener('click', (event) => {
    event.preventDefault();
    if (isDesktop()) return;
    removeOpenState(elements);
  });

  backdrop?.addEventListener('click', () => {
    if (isDesktop()) return;
    removeOpenState(elements);
  });

  sidebar.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.hasAttribute('data-close-sidebar') || target.closest('[data-close-sidebar]')) {
      removeOpenState(elements);
      return;
    }
    if (target.closest('[data-tab]')) {
      removeOpenState(elements);
    }
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      handleResize(elements);
    }, { passive: true });
  }
}
