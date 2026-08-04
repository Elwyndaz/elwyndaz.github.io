# Project context

## Product intent

Webbplats för Centrum för Organisations-Utveckling i Umeå. Excelutbildning,
BAM-utbildning och ledarskapsutbildning. Målet är lokal synlighet i sökning, inte
volym.

Det här är ett fritidsprojekt vid sidan av heltidsstudier, utan registrerad firma.
Betalning löses via Frilans Finans om en kund dyker upp. Håll alla åtgärder gratis
och lågtröskel.

## Architecture

- GitHub Pages med domänen `orgutveckling.se`, se `CNAME`. Domänen är registrerad
  hos Strato, DNS och proxy sköts av Cloudflare.
- **Statiska sidor** (`index.html`, `utbildningar.html`, `case.html`,
  `kontakt.html`, `lasning.html`, `lanktips.html` och de tre landningssidorna):
  vanlig HTML med **eget `<style>`-block per sida**, ingen delad CSS-fil.
  Designsystemet är CSS-variabler i `:root` och måste hållas identiskt för hand.
- **Blogg** under `/artiklar/`: Jekyll, inlägg i `_posts/` som
  `ÅÅÅÅ-MM-DD-slug.md`, layout i `_layouts/artikel.html`. `artiklar.html` loopar
  över `site.posts`, så nya inlägg dyker upp utan manuella länkar.
- `cv.html` står medvetet utanför arkitekturen: ingen nav-länk, `noindex,
  nofollow`, inte i `sitemap.xml`, och ingår inte i copyright-årsbumpen.

## Constraints

- De statiska sidorna saknar Jekyll-frontmatter, så Liquid-taggar fungerar **inte**
  i dem. Copyright-året måste därför bumpas för hand på alla tio sidor en gång om
  året. `_layouts/artikel.html` slipper det via `{{ site.time | date: '%Y' }}`.
- **Navigationsordningen är densamma på alla sidor**: Utbildningar, Utvärderingar,
  Artiklar, Lästips, Länktips, Kontakt. Det har orsakat buggar förut, verifiera
  ordningen på samtliga sidor om navigationen ändras.
- E-postadressen skrivs aldrig ut i klartext utan byggs ihop med JS, för att
  undvika spam-bottar.
- Bildnamn måste vara ren ASCII. Å, ä och ö har orsakat renderingsproblem.
- `sitemap.xml` underhålls manuellt och måste matcha verkliga URL:er. Jekylls
  standardpermalink är `/ÅÅÅÅ/MM/DD/slug.html` där datumet kommer från
  frontmatterns `date`, inte nödvändigtvis från filnamnet.

## Important decisions

- **Ingen delad CSS-fil.** Varje sida är fristående så att den kan laddas upp
  manuellt utan byggsteg. Priset är att designändringar måste göras på alla sidor.
- **`--color-active-nav` är inte samma som `--primary`.** Aktiv nav-länk ska inte
  ha exakt samma färg som CTA-knappar. `--primary` är Petrol `#3D6B7D`,
  `--color-active-nav` är ljusare petrol `#5C8A9C`. Håll dem åtskilda.
- **Loggan är ren HTML och CSS**, ett 3x3-rutnät av nio `<i>`-element, ingen
  bildfil. Den skalar skarpt överallt och följer paletten automatiskt.
- **Artikelserien** är en artikel i veckan, kategoriserad Excel, BAM eller
  Ledarskap, för långsiktig auktoritet snarare än snabba resultat.
- Knapphierarki: `.btn-primary` har större padding och font-size än `.btn-outline`.
  Flex-containrar som blandar dem behöver `align-items:center`.

## Environments and operations

Publicering sker genom uppladdning till `main`; GitHub Pages bygger Jekyll
automatiskt för bloggdelen. Search Console-data hämtas via MCP-servern `gsc`,
fråga efter data i stället för att gissa.

Palett: Grafit `#2A2E37`, Petrol `#3D6B7D`, Lera `#BF8A5C`, Papper `#FAF9F6`.
Kontakt: kontakt@orgutveckling.se, 072-221 13 37.
