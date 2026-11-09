# D-029 et D-032 — Fil « officine » : inscription, fiche, vérification, stock, indicateurs et tendances

## Lancer la démonstration

```bash
python3 tools/lancer_demo.py --neuf --avec-tendances   # API + pages sur http://127.0.0.1:8000, compteurs fictifs
```

- Console des établissements : http://127.0.0.1:8000/etablissement.html
- Côté citoyen : http://127.0.0.1:8000/recherche-medicament.html

Le NIU `M041618186649L` figure dans la liste d'agrément simulée : l'officine est vérifiée dès l'envoi de sa fiche. Avec un autre NIU bien formé, elle reste « en attente » jusqu'à la décision du vérificateur :

```bash
python3 tools/verifier_etablissement.py --niu M555555555555Z --valider
python3 tools/verifier_etablissement.py --niu M555555555555Z --refuser "Autorisation d'ouverture introuvable"
```

L'envoi d'e-mail est simulé : le code à 6 chiffres s'affiche à l'écran en mode démonstration.

## Tests

```bash
python3 -m pytest -q tests/python                              # 64 tests (service et tendances)
node --test tests/js/*.test.mjs                                # catalogues, parité des conditions
python3 tools/parcours_etablissement.py --chrome /usr/bin/google-chrome   # parcours navigateur, 43 vérifications
```

## Contenu

| Chemin | Rôle |
|---|---|
| `src/server/etablissements/` | Service (SQLite), sécurité, fiches, stock, journal chaîné, API Starlette |
| `src/client/pwa/` | Console bilingue, page citoyenne de démonstration, conditions des établissements |
| `donnees/` | Référentiel DCI de démonstration, liste d'agrément simulée, régions et districts fictifs |
| `docs/specifications/D-029-…md` | Spécification, décisions, état de l'implémentation (§14) |
| `docs/quality/` | Preuves datées et captures |

Données fictives uniquement. Les listes d'exclusion (art. 75) et de classes sensibles (art. 48) du référentiel sont des propositions à valider.

## Zones et carte (D-032)

Les polygones des arrondissements viennent d'OpenStreetMap (© OpenStreetMap contributors, ODbL 1.0 : voir `donnees/zones/LICENCE-ODbL.md`).
Après avoir complété `donnees/zones/correspondance-arrondissements.csv` (colonne `code_ins_valide`), relancer :

```bash
python3 -I tools/preparer_zones.py
```
