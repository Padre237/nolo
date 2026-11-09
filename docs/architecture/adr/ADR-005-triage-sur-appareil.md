# ADR-005 — Triage exécuté sur l'appareil par un moteur monotone

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
FR-112 impose le triage sur l'appareil sans consentement ; deux implémentations (serveur et appareil) risqueraient de diverger.

## Décision
Une seule implémentation du moteur, en JavaScript, sur l'appareil. Les règles restent en YAML (`rules/triage_signes_alerte.yaml`) et sont exportées en JSON versionné, servi par `GET /api/v1/regles/triage`. Le moteur est **monotone** : ajouter un symptôme ne peut jamais abaisser le niveau. Le serveur ne calcule jamais de niveau.

## Conséquences
FR-101 (le LLM ne peut que relever) découle de la monotonie : le LLM ne peut qu'ajouter des codes. Le journal côté serveur ne reçoit que la décision minimisée (SF-001-07). Les outils côté serveur qui doivent exécuter le moteur (rejeu SF-007-12, comparaison A/B SF-007-14, tests d'acceptation) l'appellent par une interface en ligne de commande `node src/client/ondevice/cli/triage.mjs` (JSON en entrée standard, JSON en sortie standard), jamais par une réimplémentation Python.

## Alternatives écartées
Moteur côté serveur : envoie des données de santé sans nécessité.

## Exigences concernées
FR-101, FR-104, FR-112
