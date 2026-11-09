"""Vague C (D-038) — lecture du journal (SF-007-11), déduplication des contributions (SF-002-01),
base publiée (SF-017-04), export des décisions attendues (SF-012-03)."""
import json
import re
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE))

from src.server.domain import surveillance  # noqa: E402
from src.server.gouvernance.politique import Politique  # noqa: E402

PY = sys.executable


# TEST-007-11-02 — commande de lecture du journal
def test_lire_journal_s3_affiche_25_evenements_dans_l_ordre():
    journal = RACINE / "tests" / "reports" / "2026-11-04" / "journal_regroupement.jsonl"
    r = subprocess.run([PY, str(RACINE / "tools" / "lire_journal.py"), str(journal)], capture_output=True, text=True)
    assert r.returncode == 0, r.stderr
    lignes = [l for l in r.stdout.splitlines() if re.match(r"^\s*\d+  \d{4}-", l)]
    assert len(lignes) == 25
    assert [int(l.split()[0]) for l in lignes] == list(range(1, 26))
    assert "25 événements" in r.stdout and "chaîne valide" in r.stdout
    assert "CMR-LOI-2024-017::0011 (Article 9)" in r.stdout      # fragment avec son article
    assert "jeton:PF-01" in r.stdout                               # validateur humain
    assert re.search(r"politique \d+\.\d+\.\d+", r.stdout)            # version de la politique appliquée


# TEST-002-01-02 — déduplication côté serveur
def test_deux_contributions_identiques_du_meme_appareil_comptent_une_fois():
    pol = Politique.charger(RACINE / "config" / "policy.yaml")
    c = {"aire_id": "AS-07", "semaine": 18, "syndrome": "fievre_eruption", "appareil": "hmac:abc"}
    autres = [{**c, "appareil": f"hmac:{i}"} for i in range(5)]
    agregats = surveillance.agreger([c, dict(c), *autres], pol)
    assert agregats[0]["cas"] == 6
    sans_appareil = [{k: v for k, v in c.items() if k != "appareil"}] * 2
    assert surveillance.agreger(sans_appareil, pol)[0]["cas"] == 2   # anonymes : aucune fusion possible


# TEST-017-04-01, TEST-017-04-02 — base publiée et README
def test_base_publiee_complete_et_readme():
    kb = RACINE / "kb"
    for element in ("kb_chunks.jsonl", "sources.json", "mapping", "eval", "traductions", "README.md"):
        assert (kb / element).exists(), element
    readme = (kb / "README.md").read_text(encoding="utf-8")
    assert "Version publique" in readme and "2 034 fragments" in readme
    assert "CrashingGuru/ITUAIReadiness" in readme and "kb_chunks.jsonl" in readme
    assert "novembre 2026" in readme


# TEST-012-03-02 — export des décisions attendues
def test_exporter_attendus_produit_le_fichier(tmp_path):
    sortie = tmp_path / "attendus.json"
    r = subprocess.run([PY, str(RACINE / "tools" / "scenarios" / "executer.py"), "--exporter-attendus", str(sortie)],
                       capture_output=True, text=True, cwd=RACINE)
    assert r.returncode == 0, r.stderr
    d = json.loads(sortie.read_text(encoding="utf-8"))
    origines = {c[0] for c in d["cas"]}
    assert {"orientation_urgente", "medicament_sensible", "regroupement", "grille"} <= origines
    assert d["decisions"] and d["politique"]


# TEST-007-15-02, TEST-009-01-01, TEST-007-16-01 — mandats, rôles, analyse d'impact
def _cites_existent(texte: str) -> list[str]:
    connus = {json.loads(l)["chunk_id"] for l in open(RACINE / "kb" / "kb_chunks.jsonl", encoding="utf-8")}
    return [c for c in re.findall(r"(?:CMR|INT)-[A-Z0-9-]+::\d{4}", texte) if c not in connus]


def test_un_mandat_par_agent_institutionnel():
    d = RACINE / "docs" / "architecture" / "agents"
    for agent in ("district", "apdp", "verificateur"):
        texte = (d / f"{agent}.md").read_text(encoding="utf-8")
        for rubrique in ("Rôle", "Informations reçues", "Décisions possibles", "Textes"):
            assert f"| {rubrique} |" in texte, (agent, rubrique)
        assert _cites_existent(texte) == [], agent


def test_matrice_des_huit_roles_sourcee():
    texte = (RACINE / "docs" / "product" / "roles.md").read_text(encoding="utf-8")
    entete = next(l for l in texte.splitlines() if l.startswith("| Fonction |"))
    assert len([c for c in entete.strip("|").split("|") if c.strip()]) == 9   # Fonction + 8 rôles
    assert "## Sources" in texte and _cites_existent(texte) == []


def test_aipd_couvre_les_cinq_finalites_et_le_poc():
    texte = (RACINE / "docs" / "compliance" / "aipd.md").read_text(encoding="utf-8")
    for titre in ("Orientation", "Surveillance", "Signalements", "Tendances", "Comptes des établissements", "Module expérimental"):
        assert re.search(rf"^### 2\.\d {titre}", texte, re.M), titre
    for bloc in re.split(r"^### ", texte, flags=re.M)[1:]:
        assert "| Risques |" in bloc and "| Mesures |" in bloc, bloc[:40]
    assert _cites_existent(texte) == []
