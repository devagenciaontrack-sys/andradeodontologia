/* Andrade Odontologia — menu, sanfona, passos e animações. */
(function () {
  'use strict';

  var WHATS = '5511975851354';
  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── menu do celular ─────────── */

  var abrir = document.getElementById('abrir');
  var fecharBt = document.getElementById('fechar');
  var nav = document.getElementById('menu');
  var veu = document.getElementById('veu');

  function fechar () {
    if (!nav) return;
    nav.classList.remove('aberta');
    if (veu) veu.hidden = true;
    if (abrir) { abrir.setAttribute('aria-expanded', 'false'); abrir.focus() }
    document.body.style.overflow = '';
  }

  function alternar () {
    var abrindo = !nav.classList.contains('aberta');
    nav.classList.toggle('aberta', abrindo);
    if (veu) veu.hidden = !abrindo;
    abrir.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    document.body.style.overflow = abrindo ? 'hidden' : '';
    if (abrindo && fecharBt) fecharBt.focus();
  }

  if (abrir && nav) {
    abrir.addEventListener('click', function (e) { e.stopPropagation(); alternar() });
    if (fecharBt) fecharBt.addEventListener('click', fechar);
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechar) });
    if (veu) veu.addEventListener('click', fechar);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar() });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) fechar() });
  }

  /* ─────────── sanfona dos tratamentos ─────────── */
  /* Um aberto por vez: era isso que deixava a seção empilhada. */

  var sanfona = document.querySelector('.sanfona');
  if (sanfona) {
    var itens = [].slice.call(sanfona.querySelectorAll('details'));
    itens.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        itens.forEach(function (o) { if (o !== d) o.open = false });
      });
    });
  }

  /* ─────────── passos: o que está na tela acende ─────────── */

  var passos = [].slice.call(document.querySelectorAll('.passos li'));
  if (passos.length && 'IntersectionObserver' in window) {
    var obsPasso = new IntersectionObserver(function (itens) {
      itens.forEach(function (it) {
        it.target.classList.toggle('ativo', it.isIntersecting);
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    passos.forEach(function (li) { obsPasso.observe(li) });
  }

  /* ─────────── entrada ao rolar ─────────── */

  if (!parado && 'IntersectionObserver' in window) {
    var partes = [].slice.call(document.querySelectorAll(
      '.cabeca, .sanfona .trat, .passos li, .vaga, .dados, .formulario, .mapa, ' +
      '.rodape-grade > div, .faixa h2, .faixa .olho'
    ));
    // nada some antes de ser observado
    partes.forEach(function (el) { el.classList.add('entra') });

    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (it) {
        if (!it.isIntersecting) return;
        var el = it.target;
        var irmaos = el.parentElement ? [].slice.call(el.parentElement.children) : [];
        var ordem = Math.max(0, Math.min(irmaos.indexOf(el), 7));
        setTimeout(function () { el.classList.add('entrou') }, ordem * 75);
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    partes.forEach(function (el) { obs.observe(el) });

    // rede de segurança: se algo não for observado, aparece mesmo assim
    setTimeout(function () {
      partes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('entrou');
      });
    }, 1200);
  }

  /* ─────────── formulário → WhatsApp ─────────── */

  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nome = (d.get('nome') || '').toString().trim();
      var msg = (d.get('mensagem') || '').toString().trim();
      var linhas = ['Olá! Vim pelo site.'];
      if (nome) linhas.push('Meu nome é ' + nome + '.');
      if (msg) linhas.push(msg);
      window.open('https://wa.me/' + WHATS + '?text=' +
        encodeURIComponent(linhas.join(' ')), '_blank', 'noopener');
    });
  }

  /* ─────────── ano ─────────── */

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
