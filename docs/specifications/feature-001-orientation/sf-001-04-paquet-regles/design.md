# SF-001-04 — Chargement et contrôle du paquet de règles de triage (moteur v1) — Conception

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-113, FR-160, FR-161 |
| ADR | ADR-005, ADR-008 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Vue d'ensemble
—

## 2. Composants
| ID | Exigences | Fichier | Élément | Responsabilité |
|---|---|---|---|---|
| DES-001-04-01 | FR-160 | `tools/demo/construire_paquet.py` | script | Construit le paquet versionné |
| DES-001-04-02 | FR-113, FR-161 | `src/client/ondevice/moteur_triage.mjs` | chargement du paquet | Contrôle d'empreinte et de validateur |

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
- Nolo n'utilise pas encore ce paquet : ses signes de danger sont une liste propre (SF-001-14). Brancher le moteur v1 sur Nolo est la tâche TASK-001-07-03.
