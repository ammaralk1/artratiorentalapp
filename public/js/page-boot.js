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

  const onReady = () => {
    // Give modules a moment; then force visibility
    setTimeout(removeLoadingSafely, 1500);
    try { ensureSidebarStructure(); } catch (_) {}
    try { initializeSidebarFallback(); } catch (_) {}
    try { refreshSidebarCountersFallback(); } catch (_) {}
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
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
  const sidebar = ensureSidebarStructure();
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
  if (!exists) {
    ensureSidebarStructure();
  }

  const format = (n) => {
    try {
      const lang = document.documentElement.getAttribute('lang') || 'ar';
      return new Intl.NumberFormat(lang === 'ar' ? 'ar' : 'en', { maximumFractionDigits: 0 }).format(Number(n || 0));
    } catch { return String(n || 0); }
  };

  const apply = (data) => {
    try { const el = ensureStat('projects'); if (el) el.textContent = format(data?.projects?.total || 0); } catch {}
    try { const el = ensureStat('reservations'); if (el) el.textContent = format(data?.reservations?.total || 0); } catch {}
    try { const el = ensureStat('equipment'); if (el) el.textContent = format(data?.equipment?.total || 0); } catch {}
    try { const el = ensureStat('technicians'); if (el) el.textContent = format(data?.technicians?.total || 0); } catch {}
  };

  const ensureStat = (key) => {
    const id = ids[key]; if (!id) return null;
    let el = document.getElementById(id);
    if (el) return el;
    // If stats section is missing (legacy Arabic pages), create a minimal one.
    let sidebar = document.getElementById('dashboard-sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.id = 'dashboard-sidebar';
      sidebar.className = 'sidebar-shell sidebar-drawer open';
      sidebar.setAttribute('aria-hidden', 'false');
      (document.body || document.documentElement).appendChild(sidebar);
    }

    let menu = sidebar.querySelector('.sidebar-menu');
    if (!menu) {
      menu = document.createElement('nav');
      menu.className = 'sidebar-menu mt-6';
      sidebar.appendChild(menu);
    }

    let panel = sidebar.querySelector('.sidebar-panel--stats');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'sidebar-panel sidebar-panel--stats mt-6';
      panel.innerHTML = '<h3 class="sidebar-heading">ملخص اليوم</h3><div class="sidebar-stats" role="list"></div>';
      menu.prepend(panel);
    }
    const list = panel.querySelector('.sidebar-stats');
    if (!list) return null;

    const row = document.createElement('div');
    row.className = 'sidebar-stats-row';
    row.setAttribute('role', 'listitem');
    const labelMap = {
      projects: 'المشاريع',
      reservations: 'الحجوزات',
      equipment: 'المعدات',
      technicians: 'طاقم العمل'
    };
    row.innerHTML = `<span>${labelMap[key] || key}</span><span id="${id}" class="badge-soft">0</span>`;
    list.appendChild(row);
    el = row.querySelector(`#${id}`);
    return el;
  };

  // If modules later update, they will overwrite these values.
  fetch('/backend/api/summary/', { credentials: 'include' })
    .then((r) => r.ok ? r.json() : Promise.reject(new Error('summary failed')))
    .then((json) => apply(json?.data || null))
    .catch(() => { /* silent fallback */ });
}

// Ensure sidebar shell, menu, stats panel, and quick tabs exist for legacy pages
function ensureSidebarStructure() {
  // Backdrop
  if (!document.getElementById('sidebar-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    (document.body || document.documentElement).prepend(backdrop);
  }

  // Sidebar shell
  let sidebar = document.getElementById('dashboard-sidebar');
  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.id = 'dashboard-sidebar';
    sidebar.className = 'sidebar-shell sidebar-drawer open';
    sidebar.setAttribute('aria-label', 'التنقل الجانبي');
    sidebar.setAttribute('aria-hidden', 'false');
    (document.body || document.documentElement).prepend(sidebar);
  }

  // Brand header (only if missing)
  if (!sidebar.querySelector('.sidebar-brand')) {
    const brand = document.createElement('div');
    brand.className = 'flex items-center justify-between gap-3 border-b border-base-200/70 pb-4 sidebar-brand';
    brand.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="sidebar-brand-logo">
          <img src="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png" alt="Art Ratio" class="sidebar-logo-img" loading="lazy" decoding="async">
        </div>
        <div class="text-start sidebar-brand-text">
          <p class="text-xs text-base-content/60">Art Ratio</p>
          <p class="text-lg font-semibold text-base-content">مركز التحكم</p>
        </div>
      </div>
    `;
    sidebar.prepend(brand);
  }

  // Sidebar menu container
  let menu = sidebar.querySelector('.sidebar-menu');
  if (!menu) {
    menu = document.createElement('nav');
    menu.className = 'sidebar-menu mt-6 space-y-6';
    sidebar.appendChild(menu);
  }

  // Stats panel
  let statsPanel = sidebar.querySelector('.sidebar-panel--stats');
  if (!statsPanel) {
    statsPanel = document.createElement('div');
    statsPanel.className = 'sidebar-panel sidebar-panel--stats';
    statsPanel.innerHTML = `
      <h3 class="sidebar-heading">ملخص اليوم</h3>
      <div class="sidebar-stats" role="list"></div>
    `;
    menu.prepend(statsPanel);
  }

  // Tabs panel
  let tabsPanel = sidebar.querySelector('.sidebar-panel--tabs');
  if (!tabsPanel) {
    tabsPanel = document.createElement('div');
    tabsPanel.className = 'sidebar-panel sidebar-panel--tabs';
    tabsPanel.innerHTML = `
      <p class="sidebar-heading mb-2">التبويبات</p>
      <div class="tab-buttons tab-buttons-vertical" role="tablist" aria-orientation="vertical"></div>
    `;
    menu.appendChild(tabsPanel);
    const buttons = tabsPanel.querySelector('.tab-buttons');
    const links = [
      { href: 'home.html', label: 'الصفحة الرئيسية' },
      { href: 'dashboard.html#customers-tab', label: 'العملاء' },
      { href: 'dashboard.html#equipment-tab', label: 'المعدات' },
      { href: 'dashboard.html#maintenance-tab', label: 'الصيانة' },
      { href: 'dashboard.html#technicians-tab', label: 'طاقم العمل' },
      { href: 'dashboard.html#reservations-tab', label: 'الحجوزات' },
      { href: 'projects.html', label: 'لوحة المشاريع' }
    ];
    if (buttons) {
      links.forEach((item) => {
        const a = document.createElement('a');
        a.className = 'tab-button';
        a.href = item.href;
        a.textContent = item.label;
        a.setAttribute('data-close-sidebar', '');
        buttons.appendChild(a);
      });
    }
  }

  return sidebar;
}
