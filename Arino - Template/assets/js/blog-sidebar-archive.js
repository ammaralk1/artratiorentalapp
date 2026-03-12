(function () {
  // Defensive no-op initializer for blog detail pages.
  // Keeps backward compatibility with legacy template include.
  var list = document.getElementById('js-blog-archive-list');
  if (!list) return;
  if (list.dataset.archiveInit === '1') return;
  list.dataset.archiveInit = '1';
})();
