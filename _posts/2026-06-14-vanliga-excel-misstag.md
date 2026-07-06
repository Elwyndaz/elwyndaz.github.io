---
layout: artikel
title: "6 vanliga Excel-misstag på jobbet – och hur du undviker dem"
date: 2026-06-14
description: "Sex vanliga Excel-misstag som kostar tid och skapar felaktiga siffror – och hur du enkelt undviker dem. Tips från vår Excel-utbildning i Umeå."
kategori: Excel
ingress: "De flesta Excel-fel är osynliga tills något går fel – en felräknad summa, ett dokument som inte går att sortera, eller en formel som plötsligt ger helt galet resultat efter en kopiering. Här är sex vanliga fällor vi ofta stöter på under våra utbildningar, och hur du enkelt tar dig runt dem."
---

Excel är ett av de mest använda verktygen på svenska arbetsplatser, men väldigt få har fått en genomgång av hur det egentligen är tänkt att användas. Resultatet blir ofta filer som "fungerar", men som bygger på lösningar som gör dem sårbara för fel. Här är sex av de vanligaste misstagen vi stöter på när vi håller Excel-utbildning i Umeå – och vad du kan göra istället.

## 1. Hårdkodade tal gömda i formler

Ett klassiskt exempel är en formel som `=B2*1,25` för att lägga på moms. Talet 1,25 sitter "hårdkodat" inne i formeln. Det fungerar – tills momssatsen ändras, eller tills någon annan ska förstå vad formeln gör utan att fråga dig.

Lägg istället värdet i en egen, tydligt namngiven cell (till exempel "Momssats" i en cell bredvid eller på en egen flik) och referera till den i formeln. Då räcker det att uppdatera en enda cell om förutsättningarna ändras – och alla kan se varifrån talet kommer.

## 2. Glömda $-tecken när formler kopieras

Det här är förmodligen det vanligaste misstaget av alla. När du kopierar en formel neråt eller åt sidan flyttar Excel automatiskt med cellreferenserna. Det kallas en **relativ referens**, och är ofta exakt vad man vill ha.

Men om formeln refererar till en cell som ska vara *fast*, till exempel en moms- eller valutakurs högst upp i arket, flyttar referensen med ändå – och resultatet blir fel längre ner i listan. Lösningen är att lägga dollartecken framför rad och kolumn för den cell du vill låsa, till exempel `$B$1`. Det kallas en **absolut referens**, och den ändras inte när du kopierar formeln.

## 3. Sammanslagna celler (Merge & Center)

Att slå ihop celler för att centrera en rubrik över flera kolumner är frestande – det ser ofta snyggt ut. Problemet kommer senare: sammanslagna celler gör det svårare att sortera och filtrera data, kan ge konstiga resultat när du kopierar eller drar formler, och skapar ofta krångel när någon annan ska bygga vidare på arket.

Ett enkelt alternativ är **Centrera över markering**. Markera cellerna, öppna Formatera celler → Justering, och välj horisontell justering "Centrera över markering". Texten centreras visuellt över kolumnerna precis som med Merge, men cellerna förblir separata och går att sortera och referera som vanligt.

## 4. Datum som egentligen är text

Ibland ser ett datum korrekt ut – men är i själva verket sparat som text, inte som ett riktigt datumvärde. Det händer ofta vid import från andra system eller vid kopiering från webbsidor och PDF-filer. Ett tydligt tecken är att datumet hamnar **vänsterställt** i cellen istället för högerställt, som siffror och datum normalt gör.

Konsekvensen är att datumformler, sortering i kronologisk ordning och beräkningar av antal dagar mellan datum slutar fungera korrekt – ofta utan något felmeddelande. Markera kolumnen, gå till Data → Text till kolumner, och klicka dig igenom guiden utan att ändra något (bara Nästa, Nästa, Slutför). Excel tolkar då om innehållet och omvandlar texten till riktiga datumvärden.

## 5. Flera uppgifter klämda in i samma cell

"Anna Andersson, 070-123 45 67, Umeå" i en och samma cell ser kompakt ut, men gör det omöjligt att sortera på efternamn, filtrera på ort eller summera per person. Samma gäller när tal skrivs med enhet som text, till exempel "1500 kr" istället för talet 1500 i en cell formaterad som valuta.

Tumregeln är: en typ av information per kolumn. Namn i en kolumn, telefonnummer i en annan, ort i en tredje. Det känns som mer jobb när du skriver in data – men sparar enormt mycket tid varje gång någon ska sortera, filtrera, summera eller bygga en pivottabell på datan senare.

## 6. En enda jätteformel istället för hjälpkolumner

Det är lätt att bli stolt över en formel som löser allt i ett enda steg – särskilt om den är 200 tecken lång och innehåller flera nästlade funktioner. Problemet är att ingen, inklusive du själv om sex månader, kan felsöka eller bygga vidare på den utan att i praktiken skriva om den från grunden.

Bryt istället ner beräkningen i flera steg med **hjälpkolumner**: en kolumn för varje delsteg i uträkningen, med tydliga rubriker. Den sista kolumnen blir då en enkel formel som bara kombinerar resultaten från de tidigare. Det tar lite mer plats i arket, men gör det möjligt att se exakt var ett fel uppstår – och att förklara för en kollega vad som faktiskt händer.

---

Känner du igen något av detta i era egna Excel-filer? Det är precis den typen av saker vi går igenom på vår [Excel-utbildning i Umeå](/excel-utbildning-umea.html) – vi utgår från era riktiga arbetsfiler och rättar till det som kostar tid och skapar fel, i den takt som passar er grupp. [Kontakta oss](/kontakt.html) så berättar vi mer.
