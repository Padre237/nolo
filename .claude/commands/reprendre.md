---
description: Reprendre le travail sur Nolo sans perdre le contexte (lecture, état, prochaine tâche, porte d'approbation)
argument-hint: "[identifiant facultatif : TASK-…, SF-…, F-…]"
---

Tu reprends le projet Nolo. Ne modifie aucun fichier pendant cette commande : elle ne fait que lire et rendre compte.

1. Lis `CLAUDE.md` en entier, puis `docs/ETAT.md`.
2. Lance, et montre la dernière ligne de chaque sortie :
   - `python3 tools/trace.py`
   - `python3 tools/sdd_index.py`
   - `git status --short | head -20` et `git log --oneline -5`
3. Choisis la tâche :
   - si `$ARGUMENTS` est renseigné, prends cet identifiant ;
   - sinon, prends la première ligne du §5 de `docs/ETAT.md`.
4. Ouvre le dossier de cette tâche (`docs/specifications/…/sf-…/`). Lis son `requirements.md` jusqu'au §10 « Contexte à charger », puis **seulement** les fichiers que ce §10 énumère, les quatre fichiers du dossier et les fichiers cités par la tâche (« Fichiers à lire », « Fichiers à modifier »).
5. Vérifie la porte :
   - lis la ligne « Statut » et la ligne « Bloquant » du dossier ;
   - lis la ligne « Dépend de » de la tâche et le statut de ces tâches ;
   - cherche une décision d'approbation dans `docs/product/decisions.md`.
6. Rends compte, en français, en cinq blocs courts :
   - **État** : chiffres de `trace.py` et `sdd_index.py`, travail non commis éventuel ;
   - **Tâche retenue** : identifiant, titre, exigences, fichiers, tests, dépendances ;
   - **Porte** : `APPROVED`/`READY_FOR_DEV` ou non ; ce qui bloque ;
   - **Plan** : les étapes exactes que suivrait `/implementer` (tests d'abord), sans écrire de code ;
   - **Question** : si la porte est fermée, demande l'approbation explicite du dossier (ou de la vague) en citant ce qu'il faut lire ; si une question ouverte `Q-…` du dossier bloque, pose-la avec sa proposition.

N'invente aucune exigence. Si un document contredit le code ou un autre document, signale-le comme écart au lieu de trancher.
