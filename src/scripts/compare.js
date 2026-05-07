const stage   = document.getElementById('compareStage');
const caption = document.getElementById('compareCaption');
const tabA    = document.getElementById('tabA');
const tabB    = document.getElementById('tabB');

if (stage) {
  document.querySelectorAll('.toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;

      // Swap SVG
      const tpl = document.getElementById(`svg${mode}`);
      if (tpl) stage.innerHTML = tpl.innerHTML;

      // Swap caption
      const cap = document.getElementById(`caption${mode}`);
      if (cap) caption.textContent = cap.innerHTML;

      // Update active states
      document.querySelectorAll('.toggle button').forEach(b =>
        b.classList.toggle('active', b === btn)
      );
      tabA.classList.toggle('active', mode === 'A');
      tabB.classList.toggle('active', mode === 'B');
    });
  });
}
