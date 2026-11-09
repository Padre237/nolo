# SF-001-09 — Cas ambigu : relèvement prudent et renvoi vers un soignant — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-180, FR-181, FR-182 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-09-01 — État « rien reconnu » et seuil d'ambiguïté
- Exigences : FR-180, FR-181
- Conception : DES-001-09-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/patient/verifier.js`, `app/js/domain/engine.js` (`nonReconnus`)
- Résultat attendu : Liste proposée
- Dépend de : D-013 approuvée
- Condition de fin : TEST-001-09-01, TEST-001-09-02 réussis
- Tests : TEST-001-09-01, TEST-001-09-02
- Statut : À faire

### TASK-001-09-02 — Lien d'intervention humaine sur les écrans de résultat
- Exigences : FR-182
- Conception : DES-001-09-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/ui/components.js`, écrans pistes, hors-champ, urgence, confidentiel
- Résultat attendu : Lien présent
- Dépend de : —
- Condition de fin : TEST-001-09-03 réussis
- Tests : TEST-001-09-03
- Statut : Fait (2026-11-09) — `lienSoignant` sur les cinq écrans de résultat (appel du 119 sur l'écran Urgence)

