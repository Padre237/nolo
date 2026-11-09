// SF-007-18 — Panneau « Comment Nolo a décidé » (TEST-007-18-01 à TEST-007-18-05).
import test from 'node:test';
import assert from 'node:assert/strict';
import { translator } from '../js/core/i18n.js';
import { creerPolitique } from '../js/domain/politique.js';
import { creerBase } from '../js/domain/base.js';
import { installer } from '../js/agents/nolo.js';
import { deciderResultat, deciderRecherche } from '../js/agents/parcours.js';
import { panneauDecision } from '../js/ui/decision.js';
import * as E from '../js/domain/engine.js';
import pistes from '../js/screens/patient/pistes.js';
import urgence from '../js/screens/patient/urgence.js';
import confidentiel from '../js/screens/patient/confidentiel.js';
import horsChamp from '../js/screens/patient/hors-champ.js';
import ouAller from '../js/screens/patient/ou-aller.js';
import chercher from '../js/screens/patient/chercher.js';
import { politiqueBrute, baseBrute, horlogeFixe } from './outils.mjs';

const politique = creerPolitique(politiqueBrute());
const base = creerBase(baseBrute());
const nolo = installer({ politique, base, horloge: horlogeFixe });
const adulte = E.profil('moi', { valeur: 30, unite: 'ans' });
const non = (p) => Object.fromEntries(E.questionsDanger(p).map((q) => [q.id, false]));
const cas = (texte, reponses) => {
  const signes = E.reformuler(texte);
  const r = deciderResultat(nolo.orchestrateur, E.analyser(signes, adulte, reponses ?? non(adulte)), { profil: adulte });
  return { qui: 'moi', age: { valeur: 30, unite: 'ans' }, texte, signes, reponses: reponses ?? non(adulte), resultat: r.resultat, trace: r.trace };
};
const TEXTES = {
  pistes: 'Je tousse depuis 3 jours, le corps chauffe, mal de gorge et le nez coule zorglub',
  urgence: 'Je tousse et j’ai une douleur dans la poitrine zorglub',
  art48: 'fièvre, boutons sur la peau, ganglions, mal de gorge, fatigue, diarrhée, courbatures zorglub',
  hors: 'mal de tête et fatigue zorglub',
};
const s0 = (c, extra = {}) => ({ langue: 'fr', consentement: null, cas: c, recherche: { onglet: 'service', specialite: '', dci: '', groupe: '', signalements: [] }, ...extra });

test('TEST-007-18-01 : le panneau repliable est présent sur les six écrans', () => {
  const t = translator('fr');
  const ecrans = [
    [pistes, cas(TEXTES.pistes)], [ouAller, cas(TEXTES.pistes)], [confidentiel, cas(TEXTES.art48)], [horsChamp, cas(TEXTES.hors)],
    [urgence, cas(TEXTES.urgence, { ...non(adulte), 'Q-POITRINE': true })],
  ];
  for (const [ecran, c] of ecrans) {
    const sortie = String(ecran.render({ s: s0(c), t, params: [] }));
    assert.match(sortie, /<details class="decision"/, ecran.id);
  }
  const r = deciderRecherche(nolo.orchestrateur, { type: 'sang' });
  const sortie = String(chercher.render({ s: s0(null, { recherche: { onglet: 'sang', groupe: 'O+', signalements: [], trace: r.trace } }), t, params: ['sang'] }));
  assert.match(sortie, /<details class="decision"/, 'chercher');
});

test('TEST-007-18-02 : chaîne des agents de l’écran Urgence, dans l’ordre', () => {
  const c = cas(TEXTES.urgence, { ...non(adulte), 'Q-POITRINE': true });
  assert.equal(c.resultat.issue, 'urgence');
  const ordre = c.trace.map((x) => `${x.agent}:${x.noeud}`);
  const attendus = ['reformulation:PP', 'signes_danger:M', 'conformite:P', 'orientation:SINK'];
  let i = 0;
  for (const o of ordre) if (o === attendus[i]) i += 1;
  assert.equal(i, attendus.length, ordre.join(' → '));
});

test('TEST-007-18-03 : ligne d’un fragment — identifiant, article, extrait ≤ 240 caractères, statut', () => {
  const t = translator('fr');
  const sortie = String(panneauDecision([{ agent: 'conformite', noeud: 'P', decision: 'AUTORISE', fragments: ['CMR-LOI-2024-017::0033'] }], t, base));
  assert.match(sortie, /CMR-LOI-2024-017::0033/);
  assert.match(sortie, /Article 32/);
  const brut = sortie.match(/<q class="decision__extrait"[^>]*>([^<]*)<\/q>/)[1];
  const extrait = brut.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  assert.ok(extrait.length > 20 && extrait.length <= 240, `${extrait.length}`);
  assert.ok(sortie.includes(t('decision.statuts.ocr')));
});

test('TEST-007-18-04 : aucun mot du texte libre dans le panneau', () => {
  const t = translator('fr');
  for (const texte of Object.values(TEXTES)) {
    const c = cas(texte, texte === TEXTES.urgence ? { ...non(adulte), 'Q-POITRINE': true } : undefined);
    const sortie = String(panneauDecision(c.trace, t, base));
    assert.ok(!sortie.includes('zorglub'));
    assert.ok(!/ganglion|boutons|diarrh/i.test(sortie));
  }
});

test('TEST-007-18-05 : en anglais, version officielle ou traduction marquée', () => {
  const t = translator('en');
  const off = String(panneauDecision([{ agent: 'conseiller', noeud: 'P', decision: 'AUTORISE', fragments: ['CMR-LOI-2019-019::0005'] }], t, base));
  assert.match(off, /CMR-LOI-2019-019-EN::0005/);
  const nonOff = String(panneauDecision([{ agent: 'conformite', noeud: 'P', decision: 'AUTORISE', fragments: ['CMR-LOI-2024-017::0011'] }], t, base));
  assert.match(nonOff, /Unofficial translation/);
});

test('TEST-001-15-07 : la mention « table de démonstration » est visible sur l’écran des pistes', () => {
  for (const lang of ['fr', 'en']) {
    const t = translator(lang);
    const sortie = String(pistes.render({ s: s0(cas(TEXTES.pistes)), t, params: [] }));
    assert.ok(sortie.includes(t('pistes.tableDemo')), lang);
  }
});
