---
schemaVersion: 1
status: active
currentGoal: Göra orgutveckling.se synlig i lokal sökning i Umeå
nextAction: Börja backlink-arbetet, som är prio 1 och fortfarande inte påbörjat; sajten är indexerad men får 60 visningar och 0 klick på 28 dagar
blockers: []
reviewedAt: 2026-08-04
---

# Handoff: orgutveckling.se

## Läget

Sajten är live på `https://orgutveckling.se/` och tekniskt i ordning. Problemet är
inte teknik eller innehåll, det är auktoritet: **indexerad med 16 URL:er och noll
fel, men i praktiken osynlig med 60 visningar och 0 klick på 28 dagar.**

De tänkta huvudnyckelorden, "excel utbildning umeå" och "bam utbildning umeå",
har nästan ingen sökvolym alls. Det är en ny-domän-fråga, och backlinks är därför
den enda åtgärd som är strukturellt säker att hjälpa.

## Recent work

- Grundläggande teknisk SEO: metataggar, robots, sitemap, Search Console och
  strukturerad data för LocalBusiness, FAQPage, Course, Review och Breadcrumb.
- Tre SEO-landningssidor för Excel, BAM och ledarskap.
- Jekyll-blogg uppsatt med sju publicerade artiklar.
- Google Business Profile skapad.
- Ny logga och fullständigt palettbyte till Grafit, Petrol, Lera och Papper på
  alla elva sidor, plus egen favicon med PNG-fallback för Safari.
- Bildnamn och format städade till WebP med ASCII-namn. og-image komprimerad från
  1,7 MB till 30 kB.

## Verification

- Search Console-data hämtas direkt via MCP-servern `gsc`, så fråga efter
  indexerings- och prestandadata i stället för att gissa.
- Sajten svarar 200 och är indexerad utan fel.
- Repot är synkat med `origin/main`.

## Unresolved details

- **Backlink-arbetet är prio 1 och inte påbörjat.** Det måste hållas gratis och
  lågtröskel: det här är ett fritidsprojekt vid sidan av heltidsplugg, utan
  registrerad firma. hitta.se, eniro.se, handelskammare och utbildning.se är
  redan testade och avskrivna, se `BACKLOG.md`.
- `cv.html` står medvetet **utanför** sajtens arkitektur: ingen nav-länk,
  `noindex, nofollow`, inte i `sitemap.xml`. Synka aldrig in den i nav eller
  sitemap, och räkna inte med den i copyright-årsbumpen.
- De tre landningssidorna är 75 till 100 procent duplicerad HTML och CSS utan
  delad layout, trots att Jekyll redan bygger vid varje push.
- `lasning.html` är oväntat den mest visade sidan, men för orelaterade akademiska
  sökningar. Urvalet är för litet för att agera på.

## Resume here

Börja med backlinks. Artikelserien går parallellt och kostar bara det vanliga
veckopasset. **Dubbelkolla alltid mot `_posts/` innan du litar på artikellistan
i `BACKLOG.md`**, den har haft fel förut: "Konflikthantering för chefer" stod som
ogjord trots att den varit live sedan 2026-03-30.
