# SF-001-04 — Chargement et contrôle du paquet de règles de triage (moteur v1) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-113, FR-160, FR-161 |

## 1. Environnement et données
Node 22 (`node --test tests/js/*.test.mjs`) et Python 3 (`python3 tools/demo/construire_paquet.py`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-04-01 — Validateur exigé hors démo
- Type : Unitaire
- Exigences : FR-113
- Critères d'acceptation : CA-001-04-01
- Étant donné : un paquet sans validateur
- Quand : chargement en mode `complet` puis `demo_synthetique`
- Alors : refus puis acceptation avec mention
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-04-02 — Contenu du paquet
- Type : Intégration
- Exigences : FR-160
- Critères d'acceptation : CA-001-04-02
- Étant donné : les sources v2
- Quand : `python3 tools/demo/construire_paquet.py`
- Alors : paquet avec règles, référentiel, empreintes, mention
- Données : —
- Automatisation : `tests/js/triage_parite.test.mjs` (lit le paquet)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-001-04-03 — Paquet altéré refusé
- Type : Unitaire
- Exigences : FR-161
- Critères d'acceptation : CA-001-04-03
- Étant donné : une règle modifiée dans le paquet
- Quand : chargement
- Alors : refus avec erreur d'empreinte
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

