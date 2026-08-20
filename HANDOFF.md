---
schemaVersion: 1
status: active
currentGoal: Göra orgutveckling.se synlig i lokal sökning i Umeå
nextAction: Begär omindexering i Search Console för excel-utbildning-umea.html och ledarskapsutbildning-umea.html. Därefter backlink- och lokalauktoritetsarbete med LinkedIn-delning av artiklar och kontakt med lokala nätverk.
blockers: []
reviewedAt: 2026-08-20
---

# Handoff: orgutveckling.se

## Läget

Sajten är live på `https://orgutveckling.se/` och tekniskt i ordning: 20 indexerade URL:er i sitemapen, alla med status PASS.

Google Keyword Planner bevisade den 20 augusti att sökvolymen för **`excelkurs umeå`** är **10–100** sökningar/månad (exakt samma som `ledarskapsutbildning umeå`), medan `excelutbildning` gav 0–10. Marknaden för Excel är stark både lokalt och nationellt (`excelkurs online` 1 000–10 000 sök/mån, `excelkurs för ekonomer` med bud upp till 108 kr/klick).

## Recent work

**2026-08-20: Excelsidan on-page optimerad och ny artikel om AI/Copilot i Excel publicerad.**

- Google Keyword Planner körd: sökvolymen bekräftades på ordet `kurs` snarare än `utbildning`.
- `excel-utbildning-umea.html` uppdaterad i title, meta description, H1, ingress och sektioner för att naturligt fånga `excelkurs umeå`, `grundkurs i excel`, `excel för ekonomer` och `excel för självlärda`.
- Ny artikel: `_posts/2026-08-20-ai-och-copilot-i-excel.md` ("AI och Copilot i Excel: vad fungerar, vad är en gimmick och vad behöver du kunna själv?"). Innehåller reella use cases, tre fallgropar, extern länk till Kenji Explains, brygga till `buildapp.se` och internlänk till excelkursen.
- Strukturerad data uppdaterad (`Course` och `BreadcrumbList`).
- Kontroller gröna: `python check_faq.py` (0 avvikelser), `node check_layout.js` (0 overflow på 320–768 px), Playwright-rendering PASS.

**2026-08-12: hela sajten redesignad** enligt `HANDOFF-REDESIGN.md`.

- Kortbaserad layout ersatt av registerlayout: hårfina linjer, numrerade rader,
  metadata i monospace, radie 0, inga cards. Ett mörkt statement per sida.
- Paletten helt utbytt. Grafit, Petrol och Lera utgår. Nya värden i `style.css`.
- Ordmärket `ORG / UTVECKLING` ersätter den gamla `.cou-mark`-loggan.
- Navigationen är nu Utbildningar, Kunskap, Om oss, Kontakt. Artiklar, lästips
  och länktips samlas under Kunskap. "Utvärderingar" är borta ur navigationen men
  `case.html` lever kvar som destination.
- Designsystemet flyttat till en delad `/style.css`, sidlogiken till `/site.js`.
  Slut på att synka tio inbyggda `<style>`-block för hand.
- Nya sidor: `om-oss.html`, `tack.html`, `404.html`.
- `kontakt.html` har fått ett riktigt förfrågningsformulär med chips för ämne och
  format. Det har ingen backend utan bygger en mailto.
- Strukturerad data utökad och följer med till samtliga nya sidor.
- `CONTEXT.md`, `docs/project-state.md`, `sitemap.xml` och `BACKLOG.md`
  uppdaterade i samma pass.

**2026-08-13, samma leverans:**

- Ruby 3.3 och Jekyll 4.4 installerade, så bygget kan verifieras lokalt.
- `cv.html` ombyggd enligt eget designunderlag, med print-CSS.
- Ny artikel: "Psykologisk trygghet i arbetsgrupper" (åttonde totalt).
- Död indexerad URL `/2025/05/23/excel-funktioner-som-sparar-tid.html` rättad med
  canonical och vidarebefordran.
- Designunderlaget exkluderat ur bygget, det hade annars publicerats.

**2026-08-15: Excelsidan lagd om till hopskrivet sökord, plus en mäträttelse.**

- **Rättelse:** påståendet att sajten fått noll klick, och att första klicket kom
  18 juli, var fel. Sajten har **15 klick på 90 dagar**. Frågedimensionen i GSC
  anonymiserar sällsynta sökningar, så frågetabellen summerar till 0. Mät på sida
  eller datum, och på 90 dagar. Se `BACKLOG.md` under "SEO-läget 2026-08-13".
- Excelsidan använde `excel-utbildning` med bindestreck genomgående och den
  hopskrivna formen aldrig. Nu omlagd i title, h1, meta, brödtext, FAQ och all
  strukturerad data, plus `excelkurs` som andra sökform. Hela underlaget och
  mätplanen ligger i `BACKLOG.md` under "Excel-hypotesen".
- **BAM-sidan lämnas medvetet oförändrad som kontrollgrupp.** Rör inte den utan
  att först läsa av mätningen, annars går jämförelsen förlorad.
- **Ny bugg hittad och rättad:** BAM-sidans `FAQPage`-schema saknade en mening
  som stod i den synliga texten. Google kräver att de matchar. `check_faq.py`
  lades till i repot och ska köras efter varje `jekyll build`.

**2026-08-15, samma dag: mobilvyn var trasig på två sidor.**

