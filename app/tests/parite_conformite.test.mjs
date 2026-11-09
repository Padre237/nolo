// SF-007-17 — Parité de la Conformité JavaScript avec la référence Python (TEST-007-17-02, -03, -04, -06).
import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { creerPolitique } from '../js/domain/politique.js';
import { creerBase } from '../js/domain/base.js';
import { decider } from '../js/agents/conformite.js';
import { empreinte } from '../js/core/canonique.js';
import { politiqueBrute, baseBrute, lireJson, lireTexte } from './outils.mjs';

const brute = politiqueBrute();
const politique = creerPolitique(brute);
const attendus = lireJson('../../tests/js/fixtures/decisions_attendues.json');
const separer = (s) => (s ? s.split('+') : []);
const demandeDe = (c) => ({
  demandeur: 'parite', action: c[2], categories: separer(c[3]), finalite: c[4], destination: c[5],
  contexte: { mode: c[7], mineur: c[8] === 1, consentements: Object.fromEntries(separer(c[6]).map((k) => [k, true])) },
});

test('TEST-007-17-03 : politique convertie — même version que policy.yaml, même empreinte canonique', () => {
  const yaml = lireTexte('../../config/policy.yaml');
  assert.equal(brute.version, yaml.match(/^version: "([^"]+)"/m)[1]);
  assert.equal(politique.version, brute.version);
  assert.equal(empreinte(brute.donnees), brute.empreinte_canonique);
  assert.equal(politique.verifiee, true);
  assert.equal(politique.valeur('surveillance.seuil_minimal_cas_par_zone'), 5);
  assert.equal(politique.valeur('etat_institutionnel.apdp_operationnelle'), false);
  assert.deepEqual(politique.source('autorisation_prealable.traitement_donnees_personnelles.autorisation_apdp_obtenue'), ['CMR-LOI-2024-017::0020']);
});

test('TEST-007-17-04 : mêmes verdicts, conditions, replis et fragments que Python (S1 à S3, variantes, grille)', () => {
  assert.equal(attendus.politique, politique.version);
  const politiques = Object.fromEntries(Object.entries(attendus.variantes).map(([n, chg]) => [n, Object.keys(chg).length ? politique.variante(chg) : politique]));
  const ecarts = [];
  for (const c of attendus.cas) {
    const d = decider(demandeDe(c), politiques[c[1]]);
    const obtenu = { verdict: d.verdict, conditions: d.conditions, fragments: d.fragments, cles: d.cles, version: d.version, repli: d.repli, justification: d.justification };
    try { assert.deepEqual(obtenu, attendus.decisions[c[9]]); } catch { ecarts.push({ cas: c, obtenu, attendu: attendus.decisions[c[9]] }); }
  }
  assert.ok(attendus.cas.length > 3000);
  assert.deepEqual(ecarts.slice(0, 3), [], `${ecarts.length} écarts`);
});

test('TEST-007-17-02 : chaque fragment cité existe dans la base embarquée', () => {
  const base = creerBase(baseBrute());
  for (const d of attendus.decisions) {
    if (d.verdict === 'BLOQUE_SANS_FONDEMENT') assert.deepEqual(d.fragments, []);
    for (const f of d.fragments) assert.ok(base.existe(f), f);
  }
});

test('TEST-007-17-06 : décision rapide (médiane ≤ 5 ms) ; politique ≤ 30 Kio', () => {
  const durees = [];
  for (let i = 0; i < 1000; i++) {
    const c = attendus.cas[i % attendus.cas.length];
    const t0 = performance.now(); decider(demandeDe(c), politique); durees.push(performance.now() - t0);
  }
  durees.sort((a, b) => a - b);
  assert.ok(durees[500] <= 5, `médiane ${durees[500]} ms`);
  assert.ok(statSync(new URL('../data/politique.json', import.meta.url)).size <= 30 * 1024);
});
