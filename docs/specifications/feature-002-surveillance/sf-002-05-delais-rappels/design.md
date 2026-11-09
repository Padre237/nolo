# SF-002-05 — Délais SBC et rappels — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-002 Surveillance syndromique |
| Sous-fonctionnalité | SF-002-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-205, FR-243 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; heure d'alerte fictive |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-002-05-01 | FR-205 | `tools/scenarios/executer.py`, `src/server/domain/surveillance.py` | rappels du scénario S3 | Référence |
| DES-002-05-02 | FR-243 | `app/js/screens/ministere/console.js` | vue `signaux` (à compléter) | Échéances |

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
- Aucun écart connu (écarts résolus le 2026-11-09 : temps écoulé et échéance du prochain délai (`echeance`, délais lus dans la politique)).
