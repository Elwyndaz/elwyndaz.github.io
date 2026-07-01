# Projektstatus – orgutveckling.se

> **Syfte med denna fil**: en snabb sammanfattning av projektets skick och uppbyggnad.
> Om du (eller en ny Claude-konversation) börjar om från noll – klistra in eller ladda upp
> denna fil tillsammans med `to-do/seo-todo.md` så finns kontexten direkt, utan att allt
> behöver förklaras igen från grunden.

---

## Om projektet

- **Vad**: Webbplats för Centrum för Organisations-Utveckling (COU) i Umeå.
  Erbjuder Excel-utbildning, BAM-utbildning (Bättre Arbetsmiljö) och ledarskapsutbildning.
- **Hosting**: GitHub Pages, domän `orgutveckling.se` (se CNAME-filen i repot).
- **Publicering**: filer laddas upp manuellt till GitHub via webbgränssnittet – inget
  byggsteg/CI för de statiska sidorna. Jekyll körs automatiskt av GitHub Pages för bloggdelen.
- **Kontaktuppgifter**: kontakt@orgutveckling.se, 072-221 13 37.

---

## Arkitektur – så hänger det ihop

- **Statiska sidor** (`index.html`, `utbildningar.html`, `case.html`, `kontakt.html`,
  `lasning.html`, `lanktips.html`, `excel-utbildning-umea.html`, `bam-utbildning-umea.html`,
  `ledarskapsutbildning-umea.html`): vanlig HTML. Varje sida har sin **egen `<style>`-block**
  i `<head>` – det finns ingen delad CSS-fil. Designsystemet (färger, typsnitt, mellanrum,
  knappstilar osv.) ligger som CSS-variabler i `:root{...}` på varje sida och måste vara
  identiskt mellan sidorna.
- **Blogg/artiklar**: byggs med Jekyll under `/artiklar/`. Inlägg ligger i `_posts/`
  (`ÅÅÅÅ-MM-DD-slug.md`), layout i `_layouts/artikel.html`. `artiklar.html` har
  `permalink: /artiklar/` och loopar automatiskt över `site.posts` – nya inlägg dyker
  upp där automatiskt, inga manuella länkar behövs.
- **Navigation** (samma ordning på ALLA sidor, sidebar + mobilmeny):
  Utbildningar → Utvärderingar (case.html) → Artiklar → Lästips (lasning.html) →
  Länktips (lanktips.html) → Kontakt. Har orsakat buggar förut vid redigering – kolla
  alltid ordningen på alla sidor om navigationen ändras.
- **E-postadress i HTML**: skrivs aldrig ut direkt i källkoden, byggs ihop med JS
  (`var u='kontakt';var d='orgutveckling.se'`) för att undvika spam-bots.
- **Bildnamn**: endast ASCII, inga svenska tecken (å/ä/ö) – har orsakat
  renderingsproblem tidigare.
- **sitemap.xml**: underhålls manuellt och måste matcha de verkliga URL:erna. Jekylls
  permalink-inställningar kan avvika från vad man tror – se "Kända buggar" nedan.

---

## Klart ✅ (sammanfattning – fullständig lista i to-do/seo-todo.md)

- Grundläggande SEO: meta-taggar, robots, sitemap, Search Console, structured data
  (LocalBusiness, FAQPage, Course, Review, Breadcrumb)
- Tre SEO-landningssidor: excel-utbildning-umea.html, bam-utbildning-umea.html,
  ledarskapsutbildning-umea.html (medvetet utanför huvudnavigationen, men länkade
  kontextuellt från utbildningar.html och varandra)
- Jekyll-blogg uppsatt
- Fem artiklar publicerade:
  - "5 Excel-funktioner som sparar tid varje dag" (2025-05-23)
  - "6 vanliga Excel-misstag på jobbet – och hur du undviker dem" (2026-06-14)
  - "Vad ingår i en BAM-utbildning? Innehåll och upplägg" (2026-06-14)
  - "Vad kännetecknar bra ledarskap? Fem beteenden som gör skillnad" (2026-06-14)
  - "BAM och SAM – vad är egentligen skillnaden?" (2026-06-14)
- Designjusteringar efter extern granskning (sidebar-spacing, typskala, knapphierarki,
  footer-styling, aktiv nav-färg m.m.)
- **2026-06-14**: Fixade trasig knapplayout på startsidan – `.hero-actions` saknade
  `align-items:center`, vilket gjorde att "Våra utbildningar"-knappen sträcktes till
  samma höjd som "Boka utbildning" och såg fel ut
