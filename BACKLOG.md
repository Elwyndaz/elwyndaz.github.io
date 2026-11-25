# Backlog

## Tekniskt backlogsvep 2026-11-24

- [x] `[P2]` Mobilbredd på Läslistan: `check_layout.js` hittade 314 px sidbredd på 305 px tillgänglig bredd i ett 320 px-fönster. **Gjort 2026-11-24:** mobilkolumnen använder nu `minmax(0,1fr)` och boktitlar får `overflow-wrap:anywhere` i `style.css`. CSS-versionen uppdaterad till `2026-11-24` i alla 17 HTML-källor, inklusive podcastens mall och omgenererade sida. **Evidens:** Jekyll-bygge grönt; `uv run check_faq.py` 19 matchande FAQ-par, 0 avvikelser; `uv run check_csp.py` 28 sidor, 0 fel; `check_layout.js` med synligt Chromium 16 sidor × 4 bredder (320, 375, 430, 768 px), 0 overflow. Inga artikeltexter ändrade.

Urvalet av befintliga öppna P0–P2-punkter gav inga lokala kodåtgärder: Google Business Profile, omdömen, Bing-import, länkförfrågningar och manuell Search Console-indexering ligger utanför detta kodsvep. Nationell guidesida, "Svara först" och faktafynden med `needs-info` kräver ägarens innehåll. P3 och oprioriterade punkter ingår inte.

## Funktionspass 2026-11-24

- [x] `[P2]` Förfrågningsformuläret tappade besökarens text när ingen e-postklient fanns (webbmejl): mailto gjorde ingenting och statusrutan bad bara om ett nytt mejl. **Gjort 2026-11-24 (`769526c`):** statusrutan visar utkastet (till, ämne, text) med knappen "Kopiera utkastet". Samtidigt förväljer `kontakt.html?amne=…` ämnet, och kurssidornas förfrågningsknappar samt registerraden Organisationsutveckling länkar så. `site.js` fick versionsparameter (`?v=2026-11-24`) av samma cacheskäl som `style.css`. **Evidens:** Playwright-test mot produktion efter Pages-bygget: förval för excel, bam, ledarskap, organisationsutveckling och ett okänt värde (inget förval), utkastets text exakt, urklipp lika med utkastet, mailto-anropet sker, ingen overflow vid 320 px, inga sidfel. `check_faq.py` 0 avvikelser, `check_csp.py` 0 av 28, `check_layout.js` 16 sidor x 4 bredder 0 overflow, 0 brutna interna länkar i bygget med framtida artiklar.

## Buggjakt 2026-11-24

- [x] `[P2]` Tangentbordet fastnade i den stängda mobilmenyn: den låg kvar i sidan med bara `translateY(-100%)`, så Tab gick genom sju osynliga länkar (ordmärke, stäng, fyra menyval, Begär förslag) före sidans innehåll, på alla sidor och båda bredderna. Öppnad meny fick inte fokus och Escape stängde inte. **Gjort 2026-11-24 (`9cfed8b`):** `visibility:hidden` på stängd meny i `style.css`, fokus till stängknappen vid öppning och tillbaka till menyknappen vid stängning, Escape stänger, i `site.js`. **Evidens:** Playwright lokalt vid 390 och 1440 px: 7 osynliga tabbstopp före, 0 efter; Tab efter öppning når "Utbildningar", Escape stänger och lämnar fokus på menyknappen, klick på menyval navigerar.
- [x] `[P3]` Filterchippen på Kunskap, Läslistan, Länktips och Podd saknade `aria-pressed`, så skärmläsare hörde inte vilket filter som var valt. **Gjort 2026-11-24 (`9cfed8b`):** `site.js` sätter `aria-pressed` vid start och klick. **Evidens:** Playwright: `null` före, `true` på klickat chip efter.
- [x] `[P3]` Efter "Kopiera utkastet" och ett nytt skick stod knappen kvar på "Kopierat" fast urklippet hade det gamla utkastet. **Gjort 2026-11-24 (`9cfed8b`):** knappen nollställs vid varje skick. **Evidens:** Playwright: "Kopierat" före, "Kopiera utkastet" efter; utkast med å, ä, ö och 3 500 tecken byggs rätt.
- [x] `[P2]` `check_layout.js` mätte fel sajt: servern lyssnade på `127.0.0.1:8791` men sidorna hämtades från `localhost:8791`, som på den här maskinen går till `::1` där en annan Python-process lyssnar. Checken sa OK även med den gamla CSS:en. Tidigare gröna körningar av den bevisar alltså inte layouten. **Gjort 2026-11-24 (`f0abd43`):** ledig port från OS:et, sidorna hämtas från `127.0.0.1`, och checken vaktar också att stängd meny har `visibility:hidden`. **Evidens:** med gamla `style.css` faller den på 60 sida/bredd-kombinationer (alla utom `cv.html`, som saknar menyn), med nya 0 fel, 0 overflow på 16 sidor x 4 bredder.

## Buggjakt 2, 2026-11-25

