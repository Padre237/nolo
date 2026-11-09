# ADR-014 — Détection d'anomalies par CUSUM

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
FR-203 et SC-201 exigent de détecter au plus tard à J3 le regroupement injecté dans l'aire AS-07.

## Décision
CUSUM unilatéral par aire et syndrome sur les séries hebdomadaires : référence = moyenne des 8 semaines précédentes, écart-type plancher 1, paramètres k = 0,5 et h = 4 en unités d'écart-type, à confirmer par calibration sur les données synthétiques (tâche de SF-002-03). Paramètres rangés dans `rules/surveillance.yaml`.

## Conséquences
Algorithme explicable au point focal ; les paramètres sont des propositions à approuver avec SF-002-03.

## Alternatives écartées
Farrington : plus complexe à expliquer et à tester avant le 10 novembre.

## Exigences concernées
FR-203, SC-201
