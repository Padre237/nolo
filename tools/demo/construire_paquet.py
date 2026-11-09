"""Construit le paquet de triage versionné servi à l'appareil (SF-001-04 partiel, incrément démo D-025).

Entrées : data/referentiels/symptomes.csv (+ métadonnées), rules/triage_signes_alerte.v2.yaml, config/policy.yaml.
Sortie déterministe : src/client/ondevice/paquet_triage.json (aucun horodatage, empreintes vérifiées).
Usage : python3 tools/demo/construire_paquet.py
"""
import csv, hashlib, json, sys
from pathlib import Path
import yaml

RACINE = Path(__file__).resolve().parents[2]


def sha256(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def construire() -> Path:
    meta = yaml.safe_load(open(RACINE / "data" / "referentiels" / "symptomes.meta.yaml", encoding="utf-8"))
    csv_p = RACINE / "data" / "referentiels" / "symptomes.csv"
    regles_p = RACINE / "rules" / "triage_signes_alerte.v2.yaml"
    pol = yaml.safe_load(open(RACINE / "config" / "policy.yaml", encoding="utf-8"))

    # Empreintes déclarées = empreintes réelles (FR-124), sinon arrêt.
    e_csv, e_regles = sha256(csv_p), sha256(regles_p)
    if meta["empreinte_sha256"] != e_csv:
        sys.exit(f"EMPREINTE RÉFÉRENTIEL DIFFÉRENTE : {e_csv} ≠ {meta['empreinte_sha256']}")
    if meta["regles_associees"]["empreinte_sha256"] != e_regles:
        sys.exit(f"EMPREINTE RÈGLES DIFFÉRENTE : {e_regles} ≠ {meta['regles_associees']['empreinte_sha256']}")

    entrees = list(csv.DictReader(open(csv_p, encoding="utf-8")))
    regles = yaml.safe_load(open(regles_p, encoding="utf-8"))

    # FR-114 : un numéro au statut a_confirmer n'est jamais affiché seul -> il n'entre pas dans le paquet.
    numeros = [n for n in pol["numeros_urgence"] if n["statut"] != "a_confirmer"]

    paquet = {
        "schema": "paquet-triage/1",
        "version": f"{meta['version']}+regles-{regles['version']}",
        "statut": meta["statut"],
        "referentiel": {
            "version": meta["version"],
            "empreinte_sha256": e_csv,
            "colonnes": list(entrees[0].keys()),
            "entrees": entrees,
        },
        "regles": regles,
        "regles_empreinte_sha256": e_regles,
        # Proposition du README de F-001 appliquée au paquet (policy.yaml inchangé) :
        "mention_demo": "Règles issues de la PCIME (OMS) et de l'outil IITT (OMS, CICR, MSF), non validées cliniquement pour le Cameroun",
        "validateur_clinique": regles.get("validateur_clinique"),
        "usage_autorise_sans_validation": pol["triage"]["usage_autorise_sans_validation"],
        "numeros_urgence": numeros,
        "version_politique": pol["version"],
    }
    # FR-161 : empreinte de la forme canonique du référentiel et des règles, recalculée par l'appareil au chargement.
    contenu = {"referentiel": paquet["referentiel"], "regles": regles}
    paquet["empreinte_canonique"] = "sha256:" + hashlib.sha256(
        json.dumps(contenu, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    out = RACINE / "src" / "client" / "ondevice" / "paquet_triage.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    texte = json.dumps(paquet, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    out.write_text(texte, encoding="utf-8")
    print(f"{out.relative_to(RACINE)} : {len(entrees)} entrées, {len(regles['regles'])} règles, "
          f"{len(numeros)} numéros d'urgence, sha256 {hashlib.sha256(texte.encode()).hexdigest()[:12]}…")
    return out


if __name__ == "__main__":
    construire()
