# SF-010-07 — Vérification de l'agrément avant toute visibilité — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1029, FR-1030, FR-1031, FR-1032 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-07-01 | FR-1029 | `app/js/domain/facilities.js` | `visibles` | Filtre de visibilité |
| DES-010-07-02 | FR-1030, FR-1031 | `app/js/domain/pro.js`, `app/js/screens/pro/compte.js` | `AGREMENT_SIMULE`, `verifier`, `etatVerification` | Vérification |
| DES-010-07-03 | FR-1032 | `app/js/screens/pro/tableau.js` | actions `verif-ok`, `verif-refus`, chemin de vérification | États affichés |

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
