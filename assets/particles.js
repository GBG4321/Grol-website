/* Lightweight particle field for Grol Media service pages.
   Scopes a <canvas> to its parent element's box. */
(function () {
  function initParticles(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var raf, particles = [];
    var dpr = Math.max(1, window.devicePixelRatio || 1);
    var speed = opts.speed || 0.6;
    var op = opts.opacity || [0.16, 0.46];
    var parent = canvas.parentElement;

    function dims() {
      return { w: parent.clientWidth, h: parent.clientHeight };
    }
    function resize() {
      var d = dims();
      canvas.width = d.w * dpr;
      canvas.height = d.h * dpr;
      canvas.style.width = d.w + 'px';
      canvas.style.height = d.h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function seed() {
      var d = dims();
      var count = d.w < 640 ? 38 : 70;
      particles = Array.from({ length: count }, function () {
        return {
          x: Math.random() * d.w,
          y: Math.random() * d.h,
          r: 0.6 + Math.random() * 1.4,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          a: op[0] + Math.random() * (op[1] - op[0])
        };
      });
    }
    function tick() {
      var d = dims();
      ctx.clearRect(0, 0, d.w, d.h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5) p.x = d.w + 5;
        if (p.x > d.w + 5) p.x = -5;
        if (p.y < -5) p.y = d.h + 5;
        if (p.y > d.h + 5) p.y = -5;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,' + (p.a * 0.55) + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize(); seed(); tick();
    var ro = new ResizeObserver(function () { resize(); });
    ro.observe(parent);
  }

  // Scroll reveal helper
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  window.initParticles = initParticles;
  window.initReveal = initReveal;
})();
