// Nolo — moteur sur l'appareil : reformulation des signes, vérification de sécurité, pistes du POC.
// Rien ne quitte le téléphone ici (FR-DX-02, FR-DX-07). La table de scores est une table de
// DÉMONSTRATION : elle sera remplacée par le modèle entraîné sur DDXPlus (spec POC v0.3, § 3).

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, "'");

// motif « racine* » = début de mot ; sinon mot ou expression entiers.
const motif = (m) => {
  const stem = m.endsWith('*');
  const body = norm(stem ? m.slice(0, -1) : m).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
  return new RegExp(`(^|[^a-z])(${body})${stem ? '' : '(?![a-z])'}`, 'g');
};

/** Référentiel interne des signes (SYM-NNN), bilingue. `resp` : plainte respiratoire ; `danger` : signe de danger. */
export const SIGNES = {
  'SYM-001': { fr: 'Fièvre', en: 'Fever', motifs: ['fievre', 'corps chauffe', 'corps chaud', 'corps est chaud', 'temperature', 'chaud au toucher', 'fever', 'high temperature', 'body is hot'] },
  'SYM-002': { fr: 'Toux', en: 'Cough', resp: true, motifs: ['tousse*', 'toux', 'cough*'] },
  'SYM-003': { fr: 'Respiration rapide', en: 'Fast breathing', resp: true, motifs: ['respire vite', 'respire tres vite', 'respiration rapide', 'souffle vite', 'halete', 'fast breathing', 'breathing fast', 'breathes fast', 'breathing quickly'] },
  'SYM-004': { fr: 'Essoufflement', en: 'Shortness of breath', resp: true, motifs: ['essouffl*', 'souffle court', 'manque de souffle', 'mal a respirer', 'difficulte a respirer', 'difficultes a respirer', 'respire mal', 'short of breath', 'shortness of breath', 'hard to breathe', 'difficulty breathing', 'trouble breathing'] },
  'SYM-005': { fr: 'Respiration sifflante', en: 'Wheezing', resp: true, motifs: ['siffle*', 'sifflement*', 'sifflante', 'wheez*'] },
  'SYM-006': { fr: 'Mal de gorge', en: 'Sore throat', resp: true, motifs: ['gorge', 'mal en avalant', 'sore throat', 'throat'] },
  'SYM-007': { fr: 'Nez qui coule ou bouché', en: 'Runny or blocked nose', resp: true, motifs: ['nez qui coule', 'nez coule', 'coule du nez', 'nez bouche', 'rhume', 'enrhume*', 'ecoulement nasal', 'runny nose', 'blocked nose', 'stuffy nose', 'a cold'] },
  'SYM-008': { fr: "Douleur d'oreille", en: 'Ear pain', resp: true, motifs: ['oreille*', 'ear', 'ears', 'earache'] },
  'SYM-009': { fr: 'Maux de tête', en: 'Headache', motifs: ['mal a la tete', 'mal de tete', 'maux de tete', 'la tete me fait mal', 'cephalee*', 'headache*', 'head hurts'] },
  'SYM-010': { fr: 'Grande fatigue', en: 'Tiredness', motifs: ['fatigu*', 'epuise*', 'sans force', 'tired*', 'exhausted', 'no strength'] },
  'SYM-011': { fr: 'Douleurs dans le corps', en: 'Body aches', motifs: ['courbatur*', 'mal partout', 'douleurs musculaires', 'mal aux muscles', 'body aches', 'aching all over', 'muscle pain'] },
  'SYM-012': { fr: 'Douleur dans la poitrine', en: 'Chest pain', resp: true, motifs: ['mal a la poitrine', 'mal dans la poitrine', 'douleur dans la poitrine', 'douleur a la poitrine', 'douleur thoracique', 'poitrine me fait mal', 'chest pain', 'pain in my chest', 'chest hurts'] },
  'SYM-013': { fr: 'Crachats avec du sang', en: 'Coughing up blood', resp: true, motifs: ['crache du sang', 'crachats sanglants', 'sang dans les crachats', 'coughing blood', 'coughing up blood', 'blood in sputum', 'coughs up blood'] },
  'SYM-014': { fr: 'Sueurs la nuit', en: 'Night sweats', motifs: ['sueurs nocturnes', 'transpire la nuit', 'sueurs la nuit', 'night sweats', 'sweating at night'] },
  'SYM-015': { fr: 'Perte de poids', en: 'Weight loss', motifs: ['maigri*', 'perd du poids', 'perte de poids', 'weight loss', 'losing weight', 'lost weight'] },
  'SYM-016': { fr: 'Toux qui aboie', en: 'Barking cough', resp: true, motifs: ['aboie', 'aboyante', 'toux de chien', 'barking'] },
  'SYM-017': { fr: 'Quintes de toux', en: 'Coughing fits', resp: true, motifs: ['quinte*', 'chant du coq', 'coughing fits', 'whoop*'] },
  'SYM-018': { fr: 'Diarrhée', en: 'Diarrhoea', motifs: ['diarrh*', 'selles liquides', 'diarrhea', 'diarrhoea', 'watery stool*'] },
  'SYM-019': { fr: 'Vomissements', en: 'Vomiting', motifs: ['vomi*', 'vomissement*', 'vomiting', 'throwing up', 'vomits'] },
  'SYM-020': { fr: 'Frissons', en: 'Chills', motifs: ['frisson*', 'grelotte*', 'chills', 'shivering'] },
  'SYM-021': { fr: 'Boutons ou plaques sur la peau', en: 'Skin rash', motifs: ['bouton*', 'eruption*', 'plaques sur la peau', 'rougeurs', 'rash', 'spots on the skin'] },
  'SYM-022': { fr: 'Ganglions gonflés', en: 'Swollen glands', motifs: ['ganglion*', 'boules au cou', 'swollen glands', 'lumps in the neck'] },
  // Signes de danger (PCIME, signes généraux ; tirage ; cyanose)
  'SYM-090': { fr: 'Ne peut pas boire ni téter', en: 'Unable to drink or breastfeed', danger: true, motifs: ['ne peut pas boire', 'ne boit plus', 'refuse le sein', 'ne tete plus', 'refuse de boire', 'unable to drink', 'not drinking', 'refuses the breast', 'cannot breastfeed'] },
  'SYM-091': { fr: 'Vomit tout ce qu’il avale', en: 'Vomits everything', danger: true, motifs: ['vomit tout', 'vomits everything'] },
  'SYM-092': { fr: 'Convulsions', en: 'Convulsions', danger: true, motifs: ['convuls*', 'crise convulsive', 'seizure*'] },
  'SYM-093': { fr: 'Très endormi ou inconscient', en: 'Very sleepy or unconscious', danger: true, motifs: ['inconscient*', 'ne se reveille', 'tres endormi*', 'lethargi*', 'unconscious', 'hard to wake', 'very sleepy', 'lethargic'] },
  'SYM-094': { fr: 'La poitrine se creuse sous les côtes', en: 'Chest indrawing', resp: true, danger: true, motifs: ['tire sur les cotes', 'cotes rentrent', 'ventre se creuse', 'poitrine se creuse', 'creuse sous les cotes', 'tirage', 'chest indrawing', 'ribs pull in', 'ribs sucking in'] },
  'SYM-095': { fr: 'Lèvres ou ongles bleus', en: 'Blue lips or nails', danger: true, motifs: ['levres bleues', 'ongles bleus', 'blue lips', 'blue nails'] },
};

