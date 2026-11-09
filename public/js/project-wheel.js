/*
 * Project page 3D wheel: no buttons.
 * Spin with touch swipe, mouse drag, trackpad/mouse wheel or the arrow keys.
 * Tapping the front card (image or title) opens its detail page; tapping a
 * side card turns it to the front first.
 */
document.addEventListener('DOMContentLoaded', function () {
  var rotation = document.querySelector('#rotation-id');
  if (!rotation) return;
  var slides = [].slice.call(rotation.querySelectorAll('.slide-4'));
  var N = slides.length;
  var angle = 360 / N;
  var index = 0;          // slide index currently facing the viewer (may run past N)
  var suppressClick = false;

  function front() { return ((index % N) + N) % N; }
  function rotateTo(i) {
    index = i;
    rotation.style.transform = 'rotateY(' + (-index * angle) + 'deg)';
  }
  function step(d) { rotateTo(index + d); }
  function blockNextClick() {
    suppressClick = true;
    setTimeout(function () { suppressClick = false; }, 350);
  }
  function inNav(t) { return t.closest && t.closest('.navi_mobile, .navi_desktop, .page-transition'); }

  // Touch swipe (anywhere on the page except the navigation bar).
  var tx = null, ty = 0;
  document.addEventListener('touchstart', function (e) {
    if (inNav(e.target)) { tx = null; return; }
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    tx = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      step(dx < 0 ? 1 : -1);
      blockNextClick();
    }
  }, { passive: true });

  // Mouse drag.
  var mx = null;
  document.addEventListener('mousedown', function (e) {
    if (e.button !== 0 || inNav(e.target)) return;
    mx = e.clientX;
  });
  document.addEventListener('mouseup', function (e) {
    if (mx == null) return;
    var dx = e.clientX - mx;
    mx = null;
    if (Math.abs(dx) > 40) { step(dx < 0 ? 1 : -1); blockNextClick(); }
  });
  rotation.addEventListener('dragstart', function (e) { e.preventDefault(); });

  // Trackpad swipe / mouse wheel (one card per gesture).
  var acc = 0, lastSpin = 0;
  window.addEventListener('wheel', function (e) {
    if (inNav(e.target)) return;
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    e.preventDefault();
    var now = Date.now();
    if (now - lastSpin < 450) return;
    acc += d;
    if (Math.abs(acc) > 40) {
      step(acc > 0 ? 1 : -1);
      acc = 0;
      lastSpin = now;
    }
  }, { passive: false });

  // Keyboard.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });

  // Whole card is the link.
  slides.forEach(function (slide, i) {
    var card = slide.querySelector('.course-video-container');
    var link = slide.querySelector('a.link-block-7');
    if (!card || !link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      if (suppressClick) { e.preventDefault(); e.stopPropagation(); return; }
      if (e.target.closest('.w-background-video--control')) return;
      if (i !== front()) {
        e.preventDefault();
        e.stopPropagation();
        var d = ((i - front()) % N + N) % N;
        if (d > N / 2) d -= N;
        step(d);
        return;
      }
      if (e.target.closest('a')) return;   // the title link handles itself
      if (window.jQuery) window.jQuery(link).trigger('click');
      else window.location.href = link.href;
    }, true);
  });
});
