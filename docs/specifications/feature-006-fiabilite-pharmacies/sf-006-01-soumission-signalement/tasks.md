# SF-006-01 — Soumission d'un signalement — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-006 Fiabilité des déclarations |
| Sous-fonctionnalité | SF-006-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-601, FR-602, FR-603, FR-608, FR-620, FR-621 |
| État d'implémentation | Implémenté dans Nolo (2026-11-09, D-038) ; auto-signalement : contrôle côté serveur à faire |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-006-01-01 — Signalement sur l'appareil et limites D-030
- Exigences : FR-620, FR-621
- Conception : DES-006-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`
- Résultat attendu : Limites appliquées
- Dépend de : —
- Condition de fin : TEST-006-01-02, TEST-006-01-04 réussis
- Tests : TEST-006-01-02, TEST-006-01-04
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-006-01-02 — Quatre choix de signalement
- Exigences : FR-601
- Conception : DES-006-01-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/chercher.js`, catalogues
- Résultat attendu : Quatre choix
- Dépend de : —
- Condition de fin : TEST-006-01-01 réussis
- Tests : TEST-006-01-01
- Statut : Fait (2026-11-09) — quatre choix (`recherche.choix.*`), messages d'ordonnance et de revue humaine

### TASK-006-01-03 — Poids et pseudonymes (référence)
- Exigences : FR-602, FR-603, FR-608
- Conception : DES-006-01-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/services/orientation_services.py` (référence Python) ; `kb/rules/fiabilite_pharmacies.yaml`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-006-01-03 réussis
- Tests : TEST-006-01-03
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

