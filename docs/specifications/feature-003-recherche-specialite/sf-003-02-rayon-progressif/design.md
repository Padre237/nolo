# SF-003-02 — Recherche par rayon progressif et tri public — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-003 Recherche d'un service ou d'une spécialité |
| Sous-fonctionnalité | SF-003-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-302, FR-303, FR-307, FR-323, FR-324 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-003-02-01 | FR-302, FR-303 | `app/js/domain/facilities.js` | `chercherSpecialite`, `PALIERS_KM`, `tri`, `ouvert`, `prochaineOuverture` | Recherche sur l'appareil |
| DES-003-02-02 | FR-323, FR-324 | `app/js/ui/components.js`, `app/js/screens/patient/chercher.js` | `ligneStructure`, `etatOuverture` | Ligne de résultat |
| DES-003-02-03 | FR-307 | `kb/services/orientation_services.py` | `_round_position`, `_log` | Journal de référence |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : élargissement jusqu'à 3 résultats (`RESULTATS_MINIMUM`, `parPaliers`)).
