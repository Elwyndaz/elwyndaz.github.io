---
layout: artikel
title: "Excel för nybörjare: lär dig tabellen först"
date: 2026-11-25
description: "Viktigast för nybörjare i Excel är att göra data till en tabell. Då får du sortering, filtrering, summa och medel utan att skriva en enda formel."
kategori: Excel
ingress: "Om det finns en sak en nybörjare i Excel ska kunna, är det att göra sin data till en tabell. Resten bygger på det."
---

Gör din data till en tabell med `Ctrl+T`. Då får du sortering, filtrering, summor och formler som fyller i sig själva, det mesta utan att skriva en formel. Därefter behöver du bara cellreferenser och `OM`.

## 1. Bygg listan rätt

En rubrik per kolumn på en enda rad, en rad per post och inga tomma rader eller delsummor mitt i. Står tal eller datum vänsterställda är de troligen sparade som text och går inte att räkna med, se [vanliga misstag i Excel](/2026/06/14/vanliga-excel-misstag.html).

## 2. Gör listan till en tabell

Klicka i listan och tryck `Ctrl+T`. Kontrollera att **Tabellen har rubriker** är ikryssad och klicka OK. När du står i tabellen får du fliken **Tabelldesign** (i äldre versioner **Design**).

## 3. Sortera, filtrera och summera

Pilknappen i varje rubrik sorterar och filtrerar. Kryssa i **Summarad** på fliken **Tabelldesign** och välj Summa, Medel eller Antal längst ner, utan formel. Summaraden räknar bara de rader som syns: filtrera fram en avdelning, så visar den avdelningens summa.

Behöver du en summa utanför tabellen skriver du `=SUMMA(Tabell1[Belopp])`. Den följer med när tabellen växer, vilket `=SUMMA(B2:B20)` inte gör. Svensk Excel använder semikolon mellan argument, eftersom kommat är decimaltecken.

## 4. Formler som fyller i sig själva

Skriv en ny rubrik direkt till höger om tabellen, till exempel Styckpris, och formeln i raden under. Klickar du på cellerna skriver Excel `=[@Belopp]/[@Antal]` åt dig, och formeln fylls i hela kolumnen, även på nya rader.

Ska alla rader peka på samma cell, till exempel en momssats i `E1`, låser du den med dollartecken: `=[@Belopp]*$E$1`. I Excel för Windows lägger `F4` till dem.

## 5. OM

`=OM([@Belopp]>1000;"Över budget";"Inom budget")` testar ett villkor och ger ett av två svar. Samma tänkande återkommer i `SUMMA.OMF` och `ANTAL.OMF`.

## 6. Diagram som växer med tabellen

Klicka i tabellen och välj **Infoga → Rekommenderade diagram**. Diagrammet tar med nya rader av sig självt. Stapeldiagram för att jämföra och linjediagram för förändring över tid räcker länge.

## Redo för nästa steg?

Prova på en egen lista, utan att söka hjälp: filtrera fram en grupp och läs av summan, lägg till en kolumn med en formel och en ny rad, och skriv en `OM`. Klarar du alla tre är nästa steg [pivottabeller](/2026/10/07/lar-dig-pivottabeller-snabbt.html). Fastnar du är det där du ska öva.

---

Vi håller excelutbildning för arbetsgrupper i Umeå och på distans, utifrån era egna arbetsfiler. Läs mer om vår [excelkurs i Umeå](/excel-utbildning-umea.html) eller [hör av dig](/kontakt.html), så återkommer vi med ett förslag.
