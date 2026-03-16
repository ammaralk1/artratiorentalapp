(function initArinoDirection() {
  try {
    var storageKey = 'arinoLang';
    var path = (window.location.pathname || '/').toLowerCase();
    var pathLang = path.indexOf('/ar') === 0 ? 'ar' : path.indexOf('/en') === 0 ? 'en' : '';
    var savedLang = localStorage.getItem(storageKey);
    var lang = pathLang || (savedLang === 'ar' || savedLang === 'en' ? savedLang : 'ar');
    var isArabic = lang === 'ar';
    var root = document.documentElement;
    root.lang = lang;
    root.dir = isArabic ? 'rtl' : 'ltr';
    root.classList.toggle('rtl', isArabic);

    var head = document.head || document.getElementsByTagName('head')[0];
    if (head) {
      var preloadHeader = document.createElement('link');
      preloadHeader.rel = 'preload';
      preloadHeader.as = 'image';
      preloadHeader.href = '/assets/img/logo.svg';
      head.appendChild(preloadHeader);

      var preloadFooter = document.createElement('link');
      preloadFooter.rel = 'preload';
      preloadFooter.as = 'image';
      preloadFooter.href = '/assets/img/footer_logo.svg';
      head.appendChild(preloadFooter);
    }

    // Warm logo assets early to avoid visible late paint in the fixed header.
    var headerLogo = new Image();
    headerLogo.src = '/assets/img/logo.svg';
    var footerLogo = new Image();
    footerLogo.src = '/assets/img/footer_logo.svg';

    document.addEventListener('DOMContentLoaded', function () {
      var headerLogoImg = document.querySelector('.cs-main_header_left .cs-site_branding img');
      if (!headerLogoImg) return;
      headerLogoImg.loading = 'eager';
      headerLogoImg.decoding = 'sync';
      headerLogoImg.setAttribute('fetchpriority', 'high');
    });
  } catch (e) {
    // Keep GTM boot safe even if storage is unavailable.
  }
})();

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0];
  var j = d.createElement(s);
  var dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  if (f && f.parentNode) {
    f.parentNode.insertBefore(j, f);
  }
})(window, document, 'script', 'dataLayer', 'GTM-TS98K3HW');
