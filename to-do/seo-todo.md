# SEO To-do – orgutveckling.se

## Klart ✅
- [x] E-post bytt till kontakt@orgutveckling.se
- [x] OG-bild bytt till og-image.png (1200x630)
- [x] robots: index, follow på alla sidor
- [x] Bättre H1-taggar på alla sidor
- [x] Meta description tillagd på case.html
- [x] Sitemap uppdaterad med /artiklar/ och landningssidor
- [x] Jekyll-blogg uppsatt
- [x] Google Search Console uppsatt
- [x] author-fält tillagt i strukturerad data (case.html)
- [x] Ladda upp og-image.png till GitHub-repots rot
- [x] Skicka in sitemap.xml i Search Console
- [x] Bildfilnamn bytta (excel-utbildning-umea.png, utvarderingar-umea.png, boka-utbildning-umea.png)
- [x] Bindestreck borttaget i loggan (mobil: Organisationsutveckling, desktop: Organisations Utveckling)
- [x] Landningssida: excel-utbildning-umea.html
- [x] Landningssida: bam-utbildning-umea.html
- [x] Landningssida: ledarskapsutbildning-umea.html
- [x] Breadcrumb-schema tillagt på artikelsidor (_layouts/artikel.html)
- [x] FAQ-sektion tillagd på startsidan (HTML + FAQPage JSON-LD)
- [x] Mer text på startsidan – ökat från 446 till ~700 synliga ord
- [x] Fix: alla interna logo-länkar ändrade från index.html till / (åtgärdar "Alternativ sida med korrekt kanonisk tagg" i Search Console)
- [x] Fix: boka-utbildning-umea.html borttagen från sitemap.xml (filen existerar inte – men finns fortfarande live, se manuella åtgärder)
- [x] Fix: Knapparna "Boka utbildning" / "Våra utbildningar" på startsidan – la till `align-items:center` på `.hero-actions` så outline-knappen inte sträcktes till samma höjd som primary-knappen
- [x] Fix: Saknad `<footer>`-tagg på startsidan – `index.html` hade en `</footer>` utan motsvarande `<footer class="site-footer">`. Det gjorde att footerns ram, gråa bakgrund och layout (vänster/höger-uppdelning) inte syntes på startsidan, till skillnad från alla andra sidor
- [x] Fix: sitemap.xml – `/artiklar.html` ändrat till `/artiklar/` (matchar `permalink: /artiklar/` i artiklar.html – `/artiklar.html` hade gett 404 i Search Console)
- [x] Fix: footern längst ner på alla sidor – tog bort den grå bakgrundsrutan (`background-color:#fafafa`) som bara täckte textkolumnens bredd och såg ut som ett löst, felplacerat kort eftersom den (på grund av CSS-grid-layouten) aldrig kunde sträcka sig under sidofältet. Behöll den tunna avdelarlinjen ovanför texten. Gjort på samtliga 9 statiska sidor + `_layouts/artikel.html`
- [x] **2026-07-01**: Fix: favicon var trasig på ALLA sidor – `<link rel="icon" href="COU.png">` pekade på en fil som inte finns i repot (bara `COU.webp` finns). Ändrat till `type="image/webp" href="COU.webp"` på samtliga 9 statiska sidor + `artiklar.html` + `_layouts/artikel.html`. Verifierat live: `/COU.png` gav 404.
- [x] **2026-07-01**: Fix: `publisher.logo.url` i Article-structured-data (`_layouts/artikel.html`) pekade på `logo.png`, som inte finns – bara `logo.webp` finns. Ändrat till `logo.webp`.
- [x] **2026-07-01**: Fix: og:image/twitter:image pekade på `og-image.png` (1.7MB) på alla sidor. Den redan existerande, mindre `og-image.webp` (80KB) låg oanvänd i repot – bytt alla referenser till den. Löser samtidigt bildkomprimerings-punkten nedan för og-bilden.
- [x] **2026-07-01**: Fix: sitemap.xml – alla 6 artikel-URL:er pekade på fel format (`/slug.html`). Verifierat live att `_config.yml` saknar `permalink`-inställning så Jekylls standard gäller: `/ÅÅÅÅ/MM/DD/slug.html` (datumet är post-frontmatterns `date:`-fält, inte alltid samma som filnamnet – se `vanliga-excel-misstag.html`, filnamn har 2026-06-29 men frontmatter-datum 2026-06-14, och URL:en följer frontmatter-datumet). Samtidigt tillagd den saknade artikeln "Konflikthantering för chefer" som helt saknades i sitemap.xml.
- [x] **2026-07-01**: Verifierat live: `boka-utbildning-umea.html` finns INTE (404) – tidigare osäkerhet i to-do var inaktuell, ingen åtgärd behövs längre.

---

## Att göra – tekniskt

- [x] Skapa Google Business Profile (går utan bolag, verifieras via vykort)
- [ ] Komprimera logo.webp om filstorleken är stor (og-image löst, se Klart-listan – bytt till redan komprimerad og-image.webp)
- [x] Konvertera bilder till WebP-format om möjligt – og-image och favicon klart 2026-07-01, logo.webp fanns redan
- [x] Meta description på startsidan kortad till 148 tecken (var 177, gräns 160)
- [ ] Efter publicering: verifiera åtgärder i Search Console (klicka "Verifiera att åtgärder vidtagits")

---

## Att verifiera – KLART, se Klart-listan ovan (2026-07-01)

