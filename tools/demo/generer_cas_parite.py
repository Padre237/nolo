"""Génère le jeu de parité Python ↔ JavaScript (CA-DEMO-01).

Calcule avec l'évaluateur et l'extracteur de RÉFÉRENCE (tools/donnees/verifier_regles_triage_v2.py)
les résultats attendus : 19 scénarios nommés, 42 phrases, listes fermées par tranche,
fermetures d'exemples, et 400 tirages aléatoires (graine 7). Le moteur du produit (.mjs)
doit donner EXACTEMENT les mêmes résultats.
Sortie : tests/js/fixtures/cas_parite.json
Usage : python3 tools/demo/generer_cas_parite.py
"""
import contextlib, io, json, random, sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
REF = RACINE / "tools" / "donnees" / "verifier_regles_triage_v2.py"

G = {"__name__": "reference", "__file__": str(REF)}
with contextlib.redirect_stdout(io.StringIO()):
    try:
        exec(compile(REF.read_text(encoding="utf-8"), str(REF), "exec"), G)
    except SystemExit as e:
        if e.code not in (0, None):
            sys.exit("le vérificateur de référence a échoué : jeu de parité non généré")

evaluer, extraire, fermer = G["evaluer"], G["extraire"], G["fermer"]
liste_fermee, REFER, D = G["liste_fermee"], G["REF"], G["D"]

cas = {"scenarios": [], "phrases": [], "listes": [], "fermetures": [], "tirages": []}

for s in G["S"]:
    nom, jetons, tranche, duree = s[0], s[1], s[2], s[3]
    niveau, prio, regle = evaluer(jetons, tranche, duree)
    cas["scenarios"].append({"nom": nom, "jetons": jetons, "tranche": tranche, "duree": duree,
                             "niveau": niveau, "priorite": prio, "regle": regle})

for p in json.load(open(RACINE / "data" / "referentiels" / "phrases_extraction_reference.json", encoding="utf-8"))["phrases"]:
    j, nc = extraire(p["texte"])
    cas["phrases"].append({"id": p["id"], "texte": p["texte"], "jetons": j, "non_code": nc})

for t in D["tranches_age"]:
    lf = sorted(liste_fermee(t))
    cas["listes"].append({"tranche": t, "nombre": len(lf), "jetons": lf})

for j in ["diarrhee_avec_sang", "chute_deux_fois_hauteur", "etat_conscience_altere", "saignements_abondants"]:
    cas["fermetures"].append({"entree": [j], "fermeture": sorted(fermer([j]))})

random.seed(7)
util = [t for t, r in REFER.items() if r["affiche"] == "oui" and r["usage"] != "aucun"
        and not r["sensibilite"].startswith("exclu")]
for _ in range(400):
    tranche = random.choice(D["tranches_age"])
    jetons = sorted(random.sample(util, random.randint(0, 5)))
    duree = random.choice([0, 3, 14, 20])
    niveau, prio, regle = evaluer(jetons, tranche, duree)
    cas["tirages"].append({"jetons": jetons, "tranche": tranche, "duree": duree,
                           "niveau": niveau, "priorite": prio, "regle": regle})

out = RACINE / "tests" / "js" / "fixtures" / "cas_parite.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(cas, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{out.relative_to(RACINE)} : {len(cas['scenarios'])} scénarios, {len(cas['phrases'])} phrases, "
      f"{len(cas['listes'])} listes, {len(cas['tirages'])} tirages")
