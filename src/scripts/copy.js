const toast = document.getElementById('toast');

function showToast() {
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;

  const targetId = btn.dataset.copy;
  const text = document.getElementById(targetId)?.textContent;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    const label = btn.querySelector('span');
    if (label) label.textContent = 'Copied';
    showToast();
    setTimeout(() => {
      btn.classList.remove('copied');
      if (label) label.textContent = 'Copy';
    }, 2000);
  });
});
