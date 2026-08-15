// Kollar att ingen sida blir bredare an skarmen i mobilvy.
//
// Varfor: en statisk sajt har ingen kompilator. Den 15 augusti 2026 lag
// startsidan och kontaktsidan och sprack at hoger i mobilvy utan att nagot
// verktyg sa till. Orsaken var i bada fallen att ett rutnat med fast
// pixelspalt inte kunde krympa: inline-style slog ut mediefragan, och
// grid-celler kan inte ga under sitt innehalls minsta bredd.
//
// Kor:  node check_layout.js
// Krav: playwright (npm i -g playwright). Skriptet startar sin egen server.
// Ger:  ett verdict och exit 1 vid fel, aldrig en logg att ogonmata.

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 8791;
const WIDTHS = [320, 375, 430, 768];
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };

function loadPlaywright() {
  for (const p of ['playwright',
    path.join(process.env.APPDATA || '', 'npm/node_modules/playwright')]) {
    try { return require(p); } catch (_) {}
  }
  console.error('playwright saknas. Installera med: npm i -g playwright');
  process.exit(2);
}

const server = http.createServer((req, res) => {
  const file = path.resolve(ROOT, '.' + decodeURIComponent(req.url.split('?')[0]));
  // Servern har repot som rot och C:\dev ovanfor sig, dar det ligger hemligheter
  // i flera mappar. Utan den har spanningen racker ett ".." i URL:en for att
  // lasa dem. Servern lyssnar dessutom bara pa loopback, se listen() nedan.
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
    res.writeHead(403); return res.end();
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

(async () => {
  const { chromium } = loadPlaywright();
  // Bara sidor i roten: _site ar byggutdata och Webbanalys ar designkompar.
  const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  await new Promise(r => server.listen(PORT, '127.0.0.1', r)); // aldrig ut pa natverket
  const browser = await chromium.launch();
  const fails = [];

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const file of pages) {
      await page.goto(`http://localhost:${PORT}/${file}`, { waitUntil: 'load' });
      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const over = [...document.querySelectorAll('body *')]
          .filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > vw + 1; })
          .filter(e => !e.closest('.chips')); // avsiktlig scrollremsa
        return { sw: document.documentElement.scrollWidth, vw,
          first: over[0] ? over[0].tagName + '.' + over[0].className : '(text, inte box)' };
      });
      if (r.sw > r.vw + 1) fails.push(`  ${width}px ${file}: sidbredd ${r.sw} > skarm ${r.vw}, forsta: ${r.first}`);
    }
    await page.close();
  }

  await browser.close();
  server.close();

  if (fails.length) {
    console.log(`FEL horisontellt overflow pa ${fails.length} sida/bredd-kombinationer:\n${fails.join('\n')}`);
    process.exit(1);
  }
  console.log(`OK inget overflow: ${pages.length} sidor x ${WIDTHS.length} bredder (${WIDTHS.join(', ')} px)`);
})();
