(function () {
  'use strict';

  var TELEFONO = '573172767653';

  // Menú en celular
  var boton = document.querySelector('.menu-boton');
  var menu = document.getElementById('menu');

  function alternarMenu(abrir) {
    menu.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    boton.querySelector('.sr').textContent = abrir ? 'Cerrar menú' : 'Abrir menú';
  }

  boton.addEventListener('click', function () {
    alternarMenu(!menu.classList.contains('abierto'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') alternarMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') alternarMenu(false);
  });

  // Enlaces que preseleccionan un servicio en el formulario
  var selector = document.getElementById('servicio');
  document.querySelectorAll('[data-servicio]').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      selector.value = enlace.dataset.servicio;
    });
  });

  // El formulario arma el mensaje y lo abre en WhatsApp
  document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var texto = 'Hola, soy ' + f.nombre.value.trim() + '.\n' +
      'Servicio: ' + f.servicio.value + '\n\n' +
      f.mensaje.value.trim();
    window.open('https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  });

  document.getElementById('anio').textContent = new Date().getFullYear();

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
