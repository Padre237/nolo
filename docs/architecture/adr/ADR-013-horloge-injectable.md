# ADR-013 — Horloge injectable et fuseau Africa/Douala

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Les données synthétiques sont datées (référence 2026-10-20 22:00) et les scénarios doivent être rejoués à l'identique.

## Décision
Toute logique reçoit `maintenant` en paramètre (convention déjà suivie par `kb/services/orientation_services.py`) ; le serveur fournit l'heure réelle, sauf en mode démo où l'en-tête `X-Horloge-Demo` est accepté ; les horodatages sans décalage sont lus en heure de Douala (+01:00).

## Conséquences
Tests déterministes ; aucune dépendance au fuseau de la machine.

## Alternatives écartées
Lire l'horloge système dans la logique : non déterministe.

## Exigences concernées
FR-205, FR-602, FR-604, FR-607