const COMPILE = Object.fromEntries(Object.entries(SIGNES).map(([code, s]) => [code, s.motifs.map(motif)]));
const NEGATION = /(pas de|pas|sans|ni|aucune?|jamais|no|not|without|never)\s+(\S+\s+){0,2}$/;

const NOMBRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, dix: 10, quinze: 15, a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, ten: 10 };

/** Durée exprimée (« depuis 3 jours », « for two weeks ») en jours, ou null. */
export function duree(texte) {
  const t = norm(texte);
  const m = t.match(/(?:depuis|ca fait|cela fait|for|since)\s+(\d+|un|une|deux|trois|quatre|cinq|six|sept|huit|dix|quinze|a|an|one|two|three|four|five|ten)\s+(jours?|semaines?|mois|days?|weeks?|months?)/);
  if (!m) return /depuis hier|since yesterday/.test(t) ? 1 : null;
  const n = Number(m[1]) || NOMBRES[m[1]] || 1;
  const u = m[2];
  const facteur = /^(semaine|week)/.test(u) ? 7 : /^(mois|month)/.test(u) ? 30 : 1;
  return n * facteur;
}

/** Repère les signes présents et absents dans une description libre (FR ou EN). */
export function reformuler(texte) {
  const t = norm(texte || '');
  const presents = [];
  const absents = [];
  for (const [code, regexes] of Object.entries(COMPILE)) {
    let vu = false; let nie = false;
    for (const re of regexes) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(t))) {
        const avant = t.slice(Math.max(0, m.index - 30), m.index + m[1].length);
        if (NEGATION.test(avant)) nie = true; else vu = true;
      }
    }
    if (vu) presents.push(code); else if (nie) absents.push(code);
  }
  // « Toux qui aboie » ou « quintes » impliquent la toux.
  if ((presents.includes('SYM-016') || presents.includes('SYM-017')) && !presents.includes('SYM-002')) presents.push('SYM-002');
  return { presents, absents, jours: duree(texte || '') };
}

