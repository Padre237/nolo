# SF-001-03 — Codage des symptômes par le référentiel interne — Conception

| Champ | Valeur |
|---|---|
| Sous-fonctionnalité | SF-001-03 |
| Version | 1.0.0 |
| Statut | UNDER_REVIEW |
| Exigences couvertes | FR-120 à FR-127, NFR-101, NFR-102 |
| ADR | ADR-003 (client PWA), ADR-005 (triage sur l'appareil), ADR-006 (LLM local optionnel), ADR-008 (politique codée) |

## 1. Comportement fonctionnel et workflow
1. Au démarrage, `referentiel.js` charge le CSV embarqué et ses métadonnées, recalcule l'empreinte SHA-256 (Web Crypto) et valide le contenu (FR-124).
2. Quand SF-001-04 sert un paquet plus récent (règles, référentiel, métadonnées), le référentiel n'est adopté qu'après validation ; sinon la version embarquée reste active.
3. L'écran de saisie (SF-001-01) appelle `listeFermee(ref, regles, tranche)` (FR-121) ; les entrées sont groupées par `domaine` et affichées par `libelle_fr` ou `libelle_en` selon la langue de l'appareil.
4. Le texte libre, déjà nettoyé par SF-001-02, passe par `extraire(texte, index)` (FR-122) ; les jetons reconnus apparaissent en puces (libellé de l'entrée) que la personne peut retirer.
5. Si la personne est majeure (ou a le consentement parental), a donné le consentement exprès d'orientation, et si le mode le permet, l'appareil peut soumettre le texte nettoyé à `POST /api/v1/orientation/extraction` ; les jetons renvoyés s'ajoutent aux puces (FR-126).
6. `fermer(jetons, ref)` applique la fermeture transitive de `implique` (FR-123) ; le résultat, avec la tranche et la durée déclarées, va au moteur (SF-001-07).

## 2. Interactions utilisateur et états de l'interface
| État | Déclencheur | Affichage (codes i18n) | Actions possibles |
|---|---|---|---|
| Liste prête | Référentiel valide | `SAISIE_LISTE_TITRE` ; entrées groupées par domaine | Cocher, décocher, écrire un texte |
| Texte reconnu | Extraction terminée | Puces des jetons reconnus (avant fermeture) ; `SAISIE_NON_RECONNU` avec le nombre `non_code` s'il est positif, invitant à compléter avec la liste | Retirer une puce ; compléter avec la liste |
| Analyse simplifiée | LLM indisponible, refusé ou trop lent | `EXTRACTION_SIMPLIFIEE` | Continuer |
| Référentiel invalide | Échec de validation d'une mise à jour | Aucun changement visible ; liste embarquée | Continuer |

## 3. Composants et responsabilités
| Composant | Fichier (cible) | Responsabilité |
|---|---|---|
| Chargement, validation, liste fermée, fermeture | `src/client/ondevice/referentiel.js` | Lecture CSV, empreinte, contrôles FR-124, `listeFermee`, `fermer` |
| Extracteur lexical | `src/client/ondevice/extracteur_lexical.js` | Normalisation, index des expressions, union des correspondances, `non_code` |
| Validation serveur | `src/server/domain/referentiel_symptomes.py` | Contrôles FR-124, présence des `sources` dans `kb/kb_chunks.jsonl`, filtre des propositions |
| Agent Triage (extraction) | `src/server/agents/triage.py` | Appel Ollama local (option), filtre, comptage des refus |
| Route d'extraction | `src/server/api/orientation.py`, `src/server/api/schemas/orientation.py` | `POST /api/v1/orientation/extraction` |
| Génération et contrôle des données (existants) | `tools/donnees/generer_referentiel_symptomes.py`, `tools/donnees/verifier_regles_triage_v2.py` | Régénération reproductible ; contrôles de référence (hors produit) |

## 4. Modèle de données
Entité `Symptome` (`docs/architecture/shared/data-model.md`), fichier `data/referentiels/symptomes.csv`, version 1.1.0 : 110 entrées, dont 88 affichées, 12 non observables ou mesurées avec un appareil, 2 exclues, 8 internes non affichées (atteintes par implication ou par le texte libre : `souffle_court`, `confusion_somnolence_agitation`, `saignements`, `incapacite_teter`, `douleur_thoracique`, `traumatisme_haut_risque`, `exposition_prophylaxie`, `diarrhee_avec_sang`). Jeu de référence de l'extracteur : `data/referentiels/phrases_extraction_reference.json` (42 phrases). Aucun champ ajouté au modèle partagé.

## 5. Contrats d'interface
### 5.1 API
`POST /api/v1/orientation/extraction` — rôle : citoyen (anonyme ou compte) — action de conformité : `triage.extraction_llm` (destination `serveur_cmr`) — en-têtes : `X-Consentements` (orientation=1 requis).
Requête (aucun autre champ accepté ; la tranche d'âge n'est jamais envoyée, D-023) :
```json
{"texte": "mal à la poitrine depuis ce soir", "version_referentiel": "1.1.0"}
```
Réponse 200 :
```json
{"donnees": {"jetons": ["douleur_thoracique"], "refuses": 0}, "meta": {"mode": "demo_synthetique", "version_politique": "1.3.0", "ref_audit": "evt-…"}}
```
Erreurs : E-VAL-001, E-VAL-004, E-VAL-005, E-CONF-001, E-CONF-003, E-MODE-001, E-INDISP-001. L'événement d'audit contient l'empreinte du texte et le nombre de refus, jamais le texte ni les jetons refusés.
### 5.2 Interfaces internes
```js
// src/client/ondevice/referentiel.js
export async function chargerReferentiel(csvTexte, meta)   // -> {version, entrees: Map<jeton, Entree>} ; lève ErreurReferentiel
export function listeFermee(ref, regles, tranche)          // -> Entree[] triées par domaine puis libellé
export function fermer(jetons, ref)                        // -> Set<string>
// src/client/ondevice/extracteur_lexical.js
export function construireIndex(ref)                       // -> Map<expressionNormalisee, jeton>
export function extraire(texte, index)                     // -> {jetons: string[] (triés), non_code: number}
export function normaliser(texte)                          // -> string
```
```python
# src/server/domain/referentiel_symptomes.py
def valider_referentiel(csv: Path, meta: Path, kb: Path) -> list[str]            # erreurs ; vide si valide
def filtrer_propositions(jetons: list[str], ref: dict) -> tuple[list[str], int]  # (jetons gardés triés, nombre de refus)
```

## 6. Transitions d'état et logique métier
- **Normalisation** (texte et expressions, identique côté appareil, serveur et outillage `norm_expr`) : décomposition NFD et retrait des diacritiques ; minuscules ; tout caractère autre qu'une lettre ou un chiffre, apostrophes comprises, remplacé par une espace ; espaces réduites ; « s » ou « x » final retiré des mots de 4 lettres ou plus (pluriels : « convulsions » → « convulsion »).
- **Index** : libellés et synonymes FR et EN des entrées utilisables (non exclues, `observable_non_professionnel = oui`) ; une expression normalisée ne renvoie qu'à un jeton (contrôle bloquant du générateur et de FR-124).
- **Correspondance** : une expression est reconnue si elle apparaît dans le texte normalisé entre deux limites de mots ; le résultat est l'union des jetons de toutes les expressions reconnues, sans exclusivité. Ce choix est prudent : avec des règles monotones (ADR-005), un jeton de plus ne peut que relever le niveau ; les mots trop généraux qui déclenchaient une urgence hors contexte ont été retirés des synonymes (D-024).
- **`non_code`** : nombre de segments (séparés par `. , ; : ! ?` ou un retour à la ligne) qui ne contiennent à eux seuls aucune expression reconnue et contiennent au moins un mot de 4 lettres ou plus (avant retrait du pluriel). Seul ce nombre est conservé.
- **Liste fermée** (FR-121) : public → tranches (`tous` : toutes ; `nourrisson` : `moins_8_jours`, `8_jours_2_mois` ; `enfant` : de `moins_8_jours` à `5_11_ans` ; `adulte` : de `12_17_ans` à `plus_70_ans`), complété par les jetons affichables qui figurent, directement ou via un composite, dans une règle applicable à la tranche. Avec les données 1.1.0 : 77 à 79 entrées selon la tranche.
- **Fermeture** : point fixe sur `implique` ; terminaison garantie (ensemble fini de jetons).

## 7. Autorisation et sécurité
- Le texte libre ne quitte l'appareil que nettoyé (SF-001-02), avec consentement exprès, sans la tranche d'âge, et seulement vers un hôte au Cameroun (contrôle de transfert FR-705 par Conformité).
- Les jetons `sante_avis_juriste` ne sont jamais renvoyés par le serveur ni journalisés (D-022).
- Aucune journalisation du texte ni des jetons refusés ; seulement leur nombre.
- Les entrées exclues ne figurent dans aucun index ni dans aucune liste.

## 8. Intégrations externes
- Ollama local (optionnel, ADR-006). Aucune autre.

## 9. Gestion des défaillances et reprise
| Défaillance | Comportement | Journal |
|---|---|---|
| Référentiel téléchargé invalide | Version embarquée conservée | Événement technique sans contenu |
| LLM indisponible ou plus lent que `llm.delai_extraction_ms` [PROPOSITION : 3 000 ms] | Extraction lexicale seule ; `EXTRACTION_SIMPLIFIEE` | `E-INDISP-001` |
| Jeton refusé proposé par le LLM | Non renvoyé | Nombre de refus |

## 10. Performance, passage à l'échelle, accessibilité
- Index (525 expressions en 1.1.0) construit une fois au chargement ; recherche linéaire dans la taille de l'index pour un texte de 500 caractères au plus (NFR-101). CSV de 35,6 Kio (NFR-102).
- Liste fermée : cases à cocher utilisables au clavier et au lecteur d'écran (exigences d'accessibilité de F-013).

## 11. Décisions
- ADR appliquées : ADR-003, ADR-005, ADR-006, ADR-008.
- Décisions : D-018, D-020, D-022, D-023, D-024.
- À formaliser (propositions de modification des documents partagés, README de F-001) : la route `GET /api/v1/regles/triage` (SF-001-04) sert aussi le référentiel, ses métadonnées et le jeu de règles dans un paquet unique versionné ; nouvelle clé `policy.yaml > llm.delai_extraction_ms`.

## 12. Éléments de conception et couverture
| ID | Élément | Exigences couvertes |
|---|---|---|
| DES-001-03-01 | Fichier `symptomes.csv` et métadonnées versionnées (codes stables, colonne SNOMED vide) | FR-120, FR-125, NFR-102 |
| DES-001-03-02 | `listeFermee` : correspondance public → tranches complétée par les jetons des règles applicables | FR-121 |
| DES-001-03-03 | Extracteur lexical : normalisation, index univoque, union des correspondances, `non_code` | FR-122, NFR-101 |
| DES-001-03-04 | Fermeture transitive `fermer` | FR-123 |
| DES-001-03-05 | Validation client et serveur, repli sur la version embarquée | FR-124 |
| DES-001-03-06 | Filtre des propositions du LLM et route d'extraction | FR-126 |
| DES-001-03-07 | Outillage de génération et de contrôle reproductible | FR-127 |

## 13. Existant et écarts
| Élément existant | Fichier | État | Preuve | Correction |
|---|---|---|---|---|
| Référentiel 1.1.0, métadonnées, jeu de phrases, générateur, vérificateur | `data/referentiels/`, `tools/donnees/` | Données générées et contrôlées le 2026-11-04 (aucun code produit) | `docs/quality/preuve-2026-11-04-generation-donnees.txt` | — |
| Référentiel 1.0.0 | (remplacé) | Écart corrigé par 1.1.0 : 4 expressions ambiguës, mots généraux déclenchant une urgence hors contexte (« bleu », « contractions »…), signe `confusion_somnolence_agitation` inaccessible, « diarrhée avec du sang » sans effet sur PCIME-J-02 | Contrôle de mutation consigné dans la preuve (1 scénario KO, 4 jetons inaccessibles, 28/42 phrases) | D-024 |
| Jetons des règles existantes | `kb/rules/triage_signes_alerte.yaml` (`perte_de_conscience`, `difficulte_respiratoire_severe`) | Écart : jetons absents du référentiel ; fichier remplacé par la version 2 | Vérificateur, section 7 | Remplacement par SF-001-04 |
| Jetons des données synthétiques et des définitions SBC | `kb/data/synthetic/patients.csv` (18 jetons), `kb/rules/sbc_definitions.yaml` (24 jetons de symptômes) | Conforme : tous présents (les valeurs `evenement` comme `deces` ne sont pas des symptômes) | Vérificateur, section 7 | — |
| Code client et serveur | — | Absent | — | TASK-001-03-01 à 07 |
