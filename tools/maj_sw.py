"""SF-013-08 (FR-1336) — Met à jour la liste `FICHIERS` et la `VERSION` de `app/sw.js`.

    python3 tools/maj_sw.py nolo-AAAA-MM-JJ-N

Liste tous les fichiers servis de `app/` (assets, css, data, js, index.html, manifeste) ; contrôlé par
`app/tests/qualite.test.mjs` (TEST-013-08-01, liste). À relancer à chaque livraison (CLAUDE.md §7).
"""
import re
import sys
from pathlib import Path

APP = Path(__file__).resolve().parents[1] / "app"


def main() -> int:
    if len(sys.argv) != 2 or not re.fullmatch(r"nolo-[\w-]+", sys.argv[1]):
        print(__doc__)
        return 2
    fichiers = sorted(f"./{p.relative_to(APP).as_posix()}" for d in ("assets", "css", "data", "js")
                      for p in (APP / d).rglob("*") if p.is_file())
    fichiers += ["./index.html", "./manifest.webmanifest"]
    sw = (APP / "sw.js").read_text(encoding="utf-8")
    liste = "const FICHIERS = [\n  './',\n" + "".join(f'  "{f}",\n' for f in sorted(fichiers)) + "];"
    sw = re.sub(r"const FICHIERS = \[.*?\];", lambda m: liste, sw, count=1, flags=re.S)
    sw = re.sub(r"const VERSION = '[^']*';", f"const VERSION = '{sys.argv[1]}';", sw, count=1)
    (APP / "sw.js").write_text(sw, encoding="utf-8")
    print(f"app/sw.js : {len(fichiers) + 1} entrées, VERSION {sys.argv[1]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
