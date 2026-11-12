# Nolo — governed health orientation for Cameroon

*Nolo* means "health" in Duala. This repository holds the CENADI EQUIPE 2 (Cameroon) entry to the **ITU AI for Good Lab Hackathon** (submission: 10 November 2026). Version française : [README.fr.md](README.fr.md).

**Submission:** [technical report (PDF, 5 pages)](nolo-technical-report.pdf) · [demo video (4:55)](nolo-demo.mp4) · [knowledge base](kb/)

> **Demonstration prototype.** Nolo is not a medical device. It does not diagnose, prescribe or name a medicine dose. Every facility, stock, account and surveillance series is **synthetic**; facility phone calls are disabled. The ministry console is a Nolo-branded demonstration: it is not affiliated with any ministry and uses no official name or logo.

## The problem

In Cameroon, the first health decision is usually made at home, without guidance. People need to know whether a sign is dangerous. They need to find an open facility that offers the right service, a licensed pharmacy that actually has a medicine in stock, or compatible blood tonight. Facilities and the health authorities lack a lawful, aggregated view of demand and of early community signals. Personal-data law (Law No. 2024/017) is strict, and several of its implementing texts are not yet published.

## What Nolo does

| Space | What a user can do | Status |
|---|---|---|
| Citizen | Describe what they feel (French or English, Cameroonian expressions understood). Answer closed safety questions. Get an **emergency alert** when a danger sign appears. Be pointed to a suitable facility with the reason, and get a consultation summary to show the clinician. Search a specialty, a medicine (INN) or a blood group. | Built (browser, demo data) |
| Experimental module | In demo mode only: up to three *experimental leads* with their score and source. They are never presented as a diagnosis, and Article 48 categories get a neutral message. | Built, demo only |
| Health facility | Register (step-by-step, simulated licence check). Maintain the facility profile and stocks (CSV import with a rejection report in the app; CSV and XLSX in the Python reference service). View demand trends with small-count suppression. | Built (browser) + Python reference service |
| Ministry console | Use a syndromic map with CUSUM signals and aggregates only. Grant or refuse facility licences, with a reason required for refusals. View supply versus demand and the versioned policy, and run "what-if" policy variants. | Built (browser, demo) |
| Agents | The **Compliance agent** and the **orchestrator** decide every personal-data action. There are four verdicts. `AUTORISE`, `AUTORISE_AVEC_CONDITIONS` and `BLOQUE` cite the legal fragment; `BLOQUE_SANS_FONDEMENT` blocks an action that is outside the catalogue or has no legal basis to cite. Every decision goes into a SHA-256-chained audit log. A replay mode runs the system *without* governance to show which violations it would commit. A "How Nolo decided" panel shows each step, agent and cited article. | Built in the app (JavaScript), parity-tested against the Python reference |
| Rights adviser "Mes droits santé" | Extractive answers that cite the knowledge base, or a refusal when there is no basis. | Built in the app (`#/droits`) |

## Agents at a glance

Each agent owns one task and is tested alone. Unlike a chatbot, no generated text decides: verdicts come from versioned rules or counts, cite a source, and are logged and replayable. The technical report (§8) also says where each agent can be reused.

| Agent | What it does in Nolo | Data and tools | Works with |
|---|---|---|---|
| Orchestrator | Routes each request; acts only after a Compliance verdict; logs every decision | Agent registry; chained audit log | All agents |
| Compliance | Checks mode, consent, profiling and destination, then the action's rules; four verdicts, each citing its legal fragment. It applies rules derived from the law; the authority remains the APDP or MINSANTE | `policy.yaml` 1.4.0; knowledge-base fragments | Orchestrator; all agents |
| Triage | On the phone: turns the person's words into signs, asks safety questions, raises the emergency alert; never lowers urgency | 75 IMCI/IITT rules; 110 French/English signs | Orchestrator; Resources |
| Resources | Finds a verified facility, specialty, medicine or blood, open first, then nearest; sensitive searches stay on the phone | Facility profiles; district tile | Availability; Reliability |
| Availability | Takes stock and blood levels from licensed facilities only; rejects unknown INNs and banned products; 48 h expiry | CSV/XLSX import; INN list | Resources; Compliance |
| Reliability | Scores pharmacies from "found / not found" reports; smoothed, frozen on bursts, human-moderated | Pseudonymous (HMAC) reports | Resources; moderator |
| Surveillance | Counts consented signs per area, week and syndrome; CUSUM raises a "to verify" signal (SC1–SC8); no count below 5 | Aggregates; MINSANTE 2023 community-surveillance guide | Compliance; focal point |
| Rights adviser | Answers health and data-rights questions with cited extracts of the law, or says no text applies | BM25; French/English glossary | Orchestrator |

