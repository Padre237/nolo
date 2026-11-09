# SF-013-08 — Fonctionnement hors ligne (PWA) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-08 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1336, FR-1337, FR-1338 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-08-01 — Hors ligne
- Type : Interface
- Exigences : FR-1336
- Critères d'acceptation : CA-013-08-01
- Étant donné : application en cache
- Quand : réseau coupé, recharge
- Alors : écrans disponibles
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-08-02 — Manifeste
- Type : Revue
- Exigences : FR-1337
- Critères d'acceptation : CA-013-08-02
- Étant donné : le manifeste
- Quand : validation
- Alors : complet
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-08-03 — Repli silencieux
- Type : Interface
- Exigences : FR-1338
- Critères d'acceptation : CA-013-08-03
- Étant donné : SW bloqués
- Quand : chargement
- Alors : aucune erreur
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt) (service workers bloqués)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`)

