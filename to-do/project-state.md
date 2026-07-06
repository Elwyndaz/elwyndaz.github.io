# Projektstatus – orgutveckling.se

> **Syfte med denna fil**: snabb kontext för en ny/framtida Claude-session.
> Läs denna + `to-do/todo.md` (planerat arbete) tillsammans. Detaljerad historik
> över enskilda fixar: `git log`, inte här – den här filen beskriver nuläget,
> inte en logg över hur vi kom dit.

---

## Om projektet

- **Vad**: Webbplats för Centrum för Organisations-Utveckling (COU) i Umeå.
  Excel-utbildning, BAM-utbildning (Bättre Arbetsmiljö), ledarskapsutbildning.
- **Hosting**: GitHub Pages, domän `orgutveckling.se` (se `CNAME`). Domänen
  är registrerad hos **Strato.se**, DNS/proxy sköts av **Cloudflare**
  (troligen för att kunna peka root-domänen mot GitHub Pages – vanlig CNAME
  går inte på apex-domäner, Cloudflare löser det + ger gratis CDN/SSL på
  köpet). Cloudflare-kontot ligger utanför repot, ingen insyn härifrån.
- **Publicering**: manuell uppladdning via GitHub-webbgränssnittet, inget
  byggsteg för de statiska sidorna. Jekyll körs automatiskt av GitHub Pages
  för bloggdelen.
- **Kontakt**: kontakt@orgutveckling.se, 072-221 13 37.

---

## Arkitektur – så hänger det ihop

- **Statiska sidor** (`index.html`, `utbildningar.html`, `case.html`,
  `kontakt.html`, `lasning.html`, `lanktips.html`, `excel-utbildning-umea.html`,
  `bam-utbildning-umea.html`, `ledarskapsutbildning-umea.html`): vanlig HTML,
  **egen `<style>`-block** per sida, ingen delad CSS-fil. Designsystemet
  (färger, typsnitt, mellanrum, knappstilar) är CSS-variabler i `:root{...}`
  och måste hållas identiskt mellan sidorna för hand. Har ingen Jekyll-
  frontmatter, så Liquid-taggar (`{{ }}`) fungerar INTE i dem – de statiska
  sidornas footer-copyright-år (`© 2026`) måste därför bumpas manuellt på
  alla 10 sidor en gång om året (senast gjort 2026-07-06, tidigare stod det
  en blandning av 2024/2025). `_layouts/artikel.html` slipper detta – den
  använder `{{ site.time | date: '%Y' }}` och uppdateras automatiskt.
- **Blogg** (`/artiklar/`): Jekyll. Inlägg i `_posts/` (`ÅÅÅÅ-MM-DD-slug.md`),
  layout i `_layouts/artikel.html`. `artiklar.html` har `permalink: /artiklar/`
  och loopar över `site.posts` automatiskt – nya inlägg dyker upp utan
  manuella länkar. `_config.yml` saknar egen `permalink`-inställning så
  Jekylls standard gäller: URL:en blir `/ÅÅÅÅ/MM/DD/slug.html` där datumet är
  **frontmatterns `date:`-fält**, inte nödvändigtvis filnamnet.
- **Navigation** (samma ordning på ALLA sidor, sidofält + mobilmeny):
  Utbildningar → Utvärderingar (`case.html`) → Artiklar → Lästips
  (`lasning.html`) → Länktips (`lanktips.html`) → Kontakt. Har orsakat buggar
  förut vid redigering – verifiera ordningen på alla sidor om navigationen
  ändras.
- **E-post i HTML**: skrivs aldrig ut i klartext, byggs ihop med JS
  (`var u='kontakt';var d='orgutveckling.se'`) för att undvika spam-bots.
- **Bildnamn**: endast ASCII (inga å/ä/ö) – har orsakat renderingsproblem.
- **Loggan** (`.cou-mark`): ren HTML/CSS (3×3-rutnät, 9 `<i>`-element, 6
  grafit + 3 lera diagonalt), ingen bildfil – skalar skarpt i sidofält,
  mobilheader och startsidans hero. `favicon.svg` är samma mönster som
  fristående SVG (måste vara en riktig fil för `<link rel="icon">`).
- **sitemap.xml**: underhålls manuellt, måste matcha verkliga URL:er (se
  Jekyll-permalink-anmärkningen ovan – lätt att få fel).

---

## Nuvarande status (2026-07-06)

