# SF-013-10 — Inspection visuelle automatisée — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1344, FR-1345, FR-1346, FR-1347 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`. Playwright (Python) et Chrome `/usr/bin/google-chrome`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-10-01 — Inspection complète
- Type : Interface
- Exigences : FR-1344, FR-1345
- Critères d'acceptation : CA-013-10-01
- Étant donné : serveur local
- Quand : `python3 tools/inspecter.py`
- Alors : aucun défaut
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`)

### TEST-013-10-02 — Preuve datée
- Type : Revue
- Exigences : FR-1346
- Critères d'acceptation : CA-013-10-02
- Étant donné : `docs/quality/`
- Quand : lecture
- Alors : fichier présent
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (revue : `docs/quality/preuve-2026-11-09-inspection-visuelle.txt` présent, code 0)

### TEST-013-10-03 — Assertions de contenu
- Type : Interface
- Exigences : FR-1347
- Critères d'acceptation : CA-013-10-03
- Étant donné : serveur local
- Quand : `python3 tools/inspecter.py`
- Alors : une assertion par test concerné ; aucune manquante
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

