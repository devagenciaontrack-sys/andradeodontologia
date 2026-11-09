/* Andrade Odontologia — arcada desenhada, menu, sanfona, revelação. */
(function () {
  'use strict';

  var WHATS = '5511975851354';
  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── arcada do topo ─────────── */
  /* Desenhada por script para os dentes nascerem um a um ao carregar. */

  (function arcada () {
    var g = document.querySelector('.arc-dentes');
    if (!g) return;
    var N = 16, CX = 220, CY = 48, RX = 170, RY = 158;
    var perfil = [
      [30, 27], [29, 26], [28, 25], [24, 24], [22, 24], [20, 26],
      [16, 29], [15, 30], [15, 30], [16, 29], [20, 26], [22, 24],
      [24, 24], [28, 25], [29, 26], [30, 27],
    ];
    var frag = document.createDocumentFragment();
    for (var i = 0; i < N; i++) {
      var t = (i + 0.5) / N;
      var a = Math.PI + t * Math.PI;
      var x = CX + RX * Math.cos(a);
      var y = CY - RY * Math.sin(a);
      var giro = (Math.atan2(y - CY, (x - CX) * (RY / RX)) * 180) / Math.PI - 90;
      var w = perfil[i][0], h = perfil[i][1];

      var grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      grupo.setAttribute('transform',
        'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + giro.toFixed(1) + ')');
      var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', (-w / 2).toFixed(1));
      r.setAttribute('y', (-h / 2).toFixed(1));
      r.setAttribute('width', w);
      r.setAttribute('height', h);
      r.setAttribute('rx', (Math.min(w, h) * 0.36).toFixed(1));
      if (!parado) r.style.animationDelay = (420 + i * 55) + 'ms';
      else r.style.opacity = 1;
      grupo.appendChild(r);
      frag.appendChild(grupo);
    }
    g.appendChild(frag);
  })();

  /* ─────────── menu do celular ─────────── */

  var hamb = document.getElementById('hamb');
  var nav = document.getElementById('nav');
  var navX = document.getElementById('nav-x');
  var veu = document.getElementById('veu');

  function fechar () {
    if (!nav) return;
    nav.classList.remove('aberto');
    if (veu) veu.hidden = true;
    if (hamb) { hamb.setAttribute('aria-expanded', 'false'); hamb.focus() }
    document.body.style.overflow = '';
  }

  if (hamb && nav) {
    hamb.addEventListener('click', function (e) {
      e.stopPropagation();
      var abrindo = !nav.classList.contains('aberto');
      nav.classList.toggle('aberto', abrindo);
      if (veu) veu.hidden = !abrindo;
      hamb.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
      document.body.style.overflow = abrindo ? 'hidden' : '';
      if (abrindo && navX) navX.focus();
    });
    if (navX) navX.addEventListener('click', fechar);
    if (veu) veu.addEventListener('click', fechar);
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechar) });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar() });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) fechar() });
  }

  /* ─────────── sanfonas: um aberto por vez ─────────── */

  document.querySelectorAll('.sanfona').forEach(function (bloco) {
    var itens = [].slice.call(bloco.querySelectorAll('details'));
    itens.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        itens.forEach(function (o) { if (o !== d) o.open = false });
      });
    });
  });

  /* ─────────── período preferido ─────────── */

  var periodo = 'Manhã';
  document.querySelectorAll('.chips button').forEach(function (b) {
    b.addEventListener('click', function () {
      periodo = b.getAttribute('data-p');
      document.querySelectorAll('.chips button').forEach(function (o) {
        var on = o === b;
        o.classList.toggle('on', on);
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  });

  /* ─────────── formulário → WhatsApp ─────────── */
  /* Site estático: não há servidor. A mensagem vai pronta. */

  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nome = (d.get('nome') || '').toString().trim();
      var msg = (d.get('msg') || '').toString().trim();
      var l = ['Olá! Vim pelo site.'];
      if (nome) l.push('Meu nome é ' + nome + '.');
      if (msg) l.push(msg);
      l.push('Prefiro no período da ' + periodo.toLowerCase() + '.');
      window.open('https://wa.me/' + WHATS + '?text=' +
        encodeURIComponent(l.join(' ')), '_blank', 'noopener');
    });
  }

  /* ─────────── revelação ao rolar ─────────── */

  var revs = [].slice.call(document.querySelectorAll('.rev'));
  if (parado || !('IntersectionObserver' in window)) {
    revs.forEach(function (el) { el.classList.add('vis') });
  } else {
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (it) {
        if (!it.isIntersecting) return;
        it.target.classList.add('vis');
        obs.unobserve(it.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revs.forEach(function (el) { obs.observe(el) });
    // rede de segurança: nada fica invisível se o observador falhar
    setTimeout(function () {
      revs.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('vis');
      });
    }, 1400);
  }

  /* ─────────── ano ─────────── */

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
