# Contrats de gouvernance partagés

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW · Propriétaires : F-007

Ces contrats sont utilisés par toutes les sous-fonctionnalités. Leur implémentation appartient à F-007 ; les autres dossiers les **appellent** et déclarent les actions qu'ils demandent.

## 1. Contrat commun des agents (ADR-004)

```python
class Agent(Protocol):
    nom: str                                   # "triage", "ressources", "fiabilite", ...
    def traiter(self, intention: Intention, ctx: Contexte) -> Resultat: ...

@dataclass(frozen=True)
class Contexte:
    session: str              # "anonyme", "hmac:<…>" (compte) ou "demo:<scenario>"
    mode: str                 # demo_synthetique | sans_donnees_personnelles | complet
    maintenant: datetime      # horloge injectée (ADR-013)
    consentements: dict[str, bool]
    mineur: bool
    politique: "Politique"    # objet en lecture seule, version figée pour la requête
    role: str                 # citoyen | etablissement | point_focal | moderateur | agent_sante | regulateur | auditeur
```
Un agent ne lit jamais `config/policy.yaml` directement et n'écrit jamais le journal directement : il passe par `Politique` et par l'orchestrateur.

## 2. Demande et décision de conformité (SF-007-03)

```python
@dataclass(frozen=True)
class DemandeConformite:
    demande_id: str                      # uuid4
    agent_demandeur: str
    action: str                          # catalogue §3
    categories_donnees: tuple[str, ...]  # vocabulaire §4
    finalite: str                        # orientation | surveillance | recherche | fiabilite | moderation | audit | simulation | demonstration
    destination: str                     # appareil | serveur_cmr | hors_cmr | district | externe:<nom>
    contexte: Contexte

@dataclass(frozen=True)
class DecisionConformite:
    demande_id: str
    verdict: Literal["AUTORISE", "AUTORISE_AVEC_CONDITIONS", "BLOQUE", "BLOQUE_SANS_FONDEMENT"]
    conditions: tuple[str, ...]          # ex. "agreger_seuil_5", "pseudonymiser", "retirer_dci"
    fragments: tuple[str, ...]           # chunk_ids ; ≥ 1 sauf BLOQUE_SANS_FONDEMENT (FR-702)
    cles_politique: tuple[str, ...]      # chemins pointés dans policy.yaml
    version_politique: str
    repli: str | None                    # modele_local | anonymisation | agregat | appareil | None
    justification_code: str              # code traduisible côté client
    ref_audit: str
```
Règles :
- Ordre d'évaluation : (1) catégories interdites de l'art. 48 → `BLOQUE` sans exception (FR-712) ; (2) mode (FR-714) ; (3) consentement exprès de la finalité (FR-106, FR-201) ; (4) profilage (FR-704) ; (5) destination (FR-705, FR-715) ; (6) règles propres à l'action (§3). La première règle qui bloque l'emporte.
- Un LLM ne peut jamais transformer un `BLOQUE` en `AUTORISE` (FR-703) ; il peut seulement rédiger une justification complémentaire, non décisionnelle.
- Si aucune règle ne s'applique ou si la base de connaissances ne renvoie aucun fragment pertinent : `BLOQUE_SANS_FONDEMENT`.

## 3. Catalogue des actions (vocabulaire fermé)

Les verdicts attendus ci-dessous servent de table de décision de référence et de base aux tests de SF-007-03. « Démo », « Sans DP » et « Complet » désignent les modes.

