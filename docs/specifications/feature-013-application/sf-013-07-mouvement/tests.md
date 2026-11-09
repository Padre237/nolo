# SF-013-07 — Mouvement et micro-interactions — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1332, FR-1333, FR-1334 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-07-01 — Aucune erreur de transition
- Type : Interface
- Exigences : FR-1332
- Critères d'acceptation : CA-013-07-01
- Étant donné : 39 états
- Quand : lecture de la console
- Alors : aucune erreur
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`)

### TEST-013-07-02 — Mouvement réduit
- Type : Accessibilité
- Exigences : FR-1333
- Critères d'acceptation : CA-013-07-02
- Étant donné : préférence réduite
- Quand : changement d'écran
- Alors : aucune transition
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-07-03 — Durée des annonces
- Type : Revue
- Exigences : FR-1334
- Critères d'acceptation : CA-013-07-03
- Étant donné : styles
- Quand : lecture
- Alors : ≤ 300 ms
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

