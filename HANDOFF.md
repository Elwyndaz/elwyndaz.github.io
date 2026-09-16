---
schemaVersion: 1
status: active
currentGoal: Göra orgutveckling.se synlig i lokal sökning i Umeå
nextAction: Begär omindexering i Search Console för excel-utbildning-umea.html och ledarskapsutbildning-umea.html. Därefter backlink- och lokalauktoritetsarbete med LinkedIn-delning av artiklar och kontakt med lokala nätverk.
blockers: []
reviewedAt: 2026-09-16
---

# Handoff: orgutveckling.se

## Läget

Sajten är live på `https://orgutveckling.se/` och tekniskt i ordning: 20 indexerade URL:er i sitemapen, alla med status PASS.

Google Keyword Planner bevisade den 20 augusti att sökvolymen för **`excelkurs umeå`** är **10–100** sökningar/månad (exakt samma som `ledarskapsutbildning umeå`), medan `excelutbildning` gav 0–10. Marknaden för Excel är stark både lokalt och nationellt (`excelkurs online` 1 000–10 000 sök/mån, `excelkurs för ekonomer` med bud upp till 108 kr/klick).

## Recent work

**2026-09-11: säkerhetsheaders, HTTPS-tvång och security.txt, allt i Cloudflare.**

- En extern skanner hade rätt på alla åtta punkter: HTTP svarade 200 utan
  omdirigering, och HTTPS-svaret saknade HSTS, CSP, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy och security.txt.
- GitHub Pages kan inte sätta headers (ingen `_headers`-fil), så allt lades i
  Cloudflare-zonen via API, **ingen kodändring i repot**:
  - Always Use HTTPS på: `http://` svarar nu 301 till `https://`.
  - HSTS `max-age=15552000` (sex månader), utan includeSubDomains och preload.
    Preload är nästan oåterkalleligt, därför avstått.
  - En Response Header Transform-regel ("Security headers") sätter CSP,
    `X-Frame-Options: DENY`, nosniff, `Referrer-Policy:
    strict-origin-when-cross-origin` och Permissions-Policy.
  - **CSP:n tillåter `'unsafe-inline'` för script och style**, eftersom sajten
    har `onclick`/`onload` i markup, `style=`-attribut och ett inline-script i
    `cv.html`. Den släpper igenom Google Fonts och Cloudflares
    analytics-beacon, blockerar inramning, plugins och främmande scriptvärdar.
    Läggs en ny extern resurs till (t.ex. YouTube-embed) måste regeln
    uppdateras, annars blockeras den tyst. Kolla konsolen.
  - security.txt via Cloudflares Security Center: kontakt
    `kontakt@orgutveckling.se` och kontaktsidan, löper ut 2027-09-11.
    **Förnya före dess**, annars räknas filen som ogiltig.
- Verifierat med curl (alla headers i svaret) och Playwright: startsidan,
  kontakt och cv.html laddar utan ett enda konsolfel under den nya CSP:n.
- Raden "ingen CSP i zonen att öppna" i posten 2026-08-27 gäller inte längre.
**2026-09-10, senare: AFS-hänvisningarna uppdaterade och BAM-meriten publicerad.**

- **Regelförnyelsen var inte inarbetad.** Arbetsmiljöverket slog 2025-01-01 ihop
  ett sjuttiotal föreskrifter till femton. Artiklarna hänvisade fortfarande till
  de upphävda numren. Verifierat mot av.se:
  - `AFS 2001:1` → **`AFS 2023:1`**, "Systematiskt arbetsmiljöarbete –
    grundläggande skyldigheter för dig med arbetsgivaransvar".
  - `AFS 2015:4` (OSA) → **`AFS 2023:2`**, "Planering och organisering av
    arbetsmiljöarbete". AFS 2015:4 ligger under *upphävda föreskrifter* på av.se.
  - Kravet heter numera **"tillräckliga kunskaper"**, inte "tillräcklig
    kompetens". Citatet i `ar-bam-obligatoriskt.md` var alltså fel ord.
  - Ändrat i `_posts/2026-07-06-ar-bam-obligatoriskt.md`,
    `_posts/2026-04-27-vad-ingar-i-bam-utbildning.md` och
    `_posts/2026-02-23-bam-och-sam-skillnad.md` (som saknade nummer helt).
    De gamla numren står kvar där de behövs som "ersatte den tidigare …".