- Sajten är live, grundläggande teknisk SEO på plats (meta-taggar, robots,
  sitemap, Search Console, LocalBusiness/FAQPage/Course/Review/Breadcrumb
  structured data).
- Ny logga + färgpalett (Grafit `#2A2E37`, Petrol `#3D6B7D`, Lera `#BF8A5C`,
  Papper `#FAF9F6`) genomförd på alla 11 sidor.
- Tre SEO-landningssidor live (Excel/BAM/ledarskap), medvetet utanför
  huvudnav men länkade kontextuellt.
- Artikelserie: 6 av ~13 planerade artiklar publicerade (se `todo.md` för
  återstående ämnen). Obs: `todo.md` hade tidigare "Konflikthantering för
  chefer" olistad som ogjord trots att den varit live sedan 2026-03-30 —
  rättat 2026-07-06, dubbelkolla mot `_posts/` innan du litar på
  todo-checklistan igen.
- Inga kända öppna buggar.
- **Lokalt repo låg 2026-07-06 4 commits före `origin/main`, opushat** – kolla
  `git status`/`git log` innan du antar att GitHub matchar arbetskatalogen.
- **Google Search Console-data är nu tillgänglig direkt via MCP** (server
  `gsc`, registrerad user-scope 2026-07-06, `uvx mcp-search-console` +
  OAuth). Fråga efter indexerings-/prestandadata istället för att gissa.
  Facit 2026-07-06: sajten är indexerad (16 URL:er, 0 fel), men i praktiken
  osynlig – 60 visningar/0 klick senaste 28 dagarna, se "Nästa steg" för
  konsekvensen.

---

## Nästa steg

1. **Backlink-arbete (prio 1, ännu inte påbörjat)** – 2026-07-06: kopplade in
   Search Console-data (MCP-integration, se nedan) och facit är att sajten
   är indexerad (16 URL:er, 0 fel) men i praktiken osynlig: 60 visningar/
   0 klick på 28 dagar, och de tänkta huvudkeyworden ("excel utbildning
   umeå", "bam utbildning umeå") har nästan ingen sökvolym alls än. Det är
   en ny-domän-auktoritetsfråga, inte en innehålls- eller teknik-fråga –
   backlinks är därför den enda åtgärden som är strukturellt säker att
   hjälpa. Artikelserien (punkt 2) fortsätter parallellt, den kostar bara
   det vanliga veckopasset.
2. Skriv nästa artikel i serien (nästa BAM-ämne, eller börja på Ledarskap –
   Patriks val, se `todo.md`)
3. Efter nästa push: klicka "Verifiera att åtgärder vidtagits" i Search
   Console (extra viktigt efter logga/og-image-bytet – Google/Facebook cachar
   OG-bilder hårt)

**Kuriosa från samma datapull**: `/lasning.html` (lästips) är oväntat sidan
med flest visningar (36/28 dagar) – men för orelaterade akademiska/
boktitel-sökningar (t.ex. "roland paulsen", "thomas jordan
konflikthantering"), inte för kurserna. Provstorleken är för liten för att
agera på (max 36 visningar), men värt att titta närmare på om mönstret
håller i sig efter fler veckor.

---

## Arkitekturbeslut (varför saker är som de är)

- **Ingen delad CSS-fil**: håller varje sida fristående för enkel manuell
  uppladdning utan byggsteg. Pris: designsystem-ändringar måste göras på
  ALLA berörda sidor för hand.
- **Knapphierarki**: `.btn-primary` har större padding/font-size än
  `.btn-outline`, medvetet för visuell hierarki. Flex-containrar som blandar
  de två knapptyperna behöver `align-items:center` (annars sträcks den
  mindre knappen till samma höjd som den större).
- **Artikelserien**: en artikel/vecka, kategoriserad Excel/BAM/Ledarskap, för
  långsiktig SEO-auktoritet snarare än snabba resultat.
- **`--color-active-nav` ≠ `--primary`**: aktiv nav-länk ska INTE ha exakt
  samma färg som CTA-knappar, för visuell hierarki. `--primary` = Petrol
  `#3D6B7D` (knappar/länkar), `--color-active-nav` = ljusare petrol `#5C8A9C`
  (aktiv sidofältslänk). Håll åtskilda vid framtida färgändringar.
- **Loggan är ren HTML/CSS**: skalar i alla storlekar utan separata
  bildfiler, och följer paletten automatiskt via `--grafit`/`--lera`.

---

*Senast uppdaterad: 2026-07-06*
