"""SF-001-07 (TASK-001-07-03) — Copie versionnée du moteur de triage v1 dans Nolo.

    python3 tools/maj_moteur_nolo.py              # copie src/client/ondevice/*.mjs → app/js/vendor/*.js et le paquet
    python3 tools/maj_moteur_nolo.py --verifier   # code 0 si les copies sont identiques aux sources

Les modules sont copiés tels quels, seule l'extension des imports change (`.mjs` → `.js`, servie par tout serveur) ;
`app/tests/moteur.test.mjs` vérifie l'identité. Relancer après `python3 tools/demo/construire_paquet.py`.
"""
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
SOURCE = RACINE / "src" / "client" / "ondevice"
MODULES = ["empreinte", "extracteur_lexical", "referentiel", "moteur_triage"]


def copies() -> dict[Path, str]:
    out = {RACINE / "app" / "js" / "vendor" / f"{m}.js":
           re.sub(r'from "\./([a-z_]+)\.mjs"', r'from "./\1.js"', (SOURCE / f"{m}.mjs").read_text(encoding="utf-8"))
           for m in MODULES}
    out[RACINE / "app" / "data" / "paquet_triage.json"] = (SOURCE / "paquet_triage.json").read_text(encoding="utf-8")
    return out


def main() -> int:
    c = copies()
    if "--verifier" in sys.argv:
        perimes = [p.relative_to(RACINE).as_posix() for p, t in c.items() if not p.exists() or p.read_text(encoding="utf-8") != t]
        print("à jour" if not perimes else f"périmé : {', '.join(perimes)}")
        return 1 if perimes else 0
    for p, t in c.items():
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(t, encoding="utf-8")
        print(p.relative_to(RACINE).as_posix())
    return 0


if __name__ == "__main__":
    sys.exit(main())
