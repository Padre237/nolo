# ADR-004 — Agents : classes à contrat commun et orchestrateur central

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Le hackathon évalue la coordination multi-agents. Le code UIT utilise une classe de base et un routeur sans framework externe.

## Décision
Chaque agent implémente le protocole `Agent` (`docs/architecture/shared/governance-contracts.md` §1). L'orchestrateur est le seul à appeler l'agent Conformité et le journal ; il refuse d'exécuter une action sans décision (FR-701).

## Conséquences
Responsabilités nettes, testables séparément ; pas de dépendance à un framework d'agents.

## Alternatives écartées
Ajouter LangChain, CrewAI ou smolagents : dépendances indisponibles et comportement moins prévisible.

## Exigences concernées
FR-701, FR-709
