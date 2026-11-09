# Note d'interprétation conservatoire : articles 5, 48, 65 et 66 de la loi n° 2024/017

Date : 2026-11-03 · Auteur : juriste de l'équipe · Statut : **position conservatoire du prototype, à confirmer ou infirmer par un juriste compétent en droit camerounais de la protection des données avant toute mise en production.**

Fragments concernés : `CMR-LOI-2024-017::0005` (art. 5), `::0048` (art. 48, texte officiel), `::0062` (art. 65 et 66 ; en-tête de l'art. 66 illisible à l'OCR).

## Difficulté

La lecture combinée des articles 5, 48, 65 et 66 soulève une difficulté sur le régime juridique du traitement des données sensibles.

- L'article 48 interdit expressément certains traitements de données sensibles, sans prévoir d'exception fondée sur le consentement de la personne concernée.
- L'article 66 prévoit une sanction pénale pour la mise en mémoire ou la conservation de données sensibles sans le consentement exprès de la personne concernée. Il pourrait être lu comme reconnaissant une possibilité de traitement sous réserve d'un consentement exprès, ou comme une disposition répressive qui ne déroge pas aux interdictions spécifiques de l'article 48.
- L'article 65 concerne le profilage et ne constitue pas, à lui seul, une autorisation de traitement des données sensibles.

## Position retenue

L'article 66, alinéa 1, ne constitue pas, à lui seul, une dérogation à l'article 48. Le consentement exprès est une **condition nécessaire** dans les situations visées par l'article 66, mais il n'est pas automatiquement une **condition suffisante** pour rendre licite un traitement interdit par l'article 48.

Fondements :
1. la lecture combinée des dispositions ;
2. la distinction entre une obligation de consentement et une autorisation légale ;
3. le principe selon lequel une disposition spécifique d'interdiction ne doit pas être neutralisée par une disposition pénale formulée différemment.

## Traduction dans le prototype

| Catégorie | Règle appliquée | Paramètre `policy.yaml` | Exigences |
|---|---|---|---|
| Données de santé (sensibles, art. 5, hors liste de l'art. 48) | Traitement possible **avec** consentement exprès (condition nécessaire, art. 66) | `donnees_sensibles.sante.exige: consentement_expres` | FR-106, FR-112, FR-201 |
| Catégories de l'art. 48 (vie sexuelle, génétique et biométrie en santé, origine linguistique ou régionale, etc.) | Interdites **même avec** consentement exprès | `categories_interdites_art48.derogation_par_consentement: false` | FR-111, FR-308, FR-408, FR-609, FR-712, FR-713 |
| Profilage (art. 65) | Aucun profilage, quel que soit le consentement | `decision_automatisee.profilage.autorise: false` | FR-105, FR-704 |

## Point restant ouvert
La virgule de l'art. 19 al. 2 (« fichiers de données sensibles, relatives aux mineurs ») admet deux lectures : données sensibles *concernant des mineurs*, ou données sensibles *et* données relatives aux mineurs. Le prototype applique la lecture la plus large (les deux). À confirmer avec la présente note.
