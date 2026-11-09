# SF-017-01 — Rapport technique (5 pages, anglais) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-01 |
| Version | 2.0.0 |
| Statut | IN_PROGRESS |
| Exigences couvertes | FR-2301, FR-2302, FR-2303, FR-2304 |

## 1. Environnement et données
Revue documentaire ; PDF produit par Chrome (Playwright).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-017-01-01 — Pages et sections
- Type : Revue
- Exigences : FR-2301
- Critères d'acceptation : CA-017-01-01
- Étant donné : le PDF
- Quand : comptage
- Alors : ≤ 5 pages
- Données : —
- Automatisation : `python3 tools/verifier_rapport.py` (ligne TEST-017-01-01 : sections, pages mesurées par `pdfinfo` sur le PDF de `python3 tools/rapport_pdf.py`, mots) ; `tests/unit/test_verifier_rapport.py::test_section_manquante_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_sections_dans_le_desordre_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_pdf_de_5_pages_accepte`, `tests/unit/test_verifier_rapport.py::test_pdf_de_6_pages_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_pdf_absent_sort_en_1`, `tests/unit/test_rapport_pdf.py::test_pdf_produit_par_chrome`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-a.txt` : rouge puis vert ; six sections dans l'ordre ; PDF de 5 pages mesuré par `pdfinfo`)

### TEST-017-01-02 — Nom et chiffres
- Type : Revue
- Exigences : FR-2302
- Critères d'acceptation : CA-017-01-02
- Étant donné : le texte
- Quand : recherche
- Alors : aucune occurrence obsolète
- Données : —
- Automatisation : `python3 tools/verifier_rapport.py` (ligne TEST-017-01-02 : termes périmés, nom, lien du dépôt, chiffres prouvés de la base) ; `tests/unit/test_verifier_rapport.py::test_nom_perime_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_chiffre_perime_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_lien_du_depot_absent_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_chiffre_de_la_base_absent_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_rapport_conforme_sort_en_0`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-a.txt` : rouge puis vert ; 0 terme périmé ; nom Nolo, lien du dépôt et chiffres prouvés présents ; chaque chiffre du rapport comparé à la preuve)

### TEST-017-01-03 — États concordants
- Type : Revue
- Exigences : FR-2303, FR-2304
- Critères d'acceptation : CA-017-01-03
- Étant donné : le rapport et la matrice
- Quand : comparaison
- Alors : concordance
- Données : —
- Automatisation : `python3 tools/verifier_rapport.py` (ligne TEST-017-01-03 : état de chaque sous-fonctionnalité du tableau comparé à l'« État d'implémentation » de son dossier, source de la matrice ; lacunes L5, L15, L16) ; `tests/unit/test_verifier_rapport.py::test_etat_discordant_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_sous_fonctionnalite_inconnue_sort_en_1`, `tests/unit/test_verifier_rapport.py::test_lacunes_du_poc_absentes_sort_en_1`
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-a.txt` : rouge puis vert ; 36 états concordants avec leur dossier, 37 sous-fonctionnalités citées existantes ; L5, L15, L16 citées)

