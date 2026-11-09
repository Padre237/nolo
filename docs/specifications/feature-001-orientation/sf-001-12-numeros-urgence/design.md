# SF-001-12 — Numéros d'urgence et barre de sécurité — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-12 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-114, FR-195, FR-196 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; valeurs 119 et 112 à vérifier (D-004) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-12-01 | FR-195 | `app/js/ui/components.js`, `app/css/components.css` | `barreSecurite`, `.barre-securite`, `.appli:has(.ecran-urgence)` | Barre fixe |
| DES-001-12-02 | FR-114, FR-196 | `app/js/domain/politique.js` (à créer, SF-007-17) | `numerosUrgence()` | Numéros lus depuis la politique |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : numéros lus dans `app/data/politique.json` (`numerosUrgence`), clés `securite.appeler119/112` remplacées par `securite.appeler`).
