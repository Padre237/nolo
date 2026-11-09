// SF-001-07 (TASK-001-07-03) — Moteur de triage v1 branché dans Nolo pour l'urgence seulement (FR-166, FR-168).
import test from 'node:test';
import assert from 'node:assert/strict';
import { translator } from '../js/core/i18n.js';
import { creerPolitique } from '../js/domain/politique.js';
import { chargerTriage, urgenceMoteur } from '../js/domain/triage.js';
import * as E from '../js/domain/engine.js';
import { politiqueBrute, lireJson, lireTexte, horlogeFixe } from './outils.mjs';

const { installer } = await import('../js/agents/nolo.js');
const { deciderResultat } = await import('../js/agents/parcours.js');
const politique = creerPolitique(politiqueBrute());
const nolo = installer({ politique, horloge: horlogeFixe });
const ref = chargerTriage(lireJson('../data/paquet_triage.json'), 'demo_synthetique');
const analyse = (texte, age, qui = 'enfant') => {
  const p = E.profil(qui, age);
  const rep = Object.fromEntries(E.questionsDanger(p).map((q) => [q.id, false]));
  const signes = E.reformuler(texte);
  const v1 = urgenceMoteur(texte, age, signes.jours, ref);
  return { p, v1, sans: E.analyser(signes, p, rep), avec: deciderResultat(nolo.orchestrateur, E.analyser(signes, p, rep, { moteur: v1 }), { profil: p }) };
};

test('TEST-001-07-05 : « mon enfant de 3 ans a des lèvres bleues » → urgence, questions de sécurité répondues « non »', () => {
  const r = analyse('mon enfant de 3 ans a des lèvres bleues', { valeur: 3, unite: 'ans' });
  assert.equal(r.avec.resultat.issue, 'urgence');
  assert.equal(r.v1.urgence, true);
});

test('FR-168 : le moteur v1 suffit quand la liste de Nolo ne voit rien (fièvre et nuque raide à 3 ans, PCIME-MFTG-01)', () => {
  const r = analyse('fièvre et la nuque raide', { valeur: 3, unite: 'ans' });
  assert.notEqual(r.sans.issue, 'urgence');
  assert.equal(r.avec.resultat.issue, 'urgence');
  assert.equal(r.v1.regle, 'PCIME-MFTG-01');
  const m = r.avec.trace.find((x) => x.agent === 'signes_danger');
  assert.equal(m.regle, 'PCIME-MFTG-01');
  assert.ok(m.fragments.some((f) => f.startsWith('INT-OMS-PCIME-MANUEL::')));
});

test('TEST-001-07-02 : un cas non urgent n’affiche aucun niveau', async () => {
  const r = analyse('Je tousse depuis 3 jours, le corps chauffe, mal de gorge et le nez coule', { valeur: 30, unite: 'ans' }, 'moi');
  assert.equal(r.v1.urgence, false);
  assert.equal(r.avec.resultat.issue, 'pistes');
  const pistes = (await import('../js/screens/patient/pistes.js')).default;
  for (const lang of ['fr', 'en']) {
    const t = translator(lang);
    const s = String(pistes.render({ s: { cas: { resultat: r.avec.resultat, trace: r.avec.trace } }, t, params: [] }));
    assert.ok(!/consultation_(24|48)h|soins_courants|r\.v1\.niveau/.test(s));
    assert.ok(!s.includes(r.v1.niveau));
  }
});

test('Copie versionnée : app/js/vendor et app/data/paquet_triage.json identiques aux sources (src/client/ondevice)', () => {
  for (const f of ['empreinte', 'extracteur_lexical', 'referentiel', 'moteur_triage']) {
    const source = lireTexte(`../../src/client/ondevice/${f}.mjs`).replace(/from "\.\/([a-z_]+)\.mjs"/g, 'from "./$1.js"');
    assert.equal(lireTexte(`../js/vendor/${f}.js`), source, f);
  }
  assert.equal(lireTexte('../data/paquet_triage.json'), lireTexte('../../src/client/ondevice/paquet_triage.json'));
});
