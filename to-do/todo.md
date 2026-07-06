# To-do – orgutveckling.se

> Planerat och pågående arbete. Arkitektur och nuläge: se `to-do/project-state.md`.
> Detaljerad historik över gjorda fixar: `git log`, inte här.

---

## Klart ✅ (kort sammanfattning)

- Grundläggande teknisk SEO: meta-taggar, robots, sitemap, Search Console,
  structured data (LocalBusiness, FAQPage, Course, Review, Breadcrumb)
- Tre SEO-landningssidor (Excel/BAM/ledarskap), Jekyll-blogg uppsatt,
  7 artiklar publicerade (2 Excel, 3 BAM, 2 Ledarskap)
- Google Business Profile skapad
- Bildnamn/format städade (WebP, ASCII-namn), og-image komprimerad
  1.7MB → 30KB
- Ny logga + fullständigt palettbyte (Grafit/Petrol/Lera/Papper), egen
  favicon (`favicon.svg` + PNG-fallback för Safari)
- Designpass från extern granskning: sidebar-spacing, typskala, knapphierarki,
  footer-styling, aktiv nav-färg
- Diverse layoutbuggar fixade (footer, hero-knappar, sidebar-logga,
  canonical-taggar, sitemap-URL:er) – se `git log` för detaljer

---

## Att göra – artiklar (1/vecka)

### Excel
- [ ] Så lär du dig pivottabeller snabbt
- [ ] Excel för ekonomer
- [ ] Excel för HR
- [ ] Excelkurs för nybörjare i Umeå

### BAM / arbetsmiljö
- [x] Är BAM obligatoriskt? (publicerad 2026-07-06)
- [ ] Psykologisk arbetsmiljö på moderna arbetsplatser

### Ledarskap
- [ ] Psykologisk trygghet i arbetsgrupper *("Vad kännetecknar bra
  ledarskap?" har redan ett avsnitt om detta – denna bör gå djupare/bredare,
  t.ex. konkreta övningar, snarare än upprepa samma definition)*
- [ ] Transformativt ledarskap

---

## Att göra – backlinks och lokal auktoritet

> Obs: detta är ett fritidsprojekt vid sidan av heltidsplugg, ingen
> registrerad firma – betalning löses via Frilans Finans om/när en kund
> dyker upp. Håll backlink-arbetet gratis och lågtröskel, hoppa över sånt
> som kräver medlemsavgift eller ett registrerat företag.

- [ ] Dela artiklar på LinkedIn löpande
- [ ] Nämn sajten i relevanta gratis Umeå-forum/Facebook-grupper för
  småföretag/frilans, om tillfälle uppstår naturligt
- ~~hitta.se/eniro.se~~ – testat 2026-07-06, går inte: de har ingen
  "lägg till företag"-funktion, bara "verifiera ditt företag" mot en
  befintlig post från Bolagsverket/SCB. Utan registrerad enskild firma
  finns ingen post att claima – hårt stopp, inte värt att felsöka mer
- ~~Handelskammare/Företagarna-medlemskap~~ – kostar pengar, fel skala för
  detta projekt just nu
- ~~utbildning.se/studier.se~~ – kräver sannolikt etablerat
  utbildningsföretag, pausad

---

## Manuella åtgärder (kan inte fixas i kod)

- [x] Klicka "Verifiera att åtgärder vidtagits" i Search Console efter nästa push (klart 2026-07-06)

---

## Kod/struktur (från audit 2026-07-06, ej akut)

- [ ] De tre landningssidorna (bam/excel/ledarskap) är 75–100% duplicerad
  HTML/CSS utan delad layout, trots att Jekyll redan bygger vid varje push
  för bloggen. En delad Jekyll-layout skulle döda den manuella synk-skatten
  (t.ex. copyright-år på 10 filer) – gör när det börjar kännas jobbigt att
  hålla sidorna i synk, inte innan.
- [ ] Kolla `lasning.html`-visningsmönstret i Search Console igen om ~4
  veckor – för litet urval än för att agera på.

---

## Nyckelord att sikta på

**Primära**: excelutbildning umeå · excel kurs umeå · bam utbildning umeå ·
ledarskapsutbildning umeå

**Sekundära**: excelkurs företag · arbetsmiljöutbildning umeå ·
ledarskapskurs umeå · organisationsutveckling umeå

**Long-tail**: verksamhetsanpassad excelutbildning · bam utbildning för
chefer och skyddsombud · psykologiskt ledarskap utbildning

---

## Realistisk tidsplan för ranking

- **1–3 månader** – börjar indexeras ordentligt
- **3–6 månader** – börjar ranka lokalt
- **6–12 månader** – kan börja vinna lokala sökningar
