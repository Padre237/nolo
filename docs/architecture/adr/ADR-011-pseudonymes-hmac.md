# ADR-011 — Pseudonymes par HMAC-SHA256

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Signalements, comptes et déduplication de surveillance ont besoin d'identifiants stables qui ne révèlent pas l'identité.

## Décision
`pseudo = HMAC-SHA256(sel_deploiement, identifiant)` encodé en hexadécimal ; sel lu dans la variable d'environnement `ORIENTATION_SEL_HMAC` ; sel distinct pour la déduplication de surveillance, renouvelé tous les 7 jours.

## Conséquences
Sans le sel, un pseudonyme ne peut pas être relié à l'identifiant. Perte du sel = perte des liens (accepté).

## Alternatives écartées
Hachage sans sel : réversible par force brute.

## Exigences concernées
FR-608, FR-201, D-011
