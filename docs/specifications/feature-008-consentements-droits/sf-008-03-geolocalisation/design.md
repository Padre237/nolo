# SF-008-03 — Position du citoyen : géolocalisation consentie ou quartier saisi — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-821, FR-822, FR-823 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-008-03-01 | FR-821, FR-822 | `app/js/domain/position.js` (à créer) | `lirePosition()`, `arrondir` | Position consentie et arrondie |
| DES-008-03-02 | FR-823 | `app/js/domain/facilities.js` | `ORIGINE` | Repli de démonstration |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : position demandée au moment de la recherche, arrondie, en mémoire seulement ; quartier en cas de refus ; point de référence dans un cadre).