- [x] `[P3]` Siffror som inte stämde mellan sidor: Kunskap (`artiklar.html`) sa "47 böcker" om Läslistan, som har 71 titlar (räknat på `data-cat`, samma som Läslistan och Länktips säger); 404-sidan sa "Sju artiklar" när tolv var publicerade. **Gjort 2026-11-25 (`36aaf8c`):** "71 titlar", och 404-raden säger "Artiklar, böcker och poddar" i stället för ett antal som blir fel varje månad. **Evidens:** Jekyll-bygge, texten i `_site`.
- [x] `[P3]` `tack.html` sa "Du behöver inte göra något mer" till den som kom dit via "Vad händer nu?" i formulärets statusruta, direkt under "Hände inget? Kopiera texten". Utan e-postklient var inget skickat. **Gjort 2026-11-25 (`36aaf8c`):** "När mejlet är skickat behöver du inte göra något mer."
- Genomgånget utan fynd: 29 byggda sidor i Chromium (0 konsolfel, 0 sidfel, 0 trasiga bilder, ett `h1` per sida, `lang="sv"`), 0 brutna interna länkar och ankare, 47 JSON-LD-block giltiga, canonical och `og:url` lika med sidans adress överallt, filterchippens antal på Läslistan (71), Länktips (19) och Podd (51/285/336) stämmer med sidornas text, formuläret med `?amne=` och bakåtknapp, podden utan `site.js` visar 51 direkta, live: 404-status på saknad sida, `http://` och `www.` 301 till `https://orgutveckling.se/`, interna filer (HANDOFF, CONTEXT, docs, checkarna) 404. Externa länkar utom bokus och Google Fonts: 376 av 378 svarar 200, de två andra (doi.org 403, LinkedIn 999) är botspärrar. Bokus sökadresser (59) gav 429 (hastighetsspärr) och är inte kontrollerade.
- Inte testat: återställning från bfcache (stängs menyn när man backar till en sida där den var öppen?). Playwright gick inte att få att återställa sidan ur bfcache, ens med `--disable-back-forward-cache` borttagen.

## Fart, tillgänglighet och metadata 2026-11-25

Mätt live med Playwright på 16 sidor (de 13 sitemapsidorna utom artiklarna, plus en artikel, `tack.html` och 404) i två lägen: 390 px med 4x CPU-strypning och Slow 4G (562 ms RTT, 1,44 Mbit/s), och 1440 px utan strypning. Tom cache.

- Läget före: LCP 1,5–1,8 s mobil, 0,17–0,34 s dator; CLS högst 0,039 (Länktips, dator); 230–408 KB per sida, varav typsnitten 210–355 KB. LCP är textelementet (`h1`, ingress) på alla sidor utom `om-oss.html`, där porträttet är LCP. Render-blockerande: Google Fonts-CSS:en och `style.css`. Enda bilden på sajten (`patrik.webp`, 33 KB, 800x707) har `width`/`height` och rätt format. Typsnittsfilerna har `max-age=31536000`, `style.css`, `site.js` och `patrik.webp` `max-age=14400`.
- [x] `[P2]` `tack.html`: siffrorna 01–03 i accentfärg på svart botten hade kontrast 3,04 (krav 4,5). **Gjort 2026-11-25 (`df31a76`):** `--dampad-mork`, samma roll på mörk botten enligt paletten, kontrast 7,12. **Evidens:** axe 4.14 `color-contrast` 3 noder före, 0 efter (lokalt bygge och live, båda bredderna).
- [x] `[P3]` Porträttet på `om-oss.html` är LCP-elementet men laddades utan prioritet. **Gjort 2026-11-25 (`df31a76`):** `fetchpriority="high"`. **Evidens:** live, ingen mätbar vinst: mobil LCP 1,61 s före, 1,70 s efter, FCP steg lika mycket (1,59 till 1,68 s), så LCP begränsas av den render-blockerande CSS:en, inte av bilden. Ofarlig, ligger kvar.
- Läget efter deploy (`41bea82`, live): LCP 1,50–1,88 s mobil, 0,17–0,32 s dator, CLS högst 0,045, samma vikt per sida. Skillnaderna mot före är brus, ingen ändring rörde laddningen.
- Genomgånget utan fynd: axe 4.14 (WCAG 2.0–2.2 A/AA plus best practice) 0 överträdelser på övriga 15 sidor i båda bredderna. Metadata i bygget (alla indexerbara sidor): unika `title` och `description`, `lang="sv"`, canonical, `og:image` och favicon överallt; `tack` och 404 är `noindex` och saknar dem medvetet. Ingen manifest, sajten är ingen PWA.
- [ ] `[P2]` `[needs-info]` Typsnitten är 60–85 % av varje sidas vikt. Newsreader laddas med `opsz`-axeln (6..72): två filer på 132 och 147 KB. Samma vikter utan `opsz` är 25 och 58 KB (hämtat från Google Fonts 2026-11-25), alltså cirka 195 KB mindre på startsidan och 107 KB på sidor utan kursiv. Priset är att displaygraden (hero 104 px, `h1` 56 px) ritas med textens optiska storlek, en synlig ändring av typografin. Patriks beslut.
- [ ] `[P3]` `[needs-info]` `style.css?v=` och `site.js?v=` har versionsparameter men cachas bara fyra timmar (`max-age=14400`). En Cloudflare-cacheregel med längre webbläsar-TTL för just dessa skulle spara en förfrågan per återbesök. Zonändring, inte gjord.
- Egna typsnitt i stället för Google Fonts: gjort 2026-11-25, se "Scenariojakt 2026-11-25" nedan. CSP-regeln behövde ingen ändring, `font-src` och `style-src` har redan `'self'`.

## Scenariojakt 2026-11-25

Flerstegsscenarier med Playwright mot lokalt bygge och sedan live (skript utanför repot, `C:\Users\patri\AppData\Local\Temp\aifabriken-lanes\scen-elwyndaz.github.io\scen.js`). Sajten har inga konton, ingen lagring och ingen import, så sessioner, import/export och service worker finns inte att testa.

