# SF-002-11 — Signalement d'un événement communautaire — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1601, FR-1602 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-11-01 — Champs du formulaire
- Type : Interface
- Exigences : FR-1601
- Critères d'acceptation : CA-002-11-01
- Étant donné : le formulaire
- Quand : lecture
- Alors : trois champs
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-002-11-02 — Arrivée au point focal
- Type : Intégration
- Exigences : FR-1602
- Critères d'acceptation : CA-002-11-02
- Étant donné : un signalement
- Quand : ouverture de la console
- Alors : `a_trier`
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

