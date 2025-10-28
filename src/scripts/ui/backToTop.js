export function initBackToTopForEquipment() {
  try {
    const btn = document.getElementById('equipment-back-to-top');
    const equipmentTab = document.getElementById('equipment-tab');
    if (!btn || !equipmentTab) return;

    const THRESHOLD = 240;

    const isEquipmentActive = () => (
      equipmentTab.classList.contains('active') && equipmentTab.style.display !== 'none'
    );

    const update = () => {
      try {
        const shouldShow = isEquipmentActive() && (window.scrollY || window.pageYOffset || 0) > THRESHOLD;
        btn.style.display = shouldShow ? '' : 'none';
      } catch (_) {}
    };

    const onClick = (e) => {
      e.preventDefault();
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    document.addEventListener('dashboard:tabChanged', update);
    btn.addEventListener('click', onClick);

    // Initial state
    setTimeout(update, 0);
    setTimeout(update, 250);
  } catch (_) {
    // no-op
  }
}

