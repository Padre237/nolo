# SF-015-04 — Politique versionnée et empreinte — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-015 Console du ministère |
| Sous-fonctionnalité | SF-015-04 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2119, FR-2120 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-015-04-01 — Affichage et empreinte
- Exigences : FR-2119
- Conception : DES-015-04-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/screens/ministere/console.js`
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-015-04-01 réussis
- Tests : TEST-015-04-01
- Statut : Fait (code existant, rétro-spécifié le 2026-11-09)

### TASK-015-04-02 — Source unique : `policy.yaml` converti
- Exigences : FR-2120
- Conception : DES-015-04-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/politique_json.py`, `app/js/domain/politique.js`, console
- Résultat attendu : Une seule version
- Dépend de : SF-007-17
- Condition de fin : TEST-015-04-02 réussis
- Tests : TEST-015-04-02
- Statut : Fait (2026-11-09) — console : politique complète, version et empreinte canonique vérifiée ; `S.POLITIQUE` retiré

