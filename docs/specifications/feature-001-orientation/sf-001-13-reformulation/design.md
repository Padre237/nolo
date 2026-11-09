# SF-001-13 — « Décrire ce que je ressens » : reformulation bilingue, négation et durée — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-13 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1501, FR-1502, FR-1503, FR-1504, FR-1505, FR-1506, FR-1507, FR-1508, NFR-1501 |
| ADR | — |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
Moteur `app/js/domain/engine.js` : `norm`, `motif`, `SIGNES`, `NEGATION`, `duree`, `reformuler`, `libelle`, `SUGGESTIONS`. Écran `app/js/screens/patient/verifier.js`.

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-13-01 | FR-1501, FR-1502, FR-1503, FR-1505, FR-1506 | `app/js/domain/engine.js` | `reformuler`, `motif`, `NEGATION`, `SIGNES` | Reconnaissance par motifs entiers, négation, implications |
| DES-001-13-02 | FR-1504 | `app/js/domain/engine.js` | `duree`, `NOMBRES` | Durée en jours |
| DES-001-13-03 | FR-1507, FR-1508 | `app/js/screens/patient/verifier.js` | actions `retirer`, `ouvrir-ajout`, `ajouter`, `voir` | Puces, absents, ajout depuis la liste |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Signes reconnus | Au moins un signe | `verifier.*` ; puces | Retirer, ajouter, continuer |
| Aucun signe | Rien reconnu | `verifier.*` ; liste proposée | Ajouter depuis la liste (SF-001-09) |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
```js
reformuler(texte: string) // → { presents: string[], absents: string[], jours: number | null }
duree(texte: string) // → number | null
libelle(code: string, lang: 'fr' | 'en') // → string
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| — | Aucune erreur propre | — |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Puces retirables de 44 × 44 px (`flex-shrink: 0`) ; annonces vocales à l'ajout et au retrait (`annonce`).

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