export const libelle = (code, lang) => SIGNES[code]?.[lang] ?? code;

/** Signes proposés à l'ajout (ceux qu'on oublie souvent de dire). */
export const SUGGESTIONS = ['SYM-001', 'SYM-002', 'SYM-003', 'SYM-006', 'SYM-007', 'SYM-010', 'SYM-018', 'SYM-019', 'SYM-020', 'SYM-009'];

// ── Vérification de sécurité (FR-DX-03) ─────────────────────────────────────
/** Questions de danger selon le profil. `enfantPetit` : moins de 5 ans. */
export function questionsDanger(profil) {
  if (profil.enfantPetit) return [
    { id: 'Q-BOIRE', signe: 'SYM-090' },
    { id: 'Q-VOMIT', signe: 'SYM-091' },
    { id: 'Q-CONV', signe: 'SYM-092' },
    { id: 'Q-ENDORMI', signe: 'SYM-093' },
    { id: 'Q-TIRAGE', signe: 'SYM-094' },
  ];
  return [
    { id: 'Q-REPOS', signe: 'SYM-004' },
    { id: 'Q-POITRINE', signe: 'SYM-012' },
    { id: 'Q-BLEU', signe: 'SYM-095' },
    { id: 'Q-CONFUS', signe: 'SYM-093' },
    { id: 'Q-CONV', signe: 'SYM-092' },
  ];
}

export function profil(qui, age) {
  // age = { valeur, unite: 'ans' | 'mois' }
  const ans = age?.valeur == null ? null : age.unite === 'mois' ? age.valeur / 12 : age.valeur;
  return { qui, ans, enfant: ans !== null && ans < 15, enfantPetit: ans !== null && ans < 5 };
}

// ── Pistes : table de DÉMONSTRATION (remplacée par DDXPlus) ────────────────
export const PATHOLOGIES = [
  { id: 'urti', fr: 'Infection du nez et de la gorge (rhume)', en: 'Upper respiratory tract infection (common cold)', prior: 0.30, typiques: ['SYM-002', 'SYM-007', 'SYM-006', 'SYM-001', 'SYM-009', 'SYM-010'], niveau: 'centre_sante', specialite: 'medecine_generale', services: [] },
  { id: 'grippe', fr: 'Grippe', en: 'Influenza', prior: 0.16, typiques: ['SYM-001', 'SYM-002', 'SYM-011', 'SYM-009', 'SYM-010', 'SYM-020', 'SYM-006'], niveau: 'centre_sante', specialite: 'medecine_generale', services: [] },
  { id: 'bronchite', fr: 'Bronchite aiguë', en: 'Acute bronchitis', prior: 0.12, typiques: ['SYM-002', 'SYM-010', 'SYM-012', 'SYM-005', 'SYM-001'], niveau: 'centre_sante', specialite: 'medecine_generale', services: [] },
  { id: 'pneumonie', fr: 'Pneumonie', en: 'Pneumonia', prior: 0.10, typiques: ['SYM-001', 'SYM-002', 'SYM-003', 'SYM-004', 'SYM-012', 'SYM-020', 'SYM-010'], niveau: 'hopital_district', specialite: 'pneumologie', services: ['radiographie', 'laboratoire', 'hospitalisation'] },
  { id: 'bronchiolite', fr: 'Bronchiolite', en: 'Bronchiolitis', prior: 0.10, typiques: ['SYM-002', 'SYM-003', 'SYM-005', 'SYM-007', 'SYM-001'], niveau: 'hopital_district', specialite: 'pediatrie', services: ['hospitalisation'], ageMax: 2 },
  { id: 'croup', fr: 'Laryngite de l’enfant (croup)', en: 'Croup', prior: 0.06, typiques: ['SYM-016', 'SYM-002', 'SYM-001', 'SYM-007', 'SYM-003'], niveau: 'centre_sante', specialite: 'pediatrie', services: [], ageMax: 6 },
  { id: 'coqueluche', fr: 'Coqueluche', en: 'Whooping cough', prior: 0.04, typiques: ['SYM-017', 'SYM-002', 'SYM-019', 'SYM-007'], niveau: 'hopital_district', specialite: 'pediatrie', services: ['laboratoire'] },
  { id: 'otite', fr: 'Otite moyenne aiguë', en: 'Acute otitis media', prior: 0.08, typiques: ['SYM-008', 'SYM-001', 'SYM-007'], niveau: 'centre_sante', specialite: 'orl', services: [] },
  { id: 'tuberculose', fr: 'Tuberculose', en: 'Tuberculosis', prior: 0.04, typiques: ['SYM-002', 'SYM-013', 'SYM-014', 'SYM-015', 'SYM-001', 'SYM-010'], niveau: 'hopital_district', specialite: 'pneumologie', services: ['laboratoire', 'radiographie'], touxLongue: true },
  { id: 'asthme', fr: 'Crise d’asthme', en: 'Asthma attack', prior: 0.05, typiques: ['SYM-005', 'SYM-004', 'SYM-002', 'SYM-012'], niveau: 'hopital_district', specialite: 'pneumologie', services: [], ageMin: 2 },
  { id: 'vih-initial', fr: '—', en: '—', prior: 0.02, typiques: ['SYM-001', 'SYM-021', 'SYM-022', 'SYM-006', 'SYM-010', 'SYM-011', 'SYM-018'], niveau: 'centre_sante', specialite: null, services: [], art48: true },
];

