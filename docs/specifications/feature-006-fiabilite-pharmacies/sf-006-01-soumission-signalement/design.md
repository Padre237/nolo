# SF-006-01 — Soumission d'un signalement — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-601, FR-602, FR-603, FR-608, FR-620, FR-621 |
| ADR | — |
| État d'implémentation | Implémenté dans Nolo (2026-11-09, D-038) ; auto-signalement : contrôle côté serveur à faire |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-006-01-01 | FR-601, FR-620, FR-621 | `app/js/screens/patient/chercher.js` | action `signaler` | Saisie et limites |
| DES-006-01-02 | FR-602, FR-603, FR-608 | `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml` | `score_fiabilite` | Poids et pseudonymes |

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
- FR-620 : l'interdiction de se signaler soi-même n'a pas de sens sur l'appareil du citoyen ; elle relève du serveur (à faire).
