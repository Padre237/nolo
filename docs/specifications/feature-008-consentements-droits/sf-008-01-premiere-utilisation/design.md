# SF-008-01 — Écran de première utilisation et consentement à l'orientation — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-106, FR-801, FR-802, FR-803, FR-804, FR-805, FR-806 |
| ADR | ADR-003 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
Logique pure `app/js/domain/consent.js` ; écran `app/js/screens/patient/bienvenue.js` (route `#/bienvenue`) ; garde de route dans `app/js/app.js` (`SANS_CONSENTEMENT`).

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-008-01-01 | FR-801, FR-802, FR-803, FR-804 | `app/js/domain/consent.js` | `VERSION_CONDITIONS`, `FINALITES`, `brouillonVide`, `erreur`, `enregistrer`, `sansPartage`, `valide`, `partage` | Règles du consentement |
| DES-008-01-02 | FR-802, FR-805, FR-806 | `app/js/screens/patient/bienvenue.js` | actions `modifier`, `valider`, `sans-partage` | Écran |
| DES-008-01-03 | FR-801 | `app/js/app.js` | garde : redirection vers `#/bienvenue` si `!valide(store.consentement)` hors `SANS_CONSENTEMENT` | Garde de route |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Initial | Premier lancement ou nouvelle version | `consentement.*` | Cocher, valider, sans partage, conditions |
| Refus | Validation refusée | message lié au bouton | Corriger |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| version_conditions | string | = VERSION_CONDITIONS | FR-804 |
| date | string ISO 8601 | date du choix | FR-804 |
| finalites | { orientation, surveillance, signalements: boolean } | trois booléens | FR-804 |
| majeur | boolean \| null | null si sans partage | FR-804 |
| accord_parental | boolean | true seulement pour un mineur avec accord | FR-804 |

## 5. Contrats d'interface
```js
erreur(brouillon) // → 'E-CONS-AUCUNE-CASE' | 'E-CONS-AGE' | 'E-CONS-PARENTAL' | null
enregistrer(brouillon, maintenant) // → { ok: true, enregistrement } | { ok: false, erreur }
sansPartage(maintenant) // → enregistrement à trois finalités false
valide(enregistrement) // → boolean
partage(enregistrement, finalite) // → boolean
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| E-CONS-AUCUNE-CASE | Aucune case | `consentement.erreurs.aucune` |

## 7. Journal et confidentialité
- Rien n'est envoyé ; l'enregistrement reste dans `localStorage` (`nolo:consentement`).

## 8. Accessibilité, langues et mouvement
- Cases de 44 px au moins, `:has(input:checked)` pour l'état ; textes FR et EN d'égale valeur.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
