"""SF-006-02 à SF-006-04 (TEST-006-02-02, TEST-006-03-02, TEST-006-04-02) — Oracle de la fiabilité des pharmacies.

    python3 tools/exporter_fiabilite.py   # écrit tests/js/fixtures/fiabilite_attendue.json

Calcule, avec la référence Python (`kb/services/orientation_services.score_fiabilite`) et les signalements
synthétiques (`kb/data/synthetic/signalements.csv`, campagne de manipulation injectée comprise), le score de
chaque pharmacie à plusieurs instants : pendant la rafale (gel attendu), puis un jour et dix jours après.
Nolo (`app/js/domain/fiabilite.js`) doit rendre les mêmes scores, effectifs et gels.
"""
from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE / "kb"))

from services.orientation_services import REPORTS, score_fiabilite  # noqa: E402

CIBLE = RACINE / "tests" / "js" / "fixtures" / "fiabilite_attendue.json"
INSTANTS = ["2026-10-20T22:00", "2026-10-21T22:00", "2026-10-30T12:00"]


def main() -> int:
    etabs = sorted({r["etab_id"] for r in REPORTS})
    attendus = []
    for instant in INSTANTS:
        now = datetime.fromisoformat(instant)
        for e in etabs:
            s = score_fiabilite(e, now)
            attendus.append({"instant": instant, "etab_id": e, "score": s["score"], "n": s["n"], "gel": s["gel"],
                             "negatifs_3h": s["negatifs_3h"]})
    CIBLE.write_text(json.dumps({"genere_par": "tools/exporter_fiabilite.py",
                                 "signalements": "kb/data/synthetic/signalements.csv",
                                 "attendus": attendus}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    gels = sorted({a["etab_id"] for a in attendus if a["gel"]})
    print(f"{CIBLE.relative_to(RACINE)} : {len(attendus)} scores ({len(etabs)} pharmacies × {len(INSTANTS)} instants) ; gel : {gels}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
