/* Comportamento: menu do celular e formulário → WhatsApp. */
(function () {
  'use strict';

  var WHATS = '5511975851354';

  /* ─────────── menu do celular ─────────── */

  var botao = document.getElementById('hamburguer');
  var menu = document.getElementById('menu');

  function fechar () {
    if (!menu) return;
    menu.classList.remove('aberto');
    if (botao) botao.setAttribute('aria-expanded', 'false');
  }

  if (botao && menu) {
    botao.addEventListener('click', function (e) {
      e.stopPropagation();
      var abrindo = !menu.classList.contains('aberto');
      menu.classList.toggle('aberto', abrindo);
      botao.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', fechar);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fechar();
    });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !botao.contains(e.target)) fechar();
    });
  }

  /* ─────────── formulário → WhatsApp ─────────── */
  /* O site é estático: não existe servidor para receber o envio.
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

  /* ─────────── ano do rodapé ─────────── */

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
