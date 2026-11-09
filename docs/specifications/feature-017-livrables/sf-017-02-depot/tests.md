# SF-017-02 — Dépôt GitHub public — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-02 |
| Version | 2.0.0 |
| Statut | IN_TESTING |
| Exigences couvertes | FR-2306, FR-2307, FR-2308, FR-2309 |

## 1. Environnement et données
Revue et commandes shell.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-017-02-01 — README exécutable
- Type : Intégration
- Exigences : FR-2306
- Critères d'acceptation : CA-017-02-01
- Étant donné : machine propre
- Quand : suivre le README
- Alors : tout se lance
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-017-02-02 — Licence et notices
- Type : Revue
- Exigences : FR-2307
- Critères d'acceptation : CA-017-02-02
- Étant donné : la racine
- Quand : liste
- Alors : présents
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (revue, `docs/quality/preuve-2026-11-09-controle-publication-manuel.txt`)

### TEST-017-02-03 — Rien d'interdit
- Type : Sécurité
- Exigences : FR-2308
- Critères d'acceptation : CA-017-02-03
- Étant donné : le dépôt
- Quand : recherches
- Alors : rien
- Données : —
- Automatisation : `python3 tools/controle_publication.py` (code 0 si conforme, 1 sinon) ; `tests/unit/test_controle_publication.py::test_le_vrai_depot_est_conforme`, `tests/unit/test_controle_publication.py::test_faux_pdf_sort_en_1`, `tests/unit/test_controle_publication.py::test_pdf_sans_extension_sort_en_1`, `tests/unit/test_controle_publication.py::test_secret_sort_en_1`, `tests/unit/test_controle_publication.py::test_fragment_reserve_dans_la_base_sort_en_1`, `tests/unit/test_controle_publication.py::test_fragment_reserve_exporte_ailleurs_sort_en_1`, `tests/unit/test_controle_publication.py::test_reference_a_un_fragment_reserve_sort_en_1`, `tests/unit/test_controle_publication.py::test_pages_du_texte_reserve_sort_en_1`, `tests/unit/test_controle_publication.py::test_fiche_en_double_sort_en_1`, `tests/unit/test_controle_publication.py::test_depot_git_controle_ce_qui_serait_publie`, `tests/unit/test_controle_publication.py::test_depot_conforme_sort_en_0`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-a.txt` : 14 tests rouges puis verts ; dépôt réel conforme, 0 PDF, 0 secret, 0 fragment, référence ni page de INT-OMS-AFRO-SBC-2014)

### TEST-017-02-04 — Exclusions
- Type : Revue
- Exigences : FR-2309
- Critères d'acceptation : CA-017-02-04
- Étant donné : `.gitignore`
- Quand : lecture
- Alors : motifs présents
- Données : —
- Automatisation : —
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (revue, `docs/quality/preuve-2026-11-09-controle-publication-manuel.txt`)