- **Startsidans FAQ citerar nu AFS 2023:1.** I den tidigare ändringen samma dag
  utelämnades paragrafen medvetet eftersom numret inte var verifierat. Nu är det
  det. Synlig text och `FAQPage`-schemat ändrade i par.
- **`bam-utbildning-umea.html`: föråldrad källänk.** Länken till Arbetsmiljöverket
  pekade på `…/systematiskt-arbetsmiljoarbete-sam/`; sökvägen saknar numera
  `-sam`. **Inte HTTP-verifierad** — av.se är blockerad från utvecklingsmiljön,
  URL:en är tagen från Arbetsmiljöverkets nuvarande indexerade sida. Kontrollera
  den i webbläsaren.
- **BAM-handledarskapet tillagt på `bam-utbildning-umea.html`** — se varningen om
  kontrollgruppen nedan. Ny rad 06 i "I korthet", en mening i brödtexten och
  `instructor` med `hasCredential` i `Course`-schemat.
- **Terminologin kontrollerad.** Prevents egen process ger ett **diplom** som
  gäller i tre år med recertifiering, och det är diplomet som ger tillgång till
  kursmaterialet och rätten att utbilda i BAM. "Diplomerad BAM-handledare" är
  alltså rätt term; "certifierad" används löst av tredje part. Formuleringen på
  sajten är densamma som i `cv.html`.
- Kontroller gröna: `check_faq.py` 0 avvikelser, `check_layout.js` 0 overflow på
  15 sidor × 4 bredder, all JSON-LD validerad.

**2026-09-10: granskning av innehåll, form och kod åtgärdad (tio punkter).**

- **`index.html`: felaktigt myndighetspåstående borttaget.** FAQ:n påstod att
  BAM-kursen "uppfyller Arbetsmiljöverkets krav". Arbetsmiljöverket godkänner
  inte arbetsmiljöutbildningar, och sajtens egen artikel
  `_posts/2026-07-06-ar-bam-obligatoriskt.md` säger korrekt motsatsen — sajten
  motsade alltså sig själv. Omskrivet i både synlig FAQ och `FAQPage`-schemat.
  Ingen AFS-paragraf citeras: AFS 2001:1 ersattes av det nya regelverket 2025.
- **`om-oss.html`: regi-anvisningarna låg publicerade som brödtext.**
  Platshållarrutan och noten "Ett enda porträtt, stort. Inget kollage, ingen bild
  från en utbildningssal." var ett formgivarnotat på sidan. Borttagna; texten tar
  nu hela bredden. `.about-grid`, `.portrait` och `.portrait-placeholder` står
  kvar i `style.css` så att rutan kan återställas när porträttet finns, se
  `BACKLOG.md`.
- **`sitemap.xml`: två fel.** `/ai/` låg med trots att den enligt `CONTEXT.md`
  medvetet ska förbli 404 (beslutat 2026-08-15) — vi skickade alltså en avsiktlig
  404 till Google. Artikeln 2026-08-20 (AI och Copilot i Excel) saknades helt.
- **Antalet program stämde inte.** `kontakt.html` sa "tre utbildningar", övriga
  sidor "fyra program". `index.html` sa dessutom "öppna och interna", vilket
  motsäger produktbeslutet i `CONTEXT.md` (aldrig anmälan, inget katalogdatum).
- **Startsidans title bar fel sökordsform.** Den använde `Excel-utbildning` med
  bindestreck, formen som Keyword Planner avfärdade 2026-08-20 (`excelkurs umeå`
  10–100/mån mot `excelutbildning` 0–10). Startsidan är sajtens enda rankande
  sida (position 5,1, tolv av femton klick), så det är den mest värdefulla titeln
  på sajten. Även `case.html`. Meta-taggarna (`description`, `og:title`,
  `og:description`, `twitter:*`) är omlagda på båda sidorna i samma pass.
  **Kvar med bindestrecksformen:** `Course`-namnen och FAQ-frågan "Vad ingår i en
  Excel-utbildning hos er?" i `index.html`, `Course`-namnet och ingressen på
  `case.html`, samt `description` i `_config.yml`. Det är synligt innehåll och
  strukturerad data, inte metadata, och FAQ-frågan kräver att `check_faq.py` körs
  om eftersom schemat måste matcha den synliga texten ordagrant.
