---
layout: artikel
title: "Excel för ekonomer: funktionerna du faktiskt använder"
date: 2026-10-28
description: "Excel för ekonomer är några få funktioner och arbetssätt: XLETAUPP, SUMMA.OMF, pivottabeller, perioddatum, Power Query och avstämningar som larmar."
kategori: Excel
ingress: "En ekonom behöver inte kunna alla Excels funktioner. Det räcker med ett tiotal, använda på rätt sätt, plus vanan att bygga filer som går att lita på nästa månad också. Här är de vi själva återkommer till, med svenska funktionsnamn och exempel du kan skriva av."
---

Excel för ekonomer handlar om tre saker: att hämta rätt värde ur en annan lista, att summera per konto och period, och att kunna lita på siffran innan den går vidare. För det räcker XLETAUPP, SUMMA.OMF, pivottabeller, några datumfunktioner, Power Query och en handfull kontrollceller. Resten av Excel är bra att ha, men det är de här som avgör om månadsrapporten tar en timme eller en dag.

## XLETAUPP i stället för LETARAD

Det vanligaste momentet i ekonomiarbete är att para ihop två listor: kontonamn till en huvudboksexport, kostnadsställe till en leverantörsfaktura, budget till utfall. XLETAUPP gör det och ersätter LETARAD:

```
=XLETAUPP(A2; Kontoplan[Konto]; Kontoplan[Benämning]; "Saknas")
```

