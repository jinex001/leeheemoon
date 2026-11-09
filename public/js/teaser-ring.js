/*
 * 360° teaser carousel for the Minyo Samcheonri pages.
 * Markup: <div class="teaser-ring" data-lang="kr|en" data-teasers='[...]'></div>
 * Each teaser: {"n":1,"mp4":"...","webm":"...","poster":"..."} when released,
 * or {"n":3,"date":"11.17"} while upcoming (shown as a placeholder card).
 */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function init(root) {
    var items = JSON.parse(root.getAttribute('data-teasers'));
    var kr = root.getAttribute('data-lang') === 'kr';
    var N = items.length;
    var released = [];
    items.forEach(function (t, i) { if (t.mp4) released.push(i); });

    var stage = el('div', 'teaser-ring__stage');
    var prev = el('button', 'teaser-ring__arrow teaser-ring__arrow--prev', '&#8592;');
    var next = el('button', 'teaser-ring__arrow teaser-ring__arrow--next', '&#8594;');
    prev.setAttribute('aria-label', kr ? '이전 티저' : 'Previous teaser');
    next.setAttribute('aria-label', kr ? '다음 티저' : 'Next teaser');
    var nav = el('div', 'teaser-ring__nav');
    root.appendChild(stage);
    stage.appendChild(prev);
    stage.appendChild(next);
    root.appendChild(nav);

    function upcomingLabel(t) {
      if (kr) return t.date + ' 공개';
      var m = t.date.split('.');
      var months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return 'Coming ' + months[+m[0]] + ' ' + (+m[1]);
    }

    var cards = items.map(function (t, i) {
      var c = el('div', 'teaser-ring__card' + (t.mp4 ? '' : ' is-upcoming'));
      if (t.mp4) {
        var img = el('img');
        img.src = t.poster;
        img.alt = (kr ? '민요삼천리 티저 #' : 'Minyo Samcheonri teaser #') + t.n;
        img.draggable = false;
        c.appendChild(img);
        c.appendChild(el('span', 'teaser-ring__num', '#' + t.n));
      } else {
        c.appendChild(el('div', 'teaser-ring__big', '#' + t.n));
        c.appendChild(el('div', 'teaser-ring__date', upcomingLabel(t)));
      }
      c.addEventListener('click', function () { if (!moved) go(i); });
      stage.appendChild(c);

      var b = el('button', '', '#' + t.n + (t.mp4 ? '' : '<small>' + (kr ? t.date : upcomingLabel(t).replace('Coming ', '')) + '</small>'));
      b.addEventListener('click', function () { go(i); });
      nav.appendChild(b);
      return c;
    });
    var navButtons = nav.querySelectorAll('button');

    // Start on the most recently released teaser.
    var cur = released.length ? released[released.length - 1] : 0;
    var pos = cur;        // animated position (float, in card units)
    var target = cur;
    var cw = 0, R = 0, depth = 0, raf = null, video = null;

    function measure() {
      var w = stage.clientWidth;
      var narrow = w < 600;
      cw = Math.round(narrow ? w * 0.70 : Math.min(w * 0.56, 620));
      R = narrow ? cw * 0.62 : cw * 0.82;
      depth = narrow ? 0.7 : 1;
      var ch = Math.round(cw * 920 / 1080);
      stage.style.height = (ch + 40) + 'px';
      cards.forEach(function (c) { c.style.width = cw + 'px'; c.style.marginLeft = (-cw / 2) + 'px'; });
      render();
    }

    function render() {
      var step = 2 * Math.PI / N;
      cards.forEach(function (c, i) {
        var d = i - pos;
        d = ((d % N) + N) % N;
        if (d > N / 2) d -= N;
        var th = d * step;
        var x = Math.sin(th) * R;
        var z = (Math.cos(th) - 1) * R * depth;
        var front = (Math.cos(th) + 1) / 2;   // 1 at front, 0 at back
        c.style.transform = 'translateX(' + x.toFixed(1) + 'px) translateZ(' + z.toFixed(1) + 'px) rotateY(' + (-th * 0.45).toFixed(3) + 'rad)';
        c.style.opacity = (0.25 + 0.75 * front).toFixed(3);
        c.style.zIndex = Math.round(front * 100);
        c.style.filter = front > 0.98 ? 'none' : 'brightness(' + (0.55 + 0.45 * front).toFixed(2) + ')';
      });
    }

    function animate() {
      var diff = target - pos;
      if (reduceMotion || Math.abs(diff) < 0.002) {
        pos = target;
        render();
        raf = null;
        settle();
        return;
      }
      pos += diff * 0.12;
      render();
      raf = requestAnimationFrame(animate);
    }

    function stopVideo() {
      if (video) { video.pause(); video.remove(); video = null; }
      cards.forEach(function (c) { c.classList.remove('is-front'); });
    }

    function go(i) {
      // Rotate the shortest way round to card i.
      var d = ((i - cur) % N + N) % N;
      if (d > N / 2) d -= N;
      target += d;
      cur = i;
      stopVideo();
      updateNav();
      if (!raf) raf = requestAnimationFrame(animate);
    }

    function nextReleased(from) {
      for (var k = 1; k <= N; k++) {
        var j = (from + k) % N;
        if (items[j].mp4) return j;
      }
      return from;
    }

    function settle() {
      var c = cards[cur], t = items[cur];
      c.classList.add('is-front');
      if (!t.mp4 || video) return;
      video = el('video');
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.controls = true;
      video.poster = t.poster;
      video.loop = released.length < 2;
      [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (s) {
        if (!t[s[0]]) return;
        var src = el('source');
        src.src = t[s[0]];
        src.type = s[1];
        video.appendChild(src);
      });
      video.addEventListener('ended', function () { go(nextReleased(cur)); });
      c.insertBefore(video, c.firstChild);
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }

    function updateNav() {
      for (var k = 0; k < navButtons.length; k++) navButtons[k].classList.toggle('is-active', k === cur);
    }

    prev.addEventListener('click', function () { go((cur - 1 + N) % N); });
    next.addEventListener('click', function () { go((cur + 1) % N); });

    // Drag / swipe to spin.
    var startX = null, startPos = 0, moved = false;
    stage.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || e.target.tagName === 'VIDEO') return;
      startX = e.clientX; startPos = target; moved = false;
      stage.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (startX == null) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6 && !moved) { moved = true; stopVideo(); }
      if (!moved) return;
      target = startPos - dx / (cw * 0.9);
      if (!raf) raf = requestAnimationFrame(animate);
    });
    window.addEventListener('pointerup', function () {
      if (startX == null) return;
      startX = null;
      stage.classList.remove('is-dragging');
      if (moved) {
        target = Math.round(target);
        cur = ((target % N) + N) % N;
        updateNav();
        if (!raf) raf = requestAnimationFrame(animate);
        setTimeout(function () { moved = false; }, 0);
      }
    });

    window.addEventListener('resize', measure);
    updateNav();
    measure();
    settle();
  }

  function boot() { document.querySelectorAll('.teaser-ring').forEach(init); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
