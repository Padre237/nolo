# SF-010-13 — Politique de données des professionnels — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1057 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-010-13-01 — Page liée
- Type : Interface
- Exigences : FR-1057
- Critères d'acceptation : CA-010-13-01
- Étant donné : l'inscription
- Quand : suivre le lien
- Alors : page bilingue complète
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-010-13-01 : conditions des établissements liées depuis l’inscription, bilingues » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