- **2026-06-14**: Fixade saknad `<footer class="site-footer">`-tagg på startsidan
  (fanns en `</footer>` utan öppnande tagg → footerns styling syntes inte)
- **2026-06-14**: Rättade sitemap.xml: `/artiklar.html` → `/artiklar/` (matchar
  `permalink` i artiklar.html, annars 404 i Search Console)
- **2026-06-14**: Tog bort footerns grå bakgrundsruta (`background-color:#fafafa`
  i `.site-footer`) på alla sidor – den kunde aldrig sträcka sig under sidofältet
  p.g.a. CSS-grid-layouten och såg därför ut som ett löst, felplacerat kort.
  Behöll avdelarlinjen ovanför (`border-top`). Gjort på samtliga statiska sidor
  samt `_layouts/artikel.html`
- **2026-07-01**: Verifierade alla tre öppna punkter under "Kända buggar" mot den
  live-sajten (den var tidigare för ny för sökindex/åtkomst) och fixade det som
  faktiskt var trasigt:
  - Favicon (`COU.png`) gav 404 på alla sidor – bara `COU.webp` finns i repot.
    Ändrat `<link rel="icon">` till `type="image/webp" href="COU.webp"` överallt.
  - `logo.png` i Article-JSON-LD (`_layouts/artikel.html`) gav samma problem –
    ändrat till `logo.webp`.
  - Sitemap.xml:s artikel-URL:er (`/slug.html`) gav 404 – riktiga URL:er är
    `/ÅÅÅÅ/MM/DD/slug.html` (Jekylls standardpermalink, eftersom `_config.yml`
    saknar `permalink`-inställning). Rättat alla 6 poster och lagt till
    "Konflikthantering för chefer" som helt saknades i sitemap.xml.
  - `boka-utbildning-umea.html` finns inte längre live (404) – ingen åtgärd behövs.
  - WebP-bilderna på startsidan (logo/excel/utvärderingar/boka) fanns redan i
    repot – det var aldrig ett problem.
  - Passade även på att byta og:image/twitter:image från `og-image.png` (1.7MB)
    till den redan existerande, oanvända `og-image.webp` (80KB).
- **2026-07-01**: Implementerade ny logotyp (från Claude Design-handoff, riktning
  "1c" – rutnätsmärke). Ny färgpalett: Grafit `#2A2E37`, Petrol `#3D6B7D`, Lera
  `#BF8A5C`, Papper `#FAF9F6`. Genomfört på samtliga 11 sidor:
  - Nytt 3×3-rutnätsmärke (`.cou-mark`, ren HTML/CSS – ingen bildfil) med 6 grafit-
    rutor + 3 lera-rutor i diagonal, tillagt i sidofältets logga, mobilheadern och
    som stor hero-variant i startsidans intro-sektion (ersätter den gamla rasterbilden
    `logo.webp` där).
  - Ny favicon: `favicon.svg` (vektor, samma rutnätsmärke på grafit botten) – ersätter
    `COU.webp`/`COU.png` på alla sidor. `type="image/svg+xml"`.
  - Space Grotesk tillagd som loggtypsnitt (`--font-logo`), Albert Sans oförändrat
    som brödtext.
  - **Fullständigt palettbyte** (användarens val, inte bara logga): `--primary`
    `#105AFE` → Petrol `#3D6B7D`, `--color-active-nav` `#3d6cf5` → ljusare petrol
    `#5C8A9C` (medvetet annan nyans än CTA, se arkitekturbeslut nedan), `--fg`
    `#202021` → Grafit `#2A2E37`, `--quaternary` → Papper `#FAF9F6`. Påverkar alla
    knappar, länkar, aktiv nav-färg och kategori-badges på alla sidor.
  - Verifierat i webbläsarpreview (desktop + mobil, sidofält + mobilmeny) innan commit.
- **2026-07-01**: Patrik levererade de rasterbilder som saknades (`og-image.png`,
  `og-image.webp`, `logo.png`, `logo.webp` – exporterade från Claude Design-projektet).
  Ersatte de gamla filerna i repot. `og-image.png` gick samtidigt från 1.7MB till
  30KB. Nu visar OG-förhandsvisning och Article-JSON-LD (`_layouts/artikel.html`)
  också det nya rutnätsmärket – rebrandet är komplett överallt, inte bara i
  sidnavigeringen.
