---
layout: artikel
title: "Excel för nybörjare: lär dig tabellen först"
date: 2026-11-04
description: "Viktigast för nybörjare i Excel är att göra data till en tabell. Då får du sortering, filtrering, summa och medel utan att skriva en enda formel."
kategori: Excel
ingress: "Nybörjare i Excel lägger ofta tid på att lära sig formler för saker som Excel redan gör åt dem. Om det finns en sak du ska kunna, är det hur du gör din data till en tabell. Resten bygger på det."
---

Gör din data till en tabell med `Ctrl+T`. Tabellen ger dig sortering och filtrering i rubrikraden, summa och medelvärde i en summarad längst ner, formler som fyller i sig själva och diagram som växer när listan växer. Det mesta av det utan en enda formel. Därefter behöver du bara två saker till: att förstå cellreferenser och funktionen `OM`.

Ordningen nedan spelar roll. Allt från steg 3 bygger på tabellen från steg 2.

## 1. Bygg listan rätt

En tabell är bara så bra som listan den bygger på. Tre regler räcker: en rubrik per kolumn, på en enda rad. En rad per post, till exempel en order eller en anställd. Och inga tomma rader eller delsummor mitt i listan. Står tal och datum vänsterställda trots att du inte har ändrat justeringen är de troligen sparade som text och går inte att räkna med. Hur du rättar datum står i artikeln om [vanliga misstag i Excel](/2026/06/14/vanliga-excel-misstag.html).

## 2. Gör listan till en tabell

Klicka var som helst i listan och tryck `Ctrl+T`. Excel markerar listan och öppnar rutan **Skapa tabell**. Kontrollera att **Tabellen har rubriker** är ikryssad och klicka OK. Listan får ett randigt utseende och en egen flik, **Tabelldesign** (i äldre versioner **Design**), när du står i den. Microsoft har en [lista över kortkommandon i Excel](https://support.microsoft.com/sv-se/office/kortkommandon-i-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f) om du vill se fler genvägar.

## 3. Sortera och filtrera i rubrikraden

Varje rubrik i tabellen har nu en liten pilknapp. Klicka på den så kan du sortera kolumnen eller välja vilka värden som ska synas. Du behöver alltså inte leta upp sortering och filtrering på fliken **Data**, de sitter redan i tabellen.

## 4. Summa och medel i summaraden

Gå till fliken **Tabelldesign** och kryssa i **Summarad**. Längst ner i tabellen dyker en rad upp. Klicka i den under en kolumn och sedan på pilen som dyker upp, så väljer du Summa, Medel, Antal, Max eller Min. Ingen formel att skriva.

Det bästa är att summaraden bara räknar de rader som syns. Filtrera fram en avdelning i rubrikraden, och summan längst ner visar direkt den avdelningens summa. Excel använder funktionen `DELSUMMA` för det, men du behöver inte kunna den.

Behöver du en summa utanför tabellen skriver du `=SUMMA(Tabell1[Belopp])`. Den följer med när tabellen växer, vilket `=SUMMA(B2:B20)` inte gör. Tabellens namn står längst till vänster på fliken **Tabelldesign**. Lägg märke till att svensk Excel använder semikolon mellan argument, inte komma, eftersom kommat redan är decimaltecken.

## 5. Formler som fyller i sig själva

Skriv en rubrik i den tomma kolumnen direkt till höger om tabellen, till exempel Styckpris. Tabellen växer då med kolumnen. Skriv sedan formeln i första raden under rubriken, till exempel belopp delat med antal. Klickar du på cellerna i samma rad skriver Excel kolumnnamnen åt dig: `=[@Belopp]/[@Antal]`. När du trycker Enter fylls formeln i hela kolumnen av sig själv, och när du lägger till en ny rad följer formeln med. Du kopierar ingenting nedåt och kan därför inte glömma en rad.

Kolumnnamn som `[@Belopp]` behöver aldrig låsas, de pekar alltid på rätt rad. Vanliga celladresser fungerar annorlunda: när formeln fylls nedåt flyttar sig adressen en rad i taget. Ligger momssatsen i en fast cell, till exempel `E1`, skriver du därför `=[@Belopp]*$E$1`. Dollartecknen låser referensen så att alla rader pekar på samma cell. I Excel för Windows kan du markera `E1` i formeln och trycka `F4` för att lägga till dem.

## 6. OM

`OM` är funktionen som väljer mellan två svar. `=OM(B2>1000;"Över budget";"Inom budget")` testar ett villkor och ger ett av två svar. I en tabell blir det `=OM([@Belopp]>1000;"Över budget";"Inom budget")` och fyller sig själv nedåt. Samma tänkande med villkor återkommer i `SUMMA.OMF`, `ANTAL.OMF` och villkorsstyrd formatering.

## 7. Diagram som växer med tabellen

Klicka i tabellen och välj **Infoga → Rekommenderade diagram**. Eftersom diagrammet bygger på tabellen tar det med nya rader av sig självt. Som nybörjare räcker det att kunna stapeldiagram för att jämföra och linjediagram för att visa förändring över tid.

## Det här kan vänta

Pivottabeller, `XLETAUPP`, villkorsstyrd formatering med formler, makron och AI-verktyg som [Copilot](/2026/08/20/ai-och-copilot-i-excel.html) är alla värda att lära sig, men inte först. Alla fungerar bättre när din data redan ligger i en tabell. Pivottabellen är det naturliga nästa steget, och när du kommer dit finns vår guide [lär dig pivottabeller snabbt](/2026/10/07/lar-dig-pivottabeller-snabbt.html). Fler grepp av samma sort som tabellen finns i artikeln om [funktioner som sparar tid](/2026/01/26/excel-funktioner-som-sparar-tid.html).

## Hur du vet att du är redo för nästa steg

Ta en lista du faktiskt arbetar med och prova tre saker utan att söka efter hjälp:

- Gör listan till en tabell, filtrera fram en grupp och läs av summan i summaraden.
- Lägg till en kolumn med en formel och en ny rad, och se att formeln följer med.
- Skriv en `OM` som delar upp raderna i två grupper.

Klarar du alla tre har du grunden. Fastnar du på någon av dem är det där du ska öva, inte på nästa funktion.

## Så väljer du kurs

**På plats eller digitalt.** En kurs på plats gör det lättare att få hjälp i stunden, eftersom läraren ser din skärm och kan peka. För en nybörjare är det ofta värt mycket. Digitalt sparar restid, vilket i Västerbotten kan vara en verklig skillnad när deltagarna sitter på olika orter. Fråga i så fall hur kursledaren ser vad du gör, så att du inte blir sittande ensam med ett fel.

**Intern kurs för arbetsgruppen eller öppen kurs.** En öppen kurs passar dig som går ensam och vill träffa andra på samma nivå. Innehållet är detsamma för alla, och exemplen kommer från kursmaterialet. En intern kurs för arbetsgruppen kan utgå från de filer ni redan använder, och alla lär sig samma arbetssätt samtidigt. Det gör det lättare att hålla fast vid det efteråt, när filerna delas mellan kollegor.

**Fråga efter ordningen.** Be att få se vad kursen går igenom och i vilken ordning. Börjar den med en lång rad funktioner innan du fått lära dig bygga en lista och göra den till en tabell, är det ett varningstecken.

Vi håller excelutbildning i Umeå för arbetsgrupper, hos er eller på distans, och utgår från era egna arbetsfiler. Läs mer om vår [excelkurs i Umeå](/excel-utbildning-umea.html), och [hör av dig](/kontakt.html) och berätta hur er vardag i Excel ser ut, så återkommer vi med ett förslag.
