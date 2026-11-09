// Hide the fixed back button once the page is scrolled; show it again near the top.
(function () {
  var btn = document.querySelector('.button-back');
  if (!btn) return;
  var ticking = false;
  function update() {
    btn.classList.toggle('is-scrolled-away', window.scrollY > 40);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
