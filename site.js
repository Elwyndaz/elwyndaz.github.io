/* orgutveckling.se - delad sidlogik. Meny, e-postskydd, inzoomning vid scroll. */
(function () {
  'use strict';

  /* Mobilmeny. Binds här och inte med onclick i HTML: inline-hanterare kräver
     'unsafe-inline' i CSP:n. check_csp.py vaktar att ingen smyger tillbaka. */
  var toggleMenu = function () {
    var nav = document.getElementById('mobileNav');
    var btn = document.querySelector('.menu-btn');
    if (!nav) return;
    var opening = !nav.classList.contains('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    if (btn) btn.setAttribute('aria-expanded', opening ? 'true' : 'false');
    /* Fokus följer menyn: in till stängknappen, tillbaka till menyknappen. */
    var close = nav.querySelector('.mobile-nav-close');
    if (opening && close) close.focus();
    else if (!opening && btn) btn.focus();
  };
  document.querySelectorAll('.menu-btn, .mobile-nav-close').forEach(function (b) {
    b.addEventListener('click', toggleMenu);
  });
  document.addEventListener('keydown', function (e) {
    var nav = document.getElementById('mobileNav');
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) toggleMenu();
  });

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
      /* Utan e-postklient (webbmejl) händer inget på mailto. Utkastet visas
         då här, färdigt att kopiera, så det besökaren skrev inte går förlorat. */
      var draft = document.getElementById('form-draft');
      if (draft) draft.value = 'Till: ' + addr + '\nÄmne: ' + subject + '\n\n' + body;
      var copyBtn = document.getElementById('form-copy');
      if (copyBtn) copyBtn.textContent = 'Kopiera utkastet'; /* nytt utkast är inte kopierat än */
      var done = document.getElementById('form-status');
      if (done) done.hidden = false;
    });
    var copy = document.getElementById('form-copy');
    if (copy) copy.addEventListener('click', function () {
      var draft = document.getElementById('form-draft');
      var ok = function () { copy.textContent = 'Kopierat'; };
      var manual = function () { draft.focus(); draft.select(); copy.textContent = 'Markerat, tryck Ctrl+C'; };
      if (navigator.clipboard) navigator.clipboard.writeText(draft.value).then(ok, manual);
      else manual();
    });
  }

  /* Chips: filter på listsidor, flervalsknappar i formuläret.
     kontakt.html?amne=excel förväljer ämnet, så länken från en kurssida sparar ett klick. */
  var amne = new URLSearchParams(window.location.search).get('amne');
  document.querySelectorAll('.chip[data-group]').forEach(function (chip) {
    if (amne && chip.getAttribute('data-group') === 'amne' && chip.getAttribute('data-value') === amne) {
      chip.setAttribute('aria-pressed', 'true');
    }
    chip.addEventListener('click', function () {
      chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });

  document.querySelectorAll('[data-filter-set]').forEach(function (set) {
    var targets = document.querySelectorAll(set.getAttribute('data-filter-set'));
    var chips = set.querySelectorAll('.chip');
    /* aria-pressed så att skärmläsare hör vilket filter som är valt. */
    var mark = function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.classList.contains('active') ? 'true' : 'false'); });
    };
    mark();
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        mark();
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
