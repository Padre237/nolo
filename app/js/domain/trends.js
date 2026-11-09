// Nolo — tendances de la demande (D-032) : compteurs anonymes, seuil 5, arrondi à 5, semaines complètes.
// Les compteurs affichés ici sont FICTIFS (générateur à graine fixe), comme prévu en § 8 de D-032.

export const ZONES = {
  Littoral: { Wouri: ['Douala I', 'Douala II', 'Douala III', 'Douala IV', 'Douala V'] },
  Centre: { Mfoundi: ['Yaoundé I', 'Yaoundé II', 'Yaoundé III', 'Yaoundé IV', 'Yaoundé V', 'Yaoundé VI', 'Yaoundé VII'] },
  Nord: { Bénoué: ['Garoua I', 'Garoua II', 'Garoua III'] },
};

export const SERVICES = {
  medicament: ['paracetamol', 'artemether_lumefantrine', 'amoxicilline', 'artesunate', 'sro', 'ibuprofene', 'salbutamol', 'zinc', 'cotrimoxazole', 'metformine', 'amlodipine', 'fer_acide_folique'],
  specialite: ['pediatrie', 'medecine_generale', 'cardiologie', 'ophtalmologie', 'dentisterie', 'orl', 'dermatologie', 'neurologie', 'pneumologie', 'chirurgie'],
  sang: ['O+', 'A+', 'B+', 'O−', 'AB+', 'A−', 'B−', 'AB−'],
};

function graine(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function alea(seed) { let x = seed || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 10000) / 10000; }; }

/** Compteur fictif d'une case (arrondissement, semaine, type, service) → { total, nonSatisfaites }. */
function compteur(arr, semaine, type, service) {
  const r = alea(graine(`${arr}|${semaine}|${type}|${service}`));
  const rang = SERVICES[type].indexOf(service);
  const base = { medicament: 110, specialite: 46, sang: 14 }[type] / (1 + rang * 0.55);
  const taille = arr.startsWith('Douala') ? 1.25 : arr.startsWith('Yaoundé') ? 1 : 0.55;
  let total = Math.round(base * taille * (0.75 + r() * 0.5));
  let insat = Math.round(total * (0.04 + r() * 0.1));
  // Rupture d'artésunate à Douala V sur les 4 dernières semaines (D-032 § 8).
  if (service === 'artesunate' && arr === 'Douala V' && semaine >= 9) { total = Math.round(total * 1.9); insat = Math.round(total * 0.75); }
  // Hausse saisonnière d'antipaludiques : visible, mais sans alerte (Principe X).
  if (service === 'artemether_lumefantrine' && semaine >= 8) total = Math.round(total * (1 + (semaine - 7) * 0.09));
  return { total, nonSatisfaites: Math.min(insat, total) };
}

export const SEUIL = 5;
/** FR-TEND-06 : sous 5 → « moins de 5 » et hors classement ; sinon arrondi à 5. */
export const afficher = (n) => (n < SEUIL ? null : Math.round(n / 5) * 5);

export function arrondissementsDe(niveau, zone) {
  if (niveau === 'national') return Object.values(ZONES).flatMap((d) => Object.values(d).flat());
  if (niveau === 'region') return Object.values(ZONES[zone] || {}).flat();
  if (niveau === 'departement') { for (const r of Object.values(ZONES)) if (r[zone]) return r[zone]; return []; }
  return [zone];
}

/**
 * Agrège les compteurs sur une zone et une période de semaines COMPLÈTES (FR-TEND-05).
 * semaines : 4, 8 ou 12 dernières semaines complètes (numérotées 1 … 12, 12 = la plus récente).
 */
export function tendances({ niveau = 'arrondissement', zone = 'Douala V', type = 'medicament', service = null, semaines = 12 }) {
  const arrs = arrondissementsDe(niveau, zone);
  const debut = 12 - semaines + 1;
  const parService = SERVICES[type].map((s) => {
    let total = 0; let insat = 0;
    for (const a of arrs) for (let w = debut; w <= 12; w++) { const c = compteur(a, w, type, s); total += c.total; insat += c.nonSatisfaites; }
    return { service: s, total, nonSatisfaites: insat };
  });
  const classement = parService
    .map((x) => ({ ...x, affiche: afficher(x.total) }))
    .filter((x) => x.affiche !== null)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
  const insatisfaits = parService
    .filter((x) => afficher(x.nonSatisfaites) !== null)
    .map((x) => ({ ...x, part: x.nonSatisfaites / x.total, affiche: afficher(x.nonSatisfaites) }))
    .sort((a, b) => b.part - a.part)
    .slice(0, 10);
  const choisi = service || classement[0]?.service || SERVICES[type][0];
  const serie = [];
  for (let w = debut; w <= 12; w++) {
    let t = 0; for (const a of arrs) t += compteur(a, w, type, choisi).total;
    serie.push({ semaine: w, valeur: t, affiche: afficher(t) });
  }
  // Flèche de tendance : variation > 20 % et les deux moitiés ≥ 20 recherches.
  const moitie = Math.floor(serie.length / 2);
  const a = serie.slice(0, moitie).reduce((s, x) => s + x.valeur, 0);
  const b = serie.slice(moitie).reduce((s, x) => s + x.valeur, 0);
  const variation = a ? (b - a) / a : 0;
  const tendance = a >= 20 && b >= 20 && Math.abs(variation) > 0.2 ? (variation > 0 ? 'hausse' : 'baisse') : 'stable';
  return { classement, insatisfaits, serie, service: choisi, tendance, variation };
}

/** Numéro et dates de la semaine ISO complète `k` semaines avant la semaine en cours. */
export function semaineIso(k, ref = new Date()) {
  const d = new Date(Date.UTC(ref.getFullYear(), ref.getMonth(), ref.getDate()));
  const jour = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - jour + 1 - 7 * k); // lundi de la semaine visée
  const jeudi = new Date(d); jeudi.setUTCDate(d.getUTCDate() + 3);
  const an = new Date(Date.UTC(jeudi.getUTCFullYear(), 0, 1));
  const num = Math.ceil(((jeudi - an) / 86400000 + 1) / 7);
  return { numero: num, lundi: d };
}
