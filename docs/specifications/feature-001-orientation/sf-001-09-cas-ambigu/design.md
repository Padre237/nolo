# SF-001-09 — Cas ambigu : relèvement prudent et renvoi vers un soignant — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-180, FR-181, FR-182 |
| ADR | — |
| État d'implémentation | Non implémenté |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-09-01 | FR-180, FR-181 | `app/js/screens/patient/verifier.js` | état « rien reconnu » | Liste fermée proposée |
| DES-001-09-02 | FR-182 | `app/js/ui/components.js` | `droits(t)` (à créer) | Lien vers l'intervention humaine |

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
- FR-180 partiellement : la liste est accessible depuis « Décrire » et « Vérifier » ; le seuil d'ambiguïté (FR-181) et le lien d'intervention humaine (FR-182) n'existent pas.
