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
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-015-04-02 — Même version que le serveur
- Type : Unitaire
- Exigences : FR-2120
- Critères d'acceptation : CA-015-04-02
- Étant donné : `policy.yaml` 1.3.0
- Quand : ouverture de la vue
- Alors : 1.3.0
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