- **2026-07-01**: Patrik flaggade två buggar i den nya loggan efter att v1.9.0 gått
  live:
  - `.cou-mark i`-cellerna hade `border-radius:2px` hårdkodat, men i sidofältet/
    mobilheadern är varje cell bara ~3–5px (22px resp. 16px-ikon, 3px gap, 3 celler)
    → 2px blev 38–60% av cellstorleken, dvs cellerna såg ut som runda prickar
    istället för avrundade kvadrater. Ändrat till `border-radius:22%` (samma
    proportion som `favicon.svg` och `.hero-mark-icon`) så det skalar rätt oavsett
    ikonstorlek.
  - Favicon syntes inte i webbläsarfliken – `favicon.svg` fungerar i Chrome/Firefox/
    Edge men Safari saknar stöd för SVG-favikoner i vanliga flikar. Lade till
    `<link rel="icon" type="image/png" sizes="512x512" href="logo.png">` som
    fallback (samma logo.png som levererades ovan) före SVG-länken på alla sidor.

---

## Pågående

- **Artikelserie** ("1 artikel/vecka", se to-do): 5 av ~13 planerade ämnen klara
  (2 Excel, 2 BAM, 1 Ledarskap). Återstående kandidater inom BAM: "Är BAM
  obligatoriskt?" (observera: artikeln "BAM och SAM" berör redan kort att BAM
  inte i sig är ett lagkrav – en framtida artikel om detta bör gå djupare, t.ex.
  kollektivavtal/branschkrav), "Psykologisk arbetsmiljö på moderna arbetsplatser".
  Inom Ledarskap: "Konflikthantering för chefer", "Transformativt ledarskap",
  samt "Psykologisk trygghet i arbetsgrupper" (flaggad för överlapp, se to-do).
- SEO är i tidig fas – sajten är ännu inte sökindexerad (väntat: 1–3 månader till
  första indexering enligt realistisk tidsplan i seo-todo.md)

---

## Nästa steg

1. Skriv nästa artikel i serien (t.ex. nästa BAM-ämne, eller börja på Ledarskap –
   Patriks val)
2. Skapa Google Business Profile
3. Efter nästa push: klicka "Verifiera att åtgärder vidtagits" i Search Console
   (extra viktigt nu efter logga/og-image-bytet – Google/Facebook cachar OG-bilder
   hårt, kan behöva tvinga omcrawl om delade länkar visar den gamla bilden)

---

## Kända buggar / att verifiera

Inga öppna punkter just nu – de tre som stod här (WebP-bilder på startsidan,
blogginläggens permalink/sitemap-URL:er, `boka-utbildning-umea.html`) verifierades
mot live-sajten och åtgärdades 2026-07-01, se changelog ovan.

---

## Arkitekturbeslut (varför saker är som de är)

- **Ingen delad CSS-fil**: håller varje sida helt fristående för enkel manuell
  uppladdning till GitHub Pages utan byggsteg. Konsekvens: ändringar i designsystemet
  (CSS-variabler, knappstilar etc.) måste göras på ALLA berörda sidor manuellt.
- **Knapphierarki**: `.btn-primary` har större padding/font-size än `.btn-outline` –
  ett medvetet designval för visuell hierarki. Det betyder att flex-containrar som
  blandar de två knapptyperna behöver `align-items:center` (annars sträcks den
  mindre knappen till samma höjd som den större, se buggfix 2026-06-14).
- **Artikelserien**: en artikel i veckan, kategoriserad Excel/BAM/Ledarskap, för att
  bygga långsiktig SEO-auktoritet snarare än snabba resultat.
- **`--color-active-nav` ≠ `--primary`**: medvetet val sedan tidigare (se buggfix
  "J" i seo-todo.md) att aktiv nav-länk INTE ska ha exakt samma färg som CTA-knappar,
  för visuell hierarki. Efter palettbytet 2026-07-01 betyder det: `--primary` =
  Petrol `#3D6B7D` (mättad, för knappar/länkar), `--color-active-nav` = en ljusare
  petrol-nyans `#5C8A9C` (för aktiv sidofältslänk). Håll dem åtskilda vid framtida
  färgändringar.
- **Loggmärket är ren HTML/CSS, ingen bildfil**: `.cou-mark` (3×3 rutnät, 9 st
  `<i>`-element, 6 grafit + 3 lera i diagonal) byggdes direkt i CSS istället för en
  exporterad bild, eftersom det är enkla geometriska former – skalar skarpt i alla
  storlekar (sidofält, mobilheader, startsidans hero) utan separata bildfiler.
  Färg/mönster styrs av `--grafit`/`--lera`-variablerna, så ändras palettet ändras
  loggan automatiskt. `favicon.svg` är samma mönster men som fristående SVG-fil
  (måste vara en riktig fil för `<link rel="icon">`).

---

*Senast uppdaterad: 2026-07-01*
