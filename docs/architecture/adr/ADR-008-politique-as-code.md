# ADR-008 — Politique as code validée par schéma

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
L'état du droit change (décrets, autorisation APDP) et doit être simulable (FR-707).

## Décision
`config/policy.yaml` est la seule source des valeurs juridiques ; un JSON Schema (`config/policy.schema.json`) le valide au chargement ; sa version et son empreinte SHA-256 sont inscrites dans chaque événement d'audit ; une simulation crée une variante en mémoire, jamais écrite sur `config/policy.yaml`.

## Conséquences
Une politique invalide empêche le démarrage (le système ne fonctionne jamais avec une politique inconnue).

## Alternatives écartées
Constantes dans le code : refusé (principe III).

## Exigences concernées
FR-703, FR-707, FR-714
