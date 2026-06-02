export function bindReportsFilterToggle({
  card,
  header,
  body,
  toggleBtn,
  resetBtn,
  transitionMs = 280,
  bodyExpandedClass = 'is-expanded',
}) {
  if (!card || !header || !body || card.dataset.toggleBound === 'true') return null;

  const setExpanded = (expanded) => {
    card.classList.toggle('is-collapsed', !expanded);
    body.classList.toggle(bodyExpandedClass, expanded);
    toggleBtn?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    body.style.maxHeight = expanded ? `${body.scrollHeight}px` : '0';
    body.style.opacity = expanded ? '1' : '0';

    if (expanded) {
      setTimeout(() => {
        if (!card.classList.contains('is-collapsed')) {
          body.style.maxHeight = 'none';
        }
      }, transitionMs);
    }
  };

  setExpanded(true);

  header.addEventListener('click', () => setExpanded(card.classList.contains('is-collapsed')));
  toggleBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    setExpanded(card.classList.contains('is-collapsed'));
  });
  resetBtn?.addEventListener('click', (event) => event.stopPropagation());

  card.dataset.toggleBound = 'true';
  return { setExpanded };
}
