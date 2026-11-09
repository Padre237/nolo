# SF-002-01 — Contribution consentie à la surveillance — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-201, FR-220, FR-221, FR-222 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-01-01 — Quatre champs
- Type : Unitaire
- Exigences : FR-201, FR-220
- Critères d'acceptation : CA-002-01-01
- Étant donné : case cochée
- Quand : `preparerEnvoi`
- Alors : exactement les quatre champs
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-02-01 et TEST-002-01-01 : la contribution ne contient que quatre champs, des codes SYM-NNN » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-002-01-02 — Déduplication
- Type : Intégration
- Exigences : FR-221
- Critères d'acceptation : CA-002-01-02
- Étant donné : deux contributions identiques
- Quand : réception
- Alors : un seul compte
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-002-01-03 — Consentement exigé
- Type : Unitaire
- Exigences : FR-222
- Critères d'acceptation : CA-002-01-03
- Étant donné : consentement absent
- Quand : `decider(surveillance.contribuer)`
- Alors : BLOQUE `CONSENTEMENT_EXPRES_MANQUANT` (test à écrire dans `tests/unit/test_gouvernance.py`)
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

