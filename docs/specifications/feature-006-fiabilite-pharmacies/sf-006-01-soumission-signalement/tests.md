# SF-006-01 — Soumission d'un signalement — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-601, FR-602, FR-603, FR-608, FR-620, FR-621 |

## 1. Environnement et données
Node 22 (`cd app && node --test tests/*.test.mjs`) ; logique de référence Python `kb/services/orientation_services.py` (`python3 kb/services/test_services.py`) ; Chrome + Playwright. Établissements fictifs (`app/js/domain/facilities.js`).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-006-01-01 — Quatre choix
- Type : Interface
- Exigences : FR-601
- Critères d'acceptation : CA-006-01-01
- Étant donné : un résultat
- Quand : rendu
- Alors : quatre choix
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-006-01-01 : quatre choix de signalement sous un résultat de médicament » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-006-01-02 — Limites D-030
- Type : Interface
- Exigences : FR-620
- Critères d'acceptation : CA-006-01-02
- Étant donné : 5 signalements
- Quand : 6e signalement
- Alors : refus annoncé
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-006-01-03 — Poids
- Type : Unitaire
- Exigences : FR-602, FR-603
- Critères d'acceptation : CA-006-01-03
- Étant donné : déclaration de 8 h, compte de 3 jours
- Quand : `score_fiabilite`
- Alors : poids 0,125
- Données : —
- Automatisation : `app/tests/fiabilite.test.mjs` › « TEST-006-01-03 : poids d’un négatif — déclaration de 8 h (0,25) et compte de 3 jours (0,5) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-006-01-04 — Enregistrement minimal
- Type : Confidentialité
- Exigences : FR-608, FR-621
- Critères d'acceptation : CA-006-01-04
- Étant donné : un signalement
- Quand : lecture du stockage
- Alors : champs minimaux
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

