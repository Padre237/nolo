// SF-007-19 — Cellule de coordination (TEST-007-19-01 à TEST-007-19-04).
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerPolitique } from '../js/domain/politique.js';
import { creerJournal } from '../js/agents/journal.js';
import { creerOrchestrateur } from '../js/agents/orchestrateur.js';
import { derouler, MANDATS } from '../js/agents/cellule.js';
import { signaux } from '../js/domain/surveillance.js';
import { politiqueBrute, horlogeFixe } from './outils.mjs';

const politique = creerPolitique(politiqueBrute());
const signal = signaux().find((x) => x.id === 'S-AS-07-diarrhee');
const nouveau = () => {
  const journal = creerJournal({ politique, horloge: horlogeFixe });
  return { journal, orch: creerOrchestrateur({ politique, journal }) };
};

test('TEST-007-19-01 : six positions dans l’ordre, datées, avec agent et mandat', () => {
  assert.ok(signal, 'signal de démonstration S-AS-07-diarrhee');
  const { orch } = nouveau();
  const fil = derouler(signal, { orchestrateur: orch, horloge: horlogeFixe });
  assert.deepEqual(fil.positions.map((p) => p.agent), ['surveillance', 'conformite', 'district', 'conformite', 'apdp', 'point_focal']);
  for (const p of fil.positions) {
    assert.ok(p.date && p.mandat && MANDATS[p.agent], p.agent);
    assert.ok(p.position, p.agent);
  }
});

test('TEST-007-19-02 : le District ne reçoit que des agrégats ; l’APDP ne reçoit pas les données', () => {
  const { orch } = nouveau();
  const fil = derouler(signal, { orchestrateur: orch, horloge: horlogeFixe });
  const district = fil.positions.find((p) => p.agent === 'district');
  assert.deepEqual(Object.keys(district.recu).sort(), ['aire', 'cas_publies', 'semaine', 'syndrome']);
  assert.ok(district.recu.cas_publies === null || district.recu.cas_publies % 5 === 0);
  const apdp = fil.positions.find((p) => p.agent === 'apdp');
  assert.deepEqual(Object.keys(apdp.recu).sort(), ['decision', 'demande']);
});

test('TEST-007-19-03 : la demande nominative du District est bloquée (deux articles, repli agrégat)', () => {
  const { orch, journal } = nouveau();
  const fil = derouler(signal, { orchestrateur: orch, horloge: horlogeFixe });
  const d = fil.positions[3];
  assert.equal(d.decision, 'BLOQUE');
  assert.deepEqual([...d.fragments].sort(), ['CMR-LOI-2024-017::0011', 'INT-OMS-RSI-2005-AMENDE-2022::0054']);
  assert.equal(d.repli, 'agregat');
  assert.ok(journal.lire().some((e) => e.action === 'surveillance.transmettre_donnees_individuelles' && e.decision === 'BLOQUE'));
});

test('TEST-007-19-04 : un désaccord est marqué ; l’échange reste ouvert jusqu’à la décision humaine', () => {
  const { orch, journal } = nouveau();
  const ouvert = derouler(signal, { orchestrateur: orch, horloge: horlogeFixe, avisApdp: 'defavorable' });
  assert.equal(ouvert.desaccord, true);
  assert.equal(ouvert.clos, false);
  assert.equal(ouvert.positions.at(-1).position, 'attente_decision_humaine');
  assert.ok(journal.lire().some((e) => e.action === 'cellule.desaccord'));
  const clos = derouler(signal, { orchestrateur: orch, horloge: horlogeFixe, avisApdp: 'defavorable', decisionPointFocal: { statut: 'agregats_seulement', motif: 'Transmission des agrégats au district seulement' } });
  assert.equal(clos.clos, true);
  assert.equal(clos.positions.at(-1).position, 'agregats_seulement');
});
