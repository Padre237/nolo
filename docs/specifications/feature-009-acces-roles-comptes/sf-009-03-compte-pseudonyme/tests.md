# SF-009-03 — Compte pseudonyme du citoyen — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-912, FR-913 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-009-03-01 — Pseudonyme seul
- Type : Unitaire
- Exigences : FR-912
- Critères d'acceptation : CA-009-03-01
- Étant donné : création
- Quand : lecture de la charge
- Alors : pseudonyme seul
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-009-03-02 — Mode complet seulement
- Type : Unitaire
- Exigences : FR-913
- Critères d'acceptation : CA-009-03-02
- Étant donné : mode démo
- Quand : recherche de la fonction
- Alors : absente
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

