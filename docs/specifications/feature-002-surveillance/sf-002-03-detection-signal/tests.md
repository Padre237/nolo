# SF-002-03 — Détection des regroupements (CUSUM) et définitions de cas — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-203, FR-230, FR-231, FR-232 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-03-01 — Deux regroupements, et seulement eux
- Type : Unitaire
- Exigences : FR-230, FR-231
- Critères d'acceptation : CA-002-03-01
- Étant donné : données fictives
- Quand : `signaux()`
- Alors : deux signaux attendus
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « CUSUM : les deux regroupements injectés sont détectés, et seulement eux » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-03-02 — Définition SC
- Type : Interface
- Exigences : FR-203
- Critères d'acceptation : CA-002-03-02
- Étant donné : signal de diarrhée
- Quand : ouverture
- Alors : définition affichée
- Données : —
- Automatisation : `app/tests/ecrans.test.mjs` › « TEST-002-03-02 : la définition SC du signal est affichée dans la console » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-002-03-03 — Champs du signal
- Type : Unitaire
- Exigences : FR-232
- Critères d'acceptation : CA-002-03-03
- Étant donné : un signal
- Quand : lecture
- Alors : sept champs
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

