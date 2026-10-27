/* Comportamiento compartido de las páginas internas (blog, demo, gracias, privacidad, 404):
   barra que se aclara al dejar la banda oscura, panel de Asistencia y luz en las tarjetas. */
(function () {
  var top = document.getElementById('top');
  var head = document.querySelector('.page-head');
  if (top) {
    var ticking = false;
    var onScroll = function () {
      ticking = false;
      var limit = head ? head.offsetHeight - 72 : 0;
      top.classList.toggle('light', window.scrollY > limit);
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* Asistencia: se abre con el ícono y se cierra con Escape o tocando afuera */
  var helpBtn = document.querySelector('.help-btn'), helpPop = document.getElementById('helpPop');
  if (helpBtn && helpPop) {
    var set = function (open) { helpBtn.setAttribute('aria-expanded', open); helpPop.classList.toggle('open', open); };
    helpBtn.addEventListener('click', function (e) { e.stopPropagation(); set(!helpPop.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!helpPop.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && helpPop.classList.contains('open')) { set(false); helpBtn.focus(); } });
  }

  /* Luz que sigue al mouse en las tarjetas del blog */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.post-card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var b = c.getBoundingClientRect();
        c.style.setProperty('--x', (e.clientX - b.left) + 'px');
        c.style.setProperty('--y', (e.clientY - b.top) + 'px');
      });
    });
  }
})();
