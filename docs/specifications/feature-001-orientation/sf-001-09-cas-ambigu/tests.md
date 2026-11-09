# SF-001-09 — Cas ambigu : relèvement prudent et renvoi vers un soignant — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-09 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-180, FR-181, FR-182 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-09-01 — Rien reconnu
- Type : Unitaire
- Exigences : FR-180
- Critères d'acceptation : CA-001-09-01
- Étant donné : « blabla »
- Quand : `reformuler` puis rendu de « Vérifier »
- Alors : aucun signe ; liste proposée
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-09-02 — Seuil d'ambiguïté
- Type : Unitaire
- Exigences : FR-181
- Critères d'acceptation : CA-001-09-02
- Étant donné : un texte à 80 % non reconnu
- Quand : analyse
- Alors : mention affichée
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-09-03 — Intervention humaine accessible
- Type : Interface
- Exigences : FR-182
- Critères d'acceptation : CA-001-09-03
- Étant donné : chaque écran de résultat
- Quand : rendu
- Alors : lien présent et focusable
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