- **BAM-handledarskapet syntes inte på den publika sajten.** Att Patrik är
  diplomerad BAM-handledare via Prevent stod bara i `cv.html`, som är
  `noindex, nofollow` och medvetet ligger utanför arkitekturen — alltså osynligt
  för både kund och Google. Tillagt på `om-oss.html` (faktaraden plus
  `hasCredential` i `Person`-schemat) och i startsidans BAM-fråga i FAQ:n, i både
  synlig text och `FAQPage`-schemat. Formuleringen "diplomerad BAM-handledare via
  Prevent" är hämtad ordagrant från `cv.html`. **`bam-utbildning-umea.html` är
  medvetet inte ändrad**: den är kontrollgrupp för sökordshypotesen fram till
  avläsningen 2026-09-26. Det är den sida där meriten gör mest nytta
  kommersiellt, så lägg in den där direkt efter avläsningen.
- **Tillgänglighet: dekorativa siffror lästes högt.** `01`–`04` låg inuti
  länkarna i mobilmenyn (15 sidor + artikellayouten) och i registerraderna
  (8 sidor), så skärmläsare sa "01 Utbildningar". `aria-hidden="true"`.
- **Fem oanvända bilder borttagna**: `COU.webp`, `boka-utbildning-umea.webp`,
  `excel-utbildning-umea.webp`, `utvarderingar-umea.webp` och `og-image.webp`
  (den sista död sedan OG-fixen 2026-08-27 lade om allt till PNG).
- **`style.css`: latent overflow-bugg.** `.register-row` och `.link-row` använde
  bar `1fr` där `.book-row` redan använde `minmax(0,1fr)`. Det är exakt fällan
  `CONTEXT.md` beskriver: en grid-cell kan inte krympa under sitt innehålls
  minsta bredd så länge `min-width` är `auto`. Åtgärdat i både grundregeln och
  mobilvarianterna.
- Kontroller gröna: `check_faq.py` 0 avvikelser (index: 5 par matchar),
  `check_layout.js` 0 overflow på 15 sidor × 4 bredder.
- **Medvetet inte gjort:** e-postadressen ligger kvar i klartext i JSON-LD på
  `index.html`, `kontakt.html` och `om-oss.html`, vilket gör `site.js`-
  obfuskeringen verkningslös men kostar att adressen försvinner helt utan JS.
  Att lösa det åt det ena eller andra hållet är ett beslut, inte en bugg.

**2026-08-27, kväll: Cloudflare Web Analytics påslaget, policy version 1.1.**

- Patrik valde "Enable, JS snippet automatically injected" för zonen
  `orgutveckling.se` (Cloudflare-dashboarden, Observe → Web Analytics). Cloudflare
  injicerar `beacon.min.js` i all HTML; cookiefri sidvisningsstatistik per sökväg.
  Ingen kodändring, ingen CSP i zonen att öppna.
- `integritetspolicy.html`: avsnittet Besöksmätning beskriver nu tjänsten och
  rättslig grund i stället för att säga "ingen analystjänst alls". Google Fonts
  är inte längre "den enda tredjeparten".
- Två sessioner skrev policy samtidigt den här kvällen; den här behölls, dubbletten
  `integritet.html` slängdes innan push.

**2026-08-27: integritetspolicy, sajten saknade informationsplikt helt.**

- Ny `integritetspolicy.html` i registerlayouten, med i `sitemap.xml` och länkad
  från sidfoten på samtliga sidor plus artikellayouten.
- Täcker Cloudflare, GitHub Pages, Google Fonts och förfrågningsformuläret.
  **Formuläret är den enda punkten där uppgifter når mig**, och även där indirekt:
  det bygger en mailto som besökaren skickar själv, så sajten tar aldrig emot
  något.
