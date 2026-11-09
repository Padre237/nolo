# SF-002-06 — Instrument de décision du RSI (annexe 2) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-246, FR-247, FR-248 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-06-01 — Deux oui sur quatre
- Type : Unitaire
- Exigences : FR-246, FR-247
- Critères d'acceptation : CA-002-06-01
- Étant donné : réponses
- Quand : `decisionRsi`
- Alors : vrai à 2 oui, faux à 1
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « Annexe 2 du RSI : deux « oui » sur quatre déclenchent la notification » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-06-02 — Réponses gardées
- Type : Interface
- Exigences : FR-248
- Critères d'acceptation : CA-002-06-02
- Étant donné : réponses données
- Quand : recharger
- Alors : conservées
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

