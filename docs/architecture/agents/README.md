# Mandats des agents institutionnels (SF-007-15, FR-783)

Un mandat par agent institutionnel **simulé** : rôle, informations reçues, décisions possibles, textes qui fondent le mandat. Ces agents sont joués par Nolo pour la démonstration ; aucun n'engage l'institution réelle qu'il représente. Les agents du système (Orchestrateur, Conformité, Surveillance, Ressources, Fiabilité, Conseiller) sont décrits dans `docs/architecture/system-architecture.md` et `docs/architecture/shared/governance-contracts.md`.

| Agent | Mandat | Code |
|---|---|---|
| District / SIMR (simulé) | [district.md](district.md) | `app/js/agents/cellule.js` (`MANDATS.district`), `tools/scenarios/executer.py` (S3) |
| APDP (simulée) | [apdp.md](apdp.md) | `app/js/agents/cellule.js` (`MANDATS.apdp`) |
| Vérificateur d'agrément (simulé) | [verificateur.md](verificateur.md) | console du ministère, vue « Agréments » ; `donnees/agrement_simule.json` |

Règle commune : un agent ne reçoit que les informations de son mandat ; sa position est datée et journalisée ; un désaccord n'est jamais tranché automatiquement en faveur du partage ; seule une décision humaine (point focal, vérificateur, modérateur) clôt un échange (Principe VI, FR-1924).
