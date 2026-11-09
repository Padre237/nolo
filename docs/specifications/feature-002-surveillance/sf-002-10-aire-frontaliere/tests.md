# SF-002-10 — Signal en aire frontalière — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-209 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-10-01 — Mention frontalière
- Type : Unitaire
- Exigences : FR-209
- Critères d'acceptation : CA-002-10-01
- Étant donné : aire frontalière
- Quand : ouverture du signal
- Alors : mention affichée
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

