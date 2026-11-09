"""SF-001-03, SF-001-05, SF-001-06 — Régression des données de triage (TEST-001-03-01 côté serveur, -08, -12, -14 ;
TEST-001-05-07 ; TEST-001-06-06). Toute modification des données qui casse la reproductibilité, la stabilité des
codes, l'accessibilité des règles, les textes sources ou le jeu de phrases fait échouer la suite."""
import csv
import hashlib
import json
import shutil
import subprocess
import sys
from collections import Counter
from pathlib import Path

import yaml

RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(RACINE))

from src.server.domain.referentiel_symptomes import charger_referentiel, valider_referentiel  # noqa: E402

REF = RACINE / "data" / "referentiels"
REGLES = yaml.safe_load((RACINE / "rules" / "triage_signes_alerte.v2.yaml").read_text(encoding="utf-8"))
CHUNKS = {json.loads(l)["chunk_id"]: json.loads(l) for l in open(RACINE / "kb" / "kb_chunks.jsonl", encoding="utf-8")}
plat = lambda t: " ".join(t.split())  # noqa: E731


def test_referentiel_valide_cote_serveur_et_sources_existantes():          # TEST-001-03-01, TEST-001-03-08
    entrees, meta = charger_referentiel(REF)
    assert valider_referentiel(entrees, meta, set(CHUNKS)) == []
    assert len(entrees) == 110 and len({e["code"] for e in entrees}) == 110 and len({e["jeton"] for e in entrees}) == 110
    assert all(not e["snomed_gps_id"].strip() for e in entrees)
    assert (REF / "symptomes.csv").stat().st_size <= 100 * 1024
    double = [dict(e) for e in entrees]
    double[1]["jeton"] = double[0]["jeton"]
    double[2]["sources"] = "CMR-INVENTE::0001"
    erreurs = valider_referentiel(double, meta, set(CHUNKS))
    assert any("jeton dupliqué" in e for e in erreurs) and any("CMR-INVENTE::0001" in e for e in erreurs)
    assert any("empreinte" in e for e in erreurs)


def test_generation_reproductible_et_codes_stables(tmp_path):                 # TEST-001-03-12
    (tmp_path / "tools" / "donnees").mkdir(parents=True)
    shutil.copy(RACINE / "tools" / "donnees" / "generer_referentiel_symptomes.py", tmp_path / "tools" / "donnees")
    shutil.copytree(REF, tmp_path / "data" / "referentiels")
    (tmp_path / "kb").mkdir()
    shutil.copy(RACINE / "kb" / "kb_chunks.jsonl", tmp_path / "kb")
    avant = (REF / "symptomes.csv").read_bytes()
    for _ in range(2):
        r = subprocess.run([sys.executable, str(tmp_path / "tools" / "donnees" / "generer_referentiel_symptomes.py")],
                           capture_output=True, text=True, cwd=tmp_path)
        assert r.returncode == 0, r.stdout + r.stderr
        assert (tmp_path / "data" / "referentiels" / "symptomes.csv").read_bytes() == avant
    v = subprocess.run([sys.executable, str(RACINE / "tools" / "donnees" / "verifier_regles_triage_v2.py")], capture_output=True, text=True)
    assert v.returncode == 0, v.stdout[-2000:]


def test_normalisation_identique_en_javascript_et_en_python():               # TEST-001-03-14
    sys.path.insert(0, str(RACINE / "tools" / "donnees"))
    from generer_referentiel_symptomes import expressions, norm_expr  # noqa: E402
    entrees, _ = charger_referentiel(REF)
    phrases = [p["texte"] for p in json.loads((REF / "phrases_extraction_reference.json").read_text(encoding="utf-8"))["phrases"]]
    brutes = [x for e in entrees for x in [e["libelle_fr"], e["libelle_en"], *e["synonymes_fr"].split("|"), *e["synonymes_en"].split("|")] if x] + phrases
    assert len({x for e in entrees for x in expressions(e)}) >= 500
    script = ("import { normaliser } from './src/client/ondevice/extracteur_lexical.mjs';"
              "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.stringify(JSON.parse(d).map(normaliser))));")
    r = subprocess.run(["node", "--input-type=module", "-e", script], input=json.dumps(brutes), capture_output=True, text=True, cwd=RACINE)
    assert r.returncode == 0, r.stderr
    assert json.loads(r.stdout) == [norm_expr(x) for x in brutes]


def _textes_retrouves(regles):
    manquants = []
    for r in regles:
        texte = plat(" ".join(plat(CHUNKS[f]["text"]) for f in r["fragments"]))
        for t in r["texte_source"]:
            if plat(t) not in texte:
                manquants.append((r["id"], t))
    return manquants


def _jetons_hors_usage(regles):
    entrees, _ = charger_referentiel(REF)
    utilisables = {e["jeton"] for e in entrees if not e["sensibilite"].startswith("exclu") and e["observable_non_professionnel"] == "oui"}
    comp = REGLES["composites"]

    def atomes(c, acc):
        for a in [*c.get("tous", []), *c.get("au_moins_un", []), *(c.get("au_moins_n") or {}).get("parmi", []),
                  *[x for g in c.get("tous_groupes", []) for x in g]]:
            atomes(comp[a], acc) if a in comp else acc.add(a)
        return acc
    return sorted({j for r in regles for j in atomes(r["condition"], set())} - utilisables)


def test_regles_pcime_sourcees_et_jetons_utilisables():                       # TEST-001-05-07
    pcime = [r for r in REGLES["regles"] if r["outil"] == "pcime"]
    assert len(pcime) == 8
    for r in pcime:
        for champ in ("id", "outil", "couleur_source", "tranches", "condition", "texte_source", "fragments"):
            assert r.get(champ), (r.get("id"), champ)
    assert _textes_retrouves(pcime) == []
    assert _jetons_hors_usage(pcime) == []


def test_criteres_iitt_comptes_sources_et_exclusions():                       # TEST-001-06-06
    iitt = [r for r in REGLES["regles"] if r["outil"].startswith("iitt")]
    c = Counter((r["outil"], r["couleur_source"]) for r in iitt)
    assert (c[("iitt_12_ans_plus", "rouge")], c[("iitt_12_ans_plus", "jaune")],
            c[("iitt_moins_12_ans", "rouge")], c[("iitt_moins_12_ans", "jaune")]) == (13, 22, 16, 16)
    composites = [{"id": k, "texte_source": v["texte_source"], "fragments": v["fragments"]} for k, v in REGLES["composites"].items()]
    assert len(composites) == 5
    assert _textes_retrouves(iitt + composites) == []
    assert _jetons_hors_usage(iitt) == []
