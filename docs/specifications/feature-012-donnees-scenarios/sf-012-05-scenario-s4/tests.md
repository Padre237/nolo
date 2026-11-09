# SF-012-05 — Scénario S4 : module POC gouverné et non gouverné — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-012 Données fictives et scénarios |
| Sous-fonctionnalité | SF-012-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1216, FR-1217 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-012-05-01 — S4 gouverné et non gouverné
- Type : Intégration
- Exigences : FR-1216, FR-1217
- Critères d'acceptation : CA-012-05-01
- Étant donné : S4
- Quand : deux exécutions
- Alors : 7 violations puis 0
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

