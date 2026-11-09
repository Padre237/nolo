# Modèle de données partagé

Version 1.0.0 · 2026-11-03 · Statut : UNDER_REVIEW

Règles :
- Une entité a **une seule** sous-fonctionnalité propriétaire (colonne « Propriétaire ») qui en définit les règles de création et de modification. Les autres la lisent.
- Une sous-fonctionnalité qui ajoute un champ le déclare dans son `design.md` (section « Modèle de données ») et cette page est mise à jour dans la même approbation.
- Horodatages : ISO 8601 avec décalage, fuseau Africa/Douala (`+01:00`) ; les données synthétiques existantes sans décalage sont lues comme heure locale de Douala (ADR-013).
- Aucun champ ne contient : nom de personne, téléphone de personne, position à plus de 2 décimales, texte libre de symptômes, langue, donnée génétique ou biométrique, requête révélant la vie sexuelle (`policy.yaml > journal_audit.champs_interdits`).

## 1. Stockage

| Lieu | Technologie | Contenu |
|---|---|---|
| Serveur | SQLite (`data/runtime/app.db`), bibliothèque standard | Référentiels, déclarations, signalements, signaux, décisions, comptes pseudonymes, jetons de rôle |
| Serveur | Fichier JSON Lines en ajout seul (`data/runtime/audit.jsonl`) | Journal d'audit (ADR-010) |
| Serveur | Fichiers versionnés | `config/policy.yaml`, `rules/*.yaml`, `kb/kb_chunks.jsonl` |
| Appareil | `localStorage` (clé `orientation.v1.*`) | Consentements, langue, tranche d'âge déclarée, statut mineur et consentement parental, identifiant de compte (D-011), tuiles en cache |

## 2. Entités serveur

### Etablissement — propriétaire SF-010-01
| Champ | Type | Contraintes |
|---|---|---|
| etab_id | texte | Clé ; motif `^(HOP|CLI|CSI|CTS|PH|PHH)-\d{2}$` dans les données synthétiques |
| nom | texte | Non vide |
| type | énuméré | `hopital`, `clinique`, `centre_de_sante`, `centre_transfusion`, `officine_agreee`, `pharmacie_hospitaliere` |
| lat, lon | réel | Position publique de l'établissement (pas une donnée personnelle) |
| aire_id | texte | Clé étrangère vers AireSante |
| ouvert_24h | booléen | |
| horaires | texte | `HH:MM-HH:MM` ou vide si `ouvert_24h` |
| telephone | texte | Téléphone de l'établissement (public) |
| agree | booléen | Agrément simulé (L9) |
| services | liste de codes | Codes de `rules/recherche_specialite.yaml > specialites` |
| service_statut | énuméré | `verifie`, `declare` |
| fictif | booléen | Toujours vrai dans le prototype |

### AireSante — propriétaire SF-010-01
`aire_id` (clé), `nom`, `district`, `population` (entier), `milieu` (`urbain`/`rural`), `frontaliere` (booléen, défaut faux ; ajout pour FR-209).

### Symptome (référentiel) — propriétaire SF-001-03
Fichier versionné `data/referentiels/symptomes.csv` (métadonnées et empreinte : `symptomes.meta.yaml`), lu par le client (liste fermée, moteur de triage) et par le serveur (extraction, surveillance). Colonnes : `code` (`SYM-NNN`, stable), `jeton` (unique), `libelle_fr`, `libelle_en`, `libelle_source`, `synonymes_fr`, `synonymes_en`, `domaine`, `public`, `observable_non_professionnel`, `affiche`, `usage`, `sensibilite`, `sources` (chunk_ids), `implique`, `snomed_gps_id` (vide, D-018), `statut`. Une entrée dont `sensibilite` commence par `exclu` n'est jamais affichée, indexée ni utilisée par une règle. Version 1.1.0 (D-024) : 110 entrées ; un code attribué ne change jamais (nouvelles entrées en fin de fichier, versions précédentes dans `data/referentiels/historique/`) ; une expression normalisée ne renvoie qu'à un jeton. Liste fermée et extracteur : SF-001-03 (FR-121, FR-122).

### Medicament — propriétaire SF-004-01
`dci` (clé, minuscules, `_` comme séparateur), `classe`, `classe_sensible` (booléen), `revele_vie_sexuelle` (booléen, déduit de `policy.yaml > donnees_sensibles.revele_vie_sexuelle.recherches`), `delivre_sur_ordonnance` (booléen), `exclu_art75` (booléen), `noms_commerciaux` (liste ; fictifs dans le prototype, D-015).

