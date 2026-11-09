# AI for Good Sandbox Hackathon – CENADI EQUIPE 2 – Nolo

**Team leader:** [to be completed] · **Team members:** [to be completed] · **Contact details:** [to be completed]
**GitHub link:** https://github.com/Padre237/nolo · **Demo video:** [to be added]

> **Demonstration prototype.** Nolo is not a medical device: it does not diagnose, prescribe or name a dose. Every facility, stock, account and surveillance series is synthetic, and facility phone calls are disabled. The ministry console is a Nolo-branded demonstration, not affiliated with any ministry. Every figure below comes from a dated execution proof in `docs/quality/` (9 November 2026). Every function carries the status recorded in its specification folder: Implemented, Partly implemented, Planned or Demo only.

## 1. Introduction

In Cameroon, the first health decision is usually taken at home, without guidance. **Nolo** ("health" in Duala) is a progressive web app, in French and English of equal value. It helps a person describe what they feel, be alerted when a danger sign appears, and find the right facility, specialty, medicine in stock or compatible blood. It also gives health facilities and the health authority a lawful, aggregated view of demand and of early community signals.

Every action on personal data is decided by agents governed by Cameroonian law. A **Compliance agent** and an **orchestrator** read the state of the law from one versioned file (`config/policy.yaml`), cite the legal fragment behind each verdict, and write every decision to a SHA-256-chained audit log. The law thus becomes executable, testable and simulable: a regulator can switch one parameter ("what if the decree were published?") and replay a scenario.

This submission maps the solution to the ITU-T Y.3172 pipeline nodes and to the AI Readiness 2.0 dimensions rather than presenting a stand-alone app. The knowledge base holds **2,034 fragments from 21 documents** (11 Cameroonian texts, 10 international references). Its mapping file links 48 key articles to the pipeline node they govern and to the agent that applies them. A 22nd source, a 2014 WHO-AFRO guide marked "all rights reserved", is kept as a metadata record only: its fragments are withheld from the public repository.

## 2. Description of the use case

**Problem and gaps in existing solutions.** People rely on relatives, phone lines and community health workers. Community-based surveillance follows a paper procedure: the 2023 MINSANTE guide foresees no digital channel and no data-protection clause (gap L6). General chatbots diagnose or name medicines, which the law reserves to physicians and pharmacists (L5). There is no open registry of licensed pharmacies and no stock format (L9). The personal-data law is strict, and its implementing texts are missing. Law 2024/017 art. 19 subjects any processing to prior authorization by the data-protection authority (APDP), which is not yet operational (L12). Art. 48 forbids processing sexual-life, genetic and health-biometric data, with no derogation (L11).

**How Nolo addresses them.** No diagnosis outside the experimental module. Searches that could reveal sexual life run on the phone. Facilities are ranked by public criteria, and no pharmacy pays. Surveillance publishes aggregates only, after human validation. Three run modes (`demo_synthetique`, `sans_donnees_personnelles`, `complet`) let the system run today on synthetic data, without waiting for the missing texts. The `complet` mode requires an APDP authorization reference.

**What the citizen sees (decision D-026).** Outside the experimental module, the only level Nolo shows is the **emergency alert**: there are no other urgency levels. The person writes what they feel. Nolo restates the signs it recognised (present, said absent, not recognised) and asks closed safety questions. When a danger sign appears, it raises the emergency alert with the emergency numbers. It then points to a suitable facility with the reason for the choice, and prepares a summary to show the clinician.

