# SF-013-04 — Deux langues d'égale valeur et typographie française — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1315, FR-1316, FR-1317, FR-1318 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-04-01 — Parité des catalogues
- Type : Unitaire
- Exigences : FR-1315
- Critères d'acceptation : CA-013-04-01
- Étant donné : catalogues
- Quand : comparaison
- Alors : égalité
- Données : —
- Automatisation : `app/tests/i18n.test.mjs` › « Mêmes clés en français et en anglais » (`cd app && node --test tests/*.test.mjs`) ; « Aucune valeur vide ; listes de même longueur »
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-013-04-02 — Langue initiale
- Type : Interface
- Exigences : FR-1316
- Critères d'acceptation : CA-013-04-02
- Étant donné : navigateur anglais
- Quand : démarrage puis bascule
- Alors : anglais ; choix gardé
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-013-04-03 — Typographie
- Type : Unitaire
- Exigences : FR-1317
- Critères d'acceptation : CA-013-04-03
- Étant donné : la chaîne
- Quand : `typoFr`
- Alors : espaces correctes
- Données : —
- Automatisation : `app/tests/i18n.test.mjs` › « Typographie française : espace fine avant ? et insécable dans « 18 ans » » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-013-04-04 — Traducteur
- Type : Unitaire
- Exigences : FR-1318
- Critères d'acceptation : CA-013-04-04
- Étant donné : `translator('fr')`
- Quand : clé absente, `t.list`, `t.km(2.5)`
- Alors : clé rendue ; tableau ; « 2,5 km »
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

