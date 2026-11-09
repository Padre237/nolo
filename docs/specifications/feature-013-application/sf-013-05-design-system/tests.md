# SF-013-05 — Design system « Premium Medical Intelligence » — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1320, FR-1321, FR-1322, FR-1323, FR-1324 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-05-01 — Couleurs en dur
- Type : Revue
- Exigences : FR-1320
- Critères d'acceptation : CA-013-05-01
- Étant donné : feuilles de style
- Quand : recherche
- Alors : exceptions listées seulement
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-05-02 — Polices locales
- Type : Interface
- Exigences : FR-1321
- Critères d'acceptation : CA-013-05-02
- Étant donné : chargement
- Quand : journal réseau
- Alors : aucune police externe
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-013-05-03 — Couleurs réservées
- Type : Revue
- Exigences : FR-1322
- Critères d'acceptation : CA-013-05-03
- Étant donné : feuilles de style
- Quand : liste des usages
- Alors : conformes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-05-04 — Documentation
- Type : Revue
- Exigences : FR-1323, FR-1324
- Critères d'acceptation : CA-013-05-04
- Étant donné : `DESIGN.md`
- Quand : comparaison
- Alors : complète
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

