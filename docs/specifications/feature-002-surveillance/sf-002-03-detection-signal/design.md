# SF-002-03 — Détection des regroupements (CUSUM) et définitions de cas — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-203, FR-230, FR-231, FR-232 |
| ADR | ADR-014 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-002-03-01 | FR-230, FR-231, FR-232 | `app/js/domain/surveillance.js` | `cusum`, `signaux`, `serieAire`, `serieRegion` | Détection |
| DES-002-03-02 | FR-203 | `kb/rules/sbc_definitions.yaml`, `src/server/domain/surveillance.py` | définitions SC1 à SC8 | Rattachement (référence Python) |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : définition SC1 du guide SBC affichée pour chaque signal (`definitionSc`)).
