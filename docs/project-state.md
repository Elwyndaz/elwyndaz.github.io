# Projektstatus – orgutveckling.se

> **Syfte med denna fil**: snabb kontext för en ny/framtida Claude-session.
> Läs denna + `CONTEXT.md` (arkitektur och regler) + `BACKLOG.md` (planerat
> arbete) tillsammans. Detaljerad historik över enskilda fixar: `git log`, inte
> här – den här filen beskriver nuläget, inte hur vi kom hit.

---

## Om projektet

- **Vad**: Webbplats för Centrum för Organisations-Utveckling (COU) i Umeå.
  Excel-utbildning, BAM-utbildning (Bättre Arbetsmiljö), ledarskapsutbildning
  och organisationsutveckling.
- **Hosting**: GitHub Pages, domän `orgutveckling.se` (se `CNAME`). Domänen
  är registrerad hos **Strato.se**, DNS/proxy sköts av **Cloudflare** (behövs
  för att peka apex-domänen mot GitHub Pages, och ger gratis CDN och SSL på
  köpet). Cloudflare-kontot ligger utanför repot.
- **Publicering**: push till `main`. Jekyll körs automatiskt av GitHub Pages
  för bloggdelen. De statiska sidorna behöver inget byggsteg.
- **Kontakt**: kontakt@orgutveckling.se, 072-221 13 37.

---

## Sidor

| Fil | URL | Roll |
| --- | --- | --- |
| `index.html` | `/` | Startsida: hero, bevisremsa, utbildningsregister, mörkt statement, process, citat, kunskap, FAQ, CTA |
| `utbildningar.html` | `/utbildningar.html` | Register över de fyra programmen |
| `excel-utbildning-umea.html` | samma | Landningssida, SEO-fras i H1 |
| `bam-utbildning-umea.html` | samma | Landningssida, plus spalten Regler och underlag |
| `ledarskapsutbildning-umea.html` | samma | Landningssida |
| `artiklar.html` | `/artiklar/` | Kunskap: Jekyll-loop över `site.posts` plus vägar till Läslistan och Länktips |
| `_layouts/artikel.html` | `/ÅÅÅÅ/MM/DD/slug.html` | Artikelmall |
| `case.html` | `/case.html` | Utvärderingar. Inte i navigationen, men länkad från flera sidor |
| `om-oss.html` | `/om-oss.html` | Ny sida, byggd runt en person |
| `kontakt.html` | `/kontakt.html` | Förfrågningsformulär med chips, mailto-baserat |
| `lasning.html` | `/lasning.html` | Läslistan, 48 titlar |
| `lanktips.html` | `/lanktips.html` | 19 källor |
| `tack.html` | `/tack.html` | Tacksida, mörk, `noindex` |
| `404.html` | `/404.html` | Tre vägar vidare i registerform, `noindex` |
| `cv.html` | `/cv.html` | **Utanför arkitekturen.** Ingen nav, `noindex, nofollow`, inte i sitemap. Egen CSS och eget e-postskript, riktat till en PTP-handledare. Utskrivbart dokument i en spalt |
| `2025/05/23/...html` | samma | Vidarebefordran för en gammal artikel-URL som låg indexerad och svarade 404 |

---

## Nuvarande status (2026-08-12)

- **Redesignen är genomförd.** Hela sajten är omgjord från kortbaserad layout
  till registerlayout enligt `HANDOFF-REDESIGN.md`. Paletten är utbytt, den
  gamla `.cou-mark`-loggan är ersatt av ordmärket `ORG / UTVECKLING`, och
  navigationen är fyra poster i stället för sex.
- **Designsystemet ligger i `/style.css`**, sidlogiken i `/site.js`. Båda
  länkas av samtliga sidor utom `cv.html`.
- Två nya sidor (`om-oss.html`, `tack.html`) plus `404.html`. `om-oss.html` är
  tillagd i `sitemap.xml`; tack och 404 är `noindex` och står medvetet utanför.
- Strukturerad data följer med: `LocalBusiness` och `FAQPage` på startsidan,
  `Course` + `FAQPage` + `BreadcrumbList` på landningssidorna, `ItemList` på
  utbildningsöversikten, `Course`/`Review` på `case.html`, `AboutPage`/`Person`
  på Om oss, `Blog` på Kunskap, `Article` på artiklarna.
