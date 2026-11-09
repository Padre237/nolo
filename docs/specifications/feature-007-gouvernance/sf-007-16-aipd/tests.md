# SF-007-16 — Analyse d'impact versionnée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-16 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-708, FR-787 |

## 1. Environnement et données
Revue documentaire.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-16-01 — AIPD complète
- Type : Revue
- Exigences : FR-708, FR-787
- Critères d'acceptation : CA-007-16-01
- Étant donné : le document
- Quand : lecture
- Alors : finalités, risques, mesures
- Données : —
- Automatisation : `tests/unit/test_vague_c.py::test_aipd_couvre_les_cinq_finalites_et_le_poc` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c2.txt`)

