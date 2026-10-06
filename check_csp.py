"""Kontrollerar att ingen byggd sida behover 'unsafe-inline' for skript.

En CSP utan 'unsafe-inline' i script-src blockerar inline-skript och
inline-hanterare (onclick, onload) tyst: sidan ser hel ut men menyn ar dod.
Kors mot _site/ efter `jekyll build`, som check_faq.py. JSON-LD ar data och
berors inte av script-src.
"""
import glob
import re
import sys

TAG_RE = re.compile(r"<[a-zA-Z][^>]*>")
HANDLER_RE = re.compile(r"""\son[a-z]+\s*=\s*["']""")
SCRIPT_RE = re.compile(r"<script\b([^>]*)>", re.I)


def problems(src):
    found = [t[:80] for t in TAG_RE.findall(src) if HANDLER_RE.search(t)]
    for attrs in SCRIPT_RE.findall(src):
        if "src=" not in attrs and "application/ld+json" not in attrs:
            found.append(f"inline <script{attrs}>")
    if re.search(r"""href\s*=\s*["']\s*javascript:""", src, re.I):
        found.append("javascript:-lank")
    return found


def main():
    failed = 0
    paths = sorted(glob.glob("_site/**/*.html", recursive=True))
    for path in paths:
        found = problems(open(path, encoding="utf-8").read())
        if found:
            failed += 1
            print(f"FEL  {path}: {'; '.join(found[:3])}")
    print(f"{'FEL' if failed else 'OK'} {failed} av {len(paths)} sidor kraver 'unsafe-inline' for skript")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
