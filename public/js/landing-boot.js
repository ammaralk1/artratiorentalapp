// Minimal bootstrap for landing page header (language + theme toggles)
(function () {
  const THEME_KEY = 'art-ratio:session-theme';
  const I18N = {
    ar: {
      brand: 'Art Ratio',
      pageTitle: 'Art Ratio — الصفحة الترحيبية',
      welcomeTitle: 'أهلًا وسهلًا بك في Art Ratio',
      description: 'هذه الصفحة قيد الإنشاء. قريبًا ستصبح معرض أعمال/بورتفوليو خاص بـ Art Ratio. يسعدنا زيارتك، ترقّب التحديثات قريبًا.',
      note: 'في حال كنت عضوًا في الفريق وتريد متابعة العمل يمكنك استخدام زر تسجيل الدخول.',
      login: 'تسجيل الدخول',
      themeToggleLabel: 'تبديل المظهر'
    },
    en: {
      brand: 'Art Ratio',
      pageTitle: 'Art Ratio — Welcome Page',
      welcomeTitle: 'Welcome to Art Ratio',
      description: 'This page is under construction. Soon it will become Art Ratio’s portfolio/gallery. Thanks for visiting — stay tuned.',
      note: 'If you are a team member and want to continue working, you can use the login button.',
      login: 'Log In',
      themeToggleLabel: 'Toggle theme'
    }
  };

  function setTheme(theme) {
    const root = document.documentElement;
    const body = document.body;
    const isDark = theme === 'dark';
    try { sessionStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (_) {}
    if (isDark) {
      root.classList.add('dark-mode', 'dark');
      root.classList.remove('light-mode');
      body?.classList?.add('dark-mode', 'dark');
      body?.classList?.remove('light-mode');
      root.setAttribute('data-theme', 'dark');
      body?.setAttribute?.('data-theme', 'dark');
    } else {
      root.classList.remove('dark-mode', 'dark');
      root.classList.add('light-mode');
      body?.classList?.remove('dark-mode', 'dark');
      body?.classList?.add('light-mode');
      root.setAttribute('data-theme', 'light');
      body?.setAttribute?.('data-theme', 'light');
    }
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

    // Apply translations
    applyTranslations(normalized);
  }

  function getI18nKey(el) {
    return el?.dataset?.i18nKey || '';
  }

  function getI18n(key, lang) {
    const current = (lang || document.documentElement.getAttribute('lang') || 'ar').toLowerCase();
    const dict = I18N[current] || I18N.ar;
    return dict[key] ?? '';
  }

  function applyTranslations(lang) {
    try {
      document.title = getI18n('pageTitle', lang);
    } catch (_) {}
    document.querySelectorAll('[data-i18n-key]').forEach((el) => {
      const key = getI18nKey(el);
      const value = getI18n(key, lang);
      if (!key) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        const placeholder = el.getAttribute('placeholder');
        if (placeholder !== null) el.setAttribute('placeholder', value);
      } else {
        el.textContent = value;
      }
    });
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
