# SF-016-01 — Recherche dans la base depuis le navigateur (BM25 et glossaire) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 |
| ADR | ADR-007 (BM25) |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-016-01-01 | FR-2201, FR-2202, FR-2204 | `app/js/agents/conseiller/bm25.js` (à créer) | `indexer`, `chercher` | BM25 dans le navigateur |
| DES-016-01-02 | FR-2203 | `app/js/agents/conseiller/glossaire.js` (à créer), `app/data/glossaire.json` | `enrichir(question)` | Glossaire |
| DES-016-01-03 | FR-2203, CA-016-02-01 | `kb/traductions/glossaire_requetes.yaml` 1.2.0, `app/js/agents/conseiller/glossaire.js` | champ `courant_fr` | Expressions françaises courantes (« à l'étranger », « une machine », « mon fils ») reliées aux mêmes termes juridiques que l'anglais, ajoutées sans traduire la question (décidé le 2026-11-09 pour CA-016-02-01 : l'art. 32, texte OCR abîmé, ne remontait pas sur « partir à l'étranger »). Réserve : ces trois entrées recoupent Q23, Q26 et Q30 de l'évaluation (voir `docs/quality/eval-conseiller-2026-11-09.txt`) |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| — | Sans objet (aucun écran) | — | — |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
Aucun contrat propre.

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| — | Aucune erreur propre | — |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Sans objet.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
