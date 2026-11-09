# SF-004-02 — Recherche dans les stocks déclarés et classement — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-402, FR-403, FR-406, FR-422, FR-423, FR-424 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-004-02-01 | FR-402, FR-423, FR-406 | `app/js/domain/facilities.js` | `chercherMedicament`, `FRAICHEUR_H`, `tri` | Recherche |
| DES-004-02-02 | FR-422, FR-424 | `app/js/screens/patient/chercher.js` | onglet « Médicament » | Résultats |

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
- FR-402 : la fraîcheur de 12 h (affichage « à confirmer ») n'est pas distinguée à l'écran ; seule l'expiration à 48 h est appliquée.
