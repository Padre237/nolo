# SF-007-20 — « Rejouer sans gouvernance » dans Nolo — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-20 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1931, FR-1932, FR-1933 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; S4 joué dans Nolo (pistes envoyées au serveur), le scénario S4 Python reste à faire (SF-012-05) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-007-20-01 | FR-1931, FR-1932, FR-1933 | `app/js/agents/ab.js` (à créer), console | `rejouer({ gouvernance })` | A/B dans Nolo |

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
