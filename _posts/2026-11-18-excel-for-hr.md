---
layout: artikel
title: "Excel för HR: personalförteckning, frånvaro och GDPR"
date: 2026-11-18
description: "Så använder HR Excel för personalförteckning, sjukfrånvaro, lönerevision och anställningstid, och så hanterar du personnummer och hälsouppgifter rätt."
kategori: Excel
ingress: "HR arbetar mer i Excel än de flesta tror: listor över personal, frånvaro, löner och anställningstid. Verktyget räcker långt, men HR-filer innehåller också några av de känsligaste uppgifterna på en arbetsplats. Här är vad som är värt att kunna, och vad som inte ska ligga i ett kalkylark alls."
---

Excel för HR handlar om fem saker: en personalförteckning som går att sortera och filtrera, frånvarostatistik per avdelning, underlag till lönerevisionen, uträknad anställningstid och färgmarkeringar som visar vad som behöver följas upp. Allt det klarar Excel med några få funktioner och en pivottabell. Det som skiljer en bra HR-fil från en riskabel är oftast inte formlerna, utan vilka personuppgifter som ligger i den och vem som kan öppna den.

## Personalförteckningen är grunden

Nästan allt annat bygger på en lista med en rad per anställd: anställningsnummer, namn, avdelning, befattning, anställningsdatum, sysselsättningsgrad och lön. En uppgift per kolumn, inga sammanslagna celler och inga tomma rader mitt i listan.

Gör listan till en tabell med `Ctrl+T`. Då får du filter på varje rubrik, och formler och pivottabeller följer med när du lägger till nya medarbetare. Vi har skrivit mer om varför i artikeln om [Excel-funktioner som sparar tid](/2026/01/26/excel-funktioner-som-sparar-tid.html).

Använd ett eget anställningsnummer som nyckel mellan flikar och filer, inte personnumret. Vi återkommer till varför.

## Anställningstid med DATEDIF

Hur länge någon har varit anställd behövs inför lönesamtal, jubileer och uppföljning. Med anställningsdatum i kolumn E ger den här formeln antal hela år fram till i dag:

```
=DATEDIF(E2;IDAG();"Y")
```

DATEDIF heter likadant i svensk Excel. Den syns inte i Excels funktionslista, men den fungerar. Byter du `"Y"` mot `"M"` får du hela månader i stället. Kom ihåg att formeln räknar kalendertid: tjänstledighet och avbrott i anställningen drar den inte av.

## Frånvaro och sjukfrånvaro

Frånvaro fungerar bäst som en egen lista, med en rad per frånvarotillfälle: anställningsnummer, avdelning, typ av frånvaro, startdatum, slutdatum och antal timmar. Inte en kolumn per månad som fylls i för hand, för den går inte att räkna på.

Ur en sådan lista räknar du med `SUMMA.OMF` ihop timmarna per avdelning och med `ANTAL.OMF` antalet tillfällen. Sjukfrånvaro i procent får du genom att dela sjukfrånvarotimmarna med den ordinarie arbetstiden för samma grupp och period.

## Pivottabeller per avdelning

När frågan är "hur ser det ut per avdelning och månad?" är pivottabellen snabbare än formler. Dra Avdelning till Rader, Månad till Kolumner och Timmar till Värden, och filtrera på frånvarotyp. Samma lista ger både sjukfrånvaro, föräldraledighet och semester utan att du bygger om något. Hur du kommer igång står i artikeln om [pivottabeller](/2026/10/07/lar-dig-pivottabeller-snabbt.html).

En sak att tänka på: en pivottabell över en liten avdelning visar i praktiken enskilda personers frånvaro. Är gruppen så liten att man kan räkna ut vem det gäller, är det inte längre statistik.

## Lönerevisionen