| Action | Demandeur (SF) | Démo | Sans DP | Complet | Fragments de référence |
|---|---|---|---|---|---|
| `triage.extraction_llm` | SF-001-03 | Autorisé si consentement orientation | Bloqué (E-MODE-001) | Autorisé si consentement orientation ; destination `serveur_cmr` uniquement | CMR-LOI-2024-017::0011, ::0033 |
| `triage.journaliser_decision` | SF-001-07 | Autorisé (entrées synthétiques complètes) | Autorisé avec conditions `empreinte_seulement` | Autorisé avec conditions `empreinte_seulement` | CMR-LOI-2024-017::0062, INT-UE-AI-ACT-2024-1689::0032 |
| `orientation.structures` | SF-001-10 | Autorisé | Autorisé (position arrondie, aucun symptôme) | Autorisé | CMR-LOI-2024-017::0011 |
| `ressources.rechercher_specialite` | SF-003-02 | Autorisé ; si sensible → `BLOQUE`, repli `appareil` | Idem | Idem | CMR-LOI-2024-017::0048 |
| `ressources.telecharger_tuile` | SF-003-03, SF-004-04 | Autorisé | Autorisé | Autorisé | CMR-LOI-2024-017::0048 |
| `ressources.rechercher_medicament` | SF-004-02 | Autorisé ; si `revele_vie_sexuelle` → `BLOQUE`, repli `appareil` | Idem | Idem | CMR-LOI-2024-017::0048 |
| `ressources.rechercher_sang` | SF-005-01 | Autorisé | Autorisé | Autorisé | — (aucune donnée personnelle) ; justification `AUCUNE_DONNEE_PERSONNELLE` |
| `fiabilite.enregistrer_signalement` | SF-006-01 | Autorisé avec `pseudonymiser` | Bloqué (E-MODE-001) | Autorisé avec `pseudonymiser` | CMR-LOI-2024-017::0011, ::0020 |
| `fiabilite.enregistrer_signalement_sensible` | SF-006-08 | Autorisé avec `retirer_dci`, `retirer_pseudonyme` | Bloqué | Idem démo | CMR-LOI-2024-017::0048 |
| `fiabilite.appliquer_baisse` | SF-006-04, SF-006-05 | Autorisé sauf gel actif | Bloqué | Idem démo | CMR-LOI-2024-017::0044 |
| `declaration.publier` | SF-010-02, SF-010-03 | Autorisé (déclarant agréé) | Autorisé (aucune donnée personnelle) | Autorisé | CMR-LOI-90-035::0049 |
| `surveillance.contribuer` | SF-002-01 | Autorisé si consentement surveillance | Bloqué | Autorisé si consentement surveillance | CMR-LOI-2024-017::0011 |
| `surveillance.publier_carte` | SF-002-08 | Autorisé avec `agreger_seuil_5`, `decaler_7_jours` | Autorisé (aucune donnée) | Idem démo | CMR-LOI-2024-017::0062 |
| `surveillance.transmettre_donnees_individuelles` | SF-002-07 | **Bloqué**, repli `agregat` | Bloqué | **Bloqué**, repli `agregat` | CMR-LOI-2024-017::0011, INT-OMS-RSI-2005-AMENDE-2022::0054 |
| `surveillance.exporter_agregat` | SF-002-09 | Autorisé (maquette) | Bloqué | Autorisé si agrégats non personnels ; sinon FR-715 | CMR-LOI-2024-017::0020 |
| `appel_reseau_sortant` | SF-007-05 | Autorisé si données synthétiques ; sinon contrôle de destination | Idem | Bloqué vers `hors_cmr` sauf autorisation | CMR-LOI-2024-017::0033 |
| `interconnexion.externe` | SF-007-08 | Autorisé si agrégats | Bloqué | Bloqué sans autorisation art. 19 al. 2 | CMR-LOI-2024-017::0020 |
| `profil.relier_dans_la_duree` | SF-007-04 | **Bloqué** | Bloqué | Bloqué | CMR-LOI-2024-017::0044, ::0062 |
| `donnee_interdite.traiter` | SF-007-06 | **Bloqué** | Bloqué | Bloqué | CMR-LOI-2024-017::0048 |
| `compte.creer` | SF-009-03 | Autorisé (synthétique) | Bloqué | Autorisé | CMR-LOI-2024-017::0020 |
| `intervention.demander` | SF-008-06 | Autorisé | Autorisé (sans compte, référence de décision seulement) | Autorisé | CMR-LOI-2024-017::0044 |
| `journal.rejouer` | SF-007-12 | Autorisé (auditeur) | Autorisé avec `entrees_fournies_par_auditeur` | Idem | INT-UE-AI-ACT-2024-1689::0032 |
| `politique.simuler` | SF-007-13 | Autorisé (régulateur) | Autorisé | Autorisé | CMR-LOI-2024-017::0033 |

Une sous-fonctionnalité qui a besoin d'une action absente de ce tableau la propose dans son `design.md` (section « Décisions ») ; elle est ajoutée ici à l'approbation.

## 4. Catégories de données (vocabulaire fermé)
`symptomes_codes`, `tranche_age`, `duree_symptomes`, `position_arrondie`, `aire_sante`, `requete_specialite`, `requete_medicament`, `requete_sang`, `pseudonyme_compte`, `jeton_anonyme`, `signalement`, `contribution_agregee`, `donnees_individuelles_surveillance`, `donnee_genetique`, `donnee_biometrique`, `vie_sexuelle`, `origine`, `aucune_donnee_personnelle`.

## 5. Modes (SF-007-07)
Résolution au démarrage et à chaque rechargement de politique :
1. si la configuration de lancement demande `demo_synthetique` → `demo_synthetique` (données synthétiques seulement ; refus de démarrer si une source non synthétique est configurée) ;
2. sinon si `autorisation_prealable.traitement_donnees_personnelles.autorisation_apdp_obtenue` est vrai **et** `reference_autorisation` non vide → `complet` ;
3. sinon → `sans_donnees_personnelles`.