- [x] `[P3]` Platta vriden från stående till liggande med mobilmenyn öppen (768 till 1024 px): menyn täckte hela datorvyn, sidan gick inte att scrolla (`body.menu-open` med `overflow:hidden`) och menyknappen var dold. **Gjort 2026-11-25 (`13b1124`):** `site.js` stänger menyn när `(max-width:780px)` slutar gälla; `site.js?v=2026-11-25` på 17 sidor. **Evidens:** scenariot föll före (meny synlig, `overflow:hidden`, scrollY 0), går igenom efter, lokalt och live.
- [x] `[P2]` Typsnitten från egen domän i stället för Google Fonts. **Gjort 2026-11-25 (`299c28d`):** `fonts/fonts.css` och 12 woff2-filer (latin, latin-ext; övriga delmängder täcker inga tecken på sajten), 18 sidor inklusive `cv.html`, integritetspolicyn version 1.2. **Evidens:** skärmbilder av sex sidor i 390 och 1440 px pixelidentiska före och efter; live 10 sidor 0 konsolfel (CSP oförändrad), typsnitten laddade, 0 förfrågningar till Google. Mätt live, 390 px, 4x CPU, Slow 4G, tom cache, median av 5 på sex sidor: ursprung per sida före 3, efter 1; FCP/LCP före 1 632–1 840 ms, efter 1 548–1 692 ms (startsidan 1 840 till 1 692, Kontakt 1 632 till 1 548), vikt +3–4 KB per sida.
- [ ] `[P3]` `[needs-info]` Typsnittsfilerna cachas nu `max-age=14400` (GitHub Pages) i stället för Googles ett år, så ett återbesök efter fyra timmar frågar om dem igen (villkorlig förfrågan). Samma Cloudflare-cacheregel som punkten om `style.css?v=` ovan, utökad till `/fonts/`. Zonändring, inte gjord.
- [ ] `[P3]` `[needs-info]` CSP:n släpper fortfarande in `https://fonts.googleapis.com` och `https://fonts.gstatic.com`. Kan strykas ur regeln "Security headers" när cachade sidor från före 2026-11-25 har gått ut (HTML cachas 10 minuter). Zonändring, inte gjord.
- Genomgånget utan fynd: förfrågan från BAM-sidan (förval, fyll i, skicka, byt organisation, lägg till Excel och ta bort BAM, skicka, töm allt, skicka: utkastet följer varje steg och behåller inget gammalt), två flikar med olika `?amne=` ger var sitt utkast, Podd med 336 rader vid 4x CPU (filterbyte 11–234 ms i sidan, Alla oftast 110–175 ms), filter på Läslistan behålls och 0 overflow när fönstret krymper från 1440 till 320 px, alla sidor har samma `?v=` för `style.css` och `site.js` och inga 4xx-resurser.

## Webbläsarpass WebKit och Firefox 2026-11-25

Samma flöden live i WebKit 27.2 (Playwright, iPhone 13-profil: 390 px, touch, mobil-UA), Chromium 156 i samma profil, Firefox 157 och Chromium 156 vid 1440 px. playwright-core 1.64.1 (webkit-2370, firefox-1555). Skript utanför repot, `C:\Users\patri\AppData\Local\Temp\aifabriken-lanes\xb-elwyndaz.github.io\` (`xb.js`, `mailto.js`, `mailto2.js`, `form-wk.js`, `bfcache.js`). Inte testat på en riktig iPhone eller i Safari.

- Ingen skillnad som drabbar en besökare hittades, ingen kodändring. Identiskt i alla fyra: 16 sidor (de 13 statiska sitemapsidorna, en artikel, `tack.html`, 404) med status, 0 overflow, alla tre typsnitten laddade, 0 sidfel och konsolfel (utom 404-sidans egen 404), sidhuvudet kvar överst efter scroll (sticky), `h1`-höjden på pixeln lika mellan motorerna, inga `.reveal`-sektioner kvar dolda efter scroll vid 1440 px. Mobilmenyn i WebKit och Chromium: öppnar över hela höjden, låser `body`, fokus till stängknappen, Escape stänger, menyval navigerar. Filter på Läslistan (71/38/16/9/7/1), Podd (51/336/285), Länktips (19/2/4/10/3) och Kunskap (12/6/3/3) ger samma antal. FAQ öppnar. `cv.html`: adressen byggs, 0 overflow.
- Förfrågan med `?amne=`, å/ä/ö och decimalkomma (`12 500,50 kr, 3,5 timmar`): utkastet byggs ordagrant lika i alla tre motorerna, och "Kopiera utkastet" ger "Kopierat" i WebKit och Firefox (Chromium headless nekar urklippet utan behörighet och visar reservtexten, som väntat).
- Skillnad som inte är sajtens: WebKit-porten för Windows gör `mailto:kontakt@orgutveckling.se` till en navigering till `https://orgutveckling.se/` (en adress med annan domän stannar som mailto), så sidan lämnas efter skick. Utkastet var ändå ifyllt och synligt i ögonblicket före. Bevis: `mailto2.js`. På iPhone lämnar Safari mailto till Mail, så felet går inte att återskapa där utan en riktig enhet.
- Sajten använder inga datum- eller tidsfält, ingen `localStorage`/IndexedDB, ingen service worker, inga dialoger, inga Intl- eller datumtolkningar, ingen lookbehind, `structuredClone`, `:has`, containerfrågor, `dvh`, `backdrop-filter` eller `subgrid` (grep i `site.js`, `cv.js` och `style.css`), så de punkterna fanns inte att testa.
- [ ] `[P3]` Inte testat: Safari återställer sidor ur bfcache, och då kan mobilmenyn ligga kvar öppen när besökaren backar till sidan där ett menyval trycktes. Playwright återställde inte sidan ur bfcache i någon av de tre motorerna (`bfcache.js`: ny sidladdning efter bakåt), så det är varken bekräftat eller avfärdat. Rättning vid behov: stäng menyn i `pageshow` när `event.persisted` är sant. Kräver en riktig iPhone för att bevisas.

## Preferenser och språk 2026-11-25

