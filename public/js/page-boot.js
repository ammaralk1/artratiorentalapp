(function () {
  const root = document.documentElement;
  const FAVICON_PATH = '/favicon.ico';

  function ensureFavicon() {
    const head = document.head;
    if (!head) {
      return;
    }

    const existing = head.querySelector('link[rel~="icon"]');
    if (existing) {
      existing.setAttribute('href', FAVICON_PATH);
      existing.setAttribute('type', 'image/x-icon');
      return;
    }

    const link = document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('href', FAVICON_PATH);
    head.appendChild(link);
  }

  ensureFavicon();

  if (!root) {
    return;
  }

  // Ensure sidebar CSS is present even on legacy pages
  (function ensureSidebarStyles() {
    try {
      const head = document.head;
      if (!head) return;
      const hasSidebarCss = Array.from(head.querySelectorAll('link[rel="stylesheet"], link'))
        .some((l) => {
          const href = (l.getAttribute('href') || l.href || '').toLowerCase();
          return href.includes('/css/sidebar.css') || href.includes('/dist/css/sidebar.css');
        });
      // Inject unconditionally when missing (the script runs very early,
      // before body is parsed on some pages — gating on DOM presence would miss it).
      if (hasSidebarCss) return;

      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      // Use absolute dist path since some hosts don’t expose /css
      link.setAttribute('href', '/dist/css/sidebar.css');
      head.appendChild(link);
    } catch (_) {
      // ignore
    }
  })();

  root.classList.add('language-loading');
  root.classList.add('theme-loading');

  const sessionKey = 'art-ratio:session-theme';
  let initialTheme = null;

  try {
    const storedTheme = window.sessionStorage?.getItem(sessionKey);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      initialTheme = storedTheme;
    }
  } catch (error) {
    // ignore storage errors (private browsing, disabled storage, etc.)
  }

  try {
    if (!initialTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = 'dark';
    }
  } catch (error) {
    console.warn('[page-boot] could not apply preferred color scheme', error);
  }

  if (initialTheme === 'dark') {
    root.classList.add('dark-mode', 'dark');
    root.setAttribute('data-theme', 'dark');
    if (document.body) {
      document.body.classList.add('dark-mode', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  } else if (initialTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (document.body) {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  // Fallback: if app scripts fail to remove loading classes, ensure UI becomes visible
  const removeLoadingSafely = () => {
    try {
      const html = document.documentElement;
      // Ensure language visibility
      html?.classList?.remove('language-loading');
      html?.classList?.add('language-ready');
      document.body?.classList?.remove('no-js');
      document.body?.classList?.remove('tabs-loading');
    } catch (_) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Give modules a moment; then force visibility
      setTimeout(removeLoadingSafely, 1500);
      try { initializeSidebarFallback(); } catch (_) {}
      try { refreshSidebarCountersFallback(); } catch (_) {}
    }, { once: true });
  } else {
    setTimeout(removeLoadingSafely, 1500);
    try { initializeSidebarFallback(); } catch (_) {}
    try { refreshSidebarCountersFallback(); } catch (_) {}
  }

  // Configure API base fallback early (before modules load)
  try {
    if (typeof window !== 'undefined' && !window.APP_API_BASE) {
      // When opened directly from filesystem, use local backend default
      if (location.protocol === 'file:') {
        window.APP_API_BASE = 'http://127.0.0.1:8000/backend/api';
      }
      // When running on localhost, keep same-origin backend path
      else if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        window.APP_API_BASE = '/backend/api';
      }
    }
  } catch (e) {
    // ignore
  }
})();

// Minimal sidebar functionality for legacy pages (Arabic/English)
function initializeSidebarFallback() {
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const openBtn  = document.getElementById('sidebar-open');
  const closeBtn = document.getElementById('sidebar-close');
  if (!sidebar) return; // no sidebar on this page

  const addOpen = () => {
    try { sidebar.classList.add('open'); } catch {}
    try { sidebar.setAttribute('aria-hidden', 'false'); } catch {}
    try { backdrop?.classList?.add('open'); } catch {}
  };
  const removeOpen = () => {
    try { sidebar.classList.remove('open'); } catch {}
    try { sidebar.setAttribute('aria-hidden', 'true'); } catch {}
    try { backdrop?.classList?.remove('open'); } catch {}
  };

  // Start closed on small viewports; pinned open on >= 1024px
  const syncToViewport = () => {
    const isWide = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
    if (isWide) addOpen(); else removeOpen();
  };

  // Initial state and listeners
  try { sidebar.setAttribute('aria-hidden', 'true'); } catch {}
  syncToViewport();
  try { window.addEventListener('resize', () => { try { syncToViewport(); } catch {} }, { passive: true }); } catch {}

  openBtn?.addEventListener('click', (e) => { try { e.preventDefault(); } catch {} addOpen(); });
  closeBtn?.addEventListener('click', (e) => { try { e.preventDefault(); } catch {} removeOpen(); });
  backdrop?.addEventListener('click', () => removeOpen());
  sidebar.addEventListener('click', (event) => {
    const t = event.target;
    if (!(t instanceof Element)) return;
    if (t.hasAttribute('data-close-sidebar') || t.closest('[data-close-sidebar]') || t.closest('.tab-button,[data-tab]')) {
      removeOpen();
    }
  });
}

// Fallback: hydrate sidebar counters from /backend/api/summary/
function refreshSidebarCountersFallback() {
  const ids = {
    projects: 'sidebar-stat-projects',
    reservations: 'sidebar-stat-reservations',
    equipment: 'sidebar-stat-equipment',
    technicians: 'sidebar-stat-technicians'
  };
  const exists = Object.values(ids).some((id) => document.getElementById(id));
  if (!exists) return; // nothing to hydrate

  const format = (n) => {
    try {
      const lang = document.documentElement.getAttribute('lang') || 'ar';
      return new Intl.NumberFormat(lang === 'ar' ? 'ar' : 'en', { maximumFractionDigits: 0 }).format(Number(n || 0));
    } catch { return String(n || 0); }
  };

  const apply = (data) => {
    try { const el = document.getElementById(ids.projects); if (el) el.textContent = format(data?.projects?.total || 0); } catch {}
    try { const el = document.getElementById(ids.reservations); if (el) el.textContent = format(data?.reservations?.total || 0); } catch {}
    try { const el = document.getElementById(ids.equipment); if (el) el.textContent = format(data?.equipment?.total || 0); } catch {}
    try { const el = document.getElementById(ids.technicians); if (el) el.textContent = format(data?.technicians?.total || 0); } catch {}
  };

  // If modules later update, they will overwrite these values.
  fetch('/backend/api/summary/', { credentials: 'include' })
    .then((r) => r.ok ? r.json() : Promise.reject(new Error('summary failed')))
    .then((json) => apply(json?.data || null))
    .catch(() => { /* silent fallback */ });
}