## How it is built

**The law is executable.**

- `config/policy.yaml` encodes the state of the law: thresholds, run modes, consent rules, emergency numbers and known gaps. Code never hardcodes a legal value; the remaining exceptions are listed as gaps.
- The knowledge base (`kb/`) holds **2,034 traceable fragments from 21 documents**: Cameroonian laws and the MINSANTE community-surveillance guide, the IHR, WHO guidance, the GDPR and the EU AI Act as international references.
- A mapping CSV links key articles to the pipeline node they govern and to the agent that applies them.

**Pipelines follow ITU-T Y.3172.** There are four pipelines: orientation, surveillance, resources and reliability. Each has explicit SRC → C → PP → M → P → D → SINK nodes. The Compliance agent instantiates the policy node (P) before every personal-data node. See `docs/architecture/system-architecture.md` §4.

**Three run modes.**

- `demo_synthetique` is the mode the app runs in.
- `sans_donnees_personnelles` processes no personal data.
- `complet` requires the data-protection authority's authorization, which the law demands and which cannot yet be obtained.

**Gap register.** Sixteen gaps (`docs/compliance/registre-lacunes.md`) each record a finding, the prototype safeguard, the `policy.yaml` parameter and a recommendation. One example: Article 48 bans processing sexual-life data with no derogation, while the international IITT triage card lists "sexual assault" as a criterion.

## Quick start

Requirements: Python 3.12 or later (tested with 3.12 and 3.13), Node 22, and a Chromium-based browser. The app itself needs no dependency and no build step; the Python packages for the checks and the facility service are in `requirements.txt`. No proprietary component is needed; ChromaDB and Ollama (embedding search) are optional.

```bash
# Install (once)
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
export PATH="$PWD/.venv/bin:$PATH"

# The Nolo app (PWA)
python3 -m http.server 8765 --bind 127.0.0.1 -d app     # open http://127.0.0.1:8765/

# Tests
cd app && node --test tests/*.test.mjs && cd ..        # app: domain, i18n parity, surveillance
python3 -m pytest -q                                    # governance, scenarios S1–S3, facility service
node --test tests/js/*.test.mjs                         # on-device triage engine (parity), facility catalogues

# Governance scenarios (with and without the Compliance agent, and a "what-if" law change)
python3 tools/scenarios/executer.py --scenario medicament_sensible
python3 tools/scenarios/executer.py --scenario medicament_sensible --sans-gouvernance
python3 tools/scenarios/executer.py --scenario medicament_sensible --politique config/variantes/et-si-derogation-art48.yaml

# Knowledge base
python3 tools/verifier_base.py --reconstruire           # schema, rights, citations, byte-identical rebuild
python3 -I kb/eval/run_eval.py --embed bm25             # retrieval evaluation (40 questions)

# Facility reference service (Starlette)
python3 tools/lancer_demo.py --neuf --avec-tendances     # http://127.0.0.1:8000
```

## Demo scenarios (in the app)

Open http://127.0.0.1:8765/ in a Chromium-based browser. Every screen exists in French and English: switch with the FR / EN button at the top. The report (§5) details the governance scenarios S1–S3.

