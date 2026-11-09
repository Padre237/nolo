// SF-001-03 — Chargement et validation du paquet de triage, liste fermée, fermeture des implications.
// FR-113 (refus hors démo sans validateur clinique), FR-120, FR-121, FR-123, FR-124 (validation structurelle),
// FR-161 (empreinte recalculée au chargement).
import { construireIndex, ErreurReferentiel } from "./extracteur_lexical.mjs";
import { empreinte } from "./empreinte.mjs";
export { ErreurReferentiel };

const TRANCHES = ["moins_8_jours", "8_jours_2_mois", "2_6_mois", "6_mois_2_ans", "2_5_ans",
  "5_11_ans", "12_17_ans", "18_50_ans", "51_70_ans", "plus_70_ans"];

const PUBLICS = {
  tous: new Set(TRANCHES),
  nourrisson: new Set(TRANCHES.slice(0, 2)),
  enfant: new Set(TRANCHES.slice(0, 6)),
  adulte: new Set(TRANCHES.slice(6)),
};

/**
 * Valide le paquet et le prépare (FR-124, FR-113). Lève ErreurReferentiel si invalide,
 * ou si `validateur_clinique` est vide hors d'un mode autorisé sans validation (démo).
 */
export function chargerPaquet(paquet, mode = "demo_synthetique") {
  const err = (m) => { throw new ErreurReferentiel(m); };
  if (paquet.schema !== "paquet-triage/1") err(`schéma inattendu : ${paquet.schema}`);
  // FR-161 : l'empreinte du référentiel et des règles est recalculée ; un paquet modifié est refusé.
  if (!paquet.empreinte_canonique || empreinte({ referentiel: paquet.referentiel, regles: paquet.regles }) !== paquet.empreinte_canonique) {
    err("empreinte du paquet différente de l'empreinte déclarée : paquet modifié après construction (FR-161)");
  }
  if (!paquet.validateur_clinique && !paquet.usage_autorise_sans_validation.includes(mode)) {
    err(`règles sans validateur clinique : chargement refusé en mode ${mode} (FR-113)`);
  }
  const entrees = paquet.referentiel.entrees;
  const codes = new Set(), jetons = new Map();
  for (const e of entrees) {
    if (!/^SYM-\d{3}$/.test(e.code) || codes.has(e.code)) err(`code invalide ou dupliqué : ${e.code}`);
    if (jetons.has(e.jeton)) err(`jeton dupliqué : ${e.jeton}`);
    if (e.snomed_gps_id && e.snomed_gps_id.trim()) err(`snomed_gps_id non vide : ${e.jeton} (FR-125, D-018)`);
    codes.add(e.code);
    jetons.set(e.jeton, e);
  }
  for (const e of entrees) {
    for (const i of e.implique.split(/\s+/).filter(Boolean)) {
      if (!jetons.has(i)) err(`implication vers un jeton inconnu : ${e.jeton} -> ${i}`);
    }
  }
  const index = construireIndex(entrees); // lève si une expression est ambiguë
  if (!paquet.regles || paquet.regles.schema !== "triage-regles/2") err("règles absentes ou schéma inattendu");
  return { paquet, entrees, jetons, index, mode };
}

/**
 * Chargement avec repli (FR-124) : un paquet invalide est refusé et la version embarquée reste active.
 * Renvoie { ref, erreur } ; erreur vaut null quand le paquet est accepté.
 */
export function chargerReferentiel(paquet, { mode = "demo_synthetique", embarque = null } = {}) {
  try { return { ref: chargerPaquet(paquet, mode), erreur: null }; }
  catch (e) { if (e instanceof ErreurReferentiel) return { ref: embarque, erreur: e }; throw e; }
}

/** Fermeture transitive de la colonne « implique » (FR-123). */
export function fermer(jetonsEntres, ref) {
  const resultat = new Set(jetonsEntres);
  let change = true;
  while (change) {
    change = false;
    for (const j of [...resultat]) {
      const e = ref.jetons.get(j);
      if (!e) continue;
      for (const i of e.implique.split(/\s+/).filter(Boolean)) {
        if (!resultat.has(i)) { resultat.add(i); change = true; }
      }
    }
  }
  return resultat;
}

/** Jetons atomiques d'une condition, composites résolus. */
function atomes(condition, composites, acc = new Set()) {
  const brancher = (a) => (composites[a] ? atomes(composites[a], composites, acc) : acc.add(a));
  for (const a of condition.tous ?? []) brancher(a);
  for (const a of condition.au_moins_un ?? []) brancher(a);
  if (condition.au_moins_n) for (const a of condition.au_moins_n.parmi) brancher(a);
  for (const g of condition.tous_groupes ?? []) for (const a of g) brancher(a);
  return acc;
}

/**
 * Liste fermée d'une tranche (FR-121) : entrées affichées non exclues dont le public couvre la tranche,
 * complétées par les jetons affichables utilisés par une règle applicable à la tranche.
 */
export function listeFermee(ref, tranche) {
  if (!TRANCHES.includes(tranche)) throw new ErreurReferentiel(`tranche inconnue : ${tranche}`);
  const regles = ref.paquet.regles;
  const utilises = new Set();
  for (const r of regles.regles) {
    if (r.tranches.includes(tranche)) atomes(r.condition, regles.composites, utilises);
  }
  return ref.entrees
    .filter((e) => e.affiche === "oui" && !e.sensibilite.startsWith("exclu")
      && (PUBLICS[e.public].has(tranche) || utilises.has(e.jeton)))
    .sort((a, b) => (a.domaine + a.libelle_fr).localeCompare(b.domaine + b.libelle_fr, "fr"));
}

export { TRANCHES, PUBLICS };
