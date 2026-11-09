# SF-017-03 — Vidéo de démonstration (≤ 7 min) — Tests

| Champ | Valeur |
|---|---|
| Fonctionnalité | F-017 Livrables de soumission |
| Sous-fonctionnalité | SF-017-03 |
| Version | 2.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-2312, FR-2313, FR-2314, FR-2315 |

## 1. Environnement et données
ffmpeg (libx264, aac) et Playwright disponibles ; aucune voix de synthèse disponible.

Règle : un test n'est déclaré réussi qu'après exécution réelle, avec la commande et sa sortie dans `docs/quality/`.

## 2. Cas de test

### TEST-017-03-01 — Durée et format
- Type : Revue
- Exigences : FR-2312, FR-2313
- Critères d'acceptation : CA-017-03-01
- Étant donné : le MP4
- Quand : `ffprobe`
- Alors : ≤ 7:00, 1080p, 30 i/s
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-017-03-02 — Script et sous-titres
- Type : Revue
- Exigences : FR-2314
- Critères d'acceptation : CA-017-03-02
- Étant donné : le dépôt
- Quand : liste
- Alors : présents
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

### TEST-017-03-03 — Taille
- Type : Revue
- Exigences : FR-2315
- Critères d'acceptation : CA-017-03-03
- Étant donné : le MP4
- Quand : taille
- Alors : < 100 Mio
- Données : —
- Automatisation : —
- Statut d'exécution : Non exécuté (automatisation à écrire)

