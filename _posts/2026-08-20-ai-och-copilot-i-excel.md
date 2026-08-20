---
layout: artikel
title: "AI och Copilot i Excel: vad fungerar, vad är en gimmick och vad behöver du kunna själv?"
date: 2026-08-20
description: "AI lovar att bygga dina kalkylark åt dig. Här är vad Microsoft Copilot och ChatGPT faktiskt klarar i Excel, var riskerna ligger och varför grundkunskapen behövs mer än någonsin."
kategori: Excel
ingress: "Microsoft Copilot och ChatGPT marknadsförs som att du aldrig mer behöver skriva en formel själv. På ett verkligt kontor med stökiga exporter och svenska bokföringsfiler ser verkligheten annorlunda ut. Här är vad AI faktiskt löser i Excel, var fällorna finns och hur du granskar resultatet."
---

Demonstrationerna av Microsoft Copilot och ChatGPT i kalkylark ser ofta enkla ut: beskriv vad du vill se och få ett färdigt diagram. Men i praktiken, när underlaget består av brutna datumformat, dolda rader och interna kontoplaner, stöter modellerna snabbt på problem.

AI är ett kraftfullt verktyg i Excel, förutsatt att du vet exakt vad du ber om och kan granska svaret.

## Det här fungerar bra i dag

Använd AI för syntax, felsökning och mönster, inte för att göra själva uträkningen i prompten.

**Hitta rätt formel snabbt.** I stället för att leta syntax i dokumentationen: beskriv vad du vill göra (*"slå ihop kolumn A och B, men bara om datumet i C är under 2026"*). Du får oftast en fungerande `XLETAUPP` eller kapslad formel på några sekunder.

**Förklara monsterformler.** Har du ärvt ett kalkylark med formler på fyra rader som ingen vågar röra? Klistra in formeln i AI och be om en rad-för-rad-förklaring av vad den faktiskt gör.

**Städa textdata.** Rensa telefonnummer, extrahera förnamn ur e-postadresser eller dela upp adresser med `TEXTDELA` eller regex. Mönsterigenkänning är språkmodellernas starkaste sida.

**Skriva enkla VBA-makron.** Att be om ett skript som exporterar valda flikar till PDF eller rensar tomma rader sparar timmar för den som inte programmerar själv.

## Tre konkreta fallgropar

**1. Formler som ser rätt ut men räknar snett.**
Språkmodeller gissar sannolika ord och tecken, de räknar inte. En föreslagen formel kan se helt rimlig ut men missa dolda rader, feltolka textformaterade siffror eller blanda ihop relativa och absoluta cellreferenser (`$A$1` mot `A1`).

**2. Granskningsproblemet.**
Förstår du inte logiken bakom en pivottabell eller en logisk funktion kan du inte avgöra om formeln missar 10 % av underlaget. I bokslut, lön och budget kostar sådana missar pengar.

**3. Sekretess och personuppgifter.**
Klistra aldrig in rådata med personnummer, lönelistor eller kundregister i öppna AI-verktyg utan företagsskydd.

## Fördjupning: Se Copilot i praktiken

För en nykter genomgång av vad Microsoft Copilot i Excel faktiskt klarar rekommenderas [Kenji Explains video på YouTube](https://youtu.be/Q9KxHeSySFo?si=u8KZR8gS8oftVWdl). Han visar konkret vilka prompter som fungerar och varför strukturerade Excel-tabeller är ett absolut krav för att verktyget inte ska ge felaktiga svar.

## Vill ni använda AI smartare i vardagen?

Många organisationer vill komma igång med AI men fastnar i teorin. Vill ni ha en praktisk workshop för arbetsgruppen, lära er använda Copilot smartare i era kalkylark eller effektivisera era administrativa rutiner, hjälper jag gärna till.

Jag experimenterar och bygger löpande egna AI- och app-lösningar via [buildapp.se](https://buildapp.se) och fokuserar alltid på praktisk nytta framför buzzwords. Hör gärna av er via [kontaktsidan](/kontakt.html) för ett förutsättningslöst samtal.

Vill ni i stället stärka grunderna i kalkylark med era egna arbetsfiler som bas? Läs mer om vår [verksamhetsanpassade excelkurs i Umeå och på distans](/excel-utbildning-umea.html).