- Verifierat i webbläsare på 1440 px och 390 px: inga brutna interna länkar,
  exakt ett `<h1>` per sida, ingen horisontell scroll, inga konsolfel,
  förfrågningsformuläret bygger rätt mailto.
- **Jekyll går att bygga lokalt sedan 2026-08-13.** Ruby 3.3 och Jekyll 4.4 är
  installerade, `C:\Ruby33-x64\bin` ligger i user-PATH. Kör
  `jekyll build --destination _site` före varje push. Bygget är verifierat:
  `/artiklar/` och alla sju artikel-URL:er genereras, ingen oredigerad Liquid
  finns kvar och all JSON-LD i hela bygget är giltig.
- **Designunderlaget exkluderat.** Mappen `Webbanalys och strategi/` låg i
  reporoten och kopierades av Jekyll rakt in i bygget, alltså hade den
  publicerats på orgutveckling.se. Nu gitignorerad och listad under `exclude:`
  i `_config.yml`.
- **Åtta artiklar publicerade**, senast "Psykologisk trygghet i arbetsgrupper"
  2026-08-13.
- **`cv.html` ombyggd 2026-08-13** enligt eget designunderlag. Register med årtal
  i egen kolumn, print-CSS, ingen navigation. Fortfarande utanför sitemap och
  index.
- Google Search Console-data hämtas via MCP-servern `gsc`. Fråga efter data
  i stället för att gissa. **Facit 2026-08-13:** första klicket någonsin (18 juli,
  till startsidan, snittposition 4,9), 78 visningar mot 60 föregående period.
  `ledarskapsutbildning umeå` är den största frågan med 22 visningar på position
  21,8, medan Excel och BAM ger i princip noll. Slutsatsen att huvudnyckelorden
  saknar sökvolym gäller alltså inte ledarskap. Fullständig genomgång i
  `BACKLOG.md` under "SEO-läget".

---

## Nästa steg

1. **Backlink-arbete, prio 1, fortfarande inte påbörjat.** Redesignen ändrar
   inte grundproblemet: sajten är indexerad men saknar auktoritet, och de tänkta
   huvudnyckelorden har nästan ingen sökvolym. Backlinks är den enda åtgärd som
   är strukturellt säker att hjälpa. Se `BACKLOG.md` för vad som redan är
   testat och avskrivet.
2. **Efter push**: verifiera att Jekyll-delen byggde, och begär omindexering i
   Search Console. Alla titlar, meta-beskrivningar och H1 är omskrivna.
3. **Öppna beslut och saknat innehåll** ligger i `BACKLOG.md` under "Kvar från
   redesignen": porträttet till Om oss, bokkommentarerna, om Läslistan och
   Länktips ska slås ihop, och om innehållslistorna 01–05 stämmer.
4. Skriv nästa artikel i serien, se `BACKLOG.md`.

---

## Fällor att känna till

- **Liquid fungerar inte i de statiska sidorna** – de saknar frontmatter.
  Copyright-året i footern måste därför bumpas för hand.
- **Navigationsordningen måste vara identisk på alla sidor.** Den har orsakat
  buggar förut. Ordningen är Utbildningar, Kunskap, Om oss, Kontakt, plus
  knappen Begär förslag.
- **`cv.html` ska aldrig synkas in** i nav, sitemap, palett eller
  copyright-årsbump.
- **Sitemap-permalinks**: Jekyll använder frontmatterns `date`, inte filnamnet.
  Kontrollerat 2026-08-12: alla sju artiklar har `date` som matchar filnamnet.
- **`.main-nav a` slår `.btn-nav` på specificitet.** Därför heter regeln
  `.main-nav a.btn-nav` i `style.css`. Sänk den inte, då blir CTA-knappen svart
  text på svart yta.
- **Rutnätsceller med skiljelinje behöver padding på båda sidor.** En enda
  `padding`-regel för alla celler ger 0 i vänsterpadding, så texten hamnar kloss
  mot linjen från cell 2 och framåt. Gäller `.col-cell`, `.kunskap-card`,
  `.fact-cell` och `.stat-cell`.
- **`.eyebrow` måste ha `max-width:none`.** Annars ärver den `p { max-width:68ch }`
  och bryts på två rader.
- **Filer i reporoten publiceras.** Allt som inte är gitignorerat eller listat
  under `exclude:` i `_config.yml` hamnar på den publika sajten.

---

*Senast uppdaterad: 2026-08-12*
