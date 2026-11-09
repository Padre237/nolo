# SF-003-01 — Choix de la spécialité dans une liste fermée — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-301, FR-304, FR-320, FR-321, FR-322 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-003-01-01 | FR-321, FR-301 | `app/js/domain/facilities.js`, `app/js/i18n/*.js` | `SPECIALITES`, `specialites.*` | Liste fermée bilingue |
| DES-003-01-02 | FR-320, FR-304 | `app/js/screens/patient/chercher.js` | onglet « Service » | Choix explicite |
| DES-003-01-03 | FR-322 | `kb/services/orientation_services.py` | `code_specialite` | Résolution des synonymes (référence Python) |

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
- FR-322 : Nolo n'a pas de saisie libre de spécialité ; la résolution des synonymes n'existe que dans la référence Python.