All användarsynlig text i bygget med framtida artiklar (29 sidor: brödtext, `title`, meta-beskrivningar, `alt`, `aria-label`, `placeholder`) lästes igenom, plus strängarna i `site.js` och `cv.js`. Sedan Playwright (playwright-core 1.64.1, Chromium) mot lokalt bygge på 17 sidor: mörkt läge, reducerad rörelse, 200 % textzoom vid 1280 och 390 px och forced colors vid 390 och 1280 px. Skript utanför repot, `C:\Users\patri\AppData\Local\Temp\aifabriken-lanes\prefs-elwyndaz.github.io\` (`prefs.js` för lägena, `snap.js` för skärmbilder i normal zoom, `texts.py` för textutdraget).

- [x] `[P2]` Windows kontrastläge (forced colors): menyknappens tre streck var bakgrundsfärg och blev vita på vit botten, så mobilmenyn saknade synlig knapp på alla 16 sidor med meny. **Gjort 2026-11-25 (`3b5212f`):** strecken ritas med `border-top` i stället för `background` i `style.css`, pixelidentiskt i vanligt läge. **Evidens:** `prefs.js` mot live före deploy: 16 sidor fel vid 390 px; lokalt efter: 0.
- [x] `[P3]` Forced colors: valt filterchip (Kunskap, Läslistan, Länktips, Podd) såg ut som de andra, eftersom markeringen bara var bakgrundsfärg. **Gjort 2026-11-25 (`3b5212f`):** `@media(forced-colors:active)` ger valt chip systemfärgen `Highlight`; vanligt läge orört. **Evidens:** 4 sidor x 2 bredder fel före, 0 efter; skärmbilden visar ALLA markerat.
- [x] `[P2]` 200 % textzoom (textstorlek dubblad, layoutbredd oförändrad, som Firefox "Zooma endast text"): sidan blev bredare än skärmen på 14 av 17 sidor vid 390 px och 12 vid 1280 px, upp till 367 px. Orsak: långa ord, e-postadressen och formler i `code` satte minsta bredd i rutnät med `1fr` (`.hero-top`, `.cta-inner`, `.statement-grid`, faktaraden), och `.page-head h1` hade `overflow-wrap:break-word`, som inte sänker minsta bredden. **Gjort 2026-11-25 (`3b5212f`):** `overflow-wrap:anywhere` på `body` i `style.css` och i `cv.html`, rubriken ärver det, ordmärket undantaget (`overflow-wrap:normal`, annars bröts "ORG" i sidfoten vid 320 px). `style.css?v=2026-11-25` på 17 sidor. **Evidens:** 0 sidor bredare än skärmen och 0 utstickande element efter, båda bredderna. Normal zoom: 54 skärmbilder (18 sidor x 320, 390 och 1280 px) pixelidentiska före och efter utom Podd vid 320 px, där "(genomskinlighetsillusionen)" tidigare stack ut 41 px över pilkolumnen och nu radbryts. `check_layout.js` 16 sidor x 4 bredder 0 overflow. Priset: vid 200 % textzoom på 390 px bryts startsidans hero-rubrik mitt i ord, men inget skärs av.
- [x] `[P3]` Text: konfliktartikeln (2026-03-30) "andra i gruppen drar in i konflikten" blev "dras in"; startsidans faktarad sa "Föreläsarna" om samma betyg som `case.html` kallar "Föreläsaren" (en person). Podd: beskrivning och taggar för avsnitt 17, 18 och 19 låg en rad fel (19 manspreading/replikeringskrisen hade "bli omtyckt", 18 synkroniseringseffekten hade replikeringskrisens, 17 klumpedunseffekten hade dygnsrytmens). **Gjort 2026-11-25 (`6d878ca`, `3b5212f`):** roterade tillbaka i `docs/dumma-manniskor-arbetsliv.md`, `podcast.html` omgenererad (51/285 oförändrat). Att "bli omtyckt" hör till 17 är bedömt på titeln (klumpedunseffekten är pratfall-effekten: en tabbe gör en kompetent person mer omtyckt), inte lyssnat.
- Genomgånget utan fynd: inga tankstreck (em-dash), ingen decimalpunkt och inget tal över 9 999 utan mellanslag i synlig text, datum genomgående ÅÅÅÅ-MM-DD eller "25 november 2026". Mörkt läge: sajten har inget mörkt tema och inget `color-scheme`, alla 17 sidor pixelidentiska ljust och mörkt, formulärfälten följer inte systemets mörka läge; inget tema tillagt. Reducerad rörelse: `scroll-behavior:auto`, inga `.reveal`-sektioner dolda, alla övergångar 0,01 ms, ankarhopp direkt. Fokusring synlig i forced colors på alla sidor. Öppen mobilmeny vid 200 % textzoom: sista menyvalet nås.
- Inte testat: riktig textzoom i Firefox eller Safari (simulerad i Chromium genom att dubbla varje elements `font-size`), riktigt Windows kontrastläge (Chromiums `forcedColors`-emulering), skärmläsare.
- [ ] `[P3]` `[needs-info]` Namnet skrivs på två sätt: "Centrum för Organisations-Utveckling" i `og:site_name` (17 sidor), all JSON-LD, `_config.yml` och meta-beskrivningen på Kunskap, men "Centrum för Organisationsutveckling" i titlar, sidfot och brödtext. `CONTEXT.md` säger att den hopskrivna formen står i strukturerad data, vilket inte stämmer. Varumärkesbeslut, inte ändrat.
- [ ] `[P3]` `[needs-info]` `kontakt.html` säger "Ett litet bolag i Umeå", men verksamheten har ingen registrerad firma (`CONTEXT.md`). Sakfråga, inte ändrad.

## Backlinks och lokal auktoritet

Prio 1. Sajten är indexerad men osynlig, och det är en auktoritetsfråga snarare
än en innehålls- eller teknikfråga. Håll allt gratis och lågtröskel: hoppa över
sådant som kräver medlemsavgift eller registrerat företag.

- [ ] Dela artiklar på LinkedIn löpande.
- [ ] Nämn sajten i relevanta gratis Umeå-forum och Facebook-grupper för
  småföretag och frilans, när tillfälle uppstår naturligt.

Redan testat och avskrivet, försök inte igen:

- ~~hitta.se och eniro.se~~ har ingen "lägg till företag"-funktion, bara
  "verifiera ditt företag" mot en befintlig post från Bolagsverket eller SCB.
  Utan registrerad firma finns ingen post att claima. Hårt stopp.
- ~~Handelskammare och Företagarna~~ kostar pengar, fel skala för projektet.
- ~~utbildning.se och studier.se~~ kräver sannolikt ett etablerat utbildningsföretag.

## Artiklar, en i månaden

⚠️ Dubbelkolla alltid mot `_posts/` innan du litar på den här listan. Den har
haft fel förut.

### Excel

- [x] AI och Copilot i Excel: vad fungerar, vad är en gimmick och vad behöver du kunna själv? Publicerad 2026-08-20. Går igenom reella användningsområden (formeltolkning, textstädning, enkla makron), tre allvarliga fallgropar (hallucinerad logik, granskningsbehov, sekretess), extern länk till Kenji Explains, länk till buildapp.se och internlänk till excelkursen.
- [x] Så lär du dig pivottabeller snabbt. Skriven 2026-10-06 på grenen `batch/2026-10-06` (`_posts/2026-10-07-lar-dig-pivottabeller-snabbt.md`, med i `sitemap.xml`), publicerad 2026-10-07 (omdaterad från 2026-10-06 före merge). Läs den: texten ligger nu live under ditt namn, och menynamnet "Sammanfatta värden efter" är skrivet ur minnet, kontrollera det mot en svensk Excel.
- [x] Excel för ekonomer. Publicerad 2026-10-28.
- [x] Excel för HR. Skriven 2026-10-28, publiceras automatiskt 2027-01-27.
- [x] Excelkurs för nybörjare i Umeå (som `excel-for-nyborjare`, för att inte konkurrera med landningssidan). Skriven 2026-10-28, publiceras automatiskt 2026-11-25.

- [ ] `[P3]` Beslut för Patrik: nybörjarartikeln (publiceras 2026-11-25) säger att en bra kurs börjar med listor och tabeller, men `excel-utbildning-umea.html` lovar "kontroll på formler och kortkommandon" och nämner inte tabeller. Nämn tabeller på landningssidan, eller tona ned artikeln.
- [x] `[P2]` Källänkar i de tio äldre artiklarna (2026-01-26 till 2026-10-07): bara AI-artikeln har externa länkar. tillvaxt-researchens punkt 10 (GEO, arXiv 2311.09735). De fem från 2026-10-28 har dem. **Gjort 2026-11-18:** 21 länkar i nio artiklar till av.se (AFS 2023:1, 2023:2), riksdagen.se (arbetsmiljölagen), prevent.se, Microsofts svenska supportsidor och Edmondson 1996/1999, alla HTTP 200 och kontrollerade mot påståendet. Samtidigt rättat: XLOOKUP heter XLETAUPP i svensk Excel (formeln gav fel), "Frys fönsterrutor" heter "Lås fönsterrutor", "vite (böter)" var juridiskt fel.
- [ ] `[P2]` `[needs-info]` Faktafynd från källgenomgången 2026-11-18, inte ändrade eftersom de kräver omformulering av Patriks text: `ar-bam-obligatoriskt` rad 14 säger att Arbetsmiljöverket pekar på utbildning "helst för chefer, arbetsledare och skyddsombud tillsammans", det står inte i AFS 2023:1 (troligen från upphävda AFS 2001:1); `psykologisk-trygghet-i-arbetsgrupper` rad 15: begreppet formulerades i Edmondsons studie av tillverkningsteam 1999, sjukhusstudien 1996 var föregångaren; `vad-kannetecknar-bra-ledarskap` rad 21 "löser problem snabbare" går längre än Edmondson 1999 (lärande och prestation, inte fart); `lar-dig-pivottabeller-snabbt` rad 49 "Sammanfatta värden efter" heter "Summera värden efter" enligt Microsofts webbtext (skrivbordsmenyn inte kontrollerad); `vanliga-excel-misstag` rad 24 och 28 använder engelska "Merge & Center" (svenska: Sammanfoga och centrera); `vad-ingar-i-bam-utbildning` rad 43 "4–15 deltagare" saknar källa.

### BAM och arbetsmiljö

- [x] Är BAM obligatoriskt? Publicerad 2026-07-06.
- [x] Psykologisk arbetsmiljö på moderna arbetsplatser. Skriven 2026-10-28, publiceras automatiskt 2026-12-30.

### Ledarskap

- [x] Psykologisk trygghet i arbetsgrupper. Publicerad 2026-08-13. Går djupare med
  fem konkreta övningar i stället för att upprepa definitionen i "Vad kännetecknar
  bra ledarskap?", enligt noten som stod här. Länkar internt till majartikeln,
  konflikthanteringsartikeln, BAM-sidan, läslistan och ledarskapssidan.
- [x] Transformativt ledarskap. Skriven 2026-10-28, publiceras automatiskt 2027-02-24.

## Kvar från redesignen 2026-08-12

Redesignen är byggd och sidorna är omgjorda. Det här är vad som medvetet
lämnades, för att det kräver ett beslut eller innehåll som bara Patrik kan
skriva. Inget av det blockerar att sajten går live.

**Kräver ett beslut av Patrik**

- [ ] **Filtrering som egna URL:er** (`/utbildningar/excel/`). Specen vill ha
  det för indexerbarheten. Avrådan tills vidare: fyra program ger fyra tunna
  sidor, och tunt innehåll på en ny domän utan auktoritet skadar mer än det
  hjälper. Ta det när det finns fler program.
- [ ] **Specen räknar med sex program, vi har fyra.** Excel, BAM, ledarskap och
  organisationsutveckling. Ska det bli sex, eller är fyra rätt?

**Innehåll som saknas**

- [ ] **Favoriter på Läslistan.** Beslut 2026-11-04: alla 71 titlar ligger kvar,
  och specens regel om högst tolv kommenterade poster gäller inte längre. I
  stället markeras Patriks favoriter, sorteras överst och får en egen filterknapp.
  Väntar på att Patrik väljer titlarna. Kommentarer per bok är frivilliga, och
  layouten har plats för dem i den bredaste spalten.
- [x] **Riktigt kursinnehåll, ledarskapssidan. Gjort 2026-08-14.** Listan heter nu
  "Upplägg" och beskriver de sex handledningstillfällena i stället för
  utbildningens egenskaper. Tillfälle 01, 02 och 06 är fasta, 03 till 05 väljs
  utifrån kartläggningen vid första tillfället. RCT-belägget och orten flyttades
  ned i brödtexten så att inget påstående försvann.
- [ ] **Riktigt kursinnehåll till listorna 01–05 på Excel- och BAM-sidorna.**
  Listorna är gamla sajtens egna punkter, alltså sanna, men de beskriver
  utbildningens *egenskaper* ("Passar både enskilda deltagare och grupper"), inte
  vad deltagaren *lär sig*. Designunderlaget hade tänkt sig det senare
  ("Pivottabeller från era egna underlag", "Uppslag och referenser utan
  felmeddelanden"). Därför heter rubriken "I korthet" och inte "Innehåll" på de
  två sidorna. Fem rader om vad deltagarna faktiskt gör under dagen skulle vara
  sidans starkaste säljargument, och bara du kan skriva dem. Ledarskapssidan är
  gjord och kan användas som mall.
- [ ] **Citat från BAM och ledarskap.** Alla elva utvärderingar är från
  Excel-utbildningar. Designunderlaget visar citat märkta "Skyddsombud, BAM" och
  "Enhetschef, Ledarskap". De finns inte, så de är utelämnade. Samla in när du
  hållit de kurserna. **Prioritera ledarskap**: det är enda området med mätbar
  sökefterfrågan, och det har noll omdömen att visa.
- [ ] **Leta rätt på utvärderingen från den tredje Excel-utbildningen.** Patrik
  har hållit tre Excel-kurser: två små grupper (de som ligger på `case.html` med
  sex respektive fem svar) och en med 15–20 deltagare. Den sista saknar
  utvärdering på sajten och kanske är sparad någon annanstans. Den vore värdefull
  av två skäl: den visar att ni klarar stora grupper, och den skulle mer än
  fördubbla underlaget bakom betyget 4,8.
- [ ] **Kontrollera att kursnamnet "Excel för administratörer" sitter på rätt
  kurs.** Det sattes 2026-08-13 på kurs 02, alltså den lilla gruppen med fem
  svar. Under samtalet visade det sig att namnet möjligen hör till 15–20-kursen i
  stället. Står på tre ställen: `case.html`, startsidan och Excel-sidan.

**Teknik**

- [ ] **Räkna förfrågningar.** `tack.html` finns, men formuläret öppnar en
  mailto och kan därför inte skicka besökaren dit automatiskt. Vill du mäta
  antalet förfrågningar behövs en riktig formulär-backend (Formspree har en
  gratisnivå) som redirectar till `/tack.html` efter skickat formulär.
- [x] Kolla `lasning.html`-visningsmönstret igen. Gjort 2026-08-13: mönstret
  håller i sig. Sidan är fortfarande mest visad (30 visningar på 28 dagar) och
  fortfarande på akademiska bok-sökningar, inte på kurser. Position 36 betyder
  att den knappt syns. Se "SEO-läget" nedan.
- [x] Begär omindexering i Search Console när redesignen är pushad. Behövs inte
  längre: URL-inspektionen 2026-10-28 visar att Google crawlat om
  excel- och ledarskapssidan 2026-10-14/15, efter ändringarna. Status PASS.

## Excel-hypotesen 2026-08-15

**Mätning, 90 dagar.** Excelsidan får 7 visningar på position 16,4. Ledarskapssidan
får 86 visningar på position 20,4. Excelsidan ligger alltså **bättre** och får
ändå tolv gånger färre visningar. Eftersom visningar är ungefär antal sökningar
gånger sannolikheten att synas, betyder en bättre position med färre visningar
att det finns färre sökningar. "excelutbildning umeå" förekommer inte en enda
gång i frågedatat på 90 dagar.

**Hypotesen som testas:** sidan använde `excel-utbildning` med bindestreck 24
gånger och den hopskrivna formen `excelutbildning` noll gånger. Ledarskapssidan,
den enda som rankar för sin målfras, skrev `ledarskapsutbildning` ihop 19 gånger.
Svenska sammansättningar är olika tokens för Google.

**Åtgärdat 2026-08-15:** Excelsidan lagd om till hopskriven form i title, h1,
meta, ingress, brödtext, FAQ och all strukturerad data. `excelkurs` tillagt som
andra sökform, bland annat i en ny FAQ om skillnaden mot en färdig kurs.
Ankartexten i de två Excel-artiklarnas avslutning ändrad till "excelutbildning i
Umeå", och januariartikeln fick en riktig länk till landningssidan, den hade
frasen som ren text utan länk.

**BAM-sidan lämnas medvetet med bindestreck som kontrollgrupp.** Om Excelsidan
rör sig och BAM står stilla är det ett starkare belägg än om båda ändras samtidigt.
⚠️ **2026-09-10:** bindestrecksformen är fortfarande orörd, men sidan fick nytt
innehåll (BAM-handledarskapet) den dagen. Hypotesen går att läsa av, men "BAM stod
stilla" är inte längre ett rent utfall.

- [x] **BAM-handledarskapet publicerat. Gjort 2026-09-10.** Ligger på `om-oss.html`,
  i startsidans FAQ och på `bam-utbildning-umea.html`. Det sista togs på beslut av
  Patrik trots kontrollgruppsfrysningen; sökordsformen är orörd, men sidan har fått
  nytt innehåll. Se varningen i `HANDOFF.md` innan avläsningen tolkas.
- [ ] **Läs av om sex veckor, alltså efter 2026-09-26.** Mät visningar och
  position för `excel-utbildning-umea.html` på 90 dagar och jämför med 7
  visningar / position 16,4. Rör sig ingenting är hypotesen fel och orsaken är
  sökvolym, inte formulering.
- [x] **Gjort 2026-08-20, bockad 2026-10-06** (stod kvar som öppen trots att
  resultatet låg i `HANDOFF.md`): `excelkurs umeå` 10–100 sökningar/månad, samma
  som `ledarskapsutbildning umeå`; `excelutbildning` 0–10. Ordet är alltså `kurs`,
  inte `utbildning`. Ursprunglig punkt:
  **Mät den verkliga volymen i Google Keyword Planner** (gratis med ett Google
  Ads-konto, kräver ingen annonsering). Search Console visar bara sökningar där
  sajten redan syns, så frånvaro i GSC bevisar inte frånvaro av volym. Det här är
  enda sättet att få veta om "excelutbildning umeå" har 10 eller 500 sökningar i
  månaden, och därmed om Excel är värt mer arbete alls.
- [ ] `[P0]` **Fyll Google Business Profile.** För "i umeå"-sökningar ligger de
  lokala kartträffarna ovanför de organiska. Kontrollerat publikt 2026-10-28:
  profilen "Centrum för organisationsutveckling" finns (Utbildningscenter,
  serviceområde, inlägg 16 sep), men har **0 omdömen och inga foton**. Gör i
  ägarkontot (inte ABF-kontot): foton, tjänst per kurs med länk till
  landningssidan, kategori Företagsutbildning, serviceområde Umeå.
- [ ] `[P0]` **Be tidigare deltagare om omdömen i profilen** (elva utvärderingar
  finns). Antal och betyg är en uttalad rankingfaktor för kartträffarna
  (support.google.com/business/answer/7091).

**Realistisk förväntan:** även en förstaplats på "excelutbildning umeå" ger
sannolikt tiotals sökningar i månaden i en stad på 90 000. Mät den sidan i
förfrågningar, aldrig i trafik. Ledarskap är där volymen finns.

## SEO-läget 2026-08-13

Mätt via `gsc`-MCP:n, 28 dagar (16 juli till 13 augusti), jämfört med
föregående 28 dagar.

- ~~**Första klicket någonsin.** 1 klick den 18 juli.~~ **Fel, rättat 2026-08-15.**
  Sajten har fått **15 klick på 90 dagar**, tolv av dem till startsidan som ligger
  på position 5,1. Klicken kom i en klunga 25 maj till 7 juni, sedan ett 7 juli
  och ett 18 juli. Orsaken till felet: **frågedimensionen anonymiserar sällsynta
  sökningar**, så summan av frågetabellen blir 0 klick även när sajten fått klick.
  Mät alltid på dimensionen sida eller datum, och på 90 dagar, inte 28.
- Visningar 78, upp från 60. CTR 1,28 %, snittposition 24,5.
- **`ledarskapsutbildning umeå` är den överlägset största frågan**: 22 visningar,
  position 21,8. Föregående period 28 visningar. Ledarskapssidan får 23
  visningar totalt. Det motbevisar den gamla slutsatsen att huvudnyckelorden
  saknar sökvolym: volymen finns, vi ligger bara på sida tre.
- `excel utbildning umeå` och `bam utbildning umeå` ger fortfarande i princip
  ingenting. Excel-sidan syns inte alls i frågedatat.
- `lasning.html` är mest visad (30) men på bok- och forskningsfrågor, position
  36. Den drar fel trafik och konverterar inte.
- `/ai/` får 10 visningar, position 13. Det är buildapp-sidan som ligger nästlad
  under domänen.

**Slutsats:** ledarskap är den enda ingång som har mätbar efterfrågan just nu.
Om något ska prioriteras i innehåll och backlinks är det den, inte Excel.

- [ ] Överväg att flytta tyngdpunkten mot ledarskap i artikelserien och i
  backlink-arbetet. Två av de fyra oskrivna Excel-artiklarna kan bytas mot
  ledarskapsämnen.
- [x] **Död URL rättad 2026-08-13.** `/2025/05/23/excel-funktioner-som-sparar-tid.html`
  låg indexerad och svarade 404, med visningar på position 10. Artikeln hade fått
  ett nytt datum i frontmattern, vilket flyttade permalänken till `/2026/01/26/`.
  Den gamla adressen är nu en canonical plus meta refresh mot den nya. Läxa:
  ändra aldrig `date:` i en publicerad artikel utan att lägga en vidarebefordran
  på den gamla adressen.

## Nyckelord att sikta på

**Primära:** excelutbildning umeå, excel kurs umeå, bam utbildning umeå,
ledarskapsutbildning umeå.

**Sekundära:** excelkurs företag, arbetsmiljöutbildning umeå, ledarskapskurs umeå,
organisationsutveckling umeå.

**Long-tail:** verksamhetsanpassad excelutbildning, bam utbildning för chefer och
skyddsombud, psykologiskt ledarskap utbildning.

## Realistisk tidsplan

1 till 3 månader för ordentlig indexering, 3 till 6 månader innan lokal ranking
börjar, 6 till 12 månader innan lokala sökningar kan vinnas.

## Granskning 2026-09-16

Fynd från cockpitens granskningskolumner (Lighthouse mobil, W3C, UX-skript, headers, TLS, OWASP). Mätvärdena står under `## Audits` i CONTEXT.md.

