# SF-009-02 — Authentification des établissements (un compte par établissement) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-009 Accès, rôles et comptes |
| Sous-fonctionnalité | SF-009-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-905, FR-906, FR-907, FR-908, FR-909 |

## 1. Environnement et données
Nolo : Node 22 (`cd app && node --test tests/*.test.mjs`) et Chrome + Playwright (`tools/inspecter.py`) ; comptes stockés sur l'appareil (`nolo:pro-comptes`). Service de référence D-029 : Python 3, Starlette, Pillow, openpyxl (`python3 -m pytest -q tests/python`), démonstration `python3 tools/lancer_demo.py --neuf --avec-tendances`. Listes d'agrément simulées ; établissements fictifs.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-009-02-01 — Jamais en clair
- Type : Sécurité
- Exigences : FR-905
- Critères d'acceptation : CA-009-02-01
- Étant donné : une inscription
- Quand : lecture du stockage et du fichier serveur
- Alors : aucun mot de passe en clair
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_mot_de_passe_jamais_en_clair` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-009-02-02 — Mots de passe refusés
- Type : Unitaire
- Exigences : FR-906
- Critères d'acceptation : CA-009-02-02
- Étant donné : trois mots de passe faibles
- Quand : validation
- Alors : refus motivés
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_mot_de_passe_refuse` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-009-02-03 — Blocage
- Type : Unitaire
- Exigences : FR-907
- Critères d'acceptation : CA-009-02-03
- Étant donné : 5 échecs
- Quand : 6e tentative
- Alors : blocage 15 min
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_ca_ets_11_blocage_apres_5_echecs` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

### TEST-009-02-04 — Déconnexion
- Type : Interface
- Exigences : FR-908
- Critères d'acceptation : CA-009-02-04
- Étant donné : une session
- Quand : Se déconnecter
- Alors : session vide
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-009-02-05 — Désactivation
- Type : Unitaire
- Exigences : FR-909
- Critères d'acceptation : CA-009-02-05
- Étant donné : compte vérifié
- Quand : désactiver puis réactiver
- Alors : invisible puis visible
- Données : —
- Automatisation : `tests/python/test_etablissements.py::test_compte_desactive_invisible_puis_reactive` (`python3 -m pytest -q`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-suites.txt`)

