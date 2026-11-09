# SF-007-18 — Panneau « Comment Nolo a décidé » — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-18 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1911, FR-1912, FR-1913, FR-1914, FR-1915 |
| ADR | — |
| État d'implémentation | Non implémenté |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-007-18-01 | FR-1911, FR-1912, FR-1914 | `app/js/ui/decision.js` (à créer) | `panneauDecision(trace, t)` | Panneau |
| DES-007-18-02 | FR-1913, FR-1915 | `app/js/domain/base.js` (à créer, SF-011-08) | `fragment(id, lang)` | Extraits |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Replié | Écran de résultat | `decision.titre` | Déplier |
| Déplié | Toucher le titre | `decision.etape.*` | Replier ; ouvrir un fragment |

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
- `<details>`/`<summary>` natif ; ordre de lecture logique ; contraste AA.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