Det fjärde argumentet ([Microsofts beskrivning av XLETAUPP](https://support.microsoft.com/sv-se/office/xletaupp-funktionen-b7fd680e-6d10-43e6-84f9-88eae8bf5929)) bestämmer vad som visas när värdet inte finns. Skriv alltid något där. "Saknas" i en cell är en upplysning, ett felvärde i en rapport är något ingen vågar skicka vidare. Till skillnad från LETARAD kan returkolumnen ligga på vilken sida som helst om sökkolumnen. Du pekar dessutom ut returkolumnen direkt i stället för att ange ett kolumnnummer, så formeln går inte sönder när någon infogar en kolumn i kontoplanen. XLETAUPP finns i Microsoft 365 och Excel 2021 och senare. Har ni en äldre version gäller fortfarande LETARAD eller INDEX och PASSA.

## SUMMA.OMF för konto och period

En resultatrapport är i grunden en lång rad villkorade summor: konto 3010 i mars, kostnadsställe 200 hittills i år. SUMMA.OMF klarar flera villkor i samma formel:

```
=SUMMA.OMF(D:D; B:B; 3010; A:A; ">="&F1; A:A; "<="&SLUTMÅNAD(F1;0))
```

Här ligger datum i kolumn A, konto i B och belopp i D, och F1 innehåller periodens första dag. Lägg märke till att [summaområdet kommer först](https://support.microsoft.com/sv-se/office/summa-omf-funktionen-c9e748f5-7ea7-455d-9406-611cebce642b). I den äldre SUMMA.OM kommer det sist, och att blanda ihop ordningen är en klassisk felkälla när formler skrivs om.

Behöver du räkna något som inte är en ren summa, till exempel ett viktat snittpris, är PRODUKTSUMMA rätt verktyg. Med antal i kolumn B och pris i C:

```
=PRODUKTSUMMA(B2:B50; C2:C50)/SUMMA(B2:B50)
```

Antal gånger pris, summerat, delat med totalt antal. En formel, ingen hjälpkolumn.

## Datum som styr perioden

Låt ett enda datum styra hela rapporten. Skriv periodens första dag i F1 och räkna resten därifrån:

- `=SLUTMÅNAD(F1;0)` ger sista dagen i samma månad.
- `=SLUTMÅNAD(F1;-1)+1` ger första dagen i månaden, om du hellre vill kunna skriva vilket datum som helst i F1.
- `=EDATUM(F1;-12)` ger samma dag ett år tidigare, för jämförelse mot fjolåret.

Byter du datum i F1 flyttar sig hela rapporten en månad. Inga formler att skriva om, ingen risk att en flik står kvar på förra perioden. Förutsättningen är att datumen i underlaget är riktiga datum och inte text, vilket är vanligt i exporter. Hur du känner igen och rättar det står i artikeln om [vanliga Excel-misstag](/2026/06/14/vanliga-excel-misstag.html).

## Pivottabeller för den snabba frågan

När chefen frågar vad som drev kostnadsökningen i kvartal tre är en pivottabell snabbare än vilken formel som helst. Konto på rader, månad på kolumner, belopp i värden, och du ser på en minut var avvikelsen sitter. Dubbelklicka på en summa så öppnar Excel ett nytt blad med just de rader som ligger bakom den, vilket gör det enkelt att visa underlaget. Bladet är en kopia och uppdateras inte när underlaget ändras.

Ett tips som sparar många missförstånd: använd pivottabellen för att hitta svaret, men bygg den återkommande rapporten med SUMMA.OMF. Den rapporten ska ha samma layout varje månad, och det är formler bättre på. Grunderna går vi igenom i [pivottabeller steg för steg](/2026/10/07/lar-dig-pivottabeller-snabbt.html).

## Power Query i stället för att klistra om

Den största tidstjuven i många ekonomifiler är inte formlerna utan klistrandet. Varje månad samma export, samma kolumner som ska bort, samma datum som ska rättas. Power Query gör det jobbet en gång och upprepar det sedan åt dig.

Lägg månadens exporter i en mapp och välj **Data → Hämta data → Från fil → Från mapp**. Excel listar filerna, och med **Kombinera** slås de ihop till en tabell. Stegen du gör i Power Query-redigeraren, som att ta bort kolumner, byta datatyp eller filtrera bort delsummor, sparas och körs om varje gång. Nästa månad lägger du bara den nya filen i mappen och klickar på **Uppdatera alla** under fliken Data.

Det kräver att exporterna ser likadana ut varje gång. Gör de inte det är det bättre att veta om det direkt än att upptäcka det i en summa.

## Felsäkra modellen

En ekonomifil ska kunna granskas av någon annan än den som byggde den. Några vanor gör stor skillnad:

- **Indata på ett ställe.** Momssats, valutakurs och periodstart i egna celler med tydlig rubrik, aldrig inskrivna i formler.
- **Avstämning i filen.** Lägg en kontrollcell som jämför rapportens totalsumma med underlagets, till exempel `=OM(ABS(H40-Underlag!D1)<0,01;"OK";"STÄMMER INTE")`. Gränsen 0,01 fångar de små avvikelser på sista decimalen som Excel kan ge när många decimaltal summeras. En skillnad på ett öre eller mer larmar.
- **Avrunda medvetet.** Formatering visar färre decimaler men räknar med alla. Där summan ska stämma mot bokföringen, använd `AVRUNDA(...;2)`.
- **OMFEL sparsamt.** Att dölja alla fel med OMFEL gör filen snygg och farlig. Använd den bara där du vet vilket fel du förväntar dig.

Kontrollcellen är den viktigaste av dem. Den kostar en minut att bygga och larmar varje gång någon klistrar in för få rader.

## Lär dig det i dina egna filer

Funktionerna är inte svåra var för sig. Det svåra är att se var de passar in i just era egna filer. Därför bygger vi våra excelkurser på deltagarnas egna arbetsfiler, som vi samlar in innan. Pivottabeller, XLETAUPP, logiska funktioner och datarensning är sådant vi ofta fördjupar oss i.

Läs mer om upplägget på sidan om vår [excelutbildning i Umeå och på distans](/excel-utbildning-umea.html), eller [hör av dig](/kontakt.html) och berätta hur er vardag i Excel ser ut, så återkommer vi med ett förslag.