Inför lönerevisionen lägger du till kolumner för föreslagen höjning i procent och ny lön. Lägg en generell höjning i en egen cell högst upp, till exempel K1. Låt kolumnen för höjning börja med `=$K$1` och justera individuellt, och räkna ny lön med `=G2*(1+H2)`. Då står den generella höjningen på ett enda ställe i stället för i varje formel. Varför det spelar roll beskriver vi i [vanliga Excel-misstag](/2026/06/14/vanliga-excel-misstag.html). En summa över ny lön per avdelning visar direkt om utrymmet håller.

## Villkorsstyrd formatering för uppföljning

Under **Start → Villkorsstyrd formatering** kan du låta Excel färga det som kräver åtgärd. Några exempel som HR brukar ha nytta av:

- provanställningar som löper ut inom 30 dagar
- medarbetare med många korta frånvarotillfällen under året
- lönesamtal som inte är genomförda
- visstidsanställningar med slutdatum som har passerat

Regeln ändrar bara färgen, inte innehållet, så den är lätt att ta bort när den inte behövs.

## Personuppgifter: det som inte ska ligga i ett lösryckt kalkylark

Här skiljer sig HR från de flesta andra som arbetar i Excel. Nästan varje rad i en HR-fil är en personuppgift, och en del av dem är känsliga.

**Sjukfrånvaro är en uppgift om hälsa.** [Integritetsskyddsmyndigheten, IMY, skriver](https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/arbetsliv/tillaten-behandling--vilka-krav-galler/kansliga-personuppgifter/) att uppgifter om hälsa till exempel kan vara sjukfrånvaro, graviditet och läkarbesök, och sådana uppgifter räknas som känsliga personuppgifter enligt GDPR. IMY skriver också att en arbetsgivare normalt inte behöver behandla diagnoser. Ett frånvaroark behöver alltså antal timmar och typ av frånvaro, inte varför någon var sjuk.

**Personnummer bara när det är klart motiverat.** [Enligt IMY](https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/arbetsliv/tillaten-behandling--vilka-krav-galler/personnummer/) får en arbetsgivare använda personnummer för till exempel löne- och behörighetsadministration, men personnumret ska inte exponeras i onödan. I en uppföljningsfil räcker anställningsnumret.

**Mejla inte runt filen.** [IMY:s vägledning](https://www.imy.se/verksamhet/dataskydd/vi-guidar-dig/sakerhet-for/) är att känsliga personuppgifter som skickas med e-post ska vara krypterade så att bara den avsedda mottagaren kan läsa dem. En frånvarofil som bifogas i ett vanligt mejl uppfyller inte det. Dela i stället en länk till en plats där bara de som behöver uppgifterna har behörighet.

Tre saker vi rekommenderar i praktiken:

1. **Ta bort det som inte behövs.** Behöver rapporten inte namn eller personnummer, ta bort kolumnerna innan du sparar en kopia. IMY skriver att uppgifter inte får samlas in eller bevaras slentrianmässigt, och det gäller även gamla exporter som ligger kvar på skrivbordet.
2. **Skydda filen.** Under **Arkiv → Info** väljer du **Skydda arbetsbok → Kryptera med lösenord**. [Microsoft kan inte återställa](https://support.microsoft.com/sv-se/office/skydda-en-excel-fil-7359d4ae-7213-4ac2-b058-f75e9311b599) ett glömt lösenord, så förvara det säkert.
3. **Spara på ett ställe.** En fil med behörighetsstyrning, inte fem versioner i olika inkorgar.

Det här är ingen juridisk genomgång. Är ni osäkra på vad ni får spara och hur länge, börja med IMY:s vägledning om arbetsliv på imy.se.

## Så kommer du vidare

Det mesta ovan går att lära sig på en halvdag om man får göra det i sina egna filer. På vår [excelkurs](/excel-utbildning-umea.html) utgår vi från era riktiga underlag, och för en HR-grupp betyder det personalförteckningen, frånvarolistan och lönefilen, alltid som avidentifierade kopior eller med påhittade namn, aldrig med riktiga personuppgifter. [Hör av dig](/kontakt.html) och berätta hur ni arbetar i dag, så återkommer vi med ett förslag.
