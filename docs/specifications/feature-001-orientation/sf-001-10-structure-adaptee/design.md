# SF-001-10 — « Où aller » : structure adaptée aux besoins — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-10 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-185, FR-186, FR-187, FR-188, FR-189 |
| ADR | ADR-009 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
`besoins(pistes, profil)` (`app/js/domain/engine.js`) puis `recommander(besoins)` (`app/js/domain/facilities.js`) ; rendu `panneauDirection` (`app/js/screens/patient/ou-aller.js`).

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-10-01 | FR-185 | `app/js/domain/engine.js` | `besoins` | Besoin le plus élevé ; pédiatrie pour les moins de 15 ans |
| DES-001-10-02 | FR-186, FR-187 | `app/js/domain/facilities.js` | `recommander`, `PALIERS_KM`, `ouvert`, `distance`, `visibles` | Sélection sur l'appareil |
| DES-001-10-03 | FR-188, FR-189 | `app/js/screens/patient/ou-aller.js` | `panneauDirection` | Panneau de signalétique : raison, manque, autres structures |

## 3. États et interface
| État | Déclencheur | Affichage (clés i18n) | Actions possibles |
|---|---|---|---|
| Recommandation | Besoins couverts | `orientation.*` ; raison ; distance | Itinéraire, autres structures, fiche |
| Repli | Besoins partiellement couverts | `orientation.manque` | Idem |

## 4. Données
| Champ | Type | Contrainte | Source |
|---|---|---|---|
| — | — | Aucune donnée propre | — |

## 5. Contrats d'interface
```js
besoins(pistes, profil) // → { niveau, specialites: string[], services: string[], piste }
recommander(besoins, { quand }) // → { etablissement, km, couvre: boolean, manque: string[] } | null
```

## 6. Erreurs
| Code | Condition | Rendu |
|---|---|---|
| — | Aucune erreur propre | — |

## 7. Journal et confidentialité
- Aucun événement de journal propre ; rien n'est transmis.

## 8. Accessibilité, langues et mouvement
- Panneau lisible à 360 px ; km dans l'anneau sur grand écran, en texte sur mobile ; bouton d'appel désactivé avec explication.

## 9. Écarts entre cette spécification et le code
- Aucun écart connu.
