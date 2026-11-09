/* Andrade Odontologia — menu do celular e formulário. */
(function () {
  'use strict';

  var WHATS = '5511975851354';

  /* ─────────── menu do celular ─────────── */

  var abrir = document.getElementById('abrir');
  var nav = document.getElementById('menu');
  var veu = document.getElementById('veu');

  function fechar () {
    if (!nav) return;
    nav.classList.remove('aberta');
    if (veu) veu.hidden = true;
    if (abrir) abrir.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function alternar () {
    var abrindo = !nav.classList.contains('aberta');
    nav.classList.toggle('aberta', abrindo);
    if (veu) veu.hidden = !abrindo;
    abrir.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    // trava a rolagem do fundo enquanto o menu está aberto
    document.body.style.overflow = abrindo ? 'hidden' : '';
  }

  if (abrir && nav) {
    abrir.addEventListener('click', function (e) { e.stopPropagation(); alternar() });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', fechar);
    });
    if (veu) veu.addEventListener('click', fechar);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fechar();
    });
    // ao voltar para a largura grande, o menu não pode ficar preso
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) fechar();
    });
  }

  /* ─────────── formulário → WhatsApp ─────────── */
  /* Site estático: não há servidor para receber o envio.
     Montamos a mensagem e entregamos pronta no WhatsApp. */

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

  /* ─────────── entrada discreta das seções ─────────── */

  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!parado && 'IntersectionObserver' in window) {
    var partes = document.querySelectorAll(
      '.cabeca, .lista-trat li, .passos li, .vaga, .dados, .formulario, .mapa, .capa-arco'
    );
    partes.forEach(function (el) { el.classList.add('entra') });
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (it, i) {
        if (!it.isIntersecting) return;
        var el = it.target;
        setTimeout(function () { el.classList.add('entrou') }, i * 60);
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    partes.forEach(function (el) { obs.observe(el) });
  }

  /* ─────────── ano ─────────── */

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
