const LG_BREAKPOINT = 1024;

function getElements() {
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openTrigger = document.getElementById('sidebar-open');
  const closeTrigger = document.getElementById('sidebar-close');
  return { sidebar, backdrop, openTrigger, closeTrigger };
}

function addOpenState({ sidebar, backdrop }) {
  sidebar?.classList.add('open');
  backdrop?.classList.add('open');
  sidebar?.setAttribute('aria-hidden', 'false');
}

function removeOpenState({ sidebar, backdrop }) {
  sidebar?.classList.remove('open');
  backdrop?.classList.remove('open');
  sidebar?.setAttribute('aria-hidden', isDesktop() ? 'false' : 'true');
}

function isDesktop() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= LG_BREAKPOINT;
}

function handleResize(elements) {
  if (isDesktop()) {
    removeOpenState(elements);
  }
}

export function initDashboardShell() {
  const elements = getElements();
  const { sidebar, backdrop, openTrigger, closeTrigger } = elements;

  if (!sidebar) {
    return;
  }

  sidebar.setAttribute('aria-hidden', isDesktop() ? 'false' : 'true');

  openTrigger?.addEventListener('click', (event) => {
    event.preventDefault();
    addOpenState(elements);
  });

  closeTrigger?.addEventListener('click', (event) => {
    event.preventDefault();
    removeOpenState(elements);
  });

  backdrop?.addEventListener('click', () => {
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
      sidebar.setAttribute('aria-hidden', isDesktop() ? 'false' : (sidebar.classList.contains('open') ? 'false' : 'true'));
    }, { passive: true });
  }
}
