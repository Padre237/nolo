// SF-007-21 — Journal chaîné dans le navigateur (TEST-007-21-01 à TEST-007-21-03).
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerPolitique } from '../js/domain/politique.js';
import { creerJournal, verifierChaine, ZERO } from '../js/agents/journal.js';
import { creerOrchestrateur } from '../js/agents/orchestrateur.js';
import { deciderResultat } from '../js/agents/parcours.js';
import { canonique, empreinte } from '../js/core/canonique.js';
import { sha256Hex } from '../js/core/sha256.js';
import * as E from '../js/domain/engine.js';
import { politiqueBrute, horlogeFixe, lireTexte } from './outils.mjs';

const politique = creerPolitique(politiqueBrute());
const parcours = () => {
  const journal = creerJournal({ politique, horloge: horlogeFixe });
  const orch = creerOrchestrateur({ politique, journal });
  const p = E.profil('moi', { valeur: 30, unite: 'ans' });
  const rep = Object.fromEntries(E.questionsDanger(p).map((q) => [q.id, false]));
  const texte = 'Je tousse depuis 3 jours, le corps chauffe, mal de gorge et le nez coule';
  deciderResultat(orch, E.analyser(E.reformuler(texte), p, rep), { profil: p });
  orch.executer({ demandeur: 'ressources', action: 'ressources.rechercher_sang', categories: ['aucune_donnee_personnelle'], finalite: 'recherche', destination: 'appareil' });
  return { journal, texte };
};

test('SHA-256 : vecteurs de référence', () => {
  assert.equal(sha256Hex(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert.equal(sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  assert.equal(sha256Hex('é€😀'), 'df9226927fd572c1ee66eec85de1bb139497614899f36e4e90474cb71f6ef9d0');
  assert.equal(sha256Hex('a'.repeat(1000)), '41edece42d63e8d9bf515a9ba6932e1c20cbc9f5a5d134645adb5db1b9737ea3');
});

test('TEST-007-21-01 : une entrée chaînée par décision, sans texte libre ni champ interdit', () => {
  const { journal, texte } = parcours();
  const evts = journal.lire();
  assert.ok(evts.length >= 3);
  assert.equal(evts[0].hash_precedent, ZERO);
  for (let i = 1; i < evts.length; i++) assert.equal(evts[i].hash_precedent, evts[i - 1].hash);
  assert.equal(journal.verifier(), null);
  const brut = JSON.stringify(evts);
  for (const mot of texte.split(/\W+/).filter((m) => m.length > 4)) assert.ok(!brut.includes(mot), mot);
  for (const e of evts) for (const k of ['agent', 'contributeurs', 'action', 'decision', 'fragments', 'politique', 'mode', 'horodatage']) assert.ok(k in e, k);
  assert.throws(() => journal.ecrire({ agent: 'x', action: 'y', decision: 'AUTORISE', mode: 'demo_synthetique', entree_minimisee: { telephone: '600000000' } }), (e) => e.code === 'E-JOURNAL-CHAMP-INTERDIT');
  const dernier = journal.lire().at(-1);
  assert.equal(dernier.action, 'journal.violation_bloquee');
  assert.ok(!JSON.stringify(dernier).includes('600000000'));
});

test('TEST-007-21-02 : une entrée altérée est désignée ; après restauration, chaîne valide', () => {
  const { journal } = parcours();
  journal.alterer(1);
  const err = journal.verifier();
  assert.equal(err.index, 1);
  journal.restaurer();
  assert.equal(journal.verifier(), null);
});

test('TEST-007-21-03 : mêmes empreintes que src/server/gouvernance/journal.py', () => {
  for (const f of ['journal_regroupement.jsonl', 'journal_medicament_sensible.jsonl', 'journal_orientation_urgente.jsonl']) {
    const lignes = lireTexte(`../../tests/reports/2026-11-04/${f}`).trim().split('\n').map((l) => JSON.parse(l));
    assert.ok(lignes.length >= 2, f);
    for (const evt of lignes) {
      const { hash, ...reste } = evt;
      assert.equal(empreinte(reste), hash, `${f} ${evt.event_id}`);
    }
    assert.equal(verifierChaine(lignes), null, f);
  }
  assert.equal(canonique({ b: 1, a: [true, null, 'é'], c: { z: 0.5, y: 'x"y' } }), '{"a":[true,null,"é"],"b":1,"c":{"y":"x\\"y","z":0.5}}');
});
