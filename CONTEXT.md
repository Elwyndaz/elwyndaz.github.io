# Project context

## Product intent

Webbplats för Centrum för Organisations-Utveckling i Umeå. Excelutbildning,
BAM-utbildning och ledarskapsutbildning. Målet är lokal synlighet i sökning, inte
volym.

Det här är ett fritidsprojekt vid sidan av heltidsstudier, utan registrerad firma.
Betalning löses via Frilans Finans om en kund dyker upp. Håll alla åtgärder gratis
och lågtröskel.

Sajten säljer inga kursplatser i en kalender. Den ska hittas i sökresultatet och
göra det enkelt att höra av sig. Varje sida slutar i en förfrågan, aldrig i en
anmälan. Därför finns ingen datumkolumn någonstans.

## Architecture

- GitHub Pages med domänen `orgutveckling.se`, se `CNAME`. Domänen är registrerad
  hos Strato, DNS och proxy sköts av Cloudflare.
- **Delat designsystem i `style.css`.** Alla sidor länkar `/style.css` och
  `/site.js`. Det är rena statiska filer, inget byggsteg, men designändringar görs
  numera på ett ställe i stället för att synkas för hand över tio filer.
- **Statiska sidor** (`index.html`, `utbildningar.html`, `case.html`,
  `kontakt.html`, `om-oss.html`, `lasning.html`, `lanktips.html`, `tack.html`,
  `404.html` och de tre landningssidorna): vanlig HTML utan Jekyll-frontmatter.
  Header, mobilmeny och footer är kopierad markup i varje fil, eftersom det inte
  finns något include-system för dem.
- **Blogg** under `/artiklar/`: Jekyll, inlägg i `_posts/` som
  `ÅÅÅÅ-MM-DD-slug.md`, layout i `_layouts/artikel.html`. `artiklar.html` är
  Kunskap-sidan, loopar över `site.posts` och länkar vidare till Läslistan och
  Länktips.
- `site.js` sköter mobilmeny, e-postskydd, filterchips, förfrågningsformuläret och
  inzoomningen vid scroll. Elementen hittas via `data-email`, `data-mailto` och
  `data-filter-set`, så en ny sida behöver ingen egen JavaScript.
- `cv.html` står medvetet utanför arkitekturen: ingen nav-länk, `noindex,
  nofollow`, inte i `sitemap.xml`, ingår inte i copyright-årsbumpen. Den har ett
  eget inbyggt `<style>`-block och länkar varken `style.css` eller `site.js`,
  eftersom den riktar sig till en annan läsare (en PTP-handledare) och använder en
  annan e-postadress (`patz.lofgren@gmail.com`, inte `kontakt@`). Den är byggd som
  ett utskrivbart dokument i en spalt med egen print-CSS: sidan **är** dokumentet.
- **Sammansatta sökord skrivs ihop, inte med bindestreck.** `excelutbildning`,
  inte `excel-utbildning`. Svenska är ett sammansättningsspråk och den hopskrivna
  formen är både korrekt och det folk faktiskt söker på. För Google är de två
  olika tokens. Ledarskapssidan skrev `ledarskapsutbildning` ihop och är den enda
  sida som rankar för sin målfras; Excel- och BAM-sidorna skrev med bindestreck
  och rankar inte. Excelsidan lades om 2026-08-15, BAM-sidan står kvar som
  kontrollgrupp. Bindestreck är fortfarande rätt i **filnamn och URL:er**, de
  ändras aldrig.
- **`check_faq.py` måste gå igenom före push.** `python check_faq.py` efter
  `jekyll build`. Den kontrollerar att varje `FAQPage`-schema matchar den synliga
  FAQ-texten ordagrant, vilket Google kräver. Felet är lätt att göra: redigerar
  man den synliga texten och glömmer JSON-LD:n slutar rich resultatet fungera
  utan att något syns. Det hade redan hänt på BAM-sidan, upptäckt och rättat
  2026-08-15.
- **Rutnät hör hemma i `style.css`, aldrig som `style="display:grid..."` i HTML.**
  Inline-style vinner över alla mediefrågor, så ett rutnät med fast pixelspalt
  fortsätter ligga i två spalter på en telefon och trycker ut sidan åt höger.
  Det hade redan hänt på två ställen, upptäckt 2026-08-15: startsidans hero och
  avslutningsblocket på `om-oss.html`. Startsidan var 592 px bred på en 375 px
  skärm. `body{overflow-x:hidden}` döljer rullisten men tar inte bort överflödet,
  och regeln ignoreras dessutom ofta på iOS, så felet syns som att sidan går att
  zooma och panorera när ingen annan sida gör det.
- **`check_layout.js` måste gå igenom före push.** `node check_layout.js`, kräver
  `npm i -g playwright`. Den startar en egen server på loopback och mäter att
  ingen sida i reporoten blir bredare än skärmen på 320, 375, 430 och 768 px.
  Samma roll som `check_faq.py`: en statisk sajt har ingen kompilator, så felet
  ligger annars kvar tills en människa råkar öppna sidan i mobilen. Två
  följdfällor den fångar: en grid-cell kan inte krympa under sitt innehålls
  minsta bredd så länge `min-width` är `auto`, och webbläsarens egen regel ger
  `<fieldset>` dessutom `min-inline-size:min-content`.