| Fonction | Démo | Sans DP | Complet |
|---|---|---|---|
| Triage sur l'appareil | Oui | Oui | Oui |
| Extraction LLM côté serveur | Oui (consentement) | Non | Oui (consentement) |
| Recherches spécialité, médicament, sang | Oui | Oui, sans compte | Oui |
| Comptes, signalements | Oui (synthétiques) | Non | Oui |
| Surveillance (contributions, signaux, console) | Oui | Non | Oui |
| Export agrégé | Maquette | Non | Si FR-715 respectée |
| Simulation « et si », A/B | Oui | Simulation seulement | Simulation seulement |

## 6. Événement d'audit (SF-007-09)

```json
{
  "event_id": "evt-<uuid4>",
  "horodatage": "2026-10-20T22:04:11+01:00",
  "session": "anonyme | hmac:<64 hex> | demo:<scenario>",
  "mode": "demo_synthetique",
  "agent": "conformite",
  "contributeurs": ["triage", "orchestrateur"],
  "action": "triage.extraction_llm",
  "entree_minimisee": {"categories": ["symptomes_codes"], "destination": "hors_cmr", "empreinte_entree": "sha256:<64 hex>", "entree": null},
  "fragments": ["CMR-LOI-2024-017::0033"],
  "politique": {"version": "1.3.0", "empreinte": "sha256:<64 hex>", "cles": ["transfert_hors_pays.autorise_donnees_personnelles"]},
  "regles": {"fichier": "rules/triage_signes_alerte.yaml", "version": "1.0.0"},
  "decision": "BLOQUE",
  "repli": "modele_local",
  "justification_code": "TRANSFERT_SANS_AUTORISATION",
  "validateur_humain": null,
  "hash_precedent": "sha256:<64 hex>",
  "hash": "sha256:<64 hex>"
}
```
- `entree` n'est rempli qu'en mode `demo_synthetique` (D-016).
- `hash` = SHA-256 de la sérialisation canonique de l'événement sans le champ `hash` (`json.dumps(…, sort_keys=True, separators=(",", ":"), ensure_ascii=False)`). Premier événement : `hash_precedent` = `sha256:` suivi de 64 zéros.
- Avant écriture, le contrôle des champs interdits (SF-007-10) parcourt récursivement l'événement ; une violation lève une erreur, l'événement n'est pas écrit et un événement `journal.violation_bloquee` sans contenu est écrit à la place.
- `validateur_humain` : `{"role": "point_focal" | "moderateur" | "agent_sante", "id": "jeton:<jeton_id>"}`.

## 7. Accès à la politique (SF-007-01)
```python
class Politique:
    version: str
    empreinte: str
    def valeur(self, chemin: str) -> Any          # "transfert_hors_pays.autorise_donnees_personnelles"
    def source(self, chemin: str) -> list[str]    # chunk_ids déclarés à côté de la clé
    def variante(self, changements: dict[str, Any]) -> "Politique"   # copie pour simulation, jamais écrite sur disque
```
Toute valeur juridique utilisée par le code est lue par `Politique.valeur` : un test parcourt le code et échoue s'il trouve une constante juridique codée en dur (liste dans SF-007-01).

## 8. Exécuteur de scénarios (propriétaire SF-012-03 ; utilisé par SF-007-12, SF-007-13, SF-007-14 et les tests d'acceptation)
```
python3 tools/scenarios/executer.py --scenario <id> [--politique <fichier_variante.yaml>] [--sans-gouvernance] [--sortie <rapport.json>]
```
- Entrée : `data/synthetic/scenario_<id>.jsonl`, une étape par ligne : `{"etape" ou "jour"/"heure", "destinataires", "evenement", "attendu", "appel": {"methode", "chemin", "entetes", "corps"}, "verifications": [{"champ", "operateur", "valeur"}]}` (les champs `appel` et `verifications` sont ajoutés aux fichiers existants par SF-012-03).
- Exécution : serveur en mode `demo_synthetique`, horloge `X-Horloge-Demo` fixée par l'étape, appels HTTP réels vers `127.0.0.1`.
- `--sans-gouvernance` : n'est accepté qu'en mode démo ; remplace l'agent Conformité par un agent qui autorise tout, **sans** désactiver le journal (FR-710).
- Sortie `rapport.json` : `{"scenario", "version_politique", "gouvernance": true|false, "etapes": [{"etape", "attendu", "obtenu", "conforme": bool, "ref_audit"}], "decisions": [{"action", "verdict", "fragments"}], "violations": [{"type", "etape", "detail"}]}`.
- Types de violation détectés (liste fermée, utilisée par SF-007-14) : `diagnostic_emis`, `prescription_ou_posologie`, `alternative_proposee`, `transfert_hors_pays`, `donnees_individuelles_transmises`, `baisse_non_gelee`, `recherche_sensible_journalisee`, `categorie_interdite_traitee`, `signal_sans_validation_humaine`.
