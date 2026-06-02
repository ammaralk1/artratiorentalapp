const TABBAR_COMPACT_WIDTH = 560;
const FILTERS_COMPACT_WIDTH = 720;

function toggleCompactClass(element, className, shouldApply) {
  if (!element) return;
  element.classList.toggle(className, shouldApply);
}

function resolveObserverTarget(element) {
  if (!element) return null;
  return element;
}

export function initDetailResponsiveLayout(root = document) {
  const detailTabbars = Array.from(root.querySelectorAll('.details-page .detail-tabbar'));
  const filterBars = Array.from(root.querySelectorAll('.details-page .filters-bar'));

  const updateTabbar = (tabbar) => {
    const width = tabbar.getBoundingClientRect().width || 0;
    toggleCompactClass(tabbar, 'detail-tabbar--compact', width <= TABBAR_COMPACT_WIDTH);
  };

  const updateFilters = (filtersBar) => {
    const width = filtersBar.getBoundingClientRect().width || 0;
    toggleCompactClass(filtersBar, 'filters-bar--compact', width <= FILTERS_COMPACT_WIDTH);
  };

  detailTabbars.forEach(updateTabbar);
  filterBars.forEach(updateFilters);

  const resizeHandler = () => {
    detailTabbars.forEach(updateTabbar);
    filterBars.forEach(updateFilters);
  };

  window.addEventListener('resize', resizeHandler, { passive: true });

  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        if (target.classList.contains('detail-tabbar')) {
          updateTabbar(target);
          return;
        }
        if (target.classList.contains('filters-bar')) {
          updateFilters(target);
        }
      });
    });

    detailTabbars.forEach((tabbar) => {
      const target = resolveObserverTarget(tabbar);
      if (target) observer.observe(target);
    });

    filterBars.forEach((filtersBar) => {
      const target = resolveObserverTarget(filtersBar);
      if (target) observer.observe(target);
    });

    return () => {
      window.removeEventListener('resize', resizeHandler);
      observer.disconnect();
    };
  }

  return () => {
    window.removeEventListener('resize', resizeHandler);
  };
}