1. **Orientation.** Accept the consent purposes, tap "Describe how I feel" (`#/decrire`), choose the first example (or type "J'ai de la fièvre et je tousse depuis 3 jours"), answer the safety questions, then open "Where to go": a suitable facility with the reason, and a summary for the health worker.
2. **Emergency.** Choose the second example: a danger sign triggers the emergency alert (119, 112). Open "How Nolo decided" to see each step, its agent, its Y.3172 node and the cited article.
3. **Article 48 protection.** Type "Fever, skin rash, swollen glands, sore throat and tiredness for a week.": Nolo names nothing and points to a confidential test at the nearest health centre.
4. **Searches.** Medicine (`#/chercher/medicament`, e.g. paracetamol) and blood (`#/chercher/sang`): sensitive searches run on the phone and are never counted.
5. **Health facility.** From the home screen, "I am a health facility", then the demo account: stock, CSV import, demand trends.
6. **Ministry console** (`#/ministere`): syndromic signals; the coordination cell, where the district asks for names and Compliance blocks it; the audit log (tamper with one entry, then verify the chain); "With or without governance" (0 violations against 6); "Policy and gaps" with the what-if simulation.
7. **Rights adviser** (`#/droits`): pick an example question; the answer is made of cited passages only.

## Verified results (9 November 2026)

| Check | Result | Evidence |
|---|---|---|
| pytest | 133 passed | `docs/quality/preuve-2026-11-09-vague-c3.txt` |
| Node, engine, PCIME/IITT acceptance and catalogues | 32 passed | same |
| Node, Nolo app | 123 passed | same |
| In-app agents against the Python reference | 3,908 Compliance decisions, 0 difference; identical audit-chain hashes; replay: 0 violations with governance, 6 without | `docs/quality/preuve-2026-11-09-vague-b.txt` |
| Scenarios S1–S3 with governance; S2–S3 without governance; two what-if variants | as expected | same |
| Triage rules v2 | 390/390 witness cases; 0 monotonicity violation in 5,000 random draws | same |
| Retrieval (BM25, top 5) | expected document 33/40; exact article 29/40 | same |
| Visual inspection (47 screens × 4 widths) | 188 measurements, 0 layout defect, 0 console error | `docs/quality/preuve-2026-11-09-vague-c3.txt` |
| Traceability | 146 specification folders, 0 error | `python3 tools/trace.py` |

Limits are stated in the specifications. Examples:

- the visual inspection checks layout, not screen content (73 UI tests are "captured, not verified");
- BM25 over the whole base misses English questions on French-only laws; in the app, a query glossary reaches them (5/5 on a small set);
- ChromaDB and Ollama measurements must be run on the team's machine.

## Next steps after the hackathon

- **Validation.** A clinician validates the triage labels and levels, a lawyer the reading of the law; until then, the rules run in demo mode only.
- **Regulators.** Share the gap register and the what-if tool with MINSANTE, MINPOSTEL and the APDP. Run the no-personal-data mode now; the full mode only with an Article 19 authorization.
- **Standards and research.** Propose the consent-and-purpose node and inter-agent accountability to ITU-T SG13 (Y.3172) and to the AI Readiness Framework; publish the L13 finding.
- **Product.** On-device DDXPlus model, public epidemiological map, official English versions of the laws (L14), then a pilot in one health district in the no-personal-data mode.

## Repository map

| Path | Content |
|---|---|
| `app/` | The Nolo progressive web app (vanilla ES modules, French and English) |
| `src/server/` | Python reference: Compliance agent, orchestrator, policy, chained journal, resources, surveillance, facility service |
| `src/client/ondevice/` | On-device triage engine v1 (JavaScript, parity with Python), copied into `app/js/vendor/` for the emergency alert |
| `config/` | `policy.yaml` and what-if variants |
| `kb/` | Knowledge base v9 (public version), sources, article mapping, evaluation, translations |
| `rules/`, `data/`, `donnees/` | Triage rules and symptom reference; synthetic data; administrative zones (ODbL) |
| `tools/`, `tests/` | Scenario runner, checks, inspection, test suites |
| `docs/` | Specifications (spec-driven development), architecture, compliance, decisions, execution proofs |

## How the work is organized

The project follows strict **spec-driven development**: no code without an approved specification folder (`requirements.md`, `design.md`, `tasks.md`, `tests.md`), and no test claimed as passing without a dated proof.

- `CLAUDE.md`: working rules and how to resume.
- `docs/ETAT.md`: current state and next task.
- `docs/specifications/README.md`: catalogue of 17 features and 146 sub-features. The specifications are written in French.

## Licence

Our code is under the MIT licence (`LICENSE`). Third-party material — legal texts and guides in `kb/`, OpenStreetMap-derived zones, fonts — keeps its own licence. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Texts marked "all rights reserved" are excluded from this repository.
