# Rôles et permissions (SF-009-01, FR-901)

Huit rôles. Pour chaque fonction : **L** lecture, **É** écriture, **D** décision ; « — » : aucun accès. Chaque permission renvoie à sa source (décision, article ou principe). Le prototype fonctionne en `demo_synthetique` : les rôles professionnels sont simulés (comptes de démonstration, jetons fictifs), aucun n'est rattaché à une personne réelle.

| Fonction | Citoyen | Établissement | Vérificateur | Point focal | Modérateur | Agent de santé (simulé) | Régulateur (ministère) | Auditeur |
|---|---|---|---|---|---|---|---|---|
| Décrire ses signes, alerte d'urgence, pistes (démo) | É (sur l'appareil) | — | — | — | — | — | — | — |
| Recherche de service, médicament, sang | L | L | L | L | L | L | L | — |
| Signalement d'une pharmacie | É (accord « signalements ») | — | — | — | L | — | — | — |
| Fiche, stock et sang d'un établissement | L (fiche publique) | É (son compte) | L | — | — | — | L | — |
| Agrément d'un établissement | — | L (son état) | D | — | — | — | L | — |
| Tendances de la demande (agrégats) | — | L (si vérifié) | — | — | — | — | L | — |
| Contributions à la surveillance | É (accord « surveillance ») | — | — | L (agrégats) | — | — | L (agrégats) | — |
| Signal de surveillance (trier, confirmer, rejeter) | — | — | — | D (motif obligatoire) | — | L | L | — |
| Gel et contestation d'un score de fiabilité | — | É (contestation) | — | — | D | — | — | — |
| Politique et simulation « et si » | — | — | — | — | — | — | L, É (variante en mémoire) | L |
| Journal d'audit | — | — | — | — | — | — | L | L, D (vérification, rejeu) |

## Sources

| Permission | Source |
|---|---|
| Calculs du citoyen sur l'appareil, sans compte | Principe XI ; loi 2024/017 art. 9 al. 2 (`CMR-LOI-2024-017::0011`) ; D-028 |
| Accords distincts : orientation, surveillance, signalements | D-028 ; art. 9 (`CMR-LOI-2024-017::0011`) |
| Un compte par établissement ; visibilité après vérification | D-029, D-029a |
| Décision d'agrément par le vérificateur | D-029a ; loi 90/035 art. 13 et 52 (`CMR-LOI-90-035::0012`, `CMR-LOI-90-035::0049`) |
| Tendances réservées aux établissements vérifiés, agrégats seulement | D-032, D-032a |
| Décision humaine du point focal sur un signal | Principe VI ; guide SBC 2023 (`CMR-MINSANTE-GUIDE-SBC-2023::0018`) ; `policy.yaml > surveillance.validation_humaine_obligatoire` |
| Gel et revue humaine par le modérateur ; contestation | Principe VI ; `policy.yaml > notation_etablissements` ; loi 2024/017 art. 44 (`CMR-LOI-2024-017::0044`) |
| Simulation de la politique en mémoire | FR-707 ; action `politique.simuler` |
| Lecture et rejeu du journal par l'auditeur | Principe VIII ; action `journal.rejouer` (condition `role_auditeur`) ; AI Act art. 12 (`INT-UE-AI-ACT-2024-1689::0032`) |

## Limites du prototype

- La garde de route par rôle (FR-902) se limite à la session de démonstration de l'espace professionnel et de la console ; aucune authentification forte n'existe pour le point focal, le modérateur ou l'auditeur [à faire avant production].
- Le modérateur et l'agent de santé n'ont pas encore d'écran dédié dans Nolo (vue Fiabilité côté modérateur : à faire).