| Function | Status | Spec |
|---|---|---|
| "Describe what I feel": bilingual restatement, negation | Implemented | SF-001-13 |
| Closed safety questions and emergency alert | Implemented | SF-001-14 |
| "Where to go": suitable facility with the reason | Implemented | SF-001-10 |
| Summary to show the clinician | Implemented | SF-001-18 |
| Output filter: no medicine, dose or alternative | Implemented | SF-001-11 |
| Experimental leads (POC): at most three, with score and source | Demo only | SF-001-15 |
| DDXPlus model on the device, parity and evaluation | Planned | SF-001-19 |
| Specialty, medicine and blood search; sensitive searches on the device | Implemented | SF-003-02, SF-003-03, SF-004-02, SF-004-04, SF-005-01 |
| Facility registration, profile and stock import | Implemented | SF-010-04, SF-010-06, SF-010-02 |
| Demand trends with small-count suppression | Implemented | SF-014-01, SF-014-03 |
| Ministry console: symptom map, licences, policy what-if, gap register | Implemented | SF-002-12, SF-015-02, SF-015-05, SF-015-06 |
| Policy, orchestrator and Compliance agent with four verdicts (Python reference) | Implemented | SF-007-01, SF-007-02, SF-007-03 |
| SHA-256-chained audit log (Python reference) | Implemented | SF-007-09 |
| What-if simulation; comparison with and without governance (Python) | Implemented | SF-007-13, SF-007-14 |
| Scenarios S1 to S3 and their runner | Implemented | SF-012-03 |
| Knowledge-base retrieval (BM25; ChromaDB not measured) | Partly implemented | SF-011-03 |
| Agents and chained log inside the app; "How Nolo decided" panel | Implemented | SF-007-17, SF-007-21, SF-007-18 |
| Rights adviser "Mes droits santé" (extractive, cited answers) | Implemented | SF-016-01, SF-016-02 |
| Pharmacy reliability score from user reports (synthetic reports) | Implemented | SF-006-02 |
| Public epidemiological map | Planned | SF-002-08 |

The four verdicts are `AUTORISE`, `AUTORISE_AVEC_CONDITIONS` and `BLOQUE`, which cite their legal fragment, and `BLOQUE_SANS_FONDEMENT`, which blocks an action that is outside the catalogue or has no legal basis to cite. The on-device triage engine v1 (75 PCIME and IITT rules, 110-sign closed vocabulary) is parity-tested against Python and now runs inside the app, for the emergency alert only: any danger sign found by it or by the safety questions raises the alert, and its package is refused if its fingerprint changed.

## 3. Use case requirement

- **SRC (data sources).** The person provides free text (FR or EN), closed answers and an age band. Facilities provide their profile and stocks (CSV import). Required: three separate, unticked consents (orientation, surveillance, reports; D-028), parental agreement under 18, and no Article 48 category ever collected. The demo uses synthetic data only.
- **C (collection and transport).** The app works offline (service worker) and loads no external CDN or font. No transfer abroad without authorization (art. 32): the policy blocks it.
- **PP (pre-processing).** Forbidden mentions are removed on the device before anything is sent (Partly implemented, SF-001-02). Positions are rounded to two decimals, and pseudonyms use HMAC. A search for a sensitive class (e.g. antiretrovirals) runs on a downloaded district tile: the server never receives the query, and it is never counted.
- **M (models).** Deterministic triage rules from WHO IMCI and IITT: 75 rules and 5 composite rules, each with its source text found word for word in its fragment. The rules are monotone: 0 violation in 5,000 random draws. 390/390 witness cases pass. Surveillance uses a one-sided CUSUM per area and syndrome. Retrieval uses BM25: the expected document is in the top 5 for 33/40 questions, and the exact article for 29/40. No language model takes a decision.
- **P (policy).** The Compliance agent evaluates every request before any agent touches personal data. It checks, in order: mode, consent, profiling, destination, then the rules specific to the action. The first blocking rule wins. A district focal point must validate a signal before it is acted on.
- **D (distribution).** Aggregates only: a count below 5 is never published, counts are rounded to 5, and only complete weeks are shown. Sensitive searches are never counted. The aggregated export follows a DHIS2-compatible mock format.
- **SINK (users).** The citizen gets the alert, a facility and a summary. A facility sees its profile, stocks and demand trends. The ministry console shows the map, licences, supply and demand, the policy and the gaps. Everyone keeps the right to human intervention (art. 44).

## 4. Mapping with ITU-T Y.3172, the AI Readiness 2.0 Report and domain-specific policies

