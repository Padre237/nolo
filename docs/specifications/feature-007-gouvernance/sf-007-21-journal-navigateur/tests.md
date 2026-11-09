# SF-007-21 — Journal d'audit chaîné dans Nolo et sa vérification — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-21 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1941, FR-1942, FR-1943, FR-1944 |

## 1. Environnement et données
Nolo (navigateur) : `cd app && node --test tests/*.test.mjs` ; la référence Python sert d'oracle : `python3 tools/scenarios/executer.py` produit les journaux attendus (`tests/reports/`). WebCrypto SHA-256 dans le navigateur ; `node:crypto` dans les tests.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-007-21-01 — Entrées chaînées
- Type : Unitaire
- Exigences : FR-1941
- Critères d'acceptation : CA-007-21-01
- Étant donné : un parcours
- Quand : lecture du journal
- Alors : conforme
- Données : —
- Automatisation : `app/tests/journal.test.mjs` › « TEST-007-21-01 : une entrée chaînée par décision, sans texte libre ni champ interdit » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-007-21-02 — Altération détectée
- Type : Interface
- Exigences : FR-1942, FR-1943
- Critères d'acceptation : CA-007-21-02
- Étant donné : une entrée altérée
- Quand : vérifier
- Alors : entrée désignée
- Données : —
- Automatisation : `app/tests/journal.test.mjs` › « TEST-007-21-02 : une entrée altérée est désignée ; après restauration, chaîne valide » (`cd app && node --test tests/*.test.mjs`) ; `tools/inspecter.py` (états 40 à 46)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-007-21-03 — Même empreinte qu'en Python
- Type : Unitaire
- Exigences : FR-1944
- Critères d'acceptation : CA-007-21-03
- Étant donné : une entrée canonique
- Quand : calcul JS et Python
- Alors : égalité
- Données : —
- Automatisation : `app/tests/journal.test.mjs` › « TEST-007-21-03 : mêmes empreintes que src/server/gouvernance/journal.py » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

