(function () {
  const root = document.documentElement;

  if (!root) {
    return;
  }

  root.classList.add('language-loading');
  root.classList.add('theme-loading');

  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark-mode');
    }
  } catch (error) {
    console.warn('[page-boot] could not apply preferred color scheme', error);
  }
})();
