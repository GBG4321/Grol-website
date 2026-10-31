/* Grol Media - ambient "watered plant" hero animation. window.initGrowPlant(el) */
(function () {
  var STAGES = ['Idea', 'Positioning', 'Offer', 'First users', 'Trials', 'Paying customers', 'Scale'];
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

  window.initGrowPlant = function (root) {
    if (!root || root.__gp) return;
    root.__gp = true;
    var cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.position = 'absolute'; cv.style.inset = '0'; cv.style.display = 'block';
    root.appendChild(cv);
    var cx = cv.getContext('2d');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = 0, H = 0, dpr = 1, soil = 0, visible = true, raf = 0;
    var CYCLE = 15, GROW_END = 10.5, FADE = 1.2;
    var t0 = performance.now(), drops = [], splashes = [], lastSpawn = 0;

    function resize() {
      var r = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(200, r.width); H = Math.max(200, r.height);
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      soil = H - 56;
    }

    function leaf(x, y, len, ang, s) {
      if (s <= 0) return;
      cx.save(); cx.translate(x, y); cx.rotate(ang); cx.scale(s, s);
      cx.beginPath(); cx.moveTo(0, 0);
      cx.bezierCurveTo(len * 0.15, -len * 0.55, len * 0.7, -len * 0.48, len, 0);
      cx.bezierCurveTo(len * 0.7, len * 0.48, len * 0.15, len * 0.55, 0, 0);
      cx.fillStyle = 'rgba(255,255,255,0.9)'; cx.fill();
      cx.beginPath(); cx.moveTo(2, 0); cx.lineTo(len * 0.85, 0);
      cx.strokeStyle = 'rgba(0,0,0,0.35)'; cx.lineWidth = 1.2 / s; cx.stroke();
      cx.restore();
    }

    function can(x, y, tilt, s) {
      cx.save(); cx.translate(x, y); cx.rotate(tilt); cx.scale(s, s);
      cx.strokeStyle = 'rgba(255,255,255,0.75)'; cx.lineWidth = 1.6; cx.lineJoin = 'round'; cx.lineCap = 'round';
      rr(cx, -26, -18, 52, 36, 8); cx.fillStyle = 'rgba(255,255,255,0.06)'; cx.fill(); cx.stroke();
      cx.beginPath(); cx.moveTo(26, 6); cx.lineTo(56, -12); cx.lineTo(62, -10); cx.stroke();
      cx.beginPath(); cx.arc(-30, -2, 12, Math.PI * 0.55, Math.PI * 1.45); cx.stroke();
      cx.beginPath(); cx.moveTo(-14, -18); cx.lineTo(-14, -24); cx.lineTo(14, -24); cx.lineTo(14, -18); cx.stroke();
      cx.restore();
    }

    function frame(now) {
      var time = (now - t0) / 1000;
      var ct = Math.min(time, GROW_END + 2);
      var cycleN = 0;
      var g = reduce ? 1 : ease(Math.min(1, Math.max(0, (ct - 1.2) / (GROW_END - 1.2))));
      var alpha = reduce ? 1 : Math.min(1, ct / 0.6);
      var pouring = !reduce && ct > 0.5 && ct < GROW_END;
      cx.clearRect(0, 0, W, H);
      cx.globalAlpha = alpha;

      var px = W * 0.56;
      var maxH = soil - 70;
      var h = 8 + g * maxH;
      var sway = Math.sin(time * 1.4) * (2 + g * 6);

      // soil + pot
      // flower pot
      cx.beginPath();
      cx.moveTo(px - 34, soil - 6); cx.lineTo(px + 34, soil - 6);
      cx.lineTo(px + 26, soil + 34); cx.quadraticCurveTo(px + 25, soil + 38, px + 21, soil + 38);
      cx.lineTo(px - 21, soil + 38); cx.quadraticCurveTo(px - 25, soil + 38, px - 26, soil + 34);
      cx.closePath();
      cx.fillStyle = 'rgba(255,255,255,0.06)'; cx.fill();
      cx.strokeStyle = 'rgba(255,255,255,0.55)'; cx.lineWidth = 1.4; cx.lineJoin = 'round'; cx.stroke();
      rr(cx, px - 40, soil - 14, 80, 10, 4);
      cx.fillStyle = '#000'; cx.fill();
      cx.strokeStyle = 'rgba(255,255,255,0.7)'; cx.stroke();

      // stem
      var baseY = soil - 14, topX = px + sway, topY = baseY - h;
      cx.beginPath(); cx.moveTo(px, baseY);
      cx.quadraticCurveTo(px - sway * 0.6, baseY - h * 0.55, topX, topY);
      cx.strokeStyle = '#fff'; cx.lineWidth = 2.6 + g * 3.4; cx.lineCap = 'round'; cx.stroke();

      // leaves
      var spots = [0.18, 0.34, 0.5, 0.66, 0.8];
      for (var i = 0; i < spots.length; i++) {
        var f = spots[i], s = Math.min(1, Math.max(0, (g - f * 0.92) / 0.1));
        var ly = baseY - h * f, lx = px + sway * f * f;
        var len = 24 + (1 - f) * 26;
        var wob = Math.sin(time * 1.4 + i) * 0.07;
        leaf(lx, ly, len, i % 2 ? Math.PI + 0.5 + wob : -0.5 + wob, s);
      }

      // bud / sunflower
      var bloom = Math.max(0, Math.min(1, (g - 0.86) / 0.14));
      if (bloom > 0) {
        var R = 15 * bloom, PL = 17 * bloom, spin = Math.sin(time * 0.6) * 0.05;
        cx.save(); cx.translate(topX, topY); cx.rotate(spin);
        for (var layer = 0; layer < 2; layer++) {
          var n = 18, off = layer ? Math.PI / n : 0, len = layer ? PL * 0.85 : PL;
          for (var k = 0; k < n; k++) {
            var a2 = k / n * Math.PI * 2 + off;
            cx.save(); cx.rotate(a2); cx.translate(R - 1, 0);
            cx.beginPath(); cx.moveTo(0, 0);
            cx.quadraticCurveTo(len * 0.5, -len * 0.26, len, 0);
            cx.quadraticCurveTo(len * 0.5, len * 0.26, 0, 0);
            cx.fillStyle = layer ? '#E0A812' : '#F7C92E'; cx.fill();
            cx.restore();
          }
        }
        cx.beginPath(); cx.arc(0, 0, R, 0, 7); cx.fillStyle = '#3a2510'; cx.fill();
        cx.strokeStyle = '#8a5a1c'; cx.lineWidth = 1.4; cx.stroke();
        var seeds = Math.round(70 * bloom), GA = Math.PI * (3 - Math.sqrt(5));
        for (var q = 1; q < seeds; q++) {
          var rq = Math.sqrt(q / 70) * (R - 2.5), aq = q * GA;
          cx.beginPath(); cx.arc(Math.cos(aq) * rq, Math.sin(aq) * rq, 0.9 + rq / R * 0.6, 0, 7);
          cx.fillStyle = 'rgba(214,150,52,' + (0.45 + 0.45 * (rq / R)) + ')'; cx.fill();
        }
        cx.restore();
      } else {
        var bud = 3 + g * 5;
        cx.beginPath(); cx.arc(topX, topY, bud, 0, 7); cx.fillStyle = g > 0.6 ? '#F7C92E' : '#fff'; cx.fill();
        cx.beginPath(); cx.arc(topX, topY, bud * 0.45, 0, 7); cx.fillStyle = 'rgba(0,0,0,0.6)'; cx.fill();
      }

      // stage label
      var si = Math.min(STAGES.length - 1, Math.floor(g * (STAGES.length - 1) + 0.0001));
      cx.font = '500 12px Inter, sans-serif'; cx.textAlign = 'left';
      cx.fillStyle = 'rgba(255,255,255,0.6)';
      cx.fillText(STAGES[si], topX + (bloom > 0 ? 40 * bloom + 10 : 22), topY + 4);

      // watering can (slides in, tilts while pouring)
      var canIn = reduce ? 0 : Math.min(1, ct / 0.8) * (ct > GROW_END ? Math.max(0, 1 - (ct - GROW_END) / 0.8) : 1);
      var canX = px - 150 + (1 - canIn) * -60, canY = Math.max(60, topY - 70 - (1 - g) * 10);
      canY = Math.min(canY, soil - 200);
      canY = Math.max(56, canY);
      var tilt = pouring ? 0.45 + Math.sin(time * 2) * 0.04 : 0.1;
      if (canIn > 0) { cx.globalAlpha = alpha * canIn; can(canX, canY, tilt, 1); cx.globalAlpha = alpha; }

      // spout tip in world coords
      var tipLX = 62, tipLY = -10;
      var sx = canX + Math.cos(tilt) * tipLX - Math.sin(tilt) * tipLY;
      var sy = canY + Math.sin(tilt) * tipLX + Math.cos(tilt) * tipLY;

      if (pouring && time - lastSpawn > 0.06) {
        lastSpawn = time;
        drops.push({ x: sx, y: sy, vx: 70 + Math.random() * 40, vy: 10 + Math.random() * 20, cyc: cycleN });
      }
      var dt = frame.dt || 0.016;
      for (var d = drops.length - 1; d >= 0; d--) {
        var dr = drops[d];
        dr.vy += 700 * dt; dr.x += dr.vx * dt; dr.y += dr.vy * dt;
        if (dr.y >= baseY) { splashes.push({ x: dr.x, t: 0 }); drops.splice(d, 1); continue; }
        cx.beginPath(); cx.ellipse(dr.x, dr.y, 1.8, 3.4, Math.atan2(dr.vy, dr.vx) - Math.PI / 2, 0, 7);
        cx.fillStyle = 'rgba(255,255,255,0.75)'; cx.fill();
      }
      for (var sp = splashes.length - 1; sp >= 0; sp--) {
        var S = splashes[sp]; S.t += dt;
        if (S.t > 0.4) { splashes.splice(sp, 1); continue; }
        cx.globalAlpha = alpha * (1 - S.t / 0.4);
        cx.beginPath(); cx.arc(S.x, baseY, 3 + S.t * 16, Math.PI, 0);
        cx.strokeStyle = '#fff'; cx.lineWidth = 1; cx.stroke();
        cx.globalAlpha = alpha;
      }
      cx.globalAlpha = 1;
    }

    var last = performance.now();
    function loop(now) {
      frame.dt = Math.min(0.033, (now - last) / 1000); last = now;
      frame(now);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        var was = visible; visible = en[0].isIntersecting;
        if (visible && !was && !reduce) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
      }, { threshold: 0.05 }).observe(root);
    }
    window.addEventListener('resize', function () { resize(); if (reduce) frame(performance.now()); });
    resize(); setTimeout(resize, 300);
    if (reduce) frame(performance.now());
    else raf = requestAnimationFrame(loop);
  };
})();