- Startsidan var **592 px bred på en 375 px skärm**, kontaktsidan 743 px.
  Grundorsaken på startsidan och `om-oss.html` var densamma: rutnätet låg som
  inline-`style` i HTML:en och vann därmed över mediefrågan vid 780 px, så
  högerspalten stod kvar på fast pixelbredd. Se regeln i `CONTEXT.md`.
- Kontaktsidan föll på att `<fieldset>` har `min-inline-size:min-content` inbyggt
  i webbläsaren och att chip-raden är en nowrap-flexrad på 686 px.
- Sidfoten sprack på 320 px eftersom `kontakt@orgutveckling.se` satte 155 px
  minsta kolumnbredd. Rubriker fick `overflow-wrap:break-word`, svenska
  sammansättningar som "Ledarskapsutbildning" får inte plats på en smal skärm.
- **`check_layout.js` tillagd** och ska köras före push, som `check_faq.py`.
  Verifierad genom att buggen återinfördes: checken föll på den.

**2026-08-14: riktigt kursinnehåll på ledarskapssidan.**

- Listan heter nu **Upplägg** och beskriver de sex handledningstillfällena i
  stället för utbildningens egenskaper, vilket var hela poängen med
  backlog-punkten. 01, 02 och 06 är fasta, 03 till 05 väljs utifrån
  kartläggningen vid första tillfället.
- Områdena bakom de valbara tillfällena beskrivs parafraserat i löptext. Bokens
  modullista publiceras aldrig, se `CONTEXT.md`.
- RCT-belägget stod redan i ingressen och i FAQ:n, så det upprepas inte en tredje
  gång. Orten och det digitala alternativet flyttades ned i brödtexten så att
  inget påstående försvann när den gamla listan togs bort.
- `.playwright-cli/` tillagd i `.gitignore`.

Tidigare: teknisk SEO, tre landningssidor, Jekyll-blogg, Google Business Profile,
WebP-bilder med ASCII-namn.

## Deploy

Pushad till `main` 2026-08-13 som commit `13941b5`. GitHub Pages byggde utan fel
på 73 sekunder. Verifierat i produktion: samtliga sjutton URL:er svarar 200,
den gamla artikel-URL:en vidarebefordrar med canonical och robots `noindex,
follow`, designunderlaget svarar 404 (alltså korrekt exkluderat), och den nya
designen ligger live.

## Verification

- Alla tolv sidor kontrollerade i webbläsare på 1440 px och 390 px.
- Inga brutna interna länkar, exakt ett `<h1>` per sida, inga konsolfel.
- **Rättelse 2026-08-15:** påståendet "ingen horisontell scroll" var fel. Det
  var kontrollerat med ögat på 390 px, och just 390 px är den bredd där
  startsidans fel är minst synligt. Mätt med Playwright föll två sidor:
  startsidan (592 px bred på 375 px skärm) och kontaktsidan (743 px). Rättat och
  automatiserat, se `check_layout.js`. Kontrollera aldrig sidbredd med ögat igen.
- Förfrågningsformuläret testat: chips växlar, mailto byggs, statusmeddelandet
  visas.
- Externa källänkar på BAM- och Excel-sidorna kontrollerade med HTTP-anrop.
- Artiklarnas permalinks kontrollerade mot frontmatterns `date`.
- **Jekyll-bygget verifierat lokalt.** Ruby 3.3 och Jekyll 4.4 installerades
  2026-08-13. `jekyll build` går igenom utan fel, `/artiklar/` och alla sju
  artikel-URL:er genereras, ingen oredigerad Liquid finns kvar i utdata och all
  JSON-LD i hela bygget är giltig.
- Designunderlaget bekräftat exkluderat ur bygget.

## Unresolved details
- **Backlink-arbetet är prio 1 och inte påbörjat.** Det måste hållas gratis och
  lågtröskel: fritidsprojekt vid sidan av heltidsplugg, utan registrerad firma.
  hitta.se, eniro.se, handelskammare och utbildning.se är redan testade och
  avskrivna, se `BACKLOG.md`.
- **Öppna beslut och saknat innehåll** ligger samlat i `BACKLOG.md` under "Kvar
  från redesignen": porträttet till Om oss, kommentarer till de 48 böckerna, om
  `lasning.html` och `lanktips.html` ska slås ihop, om filtrering ska bli egna
  URL:er, och innehållslistorna 01–05 på **Excel- och BAM-sidorna**.
  Ledarskapssidan är klar sedan 2026-08-14 och kan användas som mall.
- `cv.html` står medvetet **utanför** sajtens arkitektur: ingen nav-länk,
  `noindex, nofollow`, inte i `sitemap.xml`, gammal palett kvar. Synka aldrig in
  den, och räkna inte med den i copyright-årsbumpen.
- `lasning.html` är oväntat den mest visade sidan, men för orelaterade akademiska
  sökningar. Urvalet är för litet för att agera på.
- **Beslutat 2026-08-13: `lasning.html` och `lanktips.html` slås inte ihop**,
  trots att redesignspecen föreslår det. Se `CONTEXT.md` för motiveringen. Detta
  är ett låst beslut.

## Resume here

Omindexering i Search Console enligt `nextAction`. Sedan backlinks.
**Dubbelkolla alltid mot `_posts/` innan du litar på artikellistan i
`BACKLOG.md`**, den har haft fel förut: "Konflikthantering för chefer" stod som
ogjord trots att den varit live sedan 2026-03-30.