| Node | Use case (Nolo) | Readiness 2.0 Report | Documents in the knowledge base (cited fragments) |
|---|---|---|---|
| SRC | Citizen text and closed answers; facility profiles and stocks; community reports | Data and model marketplace; contextualisation (FR/EN); inclusion (limit: smartphone users) | Law 2024/017 art. 9 (consent, minors); Law 2019/019 art. 5 and 24 (two official languages); Law 90/035 art. 28, 35, 52 (pharmacies); SBC guide 2023 (detection by any community member) |
| C | PWA on the phone, offline; reference server (Python, Starlette) | Digital infrastructure; level of integration | Law 2010/013 (electronic communications); Law 2010/012 art. 29 (connection data); Law 2019/019 art. 2–4 |
| PP | On-device removal of forbidden mentions; rounding; HMAC pseudonyms; on-device sensitive search | Data harmonisation; privacy | Law 2024/017 art. 5 and 48; IHR (2005) art. 45 (confidentiality); SNOMED CT GPS licence terms |
| M | Deterministic triage rules; CUSUM; BM25 retrieval | Trustworthiness of the model; benchmarking (witness cases, retrieval evaluation) | WHO IMCI manual ch. 6; IITT triage tool; SBC guide table 3 (signals SC1–SC8); WHO guidance on large multimodal models (2024); EU AI Act art. 6 and Annex III (triage as high risk, reference) |
| P | Compliance agent and orchestrator; `policy.yaml`; human validation | AI policy; strategy alignment (MINSANTE, MINPOSTEL, APDP); human in the loop, overriding conditions | Law 2024/017 art. 19, 32, 33, 44, 48, 65–66, 72; Law 2010/012 art. 74; GDPR art. 9, 22, 35 and EU AI Act art. 14 (international references) |
| D | Aggregates with threshold 5; DHIS2-compatible export mock; chained audit log | Cross-domain analysis (health and telecoms); energy: rules and BM25 run without a GPU, a local LLM is optional | National digital health strategy 2026–2030 (data sovereignty); IHR art. 6 and Annex 2; IDSR technical guide |
| SINK | Citizen, facility, ministry console | Human interface; collaboration with AI; human impact | Law 2024/017 art. 44 (human intervention); Law 90/036 art. 16 (illegal practice of medicine); EU AI Act art. 12 (logs) and 50 (transparency); WHO ethics guidance (2021) |

GDPR and the EU AI Act are cited as international references, not as applicable law.

## 5. Error scenarios

Each scenario runs twice. The second run replaces the Compliance agent with an agent that allows everything, while the audit log stays active.

| Scenario | With governance | Without governance |
|---|---|---|
| **S1. Night emergency.** A 58-year-old with no orientation consent writes "sudden chest pain". | Emergency, immediate priority (rule IITT12-R-12, fragment cited). 0 server event: the text never left the phone. 3 emergency facilities listed. Numbers 119, 112, 1510 shown; 111 is withheld while its status is "to be confirmed". | Same result: triage stays on the device, so there is nothing to counter-demonstrate (exit code 1 by construction, question Q-007-14-01). |
| **S2. Sensitive medicine.** A search for an antiretroviral, then a "not found" report. | The server returns `BLOQUE` (art. 48) and falls back to the device. The district tile is downloaded without the query. 1 licensed pharmacy within 5 km, marked "Dispensed on prescription". The report gets `AUTORISE_AVEC_CONDITIONS`: medicine name and pseudonym removed. | **2 violations.** The medicine name enters the audit log, and a forbidden category is processed. |
| **S3. Cluster, days 1–4.** Fever with rash in area AS-07; the district asks for the nominative list and exact GPS positions. | Signal SC1 at 3 cases; the public map stays empty (below 5). The focal point validates the signal. The nominative request gets `BLOQUE` (Law 2024/017 art. 9, IHR art. 45), and only aggregates are sent. The export records the human validation. 25 chained events. | **2 violations.** 12 individual rows with precise positions go to the district, and a signal is published without human validation. |

