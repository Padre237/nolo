# SF-004-01 — Catalogue des DCI et normalisation de la saisie — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-407, FR-420, FR-421 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-004-01-01 | FR-420, FR-407 | `app/js/domain/facilities.js` | `DCI`, `PRODUITS_ART75`, `NOMS_COMMERCIAUX` | Catalogue |
| DES-004-01-02 | FR-421 | `app/js/screens/patient/chercher.js` | filtre `choix` | Saisie tolérante |

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
