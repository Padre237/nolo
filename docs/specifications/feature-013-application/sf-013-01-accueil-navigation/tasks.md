# SF-013-01 — Accueil, navigation et bandeau d'urgence — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-306, FR-1301, FR-1302, FR-1303 |
| État d'implémentation | Implémenté — rétro-spécifié le 2026-11-09 à partir du code |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-013-01-01 — Accueil
- Exigences : FR-1301
- Conception : DES-013-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/accueil.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-01-01 réussis
- Tests : TEST-013-01-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-013-01-02 — En-tête, pied et barre
- Exigences : FR-1302, FR-1303, FR-306
- Conception : DES-013-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/components.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-013-01-02, TEST-013-01-03 réussis
- Tests : TEST-013-01-02, TEST-013-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

