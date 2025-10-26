// Sets a global flag so modules avoid remote preference/auth fetch on the login page.
// This file is external to satisfy CSP (no inline scripts allowed).
(function(){
  try {
    window.__ART_RATIO_SKIP_PREF_FETCH__ = true;
  } catch (_) {
    // ignore
  }
})();

