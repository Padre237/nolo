# SF-004-04 — Médicaments sensibles : recherche sur l'appareil, sans signalement ni comptage — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-004 Recherche d'un médicament |
| Sous-fonctionnalité | SF-004-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-405, FR-408, FR-426 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-004-04-01 — Branche sensible de l'onglet Médicament
- Exigences : FR-405, FR-408, FR-426
- Conception : DES-004-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-004-04-01, TEST-004-04-02 réussis
- Tests : TEST-004-04-01, TEST-004-04-02
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-004-04-02 — Scénario S2 (référence)
- Exigences : FR-408
- Conception : DES-004-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `src/server/domain/ressources.py`
- Résultat attendu : Recherche dans la tuile, requête bloquée côté serveur
- Dépend de : —
- Condition de fin : TEST-004-04-03 réussis
- Tests : TEST-004-04-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

