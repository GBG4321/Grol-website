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

/* PostHog analytics - loaded once here so every page that includes
   particles.js gets tracking without needing its own script tag. */
(function () {
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Fi Di init Ji Xi Tr Ki tn Zi capture calculateEventProperties ln register register_once register_for_session unregister unregister_for_session dn getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync cn identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty un sn createPersonProfile setInternalOrTestUser hn Wi pn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing rn debug Er it getPageViewId captureTraceFeedback captureTraceMetric Ui".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_kRHjdwM9VEyxzCMGAeExR77ii2mzNDkzHim7v5DJij55', {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-05-30',
    person_profiles: 'identified_only'
  });
})();
