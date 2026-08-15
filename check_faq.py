"""Kontrollerar att FAQPage-schemat matchar den synliga FAQ-texten ordagrant.

Google kraver att strukturerad data speglar det som faktiskt star pa sidan.
Kors mot en byggd sida i _site/.
"""
import glob
import html
import json
import re
import sys

SCRIPT_RE = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.S)
FAQ_RE = re.compile(r'<summary>(.*?)</summary>\s*<p class="faq-a">(.*?)</p>', re.S)


def plain(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def check(path):
    src = open(path, encoding="utf-8").read()
    blocks = [json.loads(m) for m in SCRIPT_RE.findall(src)]
    faqs = [b for b in blocks if b.get("@type") == "FAQPage"]
    if not faqs:
        return True, "inget FAQ-schema"

    schema = [
        (plain(q["name"]), plain(q["acceptedAnswer"]["text"]))
        for q in faqs[0]["mainEntity"]
    ]
    visible = [(plain(a), plain(b)) for a, b in FAQ_RE.findall(src)]

    problems = []
    if len(schema) != len(visible):
        problems.append(f"antal skiljer: schema {len(schema)}, synliga {len(visible)}")
    for i, (s, v) in enumerate(zip(schema, visible)):
        if s[0] != v[0]:
            problems.append(f"[{i}] fraga: {s[0]!r} != {v[0]!r}")
        if s[1] != v[1]:
            problems.append(f"[{i}] svar: {s[1][:70]!r} != {v[1][:70]!r}")
    return not problems, "; ".join(problems) or f"{len(schema)} par matchar"


def main():
    failed = 0
    for path in sorted(glob.glob("_site/**/*.html", recursive=True)):
        ok, msg = check(path)
        if msg != "inget FAQ-schema":
            print(f"{'OK  ' if ok else 'FEL '} {path}: {msg}")
        if not ok:
            failed += 1
    print(f"\n{failed} sidor med avvikelse")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
