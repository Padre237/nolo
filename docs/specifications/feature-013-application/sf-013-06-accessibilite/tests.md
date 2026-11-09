# SF-013-06 — Accessibilité — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-06 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1326, FR-1327, FR-1328, FR-1329, FR-1330 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-06-01 — Cibles de 44 px
- Type : Accessibilité
- Exigences : FR-1326
- Critères d'acceptation : CA-013-06-01
- Étant donné : 39 états, 4 largeurs
- Quand : mesure
- Alors : aucune cible trop petite hors graphiques
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-inspection-visuelle.txt`)

### TEST-013-06-02 — Focus et évitement
- Type : Accessibilité
- Exigences : FR-1327, FR-1328
- Critères d'acceptation : CA-013-06-02
- Étant donné : clavier
- Quand : tabulation
- Alors : focus visible ; évitement en premier
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-013-06-03 — Bouton motivé
- Type : Accessibilité
- Exigences : FR-1329
- Critères d'acceptation : CA-013-06-03
- Étant donné : bouton indisponible
- Quand : activation
- Alors : raison annoncée
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-013-06-04 — Contrastes
- Type : Unitaire
- Exigences : FR-1330
- Critères d'acceptation : CA-013-06-04
- Étant donné : paires de jetons
- Quand : calcul
- Alors : ≥ 4,5:1
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

