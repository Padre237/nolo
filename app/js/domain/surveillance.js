// Nolo — surveillance syndromique pour l'espace ministère (pipeline B) : agrégats, seuil, CUSUM, offre et demande, politique.
// Toutes les séries sont FICTIVES (générateur à graine fixe). Aucune donnée individuelle n'existe ici : seulement des
// compteurs (zone × semaine × syndrome) issus des personnes qui ont coché « surveillance ».

export const REGIONS = [
  { id: 'adamaoua', fr: 'Adamaoua', en: 'Adamawa', poids: 0.3 },
  { id: 'centre', fr: 'Centre', en: 'Centre', poids: 1 },
  { id: 'est', fr: 'Est', en: 'East', poids: 0.25 },
  { id: 'extreme-nord', fr: 'Extrême-Nord', en: 'Far North', poids: 0.8 },
  { id: 'littoral', fr: 'Littoral', en: 'Littoral', poids: 0.95 },
  { id: 'nord', fr: 'Nord', en: 'North', poids: 0.55 },
  { id: 'nord-ouest', fr: 'Nord-Ouest', en: 'North-West', poids: 0.45 },
  { id: 'ouest', fr: 'Ouest', en: 'West', poids: 0.5 },
  { id: 'sud', fr: 'Sud', en: 'South', poids: 0.2 },
  { id: 'sud-ouest', fr: 'Sud-Ouest', en: 'South-West', poids: 0.4 },
];
export const SYNDROMES = ['respiratoire', 'fievre', 'diarrhee', 'eruption'];
const BASE = { respiratoire: 150, fievre: 110, diarrhee: 55, eruption: 7 };
const BASE_AIRE = { respiratoire: 9, fievre: 6, diarrhee: 2.2, eruption: 0.6 };
export const SEMAINES = 12; // 12 dernières semaines complètes ; 12 = la plus récente

/** District de démonstration (Littoral) : 12 aires de santé, disposées en schéma (polygones à verser). */
export const DISTRICT_DEMO = { nom: 'District de démonstration Nord', region: 'littoral' };
export const AIRES = Array.from({ length: 12 }, (_, i) => ({ id: `AS-${String(i + 1).padStart(2, '0')}`, col: i % 4, ligne: Math.floor(i / 4) }));

function graine(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function hasard(cle) { let x = graine(cle) || 1; x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 10000) / 10000; }

// Regroupements injectés pour la démonstration.
const GRAPPE_AIRE = { aire: 'AS-07', syndrome: 'diarrhee', valeurs: { 10: 7, 11: 15, 12: 24 } };
const GRAPPE_REGION = { region: 'nord', syndrome: 'eruption', ajout: { 11: 16, 12: 29 } };

export function compteAire(aire, syndrome, w) {
  if (aire === GRAPPE_AIRE.aire && syndrome === GRAPPE_AIRE.syndrome && GRAPPE_AIRE.valeurs[w]) return GRAPPE_AIRE.valeurs[w];
  const v = BASE_AIRE[syndrome] * (0.6 + hasard(`${aire}|${syndrome}|${w}`) * 0.8);
  return Math.round(v);
}

export function compteRegion(region, syndrome, w) {
  const r = REGIONS.find((x) => x.id === region);
  let v = Math.round(BASE[syndrome] * r.poids * (0.86 + hasard(`${region}|${syndrome}|${w}`) * 0.28));
  if (region === GRAPPE_REGION.region && syndrome === GRAPPE_REGION.syndrome) v += GRAPPE_REGION.ajout[w] || 0;
  if (region === DISTRICT_DEMO.region) v += AIRES.reduce((s, a) => s + compteAire(a.id, syndrome, w), 0);
  return v;
}

export const total = (fn, zone, w) => SYNDROMES.reduce((s, sy) => s + fn(zone, sy, w), 0);
export const SEUIL = 5;
/** Sous le seuil : rien n'est affiché ; sinon arrondi à 5 (mêmes règles que D-007 et D-032). */
export const publiable = (n, seuil = SEUIL) => (n < seuil ? null : Math.round(n / 5) * 5);

