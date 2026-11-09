# SF-016-01 — Recherche dans la base depuis le navigateur (BM25 et glossaire) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2201, FR-2202, FR-2203, FR-2204, NFR-2201 |
| ADR | ADR-007 (BM25) |
| État d'implémentation | Non implémenté |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-016-01-01 | FR-2201, FR-2202, FR-2204 | `app/js/agents/conseiller/bm25.js` (à créer) | `indexer`, `chercher` | BM25 dans le navigateur |
| DES-016-01-02 | FR-2203 | `app/js/agents/conseiller/glossaire.js` (à créer), `app/data/glossaire.json` | `enrichir(question)` | Glossaire |

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