export const NIVEAUX = ['centre_sante', 'hopital_district', 'hopital_urgences_24h'];
export const POLITIQUE = { maxPistes: 3, seuilScore: 0.22, seuilCouverture: 0.28, ageMaxPediatrie: 15 };

function score(p, presents, prof, jours) {
  if (p.ageMax !== undefined && (prof.ans === null || prof.ans >= p.ageMax)) return 0;
  if (p.ageMin !== undefined && prof.ans !== null && prof.ans < p.ageMin) return 0;
  let s = p.prior;
  for (const c of p.typiques) s *= presents.includes(c) ? 3.2 : 0.72;
  for (const c of presents) if (!p.typiques.includes(c) && !SIGNES[c]?.danger) s *= 0.55;
  if (p.touxLongue) s *= jours !== null && jours >= 14 ? 4 : 0.25;
  if (p.id === 'urti' && jours !== null && jours >= 14) s *= 0.3;
  return s;
}

/**
 * Décide de l'écran à montrer et prépare son contenu.
 * reponses : { [idQuestion]: true | false } (vrai = signe de danger présent).
 */
export function analyser({ presents, absents = [], jours = null }, prof, reponses = {}, { moteur = null } = {}) {
  const danger = Object.values(reponses).some((v) => v === true) || presents.some((c) => SIGNES[c]?.danger);
  // Le moteur v1 (75 règles PCIME et IITT) suffit à déclencher l'urgence (FR-168) ; il ne l'abaisse jamais.
  if (danger || moteur?.urgence) return { issue: 'urgence', pistes: [], moteur: moteur?.urgence ? moteur : null }; // hypothèses masquées (FR-DX-03)

  const respiratoire = presents.some((c) => SIGNES[c]?.resp);
  if (!respiratoire) return { issue: 'hors_champ', raison: 'non_respiratoire', pistes: [] };

  const bruts = PATHOLOGIES.map((p) => ({ p, s: score(p, presents, prof, jours) })).filter((x) => x.s > 0);
  const total = bruts.reduce((a, x) => a + x.s, 0) || 1;
  const classes = bruts
    .map(({ p, s }) => {
      const trouves = p.typiques.filter((c) => presents.includes(c));
      return { id: p.id, art48: !!p.art48, score: s / total, trouves, typiques: p.typiques.length, couverture: trouves.length / p.typiques.length, p };
    })
    .sort((a, b) => b.score - a.score);
  const pistes = classes.slice(0, POLITIQUE.maxPistes).filter((x) => x.trouves.length > 0);
  const tete = pistes[0];
  if (!tete || tete.score < POLITIQUE.seuilScore || tete.couverture < POLITIQUE.seuilCouverture) {
    return { issue: 'hors_champ', raison: 'faible', pistes: [] };
  }
  if (pistes.some((x) => x.art48)) return { issue: 'art48', pistes: [] }; // aucun nom affiché (FR-DX-06)
  return { issue: 'pistes', pistes, besoins: besoins(pistes, prof) };
}

/** Besoin le plus élevé parmi les pistes affichées (FR-DX-17). */
export function besoins(pistes, prof) {
  const niveau = pistes.reduce((max, x) => (NIVEAUX.indexOf(x.p.niveau) > NIVEAUX.indexOf(max) ? x.p.niveau : max), 'centre_sante');
  const specialites = new Set();
  if (pistes[0]?.p.specialite) specialites.add(pistes[0].p.specialite);
  if (prof.enfant) specialites.add('pediatrie');
  const services = [...new Set(pistes.flatMap((x) => x.p.services))];
  return { niveau, specialites: [...specialites], services, piste: pistes[0]?.id };
}

/** Code court de la fiche : lisible au téléphone, sans 0/O ni 1/I. */
export function codeFiche(graine = Date.now()) {
  const A = 'ACDEFGHJKLMNPQRTUVWXY34679';
  let x = Math.abs(Math.floor(graine)) % 2147483647 || 7;
  let out = '';
  for (let i = 0; i < 6; i++) { x = (x * 48271) % 2147483647; out += A[x % A.length]; }
  return `${out.slice(0, 3)}-${out.slice(3)}`;
}
