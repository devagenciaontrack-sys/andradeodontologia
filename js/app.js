/* Andrade Odontologia — comportamento.
   A arcada é o seletor: escolher uma região acende os dentes
   correspondentes e filtra os tratamentos. Sem script, os dez
   tratamentos aparecem todos, que é o conteúdo completo. */
(function () {
  'use strict';

  var WHATS = '5511975851354';

  /* ─────────── menu do celular ─────────── */

  var abrir = document.getElementById('abrir-menu');
  var nav = document.getElementById('menu');

  function fecharMenu () {
    if (!nav) return;
    nav.classList.remove('aberta');
    if (abrir) abrir.setAttribute('aria-expanded', 'false');
  }

  if (abrir && nav) {
    abrir.addEventListener('click', function (e) {
      e.stopPropagation();
      var abrindo = !nav.classList.contains('aberta');
      nav.classList.toggle('aberta', abrindo);
      abrir.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', fecharMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !abrir.contains(e.target)) fecharMenu();
    });
  }

  /* ─────────── a arcada ─────────── */

  var svg = document.querySelector('.arcada');
  var painel = document.getElementById('tratamentos');
  var dica = document.getElementById('arcada-dica');
  var botoes = [].slice.call(document.querySelectorAll('.zonas button'));

  // que parte do desenho acende para cada região
  var ACENDE = {
    toda:    function (el) { return el.classList.contains('dente') },
    frente:  function (el) { return el.dataset.zona === 'frente' },
    fundo:   function (el) { return el.dataset.zona === 'fundo' },
    gengiva: function (el) { return el.classList.contains('gengiva') },
    falta:   function (el) { return el.dataset.i === '6' || el.dataset.i === '9' },
    crianca: function (el) { return el.dataset.zona === 'frente' },
    rosto:   function () { return false },
  };

  var ROTULO = {
    toda: 'Região selecionada: a arcada inteira',
    frente: 'Região selecionada: os dentes da frente',
    fundo: 'Região selecionada: os dentes do fundo',
    gengiva: 'Região selecionada: a gengiva',
    falta: 'Região selecionada: o espaço de um dente perdido',
    crianca: 'Região selecionada: a boca da criança',
    rosto: 'Região selecionada: o rosto, além da arcada',
  };

  var alvos = svg
    ? [].slice.call(svg.querySelectorAll('.dente, .gengiva'))
    : [];

  function escolher (zona) {
    var teste = ACENDE[zona] || ACENDE.toda;

    alvos.forEach(function (el) {
      el.classList.toggle('aceso', !!teste(el));
    });

    if (painel) {
      [].slice.call(painel.children).forEach(function (art) {
        var lista = (art.getAttribute('data-zonas') || '').split(/\s+/);
        art.hidden = lista.indexOf(zona) === -1;
      });
    }

    botoes.forEach(function (b) {
      var on = b.getAttribute('data-alvo') === zona;
      b.classList.toggle('zona-ativa', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (dica) dica.textContent = ROTULO[zona] || ROTULO.toda;
  }

  botoes.forEach(function (b) {
    b.addEventListener('click', function () { escolher(b.getAttribute('data-alvo')) });
  });

  // tocar no próprio desenho também escolhe
  alvos.forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.classList.contains('gengiva')) return escolher('gengiva');
      escolher(el.dataset.zona === 'frente' ? 'frente' : 'fundo');
    });
  });

  if (svg && painel) escolher('toda');

  /* ─────────── entrada das seções ─────────── */

  var parado = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!parado && 'IntersectionObserver' in window) {
    var partes = document.querySelectorAll(
      '.secao h2, .arcada-cabeca p, .texto, .arcada-desenho, .zonas, ' +
      '.tratamentos, .arquivo, .passos li, .vaga, .dados, .formulario, ' +
      '.campo-frase, .campo-nota, .rodape-nome'
    );
    partes.forEach(function (el) { el.classList.add('entra') });

    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (it, i) {
        if (!it.isIntersecting) return;
        var el = it.target;
        setTimeout(function () { el.classList.add('entrou') }, i * 70);
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    partes.forEach(function (el) { obs.observe(el) });
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
