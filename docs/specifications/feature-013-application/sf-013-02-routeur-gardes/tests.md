# SF-013-02 — Routes, gardes et interface des écrans — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1305, FR-1306, FR-1307, FR-1308 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-02-01 — Plus longue correspondance
- Type : Unitaire
- Exigences : FR-1305
- Critères d'acceptation : CA-013-02-01
- Étant donné : `#/pro/tableau/stock`
- Quand : `lireRoute`
- Alors : `pro/tableau`, `stock`
- Données : —
- Automatisation : `app/tests/qualite.test.mjs` › « TEST-013-02-01 et TEST-013-02-02 : routeur — route la plus longue ; garde du consentement » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-013-02-02 — Garde du consentement
- Type : Interface
- Exigences : FR-1306
- Critères d'acceptation : CA-013-02-02
- Étant donné : sans consentement
- Quand : ouvrir `#/decrire`
- Alors : `#/bienvenue`
- Données : —
- Automatisation : `app/tests/qualite.test.mjs` › « TEST-013-02-01 et TEST-013-02-02 : routeur — route la plus longue ; garde du consentement » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-013-02-03 — Un seul h1
- Type : Interface
- Exigences : FR-1307, FR-1308
- Critères d'acceptation : CA-013-02-03
- Étant donné : 39 états
- Quand : inspection
- Alors : un h1 chacun
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`)