### DeclarationStockMedicament — propriétaire SF-010-02
`declaration_id` (clé), `etab_id`, `dci`, `disponible` (booléen), `declare_le` (horodatage fourni par l'établissement), `recu_le` (horodatage serveur), `declarant` (identifiant du jeton de rôle). Fraîcheur et expiration : FR-402.

### NiveauSang — propriétaire SF-010-03
`declaration_id`, `etab_id`, `groupe` (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`), `niveau` (`disponible`, `faible`, `rupture`), `declare_le`, `recu_le`, `declarant`. Jamais de quantité (FR-502).

### Signalement — propriétaire SF-006-01
| Champ | Type | Contraintes |
|---|---|---|
| report_id | texte | Clé |
| pseudo_compte | texte ou nul | HMAC du compte (ADR-011) ; **nul** pour une classe sensible (FR-609) |
| jeton_anonyme | texte ou nul | Utilisé à la place du pseudonyme pour une classe sensible |
| etab_id | texte | |
| dci | texte ou nul | **Nul** pour une classe sensible |
| resultat | énuméré | `trouve`, `introuvable_absent_du_stock`, `non_delivre_ordonnance_manquante`, `non_delivre_autre_raison` |
| horodatage | horodatage | |
| age_compte_jours | entier | Calculé à la réception |
| age_declaration_h | entier | Âge de la déclaration visée au moment du signalement |
| exclu | booléen | Vrai si exclu par une décision de modération |

### Gel — propriétaire SF-006-04
`gel_id`, `etab_id`, `debut`, `nb_negatifs_3h`, `score_gele`, `statut` (`actif`, `leve_fonde`, `leve_infonde`), `decision_id`.

### ApplicationProgressive — propriétaire SF-006-05
`gel_id`, `etab_id`, `ecart_points`, `debut`, `jours` (défaut 7, D-003), `parts_appliquees`.

### Contestation — propriétaire SF-006-06
`contestation_id`, `etab_id`, `objet_type` (`baisse`, `signalement`), `objet_ids`, `deposee_le`, `motif`, `statut` (`recue`, `hors_delai`, `en_instruction`, `acceptee`, `rejetee`), `echeance_reponse`, `decision_id`.

### DecisionModeration — propriétaire SF-006-05 (rafales) et SF-006-06 (contestations)
`decision_id`, `objet_type`, `objet_id`, `moderateur` (identifiant de jeton), `verdict`, `motif` (obligatoire), `decide_le`.

### CompteCitoyen — propriétaire SF-009-03
`pseudo_compte` (clé, HMAC), `cree_le`, `statut` (`actif`, `suspendu`). Aucune autre donnée.

### JetonRole — propriétaire SF-009-02
`jeton_id`, `empreinte_jeton` (SHA-256, jamais le jeton en clair), `role`, `entite_id` (établissement, district), `actif`, `cree_le`.

### ContributionSurveillance — propriétaire SF-002-01
`contribution_id`, `jeton_dedup` (HMAC, conservé 7 jours), `aire_id`, `semaine_epi`, `syndromes` (codes), `tranche_age`, `recu_le`. Purgée après agrégation et 7 jours.

### SerieHebdo — propriétaire SF-002-02
`aire_id`, `semaine_epi`, `syndrome`, `cas` (entier ≥ 0). Clé composite.

### Signal — propriétaire SF-002-03 (création) et SF-002-04 (validation)
`signal_id`, `aire_id`, `syndrome`, `definition_sc` (SC1–SC8 ou `hors_definition`), `semaine_debut`, `semaine_fin`, `effectif`, `score`, `statut` (`a_verifier`, `confirme`, `rejete`), `cree_le`, `echeance_triage`, `echeance_evaluation`, `valide_par`, `valide_le`, `motif`, `frontalier`.

### DecisionRSI — propriétaire SF-002-06
`signal_id`, `reponses_annexe2` (4 booléens), `decision` (`notifier_point_focal_national`, `ne_pas_notifier`, `en_attente`), `decide_par`, `decide_le`.

### DemandeDonnees — propriétaire SF-002-07
`demande_id`, `demandeur_role`, `objet`, `decision_conformite_ref`, `position_district`, `position_apdp`, `statut` (`refusee`, `agregat_propose`).

### DemandeInterventionHumaine — propriétaire SF-008-06
`demande_id`, `motif` (`intervention`, `point_de_vue`, `contestation`), `ref_decision` (référence d'audit de la décision visée), `cree_le`, `statut` (`recue`, `prise_en_charge`, `close`). Aucun texte libre de symptômes.

### VersionPolitique — propriétaire SF-007-01
`version`, `empreinte_sha256`, `chargee_le`, `source` (`config/policy.yaml` ou fichier de simulation).

### RapportSimulation — propriétaire SF-007-13 ; RapportAB — propriétaire SF-007-14
`run_id`, `version_base`, `variante` (différences de clés), `scenarios`, `decisions_changees`, `cree_le`.

## 3. Données de l'appareil

| Clé `localStorage` | Contenu | Propriétaire |
|---|---|---|
| `orientation.v1.consentements` | `{orientation, surveillance, geolocalisation}` → `{accorde: bool, le: horodatage, version_texte}` | SF-008-01, SF-008-02, SF-008-03 |
| `orientation.v1.mineur` | `{declare_mineur: bool, consentement_parental: bool, le}` | SF-008-04 |
| `orientation.v1.langue` | `fr` ou `en` | SF-013-02 |
| `orientation.v1.compte` | Identifiant aléatoire (D-011) | SF-009-03 |
| `orientation.v1.tuiles.<district>` | Tuile et date de téléchargement | SF-003-03, SF-004-04 |
| `orientation.v1.regles` | Référentiel de règles exporté et sa version | SF-001-04 |

## 4. Énumérations partagées
- Niveaux d'urgence (FR-104) : `urgence`, `consultation_24h`, `consultation_48h`, `soins_courants`.
- Tranches d'âge (D-023, proposé) : `moins_8_jours`, `8_jours_2_mois`, `2_6_mois`, `6_mois_2_ans`, `2_5_ans`, `5_11_ans`, `12_17_ans`, `18_50_ans`, `51_70_ans`, `plus_70_ans`. Elles restent sur l'appareil ; la surveillance ne reçoit qu'une tranche agrégée (`moins_5_ans`, `5_17_ans`, `18_plus`), à préciser dans SF-002-01.
- Rôles : voir SF-009-01.
- Modes : `demo_synthetique`, `sans_donnees_personnelles`, `complet`.