- [ ] `[P2]` Search Console: sex sitemap-URL:er är inte indexerade, tre är okända för Google trots sitemapen. Begär indexering för hand i URL-inspektionen (API:t kan inte): 2026-08-20 ai-och-copilot-i-excel, 2026-07-06 ar-bam-obligatoriskt, 2026-06-14 vanliga-excel-misstag, 2026-04-27 vad-ingar-i-bam-utbildning, 2026-03-30 konflikthantering-for-chefer, integritetspolicy. Övriga icke-indexerade i rapporten är avsiktliga: /ai/ 404, http-omdirigering, index.html med canonical, noindex på cv och tack, gamla artikeldatum.

## UX-audit 2026-09-24

Från aifabriken `tools/audit-run.mjs ux` (skripthalvan av skillen ux-audit, mobil, hemsidan, utan --interact). Warn, inte fail: allt nedan klarar WCAG 2.5.8, men UX-ribban är 44 px.

- [ ] `[P3]` orgutveckling.se: cirka 20 tryckytor under 44 px, bland annat logotypen "ORG/UTVECKLING" 24 px, "Öppna meny" 32 px, "Stäng meny" 28 px, "Läs alla utvärderingar →" 27 px. Designbeslut, därför inte rättat automatiskt.
- [ ] `[P3]` orgutveckling.se: fyra knappar i primärstil synliga samtidigt (Von Restorff). Välj en primär handling per vy.

