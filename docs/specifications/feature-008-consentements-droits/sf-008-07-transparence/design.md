# SF-008-07 — Transparence : système automatisé et raison de la réponse — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-109, FR-861, FR-862 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-008-07-01 | FR-861 | `app/js/i18n/*.js`, écrans | `commun.automatise` | Mention |
| DES-008-07-02 | FR-109, FR-862 | écrans de résultat | phrases `*.raison` | Raison par issue |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : une phrase de raison par issue (`raisons.*`, `raisonIssue`)).