- **Ingen cookiebanner, och det är rätt.** Sajten sätter inga cookies och använder
  ingen `localStorage`. Samtyckeskravet i lagen om elektronisk kommunikation
  triggar på lagring eller läsning på besökarens enhet, och när ingenting lagras
  triggas det aldrig. GDPR:s informationsplikt gäller ändå eftersom IP-adresser
  behandlas, och den fyller policyn.
- Sidfotens underrad fick en länkstil i `style.css`, den saknade en.
- `jekyll build` grönt, `check_faq.py` 0 avvikelser, `check_layout.js` 0 overflow
  på 15 sidor x 4 bredder.


**2026-08-27: OG-bilden var WebP, alltså osynlig i de flesta delningar.**

- `og:image` pekade på `og-image.webp`. LinkedIn, Slack och iMessage renderar inte
  WebP alls, och Facebook är opålitligt. `og-image.png` (1200x630) låg redan i repot
  oanvänd. Alla sidor plus `_layouts/artikel.html` pekar nu på PNG:en.
- `og:image:width`, `height` och `type` tillagda. Utan dem hämtar skraparen bilden
  och mäter den själv, vilket är varför en förhandsvisning ibland dyker upp först
  vid andra delningen.
- `twitter:card` var `summary` (liten kvadrat) på alla sidor utom artikellayouten,
  och `twitter:image` saknades helt utanför artiklarna. Båda rättade.
- **Regel:** WebP är rätt för bilder på sidan, aldrig för `og:image`. Skrapare är
  inte webbläsare.

**2026-08-26: hero-rubriken på startsidan kolliderade radvis.**

- `line-height:.9` på `.page-head.hero h1` lät g:et i "fungerar" gå in i raden
  under ("verkligheten"). Satt till `line-height:1`. Bara startsidans hero
  påverkas, övriga sidrubriker ligger kvar på `.95`.
- `node check_layout.js` grön: 14 sidor x 4 bredder, 0 overflow.

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
- **BAM-sidan lämnades medvetet oförändrad som kontrollgrupp.** ⚠️ **Detta gäller
  inte längre fullt ut:** sidan ändrades 2026-09-10 på beslut av Patrik, för att
  få ut BAM-handledarskapet. **Sökordsformen är orörd** — `BAM-utbildning` med
  bindestreck står kvar överallt, så själva hypotesen (hopskrivet mot bindestreck)
  går fortfarande att läsa av. Men sidan har fått nytt innehåll, så en förändring
  i dess siffror kan inte längre tolkas som ren nolleffekt. Väg in det vid
  avläsningen efter 2026-09-26.
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

OG-fixen 2026-08-27 **ligger i `main`** (`og-image.png` på samtliga sidor). Raden
här sa tidigare att den var committad men inte pushad; det stämde inte,
kontrollerat 2026-09-10. Kör Facebooks Sharing Debugger och LinkedIn Post
Inspector så deras cache töms, annars ligger den trasiga förhandsvisningen kvar.
Det gäller särskilt LinkedIn, som ska användas för artikeldelning enligt
`nextAction`.

**Överst på listan, oåtgärdat:** granskningen 2026-09-09 rapporterade att den
publicerade `utbildningar.html` är en **äldre mall** än den i repot — gammal meny,
ingen sidfot, trasig `/cdn-cgi/l/`-länk. Det kunde inte verifieras från
utvecklingsmiljön. Kontrollera senaste Pages-bygget och Cloudflare-cachen **innan**
något byggs om i repot: är orsaken cachning löser ingen kodändring den.

Omindexering i Search Console enligt `nextAction`. Sedan backlinks.
**Dubbelkolla alltid mot `_posts/` innan du litar på artikellistan i
`BACKLOG.md`**, den har haft fel förut: "Konflikthantering för chefer" stod som
ogjord trots att den varit live sedan 2026-03-30.

## Granskning 2026-09-16

Cross-project audit run from elwyn-dash (session 5 in the daily note). Results written to `## Audits` in CONTEXT.md, findings appended to BACKLOG.md under `## Granskning 2026-09-16`. Headers on buildapp.se and the TLS grade are zone-level and are fixed once in Cloudflare, not here.
