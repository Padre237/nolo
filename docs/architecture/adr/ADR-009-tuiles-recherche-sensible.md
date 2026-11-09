# ADR-009 — Recherches sensibles sur tuile de district

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
FR-308 et FR-408 exigent que le serveur ignore ce qui est cherché quand la recherche peut révéler la vie sexuelle.

## Décision
`GET /api/v1/tuiles/{district}` renvoie en bloc tous les établissements du district avec leurs services, et tous les stocks déclarés de toutes les DCI, quelle que soit la recherche. Le client filtre localement avec l'algorithme de rayon progressif (ADR-015). Le serveur journalise seulement « tuile téléchargée » sans requête. Taille maximale visée : 200 Kio par district.

## Conséquences
Le serveur ne peut pas distinguer une recherche sensible d'une recherche ordinaire faite par tuile. Les données des tuiles sont publiques (établissements et stocks), sans donnée personnelle.

## Alternatives écartées
Chiffrement de la requête : le serveur verrait toujours la requête déchiffrée.

## Exigences concernées
FR-305, FR-308, FR-405, FR-408
