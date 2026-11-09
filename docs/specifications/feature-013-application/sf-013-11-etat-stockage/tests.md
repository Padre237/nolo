# SF-013-11 — État de l'application et stockage local — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1348, FR-1349, FR-1350 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-11-01 — Stockage indisponible
- Type : Unitaire
- Exigences : FR-1348
- Critères d'acceptation : CA-013-11-01
- Étant donné : stockage qui lève
- Quand : lecture et écriture
- Alors : aucune erreur
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-013-11-02 — Clés autorisées
- Type : Confidentialité
- Exigences : FR-1349
- Critères d'acceptation : CA-013-11-02
- Étant donné : parcours complet
- Quand : liste des clés
- Alors : clés autorisées seulement
- Données : —
- Automatisation : `app/tests/qualite.test.mjs` › « TEST-013-11-02 : seules les clés autorisées sont écrites dans le stockage local » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`) — contrôle statique : toute écriture `local.write` du code vise une clé autorisée

### TEST-013-11-03 — Rendu au changement
- Type : Unitaire
- Exigences : FR-1350
- Critères d'acceptation : CA-013-11-03
- Étant donné : un abonné
- Quand : `set`
- Alors : appelé
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

