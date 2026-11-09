# SF-010-09 — Tableau de bord de l'établissement et chemin de vérification — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-010 Espace établissement |
| Sous-fonctionnalité | SF-010-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1038, FR-1040, FR-1041, FR-1042 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-010-09-01 | FR-1038, FR-1040 | `app/js/screens/pro/tableau.js` | `VUES`, `etapeAtteinte` | Navigation et chemin |
| DES-010-09-02 | FR-1040 | `app/js/screens/pro/entree.js` | `cheminVerification` | Composant du chemin |
| DES-010-09-03 | FR-1041, FR-1042 | `app/js/screens/pro/tableau.js`, `app/js/screens/pro/compte.js` | vues `apercu`, `compte`, `journal` | Aperçu et compte |

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
