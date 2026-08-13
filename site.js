/* orgutveckling.se - delad sidlogik. Meny, e-postskydd, inzoomning vid scroll. */
(function () {
  'use strict';

  /* Mobilmeny */
  window.toggleMenu = function () {
    var nav = document.getElementById('mobileNav');
    var btn = document.querySelector('.menu-btn');
    if (!nav) return;
    var opening = !nav.classList.contains('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    if (btn) btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
  };

  /* E-postadressen sätts ihop i JS så den inte står i klartext i källkoden. */
  var u = 'kontakt', d = 'orgutveckling.se', addr = u + '@' + d;
  var mailto = function (extra) { return 'mai' + 'lto:' + addr + (extra || ''); };

  document.querySelectorAll('[data-email]').forEach(function (el) {
    var a = document.createElement('a');
    a.href = mailto();
    a.textContent = addr;
    a.className = el.getAttribute('data-email') || '';
    if (!a.className) a.style.color = 'inherit';
    el.appendChild(a);
  });
  document.querySelectorAll('[data-mailto]').forEach(function (a) { a.href = mailto(); });

  /* Förfrågningsformuläret har ingen backend. Det öppnar e-postklienten
     med ett färdigt utkast, och skickas alltså av besökaren själv. */
  var form = document.getElementById('forfragan');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = function (n) { var f = form.elements[n]; return f ? f.value.trim() : ''; };
      var picked = function (g) {
        return Array.prototype.slice.call(form.querySelectorAll('.chip[data-group="' + g + '"][aria-pressed="true"]'))
          .map(function (c) { return c.textContent.trim(); }).join(', ');
      };
      var rows = [
        ['Organisation', val('organisation')],
        ['Kontaktperson', val('kontaktperson')],
        ['E-post', val('epost')],
        ['Telefon', val('telefon')],
        ['Ämne', picked('amne')],
        ['Format', picked('format')],
        ['Mål med utbildningen', val('mal')]
      ].filter(function (r) { return r[1]; });
      var body = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n');
      var subject = 'Förfrågan' + (val('organisation') ? ' från ' + val('organisation') : '');
      window.location.href = mailto('?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));
      var done = document.getElementById('form-status');
      if (done) done.hidden = false;
    });
  }

  /* Chips: filter på listsidor, flervalsknappar i formuläret. */
  document.querySelectorAll('.chip[data-group]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });

  document.querySelectorAll('[data-filter-set]').forEach(function (set) {
    var targets = document.querySelectorAll(set.getAttribute('data-filter-set'));
    set.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        set.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var want = chip.getAttribute('data-value');
        targets.forEach(function (t) {
          t.classList.toggle('hidden', want !== 'all' && t.getAttribute('data-cat') !== want);
        });
      });
    });
  });

  /* Sektioner tonar in en gång vid scroll. Av på mobil och vid reducerad rörelse. */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && window.innerWidth > 780 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) { el.classList.add('pre'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); }
      });
    }, { threshold: .15 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
