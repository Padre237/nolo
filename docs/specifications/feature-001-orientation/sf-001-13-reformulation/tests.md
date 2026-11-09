# SF-001-13 — « Décrire ce que je ressens » : reformulation bilingue, négation et durée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1501, FR-1502, FR-1503, FR-1504, FR-1505, FR-1506, FR-1507, FR-1508, NFR-1501 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-13-01 — Expression camerounaise et négation
- Type : Unitaire
- Exigences : FR-1501, FR-1503, FR-1505
- Critères d'acceptation : CA-001-13-01
- Étant donné : « le corps chauffe… pas de diarrhée »
- Quand : `reformuler`
- Alors : fièvre et toux présentes ; diarrhée absente
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « Reformulation : expression camerounaise « le corps chauffe » → fièvre ; négation reconnue » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-13-02 — Anglais et mots entiers
- Type : Unitaire
- Exigences : FR-1502
- Critères d'acceptation : CA-001-13-02
- Étant donné : « I have a sore throat… »
- Quand : `reformuler`
- Alors : SYM-006, SYM-007 ; pas SYM-008
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « Reformulation en anglais » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-13-03 — Tirage n'est pas douleur de poitrine
- Type : Unitaire
- Exigences : FR-1506
- Critères d'acceptation : CA-001-13-03
- Étant donné : « sa poitrine se creuse sous les côtes »
- Quand : `reformuler`
- Alors : SYM-094 ; pas SYM-012
- Données : —
- Automatisation : `app/tests/domaine.test.mjs` › « FR-DX-03 : signe de danger → urgence, aucune piste » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-13-04 — Durée en lettres
- Type : Unitaire
- Exigences : FR-1504
- Critères d'acceptation : CA-001-13-04
- Étant donné : « for two weeks »
- Quand : `duree`
- Alors : 14
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-13-05 — Libellés selon la langue
- Type : Interface
- Exigences : FR-1507, FR-1508
- Critères d'acceptation : CA-001-13-05
- Étant donné : des signes reconnus
- Quand : bascule FR → EN
- Alors : puces en anglais sans nouvelle analyse
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-13-06 — Temps de reformulation
- Type : Performance
- Exigences : NFR-1501
- Critères d'acceptation : —
- Étant donné : 600 caractères
- Quand : 100 appels à `reformuler`
- Alors : médiane ≤ 20 ms
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

