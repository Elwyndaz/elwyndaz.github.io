"""Bygger podcast.html ur docs/dumma-manniskor-arbetsliv.md.

Kör från reporoten: python docs/bygg_podcast.py
Listan i md-filen är sanningskällan. Ändra den och kör om, redigera aldrig podcast.html för hand.
Ändrar du design: mallen ligger i MALL nedan, raderna följer .link-row i style.css.
"""
import html
import re
import sys
from pathlib import Path

rot = Path(__file__).resolve().parent.parent
md = (rot / "docs" / "dumma-manniskor-arbetsliv.md").read_text(encoding="utf-8")

def fakta(namn: str) -> str:
    m = re.search(rf"\*\*{namn}:\*\*\s*(.+)", md)
    assert m, f"saknar {namn}"
    return m.group(1).strip()

totalt = int(fakta("Totalt antal avsnitt i flödet"))
n_direkt, n_indirekt = int(fakta("Direkta")), int(fakta("Indirekta"))
genomgang = fakta("Genomgången gjord")  # 2026-11-02

def rader(rubrik: str) -> list[list[str]]:
    avsnitt = md.split(f"## {rubrik}", 1)[1].split("\n## ", 1)[0]
    ut = []
    for rad in avsnitt.splitlines():
        if not re.match(r"\| (ej num\.|\d+) \|", rad):
            continue
        celler = [c.strip() for c in re.split(r"\s\|\s", rad.strip().strip("|").strip())]
        assert len(celler) == 6, f"fel antal kolumner: {rad[:80]}"
        ut.append(celler)
    return ut

direkta, indirekta = rader("Direkt"), rader("Indirekt")
assert len(direkta) == n_direkt and len(indirekta) == n_indirekt, "radantalet stämmer inte med rubrikerna"
assert "—" not in md, "tankstreck i källan"

def rad_html(nr: int, cat: str, c: list[str], dold: bool) -> str:
    num, titel, datum, omrade, koppling, lank = c
    m = re.fullmatch(r"\[Lyssna\]\((https://[^)\s]+)\)", lank)
    assert m, f"länk som inte är https: {lank}"
    siffra = "&middot;" if num == "ej num." else num
    klass = "link-row hidden" if dold else "link-row"
    e = html.escape
    return (
        f'      <a href="{e(m.group(1))}" target="_blank" rel="noopener" class="{klass}" data-cat="{cat}">\n'
        f'        <span class="b-num" style="font:500 11.5px/1.6 var(--mono);color:var(--accent)">{siffra}</span>\n'
        f'        <span class="l-title">{e(titel)}<span>{e(koppling)}</span></span>\n'
        f'        <span class="l-meta">{e(omrade)}<br>{e(datum)}</span>\n'
        f'        <span class="l-arrow">&#8599;</span>\n'
        f'      </a>'
    )

alla = [rad_html(i, "direkt", c, False) for i, c in enumerate(direkta)] + \
       [rad_html(i, "indirekt", c, True) for i, c in enumerate(indirekta)]

nyast = max(c[2] for c in direkta + indirekta)
MANAD = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"]
def sv_datum(iso: str) -> str:
    å, m, d = iso.split("-")
    return f"{int(d)} {MANAD[int(m) - 1]} {å}"

mall = (rot / "docs" / "podcast.mall.html").read_text(encoding="utf-8")
ut = (mall.replace("{{RADER}}", "\n".join(alla))
          .replace("{{DIREKTA}}", str(n_direkt)).replace("{{INDIREKTA}}", str(n_indirekt))
          .replace("{{TOTALT}}", str(totalt)).replace("{{GENOMGANG}}", sv_datum(genomgang))
          .replace("{{NYAST}}", sv_datum(nyast)))
assert "{{" not in ut and "—" not in ut
(rot / "podcast.html").write_text(ut, encoding="utf-8", newline="\n")
print(f"PASS: podcast.html, {n_direkt} direkta och {n_indirekt} indirekta rader, nyaste avsnitt {nyast}")
