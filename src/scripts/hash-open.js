// Open and scroll to a <details> that matches the URL hash.
// Capture links like /journal/capture/#journal-prompts-w06 should land on the
// right session with its accordion already open, so nobody has to hunt the list
// and expand it by hand. Scoped to the journal-prompts anchors so it never
// touches the main week list (those open as a modal, not an accordion).

function openFromHash() {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!id || id.indexOf('journal-prompts-') !== 0) return;

  const el = document.getElementById(id);
  if (!el) return;

  const details = el.tagName === 'DETAILS' ? el : el.closest('details');
  if (!details) return;

  // Open the target and any details that contain it.
  let d = details;
  while (d) {
    d.open = true;
    d = d.parentElement && d.parentElement.closest('details');
  }

  // Scroll after the open has changed the layout, so the target lands in view.
  requestAnimationFrame(() => {
    details.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export function initHashOpen() {
  openFromHash();
  window.addEventListener('load', openFromHash);
  window.addEventListener('hashchange', openFromHash);
}
