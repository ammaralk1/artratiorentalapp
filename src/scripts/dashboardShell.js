import { apiRequest } from './apiClient.js';
import { getCurrentUser } from './auth.js';
import { saveData } from './storage.js';
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

  const outsideClickHandler = (event) => {
    if (!(event.target instanceof Node)) return;
    if (!root.contains(event.target)) {
      setState(false);
    }
  };

  const addOutsideListener = () => {
    window.requestAnimationFrame(() => {
      document.addEventListener('click', outsideClickHandler, { capture: true });
    });
  };

  const removeOutsideListener = () => {
    document.removeEventListener('click', outsideClickHandler, { capture: true });
  };

  const setState = (isOpen) => {
    panel.hidden = !isOpen;
    toggle.setAttribute('aria-expanded', String(isOpen));
    root.dataset.state = isOpen ? 'open' : 'closed';
    if (isOpen) {
      addOutsideListener();
    } else {
      removeOutsideListener();
    }
  };

  setState(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    const willOpen = !isOpen;
    setState(willOpen);
    if (willOpen && !window.matchMedia('(min-width: 768px)').matches) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

export function initDashboardShell() {
  // جلب بيانات التابات عند تحميل الداشبورد
  async function fetchAndStoreDashboardData() {
    const user = await getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    try {
      const emit = (type) => {
        try {
          document.dispatchEvent(new CustomEvent(type));
        } catch {}
        try {
          window.dispatchEvent(new CustomEvent(type));
        } catch {}
      };
      const [equipmentRes, maintenanceRes, reservationsRes] = await Promise.all([
        apiRequest('equipment/'),
        apiRequest('maintenance/'),
        apiRequest('reservations/')
      ]);
      saveData({
        equipment: equipmentRes?.data || [],
        maintenance: maintenanceRes?.data || [],
        reservations: reservationsRes?.data || []
      });
      // Notify listeners across both document and window for compatibility
      emit('equipment:changed');
      emit('maintenance:changed');
      emit('maintenance:updated');
      emit('reservations:changed');
    } catch (err) {
      console.error('فشل جلب بيانات الداشبورد', err);
    }
  }

  fetchAndStoreDashboardData();
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
