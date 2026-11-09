# SF-007-11 — Consultation du journal et vérification de la chaîne (serveur) — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-007 Gouvernance, conformité, audit et agents |
| Sous-fonctionnalité | SF-007-11 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-768, FR-769 |
| État d'implémentation | Partiellement implémenté — rétro-spécifié le 2026-11-09 ; écarts au §9 de design.md |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-007-11-01 — Vérification
- Exigences : FR-768
- Conception : DES-007-11-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/gouvernance/journal.py`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-007-11-01 réussis
- Tests : TEST-007-11-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-007-11-02 — Commande de lecture
- Exigences : FR-769
- Conception : DES-007-11-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/lire_journal.py`
- Résultat attendu : Lecture lisible
- Dépend de : —
- Condition de fin : TEST-007-11-02 réussis
- Tests : TEST-007-11-02
- Statut : À faire

