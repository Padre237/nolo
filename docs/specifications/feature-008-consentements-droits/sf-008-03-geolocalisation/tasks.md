# SF-008-03 — Position du citoyen : géolocalisation consentie ou quartier saisi — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-008 Consentements et droits |
| Sous-fonctionnalité | SF-008-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-821, FR-822, FR-823 |
| État d'implémentation | Implémenté (2026-11-09, D-038) |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-008-03-01 — Lecture consentie et arrondie de la position
- Exigences : FR-821, FR-822
- Conception : DES-008-03-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/position.js`, écrans de recherche et « Où aller »
- Résultat attendu : Conforme
- Dépend de : —
- Condition de fin : TEST-008-03-01, TEST-008-03-02 réussis
- Tests : TEST-008-03-01, TEST-008-03-02
- Statut : Fait (2026-11-09) — `app/js/domain/position.js`, `app/js/ui/position.js` ; recherche et « Où aller »

### TASK-008-03-02 — Repli et mention dans un cadre
- Exigences : FR-823
- Conception : DES-008-03-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `app/js/domain/position.js`
- Résultat attendu : Mention affichée
- Dépend de : —
- Condition de fin : TEST-008-03-03 réussis
- Tests : TEST-008-03-03
- Statut : Fait (2026-11-09) — repli sur le point de référence (cadre, hors district) et mention

