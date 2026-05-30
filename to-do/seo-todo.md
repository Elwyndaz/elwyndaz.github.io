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

---

## Att göra – tekniskt

- [ ] Skapa Google Business Profile (går utan bolag, verifieras via vykort)
- [ ] Komprimera bilder (logo.png, og-image.png) – använd squoosh.app
- [ ] Konvertera bilder till WebP-format om möjligt
- [x] Meta description på startsidan kortad till 148 tecken (var 177, gräns 160)
- [ ] Efter publicering: verifiera åtgärder i Search Console (klicka "Verifiera att åtgärder vidtagits")

---

## Att göra – innehåll (störst SEO-effekt)

- [ ] Ny artikel: 10 Excel-funktioner som sparar tid (utkast finns i _posts/)

---

## Att göra – artiklar (1 per vecka)

### Excel
- [ ] 10 Excel-funktioner som sparar tid
- [ ] Vanliga Excel-misstag på arbetsplatser
- [ ] Så lär du dig pivottabeller snabbt
- [ ] Excel för ekonomer
- [ ] Excel för HR
- [ ] Excelkurs för nybörjare i Umeå

### BAM / arbetsmiljö
- [ ] Vad ingår i BAM-utbildning?
- [ ] Är BAM obligatoriskt?
- [ ] Skillnad mellan BAM och SAM
- [ ] Psykologisk arbetsmiljö på moderna arbetsplatser

### Ledarskap
- [ ] Psykologisk trygghet i arbetsgrupper
- [ ] Vad kännetecknar bra ledarskap?
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

- [ ] **boka-utbildning-umea.html** finns live på GitHub men inte i zipen. Öppna filen i GitHub och kontrollera vad canonical pekar på. Om sidan inte ska indexeras: ta bort filen. Om den ska indexeras: ge den canonical som pekar på sig själv.
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
- [x] J: Active nav-länk använder --color-active-nav (#3d6cf5) istället för samma blå som CTA

### Kvarstår (kräver ditt beslut)
- [ ] D: Illustrationen på startsidan (logo.png i intro-sektionen) kritiserades som "clipart".
      Om bilden är professionell nog: behåll. Om inte: ersätt med ett typografiskt stat-block
      eller ett riktigt foto från en utbildning.
