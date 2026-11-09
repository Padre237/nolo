"""SF-002 (incrément démo D-025) — Agrégation par aire et semaine, détection de signal, validation humaine.

Les définitions de signaux viennent du guide SBC (kb/rules/sbc_definitions.yaml), jamais d'un texte
codé en dur ; le seuil d'agrégation vient de la politique. Un signal n'est JAMAIS publié ni transmis
sans validation du point focal (FR-204, Principe VI) ; aucune donnée individuelle ne sort (FR-206).
"""
from __future__ import annotations

from collections import Counter
from pathlib import Path

import yaml

RACINE = Path(__file__).resolve().parents[3]
KB = RACINE / "kb" if (RACINE / "kb" / "rules").exists() else RACINE.parent / "kb"
SBC = yaml.safe_load(open(KB / "rules" / "sbc_definitions.yaml", encoding="utf-8"))


def agreger(contributions: list[dict], politique) -> list[dict]:
    """Agrégats (aire, semaine, syndrome). Sous le seuil, le nombre est masqué pour la publication."""
    seuil = politique.valeur("surveillance.seuil_minimal_cas_par_zone")
    compteur = Counter((c["aire_id"], c["semaine"], c["syndrome"]) for c in contributions)
    return [{"aire_id": a, "semaine": s, "syndrome": sy, "cas": n,
             "publiable": n >= seuil, "cas_publie": n if n >= seuil else None}
            for (a, s, sy), n in sorted(compteur.items())]


def detecter_signaux(contributions: list[dict], politique) -> list[dict]:
    """SC1 du guide SBC : au moins 2 personnes, signes similaires, même milieu, une semaine.
    Tout signal naît au statut « a_trier » et exige une validation humaine (FR-203, FR-204)."""
    sc1 = next(d for d in SBC["definitions_signaux"] if d["code"] == "SC1")
    minimum = sc1["regle_machine"].get("min", 2) if isinstance(sc1.get("regle_machine"), dict) else 2
    compteur = Counter((c["aire_id"], c["semaine"], c["syndrome"]) for c in contributions)
    signaux = []
    for (aire, semaine, syndrome), n in sorted(compteur.items()):
        if n >= minimum:
            signaux.append({
                "signal_id": f"SIG-{aire}-S{semaine}-{syndrome}",
                "code_sbc": "SC1",
                "definition": sc1["definition_officielle"],
                "aire_id": aire, "semaine": semaine, "syndrome": syndrome, "cas": n,
                "statut": "a_trier",
                "validation_humaine_requise": politique.valeur("surveillance.validation_humaine_obligatoire"),
                "delais_officiels": SBC["delais_officiels"],
            })
    return signaux


def valider_signal(signal: dict, validateur: dict, decision: str = "confirme") -> dict:
    """Validation par le point focal (jeton de rôle) ; seule étape qui fait passer le signal au district."""
    assert validateur.get("role") == "point_focal", "seul le point focal valide un signal"
    return {**signal, "statut": "valide" if decision == "confirme" else "ecarte",
            "validateur_humain": validateur}


def publier_carte(agregats: list[dict], politique) -> list[dict]:
    """Carte publique : agrégats au-dessus du seuil seulement, jamais de localisation individuelle."""
    return [{k: a[k] for k in ("aire_id", "semaine", "syndrome", "cas_publie")}
            for a in agregats if a["publiable"]]
