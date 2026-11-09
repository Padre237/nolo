# ADR-006 — LLM local optionnel, cantonné à l'extraction

Statut : Proposé · Date : 2026-11-03 · Auteur : Claude · Approbation : propriétaire du projet

## Contexte
L'OMS signale les risques des grands modèles utilisés par les patients (INT-OMS-LMM-2024::0007). Le transfert hors du pays est bloqué (FR-705). Ollama n'est pas disponible dans l'environnement de vérification.

## Décision
Extracteur lexical déterministe par défaut (synonymes FR/EN → codes) ; extracteur LLM via l'API HTTP locale d'Ollama (`requests`) en option, activé par configuration, uniquement vers un hôte situé au Cameroun, et uniquement pour proposer des codes supplémentaires.

## Conséquences
Les tests utilisent l'extracteur lexical et un double de test du LLM ; les tests avec un vrai modèle sont « exécutables seulement chez l'équipe ».

## Alternatives écartées
LLM distant : interdit par FR-705 tant que `decret_transfert_publie` est faux.

## Exigences concernées
FR-101, FR-103, FR-705
