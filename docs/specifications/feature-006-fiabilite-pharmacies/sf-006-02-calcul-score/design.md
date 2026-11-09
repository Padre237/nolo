# SF-006-02 — Calcul et affichage du score — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-02 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-604 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; signalements fictifs de démonstration et ceux de l'appareil |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-006-02-01 | FR-604 | `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml` | `score_fiabilite` | Règle de référence |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : score porté dans Nolo (`app/js/domain/fiabilite.js`), parité avec la référence (`tools/exporter_fiabilite.py`)).
