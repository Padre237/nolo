# ADR-010 — Journal d'audit JSON Lines chaîné

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Le journal doit être en ajout seul, vérifiable et rejouable (FR-706, SC-703).

## Décision
Fichier `data/runtime/audit.jsonl`, une ligne par événement (schéma dans `governance-contracts.md` §6), chaînage SHA-256, écriture sous verrou de fichier, `fsync` après chaque ligne. La vérification recalcule toute la chaîne.

## Conséquences
Simple, lisible, sans dépendance ; la rotation et l'archivage sont hors périmètre du prototype.

## Alternatives écartées
Base de données : chaînage plus difficile à démontrer.

## Exigences concernées
FR-706, FR-709, FR-713