## Granskning 2026-10-06

Fynd från den automatiska sviten (aifabriken `tools/audit-suite.ts`: headers, npm audit, secrets, Actions, markup, axe). Mätvärdena står som `(automated)`-rader under `## Audits` i CONTEXT.md.

- [x] `[P3]` Markup: en `<link>` i `<head>` behåller `as`-attributet efter att `rel` bytts från `preload` till `stylesheet` (html-validate `attribute-misuse`, renderad DOM, `head > link:nth-child(11)`). **Gjort 2026-10-06 på grenen `batch/2026-10-06`:** typsnitten laddas med en vanlig `<link rel="stylesheet">` på alla 16 sidmallar. Grenen ligger i `main` och är live sedan 2026-10-07; kolumnen är inte omkörd.
- [x] `[P3]` Headers: CSP:n har `script-src 'self' 'unsafe-inline'`, vilket sviten underkänner. **Repodelen gjord 2026-10-06 på grenen `batch/2026-10-06`:** inga inline-skript eller inline-hanterare finns kvar (`onclick` bundet i `site.js`, `cv.html`-skriptet flyttat till `cv.js`), vaktat av `check_csp.py`. **Kvar för Patrik, säkert nu när grenen är mergad och live (2026-10-07):** ta bort `'unsafe-inline'` ur `script-src` i zonens Transform Rule "Security headers". Kontrollera konsolen på en sida efteråt: Cloudflare kan själv injicera inline-skript (t.ex. e-postskyddet under `/cdn-cgi/l/`), och det är inte testat här. Regeländringen fick inte göras före mergen (mobilmenyn hade dött på den publicerade sajten); det hindret är borta sedan 2026-10-07. **Gjort 2026-10-28 via API:** `'unsafe-inline'` borta ur `script-src` (kvar i `style-src`). Verifierat i Chromium mot produktion: 7 sidor, 0 CSP-fel, beacon laddar, mobilmenyn öppnar, mejllänken i `cv.html` byggs. Inga Cloudflare-injicerade inline-skript i svaren.

