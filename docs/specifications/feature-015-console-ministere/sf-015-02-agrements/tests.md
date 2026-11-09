# SF-015-02 — Vérification des agréments — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2106, FR-2107, FR-2108 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-015-02-01 — File complète
- Type : Interface
- Exigences : FR-2106
- Critères d'acceptation : CA-015-02-01
- Étant donné : compte en attente
- Quand : ouvrir Agréments
- Alors : compte et 3 dossiers
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-015-02-02 — Agréer, refuser
- Type : Interface
- Exigences : FR-2107
- Critères d'acceptation : CA-015-02-02
- Étant donné : compte en attente
- Quand : agréer ; refuser sans motif
- Alors : visible ; refus
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-015-02-03 — Motif visible
- Type : Interface
- Exigences : FR-2108
- Critères d'acceptation : CA-015-02-03
- Étant donné : refus motivé
- Quand : accueil de l'établissement
- Alors : motif et date
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

