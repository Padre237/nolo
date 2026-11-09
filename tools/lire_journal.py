"""SF-007-11 (TASK-007-11-02, FR-769) — Lecture d'une session du journal d'audit chaîné.

    python3 tools/lire_journal.py tests/reports/2026-11-04/journal_regroupement.jsonl

Une ligne par événement, dans l'ordre : agent, action, décision, fragments cités (identifiant et article),
version de la politique, validateur humain ; puis la vérification de la chaîne. Aucun contenu d'entrée n'est affiché.
"""
import json
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(RACINE))

from src.server.gouvernance.journal import ZERO, empreinte  # noqa: E402


def articles() -> dict:
    out = {}
    for ligne in open(RACINE / "kb" / "kb_chunks.jsonl", encoding="utf-8"):
        c = json.loads(ligne)
        out[c["chunk_id"]] = c["article"] or c["section"]
    return out


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    evts = [json.loads(l) for l in Path(sys.argv[1]).read_text(encoding="utf-8").splitlines() if l.strip()]
    art = articles()
    precedent, erreur = ZERO, None
    for i, e in enumerate(evts, 1):
        h = e["hash"]
        reste = {k: v for k, v in e.items() if k != "hash"}
        if erreur is None and (reste.get("hash_precedent") != precedent or empreinte(reste) != h):
            erreur = i
        precedent = h
        frag = ", ".join(f"{f} ({art.get(f, '?')})" for f in e.get("fragments", [])) or "—"
        val = e.get("validateur_humain")
        print(f"{i:>3}  {e['horodatage'][:16]}  {e['agent']:<22} {e['action']:<48} {e['decision']:<26} "
              f"politique {e['politique']['version']}  fragments : {frag}"
              + (f"  validateur : {val.get('role')} {val.get('id')}" if val else ""))
    print(f"\n{len(evts)} événements ; chaîne " + ("valide" if erreur is None else f"INVALIDE à partir de l'événement {erreur}"))
    return 0 if erreur is None else 1


if __name__ == "__main__":
    sys.exit(main())
