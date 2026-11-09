"""CA-DEMO-02, CA-DEMO-04, CA-DEMO-05, CA-DEMO-06 — Exécution de bout en bout des scénarios de démonstration.
Chaque test lance réellement l'exécuteur (ou le CLI de l'appareil) et vérifie le rapport produit."""
import json
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
RAPPORTS = RACINE / "tests" / "reports" / "2026-11-04"
DCI = "tenofovir_lamivudine_dolutegravir"


def executer(*args) -> tuple[int, str]:
    r = subprocess.run([sys.executable, str(RACINE / "tools" / "scenarios" / "executer.py"), *args],
                       capture_output=True, text=True, cwd=RACINE)
    return r.returncode, r.stdout + r.stderr


def rapport(nom: str) -> dict:
    return json.loads((RAPPORTS / nom).read_text(encoding="utf-8"))


def test_cli_triage_sur_appareil_json():  # CA-DEMO-02
    r = subprocess.run(["node", str(RACINE / "src/client/ondevice/cli/triage.mjs"),
                        "--tranche", "51_70_ans", "--texte", "douleur poitrine soudaine", "--json"],
                       capture_output=True, text=True, check=True)
    d = json.loads(r.stdout)
    assert (d["niveau"], d["priorite"], d["regle"]) == ("urgence", "immediate", "IITT12-R-12")
    assert d["fragments"] == ["INT-OMS-IITT-FR::0000"] and d["execution"] == "sur_appareil"
    assert "111" not in d["numeros_urgence"] and "IITT" in d["mention_demo"]


def test_scenario_orientation_urgente():
    code, sortie = executer("--scenario", "orientation_urgente")
    assert code == 0, sortie
    r = rapport("rapport_orientation_urgente.json")
    assert all(e["conforme"] for e in r["etapes"]) and r["journal"]["chaine_valide"]
    assert r["violations"] == []


def test_scenario_medicament_sensible_gouvernance():  # CA-DEMO-04
    code, sortie = executer("--scenario", "medicament_sensible")
    assert code == 0, sortie
    r = rapport("rapport_medicament_sensible.json")
    assert all(e["conforme"] for e in r["etapes"]) and r["violations"] == []
    d1 = r["decisions"][0]
    assert d1["action"] == "ressources.rechercher_medicament" and d1["verdict"] == "BLOQUE"
    assert d1["repli"] == "appareil" and "CMR-LOI-2024-017::0048" in d1["fragments"]
    journal = (RACINE / r["journal"]["fichier"]).read_text(encoding="utf-8")
    assert DCI not in journal


def test_scenario_medicament_sensible_sans_gouvernance():  # CA-DEMO-04 (contre-démonstration FR-710)
    code, sortie = executer("--scenario", "medicament_sensible", "--sans-gouvernance")
    assert code == 0, sortie
    r = rapport("rapport_medicament_sensible_sans_gouvernance.json")
    types = {v["type"] for v in r["violations"]}
    assert "recherche_sensible_journalisee" in types and "categorie_interdite_traitee" in types
    assert r["journal"]["chaine_valide"]  # le journal reste actif (FR-710)
    assert not all(e["conforme"] for e in r["etapes"])


def test_scenario_regroupement_gouvernance():  # CA-DEMO-05
    code, sortie = executer("--scenario", "regroupement")
    assert code == 0, sortie
    r = rapport("rapport_regroupement.json")
    assert all(e["conforme"] for e in r["etapes"]) and r["violations"] == []
    verdicts = {d["action"]: d["verdict"] for d in r["decisions"]}
    assert verdicts["surveillance.transmettre_donnees_individuelles"] == "BLOQUE"
    assert verdicts["surveillance.publier_carte"] == "AUTORISE_AVEC_CONDITIONS"
    journal = [json.loads(l) for l in (RACINE / r["journal"]["fichier"]).read_text(encoding="utf-8").splitlines()]
    validations = [e for e in journal if e["action"] == "surveillance.valider_signal"]
    assert validations and validations[0]["validateur_humain"]["role"] == "point_focal"


def test_scenario_regroupement_sans_gouvernance():  # CA-DEMO-05 (contre-démonstration)
    code, sortie = executer("--scenario", "regroupement", "--sans-gouvernance")
    assert code == 0, sortie
    r = rapport("rapport_regroupement_sans_gouvernance.json")
    types = {v["type"] for v in r["violations"]}
    assert {"donnees_individuelles_transmises", "signal_sans_validation_humaine"} <= types


def test_variante_et_si_derogation_art48():  # CA-DEMO-06
    code, sortie = executer("--scenario", "medicament_sensible",
                            "--politique", str(RACINE / "config/variantes/et-si-derogation-art48.yaml"))
    assert code == 0, sortie
    r = rapport("rapport_medicament_sensible_variante.json")
    assert r["version_politique"].endswith("+variante") and r["differences"]
    diff = {d["action"]: d for d in r["differences"]}
    assert diff["ressources.rechercher_medicament"]["verdict_reference"] == "BLOQUE"
    assert diff["ressources.rechercher_medicament"]["verdict_variante"] == "AUTORISE_AVEC_CONDITIONS"
    # Et la politique sur disque n'a pas bougé :
    assert "derogation_par_consentement: false" in (RACINE / "config" / "policy.yaml").read_text(encoding="utf-8")
