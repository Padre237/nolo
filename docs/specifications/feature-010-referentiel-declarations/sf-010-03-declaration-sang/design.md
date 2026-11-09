# SF-010-03 — Déclaration des niveaux de sang — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-501, FR-1013, FR-1014 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-03-01 | FR-1013, FR-501 | `app/js/domain/pro.js` | `ongletsStock`, questions H8, H8a, B1 | Onglet selon le type |
| DES-010-03-02 | FR-1014 | `app/js/domain/facilities.js` | `chercherSang` (fraîcheur) | Expiration |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : déclarations de sang expirées après 6 h (`FRAICHEUR_SANG_H`, `sangH`)).
