# SF-001-19 — Modèle DDXPlus sur l'appareil, parité et évaluation — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-19 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1561, FR-1562, FR-1563, FR-1564, FR-1565, FR-1566 |

## 1. Environnement et données
Python 3 avec numpy et scikit-learn (installés) ; jeu DDXPlus à télécharger par l'équipe (le réseau de cette session ne le permet pas).

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-19-01 — Parité et hors ligne
- Type : Propriété
- Exigences : FR-1561
- Critères d'acceptation : CA-001-19-01
- Étant donné : modèle exporté
- Quand : comparaison JS/Python
- Alors : 0 écart ; 0 requête
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-19-02 — Fiche du jeu de données
- Type : Revue
- Exigences : FR-1562
- Critères d'acceptation : CA-001-19-02
- Étant donné : le fichier
- Quand : contrôle des rubriques
- Alors : toutes présentes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-19-03 — Évaluation publiée
- Type : Intégration
- Exigences : FR-1563
- Critères d'acceptation : CA-001-19-03
- Étant donné : le jeu de test
- Quand : `python3 tools/ddxplus/evaluer.py`
- Alors : rapport daté avec 4 mesures
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-19-04 — Couverture de la correspondance
- Type : Unitaire
- Exigences : FR-1564
- Critères d'acceptation : CA-001-19-04
- Étant donné : la table
- Quand : contrôle
- Alors : 100 %
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-001-19-05 — Retraits et catégories
- Type : Revue
- Exigences : FR-1565, FR-1566
- Critères d'acceptation : CA-001-19-05
- Étant donné : les tables
- Quand : contrôle des catalogues
- Alors : aucune question retirée ; catégories complètes
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

