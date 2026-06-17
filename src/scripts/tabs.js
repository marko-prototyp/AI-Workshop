export function initWeekTabs() {
  // Activate a tab by element reference
  function activateTab(tab) {
    const tabbar = tab.closest('[role="tablist"]');
    if (!tabbar) return;
    const tabs = [...tabbar.querySelectorAll('[role="tab"]')];
    const week = tabbar.closest('.week-content');

    tabs.forEach(t => {
      const isTarget = t === tab;
      t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      t.classList.toggle('is-active', isTarget);
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !isTarget;
    });

    // Move focus to the panel
    const activePanel = document.getElementById(tab.getAttribute('aria-controls'));
    if (activePanel) activePanel.focus({ preventScroll: true });
  }

  // Delegate click on tab buttons
  document.addEventListener('click', e => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    activateTab(tab);
  });

  // Arrow-key navigation within a tablist
  document.addEventListener('keydown', e => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const tabbar = tab.closest('[role="tablist"]');
    if (!tabbar) return;
    const tabs = [...tabbar.querySelectorAll('[role="tab"]')];
    const idx = tabs.indexOf(tab);

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = tabs[(idx + 1) % tabs.length];
      activateTab(next);
      next.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
      activateTab(prev);
      prev.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      activateTab(tabs[0]);
      tabs[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      activateTab(tabs[tabs.length - 1]);
      tabs[tabs.length - 1].focus();
    }
  });

  // Reset to Instructions tab when a <details> closes
  document.addEventListener('toggle', e => {
    const details = e.target;
    if (!details.classList.contains('week')) return;
    if (!details.open) {
      const instrTab = details.querySelector('[role="tab"][aria-controls$="-panel-instr"]');
      if (instrTab) activateTab(instrTab);
    }
  }, true); // capture — 'toggle' doesn't bubble
}
