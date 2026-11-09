# MT-001 — Migration de l'arborescence vers `src/` — Conception

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | MT-001 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-1401 à FR-1406, NFR-1401, NFR-1402 |
| ADR | ADR-001, ADR-002 |

## 1. Comportement fonctionnel et workflow
1. Mesures « avant » : sorties des 11 contrôles, sortie de l'évaluation, empreinte SHA-256 de `kb/kb_chunks.jsonl`, archivées dans `tests/reports/AAAA-MM-JJ/mt001-avant/`.
2. Création de `src/server/config.py` (table des chemins).
3. Déplacements (§4), adaptation des imports (`from src.server.kb.bm25 import BM25`) et des chemins (`config.chemin("kb_chunks")`).
4. Réécriture des 11 contrôles en tests pytest, sans changer les valeurs attendues.
5. Mesures « après » et comparaison automatique.

## 2. Interactions utilisateur et états de l'interface
Sans objet : maintenance du code, aucun écran.

## 3. Composants et responsabilités
| Composant | Fichier (cible) | Responsabilité |
|---|---|---|
| Table des chemins | `src/server/config.py` | Seul point de résolution des chemins |
| Base de connaissances (code) | `src/server/kb/` | Construction, recherche, évaluation |
| Services existants | `src/server/domain/orientation_services.py` | Module transitoire, découpé plus tard par les sous-fonctionnalités |
| Générateurs | `tools/donnees/generate_synthetic.py`, `tools/donnees/generate_services.py` | Données synthétiques |
| Régression | `tests/regression/test_services_existants.py` | 11 contrôles existants |

## 4. Modèle de données
Aucun changement de donnée. Table de correspondance :

| Avant | Après |
|---|---|
| `kb/build_kb.py` | `src/server/kb/build_kb.py` |
| `kb/bm25.py` | `src/server/kb/bm25.py` |
| `kb/ingest_chroma.py` | `src/server/kb/ingest_chroma.py` |
| `kb/eval/run_eval.py` | `src/server/kb/eval/run_eval.py` |
| `kb/eval/questions_test.jsonl` | inchangé |
| `kb/services/orientation_services.py` | `src/server/domain/orientation_services.py` |
| `kb/services/test_services.py` | `tests/regression/test_services_existants.py` (réécrit en pytest) ; l'original est conservé dans `docs/archive/` |
| `kb/generate_synthetic.py`, `kb/generate_services.py` | `tools/donnees/` |
| `kb/rules/` | `rules/` |
| `kb/data/synthetic/` | `data/synthetic/` |
| `kb/README.md`, `kb/liens-telechargement.md`, `kb/plan-strategie-hackathon.md` | `docs/archive/kb/` |

## 5. Contrats d'interface
### 5.1 API
Sans objet.
### 5.2 Interfaces internes
```python
# src/server/config.py
RACINE: Path            # racine du dépôt
CHEMINS: dict[str, Path] = {"kb_chunks": RACINE/"kb"/"kb_chunks.jsonl", "sources": RACINE/"kb"/"sources.json",
    "corrections": RACINE/"kb"/"corrections", "pages": RACINE/"kb", "regles": RACINE/"rules",
    "donnees_synthetiques": RACINE/"data"/"synthetic", "politique": RACINE/"config"/"policy.yaml",
    "runtime": RACINE/"data"/"runtime"}
def chemin(nom: str) -> Path: ...   # KeyError si nom inconnu
```

## 6. Transitions d'état et logique métier
Sans objet : aucune logique modifiée.

## 7. Autorisation et sécurité
- `.gitignore` : `kb/raw/`, `kb/raw2/`, `__pycache__/`, `data/runtime/`, `*.tar`, et chaque PDF « tous droits réservés » listé par `tools/lister_sources_non_publiables.py` (lecture de `kb/sources.json`).
- `kb/kb_chunks.public.jsonl` généré sans les sources non publiables.

## 8. Intégrations externes
Aucune.

## 9. Gestion des défaillances et reprise
| Défaillance | Comportement | Journal |
|---|---|---|
| Une mesure « après » diffère | Arrêt, restauration depuis `kb.avant-mt001.tar` | Rapport dans `tests/reports/` |

## 10. Performance, passage à l'échelle, accessibilité
Sans objet.

## 11. Décisions
- ADR appliquées : ADR-001, ADR-002.
- Décisions à formaliser : aucune.

## 12. Éléments de conception et couverture
| ID | Élément | Exigences couvertes |
|---|---|---|
| DES-M01-01 | Table de correspondance des déplacements (§4) | FR-1401, NFR-1402 |
| DES-M01-02 | Module `src/server/config.py` | FR-1402 |
| DES-M01-03 | Réécriture pytest des 11 contrôles | FR-1403 |
| DES-M01-04 | Mesures avant/après et comparaison | FR-1404 |
| DES-M01-05 | `.gitignore` et base publique | FR-1405 |
| DES-M01-06 | `pytest.ini` et marqueur | FR-1406, NFR-1401 |

## 13. Existant et écarts
| Élément existant | Fichier | État | Preuve | Correction |
|---|---|---|---|---|
| Chemins calculés depuis `__file__` | 6 fichiers de `kb/` | Écart avec FR-1402 | `grep` du 2026-11-03 | TASK-M01-02 |