/** CUSUM unilatéral : base = semaines 1 à 8 ; k = 0,5 σ ; h = 5 σ. Retourne la première semaine d'alerte ≥ 9. */
export function cusum(serie, { k = 0.5, h = 5, seuil = SEUIL } = {}) {
  const base = serie.slice(0, 8);
  const mu = base.reduce((a, b) => a + b, 0) / base.length;
  // Écart-type empirique, jamais sous celui d'un comptage de Poisson (petites séries).
  const sd = Math.max(1, Math.sqrt(mu), Math.sqrt(base.reduce((a, b) => a + (b - mu) ** 2, 0) / base.length));
  let S = 0; const cumul = [];
  let alerte = null;
  serie.forEach((x, i) => {
    S = Math.max(0, S + x - mu - k * sd);
    cumul.push(S);
    if (alerte === null && i >= 8 && S > h * sd && x >= seuil) alerte = { semaine: i + 1, cas: x, valeur: S / sd };
  });
  return { mu, sd, cumul, alerte };
}

const serie = (fn, zone, sy) => Array.from({ length: SEMAINES }, (_, i) => fn(zone, sy, i + 1));

/** Signaux « à vérifier » : aires du district de démonstration, puis régions. */
export function signaux({ seuil = SEUIL } = {}) {
  const out = [];
  for (const a of AIRES) for (const sy of SYNDROMES) {
    const c = cusum(serie(compteAire, a.id, sy), { seuil });
    if (c.alerte) out.push({ id: `S-${a.id}-${sy}`, niveau: 'aire', zone: a.id, region: DISTRICT_DEMO.region, syndrome: sy, ...c.alerte, serie: serie(compteAire, a.id, sy) });
  }
  for (const r of REGIONS) for (const sy of SYNDROMES) {
    if (r.id === DISTRICT_DEMO.region) continue; // le district est déjà suivi aire par aire
    const c = cusum(serie(compteRegion, r.id, sy), { seuil });
    if (c.alerte) out.push({ id: `S-${r.id}-${sy}`, niveau: 'region', zone: r.id, region: r.id, syndrome: sy, ...c.alerte, serie: serie(compteRegion, r.id, sy) });
  }
  return out;
}

export const serieRegion = (region, sy) => (sy === 'tous' ? Array.from({ length: SEMAINES }, (_, i) => total(compteRegion, region, i + 1)) : serie(compteRegion, region, sy));
export const serieAire = (aire, sy) => (sy === 'tous' ? Array.from({ length: SEMAINES }, (_, i) => total(compteAire, aire, i + 1)) : serie(compteAire, aire, sy));

/** Classes de la carte (5 classes, une seule teinte) ; null = moins de 5. */
export function classe(n, bornes) {
  if (n === null || n < SEUIL) return null;
  let c = 0; for (const b of bornes) if (n >= b) c += 1;
  return Math.min(4, c);
}
export const BORNES_REGION = { tous: [150, 300, 450, 600], respiratoire: [60, 110, 160, 210], fievre: [45, 80, 115, 150], diarrhee: [20, 40, 60, 80], eruption: [10, 20, 30, 40] };
export const BORNES_AIRE = { tous: [12, 20, 28, 36], respiratoire: [7, 10, 13, 16], fievre: [6, 8, 10, 12], diarrhee: [6, 10, 15, 20], eruption: [6, 8, 10, 12] };

// ── Offre et demande, par région (fictif) ──────────────────────────────────
export function offreDemande() {
  return REGIONS.map((r) => {
    const h = (k) => hasard(`${r.id}|${k}`);
    const structures = Math.round(40 + r.poids * 260 * (0.8 + h('s') * 0.4));
    const verifiees = Math.round(structures * (0.35 + h('v') * 0.45));
    const fraicheur = 0.45 + h('f') * 0.45;
    const rupture = 0.04 + h('r') * 0.14;
    let insat = 0.03 + (1 - r.poids) * 0.18 + h('i') * 0.06;
    const tete = ['artesunate', 'artemether_lumefantrine', 'amoxicilline', 'sro', 'salbutamol', 'insuline', 'metformine'];
    let manque = tete[Math.floor(h('m') * tete.length)];
    if (r.id === 'littoral') { manque = 'artesunate'; insat = Math.max(insat, 0.11); }
    return { region: r.id, structures, verifiees, fraicheur, rupture, insat, manque };
  });
}

