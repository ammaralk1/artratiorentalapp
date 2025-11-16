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
    }, { once: true });
  } else {
    setTimeout(removeLoadingSafely, 1500);
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
