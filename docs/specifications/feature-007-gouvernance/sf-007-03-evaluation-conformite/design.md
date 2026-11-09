# SF-007-03 — Évaluation de conformité (quatre verdicts cités) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-702, FR-703, FR-730, FR-731, FR-732 |
| ADR | — |
| État d'implémentation | Implémenté (2026-11-09, D-038) ; constitution 2.0.0 (D-033) toujours à ratifier |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-007-03-01 | FR-702, FR-703, FR-730, FR-731 | `src/server/agents/conformite.py` | `AgentConformite.decider`, `TABLE`, `CATEGORIES_ART48` | Décision |
| DES-007-03-02 | FR-732 | `src/server/agents/conformite.py`, `config/policy.yaml` | nouvelles entrées `diagnostic.*`, `orientation.*` | Actions du POC |

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
