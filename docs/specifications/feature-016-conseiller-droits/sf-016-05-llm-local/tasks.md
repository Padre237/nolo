# SF-016-05 — LLM local optionnel : reformuler les extraits, jamais décider — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-016 Conseiller « Mes droits santé » |
| Sous-fonctionnalité | SF-016-05 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2218, FR-2219 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-016-05-01 — Adaptateur et garde de citation
- Exigences : FR-2218, FR-2219
- Conception : DES-016-05-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/agents/conseiller/llm.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-016-05-01, TEST-016-05-02 réussis
- Tests : TEST-016-05-01, TEST-016-05-02
- Statut : À faire