**What-if (a scenario added by the judges).** A new scenario needs no new code. A variant file changes policy parameters in memory, and the runner replays the scenario and lists the differences from the reference policy. Two variants were run:

- **"What if a framed derogation to art. 48 existed for health?" (on S2).** The antiretroviral search becomes `AUTORISE_AVEC_CONDITIONS` on the server. The runner still flags 1 violation (a forbidden category is processed) and lists 2 differences. The regulator sees what such a text would open up.
- **"What if the APDP authorization (art. 19) were obtained?" (on S3).** Every step stays compliant, and the nominative list stays blocked: consent (art. 9) and IHR confidentiality (art. 45) still apply.

**Controversies and how Nolo handles them.**

- **A missed emergency.** The rules are deterministic and sourced, and every rule has witness cases. The emergency bar stays visible. The labels and level mappings still await clinical validation (point V7).
- **Experimental diagnosis.** The POC module is a **governed proof of concept**. It shows at most three experimental leads, each with its score and source, never called a diagnosis, and hides them when an emergency appears. A lead that touches Article 48 gets a neutral message, and an out-of-scope case is detected. Three gaps frame it. **L5:** Law 90/036 art. 16 makes diagnosis by an unqualified person illegal practice of medicine, and no text qualifies software, so leads exist in demo mode only. **L15:** there is no open clinical data in Cameroon; the DDXPlus dataset (CC-BY, synthetic, respiratory complaints only) is chosen but not yet used, and the app uses a demonstration table. **L16:** the law does not say whether a computation that runs only on the phone is processing the publisher is responsible for; nothing leaves the device or is logged. Known deviation: the module does not yet read the run mode.
- **Commercial pressure.** This is the template's in-app-purchase example. No pharmacy pays, the ranking uses a public formula, and there is no sponsor field. Nolo never names a medicine dose, an alternative or a promotion (L8, Law 90/035 art. 19).
- **Surveillance misuse.** A request for names is blocked. When a rumour spreads, the system communicates nothing and refers to the district's official communication.

## 6. Policy gaps and standards gaps

The register in `docs/compliance/registre-lacunes.md` lists **16 gaps (L1 to L16)**. Each gap is linked to the legal fragment, the safeguard, the requirement and a `policy.yaml` parameter that the regulator can switch and simulate. The prototype always chooses the most protective option while the texts are missing. "Hyp" marks a missing text that remains to be confirmed with MINSANTE, MINPOSTEL or the APDP.

