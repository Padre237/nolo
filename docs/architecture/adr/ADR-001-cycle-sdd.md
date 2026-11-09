# ADR-001 — Cycle de vie SDD et organisation documentaire

Statut : Accepté (imposé par le propriétaire, 2026-11-03) · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Le propriétaire impose un développement piloté par les spécifications strict : un dossier exigences, conception, tâches, tests par sous-fonctionnalité, des statuts et des portes de qualité (`docs/product/protocole-sdd.md`).

## Décision
Arborescence `docs/specifications/feature-XXX-<nom>/sf-XXX-NN-<nom>/{requirements,design,tasks,tests}.md` ; un `README.md` par fonctionnalité ; catalogue unique `docs/specifications/README.md` ; gabarits dans `docs/specifications/_templates/` ; identifiants de `CLAUDE.md` §5 ; matrice générée par `tools/trace.py`. Les spécifications v1.3 sont archivées sans modification.

## Conséquences
Une exigence n'a qu'une sous-fonctionnalité propriétaire ; les éléments communs (modèle de données, conventions d'API, contrats de gouvernance) vivent dans `docs/architecture/shared/`. La matrice est régénérée à chaque changement.

## Alternatives écartées
Garder les fichiers `spec.md` de Spec Kit : refusé, une spécification par fonctionnalité ne respecte pas la granularité exigée.

## Exigences concernées
Toutes