Alla tre punkter som tidigare stod här ("WebP-bilder på startsidan", "URL för Excel-artikeln", "boka-utbildning-umea.html") är nu verifierade mot den live-sajten och åtgärdade. Se "Klart ✅"-raderna daterade 2026-07-01 ovan för detaljer.

---

## Att göra – innehåll (störst SEO-effekt)

- [x] **"10 Excel-funktioner som sparar tid"**: denna punkt verkar redan vara klar, bara under ett annat namn – `_posts/2025-05-23-excel-funktioner-som-sparar-tid.md` ("5 Excel-funktioner som sparar tid varje dag") finns redan och är med i sitemap.xml. Förslag: bocka av denna som klar. Om du ändå vill ha en till artikel med fler/andra Excel-funktioner går det bra, men då bör den ha en annan vinkel så den inte konkurrerar med den befintliga artikeln i sökresultat.

---

## Att göra – artiklar (1 per vecka)

### Excel
- [ ] Så lär du dig pivottabeller snabbt
- [ ] Excel för ekonomer
- [ ] Excel för HR
- [ ] Excelkurs för nybörjare i Umeå

### BAM / arbetsmiljö
- [ ] Är BAM obligatoriskt? *(observera: artikeln "BAM och SAM – vad är egentligen skillnaden?" nämner redan kort att BAM inte i sig är ett lagkrav. En framtida artikel om detta bör gå djupare – t.ex. kollektivavtal, branschspecifika krav, eller vad som händer vid en arbetsmiljöinspektion utan utbildad personal)*
- [ ] Psykologisk arbetsmiljö på moderna arbetsplatser

### Ledarskap
- [ ] Psykologisk trygghet i arbetsgrupper *(observera: artikeln "Vad kännetecknar bra ledarskap?" har redan ett avsnitt om psykologisk trygghet – om denna artikel skrivs senare bör den gå djupare/bredare, t.ex. konkreta övningar för grupper, snarare än att upprepa samma definition)*
- [ ] Konflikthantering för chefer
- [ ] Transformativt ledarskap

---

## Att göra – backlinks och lokal auktoritet

- [ ] Registrera i lokala företagsregister i Umeå
- [ ] Kontakta samarbetspartners om länkutbyte
- [ ] Skriv gästinlägg på relevanta sajter (arbetsmiljö, HR, Excel)
- [ ] Dela artiklar på LinkedIn löpande

---

## Nyckelord att sikta på

### Primära
- excelutbildning umeå
- excel kurs umeå
- bam utbildning umeå
- ledarskapsutbildning umeå

### Sekundära
- excelkurs företag
- arbetsmiljöutbildning umeå
- ledarskapskurs umeå
- organisationsutveckling umeå

### Long-tail
- verksamhetsanpassad excelutbildning
- bam utbildning för chefer och skyddsombud
- psykologiskt ledarskap utbildning

---

## Realistisk tidsplan för ranking
- **1–3 månader** – börjar indexeras ordentligt
- **3–6 månader** – börjar ranka lokalt
- **6–12 månader** – kan börja vinna lokala sökningar

---

## Manuella åtgärder (kan inte fixas i kod)

- [x] **boka-utbildning-umea.html** – verifierat 2026-07-01 via direkt anrop mot live-sajten att filen ger 404, dvs den finns inte längre. Ingen åtgärd behövs.
- [ ] Klicka "Verifiera att åtgärder vidtagits" i Search Console efter nästa push

---

## Design-förbättringar (från extern granskning)

- [x] A: Sidebar-gap ökad (2em → 3rem), logo och nav tydligt separerade
- [x] B: H1 hero-rubrik begränsad till max-width: 680px
- [x] C: Perfect-fourth typskala tillagd som CSS-variabler (--text-xs till --text-4xl), h2/h3 använder skalan
- [x] E: Knapphierarki – primary större padding, outline lite mindre + font-size
- [x] F: Stat-kort på Excel-sidan: align-items:stretch, justify-content:flex-start
- [x] G: Body-text begränsad till max-width: 68ch på Excel, BAM och ledarskaps-sidor
- [x] H: Footer fått background-color: #fafafa och padding-bottom
- [x] I: Logotyp-text (.site-title) minskad till 0.75rem, uppercase, letter-spacing 0.07em
- [x] J: Active nav-länk använder --color-active-nav (#3d6cf5 → nu #5C8A9C efter palettbytet 2026-07-01) istället för samma blå som CTA
- [x] D: **2026-07-01** – löst genom ny logotyp-implementation. `logo.webp`-illustrationen på startsidan ersattes med det nya rutnätsmärket + typografisk wordmark (ren HTML/CSS, se `to-do/project-state.md` för detaljer). Ingen clipart-bild längre.

### Ny logotyp – 2026-07-01 (från Claude Design-handoff)
- [x] Rutnätsmärke (`.cou-mark`) + Space Grotesk-wordmark implementerat i sidofält, mobilheader, favicon (`favicon.svg`) och startsidans hero
- [x] Fullständigt palettbyte: Grafit/Petrol/Lera/Papper ersätter den gamla blå (#105AFE) överallt – knappar, länkar, aktiv nav, badges
- [x] **Klar 2026-07-01**: `og-image.png/webp` och `logo.png/webp` ersatta med riktiga exporter av det nya rutnätsmärket (levererade av Patrik). `og-image.png` gick från 1.7MB till 30KB på köpet.
