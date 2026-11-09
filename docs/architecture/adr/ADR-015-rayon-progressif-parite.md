# ADR-015 — Rayon progressif : un algorithme, deux implémentations

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
La recherche par paliers existe en Python (`_expanding`) et doit aussi s'exécuter sur l'appareil pour les recherches sensibles.

## Décision
Spécification unique de l'algorithme (paliers 5, 10, 20, 50 km ; minimum 3 ; distance haversine ; tri) dans SF-003-02 ; implémentations `src/server/domain/rayon.py` et `src/client/ondevice/rayon.js` ; tests de parité sur un jeu commun de 50 positions synthétiques, qui doivent donner les mêmes résultats dans le même ordre.

## Conséquences
Toute modification de l'algorithme touche les deux fichiers et les tests de parité.

## Alternatives écartées
Recherche uniquement côté serveur : contraire à FR-308.

## Exigences concernées
FR-302, FR-303, FR-308, FR-408
