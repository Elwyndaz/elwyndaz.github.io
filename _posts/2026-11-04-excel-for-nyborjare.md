---
layout: artikel
title: "Excel för nybörjare: vad du ska lära dig först"
date: 2026-11-04
description: "Vad en nybörjare i Excel ska lära sig först, vad som kan vänta och vad du ska fråga efter när du väljer kurs: på plats eller digitalt, internt eller öppet."
kategori: Excel
ingress: "En grundkurs i Excel behöver inte täcka allt. Den behöver täcka rätt saker i rätt ordning, så att varje steg bygger på det förra. Här är en ordning som fungerar, vad du lugnt kan vänta med och hur du vet att du är redo att gå vidare."
---

Som nybörjare i Excel behöver du sex saker, i den här ordningen: celler och referenser, absoluta referenser med `$`, funktionerna `SUMMA` och `MEDEL`, funktionen `OM`, tabeller med `Ctrl+T` (som ger dig sortering och filtrering på köpet) och enkla diagram. Med de sex kan du bygga, räkna i och läsa av de flesta listor du möter på jobbet. Allt annat kan vänta tills du har ett konkret behov av det.

Ordningen spelar roll. Varje steg använder det förra, och den som hoppar direkt till pivottabeller eller makron fastnar ofta på något som hörde till steg ett.

## 1. Celler och referenser

Allt i Excel bygger på att en cell har en adress, till exempel `B2`. En formel börjar med likhetstecken och räknar med adresser i stället för med tal: `=B2+B3` i stället för `=120+80`. Ändrar du värdet i B2 räknas resultatet om av sig självt. Det är hela poängen med ett kalkylark, och den första vanan du ska bygga upp är att aldrig skriva in ett tal i en formel när talet redan står i en cell.

## 2. Absoluta referenser med $

När du kopierar en formel nedåt flyttar Excel med referenserna. Det är oftast rätt, men inte när formeln ska peka på en fast cell, till exempel en momssats i `E1`. Då skriver du `=B2*$E$1`, och dollartecknen låser referensen. I Excel för Windows kan du markera referensen i formeln och trycka `F4` för att växla mellan låst och olåst. Det är ett av de fel vi oftast ser hos självlärda, och vi har skrivit mer om det i artikeln om [vanliga misstag i Excel](/2026/06/14/vanliga-excel-misstag.html).

## 3. SUMMA och MEDEL

Nästa steg är de två funktioner du kommer att använda mest. `=SUMMA(B2:B20)` lägger ihop ett område, `=MEDEL(B2:B20)` räknar ut medelvärdet. Lär dig samtidigt att läsa området: kolonet betyder "från och med, till och med". Lägg märke till att svensk Excel använder semikolon mellan argument, inte komma, eftersom kommat redan är decimaltecken.

## 4. OM

`OM` är den första funktion som fattar ett beslut. `=OM(B2>1000;"Över budget";"Inom budget")` testar ett villkor och ger ett av två svar. När du förstår `OM` förstår du logiken bakom nästan alla mer avancerade funktioner, så den är värd att öva på tills du kan skriva den utan att titta.

## 5. Tabeller med Ctrl+T

Bygg listan ordentligt först: en rubrik per kolumn, en rad per post och inga tomma rader mitt i. Den vanan betalar sig i allt du gör senare. Klicka sedan i listan och tryck `Ctrl+T`. Listan blir en tabell med filterknappar i rubrikraden, och i dem sorterar och filtrerar du direkt, utan att gå via fliken **Data**. Formler och diagram som bygger på tabellen följer dessutom med när du lägger till nya rader. Det är ett av de enklaste grepp som finns och ett av dem som gör mest skillnad. Microsoft har en [lista över kortkommandon i Excel](https://support.microsoft.com/sv-se/office/kortkommandon-i-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f) om du vill se fler. Fler grepp av samma sort finns i artikeln om [funktioner som sparar tid](/2026/01/26/excel-funktioner-som-sparar-tid.html).

## 6. Enkla diagram

Markera tabellen och välj **Infoga → Rekommenderade diagram**. Excel föreslår några typer utifrån dina data. Som nybörjare räcker det att kunna stapeldiagram för att jämföra och linjediagram för att visa förändring över tid. Ett diagram är bara så rätt som underlaget, vilket är skälet till att det kommer sist.

## Det här kan vänta

Pivottabeller, `XLETAUPP`, villkorsstyrd formatering med formler, makron och AI-verktyg som [Copilot](/2026/08/20/ai-och-copilot-i-excel.html) är alla värda att lära sig, men inte först. De förutsätter att du redan kan referenser och har välbyggda listor. Pivottabellen är det naturliga nästa steget, och när du kommer dit finns vår guide [lär dig pivottabeller snabbt](/2026/10/07/lar-dig-pivottabeller-snabbt.html).

## Hur du vet att du är redo för nästa steg

Ta en lista du faktiskt arbetar med och prova tre saker utan att söka efter hjälp:

- Kopiera en formel som pekar på en fast cell nedåt i hela listan, och få rätt svar på varje rad.
- Skriv en `OM` som delar upp raderna i två grupper.
- Gör listan till en tabell, sortera den och gör ett diagram av den.

Klarar du alla tre har du grunden. Fastnar du på någon av dem är det där du ska öva, inte på nästa funktion.

## Så väljer du kurs

**På plats eller digitalt.** En kurs på plats gör det lättare att få hjälp i stunden, eftersom läraren ser din skärm och kan peka. För en nybörjare är det ofta värt mycket. Digitalt sparar restid, vilket i Västerbotten kan vara en verklig skillnad när deltagarna sitter på olika orter. Fråga i så fall hur kursledaren ser vad du gör, så att du inte blir sittande ensam med ett fel.

**Intern kurs för arbetsgruppen eller öppen kurs.** En öppen kurs passar dig som går ensam och vill träffa andra på samma nivå. Innehållet är detsamma för alla, och exemplen kommer från kursmaterialet. En intern kurs för arbetsgruppen kan utgå från de filer ni redan använder, och alla lär sig samma arbetssätt samtidigt. Det gör det lättare att hålla fast vid det efteråt, när filerna delas mellan kollegor.

**Fråga efter ordningen.** Be att få se vad kursen går igenom och i vilken ordning. Hoppar den över referenser för att hinna med fler funktioner är det en varningsflagga.

Vi håller excelutbildning i Umeå för arbetsgrupper, hos er eller på distans, och utgår från era egna arbetsfiler. Läs mer om vår [excelkurs i Umeå](/excel-utbildning-umea.html), och [hör av dig](/kontakt.html) och berätta hur er vardag i Excel ser ut, så återkommer vi med ett förslag.
