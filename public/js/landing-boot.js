// Minimal bootstrap for landing page header (language + theme toggles)
(function () {
  const THEME_KEY = 'art-ratio:session-theme';

  function setTheme(theme) {
    const root = document.documentElement;
    const body = document.body;
    const isDark = theme === 'dark';
    try { sessionStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (_) {}
    if (isDark) {
      root.classList.add('dark-mode', 'dark');
      body?.classList?.add('dark-mode', 'dark');
      root.setAttribute('data-theme', 'dark');
      body?.setAttribute?.('data-theme', 'dark');
    } else {
      root.classList.remove('dark-mode', 'dark');
      body?.classList?.remove('dark-mode', 'dark');
      root.setAttribute('data-theme', 'light');
      body?.setAttribute?.('data-theme', 'light');
    }
    const label = document.querySelector('[data-theme-label]');
    if (label) label.textContent = isDark ? '☀️ الوضع العادي' : '🌙 الوضع الليلي';
    const checkbox = document.getElementById('theme-toggle');
    if (checkbox) checkbox.checked = isDark;
    document.documentElement.classList.remove('theme-loading');
    document.body?.classList?.remove('theme-loading');
  }

  function getInitialTheme() {
    try {
      const stored = sessionStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (_) {}
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function initThemeToggle() {
    const input = document.getElementById('theme-toggle');
    const control = document.querySelector('[data-theme-toggle]');
    const handler = () => {
      const isDark = input ? input.checked : document.documentElement.classList.contains('dark-mode');
      setTheme(isDark ? 'dark' : 'light');
    };
    if (input) input.addEventListener('change', handler);
    else if (control) control.addEventListener('click', handler);
    setTheme(getInitialTheme());
  }

  function setLanguage(lang) {
    const html = document.documentElement;
    const body = document.body;
    const normalized = lang === 'en' ? 'en' : 'ar';
    html.setAttribute('lang', normalized);
    html.setAttribute('dir', normalized === 'ar' ? 'rtl' : 'ltr');
    if (body) {
      body.setAttribute('dir', normalized === 'ar' ? 'rtl' : 'ltr');
      body.dataset.lang = normalized;
    }
    document.querySelectorAll('.language-toggle-btn').forEach((btn) => {
      const labelAr = btn.dataset.labelAr || '🇸🇦 العربية';
      const labelEn = btn.dataset.labelEn || '🇬🇧 English';
      btn.textContent = normalized === 'en' ? labelAr : labelEn;
      btn.setAttribute('aria-pressed', normalized === 'en' ? 'true' : 'false');
    });
    html.classList.remove('language-loading');
    html.classList.add('language-ready');
  }

  function initLanguageToggle() {
    const toggle = document.getElementById('language-toggle');
    const current = (document.documentElement.getAttribute('lang') || 'ar').toLowerCase();
    setLanguage(current);
    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = (document.documentElement.getAttribute('lang') || 'ar') === 'ar' ? 'en' : 'ar';
        setLanguage(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initThemeToggle(); initLanguageToggle(); }, { once: true });
  } else {
    initThemeToggle();
    initLanguageToggle();
  }
})();

