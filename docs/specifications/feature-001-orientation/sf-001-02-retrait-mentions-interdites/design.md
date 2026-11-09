# SF-001-02 — Retrait des mentions interdites avant tout envoi — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-111, FR-155, FR-156 |
| ADR | ADR-005 |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; rien n'est envoyé dans le prototype |

## 1. Vue d'ensemble
Aujourd'hui Nolo n'envoie rien : la règle est satisfaite par construction. La fonction de préparation d'envoi (`preparerEnvoi`) sera écrite avec l'envoi consenti (SF-008-01) et la contribution de surveillance (SF-002-01).

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-02-01 | FR-155, FR-111 | `app/js/domain/envoi.js` (à créer) | `preparerEnvoi(cas, finalite)` | Ne garder que les codes autorisés ; refuser le texte |
| DES-001-02-02 | FR-156 | `app/js/i18n/fr.js`, `app/js/i18n/en.js` | catalogues | Aucune question interdite |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| — | Sans objet (aucun écran) | — | — |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
```js
// app/js/domain/envoi.js (à créer)
export function preparerEnvoi(cas, finalite) // → { codes: string[], semaine: string, aire: string } ; lève E-ENVOI-TEXTE si un champ texte subsiste
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| E-ENVOI-TEXTE | Un champ texte libre est présent dans la charge utile | Envoi annulé ; rien n'est journalisé |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Sans objet.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu (écarts résolus le 2026-11-09 : `preparerEnvoi` (`app/js/domain/envoi.js`) : codes SYM-NNN seulement).
