"""SF-007-17 (TASK-007-17-03, FR-1903) — Conversion de `config/policy.yaml` en `app/data/politique.json`.

    python3 tools/politique_json.py             # écrit app/data/politique.json
    python3 tools/politique_json.py --verifier  # code 0 si le fichier est à jour (même version, mêmes empreintes)

Nolo lit la politique dans ce fichier : une seule source, `policy.yaml`, aucune valeur juridique recopiée
à la main dans l'application. `empreinte` est celle que calcule `Politique.charger` (octets du YAML) ;
`empreinte_canonique` est l'empreinte de la sérialisation canonique des données, que le navigateur
recalcule au chargement (`app/js/domain/politique.js`).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE))

from src.server.gouvernance.politique import Politique, _canonique  # noqa: E402

SOURCE = RACINE / "config" / "policy.yaml"
CIBLE = RACINE / "app" / "data" / "politique.json"


def produire(source: Path = SOURCE) -> dict:
    pol = Politique.charger(source)
    donnees = pol._d
    return {
        "version": pol.version,
        "empreinte": pol.empreinte,
        "empreinte_canonique": "sha256:" + hashlib.sha256(_canonique(donnees).encode()).hexdigest(),
        "source": "config/policy.yaml",
        "genere_par": "tools/politique_json.py",
        "donnees": donnees,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--verifier", action="store_true")
    a = ap.parse_args()
    attendu = produire()
    texte = json.dumps(attendu, ensure_ascii=False, indent=1) + "\n"
    if a.verifier:
        if not CIBLE.exists():
            print(f"absent : {CIBLE.relative_to(RACINE)}")
            return 1
        actuel = json.loads(CIBLE.read_text(encoding="utf-8"))
        ecarts = [k for k in ("version", "empreinte", "empreinte_canonique") if actuel.get(k) != attendu[k]]
        if ecarts or actuel.get("donnees") != attendu["donnees"]:
            print(f"périmé : {', '.join(ecarts) or 'donnees'} — relancer python3 tools/politique_json.py")
            return 1
        print(f"à jour : politique {attendu['version']}, {attendu['empreinte_canonique']}")
        return 0
    CIBLE.parent.mkdir(parents=True, exist_ok=True)
    CIBLE.write_text(texte, encoding="utf-8")
    print(f"{CIBLE.relative_to(RACINE)} : politique {attendu['version']} ({len(texte.encode())} octets), "
          f"{attendu['empreinte_canonique']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
