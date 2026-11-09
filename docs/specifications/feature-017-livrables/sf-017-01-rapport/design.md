# SF-017-01 — Rapport technique (5 pages, anglais) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-01 |
| Version | 2.0.0 |
| Statut | IN_PROGRESS |
| Exigences couvertes | FR-2301, FR-2302, FR-2303, FR-2304 |
| ADR | — |
| État d'implémentation | Partiellement implémenté — rapport, PDF et contrôles du 2026-11-09 (D-037) ; écarts au §9 de design.md (Q-017-01-01, Q-017-01-02) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-017-01-01 | FR-2301, FR-2302, FR-2303, FR-2304 | `docs/submission/rapport-technique-en.md` et `.pdf` | rapport | Rapport |

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
- FR-2302 : le rapport ne cite pas « 2 055 fragments, 22 documents » (aucune preuve datée) ; il cite la version publique prouvée (2 034 fragments, 21 documents) et la 22e source tenue en fiche de métadonnées (Q-017-01-01, TASK-017-01-02).
- DES-017-01-01 : le PDF n'est pas dans `docs/submission/` mais hors du dépôt, `../livrables/rapport-technique-en.pdf`, produit par `tools/rapport_pdf.py` (aucun PDF dans l'arborescence, FR-2308) (Q-017-01-02, TASK-017-01-02).
