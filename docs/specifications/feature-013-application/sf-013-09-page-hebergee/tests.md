# SF-013-09 — Page hébergée dans un cadre (artefact) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1340, FR-1341, FR-1342 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-09-01 — Impression et modèle
- Type : Interface
- Exigences : FR-1340, FR-1341
- Critères d'acceptation : CA-013-09-01
- Étant donné : page dans un cadre
- Quand : fiche et stock
- Alors : conforme
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-09-02 — Position refusée
- Type : Interface
- Exigences : FR-1342
- Critères d'acceptation : CA-013-09-02
- Étant donné : géolocalisation refusée
- Quand : inscription
- Alors : commune suffit
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

