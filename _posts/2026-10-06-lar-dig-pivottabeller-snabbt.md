---
layout: artikel
title: "Så lär du dig pivottabeller snabbt: från rådata till svar på fem minuter"
date: 2026-10-06
description: "Pivottabeller är Excels snabbaste väg från en lång lista till ett svar. Här är de fyra rutorna, ett exempel steg för steg och de fel som stoppar de flesta nybörjare."
kategori: Excel
ingress: "Pivottabellen har rykte om sig att vara avancerad, men den är i själva verket det enklaste sättet att summera en lång lista utan att skriva en enda formel. Det som stoppar de flesta är inte verktyget utan underlaget. Här är vad du behöver förstå, i den ordning du behöver det."
---

En pivottabell gör en enda sak: den tar en lång lista och räknar ihop den per grupp. Försäljning per månad, timmar per projekt, sjukfrånvaro per avdelning. Allt det går att bygga med formler som `SUMMA.OMF`, men pivottabellen gör det på några sekunder, och du kan vända på frågan utan att börja om.

Det är också därför den lönar sig att lära sig tidigt. Du behöver inte kunna en enda funktion för att använda den.

## Börja med underlaget, inte med pivottabellen

De flesta problem med pivottabeller beror på hur listan ser ut, inte på pivottabellen. Kontrollera fyra saker innan du börjar:

- **En rubrik per kolumn, på en enda rad.** Inga tomma rubriker och inga rubriker i två våningar.
- **En rad per händelse.** En order, en tidrapport, en faktura. Inga delsummor eller tomma rader mitt i listan.
- **En typ av uppgift per kolumn.** Datum i en kolumn, belopp i en annan, avdelning i en tredje.
- **Tal och datum som är riktiga tal och datum.** Står de vänsterställda i cellen är de sparade som text och går inte att räkna med. Hur du rättar det står i artikeln om [vanliga Excel-misstag](/2026/06/14/vanliga-excel-misstag.html).

Gör sedan listan till en tabell: klicka i den och tryck `Ctrl+T`. Då växer underlaget av sig självt när du lägger till rader, och pivottabellen hittar de nya raderna nästa gång du uppdaterar.

## De fyra rutorna

Klicka i tabellen och välj **Infoga → Pivottabell**. Till höger öppnas en fältlista med dina kolumnrubriker och fyra rutor under den. Hela verktyget är de fyra rutorna:

- **Rader:** det du vill ha en rad per. Till exempel avdelning.
- **Kolumner:** det du vill ha en kolumn per. Till exempel månad.
- **Värden:** det som ska räknas. Till exempel belopp.
- **Filter:** det du vill kunna välja bort. Till exempel år.

Du drar en rubrik till en ruta, och tabellen ritas om direkt. Blir det fel drar du tillbaka den. Ingenting i ditt underlag ändras, så det går inte att förstöra något genom att prova.

## Ett exempel, steg för steg

Säg att du har en lista med tidrapporter: datum, medarbetare, projekt och timmar. Frågan är hur många timmar varje projekt har fått per månad.

1. Dra **Projekt** till Rader. Du får en rad per projekt.
2. Dra **Timmar** till Värden. Nu står summan av timmarna bredvid varje projekt.
3. Dra **Datum** till Kolumner. Excel grupperar datumen i månader åt dig. Blir det en kolumn per dag i stället: högerklicka på ett datum, välj **Gruppera** och markera Månader.

Det är hela arbetet. Vill du i stället se timmar per medarbetare byter du ut Projekt mot Medarbetare i rutan Rader. Samma underlag, ny fråga, tio sekunder.

## Tre inställningar som är värda att kunna

**Summa eller antal.** Om Värden visar "Antal av Timmar" i stället för "Summa av Timmar" finns det text eller tomma celler i kolumnen. Rätta underlaget, eller högerklicka på ett värde och välj **Sammanfatta värden efter → Summa**.

**Andelar i stället för belopp.** Högerklicka på ett värde, välj **Visa värden som → % av totalsumma**. Då ser du direkt att ett projekt står för 42,5 % av timmarna, utan att räkna själv.

**Utsnitt.** Under **Infoga → Utsnitt** får du klickbara knappar för till exempel avdelning eller år. De gör samma sak som rutan Filter, men syns hela tiden och är lättare för en kollega att förstå.

## Felen som stoppar de flesta

**Siffrorna stämmer inte med underlaget.** En pivottabell uppdateras inte av sig själv. Har du ändrat i listan: högerklicka i pivottabellen och välj **Uppdatera**. Det här är det vanligaste skälet till att två personer får olika siffror ur samma fil.

**De nya raderna kommer inte med.** Då pekar pivottabellen på ett fast cellområde i stället för en tabell. Gör om underlaget till en tabell med `Ctrl+T`, så försvinner problemet.

**En rad som heter (tom).** Det finns rader i underlaget där fältet inte är ifyllt. Det är pivottabellen som visar dig ett fel i listan, inte ett fel i pivottabellen.

**Samma sak står på två rader.** "Umeå" och "Umeå " med ett mellanslag efter är två olika värden för Excel. Samma gäller "IT" och "It". Rätta stavningen i underlaget och uppdatera.

## Så övar du

Öva på en lista du redan arbetar med, inte på ett påhittat exempel. Ta en export ur ert ekonomisystem, tidsystem eller kundregister och ställ tre frågor till den som du annars hade räknat fram för hand. När du har svarat på dem med en pivottabell kan du verktyget.

Det är så vi lägger upp det på vår [excelkurs i Umeå](/excel-utbildning-umea.html): deltagarna arbetar i sina egna filer, så att det som fungerar på kursen också fungerar på måndag. [Hör av dig](/kontakt.html) så berättar vi mer.
