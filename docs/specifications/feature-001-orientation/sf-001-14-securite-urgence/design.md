# SF-001-14 — Questions de sécurité et alerte d'urgence — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-14 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1511, FR-1512, FR-1513, FR-1514, FR-1515 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-14-01 | FR-1511, FR-1513 | `app/js/domain/engine.js` | `questionsDanger`, `profil`, `analyser` (branche danger) | Questions et décision |
| DES-001-14-02 | FR-1512 | `app/js/screens/patient/verifier.js` | `reponsesInitiales`, action `repondre` | Questions oui/non, bouton inactif motivé |
| DES-001-14-03 | FR-1514, FR-1515 | `app/js/screens/patient/urgence.js`, `app/css/screens.css` | `.alerte-urgence`, `.appel-geant` | Écran d'urgence |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Questions | Signes reconnus | `verifier.questions.*` | Répondre |
| Urgence | Danger | `urgence.*`, `securite.*` | Appeler 119 / 112 ; voir les urgences proches |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
```js
questionsDanger(profil) // → [{ id: 'Q-BOIRE'|'Q-VOMIT'|'Q-CONV'|'Q-ENDORMI'|'Q-TIRAGE'|'Q-REPOS'|'Q-POITRINE'|'Q-BLEU'|'Q-CONFUS', signe }]
profil(qui, age) // → { qui, ans, enfant: ans < 15, enfantPetit: ans < 5 }
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| — | Aucune erreur propre | — |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Questions en groupes radio ; écran d'urgence : `role="alert"` sur le titre, appels de 64 px de haut.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
