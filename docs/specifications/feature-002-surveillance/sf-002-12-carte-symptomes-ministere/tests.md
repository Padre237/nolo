# SF-002-12 — Carte interactive des symptômes pour le ministère — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1606, FR-1607, FR-1608, FR-1609, FR-1610, FR-1611 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; console `#/ministere` (session de démonstration). Données fictives : 10 régions, district de démonstration de 12 aires (AS-01 à AS-12), 12 semaines, deux regroupements injectés (AS-07 diarrhée, semaines 10 à 12 ; Nord éruption, semaines 11 et 12). Référence Python : scénario S3 `regroupement` (J1 à J4).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-002-12-01 — Dix régions tracées
- Type : Unitaire
- Exigences : FR-1606
- Critères d'acceptation : CA-002-12-01
- Étant donné : `REGIONS_SVG`
- Quand : lecture
- Alors : 10 tracés
- Données : —
- Automatisation : `app/tests/surveillance.test.mjs` › « Carte : les 10 régions ont un tracé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-002-12-02 — Filtres
- Type : Interface
- Exigences : FR-1607
- Critères d'acceptation : CA-002-12-02
- Étant donné : la console
- Quand : changer de syndrome
- Alors : carte et panneau changent
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-002-12-03 — Clavier
- Type : Accessibilité
- Exigences : FR-1608
- Critères d'acceptation : CA-002-12-03
- Étant donné : focus sur une région
- Quand : Entrée
- Alors : région choisie
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-002-12-04 — Anneau et hachures
- Type : Interface
- Exigences : FR-1609, FR-1610
- Critères d'acceptation : CA-002-12-04
- Étant donné : syndrome diarrhée
- Quand : lecture
- Alors : anneau, AS-07 marquée, hachures
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-002-12-05 — Panneau
- Type : Interface
- Exigences : FR-1611
- Critères d'acceptation : CA-002-12-05
- Étant donné : région choisie
- Quand : lecture
- Alors : conforme
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

