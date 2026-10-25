/* Del Pensar al Hacer · interacciones del portfolio */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Frase "Del aprendizaje a la acción" escribiéndose sobre el arco */
  var SVGNS = 'http://www.w3.org/2000/svg';
  var path = document.getElementById('frasePath');
  var bf = document.getElementById('fraseBf');
  if (path && bf) {
    var frase = 'Del aprendizaje a la acción';
    var corte = 'Del aprendizaje '.length; // "a la acción" en oliva
    var letras = [];
    for (var i = 0; i < frase.length; i++) {
      var t = document.createElementNS(SVGNS, 'tspan');
      t.textContent = frase[i] === ' ' ? ' ' : frase[i];
      if (i >= corte) t.setAttribute('class', 'olv');
      t.style.opacity = '0';
      path.appendChild(t);
      letras.push(t);
    }
    var textEl = path.parentNode;
    function ubicarMariposa() {
      try {
        var n = textEl.getNumberOfChars();
        var p = textEl.getEndPositionOfChar(n - 1);
        bf.setAttribute('x', p.x + 6);
        bf.setAttribute('y', p.y - 14);
      } catch (e) {}
    }
    function mostrar(n) {
      for (var j = 0; j < letras.length; j++) letras[j].style.opacity = j < n ? '1' : '0';
      bf.setAttribute('opacity', n >= letras.length ? '1' : '0');
    }
    if (reduce) {
      mostrar(letras.length);
      ubicarMariposa();
    } else {
      var n = 0, dir = 1;
      var tick = function () {
        n += dir;
        mostrar(n);
        var espera = 85;
        if (n >= letras.length) { dir = -1; espera = 2600; }
        else if (n <= 0) { dir = 1; espera = 700; }
        else if (dir < 0) espera = 35;
        setTimeout(tick, espera);
      };
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
        ubicarMariposa();
        setTimeout(tick, 500);
      });
    }
  }

  /* 2. Banda: duplicar contenido para un bucle continuo */
  document.querySelectorAll('.banda-track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
    Array.prototype.slice.call(track.children, track.children.length / 2).forEach(function (el) {
      el.setAttribute('aria-hidden', 'true');
    });
  });

  /* 3. Carrusel de mensajes: puntos + "Leer completo" */
  var car = document.getElementById('carrusel');
  var dots = document.getElementById('dots');
  if (car && dots) {
    var cards = car.querySelectorAll('.msg');
    cards.forEach(function () { dots.appendChild(document.createElement('span')); });
    var marcar = function () {
      var w = cards[0].getBoundingClientRect().width + 12;
      var idx = Math.round(car.scrollLeft / w);
      if (car.scrollLeft + car.clientWidth >= car.scrollWidth - 4) idx = cards.length - 1;
      dots.querySelectorAll('span').forEach(function (d, k) { d.classList.toggle('on', k === idx); });
    };
    car.addEventListener('scroll', function () { window.requestAnimationFrame(marcar); }, { passive: true });
    marcar();
    var revisar = function () {
      cards.forEach(function (c) {
        var body = c.querySelector('.msg-body');
        c.classList.toggle('desborda', body.offsetTop + body.scrollHeight > c.clientHeight - 16);
      });
    };
    revisar();
    window.addEventListener('resize', revisar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(revisar);

    /* 4. Pop-up con fondo difuminado */
    var lb = document.getElementById('lightbox');
    var lbCard = document.getElementById('lightboxCard');
    var ultimo = null;
    var abrir = function (c) {
      ultimo = c;
      lbCard.innerHTML = c.querySelector('.msg-head').outerHTML + c.querySelector('.msg-body').outerHTML;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () { lb.classList.add('abierto'); });
    };
    var cerrar = function () {
      lb.classList.remove('abierto');
      document.body.style.overflow = '';
      setTimeout(function () { lb.hidden = true; }, 250);
      if (ultimo) ultimo.focus();
    };
    cards.forEach(function (c) { c.addEventListener('click', function () { abrir(c); }); });
    lb.addEventListener('click', cerrar);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) cerrar(); });
  }

  /* 5. Aparición al hacer scroll */
  var rev = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add('visible'); });
  }

  /* 6. Botón volver arriba */
  var top = document.getElementById('totop');
  var onScroll = function () { top.classList.toggle('visible', window.scrollY > 600); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  top.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
})();