- **`/ai/` ska förbli 404. Bygg ingen vidarebefordran dit.** Beslutat 2026-08-15.
  Sidan flyttade till `buildapp.se/ai/` och den gamla adressen ligger kvar
  indexerad med visningar, vilket ser ut som samma fel som den döda artikel-URL:en.
  Det är det inte. Artikeln fanns kvar på samma domän och drog rätt publik.
  `/ai/` drar sökningar på Claude och AI-verktyg, har gett **0 klick på 90 dagar**
  och har noll inkommande länkar, alltså finns ingen auktoritet att bevara och
  ingen publik att rädda. 404 är den sanna signalen och Google släpper adressen
  av sig själv. Använd inte heller Borttagningar i Search Console, den är
  tillfällig i sex månader och avsedd för akut innehåll.
- **Ändra aldrig `date:` i en publicerad artikel.** Permalänken följer
  frontmatterns datum, så den gamla URL:en blir en 404 som ligger kvar indexerad.
  Har det redan hänt, lägg en canonical plus meta refresh på den gamla adressen,
  som `/2025/05/23/excel-funktioner-som-sparar-tid.html`.

## Constraints

- De statiska sidorna saknar Jekyll-frontmatter, så Liquid-taggar fungerar **inte**
  i dem. Copyright-året måste bumpas för hand i footern på varje statisk sida en
  gång om året. `_layouts/artikel.html` och `artiklar.html` slipper det via
  `{{ site.time | date: '%Y' }}`.
- **Navigationsordningen är densamma på alla sidor**: Utbildningar, Kunskap,
  Om oss, Kontakt, plus knappen Begär förslag. Artiklar, lästips och länktips
  ligger under Kunskap. "Utvärderingar" är ett internt ord och finns inte i
  navigationen, men `case.html` lever kvar som destination och länkas från
  startsidan, utbildningssidorna och footern. Det har orsakat buggar förut,
  verifiera ordningen på samtliga sidor om navigationen ändras.
- E-postadressen skrivs aldrig ut i klartext utan byggs ihop av `site.js`, för att
  undvika spam-bottar. Sätt `data-email=""` på ett tomt element där adressen ska
  synas.
- Bildnamn måste vara ren ASCII. Å, ä och ö har orsakat renderingsproblem.
- `sitemap.xml` underhålls manuellt och måste matcha verkliga URL:er. Jekylls
  standardpermalink är `/ÅÅÅÅ/MM/DD/slug.html` där datumet kommer från
  frontmatterns `date`, inte nödvändigtvis från filnamnet. `tack.html` och
  `404.html` är `noindex` och ska inte in i sitemap.
- **Bygg alltid lokalt innan push**: `jekyll build --destination _site`. Ruby 3.3
  och Jekyll 4.4 är installerade (2026-08-13), och `C:\Ruby33-x64\bin` ligger i
  user-PATH. GitHub Pages kör Jekyll 3.10, men repot använder bara `site.posts`,
  `page.url` och standardfilter, som beter sig likadant i båda versionerna.
- **`_site/` är byggutdata** och ska aldrig committas. Den är gitignorerad.
- **Designunderlaget får aldrig publiceras.** Mappen `Webbanalys och strategi/`,
  zip-filen och `HANDOFF-REDESIGN.md` ligger i reporoten men är interna. De är
  både gitignorerade och listade under `exclude:` i `_config.yml`, eftersom
  Jekyll annars kopierar dem rakt ut till `orgutveckling.se`.

## Design system

Registerlayout: hårfina linjer, numrerade rader, metadata i monospace. **Noll
cards, noll rundade hörn, radie 0 i hela systemet.** Känns något som ett kort har
det blivit fel. Undantaget är `.ask-box`, den inramade förfrågningsrutan i
högerspalten: den har en 1 px ram i designunderlaget och är en sidospalt, inte ett
kort som upprepas i ett rutnät. Rytmen bryts av **ett enda mörkt typografiskt
statement per sida**; ett andra block tar bort verkan.

Två gradstorlekar på rubriknivå: **startsidans hero går till 104 px** och är den
enda plats där displaygraden släpps lös. **Undersidornas `h1` är 56 px.** Vw-
lutningarna i `clamp()` är satta så att maxgraden nås vid ungefär 1280 px, som är
bredden designunderlaget är ritat i. Sänk inte lutningen: då når rubrikerna aldrig
sin fulla grad och sidan tappar sin tyngd.

Faktaraden finns i två former. Grundformen är liten och saklig, som en tabellrad
på undersidorna. `.fact-row.stor` skalar upp samma komponent för startsidans och
utvärderingssidans bevisremsa, där siffrorna är hela poängen.

Typsnitt, tre familjer: Newsreader (display, rubriker, citat, siffror, alltid
vikt 300 i display med `letter-spacing:-.03em`), IBM Plex Sans (brödtext och
gränssnitt), IBM Plex Mono (etiketter, metadata, siffror, aldrig brödtext).

