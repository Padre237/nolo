# ADR-012 — Authentification des rôles professionnels par jetons

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
Établissements, point focal, modérateur, agent de santé simulé, régulateur et auditeur doivent être authentifiés ; aucun fournisseur d'identité n'existe dans le prototype.

## Décision
Jetons porteurs aléatoires (256 bits) provisionnés par `tools/provisionner_jetons.py` dans `data/runtime/jetons.json` ; le serveur ne stocke que leur empreinte SHA-256 ; un jeton porte un rôle et une entité.

## Conséquences
Suffisant pour démontrer l'autorisation ; le mode de délivrance réel des comptes professionnels (Ordre, MINSANTE) est hors périmètre et signalé comme limite.

## Alternatives écartées
OAuth2 : pas de fournisseur disponible.

## Exigences concernées
SF-009-01, SF-009-02
