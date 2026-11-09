# SF-001-02 — Retrait des mentions interdites avant tout envoi — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-111, FR-155, FR-156 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-02-01 — Charge utile sans texte
- Type : Unitaire
- Exigences : FR-155, FR-111
- Critères d'acceptation : CA-001-02-01
- Étant donné : un cas avec un texte contenant « test génétique »
- Quand : `preparerEnvoi(cas, 'surveillance')`
- Alors : seuls des codes `SYM-NNN` ; aucun mot du texte ; aucune catégorie interdite
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-02-01 et TEST-002-01-01 : la contribution ne contient que quatre champs, des codes SYM-NNN » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-001-02-02 — Catalogues sans question interdite
- Type : Unitaire
- Exigences : FR-156
- Critères d'acceptation : CA-001-02-02
- Étant donné : les catalogues FR et EN
- Quand : on cherche « sexuel, génétique, génotype, drépanocytose (génotype), empreinte, sexual, genetic, biometric »
- Alors : aucune occurrence dans une question
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-02-02 : aucune question sur la vie sexuelle, la génétique ou la biométrie » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