// ── Simulation « et si » (la politique en vigueur est lue dans data/politique.json) ──
/**
 * Effets mesurables d'une variante de politique sur les données de démonstration.
 * v : { seuil, decalage, maille ('aire'|'district'), apdp (bool), derogation (bool) }
 */
export function simuler(v) {
  const seuil = v.seuil;
  let publiees = 0; let fines = 0;
  if (v.maille === 'aire') {
    for (const a of AIRES) for (const sy of SYNDROMES) for (let w = 1; w <= SEMAINES; w++) {
      const n = compteAire(a.id, sy, w);
      if (n >= seuil) { publiees += 1; if (n < 5) fines += 1; }
    }
  } else {
    for (const sy of SYNDROMES) for (let w = 1; w <= SEMAINES; w++) {
      const n = AIRES.reduce((s, a) => s + compteAire(a.id, sy, w), 0);
      if (n >= seuil) publiees += 1;
    }
  }
  // Délai de détection du regroupement de l'aire AS-07 (diarrhée) : semaine d'alerte + décalage.
  const s = v.maille === 'aire'
    ? serie(compteAire, GRAPPE_AIRE.aire, GRAPPE_AIRE.syndrome)
    : Array.from({ length: SEMAINES }, (_, i) => AIRES.reduce((t, a) => t + compteAire(a.id, 'diarrhee', i + 1), 0));
  const c = cusum(s, { seuil });
  const debut = 10; // première semaine du regroupement injecté
  const detection = c.alerte ? { semaines: c.alerte.semaine - debut, jours: (c.alerte.semaine - debut) * 7 + v.decalage } : null;
  const fonctions = [];
  if (v.apdp) fonctions.push('mode_complet', 'surveillance_reelle', 'signalements_reels', 'comptes_citoyens');
  if (v.derogation) fonctions.push('signalements_contraceptifs');
  return { publiees, fines, detection, fonctions };
}

export const VARIANTE_EN_VIGUEUR = { seuil: 5, decalage: 7, maille: 'aire', apdp: false, derogation: false };

/** Questions de l'instrument de décision de l'annexe 2 du RSI (2005). Deux « oui » : notification à l'OMS sous 24 h. */
export const RSI_QUESTIONS = ['grave', 'inhabituel', 'propagation', 'restrictions'];
export const decisionRsi = (r) => RSI_QUESTIONS.filter((q) => r[q] === true).length >= 2;

/** Heures écoulées depuis l'alerte d'un signal (FICTIF, stable pour la démonstration). */
export const heuresDepuisAlerte = (signal) => 2 + Math.floor(hasard(`${signal.id}|alerte`) * 40);

/**
 * Prochain délai du guide SBC (FR-243) : triage 24 h tant que le signal est « à trier », puis évaluation du
 * risque 48 h après la détection ; délais lus dans la politique (`surveillance.delais_heures`).
 */
export function echeance({ statut, heures }, delais) {
  const etape = statut === 'a_trier' ? 'triage' : 'evaluation_risque';
  const dans = delais[etape] - heures;
  return { etape, dans, depassee: dans < 0 };
}

/** Définition officielle associée à un regroupement de cas : SC1 du guide SBC 2023 (FR-203). */
export function definitionSc(signal, sbc) {
  const d = sbc?.definitions_signaux?.find((x) => x.code === 'SC1');
  return d ? { code: d.code, texte: d.definition_officielle, page: d.page, source: sbc.source.doc_id } : { code: 'hors_definition' };
}