Palett, som CSS-variabler i `style.css`:

    --papper       #F2EFE8   sidbakgrund
    --papper-mork  #DFDACD   CTA-band, hover, sekundär yta
    --black        #15150F   text, knappar, statement-yta
    --dampad       #6B675C   etiketter och metadata
    --dampad-mork  #A6A196   samma roll på mörk botten
    --accent       #A8431F   pekar: siffror, pilar, aktiv nav, hover

En accent, en uppgift: den pekar. Aldrig som yta, aldrig som gradient, aldrig
dekorativt. Dämpad grå används aldrig till brödtext. Den gamla paletten (Grafit,
Petrol, Lera, Papper) och den gamla `.cou-mark`-loggan utgår helt, utom i
`cv.html`.

Ordmärket är `ORG / UTVECKLING`. Det fullständiga namnet, Centrum för
Organisationsutveckling, står i footern, i `<title>` och i strukturerad data.

Fyra rörelser, inga fler: registerrad tonar och dras in 12 px vid hover (180 ms),
sektion tonar in 8 px underifrån en gång vid scroll (av på mobil), mobilmenyn är
helskärm utan slide, knappar och länkar byter färg. Displaytypografin rör sig
aldrig. Allt respekterar `prefers-reduced-motion`.

## Important decisions

- **Ett delat `style.css` i stället för en Jekyll-layout.** Specen föreslog en
  delad Jekyll-layout för landningssidorna. En delad CSS-fil ger samma vinst utan
  byggsteg och går att verifiera direkt i webbläsaren. Beslutet står kvar även nu
  när Jekyll finns lokalt: färre rörliga delar för de statiska sidorna.
- **Celler med skiljelinje har padding på båda sidor om linjen.** Bara
  ytterkanterna går i noll. En enda `padding`-regel för alla celler i ett rutnät
  ger text som ligger kloss mot linjen i cell 2 och framåt. Det var en verklig bugg
  i processteg, kunskapskort och sifferrad.
- **Formuläret på `kontakt.html` har ingen backend.** Det sätter ihop en mailto
  med ifyllda fält, så besökaren skickar själv och sajten sparar ingenting. Priset
  är att `tack.html` inte kan nås automatiskt efter skickat formulär.
- **`lasning.html` och `lanktips.html` förblir två sidor.** Beslutat 2026-08-13.
  Redesignspecen ville slå ihop dem till en Läslista med redirect från
  länktipsen. Vi avviker medvetet: `lasning.html` är sajtens mest visade sida i
  Search Console, GitHub Pages kan inte göra en riktig 301 utan bara
  `<meta refresh>`, och en ny domän utan auktoritet har inget att vinna på att
  offra en fungerande URL. Båda sidorna är omgjorda i den nya designen och
  korslänkade. Riv inte upp detta utan att fråga.
- **FAQ-innehållet ligger kvar** på startsidan och på varje landningssida,
  tillsammans med `FAQPage`-schema. Det är billig och konkret SEO-yta.
- **Utvärderingssiffrorna 4,8 / 4,7 / 100 % måste vara sanna och stå kvar.** Det
  är de som skiljer ett påstående från ett löfte. Även kritiken publiceras.
- **Artikelserien** är en artikel i veckan, kategoriserad Excel, Arbetsmiljö eller
  Ledarskap, för långsiktig auktoritet snarare än snabba resultat.
- **Ledarskapssidans lista heter "Upplägg" och beskriver de sex tillfällena.**
  Beslutat 2026-08-14. Tillfälle 01, 02 och 06 är fasta, 03 till 05 väljs utifrån
  kartläggningen vid första tillfället. Excel- och BAM-sidorna har fortfarande
  "I korthet" med egenskaper, tills det finns riktigt innehåll även för dem.
- **Kursupplägget bygger på en manual för Funktionellt ledarskap, men bokens
  modullista publiceras aldrig.** Modulkatalogen på fjorton punkter är en
  innehållsförteckning ur en Studentlitteratur-titel, och att återge den i ordning
  som sajtens kursinnehåll vore att publicera bokens struktur. Metoden får och ska
  namnges, det är trovärdighet. Områdena bakom tillfälle 03 till 05 beskrivs
  parafraserat i löptext, aldrig som en numrerad katalog.

## Environments and operations

Publicering sker genom uppladdning till `main`; GitHub Pages bygger Jekyll
automatiskt för bloggdelen. Search Console-data hämtas via MCP-servern `gsc`,
fråga efter data i stället för att gissa.

För att titta på sidor i en webbläsare, använd `playwright-cli` (installerat
globalt 2026-08-14) före en browser-MCP: det är en vanlig CLI och kostar inga
schematokens. `playwright-cli open <url>`, `find "text"`, `click e15`, `close`.
Den skriver snapshots i `.playwright-cli/` i den mapp kommandot körs ifrån, som
är gitignorerad här. Fullständig beskrivning i `C:\dev\AGENTS.md`.

Kontakt: kontakt@orgutveckling.se, 072-221 13 37.
