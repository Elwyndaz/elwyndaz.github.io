# Backlog

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

## Artiklar, en i veckan

⚠️ Dubbelkolla alltid mot `_posts/` innan du litar på den här listan. Den har
haft fel förut.

### Excel

- [ ] Så lär du dig pivottabeller snabbt
- [ ] Excel för ekonomer
- [ ] Excel för HR
- [ ] Excelkurs för nybörjare i Umeå

### BAM och arbetsmiljö

- [x] Är BAM obligatoriskt? Publicerad 2026-07-06.
- [ ] Psykologisk arbetsmiljö på moderna arbetsplatser

### Ledarskap

- [x] Psykologisk trygghet i arbetsgrupper. Publicerad 2026-08-13. Går djupare med
  fem konkreta övningar i stället för att upprepa definitionen i "Vad kännetecknar
  bra ledarskap?", enligt noten som stod här. Länkar internt till majartikeln,
  konflikthanteringsartikeln, BAM-sidan, läslistan och ledarskapssidan.
- [ ] Transformativt ledarskap

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

- [ ] **Porträttet på Om oss.** Enda bilden sajten behöver: svartvitt, rakt
  framifrån, neutral bakgrund. Ligger som ett tydligt markerat platshållarfält
  just nu. Filnamn i ren ASCII, WebP.
- [ ] **Kommentarer till böckerna på Läslistan.** Kurateringsregeln i specen är
  ingen post utan en egen mening om varför, högst tolv poster, varje post kopplad
  till en utbildning. I dag ligger 48 titlar utan kommentarer. Att gallra 48 till
  12 och skriva en mening om var och en är innehållsarbete bara du kan göra.
  Layouten är förberedd: kommentaren ska ta den bredaste spalten.
- [ ] **Riktigt kursinnehåll till listorna 01–05.** Listorna på utbildningssidorna
  är nu gamla sajtens egna punkter, alltså sanna, men de beskriver utbildningens
  *egenskaper* ("Passar både enskilda deltagare och grupper"), inte vad deltagaren
  *lär sig*. Designunderlaget hade tänkt sig det senare ("Pivottabeller från era
  egna underlag", "Uppslag och referenser utan felmeddelanden"). Därför heter
  rubriken "I korthet" och inte "Innehåll". Fem rader om vad deltagarna faktiskt
  gör under dagen skulle vara sidans starkaste säljargument, och bara du kan
  skriva dem.
- [ ] **Citat från BAM och ledarskap.** Alla elva utvärderingar är från
  Excel-utbildningar. Designunderlaget visar citat märkta "Skyddsombud, BAM" och
  "Enhetschef, Ledarskap" — de finns inte, så de är utelämnade. Samla in när du
  hållit de kurserna.

**Teknik**

- [ ] **Räkna förfrågningar.** `tack.html` finns, men formuläret öppnar en
  mailto och kan därför inte skicka besökaren dit automatiskt. Vill du mäta
  antalet förfrågningar behövs en riktig formulär-backend (Formspree har en
  gratisnivå) som redirectar till `/tack.html` efter skickat formulär.
- [x] Kolla `lasning.html`-visningsmönstret igen. Gjort 2026-08-13: mönstret
  håller i sig. Sidan är fortfarande mest visad (30 visningar på 28 dagar) och
  fortfarande på akademiska bok-sökningar, inte på kurser. Position 36 betyder
  att den knappt syns. Se "SEO-läget" nedan.
- [ ] Begär omindexering i Search Console när redesignen är pushad. Alla titlar,
  meta-beskrivningar och H1 är omskrivna.

## SEO-läget 2026-08-13

Mätt via `gsc`-MCP:n, 28 dagar (16 juli till 13 augusti), jämfört med
föregående 28 dagar.

- **Första klicket någonsin.** 1 klick den 18 juli, till startsidan. Startsidan
  ligger på position 4,9 i snitt. Tidigare mätning: 0 klick.
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
