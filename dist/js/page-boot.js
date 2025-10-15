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
})();
