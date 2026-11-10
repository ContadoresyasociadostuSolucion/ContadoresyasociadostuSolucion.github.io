(function () {
  'use strict';

  var TELEFONO = '573172767653';

  // Enlaces antiguos de una sola página (#servicios, #contacto...) llevan a su página nueva
  var paginas = { servicios: 1, equipo: 1, aplicaciones: 1, publicaciones: 1, contacto: 1 };
  var ancla = location.hash.slice(1);
  if (paginas[ancla] && !document.getElementById(ancla)) {
    location.replace(ancla + '.html');
    return;
  }

  // Menú en celular
  var boton = document.querySelector('.menu-boton');
  var menu = document.getElementById('menu');

  function alternarMenu(abrir) {
    menu.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    boton.querySelector('.sr').textContent = abrir ? 'Cerrar menú' : 'Abrir menú';
  }

  if (boton && menu) {
    boton.addEventListener('click', function () {
      alternarMenu(!menu.classList.contains('abierto'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') alternarMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') alternarMenu(false);
    });
  }

  // Formulario de contacto: preselecciona el servicio que viene en el enlace y abre WhatsApp
  var formulario = document.getElementById('formulario');
  if (formulario) {
    var pedido = new URLSearchParams(location.search).get('servicio');
    if (pedido) {
      for (var i = 0; i < formulario.servicio.options.length; i++) {
        if (formulario.servicio.options[i].text === pedido) formulario.servicio.selectedIndex = i;
      }
    }
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      var texto = 'Hola, soy ' + formulario.nombre.value.trim() + '.\n' +
        'Servicio: ' + formulario.servicio.value + '\n\n' +
        formulario.mensaje.value.trim();
      window.open('https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }

  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  // Aparición suave al desplazarse
  var elementos = document.querySelectorAll('.revelar');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px' });
  elementos.forEach(function (el) { observador.observe(el); });
})();
