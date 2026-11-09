# Conventions d'API et catalogue des erreurs

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW

## 1. Généralités
- Préfixe : `/api/v1`. JSON UTF-8. Noms de champs en `snake_case` français, comme le code existant.
- Le serveur renvoie des **codes** (niveaux, mentions, motifs), jamais des phrases destinées à l'utilisateur : le client traduit (`src/client/i18n/fr.json`, `en.json`). La langue n'est jamais transmise.
- Chaque route documentée dans un `design.md` donne : méthode, chemin, rôle requis, schéma de requête, schéma de réponse, codes d'erreur, action de conformité demandée, événement d'audit produit.
- Les schémas sont des modèles pydantic dans `src/server/api/schemas/<domaine>.py` ; les tests de contrat valident les réponses contre les mêmes modèles (export JSON Schema).

## 2. Enveloppes

Succès :
```json
{"donnees": {}, "meta": {"mode": "demo_synthetique", "version_politique": "1.3.0", "ref_audit": "evt-3f2c…"}}
```
Erreur :
```json
{"erreur": {"code": "E-CONF-001", "message_code": "BLOQUE_CONFORMITE", "details": {"fragments": ["CMR-LOI-2024-017::0033"]}, "ref_audit": "evt-…"}}
```
`ref_audit` est toujours présent quand un événement d'audit a été écrit.

## 3. En-têtes
| En-tête | Usage |
|---|---|
| `Authorization: Bearer <jeton>` | Rôles professionnels (ADR-012) |
| `X-Compte: <identifiant>` | Compte pseudonyme du citoyen (D-011) ; le serveur ne conserve que son HMAC |
| `X-Consentements: orientation=1;surveillance=0;geolocalisation=1` | Consentements exprès en vigueur sur l'appareil, contrôlés par Conformité |
| `X-Horloge-Demo: <horodatage>` | Horloge simulée ; acceptée **uniquement** en mode `demo_synthetique`, ignorée et journalisée sinon (ADR-013) |
| `Idempotency-Key: <uuid>` | Obligatoire sur les créations (signalements, déclarations, contestations, décisions) ; un rejeu renvoie la première réponse |

## 4. Validation commune (toutes routes)
| Entrée | Règle | Erreur |
|---|---|---|
| `lat`, `lon` | Réels, −90 ≤ lat ≤ 90, −180 ≤ lon ≤ 180, **au plus 2 décimales** | E-VAL-003 |
| Horodatages | ISO 8601 avec décalage | E-VAL-003 |
| Énumérés | Valeur du domaine documenté | E-VAL-002 |
| Champ interdit présent (`policy.yaml > journal_audit.champs_interdits`) | Rejet sans traitement ni journalisation du contenu | E-VAL-004 |
| Corps > 32 Kio | Rejet | E-VAL-005 |

## 5. Catalogue des erreurs
| Code | HTTP | Signification |
|---|---|---|
| E-VAL-001 | 422 | Champ obligatoire manquant |
| E-VAL-002 | 422 | Valeur hors du domaine |
| E-VAL-003 | 422 | Format invalide (dont position à plus de 2 décimales) |
| E-VAL-004 | 422 | Champ interdit reçu |
| E-VAL-005 | 413 | Corps trop volumineux |
| E-AUTH-001 | 401 | Authentification requise |
| E-AUTH-002 | 401 | Jeton invalide ou inactif |
| E-AUTH-003 | 403 | Rôle insuffisant |
| E-AUTH-004 | 403 | Entité non autorisée (ex. un établissement qui déclare pour un autre) |
| E-CONF-001 | 403 | Bloqué par l'agent Conformité (verdict `BLOQUE`) |
| E-CONF-002 | 403 | Bloqué faute de fondement (`BLOQUE_SANS_FONDEMENT`) |
| E-CONF-003 | 403 | Consentement exprès manquant pour la finalité |
| E-MODE-001 | 403 | Fonction indisponible dans le mode courant |
| E-NOTF-001 | 404 | Ressource introuvable |
| E-CONFL-001 | 409 | Transition d'état interdite (ex. signal déjà validé) |
| E-DELAI-001 | 409 | Délai dépassé (ex. contestation après 7 jours) |
| E-LIM-001 | 429 | Limite atteinte (ex. 5 signalements par jour) |
| E-INDISP-001 | 503 | Dépendance indisponible (base de connaissances, LLM) ; le repli est indiqué |
| E-INT-001 | 500 | Erreur interne ; aucun détail technique renvoyé |

Une sous-fonctionnalité qui a besoin d'un nouveau code le propose dans son `design.md` ; il est ajouté ici à l'approbation.

## 6. Routes prévues (propriétaire de chaque route)
| Méthode et chemin | Propriétaire |
|---|---|
| `GET /api/v1/regles/triage` | SF-001-04 |
| `POST /api/v1/orientation/extraction` | SF-001-03 |
| `GET /api/v1/orientation/structures` | SF-001-10 |
| `GET /api/v1/specialites/recherche` | SF-003-02 |
| `GET /api/v1/tuiles/{district}` | SF-003-03 (établissements) et SF-004-04 (stocks) — contrat unique dans ADR-009 |
| `GET /api/v1/medicaments/recherche` | SF-004-02 |
| `POST /api/v1/medicaments/conseil` (refus) | SF-004-03 |
| `GET /api/v1/sang/recherche` | SF-005-01 |
| `POST /api/v1/signalements` | SF-006-01 (et SF-006-08 pour les classes sensibles) |
| `GET /api/v1/etablissements/{id}/fiabilite` | SF-006-02 (public) et SF-006-07 (détail pour l'établissement) |
| `POST /api/v1/moderation/rafales/{gel_id}/decision` | SF-006-05 |
| `POST /api/v1/contestations`, `POST /api/v1/contestations/{id}/decision` | SF-006-06 |
| `POST /api/v1/declarations/medicaments` | SF-010-02 |
| `POST /api/v1/declarations/sang` | SF-010-03 |
| `POST /api/v1/surveillance/contributions` | SF-002-01 |
| `GET /api/v1/surveillance/signaux`, `POST /api/v1/surveillance/signaux/{id}/decision` | SF-002-04 |
| `POST /api/v1/surveillance/signaux/{id}/rsi` | SF-002-06 |
| `POST /api/v1/surveillance/demandes-donnees` | SF-002-07 |
| `GET /api/v1/surveillance/carte` | SF-002-08 |
| `GET /api/v1/surveillance/export` | SF-002-09 |
| `POST /api/v1/interventions` | SF-008-06 |
| `GET /api/v1/politique`, `POST /api/v1/politique/simulations` | SF-007-01, SF-007-13 |
| `POST /api/v1/ab/executions` | SF-007-14 |
| `GET /api/v1/journal`, `GET /api/v1/journal/verification` | SF-007-11 |
| `POST /api/v1/journal/rejeu` | SF-007-12 |
| `GET /api/v1/mode` | SF-007-07 |
| `POST /api/v1/comptes` | SF-009-03 |
| `POST /api/v1/sessions-pro` (vérification de jeton) | SF-009-02 |
