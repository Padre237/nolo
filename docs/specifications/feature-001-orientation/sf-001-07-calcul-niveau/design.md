# SF-001-07 — Calcul du niveau d'urgence (moteur v1) — affiché seulement s'il vaut « urgence » — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-07 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-101, FR-104, FR-110, FR-165, FR-166, FR-167, FR-168 |
| ADR | ADR-005 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-07-01 | FR-165, FR-167 | `src/client/ondevice/moteur_triage.mjs` | `evaluer` | Moteur monotone, parité Python |
| DES-001-07-02 | FR-110 | `src/server/agents/orchestrateur.py`, `src/server/gouvernance/journal.py` | journalisation par empreinte | Entrée conforme à F-007 |
| DES-001-07-03 | FR-166, FR-168 | `app/js/domain/engine.js` | `analyser` (branche danger) | Brancher le moteur v1 ; n'afficher que l'urgence |

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
- FR-168 : Nolo ne détecte l'urgence que par sa propre liste (`SIGNES` avec `danger: true`) et les questions de sécurité ; le moteur v1 n'y est pas encore branché.
