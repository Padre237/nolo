// SF-007-17 et SF-001-15 — Orchestrateur : aucune action sans décision ; mode ; garde et journal du module POC.
import test from 'node:test';
import assert from 'node:assert/strict';
import { creerPolitique, moduleActif } from '../js/domain/politique.js';
import { creerJournal } from '../js/agents/journal.js';
import { creerOrchestrateur, resoudreMode } from '../js/agents/orchestrateur.js';
import { deciderResultat } from '../js/agents/parcours.js';
import * as E from '../js/domain/engine.js';
import { politiqueBrute, horlogeFixe } from './outils.mjs';

const politique = creerPolitique(politiqueBrute());
const nouveau = (opts = {}) => {
  const journal = creerJournal({ politique, horloge: horlogeFixe });
  return { journal, orch: creerOrchestrateur({ politique, journal, ...opts }) };
};
const toux = () => {
  const r = E.reformuler('Je tousse depuis 3 jours, le corps chauffe, mal de gorge et le nez coule');
  const p = E.profil('moi', { valeur: 30, unite: 'ans' });
  const rep = Object.fromEntries(E.questionsDanger(p).map((q) => [q.id, false]));
  return { resultat: E.analyser(r, p, rep), profil: p };
};

test('TEST-007-17-01 : rien ne s’exécute sans décision ; action inconnue = sans fondement', () => {
  const { orch, journal } = nouveau();
  let appels = 0;
  const r = orch.executer({ demandeur: 'test', action: 'inventee.x', categories: [], finalite: 'demonstration', destination: 'appareil' }, () => { appels += 1; });
  assert.equal(r.decision.verdict, 'BLOQUE_SANS_FONDEMENT');
  assert.equal(r.decision.justification, 'ACTION_HORS_CATALOGUE');
  assert.equal(appels, 0);
  assert.equal(journal.lire().length, 1);
  const muet = creerOrchestrateur({ politique, journal, conformite: () => undefined });
  assert.throws(() => muet.executer({ demandeur: 'test', action: 'orientation.structures', categories: [], finalite: 'orientation', destination: 'appareil' }, () => { appels += 1; }),
    (e) => e.code === 'E-AGENT-SANS-DECISION');
  assert.equal(appels, 0);
  const ok = orch.executer({ demandeur: 'test', action: 'orientation.structures', categories: ['position_arrondie'], finalite: 'orientation', destination: 'appareil' }, (d) => { appels += 1; return d.verdict; });
  assert.equal(ok.resultat, 'AUTORISE');
  assert.equal(appels, 1);
  assert.equal(ok.decision.refAudit, ok.evenement.event_id);
});

test('TEST-007-17-05 : Nolo fonctionne en mode demo_synthetique', () => {
  assert.equal(resoudreMode(politique), 'demo_synthetique');
  assert.equal(nouveau().orch.mode, 'demo_synthetique');
  assert.equal(resoudreMode(politique, false), 'sans_donnees_personnelles');
});

test('TEST-001-15-01 : module des pistes absent hors démonstration ou désactivé', () => {
  assert.equal(moduleActif(politique, 'demo_synthetique'), true);
  assert.equal(moduleActif(politique, 'complet'), false);
  assert.equal(moduleActif(politique.variante({ 'diagnostic_poc.actif': false }), 'demo_synthetique'), false);
  const { resultat, profil } = toux();
  assert.equal(resultat.issue, 'pistes');
  const { orch } = nouveau({ mode: 'complet' });
  const r = deciderResultat(orch, resultat, { profil });
  assert.equal(r.resultat.issue, 'orientation');
  assert.deepEqual(r.resultat.pistes, []);
});

test('TEST-001-15-06 : décision de Conformité avant affichage ; journal minimal', () => {
  const { orch, journal } = nouveau();
  const { resultat, profil } = toux();
  const r = deciderResultat(orch, resultat, { profil });
  assert.equal(r.resultat.issue, 'pistes');
  const evts = journal.lire();
  const poc = evts.find((e) => e.action === 'diagnostic.afficher_hypotheses');
  assert.ok(poc && poc.decision === 'AUTORISE_AVEC_CONDITIONS');
  assert.deepEqual(Object.keys(poc.entree_minimisee.entree).sort(), ['empreinte_modele', 'module', 'nombre']);
  assert.equal(poc.entree_minimisee.entree.nombre, r.resultat.pistes.length);
  const texte = JSON.stringify(evts);
  for (const x of resultat.pistes) assert.ok(!texte.includes(`"${x.id}"`), x.id);
  assert.ok(!/tousse|gorge|chauffe/.test(texte));
});

test('Art. 48 et hors champ : même trace au journal, aucune catégorie protégée', () => {
  const p = E.profil('moi', { valeur: 30, unite: 'ans' });
  const rep = Object.fromEntries(E.questionsDanger(p).map((q) => [q.id, false]));
  const art48 = E.analyser(E.reformuler('fièvre, boutons sur la peau, ganglions, mal de gorge, fatigue, diarrhée, courbatures'), p, rep);
  assert.equal(art48.issue, 'art48');
  const { orch, journal } = nouveau();
  const r = deciderResultat(orch, art48, { profil: p });
  assert.equal(r.resultat.issue, 'art48');
  const texte = JSON.stringify(journal.lire());
  assert.ok(!/vie_sexuelle|vih|art48/.test(texte));
});
