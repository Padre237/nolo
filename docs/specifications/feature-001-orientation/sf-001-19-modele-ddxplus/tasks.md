# SF-001-19 — Modèle DDXPlus sur l'appareil, parité et évaluation — Tâches

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1561, FR-1562, FR-1563, FR-1564, FR-1565, FR-1566 |
| État d'implémentation | Non implémenté |

## 1. Ordre d'exécution
Dans l'ordre des identifiants.

Règle : une tâche « À faire » ne démarre que si ce dossier est `APPROVED` (ou `READY_FOR_DEV`) et que ses tests sont écrits avant le code.

## 2. Tâches

### TASK-001-19-01 — Télécharger DDXPlus et écrire la fiche
- Exigences : FR-1562
- Conception : DES-001-19-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `kb/datasets/ddxplus.md`
- Résultat attendu : Fiche complète
- Dépend de : —
- Condition de fin : TEST-001-19-02 réussis
- Tests : TEST-001-19-02
- Statut : À faire

### TASK-001-19-02 — Audit des éléments, correspondance, catégories
- Exigences : FR-1564, FR-1565, FR-1566
- Conception : DES-001-19-03
- Fichiers à lire : —
- Fichiers à créer ou modifier : `rules/ddxplus_*.yaml`
- Résultat attendu : Tables relues
- Dépend de : —
- Condition de fin : TEST-001-19-04, TEST-001-19-05 réussis
- Tests : TEST-001-19-04, TEST-001-19-05
- Statut : À faire

### TASK-001-19-03 — Entraîner, exporter, moteur JS, parité
- Exigences : FR-1561
- Conception : DES-001-19-01
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/ddxplus/`, `app/js/domain/modele.js`, `app/tests/modele.test.mjs`
- Résultat attendu : Parité 0 écart
- Dépend de : TASK-001-19-02
- Condition de fin : TEST-001-19-01 réussis
- Tests : TEST-001-19-01
- Statut : À faire

### TASK-001-19-04 — Évaluation et recalage des seuils
- Exigences : FR-1563
- Conception : DES-001-19-02
- Fichiers à lire : —
- Fichiers à créer ou modifier : `tools/ddxplus/evaluer.py`, `app/js/domain/engine.js` (`POLITIQUE`)
- Résultat attendu : Rapport daté
- Dépend de : TASK-001-19-03
- Condition de fin : TEST-001-19-03 réussis
- Tests : TEST-001-19-03
- Statut : À faire

