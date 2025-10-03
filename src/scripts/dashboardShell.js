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
  sidebar?.setAttribute('aria-hidden', 'true');
}

function initDashboardGreetingToggle() {
  const root = document.querySelector('[data-dashboard-greeting]');
  if (!root) return;

  const toggle = root.querySelector('[data-greeting-toggle]');
  const panel = root.querySelector('[data-greeting-panel]');
  if (!toggle || !panel) return;

  const setState = (isOpen) => {
    panel.hidden = !isOpen;
    toggle.setAttribute('aria-expanded', String(isOpen));
    root.dataset.state = isOpen ? 'open' : 'closed';
  };

  setState(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setState(!isOpen);
    if (!isOpen) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

export function initDashboardShell() {
  const elements = getElements();
  const { sidebar, backdrop, openTrigger, closeTrigger } = elements;

  if (!sidebar) {
    return;
  }

  sidebar.setAttribute('aria-hidden', 'true');

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

  initDashboardGreetingToggle();
}
