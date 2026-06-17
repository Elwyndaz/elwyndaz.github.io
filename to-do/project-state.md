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
2. Verifiera de tre punkterna under "Kända buggar" nedan
3. Manuell åtgärd: kontrollera/ta bort `boka-utbildning-umea.html` på GitHub
4. Skapa Google Business Profile
5. Komprimera bilder och/eller konvertera till WebP (logo.png, og-image.png m.fl.)
6. Efter nästa push: klicka "Verifiera att åtgärder vidtagits" i Search Console

---

## Kända buggar / att verifiera

- **WebP vs PNG-bilder på startsidan**: `index.html` laddar `logo.webp`,
  `excel-utbildning-umea.webp`, `utvarderingar-umea.webp` och `boka-utbildning-umea.webp`.
  En tidigare to-do-punkt säger att bilderna istället döptes om till `.png`. Om
  `.webp`-filerna inte finns i repot blir det trasiga bilder på hela startsidan.
  **Status: ej verifierat** – sajten gick inte att hämta live (för ny för sökindex).

- **Blogginläggens URL/permalink**: `_config.yml` saknar en `permalink`-inställning,
  vilket gör att Jekylls standard normalt lägger inlägg under `/ÅÅÅÅ/MM/DD/...`.
  `sitemap.xml` antar istället att URL:en bara är `/slug.html`
  (t.ex. `/excel-funktioner-som-sparar-tid.html`, `/vanliga-excel-misstag.html`).
  **Status: ej verifierat** – testa båda varianterna live när sajten är uppdaterad,
  och justera sitemap.xml om datum-varianten visar sig vara den korrekta.

- **boka-utbildning-umea.html**: finns live på GitHub men ingår inte i de filer
  Claude har tillgång till. Okänt vad `canonical`-taggen pekar på och om sidan ska
  finnas kvar. Kräver manuell kontroll direkt i GitHub.

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

---

*Senast uppdaterad: 2026-06-14*
