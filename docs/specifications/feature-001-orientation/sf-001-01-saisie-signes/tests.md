# SF-001-01 — Saisie des signes et du contexte (pour qui, âge, description) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-001 Orientation à partir des signes |
| Sous-fonctionnalité | SF-001-01 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-105, FR-150, FR-151, FR-152, FR-153, FR-154 |

## 1. Environnement et données
Node 22 (`node --test`), sans dépendance ; données de démonstration embarquées (`app/js/domain/`). Inspection visuelle : Chrome + Playwright (`tools/inspecter.py`, 360, 390, 768 et 1440 px). Aucune donnée réelle.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-001-01-01 — Ordre des champs et rendu
- Type : Interface
- Exigences : FR-150
- Critères d'acceptation : CA-001-01-01
- Étant donné : l'application lancée
- Quand : on ouvre `#/decrire`
- Alors : pour qui, âge, description apparaissent dans cet ordre ; une seule balise h1
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-001-01-02 — Refus d'un âge hors bornes
- Type : Unitaire
- Exigences : FR-151
- Critères d'acceptation : CA-001-01-02
- Étant donné : un cas { qui: 'moi', age: 130 ans, texte: 'toux' }
- Quand : `erreurs(cas)`
- Alors : `{ age: 'ageMax' }`
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-01-02 : âge de 130 ans refusé (ageMax) » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-001-01-03 — Limite de 600 caractères
- Type : Interface
- Exigences : FR-152
- Critères d'acceptation : CA-001-01-03
- Étant donné : le champ texte
- Quand : on colle 700 caractères
- Alors : 600 caractères retenus ; compteur « 600 / 600 »
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-01-03 : 600 caractères au plus ; compteur « 600 / 600 » » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-001-01-04 — Exemple sans validation automatique
- Type : Interface
- Exigences : FR-153
- Critères d'acceptation : CA-001-01-04
- Étant donné : l'écran vide
- Quand : on touche l'exemple 1
- Alors : champs remplis ; route inchangée
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-01-04 et TEST-001-01-05 : l’exemple remplit sans valider ; rien n’est écrit ni envoyé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

### TEST-001-01-05 — Aucune persistance ni réseau
- Type : Confidentialité
- Exigences : FR-154, FR-105
- Critères d'acceptation : CA-001-01-05
- Étant donné : un cas saisi
- Quand : on lit `localStorage` et le journal réseau
- Alors : aucune clé ne contient le texte ou l'âge ; zéro requête
- Données : —
- Automatisation : `app/tests/saisie.test.mjs` › « TEST-001-01-04 et TEST-001-01-05 : l’exemple remplit sans valider ; rien n’est écrit ni envoyé » (`cd app && node --test tests/*.test.mjs`)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c.txt`)