## Från tillvaxt 2026-10-28

Underlag: `C:\dev\tillvaxt\docs\research\seo-och-ai-synlighet.md` och veckorapporterna i `C:\dev\tillvaxt\rapporter\orgutveckling\`. Läget i Cloudflare samma dag: AI-botar välkomna (ingen blockering, robots.txt ordagrant repots).

- [x] `[P1]` Korta titlarna till högst cirka 60 tecken. 13 av 22 sitemap-sidor är längre: alla artiklar (82 till 126 tecken), samt `bam-utbildning-umea.html` 69, `om-oss.html` 67, `kontakt.html` 67. Google kapar resten. **Gjort 2026-10-28 (`21480d6`):** layoutsuffixet borta, valfritt `seo_title` i artikelfrontmatter. Kvar över 60: `excel-utbildning-umea.html` 62 (godtaget) och `bam-utbildning-umea.html` 69, medvetet orörd som kontrollgrupp för sökordshypotesen.
- [ ] `[P1]` Bing Webmaster Tools: importera från Search Console och skicka sitemap. Bing Places: importera från företagsprofilen. Bing matar Copilot, DuckDuckGo och en del av ChatGPT search.
- [ ] `[P1]` Be tre lokala parter om en länk: studieförbund, Prevent (listar de BAM-handledare? overifierat), kunder i `case.html`.
- [x] `[P2]` IndexNow: nyckelfil i reporoten och ett POST-anrop efter deploy (Bing och Yandex, inte Google). **Gjort 2026-11-18:** `af9ecb8c2d1b048e34d603edab69413a.txt` i reporoten, `.github/workflows/indexnow.yml` skickar sitemapens URL:er efter varje lyckat Pages-bygge (`page_build`), svar se HANDOFF.
- [ ] `[P2]` Nationell guidesida för `excelkurs online` / `grundkurs i excel` (1 000 till 10 000 sök/mån, Keyword Planner 2026-08-20).
- [ ] `[P2]` "Svara först": första stycket på varje landningssida säger vem, vad, var, format och pris. Artiklar får siffror och källor (GEO-studien, arXiv 2311.09735).
- [x] (rättad 2026-10-30) `[P3]` Ta bort `AggregateRating` från `LocalBusiness` i `index.html`: Google visar aldrig egna omdömen om det egna företaget som stjärnor.
- [x] (rättad 2026-10-30) `[P3]` Korta meta description på `om-oss.html` (187) och tre artiklar (166 till 177 tecken).