| ID | Gap | Safeguard in the prototype | `policy.yaml` parameter |
|---|---|---|---|
| L1 | Profiling allowed under conditions (art. 44) but penalised (art. 65) | No individual profile; aggregates only | `decision_automatisee.profilage.autorise: false` |
| L2 | No health-sector text (art. 72) (Hyp) | Strictest rules by default | `texte_sectoriel_sante_publie` |
| L3 | Transfer (art. 32) and impact-assessment (art. 33) decrees missing; APDP not operational (Hyp) | Local processing; voluntary impact assessment | `decret_transfert_publie`, `apdp_operationnelle` |
| L4 | No framework for sharing from an app to IDSR (Hyp) | Separate consent; aggregates; focal-point validation | `cadre_partage_app_simr` |
| L5 | No framework for orientation software; diagnosis by an unqualified person is illegal (Law 90/036 art. 16) (Hyp) | No level except emergency; leads only in a governed demo module | `llm.usage_interdit`, `diagnostic_poc.*` (proposed) |
| L6 | SBC guide 2023: no digital channel, no data-protection clause | Signal treated as a "rumour to verify" in the SBC circuit | `surveillance.validation_humaine_obligatoire` |
| L7 | **Standards:** Y.3172 has no consent or purpose node and no per-agent compliance control; AI Readiness 2.0 has no accountability between agents | Node P instantiated by the Compliance agent; the log records which agent decided | recommendation |
| L8 | Advertising conditions (art. 19) unpublished (Hyp) | Commercial neutrality; public formula; no sponsor field | `conditions_publicite_art19_publiees` |
| L9 | No open registry of licensed pharmacies, no stock format (Hyp) | Simulated licence list; proposed format; freshness shown | `registre_ouvert_pharmacies` |
| L10 | No text on public rating of health facilities (Hyp) | Smoothed score, freeze on bursts, contest, human moderation (score and freeze shown in the app) | `notation_etablissements.*` |
| L11 | Art. 48 ban with no derogation, even for public health | Never collected; revealing searches on the device | `donnees_sensibles.categories_interdites_art48` |
| L12 | Art. 19 prior authorization of any processing; authority not operational | Synthetic demo; "no personal data" production mode | `autorisation_prealable.*` |
| L13 | IITT lists sexual assault as a triage criterion, which art. 48 forbids processing | Criterion never asked nor processed | `donnees_sensibles.categories_interdites_art48` |
| L14 | Laws in French only (except Law 2019/019), although both language versions are authentic | 20 unofficial English translations, marked as such; 8 official English fragments linked | `langues.textes_de_loi` |
| L15 | No open clinical data; national facility nomenclature missing (Hyp) | Demonstration table marked "to validate"; synthetic DDXPlus planned | `diagnostic_poc.*` (proposed) |
| L16 | Is on-device-only computation a processing for which the publisher is responsible? (Hyp) | Nothing leaves the device; nothing is logged | `diagnostic_poc.transmission_serveur: false` (proposed) |

**Recommendations.**

- Framed derogations for public health and care, on the model of GDPR art. 9(2).
- A risk-proportionate authorization regime with a fast track for regulatory sandboxes.
- Open, anonymised IDSR and DHIS2 data and an open health-facility map.
- Laws published in both official languages, in an open format.
- For the standards: a consent and purpose node, and accountability between agents, in Y.3172 and AI Readiness 2.0.

## 7. Reproducibility

The app needs no build step. Python 3 and Node 22 run every check (`README.md`).

| Check | Result | Proof |
|---|---|---|
| `python3 -m pytest` (governance, scenarios, facility service, publication and report checks) | 125 passed | `preuve-2026-11-09-vague-c2.txt` |
| Node: on-device engine, PCIME/IITT acceptance, catalogues; Nolo app | 28 passed; 123 passed | same |
| In-app agents against the Python reference | 3,908 Compliance decisions, 0 difference; identical audit-chain hashes; replay: 0 violations with governance, 6 without | `preuve-2026-11-09-vague-b.txt` |
| Scenarios S1–S3 with governance; S2 and S3 without; two what-if variants | as expected | same |
| Triage rules v2 | 390/390 witness cases; 0 monotonicity violation in 5,000 draws | same |
| Knowledge base (public version) | 2,034 fragments, 21 documents; byte-identical rebuild; 0 PDF | same |
| Publication check | 0 PDF, 0 secret, 0 fragment of the withheld guide | same |
| Visual inspection (47 screens × 4 widths) | 188 measurements, 0 layout defect, 0 console error | `preuve-2026-11-09-vague-c2.txt` |
| Specifications (spec-driven development) | 146 folders, 483 requirements, 280 tasks, 415 tests; traceability: 0 error | `python3 tools/trace.py` |

**Limits.**

- The visual inspection checks layout, not content: 76 interface tests are "captured, not verified".
- BM25 over the whole base still misses English questions on French-only laws (L14); in the app, a query glossary reaches them (5/5, on a small question set whose wording partly overlaps the glossary).
- ChromaDB and Ollama have not been measured; that remains for the team's machine.
- The app runs the agents itself (JavaScript), parity-tested against the Python reference, and reads `config/policy.yaml` (1.4.0) converted to JSON; nothing is sent to a server in the prototype.
- 11 deviations between specifications and code remain logged in `docs/specifications/ECARTS.md`. One example: form errors still use the red reserved for emergencies (open question Q-013-05-01).
