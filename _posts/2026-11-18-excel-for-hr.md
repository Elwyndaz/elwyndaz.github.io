---
layout: artikel
title: "Excel för HR: personalförteckning, frånvaro och GDPR"
date: 2026-11-18
description: "Så använder HR Excel för personalförteckning, sjukfrånvaro, lönerevision och anställningstid, och så hanterar du personnummer och hälsouppgifter rätt."
kategori: Excel
ingress: "HR-filer innehåller några av de känsligaste uppgifterna på en arbetsplats. Här är vad som är värt att kunna i Excel, och vad som inte ska ligga i ett kalkylark."
---

Excel för HR handlar om fyra saker: en personalförteckning, frånvarostatistik, anställningstid och underlag till lönerevisionen. Det som skiljer en bra HR-fil från en riskabel är sällan formlerna, utan vilka personuppgifter som ligger i den.

## Personalförteckningen

En rad per anställd: anställningsnummer, namn, avdelning, befattning, anställningsdatum, sysselsättningsgrad och lön. Gör listan till en tabell med `Ctrl+T`, så följer filter, formler och pivottabeller med när listan växer. Använd anställningsnumret som nyckel mellan flikar och filer, inte personnumret.

## Anställningstid

`=DATEDIF(E2;IDAG();"Y")` ger antal hela år sedan anställningsdatumet i E2, och `"M"` ger hela månader. Funktionen syns inte i Excels funktionslista men fungerar. Tjänstledighet och avbrott dras inte av.

## Frånvaro

Lägg frånvaron i en egen lista med en rad per tillfälle: anställningsnummer, avdelning, typ av frånvaro, startdatum, slutdatum och timmar. `SUMMA.OMF` ger timmar per avdelning och `ANTAL.OMF` antal tillfällen. Sjukfrånvaro i procent är sjukfrånvarotimmarna delat med den ordinarie arbetstiden för samma grupp och period.

En [pivottabell](/2026/10/07/lar-dig-pivottabeller-snabbt.html) med Avdelning i Rader, Månad i Kolumner och Timmar i Värden ger samma sak snabbare. Men i en liten grupp visar den enskilda personers frånvaro, och då är det inte längre statistik.

## Lönerevisionen

Lägg den generella höjningen i en egen cell, till exempel K1. Låt kolumnen för höjning börja med `=$K$1` och justera individuellt, och räkna ny lön med `=G2*(1+H2)`. En summa per avdelning visar om utrymmet håller.

## Personuppgifter

- **Sjukfrånvaro är en uppgift om hälsa** och därmed känslig enligt GDPR, [skriver IMY](https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/arbetsliv/tillaten-behandling--vilka-krav-galler/kansliga-personuppgifter/). Spara timmar och typ av frånvaro, inte diagnoser.
- **Personnummer bara när det behövs**, till exempel för lön. [Enligt IMY](https://www.imy.se/verksamhet/dataskydd/dataskydd-pa-olika-omraden/arbetsliv/tillaten-behandling--vilka-krav-galler/personnummer/) ska det inte exponeras i onödan.
- **Mejla inte filen.** Känsliga personuppgifter i e-post ska vara krypterade, [enligt IMY:s vägledning](https://www.imy.se/verksamhet/dataskydd/vi-guidar-dig/sakerhet-for/). Dela en länk till en plats med behörighetsstyrning.
- **Ta bort det som inte behövs** innan du sparar en kopia, och kryptera filen under **Arkiv → Info → Skydda arbetsbok → Kryptera med lösenord**. [Microsoft kan inte återställa](https://support.microsoft.com/sv-se/office/skydda-en-excel-fil-7359d4ae-7213-4ac2-b058-f75e9311b599) ett glömt lösenord.

Det här är ingen juridisk genomgång. Är ni osäkra, börja med IMY:s vägledning om arbetsliv.

---

På vår [excelkurs](/excel-utbildning-umea.html) utgår vi från era egna underlag, för en HR-grupp alltid som avidentifierade kopior eller med påhittade namn. [Hör av dig](/kontakt.html) så återkommer vi med ett förslag.
