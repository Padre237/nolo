# SF-013-03 — Rendu, mise à jour du DOM et délégation des événements — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-013 Socle de l'application Nolo |
| Sous-fonctionnalité | SF-013-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1310, FR-1311, FR-1312, FR-1313 |

## 1. Environnement et données
Nolo : `cd app && node --test tests/*.test.mjs` ; serveur local `python3 -m http.server 8765 --bind 127.0.0.1 -d app` ; inspection `python3 tools/inspecter.py`.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-013-03-01 — Échappement
- Type : Sécurité
- Exigences : FR-1310
- Critères d'acceptation : CA-013-03-01
- Étant donné : saisie piégée
- Quand : rendu
- Alors : texte échappé
- Données : —
- Automatisation : `tools/inspecter.py` › « TEST-013-03-01 : saisie piégée rendue comme du texte : OK »
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-013-03-02 — Saisie conservée
- Type : Interface
- Exigences : FR-1311
- Critères d'acceptation : CA-013-03-02
- Étant donné : mot de passe saisi
- Quand : re-rendu
- Alors : saisie et focus conservés
- Données : —
- Automatisation : `tools/inspecter.py` › « TEST-013-03-02 : mot de passe et focus conservés au re-rendu : OK »
- Statut d'exécution : Exécuté le 2026-11-09 : réussi (preuve `docs/quality/preuve-2026-11-09-vague-c3.txt`)

### TEST-013-03-03 — Clavier délégué
- Type : Accessibilité
- Exigences : FR-1312
- Critères d'acceptation : CA-013-03-03
- Étant donné : région focusée
- Quand : Espace
- Alors : action exécutée
- Données : —
- Automatisation : `tools/inspecter.py` (preuve-2026-11-09-inspection-visuelle.txt)
- Statut d'exécution : Non exécuté (état atteint et capturé par l'inspection du 2026-11-09, qui ne contrôle que la mise en page ; le contenu attendu n'est pas vérifié : assertion à écrire, TASK-013-10-03)

### TEST-013-03-04 — Annonce
- Type : Accessibilité
- Exigences : FR-1313
- Critères d'acceptation : CA-013-03-04
- Étant donné : ajout de signe
- Quand : lecture de `aria-live`
- Alors : annonce présente
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

