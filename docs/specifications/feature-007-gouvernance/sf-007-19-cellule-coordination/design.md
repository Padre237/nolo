# SF-007-19 — Cellule de coordination multi-agents (console du ministère) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1921, FR-1922, FR-1923, FR-1924, FR-1925 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-007-19-01 | FR-1921, FR-1922, FR-1924 | `app/js/agents/cellule.js` (à créer) | `derouler(signal)`, mandats `MANDATS` | Coordination |
| DES-007-19-02 | FR-1923 | `app/js/agents/conformite.js` | `surveillance.transmettre_donnees_individuelles` | Blocage |
| DES-007-19-03 | FR-1925 | `app/js/screens/ministere/console.js` | vue `coordination` | Fil |

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
