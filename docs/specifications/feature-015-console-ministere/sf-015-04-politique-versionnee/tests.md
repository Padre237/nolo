# SF-015-04 — Politique versionnée et empreinte — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2119, FR-2120 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-015-04-01 — Empreinte vérifiable
- Type : Interface
- Exigences : FR-2119
- Critères d'acceptation : CA-015-04-01
- Étant donné : la vue
- Quand : recalcul
- Alors : même empreinte
- Données : —
- Automatisation : `app/tests/console.test.mjs` › « TEST-015-04-01 : l’empreinte affichée est celle du JSON affiché » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

### TEST-015-04-02 — Même version que le serveur
- Type : Unitaire
- Exigences : FR-2120
- Critères d'acceptation : CA-015-04-02
- Étant donné : `policy.yaml` 1.3.0
- Quand : ouverture de la vue
- Alors : 1.3.0
- Données : —
- Automatisation : `app/tests/console.test.mjs` › « TEST-015-04-02 : même version que config/policy.yaml ; aucune seconde politique codée en dur » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-b.txt`)

